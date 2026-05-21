const { Offer } = require('../models');

exports.createOffer = async (req, res, next) => {
  try {
    const { title, description, discountPercentage, validFrom, validUntil } = req.body;
    const offer = await Offer.create({ title, description, discountPercentage, validFrom, validUntil });
    res.status(201).json({ success: true, offer });
  } catch (err) { next(err); }
};

exports.getAllOffers = async (req, res, next) => {
  try {
    const offers = await Offer.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, offers });
  } catch (err) { next(err); }
};

exports.getActiveOffers = async (req, res, next) => {
  try {
    const offers = await Offer.findAll({
      where: { active: true },
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, offers });
  } catch (err) { next(err); }
};

exports.updateOffer = async (req, res, next) => {
  try {
    const { title, description, discountPercentage, validFrom, validUntil, active } = req.body;
    await Offer.update({ title, description, discountPercentage, validFrom, validUntil, active }, { where: { id: req.params.id } });
    const offer = await Offer.findByPk(req.params.id);
    res.json({ success: true, offer });
  } catch (err) { next(err); }
};

exports.deleteOffer = async (req, res, next) => {
  try {
    await Offer.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Offer deleted' });
  } catch (err) { next(err); }
};
