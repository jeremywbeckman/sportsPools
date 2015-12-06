/*global module*/
/*global console*/
/*global require*/
var User = require('mongoose').model('User');

module.exports = function(app) {
   app.post('/registerUser', function(req, res, next) {
      if (!req.body.username) {
         return res.status(400).json({ message: 'Missing username' });
      }
      if (!req.body.password) {
         return res.status(400).json({ message: 'Missing password' });
      }
      if (!req.body.verify) {
         return res.status(400).json({ message: 'Missing verification' });
      }
      if (!req.body.email) {
         return res.status(400).json({ message: 'Missing email address' });
      }
      if (!req.body.firstname) {
         return res.status(400).json({ message: 'Missing first name' });
      }
      if (!req.body.lastname) {
         return res.status(400).json({ message: 'Missing last name' });
      }

      if (/\s/g.test(req.body.username)) {
         return res.status(400).json({ message: 'Username ' + req.body.username + ' contains whitespace' });
      }
      if (req.body.username.length < 4 || req.body.username.length > 20) {
         return res.status(400).json({ message: 'Username has invalid length' });
      }
      if (req.body.email.length > 100) {
         return res.status(400).json({ message: 'Email address too long' });
      }
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)) {
         return res.status(400).json({ message: 'Email address invalid' });
      }
      if (req.body.firstname.length > 30) {
         return res.status(400).json({ message: 'First name has invalid length' });
      }
      if (req.body.lastname.length > 30) {
         return res.status(400).json({ message: 'Last name has invalid length' });
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

      User.findByUsername(req.body.username, function(doc) {
         if (doc instanceof Error) {
            return res.status(400).json({ message: 'Database Persistence Error' });
         }
         if (doc !== null) {
            console.log("Previous user found");
            return res.status(400).json({ message: 'Username already taken' });
         }

         var user = new User();
         user.username = req.body.username;
         user.setPassword(req.body.password);
         user.email = req.body.email;
         user.firstname = req.body.firstname;
         user.lastname = req.body.lastname;
         user.role = "siteUser";
         user.lastlogin = new Date();

         user.save(function(err) {
            if (err) { return next(err); }

            return res.json({ token: user.generateJWT()});
         });
      });
   });
};