/**
 * Express configuration
 */

'use strict';


var bodyParser = require('body-parser');
var config = require('./config.js');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');

module.exports = function (app) {

	app.use(cors());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json({
		limit: '50mb',
		parameterLimit: 100000000 // 100,000,000
	}));
	app.use(passport.initialize());


	app.use(function (req, res, next) {
		res.contentType('application/json');
		next();
	});

	app.use(session({
		secret: config.secret,
		resave: true,
		saveUninitialized: true,
		store: new mongoStore({mongooseConnection: mongoose.connection})
	}));

};