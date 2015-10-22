module.exports = function(app) {
  app.controller('SigninController', ['$rootScope', '$scope', '$location', '$http', 'AuthService', '$base64',
    function($rootScope, $scope, $location, $http, AuthService, $base64) {

      $rootScope.newUser = false;
      $scope.user = {};

      if ($rootScope.user){
        $rootScope.user = null;
        AuthService.setToken();
      }

      $scope.newUserSignup = function() {
        $rootScope.newUser = true;
        return $location.path('/signup');
      };

      $scope.signin = function(user) {
        $http({
          method: 'GET',
          url: '/api/signin',
          headers: {
            'Authorization': 'Basic ' + $base64.encode(user.username + ":" + user.password)
          }
        })
        .then(function(res) {
          $rootScope.user = res.data.msg;
          AuthService.setToken($rootScope.user.token);
          $location.path('/home');
        }, function(res) {
          AuthService.setToken();
          $scope.wrongPass = true;
          console.log('signin res error: ', res);
        });
      };

    }
  ]);
};
