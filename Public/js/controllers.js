(function (){
	angular.module('loggin.controllers', [])

	.controller('logginController', ['$scope', '$rootScope', 'logginService', function($scope, $rootScope, logginService){
		$scope.MiNombre = 'Sergio Audel'
		$rootScope.title = 'Storantes | Loggin'
		$scope.Nombre = "";


		$scope.clikForm = function (){
			if ($scope.mail != $scope.remail){
				$scope.merror = 'tu mail tiene que considir';
				console.log('Tu mail tiene que considir')
			}
			else {
				$scope.merror = 'Datos correctos ya estamos casi listos! para ir a la api!';
				logginService.manualstrategy($scope.mail, $scope.password);
			}
		};
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