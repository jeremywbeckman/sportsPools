/*global angular*/
angular.module('app')
.factory('leagueData', [
   '$http',
   function($http) {
      var leagues = {};

      leagues.leagueTypes = [
         "Sports Betting",
         "Pickem",
         "Survivor"
      ];

      leagues.createLeague = function(leagueInfo) {
         return $http.post("/createLeague", leagueInfo);
      };

      leagues.getLeagues = function(leagueSearch) {
         console.log(leagueSearch);
         var params = { params: {
            sports: leagueSearch.sports
         }
         };
         if (leagueSearch.leagueName) {
            params.params.leagueName = leagueSearch.leagueName;
         }
         if (leagueSearch.leagueType) {
            params.params.leagueType = leagueSearch.leagueType;
         }
         if (leagueSearch.private) {
            params.params.private = leagueSearch.private;
         }
         console.log(params);
         return $http.get("/getLeagues", params);
      };

      leagues.getMyLeagues = function() {
         return $http.get("/getUsersLeagues");
      };

      return leagues;
   }
]);