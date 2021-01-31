const Messenger = require('../../Model/messenger.model')
const Users = require('../../Model/users.model')

module.exports.index = async (req, res) => {

    //Dùng để load ra những tin nhắn mà người dùng định chat
    //Dựa vào id của chính user và id người mà user muốn chat

    const id_user1 = req.query.id_user1
    const id_user2 = req.query.id_user2

    const messenger = await Messenger.findOne({id_user1: id_user1, id_user2: id_user2})

    res.json(messenger)

}

module.exports.send = async (req, res) => {

    //Khi mà user bấm gửi tin nhắn thì nó sẽ lấy query sau đó push vào cơ sở dữ liệu

    const id_user1 = req.query.id_user1
    const id_user2 = req.query.id_user2

    const data = {
        id: req.query.id,
        message: req.query.message,
        name: req.query.name,
        category: req.query.category,
    }

    //Tìm đúng tới cuộc trò chuyện của user xong sau đó push vào
    const messenger = await Messenger.findOne({id_user1: id_user1, id_user2: id_user2})

    messenger.content.push(data)

    messenger.save()

    res.send("Thành Công!")

}

// Hàm này là khi user đăng ký account thì nó sẽ tự động push vào messenger
// Để tạo database cuộc trò chuyện
module.exports.conversation = async (req, res) => {

    // id_admin
    const id_admin = '5ff808424e24e9118cee77b2'

    const email = req.query.email

    const password = req.query.password

    // Tìm user để lấy id_user
    const user = await Users.findOne({ email: email, password: password})

    const id_user = user._id.toString()

    // Tạo ra 2 cuộc trò chuyện
    // 1 cái của admin
    const data1 = {
        id_user1: id_admin,
        id_user2: id_user,
        content: []
    }

    // 1 cái của user
    const data2 = {
        id_user1: id_user,
        id_user2: id_admin,
        content: []
    }

    Messenger.insertMany(data1)

    Messenger.insertMany(data2)

    res.send("Thanh Cong")
    
}