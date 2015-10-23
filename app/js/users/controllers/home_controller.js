module.exports = function(app) {
  app.controller('HomeController', ['$rootScope', '$scope', '$location', '$http', 'AuthService',
   function($rootScope, $scope, $location, $http, AuthService) {

    if (!$rootScope.user) AuthService.verifySession();

    $scope.newGame = function(category) {
      console.log('category', category);

      $http.get('/api/categories/' + category)
      .then(function(res){
        $rootScope.gameData = {};
        $rootScope.gameData.questions = res.data.msg;
        $rootScope.gameData.category = res.data.category;
        $location.path('/newgame');
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
