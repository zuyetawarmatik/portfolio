(function() {
	var appDirectives = angular.module('portfolio.directives', []);
	
	appDirectives.directive('appVersion', ['version', function(version) {
	    return function(scope, elm, attrs) {
	      elm.text(version);
	    };
	}]);
})();
