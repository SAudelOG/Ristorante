(function (){
	angular.module('loggin.controllers', [])

	.controller('logginController', ['$scope', '$rootScope', function($scope, $rootScope, $cookieStore, $location){
		$scope.MiNombre = 'Sergio Audel'
		$rootScope.title = 'Storantes | Loggin'
		$scope.Nombre = "";

		$scope.clikForm = function (){
			console.log('auch!!! me isiste un submit')
		};
	}])

	.controller('checStatusController', ['$cookieStore', '$location', function($cookieStore, $location){
		console.log('we are checking your status......');

		$cookieStore.put('c_su',12345);

		var pikCookie = $cookieStore.get('c_sus');

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