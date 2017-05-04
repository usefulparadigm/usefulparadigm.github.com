// application.js

/*
	disqusLoader.js v1.0
	A JavaScript plugin for lazy-loading Disqus comments widget.
	-
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

;( function( $, window, document, undefined )
{
	'use strict';

	var $win			= $( window ),
		throttle		= function(a,b){var c,d;return function(){var e=this,f=arguments,g=+new Date;c&&g<c+a?(clearTimeout(d),d=setTimeout(function(){c=g,b.apply(e,f)},a)):(c=g,b.apply(e,f))}},

		throttleTO		= false,
		laziness		= false,
		disqusConfig	= false,
		scriptUrl		= false,

		scriptStatus	= 'unloaded',
		$instance		= $(),

		init = function()
		{
			if( !$instance.length || $instance.data( 'disqusLoaderStatus' ) == 'loaded' )
				return true;

			var winST = $win.scrollTop();

			// if the element is too far below || too far above
			if( $instance.offset().top - winST > $win.height() * laziness || winST - $instance.offset().top - $instance.outerHeight() - ( $win.height() * laziness ) > 0 )
				return true;

			$( '#disqus_thread' ).removeAttr( 'id' );
			$instance.attr( 'id', 'disqus_thread' ).data( 'disqusLoaderStatus', 'loaded' );

			if( scriptStatus == 'loaded' )
			{
				DISQUS.reset({ reload: true, config: disqusConfig });
			}
			else // unloaded | loading
			{
				window.disqus_config = disqusConfig;
				if( scriptStatus == 'unloaded' )
				{
					scriptStatus = 'loading';
					$.ajax(
					{
						url:		scriptUrl,
						async:		true,
						cache:		true,
						dataType:	'script',
						success:	function()
						{
							scriptStatus = 'loaded';
						}
					});
				}
			}
		};

	$win.on( 'scroll resize', throttle( throttleTO, init ));

	$.disqusLoader = function( element, options )
	{
		options = $.extend({},
		{
			laziness:		1,
			throttle:		250,
			scriptUrl:		false,
			disqusConfig:	false,

		}, options );

		laziness		= options.laziness + 1;
		throttleTO		= options.throttle;
		disqusConfig	= options.disqusConfig;
		scriptUrl		= scriptUrl === false ? options.scriptUrl : scriptUrl; // set it only once
		$instance		= ( typeof element == 'string' ? $( element ) : element ).eq( 0 );

		$instance.data( 'disqusLoaderStatus', 'unloaded' );

		init();
	};

})( jQuery, window, document );

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
		$('a[href^="http://"]').not('a[href*=usefulparadigm]').attr('target','_blank');
		
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

  var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */

      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */

      return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },

    fadeIn: function() {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      document.body.scrollTop = 0;

      $el.css({
        visibility : 'visible',
        opacity : 0
      });

      $el.animate({ opacity: 1 }, 400, function() {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */
        
        _this.done();
      });
    }
  });

  Barba.Pjax.getTransition = function() {
    return FadeTransition;
  };
  
  Barba.Dispatcher.on('initStateChange', function(currentStatus) {
    // console.log(currentStatus);
    
    // Updating Google Analytics tracking
    ga('set', 'page', window.location.pathname);
    ga('send', 'pageview');
  });
  
  Barba.Dispatcher.on('transitionCompleted', function(currentStatus) {
    // console.log(currentStatus);
    
    // Loading social sharing buttons  
    try { gapi.plusone.go(document.getElementById('main')); } catch(e) {}
    try { FB.XFBML.parse(document.getElementById('main')); } catch(e) {}
    try { twttr.widgets.load(document.getElementById("main")); } catch(e) {}
    
    // Loading a Disqus thread dynamically
    // https://css-tricks.com/lazy-loading-disqus-comments/
    $.disqusLoader( '#disqus_thread', { 
      scriptUrl: '//usefulparadigm.disqus.com/embed.js'
    });

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

