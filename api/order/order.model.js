'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OrderSchema = new Schema({
	user: Object,
	time: String,
	speciality: String,
	professional: String,
	timeSet: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);