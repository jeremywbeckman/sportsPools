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

LeagueSchema.statics.findByLeagueName = function(leagueName, cbFunc) {
   this.findOne({ "leagueName" : leagueName }, function(err, league) {
      if (err) { return cbFunc(err); }

      return cbFunc(league);
   });
};

mongoose.model('League', LeagueSchema);