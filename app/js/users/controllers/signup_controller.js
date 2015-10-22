module.exports = function(app) {
  app.controller('SignupController', ['$rootScope', '$scope', '$location', 'AuthService', '$http',
    function($rootScope, $scope, $location, AuthService, $http) {
      $scope.user = {};

      if (!$rootScope.newUser) {
        $rootScope.newUser = true;
      };

      $scope.oldUserSignin = function() {
        !$rootScope.newUser;
        return $location.path('/signin');
      };

      $scope.signup = function(user) {
        $http.post('/api/signup', user)
        .then(function(res) {
          console.log(res.data);
          $rootScope.user = res.data;
          AuthService.setToken($rootScope.user.token);
          $location.path('/home');
        }, function(res) {
          console.log(res);
        });
      };

    }
  ]);
};
