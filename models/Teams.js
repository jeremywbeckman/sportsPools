/*global require*/
/*global process*/
/*global console*/
var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
   sport: String,
   location: String,
   name: String,
   start: Date,
   end: Date
});

TeamSchema.statics.getTeamsForSport = function(sport, date, cbFunc) {
   this.find({ $and: [ { sport: sport }, { end: { $gt : date } }, { start: { $lt: date } } ] }, '-_id location name', function(err, teams) {
      if (err) { return cbFunc(err); }

      return cbFunc(teams);
   });
};

mongoose.model('Teams', TeamSchema);