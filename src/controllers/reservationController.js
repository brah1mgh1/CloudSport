const { Reservation, Facility, Notification, Group, Club, User } = require('../models');
const { Op } = require('sequelize');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

exports.createReservation = async (req, res, next) => {
  try {
    const { facilityId, groupId, date, startTime, endTime, purpose } = req.body;
    const conflicting = await Reservation.findOne({
      where: {
        facilityId,
        date,
        status: { [Op.in]: ['approved', 'pending'] },
        [Op.or]: [
          { startTime: { [Op.lt]: endTime }, endTime: { [Op.gt]: startTime } }
        ]
      }
    });
    if (conflicting) return res.status(400).json({ success: false, message: 'Time slot already booked' });

    const facility = await Facility.findByPk(facilityId);
    const hours = (parseInt(endTime) - parseInt(startTime)) / 100;
    const amount = facility.pricePerHour * Math.max(hours, 0.5);

    const reservation = await Reservation.create({
      facilityId, groupId, leaderId: req.user.id,
      date, startTime, endTime, purpose,
      amount, status: 'pending'
    });

    const managers = await User.findAll({ where: { role: 'manager' } });
    for (const m of managers) {
      await Notification.create({
        userId: m.id,
        title: 'New Reservation Request',
        message: `New reservation request for ${facility.name} on ${date}`,
        type: 'reservation',
        relatedId: reservation.id
      });
    }

    res.status(201).json({ success: true, reservation });
  } catch (err) { next(err); }
};

exports.getReservations = async (req, res, next) => {
  try {
    const where = {};
    if (req.user.role === 'leader') where.leaderId = req.user.id;
    if (req.user.role === 'athlete') {
      const subs = await require('../models').Subscription.findAll({
        where: { userId: req.user.id, status: 'approved' }
      });
      const groupIds = subs.map(s => s.groupId);
      where.groupId = { [Op.in]: groupIds };
    }
    if (req.query.status) where.status = req.query.status;
    if (req.query.facilityId) where.facilityId = req.query.facilityId;

    const reservations = await Reservation.findAll({
      where,
      include: [
        { model: Facility },
        { model: Group },
        { model: User, as: 'leader', attributes: ['id', 'name', 'email'] }
      ],
      order: [['date', 'DESC']]
    });
    res.json({ success: true, reservations });
  } catch (err) { next(err); }
};

exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [{ model: Facility }, { model: Group }, { model: User, as: 'leader', attributes: ['id', 'name', 'email'] }]
    });
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    res.json({ success: true, reservation });
  } catch (err) { next(err); }
};

exports.approveReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [{ model: Facility }, { model: Group }]
    });
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    reservation.status = 'approved';
    reservation.adminNote = req.body.adminNote || reservation.adminNote;
    await reservation.save();

    await Notification.create({
      userId: reservation.leaderId,
      title: 'Reservation Approved',
      message: `Your reservation for ${reservation.Facility.name} on ${reservation.date} has been approved`,
      type: 'reservation',
      relatedId: reservation.id
    });

    if (reservation.Group) {
      const members = await require('../models').Subscription.findAll({
        where: { groupId: reservation.groupId, status: 'approved' }
      });
      for (const m of members) {
        if (m.userId !== reservation.leaderId) {
          await Notification.create({
            userId: m.userId,
            title: 'Reservation Approved',
            message: `Reservation for ${reservation.Facility.name} on ${reservation.date} has been approved`,
            type: 'reservation',
            relatedId: reservation.id
          });
        }
      }
    }
    res.json({ success: true, reservation });
  } catch (err) { next(err); }
};

exports.denyReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, { include: [{ model: Facility }] });
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    reservation.status = 'denied';
    reservation.adminNote = req.body.adminNote || '';
    await reservation.save();
    await Notification.create({
      userId: reservation.leaderId,
      title: 'Reservation Denied',
      message: `Your reservation for ${reservation.Facility.name} on ${reservation.date} was denied. Reason: ${reservation.adminNote}`,
      type: 'reservation',
      relatedId: reservation.id
    });
    res.json({ success: true, reservation });
  } catch (err) { next(err); }
};

exports.cancelReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    if (reservation.leaderId !== req.user.id && req.user.role !== 'manager') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    reservation.status = 'cancelled';
    await reservation.save();
    res.json({ success: true, reservation });
  } catch (err) { next(err); }
};

exports.requestChange = async (req, res, next) => {
  try {
    const { date, startTime, endTime } = req.body;
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    if (reservation.leaderId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    reservation.status = 'change_requested';
    if (date) reservation.date = date;
    if (startTime) reservation.startTime = startTime;
    if (endTime) reservation.endTime = endTime;
    await reservation.save();

    const managers = await User.findAll({ where: { role: 'manager' } });
    for (const m of managers) {
      await Notification.create({
        userId: m.id,
        title: 'Change Request',
        message: `Change requested for reservation #${reservation.id}`,
        type: 'reservation',
        relatedId: reservation.id
      });
    }
    res.json({ success: true, reservation });
  } catch (err) { next(err); }
};

exports.payReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'your_stripe_secret_key') {
      reservation.paymentStatus = 'paid';
      reservation.status = 'approved';
      await reservation.save();
      return res.json({ success: true, reservation, message: 'Payment simulated (no Stripe key)' });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(reservation.amount) * 100),
      currency: 'usd',
      metadata: { reservationId: reservation.id }
    });
    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (err) { next(err); }
};

exports.confirmPayment = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    reservation.paymentStatus = 'paid';
    reservation.paymentId = req.body.paymentId || 'simulated';
    reservation.status = 'approved';
    await reservation.save();
    res.json({ success: true, reservation });
  } catch (err) { next(err); }
};

exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        { model: Facility },
        { model: Group },
        { model: User, as: 'leader', attributes: ['id', 'name', 'email'] }
      ],
      order: [['date', 'DESC']]
    });
    res.json({ success: true, reservations });
  } catch (err) { next(err); }
};
