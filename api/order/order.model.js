'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OrderSchema = new Schema({
	user: Object,
	time: String,
	speciality: String,
	professional: Object,
	timeSet: String,
	open: Date,
	end: Date,
	status: {
		type: Number,
		default: 1
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);