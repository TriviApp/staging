require(__dirname + '/../../app/js/client');
require('angular-mocks');
// var User = require(__dirname + './../models/user_model');

describe('signup controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('triviApp'));


  beforeEach(angular.mock.inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to sign up a new user', function() {
    var controller = new $ControllerConstructor('SignupController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
  });
  
  describe('REST request to generate user', function () {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('SignupController', {'$scope': '$scope'});
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  it('should be able to sign up a user', function() {
  	$httpBackend.expectPOST('/api/signup', {'username':'dexter'}).respond(200, {'username':'dexter'});
  	console.log('scope', $rootScope);
    $scope.signup({'username':'dexter'});
  	console.log('before flush', $scope);
  	$httpBackend.flush();
  	console.log('after flush', $scope);
  	expect(null).toBe(null);
  });
});  
});  
