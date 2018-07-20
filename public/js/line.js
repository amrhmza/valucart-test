! function () {
    "use strict";

    function a() {
        n.addClass("lnl-show").removeClass("lnl-hide"), s.addClass(i).css({
            height: o,
            overflow: "hidden"
        }), $("html, body").css("overflow", "hidden"), l.find("span").removeClass("fa-bars").addClass("fa-remove")
    }

    function t() {
        n.removeClass("lnl-show").addClass("lnl-hide"), s.removeClass(i).css({
            height: "auto",
            overflow: "auto"
        }), $("html, body").css("overflow", "auto"), l.find("span").removeClass("fa-remove").addClass("fa-bars")
    }

    function e() {
        try {
            return document.createEvent("TouchEvent"), !0
        } catch (a) {
            return !1
        }
    }
    var n = $(".line-navbar-left"),
        l = $(".lno-btn-toggle"),
        s = ($(".lno-btn-collapse"), $(".content-wrap")),
        i = s.data("effect"),
        o = $(window).height() - 95;
    n.addClass("lnl-hide"), l.click(function () {
        n.hasClass("lnl-hide") ? a() : t()
    }), l.click(function (a) {
        a.preventDefault(), n.hasClass("lnl-collapsed") ? (n.removeClass("lnl-collapsed"), s.removeClass("lnl-collapsed"), $(this).find(".lnl-link-icon").removeClass("fa-arrow-right").addClass("fa-arrow-left")) : (n.addClass("lnl-collapsed"), s.addClass("lnl-collapsed"), $(this).find(".lnl-link-icon").removeClass("fa-arrow-left").addClass("fa-arrow-right"))
    }), 1 == e() && $(window).swipe({
        swipeRight: function () {
            a(), $(".navbar-collapse").removeClass("in")
        },
        swipeLeft: function () {
            t()
        },
        threshold: 75
    }), $(window).resize(function () {
        $(window).width() >= 767 && t()
    }), $(".lnt-search-input").focusin(function () {
        $(".lnt-search-suggestion").find(".dropdown-menu").slideDown()
    }), $(".lnt-search-input").focusout(function () {
        $(".lnt-search-suggestion").find(".dropdown-menu").slideUp()
    });
    var r = $(" .lnt-search-category ").find(" .dropdown-menu ").find(" li ");
    r.click(function () {
        var a = $(this).find(" a ").text(),
            t = $(" .selected-category-text ");
        t.text(a)
    }), $(".lnt-search-input").bind("keyup change", function () {
        var a = $(this).val(),
            t = $(".lnt-search-suggestion").find(".dropdown-menu > li > a");
        t.unhighlight({
            element: "strong",
            className: "important"
        }), a && t.highlight(a, {
            element: "strong",
            className: "important"
        })
    }), $(".add-to-cart").click(function () {
        var a = randomColor({
                luminosity: "light",
                format: "rgb"
            }),
            t = $(".lnt-cart").find(".cart-item-quantity").text();
        $(".lnt-cart").css("backgroundColor", a), $(".lnt-cart").find("span").eq(0).addClass("item-added"), $(".lnt-cart").find(".cart-item-quantity").text(++t)
    }), $(".add-to-cart").click(function () {
        var a = randomColor({
                luminosity: "light",
                format: "rgb"
            }),
            t = $(".lno-cart").find(".cart-item-quantity").text();
        $(".lno-cart").css("backgroundColor", a), $(".lno-cart").find("span").eq(0).addClass("item-added"), $(".lno-cart").find(".cart-item-quantity").text(++t)
    });
    var c = $(".lnt-category").find("li").find("a"),
        d = $(".lnt-category").find("li");
    c.mouseenter(function () {
        d.removeClass("active"), $(this).parent().addClass("active");
        var a = $(this).attr("data-root");
        $(".lnt-subcategroy-carousel-wrap").find("> div").removeClass("active"), $(a).addClass("active")
    }), c.on("touchstart, touchend", function (a) {
        a.preventDefault(), d.removeClass("active"), $(this).parent().addClass("active");
        var t = $(this).attr("data-root");
        $(".lnt-subcategroy-carousel-wrap").find("> div").removeClass("active"), $(t).addClass("active")
    }), 1 == e() && ($(window).swipe({
        swipeLeft: function () {
            $(".carousel").carousel("next")
        },
        swipeRight: function () {
            $(".carousel").carousel("prev")
        },
        threshold: 75
    }), $(".carousel-indicators").hide()), $(".carousel-indicators").find("li").mouseenter(function () {
        var a = $(this).data("slide-to");
        $(this).parents(".carousel").carousel(a)
    }), String.prototype.capitalize = function () {
        return this.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase()
        })
    }, $(".lnt-category > li").each(function () {
        var a = $(this).find("a");
        $(".lnl-nav").append("<li><a class='collapsed' data-toggle='collapse' href='#collapse" + a.text().capitalize().replace(/[, ]+/g, "") + "' aria-expanded='false' aria-controls='collapse" + a.text().capitalize().replace(/[, ]+/g, "") + "' data-subcategory=" + a.attr("data-root").replace("#", "") + "><span class='lnl-link-text'>" + $(this).text() + "</span><span class='fa fa-angle-up lnl-btn-sub-collapse'></span></a></li>")
    }), $(".lnl-nav li").each(function () {
        var a = $(this).find("a");
        $(this).append("<ul class='lnl-sub-one collapse' id='" + a.attr("data-root").replace("#", "") + "' data-subcategory='" + a.data("subcategory") + "'></ul>")
    }), $(".lnt-subcategroy-carousel-wrap > div").each(function () {
        var a = $(this).attr("id"),
            t = $(this).find("ul").map(function () {
                return $(this).html()
            }).get(),
            e = $("ul[data-subcategory='" + a + "']");
        e.append(t)
    }), $(".navbar-toggle").click(function () {
        $(this).hasClass("collapsed") && t()
    }), l.click(function () {
        $(".navbar-collapse").removeClass("in")
    })
}();
