const {DataTypes } = require('sequelize');
const db = require("../dbConn/conn")

const Patient = db.define('patient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey: true,
  },
  desc:{
    type: DataTypes.STRING,
  },
  gender:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  diseases:{
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Patient;

