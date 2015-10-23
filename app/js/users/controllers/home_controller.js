module.exports = function(app) {
  app.controller('HomeController', ['$rootScope', '$scope', '$location', '$http', 'AuthService',
   function($rootScope, $scope, $location, $http, AuthService) {

    if (!$rootScope.user) AuthService.verifySession();

    $scope.newGame = function(category) {
      //request category data
      console.log('category', category);

      $http.get('/api/categories/' + category)
      .then(function(res){
        // res will have the category data
        $rootScope.gameData = res.data.msg;
        $location.path('/newgame');
        console.log('gamedata', $rootScope.gameData);
      }, function(res) {
        console.log(res);
      });
    };

    $scope.viewProfile = function() {
      $location.path('/profile');
    };

    $scope.logout = function() {
      AuthService.setToken();
      $location.path('/signin');
    };
  }]);
};
