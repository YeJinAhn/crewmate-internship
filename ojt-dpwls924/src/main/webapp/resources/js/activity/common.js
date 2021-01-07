! function(b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b : b(jQuery)
}(function(n) {
    function l(a) {
        var i = a || window.event,
            w = v.call(arguments, 1),
            k = 0,
            z = 0,
            A = 0,
            x = 0,
            y = 0,
            e = 0;
        if (a = n.event.fix(i), a.type = "mousewheel", "detail" in i && (A = -1 * i.detail), "wheelDelta" in i && (A = i.wheelDelta), "wheelDeltaY" in i && (A = i.wheelDeltaY), "wheelDeltaX" in i && (z = -1 * i.wheelDeltaX), "axis" in i && i.axis === i.HORIZONTAL_AXIS && (z = -1 * A, A = 0), k = 0 === A ? z : A, "deltaY" in i && (A = -1 * i.deltaY, k = A), "deltaX" in i && (z = i.deltaX, 0 === A && (k = -1 * z)), 0 !== A || 0 !== z) {
            if (1 === i.deltaMode) {
                var f = n.data(this, "mousewheel-line-height");
                k *= f, A *= f, z *= f
            } else {
                if (2 === i.deltaMode) {
                    var c = n.data(this, "mousewheel-page-height");
                    k *= c, A *= c, z *= c
                }
            }
            if (x = Math.max(Math.abs(A), Math.abs(z)), (!o || o > x) && (o = x, q(i, x) && (o /= 40)), q(i, x) && (k /= 40, z /= 40, A /= 40), k = Math[k >= 1 ? "floor" : "ceil"](k / o), z = Math[z >= 1 ? "floor" : "ceil"](z / o), A = Math[A >= 1 ? "floor" : "ceil"](A / o), t.settings.normalizeOffset && this.getBoundingClientRect) {
                var d = this.getBoundingClientRect();
                y = a.clientX - d.left, e = a.clientY - d.top
            }
            return a.deltaX = z, a.deltaY = A, a.deltaFactor = o, a.offsetX = y, a.offsetY = e, a.deltaMode = 0, w.unshift(a, k, z, A), r && clearTimeout(r), r = setTimeout(m, 200), (n.event.dispatch || n.event.handle).apply(this, w)
        }
    }

    function m() {
        o = null
    }

    function q(d, c) {
        return t.settings.adjustOldDeltas && "mousewheel" === d.type && c % 120 === 0
    }
    var r, o, p = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        u = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        v = Array.prototype.slice;
    if (n.event.fixHooks) {
        for (var s = p.length; s;) {
            n.event.fixHooks[p[--s]] = n.event.mouseHooks
        }
    }
    var t = n.event.special.mousewheel = {
        version: "3.1.11",
        setup: function() {
            if (this.addEventListener) {
                for (var a = u.length; a;) {
                    this.addEventListener(u[--a], l, !1)
                }
            } else {
                this.onmousewheel = l
            }
            n.data(this, "mousewheel-line-height", t.getLineHeight(this)), n.data(this, "mousewheel-page-height", t.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var a = u.length; a;) {
                    this.removeEventListener(u[--a], l, !1)
                }
            } else {
                this.onmousewheel = null
            }
            n.removeData(this, "mousewheel-line-height"), n.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(d) {
            var a = n(d)["offsetParent" in n.fn ? "offsetParent" : "parent"]();
            return a.length || (a = n("body")), parseInt(a.css("fontSize"), 10)
        },
        getPageHeight: function(a) {
            return n(a).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    n.fn.extend({
        mousewheel: function(b) {
            return b ? this.bind("mousewheel", b) : this.trigger("mousewheel")
        },
        unmousewheel: function(b) {
            return this.unbind("mousewheel", b)
        }
    })
});
(function(a) {
    a.browserTest = function(d, f) {
        var e = "unknown",
            g = "X",
            h = function(k, c) {
                for (var j = 0; j < c.length; j = j + 1) {
                    k = k.replace(c[j][0], c[j][1])
                }
                return k
            },
            b = function(l, m, j, k) {
                var n = {
                    name: h((m.exec(l) || [e, e])[1], j)
                };
                n[n.name] = true;
                n.version = (k.exec(l) || [g, g, g, g])[3];
                if (n.name.match(/safari/) && n.version > 400) {
                    n.version = "2.0"
                }
                if (n.name === "presto") {
                    n.version = (a.browser.version > 9.27) ? "futhark" : "linear_b"
                }
                n.versionNumber = parseFloat(n.version, 10) || 0;
                n.versionX = (n.version !== g) ? (n.version + "").substr(0, 1) : g;
                n.className = n.name + n.versionX;
                return n
            };
        d = (d.match(/Opera|Navigator|Minefield|KHTML|Chrome/) ? h(d, [
            [/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ""],
            ["Chrome Safari", "Chrome"],
            ["KHTML", "Konqueror"],
            ["Minefield", "Firefox"],
            ["Navigator", "Netscape"]
        ]) : d).toLowerCase();
        a.browser = a.extend((!f) ? a.browser : {}, b(d, /(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/, [], /(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));
        a.layout = b(d, /(gecko|konqueror|msie|opera|webkit)/, [
            ["konqueror", "khtml"],
            ["msie", "trident"],
            ["opera", "presto"]
        ], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);
        a.os = {
            name: (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [e])[0].replace("sunos", "solaris")
        };
        if (!f) {
            a("html").addClass([a.os.name, a.browser.name, a.browser.className, a.layout.name, a.layout.className].join(" "))
        }
    };
    a.browserTest(navigator.userAgent)
})(jQuery);
(function(a) {
    a(function() {
        var c = navigator.userAgent.toLowerCase();
        if (c.match(/iphone/) != null || c.match(/ipod/) || c.match(/ipad/) != null) {
            cssAnimateUse = false
        } else {
            cssAnimateUse = true
        }
        var b = (function() {
            var i = a("#navPrimary"),
                // j = a("#header:not(.main) #navPrimary>ul"),
                j = a("#navPrimary>ul"),
                m = j.find(">li>ul"),
                h = j.find(">li"),
                l = j.find(">li>a"),
                k = j.find(">li>ul>li>a");
            nav_timer = null;
            open_els = a("#navPrimary>h2"), close_els = i.find(".btn-close");
            on_width = 681;
            var g;
            return {
                init: function() {
                    var n = this;
                    open_els.on("click", a.proxy(this.show, this));
                    j.find("li.on").addClass("active");
                    var n = this;
                    l.on("focus mouseover", function(o) {
                        if (a(window).width() > on_width) {
                            o.preventDefault();
                            var p = a(this);
                            h.removeClass("on");
                            l.each(function(q) {
                                if (l.index(p) == q) {
                                    p.parent("li").addClass("on");
                                    if (a(this).next("ul").length) {
                                        //p.next("ul").show().css({ //GNB sub hidden ó�� 15.06.10
                                        //    left: n.positionReset(p)["left"],
                                        //    marginLeft: n.positionReset(p)["marginLeft"]
                                        //})
                                    }
                                } else {
                                    a(this).parent("li").removeClass("on");
                                    a(this).next("ul").hide()
                                }
                            })
                        }
                    });
                    l.bind("focus", function(o) {
                        if (a(window).width() > on_width) {
                            clearTimeout(nav_timer)
                        }
                    });
                    k.bind("focus", function(o) {
                        if (a(window).width() > on_width) {
                            clearTimeout(nav_timer)
                        }
                    });
                    l.bind("blur", function(o) {
                        if (a(window).width() > on_width) {
                            nav_timer = setTimeout(n.hideNavi, 500)
                        }
                    });
                    k.bind("blur", function(o) {
                        if (a(window).width() > on_width) {
                            nav_timer = setTimeout(n.hideNavi, 500)
                        }
                    });
                    a(window).resize(function() {
                        if (a(window).width() > on_width) {
                            i.removeClass("open")
                        }
                        b.activeNavi()
                    });
                    a(document).on("mouseover.primaryNavi", function(o) {
                        if (a(window).width() > on_width) {
                            if (!a(o.target).closest(j).length) {
                                n.hideNavi()
                            }
                        }
                    });
                    this.activeNavi()
                },
                show: function(o) {
                    o.preventDefault();
                    var n = this;
                    this.showAction()
                },
                showAction: function() {
                    if (i.hasClass("open")) {
                        i.removeClass("open")
                    } else {
                        i.addClass("open")
                    }
                    if (a("#sectionUtil").hasClass("util-on")) {
                        a("#sectionUtil").removeClass("util-on")
                    }
                    if (a("#sectionUtil").hasClass("search-on")) {
                        a("#sectionUtil").removeClass("search-on")
                    }
                },
                hideNavi: function() {
                    h.removeClass("on");
                    m.hide();
                    b.activeNavi()
                },
                activeNavi: function() {
                    var n = j.find(">li.active");
                    // var o = n.find("ul"); //GNB sub hidden ó�� 15.06.10
                    g = j.find(">li.active>a").eq(0);
                    n.addClass("on");
                    //if (o.length > 0) { //GNB sub hidden ó�� 15.06.10
                    //    o.show().css({
                    //        left: this.positionReset(g)["left"],
                    //        marginLeft: this.positionReset(g)["marginLeft"]
                    //    })
                    //}
                },
                positionReset: function(p) {
                    var o = new Array();
                    o.left = p.position().left - parseInt((p.next("ul").find("li:first-child>a:first-child").css("paddingLeft")).replace("px", ""));
                    o.marginLeft = 0;
                    var n = 0;
                    p.next("ul").find(">li").each(function() {
                        n += a(this).outerWidth()
                    });
                    if (o.left + n > j.width()) {
                        o.marginLeft = (-1) * ((o.left + n) - j.width())
                    }
                    return o
                }
            }
        }());
        var d = (function() {
            var g = a("#navSnb"),
                i = a("#navSnb>ul"),
                m = i.find(">li>ul"),
                k = i.find(">li>a"),
                j = a("#navSnb>h2"),
                l = g.find(".btn-close"),
                h = 768;
            return {
                init: function() {
                    var n = this;
                    j.on("click", a.proxy(this.show, this));
                    k.on("click", function(p) {
                        if (a(window).width() > h) {
                            var o = a(this).next("ul");
                            if (!a(this).parent().hasClass("on") && o.length > 0) {} else {}
                        }
                    });
                    a(window).resize(function() {
                        if (a(window).width() > h) {
                            g.removeClass("open")
                        }
                    })
                },
                show: function(o) {
                    o.preventDefault();
                    var n = this;
                    this.showAction()
                },
                showAction: function() {
                    if (g.hasClass("open")) {
                        g.removeClass("open")
                    } else {
                        g.addClass("open")
                    }
                }
            }
        }());
        var e = (function() {
            var g = a("#sectionUtil"),
                i = a("#sectionUtil>ul.nav-util"),
                h = a("#sectionUtil>h2.tit1 a");
            return {
                init: function() {
                    var j = this;
                    h.on("click", a.proxy(this.show, this))
                },
                show: function(k) {
                    k.preventDefault();
                    var j = this;
                    this.showAction()
                },
                showAction: function() {
                    if (g.hasClass("util-on")) {
                        g.removeClass("util-on")
                    } else {
                        g.addClass("util-on")
                    }
                    if (a("#navPrimary").hasClass("open")) {
                        a("#navPrimary").removeClass("open")
                    }
                    if (a("#sectionUtil").hasClass("search-on")) {
                        a("#sectionUtil").removeClass("search-on")
                    }
                }
            }
        }());
        var f = (function() {
            var g = a("#sectionUtil"),
                i = a("#sectionUtil>.form-search"),
                h = a("#sectionUtil>h2.tit2 a");
            return {
                init: function() {
                    var j = this;
                    h.on("click", a.proxy(this.show, this))
                },
                show: function(k) {
                    k.preventDefault();
                    var j = this;
                    this.showAction()
                },
                showAction: function() {
                    if (g.hasClass("search-on")) {
                        g.removeClass("search-on")
                    } else {
                        g.addClass("search-on")
                    }
                    if (a("#navPrimary").hasClass("open")) {
                        a("#navPrimary").removeClass("open")
                    }
                    if (a("#sectionUtil").hasClass("util-on")) {
                        a("#sectionUtil").removeClass("util-on")
                    }
                }
            }
        }());
        b.init();
        d.init();
        e.init();
        f.init();
        a(".tab-scroll").scrollContents();
        a(".list-scroll").scrollContents();
        a(".tab-type1>li>a").tabMenu();
        pageRoadDesign();
        a(document).on("click.nepa", ".wrap-tab .heading", function() {
            a(this).parents(".wrap-tab").find(">section").removeClass("on");
            a(this).parent("section").addClass("on")
        });
        a(".visual-img2:not(.visual-thum)").flexslider({
            animation: "slide",
            directionNav: false,
            slideshow: false,
            animationLoop: false
        });
        a(".visual-img2.visual-thum").flexslider({
            animation: "fade",
            directionNav: false,
            slideshow: false,
            start: function() {
                var h = a(this.selector + ":not(.clone)");
                var g = a(".flex-control-paging>li>a");
                h.each(function(i) {
                    g.eq(i).css({
                        background: "url(" + a(this).find("img").attr("src") + ") no-repeat 0 0"
                    })
                })
            }
        })
    })
})(jQuery);

function setCookie(b, c, a) {
    var e = new Date();
    e.setTime(e.getTime() + (a * 24 * 60 * 60 * 1000));
    var f = "expires=" + e.toGMTString();
    document.cookie = b + "=" + c + "; " + f
}

function getCookie(b) {
    var d = b + "=";
    var a = document.cookie.split(";");
    for (var e = 0; e < a.length; e++) {
        var f = a[e].trim();
        if (f.indexOf(d) == 0) {
            return f.substring(d.length, f.length)
        }
    }
    return ""
}
var ajaxCall = function(c, a, b, d) {
    $.ajax({
        url: c,
        success: function(e) {
            $(a).empty();
            if (b) {
                e = e
            } else {
                e = dataProcessing(unescape(e))
            }
            $(e).appendTo(a);
            if (typeof d === "function") {
                d()
            }
        },
        error: function(f, h, e, g) {
            alert(g)
        }
    })
};

function pageRoadDesign() {
    $("input:checked").prev().addClass("on");
    uiCheckCtrl();
    uiFileCtrl();
    textPlaceHolder()
}

function uiCheckCtrl() {
    $(document).on("click.nepa", "input.radio, input.check", function() {
        var a = $(this);
        if (a.is(".check")) {
            a.prev().toggleClass("on")
        } else {
            if (a.is(".radio")) {
                $('input[name="' + a.attr("name") + '"]').each(function() {
                    if (this == a[0]) {
                        $(this).prev().addClass("on")
                    } else {
                        $(this).prev().removeClass("on")
                    }
                })
            }
        }
    }).on("focus", "input.radio, input.check", function() {
        $(this).prev().addClass("focus")
    }).on("blur", "input.radio, input.check", function() {
        $(this).prev().removeClass("focus")
    });
    $that = null
}

function textPlaceHolder() {
    $(document).on("focus.nepa", "input.placeholder, textarea.placeholder", function() {
        $(this).addClass("valueon")
    }).on("blur.nepa", "input.placeholder, textarea.placeholder", function() {
        if ($(this).val() == "") {
            $(this).removeClass("valueon")
        }
    })
}

function uiFileCtrl() {
    $(".file").each(function() {
        if ($.browser.name == "firefox") {
            $('label[for="' + $(this).attr("id") + '"]').unbind("click.nepa").bind("click.nepa", function() {
                $("#" + $(this).attr("for")).trigger("click")
            })
        }
    });
    $(".file").unbind("change.nepa").bind("change.nepa", function() {
        if ($(this).val()) {
            $('label[for="' + $(this).attr("id") + '"]').addClass("on")
        } else {
            $('label[for="' + $(this).attr("id") + '"]').removeClass("on")
        }
        $(this).next(".file-name").text($(this).val())
    })
}

function modalClose() {
    var a = $('a[href="#' + $(".wrap-layer-on").attr("id") + '"]').eq(0);
    $(".wrap-layer-on").remove();
    $(".modal-overlay").fadeOut();
    $("body").unbind("touchmove.Modal");
    a.focus()
}(function(a) {
    a.fn.modalCon = function(b) {
        return this.each(function(j) {
            b = b || {};
            var c = a.extend({}, a.fn.modalCon.defaults, b || {});
            var g = this;
            var i = a(this);
            var f;
            var h;
            var k;
            var d = null;
            i.on("click", function(l) {
                l.preventDefault();
                e()
            });
            var e = function() {
                modalClose();
                if (c.callbackBefore) {
                    if (typeof c.callbackBefore === "function") {
                        var n = false;
                        if (c.url) {
                            n = c.callbackBefore.call(i)
                        } else {
                            c.data = c.callbackBefore.call(i);
                            if (c.data) {
                                n = true
                            }
                        }
                        if (!n) {
                            return
                        }
                    }
                }
                k = i.attr("href").split("#")[1];
                f = a("<div>").addClass(c.onClass).appendTo("body");
                f.attr("id", k);
                if (c.url) {
                    ajaxCall(c.url, f, c.sCheck, function() {
                        l()
                    })
                }
                if (c.data) {
                    f.html(c.data);
                    l()
                }

                function l() {
                    h = f.find(c.layerWrap);
                    $contCon_id = k + "modalContentWrap";
                    h.find(c.layerContent).attr("id", $contCon_id);
                    if (c.modal) {
                        if (c.modalEffect) {
                            f.before(a("<div>").addClass(c.modalClass).css("opacity", 0).animate({
                                opacity: 0.3
                            }))
                        } else {
                            f.before(a("<div>").addClass(c.modalClass))
                        }
                        a("." + c.modalClass).css({
                            width: a(window).width(),
                            height: a(window).height()
                        })
                    }
                    m();
                    if (a.browser.className != "msie7" && a.browser.className != "msie8") {
                        d = new iScroll($contCon_id, {
                            scrollbars: true,
                            bounce: false,
                            onBeforeScrollStart: function(p) {
                                if ((a(p.target).tagName == "SELECT" || a(p.target).tagName == "INPUT" || a(p.target).tagName != "TEXTAREA") && (p.type == "mousedown" || p.type == "click")) {
                                    a(p.target).focus()
                                }
                            }
                        })
                    }
                    a(window).resize(function() {
                        if (a.browser.className != "msie7" && a.browser.className != "msie8") {
                            d.refresh()
                        }
                        m()
                    });
                    if (c.imgRoad) {
                        h.find(c.layerContent).find("img").load(function() {
                            m()
                        })
                    }
                    f.find(".btn-close").eq(0).focus();
                    if (typeof c.callbackLoad === "function") {
                        c.callbackLoad.call(i)
                    }
                    f.find(c.close_trigger).bind("click", function() {
                        o();
                        i.focus();
                        return false
                    })
                }

                function m() {
                    var u = a(window).width();
                    var p = a(window).height();
                    var v = h.outerWidth();
                    var q = h.outerHeight();
                    var w = Math.floor(q / 2) * (-1) + "px";
                    var t = Math.floor(v / 2) * (-1) + "px";
                    var r = "50%";
                    var s = a(window).scrollTop() + ((p - q) / 2);
                    if (!c.appendNext) {
                        if (p <= q) {
                            s = 0
                        }
                        var t = (-1) * (v / 2);
                        if (c.positionTop) {
                            s = c.positionTop + a(window).scrollTop()
                        }
                        if (a(window).width() > 680) {
                            h.css({
                                left: r,
                                top: s,
                                marginLeft: t + "px"
                            })
                        } else {
                            h.prop("style", "");
                            a("body").bind("touchmove.Modal", function(x) {
                                x.preventDefault()
                            })
                        }
                    }
                }

                function o() {
                    if (d) {
                        d.destroy();
                        d = null
                    }
                    f.remove();
                    a("." + c.modalClass).fadeOut(function() {
                        a(this).remove()
                    });
                    if (typeof c.callbackAfter === "function") {
                        c.callbackAfter.call(i)
                    }
                    a("body").unbind("touchmove.Modal")
                }
            }
        })
    };
    a.fn.modalCon.defaults = {
        modal: true,
        modalClass: "modal-overlay",
        modalEffect: true,
        onClass: "wrap-layer-on",
        layerWrap: ".layer-type1",
        layerContent: ".layer-content",
        close_trigger: ".btn-close",
        url: false,
        data: false,
        sCheck: false,
        positionTop: false,
        imgRoad: false,
        callbackBefore: null,
        callbackLoad: null,
        callbackAfter: null
    }
})(jQuery);

function dataProcessing(a) {
    a = a.replace(/<script.*>.*<\/script>/ig, "");
    a = a.replace(/<\/?meta.*>/ig, "");
    a = a.replace(/<\/?link.*>/ig, "");
    a = a.replace(/<\/?html.*>/ig, "");
    a = a.replace(/<\/?body.*>/ig, "");
    a = a.replace(/<\/?head.*>/ig, "");
    a = a.replace(/<\/?!doctype.*>/ig, "");
    a = a.replace(/<title.*>.*<\/title>/ig, "");
    return a
}
var ajaxCall = function(c, a, b, d) {
    $.ajax({
        url: c,
        success: function(e) {
            $(a).empty();
            if (b) {
                e = e
            } else {
                e = dataProcessing(unescape(e))
            }
            $(e).appendTo(a);
            if (typeof d === "function") {
                d()
            }
        },
        error: function(f, h, e, g) {
            alert(g)
        }
    })
};
(function(a) {
    var c = {
        init: function(e) {
            var d = a.extend({}, a.fn.scrollContents.defaults, e);
            return this.each(function() {
                a.extend(this, b);
                var g = this;
                var f = a(this).find(".view");
                var h = a(this).find(".view .scroll");
                var k = a(this).find(".btn-prev");
                var i = a(this).find(".btn-next");
                var j;
                this.resizeScroll(a(this), h);
                if (a.browser.className != "msie7" && a.browser.className != "msie8") {
                    j = new iScroll(f.attr("id"), {
                        snap: true,
                        momentum: false,
                        vScrollbar: false
                    });
                    j.scrollToElement("li.on", 100);
                    a(window).resize(function() {
                        g.resizeScroll(a(this), h);
                        j.scrollToElement("li.on", 100)
                    });
                    k.bind("click", function(l) {
                        l.preventDefault();
                        j.scrollToPage("prev")
                    });
                    i.bind("click", function(l) {
                        l.preventDefault();
                        j.scrollToPage("next")
                    })
                }
            })
        }
    };
    var b = {
        resizeScroll: function(e, f) {
            var d = 0;
            f.find(">li").each(function() {
                d += a(this).outerWidth(true)
            });
            f.css({
                width: d + 4
            });
            if (f.outerWidth() > e.outerWidth()) {
                e.addClass("on")
            } else {
                e.removeClass("on")
            }
        }
    };
    a.fn.scrollContents = function(d) {
        if (c[d]) {
            return c[d].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof d === "object" || !d) {
                return c.init.apply(this, arguments)
            } else {
                a.error("Method " + d + " does not exist on jQuery")
            }
        }
    };
    a.fn.scrollContents.defaults = {}
})(jQuery);
(function(a) {
    var c = {
        init: function(e) {
            var d = a.extend({}, a.fn.toggleContents.defaults, e);
            return this.each(function() {
                a.extend(this, b);
                var f = this;
                f.ev_els = a(d.event_element, f);
                f.this_class = d.this_class;
                f.vi_container = d.view_container;
                f.btn_hd_txt = d.btn_hd_txt;
                f.change_txt = d.change_txt;
                f.data = d.data;
                f.auto_scroll = d.auto_scroll;
                f.callbackBefore = d.callbackBefore;
                f.callbackAfter = d.callbackAfter;
                if (typeof d.animation === "object") {
                    f.effect = d.animation.effect;
                    f.easing = d.animation.easing;
                    f.duration = d.animation.duration
                }
                if (f.vi_container == null) {
                    if (a(f).hasClass(f.this_class)) {
                        this.appendTxt("open")
                    } else {
                        this.appendTxt("close")
                    }
                } else {
                    if (f.isHide(f.vi_container)) {
                        a(this.vi_container, this).hide();
                        a(this).removeClass(this.this_class);
                        this.appendTxt("close")
                    } else {
                        if (f.isNodes(f.vi_container) === true) {
                            a(this.vi_container, this).hide();
                            a(this).removeClass(this.this_class);
                            this.appendTxt("close")
                        } else {
                            a(this.vi_container, this).show();
                            a(this).addClass(this.this_class);
                            this.appendTxt("open")
                        }
                    }
                }
                a(f.ev_els).off("click.toggleContent").on("click.toggleContent", function(g) {
                    g.preventDefault();
                    if (f.vi_container == null) {
                        if (a(f).hasClass(f.this_class)) {
                            f.close()
                        } else {
                            f.open()
                        }
                    } else {
                        if (f.isHide(f.vi_container)) {
                            if (d.default_display) {
                                a(document).find(d.view_container).hide()
                            }
                            f.open()
                        } else {
                            f.close()
                        }
                    }
                })
            })
        },
        setData: function(d, e) {
            return this.each(function() {
                this.data = d;
                this.add();
                this.isCallback(e)
            })
        },
        setCallbackBefore: function(d) {
            return this.each(function() {
                this.callbackBefore = d
            })
        },
        setCallbackAfter: function(d) {
            return this.each(function() {
                this.callbackAfter = d
            })
        },
        destroy: function() {
            var d = a(this).parent();
            var e = a(this).clone();
            a(this).remove();
            a(d).append(e)
        }
    };
    var b = {
        open: function() {
            var d = this;
            var e = a(this);
            a(this.vi_container, this).stop().show(this.effect, {
                easing: this.easing,
                duration: this.duration,
                complete: function() {
                    if (d.auto_scroll) {
                        a("body, html").animate({
                            scrollTop: d.ev_els.offset().top
                        })
                    }
                    d.isCallback(d.callbackBefore)
                }
            });
            setTimeout(function() {
                e.addClass(d.this_class);
                d.appendTxt("open")
            }, 0)
        },
        close: function() {
            var d = this;
            a(this.vi_container, this).stop().hide(this.effect, {
                easing: this.easing,
                duration: this.duration,
                complete: function() {
                    d.isCallback(d.callbackAfter)
                }
            });
            a(this).removeClass(this.this_class);
            this.appendTxt("close")
        },
        appendTxt: function(d) {
            var f = d == "open" ? this.change_txt.open : this.change_txt.close;
            var e = a(this.ev_els).find("." + this.btn_hd_txt);
            if (a(e).length === 0) {
                a("<span>", {
                    text: f
                }).addClass(this.btn_hd_txt).appendTo(this.ev_els)
            }
            a(e).empty().append(f)
        },
        isHide: function(d) {
            return a(d, this).is(":hidden")
        },
        isNodes: function(d) {
            return a(d, this).length === 0
        },
        add: function() {
            a(this.vi_container, this).empty().append(this.data);
            this.appendTxt("open")
        },
        test: function() {
            alert("test")
        },
        isCallback: function(d) {
            if (typeof d === "function") {
                d.call(this)
            }
        }
    };
    a.fn.toggleContents = function(d) {
        if (c[d]) {
            return c[d].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof d === "object" || !d) {
                return c.init.apply(this, arguments)
            } else {
                a.error("Method " + d + " does not exist on jQuery")
            }
        }
    };
    a.fn.toggleContents.defaults = {
        event_element: ".event_element",
        this_class: "on",
        view_container: ".view_container",
        btn_hd_txt: "btn-hd-txt",
        change_txt: {
            open: " - ??",
            close: " - ??"
        },
        data: null,
        default_display: false,
        auto_scroll: false,
        callbackBefore: function() {},
        callbackAfter: function() {}
    }
})(jQuery);
(function(a) {
    var c = {
        init: function(e) {
            var d = a.extend({}, a.fn.tabMenu.defaults, e);
            return this.each(function(f) {
                a.extend(this, b);
                that = this;
                var g = a(this);
                that.tab_target = g.attr("href");
                that.tab_active_class = d.tab_active_class || "on";
                that.callbackBefore = d.callbackBefore;
                that.callbackAfter = d.callbackAfter;
                that.setup();
                g.on("click.tab", that.toggle)
            })
        },
        setOpen: function(d) {
            d.trigger("click.tab")
        },
        bind: function(d) {},
        setCallbackBefore: function(d) {
            return this.each(function() {
                this.callbackBefore = d
            })
        },
        setCallbackAfter: function(d) {
            return this.each(function() {
                this.callbackAfter = d
            })
        }
    };
    var b = {
        setup: function(d) {
            if (a(this).attr("id")) {
                return
            }
            var e = "menu_" + this.tab_target.split("#")[1];
            a(this).attr("id", e);
            a("<a>", {
                text: a(this).text() + " ??? ????",
                href: "#" + e
            }).addClass("hd").appendTo(this.tab_target);
            a(this.tab_target).wrap(function() {
                return '<div id="' + this.id + '">'
            }).attr("id", "");
            if (a(this).hasClass(this.tab_active_class)) {
                a(this).addClass(this.tab_active_class);
                this.open(this.tab_target)
            } else {
                a(this).removeClass(this.tab_active_class);
                this.close(this.tab_target)
            }
        },
        open: function(d) {
            a(d).children().show();
            this.isCallback(this.callbackBefore)
        },
        close: function(d) {
            a(d).children().hide();
            this.isCallback(this.callbackAfter)
        },
        toggle: function(d) {
            var f = this,
                g, e;
            if (a(this).data("checked") === false) {
                return
            }
            if (a(f).parent().prop("tagName") == "LI") {
                g = a(f).parent().parent().find("a")
            } else {
                g = a(f).parent().find("a")
            }
            if (f.tab_target.split("#").length > 1) {
                d.preventDefault()
            }
            g.each(function() {
                e = a(this).attr("href");
                if (f.tab_target === e) {
                    a(this).addClass(this.tab_active_class);
                    f.open(e)
                } else {
                    a(this).removeClass(this.tab_active_class);
                    f.close(e)
                }
            })
        },
        isCallback: function(d) {
            if (typeof d === "function") {
                d.call(this)
            }
        }
    };
    a.fn.tabMenu = function(d) {
        if (c[d]) {
            return c[d].apply(this, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof d === "object" || !d) {
                return c.init.apply(this, arguments)
            } else {
                a.error("Method " + d + " does not exist on jQuery.tabMenu")
            }
        }
    };
    a.fn.tabMenu.defaults = {
        callbackBefore: function() {},
        callbackAfter: function() {}
    }
})(jQuery);
(function(a) {
    a.fn.selectRadio = function(b) {
        return this.each(function() {
            var h = a.extend({}, a.fn.selectRadio.defaults, b || {});
            b = b || {};
            if (h.selectEvent == "a") {
                h.selectEl = "li"
            }
            var m = a(this);
            var i = m.find(h.headline).eq(0);
            var g = i.find(h.headlineText);
            var j = m.find(h.list);
            var o = j.find(h.selectEl);
            var f = j.find(h.selectEvent);
            var n = f.eq(0).attr("name");
            m.css("width", h.listWidth + "px");
            g.css("width", h.listWidth - (g.outerWidth() - g.width()));
            var l = 0;
            if (h.selectEvent == "a") {
                if (j.find("." + h.selectedClass).length) {
                    l = o.index(j.find(h.selectEl + "." + h.selectedClass))
                } else {
                    var d = g.html()
                }
                var d = f.eq(l).html();
                j.addClass("hidden-obj")
            } else {
                j.find(h.selectEvent).each(function() {
                    if (!a(this).val()) {
                        a("label[for='" + a(this).attr("id") + "']").find(".hd-v").remove();
                        a("label[for='" + a(this).attr("id") + "']").append(a("<span class='hd hd-v'>??</span>"))
                    }
                });
                if (j.find(":checked").length) {
                    l = f.index(j.find(":checked"))
                }
                o.removeClass(h.selectedClass);
                f.eq(l).parent().addClass(h.selectedClass);
                var d = m.find("label[for=" + f.eq(l).attr("id") + "]").html()
            }
            if (h.headlineDefault) {
                g.empty().append(h.headlineDefault)
            } else {
                g.empty().append(d)
            }
            if (h.focusFlag) {
                i.focus()
            }
            i.unbind();
            i.bind("click", function(p) {
                p.stopPropagation();
                p.preventDefault();
                if (m.hasClass(h.onClass)) {
                    e()
                } else {
                    c()
                }
            }).bind("focus", function() {
                m.addClass(h.focusClass)
            }).bind("blur", function() {
                m.removeClass(h.focusClass)
            });
            a(document).bind("click", function() {
                if (m.hasClass(h.onClass)) {
                    e()
                }
            });
            j.css("width", h.listWidth - 2 + "px");
            f.unbind();
            f.bind("click", function(p) {
                o.removeClass(h.selectedClass);
                a(this).parent().addClass(h.selectedClass);
                if (h.selectEvent == "a") {
                    g.empty().append(a(this).html());
                    if (this.href.indexOf("#") != -1) {
                        p.preventDefault()
                    }
                } else {
                    g.empty().append(m.find("label[for=" + a(this).attr("id") + "]").html())
                }
                if (typeof h.callBack === "function") {
                    if (h.selectEvent == "a") {
                        return h.callBack.call(this)
                    } else {
                        h.callBack.call(this)
                    }
                }
            }).bind("focus mouseover", function() {
                m.addClass(h.focusClass);
                a(this).parent().addClass("focus")
            }).bind("blur mouseout", function() {
                m.removeClass(h.focusClass);
                a(this).parent().removeClass("focus")
            });
            o.find("label").bind("click", function() {
                if (!a("#" + a(this).attr("for")).attr("disabled")) {
                    a("#" + a(this).attr("for")).focus()
                }
            });

            function c() {
                a("." + h.onClass).removeClass(h.onClass);
                m.addClass(h.onClass);
                m.parents(".wrap").addClass("wrap-on");
                if (h.selectEvent == "a") {
                    j.removeClass("hidden-obj")
                }
                k()
            }

            function e() {
                m.removeClass(h.onClass);
                if (h.selectEvent == "a") {
                    j.addClass("hidden-obj")
                }
                m.parents(".wrap").removeClass("wrap-on");
                i.focus()
            }

            function k() {
                var p = m.offset().top,
                    r = jQuery(window).height(),
                    q = jQuery(window).scrollTop();
                newUIHeight = j.outerHeight();
                p = p - q + newUIHeight + m.outerHeight();
                if (p >= r) {
                    j.css({
                        top: (-1) * newUIHeight
                    })
                }
            }
        })
    };
    a.fn.selectRadio.defaults = {
        containerClass: "select-radio",
        onClass: "select-radio-on",
        focusClass: "select-radio-focus",
        headline: ">div",
        headlineText: "strong",
        headlineDefault: false,
        list: ">ul",
        selectEl: "li",
        selectEvent: "input",
        selectedClass: "selected",
        listWidth: 92,
        callBack: null,
        focusFlag: false
    }
})(jQuery);

function imgLoadView() {
    var c = $(".blur"),
        e = $(window).height(),
        a = $(document).scrollTop(),
        b, d;
    c.each(function() {
        b = e - ($(this).offset().top - a + (e / 4));
        if (b > 0) {
            $(this).stop().animate({
                opacity: 1
            }, 200)
        } else {
            $(this).stop().animate({
                opacity: 0.4
            }, 200)
        }
    })
}(function(b) {
    var a = b(window);
    var c = a.height();
    a.resize(function() {
        c = a.height()
    });
    b.fn.parallax = function(f, j, i) {
        var k = b(this);
        var h;
        var e;
        var g = 0;
        k.each(function() {
            e = k.offset().top
        });
        if (i) {
            h = function(l) {
                return l.outerHeight(true)
            }
        } else {
            h = function(l) {
                return l.height()
            }
        }
        if (arguments.length < 1 || f === null) {
            f = "50%"
        }
        if (arguments.length < 2 || j === null) {
            j = 0.1
        }
        if (arguments.length < 3 || i === null) {
            i = true
        }

        function d() {
            var l = a.scrollTop();
            k.each(function() {
                var n = b(this);
                var o = n.offset().top;
                var m = h(n);
                if (o + m < l || o > l + c) {
                    return
                }
                k.css("backgroundPosition", f + " " + Math.round((e - l) * j) + "px")
            })
        }
        a.bind("scroll", d).resize(d);
        d()
    }
})(jQuery);
! function(b) {
    b.flexslider = function(F, a) {
        var t = b(F);
        t.vars = b.extend({}, b.flexslider.defaults, a);
        var x, u = t.vars.namespace,
            r = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            s = ("ontouchstart" in window || r || window.DocumentTouch && document instanceof DocumentTouch) && t.vars.touch,
            z = "click touchend MSPointerUp",
            A = "",
            y = "vertical" === t.vars.direction,
            D = t.vars.reverse,
            E = t.vars.itemWidth > 0,
            B = "fade" === t.vars.animation,
            C = "" !== t.vars.asNavFor,
            v = {},
            w = !0;
        b.data(F, "flexslider", t), v = {
            init: function() {
                t.animating = !1, t.currentSlide = parseInt(t.vars.startAt ? t.vars.startAt : 0, 10), isNaN(t.currentSlide) && (t.currentSlide = 0), t.animatingTo = t.currentSlide, t.atEnd = 0 === t.currentSlide || t.currentSlide === t.last, t.containerSelector = t.vars.selector.substr(0, t.vars.selector.search(" ")), t.slides = b(t.vars.selector, t), t.container = b(t.containerSelector, t), t.count = t.slides.length, t.syncExists = b(t.vars.sync).length > 0, "slide" === t.vars.animation && (t.vars.animation = "swing"), t.prop = y ? "top" : "marginLeft", t.args = {}, t.manualPause = !1, t.stopped = !1, t.started = !1, t.startTimeout = null, t.transitions = !t.vars.video && !B && t.vars.useCSS && function() {
                    var f = document.createElement("div"),
                        d = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var e in d) {
                        if (void 0 !== f.style[d[e]]) {
                            return t.pfx = d[e].replace("Perspective", "").toLowerCase(), t.prop = "-" + t.pfx + "-transform", !0
                        }
                    }
                    return !1
                }(), t.ensureAnimationEnd = "", "" !== t.vars.controlsContainer && (t.controlsContainer = b(t.vars.controlsContainer).length > 0 && b(t.vars.controlsContainer)), "" !== t.vars.manualControls && (t.manualControls = b(t.vars.manualControls).length > 0 && b(t.vars.manualControls)), t.vars.randomize && (t.slides.sort(function() {
                    return Math.round(Math.random()) - 0.5
                }), t.container.empty().append(t.slides)), t.doMath(), t.setup("init"), t.vars.controlNav && v.controlNav.setup(), t.vars.directionNav && v.directionNav.setup(), t.vars.keyboard && (1 === b(t.containerSelector).length || t.vars.multipleKeyboard) && b(document).bind("keyup", function(f) {
                    var d = f.keyCode;
                    if (!t.animating && (39 === d || 37 === d)) {
                        var e = 39 === d ? t.getTarget("next") : 37 === d ? t.getTarget("prev") : !1;
                        t.flexAnimate(e, t.vars.pauseOnAction)
                    }
                }), t.vars.mousewheel && t.bind("mousewheel", function(d, c) {
                    d.preventDefault();
                    var e = 0 > c ? t.getTarget("next") : t.getTarget("prev");
                    t.flexAnimate(e, t.vars.pauseOnAction)
                }), t.vars.pausePlay && v.pausePlay.setup(), t.vars.slideshow && t.vars.pauseInvisible && v.pauseInvisible.init(), t.vars.slideshow && (t.vars.pauseOnHover && t.hover(function() {
                    t.manualPlay || t.manualPause || t.pause()
                }, function() {
                    t.manualPause || t.manualPlay || t.stopped || t.play()
                }), t.vars.pauseInvisible && v.pauseInvisible.isHidden() || (t.vars.initDelay > 0 ? t.startTimeout = setTimeout(t.play, t.vars.initDelay) : t.play())), C && v.asNav.setup(), s && t.vars.touch && v.touch(), (!B || B && t.vars.smoothHeight) && b(window).bind("resize orientationchange focus", v.resize), t.find("img").attr("draggable", "false"), setTimeout(function() {
                    t.vars.start(t)
                }, 200)
            },
            asNav: {
                setup: function() {
                    t.asNav = !0, t.animatingTo = Math.floor(t.currentSlide / t.move), t.currentItem = t.currentSlide, t.slides.removeClass(u + "active-slide").eq(t.currentItem).addClass(u + "active-slide"), r ? (F._slider = t, t.slides.each(function() {
                        var c = this;
                        c._gesture = new MSGesture, c._gesture.target = c, c.addEventListener("MSPointerDown", function(d) {
                            d.preventDefault(), d.currentTarget._gesture && d.currentTarget._gesture.addPointer(d.pointerId)
                        }, !1), c.addEventListener("MSGestureTap", function(d) {
                            d.preventDefault();
                            var f = b(this),
                                g = f.index();
                            b(t.vars.asNavFor).data("flexslider").animating || f.hasClass("active") || (t.direction = t.currentItem < g ? "next" : "prev", t.flexAnimate(g, t.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : t.slides.on(z, function(d) {
                        d.preventDefault();
                        var e = b(this),
                            h = e.index(),
                            i = e.offset().left - b(t).scrollLeft();
                        0 >= i && e.hasClass(u + "active-slide") ? t.flexAnimate(t.getTarget("prev"), !0) : b(t.vars.asNavFor).data("flexslider").animating || e.hasClass(u + "active-slide") || (t.direction = t.currentItem < h ? "next" : "prev", t.flexAnimate(h, t.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    t.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var h, i, d = "thumbnails" === t.vars.controlNav ? "control-thumbs" : "control-paging",
                        e = 1;
                    if (t.controlNavScaffold = b('<ol class="' + u + "control-nav " + u + d + '"></ol>'), t.pagingCount > 1) {
                        for (var l = 0; l < t.pagingCount; l++) {
                            if (i = t.slides.eq(l), h = "thumbnails" === t.vars.controlNav ? '<img src="' + i.attr("data-thumb") + '"/>' : "<a>" + e + "</a>", "thumbnails" === t.vars.controlNav && !0 === t.vars.thumbCaptions) {
                                var m = i.attr("data-thumbcaption");
                                "" != m && void 0 != m && (h += '<span class="' + u + 'caption">' + m + "</span>")
                            }
                            t.controlNavScaffold.append("<li>" + h + "</li>"), e++
                        }
                    }
                    t.controlsContainer ? b(t.controlsContainer).append(t.controlNavScaffold) : t.append(t.controlNavScaffold), v.controlNav.set(), v.controlNav.active(), t.controlNavScaffold.delegate("a, img", z, function(g) {
                        if (g.preventDefault(), "" === A || A === g.type) {
                            var j = b(this),
                                k = t.controlNav.index(j);
                            j.hasClass(u + "active") || (t.direction = k > t.currentSlide ? "next" : "prev", t.flexAnimate(k, t.vars.pauseOnAction))
                        }
                        "" === A && (A = g.type), v.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    t.controlNav = t.manualControls, v.controlNav.active(), t.controlNav.bind(z, function(d) {
                        if (d.preventDefault(), "" === A || A === d.type) {
                            var e = b(this),
                                g = t.controlNav.index(e);
                            e.hasClass(u + "active") || (t.direction = g > t.currentSlide ? "next" : "prev", t.flexAnimate(g, t.vars.pauseOnAction))
                        }
                        "" === A && (A = d.type), v.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var c = "thumbnails" === t.vars.controlNav ? "img" : "a";
                    t.controlNav = b("." + u + "control-nav li " + c, t.controlsContainer ? t.controlsContainer : t)
                },
                active: function() {
                    t.controlNav.removeClass(u + "active").eq(t.animatingTo).addClass(u + "active")
                },
                update: function(e, d) {
                    t.pagingCount > 1 && "add" === e ? t.controlNavScaffold.append(b("<li><a>" + t.count + "</a></li>")) : 1 === t.pagingCount ? t.controlNavScaffold.find("li").remove() : t.controlNav.eq(d).closest("li").remove(), v.controlNav.set(), t.pagingCount > 1 && t.pagingCount !== t.controlNav.length ? t.update(d, e) : v.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var c = b('<ul class="' + u + 'direction-nav"><li><a class="' + u + 'prev" href="#">' + t.vars.prevText + '</a></li><li><a class="' + u + 'next" href="#">' + t.vars.nextText + "</a></li></ul>");
                    t.controlsContainer ? (b(t.controlsContainer).append(c), t.directionNav = b("." + u + "direction-nav li a", t.controlsContainer)) : (t.append(c), t.directionNav = b("." + u + "direction-nav li a", t)), v.directionNav.update(), t.directionNav.bind(z, function(e) {
                        e.preventDefault();
                        var d;
                        ("" === A || A === e.type) && (d = b(this).hasClass(u + "next") ? t.getTarget("next") : t.getTarget("prev"), t.flexAnimate(d, t.vars.pauseOnAction)), "" === A && (A = e.type), v.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var c = u + "disabled";
                    1 === t.pagingCount ? t.directionNav.addClass(c).attr("tabindex", "-1") : t.vars.animationLoop ? t.directionNav.removeClass(c).removeAttr("tabindex") : 0 === t.animatingTo ? t.directionNav.removeClass(c).filter("." + u + "prev").addClass(c).attr("tabindex", "-1") : t.animatingTo === t.last ? t.directionNav.removeClass(c).filter("." + u + "next").addClass(c).attr("tabindex", "-1") : t.directionNav.removeClass(c).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var c = b('<div class="' + u + 'pauseplay"><a></a></div>');
                    t.controlsContainer ? (t.controlsContainer.append(c), t.pausePlay = b("." + u + "pauseplay a", t.controlsContainer)) : (t.append(c), t.pausePlay = b("." + u + "pauseplay a", t)), v.pausePlay.update(t.vars.slideshow ? u + "pause" : u + "play"), t.pausePlay.bind(z, function(d) {
                        d.preventDefault(), ("" === A || A === d.type) && (b(this).hasClass(u + "pause") ? (t.manualPause = !0, t.manualPlay = !1, t.pause()) : (t.manualPause = !1, t.manualPlay = !0, t.play())), "" === A && (A = d.type), v.setToClearWatchedEvent()
                    })
                },
                update: function(c) {
                    "play" === c ? t.pausePlay.removeClass(u + "pause").addClass(u + "play").html(t.vars.playText) : t.pausePlay.removeClass(u + "play").addClass(u + "pause").html(t.vars.pauseText)
                }
            },
            touch: function() {
                function m(c) {
                    t.animating ? c.preventDefault() : (window.navigator.msPointerEnabled || 1 === c.touches.length) && (t.pause(), k = y ? t.h : t.w, O = Number(new Date), P = c.touches[0].pageX, G = c.touches[0].pageY, l = E && D && t.animatingTo === t.last ? 0 : E && D ? t.limit - (t.itemW + t.vars.itemMargin) * t.move * t.animatingTo : E && t.currentSlide === t.last ? t.limit : E ? (t.itemW + t.vars.itemMargin) * t.move * t.currentSlide : D ? (t.last - t.currentSlide + t.cloneOffset) * k : (t.currentSlide + t.cloneOffset) * k, f = y ? G : P, d = y ? P : G, F.addEventListener("touchmove", n, !1), F.addEventListener("touchend", K, !1))
                }

                function n(e) {
                    P = e.touches[0].pageX, G = e.touches[0].pageY, N = y ? f - G : f - P, M = y ? Math.abs(N) < Math.abs(P - d) : Math.abs(N) < Math.abs(G - d);
                    var c = 500;
                    (!M || Number(new Date) - O > c) && (e.preventDefault(), !B && t.transitions && (t.vars.animationLoop || (N /= 0 === t.currentSlide && 0 > N || t.currentSlide === t.last && N > 0 ? Math.abs(N) / k + 2 : 1), t.setProps(l + N, "setTouch")))
                }

                function K() {
                    if (F.removeEventListener("touchmove", n, !1), t.animatingTo === t.currentSlide && !M && null !== N) {
                        var c = D ? -N : N,
                            e = c > 0 ? t.getTarget("next") : t.getTarget("prev");
                        t.canAdvance(e) && (Number(new Date) - O < 550 && Math.abs(c) > 50 || Math.abs(c) > k / 2) ? t.flexAnimate(e, t.vars.pauseOnAction) : B || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                    }
                    F.removeEventListener("touchend", K, !1), f = null, d = null, N = null, l = null
                }

                function L(c) {
                    c.stopPropagation(), t.animating ? c.preventDefault() : (t.pause(), F._gesture.addPointer(c.pointerId), H = 0, k = y ? t.h : t.w, O = Number(new Date), l = E && D && t.animatingTo === t.last ? 0 : E && D ? t.limit - (t.itemW + t.vars.itemMargin) * t.move * t.animatingTo : E && t.currentSlide === t.last ? t.limit : E ? (t.itemW + t.vars.itemMargin) * t.move * t.currentSlide : D ? (t.last - t.currentSlide + t.cloneOffset) * k : (t.currentSlide + t.cloneOffset) * k)
                }

                function I(h) {
                    h.stopPropagation();
                    var g = h.target._slider;
                    if (g) {
                        var e = -h.translationX,
                            i = -h.translationY;
                        return H += y ? i : e, N = H, M = y ? Math.abs(H) < Math.abs(-e) : Math.abs(H) < Math.abs(-i), h.detail === h.MSGESTURE_FLAG_INERTIA ? (setImmediate(function() {
                            F._gesture.stop()
                        }), void 0) : ((!M || Number(new Date) - O > 500) && (h.preventDefault(), !B && g.transitions && (g.vars.animationLoop || (N = H / (0 === g.currentSlide && 0 > H || g.currentSlide === g.last && H > 0 ? Math.abs(H) / k + 2 : 1)), g.setProps(l + N, "setTouch"))), void 0)
                    }
                }

                function J(e) {
                    e.stopPropagation();
                    var c = e.target._slider;
                    if (c) {
                        if (c.animatingTo === c.currentSlide && !M && null !== N) {
                            var h = D ? -N : N,
                                g = h > 0 ? c.getTarget("next") : c.getTarget("prev");
                            c.canAdvance(g) && (Number(new Date) - O < 550 && Math.abs(h) > 50 || Math.abs(h) > k / 2) ? c.flexAnimate(g, c.vars.pauseOnAction) : B || c.flexAnimate(c.currentSlide, c.vars.pauseOnAction, !0)
                        }
                        f = null, d = null, N = null, l = null, H = 0
                    }
                }
                var f, d, l, k, N, O, M = !1,
                    P = 0,
                    G = 0,
                    H = 0;
                r ? (F.style.msTouchAction = "none", F._gesture = new MSGesture, F._gesture.target = F, F.addEventListener("MSPointerDown", L, !1), F._slider = t, F.addEventListener("MSGestureChange", I, !1), F.addEventListener("MSGestureEnd", J, !1)) : F.addEventListener("touchstart", m, !1)
            },
            resize: function() {
                !t.animating && t.is(":visible") && (E || t.doMath(), B ? v.smoothHeight() : E ? (t.slides.width(t.computedW), t.update(t.pagingCount), t.setProps()) : y ? (t.viewport.height(t.h), t.setProps(t.h, "setTotal")) : (t.vars.smoothHeight && v.smoothHeight(), t.newSlides.width(t.computedW), t.setProps(t.computedW, "setTotal")))
            },
            smoothHeight: function(d) {
                if (!y || B) {
                    var c = B ? t : t.viewport;
                    d ? c.animate({
                        height: t.slides.eq(t.animatingTo).height()
                    }, d) : c.height(t.slides.eq(t.animatingTo).height())
                }
            },
            sync: function(d) {
                var f = b(t.vars.sync).data("flexslider"),
                    g = t.animatingTo;
                switch (d) {
                    case "animate":
                        f.flexAnimate(g, t.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        f.playing || f.asNav || f.play();
                        break;
                    case "pause":
                        f.pause()
                }
            },
            uniqueID: function(c) {
                return c.find("[id]").each(function() {
                    var d = b(this);
                    d.attr("id", d.attr("id") + "_clone")
                }), c
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var f = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) {
                        return "hidden"
                    }
                    for (var d = 0; d < f.length; d++) {
                        f[d] + "Hidden" in document && (v.pauseInvisible.visProp = f[d] + "Hidden")
                    }
                    if (v.pauseInvisible.visProp) {
                        var e = v.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(e, function() {
                            v.pauseInvisible.isHidden() ? t.startTimeout ? clearTimeout(t.startTimeout) : t.pause() : t.started ? t.play() : t.vars.initDelay > 0 ? setTimeout(t.play, t.vars.initDelay) : t.play()
                        })
                    }
                },
                isHidden: function() {
                    return document[v.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(x), x = setTimeout(function() {
                    A = ""
                }, 3000)
            }
        }, t.flexAnimate = function(d, e, k, n, o) {
            if (t.vars.animationLoop || d === t.currentSlide || (t.direction = d > t.currentSlide ? "next" : "prev"), C && 1 === t.pagingCount && (t.direction = t.currentItem < d ? "next" : "prev"), !t.animating && (t.canAdvance(d, o) || k) && t.is(":visible")) {
                if (C && n) {
                    var m = b(t.vars.asNavFor).data("flexslider");
                    if (t.atEnd = 0 === d || d === t.count - 1, m.flexAnimate(d, !0, !1, !0, o), t.direction = t.currentItem < d ? "next" : "prev", m.direction = t.direction, Math.ceil((d + 1) / t.visible) - 1 === t.currentSlide || 0 === d) {
                        return t.currentItem = d, t.slides.removeClass(u + "active-slide").eq(d).addClass(u + "active-slide"), !1
                    }
                    t.currentItem = d, t.slides.removeClass(u + "active-slide").eq(d).addClass(u + "active-slide"), d = Math.floor(d / t.visible)
                }
                if (t.animating = !0, t.animatingTo = d, e && t.pause(), t.vars.before(t), t.syncExists && !o && v.sync("animate"), t.vars.controlNav && v.controlNav.active(), E || t.slides.removeClass(u + "active-slide").eq(d).addClass(u + "active-slide"), t.atEnd = 0 === d || d === t.last, t.vars.directionNav && v.directionNav.update(), d === t.last && (t.vars.end(t), t.vars.animationLoop || t.pause()), B) {
                    s ? (t.slides.eq(t.currentSlide).css({
                        opacity: 0,
                        zIndex: 1
                    }), t.slides.eq(d).css({
                        opacity: 1,
                        zIndex: 2
                    }), t.wrapup(p)) : (t.slides.eq(t.currentSlide).css({
                        zIndex: 1
                    }).animate({
                        opacity: 0
                    }, t.vars.animationSpeed, t.vars.easing), t.slides.eq(d).css({
                        zIndex: 2
                    }).animate({
                        opacity: 1
                    }, t.vars.animationSpeed, t.vars.easing, t.wrapup))
                } else {
                    var G, g, l, p = y ? t.slides.filter(":first").height() : t.computedW;
                    E ? (G = t.vars.itemMargin, l = (t.itemW + G) * t.move * t.animatingTo, g = l > t.limit && 1 !== t.visible ? t.limit : l) : g = 0 === t.currentSlide && d === t.count - 1 && t.vars.animationLoop && "next" !== t.direction ? D ? (t.count + t.cloneOffset) * p : 0 : t.currentSlide === t.last && 0 === d && t.vars.animationLoop && "prev" !== t.direction ? D ? 0 : (t.count + 1) * p : D ? (t.count - 1 - d + t.cloneOffset) * p : (d + t.cloneOffset) * p, t.setProps(g, "", t.vars.animationSpeed), t.transitions ? (t.vars.animationLoop && t.atEnd || (t.animating = !1, t.currentSlide = t.animatingTo), t.container.unbind("webkitTransitionEnd transitionend"), t.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(t.ensureAnimationEnd), t.wrapup(p)
                    }), clearTimeout(t.ensureAnimationEnd), t.ensureAnimationEnd = setTimeout(function() {
                        t.wrapup(p)
                    }, t.vars.animationSpeed + 100)) : t.container.animate(t.args, t.vars.animationSpeed, t.vars.easing, function() {
                        t.wrapup(p)
                    })
                }
                t.vars.smoothHeight && v.smoothHeight(t.vars.animationSpeed)
            }
        }, t.wrapup = function(c) {
            B || E || (0 === t.currentSlide && t.animatingTo === t.last && t.vars.animationLoop ? t.setProps(c, "jumpEnd") : t.currentSlide === t.last && 0 === t.animatingTo && t.vars.animationLoop && t.setProps(c, "jumpStart")), t.animating = !1, t.currentSlide = t.animatingTo, t.vars.after(t)
        }, t.animateSlides = function() {
            !t.animating && w && t.flexAnimate(t.getTarget("next"))
        }, t.pause = function() {
            clearInterval(t.animatedSlides), t.animatedSlides = null, t.playing = !1, t.vars.pausePlay && v.pausePlay.update("play"), t.syncExists && v.sync("pause")
        }, t.play = function() {
            t.playing && clearInterval(t.animatedSlides), t.animatedSlides = t.animatedSlides || setInterval(t.animateSlides, t.vars.slideshowSpeed), t.started = t.playing = !0, t.vars.pausePlay && v.pausePlay.update("pause"), t.syncExists && v.sync("play")
        }, t.stop = function() {
            t.pause(), t.stopped = !0
        }, t.canAdvance = function(f, d) {
            var e = C ? t.pagingCount - 1 : t.last;
            return d ? !0 : C && t.currentItem === t.count - 1 && 0 === f && "prev" === t.direction ? !0 : C && 0 === t.currentItem && f === t.pagingCount - 1 && "next" !== t.direction ? !1 : f !== t.currentSlide || C ? t.vars.animationLoop ? !0 : t.atEnd && 0 === t.currentSlide && f === e && "next" !== t.direction ? !1 : t.atEnd && t.currentSlide === e && 0 === f && "next" === t.direction ? !1 : !0 : !1
        }, t.getTarget = function(c) {
            return t.direction = c, "next" === c ? t.currentSlide === t.last ? 0 : t.currentSlide + 1 : 0 === t.currentSlide ? t.last : t.currentSlide - 1
        }, t.setProps = function(h, d, f) {
            var g = function() {
                var i = h ? h : (t.itemW + t.vars.itemMargin) * t.move * t.animatingTo,
                    j = function() {
                        if (E) {
                            return "setTouch" === d ? h : D && t.animatingTo === t.last ? 0 : D ? t.limit - (t.itemW + t.vars.itemMargin) * t.move * t.animatingTo : t.animatingTo === t.last ? t.limit : i
                        }
                        switch (d) {
                            case "setTotal":
                                return D ? (t.count - 1 - t.currentSlide + t.cloneOffset) * h : (t.currentSlide + t.cloneOffset) * h;
                            case "setTouch":
                                return D ? h : h;
                            case "jumpEnd":
                                return D ? h : t.count * h;
                            case "jumpStart":
                                return D ? t.count * h : h;
                            default:
                                return h
                        }
                    }();
                return -1 * j + "px"
            }();
            t.transitions && (g = y ? "translate3d(0," + g + ",0)" : "translate3d(" + g + ",0,0)", f = void 0 !== f ? f / 1000 + "s" : "0s", t.container.css("-" + t.pfx + "-transition-duration", f), t.container.css("transition-duration", f)), t.args[t.prop] = g, (t.transitions || void 0 === f) && t.container.css(t.args), t.container.css("transform", g)
        }, t.setup = function(d) {
            if (B) {
                t.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%",
                    position: "relative"
                }), "init" === d && (s ? t.slides.css({
                    opacity: 0,
                    display: "block",
                    webkitTransition: "opacity " + t.vars.animationSpeed / 1000 + "s ease",
                    zIndex: 1
                }).eq(t.currentSlide).css({
                    opacity: 1,
                    zIndex: 2
                }) : t.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(t.currentSlide).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, t.vars.animationSpeed, t.vars.easing)), t.vars.smoothHeight && v.smoothHeight()
            } else {
                var e, g;
                "init" === d && (t.viewport = b('<div class="' + u + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(t).append(t.container), t.cloneCount = 0, t.cloneOffset = 0, D && (g = b.makeArray(t.slides).reverse(), t.slides = b(g), t.container.empty().append(t.slides))), t.vars.animationLoop && !E && (t.vars.typeMode && 1 ? t.cloneCount = 4 : t.cloneCount = 2, t.cloneOffset = 1, "init" !== d && t.container.find(".clone").remove(), v.uniqueID(t.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).appendTo(t.container), v.uniqueID(t.slides.last().clone().addClass("clone").attr("aria-hidden", "true")).prependTo(t.container), t.vars.typeMode && !(v.uniqueID(t.slides.first().next().clone().addClass("clone").attr("aria-hidden", "true")).appendTo(t.container), v.uniqueID(t.slides.last().prev().clone().addClass("clone").attr("aria-hidden", "true")).prependTo(t.container))), t.newSlides = b(t.vars.selector, t), e = D ? t.count - 1 - t.currentSlide + t.cloneOffset : t.currentSlide + t.cloneOffset, y && !E ? (t.container.height(200 * (t.count + t.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    t.newSlides.css({
                        display: "block"
                    }), t.doMath(), t.viewport.height(t.h), t.setProps(e * t.h, "init")
                }, "init" === d ? 100 : 0)) : (t.container.width(200 * (t.count + t.cloneCount) + "%"), t.vars.typeMode && 1 ? (t.setProps(e * t.container.width() / (t.count + t.cloneCount), "init")) : t.setProps(e * t.computedW, "init"), setTimeout(function() {
                    t.doMath(), t.newSlides.css({
                        width: t.computedW,
                        "float": "left",
                        display: "block"
                    }), t.vars.smoothHeight && v.smoothHeight()
                }, "init" === d ? 100 : 0))
            }
            E || t.slides.removeClass(u + "active-slide").eq(t.currentSlide).addClass(u + "active-slide"), t.vars.init(t)
        }, t.doMath = function() {
            var h = t.slides.first(),
                d = t.vars.itemMargin,
                f = t.vars.minItems,
                g = t.vars.maxItems;
            t.w = void 0 === t.viewport ? t.width() : t.viewport.width(), t.h = h.height(), t.boxPadding = h.outerWidth() - h.width(), E ? (t.itemT = t.vars.itemWidth + d, t.minW = f ? f * t.itemT : t.w, t.maxW = g ? g * t.itemT - d : t.w, t.itemW = t.minW > t.w ? (t.w - d * (f - 1)) / f : t.maxW < t.w ? (t.w - d * (g - 1)) / g : t.vars.itemWidth > t.w ? t.w : t.vars.itemWidth, t.visible = Math.floor(t.w / t.itemW), t.move = t.vars.move > 0 && t.vars.move < t.visible ? t.vars.move : t.visible, t.pagingCount = Math.ceil((t.count - t.visible) / t.move + 1), t.last = t.pagingCount - 1, t.limit = 1 === t.pagingCount ? 0 : t.vars.itemWidth > t.w ? t.itemW * (t.count - 1) + d * (t.count - 1) : (t.itemW + d) * t.count - t.w - d) : (t.itemW = t.w, t.pagingCount = t.count, t.last = t.count - 1), t.computedW = t.itemW - t.boxPadding
        }, t.update = function(d, c) {
            t.doMath(), E || (d < t.currentSlide ? t.currentSlide += 1 : d <= t.currentSlide && 0 !== d && (t.currentSlide -= 1), t.animatingTo = t.currentSlide), t.vars.controlNav && !t.manualControls && ("add" === c && !E || t.pagingCount > t.controlNav.length ? v.controlNav.update("add") : ("remove" === c && !E || t.pagingCount < t.controlNav.length) && (E && t.currentSlide > t.last && (t.currentSlide -= 1, t.animatingTo -= 1), v.controlNav.update("remove", t.last))), t.vars.directionNav && v.directionNav.update()
        }, t.addSlide = function(d, f) {
            var g = b(d);
            t.count += 1, t.last = t.count - 1, y && D ? void 0 !== f ? t.slides.eq(t.count - f).after(g) : t.container.prepend(g) : void 0 !== f ? t.slides.eq(f).before(g) : t.container.append(g), t.update(f, "add"), t.slides = b(t.vars.selector + ":not(.clone)", t), t.setup(), t.vars.added(t)
        }, t.removeSlide = function(e) {
            var d = isNaN(e) ? t.slides.index(b(e)) : e;
            t.count -= 1, t.last = t.count - 1, isNaN(e) ? b(e, t.slides).remove() : y && D ? t.slides.eq(t.last).remove() : t.slides.eq(e).remove(), t.doMath(), t.update(d, "remove"), t.slides = b(t.vars.selector + ":not(.clone)", t), t.setup(), t.vars.removed(t)
        }, v.init()
    }, b(window).blur(function() {
        focused = !1
    }).focus(function() {
        focused = !0
    }), b.flexslider.defaults = {
        typeMode: !1,
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, b.fn.flexslider = function(d) {
        if (void 0 === d && (d = {}), "object" == typeof d) {
            return this.each(function() {
                var h = b(this),
                    f = d.selector ? d.selector : ".slides > li",
                    g = h.find(f);
                1 === g.length && d.allowOneSlide === !0 || 0 === g.length ? (g.fadeIn(400), d.start && d.start(h)) : void 0 === h.data("flexslider") && new b.flexslider(this, d)
            })
        }
        var a = b(this).data("flexslider");
        switch (d) {
            case "play":
                a.play();
                break;
            case "pause":
                a.pause();
                break;
            case "stop":
                a.stop();
                break;
            case "next":
                a.flexAnimate(a.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                a.flexAnimate(a.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof d && a.flexAnimate(d, !0)
        }
    }
}(jQuery);