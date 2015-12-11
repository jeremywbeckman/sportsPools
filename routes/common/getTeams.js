/*global module*/
/*global require*/
var Teams = require('mongoose').model('Teams');

module.exports = function(app) {
   app.param('sport', function(req, res, next, sport) {
      req.sport = sport;
      next();
   });
   
   app.param('valid', function(req, res, next, valid) {
      req.valid = valid;
      next();
   });
   
   app.get('/getTeams/:sport/:valid', function(req, res) {
      if (!req.sport) {
         return res.status(400).json({ message: 'Missing sport' });
      }
      
      if (!req.valid) {
         return res.status(400).json({ message: 'Missing date' });
      }

      var validDate = new Date(req.valid.substr(4, 4), req.valid.substr(0, 2), req.valid.substr(2, 2));
      Teams.getTeamsForSport(req.sport, validDate, function(teams) {
         if (teams instanceof Error) {
            return res.status(500).json({ message: 'Internal Database Error' });
         }

         return res.json(teams);
      });
   });
};