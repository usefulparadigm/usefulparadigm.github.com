// application.js

;$(function() {
	// $('.bigger').biggerlink();
	// $('.tabs').tabs();

  // function loadTwitter() {
  //     if($(".twitter-share-button").length > 0){
  //         if (typeof (twttr) != 'undefined') {
  //             twttr.widgets.load();
  //         } else {
  //             $.getScript('http://platform.twitter.com/widgets.js');
  //         }
  //     }
  // }
	
	var init = function() {
		
		// http://stackoverflow.com/questions/7901679/jquery-add-target-blank-for-outgoing-link
		$('a[href^="http://"],a[href^="https://"]').not('a[href^="http://www.usefulparadigm.com"]').attr('target','_blank');

    // https://stackoverflow.com/a/26996468
    $(window).scroll(function() {
      var scrolledY = $(window).scrollTop();
      $('.fixed-bg').css('background-position', '0 0, center -' + ((scrolledY * 0.3)) + 'px');
    });

		// re-render widgets
    // if (ajax) {
    //   if (typeof FB !== 'undefined') FB.XFBML.parse();
    //   loadTwitter();
    // }
        
    // http://www.appelsiini.net/projects/lazyload
    // $("article img").lazyload({
    //     effect : "fadeIn"
    // });

    // animate.css
    // https://github.com/daneden/animate.css
    // $('*[data-animate]').hover(function() {
    //   $(this).toggleClass('animated ' + $(this).data('animate'));
    // });
    
    // Run animate only once in a session
    // if (!$.cookie('animated')) {
    //     $('*[data-animate].animate-once').each(function() {
    //         $(this).addClass('animated ' + $(this).data('animate'))
    //     });
    //     $.cookie('animated', true);
    // }
    
	};

	init();

  // Pjax page transition
  // https://github.com/luruke/barba.js

  Barba.Pjax.getTransition = function() {
    return require('./FadeTransition'); //FadeTransition;
  };

  Barba.Dispatcher.on('initStateChange', function(currentStatus, prevStatus) {
    // console.log(currentStatus, prevStatus);

    if (prevStatus != null) { // check if page is loaded by Ajax
      // Updating Google Analytics tracking
      ga('set', 'page', window.location.pathname);
      ga('send', 'pageview');
      
      // Update canonical meta tag (used for google +1 button)  
      $('link[rel="canonical"]').attr('href', window.location.href);
    }
  });

  Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus) {

    // animate.css
    // https://github.com/daneden/animate.css
    $('*[data-animate]').each(function() {
      $(this).toggleClass('animated ' + $(this).data('animate'));
    });
    // front grid hover animation
    $('.grid .item').hover(function() {
      var $hover = $('*[data-animate-hover]', this);
      $hover.toggleClass('animated ' + $hover.data('animate-hover'));
    });
  });
  
  Barba.Dispatcher.on('transitionCompleted', function(currentStatus, prevStatus) {
    // console.log(currentStatus);

    // https://github.com/alexanderdickson/waitForImages
    $('.grid').waitForImages(function() {
        // All descendant images have loaded, now slide up.
        $(this).css({'opacity': 1});
    });

    if (prevStatus != null) { // check if page is loaded by Ajax

      // Loading social sharing buttons  
      try { gapi.plusone.go(document.getElementById('main')); } catch(e) {}
      try { FB.XFBML.parse(document.getElementById('main')); } catch(e) {}
      try { twttr.widgets.load(document.getElementById("main")); } catch(e) {}
    
      // Loading a Disqus thread dynamically
      // https://css-tricks.com/lazy-loading-disqus-comments/
      $.disqusLoader( '#disqus_thread', { 
        scriptUrl: '//usefulparadigm.disqus.com/embed.js'
      });
    }

  });
  
  Barba.Pjax.start();

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

