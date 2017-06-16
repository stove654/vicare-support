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

// Get list of Messages
exports.index = function(req, res) {
  Message.find(function (err, Messages) {
    if(err) { return handleError(res, err); }
    return res.json(200, Messages);
  });
};

// Get a single Message
exports.show = function(req, res) {
  Message.findById(req.params.id, function (err, Message) {
    if(err) { return handleError(res, err); }
    if(!Message) { return res.send(404); }
    return res.json(Message);
  });
};

// Creates a new Message in the DB.
exports.create = function(req, res) {
  Message.create(req.body, function(err, Message) {
    if(err) { return handleError(res, err); }
    return res.json(201, Message);
  });
};

// Updates an existing Message in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Message.findById(req.params.id, function (err, Message) {
    if (err) { return handleError(res, err); }
    if(!Message) { return res.send(404); }
    var updated = _.merge(Message, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Message);
    });
  });
};

// Deletes a Message from the DB.
exports.destroy = function(req, res) {
  Message.findById(req.params.id, function (err, Message) {
    if(err) { return handleError(res, err); }
    if(!Message) { return res.send(404); }
    Message.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}