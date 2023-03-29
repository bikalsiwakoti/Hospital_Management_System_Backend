const Cart = require("../models/Cart")
const Admin = require("../models/Admin")

const insert = async (req, res) => {
  try {
    console.log(req.user.id)
    await Cart.create({ ...req.body, userId: req.user.id })
    res.status(200).send("Successfully Added To A Cart")

  } catch (error) {
    res.status(500).send("Product Post failed" + error)
  }
}

const getAll = async (req, res) => {
  try {
    const data = await Cart.findAll({where: {userId: req.user.id}})
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getOne = async (req, res) => {
  try {
    const data = await Cart.findOne({ where: { id: req.params.id } })
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}
const deleteOne = async (req, res) => {
  try {
    await Cart.destroy({ where: { id: req.params.id } })
    res.status(200).send("Successfully deleted")

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteAll = async (req, res) => {
  try {
    await Cart.destroy({ where: { userId: req.user.id } })
    res.status(200).send("Successfully deleted")

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const updateOne = async (req, res) => {
  try {
    await Cart.update({quantity: req.body.quantity, total_price: req.body.total_price}, { where: { id: req.params.id } })
    res.status(200).send("Successfully updated")

  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = {
  insert,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  deleteAll
}