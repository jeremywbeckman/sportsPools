/*global require*/
/*global module*/
/*global process*/
var League = require('mongoose').model('League');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});

module.exports = function(app) {
   app.post('/createLeague', auth, function(req, res, next) {
      if (!req.body.leagueName || req.body.leagueName.length < 4 || req.body.leagueName.length > 20) {
         return res.status(400).json({ message: 'Missing or Illegal League Name' });
      }
      if (req.body.private && (!req.body.leaguePassword || req.body.leaguePassword.length < 4 || req.body.leaguePassword.length > 20)) {
         return res.status(400).json({ message: 'Private league with missing or illegal password' });
      }
      if (!req.body.leagueType) {
         return res.status(400).json({ message: 'Missing league type' });
      }
      if (!req.body.numberOfPlayers || req.body.numberOfPlayers < 1 || req.body.numberOfPlayers > 999999) {
         return res.status(400).json({ message: 'Missing or illegal number of players' });
      }
      if (!req.body.sports || req.body.sports.length === 0) {
         return res.status(400).json({ message: 'Missing sports or none added' });
      }
      if (!req.body.startDate) {
         return res.status(400).json({ message: 'Missing start date' });
      }
      if (!req.body.endDate) {
         return res.status(400).json({ message: 'Missing end date' });
      }
      if (req.body.startDate > req.body.endDate) {
         return res.status(400).json({ message: 'Start date is after end date' });
      }

      League.findByLeagueName(req.body.leagueName, function(doc) {
         if (doc instanceof Error) {
            return res.status(400).json({ message: 'Database Persistence Error' });
         }
         if (doc !== null) {
            return res.status(400).json({ message: 'That league name is already taken' });
         }
      });

      var league = new League();
      league.leagueName = req.body.leagueName;
      league.leaguePassword = req.body.leaguePassword;
      league.leagueType = req.body.leagueType;
      league.numberOfPlayers = req.body.numberOfPlayers;
      league.sports = req.body.sports;
      league.players = [];
      league.startDate = req.body.startDate;
      league.endDate = req.body.endDate;
      league.private = req.body.private;
      league.commissioner = req.userInfo.username;

      league.save(function(err) {
         if (err) { next(err); }

         return res.json(league);
      });
   });
};