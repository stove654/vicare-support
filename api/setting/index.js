'use strict';

var express = require('express');
var controller = require('./setting.controller');

var router = express.Router();

router.get('/', controller.index);
router.put('/', controller.update);


module.exports = router;
