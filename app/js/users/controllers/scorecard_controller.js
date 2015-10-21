module.exports = function(app) {
  app.controller('ScorecardController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    // var scoreArr = $rootScope.scoreArr;
    var scoreArr = [0,0,1,1,0];

    
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
    $scope.questionsArrIndex = 0;
    // $scope.categoryName = $rootScope.gameData.category;
    // $scope.questionsArr = $rootScope.gameData.questions;
    // $scope.question = $rootScope.gameData.questions[$scope.questionsArrIndex].question;
    // $scope.answers = $rootScope.gameData.questions[$scope.questionsArrIndex].answers;
    // $scope.correctAnswer = $rootScope.gameData.questions[$scope.questionsArrIndex].correctAnswer;
    $scope.categoryName = gameData.category;
    $scope.questionsArr = gameData.questions;
    $scope.question = gameData.questions[$scope.questionsArrIndex].question;
    $scope.answers = gameData.questions[$scope.questionsArrIndex].answers;
    $scope.correctAnswer = gameData.questions[$scope.questionsArrIndex].correctAnswer;
    
    var right = 0;
    var wrong = 0;

    for (var i = 0; i < scoreArr.length; i++) {
      if (scoreArr[i] === 0) {
        console.log($scope.questionsArr[i].question);
        console.log($scope.questionsArr[i].correctAnswer);
      }
    };

    $scope.nextQuestion = function() {
      $scope.isIncorrect = false;
      $scope.isAnimated = false;
      $scope.isChosen = false; 
      $scope.isCorrect = false;
      $scope.runRubberBand = false;
      $scope.isRight = false;
      $scope.isWrong = false;
      $scope.question = $scope.questionsArr[$scope.questionsArrIndex].question;
      $scope.answers = $scope.questionsArr[$scope.questionsArrIndex].answers;
      $scope.correctAnswer = $scope.questionsArr[$scope.questionsArrIndex].correctAnswer;
      $scope.$apply();
      return $scope.question = $scope.questionsArr[$scope.questionsArrIndex].question;
    };

    $scope.checkAnswer = function(answer) {
      $scope.chosen = answer;
      $scope.isIncorrect = true;  // adds "incorrect" class to all buttons 
      $scope.isAnimated = true;   // adds "animated" class to all buttons
      // if (answer === $rootScope
      //                 .gameData
      //                 .questions[$scope.questionsArrIndex]
      //                 .correctAnswer) {
      if (answer === gameData
                     .questions[$scope.questionsArrIndex]
                     .correctAnswer) {
        $scope.isRight = true;
        this.isChosen = true;       // adds "chosen" class to selected button
        this.isCorrect = true;      // adds "correct" class to selected button
        this.runRubberBand = true;  // adds "rubberBand" class to selected button
        right += 1;
        setTimeout(function() {
          $scope.questionsArrIndex += 1;
          // console.log('right: ' + right + ', wrong: ' + wrong);
          // console.log('index: ' + $scope.questionsArrIndex);
          if ($scope.questionsArrIndex < 5) {
            $scope.nextQuestion();
          } else {
            alert('game has run its course!');
          } 
          $scope.nextQuestion();
        }, 2000);
        return true;
      } else {
        $scope.isWrong = true;
        this.isChosen = true;       // adds "chosen" class to selected button
        this.runHinge = true;  // adds "hinge" class to selected button
        wrong += 1;
        setTimeout(function() {
          $scope.questionsArrIndex += 1;
          // console.log('right: ' + right + ', wrong: ' + wrong);
          // console.log('index: ' + $scope.questionsArrIndex);
          if ($scope.questionsArrIndex < 5) {
            $scope.nextQuestion();
          } else {
            window.location.href = "#/new_url";
          }
        }, 2200);
        return false;
      }
    };
    $scope.showResults = function() {};
  }])
};
