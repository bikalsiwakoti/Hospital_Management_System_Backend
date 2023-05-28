const {DataTypes } = require('sequelize');
const db = require("../dbConn/conn")

const Doctor = db.define('doctor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey: true,
  },
  phone_number:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  desc:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  gender:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  address:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialist:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullname:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Doctor;

