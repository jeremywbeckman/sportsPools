/*global angular*/
angular.module('app')
.factory('leagueAdmin', [
   '$http',
   function($http) {
      var leagueAdmin = {};

      leagueAdmin.getNonReviewedLeagues = function() {
         return $http.get('/leaguesForReview');
      };

      leagueAdmin.reviewComplete = function(league) {
         return $http.post('/leagueReviewComplete', league);
      };

      leagueAdmin.updateLeagueName = function(badname, goodname) {
         return $http.post('/updateLeaguename', { "badname" : badname, "goodname" : goodname });
      };

      return leagueAdmin;
   }
]);