const dotenv = require("dotenv")
dotenv.config()

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_Name, process.env.DB_User, process.env.DB_Pwd, {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch((error) => {
  console.error('Unable to connect to the database:', error)
})

sequelize.sync({ alter: true }).then(() => console.log("modules are syncronized"))
.catch((error) => console.log(error));

module.exports = sequelize;