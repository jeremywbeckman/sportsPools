/*global angular*/
angular.module('app')
.factory('data', ['$http', function($http) {
   var data = {};
   
   data.getData = function() {
      return $http.get('/getData');
   }
   
   return data;
}]);