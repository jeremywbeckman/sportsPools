/*global module*/
module.exports = function(app) {
   app.get('/getData', function(req, res) {
      return res.json({ retVal: "Routed World" });
   });
};