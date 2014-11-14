var portfolios = [
	{
		title: "WeatherMuse",
		date: "Aug 2013",
		content: [
			"WeatherMuse is a brilliant UI design which demonstrates a creative combination of features: weather and music player. The underlying wire connecting them is the mood: you can expect a dynamic, booming sound in a rather hot day or a sweet and calm melody in such another shower day.",
			"The project is created right after the announcement time of iOS7, which features vibrant colors and focuses on minimalist design."
		],
		image: "WeatherMuse.png",
		link: "https://www.behance.net/gallery/10403173/WeatherMuse"
	},
	{
		title: "Animhist",
		date: "Oct 2013",
		content: [
			"Animated History is a flat, sleek and modern UI for a school project which is used to visualize data both geographically and temporally. In reality I also held responsibility for the backend of the project, which is coded in PHP/Laravel framework (you can find it on my Github!)",
			"The project is a huge, well-done and carefully documented which earns my group project an A."
		],
		image: "Animhist.png",
		link: "https://www.behance.net/gallery/12501497/Animhist"
	},
	{
		title: "ant.s.cial",
		date: "Aug 2013",
		content: [
			"ant.s.cial is a hobbyist personal project finished in Aug 2013 whose idea is authentically original: it combines anonymous social network with proximity messaging and place review."
		],
		image: "ant.s.cial.png",
		link: "https://www.behance.net/gallery/9755821/Antscial"
	},
	{
		title: "Forbes Digital Wallet",
		date: "Jul 2014 - Oct 2014",
		content: [
			"A throughout design for a big corporate project, which comprises of over 50 screenshots for different interactions, versions and devices.",
			"Forbes Digital Wallet is a solution to enterprise's expense with analytics, reporting and management tools."
		],
		image: "FDW.png",
		link: "#"
	}
];

var experiments = [
	{
		title: "SwiftUI Kara",
		content: [
			"SwiftUI Kara is a Polymer element that allows synchronizing lyrics and a music source, and it's totally open-source!."
		],
		image: "SwiftUI-Kara.gif",
		link: "http://zuyetawarmatik.github.io/experiments/swiftui-kara"
	}
];

$(function() {
	var $portfolioSec = $("[data-anchor='portfolio']");
	var $experimentSec = $("[data-anchor='experiments']");
	
	$.each(portfolios, function(i, portfolio) {
		var $el = $('<div class="slide"></div>')
		.append(
			'<div class="container-fluid">\
				<div class="row">\
					<div class="col-sm-10 col-sm-offset-1 show">\
						<div class="col-sm-5 col-sm-push-7 description">\
							<h1></h1>\
							<h3><em></em></h3>\
							<a target="_blank" class="btn emboss">Visit Full Project</a>\
						</div>\
						<div class="col-sm-7 col-sm-pull-5 image">\
							<img>\
						</div>\
					</div>\
				</div>\
			</div>');
		
		$el.find("h1").html(portfolio.title);
		$el.find("h3 em").html(portfolio.date);
		$el.find(".image img").attr("src", "img/" + portfolio.image);
		$el.find("a").attr("href", portfolio.link);
		
		$.each(portfolio.content, function(j, p) {
			$("<p>" + p + "</p>").insertAfter($el.find(".description h3"));
		});
		
		$portfolioSec.append($el);
	});
	
	$.each(experiments, function(i, experiment) {
		var $el = $(
			'<div class="container-fluid">\
				<div class="row">\
					<div class="col-sm-10 col-sm-offset-1">\
						<div class="col-sm-4 col-sm-push-4">\
							<div class="show">\
								<div class="image emboss">\
									<img>\
								</div>\
								<div class="description">\
									<h3></h3>\
									<p></p>\
									<a target="_blank" class="btn emboss">Go to Laboratory</a>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>');
		
		$el.find("h3").html(experiment.title);
		$el.find("p").html(experiment.content);
		$el.find(".image img").attr("src", "img/" + experiment.image);
		$el.find("a").attr("href", experiment.link);
		$experimentSec.append($el);
	});
});