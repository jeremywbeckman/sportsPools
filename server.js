/*global require*/
/*global __dirname*/
/*global module*/
/*global process*/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(require('./routes'));

app.listen(process.env.PORT || 3000);
module.exports = app;
