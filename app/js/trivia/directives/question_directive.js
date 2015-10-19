module.exports = function(app) {
  app.directive('questionCard', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/directives/question_template.html'
    },
    scope: {
      categoryHeader: '=',
      questions: '=',
      quit: '&'
    }
  })
};