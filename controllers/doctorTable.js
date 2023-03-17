const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const User = require('../models/User');


const insert = async (req, res) => {
    const { username, email, password, confirm_password, gender, phone_number, age, address, specialist, desc, fullname} = req.body;
    const img = req.file.filename
    try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const confirmHashPassword = await bcrypt.hash(confirm_password, salt);
            const userData = await User.create({ username, email, password: hashPassword, confirm_password: confirmHashPassword});
            await Doctor.create({ gender,phone_number, age, address, specialist, userId:userData.id, desc, fullname,  img: img });
            // console.log(data.dataValues)
            userData.role = 'doctor'
            await userData.save(); 
            res.status(200).send({id: userData.id})
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
        const data = await User.findAll({include: Doctor})
        const doctorData = data.filter(doctor=> doctor.role === 'doctor')
        res.status(200).send(doctorData)
        }
     catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteOne = async (req, res) => {
    try {
        User.destroy({where: {id: req.params.id}})
        await Doctor.destroy({where: {userId: req.params.id}})
        res.status(200).send('Successfully deleted')
        }
     catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    insert,
    find,
    getAll,
    deleteOne
}