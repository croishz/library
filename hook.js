!function(e) {
    function t(t) {
        for (var i, r, a = t[0], l = t[1], u = t[2], h = 0, f = []; h < a.length; h++)
            r = a[h],
            s[r] && f.push(s[r][0]),
            s[r] = 0;
        for (i in l)
            Object.prototype.hasOwnProperty.call(l, i) && (e[i] = l[i]);
        for (c && c(t); f.length; )
            f.shift()();
        return o.push.apply(o, u || []),
        n()
    }
    function n() {
        for (var e, t = 0; t < o.length; t++) {
            for (var n = o[t], i = !0, a = 1; a < n.length; a++) {
                var l = n[a];
                0 !== s[l] && (i = !1)
            }
            i && (o.splice(t--, 1),
            e = r(r.s = n[0]))
        }
        return e
    }
    var i = {}
      , s = {
        0: 0
    }
      , o = [];
    function r(t) {
        if (i[t])
            return i[t].exports;
        var n = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, r),
        n.l = !0,
        n.exports
    }
    r.m = e,
    r.c = i,
    r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }
    ,
    r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    r.t = function(e, t) {
        if (1 & t && (e = r(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var n = Object.create(null);
        if (r.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var i in e)
                r.d(n, i, function(t) {
                    return e[t]
                }
                .bind(null, i));
        return n
    }
    ,
    r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return r.d(t, "a", t),
        t
    }
    ,
    r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    r.p = "";
    var a = window.webpackJsonp = window.webpackJsonp || []
      , l = a.push.bind(a);
    a.push = t,
    a = a.slice();
    for (var u = 0; u < a.length; u++)
        t(a[u]);
    var c = l;
    o.push([21, 1]),
    n()
}({
    21: function(e, t, n) {
        e.exports = n(36)
    },
    22: function(e, t, n) {},
    36: function(e, t, n) {
        "use strict";
        n.r(t);
        n(22);
        var i = n(7)
          , s = n.n(i)
          , o = n(4)
          , r = n.n(o)
          , a = {
            html: document.documentElement,
            body: document.body,
            width: window.innerWidth,
            height: window.innerHeight,
            container: document.querySelector(".js-smooth"),
            docHeight: 0,
            header: document.querySelector(".js-site-head__inner"),
            isSmall: window.matchMedia("(max-width: 640px)").matches,
            videoState: "PAUSE",
            overlay: !1,
            menuIsOpen: !1
        }
          , l = n(1)
          , u = function(e, t, n) {
            return (e - t) / (n - t)
        };
        var c = function(e, t) {
            for (var n = t.length, i = 0; i < n; i++)
                e[t[i]] = e[t[i]].bind(e)
        };
        var h = function(e) {
            var t = [].slice.call(document.querySelectorAll("img"), 0);
            t.forEach(function(e) {
                var n = document.createElement("img");
                n.addEventListener("load", function() {
                    t.splice(t.indexOf(e), 1),
                    t.length
                }),
                n.src = e.src
            })
        }
          , f = n(17)
          , d = new (n.n(f).a)
          , p = n(38)
          , y = n(16)
          , v = n(2)
          , g = n(18)
          , m = n.n(g);
        function b(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function w(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        var x = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                w(this, "onScroll", function(t) {
                    d.emit(e.events.SCROLL, {
                        y: Math.round(-1 * t.deltaY)
                    })
                }),
                w(this, "onNativeScroll", function() {
                    d.emit(e.events.SCROLL, {
                        y: window.scrollY
                    })
                }),
                this.el = document.querySelector(".js-smooth"),
                this.setup()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "setup",
                value: function() {
                    r.a.isDevice ? window.addEventListener("scroll", this.onNativeScroll, {
                        passive: !0
                    }) : (this.vs = new m.a({
                        el: this.el,
                        limitInertia: !1,
                        mouseMultiplier: .5,
                        touchMultiplier: 3,
                        firefoxMultiplier: 90,
                        passive: !0
                    }),
                    this.vs.on(this.onScroll))
                }
            }]) && b(t.prototype, n),
            i && b(t, i),
            e
        }();
        x.events = {
            SCROLL: "ScrollController.events.SCROLL"
        };
        new x;
        var O = x.events
          , S = n(19)
          , k = n.n(S);
        function E(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var T = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.onResize = k()(this.onResize.bind(this), 200),
                window.addEventListener("resize", this.onResize)
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "onResize",
                value: function() {
                    d.emit(e.events.RESIZE)
                }
            }]) && E(t.prototype, n),
            i && E(t, i),
            e
        }();
        T.events = {
            RESIZE: "GlobalResize.events.RESIZE"
        };
        new T;
        var P = T.events;
        function C(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function L(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        p.a;
        var j = function() {
            function e() {
                var t = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                L(this, "setMaxHeight", function() {
                    Object.assign(a, {
                        docHeight: a.container.getBoundingClientRect().height - window.innerHeight
                    })
                }),
                L(this, "tick", function() {
                    r.a.isDevice ? t.scroll.current = t.scroll.target : t.scroll.current += (t.scroll.target - t.scroll.current) * t.data.ease,
                    d.emit(e.events.TICK, {
                        target: t.scroll.target,
                        smooth: t.scroll.current
                    })
                }),
                L(this, "event", function(e) {
                    var n = e.y;
                    r.a.isDevice ? t.scroll.target = n : (t.scroll.target += n,
                    t.clampTarget())
                }),
                L(this, "onResize", function() {
                    Object.assign(a, {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }),
                    r.a.isDevice || (t.setMaxHeight(),
                    t.clampTarget())
                }),
                L(this, "update", function() {
                    t.scroll.current = 0,
                    t.scroll.target = 0,
                    t.setMaxHeight(),
                    h(t.setMaxHeight)
                }),
                y.a.ticker.addEventListener("tick", this.tick),
                this.data = {
                    ease: .125
                },
                this.scroll = {
                    target: 0,
                    current: 0
                },
                this.addListeners()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "clampTarget",
                value: function() {
                    this.scroll.target = Math.round(Math.min(Math.max(this.scroll.target, 0), a.docHeight))
                }
            }, {
                key: "scrollTo",
                value: function(e) {
                    if (r.a.isDevice) {
                        var t = a.header.offsetHeight;
                        y.a.to(window, 1, {
                            scrollTo: {
                                y: "#".concat(e),
                                offsetY: t
                            },
                            ease: v.e.easeInOut
                        })
                    } else {
                        var n = document.querySelector("#".concat(e))
                          , i = this.scroll.target + n.getBoundingClientRect().top;
                        y.a.to(this.scroll, 1, {
                            target: i,
                            ease: v.e.easeInOut
                        })
                    }
                }
            }, {
                key: "addListeners",
                value: function() {
                    d.on(O.SCROLL, this.event),
                    d.on(P.RESIZE, this.onResize)
                }
            }]) && C(t.prototype, n),
            i && C(t, i),
            e
        }();
        j.events = {
            TICK: "TICK"
        };
        var _ = new j
          , R = j.events;
        function I(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function A(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        var M = function() {
            function e() {
                var t = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                A(this, "run", function(e) {
                    var n = e.smooth;
                    t.state.current = n,
                    t.transformSections()
                }),
                A(this, "onResize", function() {
                    t.state.isResizing = !0,
                    t.sections && (t.sections.forEach(function(e) {
                        e.el.style.transform = "";
                        var t = e.el.getBoundingClientRect();
                        e.bounds.top = t.top,
                        e.bounds.bottom = t.bottom
                    }),
                    t.transformSections()),
                    Ut && Ut.onResize(),
                    t.state.isResizing = !1
                }),
                this.el = document.querySelector(".js-smooth"),
                this.dom = {
                    el: this.el,
                    sections: document.querySelectorAll(".js-smooth-section")
                },
                this.state = {
                    current: 0,
                    threshold: 100,
                    isResizing: !1
                },
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "init",
                value: function() {
                    this.on()
                }
            }, {
                key: "on",
                value: function() {
                    this.setStyles(),
                    this.getCache(),
                    this.addListeners(),
                    h(this.onResize)
                }
            }, {
                key: "setStyles",
                value: function() {
                    a.body.classList.add("is-virtual-scroll"),
                    Object.assign(this.dom.el.style, {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%"
                    })
                }
            }, {
                key: "transformSections",
                value: function() {
                    var e = this
                      , t = this.state
                      , n = t.current
                      , i = t.isResizing
                      , s = "translate3d(0, ".concat(-n.toFixed(2), "px, 0)");
                    this.sections.forEach(function(t) {
                        var n = t.el
                          , o = t.bounds;
                        e.isVisible(o) || i ? (Object.assign(t, {
                            out: !1
                        }),
                        n.style.transform = s) : t.out || (Object.assign(t, {
                            out: !0
                        }),
                        n.style.transform = s)
                    })
                }
            }, {
                key: "isVisible",
                value: function(e) {
                    var t = this.state
                      , n = t.current
                      , i = t.threshold
                      , s = e.top
                      , o = e.bottom - n
                      , r = s - n < i + a.height && o > -i;
                    return r
                }
            }, {
                key: "getCache",
                value: function() {
                    this.getSections()
                }
            }, {
                key: "getSections",
                value: function() {
                    var e = this;
                    this.dom.sections && (this.sections = [],
                    this.dom.sections.forEach(function(t) {
                        Object.assign(t.style, {
                            transform: ""
                        });
                        var n = t.getBoundingClientRect()
                          , i = {
                            el: t,
                            bounds: {
                                top: n.top,
                                bottom: n.bottom
                            },
                            out: !0
                        };
                        e.sections.push(i)
                    }))
                }
            }, {
                key: "addListeners",
                value: function() {
                    d.on(R.TICK, this.run),
                    d.on(P.RESIZE, this.onResize)
                }
            }, {
                key: "removeListeners",
                value: function() {
                    d.off(R.TICK, this.run),
                    d.off(P.RESIZE, this.onResize)
                }
            }, {
                key: "destroy",
                value: function() {
                    this.removeListeners(),
                    this.dom = null,
                    this.data = null,
                    this.state = null,
                    this.elems = null,
                    this.sections = null
                }
            }]) && I(t.prototype, n),
            i && I(t, i),
            e
        }()
          , N = (n(31),
        n(0));
        /*!
 * VERSION: 0.6.0
 * DATE: 2018-05-14
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
        !function(e) {
            var t = e.GreenSockGlobals || e
              , n = function(e) {
                var n, i = e.split("."), s = t;
                for (n = 0; n < i.length; n++)
                    s[i[n]] = s = s[i[n]] || {};
                return s
            }("com.greensock.utils")
              , i = document
              , s = i.defaultView ? i.defaultView.getComputedStyle : function() {}
              , o = /([A-Z])/g
              , r = function(e, t, n, i) {
                var r;
                return (n = n || s(e, null)) ? r = (e = n.getPropertyValue(t.replace(o, "-$1").toLowerCase())) || n.length ? e : n[t] : e.currentStyle && (r = (n = e.currentStyle)[t]),
                i ? r : parseInt(r, 10) || 0
            }
              , a = function(e) {
                return !!(e.length && e[0] && (e[0].nodeType && e[0].style && !e.nodeType || e[0].length && e[0][0]))
            }
              , l = function(e, t) {
                for (var n, i = t.length; --i > -1; )
                    if (n = t[i],
                    e.substr(0, n.length) === n)
                        return n.length
            }
              , u = /(?:\r|\n|\t\t)/g
              , c = /(?:\s\s+)/g
              , h = function(e) {
                return (e.charCodeAt(0) - 55296 << 10) + (e.charCodeAt(1) - 56320) + 65536
            }
              , f = " style='position:relative;display:inline-block;" + (i.all && !i.addEventListener ? "*display:inline;*zoom:1;'" : "'")
              , d = function(e, t) {
                var n = -1 !== (e = e || "").indexOf("++")
                  , i = 1;
                return n && (e = e.split("++").join("")),
                function() {
                    return "<" + t + f + (e ? " class='" + e + (n ? i++ : "") + "'>" : ">")
                }
            }
              , p = n.SplitText = t.SplitText = function(e, t) {
                if ("string" == typeof e && (e = p.selector(e)),
                !e)
                    throw "cannot split a null element.";
                this.elements = a(e) ? function(e) {
                    var t, n, i, s = [], o = e.length;
                    for (t = 0; t < o; t++)
                        if (n = e[t],
                        a(n))
                            for (i = n.length,
                            i = 0; i < n.length; i++)
                                s.push(n[i]);
                        else
                            s.push(n);
                    return s
                }(e) : [e],
                this.chars = [],
                this.words = [],
                this.lines = [],
                this._originals = [],
                this.vars = t || {},
                this.split(t)
            }
              , y = function e(t, n, i) {
                var s = t.nodeType;
                if (1 === s || 9 === s || 11 === s)
                    for (t = t.firstChild; t; t = t.nextSibling)
                        e(t, n, i);
                else
                    3 !== s && 4 !== s || (t.nodeValue = t.nodeValue.split(n).join(i))
            }
              , v = function(e, t) {
                for (var n = t.length; --n > -1; )
                    e.push(t[n])
            }
              , g = function(e) {
                var t, n = [], i = e.length;
                for (t = 0; t !== i; n.push(e[t++]))
                    ;
                return n
            }
              , m = function(e, t, n) {
                for (var i; e && e !== t; ) {
                    if (i = e._next || e.nextSibling)
                        return i.textContent.charAt(0) === n;
                    e = e.parentNode || e._parent
                }
                return !1
            }
              , b = function e(t) {
                var n, i, s = g(t.childNodes), o = s.length;
                for (n = 0; n < o; n++)
                    (i = s[n])._isSplit ? e(i) : (n && 3 === i.previousSibling.nodeType ? i.previousSibling.nodeValue += 3 === i.nodeType ? i.nodeValue : i.firstChild.nodeValue : 3 !== i.nodeType && t.insertBefore(i.firstChild, i),
                    t.removeChild(i))
            }
              , w = function(e, t, n, o, a, l, u) {
                var c, h, f, d, p, g, w, x, O, S, k, E, T = s(e), P = r(e, "paddingLeft", T), C = -999, L = r(e, "borderBottomWidth", T) + r(e, "borderTopWidth", T), j = r(e, "borderLeftWidth", T) + r(e, "borderRightWidth", T), _ = r(e, "paddingTop", T) + r(e, "paddingBottom", T), R = r(e, "paddingLeft", T) + r(e, "paddingRight", T), I = .2 * r(e, "fontSize"), A = r(e, "textAlign", T, !0), M = [], N = [], D = [], q = t.wordDelimiter || " ", B = t.span ? "span" : "div", z = t.type || t.split || "chars,words,lines", V = a && -1 !== z.indexOf("lines") ? [] : null, F = -1 !== z.indexOf("words"), H = -1 !== z.indexOf("chars"), U = "absolute" === t.position || !0 === t.absolute, W = t.linesClass, G = -1 !== (W || "").indexOf("++"), X = [];
                for (V && 1 === e.children.length && e.children[0]._isSplit && (e = e.children[0]),
                G && (W = W.split("++").join("")),
                f = (h = e.getElementsByTagName("*")).length,
                p = [],
                c = 0; c < f; c++)
                    p[c] = h[c];
                if (V || U)
                    for (c = 0; c < f; c++)
                        ((g = (d = p[c]).parentNode === e) || U || H && !F) && (E = d.offsetTop,
                        V && g && Math.abs(E - C) > I && ("BR" !== d.nodeName || 0 === c) && (w = [],
                        V.push(w),
                        C = E),
                        U && (d._x = d.offsetLeft,
                        d._y = E,
                        d._w = d.offsetWidth,
                        d._h = d.offsetHeight),
                        V && ((d._isSplit && g || !H && g || F && g || !F && d.parentNode.parentNode === e && !d.parentNode._isSplit) && (w.push(d),
                        d._x -= P,
                        m(d, e, q) && (d._wordEnd = !0)),
                        "BR" === d.nodeName && (d.nextSibling && "BR" === d.nextSibling.nodeName || 0 === c) && V.push([])));
                for (c = 0; c < f; c++)
                    g = (d = p[c]).parentNode === e,
                    "BR" !== d.nodeName ? (U && (O = d.style,
                    F || g || (d._x += d.parentNode._x,
                    d._y += d.parentNode._y),
                    O.left = d._x + "px",
                    O.top = d._y + "px",
                    O.position = "absolute",
                    O.display = "block",
                    O.width = d._w + 1 + "px",
                    O.height = d._h + "px"),
                    !F && H ? d._isSplit ? (d._next = d.nextSibling,
                    d.parentNode.appendChild(d)) : d.parentNode._isSplit ? (d._parent = d.parentNode,
                    !d.previousSibling && d.firstChild && (d.firstChild._isFirst = !0),
                    d.nextSibling && " " === d.nextSibling.textContent && !d.nextSibling.nextSibling && X.push(d.nextSibling),
                    d._next = d.nextSibling && d.nextSibling._isFirst ? null : d.nextSibling,
                    d.parentNode.removeChild(d),
                    p.splice(c--, 1),
                    f--) : g || (E = !d.nextSibling && m(d.parentNode, e, q),
                    d.parentNode._parent && d.parentNode._parent.appendChild(d),
                    E && d.parentNode.appendChild(i.createTextNode(" ")),
                    t.span && (d.style.display = "inline"),
                    M.push(d)) : d.parentNode._isSplit && !d._isSplit && "" !== d.innerHTML ? N.push(d) : H && !d._isSplit && (t.span && (d.style.display = "inline"),
                    M.push(d))) : V || U ? (d.parentNode && d.parentNode.removeChild(d),
                    p.splice(c--, 1),
                    f--) : F || e.appendChild(d);
                for (c = X.length; --c > -1; )
                    X[c].parentNode.removeChild(X[c]);
                if (V) {
                    for (U && (S = i.createElement(B),
                    e.appendChild(S),
                    k = S.offsetWidth + "px",
                    E = S.offsetParent === e ? 0 : e.offsetLeft,
                    e.removeChild(S)),
                    O = e.style.cssText,
                    e.style.cssText = "display:none;"; e.firstChild; )
                        e.removeChild(e.firstChild);
                    for (x = " " === q && (!U || !F && !H),
                    c = 0; c < V.length; c++) {
                        for (w = V[c],
                        (S = i.createElement(B)).style.cssText = "display:block;text-align:" + A + ";position:" + (U ? "absolute;" : "relative;"),
                        W && (S.className = W + (G ? c + 1 : "")),
                        D.push(S),
                        f = w.length,
                        h = 0; h < f; h++)
                            "BR" !== w[h].nodeName && (d = w[h],
                            S.appendChild(d),
                            x && d._wordEnd && S.appendChild(i.createTextNode(" ")),
                            U && (0 === h && (S.style.top = d._y + "px",
                            S.style.left = P + E + "px"),
                            d.style.top = "0px",
                            E && (d.style.left = d._x - E + "px")));
                        0 === f ? S.innerHTML = "&nbsp;" : F || H || (b(S),
                        y(S, String.fromCharCode(160), " ")),
                        U && (S.style.width = k,
                        S.style.height = d._h + "px"),
                        e.appendChild(S)
                    }
                    e.style.cssText = O
                }
                U && (u > e.clientHeight && (e.style.height = u - _ + "px",
                e.clientHeight < u && (e.style.height = u + L + "px")),
                l > e.clientWidth && (e.style.width = l - R + "px",
                e.clientWidth < l && (e.style.width = l + j + "px"))),
                v(n, M),
                v(o, N),
                v(a, D)
            }
              , x = function e(t, n, s, o) {
                var a, f, d = g(t.childNodes), p = d.length, v = "absolute" === n.position || !0 === n.absolute;
                if (3 !== t.nodeType || p > 1) {
                    for (n.absolute = !1,
                    a = 0; a < p; a++)
                        (3 !== (f = d[a]).nodeType || /\S+/.test(f.nodeValue)) && (v && 3 !== f.nodeType && "inline" === r(f, "display", null, !0) && (f.style.display = "inline-block",
                        f.style.position = "relative"),
                        f._isSplit = !0,
                        e(f, n, s, o));
                    return n.absolute = v,
                    void (t._isSplit = !0)
                }
                !function(e, t, n, s) {
                    var o, r, a, f, d, p, v, g, m, b, w = t.span ? "span" : "div", x = -1 !== (t.type || t.split || "chars,words,lines").indexOf("chars"), O = "absolute" === t.position || !0 === t.absolute, S = t.wordDelimiter || " ", k = " " !== S ? "" : O ? "&#173; " : " ", E = t.span ? "</span>" : "</div>", T = !0, P = t.specialChars ? "function" == typeof t.specialChars ? t.specialChars : l : null, C = i.createElement("div"), L = e.parentNode;
                    for (L.insertBefore(C, e),
                    C.textContent = e.nodeValue,
                    L.removeChild(e),
                    v = -1 !== (o = function e(t) {
                        var n = t.nodeType
                          , i = "";
                        if (1 === n || 9 === n || 11 === n) {
                            if ("string" == typeof t.textContent)
                                return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling)
                                i += e(t)
                        } else if (3 === n || 4 === n)
                            return t.nodeValue;
                        return i
                    }(e = C)).indexOf("<"),
                    !1 !== t.reduceWhiteSpace && (o = o.replace(c, " ").replace(u, "")),
                    v && (o = o.split("<").join("{{LT}}")),
                    d = o.length,
                    r = (" " === o.charAt(0) ? k : "") + n(),
                    a = 0; a < d; a++)
                        if (p = o.charAt(a),
                        P && (b = P(o.substr(a), t.specialChars)))
                            p = o.substr(a, b || 1),
                            r += x && " " !== p ? s() + p + "</" + w + ">" : p,
                            a += b - 1;
                        else if (p === S && o.charAt(a - 1) !== S && a) {
                            for (r += T ? E : "",
                            T = !1; o.charAt(a + 1) === S; )
                                r += k,
                                a++;
                            a === d - 1 ? r += k : ")" !== o.charAt(a + 1) && (r += k + n(),
                            T = !0)
                        } else
                            "{" === p && "{{LT}}" === o.substr(a, 6) ? (r += x ? s() + "{{LT}}</" + w + ">" : "{{LT}}",
                            a += 5) : p.charCodeAt(0) >= 55296 && p.charCodeAt(0) <= 56319 || o.charCodeAt(a + 1) >= 65024 && o.charCodeAt(a + 1) <= 65039 ? (g = h(o.substr(a, 2)),
                            m = h(o.substr(a + 2, 2)),
                            f = g >= 127462 && g <= 127487 && m >= 127462 && m <= 127487 || m >= 127995 && m <= 127999 ? 4 : 2,
                            r += x && " " !== p ? s() + o.substr(a, f) + "</" + w + ">" : o.substr(a, f),
                            a += f - 1) : r += x && " " !== p ? s() + p + "</" + w + ">" : p;
                    e.outerHTML = r + (T ? E : ""),
                    v && y(L, "{{LT}}", "<")
                }(t, n, s, o)
            }
              , O = p.prototype;
            O.split = function(e) {
                this.isSplit && this.revert(),
                this.vars = e = e || this.vars,
                this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
                for (var t, n, i, s = this.elements.length, o = e.span ? "span" : "div", r = d(e.wordsClass, o), a = d(e.charsClass, o); --s > -1; )
                    i = this.elements[s],
                    this._originals[s] = i.innerHTML,
                    t = i.clientHeight,
                    n = i.clientWidth,
                    x(i, e, r, a),
                    w(i, e, this.chars, this.words, this.lines, n, t);
                return this.chars.reverse(),
                this.words.reverse(),
                this.lines.reverse(),
                this.isSplit = !0,
                this
            }
            ,
            O.revert = function() {
                if (!this._originals)
                    throw "revert() call wasn't scoped properly.";
                for (var e = this._originals.length; --e > -1; )
                    this.elements[e].innerHTML = this._originals[e];
                return this.chars = [],
                this.words = [],
                this.lines = [],
                this.isSplit = !1,
                this
            }
            ,
            p.selector = e.$ || e.jQuery || function(t) {
                var n = e.$ || e.jQuery;
                return n ? (p.selector = n,
                n(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
            }
            ,
            p.version = "0.6.0"
        }(N.f);
        var D = N.f.SplitText;
        function q(e) {
            return function(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = new Array(e.length); t < e.length; t++)
                        n[t] = e[t];
                    return n
                }
            }(e) || function(e) {
                if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))
                    return Array.from(e)
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance")
            }()
        }
        function B(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var z = function() {
            function e(t) {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.el = a.body,
                this.elems = null,
                this.cache = null,
                this.options = null,
                this.observer = null,
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "createObserver",
                value: function() {
                    this.options = {
                        root: null,
                        rootMargin: "0px 0px -15% 0px",
                        threshold: [0, 0]
                    },
                    this.observer = new IntersectionObserver(this.handler.bind(this),this.options)
                }
            }, {
                key: "fixArray",
                value: function() {
                    var e = this;
                    this.elems = [];
                    var t = q(this.el.querySelectorAll("[data-scroll]"));
                    t && t.forEach(function(t) {
                        t.getBoundingClientRect().top >= a.height && e.elems.push(t)
                    })
                }
            }, {
                key: "getCache",
                value: function() {
                    var e = this;
                    this.cache = [],
                    this.elems.forEach(function(t, n) {
                        var i = {
                            el: t,
                            animation: t.dataset.scroll,
                            isIntersected: !1,
                            elems: null,
                            split: null,
                            tl: null
                        };
                        e.cache.push(i)
                    })
                }
            }, {
                key: "setAnimation",
                value: function(e) {
                    if (e.tl = new TimelineLite({
                        paused: !0,
                        immediateRender: !0
                    }),
                    "fade" === e.animation)
                        e.tl.from(e.el, 1.25, {
                            alpha: 0,
                            ease: Power2.easeOut
                        });
                    else if ("lines" === e.animation) {
                        var t = new D(e.el,{
                            type: "lines"
                        });
                        e.tl.staggerFrom(t.lines, 1.5, {
                            y: 30,
                            ease: Expo.easeOut
                        }, .05, 0).staggerFrom(t.lines, 1.5, {
                            alpha: 0,
                            ease: Power1.easeOut
                        }, .05, 0)
                    } else if ("stagger" === e.animation) {
                        var n = e.el.querySelectorAll(".js-stagger-item");
                        e.tl.staggerFrom(n, 1.5, {
                            y: 30,
                            ease: Expo.easeOut
                        }, .1).staggerFrom(n, 1.5, {
                            alpha: 0,
                            ease: Power1.easeOut
                        }, .1, 0)
                    } else
                        "line" === e.animation ? e.tl.from(e.el, 2, {
                            scaleX: 0,
                            ease: Expo.easeOut
                        }, 0) : e.tl.from(e.el, 1.5, {
                            y: 30,
                            ease: Expo.easeOut
                        }, 0).from(e.el, 1.5, {
                            alpha: 0,
                            ease: Power1.easeOut
                        }, 0);
                    e.tl.progress(1).progress(0)
                }
            }, {
                key: "handler",
                value: function(e) {
                    var t = this;
                    e.forEach(function(e) {
                        if (e.isIntersecting) {
                            var n = t.elems.indexOf(e.target)
                              , i = t.cache[n];
                            i.isIntersected = !0,
                            i.tl.play(),
                            t.stillObserving() ? t.observer.unobserve(e.target) : t.observer.disconnect()
                        }
                    })
                }
            }, {
                key: "stillObserving",
                value: function() {
                    return this.cache.some(function(e) {
                        return !e.isIntersected
                    })
                }
            }, {
                key: "destroy",
                value: function() {
                    this.cache = null,
                    this.observer.disconnect(),
                    this.observer = null,
                    this.elems = null
                }
            }, {
                key: "run",
                value: function() {
                    var e = this;
                    this.cache.forEach(function(t) {
                        e.setAnimation(t),
                        e.observer.observe(t.el)
                    })
                }
            }, {
                key: "init",
                value: function() {
                    this.fixArray(),
                    this.getCache(),
                    this.createObserver(),
                    this.run()
                }
            }]) && B(t.prototype, n),
            i && B(t, i),
            e
        }()
          , V = n(6);
        function F(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var H = function() {
            function e(t) {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                c(this, ["handle"]),
                this.images = t,
                this.options = {
                    root: null,
                    rootMargin: "50% 50% 50% 50%",
                    threshold: [0, 0]
                },
                this.observer = new IntersectionObserver(this.handle,this.options),
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "handle",
                value: function(e, t) {
                    var n = this;
                    e.forEach(function(e) {
                        e.intersectionRatio > 0 && (n.loadImage(e.target),
                        n.observer.unobserve(e.target))
                    })
                }
            }, {
                key: "observe",
                value: function() {
                    var e = this;
                    this.images.forEach(function(t) {
                        e.observer.observe(t)
                    })
                }
            }, {
                key: "loadImage",
                value: function(e) {
                    var t = e.dataset.lazySrc;
                    this.fetchImage(t).then(function() {
                        e.src = t,
                        V.b.from(e, 1.5, {
                            alpha: 0,
                            ease: V.a.easeOut
                        })
                    })
                }
            }, {
                key: "fetchImage",
                value: function(e) {
                    return new Promise(function(t, n) {
                        var i = new Image;
                        i.src = e,
                        i.onload = t,
                        i.onerror = n
                    }
                    )
                }
            }, {
                key: "destroy",
                value: function() {
                    this.observer.disconnect(),
                    this.observer = null,
                    this.images = null
                }
            }, {
                key: "init",
                value: function() {
                    this.observe()
                }
            }]) && F(t.prototype, n),
            i && F(t, i),
            e
        }();
        var U = function(e) {
            return new Promise(function(t, n) {
                var i = new Image;
                i.src = e,
                i.onload = t,
                i.onerror = n
            }
            )
        };
        function W(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var G = function() {
            function e(t) {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                c(this, ["onResize"]),
                this.el = t,
                this.dom = {
                    bullets: this.el.querySelectorAll(".js-bullet"),
                    bulletActive: this.el.querySelector(".js-bullet--active")
                },
                this.cache = null,
                this.offset = 0,
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "getCache",
                value: function() {
                    var e = this;
                    this.cache = [],
                    this.offset = this.el.getBoundingClientRect().left,
                    this.dom.bullets.forEach(function(t) {
                        var n = t.getBoundingClientRect()
                          , i = {
                            el: t,
                            left: n.left - e.offset - n.width
                        };
                        e.cache.push(i)
                    })
                }
            }, {
                key: "animate",
                value: function(e) {
                    var t = this.cache[e];
                    l.a.to(this.dom.bulletActive, 1, {
                        x: t.left,
                        ease: Expo.easeOut
                    })
                }
            }, {
                key: "onResize",
                value: function() {
                    var e = this;
                    this.offset = this.el.getBoundingClientRect().left,
                    this.cache.forEach(function(t) {
                        var n = t.el.getBoundingClientRect();
                        t.left = n.left - e.offset - n.width
                    })
                }
            }, {
                key: "addListeners",
                value: function() {
                    d.on(P.RESIZE, this.onResize)
                }
            }, {
                key: "removeListeners",
                value: function() {
                    d.off(P.RESIZE, this.onResize)
                }
            }, {
                key: "destroy",
                value: function() {
                    this.removeListeners(),
                    this.cache = null
                }
            }, {
                key: "init",
                value: function() {
                    this.getCache(),
                    this.addListeners()
                }
            }]) && W(t.prototype, n),
            i && W(t, i),
            e
        }();
        var X = function() {
            var e = document.querySelectorAll("[data-gl-texture]")
              , t = document.querySelectorAll("[data-gl-slider]");
            e && e.forEach(function(e) {
                var t = e.dataset.glTexture;
                "mp4" === t.split(".").pop() ? e.src = t : U(t).then(function() {
                    e.src = t
                })
            }),
            t && t.forEach(function(e) {
                var t = JSON.parse("[".concat(e.dataset.glSlider, "]"))
                  , n = e.parentNode.querySelector(".js-bullet-nav");
                t.forEach(function(t) {
                    var n = document.createElement("img");
                    U(t).then(function() {
                        n.src = t,
                        e.appendChild(n)
                    })
                }),
                n && n.remove()
            })
        };
        function Z(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function K(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        var Y, J = function() {
            function e(t) {
                var n = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                K(this, "run", function(e) {
                    var t = e.smooth;
                    n.state.current = t,
                    n.animateElems()
                }),
                K(this, "intersectRatio", function(e, t, n, i) {
                    var s, o = t - a.height, r = (a.height + n + e) * i;
                    return s = Math.abs(o / r),
                    {
                        progress: s = Math.max(0, Math.min(1, s))
                    }
                }),
                this.elems = t,
                this.cache = null,
                this.state = {
                    current: 0,
                    threshold: 100,
                    isResizing: !1
                },
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "animateElems",
                value: function() {
                    var e = this;
                    this.cache.forEach(function(t) {
                        var n = t.height
                          , i = t.top
                          , s = t.bottom
                          , o = t.tl
                          , r = t.duration
                          , a = e.isVisible(i, s)
                          , l = a.isVisible
                          , u = a.start
                          , c = a.end;
                        if (l || e.state.isResizing) {
                            var h = e.intersectRatio(n, u, c, r).progress;
                            o.progress(h)
                        }
                    })
                }
            }, {
                key: "isVisible",
                value: function(e, t) {
                    var n = this.state.current
                      , i = e - n
                      , s = t - n
                      , o = i < a.height && s > 0;
                    return {
                        isVisible: o,
                        start: i,
                        end: s
                    }
                }
            }, {
                key: "getCache",
                value: function() {
                    var e = this;
                    this.elems && (this.cache = [],
                    this.elems.forEach(function(t) {
                        var n = t.getBoundingClientRect().top
                          , i = new TimelineLite({
                            paused: !0,
                            immediateRender: !0
                        })
                          , s = JSON.parse(t.dataset.from)
                          , o = JSON.parse(t.dataset.to);
                        i.fromTo(t, 1, s, o),
                        i.progress(1);
                        var r = t.getBoundingClientRect().bottom;
                        i.progress(0),
                        e.cache.push({
                            el: t,
                            tl: i,
                            top: n > a.height ? n : a.height,
                            bottom: r,
                            height: r - n,
                            duration: t.dataset.duration || 1
                        })
                    }))
                }
            }, {
                key: "updateCache",
                value: function() {
                    this.elems.forEach(function(e) {
                        var t = e.getBoundingClientRect()
                          , n = t.top
                          , i = t.bottom
                          , s = a.height.height;
                        Object.assign(e, {
                            top: n > s ? n : s,
                            bottom: i,
                            height: i - n
                        })
                    })
                }
            }, {
                key: "addListeners",
                value: function() {
                    d.on(R.TICK, this.run),
                    d.on(P.RESIZE, this.onResize)
                }
            }, {
                key: "removeListeners",
                value: function() {
                    d.off(R.TICK, this.run),
                    d.off(P.RESIZE, this.onResize)
                }
            }, {
                key: "onResize",
                value: function() {
                    this.state.isResizing = !0,
                    this.updateCache(),
                    this.state.isResizing = !1
                }
            }, {
                key: "destroy",
                value: function() {
                    this.removeListeners(),
                    this.cache = null,
                    this.elems = null,
                    this.state = null
                }
            }, {
                key: "init",
                value: function() {
                    this.getCache(),
                    this.addListeners()
                }
            }]) && Z(t.prototype, n),
            i && Z(t, i),
            e
        }();
        function $(e) {
            return ($ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Q(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function ee(e, t) {
            return !t || "object" !== $(t) && "function" != typeof t ? function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function te(e) {
            return (te = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function ne(e, t) {
            return (ne = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        var ie = function(e) {
            function t() {
                return function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                ee(this, te(t).apply(this, arguments))
            }
            var n, i, o;
            return function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && ne(e, t)
            }(t, s.a.Renderer),
            n = t,
            (i = [{
                key: "onEnter",
                value: function() {
                    this.el = document.querySelector('[data-router-view="'.concat(this.properties.slug, '"]')),
                    a.isDevice && X()
                }
            }, {
                key: "onLeave",
                value: function() {}
            }, {
                key: "onEnterCompleted",
                value: function() {
                    this.initGlTextures(),
                    a.isDevice || (this.initSmooth(),
                    this.initParallax()),
                    this.scrollAnis = new z,
                    this.initLazyLoad()
                }
            }, {
                key: "onLeaveCompleted",
                value: function() {
                    this.lazyLoad && this.lazyLoad.destroy(),
                    this.scrollAnis && this.scrollAnis.destroy(),
                    a.isDevice || (Y && Y.destroy(),
                    Ut && Ut.deleteTextures(),
                    this.parallax && this.parallax.destroy())
                }
            }, {
                key: "initGlTextures",
                value: function() {
                    a.isDevice || (Ut.getTextureInfo(),
                    Ut.getSliderInfo())
                }
            }, {
                key: "initLazyLoad",
                value: function() {
                    var e = document.querySelectorAll("[data-lazy-src]");
                    e && (this.lazyLoad = new H(e))
                }
            }, {
                key: "initSmooth",
                value: function() {
                    _.update(),
                    Y = new M
                }
            }, {
                key: "initParallax",
                value: function() {
                    var e = document.querySelectorAll("[data-from]");
                    e && (this.parallax = new J(e))
                }
            }]) && Q(n.prototype, i),
            o && Q(n, o),
            t
        }();
        function se(e) {
            return (se = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function oe(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function re(e, t) {
            return !t || "object" !== se(t) && "function" != typeof t ? function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function ae(e, t, n) {
            return (ae = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
                var i = function(e, t) {
                    for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = le(e)); )
                        ;
                    return e
                }(e, t);
                if (i) {
                    var s = Object.getOwnPropertyDescriptor(i, t);
                    return s.get ? s.get.call(n) : s.value
                }
            }
            )(e, t, n || e)
        }
        function le(e) {
            return (le = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function ue(e, t) {
            return (ue = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        var ce = function(e) {
            function t() {
                return function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                re(this, le(t).apply(this, arguments))
            }
            var n, i, s;
            return function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && ue(e, t)
            }(t, ie),
            n = t,
            (i = [{
                key: "onEnter",
                value: function() {
                    ae(le(t.prototype), "onEnter", this).call(this)
                }
            }, {
                key: "onLeave",
                value: function() {
                    ae(le(t.prototype), "onLeave", this).call(this)
                }
            }, {
                key: "onEnterCompleted",
                value: function() {
                    ae(le(t.prototype), "onEnterCompleted", this).call(this)
                }
            }, {
                key: "onLeaveCompleted",
                value: function() {
                    ae(le(t.prototype), "onLeaveCompleted", this).call(this)
                }
            }]) && oe(n.prototype, i),
            s && oe(n, s),
            t
        }();
        function he(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function fe(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        var de = function() {
            function e() {
                var t = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                fe(this, "mouseMove", function(n) {
                    var i = t.getPos(n)
                      , s = i.x
                      , o = i.y
                      , r = i.target;
                    d.emit(e.events.MOVE, {
                        x: s,
                        y: o,
                        target: r,
                        e: n
                    })
                }),
                fe(this, "mouseDown", function(n) {
                    var i = t.getPos(n)
                      , s = i.x
                      , o = i.y
                      , r = i.target;
                    t.on = s,
                    d.emit(e.events.DOWN, {
                        x: s,
                        y: o,
                        target: r
                    })
                }),
                fe(this, "mouseUp", function(n) {
                    var i = t.getPos(n)
                      , s = i.x
                      , o = i.target;
                    t.off = s;
                    var r = Math.abs(t.on - t.off) > 10;
                    d.emit(e.events.UP, {
                        x: s,
                        target: o,
                        isClick: r
                    })
                }),
                this.on = 0,
                this.off = 0,
                this.events = {
                    move: r.a.isDevice ? "touchmove" : "mousemove",
                    down: r.a.isDevice ? "touchstart" : "mousedown",
                    up: r.a.isDevice ? "touchend" : "mouseup"
                },
                this.addListeners()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "addListeners",
                value: function() {
                    var e = this.events
                      , t = e.move
                      , n = e.down
                      , i = e.up;
                    window.addEventListener(t, this.mouseMove, {
                        passive: !1
                    }),
                    window.addEventListener(n, this.mouseDown),
                    window.addEventListener(i, this.mouseUp)
                }
            }, {
                key: "getPos",
                value: function(e) {
                    return {
                        x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                        y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY,
                        target: e.target
                    }
                }
            }]) && he(t.prototype, n),
            i && he(t, i),
            e
        }();
        de.events = {
            MOVE: "GlobalMouse.events.MOVE",
            DOWN: "GlobalMouse.events.DOWN",
            UP: "GlobalMouse.events.UP",
            ENTER: "GlobalMouse.events.ENTER"
        };
        new de;
        var pe = de.events;
        function ye(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function ve(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        var ge = function() {
            function e() {
                var t = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                ve(this, "run", function() {
                    if (t.state.hover) {
                        t.mouse.last.x += .2 * (t.mouse.x - t.mouse.last.x),
                        t.mouse.last.y += .2 * (t.mouse.y - t.mouse.last.y);
                        var e = 2 * t.mouse.last.x
                          , n = 2 * t.mouse.last.y
                          , i = e - .675 * t.arc.radius
                          , s = n - .05 * t.arc.radius
                          , o = .3 * t.arc.radius
                          , r = o;
                        t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height),
                        t.ctx.globalAlpha = t.arc.opacity,
                        t.ctx.beginPath(),
                        t.ctx.arc(Math.round(e), Math.round(n), t.arc.radius - 2 * t.arc.lineWidth, t.arc.angle.start * Math.PI, t.arc.angle.end * Math.PI),
                        t.ctx.lineWidth = t.arc.lineWidth,
                        t.ctx.strokeStyle = "rgba(254, 53, 1, 1.0)",
                        t.ctx.stroke(),
                        t.ctx.closePath(),
                        t.ctx.font = "900 ".concat(o, "px gt-america"),
                        t.ctx.fillStyle = "rgba(254, 53, 1, ".concat(t.text.opacity, ")"),
                        "drag" === t.state.type ? (t.ctx.fillText(t.text.strOne, Math.round(i), Math.round(s)),
                        t.ctx.fillText(t.text.strTwo, Math.round(i), Math.round(s + r))) : "video" === t.state.type ? (t.ctx.textAlign = "center",
                        t.ctx.textBaseline = "middle",
                        t.ctx.fillText(a.videoState, Math.round(e), Math.round(n))) : "next" === t.state.type && (t.ctx.textAlign = "center",
                        t.ctx.textBaseline = "middle",
                        t.ctx.fillText("CLICK", Math.round(e), Math.round(n)))
                    }
                }),
                ve(this, "onResize", function() {
                    t.setBounds(),
                    t.run()
                }),
                ve(this, "onPress", function() {
                    l.a.to(t.arc, .75, {
                        radius: .4 * t.bounds.radius,
                        ease: Expo.easeOut
                    }),
                    l.a.to(t.text, .25, {
                        opacity: 0,
                        ease: Expo.easeOut
                    })
                }),
                ve(this, "onRelease", function() {
                    l.a.to(t.arc, 1, {
                        radius: t.bounds.radius,
                        ease: Elastic.easeOut
                    }),
                    l.a.to(t.text, 1, {
                        opacity: 1,
                        ease: Expo.easeOut
                    })
                }),
                ve(this, "onEnter", function(e) {
                    t.state.hover = !0,
                    t.state.type = e.srcElement.dataset.cursor,
                    t.mouse.last.x = t.mouse.x,
                    t.mouse.last.y = t.mouse.y,
                    l.a.to(t.arc, 1, {
                        opacity: 1,
                        end: 3.5,
                        start: 1.5,
                        ease: Expo.easeOut
                    }),
                    l.a.to(t.arc.angle, 1, {
                        end: 3.5,
                        start: 1.5,
                        ease: Power3.easeOut
                    })
                }),
                ve(this, "onLeave", function() {
                    l.a.to(t.arc, 1, {
                        opacity: 0,
                        ease: Expo.easeOut,
                        onComplete: function() {
                            t.state.hover = !1
                        }
                    }),
                    l.a.to(t.arc.angle, 1, {
                        end: -.5,
                        start: -.5,
                        ease: Power3.easeOut
                    })
                }),
                ve(this, "getPos", function(e) {
                    var n = e.x
                      , i = e.y;
                    t.mouse.x = n,
                    t.mouse.y = i
                }),
                ve(this, "onResize", function() {
                    t.setBounds(),
                    t.bounds.radius = .065 * a.height
                }),
                a.isDevice || (this.canvas = document.querySelector("#cursor"),
                this.ctx = this.canvas.getContext("2d"),
                this.targets = document.querySelectorAll("[data-cursor]"),
                this.bounds = {
                    radius: .065 * a.width
                },
                this.arc = {
                    radius: this.bounds.radius,
                    opacity: 1,
                    lineWidth: 5,
                    angle: {
                        start: -.5,
                        end: -.5
                    }
                },
                this.text = {
                    size: .25 * this.bounds.radius,
                    strOne: "HOLD",
                    strTwo: "& DRAG",
                    opacity: 1
                },
                this.mouse = {
                    x: 0,
                    y: 0,
                    last: {
                        x: 0,
                        y: 0
                    }
                },
                this.state = {
                    hover: !1,
                    type: null
                },
                this.init())
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "setBounds",
                value: function() {
                    this.canvas.style.height = "".concat(a.height, "px"),
                    this.canvas.style.width = "".concat(a.width, "px"),
                    this.canvas.height = 2 * a.height,
                    this.canvas.width = 2 * a.width,
                    this.bounds.height = this.canvas.height,
                    this.bounds.width = this.canvas.width
                }
            }, {
                key: "addListeners",
                value: function() {
                    var e = this;
                    d.on(R.TICK, this.run),
                    d.on(pe.MOVE, this.getPos),
                    d.on(pe.DOWN, this.onPress),
                    d.on(pe.UP, this.onRelease),
                    d.on(P.RESIZE, this.onResize),
                    this.targets.forEach(function(t) {
                        t.addEventListener("mouseenter", e.onEnter),
                        t.addEventListener("mouseleave", e.onLeave)
                    })
                }
            }, {
                key: "removeListeners",
                value: function() {
                    var e = this;
                    d.off(R.TICK, this.run),
                    d.off(pe.MOVE, this.getPos),
                    d.off(pe.DOWN, this.onPress),
                    d.off(pe.UP, this.onRelease),
                    d.off(P.RESIZE, this.onResize),
                    this.targets.forEach(function(t) {
                        t.removeEventListener("mouseenter", e.onEnter),
                        t.removeEventListener("mouseleave", e.onLeave)
                    })
                }
            }, {
                key: "destroy",
                value: function() {
                    this.removeListeners(),
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height),
                    this.ctx = null,
                    this.canvas = null,
                    this.targets = null
                }
            }, {
                key: "init",
                value: function() {
                    this.setBounds(),
                    this.addListeners()
                }
            }]) && ye(t.prototype, n),
            i && ye(t, i),
            e
        }()
          , me = n(20)
          , be = n.n(me);
        function we(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var xe = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                c(this, ["setPos", "run", "on", "off", "onClick", "onResize"]),
                this.options = t,
                this.el = this.options.el,
                a.isSmall && this.options.disableMobile || (this.dom = {
                    draggable: this.options.draggableEl || this.el,
                    inner: this.options.innerClass ? this.el.querySelector(".".concat(this.options.innerClass)) : null,
                    slides: this.el.querySelectorAll(".".concat(this.options.slideClass)),
                    content: this.options.contentClass ? this.el.querySelectorAll(".".concat(this.options.contentClass)) : null,
                    progress: this.el.querySelector(".js-progress"),
                    nav: {
                        prev: this.el.parentNode.querySelector(".js-prev"),
                        next: this.el.parentNode.querySelector(".js-next")
                    }
                },
                l.a.set(this.dom.slides, {
                    rotation: .01,
                    force3D: !0
                }),
                this.opts = {
                    ease: this.options.ease || .1,
                    speed: a.isDevice ? 2.5 : 1.5,
                    threshold: this.options.threshold || 100,
                    centerMobile: this.options.centerMobile || !1,
                    centerDesktop: this.options.centerDesktop || !1,
                    alignLeft: this.options.alignLeft || !1,
                    bullets: this.options.bullets || !1,
                    spammable: this.options.spammable || !1,
                    clickable: this.options.clickable || !1
                },
                this.data = {
                    total: this.dom.slides.length - 1,
                    on: {
                        x: 0,
                        y: 0
                    },
                    off: 0,
                    current: 0,
                    target: 0,
                    slide: {
                        last: 0,
                        current: 0
                    }
                },
                this.bounds = {
                    rect: 0,
                    max: 0,
                    min: 0,
                    snap: null
                },
                this.state = {
                    resizing: !1,
                    dragging: !1,
                    snapping: !1,
                    animating: !1
                },
                this.tl = {
                    press: null,
                    release: null
                },
                this.init())
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "getCache",
                value: function() {
                    var e = this;
                    this.cache = [],
                    this.dom.slides.forEach(function(t, n) {
                        var i = t.getBoundingClientRect();
                        e.cache.push({
                            el: t,
                            left: i.left,
                            right: i.right,
                            width: i.width,
                            out: !1
                        })
                    })
                }
            }, {
                key: "setBounds",
                value: function() {
                    var e = this;
                    this.bounds.snap = [],
                    this.bounds.rect = this.el.getBoundingClientRect(),
                    a.isSmall && this.opts.centerMobile || !a.isSmall && this.opts.centerDesktop ? this.bounds.diff = this.bounds.rect.width / 2 + this.bounds.rect.left : this.bounds.diff = this.bounds.rect.left,
                    this.bounds.min = this.bounds.diff,
                    this.cache.forEach(function(t, n) {
                        e.bounds.snap.push(-t.left + e.bounds.diff),
                        n == e.data.total && (e.bounds.max = -(e.opts.alignLeft ? t.left : t.right - e.bounds.rect.right + e.bounds.diff))
                    })
                }
            }, {
                key: "setPos",
                value: function(e) {
                    var t = e.x
                      , n = e.y
                      , i = e.e;
                    if (this.state.dragging) {
                        var s = this.data
                          , o = s.off
                          , r = s.on
                          , a = t - r.x
                          , l = n - r.y;
                        Math.abs(a) > Math.abs(l) && i.cancelable && (i.preventDefault(),
                        i.stopPropagation()),
                        this.data.target = o + a * this.opts.speed,
                        this.clampTarget()
                    }
                }
            }, {
                key: "clampTarget",
                value: function() {
                    var e = this.bounds
                      , t = e.min
                      , n = e.max;
                    this.data.target = Math.max(Math.min(this.data.target, t), n)
                }
            }, {
                key: "run",
                value: function() {
                    var e = this.data
                      , t = e.target
                      , n = e.current;
                    this.data.current += (t - n) * this.opts.ease,
                    this.transformSlides(),
                    this.progress()
                }
            }, {
                key: "transformSlides",
                value: function() {
                    var e = this
                      , t = "translate3d(".concat(this.data.current.toFixed(2), "px, 0, 0)");
                    this.cache.forEach(function(n, i) {
                        e.isVisible(n).isVisible || e.state.resizing ? (n.out = !1,
                        n.el.style.transform = t) : n.out || (n.out = !0,
                        n.el.style.transform = t)
                    })
                }
            }, {
                key: "progress",
                value: function() {
                    var e = this.dom.progress;
                    if (e) {
                        var t = this.bounds
                          , n = t.max
                          , i = t.diff
                          , s = u(this.data.current, 0, n + i);
                        s = Math.max(Math.min(s, 1), 0),
                        e.style.transform = "scaleX(".concat(s, ")")
                    }
                }
            }, {
                key: "on",
                value: function(e) {
                    var t = e.x
                      , n = e.y
                      , i = e.target;
                    if (this.dom.draggable.contains(i)) {
                        var s = this.data.on;
                        this.state.dragging = !0,
                        s.x = t,
                        s.y = n,
                        this.dom.content && this.onPress(),
                        this.el.classList.add("is-grabbing")
                    }
                }
            }, {
                key: "off",
                value: function(e) {
                    var t = e.isClick
                      , n = e.target;
                    if (this.state.dragging) {
                        if (!t && this.opts.clickable) {
                            var i = n.classList.contains("".concat(this.options.slideClass)) ? n : n.closest(".".concat(this.options.slideClass));
                            Ht.redirect(i.dataset.url)
                        }
                        this.snap(),
                        this.bullets && this.bullets.animate(this.data.slide.current),
                        this.dom.content && this.onRelease(),
                        this.state.dragging = !1,
                        this.data.off = this.data.target,
                        this.el.classList.remove("is-grabbing")
                    }
                }
            }, {
                key: "isVisible",
                value: function(e) {
                    var t = e.left
                      , n = e.right
                      , i = this.data.current
                      , s = this.opts.threshold
                      , o = n + i
                      , r = t + i < s + a.width && o > -s;
                    return {
                        isVisible: r
                    }
                }
            }, {
                key: "onPress",
                value: function() {
                    l.a.to(this.dom.content[this.data.slide.current], .35, {
                        autoAlpha: 0,
                        ease: Power1.easeOut
                    })
                }
            }, {
                key: "onRelease",
                value: function() {
                    var e = this
                      , t = this.data.slide
                      , n = t.last
                      , i = t.current;
                    if (n === i)
                        l.a.to(this.dom.content[n], .5, {
                            autoAlpha: 1,
                            ease: Power1.easeOut
                        });
                    else {
                        this.state.animating = !0;
                        var s = this.dom.content[i]
                          , o = s.querySelectorAll(".".concat(this.options.contentClass, "__item"))
                          , r = s.querySelector(".".concat(this.options.contentClass, "__icon"));
                        this.tl.release && this.tl.release.kill(),
                        this.tl.release = new TimelineLite({
                            onComplete: function() {
                                e.state.animating = !1
                            }
                        }),
                        this.tl.release.set(s, {
                            autoAlpha: 1
                        }).staggerFromTo(o, .85, {
                            y: 60,
                            alpha: 0
                        }, {
                            y: 0,
                            alpha: 1,
                            ease: Expo.easeOut
                        }, .1, .5).fromTo(r, 1, {
                            y: 60,
                            x: -60,
                            alpha: 0
                        }, {
                            y: 0,
                            x: 0,
                            alpha: 1,
                            ease: Expo.easeOut
                        }, .7)
                    }
                }
            }, {
                key: "getClosest",
                value: function() {
                    this.data.slide.current = be.a.number(this.data.target, this.bounds.snap),
                    this.bounds.snap.offset = this.bounds.snap[this.data.slide.current],
                    (a.isSmall && this.opts.centerMobile || !a.isSmall && this.opts.centerDesktop) && (this.bounds.snap.offset = this.bounds.snap.offset - this.cache[this.data.slide.current].width / 2)
                }
            }, {
                key: "snap",
                value: function() {
                    this.data.slide.last = this.data.slide.current,
                    this.getClosest(),
                    this.data.target = this.bounds.snap.offset,
                    this.clampTarget()
                }
            }, {
                key: "onClickWithContent",
                value: function(e) {
                    var t = this;
                    if (!this.state.animating) {
                        this.state.animating = !0,
                        this.data.slide.last = this.data.slide.current,
                        "next" === e ? this.data.slide.current = this.data.slide.current === this.data.total ? 0 : this.data.slide.current + 1 : "prev" === e && (this.data.slide.current = 0 === this.data.slide.current ? this.data.total : this.data.slide.current - 1);
                        var n = this.dom.content;
                        if (n) {
                            var i = n[this.data.slide.current]
                              , s = i.querySelectorAll(".".concat(this.options.contentClass, "__item"))
                              , o = i.querySelector(".".concat(this.options.contentClass, "__icon"));
                            this.tl.release && this.tl.release.kill(),
                            this.tl.release = new TimelineLite({
                                onComplete: function() {
                                    t.state.animating = !1
                                }
                            }),
                            this.tl.release.to(n[this.data.slide.last], .35, {
                                autoAlpha: 0,
                                ease: Power1.easeOut
                            }).set(i, {
                                autoAlpha: 1
                            }).staggerFromTo(s, .85, {
                                y: 60,
                                alpha: 0
                            }, {
                                y: 0,
                                alpha: 1,
                                ease: Expo.easeOut
                            }, .1, .5).fromTo(o, 1, {
                                y: 60,
                                x: -60,
                                alpha: 0
                            }, {
                                y: 0,
                                x: 0,
                                alpha: 1,
                                ease: Expo.easeOut
                            }, .7)
                        }
                        a.isSmall && this.opts.centerMobile || !a.isSmall && this.opts.centerDesktop ? this.bounds.snap.offset = this.bounds.snap.offset - this.cache[this.data.slide.current].width / 2 : this.bounds.snap.offset = this.bounds.snap[this.data.slide.current],
                        this.bullets && this.bullets.animate(this.data.slide.current),
                        this.data.target = this.bounds.snap.offset,
                        this.data.off = this.data.target,
                        this.clampTarget()
                    }
                }
            }, {
                key: "onClick",
                value: function(e) {
                    if (this.data.slide.last = this.data.slide.current,
                    "next" === e) {
                        if (this.data.slide.current === this.data.total)
                            return;
                        this.data.slide.current = this.data.slide.current + 1
                    } else if ("prev" === e) {
                        if (0 === this.data.slide.current)
                            return;
                        this.data.slide.current = this.data.slide.current - 1
                    }
                    a.isSmall && this.opts.centerMobile || !a.isSmall && this.opts.centerDesktop ? this.bounds.snap.offset = this.bounds.snap.offset - this.cache[this.data.slide.current].width / 2 : this.bounds.snap.offset = this.bounds.snap[this.data.slide.current],
                    this.bullets && this.bullets.animate(this.data.slide.current),
                    this.data.target = this.bounds.snap.offset,
                    this.data.off = this.data.target,
                    this.clampTarget(),
                    this.snap()
                }
            }, {
                key: "addClasses",
                value: function() {
                    this.el.classList.add("is-draggable")
                }
            }, {
                key: "addEvents",
                value: function() {
                    var e = this
                      , t = this.dom.nav
                      , n = t.prev
                      , i = t.next;
                    d.on(R.TICK, this.run),
                    d.on(pe.DOWN, this.on),
                    d.on(pe.MOVE, this.setPos),
                    d.on(pe.UP, this.off),
                    d.on(P.RESIZE, this.onResize),
                    n && n.addEventListener("click", function() {
                        e.opts.spammable ? e.onClick("prev") : e.onClickWithContent("prev")
                    }),
                    i && i.addEventListener("click", function() {
                        e.opts.spammable ? e.onClick("next") : e.onClickWithContent("next")
                    })
                }
            }, {
                key: "removeEvents",
                value: function() {
                    d.off(R.TICK, this.run),
                    d.off(pe.DOWN, this.on),
                    d.off(pe.MOVE, this.setPos),
                    d.off(pe.UP, this.off),
                    d.off(P.RESIZE, this.onResize)
                }
            }, {
                key: "updateCache",
                value: function() {
                    this.cache.forEach(function(e) {
                        e.el.style.transform = "";
                        var t = e.el.getBoundingClientRect();
                        e.left = t.left,
                        e.right = t.right,
                        e.width = t.width
                    })
                }
            }, {
                key: "onResize",
                value: function() {
                    this.state.resizing = !0,
                    this.clampTarget(),
                    this.updateCache(),
                    this.setBounds(),
                    this.transformSlides(),
                    this.snap(),
                    this.state.resizing = !1
                }
            }, {
                key: "destroy",
                value: function() {
                    this.removeEvents(),
                    this.dom = null,
                    this.data = null,
                    this.bounds = null,
                    this.state = null
                }
            }, {
                key: "init",
                value: function() {
                    if (this.getCache(),
                    this.setBounds(),
                    this.addEvents(),
                    this.addClasses(),
                    this.opts.bullets) {
                        var e = this.el.querySelector(".js-bullet-nav");
                        this.bullets = new G(e)
                    }
                }
            }]) && we(t.prototype, n),
            i && we(t, i),
            e
        }();
        function Oe(e) {
            return (Oe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Se(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function ke(e, t) {
            return !t || "object" !== Oe(t) && "function" != typeof t ? function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function Ee(e, t, n) {
            return (Ee = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
                var i = function(e, t) {
                    for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Te(e)); )
                        ;
                    return e
                }(e, t);
                if (i) {
                    var s = Object.getOwnPropertyDescriptor(i, t);
                    return s.get ? s.get.call(n) : s.value
                }
            }
            )(e, t, n || e)
        }
        function Te(e) {
            return (Te = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function Pe(e, t) {
            return (Pe = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        var Ce = function(e) {
            function t() {
                return function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                ke(this, Te(t).apply(this, arguments))
            }
            var n, i, s;
            return function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && Pe(e, t)
            }(t, ie),
            n = t,
            (i = [{
                key: "onEnter",
                value: function() {
                    Ee(Te(t.prototype), "onEnter", this).call(this),
                    this.featured = new xe({
                        el: document.querySelector(".js-fs"),
                        draggableEl: document.querySelector(".js-fs__inner"),
                        ease: .085,
                        alignLeft: !0,
                        innerClass: "js-fs__inner",
                        slideClass: "js-fs-slide",
                        contentClass: "js-fs-content",
                        bullets: !0,
                        clickable: !0
                    }),
                    this.recognition = new xe({
                        el: document.querySelector(".js-rec"),
                        slideClass: "js-rec-item"
                    })
                }
            }, {
                key: "onLeave",
                value: function() {
                    Ee(Te(t.prototype), "onLeave", this).call(this),
                    this.featured.destroy(),
                    this.recognition.destroy()
                }
            }, {
                key: "onEnterCompleted",
                value: function() {
                    Ee(Te(t.prototype), "onEnterCompleted", this).call(this),
                    a.isDevice || (this.cursor = new ge)
                }
            }, {
                key: "onLeaveCompleted",
                value: function() {
                    Ee(Te(t.prototype), "onLeaveCompleted", this).call(this),
                    this.cursor && !a.isDevice && this.cursor.destroy()
                }
            }]) && Se(n.prototype, i),
            s && Se(n, s),
            t
        }();
        function Le(e) {
            return (Le = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function je(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function _e(e, t) {
            return !t || "object" !== Le(t) && "function" != typeof t ? function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function Re(e, t, n) {
            return (Re = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
                var i = function(e, t) {
                    for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = Ie(e)); )
                        ;
                    return e
                }(e, t);
                if (i) {
                    var s = Object.getOwnPropertyDescriptor(i, t);
                    return s.get ? s.get.call(n) : s.value
                }
            }
            )(e, t, n || e)
        }
        function Ie(e) {
            return (Ie = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function Ae(e, t) {
            return (Ae = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        var Me = function(e) {
            function t() {
                return function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                _e(this, Ie(t).apply(this, arguments))
            }
            var n, i, s;
            return function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && Ae(e, t)
            }(t, ie),
            n = t,
            (i = [{
                key: "onEnter",
                value: function() {
                    Re(Ie(t.prototype), "onEnter", this).call(this)
                }
            }, {
                key: "onLeave",
                value: function() {
                    Re(Ie(t.prototype), "onLeave", this).call(this)
                }
            }, {
                key: "onEnterCompleted",
                value: function() {
                    Re(Ie(t.prototype), "onEnterCompleted", this).call(this)
                }
            }, {
                key: "onLeaveCompleted",
                value: function() {
                    Re(Ie(t.prototype), "onLeaveCompleted", this).call(this)
                }
            }]) && je(n.prototype, i),
            s && je(n, s),
            t
        }();
        function Ne(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var De = function() {
            function e() {
                var t, n, i, s = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                i = function() {
                    s.tl.restart()
                }
                ,
                (n = "onEnter")in (t = this) ? Object.defineProperty(t, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[n] = i,
                this.el = document.querySelector(".js-next"),
                this.icon = this.el.querySelector(".js-next__icon"),
                this.tl = new TimelineLite({
                    paused: !0,
                    immediateRender: !0
                }),
                this.tl.fromTo(this.icon, .35, {
                    yPercent: 0,
                    xPercent: 0,
                    alpha: 1
                }, {
                    yPercent: -50,
                    xPercent: 50,
                    alpha: 0,
                    ease: Expo.easeOut
                }).fromTo(this.icon, .75, {
                    alpha: 0,
                    yPercent: 100,
                    xPercent: -100
                }, {
                    alpha: 1,
                    yPercent: 0,
                    xPercent: 0,
                    ease: Expo.easeOut
                }),
                this.tl.progress(1).progress(0),
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "addListeners",
                value: function() {
                    this.el.addEventListener("mouseenter", this.onEnter)
                }
            }, {
                key: "removeListeners",
                value: function() {
                    this.el.removeEventListener("mouseenter", this.onEnter)
                }
            }, {
                key: "destroy",
                value: function() {
                    this.removeListeners(),
                    this.el = null,
                    this.icons = null
                }
            }, {
                key: "init",
                value: function() {
                    this.addListeners()
                }
            }]) && Ne(t.prototype, n),
            i && Ne(t, i),
            e
        }()
          , qe = n(15);
        function Be(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var ze = function() {
            function e(t) {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.el = t,
                this.ui = {
                    cover: this.el.querySelector(".js-cs-video__cover")
                },
                this.id = this.el.id,
                this.player = null,
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "createPlayer",
                value: function() {
                    var e = this
                      , t = {
                        id: this.id,
                        autoplay: !0
                    };
                    this.player = new qe.a(this.id,t),
                    this.player.ready().then(function() {
                        e.coverOut()
                    })
                }
            }, {
                key: "onClick",
                value: function() {
                    this.createPlayer(this.id)
                }
            }, {
                key: "coverOut",
                value: function() {
                    var e = this.ui.cover;
                    l.a.to(e, .65, {
                        autoAlpha: 0,
                        ease: Power1.easeOut,
                        onComplete: function() {
                            e.remove()
                        }
                    })
                }
            }, {
                key: "addListeners",
                value: function() {
                    var e = this;
                    this.el.addEventListener("click", function() {
                        e.player || e.onClick()
                    })
                }
            }, {
                key: "init",
                value: function() {
                    this.addListeners()
                }
            }]) && Be(t.prototype, n),
            i && Be(t, i),
            e
        }();
        function Ve(e) {
            return (Ve = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Fe(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function He(e, t) {
            return !t || "object" !== Ve(t) && "function" != typeof t ? function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function Ue(e, t, n) {
            return (Ue = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
                var i = function(e, t) {
                    for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = We(e)); )
                        ;
                    return e
                }(e, t);
                if (i) {
                    var s = Object.getOwnPropertyDescriptor(i, t);
                    return s.get ? s.get.call(n) : s.value
                }
            }
            )(e, t, n || e)
        }
        function We(e) {
            return (We = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function Ge(e, t) {
            return (Ge = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        var Xe = function(e) {
            function t() {
                return function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                He(this, We(t).apply(this, arguments))
            }
            var n, i, s;
            return function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && Ge(e, t)
            }(t, ie),
            n = t,
            (i = [{
                key: "onEnter",
                value: function() {
                    Ue(We(t.prototype), "onEnter", this).call(this)
                }
            }, {
                key: "onLeave",
                value: function() {
                    Ue(We(t.prototype), "onLeave", this).call(this),
                    this.next && this.next.destroy(),
                    this.cursor && !a.isDevice && this.cursor.destroy()
                }
            }, {
                key: "onEnterCompleted",
                value: function() {
                    Ue(We(t.prototype), "onEnterCompleted", this).call(this),
                    this.initVideoBlocks(),
                    this.next = new De,
                    a.isDevice || (this.cursor = new ge)
                }
            }, {
                key: "onLeaveCompleted",
                value: function() {
                    Ue(We(t.prototype), "onLeaveCompleted", this).call(this)
                }
            }, {
                key: "initVideoBlocks",
                value: function() {
                    var e = document.querySelectorAll(".js-cs-video");
                    e && e.forEach(function(e) {
                        return new ze(e)
                    })
                }
            }]) && Fe(n.prototype, i),
            s && Fe(n, s),
            t
        }();
        function Ze(e) {
            return (Ze = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function Ke(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function Ye(e, t) {
            return !t || "object" !== Ze(t) && "function" != typeof t ? function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function Je(e, t, n) {
            return (Je = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
                var i = function(e, t) {
                    for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = $e(e)); )
                        ;
                    return e
                }(e, t);
                if (i) {
                    var s = Object.getOwnPropertyDescriptor(i, t);
                    return s.get ? s.get.call(n) : s.value
                }
            }
            )(e, t, n || e)
        }
        function $e(e) {
            return ($e = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function Qe(e, t) {
            return (Qe = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        var et = function(e) {
            function t() {
                return function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                Ye(this, $e(t).apply(this, arguments))
            }
            var n, i, s;
            return function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && Qe(e, t)
            }(t, ie),
            n = t,
            (i = [{
                key: "onEnter",
                value: function() {
                    Je($e(t.prototype), "onEnter", this).call(this)
                }
            }, {
                key: "onLeave",
                value: function() {
                    Je($e(t.prototype), "onLeave", this).call(this)
                }
            }, {
                key: "onEnterCompleted",
                value: function() {
                    Je($e(t.prototype), "onEnterCompleted", this).call(this)
                }
            }, {
                key: "onLeaveCompleted",
                value: function() {
                    Je($e(t.prototype), "onLeaveCompleted", this).call(this)
                }
            }]) && Ke(n.prototype, i),
            s && Ke(n, s),
            t
        }();
        function tt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var nt = function() {
            function e() {
                var t, n, i, s = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                i = function(e) {
                    var t = e.target;
                    if (!e.isClick) {
                        var n = t.classList.contains(".js-show-slide") ? t : t.closest(".js-show-slide");
                        n && (_.scrollTo("show"),
                        s.state.lastSlug = s.state.currentSlug,
                        s.state.currentSlug = n.id,
                        s.state.isOpen ? s.toggleShows() : (s.openShow(),
                        s.state.isOpen = !0))
                    }
                }
                ,
                (n = "open")in (t = this) ? Object.defineProperty(t, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[n] = i,
                this.el = document.querySelector(".js-show"),
                this.dom = {
                    shows: document.querySelector(".js-shows-slider"),
                    episodes: this.el.querySelectorAll(".js-episode-slide"),
                    titles: this.el.querySelector(".js-episodes__show-title"),
                    slider: this.el.querySelector(".js-episodes-slider")
                },
                this.state = {
                    currentSlug: null,
                    lastSlug: null,
                    currentNodes: null,
                    isOpen: !1
                },
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "openShow",
                value: function() {
                    var e = this.dom
                      , t = (e.episodes,
                    e.titles,
                    this.state.currentSlug)
                      , n = this.el.querySelector('[data-title-show="'.concat(t, '"]'));
                    l.a.set(this.el, {
                        height: "auto"
                    }),
                    l.a.from(this.el, 1, {
                        height: 0,
                        ease: Expo.easeInOut,
                        onComplete: function() {
                            a.isDevice || (_.setMaxHeight(),
                            Y.onResize())
                        }
                    }),
                    l.a.set(n, {
                        autoAlpha: 1
                    }),
                    this.addNodes(),
                    this.initEpisodeSlider()
                }
            }, {
                key: "toggleShows",
                value: function() {
                    var e = this
                      , t = this.state
                      , n = t.currentSlug
                      , i = t.lastSlug
                      , s = t.currentNodes
                      , o = this.el.querySelector('[data-title-show="'.concat(i, '"]'))
                      , r = this.el.querySelector('[data-title-show="'.concat(n, '"]'));
                    (new TimelineLite).set(r, {
                        autoAlpha: 1
                    }).to(o, .5, {
                        yPercent: -100,
                        ease: Power1.easeOut
                    }).fromTo(r, 1, {
                        yPercent: 100
                    }, {
                        yPercent: 0,
                        ease: Expo.easeOut
                    }).set(o, {
                        autoAlpha: 0
                    }),
                    l.a.staggerTo(s, .5, {
                        alpha: 0,
                        ease: Power1.easeOut
                    }, .1, function() {
                        e.removeEpisodeSlider(),
                        e.removeCurrentNodes(),
                        e.addNodes(),
                        l.a.staggerFromTo(e.state.currentNodes, .5, {
                            alpha: 0
                        }, {
                            alpha: 1,
                            ease: Power1.easeOut
                        }, .1, function() {
                            e.initEpisodeSlider()
                        })
                    })
                }
            }, {
                key: "removeInitialNodes",
                value: function() {
                    this.dom.episodes.forEach(function(e) {
                        e.remove()
                    })
                }
            }, {
                key: "removeCurrentNodes",
                value: function() {
                    this.state.currentNodes.forEach(function(e) {
                        e.remove()
                    })
                }
            }, {
                key: "addNodes",
                value: function() {
                    var e = this;
                    this.state.currentNodes = null,
                    this.state.currentNodes = [],
                    this.dom.episodes.forEach(function(t) {
                        t.dataset.episodeShow === e.state.currentSlug && (e.dom.slider.appendChild(t),
                        t.style.transform = "",
                        e.state.currentNodes.push(t))
                    })
                }
            }, {
                key: "addListeners",
                value: function() {
                    d.on(pe.UP, this.open)
                }
            }, {
                key: "removeListeners",
                value: function() {
                    d.off(pe.UP, this.open)
                }
            }, {
                key: "removeEpisodeSlider",
                value: function() {
                    this.slider.destroy(),
                    this.slider = null
                }
            }, {
                key: "initEpisodeSlider",
                value: function() {
                    this.slider = new xe({
                        el: document.querySelector(".js-episodes-slider"),
                        slideClass: "js-episode-slide"
                    })
                }
            }, {
                key: "destroy",
                value: function() {
                    this.removeListeners(),
                    this.slider.destroy()
                }
            }, {
                key: "init",
                value: function() {
                    this.removeInitialNodes(),
                    this.addListeners()
                }
            }]) && tt(t.prototype, n),
            i && tt(t, i),
            e
        }();
        function it(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function st(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        var ot = function() {
            function e() {
                var t = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                st(this, "onClick", function(e) {
                    var n = e.target;
                    if (!e.isClick) {
                        var i = n.classList.contains(".js-episode") ? n : n.closest(".js-episode");
                        if (i) {
                            var s = i.dataset.videoId;
                            t.player ? (t.player.loadVideo(s),
                            t.player.setColor("#fe3501")) : t.createPlayer(s),
                            t.player.ready().then(function() {
                                l.a.fromTo(t.dom.timer, 1, {
                                    alpha: 0
                                }, {
                                    alpha: 1,
                                    ease: Power1.easeOut
                                })
                            }),
                            t.onOpen()
                        }
                    }
                }),
                st(this, "onClose", function() {
                    t.closeOverlay(),
                    t.player.unload(),
                    t.state.playing = !1,
                    Object.assign(a, {
                        videoState: "PLAY"
                    })
                }),
                st(this, "toggleState", function() {
                    t.state.playing ? (t.player.pause(),
                    t.state.playing = !1,
                    Object.assign(a, {
                        videoState: "PLAY"
                    })) : (t.player.play(),
                    t.state.playing = !0,
                    Object.assign(a, {
                        videoState: "PAUSE"
                    }))
                }),
                this.el = document.querySelector(".js-video"),
                this.dom = {
                    openTriggers: document.querySelectorAll(".js-open-player"),
                    closeTrigger: document.querySelector(".js-close-player"),
                    player: this.el.querySelector(".js-player"),
                    progressBar: this.el.querySelector(".js-player-progress__bar"),
                    timer: this.el.querySelector(".js-player__timer")
                },
                this.state = {
                    playing: !0
                },
                this.cache = null,
                this.player = null,
                this.dom.progressBar.style.transform = "translate3d(-100%, 0, 0)",
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "createPlayer",
                value: function(e) {
                    var t;
                    t = a.isDevice ? {
                        id: e,
                        autoplay: !0
                    } : {
                        id: e,
                        background: !0,
                        muted: !1
                    },
                    this.player = new qe.a("player",t),
                    this.player.setColor("#fe3501"),
                    this.player.setVolume(1)
                }
            }, {
                key: "openOverlay",
                value: function() {
                    l.a.to(this.el, .5, {
                        autoAlpha: 1
                    }),
                    Object.assign(a, {
                        overlay: !0
                    })
                }
            }, {
                key: "closeOverlay",
                value: function() {
                    var e = new TimelineLite
                      , t = this.dom
                      , n = t.progressBar
                      , i = t.timer;
                    e.to(this.el, .5, {
                        autoAlpha: 0
                    }).set(n, {
                        scaleX: 0
                    }).set(i, {
                        alpha: 0
                    }),
                    Object.assign(a, {
                        overlay: !1
                    })
                }
            }, {
                key: "onOpen",
                value: function() {
                    var e = this;
                    a.isDevice || this.player.on("timeupdate", function(t) {
                        e.updateProgress(t)
                    }),
                    this.state.playing = !0,
                    Object.assign(a, {
                        videoState: "PAUSE"
                    }),
                    this.openOverlay()
                }
            }, {
                key: "addListeners",
                value: function() {
                    var e = this
                      , t = this.dom
                      , n = t.closeTrigger
                      , i = t.player;
                    n.addEventListener("click", function() {
                        return e.onClose()
                    }),
                    n.addEventListener("mouseenter", function() {
                        Object.assign(a, {
                            videoState: "CLOSE"
                        })
                    }),
                    n.addEventListener("mouseleave", function() {
                        Object.assign(a, {
                            videoState: e.state.playing ? "PAUSE" : "PLAY"
                        })
                    }),
                    a.isDevice || i.addEventListener("click", this.toggleState),
                    d.on(pe.UP, this.onClick)
                }
            }, {
                key: "updateProgress",
                value: function(e) {
                    var t = new Date(null);
                    t.setSeconds(e.seconds);
                    var n = t.toISOString().substr(14, 5);
                    this.dom.progressBar.style.transform = "translateX(".concat(100 * e.percent - 100, "%)"),
                    this.dom.timer.innerHTML = n
                }
            }, {
                key: "hashOnLoad",
                value: function() {
                    var e = window.location.hash;
                    if (e) {
                        var t = document.querySelector("".concat(e)).dataset.videoId;
                        this.createPlayer(t),
                        this.onOpen()
                    }
                }
            }, {
                key: "destroy",
                value: function() {
                    this.player && this.player.destroy(),
                    this.cache = null,
                    this.dom = null,
                    d.off(pe.UP, this.onOpen)
                }
            }, {
                key: "init",
                value: function() {
                    this.addListeners(),
                    this.hashOnLoad()
                }
            }]) && it(t.prototype, n),
            i && it(t, i),
            e
        }();
        function rt(e) {
            return (rt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function at(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function lt(e, t) {
            return !t || "object" !== rt(t) && "function" != typeof t ? function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function ut(e, t, n) {
            return (ut = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
                var i = function(e, t) {
                    for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = ct(e)); )
                        ;
                    return e
                }(e, t);
                if (i) {
                    var s = Object.getOwnPropertyDescriptor(i, t);
                    return s.get ? s.get.call(n) : s.value
                }
            }
            )(e, t, n || e)
        }
        function ct(e) {
            return (ct = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function ht(e, t) {
            return (ht = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        var ft = function(e) {
            function t() {
                return function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                lt(this, ct(t).apply(this, arguments))
            }
            var n, i, s;
            return function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && ht(e, t)
            }(t, ie),
            n = t,
            (i = [{
                key: "onEnter",
                value: function() {
                    ut(ct(t.prototype), "onEnter", this).call(this)
                }
            }, {
                key: "onLeave",
                value: function() {
                    ut(ct(t.prototype), "onLeave", this).call(this),
                    this.videoPlayer && this.videoPlayer.destroy()
                }
            }, {
                key: "onEnterCompleted",
                value: function() {
                    ut(ct(t.prototype), "onEnterCompleted", this).call(this),
                    this.shows = new xe({
                        el: document.querySelector(".js-shows-slider"),
                        slideClass: "js-show-slide",
                        spammable: !0
                    }),
                    this.featured = new xe({
                        el: document.querySelector(".js-featured-slider"),
                        slideClass: "js-episode-slide"
                    }),
                    this.videoPlayer = new ot,
                    this.show = new nt,
                    a.isDevice || (this.cursor = new ge)
                }
            }, {
                key: "onLeaveCompleted",
                value: function() {
                    ut(ct(t.prototype), "onLeaveCompleted", this).call(this),
                    this.shows && this.shows.destroy(),
                    this.featured && this.featured.destroy()
                }
            }]) && at(n.prototype, i),
            s && at(n, s),
            t
        }();
        function dt(e) {
            return (dt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function pt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function yt(e, t) {
            return !t || "object" !== dt(t) && "function" != typeof t ? function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(e) : t
        }
        function vt(e) {
            return (vt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function gt(e, t) {
            return (gt = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        var mt, bt = document.querySelector(".js-mask"), wt = bt.querySelector(".js-mask__inner"), xt = document.querySelector(".js-title"), Ot = function(e) {
            function t() {
                return function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, t),
                yt(this, vt(t).apply(this, arguments))
            }
            var n, i, o;
            return function(e, t) {
                if ("function" != typeof t && null !== t)
                    throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && gt(e, t)
            }(t, s.a.Transition),
            n = t,
            (i = [{
                key: "in",
                value: function(e, t, n) {
                    mt = new TimelineMax;
                    var i = t.querySelectorAll(".js-line__inner")
                      , s = t.querySelectorAll(".js-line")
                      , o = t.querySelector(".js-transition-title");
                    if (a.menuIsOpen ? Wt.close() : mt.fromTo(bt, .75, {
                        yPercent: 0
                    }, {
                        yPercent: -100,
                        ease: Expo.easeInOut
                    }).fromTo(wt, .75, {
                        yPercent: 0
                    }, {
                        yPercent: 100,
                        ease: Expo.easeInOut
                    }, 0),
                    null != t.dataset.title) {
                        var r = new D(xt,{
                            type: "chars"
                        });
                        mt.staggerFrom(r.chars, 1.1, {
                            yPercent: 100,
                            ease: Expo.easeOut,
                            stagger: {
                                from: "center",
                                axis: "x",
                                amount: .25
                            }
                        }, 0, .35).addCallback(function() {
                            r.revert()
                        })
                    }
                    if (o) {
                        var l = new D(o,{
                            type: "lines, words"
                        });
                        mt.staggerFrom(l.words, 1.1, {
                            yPercent: 110,
                            ease: Expo.easeOut
                        }, .075, .35)
                    }
                    s && mt.staggerFrom(i, 1.1, {
                        yPercent: 110,
                        ease: Expo.easeOut
                    }, .1, .35),
                    mt.set(bt, {
                        autoAlpha: 0
                    }),
                    e.remove(),
                    n()
                }
            }, {
                key: "out",
                value: function(e, t) {
                    mt && mt.kill(),
                    a.menuIsOpen ? t() : (mt = new TimelineLite({
                        onComplete: t
                    })).set(bt, {
                        autoAlpha: 1
                    }).fromTo(bt, .65, {
                        yPercent: 100
                    }, {
                        yPercent: 0,
                        ease: Expo.easeOut
                    }).fromTo(wt, .65, {
                        yPercent: -85
                    }, {
                        yPercent: 0,
                        ease: Expo.easeOut
                    }, 0)
                }
            }]) && pt(n.prototype, i),
            o && pt(n, o),
            t
        }(), St = n(3);
        n(35);
        function kt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var Et = "\n  precision mediump float;\n\n  attribute vec3 position;\n  attribute vec2 texcoord;\n\n  uniform mat4 uMatrix;\n  uniform mat4 uTMatrix; \n\n  varying vec2 vTexcoord;\n\n  void main() {\n    vec3 pos = position.xzy;\n\n    gl_Position = uMatrix * vec4(pos, 1.0);\n    vTexcoord = (uTMatrix * vec4(texcoord - vec2(.5), 0, 1)).xy + vec2(.5);\n  }   \n"
          , Tt = "\n  precision mediump float;\n\n  attribute vec3 position;\n  attribute vec2 texcoord;\n\n  uniform mat4 uMatrix;\n  uniform mat4 uTMatrix;\n\n  uniform vec2 uRes;\n  uniform vec2 uOffset;\n\n  uniform float uTime;\n  uniform float uPower;\n  uniform float uStrength;\n  uniform float uVertScale;\n  uniform float uParallax;\n\n  varying vec2 vTexcoord;\n\n  void main() {\n    vec3 pos = position.xzy;\n\n    pos.y = pos.y + uParallax;\n\n    float dist = distance(uOffset, vec2(pos.x, pos.y));\n    float ripple = cos(uStrength * (dist - (uTime / 60.0)));\n    float effect = ripple * uPower;\n\n    pos.x += (effect / 15.0 * (uRes.x / uRes.y) * (uOffset.x - pos.x));\n    pos.y += effect / 15.0 * (uOffset.y - pos.y);\n    pos = pos * uVertScale;\n\n    gl_Position = uMatrix * vec4(pos, 1.0);\n    vTexcoord = (uTMatrix * vec4(texcoord - vec2(.5), 0, 1)).xy + vec2(.5);\n  }  \n"
          , Pt = "\n  precision mediump float;\n\n  uniform sampler2D uTex;\n  uniform float uFragScale;\n\n  varying vec2 vTexcoord;\n\n  void main() {\n    vec2 uv = vTexcoord;\n\n    vec2 center = vec2(0.5, 0.5);\n    vec2 scale = (uv - center) * uFragScale + center;\n    vec4 tex = texture2D(uTex, scale);\n\n    gl_FragColor = tex;\n  }\n"
          , Ct = "\n  precision mediump float;\n\n  uniform sampler2D uTexOne;\n  uniform sampler2D uTexTwo;\n  uniform float uProgress;\n  uniform float uFragScale;\n\n  varying vec2 vTexcoord;\n\n  void main() {\n    vec2 uv = vTexcoord;\n  \n    vec4 color = vec4(1.0);\n\n    vec4 texOne = texture2D(uTexOne, uv);\n    vec4 texTwo = texture2D(uTexTwo, uv);\n\n    float effect = step(uv.y, uProgress);\n    color = mix(texOne, texTwo, effect);\n\n    gl_FragColor = color;\n  }\n"
          , Lt = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                c(this, ["render", "getPos", "onResize", "updateBounds"]),
                this.canvas = document.getElementById("gl-bg"),
                this.gl = this.canvas.getContext("webgl"),
                this.gl && (this.images = document.querySelectorAll("[data-gl-texture]"),
                this.slider = document.querySelector("[data-gl-slider]"),
                this.programInfoAnimating = St.createProgramInfo(this.gl, [Tt, Pt]),
                this.programInfo = St.createProgramInfo(this.gl, [Et, Pt]),
                this.programInfoSlider = St.createProgramInfo(this.gl, [Tt, Ct]),
                this.bufferInfo = St.primitives.createPlaneBufferInfo(this.gl, 1, 1, 15, 15),
                this.data = {
                    threshold: 100,
                    translate: 0,
                    scrollDiff: 0
                },
                this.mouse = {
                    x: 0,
                    y: 0,
                    current: {
                        x: 0,
                        y: 0
                    },
                    diff: 0
                },
                this.bounds = {
                    width: 0,
                    height: 0,
                    res: 0
                },
                this.state = {
                    resizing: !1
                },
                this.time = 0,
                this.infos = null,
                this.hovers = null,
                this.transitions = null,
                this.init())
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "getTextureInfo",
                value: function() {
                    var e = this;
                    this.images = document.querySelectorAll("[data-gl-texture]"),
                    this.images && (this.infos = [],
                    this.hovers = [],
                    this.transitions = [],
                    this.images.forEach(function(t, n) {
                        var i = t.parentNode
                          , s = i.getBoundingClientRect()
                          , o = t.dataset.glParallax || 1
                          , r = 1 / o
                          , l = t.dataset.glTexture
                          , u = {
                            el: i,
                            target: t,
                            texture: null,
                            type: "mp4" === l.split(".").pop() ? "video" : "image",
                            srcElement: null,
                            needsUpdate: !1,
                            isAnimating: !1,
                            hasIntersected: !1,
                            bounds: s,
                            srcHeight: s.height,
                            srcWidth: s.width,
                            width: s.width,
                            height: s.height,
                            parallaxOffset: (s.y - a.height / 2) * o - (s.y - a.height / 2),
                            x: s.width / 2 + s.x,
                            y: s.height / 2 + s.y * r,
                            offset: 0,
                            speed: o,
                            parallax: r,
                            intersectRatio: 0,
                            uParallax: 0,
                            uVertScale: 1,
                            uFragScale: 1,
                            uOffset: [0, 0],
                            uPower: 0,
                            uStrength: 8.5,
                            uTime: -30
                        };
                        u.texture = e.createTexture(l, u),
                        null == t.dataset.glHoverable || a.isDevice || e.addHover(u),
                        null != t.dataset.glTransition && e.transitions.push(u),
                        null != t.dataset.glScroll && (u.scrollTransition = !0),
                        t.dataset.glScaleFrom && (u.scale = e.createTimeline(u, "scale")),
                        e.infos.push(u)
                    }))
                }
            }, {
                key: "getSliderInfo",
                value: function() {
                    var e = this;
                    if (this.slider = document.querySelector("[data-gl-slider]"),
                    this.slider) {
                        var t = this.slider.getBoundingClientRect()
                          , n = JSON.parse("[".concat(this.slider.dataset.glSlider, "]"))
                          , i = this.slider.dataset.glParallax || 1
                          , s = 1 / i
                          , o = this.slider.parentNode.querySelector(".js-bullet-nav");
                        this.sliderInfo = {
                            el: this.slider,
                            target: this.slider,
                            type: "image",
                            srcElement: null,
                            needsUpdate: !1,
                            bounds: t,
                            srcHeight: t.height,
                            srcWidth: t.width,
                            width: t.width,
                            height: t.height,
                            parallaxOffset: (t.y - a.height / 2) * i - (t.y - a.height / 2),
                            x: t.width / 2 + t.x,
                            y: t.height / 2 + t.y * s,
                            offset: 0,
                            textures: [],
                            total: n.length - 1,
                            current: 0,
                            next: 1,
                            speed: i,
                            parallax: s,
                            uStrength: 8.5,
                            uOffset: [0, 0],
                            uProgress: 0,
                            uFragScale: 1,
                            uPower: 0,
                            uParallax: 0,
                            bullets: new G(o)
                        },
                        n.forEach(function(t) {
                            var n = e.createTexture(t, e.sliderInfo);
                            e.sliderInfo.textures.push(n)
                        }),
                        this.addSliderClick(this.sliderInfo)
                    }
                }
            }, {
                key: "createTimeline",
                value: function(e, t) {
                    var n = new TimelineLite({
                        paused: !0
                    });
                    if ("scale" === t) {
                        var i = e.target.dataset.glScaleFrom
                          , s = e.target.dataset.glScaleTo;
                        n.fromTo(e, 1, {
                            uFragScale: i
                        }, {
                            uFragScale: s
                        })
                    }
                    return n
                }
            }, {
                key: "deleteTextures",
                value: function() {
                    var e = this;
                    this.infos.forEach(function(t) {
                        e.gl.deleteTexture(t.texture),
                        "video" === t.type && t.srcElement.pause(),
                        t.srcElement = null,
                        t = null
                    }),
                    this.infos = null,
                    this.images = null,
                    this.sliderInfo && (this.sliderInfo.textures.forEach(function(t) {
                        e.gl.deleteTexture(t)
                    }),
                    this.sliderInfo = null)
                }
            }, {
                key: "getPos",
                value: function(e) {
                    var t = e.x
                      , n = e.y;
                    this.mouse.x = t,
                    this.mouse.y = n
                }
            }, {
                key: "inView",
                value: function(e) {
                    var t = e.bounds
                      , n = this.data.current
                      , i = e.speed
                      , s = n * i
                      , o = (e.y - n) * i + e.parallaxOffset
                      , r = t.y + e.offset - s
                      , l = t.bottom + e.offset - s;
                    return {
                        isVisible: r < this.data.threshold + a.height && l > -this.data.threshold,
                        start: r,
                        end: l,
                        transform: o
                    }
                }
            }, {
                key: "intersectRatio",
                value: function(e, t, n) {
                    var i = t - a.height
                      , s = 1 * (a.height + n + e.height);
                    e.intersectRatio = Math.abs(i / s),
                    e.intersectRatio = Math.max(0, Math.min(1, e.intersectRatio))
                }
            }, {
                key: "drawTexture",
                value: function(e) {
                    var t = this.inView(e)
                      , n = t.isVisible
                      , i = t.start
                      , s = t.end
                      , o = t.transform;
                    if (n || this.state.resizing) {
                        e.hasIntersected || (e.hasIntersected = !0,
                        e.scrollTransition && this.transitionTwo(e));
                        var r = St.m4.identity()
                          , a = St.m4.identity();
                        e.needsUpdate && e.srcElement.readyState === e.srcElement.HAVE_ENOUGH_DATA && (e.srcElement.didRenderLastFrame ? e.srcElement.didRenderLastFrame = !1 : (this.updateTexture(e.texture, e.srcElement),
                        e.srcElement.didRenderLastFrame = !0)),
                        e.scale && (this.intersectRatio(e, i, s),
                        e.scale.progress(e.intersectRatio));
                        var l = e.width / e.height
                          , u = e.srcWidth / e.srcHeight
                          , c = 0
                          , h = 0;
                        u < l ? (c = 1,
                        h = u / l) : u > l && (c = l / u,
                        h = 1),
                        St.m4.scale(a, [c, h, 1], a),
                        St.m4.ortho(0, this.bounds.width, this.bounds.height, 0, -1, 1, r),
                        St.m4.translate(r, [e.x, o.toFixed(2), 1], r),
                        St.m4.scale(r, [e.width, e.height, 1], r),
                        e.textures ? (this.gl.useProgram(this.programInfoSlider.program),
                        St.setBuffersAndAttributes(this.gl, this.programInfoSlider, this.bufferInfo),
                        St.setUniforms(this.programInfoSlider, {
                            uMatrix: r,
                            uTMatrix: a,
                            uTexOne: e.textures[e.current],
                            uTexTwo: e.textures[e.next],
                            uOffset: e.uOffset,
                            uTime: this.time,
                            uPower: e.uPower,
                            uStrength: e.uStrength,
                            uProgress: e.uProgress,
                            uParallax: e.uParallax,
                            uFragScale: e.uFragScale,
                            uVertScale: 1,
                            uRes: this.bounds.res
                        })) : e.isAnimating ? (this.gl.useProgram(this.programInfoAnimating.program),
                        St.setBuffersAndAttributes(this.gl, this.programInfoAnimating, this.bufferInfo),
                        St.setUniforms(this.programInfoAnimating, {
                            uMatrix: r,
                            uTMatrix: a,
                            uTex: e.texture,
                            uOffset: e.uOffset,
                            uTime: e.uTime,
                            uPower: e.uPower,
                            uStrength: e.uStrength,
                            uRes: this.bounds.res,
                            uParallax: e.uParallax,
                            uVertScale: e.uVertScale,
                            uFragScale: e.uFragScale
                        })) : (this.gl.useProgram(this.programInfo.program),
                        St.setBuffersAndAttributes(this.gl, this.programInfo, this.bufferInfo),
                        St.setUniforms(this.programInfo, {
                            uMatrix: r,
                            uTMatrix: a,
                            uTex: e.texture,
                            uFragScale: e.uFragScale
                        })),
                        St.drawBufferInfo(this.gl, this.bufferInfo)
                    }
                }
            }, {
                key: "drawTextures",
                value: function() {
                    for (var e = 0, t = this.infos.length; e < t; ++e) {
                        var n = this.infos[e];
                        this.drawTexture(n)
                    }
                    this.sliderInfo && this.drawTexture(this.sliderInfo)
                }
            }, {
                key: "render",
                value: function(e) {
                    var t = e.smooth;
                    a.gl && this.infos && (St.resizeCanvasToDisplaySize(this.gl.canvas),
                    this.time++,
                    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight),
                    this.gl.clearColor(0, 0, 0, 0),
                    this.gl.clear(this.gl.COLOR_BUFFER_BIT),
                    this.data.current = t,
                    this.drawTextures())
                }
            }, {
                key: "transition",
                value: function() {
                    var e = this;
                    this.transitions && this.transitions.forEach(function(t) {
                        "grid" === t.target.dataset.glTransition ? e.transitionTwo(t) : e.transitionOne(t)
                    })
                }
            }, {
                key: "transitionOne",
                value: function(e) {
                    e.isAnimating = !0,
                    l.a.set(e, {
                        uPower: 2,
                        uTime: -30
                    }),
                    l.a.to(e, 3, {
                        uPower: 0,
                        ease: Expo.easeOut,
                        onComplete: function() {
                            e.isAnimating = !1
                        },
                        onUpdate: function() {
                            e.uTime++
                        }
                    })
                }
            }, {
                key: "transitionTwo",
                value: function(e) {
                    e.isAnimating = !0,
                    l.a.set(e, {
                        uParallax: 1,
                        uFragScale: .25,
                        uPower: .5,
                        uTime: -30,
                        uOffset: [-1, -1]
                    }),
                    l.a.to(e, 1.5, {
                        uParallax: 0,
                        ease: Expo.easeOut
                    }),
                    l.a.to(e, 2.5, {
                        uFragScale: 1,
                        uPower: 0,
                        ease: Expo.easeOut,
                        onComplete: function() {
                            e.isAnimating = !1
                        },
                        onUpdate: function() {
                            e.uTime++
                        }
                    })
                }
            }, {
                key: "onMouseEnter",
                value: function(e) {
                    e.isAnimating = !0;
                    var t = e.uTime
                      , n = new TimelineLite({
                        paused: !0
                    });
                    n.to(e, 1, {
                        uPower: .4,
                        ease: Linear.easeNone
                    }).to(e, 1, {
                        uPower: 0,
                        ease: Linear.easeNone
                    }),
                    l.a.to(n, 1.75, {
                        progress: 1,
                        ease: Power3.easeOut
                    }),
                    l.a.to(e, 1.5, {
                        uVertScale: .875,
                        uFragScale: .875,
                        ease: Expo.easeOut
                    }),
                    l.a.to(e, 2, {
                        uTime: t + 120,
                        ease: Linear.easeNone
                    })
                }
            }, {
                key: "onMouseLeave",
                value: function(e) {
                    e.isAnimating = !0;
                    var t = e.uTime
                      , n = new TimelineLite({
                        paused: !0
                    });
                    n.to(e, 1, {
                        uPower: .4,
                        ease: Linear.easeNone
                    }).to(e, 1, {
                        uPower: 0,
                        ease: Linear.easeNone
                    }),
                    l.a.to(n, 1.75, {
                        progress: 1,
                        ease: Power3.easeOut
                    }),
                    l.a.to(e, 1.5, {
                        uVertScale: 1,
                        uFragScale: 1,
                        ease: Expo.easeOut
                    }),
                    l.a.to(e, 2, {
                        uTime: t + 120,
                        ease: Linear.easeNone,
                        onComplete: function() {
                            e.isAnimating = !1,
                            e.uTime = -30
                        }
                    })
                }
            }, {
                key: "addHover",
                value: function(e) {
                    var t = this;
                    e.el.addEventListener("mouseenter", function() {
                        return t.onMouseEnter(e)
                    }),
                    e.el.addEventListener("mouseleave", function() {
                        return t.onMouseLeave(e)
                    })
                }
            }, {
                key: "addSliderClick",
                value: function(e) {
                    var t = this;
                    e.tl = new TimelineMax({
                        paused: !0,
                        onComplete: function() {
                            e.isAnimating = !1,
                            e.uProgress = 0,
                            t.changeSliderIndex(e)
                        }
                    });
                    var n = new TimelineLite({
                        paused: !0
                    });
                    n.to(e, .5, {
                        uPower: .5,
                        ease: Linear.easeNone
                    }).to(e, 1, {
                        uPower: 0,
                        ease: Linear.easeNone
                    }),
                    e.tl.to(n, 1.75, {
                        progress: 1,
                        ease: Power2.easeInOut
                    }).to(e, 1.5, {
                        uProgress: 1,
                        ease: Expo.easeInOut
                    }, 0),
                    e.el.addEventListener("click", function() {
                        return t.onSliderClick(e)
                    })
                }
            }, {
                key: "changeSliderIndex",
                value: function(e) {
                    e.current = e.next,
                    e.next = e.next === e.total ? 0 : e.next + 1
                }
            }, {
                key: "onSliderClick",
                value: function(e) {
                    e.isAnimating || (e.uOffset = [(this.mouse.x - e.bounds.x) / e.width * 2 - 1, (this.mouse.y - (e.bounds.y + e.offset - this.data.current)) / e.height * 2 - 1],
                    e.bullets.animate(e.next),
                    e.isAnimating = !0,
                    e.tl.restart())
                }
            }, {
                key: "createTexture",
                value: function(e, t) {
                    var n = this
                      , i = this.gl.createTexture();
                    this.gl.bindTexture(this.gl.TEXTURE_2D, i);
                    var s = this.gl.RGB
                      , o = this.gl.RGB
                      , r = this.gl.UNSIGNED_BYTE
                      , a = new Uint8Array([0, 0, 0, 0]);
                    if (this.gl.texImage2D(this.gl.TEXTURE_2D, 0, s, 1, 1, 0, o, r, a),
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE),
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE),
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR),
                    "image" === t.type) {
                        var l = document.createElement("img");
                        l.addEventListener("load", function() {
                            n.gl.bindTexture(n.gl.TEXTURE_2D, i),
                            n.gl.texImage2D(n.gl.TEXTURE_2D, 0, s, o, r, l),
                            Object.assign(t, {
                                srcWidth: l.width,
                                srcHeight: l.height
                            })
                        }),
                        l.src = "".concat(window.location.origin).concat(e)
                    } else if ("video" === t.type) {
                        var u = t.target;
                        u.didRenderLastFrame = !1,
                        u.style.position = "absolute",
                        u.style.height = 0,
                        u.addEventListener("loadeddata", function() {
                            Object.assign(t, {
                                needsUpdate: !0,
                                srcWidth: u.videoWidth,
                                srcHeight: u.videoHeight
                            }),
                            u.play(),
                            n.updateTexture(i, u)
                        }),
                        u.src = "".concat(window.location.origin).concat(e),
                        Object.assign(t, {
                            srcElement: u
                        })
                    }
                    return i
                }
            }, {
                key: "updateTexture",
                value: function(e, t) {
                    var n = this.gl.RGB
                      , i = this.gl.RGB
                      , s = this.gl.UNSIGNED_BYTE;
                    this.gl.bindTexture(this.gl.TEXTURE_2D, e),
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, n, i, s, t)
                }
            }, {
                key: "updatePlaneBounds",
                value: function() {
                    var e = this;
                    this.infos.forEach(function(t) {
                        var n = t.el.getBoundingClientRect();
                        t.bounds = n,
                        t.width = n.width,
                        t.height = n.height,
                        t.x = n.width / 2 + n.x,
                        t.parallaxOffset = (n.y - a.height / 2) * t.speed - (n.y - a.height / 2),
                        t.y = (n.height / 2 + n.y) * t.parallax + e.data.current,
                        t.offset = e.data.current * t.speed + t.parallaxOffset
                    })
                }
            }, {
                key: "updateSliderPlaneBounds",
                value: function() {
                    var e = this.sliderInfo.el.getBoundingClientRect();
                    this.sliderInfo.bounds = e,
                    this.sliderInfo.width = e.width,
                    this.sliderInfo.height = e.height,
                    this.sliderInfo.x = e.width / 2 + e.x,
                    this.sliderInfo.y = e.height / 2 + e.y + this.data.current,
                    this.sliderInfo.offset = this.data.current
                }
            }, {
                key: "updateBounds",
                value: function() {
                    this.infos && this.updatePlaneBounds(),
                    this.sliderInfo && this.updateSliderPlaneBounds()
                }
            }, {
                key: "setSize",
                value: function() {
                    this.bounds.width = a.width,
                    this.bounds.height = a.height,
                    this.bounds.res = [a.width, a.height]
                }
            }, {
                key: "onResize",
                value: function() {
                    this.state.resizing = !0,
                    this.updateBounds(),
                    this.setSize(),
                    this.state.resizing = !1
                }
            }, {
                key: "addListeners",
                value: function() {
                    d.on(R.TICK, this.render),
                    d.on(pe.MOVE, this.getPos)
                }
            }, {
                key: "init",
                value: function() {
                    this.setSize(),
                    this.addListeners(),
                    window.addEventListener("load", this.updateBounds)
                }
            }]) && kt(t.prototype, n),
            i && kt(t, i),
            e
        }();
        function jt(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function _t(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        function Rt(e, t, n) {
            return t && _t(e.prototype, t),
            n && _t(e, n),
            e
        }
        var It = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                jt(this, e),
                this.options = t,
                this.elems = null,
                this.instances = null
            }
            return Rt(e, [{
                key: "createInstances",
                value: function() {
                    var e = this;
                    this.elems = document.querySelectorAll("".concat(this.options.selector)),
                    this.elems && (this.instances = null,
                    this.instances = [],
                    this.elems.forEach(function(t) {
                        e.instances.push({
                            instance: new At(t)
                        })
                    }))
                }
            }, {
                key: "killInstances",
                value: function() {
                    var e = this;
                    this.instances && (this.elems = null,
                    this.instances.forEach(function(t) {
                        t.instance.destroy(),
                        e.instances.splice(t)
                    }))
                }
            }]),
            e
        }()
          , At = function() {
            function e(t) {
                jt(this, e),
                c(this, ["onEnter"]),
                this.el = t,
                this.trigger = this.el.closest("a"),
                this.split = new D(this.el,{
                    type: "chars"
                }),
                this.tl = null,
                this.init()
            }
            return Rt(e, [{
                key: "createTimeline",
                value: function() {
                    this.tl = new TimelineLite({
                        paused: !0
                    }),
                    this.tl.set(this.split.chars, {
                        willChange: "transform"
                    }).staggerTo(this.split.chars, .25, {
                        scaleY: 1.35,
                        ease: Power3.easeOut
                    }, .025).staggerTo(this.split.chars, .25, {
                        scaleY: 1,
                        ease: Power3.easeOut
                    }, .025, .25).set(this.split.chars, {
                        clearProps: "willChange"
                    })
                }
            }, {
                key: "onEnter",
                value: function() {
                    this.tl.restart()
                }
            }, {
                key: "addListeners",
                value: function() {
                    this.trigger.addEventListener("mouseenter", this.onEnter)
                }
            }, {
                key: "removeListeners",
                value: function() {
                    this.trigger.removeEventListener("mouseenter", this.onEnter)
                }
            }, {
                key: "destroy",
                value: function() {
                    this.removeListeners(),
                    this.split.revert(),
                    this.tl.kill(),
                    this.split = null,
                    this.tl = null,
                    this.el = null
                }
            }, {
                key: "init",
                value: function() {
                    this.createTimeline(),
                    this.addListeners()
                }
            }]),
            e
        }()
          , Mt = It;
        function Nt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var Dt = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                c(this, ["run"]),
                this.position = {
                    current: 0,
                    last: 0
                },
                this.tl = {
                    header: {
                        out: null,
                        in: null
                    },
                    aside: {
                        out: null,
                        in: null
                    }
                },
                this.state = {
                    header: !0,
                    aside: !0
                },
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "run",
                value: function(e) {
                    var t = e.smooth;
                    this.position.current = t,
                    this.togglePrimary(),
                    this.toggleSecondary(),
                    this.position.last = this.position.current
                }
            }, {
                key: "togglePrimary",
                value: function() {
                    var e = this.position.current < 50 && this.state.header && !a.overlay;
                    this.position.current >= 50 && !this.state.header || !this.state.header && a.overlay ? (this.tl.header.in && this.tl.header.in.kill(),
                    this.tl.header.out = new TimelineLite,
                    this.tl.header.out.to([".js-site-head__logo", ".js-site-head__stagger"], .25, {
                        alpha: 0,
                        ease: Power2.easeInOut
                    }),
                    this.state.header = !0,
                    a.body.classList.add("is-scrolled")) : e && (this.tl.header.out && this.tl.header.out.kill(),
                    this.tl.header.in = new TimelineLite,
                    this.tl.header.in.to(".js-site-head__logo", .5, {
                        alpha: 1,
                        ease: Power2.easeInOut
                    }).staggerFromTo(".js-site-head__stagger", .75, {
                        x: -60,
                        alpha: 0
                    }, {
                        x: 0,
                        alpha: 1,
                        ease: Expo.easeOut
                    }, -.035, 0),
                    this.state.header = !1,
                    a.body.classList.remove("is-scrolled"))
                }
            }, {
                key: "toggleSecondary",
                value: function() {
                    var e = this.position.current >= a.height && this.position.current < this.position.last && !this.state.aside && !a.overlay
                      , t = (this.position.current < a.height || this.position.current > this.position.last) && this.state.aside || this.state.aside && a.overlay;
                    e ? (this.tl.aside.out && this.tl.aside.out.kill(),
                    this.tl.aside.in = new TimelineLite,
                    this.tl.aside.in.set(".js-side-menu__link", {
                        x: 0,
                        alpha: 0
                    }).to(".js-infinity-logo", .5, {
                        alpha: 1,
                        ease: Power2.easeInOut
                    }).staggerFromTo(".js-side-menu__link", .75, {
                        x: -60,
                        alpha: 0
                    }, {
                        x: 0,
                        alpha: 1,
                        ease: Expo.easeOut
                    }, -.035, 0),
                    this.state.aside = !0,
                    a.body.classList.add("is-scrolled--up")) : t && (this.tl.aside.in && this.tl.aside.in.kill(),
                    this.tl.aside.out = new TimelineLite,
                    this.tl.aside.out.to([".js-infinity-logo", ".js-side-menu__link"], .25, {
                        alpha: 0,
                        ease: Power2.easeInOut
                    }),
                    this.state.aside = !1,
                    a.body.classList.remove("is-scrolled--up"))
                }
            }, {
                key: "addListeners",
                value: function() {
                    d.on(R.TICK, this.run)
                }
            }, {
                key: "init",
                value: function() {
                    this.addListeners()
                }
            }]) && Nt(t.prototype, n),
            i && Nt(t, i),
            e
        }();
        function qt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var Bt = function() {
            function e() {
                var t, n, i, s = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                i = function() {
                    a.menuIsOpen ? s.close() : s.open()
                }
                ,
                (n = "toggle")in (t = this) ? Object.defineProperty(t, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[n] = i,
                this.el = document.querySelector(".js-site-nav"),
                this.dom = {
                    inner: this.el.querySelector(".js-site-nav__inner"),
                    btn: document.querySelector(".js-toggle-menu"),
                    links: this.el.querySelectorAll(".js-site-menu__link"),
                    socialLinks: this.el.querySelectorAll(".js-site-nav-social__link"),
                    linesOpen: document.querySelectorAll(".js-toggle-menu__line--open"),
                    linesClose: document.querySelectorAll(".js-toggle-menu__line--close")
                },
                this.tl = null,
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "setIntialStyles",
                value: function() {
                    l.a.set([this.el, this.dom.links], {
                        yPercent: -100
                    }),
                    l.a.set([this.dom.inner, this.dom.socialLinks], {
                        yPercent: 100
                    }),
                    l.a.set(this.dom.linesClose, {
                        scaleX: 0
                    })
                }
            }, {
                key: "close",
                value: function() {
                    Object.assign(a, {
                        menuIsOpen: !1
                    }),
                    a.body.classList.remove("is-menu-open"),
                    this.tl && this.tl.kill(),
                    this.tl = new TimelineLite;
                    var e = this.dom
                      , t = e.inner
                      , n = e.links
                      , i = e.socialLinks
                      , s = e.linesOpen
                      , o = e.linesClose;
                    this.tl.to(this.el, .9, {
                        yPercent: -100,
                        ease: Expo.easeInOut
                    }).to(t, .9, {
                        yPercent: 100,
                        ease: Expo.easeInOut
                    }, 0).staggerTo(n, .65, {
                        yPercent: -100,
                        ease: Power1.easeInOut
                    }, .05, 0).staggerTo(i, .65, {
                        yPercent: 100,
                        ease: Power1.easeInOut
                    }, -.05, 0).staggerTo(o, .35, {
                        scaleX: 0,
                        ease: Power1.easeInOut
                    }, -.05, 0).staggerTo(s, .75, {
                        scaleX: 1,
                        ease: Expo.easeOut
                    }, -.05, .5)
                }
            }, {
                key: "open",
                value: function() {
                    Object.assign(a, {
                        menuIsOpen: !0
                    }),
                    a.body.classList.add("is-menu-open"),
                    this.tl && this.tl.kill(),
                    this.tl = new TimelineLite;
                    var e = this.dom
                      , t = e.inner
                      , n = e.links
                      , i = e.socialLinks
                      , s = e.linesOpen
                      , o = e.linesClose;
                    this.tl.set(this.el, {
                        autoAlpha: 1
                    }).to(this.el, .9, {
                        yPercent: 0,
                        ease: Expo.easeInOut
                    }).to(t, .9, {
                        yPercent: 0,
                        ease: Expo.easeInOut
                    }, 0).staggerTo(n, 1.1, {
                        yPercent: 0,
                        ease: Expo.easeOut
                    }, -.075, .55).staggerTo(i, 1.1, {
                        yPercent: 0,
                        ease: Expo.easeOut
                    }, .075, .65).staggerTo(s, .35, {
                        scaleX: 0,
                        ease: Power1.easeInOut
                    }, .05, 0).staggerTo(o, .75, {
                        scaleX: 1,
                        ease: Expo.easeOut
                    }, .05, .5)
                }
            }, {
                key: "addListeners",
                value: function() {
                    this.dom.btn.addEventListener("click", this.toggle)
                }
            }, {
                key: "init",
                value: function() {
                    this.setIntialStyles(),
                    this.addListeners()
                }
            }]) && qt(t.prototype, n),
            i && qt(t, i),
            e
        }();
        function zt(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var Vt = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.dom = {
                    mask: document.querySelector(".js-mask"),
                    inner: document.querySelector(".js-mask__inner"),
                    lines: document.querySelectorAll(".js-line__inner")
                },
                this.tl = null,
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "createTimeline",
                value: function() {
                    var e = this.dom
                      , t = e.mask
                      , n = e.inner
                      , i = e.lines;
                    this.tl = new TimelineMax({
                        delay: .5
                    }),
                    this.tl.set(n, {
                        autoAlpha: 1
                    }).to(n, 1.5, {
                        yPercent: 100,
                        ease: Expo.easeOut
                    }, 0).to(t, 1.5, {
                        yPercent: -100,
                        ease: Expo.easeOut
                    }, 0).set(t, {
                        autoAlpha: 0
                    }),
                    i && this.tl.staggerFrom(i, 1.1, {
                        yPercent: 110,
                        ease: Expo.easeOut
                    }, .1, .35),
                    a.isDevice || this.tl.add(function() {
                        Ut.transition()
                    }, 0)
                }
            }, {
                key: "init",
                value: function() {
                    this.createTimeline()
                }
            }]) && zt(t.prototype, n),
            i && zt(t, i),
            e
        }();
        function Ft(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        n.d(t, "H", function() {
            return Ht
        }),
        n.d(t, "Gl", function() {
            return Ut
        }),
        n.d(t, "mobileMenu", function() {
            return Wt
        });
        var Ht, Ut, Wt;
        n.p,
        new (function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.setup(),
                this.init()
            }
            var t, n, i;
            return t = e,
            (n = [{
                key: "setup",
                value: function() {
                    r.a.addClasses(a.body),
                    Object.assign(a, r.a.getInfos()),
                    a.isSmall ? a.body.classList.add("is-small") : a.body.classList.add("is-not-small"),
                    this.view = document.querySelector("[data-router-view]"),
                    this.title = document.querySelector(".js-title"),
                    this.links = document.querySelectorAll(".js-site-link"),
                    this.setParameters(),
                    this.setActiveLink(),
                    r.a.isDevice || this.setGl(this.view)
                }
            }, {
                key: "init",
                value: function() {
                    r.a.isDevice || (Ut = new Lt),
                    this.initH(),
                    this.initLinkHovers(),
                    a.isSmall || new Dt,
                    a.isSmall && (Wt = new Bt),
                    new Vt
                }
            }, {
                key: "initH",
                value: function() {
                    var e = this;
                    (Ht = new s.a.Core({
                        renderers: {
                            home: Ce,
                            about: ce,
                            contact: Me,
                            campaign: Xe,
                            careers: et,
                            originals: ft,
                            default: ie
                        },
                        transitions: {
                            default: Ot
                        }
                    })).on("NAVIGATE_IN", function(t) {
                        e.view = t.view,
                        e.setParameters(),
                        e.setActiveLink(),
                        window.scrollTo(0, 0)
                    }),
                    Ht.on("NAVIGATE_END", function(t) {
                        a.isDevice || (e.routeLinkHovers.createInstances(),
                        Ut.transition())
                    }),
                    Ht.on("NAVIGATE_OUT", function(t) {
                        a.isDevice || e.routeLinkHovers.killInstances()
                    })
                }
            }, {
                key: "initLinkHovers",
                value: function() {
                    a.isDevice || (this.globalLinkHovers = new Mt({
                        selector: ".js-site-link"
                    }),
                    this.globalLinkHovers.createInstances(),
                    this.routeLinkHovers = new Mt({
                        selector: "[data-hover]"
                    }),
                    this.routeLinkHovers.createInstances())
                }
            }, {
                key: "setActiveLink",
                value: function() {
                    this.links.forEach(function(e) {
                        e.classList.remove("is-active"),
                        e.href === location.href && e.classList.add("is-active")
                    })
                }
            }, {
                key: "setParameters",
                value: function() {
                    a.body.dataset.route = this.view.dataset.routerView,
                    a.body.dataset.color = this.view.dataset.color,
                    this.title.textContent = "",
                    void 0 !== this.view.dataset.title && (this.title.textContent = this.view.dataset.title)
                }
            }, {
                key: "setGl",
                value: function(e) {
                    Object.assign(a, {
                        gl: null == e.dataset.glOff
                    })
                }
            }]) && Ft(t.prototype, n),
            i && Ft(t, i),
            e
        }())
    }
});
