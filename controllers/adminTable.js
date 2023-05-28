const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');


const insert = async (req, res) => {
    const { username, email, password, confirm_password, first_name, last_name, gender} = req.body;
    try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const confirmHashPassword = await bcrypt.hash(confirm_password, salt);

            const userData = await User.create({ username, email, password: hashPassword, confirm_password: confirmHashPassword, first_name, last_name });
            const data = await Admin.create({ gender, userId:userData.id });
            // console.log(data.dataValues)
            userData.role = 'admin'
            await userData.save(); 
            res.status(200).send('Successfully Signed Up')
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
                    maxAge: 25920000000
                }).status(200).send({ status: true, username: data.dataValues.username, role: data.dataValues.role })
            } else {
                return res.status(400).send('Incorrect Credentials')
            }
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    insert,
    find
}