var portfolios = [
	{
		title: "WeatherMuse",
		date: "Aug 2013",
		content: [
			"WeatherMuse is a brilliant UI design which demonstrates a creative combination of features: weather and music player. The underlying wire connecting them is the mood: you can expect a dynamic, booming sound in a rather hot day or a sweet and calm melody in such another shower day.",
			"The project is created right after the announcement time of iOS7, which features vibrant colors and focuses on minimalist design."
		],
		image: "WeatherMuse.png"
	},
	{
		title: "Animhist",
		date: "Oct 2013",
		content: [
			"Animated History is a flat, sleek and modern UI for a school project which is used to visualize data both geographically and temporally. In reality I also held responsibility for the backend of the project, which is coded in PHP/Laravel framework (you can find it on my Github!)",
			"The project is a huge, well-done and carefully documented which earns my group project an A."
		],
		image: "Animhist.png"
	},
	{
		title: "Animhist",
		date: "Oct 2013",
		content: [
			"Animated History is a flat, sleek and modern UI for a school project which is used to visualize data both geographically and temporally. In reality I also held responsibility for the backend of the project, which is coded in PHP/Laravel framework (you can find it on my Github!)",
			"The project is a huge, well-done and carefully documented which earns my group project an A."
		],
		image: "ant.s.cial.png"
	}
];

$(function() {
	$.each(portfolios, function(i, portfolio) {
		var $el = $('<div class="slide"></div>')
		.append(
			'<div class="container-fluid">\
				<div class="row">\
					<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 show">\
						<div class="col-sm-5 col-sm-push-7 description">\
							<h1></h1>\
							<h3><em></em></h3>\
						</div>\
						<div class="col-sm-7 col-sm-pull-5 image">\
							<img src="">\
						</div>\
					</div>\
				</div>\
			</div>');
		
		$el.find("h1").html(portfolio.title);
		$el.find("h3 em").html(portfolio.date);
		$el.find(".image img").attr("src", "img/" + portfolio.image);
		
		$.each(portfolio.content, function(j, p) {
			$el.find(".description").append("<p>" + p + "</p>");
		});
		
		$el.find(".description").append("<a href='#' class='btn emboss'>Visit Full Project</a>");
		
		$("[data-anchor='portfolio']").append($el);
	});
});