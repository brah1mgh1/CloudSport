const { Subscription, Group, User, Club } = require('../models');

exports.getMySubscriptions = async (req, res, next) => {
  try {
    const subs = await Subscription.findAll({
      where: { userId: req.user.id },
      include: [{ model: Group, include: [{ model: Club }] }]
    });
    res.json({ success: true, subscriptions: subs });
  } catch (err) { next(err); }
};

exports.getAllSubscriptions = async (req, res, next) => {
  try {
    const subs = await Subscription.findAll({
      include: [{ model: User, attributes: { exclude: ['password'] } }, { model: Group }]
    });
    res.json({ success: true, subscriptions: subs });
  } catch (err) { next(err); }
};
