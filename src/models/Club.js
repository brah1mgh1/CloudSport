const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Club = sequelize.define('Club', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  logo: { type: DataTypes.STRING },
  sportType: { type: DataTypes.STRING },
  leaderId: { type: DataTypes.INTEGER }
}, { timestamps: true });

module.exports = Club;
