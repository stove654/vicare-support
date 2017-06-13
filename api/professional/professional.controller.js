/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Professionals              ->  index
 * POST    /Professionals              ->  create
 * GET     /Professionals/:id          ->  show
 * PUT     /Professionals/:id          ->  update
 * DELETE  /Professionals/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Professional = require('./professional.model');

// Get list of Professionals
exports.index = function(req, res) {
  Professional.find(function (err, Professionals) {
    if(err) { return handleError(res, err); }
    return res.json(200, Professionals);
  });
};

// Get a single Professional
exports.show = function(req, res) {
  Professional.findById(req.params.id, function (err, Professional) {
    if(err) { return handleError(res, err); }
    if(!Professional) { return res.send(404); }
    return res.json(Professional);
  });
};

// Creates a new Professional in the DB.
exports.create = function(req, res) {
  Professional.create(req.body, function(err, Professional) {
    if(err) { return handleError(res, err); }
    return res.json(201, Professional);
  });
};

// Updates an existing Professional in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Professional.findById(req.params.id, function (err, Professional) {
    if (err) { return handleError(res, err); }
    if(!Professional) { return res.send(404); }
    var updated = _.merge(Professional, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Professional);
    });
  });
};

// Deletes a Professional from the DB.
exports.destroy = function(req, res) {
  Professional.findById(req.params.id, function (err, Professional) {
    if(err) { return handleError(res, err); }
    if(!Professional) { return res.send(404); }
    Professional.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}