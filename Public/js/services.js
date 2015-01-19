(function () {
	angular.module('loggin.services', [])

	.factory('logginService', ['$http', '$q',  function ($http, $q) {

		function manualstrategy (mail, password) {
			var deferred = $q.defer();

			$http.get('http://nodejs-pizapi.rhcloud.com')
				.success(function (data){
					console.log(data)
				})
			console.log('ya tenemos el servicio en marcha'),
			console.log(mail + ' ' + password)
		}


		return {
			manualstrategy:manualstrategy
		}
	}])
	
})();