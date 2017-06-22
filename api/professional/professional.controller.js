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
    request('http://vicare.vn/api/v1/professional/?name=' + req.query.name, function (error, response) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', response); // Print the HTML for the Google homepage.
        return res.json(200, response);
    });
};
