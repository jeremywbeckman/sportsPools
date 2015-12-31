/*global require*/
/*global process*/
/*global console*/
var mongoose = require('mongoose');

var SeasonSchema = new mongoose.Schema({
   number: Number,
   players: Array,
   startDate: Date,
   endDate: Date,
   preferences: mongoose.Schema.Types.Mixed,
   results: mongoose.Schema.Types.Mixed
});

mongoose.model('Season', SeasonSchema);