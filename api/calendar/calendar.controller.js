/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Calendars              ->  index
 * POST    /Calendars              ->  create
 * GET     /Calendars/:id          ->  show
 * PUT     /Calendars/:id          ->  update
 * DELETE  /Calendars/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Calendar = require('./calendar.model');

// Get list of Calendars
exports.index = function (req, res) {
	Calendar.find({date: req.query.date},function (err, Calendars) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, Calendars);
	});
};

// Get a single Calendar
exports.show = function (req, res) {
	Calendar.findById(req.params.id, function (err, Calendar) {
		if (err) {
			return handleError(res, err);
		}
		if (!Calendar) {
			return res.send(404);
		}
		return res.json(Calendar);
	});
};

// Creates a new Calendar in the DB.
exports.create = function (req, res) {
	Calendar.findOne({date: req.body.date, time: req.body.time}, function (err, calendar) {
		if (err || calendar) {
			return handleError(res, err);
		}

		Calendar.create(req.body, function (err, Calendar) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(201, Calendar);
		});
	})

};

// Updates an existing Calendar in the DB.
exports.update = function (req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	Calendar.findById(req.params.id, function (err, Calendar) {
		if (err) {
			return handleError(res, err);
		}
		if (!Calendar) {
			return res.send(404);
		}
		Calendar.professional = null;
		var updated = _.merge(Calendar, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, Calendar);
		});
	});
};

// Deletes a Calendar from the DB.
exports.destroy = function (req, res) {
	Calendar.findById(req.params.id, function (err, Calendar) {
		if (err) {
			return handleError(res, err);
		}
		if (!Calendar) {
			return res.send(404);
		}
		Calendar.remove(function (err) {
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