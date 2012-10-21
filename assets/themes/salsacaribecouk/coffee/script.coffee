$ ->
  # resize main headline
  $('.site-tagline .h1').fitText 1.2
    minFontSize: '40px'
    maxFontSize: '70px'

  # sticky navigation
  $window = $(window)
  aboveHeight = $('.site-header').outerHeight(true)
  siteNav = $('.site-nav')
  menuBarheight = siteNav.outerHeight(true)
  navBar = siteNav.find('[role="navigation"]')
  links = navBar.find('a')
  homeLink = siteNav.find('.home')
  homeLinkText = homeLink.text()
  trigger = 480 # iphone lanscape
  showing = 'standard'
  timer = null

  # reverse li order when navigation is floated right
  navBar.children().each (i,li) ->
    navBar.prepend(li)

  # ensure menu is always visible on top when the page is scrolled
  $(window).scroll ->
    if $(window).scrollTop() > aboveHeight
      siteNav.addClass('fixed').css('top':'0').next().css('padding-top', menuBarheight + 'px')
      homeLink.text('Salsa Caribe Productions')
    else
      $('.site-nav').removeClass('fixed').next().css('padding-top','0')
      homeLink.text(homeLinkText)

  # disable .active link
  navBar.find('.active').click (event) ->
    event.preventDefault()

  # create the mobile nav element
  if navBar.length and links.length
    mobileNav = $('<select></select>')
    mobileNavOption = $('<option>-- Navigation --</option>').appendTo(mobileNav)
    links.each ->
      link = $(@)
      mobileNavOption.clone().attr('value', link.attr('href')).text(link.text()).appendTo(mobileNav)
    mobileNav = mobileNav.wrap('<div class="mobile-nav" />').parent().delegate('select','change', ->
      window.location = $(@).val()
    )

  toggleMobileNav = ->
    $width = $window.width()
    if showing is  'standard' and $width <= trigger
      navBar.replaceWith(mobileNav)
      showing = 'mobileNav'
    else if showing is 'mobileNav' and $width >= trigger
      mobileNav.replaceWith(navBar)
      showing = 'standard'


  toggleMobileNav()
  $window.resize ->
    clearTimeout timer if timer
    timer = setTimeout( toggleMobileNav, 100 )
