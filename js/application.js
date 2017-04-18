// application.js

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
		
		// http://stackoverflow.com/questions/7901679/jquery-add-target-blank-for-outgoing-link
		$('a[href^="http://"]').not('a[href*=usefulparadigm]').attr('target','_blank');
		
		// re-render widgets
		if (ajax) {
			if (typeof FB !== 'undefined') FB.XFBML.parse();
			loadTwitter();
		}
        
    // http://www.appelsiini.net/projects/lazyload
    $("article img").lazyload({
        effect : "fadeIn"
    });

    // animate.css
    // https://github.com/daneden/animate.css
    $('*[data-animate]').hover(function() {
      $(this).toggleClass('animated ' + $(this).data('animate'));
    });
    
    // Run animate only once in a session
    // if (!$.cookie('animated')) {
    //     $('*[data-animate].animate-once').each(function() {
    //         $(this).addClass('animated ' + $(this).data('animate'))
    //     });
    //     $.cookie('animated', true);
    // }

	};

	init();

  // Change grid color randomly
  // http://colormind.io/api-access/
  // (function() {
  //   var url = "http://colormind.io/api/";
  //   var data = {
  //     model : "default"
  //     // input : [[44,43,44],[90,83,82],"N","N","N"]
  //   };
  //
  //   $.post(url, JSON.stringify(data), function(resp) {
  //     var colors = JSON.parse(resp).result;
  //     // console.log(colors);
  //     $('#services .item .item-content').each(function(index) {
  //       var rgb = 'rgb('+colors[index % 5].join(',')+')';
  //       $(this).css('background-color', rgb);
  //     });
  //   });
  // })();
  
});

