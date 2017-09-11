'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/', controller.create);
router.put('/:id', controller.update);
router.get('/:id', controller.show);
router.get('/', controller.index);
router.post('/chat/', controller.indexChat);

module.exports = router;
