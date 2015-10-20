module.exports = function(app) {
  app.directive('questionHeader', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/directives/question_template.html',
      scope: {
        categoryHeader: '=',
        question: '=',
        quit: '&'
      }
    };
  });
};