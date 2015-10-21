module.exports = function(app) {
  app.directive('resultList', function() {
    return {
      restrict: 'AC',
      replace: false,
      templateUrl: '/templates/directives/result_list_template.html',
      scope: {
        categoryHeader: '=',
        questions: '=',
        quit: '&'
      }
    };
  });
};