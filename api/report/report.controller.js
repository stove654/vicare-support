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
var Channel = require('../channel/channel.model');
var Message = require('../message/message.model');

// Get list of Channels

exports.index = function (req, res) {
    Channel.find({'lastMessage': { $ne: null }, request: false})
        .populate('users.user')
        .exec(function (err, Channels) {
            if(err) { return handleError(res, err); }
            return res.json(200, Channels);
        })
};


// Get a single Channel
exports.show = function(req, res) {
	Message
		.find({
            channel: req.params.id
        })
		.limit(300)
        .populate('from')
		.exec(function(err, messages) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, messages);
		});
};

// Creates a new Channel in the DB.
exports.create = function(req, res) {
  Channel.create(req.body, function(err, Channel) {
    if(err) { return handleError(res, err); }
    return res.json(201, Channel);
  });
};

// Updates an existing Channel in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Channel.findById(req.params.id, function (err, Channel) {
    if (err) { return handleError(res, err); }
    if(!Channel) { return res.send(404); }
    var updated = _.merge(Channel, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Channel);
    });
  });
};

// Deletes a Channel from the DB.
exports.destroy = function(req, res) {
  Channel.findById(req.params.id, function (err, Channel) {
    if(err) { return handleError(res, err); }
    if(!Channel) { return res.send(404); }
    Channel.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}