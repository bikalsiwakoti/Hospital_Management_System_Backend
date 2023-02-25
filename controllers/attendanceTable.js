const Attendance = require("../models/Attendance")

const insert = async (req, res) => {
  try {
    const img = req.file.filename
    const staffId = req.user.id;
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
    const data = await Attendance.findOne({ where: { id: req.params.id } })
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
}