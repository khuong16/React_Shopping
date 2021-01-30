
const mailer = require('../../mailer')

const Carts = require('../../Model/carts.model')
const History = require('../../Model/histories.model')

module.exports.sendmail = async (req, res) => {

    try {

        // Lấy data truyền lên từ form phía client
        const to = req.query.to
        const subject = 'Hóa Đơn Đặt Hàng'
        
        const fullname = req.query.fullname
        const phone = req.query.phone
        const address = req.query.address
        const idUser = req.query.idUser
        const status = false

        //Tìm những sản phẩm User đã thêm hàng
        const cartsUser = await Carts.find({idUser: idUser})

        let total = 0

        cartsUser.map(value => {
            return total += parseInt(value.priceProduct) * parseInt(value.count)
        })

        const htmlHead = '<table style="width:50%">' + 
        '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>'

        let htmlContent = ""

        for (let i = 0; i < cartsUser.length; i++){
            htmlContent += '<tr>' +
                        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + cartsUser[i].nameProduct + '</td>' +
                        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' + cartsUser[i].img + '" width="80" height="80"></td>' +
                        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + cartsUser[i].priceProduct + '$</td>' +
                        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + cartsUser[i].count + '</td>' +
                        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + ( parseInt(cartsUser[i].priceProduct) * parseInt(cartsUser[i].count) ) + '$</td><tr>'
        }

        const htmlResult = '<h1>Xin Chào ' + fullname + '</h1>' + '<h3>Phone: ' + phone + '</h3>' + '<h3>Address:' + address + '</h3>' +
                            htmlHead + htmlContent + '<h1>Tổng Thanh Toán: ' + total + '$</br>' + '<p>Cảm ơn bạn!</p>'

        // Thực hiện gửi email (to, subject, htmlContent)
        await mailer.sendMail(to, subject, htmlResult)



        //-----------Xứ Lý Xóa Những Sản Phẩm Trong Bảng Cart và Chuyển Sang Bảng History---------------//
        let carts = []

        cartsUser.map(value => {
            return carts.push(value)
        })

        const data = {
            idUser: idUser,
            fullname: fullname,
            phone: phone,
            address: address,
            cart: carts,
            total: total,
            status: status
        }

        // //Insert data vào Bảng History
        History.insertMany(data)

        // //Xóa những sản phẩm trong Bảng Cart
        Carts.deleteMany({ idUser: idUser }).then(function(){ 
            res.send("Thanh Cong")
        }).catch(function(error){ 
            res.send(error);
        });


        // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
        // res.send('<h3>Your email has been sent successfully.</h3>')

    } catch (error) {
        // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
        console.log(error)
        res.send(error)
    }

}