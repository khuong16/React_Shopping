var express = require('express')

var router = express.Router()

const Products = require('../Controller/products.controller')

router.get('/', Products.index)

router.get('/category', Products.category)

router.get('/pagination', Products.pagination)

router.get('/:id', Products.detail)


module.exports = router