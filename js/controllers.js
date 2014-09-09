(function() {
	var appControllers = angular.module('portfolio.controllers', ['ngRoute']);
	
	appControllers.controller('MainController', ['$scope', '$route', function($scope, $route) {
		$scope.$on('$routeChangeSuccess', function(ev, current, prev) {
			$scope.pageId = current.pageId;
		});
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
			 	/*{
			 		id: 'contemplating',
			 		caption: 'Contemplating'
			 	},*/
			 	{
			 		id: 'contacts',
			 		caption: 'Contacts'
			 	}
		];
		$scope.setSelectedItem = function(id) {
			$scope.$parent.pageId = id;
		};
	}]);
	
	appControllers.controller('SocialLinkController', ['$scope', function($scope) {
		$scope.links = 
		[
			{
				href: 'http://zuyetawarmatik.deviantart.com/',
				icon: 'fa-deviantart'
			},
			{
				href: 'https://www.behance.net/zuyetawarmatik',
				icon: 'fa-behance'
			},
			{
				href: 'https://www.facebook.com/zuyetawarmatik',
				icon: 'fa-facebook'
			},
			{
				href: 'http://sg.linkedin.com/pub/bui-phuc-duyet/34/224/649',
				icon: 'fa-linkedin'
			}
		];
	}]);
})();