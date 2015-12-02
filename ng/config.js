/*global angular*/
angular.module('app')
.config([
   '$stateProvider',
   '$urlRouterProvider',
   function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('/someUrl', {
         url: '/someUrl',
         templateUrl: '/someUrl.html',
         controller: 'UrlCtrl'
      });
}]);