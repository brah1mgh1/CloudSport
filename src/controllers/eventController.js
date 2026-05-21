const { Event, Club, User, Notification } = require('../models');

exports.createEvent = async (req, res, next) => {
  try {
    const { name, description, date, time, location, type, club1Id, club2Id } = req.body;
    const event = await Event.create({
      name, description, date, time, location, type,
      club1Id, club2Id, createdById: req.user.id
    });

    const members1 = await User.findAll({ where: { clubId: club1Id } });
    const members2 = await User.findAll({ where: { clubId: club2Id } });
    const allUsers = [...members1, ...members2].filter((v, i, a) => a.findIndex(u => u.id === v.id) === i);
    for (const u of allUsers) {
      await Notification.create({
        userId: u.id,
        title: 'New Event',
        message: `New event: ${name} on ${date}`,
        type: 'event',
        relatedId: event.id
      });
    }
    res.status(201).json({ success: true, event });
  } catch (err) { next(err); }
};

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: [
        { model: Club, as: 'club1' },
        { model: Club, as: 'club2' }
      ],
      order: [['date', 'ASC']]
    });
    res.json({ success: true, events });
  } catch (err) { next(err); }
};

exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [{ model: Club, as: 'club1' }, { model: Club, as: 'club2' }]
    });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event });
  } catch (err) { next(err); }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const { name, description, date, time, location, type, status, winnerId } = req.body;
    await Event.update({ name, description, date, time, location, type, status, winnerId }, { where: { id: req.params.id } });
    const event = await Event.findByPk(req.params.id);
    res.json({ success: true, event });
  } catch (err) { next(err); }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    await Event.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) { next(err); }
};
