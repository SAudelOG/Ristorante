(function () {

	'use strict';

	var app = angular.module('Usuarios',[
		'ngRoute',
		'ngCookies',
		'loggin.controllers',
		'loggin.services',
	]); 
	app.constant('API_BASE', 'http://127.0.0.1:3000/');

	app.config(['$routeProvider', '$httpProvider','$locationProvider', function	($routeProvider, $httpProvider, $locationProvider){
		//to eliminate /# on the hash
		//$locationProvider.html5Mode({enabled:true, requireBase: false});;
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
})();
