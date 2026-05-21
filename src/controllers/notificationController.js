const { Notification } = require('../models');

exports.getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, notifications });
  } catch (err) { next(err); }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    if (notification.userId !== req.user.id) return res.status(403).json({ success: false, message: 'Forbidden' });
    notification.read = true;
    await notification.save();
    res.json({ success: true, notification });
  } catch (err) { next(err); }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.update({ read: true }, { where: { userId: req.user.id, read: false } });
    res.json({ success: true, message: 'All marked as read' });
  } catch (err) { next(err); }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: 'Not found' });
    if (notification.userId !== req.user.id) return res.status(403).json({ success: false, message: 'Forbidden' });
    await notification.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};

exports.getUnreadCount = async (req, res, next) => {
  try {
    const count = await Notification.count({ where: { userId: req.user.id, read: false } });
    res.json({ success: true, count });
  } catch (err) { next(err); }
};
