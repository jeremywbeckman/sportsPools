/*global module*/
/*global require*/
var League = require('mongoose').model('League');

module.exports = function(app) {
   app.param('leagueName', function(req, res, next, leagueName) {
      req.leagueName = leagueName;
      next();
   });

   app.param('leagueType', function(req, res, next, leagueType) {
      req.leagueType = leagueType;
      next();
   });

   app.param('sports', function(req, res, next, sports) {
      req.sports = sports;
      next();
   });

   app.param('private', function(req, res, next, private) {
      console.log("found private flag");
      req.private = private;
      next();
   });

   app.get('/getLeagues', function(req, res) {
      if (!req.leagueName && req.query.leagueName) {
         req.leagueName = req.query.leagueName;
      }
      if (!req.leagueType && req.query.leagueType) {
         req.leagueType = req.query.leagueType;
      }
      if (!req.sports && req.query.sports) {
         req.sports = req.query.sports;
      }
      if (!req.private && req.query.private) {
         req.private = req.query.private;
      }
      
      League.getLeagues(req.leagueName, req.leagueType, req.sports, req.private, function(leagues) {
         if (leagues instanceof Error) {
            return res.status(500).json({ message: 'Internal Database Error' });
         }

         console.log('Returning ' + leagues.length + ' leagues');
         return res.json(leagues);
      });
   });
};