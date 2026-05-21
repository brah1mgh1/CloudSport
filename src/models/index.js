const User = require('./User');
const Club = require('./Club');
const Group = require('./Group');
const Facility = require('./Facility');
const Reservation = require('./Reservation');
const Notification = require('./Notification');
const Subscription = require('./Subscription');
const Event = require('./Event');
const Feedback = require('./Feedback');
const Product = require('./Product');
const Order = require('./Order');
const Offer = require('./Offer');

User.belongsTo(Club, { foreignKey: 'clubId' });
Club.hasMany(User, { foreignKey: 'clubId' });
Club.belongsTo(User, { as: 'leader', foreignKey: 'leaderId' });

Group.belongsTo(Club, { foreignKey: 'clubId' });
Club.hasMany(Group, { foreignKey: 'clubId' });
Group.belongsTo(User, { as: 'createdBy', foreignKey: 'createdById' });

Reservation.belongsTo(Facility, { foreignKey: 'facilityId' });
Facility.hasMany(Reservation, { foreignKey: 'facilityId' });
Reservation.belongsTo(Group, { foreignKey: 'groupId' });
Group.hasMany(Reservation, { foreignKey: 'groupId' });
Reservation.belongsTo(User, { as: 'leader', foreignKey: 'leaderId' });

Subscription.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Subscription, { foreignKey: 'userId' });
Subscription.belongsTo(Group, { foreignKey: 'groupId' });
Group.hasMany(Subscription, { foreignKey: 'groupId' });

Notification.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Notification, { foreignKey: 'userId' });

Event.belongsTo(Club, { as: 'club1', foreignKey: 'club1Id' });
Event.belongsTo(Club, { as: 'club2', foreignKey: 'club2Id' });
Event.belongsTo(User, { as: 'createdBy', foreignKey: 'createdById' });

Feedback.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Feedback, { foreignKey: 'userId' });

Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Order, { foreignKey: 'productId' });

module.exports = {
  User, Club, Group, Facility, Reservation,
  Notification, Subscription, Event, Feedback, Product, Order, Offer
};
