/*global angular*/
angular.module('app')
.config([
   '$stateProvider',
   '$urlRouterProvider',
   function($stateProvider, $urlRouterProvider) {

      $stateProvider.state('home', {
         url: '/home',
         templateUrl: '/home.html',
         controller: 'HomeCtrl'
      });

      $stateProvider.state('login', {
         url: '/login',
         templateUrl: '/login.html',
         controller: 'AuthCtrl'
      });

      $stateProvider.state('register', {
         url: '/register',
         templateUrl: '/register.html',
         controller: 'AuthCtrl'
      });

      $stateProvider.state('accountDetails', {
         url: '/accountDetails',
         templateUrl: '/accountDetails.html',
         controller: 'AuthCtrl'
      });

      $stateProvider.state('manageUsers', {
         url: '/manageUsers',
         templateUrl: '/manageUsers.html',
         controller: 'UserMgmtCtrl'
      });

      $stateProvider.state('manageGames', {
         url: '/manageGames',
         templateUrl: '/manageGames.html',
         controller: 'GameMgmtCtrl'
      });

      $stateProvider.state('manageLeagues', {
         url: '/manageLeagues',
         templateUrl: '/manageLeagues.html',
         controller: 'LeagueMgmtCtrl'
      });

      $stateProvider.state('createLeague', {
         url: '/createLeague',
         templateUrl: '/createLeague.html',
         controller: 'LeagueCreateCtrl'
      });

      $stateProvider.state('registerLeague', {
         url: '/registerLeague',
         templateUrl: '/registerLeague.html',
         controller: 'RegisterLeagueCtrl'
      });

      $stateProvider.state('viewLeague', {
         url: '/viewLeague/:leagueName',
         templateUrl: '/viewLeague.html',
         controller: 'ViewLeagueCtrl'
      });

      $stateProvider.state('userStats', {
         url: '/userStats',
         templateUrl: '/userStats.html',
         controller: 'UserStatCtrl'
      });

      $urlRouterProvider.otherwise('home');
}]);