/*global require*/
/*global module*/
var User = require('mongoose').model('User');

module.exports = function(app) {
   app.post('/userReviewComplete', function(req, res, next) {
      if (!req.body.username) {
         return res.status(400).json({ message: 'Missing username' });
      }

      return User.reviewComplete(req.body.username, function(user) {
         if (user instanceof Error) {
            return res.status(400).json({ message: 'Database Error' });
         }

         if (user === null) {
            return res.status(400).json({ message: 'User not found to update' });
         }

         return res.json(user);
      });
   });
};