const Attendance = require("../models/Attendance")
const Staff = require("../models/Staff")

const insert = async (req, res) => {
  try {
    const userId = req.user.id;
    const staffDetails = await Staff.findOne({where: {userId}})
    const staffId = staffDetails.id
    const data = await Attendance.create({ ...req.body, staffId })
    res.status(200).send("Successfully posted")

  } catch (error) {
    res.status(500).send("Attendance Failed" + error)
  }
}

const getAll = async (req, res) => {
  try {
    const data = await Attendance.findAll()
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getOne = async (req, res) => {
  try {
    const userId = req.user.id;
    const staffDetails = await Staff.findOne({where: {userId}})
    const staffId = staffDetails.id
    const data = await Attendance.findAll({ where: { staffId } })
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getOnebyid = async (req, res) => {
  try {
    const userId = req.params.id;
    const staffDetails = await Staff.findOne({where: {userId}})
    const staffId = staffDetails.id
    const data = await Attendance.findAll({ where: { staffId } })
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}
const deleteOne = async (req, res) => {
  try {
    const data = await Attendance.destroy({ where: { id: req.params.id } })
    res.status(200).send("Success fully deleted")

  } catch (error) {
    res.status(500).send(error.message)
  }
}


module.exports = {
  insert,
  getAll,
  getOne,
  getOnebyid
}