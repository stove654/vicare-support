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
var Chanel = require('./chanel.model');

// Get list of Chanels
exports.index = function (req, res) {
	var time = new Date();
	var query = {
		end: {
			$gte: time
		}
	};

	if (req.query.type == 'professional') {
		query.to = req.query.from
	} else {
		query.from = req.query.from
	}
	Chanel.find(query, function (err, Chanels) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, Chanels);
	});
};

// Get a single Chanel
exports.show = function (req, res) {
	var time = Date.parse(new Date());
	Chanel.findById(req.params.id, function (err, Chanel) {
		if (err) {
			return handleError(res, err);
		}
		if (!Chanel) {
			return res.send(404);
		}
		if (Date.parse(Chanel.open) < time && time < Date.parse(Chanel.end)) {
			return res.json({
				error: false,
				data: Chanel
			});
		} else {
			return  res.json({
				error: true,
				data: 'Hiện tại chưa đến giờ tư vấn với bác sĩ, xin vui lòng kiềm tra lại thời gian'
			})
		}
	});
};

// Get a single Chanel for user
exports.showByUser = function (req, res) {
	console.log('1111')
	var time = new Date();
	Chanel.find({
		open: {
			$lte: time
		},
		end: {
			$gte: time
		}
	}, function (err, chanels) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(chanels);
	});
};

// Creates a new Chanel in the DB.
exports.create = function (req, res) {
	Chanel.create(req.body, function (err, Chanel) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(201, Chanel);
	});
};

// Updates an existing Chanel in the DB.
exports.update = function (req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	Chanel.findById(req.params.id, function (err, Chanel) {
		if (err) {
			return handleError(res, err);
		}
		if (!Chanel) {
			return res.send(404);
		}
		var updated = _.merge(Chanel, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.json(200, Chanel);
		});
	});
};

// Deletes a Chanel from the DB.
exports.destroy = function (req, res) {
	Chanel.findById(req.params.id, function (err, Chanel) {
		if (err) {
			return handleError(res, err);
		}
		if (!Chanel) {
			return res.send(404);
		}
		Chanel.remove(function (err) {
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