const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Facility = sequelize.define('Facility', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  capacity: { type: DataTypes.INTEGER },
  pricePerHour: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  location: { type: DataTypes.STRING },
  sportType: { type: DataTypes.STRING },
  images: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  available: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true });

module.exports = Facility;
