/*global require*/
/*global process*/
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
   username: { type: String, required: true },
   email: { type: String, required: true },
   firstname: { type: String, required: true },
   lastname: { type: String, required: true },
   role: { type: String, required: true },
   reviewed: Boolean,
   lastlogin: Date,
   hash: { type: String, required: true },
   salt: { type: String, required: true }
});

UserSchema.methods.setPassword = function(password) {
   this.salt = crypto.randomBytes(16).toString('hex');
   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
   var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
   return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
   // set expiration to 7 days
   var exp = new Date();
   exp.setDate(new Date().getDate() + 7);

   return jwt.sign({
      username: this.username,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      role: this.role,
      lastlogin: this.lastlogin,
      exp: parseInt(exp.getTime() / 1000, 10)
   }, process.env.SECKEY);
};

UserSchema.methods.updateLastLogin = function() {
   console.log('Updating the last login time for ' + this.username);
   this.model('User').findOneAndUpdate({ "username" : this.username }, { "lastlogin" : new Date() }, function(err, user) {
      if (err) { console.log('database error occurred, lastlogin not updated'); }
      
      console.log(user.username + ' last login updated');
   });
};

UserSchema.methods.persistPassword = function() {
   this.model('User').findOneAndUpdate({ "username" : this.username }, 
                                       { "hash" : this.hash, "salt" : this.salt },
                                       function(err, user) {
      if (err) { console.log('database error occurred, password not updated'); }
      
      console.log(user.username + ' password has been updated');
   });
};

UserSchema.statics.findByUsername = function(username, cbFunc) {
   this.findOne({ "username" : username }, function(err, user) {
      if (err) { return cbFunc(err); }

      return cbFunc(user);
   });
};

UserSchema.statics.updatePassword = function(username, password, cbFunc) {
   this.findOne({ "username" : username }, function(err, user) {
      if (err) { return cbFunc(err); }

      if (user !== null) {
         user.setPassword(password);
         user.persistPassword();
         return cbFunc(user);
      }

      return cbFunc(null);
   });
};

UserSchema.statics.findReviewableUsers = function(cbFunc) {
   this.find({ "reviewed" : false }, 'username', function(err, users) {
      if (err) { return cbFunc(err); }

      return cbFunc(users);
   });
};

UserSchema.statics.reviewComplete = function(username, cbFunc) {
   this.findOneAndUpdate({ "username" : username }, { "reviewed" : true }, function(err, user) {
      if (err) { return cbFunc(err); }
      
      return cbFunc(user);
   });
};

UserSchema.statics.updateUsername = function(badname, goodname, cbFunc) {
   this.findOneAndUpdate({ "username" : badname }, { "username" : goodname, "reviewed" : true }, function(err, user) {
      if (err) { return cbFunc(err); }
      
      return cbFunc(user);
   });
};

mongoose.model('User', UserSchema);