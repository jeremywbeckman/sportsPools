/*global angular*/
angular.module('app')
.controller('LeagueMgmtCtrl', [
   '$scope',
   '$state',
   'leagueAdmin',
   function($scope, $state, leagueAdmin) {

      var getLeagues = function(data) {
         $scope.reviewLeagues = data;
         if (data.length > 0) {
            $scope.firstLeague = data[0];
            $scope.goodLeague = data[0].leagueName;
         }
         else {
            $scope.goodLeague = null;
         }
      };

      leagueAdmin.getNonReviewedLeagues().success(getLeagues);

      $scope.approveLeague = function() {
         if ($scope.goodLeague === $scope.firstLeague.leagueName) {
            leagueAdmin.reviewComplete($scope.firstLeague)
                .error(function(data) {
                   $scope.error = data;
                })
                .then(function(data) {
                    leagueAdmin.getNonReviewedLeagues().success(getLeagues);
                });
         }
         else {
            leagueAdmin.updateLeagueName($scope.firstLeague.leagueName, $scope.goodLeague)
                .error(function(data) {
                   $scope.error = data;
                })
                .then(function(data) {
                    leagueAdmin.getNonReviewedLeagues().success(getLeagues);
                });
         }
      };
   }
]);