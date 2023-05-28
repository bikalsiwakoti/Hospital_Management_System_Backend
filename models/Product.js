const { DataTypes } = require('sequelize');
const db = require("../dbConn/conn")

const Product = db.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Product;

