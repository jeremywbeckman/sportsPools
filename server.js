/*global require*/
/*global __dirname*/
/*global module*/
/*global process*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('morgan');
var partials = require('express-partials');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bflp');
var passport = require('passport');
require('./models/Users');
require('./config/passport');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(partials());

//Use all routes found in the routes directory:
var fs = require('fs');
function recursiveRoutes(folderName) {
   fs.readdirSync(folderName).forEach(function(file) {

      var fullName = path.join(folderName, file);
      var stat = fs.lstatSync(fullName);

      if (stat.isDirectory()) {
         recursiveRoutes(fullName);
      }
      else if (file.toLowerCase().indexOf('.js')) {
         require('./' + fullName)(app);
      }
   });
}
recursiveRoutes('routes');

app.use(passport.initialize());

var server = app.listen(process.env.PORT || 3000);
require('./websockets').connect(server);
module.exports = app;