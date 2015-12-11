/*global require*/
/*global process*/
var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
   _id: { type: String, required: true },
   sport: { type: String, required: true },
   date: { type: Date, required: true },
   awayTeam: String,
   homeTeam: String,
   awayScore: Number,
   homeScore: Number,
   gameLine: Number,
   awayLineOdds: Number,
   homeLineOdds: Number,
   awayMoneyLine: Number,
   homeMoneyLine: Number,
   overUnder: Number,
   overOdds: Number,
   underOdds: Number
});

GameSchema.statics.getGamesForDate = function(sport, date, cbFunc) {
   this.find({ $and: [ { sport : sport }, { date : date }]}, function(err, games) {
      if (err) { return cbFunc(err); }
      
      return cbFunc(games);
   });
};

GameSchema.statics.removeById = function(id, cbFunc) {
   this.remove({ _id : id }, function(err) {
      if (err) { return cbFunc(err); }
      
      return cbFunc();
   });
};

mongoose.model('Game', GameSchema);