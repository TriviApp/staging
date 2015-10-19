module.exports = function(app) {
  app.controller('SigninController', ['$rootScope', '$scope', '$location', '$http', 'authService', '$base64',
    function($rootScope, $scope, $location, $http, authService, $base64) {

      if ($rootScope.user){
        $rootScope.user = null;
        authService.setToken();
      }

      $scope.signin = function(user) {
        $http({
          method: 'GET',
          url: '/signin',
          headers: {
            'Authorization': 'Basic ' + $base64.encode(user.username + ":" + user.password)
          }
        })
        .then(function(res) {
          authService.setToken(res.user.token);
          $rootScope.user = res.user;
          $location.path('/home');
        }, function(res) {
          authService.setToken();
          $scope.wrongPass = true;
        });
      };

    }
  ]);
};
