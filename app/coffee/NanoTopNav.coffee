class NanoTopNav

  constructor: ($el, context="cloud") ->
    $node = $ jadeTemplate['nav']( {context:context} )
    $el.prepend( $node )

    $(".main a.#{context}", $node).addClass 'active'

    @$more    =  $(".more", $node)
    @$submenu = $("#submenu", $node)

    @removePointerEvents()
    @$more.on 'mouseover', @mouseover
    @$submenu.on "mouseover", @mouseover
    @$submenu.on "mouseleave", @mouseout

    @addMailLink $("a.mail", $node)

  mouseover : (e) =>
    @$more.addClass "pseudo-hover"
    clearTimeout @timeout
    @isOver = true
    @$submenu.addClass "visible"
    @addPointerEvents()

  mouseout : (e) =>
    @$more.removeClass "pseudo-hover"
    @isOver = false
    @$submenu.removeClass "visible"
    @timeout = setTimeout @removePointerEvents, 200

  removePointerEvents : () =>
    if @isHovering then return
    @$submenu.addClass "no-display"

  addPointerEvents : () =>
    @$submenu.removeClass "no-display"

  addMailLink : ($el) ->
    $el.html('hello@nanobox.io').attr href:'mailto:hello@nanobox.io'


if !nbx? then nbx = {}
nbx.NanoTopNav = NanoTopNav
