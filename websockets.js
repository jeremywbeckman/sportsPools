/*global require*/
/*global exports*/
/*global process*/
/*global console*/
var _ = require('lodash');
var ws = require('ws');

var clients = [];

exports.connect = function(server) {
   var wss = new ws.Server({server : server});
   wss.on('connection', function(ws) {
      clients.push(ws);
      ws.on('close', function() {
         _.remove(clients, ws);
      });
      
      ws.onmessage = function(message) {
         var json = JSON.stringify({ newData : "WebSocket World" });
         clients.forEach(function(client) {
            client.send(json);
         });
      };
   });
};

exports.broadcast = function() {
   var json = JSON.stringify({ newData : "WebSocket World" });
   clients.forEach(function(client) {
      client.send(json);
   });
};