const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


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
    const { name } = req.query
    const data = await Patient.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${name}%` } },
          { lastName: { [Op.iLike]: `%${name}%` } },
          { lastName: { [Op.iLike]: `%${name}%` } }
        ]
      }
    })
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