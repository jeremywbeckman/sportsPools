/*global require*/
/*global module*/
/*global process*/
var League = require('mongoose').model('League');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});

module.exports = function(app) {
   app.get('/leaguesForReview', auth, function(req, res, next) {
      return League.findReviewableLeagues(function(leagues) {
         if (leagues instanceof Error) {
            return res.status(500).json({ message: 'Database Error' });
         }
         
         if (leagues === null) {
            return res.status(400).json({ message: 'No reviewable leagues found' });
         }
         
         return res.json(leagues);
      });
   });
};