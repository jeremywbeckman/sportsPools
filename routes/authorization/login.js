/*global require*/
/*global module*/
var User = require('mongoose').model('User');

module.exports = function(app) {
   app.post('/login', function(req, res, next) {
      if (!req.body.username) {
         return res.status(400).json({ message: 'Missing Username' });
      }
      if (!req.body.password) {
         return res.status(400).json({ message: 'Missing password' });
      }

      User.findByUsername(req.body.username, function(user) {
         if (user instanceof Error) {
            return res.status(400).json({ message: 'Site Database Error' });
         }
         
         if (user !== null) {
            if (user.validPassword(req.body.password)) {
               console.log('Updating last login');
               user.updateLastLogin();
               return res.json({ token : user.generateJWT() });
            }
            
            return res.status(400).json({ message: 'Incorrect password' });
         }
         
         return res.status(400).json({ message: 'Username not found' });
      });
   });
};