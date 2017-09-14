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
var Channel = require('../channel/channel.model');
var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyAgGn78cOQGWENJ1VY-Xn4QGCxxDa8zaCM');

// Get list of Messages
exports.index = function (req, res) {
	Message
		.find(req.query)
		.limit(100)
        .populate('from')
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

		Channel.findById(Message.channel, function (err, channel) {

                var users = JSON.parse(JSON.stringify(channel.users));
                for (var i = 0; i < users.length; i++) {
                    if (users[i].user == req.body.from) {
                        users[i].read = 0;
                    } else {
                        users[i].read += 1;
                    }
                }

                channel.users = null;
                var token;
                var notification = {
                    sound: 'default'
                };

				var text = '';
				if (req.body.fromName) {
					text += req.body.fromName;
				}

                if (req.body.text) {
                    notification.body = text + ': ' + req.body.text;
                } else {
                    notification.body = text + ': Đã gửi bạn 1 bức ảnh';
                }

                var message = new gcm.Message({
                    notification: notification,
                    data: { channel: Message.channel },
                    priority: 'high'
                });
                if (req.body.tokens.length) {
                    console.log(req.body.tokens)
                    if (!channel.request) {
                        sender.send(message, { registrationTokens: req.body.tokens }, function (err, response) {
                            if (err) console.error('err', err);
                            else console.log('done', response);
                        });
                    }
                }

                var params = {};
                if (Message.text) {
                    params.lastMessage = Message.text;
                } else {
                    params.lastMessage = 'Gửi ảnh'
                }

                params.lastMessageTime = new Date();
                params.users = users;
                var updatedChannel = _.merge(channel, params);
                updatedChannel.save();

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