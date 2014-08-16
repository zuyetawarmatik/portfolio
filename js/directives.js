(function() {
	var appDirectives = angular.module('portfolio.directives', []);
	
	appDirectives.directive('portBackground', ['ColorService', '$window', function(ColorService, $window) {
	    return {
	    	restrict: 'A',
	    	link: function(scope, element, attrs) {
	    		var window = angular.element($window);
	    		
	    		scope.tan = 2;
	    		scope.canvas = SVG('background');
	    		
	    		scope.getColors = function() {
	    			return ColorService.getColors(scope.pageId);
	    		};
	    		
	    		scope.redrawBackground = function(isResize) {
	    			var colors = scope.getColors();
	    			var mainColor = colors.mainColor;
	    			var darkColor = colors.darkColor;
	    			
	    			var bodyWidth = $('body').width();
    				var bodyHeight = $('body').height();
    				var delta = bodyHeight / scope.tan;
	    			
    				var edgea1 = bodyWidth/2 + delta * 0.25;
    				var edgea2 = bodyWidth/2 - delta * 0.75;
    				
    				var edgea1f = edgea1 - 10;
    				var edgea2f = edgea2 - 10; var ledgea2f = bodyWidth - edgea2f;
    				
	    			if (scope.overlayPoly === undefined || isResize === true) {
	    				scope.canvas.clear();
	    				
	    				var backPolyStr = '{0},0 {2},0 {2},{3}, {1},{3}'.format(edgea1f, edgea2f, bodyWidth, bodyHeight);
	    				scope.backPoly = scope.canvas.polygon(backPolyStr).fill(darkColor);
	    				
	    				var overlayPolyStr = '0,0 {0},0 {1},{2}, 0,{2}'.format(edgea1, edgea2, bodyHeight);
	    				scope.overlayPoly = scope.canvas.polygon(overlayPolyStr).fill(mainColor);
	    			} else {
	    				var backPolyStr = '{0},0 {2},0 {2},{3}, {1},{3}'.format(edgea1f + ledgea2f, bodyWidth, bodyWidth + ledgea2f, bodyHeight);
	    				var newBackPoly = scope.canvas.polygon(backPolyStr).fill(darkColor);
	    				scope.backPoly.animate(500, '>').attr({ fill: darkColor });
	    				newBackPoly.animate(500, '>').move(edgea2f, 0).after(function() {
		    				scope.backPoly.remove();
		    				scope.backPoly = newBackPoly;
	    				});
	    				
	    				var overlayPolyStr = '{0},0 0,0 {1},{2}, {0},{2}'.format(-edgea1, edgea2 - edgea1, bodyHeight);
	    				var newOverlayPoly = scope.canvas.polygon(overlayPolyStr).fill(mainColor);
	    				scope.overlayPoly.animate(500, '>').attr({ fill: mainColor });
	    				newOverlayPoly.animate(500, '>').move(0, 0).after(function() {
		    				scope.overlayPoly.remove();
		    				scope.overlayPoly = newOverlayPoly;
	    				});
	    			}
	    		};
	    		
	    		scope.$on('$viewContentLoaded', function() {
	    			var colors = scope.getColors();
	    			less.modifyVars({ 'main-color' : colors.mainColor , 'dark-color' : colors.darkColor });
	    			scope.redrawBackground();
	    		});
	    		
	    		window.bind('resize', function() {
	    			scope.redrawBackground(true);
	    			scope.$apply();
    		    });
	    	}
	    };
	}]);
})();
