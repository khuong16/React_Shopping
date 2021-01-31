var express = require('express')

var router = express.Router()

const Histories = require('../Controller/histories.controller')

//Get Find Carts For User
router.get('/', Histories.index)

// Get All History
router.get('/all', Histories.history)

//Get Detail History
router.get('/:id', Histories.detail)

module.exports = router