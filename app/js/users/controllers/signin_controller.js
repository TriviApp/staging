module.exports = function(app) {
  app.controller('SigninController', ['$rootScope', '$scope', '$location', '$http', 'AuthService', '$base64',
    function($rootScope, $scope, $location, $http, AuthService, $base64) {

      $rootScope.newUser = false;

      if ($rootScope.user){
        $rootScope.user = null;
        AuthService.setToken();
      }

      $scope.newUserSignup = function() {
        $rootScope.newUser = true;
        console.log("signin", $rootScope.newUser);
        return $location.path('/signup');
      };

      $scope.signin = function(user) {
        $http({
          method: 'GET',
          url: '/signin',
          headers: {
            'Authorization': 'Basic ' + $base64.encode(user.username + ":" + user.password)
          }
        })
        .then(function(res) {
          AuthService.setToken(res.user.token);
          $rootScope.user = res.user;
          $location.path('/home');
        }, function(res) {
          AuthService.setToken();
          $scope.wrongPass = true;
        });
      };

    }
  ]);
};
