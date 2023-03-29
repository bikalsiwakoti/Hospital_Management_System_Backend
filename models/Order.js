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
    defaultValue: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address2: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order_payment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  products: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  }  
})

module.exports = Order;

