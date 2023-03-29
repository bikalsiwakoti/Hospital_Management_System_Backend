const {DataTypes } = require('sequelize');
const db = require("../dbConn/conn")

const Patient = db.define('patient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey: true,
  },
  address:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfAppointment:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  guardian:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  healthIssue:{
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Patient;

