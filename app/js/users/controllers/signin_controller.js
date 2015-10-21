module.exports = function(app) {
  app.controller('SigninController', ['$rootScope', '$scope', '$location', '$http', 'AuthService', '$base64',
    function($rootScope, $scope, $location, $http, AuthService, $base64) {

      $rootScope.newUser = false;
      $scope.user = {};

      if ($rootScope.user){
        $rootScope.user = null;
        AuthService();
      }

      $scope.newUserSignup = function() {
        $rootScope.newUser = true;
        console.log("signin", {
          username: $scope.user.username,
          password: $scope.user.password
        });
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
          AuthService($rootScope.user.token);
          $location.path('/home');
        }, function(res) {
          AuthService();
          $scope.wrongPass = true;
          console.log(res);
        });
      };

    }
  ]);
};
