module.exports = function(app) {
  app.directive('questionHeader', function() {
    return {
      restrict: 'AC',
      replace: false,
      templateUrl: '/templates/directives/question_header_template.html',
      scope: {
        categoryHeader: '=',
        question: '=',
        quit: '&'
      }
    };
  });
};