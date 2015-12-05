/*global angular*/
angular.module('app')
.controller('NavCtrl', [
   '$scope',
   '$state',
   'auth',
   function($scope, $state, auth) {
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;
      $scope.logout = function() {
         auth.logout();
         $state.go('home');
      };
   }
]);