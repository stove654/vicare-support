/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Settings              ->  index
 * POST    /Settings              ->  create
 * GET     /Settings/:id          ->  show
 * PUT     /Settings/:id          ->  update
 * DELETE  /Settings/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var jsonfile = require('jsonfile')
var file = './setting.json'

// Get list of Settings
exports.index = function (req, res) {
	jsonfile.readFile(file, function (err, obj) {
		console.log(obj)
		return res.json(201, obj);
	})
};

// Updates an existing Setting in the DB.
exports.update = function (req, res) {
	jsonfile.readFile(file, function (err, obj) {
		obj.openChat = req.body.openChat;
		obj.needUpdate = req.body.needUpdate;
		obj.version = req.body.version;
		jsonfile.writeFile(file, obj, function (err) {
			console.error(err, obj)
			return res.json(201, obj);
		})
	})
};

function handleError(res, err) {
	return res.send(500, err);
}