const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');
const User = require('../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const insert = async (req, res) => {
    const { username, email, password, confirm_password, full_name, gender, phone_number, age, address, position, desc } = req.body;
    try {
        if (password === confirm_password) {

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const confirmHashPassword = await bcrypt.hash(confirm_password, salt);
            const userData = await User.create({ username, email, password: hashPassword, confirm_password: confirmHashPassword });
            const staffData = await Staff.create({ gender, phone_number, age, address, position, userId: userData.id, desc, full_name });
            // console.log(data.dataValues)
            userData.role = 'staff'
            await userData.save();
            res.status(200).send({ id: userData.id })
        } else {
            return res.status(404).send("password did not match");
        }
    } catch (error) {
        res.status(500).send(error.errors[0].message);
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
        const {name} = req.query;
        const data = await User.findAll({
            include: {
                model: Staff,
                where: {
                    [Op.or]: [
                        { full_name: { [Op.iLike]: `%${name}%` } },
                        { phone_number: { [Op.iLike]: `%${name}%` } },
                        { position: { [Op.iLike]: `%${name}%` } }
                      ]
                }
            }
        })
        const doctorData = data.filter(doctor => doctor.role === 'staff')
        res.status(200).send(doctorData)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}


const deleteOne = async (req, res) => {
    try {
        User.destroy({ where: { id: req.params.id } })
        await Staff.destroy({ where: { userId: req.params.id } })
        res.status(200).send('Successfully deleted')
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        // const { username, email, password } = req.body;
        await User.update(req.body, { where: { id: id } })
        await Staff.update(req.body, { where: { userId: id } })
        res.status(200).send("Successfully updated user")
    } catch (error) {
        res.status(500).send(error)
    }
}

const findOne = async (req, res) => {
    try {
        const id = req.params.id
        const data = await User.findOne({ where: { id: id }, include: Staff })
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    insert,
    find,
    getAll,
    deleteOne,
    update,
    findOne
}