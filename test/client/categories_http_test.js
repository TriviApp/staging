require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('home and game controller', function () {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('triviApp'));

  beforeEach(angular.mock.inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to request a new game', function () {
    var controller = new $ControllerConstructor('HomeController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
  });

  describe('REST request in Game', function () {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('HomeController', {'$scope': $scope});
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it ('should be able to select a category', function() {
      $httpBackend.expectGET('/api/categories/sports')
                  .respond(200, {"category": "sports",
                                 "questions": [{
                                 "question":"Which NHL Team are nicknamed the 'Coyotes'?", 
                                 "answers": ["Calgary", "Vancouver", "Ottawa", "Arizona"], 
                                 "correctAnswer": "Arizona"
                                  }]
                                });          
        $scope.newGame('sports');
        $httpBackend.flush();
        expect($scope.gameData.category).toBe('sports');
        expect($scope.gameData.questions[0].question).toBe("Which NHL Team are nicknamed the 'Coyotes'?");
        expect(Array.isArray($scope.gameData.questions[0].answers)).toBe(true);
        expect($scope.gameData.questions[0].correctAnswer).toBe('Arizona');                 
    });
  });
});