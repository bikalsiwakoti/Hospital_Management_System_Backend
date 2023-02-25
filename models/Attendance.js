const { DataTypes } = require('sequelize');
const db = require("../dbConn/conn")

const Attendance = db.define('attendance', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dates: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  timestamps: false
})

module.exports = Attendance;

