/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Chanels              ->  index
 * POST    /Chanels              ->  create
 * GET     /Chanels/:id          ->  show
 * PUT     /Chanels/:id          ->  update
 * DELETE  /Chanels/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Chanel = require('../chanel/chanel.model');
var Message = require('../message/message.model');

// Get list of Chanels
exports.index = function(req, res) {
  Chanel.find(function (err, Chanels) {
    if(err) { return handleError(res, err); }
    return res.json(200, Chanels);
  });
};

// Get a single Chanel
exports.show = function(req, res) {
	Message
		.find({
            chanel: req.params.id
        })
		.limit(300)
		.exec(function(err, messages) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, messages);
		});
};

// Creates a new Chanel in the DB.
exports.create = function(req, res) {
  Chanel.create(req.body, function(err, Chanel) {
    if(err) { return handleError(res, err); }
    return res.json(201, Chanel);
  });
};

// Updates an existing Chanel in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Chanel.findById(req.params.id, function (err, Chanel) {
    if (err) { return handleError(res, err); }
    if(!Chanel) { return res.send(404); }
    var updated = _.merge(Chanel, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Chanel);
    });
  });
};

// Deletes a Chanel from the DB.
exports.destroy = function(req, res) {
  Chanel.findById(req.params.id, function (err, Chanel) {
    if(err) { return handleError(res, err); }
    if(!Chanel) { return res.send(404); }
    Chanel.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}