/*global require*/
/*global module*/
/*global process*/
var League = require('mongoose').model('League');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.SECKEY, userProperty: 'userInfo'});

module.exports = function(app) {
   app.post('/createLeague', auth, function(req, res, next) {
      if (!req.body.leagueName || req.body.leagueName.length < 4 || req.body.leagueName.length > 20) {
         return res.status(400).json({ message: 'Missing or Illegal League Name' });
      }
      if (req.body.private && (!req.body.leaguePassword || req.body.leaguePassword.length < 4 || req.body.leaguePassword.length > 20)) {
         return res.status(400).json({ message: 'Private league with missing or illegal password' });
      }
      if (!req.body.leagueType) {
         return res.status(400).json({ message: 'Missing league type' });
      }
      if (!req.body.numberOfPlayers || req.body.numberOfPlayers < 1 || req.body.numberOfPlayers > 999999) {
         return res.status(400).json({ message: 'Missing or illegal number of players' });
      }
      if (!req.body.sports || req.body.sports.length === 0) {
         return res.status(400).json({ message: 'Missing sports or none added' });
      }
      if (!req.body.startDate) {
         return res.status(400).json({ message: 'Missing start date' });
      }
      if (!req.body.endDate) {
         return res.status(400).json({ message: 'Missing end date' });
      }
      if (req.body.startDate > req.body.endDate) {
         return res.status(400).json({ message: 'Start date is after end date' });
      }

      League.findByLeagueName(req.body.leagueName, function(doc) {
         if (doc instanceof Error) {
            return res.status(400).json({ message: 'Database Persistence Error' });
         }
         if (doc !== null) {
            return res.status(400).json({ message: 'That league name is already taken' });
         }
      });

      var sportsBettingDefaults = {
         allowedBets: ["ATS", "OU", "ML"],
         prizeDonation: 10000,
         startingBankroll: 10000,
         minBetsPerWeek: 5,
         minAmountPerBet: 1,
         maxAmountPerBet: 2500,
         mustBetMinimum: 5000,
         mustBetEveryGame: false,
         prizeStructure: [
                         { place: 1, percentage: 50 },
                         { place: 2, percentage: 30 },
                         { place: 3, percentage: 20 }
                         ]
      };
      
      var pickemDefaults = {
         prizeDonation: 10000,
         gameWeights: "linear",   //Other options: equal, exponential
         weekPercentageForBonus: 0,
         weeklyAvailableBonus: 0,
         prizeStructure: [
                         { place: 1, percentage: 50 },
                         { place: 2, percentage: 30 },
                         { place: 3, percentage: 20 }
                         ]
      };
      
      var survivorDefaults = {
         prizeDonation: 10000,
         teamOnceOnly: true,
         tieBreaker: "split",   //Other option: continue
         prizeStructure: [
                         { place: 1, percentage: 50 },
                         { place: 2, percentage: 30 },
                         { place: 3, percentage: 20 }
                         ]
      };
      
      var league = new League();
      league.leagueName = req.body.leagueName;
      league.password = req.body.leaguePassword;
      league.leagueType = req.body.leagueType;
      league.numberOfPlayers = req.body.numberOfPlayers;
      league.sports = req.body.sports;
      league.players = [ req.userInfo.username ];
      league.startDate = req.body.startDate;
      league.endDate = req.body.endDate;
      league.private = req.body.private;
      league.reviewed = false;
      league.commissioner = req.userInfo.username;
      
      if (req.body.leagueType === "Sports Betting") {
         league.preferences = sportsBettingDefaults;
      }
      else if (req.body.leagueType === "Pickem") {
         league.preferences = pickemDefaults;
      }
      else if (req.body.leagueType === "Survivor") {
         league.preferences = survivorDefaults;
      }

      league.save(function(err) {
         if (err) { next(err); }

         return res.json(league);
      });
   });
};