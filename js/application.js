/* Author: 

*/

$(function() {
	// $('.bigger').biggerlink();
	// $('.tabs').tabs();

	var init = function() {
		
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

		if (typeof FB !== 'undefined') FB.XFBML.parse();
		if (typeof twttr !== 'undefined') twttr.widgets.load();
		
	    // /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
	    // var disqus_shortname = 'usefulparadigm'; // required: replace example with your forum shortname
	    // 
	    // /* * * DON'T EDIT BELOW THIS LINE * * */
	    // (function() {
	    //     var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	    //     dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
	    //     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	    // })();
		
		if (typeof DISQUS !== 'undefined') {
			DISQUS.reset({
			  reload: true,
			  config: function () {  
			    this.page.identifier = "newidentifier";  
			    this.page.url = "http://example.com/#!newthread";
			  }
			});			
		}
		
	};
	
	init();

	// ajax pushState

	String.prototype.decodeHTML = function() {
		return $("<div>", {html: "" + this}).html();
	};
	
	if (window.history && window.history.pushState) {
		
		var loadPage = function(href) {
			history.ready = true; 
			history.pushState({path: href}, '', href);
			$('#container').load(href + ' #container>*', function(html) {
				document.title = html.match(/<title>(.*?)<\/title>/)[1].trim().decodeHTML();
				init();
				// $('#container').animate({width: 'toggle'});
			});
		};

		$(document).on('click', "a:not([href^='http://'])", function() {
			var href = $(this).attr('href');
			// if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) {
				loadPage(href);
			// }
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

});





















