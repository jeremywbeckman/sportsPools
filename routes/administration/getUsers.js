/*global require*/
/*global module*/
var User = require('mongoose').model('User');

module.exports = function(app) {
   app.get('/usersForReview', function(req, res, next) {
      return User.findReviewableUsers(function(users) {
         if (users instanceof Error) {
            return res.status(400).json({ message: 'Database Error' });
         }
         
         if (users === null) {
            return res.status(400).json({ message: 'No reviewable users found' });
         }
         
         return res.json(users);
      });
   });
};