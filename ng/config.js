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

      $urlRouterProvider.otherwise('home');
}]);