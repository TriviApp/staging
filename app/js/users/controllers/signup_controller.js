module.exports = function(app) {
  app.controller('SignupController', ['$rootScope', '$scope', '$location', 'AuthService', '$http',
    function($rootScope, $scope, $location, AuthService, $http) {

      if (!$rootScope.newUser) {
        $rootScope.newUser = true;
      };

      $scope.oldUserSignin = function() {
        !$rootScope.newUser;
        console.log("signup", $rootScope.newUser);
        return $location.path('/signin');
      };

      $scope.signup = function(user) {
        $http.post('/signup', {
          username: $scope.username,
          password: $scope.password
        })
        .then(function(res) {
          $rootScope.user = res.body.user;
          AuthService.setToken(res.body.user.token);
          $location.path('/main');
        }, function(res) {
          console.log(res);
        });
      };

    }
  ]);
};
