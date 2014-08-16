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
	    			
	    			if (scope.overlayPoly === undefined || isResize === true) {
	    				scope.canvas.clear();
	    				var bodyWidth = $('body').width();
	    				var bodyHeight = $('body').height();
	    				var delta = bodyHeight / scope.tan;
	    				
	    				var backPolyStr = '0,0 {0},0 {0},{1}, 0,{1}'.format(bodyWidth, bodyHeight);
	    				scope.backPoly = scope.canvas.polygon(backPolyStr).fill(darkColor);
	    				var overlayPolyStr = '0,0 {0},0 {1},{2}, 0,{2}'.format(bodyWidth/2 + delta * 0.25, bodyWidth/2 - delta * 0.75, bodyHeight);
	    				scope.overlayPoly = scope.canvas.polygon(overlayPolyStr).fill(mainColor);
	    			} else {
	    				scope.overlayPoly.animate(500, '>').attr({ fill: mainColor });
	    				scope.backPoly.animate(500, '>').attr({ fill: darkColor });
	    			}
	    		};
	    		
	    		scope.$on('$viewContentLoaded', function() {
	    			var colors = scope.getColors();
	    			less.modifyVars({ 'main-color' : colors.mainColor , 'dark-color' : colors.darkColor });
	    			scope.redrawBackground();
	    		});
	    		
	    		scope.$watch(function(){return $window.outerWidth;}, function(nv, ov) {
	    			if (nv != ov) scope.redrawBackground(true);
	    		});
	    		
	    		scope.$watch(function(){return $window.outerHeight;}, function(nv, ov) {
	    			if (nv != ov) scope.redrawBackground(true);
	    		});

	    		window.bind('resize', function() {
	    			scope.$apply();
    		    });
	    	}
	    };
	}]);
	
	appDirectives.directive('portNavScroll', ['$window', function($window) {
	}]);
	}
})();
