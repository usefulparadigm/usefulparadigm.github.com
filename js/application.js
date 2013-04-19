/* Author: 

*/

$(function() {
	// $('.bigger').biggerlink();
	// $('.tabs').tabs();

	// minimal pjax without server processing
	$('a.pjax').live('click', function(e) {
		if (window.history && window.history.pushState) {
			var href = $(this).attr('href')
			e.preventDefault();
			history.pushState(null, null, href);
			$('#container').load(href + ' #content');
		}
	});

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





















