'use strict';

var User = require('./user.model');
var config = require('../../config/config.js');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var validationError = function (res, err) {
    return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
	// Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
	var accountSid = 'AC81153fd1c273e81456da3a41cdf8749a';
	var authToken = "3c27528a9e96fe00a470c9fcea636d12";
	var client = require('twilio')(accountSid, authToken);

	client.tokens.create({}, function(err, token) {
	    console.log(token.iceServers);
		process.stdout.write(token.username);
		res.json(200, token.iceServers);
	});

    // User.find({}, '-salt -hashedPassword', function (err, users) {
    //     if (err) return res.send(500, err);
    //     res.json(200, users);
    // });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function (err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({_id: user._id}, config.secret, {expiresInMinutes: 60 * 5});
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    });
};


/**
 * Get a single user
 */
exports.show = function (req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);
		res.json(200, user);
	});
};


/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};

/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function (err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function (err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};

function handleError(res, err) {
    return res.send(500, err);
}