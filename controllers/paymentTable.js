const Payment = require("../models/Payment")

const insert = async (req, res) => {
  try {
    console.log(req.body)
    const data = await Payment.create({...req.body})
    res.status(200).send("Payment Success")
  } catch (error) {
    res.status(500).send("Product Post failed" + error)
  }
}

const getAll = async (req, res) => {
  try {
    const data = await Payment.findAll()
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

// const getOne = async (req, res) => {
//   try {
//     const data = await Payment.findOne({ where: { id: req.params.id } })
//     res.status(200).send(data)

//   } catch (error) {
//     res.status(500).send(error.message)
//   }
// }
// const deleteOne = async (req, res) => {
//   try {
//     await Payment.destroy({ where: { id: req.params.id } })
//     res.status(200).send("Successfully deleted")

//   } catch (error) {
//     res.status(500).send(error.message)
//   }
// }

// const updateOne = async (req, res) => {
//   try {
//     await Payment.update({quantity: req.body.quantity, total_price: req.body.total_price}, { where: { id: req.params.id } })
//     res.status(200).send("Successfully updated")

//   } catch (error) {
//     res.status(500).send(error.message)
//   }
// }

module.exports = {
  insert,
  getAll,
  // getOne,
  // deleteOne,
  // updateOne
}