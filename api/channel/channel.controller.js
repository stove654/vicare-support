/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Channels              ->  index
 * POST    /Channels              ->  create
 * GET     /Channels/:id          ->  show
 * PUT     /Channels/:id          ->  update
 * DELETE  /Channels/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Channel = require('./channel.model');

// Get list of Channels
exports.index = function (req, res) {
    Channel.find({'users': {$elemMatch: {user: req.query.userId}}, request: false})
        .populate('users.user')
        .exec(function (err, Channels) {
            if(err) { return handleError(res, err); }
            return res.json(200, Channels);
        })
};

// Get list of Channels
exports.indexRequest = function (req, res) {
    Channel.find({'users': {$elemMatch: {user: req.body.userId}}, request: true})
        .populate('users.user')
        .exec(function (err, Channels) {
            if(err) { return handleError(res, err); }
            return res.json(200, Channels);
        })
};

// Get a single Channel
exports.show = function (req, res) {
    Channel.findById(req.params.id)
        .populate('to')
        .populate('users.user')
        .exec(function (err, Channel) {
            if(err) { return handleError(res, err); }
            return res.json(Channel);
        })
};

// Get a single Channel for user
exports.showByUser = function (req, res) {
	var time = new Date();
	Channel.find({
		open: {
			$lte: time
		},
		end: {
			$gte: time
		}
	}, function (err, Channels) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(Channels);
	});
};

exports.create = function(req, res) {
    Channel.findOne({
        from: req.body.from,
        to: req.body.to
    }, function (err,  channel) {
        if (channel) {
            return res.json(201, channel);
        }
        Channel.findOne({
            from: req.body.to,
            to: req.body.from
        }, function (err, channel) {
            if (channel) {
                return res.json(201, channel);
            }
            Channel.create(req.body, function(err, channel) {
                if(err) { return handleError(res, err); }
                return res.json(201, channel);
            });
        })
    })
};

// Updates an existing Channel in the DB.
exports.update = function (req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	Channel.findById(req.params.id, function (err, Channel) {
		if (err) {
			return handleError(res, err);
		}
		if (!Channel) {
			return res.send(404);
		}
		if (req.body.user) {
            var users = JSON.parse(JSON.stringify(Channel.users));
            for (var i = 0; i < users.length; i++) {
                if (users[i].user == req.body.user) {
                    users[i].read = 0;
                    break;
                }
            }

            Channel.users = null;
            req.body.users = users
        }
		var updated = _.merge(Channel, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, Channel);
		});
	});
};

// Deletes a Channel from the DB.
exports.destroy = function (req, res) {
	Channel.findById(req.params.id, function (err, Channel) {
		if (err) {
			return handleError(res, err);
		}
		if (!Channel) {
			return res.send(404);
		}
		Channel.remove(function (err) {
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