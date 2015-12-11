/*global require*/
/*global module*/
/*global process*/
var Game = require('mongoose').model('Game');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});
var dateFormat = require('dateformat');

module.exports = function(app) {
   app.post('/saveGame', auth, function(req, res, next) {
      if (!req.body.date || !req.body.sport) {
         return res.status(400).json({ message: 'Insufficient data provided for request' });
      }

      var game = new Game();
      game._id = dateFormat(req.body.date, 'mmddyyyy') + ": " + req.body.awayTeam + "@" + req.body.homeTeam;
      game.sport = req.body.sport;
      game.date = req.body.date;
      game.awayTeam = req.body.awayTeam;
      game.homeTeam = req.body.homeTeam;
      game.awayScore = req.body.awayScore;
      game.homeScore = req.body.homeScore;
      game.gameLine = req.body.gameLine;
      game.awayLineOdds = req.body.awayLineOdds;
      game.homeLineOdds = req.body.homeLineOdds;
      game.awayMoneyLine = req.body.awayMoneyLine;
      game.homeMoneyLine = req.body.homeMoneyLine;
      game.overUnder = req.body.overUnder;
      game.overOdds = req.body.overOdds;
      game.underOdds = req.body.underOdds;
      
      Game.findOneAndUpdate({ _id : game._id }, game, { upsert : true }, function(err, resp) {
         if (err) { return next(err); }
         
         return res.json(game);
      });
   });
};