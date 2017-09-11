/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Orders              ->  index
 * POST    /Orders              ->  create
 * GET     /Orders/:id          ->  show
 * PUT     /Orders/:id          ->  update
 * DELETE  /Orders/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Order = require('./order.model');
var Channel = require('../channel/channel.model');

// Get list of Orders
exports.index = function (req, res) {
	Order.find(function (err, Orders) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, Orders);
	});
};

// Get a single Order
exports.show = function (req, res) {
	Order.findById(req.params.id, function (err, Order) {
		if (err) {
			return handleError(res, err);
		}
		if (!Order) {
			return res.send(404);
		}
		return res.json(Order);
	});
};

// Creates a new Order in the DB.
exports.create = function (req, res) {
	Order.create(req.body, function (err, Order) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(201, Order);
	});
};

// Updates an existing Order in the DB.
exports.update = function (req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	Order.findById(req.params.id, function (err, Order) {
		if (err) {
			return handleError(res, err);
		}
		if (!Order) {
			return res.send(404);
		}
		var updated = _.merge(Order, req.body);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			if (Order.status == 2) {
				Channel.findOne({from: Order.user.id, to: Order.professional.id}, function (err, Channel) {
					var params = {
						from: Order.user.id,
						to: Order.professional.id,
						open: Order.open,
						end: Order.end
					};
              		if (!Channel) {
						Channel.create(params)
					} else {
						Channel.findById(Channel._id, function (err, Channel1) {
							console.log(params)
							var updatedChannel = _.merge(Channel1, params);
							updatedChannel.save();
						})
					}
				})
			}
			return res.json(200, Order);
		});
	});
};

// Deletes a Order from the DB.
exports.destroy = function (req, res) {
	Order.findById(req.params.id, function (err, Order) {
		if (err) {
			return handleError(res, err);
		}
		if (!Order) {
			return res.send(404);
		}
		Order.remove(function (err) {
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