/*global module*/
/*global require*/
var Game = require('mongoose').model('Game');

module.exports = function(app) {
   app.param('sport', function(req, res, next, sport) {
      req.sport = sport;
      next();
   });
   
   app.param('date', function(req, res, next, date) {
      req.date = date;
      next();
   });
   
   app.get('/getGames/:sport/:date', function(req, res) {
      if (!req.sport) {
         return res.status(400).json({ message: 'Missing sport' });
      }
      
      if (!req.date) {
         return res.status(400).json({ message: 'Missing date' });
      }

      var validDate = new Date(req.date.substr(4, 4), req.date.substr(0, 2) - 1, req.date.substr(2, 2));
      Game.getGamesForDate(req.sport, validDate, function(games) {
         if (games instanceof Error) {
            return res.status(500).json({ message: 'Internal Database Error' });
         }

         return res.json(games);
      });
   });
};