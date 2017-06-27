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
var request = require('request');


// Get list of Professionals
exports.index = function(req, res) {
    request({url: 'http://vicare.vn/api/v1/professional/', qs: req.query}, function (error, response) {
        return res.json(200, response);
    });
};
