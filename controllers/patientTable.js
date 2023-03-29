const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')

const addDetails = async (req, res) => {
  try {
    const doctorId = req.body.doctorId;
    const userId = req.user.id;
    await Patient.create({ ...req.body, userId: userId, doctorId: doctorId })
    res.status(200).send("Successfully Submitted Details")

  } catch (error) {
    res.status(500).send(error)
  }
}

const getDetailsByDoctor = async (req, res) => {
  try {
    const data = await Patient.findAll({})
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}


const getOnePatient = async (req, res) => {
  try {
    const data = await Patient.findOne({where: {id: req.params.id}})
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getOneDoctor = async (req, res) => {
  try {
    const data = await Doctor.findOne({where: {id: req.params.id}})
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}



module.exports = {
  addDetails,
  getDetailsByDoctor,
  getOnePatient,
  getOneDoctor
}