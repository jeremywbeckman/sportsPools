/*global require*/
/*global module*/
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
   res.render('index.ejs');
});

router.use(require('./route'));

module.exports = router;