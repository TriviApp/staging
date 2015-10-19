module.exports = function(app) {
  app.controller('ProfileController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    $scope.user = $rootScope.user;

    $scope.rankings = function(category) {
      var correct = $scope.user.category.correct;
      var total = $scope.user.category.total;
      return correct/total;
    };

  }])
}