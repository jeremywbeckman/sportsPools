/*global angular*/
angular.module('app')
.controller('ProjCtrl', [
   '$scope',
   'wsService',
   'data',
   function($scope, wsService, data) {
      $scope.aVal = "World";
      
      $scope.getData = function() {
         data.getData().success(function(val) {
            $scope.aVal = val.retVal;
         });
      };
      
      $scope.getWSData = wsService.sendRequest;
      
      $scope.$on('ws:newData', function(_, newData) {
         $scope.$apply(function() {
            $scope.aVal = newData;
         });
      });
   }
]);