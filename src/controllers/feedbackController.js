const { Feedback, User } = require('../models');

exports.createFeedback = async (req, res, next) => {
  try {
    const { name, email, message, rating } = req.body;
    const feedback = await Feedback.create({
      name, email, message, rating,
      userId: req.user ? req.user.id : null
    });
    res.status(201).json({ success: true, feedback });
  } catch (err) { next(err); }
};

exports.getAllFeedback = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, feedbacks });
  } catch (err) { next(err); }
};

exports.deleteFeedback = async (req, res, next) => {
  try {
    await Feedback.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Feedback deleted' });
  } catch (err) { next(err); }
};
