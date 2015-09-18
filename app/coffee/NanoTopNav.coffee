class NanoTopNav

  constructor: ($el) ->
    $node = $ jadeTemplate['nav']( {message:'Hello from a jade template'} )
    $el.append( $node )

if !nbx? then nbx = {}
nbx.NanoTopNav = NanoTopNav
