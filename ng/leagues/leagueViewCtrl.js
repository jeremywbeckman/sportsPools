/*global angular*/
angular.module('app')
.controller('ViewLeagueCtrl', [
   '$scope',
   '$stateParams',
   'auth',
   'leagueData',
   function($scope, $stateParams, auth, leagueData) {
      $scope.currentUser = auth.currentUser().username;
      
      $scope.registerForm = {
         leagueName: '',
         leaguePassword: ''
      };

      var getLeagueData = function() {
         leagueData.getLeagueByName($stateParams.leagueName).then(
            function(ld) {
               $scope.league = ld.data[0];
               $scope.registerForm.leagueName = $scope.league.leagueName;
            },
            function(error) {
               $scope.error = error.data;
            }
         );
      };

      $scope.registerForLeague = function() {
         leagueData.registerForLeague($scope.registerForm).then(
            function(responseData) {
               $scope.info = { message: "You have successfully registered for this league" };
               $scope.error = "";
               getLeagueData();
            },
            function(error) {
               $scope.error = error.data;
               $scope.info = "";
            }
         );
      };
      
      $scope.isRegistered = function() {
         if ($scope.league) {
            return $scope.league.players.indexOf($scope.currentUser) != -1;
         }
         return true;
      };
      
      $scope.leagueFull = function() {
         if ($scope.league) {
            return $scope.league.players.length >= $scope.league.numberOfPlayers;
         }
         return true;
      };
      
      $scope.leagueStarted = function() {
         if ($scope.league) {
            return $scope.league.startDate < new Date();
         }
         return true;
      };
      
      $scope.leagueEnded = function() {
         if ($scope.league) {
            return $scope.league.endDate < new Date();
         }
         return true;
      };
      
      getLeagueData();
   }
]);