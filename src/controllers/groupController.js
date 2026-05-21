const { Group, User, Subscription, Club, Notification } = require('../models');

exports.createGroup = async (req, res, next) => {
  try {
    const { name, description, clubId } = req.body;
    const club = await Club.findByPk(clubId);
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    const group = await Group.create({ name, description, clubId });
    res.status(201).json({ success: true, group });
  } catch (err) { next(err); }
};

exports.getClubGroups = async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      where: { clubId: req.params.clubId },
      include: [{ model: Subscription, include: [{ model: User, attributes: { exclude: ['password'] } }] }]
    });
    res.json({ success: true, groups });
  } catch (err) { next(err); }
};

exports.getGroup = async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id, {
      include: [{ model: Subscription, include: [{ model: User, attributes: { exclude: ['password'] } }] }]
    });
    if (!group) return res.status(404).json({ success: false, message: 'Group not found' });
    res.json({ success: true, group });
  } catch (err) { next(err); }
};

exports.updateGroup = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    await Group.update({ name, description }, { where: { id: req.params.id } });
    const group = await Group.findByPk(req.params.id);
    res.json({ success: true, group });
  } catch (err) { next(err); }
};

exports.deleteGroup = async (req, res, next) => {
  try {
    await Group.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Group deleted' });
  } catch (err) { next(err); }
};

exports.requestJoin = async (req, res, next) => {
  try {
    const { groupId } = req.body;
    const existing = await Subscription.findOne({ where: { userId: req.user.id, groupId } });
    if (existing) return res.status(400).json({ success: false, message: 'Request already exists' });
    const sub = await Subscription.create({ userId: req.user.id, groupId, status: 'pending' });
    const group = await Group.findByPk(groupId, { include: [{ model: Club }] });
    const club = await Club.findByPk(group.clubId);
    if (club && club.leaderId) {
      await Notification.create({
        userId: club.leaderId,
        title: 'Join Request',
        message: `${req.user.name} wants to join ${group.name}`,
        type: 'group',
        relatedId: sub.id
      });
    }
    res.status(201).json({ success: true, subscription: sub });
  } catch (err) { next(err); }
};

exports.approveJoin = async (req, res, next) => {
  try {
    const sub = await Subscription.findByPk(req.params.id, { include: [{ model: User }, { model: Group }] });
    if (!sub) return res.status(404).json({ success: false, message: 'Subscription not found' });
    sub.status = 'approved';
    await sub.save();
    await Notification.create({
      userId: sub.userId,
      title: 'Request Approved',
      message: `Your request to join ${sub.Group.name} has been approved`,
      type: 'group',
      relatedId: sub.id
    });
    res.json({ success: true, subscription: sub });
  } catch (err) { next(err); }
};

exports.rejectJoin = async (req, res, next) => {
  try {
    const sub = await Subscription.findByPk(req.params.id, { include: [{ model: User }, { model: Group }] });
    if (!sub) return res.status(404).json({ success: false, message: 'Subscription not found' });
    sub.status = 'rejected';
    await sub.save();
    await Notification.create({
      userId: sub.userId,
      title: 'Request Rejected',
      message: `Your request to join ${sub.Group.name} has been rejected`,
      type: 'group',
      relatedId: sub.id
    });
    res.json({ success: true, subscription: sub });
  } catch (err) { next(err); }
};

exports.leaveGroup = async (req, res, next) => {
  try {
    const sub = await Subscription.findOne({
      where: { userId: req.user.id, groupId: req.params.groupId, status: 'approved' }
    });
    if (!sub) return res.status(404).json({ success: false, message: 'Not a member' });
    await sub.destroy();
    res.json({ success: true, message: 'Left group' });
  } catch (err) { next(err); }
};

exports.getMyGroups = async (req, res, next) => {
  try {
    const subs = await Subscription.findAll({
      where: { userId: req.user.id, status: 'approved' },
      include: [{ model: Group, include: [{ model: Club }] }]
    });
    res.json({ success: true, groups: subs.map(s => s.Group) });
  } catch (err) { next(err); }
};

exports.getPendingRequests = async (req, res, next) => {
  try {
    const clubs = await Club.findAll({ where: { leaderId: req.user.id } });
    const clubIds = clubs.map(c => c.id);
    const groups = await Group.findAll({ where: { clubId: clubIds } });
    const groupIds = groups.map(g => g.id);
    const requests = await Subscription.findAll({
      where: { groupId: groupIds, status: 'pending' },
      include: [{ model: User, attributes: { exclude: ['password'] } }, { model: Group }]
    });
    res.json({ success: true, requests });
  } catch (err) { next(err); }
};
