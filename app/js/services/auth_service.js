module.exports = function(app) {
  app.factory('AuthService', ['$q', '$rootScope', '$http', '$window',
    function($q, $rootScope, $http, $window) {

      var setHeader = function(token) {
        if (!token) {
          $http.defaults.headers.common['Authorization'] = '';
          return;
        } else {
          $http.defaults.headers.common['Authorization'] = 'BEARER ' + token;
        }
      }

      var setToken = function(token) {
        var sessionStorage = $window.sessionStorage;
        console.log(sessionStorage);

        if (!token) {
          sessionStorage.removeItem('userToken');
        } else {
          sessionStorage.setItem('userToken', token);
        }
        setHeader(token);
      }
      return setToken;
    }
  ]);
};
