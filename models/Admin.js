const {DataTypes } = require('sequelize');
const db = require("../dbConn/conn")

const Admin = db.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey: true,
  },
  gender:{
    type: DataTypes.STRING,
  }
},
{timestamps: false})

module.exports = Admin;

