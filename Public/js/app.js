(function () {

	'use strict';

	var app = angular.module('Usuarios',[
		'ngRoute',
		'ngCookies',
		'loggin.controllers',
		'loggin.services',
	]); 
	app.constant('API_BASE', 'http://nodejs-pizapi.rhcloud.com/');

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
			.otherwise({
				redirectTo: 'loggin'
			});
	}])
})();
