const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Offer = sequelize.define('Offer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  discountPercentage: { type: DataTypes.INTEGER },
  validFrom: { type: DataTypes.DATEONLY },
  validUntil: { type: DataTypes.DATEONLY },
  active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true });

module.exports = Offer;
