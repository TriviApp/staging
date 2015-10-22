module.exports = function(app) {
  app.controller('ProfileController', ['$rootScope', '$scope', '$location', '$http', 'AuthService',
    function($rootScope, $scope, $location, $http, AuthService) {
      if (!$rootScope.user) {
        AuthService.restoreSession();
        $scope.user = $rootScope.user;
      } else {
        $scope.user = $rootScope.user;
      }

      $scope.rankings = function(category) {
        var correct = $scope.user.category.correct;
        var total = $scope.user.category.total;
        return correct/total;
      };

  }])
}
