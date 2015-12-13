/*global require*/
/*global module*/
/*global process*/
var League = require('mongoose').model('League');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});

module.exports = function(app) {
   app.post('/updateLeaguename', auth, function(req, res, next) {
      if (!req.body.badname || !req.body.goodname) {
         return res.status(400).json({ message: 'Insufficient data provided for request' });
      }
      return League.updateLeagueName(req.body.badname, req.body.goodname, function(league) {
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