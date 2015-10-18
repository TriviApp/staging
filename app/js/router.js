module.exports = function(app) {
  app.config(['$routeProvider', function($route) {
    $route
      .when('/signup')
      .when('/signin')
      .when('/user_home')
  }])
}