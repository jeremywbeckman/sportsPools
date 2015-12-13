/*global angular*/
angular.module('app')
.factory('leagueData', [
   '$http',
   function($http) {
      var leagues = {};

      leagues.createLeague = function(leagueInfo) {
         return $http.post("/createLeague", leagueInfo);
      };
      
      return leagues;
   }
]);