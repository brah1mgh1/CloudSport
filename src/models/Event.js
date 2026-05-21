const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.TIME },
  location: { type: DataTypes.STRING },
  type: { type: DataTypes.ENUM('competition', 'tournament', 'friendly'), defaultValue: 'competition' },
  status: { type: DataTypes.ENUM('scheduled', 'ongoing', 'completed', 'cancelled'), defaultValue: 'scheduled' },
  club1Id: { type: DataTypes.INTEGER, allowNull: false },
  club2Id: { type: DataTypes.INTEGER, allowNull: false },
  winnerId: { type: DataTypes.INTEGER },
  createdById: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

module.exports = Event;
