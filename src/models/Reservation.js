const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Reservation = sequelize.define('Reservation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  facilityId: { type: DataTypes.INTEGER, allowNull: false },
  groupId: { type: DataTypes.INTEGER },
  leaderId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  startTime: { type: DataTypes.TIME, allowNull: false },
  endTime: { type: DataTypes.TIME, allowNull: false },
  purpose: { type: DataTypes.STRING },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'denied', 'cancelled', 'change_requested'),
    defaultValue: 'pending'
  },
  adminNote: { type: DataTypes.TEXT },
  paymentStatus: { type: DataTypes.ENUM('unpaid', 'paid', 'refunded'), defaultValue: 'unpaid' },
  paymentId: { type: DataTypes.STRING },
  amount: { type: DataTypes.DECIMAL(10, 2) }
}, { timestamps: true });

module.exports = Reservation;
