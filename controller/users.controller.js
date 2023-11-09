const User = require('../models/user.model');
const generateJWTtoken = require('../utils/generateJWTtoken');
const httpStatusText = require("../utils/httpStatusText")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
require('dotenv').config()


const getAllUsers = async (req, res) => {
    const query = req.query

    const limit = query.limit || 4
    const page = query.page || 1
    const skip = (page - 1) * limit

    const users = await User.find({}, { "__v": false, password: false }).limit(limit).skip(skip)
    res.json({ status: httpStatusText.SUCCESS, data: users })
}
const register = async (req, res) => {
    // const errors=validationResult(req)

    // if (!errors.isEmpty()) {
    //     return res.status(404).json({status:httpStatusText.FAIL,data :errors.array()})
    // }
    // console.log(req.body);
    const { firstname, lastname, email, password, role } = req.body

    const olduser = await User.findOne({ email: email })

    if (olduser) {
        return res.status(400).json({ status: httpStatusText.FAIL, msg: "user already exists" })
    }

    const hashedpassword = await bcrypt.hash(password, 10)

    const newuser = new User({
        firstname,
        lastname,
        email,
        password: hashedpassword,
        role,
        avatar: req.file.filename

    })

    const token = await generateJWTtoken({ email: newuser.email, id: newuser.id, role: newuser.role })
    newuser.token = token
    await newuser.save()

    res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newuser } })
}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email && !password) {
        return res.json({ status: httpStatusText.FAIL, msg: "this users is not exists" })
    }

    const user = await User.findOne({ email: email })
    // console.log(user)
    const matchedPassword = await bcrypt.compare(password, user.password)
    // console.log(matchedPassword)

    if (user && matchedPassword) {
        const token = await generateJWTtoken({ email: user.email, id: user.id, role: user.role })

        res.status(200).json({ status: httpStatusText.SUCCESS, data: { user: { token } } })

    } else {
        return res.status(500).json({ status: httpStatusText.ERROR, msg: "something is wrong with" })
    }
}


module.exports = {
    getAllUsers,
    register,
    login
}