require('angular/angular');
require('angular-route'); // for router
require('angular-base64'); //for encoding
var angular = window.angular; //appease the jshint gods

var triviApp = angular.module('triviApp', ['ngRoute', 'base64']); // injecting files from above

require('./services/services')(triviApp);
require('./trivia/trivia')(triviApp);
require('./users/users')(triviApp);
require('./router')(triviApp);
