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
		$('a[href^="http://"],a[href^="https://"]').not('a[href*=".usefulparadigm.com"]').attr('target','_blank');

    // parallax scrolling of hero title
    // https://stackoverflow.com/a/26996468
    $(window).scroll(function() {
      var scrolledY = $(window).scrollTop();
      // sync with css' background-position value!!
      $('.fixed-bg').css('background-position', 'center top, center -' + ((scrolledY * 0.1) + 50) + 'px');
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
    $('*[data-animate]').each(function() {
      $(this).toggleClass('animated ' + $(this).data('animate'));
    });

    // Run animate only once in a session
    // if (!$.cookie('animated')) {
    //     $('*[data-animate].animate-once').each(function() {
    //         $(this).addClass('animated ' + $(this).data('animate'))
    //     });
    //     $.cookie('animated', true);
    // }

    // front grid hover animation
    $('.item').hover(function() {
      var $hover = $('*[data-animate-hover]', this);
      $hover.toggleClass('animated ' + $hover.data('animate-hover'));
    });

    // https://github.com/alexanderdickson/waitForImages
    $('.grid').waitForImages(function() {
        // All descendant images have loaded, now slide up.
        $(this).css({'opacity': 1});
    });
    
    // Lightweight and simple carousel with no dependencies
    // https://pawelgrzybek.github.io/siema/
    if ($('.siema').length > 0) {
      // $('.siema-wrap').waitForImages(function() {
      //   $(this).addClass('animated fadeIn');
      // });
      var mySiema = new Siema({
        perPage: {
          640: 2 // items for viewport wider than 800px
        },
        loop: true
      });
      $('.siema-prev').on('click', function() { mySiema.prev(); });
      $('.siema-next').on('click', function() { mySiema.next(); });
    }

    // Contact form modal
    
    var showModal = function(el) {
      $('body').addClass('modal-open');
      $(el).fadeIn('slow');
    }
    var hideModal = function(el) {
      $('body').removeClass('modal-open');
      $(el).fadeOut('slow');
    }

    var hashChange = function() {
      // console.log(location.hash);
      if (location.hash === "#contact") {
        showModal('#contactModal');
      } else {
        hideModal('#contactModal');
      }
    };
    
    $(window).on('hashchange', hashChange);
    hashChange();

    // let getForm return to home after thank-you
    $('#contactModal form').submit(function() {
      history.replaceState({}, '', '/');
      this.submit();
      return false;
    });

    // https://stackoverflow.com/questions/24046/the-safari-back-button-problem  
    $(window).bind("pageshow", function(event) {
      if (event.originalEvent.persisted) {
        // window.location.reload()
        hashChange();
      }
    });
    
    // toggle contact modal
    // $('.contact-button .btn, .contact-modal .close').on('click', function() {
    //   $('body').toggleClass('modal-open');
    //   // $('#contactModal').toggleClass('hide');
    //   $('#contactModal').fadeToggle('slow');
    //   return false;
    // });

	};

	init();
  
  // Rough Notation
  // https://roughnotation.com
  $('.rough-notation').each(function() {
    $('em', this).each(function() { RoughNotation.annotate(this, {type: 'underline', color: 'red'}).show(); });
    // $('strong', this).each(function() { RoughNotation.annotate(this, {type: 'highlight', color: 'yellow'}).show(); });
    $('strong', this).each(function() { RoughNotation.annotate(this, {type: 'box', color: 'orange'}).show(); });
  });
  
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

