/*global module*/
/*global require*/
/*global process*/
var League = require('mongoose').model('League');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});

module.exports = function(app) {
   app.post('/registerForLeague', auth, function(req, res, next) {
      if (!req.body.leagueName) {
         return res.status(400).json({ message: "League name missing" });
      }

      League.getLeagues(req.body.leagueName, '', '', '', function(leagues) {
         if (leagues instanceof Error) {
            return res.status(500).json({ message: 'Internal Database Error' });
         }

         var league = leagues[0];
         console.log(league.private);
         if (league.private && !req.body.leaguePassword) {
            return res.status(400).json({ message: 'League is private and password not provided' });
         }
         
         if (league.private && league.password !== req.body.leaguePassword) {
            return res.status(400).json({ message: 'League is private and incorrect password provided' });
         }
         
         
         if (league.players.indexOf(req.userInfo.username) != -1) {
            return res.status(400).json({ message: 'You are already registered for this league'});
         }
         
         //Make sure league isn't already full
         if (league.players.length >= league.numberOfPlayers) {
            return res.status(400).json({ message: 'League is full' });
         }
         
         league.players.push(req.userInfo.username);
         console.log(league.players);
         
         League.addUser(league, function(responseData) {
            if (responseData instanceof Error) {
               return res.status(500).json({ message: 'Server Database Error' });
            }
            
            console.log(responseData);
            return res.json(responseData);
         });
      });
   });
};