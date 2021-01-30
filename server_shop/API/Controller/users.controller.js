
const Users = require('../../Model/users.model')

module.exports.index = async (req, res) => {

    const users = await Users.find()

    res.json(users)

}

module.exports.detail = async (req, res) => {

    const id = req.params.id

    const users = await Users.findOne({ _id: id})

    res.json(users)

}

module.exports.signup = async (req, res) => {

    const fullname = req.query.fullname

    const email = req.query.email

    const password = req.query.password

    const phone = req.query.phone

    const data = {
        fullname: fullname,
        email: email,
        password: password,
        phone: phone,
    }

    Users.insertMany(data)

    res.send("Thanh Cong")

}