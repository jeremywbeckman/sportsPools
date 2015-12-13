/*global angular*/
angular.module('app')
.controller('ViewLeagueCtrl', [
   '$scope',
   '$stateParams',
   function($scope, $stateParams) {
      $scope.leagueName = $stateParams.leagueName;
      $scope.league = {};
      $scope.league.private = true;

      $scope.notRegistered = function() {
         return true;
      };
      
      $scope.registerForLeague = function() {
         return true;
      };
   }
]);