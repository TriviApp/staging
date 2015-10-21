module.exports = function(app) {
  app.controller('ScorecardController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    var scoreArr = $rootScope.scoreArr;
    $scope.right = $rootScope.right;
    $scope.wrong = $rootScope.wrong;
    // var scoreArr = [true,true,false,true,true];

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
    
    // $scope.right = 3;
    // $scope.wrong = 2;
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
          $scope.one = true;
          break;
        case 2:
          $scope.two = true;
          break;
        case 3:
          $scope.three = true;
          break;
        case 4:
          $scope.four = true;
          break;
        case 5:
          $scope.five = true;
          break;
        default:
          $scope.none = true;
      }
    };
    $scope.showResults();
  }])
};
