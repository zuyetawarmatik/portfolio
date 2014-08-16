(function() {
	var appServices = angular.module('portfolio.services', []);
	
	function ColorService() {
		this.getColors = function(pageId) {
			switch (pageId) {
			case 'hello':
				return {
					mainColor: '#8c3770',
					darkColor: '#7c3163'
				};
			case 'the-3-colors':
				return {
					mainColor: '#f07241',
					darkColor: '#e46c3e'
				};
			case 'portfolio':
				return {
					mainColor: '#73bfe5',
					darkColor: '#66aacc'
				};	
			case 'contemplating':
				return {
					mainColor: '#4fac9b',
					darkColor: '#4ba494'
				};
			case 'contacts':
				return {
					mainColor: '#cca395',
					darkColor: '#b59184'
				};
			}
		}
	}
	
	appServices.service('ColorService', ColorService);
	
})();
