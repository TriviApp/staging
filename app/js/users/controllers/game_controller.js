module.exports = function(app) {
  app.controller('GameController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
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

    // CHECKANSWER should compare the chosen answer with the correctAnswer 
        // if true, run the counter, return true, AND add the classes "correct", "animated" and "rubberband" to the clicked button AND change the class for remaining answer-buttons to fade them out
        // if false, run the counter, return false, AND add the classes "incorrect", "animated", and "hinge" to the clicked button AND add the classes "correct", "animated" and "rubberband" to the button with the correct answer AND change the class for remaining answer-buttons to fade them out
    // run nextQuestion() after a delay of X seconds

    $scope.nextQuestion = function() {
      console.log('nextQuestion fired');
      // put a delay in here to act as the question timeout - MATCH timer in Sass file
      $scope.question = $scope.questionsArr[$scope.questionsArrIndex].question;
      $scope.answers = $scope.questionsArr[$scope.questionsArrIndex].answers;
      $scope.correctAnswer = $scope.questionsArr[$scope.questionsArrIndex].correctAnswer;
      $scope.$apply();
      return $scope.question = $scope.questionsArr[$scope.questionsArrIndex].question;

      // assign 'correct' and 'incorrect' classes to buttons in DOM
    };
    $scope.isChosen = function(answer) {
      return $scope.chosen === answer;
    }
    $scope.checkAnswer = function(answer) {
      $scope.chosen = answer;
      console.log($scope.chosen);
      console.log($scope.correctAnswer);
      // if (answer === $rootScope
      //                 .gameData
      //                 .questions[$scope.questionsArrIndex]
      //                 .correctAnswer) {
      if (answer === gameData
                     .questions[$scope.questionsArrIndex]
                     .correctAnswer) {
        right += 1;
        $scope.isChosen($scope.chosen);
        setTimeout(function() {
          $scope.questionsArrIndex += 1;
          console.log('right: ' + right + ', wrong: ' + wrong); 
          $scope.nextQuestion();
        }, 2000);
        return true;
      } else {
        wrong += 1;
        $scope.isChosen($scope.chosen);
        console.log($scope.correctAnswer);
        // assign 'correct' to the button with the correct answer and "hinge" to the chosen one, 'incorrect' to the others  MAY CHANGE if we want to simplify classes 
        setTimeout(function() {
          $scope.questionsArrIndex += 1;
          console.log('right: ' + right + ', wrong: ' + wrong);
          $scope.nextQuestion();
        }, 2000);
        return false;
      }
    };
    $scope.showResults = function() {};
  }])
};
