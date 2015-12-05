/*global angular*/
angular.module('app')
.controller('HomeCtrl', [
   '$scope',
   '$state',
   'auth',
   function($scope, $state, auth) {
      $scope.currentUser = auth.currentUser;
      $scope.isLoggedIn = auth.isLoggedIn;
   }
]);