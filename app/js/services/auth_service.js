module.exports = function(app) {
  app.factory('AuthService', ['$q', '$rootScope', '$http', '$window', '$location',
    function($q, $rootScope, $http, $window, $location) {
      var sessionStorage = $window.sessionStorage;

      var setHeader = function(token) {
        if (!token) {
          $http.defaults.headers.common['Authorization'] = '';
        } else {
          $http.defaults.headers.common['Authorization'] = 'BEARER ' + token;
          return true;
        }
      }

      var setToken = function(token) {

        if (!token) {
          $rootScope.user = {};
          sessionStorage.removeItem('userToken');
        } else {
          sessionStorage.setItem('userToken', token);
        }
        return setHeader(token);
      }

      var restoreSession = function() {
        var token = sessionStorage.getItem('userToken');
        var deferred = $q.defer();
        if (token) {
          setHeader(token);

          $http.get('/api/username')
            .then(function(res) {
              $rootScope.user = res.data.user;
              deferred.resolve();
            }, function(res) {
              console.log(res);
              deferred.reject();
              $location.path('/signin');
            });
        } else {
          deferred.reject();
          $location.path('/signin');
        }
        return true;
      }

      return {
        setToken: setToken,
        restoreSession: restoreSession
      };
    }
  ]);
};
