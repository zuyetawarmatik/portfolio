(function() {
	var appFilters = angular.module('portfolio.filters', []);
	
	appFilters.filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]);
})();

