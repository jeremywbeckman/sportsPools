/*global module*/
/*global require*/
/*global process*/
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});

module.exports = function(app) {
   app.get('/', function(req, res) {
      res.render('index');
   });
};