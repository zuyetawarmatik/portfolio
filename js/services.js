(function() {
	var appServices = angular.module('portfolio.services', []);
	
	function ColorService() {
		this.getColors = function(id) {
			switch (id) {
			case 'hello': case 'pl':
				return {
					mainColor: '#8E4585',
					darkColor: '#82407a',
					shadowColor: '#75396e'
				};
			case 'the-3-colors': case 'bo':
				return {
					mainColor: '#fe733d',
					darkColor: '#f06d3a',
					shadowColor: '#e36736'
				};
			case 'portfolio': case 'tw':
				return {
					mainColor: '#4fac9b',
					darkColor: '#499e8e',
					shadowColor: '#439183'
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
					shadowColor: '#b28e82'
				};
			}
		}
	}
	
	appServices.service('ColorService', ColorService);
	
})();
