/*global angular*/
angular.module('app')
.controller('ProjCtrl', [
   '$scope',
   'data',
   function($scope, data) {
      $scope.aVal = "World";
      $scope.getData = function() {
         data.getData().success(function(val) {
            $scope.aVal = val.retVal;
         });
      };
   }
]);