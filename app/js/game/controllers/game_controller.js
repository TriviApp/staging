module.exports = function(app) {
  app.controller('GameController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    var duration = 15000;
    var clock;
    $scope.timeout;
    $scope.inBetweenQuestions = false;

    $scope.timer = function() {
      clock = setTimeout(function() {
        if ($scope.inBetweenQuestions === true) {
          return;
        };
          $scope.inBetweenQuestions = true;
          console.log('inside timeout');
          angular.element(document.getElementById("q-card")).addClass("wrong animated slideOutLeft");
          angular.element(document.getElementsByClassName("big-button")).addClass("wrong");
          angular.element(document.getElementById("timer")).addClass("hidden");
          $scope.questionsArrIndex += 1;
          $rootScope.wrong += 1;
          $rootScope.scoreArr.push(false);
          setTimeout(function() {
            angular.element(document.getElementById("q-card")).removeClass("wrong animated slideOutLeft");
            angular.element(document.getElementsByClassName("big-button")).removeClass("wrong");
            if ($scope.questionsArrIndex < 5) {
              $scope.nextQuestion();
            } else {
              window.location.href = "#/results";
            }
        }, 1000);
      }, duration);
    };

    $scope.timer();

    $scope.questionsArrIndex = 0;
    $scope.categoryName = $rootScope.gameData.category;
    $scope.questionsArr = $rootScope.gameData.questions;
    $scope.question = $rootScope.gameData.questions[$scope.questionsArrIndex].question;
    $scope.answers = $rootScope.gameData.questions[$scope.questionsArrIndex].answers;
    $scope.correctAnswer = $rootScope.gameData.questions[$scope.questionsArrIndex].correctAnswer;
    $rootScope.scoreArr = [];

    $rootScope.right = 0;
    $rootScope.wrong = 0;

    $scope.nextQuestion = function() {
      angular.element(document.getElementById("timer")).removeClass("hidden");
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
        $scope.inBetweenQuestions = true;
        clearTimeout(clock);
        $scope.chosen = answer;
        $scope.isIncorrect = true;  
        $scope.isAnimated = true;   
        if (answer === $rootScope.gameData
                       .questions[$scope.questionsArrIndex]
                       .correctAnswer) {
          angular.element(document.getElementById("timer")).addClass("hidden");
          $scope.isRight = true;      
          this.isChosen = true;       
          this.isCorrect = true;      
          this.runRubberBand = true;  
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
            $scope.inBetweenQuestions = false;
            $scope.nextQuestion();
          }, 2000);
          return true;
        } else {
          angular.element(document.getElementById("timer")).addClass("hidden");
          $scope.isWrong = true; 
          this.isChosen = true;  
          this.runHinge = true;  
          $rootScope.wrong += 1;
          $rootScope.scoreArr.push(false);
          console.log($rootScope.scoreArr);
          $scope.questionsArrIndex += 1;
          setTimeout(function() {
            console.log('right: ' + $rootScope.right + ', wrong: ' + $rootScope.wrong);
            console.log('index: ' + $scope.questionsArrIndex);
            if ($scope.questionsArrIndex < 5) {
              $scope.inBetweenQuestions = false;
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
