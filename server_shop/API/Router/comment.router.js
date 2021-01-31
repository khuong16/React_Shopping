var express = require('express');

var Comment = require('../Controller/comment.controller');

var router = express.Router()

router.get('/', Comment.index)

router.post('/send', Comment.send)

module.exports = router