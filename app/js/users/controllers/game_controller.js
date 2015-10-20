module.exports = function(app) {
  app.controller('GameController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
    $scope.categoryName = $rootScope.gameData.category;
    $scope.questions = $rootScope.gameData.questions;
    $scope.currentQuestionIndex = 0;
    $scope.currentQuestion = '';
    var right = '';
    var wrong = '';

    // get res obj, store as gameData
    // pull category name off gameData
    // pull array of {question} objects off gameData
    // will come in as an array of answer strings and a question:string key-value pair and correctAnswer key-value pair  
    // ng-repeat the answers to display on the buttons in the order they came in (they are shuffled on the back end)
    // display the question (duh)
    // on click (user choice), run checkAnswer()
    // CHECKANSWER should compare the chosen answer with the correctAnswer 
        // if true, run the counter, return true, AND add the classes "correct", "animated" and "rubberband" to the clicked button AND change the class for remaining answer-buttons to fade them out
        // if false, run the counter, return false, AND add the classes "incorrect", "animated", and "hinge" to the clicked button AND add the classes "correct", "animated" and "rubberband" to the button with the correct answer AND change the class for remaining answer-buttons to fade them out
    // run nextQuestion() after a delay of X seconds

    $scope.nextQuestion = function() {
      return $scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
      // assign 'correct' and 'incorrect' classes to buttons in DOM
    };
    $scope.designateAnswer = function() {
      this.answer = answer; //could be scope.answer?
    }
    $scope.retrieveAnswer = function() {
      var answer
    }
    $scope.checkAnswer = function() {
      if (answer === $rootScope
                      .gameData
                      .questions[$scope.currentQuestionIndex]
                      .correctAnswer) {
        right += 1;
        return true;
      } else {
        wrong += 1;
        return false;
      }
      $scope.currentQuestionIndex += 1;

    };
    $scope.showResults = function() {};
  }])
};
