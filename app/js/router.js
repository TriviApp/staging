module.exports = function(app) {


  app.config(['$routeProvider', function($route) {
    $route
      .when('signin', {
        templateUrl: '/templates/views/signin_view.html',
        controller: 'SigninController'
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
      .when('/endgame', {
        templateUrl: '/templates/views/endgame_view.html',
        controller: 'EndgameController'
      })
      .otherwise({
        redirectTo: '/signin'
      });
  }]);
};
