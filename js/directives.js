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
    				
    				var edgea1f = edgea1 - 10;
    				var edgea2f = edgea2 - 10; var ledgea2f = bodyWidth - edgea2f;
    				
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
		    			} else {
		    				$scope.overlayPoly.animate(250, '>').move(-width * 2.25, 0);
		    			}
	    			}
	    		};
	    		
	    		$scope.init();
	    		
	    		$scope.$watch(function(){return $element.attr('class')}, function(val){
	    			$scope.drawBackground();
	    		});
	    	},
	    };
	}]);
	
})();
