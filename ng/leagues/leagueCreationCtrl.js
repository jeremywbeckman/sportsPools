/*global angular*/
angular.module('app')
.controller('LeagueCreateCtrl', [
   '$scope',
   '$state',
   'gameData',
   'leagueData',
   function($scope, $state, gameData, leagueData) {
      $scope.leagueTypes = [
         'Sports Betting',
         "Pickem",
         "Survivor"
      ];

      var leagueForm = {
         leagueName: '',
         leagueType: "Sports Betting",
         numberOfPlayers: 12,
         sports: ["NFL", "NHL"],
         startDate: '',
         endDate: '',
         private: false,
         leaguePassword: ''
      };

      //TODO Add form validation
      $scope.createLeague = function() {
         leagueData.createLeague(leagueForm).then(
            function(responseData) {
               $state.go('viewLeague', { leagueName: leagueForm.leagueName });
            },
            function(err) {
               $scope.error = err.data;
            }
         );
      };

      $scope.sports = gameData.sports;

      $scope.leagueForm = leagueForm;
   }
]);