'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Chanel = require('../chanel/chanel.model');

var MessageSchema = new Schema({
	text: String,
    image: String,
	from: Number,
	chanel: {type: Schema.Types.ObjectId, ref: 'Chanel'}
}, {
	timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);