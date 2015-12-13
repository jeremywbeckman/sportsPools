/*global require*/
/*global module*/
/*global process*/
var League = require('mongoose').model('League');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});

module.exports = function(app) {
   app.post('/createLeague', auth, function(req, res, next) {
      if (!req.body.leagueName) {
         return res.status(400).json({ message: 'Missing League Name' });
      }
      if (req.body.private && !req.body.leaguePassword) {
         return res.status(400).json({ message: 'Private league missing password' });
      }
      if (!req.body.leagueType) {
         return res.status(400).json({ message: 'Missing league type' });
      }
      if (!req.body.numberOfPlayers) {
         return res.status(400).json({ message: 'Missing number of players' });
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

      //Add more server side form validation
      var league = new League();
      league.leagueName = req.body.leagueName;
      //TODO hash the password
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