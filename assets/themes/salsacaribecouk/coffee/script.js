
if (typeof jQuery !== 'undefined' && parseFloat(jQuery.fn.jquery) >= 1.8) {
  $(function() {
    var $width, $window, aboveHeight, getWindowWidth, homeLink, homeLinkText, ipadLandscape, links, menuBarheight, mobilizeNav, navBar, resetNav, reseted, showing, siteNav, switchLi, timer, triggerMenu;
    $('.site-tagline .h1').fitText(1.2, {
      minFontSize: '40px',
      maxFontSize: '70px'
    });
    $window = $(window);
    aboveHeight = $('.site-header').outerHeight(true);
    siteNav = $('.site-nav');
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
      if ($width > ipadLandscape && reseted === false) {
        switchLi();
        return reseted = true;
      } else if ($width <= ipadLandscape && reseted === true) {
        switchLi();
        return reseted = false;
      }
    };
    $('.site-header .contact').append('<div id="menu-icon">Menu</div>');
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
      if ($(window).scrollTop() > aboveHeight) {
        return siteNav.addClass('fixed').css({
          'top': '0'
        }).next().css('padding-top', menuBarheight + 'px');
      } else {
        return $('.site-nav').removeClass('fixed').next().css('padding-top', '0');
      }
    });
    navBar.find('.active').click(function(event) {
      return event.preventDefault();
    });
    mobilizeNav();
    resetNav();
    return $window.resize(function() {
      mobilizeNav();
      return resetNav();
    });
  });
}
