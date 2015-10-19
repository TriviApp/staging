module.exports = function(app) {
  app.controller('SignupController', ['$rootScope', '$scope', '$location', 'authService', '$http',
    function($rootScope, $scope, $location, authService, $http) {
      var rootScope.user = {};

      $scope.signup = function(user) {
        $http.post('/signup', {
          username: $scope.username,
          password: $scope.password
        })
        .then(function(res) {
          $rootScope.user = res.body.user;
          authService.setToken(res.body.user.token);
          $location.path('/main');
        }, function(res) {
          console.log(res);
        });
      };

    }
  ]);
};
