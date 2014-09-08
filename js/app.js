(function() {
	var app = angular.module('portfolio', 
															['ngRoute', 'ngAnimate',
															 'portfolio.filters',
															 'portfolio.services',
															 'portfolio.directives',
															 'portfolio.controllers']
													);
	
	app.config(['$routeProvider', 
				function($routeProvider) {
					$routeProvider.when('/hello', {templateUrl: '/partials/hello.html', pageId: 'hello'});
					$routeProvider.when('/the-3-colors', {templateUrl: '/partials/the-3-colors.html', pageId: 'the-3-colors'});
					$routeProvider.when('/portfolio', {templateUrl: '/partials/portfolio.html', pageId: 'portfolio'});
					$routeProvider.when('/contemplating', {templateUrl: '/partials/contemplating.html', pageId: 'contemplating'});
					$routeProvider.when('/contacts', {templateUrl: '/partials/contacts.html', pageId: 'contacts'});
					$routeProvider.otherwise({redirectTo: '/hello'});
				}
	]);
})();

