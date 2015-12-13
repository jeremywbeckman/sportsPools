/*global require*/
/*global module*/
/*global process*/
var League = require('mongoose').model('League');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});

module.exports = function(app) {
   app.post('/leagueReviewComplete', auth, function(req, res, next) {
      if (!req.body.leagueName) {
         return res.status(400).json({ message: 'Missing league name' });
      }

      return League.reviewComplete(req.body.leagueName, function(league) {
         if (league instanceof Error) {
            return res.status(500).json({ message: 'Database Error' });
         }

         if (league === null) {
            return res.status(400).json({ message: 'League not found to update' });
         }

         return res.json(league);
      });
   });
};