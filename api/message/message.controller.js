/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Messages              ->  index
 * POST    /Messages              ->  create
 * GET     /Messages/:id          ->  show
 * PUT     /Messages/:id          ->  update
 * DELETE  /Messages/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Message = require('./message.model');
var Chanel = require('../chanel/chanel.model');
var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyAgGn78cOQGWENJ1VY-Xn4QGCxxDa8zaCM');

// Get list of Messages
exports.index = function (req, res) {
	Message
		.find(req.query)
		.limit(100)
        .exec(function(err, messages) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, messages);
        });
};

// Get a single Message
exports.show = function (req, res) {
	Message.findById(req.params.id, function (err, Message) {
		if (err) {
			return handleError(res, err);
		}
		if (!Message) {
			return res.send(404);
		}
		return res.json(Message);
	});
};

// Creates a new Message in the DB.
exports.create = function (req, res) {
	Message.create(req.body, function (err, Message) {
		if (err) {
			return handleError(res, err);
		}
		Chanel.findById(Message.chanel, function (err, chanel) {

            var token;
            var notification = {
                sound: 'default'
			};
            if (req.body.isUser == true) {
            	token = JSON.parse(chanel.fromProfile).devices;
                notification.title = JSON.parse(chanel.fromProfile).name;
                console.log(111)
			} else {
                token = JSON.parse(chanel.toProfile).devices;
                notification.title = JSON.parse(chanel.toProfile).name;
                console.log(222)
            }
            if (req.body.text) {
                notification.body = req.body.text;
            } else {
                notification.body = 'Đã gửi bạn 1 bức ảnh';
			}
            var tokens = [];
            _.forEach(token, function (value) {
            	tokens.push(value.registration_id);
            });

            var message = new gcm.Message({
                notification: notification,
                data: { chanel: Message.chanel },
                priority: 'high'
            });
            if (tokens.length) {
            	console.log(tokens)
                sender.send(message, { registrationTokens: tokens }, function (err, response) {
                    if (err) console.error('err', err);
                    else console.log('done', response);
                });
			}

			var params = {};
			if (Message.text) {
				params.lastMessage = Message.text;
			} else {
				params.lastMessage = 'Gửi ảnh'
			}
			if (req.body.isUser) {
				params.read = chanel.read;
                params.read +=1;
			}
			var updatedChanel = _.merge(chanel, params);
			updatedChanel.save();
		})


		return res.json(201, Message);
	});
};

// Updates an existing Message in the DB.
exports.update = function (req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	Message.findById(req.params.id, function (err, Message) {
		if (err) {
			return handleError(res, err);
		}
		if (!Message) {
			return res.send(404);
		}
		var updated = _.merge(Message, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, Message);
		});
	});
};

// Deletes a Message from the DB.
exports.destroy = function (req, res) {
	Message.findById(req.params.id, function (err, Message) {
		if (err) {
			return handleError(res, err);
		}
		if (!Message) {
			return res.send(404);
		}
		Message.remove(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.send(204);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}