/*global angular*/
/*global WebSocket*/
/*global console*/
angular.module('app')
.factory('wsService', ['$rootScope', '$window', function($rootScope, $window) {
   var websocket = {};
   
   var host;
   if ($window.location.protocol === "https:") {
      host = "wss://" + $window.location.host;
   }
   else {
      host = "ws://" + $window.location.host;
   }
   var connection = new WebSocket(host);
   
   connection.onmessage = function (e) {
      var payload = JSON.parse(e.data);
      $rootScope.$broadcast('ws:newData', payload.newData);
   };
   
   websocket.sendRequest = function() {
      connection.send('Give Me Data');
   };
   
   return websocket;
}]);