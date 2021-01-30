
const Carts = require('../../Model/carts.model')
const Products = require('../../Model/products.model')

//Hàm tìm những sản phẩm mà user đã thêm
module.exports.index = async (req, res) => {

    //Lấy idUser từ query
    const idUser = req.query.idUser

    //Tìm những sản phẩm mà user đã thêm
    const carts = await Carts.find({ idUser: idUser})

    res.json(carts)

}

//Hàm thêm sản phẩm
module.exports.addToCart = async (req, res) => {

    //Lấy idUser từ query
    const idUser = req.query.idUser
    
    //Lấy idProduct từ query
    const idProduct = req.query.idProduct

    //Layas count từ query
    const count = req.query.count

    //Tìm sản phẩm mà user cần mua
    const product = await Products.findOne({ _id: idProduct })

    //Tìm trong giỏ hàng xem thử user đã từng mua sản phẩm đó chưa
    const carts = await Carts.findOne({ idUser: idUser, idProduct: idProduct})

    //Kiểm tra xem User đã từng thêm sản phẩm này chưa
    //Nếu không tìm thấy thì == null và insert vào
    //Nếu tìm thấy thì sẽ update số lượng
    if (!carts){

        const dataInsert = {
            idUser: idUser,
            idProduct: idProduct,
            nameProduct: product.name,
            priceProduct: product.price,
            count: count,
            img: product.img1,
        }

        Carts.insertMany(dataInsert)

        res.send("Thanh Cong!")

    }else{     

        carts.count += parseInt(count)

        carts.save()

        res.send("Thanh Cong!")

    }

}

//Hàm Xóa Sản Phẩm
module.exports.deleteToCart = async (req, res) => {

    //Lấy idUSer của user cần xóa
    const idUser = req.query.idUser

    //Lấy idProduct của user cần xóa
    const idProduct = req.query.idProduct

    //Tìm đúng cái sản phẩm mà User đã thêm vào giỏ hàng
    var cart = await Carts.findOne({idUser: idUser, idProduct: idProduct})

    cart.delete()

    res.send("Thanh Cong!")

}

//Hàm Sửa Sản Phẩm
module.exports.updateToCart = async (req, res) => {

    //Lấy idUSer của user cần sửa
     const idUser = req.query.idUser

    //Lấy idProduct của user cần sửa
    const idProduct = req.query.idProduct

    //Lấy count của user cần sửa
    const count = req.query.count

    //Tìm đúng cái sản phẩm mà User cần sửa
    var cart = await Carts.findOne({idUser: idUser, idProduct: idProduct})

    cart.count = count
    
    cart.save()

    res.send("Update Thanh Cong")

}

