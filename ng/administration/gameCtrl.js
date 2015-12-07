/*global angular*/
angular.module('app')
.controller('GameMgmtCtrl', [
   '$scope',
   'auth',
   function($scope, auth) {
      $scope.currentUser = auth.currentUser;
   }
]);