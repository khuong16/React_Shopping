
const Products = require('../../Model/products.model')

//Get All Product
module.exports.index = async (req, res) => {

    const products = await Products.find()

    res.json(products)

}

//Get Category Product
module.exports.category = async (req, res) => {

    const category = req.query.category

    const products = await Products.find({ category: category })

    res.json(products)
}

//Get Detail Product
module.exports.detail = async (req, res) => {

    const id = req.params.id

    const products = await Products.findOne({ _id: id})

    res.json(products)
}

//Pagination Phát Triển Thêm Chức năng Search và Phân Loại Sản Phẩm
module.exports.pagination = async (req, res) => {

    //Lấy page từ query
    const page = parseInt(req.query.page) || 1

    //Lấy số lượng từ query
    const numberProduct = parseInt(req.query.count) || 1

    //Lấy key search từ query
    const keyWordSearch = req.query.search

    //Lấy category từ query
    const category = req.query.category

    //Lấy sản phẩm đầu và sẩn phẩm cuối
    var start = (page - 1) * numberProduct
    var end = page * numberProduct

    var products

    //Phân loại điều kiện category từ client gửi lên
    if (category === 'all'){
        products = await Products.find()
    }else{
        products = await Products.find({ category: category })
    }
    
    var paginationProducts = products.slice(start, end)


    if (!keyWordSearch){
        
        res.json(paginationProducts)

    }else{
        var newData = paginationProducts.filter(value => {
            return value.name.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })
    
        res.json(newData)
    }

    res.send("Thanh Cong")

}