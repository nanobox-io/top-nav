jadeTemplate = {};
jadeTemplate['nav'] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (context) {
buf.push("<div" + (jade.cls(['top-nav',"" + (context) + ""], [null,true])) + "><div class=\"logo\"><a href=\"//desktop.nanobox.io\"><img data-src=\"logo-horizontal\" class=\"shadow-icon\"/></a></div><div class=\"nav\"><div class=\"left\"><div class=\"main\"><a href=\"//desktop.nanobox.io\" class=\"active\">Desktop</a><a href=\"//nanobox.io/cloud\">Cloud</a></div><div class=\"secondary\"><a href=\"//nanobox.io/pricing\" class=\"cloud-only\">Pricing</a><a href=\"//nanobox.io/open-source\" class=\"cloud-only\">Open Source</a><a href=\"//engines.nanobox.io\" class=\"desktop-only\">Engines</a><a href=\"//desktop.nanobox.io/downloads\" class=\"desktop-only\">Download</a><a class=\"more\">More</a></div></div><div class=\"right\"><a href=\"//dashboard.nanobox.io/users/sign_in\" class=\"sign-up\">Login / Register</a></div></div><div id=\"submenu\" class=\"submenu\"><div class=\"categories\"><div class=\"category desktop\"><div class=\"title\">DESKTOP</div><div class=\"links\"><a href=\"//desktop.nanobox.io\">Overview</a><a href=\"//desktop.nanobox.io/downloads\">Download</a><a href=\"//engines.nanobox.io\">Engines</a><a href=\"//github.com/nanobox-io?utf8=%E2%9C%93&amp;query=nanobox\">Source Code</a><a href=\"//trello.com/b/4nVFzmNZ/nanobox\">Trello</a></div></div><div class=\"category cloud\"><div class=\"title\">CLOUD</div><div class=\"links\"><a href=\"//nanobox.io/\">Overview</a><a href=\"//nanobox.io/open-source\">Open Source</a></div></div><div class=\"category etc\"> <div class=\"title\">etc.</div><div class=\"links\"><a href=\"//blog.nanobox.io\">Blog</a><a href=\"//github.com/nanobox-io?utf8=%E2%9C%93&amp;query=nanobox\">Github</a><a href=\"//twitter.com/nanobox_io\">Twitter</a><a href=\"//webchat.freenode.net/?channels=nanobox\">#nanobox (IRC freenode)</a><a href=\"\" class=\"mail\"> </a></div></div></div><div class=\"footer\"><a href=\"#\">Sitemap</a><a href=\"#\">Legal</a></div></div><div class=\"mobile-trigger\"><div onclick=\" $(&quot;.top-nav&quot;).addClass(&quot;open&quot;); \" class=\"btn mobile-open\"><img data-src=\"mobile-open\" class=\"shadow-icon\"/></div><div onclick=\" $(&quot;.top-nav&quot;).removeClass(&quot;open&quot;); \" class=\"btn mobile-close\"><img data-src=\"mobile-close\" class=\"shadow-icon\"/></div></div></div>");}.call(this,"context" in locals_for_with?locals_for_with.context:typeof context!=="undefined"?context:undefined));;return buf.join("");
};

var NanoTopNav, nbx,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

NanoTopNav = (function() {
  function NanoTopNav($el, context) {
    var $node;
    if (context == null) {
      context = "cloud";
    }
    this.addPointerEvents = __bind(this.addPointerEvents, this);
    this.removePointerEvents = __bind(this.removePointerEvents, this);
    this.mouseout = __bind(this.mouseout, this);
    this.mouseover = __bind(this.mouseover, this);
    $node = $(jadeTemplate['nav']({
      context: context
    }));
    $el.prepend($node);
    this.$more = $(".more", $node);
    this.$submenu = $("#submenu", $node);
    this.removePointerEvents();
    this.$more.on('mouseover', this.mouseover);
    this.$submenu.on("mouseover", this.mouseover);
    this.$submenu.on("mouseleave", this.mouseout);
    this.addMailLink($("a.mail", $node));
  }

  NanoTopNav.prototype.mouseover = function(e) {
    this.$more.addClass("pseudo-hover");
    clearTimeout(this.timeout);
    this.isOver = true;
    this.$submenu.addClass("visible");
    return this.addPointerEvents();
  };

  NanoTopNav.prototype.mouseout = function(e) {
    this.$more.removeClass("pseudo-hover");
    this.isOver = false;
    this.$submenu.removeClass("visible");
    return this.timeout = setTimeout(this.removePointerEvents, 200);
  };

  NanoTopNav.prototype.removePointerEvents = function() {
    if (this.isHovering) {
      return;
    }
    return this.$submenu.addClass("no-display");
  };

  NanoTopNav.prototype.addPointerEvents = function() {
    return this.$submenu.removeClass("no-display");
  };

  NanoTopNav.prototype.addMailLink = function($el) {
    return $el.html('hello@nanobox.io').attr({
      href: 'mailto:hello@nanobox.io'
    });
  };

  return NanoTopNav;

})();

if (typeof nbx === "undefined" || nbx === null) {
  nbx = {};
}

nbx.NanoTopNav = NanoTopNav;
