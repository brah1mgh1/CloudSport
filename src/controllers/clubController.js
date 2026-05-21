const { Club, User, Group } = require('../models');

exports.createClub = async (req, res, next) => {
  try {
    const { name, description, sportType, leaderId } = req.body;
    const club = await Club.create({ name, description, sportType, leaderId });
    if (leaderId) await User.update({ clubId: club.id }, { where: { id: leaderId } });
    res.status(201).json({ success: true, club });
  } catch (err) { next(err); }
};

exports.getAllClubs = async (req, res, next) => {
  try {
    const clubs = await Club.findAll({ include: [{ model: User }, { model: Group }] });
    res.json({ success: true, clubs });
  } catch (err) { next(err); }
};

exports.getClub = async (req, res, next) => {
  try {
    const club = await Club.findByPk(req.params.id, {
      include: [{ model: User, attributes: { exclude: ['password'] } }, { model: Group }]
    });
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    res.json({ success: true, club });
  } catch (err) { next(err); }
};

exports.updateClub = async (req, res, next) => {
  try {
    const { name, description, sportType, leaderId } = req.body;
    await Club.update({ name, description, sportType, leaderId }, { where: { id: req.params.id } });
    if (leaderId) await User.update({ clubId: req.params.id }, { where: { id: leaderId } });
    const club = await Club.findByPk(req.params.id);
    res.json({ success: true, club });
  } catch (err) { next(err); }
};

exports.deleteClub = async (req, res, next) => {
  try {
    await Club.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Club deleted' });
  } catch (err) { next(err); }
};
