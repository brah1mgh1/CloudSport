const { Facility, Reservation } = require('../models');
const { Op } = require('sequelize');

exports.createFacility = async (req, res, next) => {
  try {
    const { name, description, capacity, pricePerHour, location, sportType, images } = req.body;
    const facility = await Facility.create({ name, description, capacity, pricePerHour, location, sportType, images });
    res.status(201).json({ success: true, facility });
  } catch (err) { next(err); }
};

exports.getAllFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.findAll({ order: [['name', 'ASC']] });
    res.json({ success: true, facilities });
  } catch (err) { next(err); }
};

exports.getFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (!facility) return res.status(404).json({ success: false, message: 'Facility not found' });
    res.json({ success: true, facility });
  } catch (err) { next(err); }
};

exports.updateFacility = async (req, res, next) => {
  try {
    const { name, description, capacity, pricePerHour, location, sportType, images, available } = req.body;
    await Facility.update(
      { name, description, capacity, pricePerHour, location, sportType, images, available },
      { where: { id: req.params.id } }
    );
    const facility = await Facility.findByPk(req.params.id);
    res.json({ success: true, facility });
  } catch (err) { next(err); }
};

exports.deleteFacility = async (req, res, next) => {
  try {
    await Facility.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Facility deleted' });
  } catch (err) { next(err); }
};

exports.getAvailableSlots = async (req, res, next) => {
  try {
    const { date, facilityId } = req.query;
    const facility = await Facility.findByPk(facilityId);
    if (!facility) return res.status(404).json({ success: false, message: 'Facility not found' });

    const reservations = await Reservation.findAll({
      where: {
        facilityId,
        date,
        status: { [Op.in]: ['approved', 'pending'] }
      }
    });

    const allSlots = [];
    for (let h = 8; h < 22; h++) {
      const start = `${h.toString().padStart(2, '0')}:00`;
      const end = `${(h + 1).toString().padStart(2, '0')}:00`;
      const booked = reservations.some(r => r.startTime === start || r.endTime === end);
      allSlots.push({ start, end, available: !booked });
    }
    res.json({ success: true, slots: allSlots, facility });
  } catch (err) { next(err); }
};
