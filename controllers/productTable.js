const Product = require("../models/Product")

const insert = async (req, res) => {
  try {
    const img = req.file.filename
    const adminId = req.user.id;
    const data = await Product.create({ ...req.body, img: img, adminId })
    res.status(200).send("Successfully posted")

  } catch (error) {
    res.status(500).send("Product Post failed" + error)
  }
}

const getAll = async (req, res) => {
  try {
    const data = await Product.findAll()
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getOne = async (req, res) => {
  try {
    const data = await Product.findOne({ where: { id: req.params.id } })
    res.status(200).send(data)

  } catch (error) {
    res.status(500).send(error.message)
  }
}
const deleteOne = async (req, res) => {
  try {
    const data = await Product.destroy({ where: { id: req.params.id } })
    res.status(200).send("Success fully deleted")

  } catch (error) {
    res.status(500).send(error.message)
  }
}

const updateOne = async (req, res) => {
  try {
    const data = await Product.update(req.body, { where: { id: req.params.id } })
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
  updateOne
}