(function() {
	var app = angular.module('portfolio', 
															['ngRoute', 'ngAnimate',
															 'portfolio.services',
															 'portfolio.directives',
															 'portfolio.controllers']
													);
	
	app.config(['$routeProvider', 
		function($routeProvider) {
			$routeProvider.when('/hello', {templateUrl: '/partials/hello.html', pageId: 'hello'});
			$routeProvider.when('/the-3-colors', {templateUrl: '/partials/the-3-colors.html', pageId: 'the-3-colors'});
			$routeProvider.when('/portfolio', {templateUrl: '/partials/portfolio.html', pageId: 'portfolio'});
			$routeProvider.when('/experiments', {templateUrl: '/partials/experiments.html', pageId: 'experiments'});
			$routeProvider.otherwise({redirectTo: '/hello'});
		}
	]);
})();