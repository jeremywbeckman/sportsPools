/*global angular*/
angular.module('app')
.controller('LeagueMgmtCtrl', [
   '$scope',
   'auth',
   function($scope, auth) {
      $scope.currentUser = auth.currentUser;
   }
]);