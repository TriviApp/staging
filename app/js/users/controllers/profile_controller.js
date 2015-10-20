module.exports = function(app) {
  app.controller('ProfileController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    $scope.user = $rootScope.user;

    $scope.calculateRank = function(category) {
      var average = $scope.user.userCategoryStats(category);
      var rank;
      switch (parseInt(average)) {
        case (average > 0.8):
          rank = "star-five";
          break;  
        case (average > 0.6):
          rank = "star-four";
          break;
        case (average > 0.4):
          rank = "star-three";
          break;
        case (average > 0.2):
          rank = "star-two";
          break;
        default:
          rank = "star-one";
          break;
      };
      return rank;
    };
  }])
}