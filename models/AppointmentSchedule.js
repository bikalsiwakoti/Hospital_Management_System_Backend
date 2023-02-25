const {DataTypes } = require('sequelize');
const db = require("../dbConn/conn")

const AppointmentSchedule = db.define('appointmentSchedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey: true,
  },
  dateTime:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  paymentStatus:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  totalAmount:{
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = AppointmentSchedule;

