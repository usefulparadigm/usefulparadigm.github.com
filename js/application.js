/* Author: 

*/

$(function() {
	// $('.bigger').biggerlink();
	// $('.tabs').tabs();

	function loadTwitter() {
	    if($(".twitter-share-button").length > 0){
	        if (typeof (twttr) != 'undefined') {
	            twttr.widgets.load();
	        } else {
	            $.getScript('http://platform.twitter.com/widgets.js');
	        }
	    }
	}
	
	var init = function(ajax) {
		
		$(".various").fancybox({
			// maxWidth	: 800,
			// maxHeight	: 600,
			// fitToView	: false,
			// width		: '70%',
			// height		: '70%',
			// autoSize	: false,
			// closeClick	: false,
			// openEffect	: 'none',
			// closeEffect	: 'none'
		});
		
		// re-render widgets
		if (ajax) {
			if (typeof FB !== 'undefined') FB.XFBML.parse();
			loadTwitter();
		}
	};
	
	init();

	// // ajax pushState
	// 
	// String.prototype.decodeHTML = function() {
	// 	return $("<div>", {html: "" + this}).html();
	// };
	// 
	// if (window.history && window.history.pushState) {
	// 	
	// 	var loadPage = function(href) {
	// 		history.ready = true; 
	// 		history.pushState({path: href}, '', href);
	// 		$.get(href, function(html) {
	// 			$("#container").html(html.match(/<!--\^frag-->([\s\S]*?)<!--\$frag-->/m)[1]);
	// 			document.title = html.match(/<title>(.*?)<\/title>/)[1].trim().decodeHTML();
	// 			init(true);
	// 		});
	// 		// $('#container').load(href + ' #container>*', function(html) {
	// 		// 	console.log($(html).filter("#container>*"));
	// 		// 	document.title = html.match(/<title>(.*?)<\/title>/)[1].trim().decodeHTML();
	// 		// 	init();
	// 		// 	// $('#container').animate({width: 'toggle'});
	// 		// });
	// 	};
	// 
	// 	$(document).on('click', "a:not([href^='http://'])", function() {
	// 		var href = $(this).attr('href');
	// 		// if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) {
	// 			loadPage(href);
	// 		// }
	// 		return false;
	// 	});
	// 	
	// 	$(window).on("popstate", function(e) {
	// 		// console.log(e.originalEvent);
	// 	    if (window.history.ready || e.originalEvent.state !== null) { // if not initial load
	// 			loadPage(location.href);
	// 	    }
	// 	});
	// 	
	// }

});





















