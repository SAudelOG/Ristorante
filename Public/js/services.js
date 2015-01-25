(function () {
	angular.module('loggin.services', [])

	.factory('logginService', ['$http', '$q', '$window',  function ($http, $q, $window) {

		function manualstrategy (user) {
			var deferred = $q.defer();
			var isAutthenticate = false;

			$http.post('http://nodejs-pizapi.rhcloud.com/users',user)
				.success(function (data){
					console.log(data);
					userRespose = {
							u_id : data.data.id,
							auth_token : data.data.token
						};

					$window.sessionStorage.u_id = userRespose.u_id;
					$window.sessionStorage.auth_token = userRespose.auth_token;

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
})();