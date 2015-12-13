/*global require*/
/*global process*/
/*global console*/
var mongoose = require('mongoose');

var LeagueSchema = new mongoose.Schema({
   commissioner: String,
   leagueName: String,
   leagueType: String,
   private: Boolean,
   numberOfPlayers: Number,
   players: Array,
   sports: Array,
   startDate: Date,
   endDate: Date,
   password: String
});

mongoose.model('League', LeagueSchema);