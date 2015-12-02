/*global require*/
/*global module*/
var express = require('express');
var router = express.Router();

router.get('/getData', function(req, res) {
   return res.json({ retVal: "Routed World" });
});

module.exports = router;