/* Author: 

*/

$(function() {
	// $('.bigger').biggerlink();
	// $('.tabs').tabs();

	// minimal pjax without server processing

	String.prototype.decodeHTML = function() {
		return $("<div>", {html: "" + this}).html();
	};
	  
	if (window.history && window.history.pushState) {
		
		var loadPage = function(href) {
			history.ready = true; 
			history.pushState({path: href}, '', href);
			$('#container').load(href + ' #container>*', function(html) {
				document.title = html.match(/<title>(.*?)<\/title>/)[1].trim().decodeHTML();
			});
		};

		$(document).on('click', 'a.pjax', function() {
			loadPage($(this).attr('href'));
			return false;
		});
		
		$(window).on("popstate", function(e) {
			// console.log(e.originalEvent);
		    if (window.history.ready || e.originalEvent.state !== null) { // if not initial load
				loadPage(location.href);
		    }
		});
		
		// (function(original) { // overwrite history.pushState 
		//     history.pushState = function(state) {
		//         change(state);
		//         return original.apply(this, arguments);
		//     };
		// })(history.pushState);
		
	}


	
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

	// $('#jTweetsAnywhere').jTweetsAnywhere({
	//    username: 'usefulparadigm',
	//    count: 5,
	//    showTweetFeed: {
	// 	showProfileImages: true,
	//         // showUserScreenNames: true,
	//        	paging: { mode: 'more' }
	//        },
	//    tweetFilter: function(tweet, options) { 
	// 		return !tweet.text.match(/^@.+/);
	//    },
	//    showFollowButton: false
	// });
});





















