(function () {

	'use strict';

	angular.module('loggin.services', [])

	.factory('logginService', ['$http', '$q', '$window', 'API_BASE', function ($http, $q, $window, API_BASE) {

		function manualstrategy (user) {
			var deferred = $q.defer(),
				isAutthenticate = false,
				credentials = {};

			$http.post(API_BASE + 'users', user)
				.success(function (data){
					credentials = {
							u_id : data.data.id,
							auth_token : data.data.token
						};
					console.log({credentials:credentials});	
					sessionStorage.u_id = credentials.u_id;
					sessionStorage.auth_token = credentials.auth_token;

					isAutthenticate = true;

					deferred.resolve(isAutthenticate);
				})
				.error(function (data){
					//erase the token and the user id if the user fails to log in
					delete $window.sessionStorage.u_id;
					delete $window.sessionStorage.auth_token;

					isAutthenticate = false;

					deferred.resolve(isAutthenticate);
				})
			return deferred.promise;	
		}

		return {
			manualstrategy:manualstrategy
		}
	}])
	.factory('AuthToken', ['$window', function($window){
		var tokenkey = 'auth_token';
		var idkey = 'u_id';
		var storage = $window.sessionStorage;
		var cachedToken;
		var	cachedid;

		function setToken (token) {
			cachedToken = token;
			storage.setItem(tokenkey, token);	
		};

		function setId (u_id) {
			cachedid = u_id;
			storage.setItem(idkey, u_id)
		}

		function getCredentials () {
			if (cachedToken){
				cachedToken = storage.getItem(tokenkey);	
			}
			if (cachedid) {
				cachedid = storage.getItem(idkey);	
			}
			return {credentials: {
				auth_token: cachedToken,
				u_id: cachedid
			}}
		};

		function clearCredentials () {
			cachedToken = null;
			cachedid = null;
			storage.removeItem(tokenkey);
			storage.removeItem(idkey);
		};

		return {
			setToken: setToken,
			setId: setId,
			getCredentials: getCredentials,
			clearCredentials: clearCredentials
		};
	}])
	.factory('authInterceptor',['$rootScope', '$q', '$window', function ($rootScope, $q, $window){
		return{
			request: function (config) {
				config.headers = config.headers || {};
				if (sessionStorage.auth_token){
					config.headers.Authorization = 'Bearer ' + sessionStorage.auth_token;
					console.log(config.headers.Authorization);
				}
				return config; 
			},
			response: function (response) {
				if (response.status === 401){
					//when user is not authenticate
					console.log('intercepcion2');
				}
				return response || $q.when(response);
			}
		};
	}]);
})();