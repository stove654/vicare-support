/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Questions              ->  index
 * POST    /Questions              ->  create
 * GET     /Questions/:id          ->  show
 * PUT     /Questions/:id          ->  update
 * DELETE  /Questions/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Question = require('./question.model');

// Get list of Questions
exports.index = function(req, res) {
  Question.find(function (err, Questions) {
    if(err) { return handleError(res, err); }
    return res.json(200, Questions);
  });
};

// Get a single Question
exports.show = function(req, res) {
  Question.findById(req.params.id, function (err, Question) {
    if(err) { return handleError(res, err); }
    if(!Question) { return res.send(404); }
    return res.json(Question);
  });
};

// Creates a new Question in the DB.
exports.create = function(req, res) {
  Question.create(req.body, function(err, Question) {
    if(err) { return handleError(res, err); }
    return res.json(201, Question);
  });
};

// Updates an existing Question in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Question.findById(req.params.id, function (err, Question) {
    if (err) { return handleError(res, err); }
    if(!Question) { return res.send(404); }
    var updated = _.merge(Question, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Question);
    });
  });
};

// Deletes a Question from the DB.
exports.destroy = function(req, res) {
  Question.findById(req.params.id, function (err, Question) {
    if(err) { return handleError(res, err); }
    if(!Question) { return res.send(404); }
    Question.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}