/*global require*/
/*global module*/
/*global process*/
var Game = require('mongoose').model('Game');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});
var dateFormat = require('dateformat');

module.exports = function(app) {
   app.post('/deleteGame', auth, function(req, res, next) {
      if (!req.body.date || !req.body.awayTeam || !req.body.homeTeam) {
         return res.status(400).json({ message: 'Insufficient data provided for request' });
      }

      var id = dateFormat(req.body.date, 'mmddyyyy') + ": " + req.body.awayTeam + "@" + req.body.homeTeam;
      
      Game.removeById(id, function(err) {
         if (err) { return next(err); }

         return res.status(200).end();
      });
   });
};