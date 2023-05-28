const { DataTypes } = require('sequelize');
const db = require("../dbConn/conn")

const Cart = db.define('cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  }

})

module.exports = Cart;

