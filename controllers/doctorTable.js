const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const nodemailer = require("nodemailer");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const insert = async (req, res) => {
    const { username, email, password, confirm_password, gender, phone_number, age, address, specialist, desc, fullname, price } = req.body;
    const img = req.file.filename
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const confirmHashPassword = await bcrypt.hash(confirm_password, salt);
        const userData = await User.create({ username, email, password: hashPassword, confirm_password: confirmHashPassword });
        await Doctor.create({ gender, phone_number, age, address, specialist, userId: userData.id, desc, fullname, img: img, price });
        // console.log(data.dataValues)
        userData.role = 'doctor'
        await userData.save();
        res.status(200).send({ id: userData.id })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const find = async (req, res) => {
    try {
        const { username } = req.body;
        const data = await User.findOne({ where: { username: username } })
        if (data === null) res.status(400).send({ status: false, message: "Incorrect username and password" })
        else {
            const comparePassword = await bcrypt.compare(req.body.password, data.dataValues.password);
            const token = jwt.sign(
                { userId: data.dataValues.id },
                "secretkey"
            );
            if (comparePassword) {
                return res.cookie('login_token', token, {
                    httpOnly: true,
                }).status(200).send({ status: true, username: data.dataValues.username, role: data.dataValues.role })
            } else {
                return res.status(400).send('Incorrect Credentials')
            }
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getAll = async (req, res) => {
    try {
        const { name } = req.query;
        const data = await User.findAll({
            include: {
                model: Doctor,
                where: {
                    fullname: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            }
        });
        const doctorData = data.filter(doctor => doctor.role === 'doctor')
        res.status(200).send(doctorData)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

const getOne = async (req, res) => {
    try {
        const data = await User.findAll({ where: { id: req.params.id }, include: Doctor })
        res.status(200).send(data)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteOne = async (req, res) => {
    try {
        User.destroy({ where: { id: req.params.id } })
        await Doctor.destroy({ where: { userId: req.params.id } })
        res.status(200).send('Successfully deleted')
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

const sendMail = async (req, res) => {
    try {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'bikalsiwakoti21@gmail.com',
                pass: 'kffhxhrmafqhuguv'
            },
        });

        let info = await transporter.sendMail({
            from: '"MedCare" <bikalsiwakoti21@gmail.com>', // sender address
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.text,
            html: req.body.text,
        });

        res.status(200).send('Successfully Send Mail')
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

const updateOne = async (req, res) => {
    try {
        console.log(req.file)
        if (req.file === undefined) {
            const data = await User.update({ ...req.body }, { where: { id: req.params.id } })
            const doctorData = await Doctor.update({ ...req.body }, { where: { userId: req.params.id } })
            res.status(200).send("Successfully updated")

        } else {
            const data = await User.update({ ...req.body }, { where: { id: req.params.id } })
            const doctorData = await Doctor.update({ ...req.body, img: req.file.filename }, { where: { userId: req.params.id } })
            res.status(200).send("Successfully updated")
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    insert,
    find,
    getAll,
    deleteOne,
    getOne,
    sendMail,
    updateOne
}