/*global angular*/
angular.module('app')
.controller('UserMgmtCtrl', [
   '$scope',
   '$state',
   'user',
   function($scope, $state, user) {
      user.getNonReviewedUsers().success(function(data) {
         $scope.reviewUsers = data;
         if (data.length > 0) {
            $scope.firstUser = data[0];
            $scope.goodname = data[0].username;
         }
      });

      $scope.approveUser = function() {
         if ($scope.goodname === $scope.firstUser.username) {
            user.reviewComplete($scope.firstUser)
                .error(function(data) {
                   $scope.error = data;
                })
                .then(function(data) {
                    user.getNonReviewedUsers().success(function(data) {
                       $scope.reviewUsers = data;
                       if (data.length > 0) {
                          $scope.firstUser = data[0];
                          $scope.goodname = data[0].username;
                       }
                       else {
                          $scope.goodname = null;
                       }
                   });
                });
         }
         else {
            user.updateUsername($scope.firstUser.username, $scope.goodname)
                .error(function(data) {
                   $scope.error = data;
                })
                .then(function(data) {
                    user.getNonReviewedUsers().success(function(data) {
                       $scope.reviewUsers = data;
                       if (data.length > 0) {
                          $scope.firstUser = data[0];
                          $scope.goodname = data[0].username;
                       }
                       else {
                          $scope.goodname = null;
                       }
                   });
                });
         }
      };
   }
]);