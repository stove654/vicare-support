'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ChanelSchema = new Schema({
	from: Number,
	to: Number,
	lastMessage: String,
	open: Date,
	end: Date
}, {
	timestamps: true
});

module.exports = mongoose.model('Chanel', ChanelSchema);