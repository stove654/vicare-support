'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Channel = require('../channel/channel.model'),
	User = require('../user/user.model');

var MessageSchema = new Schema({
	text: String,
    image: String,
    from: {type: Schema.Types.ObjectId, ref: 'User'},
	channel: {type: Schema.Types.ObjectId, ref: 'Channel'},
	lastMessage: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);