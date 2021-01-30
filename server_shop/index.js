const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const cors = require("cors");
const port = 3000

// API
const productAPI = require('./API/Router/products.router')
const userAPI = require('./API/Router/users.router')
const cartAPI = require('./API/Router/carts.router')
const historiesAPI = require('./API/Router/histories.router')
const emailAPI = require('./API/Router/email.router')
const messengerAPI = require('./API/Router/messenger.router')

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Boutique", {
  useFindAndModify: false,
  useCreateIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/static', express.static('public'))

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Tạo API
app.use('/products', productAPI)
app.use('/users', userAPI)
app.use('/carts', cartAPI)
app.use('/histories', historiesAPI)
app.use('/email', emailAPI)
app.use('/messenger', messengerAPI)


io.on("connection", (socket) => {
  console.log(`Có người vừa kết nối, socketID: ${socket.id}`);

  //Server nhận key send_message với value data do người dùng gửi lên
  socket.on("send_message", (data) => {
    console.log(data.name + ": " + data.message);

    // //Sau đó nó sẽ update lại database bên phía người nhận
    // //Vì 1 bên gửi 1 bên nhận nên id_user đôi ngược nhau và category cũng vậy
    // const newData = {
    //   id_user1: data.id_user2,
    //   id_user2: data.id_user1,
    //   id: Math.random().toString(),
    //   message: data.message,
    //   name: data.name,
    //   category: "receive",
    // };

    // console.log(newData.message);

    // const postData = async () => {
    //   const messenger = await Messenger.findOne({
    //     id_user1: newData.id_user1,
    //     id_user2: newData.id_user2,
    //   });

    //   messenger.content.push(newData);

    //   messenger.save();
    // };

    // postData();

    // //Xử lý xong server gửi ngược lại client thông qua socket với key receive_message
    // socket.broadcast.emit("receive_message");
  });
  
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});