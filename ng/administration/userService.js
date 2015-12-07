/*global angular*/
angular.module('app')
.factory('user', [
   '$http',
   function($http) {
      var user = {};

      user.getNonReviewedUsers = function() {
         return $http.get('/usersForReview');
      };

      user.reviewComplete = function(user) {
         return $http.post('/userReviewComplete', user);
      };

      user.updateUsername = function(badname, goodname) {
         return $http.post('/updateUsername', { "badname" : badname, "goodname" : goodname });
      };

      return user;
   }
]);