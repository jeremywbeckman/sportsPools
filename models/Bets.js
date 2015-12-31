/*global require*/
/*global process*/
/*global console*/
var mongoose = require('mongoose');

var BetsSchema = new mongoose.Schema({
   username: String,
   amount: Number,
   odds: Number,
   type: String,
   game: String,
   date: Date,
   line: Number,
   overunder: Number
});

mongoose.model('Bets', BetsSchema);