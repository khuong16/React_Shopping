
var express = require('express')

var router = express.Router()

const Carts = require('../Controller/carts.controller')

//Get Find Carts For User
router.get('/', Carts.index)

router.post('/add', Carts.addToCart)

router.delete('/delete', Carts.deleteToCart)

router.put('/update', Carts.updateToCart)

module.exports = router