var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        name: String,
        price: String,
        img1: String,
        img2: String,
        img3: String,
        img4: String,
        category: String
    }
);

var Products = mongoose.model('Products', schema, 'products');

module.exports = Products;