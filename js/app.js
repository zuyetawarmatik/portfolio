(function() {
	var app = angular.module('portfolio', 
								['ngRoute',
	                             'portfolio.filters',
	                             'portfolio.services',
	                             'portfolio.directives',
	                             'portfolio.controllers']
	);
	
	app.config(['$routeProvider', 
				function($routeProvider) {
					$routeProvider.when('/hello', {templateUrl: 'partials/hello.html' /*controller: 'MyCtrl1'*/});
					$routeProvider.otherwise({redirectTo: '/hello'});
				}
	]);
})();

