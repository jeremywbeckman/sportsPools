/*global require*/
/*global module*/
var User = require('mongoose').model('User');

module.exports = function(app) {
   app.post('/updateUsername', function(req, res, next) {
      if (!req.body.badname || !req.body.goodname) {
         return res.status(400).json({ message: 'Insufficient data provided for request' });
      }
      return User.updateUsername(req.body.badname, req.body.goodname, function(user) {
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