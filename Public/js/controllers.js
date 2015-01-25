(function (){

	'use strict';

	angular.module('loggin.controllers', [])

	.controller('logginController', ['$scope', '$rootScope', 'logginService', '$location', function($scope, $rootScope, logginService, $location){
		$rootScope.title = 'Storantes | Loggin';
		var user = {};

		$scope.clikForm = function (){
	 		user = {
				email : $scope.mail,
				password : $scope.password
			};

			if (!user.email){
				$scope.merror = 'Escribe un correo';
			}
			else {
				logginService.manualstrategy(user)
					.then(function (result){
						if (result){
							$location.path('settings/dashboard');
						}
						console.log('user was created: ' + result);
					});
			}

		};
	}])
	.controller('dashboardController', ['$scope', '$window', function ($scope, $window){
		$scope.u_id = $window.sessionStorage.u_id;
	}])


	.controller('checStatusController', ['$cookieStore', '$location', function($cookieStore, $location){
		console.log('we are checking your status......');

		$cookieStore.put('c_su',12345);

		var pikCookie = $cookieStore.get('c_su');

		console.log('cookie recolectada: ' + pikCookie);
		if (pikCookie){
			$location.url('crear-superusuario');
			console.log($location.absUrl());
			console.log('abemus cookie');
		}
			else{
				$location.url('login');
				console.log('NO!!! abemus cookie');
			}
	}])
})();