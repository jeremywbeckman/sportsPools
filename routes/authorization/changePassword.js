/*global require*/
/*global module*/
var User = require('mongoose').model('User');

module.exports = function(app) {
   app.post('/changePassword', function(req, res, next) {
      if (!req.body.username) {
         return res.status(400).json({ message : 'No username found' });
      }
      if (!req.body.password) {
         return res.status(400).json({ message : 'No password found' });
      }
      if (!req.body.verify) {
         return res.status(400).json({ message : 'No password verification found' });
      }
      if (/\s/g.test(req.body.password)) {
         return res.status(400).json({ message: 'Password contains whitespace' });
      }
      if (req.body.password.length < 8 || req.body.password.length > 30) {
         return res.status(400).json({ message: 'Password has invalid length' });
      }
      var classcount = 0;
      if (req.body.password.match(/[A-Z]/)) { classcount += 1; }
      if (req.body.password.match(/[a-z]/)) { classcount += 1; }
      if (req.body.password.match(/\d+/)) { classcount += 1; }
      if (req.body.password.match(/[!,@,#,$,%,\^,&,*,?,_,~,-,(,)]/)) { classcount += 1; }

      if (classcount < 3) {
         return res.status(400).json({ message: 'Password fails quality check' });
      }
      if (req.body.password !== req.body.verify) {
         return res.status(400).json({ message: 'Passwords do not match' });
      }
      
      User.updatePassword(req.body.username, req.body.password, function(data) {
         if (data instanceof Error) {
            return res.status(400).json({ message: 'Database Persistence Error' });
         }
         
         console.log('returning from here');
         if (data === null) {
            return res.status(400).json({ message: 'User not found, no update performed' });
         }
         
         return res.status(200).json({ message: 'Password Update Successful'});
      });
   });
};