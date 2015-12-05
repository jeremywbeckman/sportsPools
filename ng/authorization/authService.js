/*global angular*/
/*global console*/
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
         return $http.post('/registerUser', user)
                     .success(function(data) {
            auth.saveToken(data.token);
         });
      };

      auth.login = function(user) {
         return $http.post('/login', user)
                     .success(function(data) {
            auth.saveToken(data.token);
         });
      };

      auth.logout = function() {
         $window.localStorage.removeItem('bestSportsLeagues-token');
      };

      return auth;
   }
]);