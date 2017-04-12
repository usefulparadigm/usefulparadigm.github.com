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
        
        // Run animate only once in a session
        if (!$.cookie('animated')) {
            $('*[data-animate]').each(function() {
                var $self = $(this);
                $self.addClass('animated ' + $self.data('animate'))
            });
            $.cookie('animated', true);
        }
        

        // http://kenwheeler.github.io/slick/        
        // $('.work-slider').slick({
        //     infinite: true,
        //       slidesToShow: 3,
        //       slidesToScroll: 3
        // });    
        
        // http://masonry.desandro.com/
        // var $container = $('.masonry');
        // $container.imagesLoaded( function() {
        //     $container.masonry({
        //         // columnWidth: 200,
        //         // itemSelector: '.item'
        //     });
        // });

        // $('#accordion').on('show.bs.collapse', function () {
        //     // http://masonry.desandro.com/
        //     var $container = $('.masonry', this);
        //     $container.imagesLoaded( function() {
        //         $container.masonry({
        //             // columnWidth: 200,
        //             // itemSelector: '.item'
        //         });
        //     });
        // });
        
	};

	init();

  // Change grid color randomly
  // http://colormind.io/api-access/
  (function() {
    var url = "http://colormind.io/api/";
    var data = {
      model : "default",
      input : [[44,43,44],[90,83,82],"N","N","N"]
    };
    
    // $.post(url, data, function(colors) {
    //   console.log(colors);
    // });
  })();
  
});

