/*global require*/
/*global module*/
/*global process*/
var User = require('mongoose').model('User');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});

module.exports = function(app) {
   app.get('/usersForReview', auth, function(req, res, next) {
      return User.findReviewableUsers(function(users) {
         if (users instanceof Error) {
            return res.status(500).json({ message: 'Database Error' });
         }
         
         if (users === null) {
            return res.status(400).json({ message: 'No reviewable users found' });
         }
         
         return res.json(users);
      });
   });
};