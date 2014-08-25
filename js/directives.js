(function() {
	var appDirectives = angular.module('portfolio.directives', []);
	
	appDirectives.directive('portBackground', ['ColorService', '$window', function(ColorService, $window) {
	    return {
	    	restrict: 'A',
	    	link: function($scope, $element, $attrs) {
	    		/* Init */
	    		$element.prepend('<figure id="background"></figure>');
	    		
	    		$scope.tan = 1;
	    		$scope.canvas = SVG('background');
	    		
	    		$scope.getColors = function() {
	    			return ColorService.getColors($scope.pageId);
	    		};
	    		
	    		$scope.redrawBackground = function(isResize) {
	    			var colors = $scope.getColors();
	    			var mainColor = colors.mainColor;
	    			var darkColor = colors.darkColor;
	    			
	    			var bodyWidth = $('body').width();
    				var bodyHeight = $('body').height();
    				var delta = bodyHeight / $scope.tan;
	    			
    				var edgea1 = bodyWidth/2 + delta * 0.5;
    				var edgea2 = bodyWidth/2 - delta * 0.5;
    				
    				var edgea1f = edgea1;
    				var edgea2f = edgea2; var ledgea2f = bodyWidth - edgea2f;
    				
	    			if ($scope.overlayPoly === undefined || isResize === true) {
	    				$scope.canvas.clear();
	    				
	    				var backPolyStr = '{0},0 {2},0 {2},{3}, {1},{3}'.format(edgea1f, edgea2f, bodyWidth, bodyHeight);
	    				$scope.backPoly = $scope.canvas.polygon(backPolyStr).fill(darkColor);
	    				
	    				var overlayPolyStr = '0,0 {0},0 {1},{2}, 0,{2}'.format(edgea1, edgea2, bodyHeight);
	    				$scope.overlayPoly = $scope.canvas.polygon(overlayPolyStr).fill(mainColor);
	    			} else {
	    				var backPolyStr = '{0},0 {2},0 {2},{3}, {1},{3}'.format(edgea1f + ledgea2f, bodyWidth, bodyWidth + ledgea2f, bodyHeight);
	    				var newBackPoly = $scope.canvas.polygon(backPolyStr).fill(darkColor);
	    				$scope.backPoly.animate(500, '>').attr({ fill: darkColor });
	    				newBackPoly.animate(500, '>').move(edgea2f, 0).after(function() {
	    					$scope.backPoly.remove();
	    					$scope.backPoly = newBackPoly;
	    				});
	    				
	    				var overlayPolyStr = '{0},0 0,0 {1},{2}, {0},{2}'.format(-edgea1, edgea2 - edgea1, bodyHeight);
	    				var newOverlayPoly = $scope.canvas.polygon(overlayPolyStr).fill(mainColor);
	    				$scope.overlayPoly.animate(500, '>').attr({ fill: mainColor });
	    				newOverlayPoly.animate(500, '>').move(0, 0).after(function() {
	    					$scope.overlayPoly.remove();
	    					$scope.overlayPoly = newOverlayPoly;
	    				});
	    			}
	    		};
	    		
	    		$scope.$on('$viewContentLoaded', function() {
	    			var colors = $scope.getColors();
	    			less.modifyVars({ 'main-color' : colors.mainColor , 'dark-color' : colors.darkColor });
	    			$scope.redrawBackground();
	    		});
	    		
	    		angular.element($window).bind('resize', function() {
	    			$scope.redrawBackground(true);
	    			$scope.$apply();
    		    });
	    	}
	    };
	}]);
	
	appDirectives.directive('colorsList', ['ColorService', function(ColorService) {
	    return {
	    	restrict: 'E',
	    	transclude: true,
	    	scope: {},
	    	controller: function($scope) {
	    		var colors = $scope.colors = [];
	    		this.add = function(color) {
	    			if (colors.length === 0)
	    				$scope.select(color);
	    			colors.push(color);
	    		};
	    		$scope.select = function(color) {
	    			$scope.selectedColor = color;
					};
	    	},
	    	templateUrl: 'partials/elements/colors-list.html'
	    }
	}]);
	
	appDirectives.directive('colorBlock', function() {
	    return {
	    	require: '^colorsList',
	    	restrict: 'E',
	    	scope: {
	    		name: '@',
	    		abbr: '@',
	    		caption: '@',
	    		subcaption: '@',
	    	},
	    	link: function($scope, $element, $attrs, $ctrl) {
	    		$ctrl.add($scope);
	    	}
	    }
	});
	
	appDirectives.directive('portBlockBackground', ['ColorService', function(ColorService) {
	    return {
	    	restrict: 'A',
	    	link: function($scope, $element, $attrs) {
	    		/* Init */
	    		var colorId = $scope.color.abbr.toLowerCase();
	    		
	    		$scope.getColors = function() {
	    			return ColorService.getColors(colorId);
	    		};
	    		
	    		$scope.init = function() {
	    			var colors = $scope.getColors();	    			
	    			
	    			$element.prepend('<figure class="block-background" id="' + colorId + '"></figure>');
	    			$('#' + colorId).css({'background': colors.darkColor});
	    			$scope.canvas = SVG(colorId);
		    		
	    			$scope.selected = ($scope.$parent.selectedColor == $scope.color);
	    			$element.css({'box-shadow': ('0.5rem 0.5rem 0 0 ' + colors.shadowColor)});
	    			$element.css({'text-shadow': ('0.5rem 0.5rem 0 ' + colors.shadowColor)});
	    		};
	    		
	    		$scope.drawBackground = function() {
	    			var colors = $scope.getColors();
	    			var mainColor = colors.mainColor;
	    			var darkColor = colors.darkColor;
	    			
	    			var width = $('.block-background').width();
    				
	    			if ($scope.overlayPoly === undefined) {
	    				var overlayPolyStr = '0,0 {1},0 {0},{0}, -{0},{0}'.format(width, width * 2);
	    				$scope.overlayPoly = $scope.canvas.polygon(overlayPolyStr).fill(mainColor);
	    				
	    				if (!$element.hasClass('selected')) {
		    				$scope.overlayPoly.x(-width * 2.25);
		    			}
	    			} else {
	    				if ($element.hasClass('selected')) {
		    				$scope.overlayPoly.animate(250, '>').move(-width, 0);
		    			} else if ($element.hasClass('hovered')) {
		    				$scope.overlayPoly.animate(200, '>').move(-width * 2, 0);
		    			} else {
		    				$scope.overlayPoly.animate(250, '>').move(-width * 2.25, 0);
		    			}
	    			}
	    		};
	    		
	    		$scope.init();
	    		
	    		$scope.$watch(function(){return $element.attr('class')}, function(val){
	    			$scope.drawBackground();
	    		});
	    		
	    		$element.bind('mouseenter', function() {
	    			$element.addClass('hovered');
	    			$scope.drawBackground();
	            });
	    		$element.bind('mouseleave', function() {
	    			$element.removeClass('hovered');
	    			$scope.drawBackground();
	            });
	    	},
	    };
	}]);
	
	appDirectives.directive('portBadgeBackground', ['ColorService', function(ColorService) {
	    return {
	    	restrict: 'A',
	    	link: function($scope, $element, $attrs) {
	    		/* Init */
	    		var colorId;
	    		
	    		$scope.getColors = function() {
	    			return ColorService.getColors(colorId);
	    		};
	    		
	    		$scope.init = function() {
	    			$element.prepend('<figure id="badge-background"></figure>');
	    			$scope.badgeCanvas = SVG("badge-background");
	    		};
	    		
	    		$scope.init();
	    		
	    		$scope.drawBackground = function() {
	    			var colors = $scope.getColors();
	    			var mainColor = colors.mainColor;
	    			var darkColor = colors.darkColor;
	    			
	    			$jqElement = $($element[0]);
	    			
	    			var width = $jqElement.width();
	    			var height = $jqElement.height();
	    			
	    			if ($scope.badgeBackPoly === undefined) {
	    				var badgeBackPolyStr = '0,0 0,{3} {1},{2} {0},{3} {0},0 '.format(width, width * 0.5, height, height * 0.75);
	    				$scope.badgeBackPoly = $scope.badgeCanvas.polygon(badgeBackPolyStr).fill(darkColor);
	    				var badgeOverlayPolyStr = '0,0 0,{2} {0},{1} {0},0'.format(width * 0.5, height, height * 0.75);
	    				$scope.badgeOverlayPoly = $scope.badgeCanvas.polygon(badgeOverlayPolyStr).fill(mainColor);
	    			} else {
	    				$scope.badgeBackPoly.animate(250, '>').attr({ fill: darkColor });
	    				$scope.badgeOverlayPoly.animate(250, '>').attr({ fill: mainColor });
	    			}
	    		};
	    		
	    		$scope.$watch(function(){return $scope.selectedColor.abbr.toLowerCase();}, function(val){
	    			colorId = val;
	    			$scope.drawBackground();
	    		});
	    	}
	    };
	}]);
	
	appDirectives.directive('portBubbleBackground', function() {
	    return {
	    	restrict: 'A',
	    	link: function($scope, $element, $attrs) {
	    		$scope.init = function() {
	    			$element.prepend('<figure id="bubble-background"></figure>');
	    			$scope.bubbleCanvas = SVG("bubble-background");
	    			
	    			var width = $('.color-content').outerWidth();
	    			var height = $('.color-content').outerHeight();
	    			
    				var bubbleBackPolyStr = '0,0 {0},0 {0},{3} {1},{2} 0,{2}'.format(width, width * 1.05, height, height - width * 0.05);
    				$scope.bubbleBackPoly = $scope.bubbleCanvas.polygon(bubbleBackPolyStr).fill('#f9f9f9');
    				$scope.bubbleBackPoly.stroke('#e5e5e5');
	    		};
	    		
	    		$scope.init();
	    	}
	    };
	});
	
	appDirectives.directive('artworksList', function() {
	    return {
	    	restrict: 'E',
	    	transclude: true,
	    	scope: {},
	    	controller: function($scope) {
	    		var artworks = $scope.artworks = [];
	    		this.add = function(artwork) {
	    			if (artworks.length === 0)
	    				$scope.focus(artwork);
	    			artworks.push(artwork);
	    		};
	    		$scope.focus = function(artwork) {
	    			$scope.focusedArtwork = artwork;
					};
	    	},
	    	templateUrl: 'partials/elements/artworks-list.html'
	    }
	});
	
	appDirectives.directive('artwork', function() {
	    return {
	    	require: '^artworksList',
	    	restrict: 'E',
	    	scope: {
	    		name: '@',
	    		time: '@',
	    		caption: '@',
	    		img: '@',
	    	},
	    	link: function($scope, $element, $attrs, $ctrl) {
	    		$ctrl.add($scope);
	    	}
	    }
	});
})();
