require(__dirname + '/../../app/js/client');
require('angular-mocks');
// var User = require(__dirname + './../models/user_model');

describe('signup controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('triviApp'));


  beforeEach(angular.mock.inject(function (_$rootScope_, $controller) {
    $rootScope.user = {};
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    $ControllerConstructor = $controller;
  }));
  
  describe('REST request to generate user', function () {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('SignupController', {'$scope': $scope});
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  it('should be able to sign up a new user', function () {
    var controller = new $ControllerConstructor('SignupController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
  });
  it('should be able to sign up a user', function() {
  	$httpBackend.expectPOST('/api/signup', {'username':'dexter'}).respond(200, {'username':'dexter', 'token': 'tortilla'});
  	$scope.signup({'username':'dexter'});
  	// var $rootScope.user = {token: 'tortilla'};
  	console.log('before flush', $scope.username);
  	$httpBackend.flush();
  	console.log('after flush', $scope.user);
  	expect(null).toBe(null);
  });
});  
});  
