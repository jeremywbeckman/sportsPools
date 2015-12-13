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

LeagueSchema.statics.getLeagues = function(name, type, sports, private, cbFunc) {
   var query = {};
   if (name) {
      query.leagueName = { $regex: ".*" + name + ".*" };
   }
   if (type) {
      query.leagueType = type;
   }
   if (sports) {
      if (typeof sports === 'string')
      {
         sports = [ sports ];
      }

      query.sports = { $in: sports };
   }
   if (private) {
      query.private = private;
   }
   
   if (!query) {
      return cbFunc(new Error('No parameters found for league request'));
   }
   
   this.find(query, function(err, leagues) {
      if (err) { return cbFunc(err); }
      
      return cbFunc(leagues);
   });
};

LeagueSchema.statics.getUsersLeagues = function(username, cbFunc) {
   this.find({ players: { $in: [ username ] } }, function(err, leagues) {
      if (err) { return cbFunc(err); }

      return cbFunc(leagues);
   });
};

mongoose.model('League', LeagueSchema);