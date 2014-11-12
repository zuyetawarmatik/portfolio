$(function() {
	var $backgrounds = $(".background");
	
	function getBackgroundByIndex(fullPageIndex) {
		return $backgrounds.find(">div:eq(" + (fullPageIndex - 1) + ")");
	}
	
	$(".description").perfectScrollbar({
		suppressScrollX: true,
		wheelSpeed: 2
	});
	
	$(".full-page").fullpage({
		
		css3: true,
		
		scrollingSpeed: 400,
		
		resize: false,

		menu: "#menu",
		
		afterLoad: function(anchorLink, index) {
			$("body").attr("data-anchor", anchorLink);
			$("#menu li.active").addClass("emboss");
			getBackgroundByIndex(index).css({opacity: 1});
		},
		
		onLeave: function(index, nextIndex, direction){
			getBackgroundByIndex(index).animate({opacity: 0}, 400);
			getBackgroundByIndex(nextIndex).animate({opacity: 1}, 400);
			$("#menu li.active").removeClass("emboss");
		}
	});

});