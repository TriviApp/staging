require('angular/angular');
require('angular-route'); // for router
require('angular-base64'); //for encoding
require('angular-cookies'); // more encoding stuff
var angular = window.angular; //appease the jshint gods

var triviApp = angular.module('triviApp', ['ngRoute, base64, ngCookies']); // injecting files from above

require('./services/services.js')(triviApp);
require('./directives/directives.js')(triviApp);
require('./trivia/trivia.js')(triviApp);
require('./users/users.js')(triviApp);

triviApp.config(['$routeProvider', function($route) {
	$route
		.when('route      ', {
			templateUrl: '/templates/         '
		})
		.when(' ', {
			templateUrl:
			controller:
		})
		.when('  ', {
			templateUrl:
			controller:
		})
		.otherwise({
			redirectTo: ' '
		});
}]);