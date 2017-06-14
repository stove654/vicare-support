'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/', controller.create);
router.get('/:id', controller.show);
router.get('/', controller.index);

module.exports = router;
