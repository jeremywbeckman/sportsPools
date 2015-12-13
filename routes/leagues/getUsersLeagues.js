/*global module*/
/*global require*/
/*global process*/
var League = require('mongoose').model('League');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});

module.exports = function(app) {
   app.get('/getUsersLeagues', auth, function(req, res) {

      League.getUsersLeagues(req.userInfo.username, function(leagues) {
         if (leagues instanceof Error) {
            return res.status(500).json({ message: 'Internal Database Error' });
         }

         return res.json(leagues);
      });
   });
};