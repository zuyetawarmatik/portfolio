(function() {
	var appControllers = angular.module('portfolio.controllers', ['ngRoute']);
	
	/* This is for browser's address bar routing */
	appControllers.controller('MainController', ['$scope', '$route', function($scope, $route) {
		$scope.$on('$routeChangeSuccess', function(ev, current, prev) {
			$scope.pageId = current.pageId;
		});
	}]);
	
	/* This is for menu bar routing */
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
				id: 'experiments',
				caption: 'Experiments'
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
	
	appControllers.controller('ArtworkController', ['$scope', function($scope) {
		$scope.artworks = 
		[
			{
				name: 'History Notes',
				time: 'Dec 2012',
				caption: 'Simply a delicious mixture of textures and colors.',
				img: 'history-notes.png',
				link: 'http://zuyetawarmatik.deviantart.com/art/History-Notes-347163708',
			},
			{
				name: 'The Bang of Chars',
				time: 'May 2013',
				caption: 'A brilliant composition of Blender and Photoshop.',
				img: 'bang-of-chars.png',
				link: 'http://zuyetawarmatik.deviantart.com/art/The-Bang-Of-Chars-373725412',
			},
			{
				name: 'WeatherMuse',
				time: 'Aug 2013',
				caption: 'Bring out the ultimate beauty of translucency.',
				img: 'weather-muse.png',
				link: 'https://www.behance.net/gallery/10403173/WeatherMuse',
			},
			{
				name: "X'mas 2013 Special Project",
				time: 'Dec 2013',
				caption: "Every year's end, I put all the best to welcome this beloved month.",
				img: 'xmas-2013.png',
				link: 'https://www.behance.net/gallery/13338997/2013-Merry-Xmas-to-Everyone',
			},
			{
				name: 'Japan Landmarks',
				time: 'May 2014',
				caption: 'A tribute to my encountered wonders in the Japan trip.',
				img: 'japan-landmarks.png',
				link: 'https://www.behance.net/gallery/17879433/Japan-Landmarks',
			}
		];
	}]);
})();