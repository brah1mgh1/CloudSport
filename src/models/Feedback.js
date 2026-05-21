const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Feedback = sequelize.define('Feedback', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } }
}, { timestamps: true });

module.exports = Feedback;
