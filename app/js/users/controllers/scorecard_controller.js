module.exports = function(app) {
  app.controller('ScorecardController', ['$rootScope', '$scope', '$location', '$http', 'AuthService',
    function($rootScope, $scope, $location, $http, AuthService) {

    if (!$rootScope.user) {
      AuthService.verifySession();
      $scope.user = $rootScope.user;
    } else {
      $scope.user = $rootScope.user;
    }

    $http.put('/api/savescore', { correct: $rootScope.right, category: $rootScope.gameData.category })
      .then(function(res) {
        $rootScope.user = res.data.msg;
      }, function(res) {
        console.log(res);
      });

    var scoreArr = $rootScope.scoreArr;
    $scope.right = $rootScope.right;
    $scope.wrong = $rootScope.wrong;

    $scope.categoryName = $rootScope.gameData.category;
    $scope.questionsArrIndex = 0;
    $scope.questionsArr = $rootScope.gameData.questions;
    $scope.question = $rootScope.gameData.questions[$scope.questionsArrIndex].question;
    $scope.correctAnswer = $rootScope.gameData.questions[$scope.questionsArrIndex].correctAnswer;

    $scope.incorrectArr = [];
    $scope.correctArr = [];

    $scope.showResults = function() {
      for (var i = 0; i < scoreArr.length; i++) {
        if (!scoreArr[i]) {
          $scope.incorrectArr.push($scope.questionsArr[i].question);
          $scope.incorrectArr.push($scope.questionsArr[i].correctAnswer);
        } else {
          $scope.correctArr.push($scope.questionsArr[i].question);
          $scope.correctArr.push($scope.questionsArr[i].correctAnswer);
        }
      };
      console.log($scope.incorrectArr);
      console.log($scope.correctArr);

      switch ($scope.right) {
        case 1:
          $scope.gotOne = true;
          break;
        case 2:
          $scope.gotTwo = true;
          break;
        case 3:
          $scope.gotThree = true;
          break;
        case 4:
          $scope.gotFour = true;
          break;
        case 5:
          $scope.gotFive = true;
          break;
        default:
          $scope.gotNone = true;
      }
    };
    $scope.showResults();
  }])
};
