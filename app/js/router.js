module.exports = function(app) {
  app.config(['$routeProvider', '$httpProvider',  function($route, $httpProvider) {
  $httpProvider.interceptors.push(function($q, $location) {
    return {
      response: function(response) {
        return response;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) $location.url('/login');
        return $q.reject(response);
      }
    }
  });
  $route
    .when('/signin', {
      templateUrl: '/templates/views/login_view.html',
      controller: 'SigninController'
    })
    .when('/signup', {
      templateUrl: '/templates/views/login_view.html',
      controller: 'SignupController'      
    })
    .when('/home', {
      templateUrl: '/templates/views/home_view.html',
      controller: 'HomeController'
    })
    .when('/newgame', {
      templateUrl: '/templates/views/gameplay_view.html',
      controller: 'GameController'
    })
    .when('/profile', {
      templateUrl: '/templates/views/profile_view.html',
      controller: 'ProfileController'
    })
    .when('/results', {
      templateUrl: '/templates/views/scorecard_view.html',
      controller: 'ScorecardController'
    })
    .when('/endgame', {
      templateUrl: '/templates/views/endgame_view.html',
      controller: 'EndgameController'
    })
    .otherwise({
      redirectTo: '/signin'
    });
  }]);


};
