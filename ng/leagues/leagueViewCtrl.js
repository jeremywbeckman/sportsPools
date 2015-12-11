/*global angular*/
angular.module('app')
.controller('ViewLeagueCtrl', [
   '$scope',
   '$stateParams',
   function($scope, $stateParams) {
      $scope.leagueName = $stateParams.leagueName;
   }
]);