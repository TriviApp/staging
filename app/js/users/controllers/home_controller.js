module.exports = function(app) {
  app.controller('HomeController', ['$rootScope', '$scope', '$location', '$http', 'AuthService',
   function($rootScope, $scope, $location, $http, AuthService) {
    $scope.user = $rootScope.user;

    $scope.newGame = function(category) {
      //request category data
      $http.get('/api/categories/' + category)
      .then(function(res){
        // res will have the category data
        $rootScope.gameData = res.data;
        $location.path('/newGame');
      });
    };

    $scope.viewProfile = function() {
      $location.path('/profile');
    };

    $scope.logout = function() {
      AuthService();
      $location.path('/signin');
    };
  }]);
};
