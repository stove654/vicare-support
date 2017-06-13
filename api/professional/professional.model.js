'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ProfessionalSchema = new Schema({
	id: String,
    professional: {},
}, {
	timestamps: true
});

module.exports = mongoose.model('Professional', ProfessionalSchema);