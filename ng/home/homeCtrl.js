/*global angular*/
angular.module('app')
.controller('HomeCtrl', [
   '$scope',
   '$state',
   'auth',
   function($scope, $state, auth) {
      $scope.currentUser = auth.currentUser;
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.leagues = [ { "leagueName" : "League One" }, { "leagueName" : "League Two" } ];
      $scope.publicLeagues = [ { "leagueName" : "Public League One" }, { "leagueName" : "Public League Two" } ];
   }
]);