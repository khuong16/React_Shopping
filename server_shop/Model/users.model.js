var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    { 
        fullname: String,
        email: String,
        password: String,
        phone: String
    }
);

var Users = mongoose.model('Users', schema, 'users');

module.exports = Users;