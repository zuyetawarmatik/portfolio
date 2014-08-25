(function() {
	var appServices = angular.module('portfolio.services', []);
	
	function ColorService() {
		this.getColors = function(id) {
			switch (id) {
			case 'hello': case 'pl':
				return {
					mainColor: '#8c3770',
					darkColor: '#7c3163',
					shadowColor: '#702d5a'
				};
			case 'the-3-colors': case 'jf':
				return {
					mainColor: '#f07241',
					darkColor: '#e46c3e',
					shadowColor: '#d6663a'
				};
			case 'portfolio': case 'tw':
				return {
					mainColor: '#4fac9b',
					darkColor: '#4ba494',
					shadowColor: '#459688'
				};
			case 'contemplating':
				return {
					mainColor: '#80ccea',
					darkColor: '#7ac2de',
					shadowColor: '#73b6d1'
				};
			case 'contacts':
				return {
					mainColor: '#cca395',
					darkColor: '#bf998c',
					shadowColor: '#b38e82'
				};
			}
		}
	}
	
	appServices.service('ColorService', ColorService);
	
})();
