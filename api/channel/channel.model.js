'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	User = require('../user/user.model');

var ChannelSchema = new Schema({
    users: [
        {
            user: {type: Schema.Types.ObjectId, ref: 'User'},
            read: {
                type: Number,
                default: 0
            },
            deletedAt: Date
        }
    ],
    from: {type: Schema.Types.ObjectId, ref: 'User'},
    to: {type: Schema.Types.ObjectId, ref: 'User'},
	lastMessage: String,
    lastMessageTime: Date,
	open: Date,
	end: Date,
	fromProfile: String,
	toProfile: String,
	read: {
		type: Number,
		default: 0
	},
    request: {
        type: Boolean,
        default: false
    }
}, {
	timestamps: true
});

module.exports = mongoose.model('Channel', ChannelSchema);