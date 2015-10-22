module.exports = function(app) {
  app.controller('GameController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    var duration = 2500;
    $scope.timeout;
    $scope.inBetweenQuestions = false;

    $scope.timer = function() {
      $scope.timeout = setTimeout(function() {
        $scope.inBetweenQuestions = true;
        console.log('inside timeout');
        angular.element(document.getElementById("q-card")).addClass("wrong animated shake");
        $scope.questionsArrIndex += 1;
        $rootScope.wrong += 1;
        $rootScope.scoreArr.push(false);
        setTimeout(function() {
          angular.element(document.getElementById("q-card")).removeClass("wrong animated shake");
          if ($scope.questionsArrIndex < 5) {
            $scope.nextQuestion();
          } else {
            window.location.href = "#/results";
          }
        }, 2500);
      }, duration);
    };

    $scope.timer();
    
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
    $scope.categoryName = gameData.category;
    $scope.questionsArr = gameData.questions;
    $scope.question = gameData.questions[$scope.questionsArrIndex].question;
    $scope.answers = gameData.questions[$scope.questionsArrIndex].answers;
    $scope.correctAnswer = gameData.questions[$scope.questionsArrIndex].correctAnswer;
    $rootScope.scoreArr = [];
    
    $rootScope.right = 0;
    $rootScope.wrong = 0;

    $scope.nextQuestion = function() {
      // clearTimeout($scope.timeout);
      $scope.timer();
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
      $scope.inBetweenQuestions = false;
      return $scope.question = $scope.questionsArr[$scope.questionsArrIndex].question;
    };

    $scope.checkAnswer = function(answer) {
      if ($scope.inBetweenQuestions === true) {
        console.log("bouncing out of checkAnswer")
        return;
      } else {
        clearTimeout($scope.timeout);
        $scope.inBetweenQuestions = true;
        $scope.chosen = answer;
        $scope.isIncorrect = true;  // adds "incorrect" class to all buttons 
        $scope.isAnimated = true;   // adds "animated" class to all buttons
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
    };
  }])
};
