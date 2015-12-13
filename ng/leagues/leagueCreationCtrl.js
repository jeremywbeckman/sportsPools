/*global angular*/
angular.module('app')
.controller('LeagueCreateCtrl', [
   '$scope',
   '$state',
   'gameData',
   'leagueData',
   function($scope, $state, gameData, leagueData) {
      var now = new Date();
      var leagueForm = {
         leagueName: '',
         leagueType: "Sports Betting",
         numberOfPlayers: 12,
         sports: ["NFL"],
         startDate: new Date(1900 + now.getYear(), now.getMonth(), now.getDate(), 0, 0, 0),
         endDate: new Date(1900 + now.getYear(), now.getMonth(), now.getDate() + 30, 0, 0, 0),
         private: true,
         leaguePassword: ''
      };

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

      $scope.validateForm = function() {
         return $scope.validateLeagueName() &&
                $scope.validateSports() &&
                $scope.validateDates &&
                $scope.validatePassword();
      };

      $scope.validateLeagueName = function() {
         if (/\s/g.test(leagueForm.leagueName)) {
            $scope.leagueNameMessage = "League name cannot contain whitespace";
            return false;
         }
         else {
            $scope.leagueNameMessage = "";
         }

         return true;
      };

      $scope.validateSports = function() {
         if (leagueForm.sports.length === 0) {
            $scope.sportsMessage = 'At least one sport must be selected';
            return false;
         }
         else {
            $scope.sportsMessage = '';
         }

         return true;
      };

      $scope.validateDates = function() {
         if (leagueForm.startDate > leagueForm.endDate) {
            $scope.datesMessage = 'Start date must be before end date';
            return false;
         }
         else {
            $scope.datesMessage = '';
         }
         
         return true;
      };

      $scope.validatePassword = function() {
         if (/\s/g.test(leagueForm.leaguePassword)) {
            $scope.leaguePwdMessage = 'League password cannot contain whitespace';
            return false;
         }
         else if (leagueForm.private && leagueForm.leaguePassword.length === 0) {
            $scope.leaguePwdMessage = 'Required';
            return false;
         }
         else {
            $scope.leaguePwdMessage = '';
         }
         
         return true;
      };

      $scope.leagueTypes = leagueData.leagueTypes;
      $scope.sports = gameData.sports;

      $scope.validatePassword();
      $scope.leagueForm = leagueForm;
   }
]);