module.exports = function(app) {
  app.controller('GameController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    $scope.categoryName = $rootScope.gameData.category;
    $scope.questions = $rootScope.gameData.questions;
    $scope.compareAnswer = function(){};
    $scope.nextQuestion = function(){};
    $scope.showResults = function(){};
  }])
};