const { DataTypes } = require('sequelize');
const db = require("../dbConn/conn")

const Order = db.define('order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  delivered: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Products: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Order;

