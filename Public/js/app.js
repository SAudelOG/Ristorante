(function () {
	var app = angular.module('Usuarios',[
		'ngRoute',
		'ngCookies',
		'loggin.controllers',
		'loggin.services'
	]); 
	
	app.config(['$routeProvider', '$httpProvider', function	($routeProvider, $httpProvider){

		$httpProvider.interceptors.push('authInterceptor');

		$routeProvider
			.when('/loggin', {
				templateUrl: 'views/loggin.html',
				controller: 'logginController'
			})
			.when('/settings/dashboard', {
				templateUrl : 'views/dashboard.html',
				controller : 'dashboardController'
			})
			.when ('/crear-superusuario',{
				templateUrl: 'views/suser.html'
			})
			.when ('/pruebas', {
				templateUrl: 'views/pruebas.html'
			})
			.otherwise({
				redirectTo: 'loggin'
			});
	}])

	.factory('authInterceptor',['$rootScope', '$q', '$window', function ($rootScope, $q, $window){
		return{
			request: function (config) {
				config.headers = config.headers || {};
				if ($window.sessionStorage.auth_token){
					config.headers.Authorization = $window.sessionStorage.auth_token;
					console.log('intercepcion!!!');
				}
				return config; 
			},
			response: function (response) {
				if (response.status === 401){
					//when user is not authenticate
					console.log('intercepcion2')
				}
				return response || $q.when(response);
			}
		};
	}]);

})();
