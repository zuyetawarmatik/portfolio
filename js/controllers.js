(function() {
	var appControllers = angular.module('portfolio.controllers', []);
	
	appControllers.controller('MainController', ['$scope', function($scope) {
		$scope.pageId = 'hello';
	}]);
	
	appControllers.controller('MenuController', ['$scope', function($scope) {
		$scope.menuItems = 
			[
			 	{
			 		id: 'hello',
			 		caption: 'Hello'
			 	},
			 	{
			 		id: 'the-3-colors',
			 		caption: 'The 3 Colors'
			 	},
			 	{
			 		id: 'portfolio',
			 		caption: 'Portfolio'
			 	},
			 	{
			 		id: 'contemplating',
			 		caption: 'Contemplating'
			 	},
			 	{
			 		id: 'contacts',
			 		caption: 'Contacts'
			 	}
		    ];
		$scope.setSelectedItem = function(id) {
			$scope.$parent.pageId = id;
		}
	}]);
})();