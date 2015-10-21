require('angular/angular');
require('angular-route');
require('angular-base64'); 
var angular = window.angular; 

var triviApp = angular.module('triviApp', ['ngRoute', 'base64']); 

require('./services/services')(triviApp);
require('./game/game')(triviApp);
require('./users/users')(triviApp);
require('./router')(triviApp);
