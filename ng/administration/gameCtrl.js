/*global angular*/
angular.module('app')
.controller('GameMgmtCtrl', [
   '$scope',
   'gameData',
   function($scope, gameData) {
      $scope.sports = gameData.sports;

      var now = new Date();
      $scope.gameData = {
         sport: "NFL",
         date: new Date(1900 + now.getYear(), now.getMonth(), now.getDate(), 0, 0, 0)
      };

      $scope.loadGame = function(game) {
         $scope.gameData.awayTeam = game.awayTeam;
         $scope.gameData.homeTeam = game.homeTeam;
         $scope.gameData.awayScore = game.awayScore;
         $scope.gameData.homeScore = game.homeScore;
         $scope.gameData.gameLine = game.gameLine;
         $scope.gameData.awayLineOdds = game.awayLineOdds;
         $scope.gameData.homeLineOdds = game.homeLineOdds;
         $scope.gameData.awayMoneyLine = game.awayMoneyLine;
         $scope.gameData.homeMoneyLine = game.homeMoneyLine;
         $scope.gameData.overUnder = game.overUnder;
         $scope.gameData.overOdds = game.overOdds;
         $scope.gameData.underOdds = game.underOdds;
      };

      $scope.saveGame = function() {
         gameData.saveGame($scope.gameData).then(
            function(responseData) {
               $scope.info = { message: "Game Saved" };
               $scope.error = undefined;
               $scope.resetForm();
            },
            function(error) {
               $scope.error = error.data;
               $scope.info = undefined;
            }
         );
      };

      $scope.deleteGame = function() {
         gameData.removeGame($scope.gameData).then(
            function(responseData) {
               $scope.info = { message: 'Game Deleted' };
               $scope.error = undefined;
               $scope.resetForm();
            },
            function(error) {
               $scope.error = error.data;
               $scope.info = undefined;
            }
         );
      };

      $scope.sportSelected = function() {
         gameData.getTeams($scope.gameData.sport, $scope.gameData.date).then(
            function(teams) {
               $scope.teams = [];
               for (var team in teams.data) {
                  $scope.teams.push(teams.data[team].location + ' ' + teams.data[team].name);
               }
               $scope.teams.sort();
               $scope.gameData.awayTeam = $scope.teams[0];
               $scope.gameData.homeTeam = $scope.teams[$scope.teams.length-1];
            },
            function(error) {
               $scope.error = error.data;
            }
         );
      };

      $scope.resetForm = function() {
         $scope.sportSelected();
         gameData.getGamesForDate($scope.gameData.sport, $scope.gameData.date).then(
            function(games) {
               $scope.existingGames = games.data;
            },
            function() {
               $scope.error = { message: 'Failed to retrieve game data' };
            }
         );
         $scope.gameData.awayScore = '';
         $scope.gameData.homeScore = '';
         $scope.gameData.gameLine = '';
         $scope.gameData.awayLineOdds = '';
         $scope.gameData.homeLineOdds = '';
         $scope.gameData.homeMoneyLine = '';
         $scope.gameData.awayMoneyLine = '';
         $scope.gameData.overUnder = '';
         $scope.gameData.overOdds = '';
         $scope.gameData.underOdds = '';
      };

      $scope.resetForm();
   }
]);