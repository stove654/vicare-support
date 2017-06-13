'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CalendarSchema = new Schema({
  date: Date,
  time: String,
  professional: Array
}, {
  timestamp: Date
});

module.exports = mongoose.model('Calendar', CalendarSchema);