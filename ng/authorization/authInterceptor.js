/*global angular*/
angular.module('app')
.factory('authInterceptor', [
   '$injector',
   function($injector) {
         return {
            request: function(config) {
               var auth = $injector.get('auth');
               var token = auth.getToken();
               if (token) {
                  config.headers.Authorization = 'Bearer ' + token;
               }

               return config;
            },

            response: function(res) {
               var auth = $injector.get('auth');
               if (res.data.token) {
                  auth.saveToken(res.data.token);
               }

                return res;
            }
         };
   }]);

angular.module('app')
.config([
   '$httpProvider',
   function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
   }
]);