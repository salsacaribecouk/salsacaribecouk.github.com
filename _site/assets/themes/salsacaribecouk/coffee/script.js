
if (typeof jQuery !== 'undefined' && parseFloat(jQuery.fn.jquery) >= 1.8) {
  $(function() {
    var $backButton, $h1, $map, $screenWidth, $sw, $width, $window, aboveHeight, buildEmbed, buildMap, buildStatic, embedMap, getWindowWidth, homeLink, homeLinkText, ipadLandscape, links, menuBarheight, mobilizeNav, navBar, resetNav, reseted, showing, siteNav, staticMap, switchLi, timer, triggerMenu, trim, words;
    $window = $(window);
    $sw = document.body.clientWidth;
    $screenWidth = screen.width;
    siteNav = $('.site-nav');
    aboveHeight = $('.site-header').outerHeight(true) - siteNav.outerHeight(true);
    menuBarheight = siteNav.outerHeight(true);
    navBar = siteNav.find('[role="navigation"]');
    links = navBar.find('a');
    homeLink = siteNav.find('.home');
    homeLinkText = homeLink.text();
    ipadLandscape = 768;
    triggerMenu = 590;
    showing = 'standard';
    timer = null;
    reseted = false;
    $width = 0;
    $map = $('.google-map');
    staticMap = 'http://maps.google.com/maps/api/staticmap?center=51.537474,-0.112953&zoom=13&markers=51.527234,-0.129160|51.545756,-0.103161&size=640x360&sensor=true&key=AIzaSyBgvmh48DRovU0FfSThuiRVQ7WzcjhP5m8';
    embedMap = "<iframe width='500' height='300' frameBorder='0' src='http://a.tiles.mapbox.com/v3/bishbashbosh.map-hs0p13ed.html#14/51.537/-0.113'></iframe>";
    $h1 = $('.site-tagline h1');
    trim = $h1.text().replace(/^\s+|\s+$/g, "");
    $h1.html(trim);
    $h1.lettering('words').children('span').lettering();
    words = $h1.children();
    words.each(function() {
      var letters, rand;
      letters = $(this).children().length;
      rand = Math.floor(Math.random() * letters);
      return $(this).children("span:eq(" + rand + ")").addClass('faded');
    });
    $h1.fitText(1.2, {
      minFontSize: '32px',
      maxFontSize: '70px'
    });
    getWindowWidth = function() {
      return $width = $window.width();
    };
    switchLi = function() {
      return navBar.children().each(function(i, li) {
        return navBar.prepend(li);
      });
    };
    resetNav = function() {
      getWindowWidth();
      if ($width >= ipadLandscape && reseted === false) {
        switchLi();
        return reseted = true;
      } else if ($width < ipadLandscape && reseted === true) {
        switchLi();
        return reseted = false;
      }
    };
    $('.site-branding .contact').append('<div id="menu-icon">Menu</div>');
    $('#menu-icon').click(function() {
      navBar.slideToggle();
      return $(this).toggleClass('active');
    });
    mobilizeNav = function() {
      getWindowWidth();
      if ($width > triggerMenu) {
        return navBar.css('display', 'block');
      } else if ($width <= triggerMenu) {
        return navBar.css('display', 'none');
      }
    };
    $(window).scroll(function() {
      if ($(window).scrollTop() >= aboveHeight) {
        return siteNav.addClass('site-nav-advanced').css({
          'top': '0'
        }).next().css('padding-top', menuBarheight + 'px');
      } else {
        return $('.site-nav').removeClass('site-nav-advanced').next().css('padding-top', '0');
      }
    });
    navBar.find('.active').click(function(event) {
      return event.preventDefault();
    });
    $backButton = $('.history-back');
    $backButton.click(function(event) {
      event.preventDefault();
      return history.back(1);
    });
    $('noscript[data-large][data-small]').each(function() {
      var src;
      src = $screenWidth >= 500 ? $(this).data('large') : $(this).data('small');
      return $("<img src='" + src + "' alt='" + ($(this).data('alt')) + "' />").insertAfter($(this));
    });
    buildMap = function() {
      console.log('run');
      if ($sw > triggerMenu) {
        console.log('wide');
        if ($('.map-container').length < 1) return buildEmbed();
      } else {
        console.log('small');
        if ($('.static-map').length < 1) return buildStatic();
      }
    };
    buildEmbed = function() {
      return $('<div class="map-container embed-media-block"/>').html(embedMap).prependTo($map);
    };
    buildStatic = function() {
      var $img, mapLink;
      mapLink = $('.map-link').attr('href');
      $img = $('<img class="static-map"/>').attr('src', staticMap);
      return $('<a/>').attr('href', mapLink).html($img).prependTo($map);
    };
    mobilizeNav();
    resetNav();
    buildMap();
    return $window.resize(function() {
      mobilizeNav();
      resetNav();
      $sw = document.body.clientWidth;
      buildMap();
      return google.maps.event.trigger(map, "resize");
    });
  });
}
