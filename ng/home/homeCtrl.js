/*global angular*/
angular.module('app')
.controller('HomeCtrl', [
   '$scope',
   '$state',
   'auth',
   'leagueData',
   'gameData',
   function($scope, $state, auth, leagueData, gameData) {
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;
      $scope.leagueTypes = leagueData.leagueTypes;
      $scope.sports = gameData.sports;
      
      var searchForm = {
         leagueName: '',
         leagueType: '',
         sports: [],
         private: ''
      };
      
      $scope.getLeagues = function() {
         leagueData.getLeagues(searchForm).then(
            function(responseData) {
               $scope.leagues = responseData.data;
               $scope.error = '';
            },
            function(error) {
               $scope.error = error.data;
            }
         );
      };

      $scope.getMyLeagues = function() {
         leagueData.getMyLeagues().then(
            function(responseData) {
               $scope.myLeagues = responseData.data;
               $scope.error = '';
            },
            function(error) {
               $scope.error = error.data;
            }
         );
      };

      $scope.getLeagues();
      $scope.getMyLeagues();
      $scope.searchForm = searchForm;
   }
]);