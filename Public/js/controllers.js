(function (){

	'use strict';

	angular.module('loggin.controllers', [])

	.controller('logginController', ['$scope', '$rootScope', 'logginService', '$location', 'AuthToken', function($scope, $rootScope, logginService, $location, AuthToken){
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
					.then(function (authorized){
						if (authorized === true){
							$location.path('settings');
						}
						console.log('authorized: ' + authorized);
					});
			}
		};
	}])
	.controller('dashboardController', ['$scope', '$window', function ($scope, $window){
		$scope.auth_token = $window.sessionStorage.auth_token;
		$scope.u_id = $window.sessionStorage.u_id;
	}])
	.controller('AppCtrl', ['$scope', '$mdSidenav','$mdBottomSheet', '$mdDialog', function ($scope,$mdSidenav,$mdBottomSheet, $mdDialog){
		$scope.toggleSidenav = function(menuId) {
	    $mdSidenav(menuId).toggle();
  		};
  		var saludo = 'jejeje soy un hacker';
  		$scope.openBottomSheet = function() {
		 $mdBottomSheet.show({
	      	template: '<md-bottom-sheet>' + saludo + '</md-bottom-sheet>'
    	});
  		};
	}])

})();