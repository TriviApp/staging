module.exports = function(app) {


  app.config(['$routeProvider', function($route) {
    $route
      .when('/signup')
      .when('/signin')
      .when('/home', {
        templateUrl: '/templates/views/home.html',
        controller: 'HomeController'
      })
      .when('/newgame', {
        templateUrl: '/templates/views/gameplay.html',
        controller: 'GameController'
      })
      .otherwise({
        redirectTo: '/signin'
      });
  }]);
};
