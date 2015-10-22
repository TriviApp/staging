module.exports = function(app) {
  app.controller('GameController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    var gameTimer;
    var timeouts = [];

    var gameTimer = setTimeout(function() {
      console.log('inside timeout');
      // $scope.questionsArrIndex += 1;
      // $rootScope.wrong += 1;
      // $rootScope.scoreArr.push(false); 
      $scope.nextQuestion();
    }, 10000);
    //then, store when you create them
    timeouts.push(gameTimer);

    // stopGameTimer = function () {
    //   console.log('stop has been called');
    //   clearTimeout(gameTimer);
    // }
    
    var gameData = {
      "category": "sports",
      "questions": [
        { "question":"Which NHL Team are nicknamed the 'Coyotes'?", 
          "answers": ["Calgary", "Vancouver", "Ottawa", "Arizona"], 
          "correctAnswer": "Arizona"
        },
        { "question":"Which U.S. golfer stands second in the all-time list of major winners with thirteen titles?", 
          "answers": ["Tiger Woods", "Tony Jacklin", "Bobby Jones", "Arnold Palmer"],
          "correctAnswer": "Bobby Jones"
        },
        { "question":"Chukkas is the term given to periods played in what sport?", 
          "answers": ["Polo", "Ice Hockey", "Hockey", "Curling"], 
          "correctAnswer": "Polo"
        },
        { "question":"How many goose feathers does it take to make a shuttlecock?", 
          "answers": ["16", "60", "21", "32"], 
          "correctAnswer": "16"
        },
        { "question":"In Olympic Archery, how far is the competitor from the target?", 
          "answers": ["50m", "120m", "70m", "100m"], 
          "correctAnswer": "70m"
        }
      ]
    };

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
    $rootScope.scoreArr = [];
    
    $rootScope.right = 0;
    $rootScope.wrong = 0;

    $scope.nextQuestion = function() {
      console.log('gameTimer is being called in nextQuestion');
      var gameTimer = setTimeout(function() {
        // console.log('inside timeout');
        $scope.questionsArrIndex += 1;
        $rootScope.wrong += 1;
        $rootScope.scoreArr.push(false); 
        // console.log($rootScope.scoreArr);
        if ($scope.questionsArrIndex < 5) {
            $scope.nextQuestion();
          } else {
            window.location.href = "#/results";
        }
      }, 10000);
      //then, store when you create them
      timeouts.push(gameTimer);

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
      for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }
      //quick reset of the timer array you just cleared
      timeouts = [];
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
        
        $scope.isRight = true;      // adds "right" class to entire view card
        this.isChosen = true;       // adds "chosen" class to selected button
        this.isCorrect = true;      // adds "correct" class to selected button
        this.runRubberBand = true;  // adds "rubberBand" class to selected button
        $rootScope.right += 1;
        $rootScope.scoreArr.push(true);
        console.log($rootScope.scoreArr);
        setTimeout(function() {
          for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
          }
          //quick reset of the timer array you just cleared
          timeouts = [];
          $scope.questionsArrIndex += 1;
          console.log('right: ' + $rootScope.right + ', wrong: ' + $rootScope.wrong);
          console.log('index: ' + $scope.questionsArrIndex);
          if ($scope.questionsArrIndex < 5) {
            $scope.nextQuestion();
          } else {
            window.location.href = "#/results";
          }
          $scope.nextQuestion();
        }, 2000);
        return true;
      } else {
        $scope.isWrong = true; // adds "wrong" class to entire view card
        this.isChosen = true;  // adds "chosen" class to selected button
        this.runHinge = true;  // adds "hinge" class to selected button
        $rootScope.wrong += 1;
        $rootScope.scoreArr.push(false); 
        console.log($rootScope.scoreArr);
        setTimeout(function() {
          for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
          }
          //quick reset of the timer array you just cleared
          timeouts = [];
          $scope.questionsArrIndex += 1;
          console.log('right: ' + $rootScope.right + ', wrong: ' + $rootScope.wrong);
          console.log('index: ' + $scope.questionsArrIndex);
          if ($scope.questionsArrIndex < 5) {
            $scope.nextQuestion();
          } else {
            window.location.href = "#/results";
          }
        }, 2200);
        return false;
      }
    };
  }])
};
