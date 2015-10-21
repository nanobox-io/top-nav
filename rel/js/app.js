jadeTemplate = {};
jadeTemplate['nav'] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"top-nav\"><div class=\"logo\"><a href=\"//desktop.nanobox.io\"><img data-src=\"logo-horizontal\" class=\"shadow-icon\"/></a></div><div class=\"nav\"><a href=\"//docs.nanobox.io/\">Docs</a><a href=\"//desktop.nanobox.io/downloads\">Download</a><a onclick=\" $(&quot;.community-modal&quot;).toggleClass(&quot;hidden&quot;); \" class=\"open-community\">Community</a><a href=\"//engines.nanobox.io\">Engines</a><a href=\"//dashboard.nanobox.io/users/sign_in\" class=\"sign-up\">Login / Register</a></div><div class=\"mobile-trigger\"><div onclick=\" $(&quot;.top-nav&quot;).addClass(&quot;open&quot;); \" class=\"btn mobile-open\"><img data-src=\"mobile-open\" class=\"shadow-icon\"/></div><div onclick=\" $(&quot;.top-nav&quot;).removeClass(&quot;open&quot;); \" class=\"btn mobile-close\"><img data-src=\"mobile-close\" class=\"shadow-icon\"/></div></div><div class=\"community-modal hidden\"><div onclick=\" $(&quot;.community-modal&quot;).toggleClass(&quot;hidden&quot;); \" class=\"close\"><img data-src=\"close-btn\" class=\"shadow-icon\"/></div><a href=\"//github.com/nanobox-io?utf8=%E2%9C%93&amp;query=nanobox\" target=\"_BLANK\" class=\"source\"><div class=\"icon\"><img data-src=\"git-big\" scalable=\"true\" class=\"shadow-icon\"/></div><div class=\"txt\">Source Code</div></a><a href=\"//webchat.freenode.net/?channels=nanobox\" target=\"_BLANK\" class=\"irc\"><div class=\"icon\"><img data-src=\"irc-big\" scalable=\"true\" class=\"shadow-icon\"/></div><div class=\"txt\">IRC : #nanobox <span>(freenode)</span></div></a><a href=\"//trello.com/b/4nVFzmNZ/nanobox\" target=\"_BLANK\" class=\"trello\"><div class=\"icon\"><img data-src=\"trello\" scalable=\"true\" class=\"shadow-icon\"/></div><div class=\"txt\">Track Progress on Trello</div></a></div></div>");;return buf.join("");
};

var NanoTopNav, nbx;

NanoTopNav = (function() {
  function NanoTopNav($el) {
    var $node;
    $node = $(jadeTemplate['nav']({
      message: 'Hello from a jade template'
    }));
    $el.append($node);
  }

  return NanoTopNav;

})();

if (typeof nbx === "undefined" || nbx === null) {
  nbx = {};
}

nbx.NanoTopNav = NanoTopNav;

var shadowIcons, topnav;

topnav = new nbx.NanoTopNav($('.wrapper'));

shadowIcons = new pxicons.ShadowIcons();

shadowIconsInstance.svgReplaceWithString(pxSvgIconString, $('.wrapper'));
