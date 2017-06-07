'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	active: Boolean,
    thread: {}
}, {
	timestamps: true
});

module.exports = mongoose.model('Question', QuestionSchema);