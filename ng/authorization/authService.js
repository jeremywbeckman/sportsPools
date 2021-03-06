/*global angular*/
angular.module('app')
.factory('auth', [
   '$http',
   '$window',
   function($http, $window) {
      var auth = {};

      auth.saveToken = function(token) {
         $window.localStorage['bestSportsLeagues-token'] = token;
      };

      auth.getToken = function() {
         return $window.localStorage['bestSportsLeagues-token'];
      };

      auth.isLoggedIn = function() {
         if (auth.getToken()) {
            var userInfo = JSON.parse($window.atob(auth.getToken().split('.')[1]));
            
            return userInfo.exp > Date.now() / 1000;
         }
         else {
            return false;
         }
      };

      auth.currentUser = function() {
         if (auth.isLoggedIn()) {
            return JSON.parse($window.atob(auth.getToken().split('.')[1]));
         }
      };

      auth.register = function(user) {
         return $http.post('/registerUser', user);
      };

      auth.changePassword = function(user) {
         user.username = auth.currentUser().username;
         return $http.post('/changePassword', user);
      };

      auth.login = function(user) {
         return $http.post('/login', user);
      };

      auth.logout = function() {
         $window.localStorage.removeItem('bestSportsLeagues-token');
      };

      return auth;
   }
]);