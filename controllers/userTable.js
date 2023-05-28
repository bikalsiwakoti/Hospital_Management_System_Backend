const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const insert = async (req, res) => {
    const { username, email, password, confirm_password, first_name, last_name } = req.body;
    try {
        if (password === confirm_password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const confirmHashPassword = await bcrypt.hash(confirm_password, salt);
            const data = await User.create({ username, email, password: hashPassword, confirm_password: confirmHashPassword, first_name, last_name });
            // console.log(data.dataValues)
            // data.role = 'admin'
            // await data.save();
            res.status(200).send({id: data.id})
        }
        else {
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
                    maxAge: 25920000000
                }).status(200).send({ status: true, username: data.dataValues.username, role: data.dataValues.role })
            } else {
                return res.status(400).send({status: false, message: "Incorrect username and password"})
            }
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getAll = async (req, res) => {
    try {
        const data = await User.findAll({where: {role: 'user'}})
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send(error.message)
    }

}
const userLength = async (req, res) => {
    try {
        const data = await User.findAll({where: {role: 'user'}})
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }

}



const findOne = async (req, res) => {
    try {
        const data = await User.findOne({where: {id: req.params.id}})
        res.status(200).send(data)

    } catch (error) {
        res.status(500).send(error.message)
    }

}


const update = async (req, res) => {
    try {
        const id = req.params.id;
        // const { username, email, password } = req.body;
        await User.update(req.body, { where: { id: id } })
        res.status(200).send("Successfully updated user")
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        try {
            const userRes = await User.findOne({ where: { id: id } })
            if(userRes !== null){
                await User.destroy({ where: { id: id } })
                res.status(200).send(userRes);
            }else{
                res.status(404).send('Not valid User');
            }

        } catch (error) {
            res.status(500).send(error)
        }
    } catch (error) {
        res.status(500).send("You are not allowed to delete this user")
    }
}

module.exports = {
    insert,
    find,
    getAll,
    update,
    deleteUser,
    findOne,
    userLength
}