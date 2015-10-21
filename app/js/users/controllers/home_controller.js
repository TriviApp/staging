module.exports = function(app) {
  app.controller('HomeController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    $scope.user = $rootScope.user;
    // start a game/pick a category
    $scope.newGame = function(category) {
      //request category data
      $http.get('/api/getCategory/' + category).then(function(res){
        // res will have the category data
        $rootScope.gameData = res.data;
      })
    }
    // view profile
    // logout
  }])
};
