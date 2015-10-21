require(__dirname + '/../../app/js/client');
require('angular-mocks');
console.log('in karmatests~~~~~~~~~~~~~~~~~~~');
describe('game controller', function () {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('TriviApp'));

  beforeEach(angular.mock.inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function () {
    var controller = new $ControllerConstructor('GameController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.questionsArr)).toBe(true);
  });

  describe('REST request', function () {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('GameController', {$scope: $scope});
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it ('should be able to make a get request when a category is selected', function() {
      $httpBackend.expectGET('/api/categories')
                  .respond(200, [{"category": "sports",
                                 "questions": [{
                                  "question":"Which NHL Team are nicknamed the 'Coyotes'?", 
                                  "answers": ["Calgary", "Vancouver", "Ottawa", "Arizona"], 
                                  "correctAnswer": "Arizona"
                                  }]
                                }]);
        $scope.newGame('sports');
        $httpBackend.flush();
        expect($scope.category).toBe('sports');
        expect($scope.questions[0].question).toBe("Which NHL Team are nicknamed the 'Coyotes'?");
        expect(Array.isArray($scope.questions[0].answers)).toBe(true);
        expect($scope.questions[0].correctAnswer).toBe('Arizona');  
        expect(res.status).toBe(200);                
    });
  });
});