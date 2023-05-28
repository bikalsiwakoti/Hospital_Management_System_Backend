const Order = require("../models/Order")
const Payment = require("../models/Payment")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const insert = async (req, res) => {
  try {
    console.log(req.body)
    const data = await Order.create({ ...req.body, status: 'Pending', userId: req.user.id })
    res.status(200).send({ id: data.id })
  } catch (error) {
    res.status(500).send("Product Post failed" + error)
  }
}

const getAllOfOneUser = async (req, res) => {
  try {
    const data = await Order.findAll({ where: { userId: req.user.id } })
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getAll = async (req, res) => {
  try {
    const {name} = req.query;
    const data = await Order.findAll({
      include: Payment, where: {
          [Op.or]: [
            { firstname: { [Op.iLike]: `%${name}%` } },
            { lastname: { [Op.iLike]: `%${name}%` } },
            { phonenumber: { [Op.iLike]: `%${name}%` } }
          ]
      }
    })
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getOne = async (req, res) => {
  try {
    const data = await Order.findOne({ where: { id: req.params.id }, include: Payment })
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}
const deleteOne = async (req, res) => {
  try {
    await Order.destroy({ where: { id: req.params.id } })
    res.status(200).send("Successfully deleted")

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const updateOne = async (req, res) => {
  try {
    await Order.update({ status: req.body.status }, { where: { id: req.params.id } })
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
  getAllOfOneUser
}