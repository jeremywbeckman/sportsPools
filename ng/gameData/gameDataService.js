/*global angular*/
angular.module('app')
.factory('gameData', [
   '$http',
   '$filter',
   function($http, $filter) {
   var games = {};
   games.sports = ["NFL", "NBA", "NHL", "MLB"];

   games.getTeams = function(sport, date) {
      return $http.get("/getTeams/" + sport + "/" + $filter('date')(date, "MMddyyyy"));
   };
   
   games.getGamesForDate = function(sport, date) {
     return $http.get("/getGames/" + sport + "/" + $filter('date')(date, "MMddyyyy"));
   };
      
   games.removeGame = function(gameData) {
      return $http.post("/deleteGame", gameData);
   };
   
   games.saveGame = function(gameData) {
      return $http.post("/saveGame", gameData);
   };
   
   return games;
}]);