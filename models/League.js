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
   reviewed: Boolean,
   password: String
});

LeagueSchema.statics.findByLeagueName = function(leagueName, cbFunc) {
   this.findOne({ "leagueName" : leagueName }, function(err, league) {
      if (err) { return cbFunc(err); }

      return cbFunc(league);
   });
};

LeagueSchema.statics.findReviewableLeagues = function(cbFunc) {
   this.find({ "reviewed" : false }, 'leagueName', function(err, leagues) {
      if (err) { return cbFunc(err); }

      return cbFunc(leagues);
   });
};

LeagueSchema.statics.reviewComplete = function(leagueName, cbFunc) {
   this.findOneAndUpdate({ "leagueName" : leagueName }, { "reviewed" : true }, function(err, league) {
      if (err) { return cbFunc(err); }
      
      return cbFunc(league);
   });
};

LeagueSchema.statics.updateLeagueName = function(badname, goodname, cbFunc) {
   this.findOneAndUpdate({ "leagueName" : badname }, { "leagueName" : goodname, "reviewed" : true }, function(err, league) {
      if (err) { return cbFunc(err); }
      
      return cbFunc(league);
   });
};

mongoose.model('League', LeagueSchema);