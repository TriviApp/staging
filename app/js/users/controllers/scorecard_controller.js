module.exports = function(app) {
  app.controller('ScorecardController', ['$rootScope', '$scope', '$location', '$http', 'AuthService',
    function($rootScope, $scope, $location, $http, AuthService) {

    if (!$rootScope.user) {
      AuthService.verifySession();
      $scope.user = $rootScope.user;
    } else {
      $scope.user = $rootScope.user;
    }

    var scoreArr = $rootScope.scoreArr;
    $scope.right = $rootScope.right;
    $scope.wrong = $rootScope.wrong;

    var gameData = {
      "category": "sports",
      "questions": [
        { "question":"Which NHL Team are nicknamed the 'Coyotes'?",
          "answers": ["Calgary", "Vancouver", "Ottawa", "Arizona"],
          "correctAnswer": "Arizona"},
        { "question":"Which U.S. golfer stands second in the all-time list of major winners with thirteen titles?",
          "answers": ["Tiger Woods", "Tony Jacklin", "Bobby Jones", "Arnold Palmer"],
          "correctAnswer": "Bobby Jones"},
        { "question":"Chukkas is the term given to periods played in what sport?",
          "answers": ["Polo", "Ice Hockey", "Hockey", "Curling"],
          "correctAnswer": "Polo"},
        { "question":"How many goose feathers does it take to make a shuttlecock?",
          "answers": ["16", "60", "21", "32"],
          "correctAnswer": "16"},
        { "question":"In Olympic Archery, how far is the competitor from the target?",
          "answers": ["50m", "120m", "70m", "100m"],
          "correctAnswer": "70m"}
          ]
        }
    $scope.categoryName = gameData.category;
    $scope.questionsArrIndex = 0;
    $scope.questionsArr = gameData.questions;
    $scope.question = gameData.questions[$scope.questionsArrIndex].question;
    $scope.correctAnswer = gameData.questions[$scope.questionsArrIndex].correctAnswer;

    $scope.incorrectArr = [];
    $scope.correctArr = [];

    var statPack = { $scope.categoryName: 
      {
        correct: $rootScope.user.sports.correct += $scope.right,
        total: $rootScope.user.sports.total += 5
      }
    };

    $scope.saveResults = function() {
      $http.put('/statupdate', statPack)
      .then(function(res) {
        
      })
    };

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
