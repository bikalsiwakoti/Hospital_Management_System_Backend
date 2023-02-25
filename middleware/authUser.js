const jwt = require("jsonwebtoken");
const User = require("../models/User");


module.exports.verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.login_token;
    if (!token) return res.status(401).send("You need to login first")
    jwt.verify(token, "secretkey", async (err, data) => {
      if (err) return res.status(404).json({ status: false, message: "Token not valid" });
      const id = data.userId;
      const userData = await User.findOne({ where: { id: id } })
      req.user = userData.dataValues;
      next();
    })
  } catch (error) {
    res.status(500).json("You are not authorized")
  }
}

module.exports.verifyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.login_token;
    if (!token) return res.status(401).send("You need to login first")
    jwt.verify(token, "secretkey", async (err, data) => {
      if (err) return res.status(404).json({ status: false, message: "Token not valid" });
      const id = data.userId;
      const userData = await User.findOne({ where: { id: id } })
      if (userData.dataValues.role === "admin") {
        req.user = userData.dataValues;
        next();
      } else {
        res.status(400).json("You are not authorized")
      }
    })
  } catch (error) {
    res.status(500).json("You are not authorized")
  }
}

module.exports.verifyStaff = async (req, res, next) => {
  try {
    const token = req.cookies.login_token;
    if (!token) return res.status(401).send("You need to login first")
    jwt.verify(token, "secretkey", async (err, data) => {
      if (err) return res.status(404).json({ status: false, message: "Token not valid" });
      const id = data.userId;
      const userData = await User.findOne({ where: { id: id } })
      if (userData.dataValues.role === "staff") {
        req.user = userData.dataValues;
        next();
      } else {
        res.status(400).json("You are not authorized")
      }
    })
  } catch (error) {
    res.status(500).json("You are not authorized")
  }
}

module.exports.verifyDoctor = async (req, res, next) => {
  try {
    const token = req.cookies.login_token;
    if (!token) return res.status(401).send("You need to login first")
    jwt.verify(token, "secretkey", async (err, data) => {
      if (err) return res.status(404).json({ status: false, message: "Token not valid" });
      const id = data.userId;
      const userData = await User.findOne({ where: { id: id } })
      if (userData.dataValues.role === "doctor") {
        req.user = userData.dataValues;
        next();
      } else {
        res.status(400).json("You are not authorized")
      }
    })
  } catch (error) {
    res.status(500).json("You are not authorized")
  }
}