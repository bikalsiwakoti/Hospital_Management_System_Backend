const Patient = require('../models/Patient')

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
    const data = await Patient.findAll({where:{doctorId: req.user.id}})
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}




module.exports = {
  addDetails,
  getDetailsByDoctor
}