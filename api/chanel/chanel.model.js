'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ChanelSchema = new Schema({
	from: Number,
	to: Number,
	lastMessage: String,
	open: Date,
	end: Date,
	fromProfile: {},
	toProfile: {},
	read: {
		type: Number,
		default: 0
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Chanel', ChanelSchema);