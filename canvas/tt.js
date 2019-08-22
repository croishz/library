!function e(t, i, s) {
    function n(r, o) {
        if (!i[r]) {
            if (!t[r]) {
                var l = "function" == typeof require && require;
                if (!o && l)
                    return l(r, !0);
                if (a)
                    return a(r, !0);
                var h = new Error("Cannot find module '" + r + "'");
                throw h.code = "MODULE_NOT_FOUND",
                h
            }
            var c = i[r] = {
                exports: {}
            };
            t[r][0].call(c.exports, function(e) {
                var i = t[r][1][e];
                return n(i ? i : e)
            }, c, c.exports, e, t, i, s)
        }
        return i[r].exports
    }
    for (var a = "function" == typeof require && require, r = 0; r < s.length; r++)
        n(s[r]);
    return n
}({
    1: [function(e, t, i) {
        "use strict";
        var s = e("jquery")
          , n = e("./router")
          , a = e("./views/ui/menu")
          , r = e("./views/ui/hamburguer")
          , o = e("./views/ui/title")
          , l = e("./config/vars")
          , h = e("./utils/cubicbezier")
          , c = {
            init: function(e) {
                l.lang = e.lang,
                l.device = e.device,
                l.browser = e.browser,
                this.getAppData()
            },
            getAppData: function() {
                s.when(s.ajax({
                    url: l.url + "/wp-json/ortizleon/v1/get_app_data"
                }), s.ajax({
                    url: l.url + "/wp-json/ortizleon/v1/get_news",
                    data: {
                        lang: l.lang,
                        device: l.device,
                        page: l.postsPage
                    }
                }), s.ajax({
                    url: l.url + "/wp-json/ortizleon/v1/get_pages_data"
                }), s.ajax({
                    url: l.url + "/wp-json/ortizleon/v1/get_projects"
                })).then(function(e, t, i, s) {
                    l.appData = e[0],
                    l.postsTotalNumber = t[0][0];
                    for (var n = 1; n < t[0].length; n++)
                        l.postsData.push(t[0][n]);
                    l.pagesData = i[0],
                    l.projectsData = s[0]
                }).then(this.createApp.bind(this))
            },
            createApp: function() {
                this.createTemplate(),
                this.selectors(),
                this.createEasings(),
                l.menu = new a,
                l.hamburguer = new r,
                l.title = new o,
                this.resize(),
                l._window.on("resize", this.resize.bind(this)),
                l.hamburguer.el.on("click", this.showMenu.bind(this)),
                l.title.el.on("click", this.showMenu.bind(this)),
                n.init()
            },
            createTemplate: function() {
                l.container.html('<div id="main"></div>')
            },
            selectors: function() {
                l.main = s("#container #main")
            },
            createEasings: function() {
                h.create("homeStateChange", .5, 0, .1, 1),
                h.create("scrollMsg", .9, 0, .1, 1),
                h.create("projectsCircle", .12, 1, .56, .97),
                h.create("projectsBack", .25, .9, .55, 1),
                h.create("projectsNextText", .2, .7, .25, 1),
                h.create("projectsNextLine", .8, 0, .2, 1)
            },
            showMenu: function() {
                l.menu.isShown || (l.menu.playInAnimation(),
                l.title.playInAnimation())
            },
            resize: function() {
                l.windowWidth = l._window.width(),
                l.windowHeight = l._window.height(),
                l.title.titleShown && l.title.resize(),
                null !== n.introView && n.introView.resize(),
                null !== n.currentView && n.currentView.resize()
            }
        };
        t.exports = c
    }
    , {
        "./config/vars": 2,
        "./router": 3,
        "./utils/cubicbezier": 14,
        "./views/ui/hamburguer": 25,
        "./views/ui/menu": 26,
        "./views/ui/title": 28,
        jquery: "jquery"
    }],
    2: [function(e, t, i) {
        "use strict";
        var s = e("jquery");
        t.exports = {
            url: window.location.protocol + "//" + window.location.host,
            lang: "en",
            device: "desktop",
            browser: "chrome",
            _document: s(document),
            _window: s(window),
            _html: s("html"),
            container: s("#container"),
            main: null,
            menu: null,
            hamburguer: null,
            title: null,
            windowWidth: 0,
            windowHeight: 0,
            socialNetworks: ["linkedin", "facebook", "twitter", "pinterest"],
            viewIndex: null,
            appData: null,
            postsPage: 0,
            postsTotalNumber: 0,
            postsData: [],
            postsSingle: {
                data: null,
                preloaded: !1
            },
            pagesData: null,
            projectsData: null
        }
    }
    , {
        jquery: "jquery"
    }],
    3: [function(e, t, i) {
        "use strict";
        var s = e("jquery")
          , n = e("page")
          , a = e("eventemitter3")
          , r = e("./config/vars")
          , o = e("./utils/preload")
          , l = e("./views/intro")
          , h = e("./views/home")
          , c = e("./views/project")
          , d = e("./views/recognitions")
          , u = e("./views/about")
          , w = e("./views/services")
          , m = {
            events: new a,
            allowNavigation: !0,
            routes: [{
                path: "",
                view: h
            }, {
                path: "projects",
                view: h
            }, {
                path: "news",
                view: h
            }, {
                path: "projects",
                view: c
            }, {
                path: "recognitions",
                view: d
            }, {
                path: "about",
                view: u
            }, {
                path: "services",
                view: w
            }],
            introView: null,
            currentView: null,
            currentViewIndex: null,
            currentViewPath: null,
            currentViewArgument: null,
            newViewIndex: null,
            newViewPath: null,
            newViewArgument: null,
            introHomeTransition: !1,
            switchHomeState: !1,
            userClickedOnProject: !1,
            projectTransition: !1,
            switchService: !1,
            transitionOldViewHidden: !1,
            transitionNewViewLoaded: !1,
            introShown: !1,
            firstNavigation: !0,
            languageChangeRequest: !1,
            init: function() {
                o.app(),
                r.menu.events.on("view action", this.viewAction, this),
                n("*", this.routerController.bind(this)),
                n.base(""),
                n({
                    click: !0
                })
            },
            routerController: function(e) {
                if (this.allowNavigation) {
                    if (this.setViewData(e.path),
                    this.firstNavigation && 0 === this.newViewIndex && !this.introShown)
                        return this.introShown = !0,
                        void this.initIntro();
                    if ("news" == this.newViewPath) {
                        if (null == this.newViewArgument)
                            return void n.redirect("/news/" + r.postsData[0].name);
                        null === r.postsSingle.data && r.postsSingle.preloaded === !1 || (r.postsSingle.data = null,
                        r.postsSingle.preloaded = !1)
                    }
                    if ("services" == this.newViewPath && null == this.newViewArgument)
                        return void n.redirect("/services/1");
                    if (3 === this.newViewIndex) {
                        for (var t = !1, i = 0; i < r.projectsData.length; i++)
                            if (r.projectsData[i].name === this.newViewArgument) {
                                t = !0;
                                break
                            }
                        if (!t)
                            return
                    }
                    (this.currentViewPath != this.newViewPath || this.currentViewArgument != this.newViewArgument || this.languageChangeRequest) && (this.allowNavigation = !1,
                    this.languageChangeRequest && "news" == this.newViewPath ? (this.transitionNewViewLoaded = !0,
                    this.checkNewViewCreation()) : (o.events.once("view preloaded", function() {
                        this.transitionNewViewLoaded = !0,
                        this.checkNewViewCreation()
                    }, this),
                    o.view(this.newViewIndex, this.newViewPath, this.newViewArgument)),
                    r.container.addClass("in-transition"),
                    this.firstNavigation ? (this.transitionOldViewHidden = !0,
                    this.checkNewViewCreation()) : !this.languageChangeRequest && this.currentViewIndex < 3 && this.newViewIndex < 3 ? (this.switchHomeState = !0,
                    this.transitionOldViewHidden = !0,
                    this.checkNewViewCreation()) : !this.languageChangeRequest && 1 === this.currentViewIndex && 3 === this.newViewIndex && this.userClickedOnProject ? (this.userClickedOnProject = !1,
                    this.projectTransition = !0,
                    this.transitionOldViewHidden = !0,
                    this.checkNewViewCreation()) : this.languageChangeRequest || 6 !== this.currentViewIndex || 6 !== this.newViewIndex ? (this.currentView.events.once("view hidden", function() {
                        this.userClickedOnProject = !1,
                        this.transitionOldViewHidden = !0,
                        this.checkNewViewCreation()
                    }, this),
                    this.currentView.remove()) : (this.switchService = !0,
                    this.transitionOldViewHidden = !0,
                    this.checkNewViewCreation()))
                }
            },
            checkNewViewCreation: function() {
                this.transitionOldViewHidden && this.transitionNewViewLoaded && (this.transitionOldViewHidden = !1,
                this.transitionNewViewLoaded = !1,
                this.languageChangeRequest ? (r.postsPage = 0,
                r.postsTotalNumber = 0,
                r.postsData = [],
                r.postsSingle.data = null,
                r.postsSingle.preloaded = !1,
                s.ajax({
                    url: r.url + "/wp-json/ortizleon/v1/get_news",
                    data: {
                        lang: r.lang,
                        device: r.device,
                        page: r.postsPage
                    }
                }).then(function(e) {
                    r.postsTotalNumber = e[0];
                    for (var t = 1; t < e.length; t++)
                        r.postsData.push(e[t]);
                    if ("news" == this.newViewPath) {
                        var i = "/news/" + r.postsData[0].name;
                        n.replace(i, null, !1, !1),
                        this.setViewData(i),
                        o.events.once("view preloaded", function() {
                            this.createView()
                        }, this),
                        o.view(this.newViewIndex, this.newViewPath, this.newViewArgument)
                    } else
                        this.createView()
                }
                .bind(this))) : this.createView())
            },
            createView: function() {
                var e = "first";
                if (this.firstNavigation || (e = "subsequent"),
                this.introHomeTransition ? (e = "from intro",
                this.currentView = new this.routes[this.newViewIndex].view,
                this.currentView.events.once("home ready", function() {
                    this.introView.playOutAnimation()
                }, this),
                this.currentView.events.once("view shown", function() {
                    this.introView.remove(),
                    s(r.main[0].children[1]).remove(),
                    this.introView = null,
                    this.currentView.setFromIntroState("grid"),
                    this.firstNavigation && (this.firstNavigation = !1),
                    this.currentViewIndex = this.newViewIndex,
                    this.currentViewPath = this.newViewPath,
                    this.currentViewArgument = this.newViewArgument,
                    this.introHomeTransition = !1,
                    this.allowNavigation = !0,
                    r.container.removeClass("in-transition")
                }, this),
                this.currentView.events.on("view action", this.viewAction, this),
                this.currentView.init(this.newViewIndex, this.newViewPath, this.newViewArgument, e)) : this.switchHomeState ? (this.currentView.events.once("state swtiched", function() {
                    this.currentViewIndex = this.newViewIndex,
                    this.currentViewPath = this.newViewPath,
                    this.currentViewArgument = this.newViewArgument,
                    this.switchHomeState = !1,
                    this.allowNavigation = !0,
                    r.container.removeClass("in-transition")
                }, this),
                "news" === this.currentViewPath && "news" === this.newViewPath ? this.currentView.newsChangePost() : this.currentView.switchState(this.newViewIndex)) : this.projectTransition ? (this.currentView.events.once("projects transition complete", function() {
                    var e = new this.routes[this.newViewIndex].view;
                    e.events.once("move bg", function() {
                        this.currentView.projectMoveBgUp()
                    }, this),
                    e.events.once("view rendered", function() {
                        this.currentView.remove("project transition"),
                        s(r.main[0].children[0]).remove()
                    }, this),
                    e.events.once("view shown", function() {
                        this.currentView = e,
                        this.currentViewIndex = this.newViewIndex,
                        this.currentViewPath = this.newViewPath,
                        this.currentViewArgument = this.newViewArgument,
                        this.projectTransition = !1,
                        this.allowNavigation = !0,
                        r.container.removeClass("in-transition")
                    }, this),
                    e.events.on("view action", this.viewAction, this),
                    e.init(this.newViewIndex, this.newViewPath, this.newViewArgument, "from projects")
                }, this),
                this.currentView.projectPlayTransition()) : this.switchService ? (this.currentView.events.once("service changed", function() {
                    this.currentViewIndex = this.newViewIndex,
                    this.currentViewPath = this.newViewPath,
                    this.currentViewArgument = this.newViewArgument,
                    this.switchService = !1,
                    this.allowNavigation = !0,
                    r.container.removeClass("in-transition")
                }, this),
                this.currentView.changeService(parseInt(this.newViewArgument))) : (this.currentView = new this.routes[this.newViewIndex].view,
                this.currentView.events.once("view shown", function() {
                    this.firstNavigation && (this.firstNavigation = !1),
                    this.languageChangeRequest && (this.languageChangeRequest = !1),
                    this.currentViewIndex = this.newViewIndex,
                    this.currentViewPath = this.newViewPath,
                    this.currentViewArgument = this.newViewArgument,
                    this.allowNavigation = !0,
                    r.container.removeClass("in-transition")
                }, this),
                this.currentView.events.on("view action", this.viewAction, this),
                this.currentView.init(this.newViewIndex, this.newViewPath, this.newViewArgument, e)),
                this.languageChangeRequest)
                    r.hamburguer.updateView();
                else if (this.newViewIndex !== r.viewIndex) {
                    var t = r.viewIndex;
                    r.viewIndex = this.newViewIndex,
                    1 === t && 3 === r.viewIndex || 3 === t && 1 === r.viewIndex || r.hamburguer.updateView()
                }
            },
            initIntro: function() {
                this.introView = new l,
                this.introView.events.once("final transition", function() {
                    this.introHomeTransition = !0,
                    this.routerController({
                        path: "/"
                    })
                }, this),
                this.introView.init(),
                o.intro()
            },
            viewAction: function(e, t, i) {
                "navigate" === e ? ("user click" === i && (this.userClickedOnProject = !0),
                n(t)) : "change laguage" === e && this.changeLanguage(t)
            },
            setViewData: function(e) {
                for (var t = 0, i = "", s = null, n = e.split("/", 3), a = 0; a < this.routes.length; a++)
                    if (n[1] === this.routes[a].path) {
                        i = this.routes[a].path,
                        t = a;
                        break
                    }
                n.length > 2 && "" !== n[2] && (s = n[2],
                1 === t && (t = 3)),
                this.newViewIndex = t,
                this.newViewPath = i,
                this.newViewArgument = s
            },
            changeLanguage: function(e) {
                r.lang = e,
                r._html.removeClass("en es cn").addClass(e),
                r.menu.resetMenu(),
                this.languageChangeRequest = !0;
                var t = "/" + this.currentViewPath;
                null !== this.currentViewArgument && (t += "/" + this.currentViewArgument),
                this.routerController({
                    path: t
                })
            }
        };
        t.exports = m
    }
    , {
        "./config/vars": 2,
        "./utils/preload": 17,
        "./views/about": 19,
        "./views/home": 20,
        "./views/intro": 21,
        "./views/project": 22,
        "./views/recognitions": 23,
        "./views/services": 24,
        eventemitter3: "eventemitter3",
        jquery: "jquery",
        page: "page"
    }],
    4: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = e("../utils/svgs")
          , a = e("./ui/scrollbar_tpl")
          , r = {
            main: function() {
                var e = '<section id="about">'
                  , t = s.pagesData.about["title_" + s.lang].replace(/(?:\r\n|\r|\n)/g, "");
                e += '<div class="inner">',
                e += "<header>",
                e += '<div class="title">',
                e += "<h1>" + t + "</h1>",
                e += '<div class="text-effect"><div class="square"><div class="text-inner">' + t + "</div></div></div>",
                e += '<div class="text-effect"><div class="square"><div class="text-inner">' + t + "</div></div></div>",
                e += '<div class="text-effect"><div class="square"><div class="text-inner">' + t + "</div></div></div>",
                e += "</div>",
                e += '<div class="first-text">',
                e += this.squareEffect(),
                e += '<div class="text">' + s.pagesData.about["intro_first_text_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="second-text">',
                e += "<div>" + s.pagesData.about["intro_second_text_" + s.lang] + "</div>",
                e += "</div>",
                e += "</header>",
                e += '<div class="white-line">',
                e += '<div class="white-text">',
                e += "<div>" + s.pagesData.about["white_part_text_" + s.lang] + "</div>",
                e += "</div>";
                var i = s.pagesData.about["white_part_title_" + s.lang].replace(/(?:\r\n|\r|\n)/g, "");
                e += '<div class="white-title">',
                e += "<h1>" + i + "</h1>",
                e += '<div class="text-effect"><div class="square"><div class="text-inner">' + i + "</div></div></div>",
                e += '<div class="text-effect"><div class="square"><div class="text-inner">' + i + "</div></div></div>",
                e += '<div class="text-effect"><div class="square"><div class="text-inner">' + i + "</div></div></div>",
                e += "</div>",
                e += "</div>",
                e += '<div class="architects">',
                e += '<div class="first-text">',
                e += "<div>" + s.pagesData.about["architects_text_first_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="second-text">',
                e += "<div>" + s.pagesData.about["architects_text_second_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="third-text">',
                e += this.squareEffect(),
                e += '<div class="text">' + s.pagesData.about["architects_text_third_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="title">';
                var r = "";
                r += s.pagesData.about["architects_bio_title_" + s.lang];
                var o = s.pagesData.about["architects_bio_small_" + s.lang].indexOf(" ");
                r += "<span>" + s.pagesData.about["architects_bio_small_" + s.lang].substr(0, o) + "</span>",
                r += "<span>" + s.pagesData.about["architects_bio_small_" + s.lang].substr(o + 1) + "</span>",
                e += "<h1>" + r + "</h1>",
                e += '<div class="text-effect"><div class="square"><div class="text-inner">' + r + "</div></div></div>",
                e += '<div class="text-effect"><div class="square"><div class="text-inner">' + r + "</div></div></div>",
                e += '<div class="text-effect"><div class="square"><div class="text-inner">' + r + "</div></div></div>",
                e += "</div>";
                for (var l = 0; 2 > l; l++)
                    e += '<div class="architect">',
                    e += '<div class="up">',
                    e += '<div class="image-container">',
                    e += '<div class="image-layer-transform-1"><div class="image-layer-transform-2">',
                    e += '<div class="image-layer" style="background-image: url(' + s.pagesData.about.architects_info[l].architect_photo + ');"></div>',
                    e += "</div></div>",
                    e += "</div>",
                    e += "</div>",
                    e += '<div class="bottom">',
                    e += '<div class="line"></div>',
                    e += '<div class="info-cnt">',
                    e += "<h3>" + s.pagesData.about.architects_info[l].architect_name + "</h3>",
                    e += "<p>" + s.pagesData.about.architects_info[l]["architect_description_" + s.lang] + "</p>",
                    e += '<div class="contact"><a href="' + s.pagesData.about.architects_info[l].architect_contact.url + '" target="_blank"><span></span><span>' + s.appData["about_contact_" + s.lang] + "</span></a></div>",
                    e += "</div>",
                    e += "</div>",
                    e += "</div>";
                e += "</div>",
                e += "<footer>",
                e += '<div class="logo">',
                e += '<div class="line1">Ortiz. Leon</div>',
                e += '<div class="line2">' + s.appData["menu_title_bottom_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="social-icons">',
                e += "<ul>";
                for (var l = 0; l < s.socialNetworks.length; l++)
                    e += "<li>",
                    e += '<a href="' + s.appData[s.socialNetworks[l] + "_url"].url + '" class="' + s.socialNetworks[l] + '" title="' + s.appData[s.socialNetworks[l] + "_url"].text + '" target="_blank">' + n["social_" + s.socialNetworks[l]] + n["social_" + s.socialNetworks[l]] + "</a>",
                    e += "</li>";
                e += "</ul>",
                e += "</div>",
                e += "</footer>",
                e += '<div class="grid">';
                for (var l = 0; 32 > l; l++)
                    e += "<span></span>";
                return e += "</div>",
                e += "</div>",
                e += '<div class="scroll-msg"><span></span>' + s.appData["scroll_message_" + s.lang] + "</div>",
                e += a(),
                e += "</section>"
            },
            squareEffect: function() {
                return '<div class="square-effect"><div></div><div></div></div>'
            }
        };
        t.exports = r
    }
    , {
        "../config/vars": 2,
        "../utils/svgs": 18,
        "./ui/scrollbar_tpl": 12
    }],
    5: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = e("../utils/svgs")
          , a = {
            en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            es: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"],
            cn: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        };
        t.exports = {
            main: function() {
                var e = '<section id="home">';
                e += '<div class="projects">',
                e += '<canvas class="projects-bg"></canvas>',
                e += '<div class="project-grid-container">';
                for (var t = 0; t < s.projectsData.length; t++) {
                    e += '<div class="project" data-bg-element="' + (t + 1) + '" data-name="' + s.projectsData[t].name + '">';
                    var i = Object.keys(s.projectsData[t].project_type)[0].toLowerCase()
                      , a = Object.keys(s.projectsData[t].project_subcategory)[0].toLowerCase()
                      , r = ""
                      , o = ""
                      , l = "";
                    switch (i) {
                    case "repositioning":
                        o = s.appData["project_type_repositioning_" + s.lang],
                        r = "repositioning";
                        break;
                    case "mixed use":
                        o = s.appData["project_type_mixed_use_" + s.lang],
                        r = "mixed";
                        break;
                    case "residential":
                        o = s.appData["project_type_residential_" + s.lang],
                        r = "residential";
                        break;
                    case "high rise":
                        o = s.appData["project_type_high_rise_" + s.lang],
                        r = "highrise";
                        break;
                    case "workplace":
                        o = s.appData["project_type_workplace_" + s.lang],
                        r = "workplace"
                    }
                    switch (e += '<div class="hover-effect ' + r + '">',
                    e += n[r],
                    e += "</div>",
                    e += '<h3 class="small"><span>' + s.projectsData[t]["title_" + s.lang] + "</span></h3>",
                    e += '<h3 class="big"><span>' + s.projectsData[t]["title_" + s.lang] + "</span></h3>",
                    a) {
                    case "office buildings":
                        l = s.appData["project_subcategories_office_buildings_" + s.lang];
                        break;
                    case "headquarters":
                        l = s.appData["project_subcategories_headquarters_" + s.lang];
                        break;
                    case "mixed":
                        l = s.appData["project_subcategories_mixed_" + s.lang];
                        break;
                    case "residential complex":
                        l = s.appData["project_subcategories_residential_complex_" + s.lang];
                        break;
                    case "residential house":
                        l = s.appData["project_subcategories_residential_house_" + s.lang];
                        break;
                    case "office complex":
                        l = s.appData["project_subcategories_office_complex_" + s.lang]
                    }
                    e += '<div class="more-info ' + r + '">',
                    e += '<div class="category">' + o + "</div>",
                    e += '<div class="subcategory">' + l + "</div>",
                    e += "</div>",
                    e += "</div>"
                }
                e += "</div>",
                e += '<div class="overlay"></div>',
                e += "</div>",
                e += '<div class="news">',
                e += '<div class="left">',
                e += '<div class="head">',
                e += this.newsEffect(),
                e += '<div class="text">',
                e += "<h1>" + s.appData["news_title_" + s.lang] + "</h1>",
                e += "<h2>" + s.appData["news_subtitle_" + s.lang] + ".</h2>",
                e += "</div>",
                e += "</div>",
                e += '<ul class="news-cnt"></ul>',
                e += '<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>',
                e += "</div>",
                e += '<div class="right">',
                e += '<div class="header-image-cnt">',
                e += "</div>",
                e += '<div class="right-title-cnt">',
                e += this.newEffect(),
                e += "</div>",
                e += '<div class="right-content-cnt">',
                e += this.newEffect(),
                e += '<div class="scrollbar"></div>',
                e += "</div>",
                e += '<div class="news-progress"><span></span></div>',
                e += '<div class="news-arrows">',
                e += '<div class="top">',
                e += '<div class="arrow"></div>',
                e += "</div>",
                e += '<div class="bottom">',
                e += '<div class="arrow"></div>',
                e += '<div class="pulse"></div>',
                e += "</div>",
                e += "</div>",
                e += '<div class="news-grid">';
                for (var t = 0; 6 > t; t++)
                    e += "<span></span>";
                e += "</div>",
                e += "</div>",
                e += "</div>",
                e += '<a href="' + s.url + '/news" class="view-all-news">' + s.appData["news_view_all_" + s.lang] + "</a>",
                e += '<div class="grid">';
                for (var t = 0; 6 > t; t++)
                    e += "<span></span>";
                e += "</div>",
                e += '<div class="home-text">',
                e += "<h2>" + s.appData["home_intro_text_" + s.lang] + "</h2>";
                for (var h = 0; 6 > h; h++)
                    e += '<div class="text-effect"><div class="square"><div class="text-inner">' + s.appData["home_intro_text_" + s.lang] + "</div></div></div>";
                return e += '<div class="scroll-button">',
                e += "<span></span>",
                e += '<div class="scroll-text"><span></span>' + s.appData["home_intro_text_button_" + s.lang] + "</div>",
                e += "</div>",
                e += "</div>",
                e += "</section>"
            },
            newsEffect: function() {
                return '<div class="news-effect"><div></div><div></div><div></div><div></div></div>'
            },
            newEffect: function() {
                return '<div class="new-effect"><div></div><div></div></div>'
            },
            fillNews: function(e, t) {
                for (var i = "", n = 3 * e; 3 * e + 3 > n; n++)
                    if ("undefined" != typeof s.postsData[n]) {
                        i += '<li class="new" data-slug="' + s.postsData[n].name + '"' + ("undefined" != typeof t ? ' style="opacity: 0.0001;"' : "") + ">";
                        var r = s.postsData[n].date.split(".", 3);
                        i += this.newsEffect(),
                        i += '<div class="info">',
                        i += '<div class="date">' + r[0] + " " + a[s.lang][parseInt(r[1]) - 1] + "</div>",
                        i += '<div class="title">' + s.postsData[n].title + "</div>",
                        i += '<div class="excpt">' + s.postsData[n].excerpt + "</div>",
                        i += "</div>",
                        i += "<figure></figure>",
                        i += "</li>"
                    } else
                        i += '<li class="placeholder"' + ("undefined" != typeof t ? ' style="opacity: 0.0001;"' : "") + "></div>";
                return i
            },
            singleNewHeader: function() {
                return '<div style="background-image: url(' + s.postsSingle.data.head_image + ');"></div>'
            },
            singleNewTitle: function() {
                for (var e = s.postsSingle.data.title.split(" "), t = !1, i = !1, n = 0; n < e.length; n++)
                    e[n].length > 10 && (t = !0,
                    e[n].length > 15 && (i = !0));
                var a = '<div class="content">';
                return a += "<h3",
                t && (a += i ? ' class="extra-small"' : ' class="small"'),
                a += ">" + s.postsSingle.data.title + "</h3><p>" + s.postsSingle.data.date + "</p>",
                a += "</div>"
            },
            singleNewContent: function() {
                var e = '<div class="content">';
                return e += s.postsSingle.data.content,
                e += "</div>"
            }
        }
    }
    , {
        "../config/vars": 2,
        "../utils/svgs": 18
    }],
    6: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = (e("../utils/svgs"),
        function() {
            var e = '<section id="intro">';
            e += "<canvas></canvas>",
            e += '<div class="grid">';
            for (var t = 0; 6 > t; t++)
                e += "<span></span>";
            e += "</div>",
            e += '<div class="texts-cnt">',
            e += '<div class="top">';
            for (var t = 0; 3 > t; t++) {
                if (0 === t)
                    var i = s.appData["intro_text_experience_" + s.lang];
                else if (1 === t)
                    var i = s.appData["intro_text_sustainability_" + s.lang];
                else
                    var i = s.appData["intro_text_vanguard_" + s.lang];
                e += "<h1>" + i + "</h1>"
            }
            e += "</div>",
            e += '<div class="bottom">';
            for (var t = 0; 3 > t; t++) {
                if (e += '<div class="phrase">',
                0 === t)
                    var n = s.appData["intro_phrase_experience_" + s.lang];
                else if (1 === t)
                    var n = s.appData["intro_phrase_sustainability_" + s.lang];
                else
                    var n = s.appData["intro_phrase_vanguard_" + s.lang];
                e += "<h2>" + n + "</h2>";
                for (var a = 0; 6 > a; a++)
                    e += '<div class="text-effect"><div class="square"><div class="text-inner">' + n + "</div></div></div>";
                e += "</div>"
            }
            e += "</div>",
            e += "</div>",
            e += '<div class="overlay">',
            e += '<div class="right-lines">';
            for (var t = 0; 7 > t; t++)
                e += "<span></span>";
            return e += "</div>",
            e += '<div class="bottom-lines"><span></span><span></span></div>',
            e += '<div class="section-texts">',
            e += '<div class="part">',
            e += "<h3>" + s.appData["intro_text_vanguard_" + s.lang] + "</h3>",
            e += '<div class="line"></div>',
            e += "</div>",
            e += '<div class="part">',
            e += "<h3>" + s.appData["intro_text_sustainability_" + s.lang] + "</h3>",
            e += '<div class="line"></div>',
            e += "</div>",
            e += '<div class="part">',
            e += "<h3>" + s.appData["intro_text_experience_" + s.lang] + "</h3>",
            e += '<div class="line"></div>',
            e += "</div>",
            e += "</div>",
            e += '<div class="crosshair first"></div>',
            e += '<div class="crosshair second"></div>',
            e += '<div class="crosshair third"></div>',
            e += '<div class="scroll-msg">',
            e += '<div class="line"></div>',
            e += '<div class="text"><span>' + s.appData["intro_scroll_message_" + s.lang] + "<b></b></span></div>",
            e += "</div>",
            e += '<div class="skip-msg">',
            e += '<div class="circle"></div>',
            e += '<div class="text">' + s.appData["intro_skip_text_" + s.lang] + "</div>",
            e += "</div>",
            e += "</div>",
            e += "</section>"
        }
        );
        t.exports = n
    }
    , {
        "../config/vars": 2,
        "../utils/svgs": 18
    }],
    7: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = e("../utils/svgs")
          , a = e("./ui/scrollbar_tpl")
          , r = {
            main: function(e) {
                for (var t = 0; t < s.projectsData.length; t++)
                    if (s.projectsData[t].name === e) {
                        var i = t;
                        break
                    }
                var r = '<section id="project">'
                  , o = Object.keys(s.projectsData[i].project_type)[0].toLowerCase()
                  , l = Object.keys(s.projectsData[i].project_subcategory)[0].toLowerCase()
                  , h = ""
                  , c = ""
                  , d = "";
                switch (o) {
                case "repositioning":
                    c = s.appData["project_type_repositioning_" + s.lang],
                    h = "repositioning";
                    break;
                case "mixed use":
                    c = s.appData["project_type_mixed_use_" + s.lang],
                    h = "mixed";
                    break;
                case "residential":
                    c = s.appData["project_type_residential_" + s.lang],
                    h = "residential";
                    break;
                case "high rise":
                    c = s.appData["project_type_high_rise_" + s.lang],
                    h = "highrise";
                    break;
                case "workplace":
                    c = s.appData["project_type_workplace_" + s.lang],
                    h = "workplace"
                }
                switch (l) {
                case "office buildings":
                    d = s.appData["project_subcategories_office_buildings_" + s.lang];
                    break;
                case "headquarters":
                    d = s.appData["project_subcategories_headquarters_" + s.lang];
                    break;
                case "mixed":
                    d = s.appData["project_subcategories_mixed_" + s.lang];
                    break;
                case "residential complex":
                    d = s.appData["project_subcategories_residential_complex_" + s.lang];
                    break;
                case "residential house":
                    d = s.appData["project_subcategories_residential_house_" + s.lang];
                    break;
                case "office complex":
                    d = s.appData["project_subcategories_office_complex_" + s.lang]
                }
                r += '<div class="inner ' + h + '">',
                r += "<header>",
                r += '<div class="bg-image" style="background-image: url(' + s.projectsData[i].projects_grid_image + ');">',
                r += "</header>",
                r += '<div class="content">',
                r += '<div class="infos">';
                for (var t = 0; 3 > t; t++) {
                    r += '<div class="info num' + (t + 1) + '">',
                    r += this.infosEffect(),
                    r += '<div class="info-cnt">';
                    var u = s.projectsData[i].info[t]["info_title_" + s.lang];
                    "m2" === u.substr(u.length - 2, 2) && (u = u.substr(0, u.length - 2) + "<b>m2</b>"),
                    r += '<div class="info-title">' + u + "</div>",
                    r += '<div class="info-bottom">' + s.projectsData[i].info[t]["info_bottom_" + s.lang] + "</div>",
                    r += "</div>",
                    r += "</div>"
                }
                r += "</div>",
                r += '<div class="bg-white-image">',
                r += '<canvas data-index="' + i + '"></canvas>',
                r += "</div>",
                r += '<div class="related-projects-space"></div>',
                r += "<footer>",
                r += '<div class="logo">',
                r += '<div class="line1">Ortiz. Leon</div>',
                r += '<div class="line2">' + s.appData["menu_title_bottom_" + s.lang] + "</div>",
                r += "</div>",
                r += '<div class="social-icons">',
                r += "<ul>";
                for (var t = 0; t < s.socialNetworks.length; t++)
                    r += "<li>",
                    r += '<a href="' + s.appData[s.socialNetworks[t] + "_url"].url + '" class="' + s.socialNetworks[t] + '" title="' + s.appData[s.socialNetworks[t] + "_url"].text + '" target="_blank">' + n["social_" + s.socialNetworks[t]] + n["social_" + s.socialNetworks[t]] + "</a>",
                    r += "</li>";
                r += "</ul>",
                r += "</div>",
                r += "</footer>",
                r += "</div>",
                r += '<div class="grid">';
                for (var t = 0; 21 > t; t++)
                    r += "<span></span>";
                r += "</div>",
                r += '<div class="title">',
                r += "<h1>" + s.projectsData[i]["title_" + s.lang] + "</h1>";
                for (var t = 0; 9 > t; t++)
                    r += '<div class="text-effect"><div class="square"><div class="text-inner">' + s.projectsData[i]["title_" + s.lang] + "</div></div></div>";
                r += "</div>",
                r += '<div class="type">',
                r += '<div class="inner-type">',
                r += '<img src="' + s.url + "/wp-content/themes/ortizleon/img/project-icons/" + h + '.png" alt="' + h + '" />',
                r += '<div class="type-cnt">',
                r += '<div class="line1">' + c + "</div>",
                r += '<div class="line2">' + d + "</div>",
                r += "</div>",
                r += "</div>",
                r += "</div>",
                r += '<div class="project-slider">';
                for (var t = 0; t < s.projectsData[i].slider_images.length; t++) {
                    var w = Object.keys(s.projectsData[i].slider_images[t].image_format)[0];
                    r += '<div class="slide format-' + w + '">',
                    r += '<div class="slide-img"><div class="slide-img-effect">',
                    r += '<div class="img-container" style="background-image: url(' + s.projectsData[i].slider_images[t].image + ');"></div>',
                    r += "</div></div>",
                    r += '<div class="slide-text">',
                    r += '<div class="square-effect"><div></div><div></div><div></div></div>',
                    r += '<div class="txt-container">' + s.projectsData[i].slider_images[t]["image_text_" + s.lang] + "</div>",
                    r += "</div>",
                    r += "</div>"
                }
                if (r += '<div class="slider-arrows">',
                r += '<div class="top">',
                r += '<div class="arrow"></div>',
                r += "</div>",
                r += '<div class="bottom">',
                r += '<div class="arrow"></div>',
                r += "</div>",
                r += n.project_slider_cirlce,
                r += "</div>",
                r += "</div>",
                r += '<div class="related-projects-text">',
                r += '<div class="inner-related-projects-text">',
                r += '<div class="vertical-line"></div>',
                r += '<div class="related-text-cnt">',
                r += '<div class="related-title">' + s.appData["project_related_" + s.lang].toUpperCase() + "</div>",
                1 === s.projectsData[i].related_projects_big_text_number) {
                    var m = s.projectsData[i].related_projects_big_text.length > 9;
                    r += '<div class="related-number nummm' + (m === !0 ? " small-num" : "") + '">',
                    r += "<span>" + s.projectsData[i].related_projects_big_text,
                    r += "<span>sqft</span>",
                    r += "</span>",
                    r += "</div>"
                } else
                    r += '<div class="related-number not-number">',
                    r += s.projectsData[i].related_projects_big_text,
                    r += "</div>";
                r += '<div class="related-small-text">' + s.projectsData[i]["related_project_text_small_" + s.lang] + "</div>",
                r += "</div>",
                r += "</div>",
                r += "</div>";
                for (var t = 0; t < s.projectsData[i].related_projects_selection.length; t++) {
                    for (var p = 0, g = 0; g < s.projectsData.length; g++)
                        if (s.projectsData[g].id === parseInt(s.projectsData[i].related_projects_selection[t])) {
                            p = g;
                            break
                        }
                    r += '<a href="' + s.url + "/projects/" + s.projectsData[p].name + '" class="related-projects-square num' + (t + 1) + '">',
                    r += '<div class="small-image" style="background-image: url(' + s.projectsData[p].small_image + ');"></div>',
                    r += '<div class="overlay"></div>',
                    r += '<div class="circle"></div>',
                    r += "</a>"
                }
                r += '<a href="' + s.url + '/projects" class="back-projects">',
                r += '<div class="square-effect"><div></div><div></div></div>',
                r += '<div class="back-text">' + s.appData["project_back_projects_" + s.lang] + "</div>",
                r += "</a>";
                for (var v = i === s.projectsData.length - 1 ? 0 : i + 1, t = 0; t < s.projectsData.length; t++)
                    if (s.projectsData[t].id === parseInt(s.projectsData[i].next_project_selection[0])) {
                        v = t;
                        break
                    }
                return r += '<a href="' + s.url + "/projects/" + s.projectsData[v].name + '" class="next-project">',
                r += '<div class="inner-next-project">',
                r += '<div class="next-image">',
                r += '<div class="image-src" style="background-image: url(' + s.projectsData[v].small_image + ');"></div>',
                r += "</div>",
                r += '<div class="next-text">',
                r += "<span>" + s.appData["project_next_" + s.lang] + "</span>",
                r += "<span>" + s.projectsData[v]["title_" + s.lang] + "</span>",
                r += "<span></span>",
                r += "</div>",
                r += "</div>",
                r += "</a>",
                r += "</div>",
                r += '<div class="scroll-msg"><span></span>' + s.appData["scroll_message_" + s.lang] + "</div>",
                r += a(),
                r += "</section>"
            },
            infosEffect: function() {
                return '<div class="infos-effect"><div></div><div></div><div></div></div>'
            }
        };
        t.exports = r
    }
    , {
        "../config/vars": 2,
        "../utils/svgs": 18,
        "./ui/scrollbar_tpl": 12
    }],
    8: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = e("../utils/svgs")
          , a = function() {
            var e = '<section id="recognitions">'
              , t = s.pagesData.recognitions["title_" + s.lang].replace(/(?:\r\n|\r|\n)/g, "");
            e += '<div class="inner">',
            e += '<div class="title">',
            e += "<h1>" + t + "</h1>",
            e += '<div class="text-effect"><div class="square"><div class="text-inner">' + t + "</div></div></div>",
            e += '<div class="text-effect"><div class="square"><div class="text-inner">' + t + "</div></div></div>",
            e += '<div class="text-effect"><div class="square"><div class="text-inner">' + t + "</div></div></div>",
            e += "</div>",
            e += "<footer>",
            e += '<div class="logo">',
            e += '<div class="line1">Ortiz. Leon</div>',
            e += '<div class="line2">' + s.appData["menu_title_bottom_" + s.lang] + "</div>",
            e += "</div>",
            e += '<div class="social-icons">',
            e += "<ul>";
            for (var i = 0; i < s.socialNetworks.length; i++)
                e += "<li>",
                e += '<a href="' + s.appData[s.socialNetworks[i] + "_url"].url + '" class="' + s.socialNetworks[i] + '" title="' + s.appData[s.socialNetworks[i] + "_url"].text + '" target="_blank">' + n["social_" + s.socialNetworks[i]] + n["social_" + s.socialNetworks[i]] + "</a>",
                e += "</li>";
            e += "</ul>",
            e += "</div>",
            e += "</footer>",
            e += '<div class="grid">';
            for (var i = 0; 12 > i; i++)
                e += "<span></span>";
            e += "</div>",
            e += '<div class="roulette-container">',
            e += '<div class="square">',
            e += '<div class="cnt">';
            for (var i = 0; i < s.pagesData.recognitions.recognitions.length; i++)
                e += "<article>",
                e += "<div>",
                e += "<h2>" + s.pagesData.recognitions.recognitions[i]["recognition_title_" + s.lang] + "</h2>",
                e += "</div>",
                e += "</article>";
            return e += "</div>",
            e += "</div>",
            e += '<div class="masks"></div>',
            e += "</div>",
            e += '<div class="progress"><span></span></div>',
            e += "</div>",
            e += '<div class="scroll-msg"><span></span>' + s.appData["scroll_message_" + s.lang] + "</div>",
            e += "</section>"
        };
        t.exports = a
    }
    , {
        "../config/vars": 2,
        "../utils/svgs": 18
    }],
    9: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = (e("../utils/svgs"),
        {
            main: function(e) {
                var t = '<section id="services">';
                t += '<canvas class="services-bg"></canvas>',
                t += '<div class="grid">';
                for (var i = 0; 6 > i; i++)
                    t += "<span></span>";
                t += "</div>",
                t += '<div class="texts-cnt">';
                for (var i = 0; i < s.pagesData.services.services.length; i++) {
                    var n = s.pagesData.services.services[i]["title_" + s.lang].replace(/(?:\r\n|\r|\n)/g, "");
                    t += '<div class="service-text type-' + (i + 1) + '">',
                    t += '<div class="title">',
                    t += "<h1>" + n + "</h1>";
                    for (var a = 0; 6 > a; a++)
                        t += '<div class="text-effect"><div class="square"><div class="text-inner">' + n + "</div></div></div>";
                    t += "</div>",
                    t += '<div class="big-text">',
                    t += this.squareEffect(),
                    t += '<div class="text">' + s.pagesData.services.services[i]["big_text_" + s.lang] + "</div>",
                    t += "</div>",
                    t += '<div class="small-text"><div class="text">' + s.pagesData.services.services[i]["small_text_" + s.lang] + "</div></div>",
                    t += "</div>"
                }
                return t += "</div>",
                t += '<div class="control-panel">',
                t += '<div class="prev"><div class="arrow"></div><div class="pulse"></div></div>',
                t += '<div class="next"><div class="arrow"></div><div class="pulse"></div></div>',
                t += '<div class="progress"><span><b>' + e + "</b>/" + s.pagesData.services.services.length + "</span></div>",
                t += "</div>",
                t += "</section>"
            },
            squareEffect: function() {
                return '<div class="square-effect"><div></div><div></div></div>'
            }
        });
        t.exports = n
    }
    , {
        "../config/vars": 2,
        "../utils/svgs": 18
    }],
    10: [function(e, t, i) {
        "use strict";
        var s = (e("../../config/vars"),
        function() {
            var e = '<figure id="hamburguer">';
            return e += '<svg version="1.1" viewBox="0 0 64 30">',
            e += '<rect id="square-up" stroke-width="2" stroke-dasharray="25,19" stroke-dashoffset="0" x="2" y="2" width="26" height="17" />',
            e += '<line id="line-up" x1="11" y1="11" x2="64" y2="11" stroke-width="2" stroke-dasharray="53,30" stroke-dashoffset="0" />',
            e += '<line id="line-bottom" x1="2" y1="28" x2="36" y2="28" stroke-width="2" stroke-dasharray="25,34" stroke-dashoffset="-9" />',
            e += "</svg>",
            e += "<span></span>",
            e += "</figure>"
        }
        );
        t.exports = s
    }
    , {
        "../../config/vars": 2
    }],
    11: [function(e, t, i) {
        "use strict";
        var s = e("../../config/vars");
        t.exports = {
            main: function() {
                for (var e = [{
                    name: "info"
                }, {
                    name: "news"
                }, {
                    name: "projects"
                }, {
                    name: "recognitions"
                }, {
                    name: "services"
                }, {
                    name: "about"
                }], t = {
                    en: "English",
                    es: "Castellano",
                    cn: "中文"
                }, i = '<div id="menu">', n = 0; n < e.length; n++)
                    i += '<div class="square ' + e[n].name + '" data-slug="' + e[n].name + '">',
                    i += this.squareEffect(),
                    0 === n ? (i += '<div class="info_cnt">',
                    i += "<p>" + s.appData.menu_address + "</p>",
                    i += "<p><b>" + s.appData["menu_phone_" + s.lang] + "</b>. " + s.appData.menu_phone_number + "</p>",
                    i += "<p><b>" + s.appData["menu_fax_" + s.lang] + "</b>. " + s.appData.menu_fax_number + "</p>",
                    i += "<p>" + s.appData.menu_email + "</p>",
                    i += "</div>") : i += "<h3>" + s.appData["menu_section_" + e[n].name + "_" + s.lang] + ".</h3>",
                    i += "</div>";
                i += '<div class="lang-selector">',
                i += "<span></span>",
                i += '<div class="lang">',
                i += s.appData["menu_change_language_" + s.lang] + ":";
                var a = !1
                  , r = !1;
                return "en" !== s.lang && (i += '<div class="language" data-lang="en">' + t.en + "</div>",
                a = !0),
                a && !r && (i += "/",
                r = !0),
                "es" !== s.lang && (i += '<div class="language" data-lang="es">' + t.es + "</div>",
                a = !0),
                a && !r && (i += "/",
                r = !0),
                "cn" !== s.lang && (i += '<div class="language" data-lang="cn">' + t.cn + "</div>"),
                i += "</div>",
                i += "</div>",
                i += '<div class="close"><span></span><span></span></div>',
                i += '<a class="signature" href="http://www.veintidosgrados.com" target="_blank">Design by <span>22º</span></a>',
                i += "</div>"
            },
            squareEffect: function() {
                return '<div class="square-effect"><div></div><div></div><div></div><div></div></div>'
            }
        }
    }
    , {
        "../../config/vars": 2
    }],
    12: [function(e, t, i) {
        "use strict";
        var s = function() {
            var e = '<div class="scrollbar">';
            return e += '<div class="bar"></div>',
            e += "</div>"
        };
        t.exports = s
    }
    , {}],
    13: [function(e, t, i) {
        "use strict";
        var s = e("../../config/vars")
          , n = function() {
            var e = '<figure id="title">';
            return e += '<div class="left">',
            e += "<span>O</span><span>r</span><span>t</span><span>i</span><span>z</span><span>.</span>",
            e += "</div>",
            e += '<div class="right">',
            e += "<span>L</span><span>e</span><span>o</span><span>n</span>",
            e += "</div>",
            e += '<div class="point"></div>',
            e += '<div class="bottom">' + s.appData["menu_title_bottom_" + s.lang] + "</div>",
            e += "</figure>"
        };
        t.exports = n
    }
    , {
        "../../config/vars": 2
    }],
    14: [function(e, t, i) {
        t.exports = function() {
            function e(e, t, i, s) {
                void 0 === e && (e = 0),
                void 0 === t && (t = 0),
                void 0 === i && (i = 1),
                void 0 === s && (s = 1),
                this.p1x = e,
                this.p1y = t,
                this.p2x = i,
                this.p2y = s,
                this.cx = 3 * this.p1x,
                this.cy = 3 * this.p1y,
                this.bx = 3 * (this.p2x - this.p1x) - this.cx,
                this.by = 3 * (this.p2y - this.p1y) - this.cy,
                this.ax = 1 - this.cx - this.bx,
                this.ay = 1 - this.cy - this.by,
                this.ease = this.ease.bind(this)
            }
            return e.create = function(t, i, s, n, a) {
                void 0 === i && (i = 0),
                void 0 === s && (s = 0),
                void 0 === n && (n = 1),
                void 0 === a && (a = 1);
                var r = new e(i,s,n,a);
                return "string" == typeof t && (e.easings[t] = r),
                r.ease
            }
            ,
            e.config = function(t, i, s, n) {
                return void 0 === t && (t = 0),
                void 0 === i && (i = 0),
                void 0 === s && (s = 1),
                void 0 === n && (n = 1),
                new e(t,i,s,n).ease
            }
            ,
            e.get = function(t) {
                return e.easings[t].ease
            }
            ,
            e.prototype.getEpsilon = function(e) {
                return void 0 === e && (e = 400),
                1 / (200 * e)
            }
            ,
            e.prototype.ease = function(e, t, i, s) {
                return this.solve(e, this.getEpsilon(s))
            }
            ,
            e.prototype.solve = function(e, t) {
                return this.sampleCurveY(this.solveCurveX(e, t))
            }
            ,
            e.prototype.sampleCurveX = function(e) {
                return ((this.ax * e + this.bx) * e + this.cx) * e
            }
            ,
            e.prototype.sampleCurveY = function(e) {
                return ((this.ay * e + this.by) * e + this.cy) * e
            }
            ,
            e.prototype.sampleDerivX = function(e) {
                return (3 * this.ax * e + 2 * this.bx) * e + this.cx
            }
            ,
            e.prototype.solveCurveX = function(e, t) {
                for (var i, s, n, a, r, o = 0, n = e; 8 > o; o++) {
                    if (a = this.sampleCurveX(n) - e,
                    Math.abs(a) < t)
                        return n;
                    if (r = this.sampleDerivX(n),
                    Math.abs(r) < t)
                        break;
                    n -= a / r
                }
                if (i = 0,
                s = 1,
                n = e,
                i > n)
                    return i;
                if (n > s)
                    return s;
                for (; s > i; ) {
                    if (a = this.sampleCurveX(n),
                    Math.abs(a - e) < t)
                        return n;
                    e > a ? i = n : s = n,
                    n = .5 * (s - i) + i
                }
                return n
            }
            ,
            e.easings = {},
            e
        }()
    }
    , {}],
    15: [function(e, t, i) {
        "use strict";
        t.exports = {
            round: function(e, t) {
                var i;
                return null == t && (t = 0),
                i = Math.pow(10, t),
                Math.round(e * i) / i
            },
            createRandomArray: function(e) {
                for (var t = [], i = 0; e > i; i++)
                    t.push(i);
                for (var s, n, a = t.length; 0 !== a; )
                    n = Math.floor(Math.random() * a),
                    a -= 1,
                    s = t[a],
                    t[a] = t[n],
                    t[n] = s;
                return t
            }
        }
    }
    , {}],
    16: [function(e, t, i) {
        "use strict";
        function s(e) {
            var t = e.deltaX
              , i = e.deltaY;
            return "firefox" == n.browser && 1 == e.deltaMode && (t *= a,
            i *= a),
            "edge" !== n.browser && "explorer" !== n.browser || (Math.abs(t) > 100 && (t /= r),
            Math.abs(i) > 100 && (i /= r)),
            {
                pixelX: t * o,
                pixelY: i * o
            }
        }
        var n = e("../config/vars")
          , a = 33
          , r = 1.8
          , o = .85;
        t.exports = s
    }
    , {
        "../config/vars": 2
    }],
    17: [function(e, t, i) {
        "use strict";
        var s = e("jquery")
          , n = e("eventemitter3")
          , a = e("resource-loader")
          , r = e("webfontloader")
          , o = e("../config/vars")
          , l = {
            events: new n,
            imagesREGEX: /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi,
            app: function() {
                r.load({
                    custom: {
                        families: ["Georgia", "Georgia-Bold", "butlermedium", "butlerbold", "galanogrotesquealtthinitalic", "galanogrotesquealtlightitalic", "galanogrotesquealtregular", "galanogrotesquealtsemibold", "galanogrotesquealtbold", "galanogrotesquealtheavy", "galanogrotesqueregular", "galanogrotesquesemibold"]
                    },
                    classes: !1
                })
            },
            intro: function() {
                var e = new a;
                e.add(o.appData.projects_initial_image),
                e.load()
            },
            view: function(e, t, i) {
                if (3 > e) {
                    var n = new a;
                    if (n.add(o.appData.projects_initial_image),
                    "" === t)
                        n.on("complete", function() {
                            this.events.emit("view preloaded")
                        }, this),
                        n.load();
                    else if ("projects" === t) {
                        for (var r = 0; r < o.projectsData.length; r++)
                            n.resources[o.projectsData[r].projects_grid_image] || n.add(o.projectsData[r].projects_grid_image);
                        n.on("complete", function() {
                            this.events.emit("view preloaded")
                        }, this),
                        n.load()
                    } else if ("news" === t) {
                        for (var l = null, r = 0; r < o.postsData.length; r++)
                            if (o.postsData[r].name === i) {
                                l = r;
                                break
                            }
                        if (null !== l) {
                            o.postsSingle.data = o.postsData[l],
                            n.resources[o.postsSingle.data.head_image] || n.add(o.postsSingle.data.head_image);
                            var h = o.postsSingle.data.content.match(this.imagesREGEX);
                            if (null !== h)
                                for (var r = 0; r < h.length; r++)
                                    n.resources[h[r]] || n.add(h[r]);
                            n.on("complete", function() {
                                o.postsSingle.preloaded = !0
                            }, this),
                            this.events.emit("view preloaded"),
                            n.load()
                        } else
                            s.ajax({
                                url: o.url + "/wp-json/ortizleon/v1/get_single_new",
                                data: {
                                    name: i
                                }
                            }).then(function(e) {
                                o.postsSingle.data = e[0],
                                n.resources[o.postsSingle.data.head_image] || n.add(o.postsSingle.data.head_image);
                                var t = o.postsSingle.data.content.match(this.imagesREGEX);
                                if (null !== t)
                                    for (var i = 0; i < t.length; i++)
                                        n.resources[t[i]] || n.add(t[i]);
                                n.on("complete", function() {
                                    o.postsSingle.preloaded = !0
                                }, this),
                                this.events.emit("view preloaded"),
                                n.load()
                            }
                            .bind(this))
                    }
                } else if (3 === e) {
                    for (var c = new a, r = 0; r < o.projectsData.length; r++)
                        if (o.projectsData[r].name === i) {
                            var d = r;
                            break
                        }
                    var u = Object.keys(o.projectsData[d].project_type)[0].toLowerCase()
                      , w = "repositioning";
                    switch (u) {
                    case "repositioning":
                        w = "repositioning";
                        break;
                    case "mixed use":
                        w = "mixed";
                        break;
                    case "residential":
                        w = "residential";
                        break;
                    case "high rise":
                        w = "highrise";
                        break;
                    case "workplace":
                        w = "workplace"
                    }
                    c.resources[o.url + "/wp-content/themes/ortizleon/img/project-icons/" + w + ".png"] || c.add(o.url + "/wp-content/themes/ortizleon/img/project-icons/" + w + ".png"),
                    c.resources[o.projectsData[d].projects_grid_image] || c.add(o.projectsData[d].projects_grid_image),
                    c.on("complete", function() {
                        this.events.emit("view preloaded");
                        for (var e = new a, t = 0; t < o.projectsData[d].slider_images.length; t++)
                            e.resources[o.projectsData[d].slider_images[t].image] || e.add(o.projectsData[d].slider_images[t].image);
                        for (var t = 0; t < o.projectsData[d].related_projects_selection.length; t++) {
                            for (var i = 0, s = 0; s < o.projectsData.length; s++)
                                if (o.projectsData[s].id === parseInt(o.projectsData[d].related_projects_selection[t])) {
                                    i = s;
                                    break
                                }
                            e.resources[o.projectsData[i].small_image] || e.add(o.projectsData[i].small_image)
                        }
                        for (var n = d === o.projectsData.length - 1 ? 0 : d + 1, t = 0; t < o.projectsData.length; t++)
                            if (o.projectsData[t].id === parseInt(o.projectsData[d].next_project_selection[0])) {
                                n = t;
                                break
                            }
                        e.resources[o.projectsData[n].small_image] || e.add(o.projectsData[n].small_image),
                        e.load()
                    }, this),
                    c.load()
                } else if (4 === e)
                    this.events.emit("view preloaded");
                else if (5 === e) {
                    for (var c = new a, r = 0; r < o.pagesData.about.architects_info.length; r++)
                        c.resources[o.pagesData.about.architects_info[r].architect_photo] || c.add(o.pagesData.about.architects_info[r].architect_photo);
                    c.load(),
                    this.events.emit("view preloaded")
                } else
                    6 === e && this.events.emit("view preloaded")
            }
        };
        t.exports = l
    }
    , {
        "../config/vars": 2,
        eventemitter3: "eventemitter3",
        jquery: "jquery",
        "resource-loader": "resource-loader",
        webfontloader: "webfontloader"
    }],
    18: [function(e, t, i) {
        "use strict";
        var s = {
            repositioning: '<svg version="1.1" viewBox="0 0 360 226"><path d="M353.1,215h-21.9v-7.2h11.2c0,0,0,0,0,0c1.7,0,3.1-0.8,3.1-2.5c0-0.4-0.1-0.5-0.2-0.8l-10.7-44.9c-0.3-1.4-1.6-2.3-3-2.3s-2.7,1-3,2.4l-10.8,45.4c-0.2,0.9,0,1.4,0.6,2.1c0.6,0.7,1.5,0.6,2.4,0.6h7.4v7.2h-26.8v-7.2h11.2c0,0,0,0,0,0c1.7,0,3.1-0.8,3.1-2.5c0-0.4-0.1-0.5-0.2-0.8l-10.7-44.9c-0.3-1.4-1.6-2.3-3-2.3s-2.7,1-3,2.4l-10.8,45.4c-0.2,0.9,0,1.4,0.6,2.1c0.6,0.7,1.5,0.6,2.4,0.6h7.4v7.2h-17.5v-63.9h21.9c1.7,0,0.8-0.3,0.8-2V79.1c0-1.7,0.9-4.2-0.8-4.2h-21.9V9c0-1.7,0.9-4.2-0.8-4.2h-70.1c-1.7,0-5.4,2.5-5.4,4.2v70.1c0,1.7,3.7,2,5.4,2h17.3v63.9h-17.3c-1.7,0-5.4,2.5-5.4,4.2V215h-9.3v-64.9c0-1.7,0.9-4.2-0.8-4.2H153V61.5c0-1.7,0.9-4.2-0.8-4.2h-101c-1.7,0-5.4,2.5-5.4,4.2V215H25.2v-7.2h11.2c0,0,0,0,0,0c1.7,0,3.1-0.8,3.1-2.5c0-0.4-0.1-0.5-0.2-0.8l-10.7-44.9c-0.3-1.4-1.6-2.3-3-2.3c-1.4,0-2.7,1-3,2.4l-10.8,45.4c-0.2,0.9,0,1.4,0.6,2.1c0.6,0.7,1.5,0.6,2.4,0.6h7.4v7.2H6.9c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1h62.9h124.7h15.5h70.1h73.2c1.7,0,3.1-1.4,3.1-3.1C356.2,216.4,354.8,215,353.1,215z M324.7,201.6l6.9-28.9l6.9,28.9H324.7z M294.8,201.6l6.9-28.9l6.9,28.9H294.8z M18.7,201.6l6.9-28.9l6.9,28.9H18.7z M169.5,152.2v43.3h-17.5v-43.3H169.5z M131.3,195.4v-43.3h17.5v43.3H131.3z M110.7,195.4v-43.3h17.5v43.3H110.7z M90.1,195.4v-43.3h17.5v43.3H90.1z M146.8,63.5V146h-23.6l-23.2-82.4H146.8z M52,63.5h44.8L120,146H69.7c-1.7,0-5.4,2.5-5.4,4.2V215H52V63.5z M70.5,152.2H87v43.3h-1.8c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1H87V215H70.5V152.2z M90.1,201.6h7.2V215h-7.2V201.6z M100.4,201.6h17.5V215h-17.5V201.6z M121,201.6h17.5V215H121V201.6z M141.6,201.6h17.5V215h-17.5V201.6z M162.2,201.6h7.2V215h-7.2V201.6z M172.6,201.6h7.4c1.7,0,3.1-1.4,3.1-3.1c0-1.7-1.4-3.1-3.1-3.1h-7.4v-43.3H189V215h-16.5V201.6z M264.9,144.9l-9.4-63.9h10.3l9.4,63.9H264.9z M297.2,81.1v63.9h-17.3h-1.7l-9.4-63.9h11.1H297.2z M234.3,74.9l2.6-9.5c0.2,0.1,0.5,0.2,0.7,0.2h36.9v9.3H234.3z M249.6,20.2c0.2,0,0.3,0.1,0.5,0.1h24.5v8.2h-27.3L249.6,20.2z M246.4,31.6h28.2v8.2h-30.5L246.4,31.6z M243.3,42.8c0.2,0.1,0.4,0.1,0.6,0.1h30.7v8.2h-33.6L243.3,42.8z M240.1,54.3h34.5v8.2h-36.8L240.1,54.3z M274.6,17.2h-24.1l1.7-6.2h22.4V17.2z M210.7,74.9V11h38.3l-17.8,63.9H210.7z M233.3,81.1h19l9.4,63.9h-28.4V81.1z M248.7,182h-38v-8.2h36.8L248.7,182z M210.7,196.5h40.1l1.2,8.2h-41.3V196.5z M210.7,193.4v-8.2H249c0,0,0,0,0.1,0l1.2,8.3H210.7z M210.7,170.7v-8.2h35.1l1.2,8.2H210.7z M210.7,151.1h21.9h11.6l1.2,8.2h-34.6V151.1z M210.7,215v-7.2h41.8l1.1,7.2H210.7z M256.6,215l-6.2-41.6c0.1-0.2,0.1-0.1,0.1-0.4c0-0.4-0.2-1.2-0.4-1.4l-3-20.5h27.3V215H256.6z"/></svg>',
            mixed: '<svg version="1.1" viewBox="0 0 360 148"><path d="M351.5,137.3h-21v-10.6c17-0.4,17.4-16.5,17.4-21.8c0-0.2,0-18-2.4-35.5c-2.9-21.4-7.9-31-15.6-31h-0.4c-7.7,0-12.7,9.6-15.6,31c-2.4,17.6-2.4,35.5-2.4,35.7c0,5.2,0.1,20.4,16.1,21.6v10.7h-19v-36.8c0-1.7-1.4-2.2-3-2.2H299c-0.8-14-4.1-36-17.8-36h-0.4c-13.7,0-17.1,22-17.8,36h-16.5V45.5c0-0.1,0-0.3,0-0.4l6.7,1.3c0.2,0,0.4,0.1,0.6,0.1c1.4,0,2.7-1,2.9-2.4c0.3-1.6-0.8-3.2-2.4-3.5L78.9,6.8c-1.6-0.3-3.2,0.8-3.5,2.4c-0.3,1.6,0.8,3.2,2.4,3.5l4.7,0.9v49.7h-21c-1.7,0-3,0.5-3,2.2v70c0,0.4,0.1,1.8,0.2,1.8H35.5v-9.3c9-0.2,17.1-3.3,17.1-20.8c0-8.7-1.8-21.8-4.6-32.5c-3.8-14.8-8.3-22-13.7-22c-5.5,0-10,7.2-13.7,22C17.8,85.3,16,98.4,16,107.1c0,17.2,7.5,20.5,16.5,20.8v9.4h-24c-1.7,0-3,1.3-3,3c0,1.7,1.3,3,3,3h343c1.7,0,3-1.3,3-3C354.5,138.6,353.2,137.3,351.5,137.3z M319.8,70.1c2.7-19.4,6.9-25.8,9.7-25.8h0.4c2.8,0,7,6.4,9.7,25.8c2.4,17.2,2.4,34.7,2.4,34.9c0,11.4-3.4,16.1-12,16.1c0,0-0.1,0.2-0.1,0.2h-0.3c-8.6,0-12-4.6-12-16C317.4,105.1,317.5,87.3,319.8,70.1z M22,107.1c0-8.1,1.8-20.9,4.4-31c3.7-14.4,7.2-17.5,7.9-17.5c0.7,0,4.3,3.1,7.9,17.5c2.6,10.1,4.4,22.9,4.4,31c0,13.8-4.9,14.8-12.3,14.8C26.8,122,22,120.9,22,107.1z M269,97.9c0.9-14,4.3-29.6,11.8-29.6h0.4c7.5,0,10.9,15.5,11.8,29.6c0.1,2.1,0.2,3.9,0.2,5.8c0,0.5,0,0.9,0,1.4c0,11.4-3.4,15.5-12,15.5c0,0-0.1-0.3-0.1-0.3h-0.3c-8.6,0-12-4.2-12-15.6c0-0.5,0-0.7,0-1.2C268.8,101.6,268.9,99.9,269,97.9z M217.5,110.3h-3V38.9l26.4,5.1c-0.3,0.4-0.4,0.9-0.4,1.5v64.8H217.5z M211.5,110.3h-29V32.8l29,5.6V110.3z M179.5,110.3h-29V26.6l29,5.6V110.3z M147.5,110.3h-28V20.7l28,5.4V110.3z M116.5,20.1v90.2h-28V65.5V14.7L116.5,20.1z M64.5,103.3h18v6h-18V103.3z M64.5,94.3h18v6h-18V94.3z M82.5,91.3h-18v-6h18V91.3z M64.5,112.3h18v0.2v6.8h-18V112.3z M82.5,82.3h-18v-6h18V82.3z M64.5,122.3h18v6h-18V122.3z M64.5,69.3h18v4h-18V69.3z M64.5,135.5v-4.2h18v6H64.3C64.4,137.3,64.5,135.8,64.5,135.5z M202.5,137.3h-5v-13h5V137.3z M204,121.3h-8c-0.8,0-1.5-0.2-1.5,0.7v15.3h-106v-21h126v21h-9V122C205.5,121.1,204.8,121.3,204,121.3z M220.5,116.3h23c1.7,0,3-2.2,3-3.8v-8.2h16.3c0,0,0,0.6,0,1.1c0,5.3-0.3,20.5,16.7,21.3v10.6h-59V116.3z M282.5,126.7c17-0.8,16.7-16.1,16.7-21.3c0-0.5,0-1.1,0-1.1h3.3v33h-20V126.7z"/></svg>',
            residential: '<svg version="1.1" viewBox="0 0 380 107"><path d="M374.5,98h-36.7V85.9c10-0.2,18.9-3.4,18.9-22.8c0-14-6.3-60.2-20-60.2c-13.8,0-19.9,46.2-19.9,60.2c0,18.7,8.1,22.4,18.1,22.8V98h-24V67.3c0-0.3,0.7-0.7,0.9-1.3c0.6-1.5-0.1-3.3-1.6-3.9l-81-34.4c-0.8-0.3-1.6-0.2-2.4,0.1L200.5,39c0,0,0,0,0,0h-44c-1.7,0-2.7,1.1-2.7,2.7v17l-7.9,3.3c0,0-0.1,0-0.1,0l-43.2,10.4c-1.6,0.4-2.5,2-2.1,3.6c0.2,0.7,0.3,1.3,1.3,1.7V98h-25V85.9c10-0.3,18.3-3.7,18.3-22.8c0-14-6.3-60.2-20-60.2S55.2,49.1,55.2,63.1c0,19.1,8.6,22.5,18.6,22.8V98h-39V85.9c10-0.3,18.3-3.7,18.3-22.8c0-14-6.3-60.2-20-60.2S13.2,49.1,13.2,63.1c0,19.1,8.6,22.5,18.6,22.8V98H5.5c-1.7,0-3,1.3-3,3c0,1.7,1.3,3,3,3h369c1.7,0,3-1.3,3-3C377.5,99.4,376.2,98,374.5,98z M327.4,28.6c4.1-16,8-19.6,9.1-19.6c1.1,0,5,3.6,9.1,19.6c2.9,11.3,4.9,25.5,4.9,34.5c0,15.6-5.8,16.8-14,16.8s-14-1.2-14-16.8C322.5,54.1,324.5,39.9,327.4,28.6z M65.9,28.6C70,12.6,73.9,9,75,9c1.1,0,5,3.6,9.1,19.6C87,39.9,89,54.1,89,63.1c0,15.6-5.8,16.8-14,16.8s-14-1.2-14-16.8C61,54.1,63,39.9,65.9,28.6z M23.9,28.6C28,12.6,31.9,9,33,9c1.1,0,5,3.6,9.1,19.6C45,39.9,47,54.1,47,63.1c0,15.6-5.8,16.8-14,16.8s-14-1.2-14-16.8C19,54.1,21,39.9,23.9,28.6z M307.6,64.3l1.2,0.5h-0.2L307.6,64.3C307.6,64.3,307.6,64.3,307.6,64.3z M159.8,45h26.6l-26.6,11.2V45z M104.8,83h41v3h-41V83z M145.8,68.3V74h-22.9L145.8,68.3z M145.8,77v3h-41v-1.9l5.7-1.1H145.8z M104.8,89h41v3h-41V89z M104.8,95h41v3h-41V95z M259.8,97V87h6v10H259.8z M267,84h-9c-0.8,0-1.2,0.4-1.2,1.2V98h-16V76h46v22h-18V85.3C268.8,84.4,267.8,84,267,84z M289.8,75.6c1-0.4,1.9-1.4,1.9-2.7c0-1.7-1.5-2.9-3.1-2.9h-49c-1.7,0-2.9,1.2-2.9,2.9c0,0.9,0.1,1.5,1.1,2.1V98h-89V67.4l5.9-2.6l2.6-1.1c0.1,0,0.2,0,0.2-0.1c0.1,0,0.2-0.1,0.3-0.1l70-29.8l73.4,31.1l6.5,2.8V98h-18V75.6z"/><path d="M229.8,71.5c0-0.8-0.7-1.5-1.5-1.5h-72c-0.8,0-1.5,0.7-1.5,1.5v19c0,0.8,0.7,1.5,1.5,1.5h72c0.8,0,1.5-0.7,1.5-1.5V71.5z M157.8,73h32v16h-32V73z M226.8,89h-34V73h34V89z"/><path d="M227.3,44.1c-3.2,0-5.7,2.6-5.7,5.7c0,3.2,2.6,5.7,5.7,5.7c3.2,0,5.7-2.6,5.7-5.7C233,46.7,230.4,44.1,227.3,44.1z M227.3,52.6c-1.5,0-2.7-1.2-2.7-2.7c0-1.5,1.2-2.7,2.7-2.7c1.5,0,2.7,1.2,2.7,2.7C230,51.3,228.8,52.6,227.3,52.6z"/></svg>',
            highrise: '<svg version="1.1" viewBox="0 0 360.8 281"><path d="M353.9,277.8c1.7,0,3-1.3,3-3c0-1.7-1.3-3-3-3h-9.7v-3.9c3-0.6,7-3.1,7-10.5c0-2.6-0.3-9.2-1.1-15.1c-0.9-6.7-2.8-14.5-8.2-14.5h-0.2c-5.5,0-7.2,7.8-8.2,14.5c-0.8,5.8-0.9,12.4-0.9,15c0,8.3,4.6,10.5,8.6,10.7v3.8h-17v-3.9c3-0.6,7-3.1,7-10.5c0-2.6-0.3-9.2-1.1-15.1c-0.9-6.7-2.8-14.5-8.2-14.5h-0.2c-5.5,0-7.2,7.8-8.2,14.5c-0.8,5.8-0.9,12.4-0.9,15c0,8.3,4.6,10.5,8.6,10.7v3.8h-17v-3.9c3-0.6,7-3.1,7-10.5c0-2.6-0.3-9.2-1.1-15.1c-0.9-6.7-2.8-14.5-8.2-14.5h-0.2c-5.5,0-7.2,7.8-8.2,14.5c-0.8,5.8-0.9,12.4-0.9,15c0,8.3,4.6,10.5,8.6,10.7v3.8h-9.8c-5.4-7-37.2-53.9-37.4-249c4-1.3,7-5.1,7-9.6c0-5.6-4.5-10.1-10.1-10.1c-5.6,0-10,4.6-10,10.1c0,4.6,3.4,8.5,7.4,9.7v213.1l-4-3.6V58.2c0-0.8-0.4-1.8-1-2.3c-0.6-0.6-1.5-1.1-2.2-1.1c0,0,0,0,0,0l-30.8,0.2c-1.5,0-2.7,1.2-3,2.7l-19.2,125.1L65.9,74.5c-0.9-0.8-2-1-3.1-0.5c-1.1,0.5-1.6,1.6-1.6,2.7v195h-14v-3.9c3-0.6,7-3.1,7-10.5c0-2.6-0.3-9.2-1.1-15.1c-0.9-6.7-2.8-14.5-8.2-14.5h-0.2c-5.5,0-7.2,7.8-8.2,14.5c-0.8,5.8-0.9,12.4-0.9,15c0,8.3,4.6,10.5,8.6,10.7v3.8h-17v-3.9c3-0.6,7-3.1,7-10.5c0-2.6-0.3-9.2-1.1-15.1c-0.9-6.7-2.8-14.5-8.2-14.5h-0.2c-5.5,0-7.2,7.8-8.2,14.5c-0.8,5.8-0.9,12.4-0.9,15c0,8.3,4.6,10.5,8.6,10.7v3.8H6.9c-1.7,0-3,1.3-3,3c0,1.7,1.3,3,3,3H353.9z M24.6,261.8c-2,0-3.2-0.2-3.2-4.6c0-9.9,1.5-20.4,3.3-22.9c1.7,2.6,3.3,13,3.3,22.9c0,4.4-1.2,4.6-3.2,4.6H24.6z M44.6,261.8c-2,0-3.2-0.2-3.2-4.6c0-9.9,1.5-20.4,3.3-22.9c1.7,2.6,3.3,13,3.3,22.9c0,4.4-1.2,4.6-3.2,4.6H44.6z M82.2,271.8c1.4-22,19.7-39.5,42.1-39.5c22.4,0,40.7,17.5,42.1,39.5H82.2z M174.2,271.8h-1.8c-1.4-25-22.4-45.5-48.1-45.5c-25.7,0-46.7,20.5-48.1,45.5h-9.1V83.5L187,189.8L174.2,271.8z M224.1,271.8h-43.8l2.6-17h41.2V271.8z M224.1,251.8h-40.8l2.1-14h38.6V251.8z M224.1,222.8v12H186l2.1-14h33.8h2.2V222.8z M224.1,214.8v3h-5.6h-29.9l2.1-14h12h9h12.4V214.8z M224.1,200.8h-15.7h-9h-8.2l1-6.3l1.1-7.1l0.1-0.6h30.8V200.8z M224.1,183.8h-30.3l2.1-14h28.2V183.8z M224.1,166.8h-27.7l2.1-14h25.6V166.8z M224.1,149.8H199l2.1-14h23V149.8z M224.1,132.8h-22.5l2.1-14h20.4V132.8z M224.1,115.8h-19.9l2.1-14h17.8V115.8z M224.1,98.8h-17.3l2.1-14h15.1V98.8z M224.1,81.8h-14.7l3.3-20.7l11.4,0.1V81.8z M238.1,227.2v8v36.6h-11v-46.3v-8V61.2l11,0V227.2z M248.1,271.8h-4v-31.2l4,3.6V271.8z M250.7,17.4c-2.3,0-4.1-1.8-4.1-4.1c0-2.3,1.8-4.1,4.1-4.1c2.3,0,4.1,1.8,4.1,4.1C254.8,15.6,253,17.4,250.7,17.4z M279.7,264.2c1.6,3.3,3,5.7,4.2,7.7h-4.6h-25.2v-22.4v-8v-89.5C261.1,216.1,272,248.5,279.7,264.2 M301.6,261.8c-2,0-3.2-0.2-3.2-4.6c0-9.9,1.5-20.4,3.3-22.9c1.7,2.6,3.3,13,3.3,22.9c0,4.4-1.2,4.6-3.2,4.6H301.6z M321.6,261.8c-2,0-3.2-0.2-3.2-4.6c0-9.9,1.5-20.4,3.3-22.9c1.7,2.6,3.3,13,3.3,22.9c0,4.4-1.2,4.6-3.2,4.6H321.6z M341.6,261.8c-2,0-3.2-0.2-3.2-4.6c0-9.9,1.5-20.4,3.3-22.9c1.7,2.6,3.3,13,3.3,22.9c0,4.4-1.2,4.6-3.2,4.6H341.6z"/></svg>',
            workplace: '<svg version="1.1" viewBox="0 0 360 188"><path id="XMLID_76_" class="st0" d="M352.5,176.2h-28.8v-17.9h6c1.6,0,3-2.6,3-4.3v-9.7h8.9c1.6,0,3-2.6,3-4.3V95.3c0-1.6-1.3-1.7-3-1.7h-9.1c0.1,0,0.2-1.9,0.2-2.3v-8c0-1.6-1.3-1.7-3-1.7H227.2V8.9c0-0.9-0.4-1.7-1.1-2.3c-0.7-0.6-1.6-0.8-2.5-0.6L99.4,31.2C98,31.5,97,33.3,97,34.7l-0.1,5.2H59.2c-1.6,0-3,0.1-3,1.7v12.2h-10c-1.6,0-3,0.1-3,1.7v21.9c0,1.6,1.3,4.3,3,4.3h10v6h-10c-1.6,0-3,0.1-3,1.7v21.9c0,1.6,1.3,4.3,3,4.3h10v6h-10c-1.6,0-3,0.1-3,1.7v21.9c0,1.6,1.3,4.3,3,4.3h10v26.8H26.4v-7H35c0,0,0,0,0,0c1.6,0,3-2,3-3.6c0-0.4-0.1-1-0.2-1.3l-10.4-43.6c-0.3-1.3-1.5-2.4-2.9-2.4c-1.4,0-2.6,0.9-2.9,2.3l-10.4,43.7c-0.2,0.9,0,2.5,0.6,3.2c0.6,0.7,1.4,1.8,2.3,1.8h9.3v7H7.5c-1.6,0-3,1.3-3,3c0,1.6,1.3,3,3,3h345c1.6,0,3-1.3,3-3C355.5,177.5,354.2,176.2,352.5,176.2z M17.9,163.1l6.7-28.1l6.7,28.1H17.9z M340.5,138.1h-16.3l5.5-10h10.8V138.1z M340.5,107.2v4H339L340.5,107.2z M340.5,114.1v11h-9.2l6-11H340.5z M324.5,125.1h-10.9l-6-11h23L324.5,125.1z M322.9,128.1l-3.8,6.9l-3.8-6.9H322.9z M306.8,125.1h-24.1l6-11h12L306.8,125.1z M264.9,125.1l-6-11h23l-6,11H264.9z M274.1,128.1l-3.8,6.9l-3.8-6.9H274.1z M216.8,125.1l-6-11h23l-6,11H216.8z M226.1,128.1l-3.8,6.9l-3.8-6.9H226.1z M200.5,114.1h3.4l6,11h-9.5V114.1z M240.6,114.1H252l6,11h-23.5L240.6,114.1z M246.3,103.8l4,7.4h-8.1L246.3,103.8z M290.3,111.1l4.4-8l4.4,8H290.3z M283.5,111.1h-26.3l-6.6-12h39.5L283.5,111.1z M235.4,111.1h-26.3l-6.6-12H242L235.4,111.1z M202.3,111.1h-1.8v-4.5L202.3,111.1z M200.5,128.1h11.1l5.5,10h-16.6V128.1z M232.9,128.1h26.8l5.5,10h-37.7L232.9,128.1z M281,128.1h27.4l5.5,10h-38.4L281,128.1z M338.8,99.1l-6.6,12h-26.3l-6.6-12H338.8z M222.5,11.5v69.6h-24V16.8c0-0.1,0-0.3-0.1-0.4L222.5,11.5z M195.5,81.1h-10c-1.7,0-3,0.1-3,1.7v74.3h-10V21.7l23-4.7V81.1z M169.5,157.1h-21v-8h10c1.7,0,3-2.6,3-4.3v-22c0-1.7-1.4-1.7-3-1.7h-10v-6h10c1.7,0,3-2.6,3-4.3v-22c0-1.7-1.4-1.7-3-1.7h-10v-6h10c1.7,0,3-2.6,3-4.3v-22c0-1.7-1.4-1.7-3-1.7h-10V40.8c0-1.3-1-2.4-2-2.8V27l23-4.7V157.1z M62.5,143.1v-16h80v16H62.5z M148.5,127.1h7v16h-7V127.1z M62.5,93.1h80v16h-80V93.1z M148.5,93.1h7v16h-7V93.1z M62.5,59.1h80v16h-80V59.1z M148.5,59.1h7v16h-7V59.1z M103.5,36.4l40-8.8v11.5h-40.1L103.5,36.4z M62.5,45.1h37.4c0.1,0,0.3,0,0.4,0.1c0.2,0,0.4-0.1,0.5-0.1h41.6v8h-80V45.1z M49.5,75.1v-16h7v16H49.5z M62.5,81.1h80v6h-80V81.1z M49.5,109.1v-16h7v16H49.5z M62.5,115.1h80v6h-80V115.1z M49.5,143.1v-16h7v16H49.5z M62.5,149.1h6v27h-6V149.1z M71.5,149.1h6v27h-6V149.1z M80.5,149.1h6v27h-6V149.1z M89.5,149.1h6v27h-6V149.1z M98.5,149.1h44v9.7v17.3h-44V149.1z M148.5,163.1h34v13h-34V163.1z M188.5,87.1h140v3.7c0,0.4,0.1,2.3,0.2,2.3H197.5c-1.7,0-3,0.1-3,1.7v45c0,1.7,1.3,4.3,3,4.3h23.9c0.3,0,0.6,0.2,0.9,0.2c0.3,0,0.6-0.2,0.9-0.2h46.2c0.3,0,0.6,0.2,0.9,0.2s0.6-0.2,0.9-0.2h46.9c0.3,0,0.6,0.2,0.9,0.2s0.6-0.2,0.9-0.2h8.6v8h-80.4c-0.5,0-0.9-0.5-1.3-0.3l-46.1,23.4c-0.3,0.2-0.6,0.9-0.8,0.9h-11.4V87.1z M248.9,158.1h11.7v18h-47.6L248.9,158.1z M263.5,158.1h17v18h-17V158.1z M283.5,158.1h17v18h-17V158.1z M303.5,158.1h16v18h-16V158.1z"/></svg>',
            social_linkedin: '<svg version="1.1" viewBox="0 0 25 25"><circle fill="#27262c" cx="12.5" cy="12.5" r="12.1"/><path fill="#FFFFFF" d="M18.7,13.1v4.5h-2.6v-4.2c0-1.1-0.4-1.8-1.3-1.8c-0.7,0-1.1,0.5-1.3,1c-0.1,0.2-0.1,0.4-0.1,0.6v4.4h-2.6c0,0,0-7.1,0-7.8h2.6v1.1c0,0,0,0,0,0h0v0c0.3-0.5,1-1.3,2.3-1.3C17.4,9.6,18.7,10.7,18.7,13.1z M8.1,6C7.2,6,6.6,6.6,6.6,7.4c0,0.7,0.6,1.4,1.4,1.4h0c0.9,0,1.5-0.6,1.5-1.4C9.5,6.6,9,6,8.1,6z M6.7,17.6h2.6V9.8H6.7V17.6z"/></svg>',
            social_facebook: '<svg version="1.1" viewBox="0 0 25 25"><circle fill="#27262c" cx="12.5" cy="12.5" r="12.1"/><path fill="#FFFFFF" d="M10.7,8.4c0,0.3,0,1.8,0,1.8H9.4v2.3h1.4v6.7h2.8v-6.7h1.9c0,0,0.2-1.1,0.3-2.3c-0.2,0-2.1,0-2.1,0s0-1.3,0-1.5c0-0.2,0.3-0.5,0.6-0.5c0.3,0,0.9,0,1.5,0c0-0.3,0-1.4,0-2.4c-0.8,0-1.7,0-2.1,0C10.7,5.8,10.7,8.1,10.7,8.4z"/></svg>',
            social_twitter: '<svg version="1.1" viewBox="0 0 25 25"><circle fill="#27262c" cx="12.5" cy="12.5" r="12.1"/><path fill="#FFFFFF" d="M18.4,10.9c0.9-0.2,1.4-0.7,1.5-1.3c-0.3,0.2-1.2,0.6-1.8,0.5c0-0.1-0.1-0.2-0.1-0.3c-0.7-1.4-2.3-2.4-3.7-2c0.1-0.1,0.2-0.1,0.3-0.2c0.2-0.1,1.1-0.4,0.9-0.7c-0.2-0.3-1.2,0.4-1.5,0.5c0.3-0.2,0.7-0.4,0.7-0.8c-0.4,0.1-0.8,0.4-1.1,0.8c0.1-0.2,0.2-0.3,0.2-0.5c-1.1,1-1.5,2.6-1.8,4.1c-0.5-0.4-1-0.6-1.3-0.7C9.6,10,8.3,9.6,6.4,9.2c0,0.6,0.5,1.4,1.7,1.7c-0.2,0-0.6,0.1-0.9,0.3c0.2,0.7,0.8,1.2,2,1.3c-0.5,0.1-0.8,0.3-1,0.6c0.3,0.4,1,0.9,2.1,0.6c-1.1,0.7-0.2,1.5,0.7,1.2c-1.4,2-4,2.3-5.7,1.1c4.8,4.7,12.9,1.1,13.3-4.3c0.9-0.2,1.4-0.6,1.7-1C19.6,11,18.8,11,18.4,10.9z"/></svg>',
            social_pinterest: '<svg version="1.1" viewBox="0 0 25 25"><circle fill="#27262c" cx="12.5" cy="12.5" r="12.1"/><path fill="#FFFFFF" d="M17.7,9.9c-0.4-2.7-3-4-5.8-3.7c-2.2,0.2-4.5,2.1-4.5,4.6c-0.1,1.6,0.4,2.8,1.9,3.1c0.6-1.1-0.2-1.4-0.3-2.2C8.3,8.3,12.7,6,15.1,8.4c1.6,1.6,0.6,6.7-2.1,6.2c-2.5-0.5,1.2-4.5-0.8-5.3c-1.6-0.6-2.5,2-1.7,3.3c-0.5,2.2-1.4,4.3-1,7.1c1.3-0.9,1.7-2.7,2.1-4.5c0.6,0.4,1,0.8,1.8,0.9C16.4,16.1,18.1,12.9,17.7,9.9z"/></svg>',
            project_slider_cirlce: '<svg version="1.1" viewBox="0 0 260 260"><circle cx="130" cy="130" r="120"/></svg>'
        };
        t.exports = s
    }
    , {}],
    19: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new a,
            this.scrollbar = new r,
            this.inner = null,
            this.scrollMsg = null,
            this.grid = null,
            this.title = null,
            this.headerFirstText = null,
            this.headerFirstTextCnt = null,
            this.headerSecondText = null,
            this.headerSecondTextCnt = null,
            this.whiteLineText = null,
            this.whiteLineTitle = null,
            this.archFirstText = null,
            this.archFirstTextCnt = null,
            this.archSecondText = null,
            this.archSecondTextCnt = null,
            this.archThirdText = null,
            this.archThirdTextCnt = null,
            this.archTitle = null,
            this.archTitleCnt = null,
            this.archInfos = null,
            this.archInfosImg = null,
            this.archInfosCnt = null,
            this.footer = null,
            this.innerScrollPosition = 0,
            this.innerLastScrollPosition = 0,
            this.innerMaxScroll = 0,
            this.liveScrollPosition = {
                y: 0
            },
            this.scrollUpdatedBy = null,
            this.scrollAnimatedElements = [],
            this.scrollPointsLogo = [],
            this.logoClass = "white",
            this.firstLoad = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("eventemitter3"))
          , r = e("./ui/scrollbar")
          , o = e("../config/vars")
          , l = e("../utils/cubicbezier")
          , h = e("../utils/normalizeScroll")
          , c = (e("../utils/functions"),
        e("../templates/about_tpl"));
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.createTemplate(),
                this.selectors(),
                this.resize(),
                this.createTweens(),
                this.scrollbar.init(this.el),
                this.playInAnimation()
            },
            createTemplate: function() {
                o.main.html(c.main())
            },
            selectors: function() {
                this.el = n("#container #main section#about"),
                this.inner = this.el.find(".inner"),
                this.scrollMsg = this.el.find(".scroll-msg"),
                this.grid = this.inner.find(".grid"),
                this.title = this.inner.find("header .title"),
                this.headerFirstText = this.inner.find("header .first-text"),
                this.headerFirstTextCnt = n(this.headerFirstText[0].children[1]),
                this.headerSecondText = this.inner.find("header .second-text"),
                this.headerSecondTextCnt = n(this.headerSecondText[0].children[0]),
                this.whiteLineText = this.inner.find(".white-line .white-text"),
                this.whiteLineTitle = this.inner.find(".white-line .white-title"),
                this.archFirstText = this.inner.find(".architects .first-text"),
                this.archFirstTextCnt = n(this.archFirstText[0].children[0]),
                this.archSecondText = this.inner.find(".architects .second-text"),
                this.archSecondTextCnt = n(this.archSecondText[0].children[0]),
                this.archThirdText = this.inner.find(".architects .third-text"),
                this.archThirdTextCnt = n(this.archThirdText[0].children[1]),
                this.archTitle = this.inner.find(".architects .title"),
                this.archTitleCnt = n(this.archTitle[0].children[0]),
                this.archInfos = this.inner.find(".architects .architect"),
                this.archInfosImg = this.archInfos.find(".up .image-container"),
                this.archInfosCnt = this.archInfos.find(".bottom .info-cnt"),
                this.footer = this.inner.find("footer")
            },
            playInAnimation: function() {
                TweenMax.fromTo(this.el, 1.5, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                o.hamburguer.el.removeClass().addClass(this.logoClass),
                o.title.el.removeClass().addClass(this.logoClass),
                TweenMax.to([o.hamburguer.el, o.title.el], 1.5, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(.3, this.checkTextSizes, null, this);
                for (var e = 1, t = .1; 4 > e; e++,
                t += .23)
                    TweenMax.fromTo(this.title[0].children[e].children[0], 1, {
                        opacity: 1e-4
                    }, {
                        delay: .2,
                        opacity: 1,
                        ease: Power1.easeIn
                    }),
                    TweenMax.fromTo(this.title[0].children[e].children[0], 1.2, {
                        x: "-80%"
                    }, {
                        delay: t,
                        x: "0%",
                        ease: Power2.easeOut
                    });
                TweenMax.set([this.title[0].children[1], this.title[0].children[2], this.title[0].children[3]], {
                    delay: 2,
                    display: "none"
                }),
                TweenMax.set(this.title[0].children[0], {
                    delay: 2,
                    autoAlpha: 1
                });
                var i = .7;
                TweenMax.fromTo(this.headerFirstText[0].children[0].children[0], 1.2, {
                    scaleX: 0
                }, {
                    delay: i,
                    scaleX: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.fromTo(this.headerFirstText[0].children[0].children[1], 1.2, {
                    scaleX: 0
                }, {
                    delay: .1 + i,
                    scaleX: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.set(this.headerFirstText[0].children[0].children, {
                    delay: 1.3 + i,
                    visibility: "hidden"
                }),
                TweenMax.fromTo(this.headerFirstText[0].children[1], 1, {
                    x: .015 * -o.windowWidth,
                    y: "-50%"
                }, {
                    delay: .75 + i,
                    x: 0,
                    y: "-50%",
                    force3D: !0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.headerFirstText[0].children[1], 1, {
                    opacity: 0
                }, {
                    delay: .65 + i,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.headerSecondText, 1.75, {
                    opacity: 1e-4
                }, {
                    delay: 1.4,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.scrollMsg, 1, {
                    opacity: 1e-4
                }, {
                    delay: 1.5,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.scrollMsg[0].children[0], 1.5, {
                    scaleX: 0
                }, {
                    delay: 2,
                    scaleX: 1,
                    ease: l.get("homeStateChange")
                }),
                TweenMax.delayedCall(1.5, function() {
                    this.scrollbar.events.on("scroll", this.scrollBarHandler, this),
                    this.scrollbar.bindEvents(),
                    o.main.on("wheel", this.scrollHandler.bind(this)),
                    TweenMax.ticker.addEventListener("tick", this.scroll, this),
                    this.events.emit("view shown")
                }, null, this)
            },
            playOutAnimation: function() {
                TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    TweenMax.ticker.removeEventListener("tick", this.scroll),
                    this.events.emit("view hidden")
                }, null, this)
            },
            createTweens: function() {
                this.scrollAnimatedElements[0].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                });
                for (var e = 3, t = 0; e > 0; e--,
                t += .23)
                    this.scrollAnimatedElements[0].animation.fromTo(this.whiteLineTitle[0].children[e].children[0], 1, {
                        opacity: 1e-4
                    }, {
                        opacity: 1,
                        ease: Power1.easeIn
                    }, .1),
                    this.scrollAnimatedElements[0].animation.fromTo(this.whiteLineTitle[0].children[e].children[0], 1.2, {
                        x: "80%"
                    }, {
                        x: "0%",
                        ease: Power2.easeOut
                    }, t);
                this.scrollAnimatedElements[0].animation.set([this.whiteLineTitle[0].children[1], this.whiteLineTitle[0].children[2], this.whiteLineTitle[0].children[3]], {
                    display: "none"
                }, 1.89),
                this.scrollAnimatedElements[0].animation.set(this.whiteLineTitle[0].children[0], {
                    autoAlpha: 1
                }, 1.89),
                this.scrollAnimatedElements[0].animation.fromTo(this.whiteLineText, 2, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .3),
                this.scrollAnimatedElements[1].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[1].animation.fromTo(this.archFirstText, 1.5, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0),
                this.scrollAnimatedElements[2].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[2].animation.fromTo(this.archSecondText, 1.5, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0),
                this.scrollAnimatedElements[3].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[3].animation.fromTo(this.archThirdText[0].children[0].children[0], 1.2, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, 0),
                this.scrollAnimatedElements[3].animation.fromTo(this.archThirdText[0].children[0].children[1], 1.2, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, .1),
                this.scrollAnimatedElements[3].animation.set(this.archThirdText[0].children[0].children, {
                    visibility: "hidden"
                }, 1.3),
                this.scrollAnimatedElements[3].animation.fromTo(this.archThirdText[0].children[1], 1, {
                    x: .015 * -o.windowWidth,
                    y: "-50%"
                }, {
                    x: 0,
                    y: "-50%",
                    force3D: !0,
                    ease: Power2.easeOut
                }, .75),
                this.scrollAnimatedElements[3].animation.fromTo(this.archThirdText[0].children[1], 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .65),
                this.scrollAnimatedElements[4].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                });
                for (var e = 3, t = 0; e > 0; e--,
                t += .23)
                    this.scrollAnimatedElements[4].animation.fromTo(this.archTitle[0].children[e].children[0], 1, {
                        opacity: 1e-4
                    }, {
                        opacity: 1,
                        ease: Power1.easeIn
                    }, .1),
                    this.scrollAnimatedElements[4].animation.fromTo(this.archTitle[0].children[e].children[0], 1.2, {
                        x: "80%"
                    }, {
                        x: "0%",
                        ease: Power2.easeOut
                    }, t);
                this.scrollAnimatedElements[4].animation.set([this.archTitle[0].children[1], this.archTitle[0].children[2], this.archTitle[0].children[3]], {
                    display: "none"
                }, 1.89),
                this.scrollAnimatedElements[4].animation.set(this.archTitle[0].children[0], {
                    autoAlpha: 1
                }, 1.89);
                for (var e = 0; 2 > e; e++)
                    this.scrollAnimatedElements[5 + e].animation = new TimelineMax({
                        delay: 0,
                        paused: !0
                    }),
                    this.scrollAnimatedElements[5 + e].animation.fromTo(this.archInfosImg[0 + e].children[0], 1.65, {
                        y: "-100%"
                    }, {
                        y: "0%",
                        ease: l.get("homeStateChange")
                    }, 0),
                    this.scrollAnimatedElements[5 + e].animation.fromTo(this.archInfosImg[0 + e].children[0].children[0], 1.65, {
                        y: "100%"
                    }, {
                        y: "0%",
                        ease: l.get("homeStateChange")
                    }, 0),
                    this.scrollAnimatedElements[5 + e].animation.fromTo(this.archInfosImg[0 + e].children[0].children[0].children[0], 5, {
                        z: 150
                    }, {
                        z: 0,
                        ease: Power2.easeOut
                    }, 0),
                    this.scrollAnimatedElements[7 + e].animation = new TimelineMax({
                        delay: 0,
                        paused: !0
                    }),
                    this.scrollAnimatedElements[7 + e].animation.fromTo(this.archInfos[0 + e].children[1].children[0], .9, {
                        scaleY: 0
                    }, {
                        scaleY: 1,
                        ease: l.get("homeStateChange")
                    }, 0),
                    this.scrollAnimatedElements[7 + e].animation.fromTo(this.archInfosCnt[0 + e].children[0], 1.2, {
                        x: .015 * -o.windowWidth
                    }, {
                        x: 0,
                        force3D: !0,
                        ease: Power2.easeOut
                    }, .25),
                    this.scrollAnimatedElements[7 + e].animation.fromTo(this.archInfosCnt[0 + e].children[0], 1.2, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, .15),
                    this.scrollAnimatedElements[7 + e].animation.fromTo(this.archInfosCnt[0 + e].children[1], 1.2, {
                        x: .015 * -o.windowWidth
                    }, {
                        x: 0,
                        force3D: !0,
                        ease: Power2.easeOut
                    }, .4),
                    this.scrollAnimatedElements[7 + e].animation.fromTo(this.archInfosCnt[0 + e].children[1], 1.2, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, .3),
                    this.scrollAnimatedElements[7 + e].animation.fromTo(this.archInfosCnt[0 + e].children[2].children[0].children[1], 1.2, {
                        x: .01 * -o.windowWidth
                    }, {
                        x: 0,
                        force3D: !0,
                        ease: Power2.easeOut
                    }, .85),
                    this.scrollAnimatedElements[7 + e].animation.fromTo(this.archInfosCnt[0 + e].children[2].children[0].children[1], 1.2, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, .75),
                    this.scrollAnimatedElements[7 + e].animation.fromTo(this.archInfosCnt[0 + e].children[2].children[0].children[0], .9, {
                        scaleX: 0
                    }, {
                        scaleX: 1,
                        ease: l.get("homeStateChange")
                    }, 1.15),
                    this.scrollAnimatedElements[7 + e].animation.call(function(e) {
                        TweenMax.set(this.archInfosCnt[0 + e].children[2].children[0].children[0], {
                            clearProps: "all"
                        }),
                        n(this.archInfosCnt[0 + e].children[2].children[0]).addClass("shown")
                    }, [e], this, 2.05);
                this.scrollAnimatedElements[9].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[9].animation.fromTo(this.footer[0].children[0], .8, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0);
                for (var e = 0, t = .1; e < this.footer[0].children[1].children[0].children.length; e++,
                t += .1)
                    this.scrollAnimatedElements[9].animation.fromTo(this.footer[0].children[1].children[0].children[e], 1.4, {
                        opacity: 1e-4
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, t);
                this.scrollAnimatedElements[10].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[10].animation.to(this.scrollMsg, .5, {
                    opacity: 0,
                    ease: Power2.easeOut
                }, 0)
            },
            scrollBarHandler: function(e) {
                this.innerScrollPosition = e * this.innerMaxScroll,
                this.scrollUpdatedBy = "scrollbar"
            },
            scrollHandler: function(e) {
                var t = h(e.originalEvent);
                this.innerScrollPosition -= t.pixelY,
                this.scrollUpdatedBy = "scroll"
            },
            scroll: function() {
                this.inner[0].style.transform = "translate3d(0px," + this.liveScrollPosition.y + "px, 0px)",
                this.scrollbar.bar[0].style.transform = "translate3d(0px," + this.scrollbar.scrollBarLivePosition.y + "px, 0px)",
                this.checkLogoColor(),
                this.checkAnimatedElements(),
                this.innerLastScrollPosition === this.innerScrollPosition && null === this.scrollUpdatedBy || (this.innerScrollPosition > 0 ? this.innerScrollPosition = 0 : this.innerScrollPosition < this.innerMaxScroll && (this.innerScrollPosition = this.innerMaxScroll),
                TweenMax.to(this.liveScrollPosition, 1.3, {
                    y: this.innerScrollPosition,
                    force3D: !0,
                    ease: Power4.easeOut
                }),
                this.scrollbar.updatePosition(this.innerScrollPosition / this.innerMaxScroll, "scrollbar" === this.scrollUpdatedBy ? 0 : 1.3, Power4.easeOut),
                this.innerLastScrollPosition = this.innerScrollPosition,
                this.scrollUpdatedBy = null)
            },
            checkLogoColor: function() {
                var e = this.liveScrollPosition.y - .05 * o.windowHeight;
                "white" !== this.logoClass && (e > this.scrollPointsLogo[0] || e < this.scrollPointsLogo[1]) ? (this.logoClass = "white",
                o.hamburguer.el.removeClass().addClass(this.logoClass),
                o.title.el.removeClass().addClass(this.logoClass)) : "white" === this.logoClass && e < this.scrollPointsLogo[0] && e > this.scrollPointsLogo[1] && (this.logoClass = "black",
                o.hamburguer.el.removeClass(),
                o.title.el.removeClass())
            },
            checkAnimatedElements: function() {
                for (var e = 0; e < this.scrollAnimatedElements.length; e++)
                    !this.scrollAnimatedElements[e].shown && this.liveScrollPosition.y < this.scrollAnimatedElements[e].point && (this.scrollAnimatedElements[e].shown = !0,
                    this.scrollAnimatedElements[e].animation && this.scrollAnimatedElements[e].animation.play())
            },
            checkTextSizes: function() {
                this.headerFirstText.removeClass("small"),
                this.headerFirstTextCnt.height() > .22 * o.windowHeight && this.headerFirstText.addClass("small"),
                this.headerSecondText.removeClass("small"),
                this.headerSecondTextCnt.height() > .22 * o.windowHeight && this.headerSecondText.addClass("small"),
                this.archFirstText.removeClass("small"),
                this.archFirstTextCnt.height() > .22 * o.windowHeight && this.archFirstText.addClass("small"),
                this.archSecondText.removeClass("small"),
                this.archSecondTextCnt.height() > .22 * o.windowHeight && this.archSecondText.addClass("small"),
                this.archThirdText.removeClass("small"),
                this.archThirdTextCnt.height() > .46 * o.windowHeight && this.archThirdText.addClass("small"),
                this.archTitle.removeClass("vertical"),
                this.archTitleCnt.height() > .16 * o.windowHeight && this.archTitle.addClass("vertical"),
                this.archInfos.removeClass("small"),
                (n(this.archInfosCnt[0]).height() > .18 * o.windowHeight || n(this.archInfosCnt[1]).height() > .18 * o.windowHeight) && this.archInfos.addClass("small"),
                this.whiteLineText.find("div").css("bottom", .5 * o.windowHeight / 2 - this.whiteLineTitle.find("h1").height() / 2 + "px")
            },
            resize: function() {
                this.innerMaxScroll = o.windowHeight - this.inner.height(),
                this.innerMaxScroll > 0 && (this.innerMaxScroll = 0),
                this.firstLoad ? (this.scrollAnimatedElements.push({
                    point: .25 * -o.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: .75 * -o.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 1 * -o.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 1.25 * -o.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 1.75 * -o.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 2.2 * -o.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 2.45 * -o.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 2.75 * -o.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 3 * -o.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 3.615 * -o.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: -15,
                    shown: !1
                }),
                this.scrollPointsLogo.push(1.25 * -o.windowHeight),
                this.scrollPointsLogo.push(1.75 * -o.windowHeight),
                this.firstLoad = !1) : (this.scrollAnimatedElements[0].point = .25 * -o.windowHeight,
                this.scrollAnimatedElements[1].point = .75 * -o.windowHeight,
                this.scrollAnimatedElements[2].point = 1 * -o.windowHeight,
                this.scrollAnimatedElements[3].point = 1.25 * -o.windowHeight,
                this.scrollAnimatedElements[4].point = 1.75 * -o.windowHeight,
                this.scrollAnimatedElements[5].point = 2.2 * -o.windowHeight,
                this.scrollAnimatedElements[6].point = 2.45 * -o.windowHeight,
                this.scrollAnimatedElements[7].point = 2.75 * -o.windowHeight,
                this.scrollAnimatedElements[8].point = 3 * -o.windowHeight,
                this.scrollAnimatedElements[9].point = 3.615 * -o.windowHeight,
                this.scrollAnimatedElements[10].point = -15,
                this.scrollPointsLogo[0] = 1.25 * -o.windowHeight,
                this.scrollPointsLogo[1] = 1.75 * -o.windowHeight,
                this.checkTextSizes(),
                this.scrollbar.resize(),
                this.scroll())
            },
            remove: function() {
                this.scrollbar.events.off("scroll"),
                this.scrollbar.remove(),
                o.main.off("wheel"),
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../config/vars": 2,
        "../templates/about_tpl": 4,
        "../utils/cubicbezier": 14,
        "../utils/functions": 15,
        "../utils/normalizeScroll": 16,
        "./ui/scrollbar": 27,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery"
    }],
    20: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.state = 0,
            this.nav = null,
            this.events = new r,
            this.grid = null,
            this.gridLines = null,
            this.viewAllNews = null,
            this.projects = null,
            this.projectsBg = null,
            this.projectsBgRenderer = null,
            this.projectsBgStage = null,
            this.projectsBgInitialLoad = !1,
            this.projectsBgSelected = 0,
            this.projectsOverlay = null,
            this.projectsGrid = null,
            this.projectsSquares = null,
            this.news = null,
            this.newsHead = null,
            this.newsCnt = null,
            this.newsItems = null,
            this.newsSpinner = null,
            this.newsSpinnerAnimation = null,
            this.newsSpinnerAnimation2 = null,
            this.newsEffects = null,
            this.newsPercentageBar = null,
            this.newsArrows = null,
            this.newsArrowsPrev = null,
            this.newsArrowsNext = null,
            this.newsArrowsNextAnimation = null,
            this.newsLoadedInterval = null,
            this.newsJsonLoaded = !1,
            this.newsJsonLoadedInterval = !1,
            this.newsRightHeader = null,
            this.newsRightTitle = null,
            this.newsRightContent = null,
            this.newsCurrentIndex = null,
            this.newScrollMaxAmount = 0,
            this.newScrollBarMaxAmount = 0,
            this.newContentScrollAmount = 0,
            this.newContentLastScrollAmount = 0,
            this.newsScrollPositions = {
                list: 0,
                singleContent: 0,
                newScrollbar: 0
            },
            this.homeText = null,
            this.homeTextButton = null,
            this.inAnimation = null,
            this.outAnimation = null,
            this.isAnimating = !0,
            this.inAnimationPlayed = !1,
            this.firstLoad = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("pixi.js"))
          , r = e("eventemitter3")
          , o = e("../config/vars")
          , l = e("../utils/functions")
          , h = e("../utils/cubicbezier")
          , c = e("../utils/normalizeScroll")
          , d = e("../templates/home_tpl");
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.state = e,
                this.nav = s,
                this.createTemplate(),
                this.selectors(),
                this.fillNews(0),
                this.newsUi(!1),
                this.createProjectsBG(),
                this.createTweens(),
                "from intro" === this.nav && 0 === this.state ? this.setFromIntroState("background") : 2 === this.state && (this.inAnimationPlayed = !0,
                this.playInAnimation()),
                this.resize()
            },
            createTemplate: function() {
                "from intro" === this.nav ? o.main.prepend(d.main()) : o.main.html(d.main())
            },
            selectors: function() {
                this.el = n("#container #main section#home"),
                this.viewAllNews = this.el.find("a.view-all-news"),
                this.grid = this.el.find(".grid"),
                this.gridLines = this.grid.find("span"),
                this.projects = this.el.find(".projects"),
                this.projectsBg = this.projects.find("canvas.projects-bg"),
                this.projectsOverlay = this.projects.find(".overlay"),
                this.projectsGrid = this.projects.find(".project-grid-container"),
                this.projectsSquares = this.projectsGrid.find(".project"),
                this.news = this.el.find(".news"),
                this.newsHead = this.news.find(".left .head"),
                this.newsCnt = this.news.find(".left ul.news-cnt"),
                this.newsSpinner = this.news.find(".left .spinner"),
                this.newsRightHeader = this.news.find(".right .header-image-cnt"),
                this.newsRightTitle = this.news.find(".right .right-title-cnt"),
                this.newsRightContent = this.news.find(".right .right-content-cnt"),
                this.newsPercentageBar = this.news.find(".right .news-progress span"),
                this.newsArrows = this.news.find(".right .news-arrows"),
                this.newsArrowsPrev = this.newsArrows.find(".top"),
                this.newsArrowsNext = this.newsArrows.find(".bottom"),
                this.homeText = this.el.find(".home-text"),
                this.homeTextButton = this.homeText.find(".scroll-button")
            },
            createTweens: function() {
                this.newsArrowsNextAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0,
                    repeat: -1,
                    repeatDelay: .5
                }),
                this.newsArrowsNextAnimation.fromTo(this.newsArrowsNext[0].children[1], .75, {
                    opacity: 0,
                    scale: 1
                }, {
                    opacity: 1,
                    ease: Power2.easeIn
                }, 0),
                this.newsArrowsNextAnimation.to(this.newsArrowsNext[0].children[1], .75, {
                    opacity: 0,
                    scale: 1.3,
                    ease: Power2.easeOut
                }, .75);
                var e = 1;
                this.newsSpinnerAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0,
                    repeat: -1,
                    tweens: [TweenMax.fromTo(this.newsSpinner[0].children[0], e, {
                        scale: 0
                    }, {
                        scale: 1,
                        ease: Power1.easeInOut
                    }), TweenMax.to(this.newsSpinner[0].children[0], e, {
                        delay: e,
                        scale: 0,
                        ease: Power1.easeInOut
                    })]
                }),
                this.newsSpinnerAnimation2 = new TimelineMax({
                    delay: 0,
                    paused: !0,
                    repeat: -1,
                    tweens: [TweenMax.fromTo(this.newsSpinner[0].children[1], e, {
                        scale: 0
                    }, {
                        scale: 1,
                        ease: Power1.easeInOut
                    }), TweenMax.to(this.newsSpinner[0].children[1], e, {
                        delay: e,
                        scale: 0,
                        ease: Power1.easeInOut
                    })]
                })
            },
            setFromIntroState: function(e) {
                "background" === e ? (TweenMax.ticker.addEventListener("tick", this.projectsRender, this),
                TweenMax.set(this.projects, {
                    visibility: "inherit"
                }),
                TweenMax.set(this.grid, {
                    visibility: "hidden"
                }),
                this.projectsBgStage.children[0].alpha = 1) : TweenMax.set(this.grid, {
                    clearProps: "all"
                })
            },
            playInAnimation: function() {
                if (this.state < 2 && "from intro" !== this.nav && TweenMax.ticker.addEventListener("tick", this.projectsRender, this),
                this.inAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                "from intro" === this.nav && 0 === this.state) {
                    var e = .3;
                    TweenMax.to(this.projectsBgStage.children[0].scale, 4.1, {
                        delay: .15,
                        x: 1,
                        y: 1,
                        ease: Power2.easeOut
                    }),
                    TweenMax.delayedCall(.15, function() {
                        this.events.emit("home ready")
                    }, null, this)
                } else
                    var e = .15;
                if (0 === this.state) {
                    var t = "from intro" !== this.nav ? 0 : .4;
                    this.inAnimation.call(function() {
                        o.hamburguer.el.removeClass().addClass("white"),
                        o.title.el.removeClass().addClass("white")
                    }, null, this, t),
                    "from intro" !== this.nav && this.inAnimation.set(this.projects, {
                        visibility: "inherit"
                    }, 0),
                    this.inAnimation.set(this.news, {
                        x: .75 * o.windowWidth,
                        visibility: "inherit",
                        force3D: !0
                    }, 0),
                    TweenMax.delayedCall(.02, this.checkHomeTextSize, null, this),
                    this.inAnimation.set(this.homeText, {
                        visibility: "inherit"
                    }, .02),
                    "from intro" !== this.nav && (this.inAnimation.to(this.projectsBgStage.children[0].scale, 3.15, {
                        x: 1,
                        y: 1,
                        ease: Power2.easeOut
                    }, e + .1),
                    this.inAnimation.to(this.projectsBgStage.children[0], 1.3, {
                        alpha: 1,
                        ease: Power2.easeInOut
                    }, e));
                    for (var i = 0, s = e + .5, a = 1.2, r = 0; 4 > i; i++,
                    r += .08) {
                        var l = n(this.newsEffects[i]).find("div");
                        this.inAnimation.fromTo(l[0], a, {
                            scaleX: 0
                        }, {
                            scaleX: 1,
                            ease: Power4.easeInOut
                        }, s + r),
                        this.inAnimation.fromTo(l[1], a, {
                            scaleX: 0
                        }, {
                            scaleX: 1,
                            ease: Power4.easeInOut
                        }, s + .08 + r),
                        this.inAnimation.fromTo(l[2], a, {
                            scaleX: 0
                        }, {
                            scaleX: 1,
                            ease: Power4.easeInOut
                        }, s + .18 + r)
                    }
                    this.inAnimation.to(this.projectsBgStage.children[0].position, 1.2, {
                        x: .05 * -o.windowWidth,
                        ease: Power2.easeInOut
                    }, e + .6),
                    this.inAnimation.fromTo(this.newsHead.find("h1"), .8, {
                        x: "25%"
                    }, {
                        x: "0%",
                        force3D: !0,
                        ease: Power2.easeOut
                    }, e + 1.3),
                    this.inAnimation.fromTo(this.newsHead.find("h1"), .8, {
                        opacity: .001
                    }, {
                        opacity: 1,
                        ease: Power2.easeIn
                    }, e + 1.2),
                    this.inAnimation.fromTo(this.newsHead.find("h2"), .8, {
                        x: "25%"
                    }, {
                        x: "0%",
                        force3D: !0,
                        ease: Power2.easeOut
                    }, e + 1.4),
                    this.inAnimation.fromTo(this.newsHead.find("h2"), .8, {
                        opacity: .001
                    }, {
                        opacity: 1,
                        ease: Power2.easeIn
                    }, e + 1.3);
                    for (var i = 0, s = e + 1.4, a = .8, r = 0; 3 > i; i++,
                    r += .08)
                        this.inAnimation.fromTo(this.newsItems[i].children[1], a, {
                            x: "15%",
                            y: "-60%"
                        }, {
                            x: "0%",
                            force3D: !0,
                            ease: Power2.easeOut
                        }, s + r),
                        this.inAnimation.fromTo(this.newsItems[i].children[1], a, {
                            opacity: .001
                        }, {
                            opacity: 1,
                            ease: Power2.easeIn
                        }, s + r - .1),
                        this.inAnimation.fromTo(this.newsItems[i].children[2], .6, {
                            scale: .001,
                            rotation: "-90deg"
                        }, {
                            scale: 1,
                            rotation: "0deg",
                            ease: Power2.easeInOut
                        }, s + r + .3);
                    for (var h = .6, i = 1, c = e + h; 7 > i; i++,
                    c += .115) {
                        var d = e + h + .1 + .09 + .01 * i
                          , u = 1.01 - .01 * i;
                        this.inAnimation.fromTo(this.homeText[0].children[i].children[0], u, {
                            opacity: 1e-4
                        }, {
                            opacity: 1,
                            ease: Power1.easeIn
                        }, d);
                        var w = (-77 - 3 * i).toString() + "%";
                        this.inAnimation.fromTo(this.homeText[0].children[i].children[0], 1.2, {
                            x: w
                        }, {
                            x: "0%",
                            ease: Power2.easeOut
                        }, c)
                    }
                    this.inAnimation.fromTo(this.homeTextButton, 1, {
                        opacity: 1e-4
                    }, {
                        opacity: 1,
                        ease: Power1.easeIn
                    }, e + h + .3),
                    this.inAnimation.fromTo([this.homeTextButton[0].children[0], this.homeTextButton[0].children[1].children[0]], 1.2, {
                        scaleX: 0
                    }, {
                        scaleX: 1,
                        ease: Power4.easeInOut,
                        onCompleteScope: this,
                        onComplete: function() {
                            this.homeTextButton.addClass("animated"),
                            TweenMax.set([this.homeTextButton[0].children[0], this.homeTextButton[0].children[1].children[0]], {
                                delay: .01,
                                clearProps: "all"
                            })
                        }
                    }, e + h + .9),
                    this.inAnimation.set([this.homeText[0].children[1], this.homeText[0].children[2], this.homeText[0].children[3], this.homeText[0].children[4], this.homeText[0].children[5], this.homeText[0].children[6]], {
                        display: "none"
                    }, e + h + 1.89),
                    this.inAnimation.set(this.homeText[0].children[0], {
                        opacity: 1
                    }, e + h + 1.89),
                    this.inAnimation.to([o.hamburguer.el, o.title.el], 1.5, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, e + 1.5),
                    this.inAnimation.to(this.viewAllNews, 1.5, {
                        autoAlpha: 1,
                        ease: Power2.easeInOut
                    }, e + 2),
                    this.inAnimation.call(function() {
                        this.isAnimating = !1,
                        this.eventManager("bind", 0),
                        this.eventManager("bind", 2, 0),
                        this.events.emit("view shown")
                    }, null, this, e + 1.9)
                } else if (1 === this.state) {
                    this.inAnimation.set(this.news, {
                        x: o.windowWidth,
                        force3D: !0
                    }, 0),
                    e += .1,
                    this.inAnimation.set([this.projects, this.projectsGrid], {
                        visibility: "inherit"
                    }, e),
                    this.inAnimation.to(this.projectsBgStage.children[0].scale, 1.8, {
                        x: 1,
                        y: 1,
                        ease: Power2.easeOut
                    }, e + .1),
                    this.inAnimation.to(this.projectsBgStage.children[0], 1, {
                        alpha: 1,
                        ease: Power2.easeInOut
                    }, e),
                    this.inAnimation.set(this.grid, {
                        clearProps: "visibility, opacity"
                    }, 1 + e);
                    for (var i = 0, s = e + .4; i < this.projectsGrid[0].children.length; i++) {
                        if (0 === i || 4 === i || 8 === i || 12 === i)
                            var r = 0;
                        else if (1 === i || 5 === i || 9 === i || 13 === i)
                            var r = .11;
                        else if (2 === i || 6 === i || 10 === i || 14 === i)
                            var r = .22;
                        else if (3 === i || 7 === i || 11 === i || 15 === i)
                            var r = .33;
                        this.inAnimation.fromTo(this.projectsGrid[0].children[i].children[1], 1.3, {
                            x: "-20%"
                        }, {
                            x: "0%",
                            force3D: !0,
                            ease: Power2.easeOut,
                            clearProps: "all"
                        }, s + r),
                        this.inAnimation.fromTo(this.projectsGrid[0].children[i].children[1], 1.3, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: Power2.easeInOut
                        }, s + r - .1)
                    }
                    this.inAnimation.call(function() {
                        o.hamburguer.el.removeClass().addClass("white"),
                        o.title.el.removeClass().addClass("white")
                    }, null, this, e + .4),
                    this.inAnimation.to([o.hamburguer.el, o.title.el], 1.5, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, e + .4),
                    this.homeTextButton.addClass("animated"),
                    this.inAnimation.call(function() {
                        this.isAnimating = !1,
                        this.eventManager("bind", 1, 0),
                        this.events.emit("view shown")
                    }, null, this, e + 1.5)
                } else
                    2 === this.state && (this.inAnimation.set(this.grid, {
                        x: .75 * -o.windowWidth,
                        force3D: !0
                    }, 0),
                    this.inAnimation.set(this.projectsOverlay, {
                        visibility: "inherit",
                        opacity: .75
                    }, 0),
                    this.inAnimation.set(this.projectsBgStage.children[0].position, {
                        x: -o.windowWidth / 2
                    }, 0),
                    this.inAnimation.set(this.projectsBgStage.children[0].scale, {
                        x: 1,
                        y: 1
                    }, 0),
                    this.inAnimation.set(this.projectsBgStage.children[0], {
                        alpha: 1
                    }, 0),
                    o.hamburguer.el.removeClass().addClass("green"),
                    o.title.el.removeClass().addClass("green"),
                    this.inAnimation.fromTo([this.grid, this.news], 1.5, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1,
                        ease: Power2.easeInOut
                    }, 0),
                    this.inAnimation.set(this.grid, {
                        clearProps: "visibility, opacity"
                    }, 1),
                    this.inAnimation.to([o.hamburguer.el, o.title.el], 1.5, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, 0),
                    this.inAnimation.call(this.newsPulseStart, null, this, 1.5),
                    this.newsItemChangeSelected(),
                    this.newsCheckPostLoaded(),
                    this.homeTextButton.addClass("animated"),
                    this.inAnimation.call(function() {
                        this.eventManager("bind", 2, 0),
                        this.events.emit("view shown")
                    }, null, this, 1.5));
                this.inAnimation.play(0)
            },
            playOutAnimation: function() {
                this.outAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.outAnimation.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }, 0),
                this.outAnimation.call(function() {
                    this.events.emit("view hidden")
                }, null, this, 1),
                this.outAnimation.play(0)
            },
            switchState: function(e) {
                if (this.isAnimating = !0,
                0 === this.state)
                    if (this.eventManager("unbind", 0),
                    1 === e) {
                        this.eventManager("unbind", 2, 0),
                        TweenMax.to(this.viewAllNews, .8, {
                            autoAlpha: 0,
                            ease: Power2.easeOut,
                            clearProps: "opacity, visibility"
                        }),
                        TweenMax.to(this.homeText, .5, {
                            autoAlpha: 0,
                            ease: Power2.easeOut
                        }),
                        TweenMax.set([this.homeText, this.homeText[0].children, this.homeText[0].children[1].children, this.homeText[0].children[2].children, this.homeText[0].children[3].children, this.homeText[0].children[4].children, this.homeText[0].children[5].children, this.homeText[0].children[6].children], {
                            delay: 1.2,
                            clearProps: "all"
                        }),
                        TweenMax.to(this.projectsBgStage.children[0].position, .8, {
                            x: 0,
                            ease: h.get("homeStateChange")
                        }),
                        TweenMax.to(this.news, 1, {
                            x: o.windowWidth,
                            force3D: !0,
                            ease: h.get("homeStateChange"),
                            clearProps: "visibility"
                        }),
                        TweenMax.set(this.projectsGrid, {
                            visibility: "inherit"
                        });
                        for (var t = 0, i = .35; t < this.projectsGrid[0].children.length; t++) {
                            if (0 === t || 4 === t || 8 === t || 12 === t)
                                var s = 0;
                            else if (1 === t || 5 === t || 9 === t || 13 === t)
                                var s = .11;
                            else if (2 === t || 6 === t || 10 === t || 14 === t)
                                var s = .22;
                            else if (3 === t || 7 === t || 11 === t || 15 === t)
                                var s = .33;
                            TweenMax.fromTo(this.projectsGrid[0].children[t].children[1], 1, {
                                x: "-20%"
                            }, {
                                x: "0%",
                                force3D: !0,
                                ease: Power2.easeOut,
                                delay: i + s,
                                clearProps: "all"
                            }),
                            TweenMax.fromTo(this.projectsGrid[0].children[t].children[1], 1, {
                                opacity: 0
                            }, {
                                opacity: 1,
                                ease: Power2.easeInOut,
                                delay: i + s - .1
                            })
                        }
                        TweenMax.delayedCall(1.2, function() {
                            this.isAnimating = !1,
                            this.eventManager("bind", 1, 0),
                            this.events.emit("state swtiched")
                        }, null, this)
                    } else
                        2 === e && (TweenMax.to(this.viewAllNews, .5, {
                            autoAlpha: 0,
                            ease: Power2.easeOut,
                            clearProps: "opacity, visibility"
                        }),
                        TweenMax.to(this.homeText, .4, {
                            autoAlpha: 0,
                            ease: Power2.easeOut
                        }),
                        TweenMax.set([this.homeText, this.homeText[0].children, this.homeText[0].children[1].children, this.homeText[0].children[2].children, this.homeText[0].children[3].children, this.homeText[0].children[4].children, this.homeText[0].children[5].children, this.homeText[0].children[6].children], {
                            delay: 1.2,
                            clearProps: "all"
                        }),
                        TweenMax.delayedCall(.75, function() {
                            o.hamburguer.el.removeClass().addClass("green"),
                            o.title.el.removeClass().addClass("green")
                        }, null, this),
                        TweenMax.to(this.projectsOverlay, 1.2, {
                            visibility: "inherit",
                            opacity: .75,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.to(this.projectsBgStage.children[0].position, 1.2, {
                            x: -o.windowWidth / 2,
                            ease: h.get("homeStateChange")
                        }),
                        TweenMax.set(this.projects, {
                            delay: 1.2,
                            clearProps: "visibility"
                        }),
                        TweenMax.to(this.grid, 1.2, {
                            x: .75 * -o.windowWidth,
                            force3D: !0,
                            ease: h.get("homeStateChange")
                        }),
                        TweenMax.to(this.news, 1.2, {
                            x: 0,
                            force3D: !0,
                            ease: h.get("homeStateChange")
                        }),
                        TweenMax.delayedCall(1.5, function() {
                            TweenMax.ticker.removeEventListener("tick", this.projectsRender),
                            this.newsPulseStart()
                        }, null, this),
                        this.newsItemChangeSelected(),
                        this.newsCheckPostLoaded());
                else if (1 === this.state)
                    this.eventManager("unbind", 1, 0),
                    this.eventManager("unbind", 1, 1),
                    this.resetProjectsImages(),
                    0 === e ? (TweenMax.to(this.projectsGrid, .4, {
                        autoAlpha: 0,
                        ease: Power2.easeInOut,
                        clearProps: "all"
                    }),
                    TweenMax.to(this.projectsBgStage.children[0].position, 1, {
                        delay: .2,
                        x: .05 * -o.windowWidth,
                        ease: h.get("homeStateChange")
                    }),
                    TweenMax.to(this.news, 1, {
                        delay: .2,
                        visibility: "inherit",
                        x: .75 * o.windowWidth,
                        force3D: !0,
                        ease: h.get("homeStateChange")
                    }),
                    TweenMax.to(this.viewAllNews, 1, {
                        delay: .7,
                        autoAlpha: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.set(this.homeText, {
                        delay: .2,
                        visibility: "inherit"
                    }),
                    TweenMax.to([this.homeText[0].children[0], this.homeTextButton], 1, {
                        delay: .2,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.delayedCall(1.2, function() {
                        this.eventManager("bind", 0),
                        this.eventManager("bind", 2, 0),
                        this.isAnimating = !1,
                        this.events.emit("state swtiched")
                    }, null, this)) : 2 === e && (TweenMax.to(this.projects, 1, {
                        autoAlpha: 0,
                        ease: Power2.easeInOut,
                        clearProps: "all"
                    }),
                    TweenMax.set(this.projectsGrid, {
                        delay: 1,
                        clearProps: "all"
                    }),
                    TweenMax.set(this.projectsOverlay, {
                        delay: 1,
                        visibility: "inherit",
                        opacity: .75
                    }),
                    TweenMax.set(this.projectsBgStage.children[0].position, {
                        delay: 1,
                        x: -o.windowWidth / 2
                    }),
                    TweenMax.to(this.grid, 1, {
                        autoAlpha: 0,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.delayedCall(.4, function() {
                        o.hamburguer.el.removeClass().addClass("green"),
                        o.title.el.removeClass().addClass("green")
                    }, null, this),
                    TweenMax.set(this.grid, {
                        delay: 1,
                        x: .75 * -o.windowWidth,
                        force3D: !0
                    }),
                    TweenMax.set(this.news, {
                        delay: 1,
                        x: 0,
                        force3D: !0
                    }),
                    TweenMax.to([this.grid, this.news], 1, {
                        delay: 1,
                        autoAlpha: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.set(this.grid, {
                        delay: 2,
                        clearProps: "visibility, opacity"
                    }),
                    TweenMax.delayedCall(1, function() {
                        TweenMax.delayedCall(1.5, function() {
                            TweenMax.ticker.removeEventListener("tick", this.projectsRender),
                            this.newsPulseStart()
                        }, null, this),
                        this.newsItemChangeSelected(),
                        this.newsCheckPostLoaded(),
                        this.eventManager("bind", 2, 0)
                    }, null, this));
                else if (2 === this.state)
                    if (TweenMax.ticker.addEventListener("tick", this.projectsRender, this),
                    this.newsItemClearSelected(),
                    this.newsPulseStop(),
                    0 === e)
                        o.hamburguer.el.removeClass().addClass("white"),
                        o.title.el.removeClass().addClass("white"),
                        TweenMax.to(this.news, 1.2, {
                            x: .75 * o.windowWidth,
                            force3D: !0,
                            ease: h.get("homeStateChange")
                        }),
                        TweenMax.set(this.projects, {
                            visibility: "inherit"
                        }),
                        TweenMax.to(this.projectsBgStage.children[0].position, 1.2, {
                            x: .05 * -o.windowWidth,
                            ease: h.get("homeStateChange")
                        }),
                        TweenMax.to(this.projectsOverlay, 1.2, {
                            opacity: 0,
                            ease: Power2.easeInOut,
                            clearProps: "visibility, opacity"
                        }),
                        TweenMax.to(this.grid, 1.2, {
                            x: 0,
                            force3D: !0,
                            ease: h.get("homeStateChange")
                        }),
                        TweenMax.to(this.viewAllNews, 1.5, {
                            autoAlpha: 1,
                            ease: Power2.easeInOut
                        }, 1),
                        TweenMax.set(this.homeText, {
                            delay: .5,
                            visibility: "inherit"
                        }),
                        TweenMax.to([this.homeText[0].children[0], this.homeTextButton], 1, {
                            delay: .5,
                            opacity: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.delayedCall(1.25, function() {
                            this.newsClearPost(),
                            this.eventManager("bind", 0),
                            this.isAnimating = !1,
                            this.events.emit("state swtiched")
                        }, null, this);
                    else if (1 === e) {
                        this.eventManager("unbind", 2, 0),
                        TweenMax.to(this.news, 1, {
                            autoAlpha: 0,
                            ease: Power2.easeInOut,
                            clearProps: "visibility, opacity"
                        }),
                        TweenMax.set(this.news, {
                            delay: 1,
                            x: o.windowWidth,
                            force3D: !0
                        }),
                        TweenMax.delayedCall(1, function() {
                            this.newsClearPost()
                        }, null, this),
                        TweenMax.set(this.projectsBgStage.children[0].position, {
                            delay: 1,
                            x: 0
                        }),
                        TweenMax.set(this.projectsBgStage.children[0], {
                            delay: 1,
                            alpha: 0
                        }),
                        TweenMax.set(this.projectsBgStage.children[0].scale, {
                            delay: 1,
                            x: 1.1,
                            y: 1.1
                        }),
                        TweenMax.set(this.projectsOverlay, {
                            delay: 1,
                            clearProps: "all"
                        }),
                        TweenMax.to(this.grid, 1, {
                            autoAlpha: 0,
                            ease: Power2.easeInOut,
                            clearProps: "transform"
                        }),
                        TweenMax.delayedCall(1.4, function() {
                            o.hamburguer.el.removeClass().addClass("white"),
                            o.title.el.removeClass().addClass("white")
                        }, null, this),
                        TweenMax.set(this.projects, {
                            delay: 1,
                            visibility: "inherit"
                        }),
                        TweenMax.to(this.grid, 1, {
                            delay: 1,
                            autoAlpha: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.to(this.projectsBgStage.children[0], 1, {
                            delay: 1,
                            alpha: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.to(this.projectsBgStage.children[0].scale, 1.8, {
                            delay: 1,
                            x: 1,
                            y: 1,
                            ease: Power2.easeOut
                        }),
                        TweenMax.set(this.grid, {
                            delay: 2,
                            clearProps: "visibility, opacity"
                        }),
                        TweenMax.set(this.projectsGrid, {
                            visibility: "inherit",
                            delay: 1.35
                        });
                        for (var t = 0, i = 1.35; t < this.projectsGrid[0].children.length; t++) {
                            if (0 === t || 4 === t || 8 === t || 12 === t)
                                var s = 0;
                            else if (1 === t || 5 === t || 9 === t || 13 === t)
                                var s = .11;
                            else if (2 === t || 6 === t || 10 === t || 14 === t)
                                var s = .22;
                            else if (3 === t || 7 === t || 11 === t || 15 === t)
                                var s = .33;
                            TweenMax.fromTo(this.projectsGrid[0].children[t].children[1], 1, {
                                x: "-20%"
                            }, {
                                x: "0%",
                                force3D: !0,
                                ease: Power2.easeOut,
                                delay: i + s,
                                clearProps: "all"
                            }),
                            TweenMax.fromTo(this.projectsGrid[0].children[t].children[1], 1, {
                                opacity: 0
                            }, {
                                opacity: 1,
                                ease: Power2.easeInOut,
                                delay: i + s - .1
                            })
                        }
                        TweenMax.delayedCall(2.2, function() {
                            this.isAnimating = !1,
                            this.eventManager("bind", 1, 0),
                            this.events.emit("state swtiched")
                        }, null, this)
                    }
                this.state = e
            },
            checkHomeTextSize: function() {
                this.homeText.removeClass("vertical"),
                this.homeText.find("h2").height() > .45 * o.windowHeight && this.homeText.addClass("vertical");
                var e = (.25 * o.windowHeight + this.homeText.find("h2").height() / 2 + .04 * o.windowHeight).toString();
                this.homeTextButton.css("top", e + "px")
            },
            navToProjects: function() {
                this.isAnimating || (this.isAnimating = !0,
                this.events.emit("view action", "navigate", "/projects"))
            },
            fillNews: function(e, t) {
                this.newsCnt.append(d.fillNews(e, t)),
                this.newsItems = this.newsCnt.find("li.new"),
                this.newsEffects = this.news.find(".left .news-effect")
            },
            newsUi: function(e) {
                var t = Math.ceil(o.postsTotalNumber / 3)
                  , i = o.postsPage + 1
                  , s = i / t
                  , n = e === !0 ? 1.4 : 0;
                TweenMax.to(this.newsPercentageBar, n, {
                    scaleY: s,
                    ease: Power3.easeInOut
                }),
                1 === i && 1 === t ? TweenMax.to(this.newsArrows[0].children, n, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }) : 1 === i && t > 1 ? (TweenMax.to(this.newsArrows[0].children[0], n, {
                    autoAlpha: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.to(this.newsArrows[0].children[1], n, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                })) : i > 1 && i !== t ? (TweenMax.to(this.newsArrows[0].children[0], n, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.to(this.newsArrows[0].children[1], n, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                })) : i > 1 && i === t && (TweenMax.to(this.newsArrows[0].children[0], n, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.to(this.newsArrows[0].children[1], n, {
                    autoAlpha: 0,
                    ease: Power2.easeOut
                }))
            },
            newsPulseStart: function() {
                this.newsArrowsNextAnimation.repeat(-1),
                this.newsArrowsNextAnimation.play()
            },
            newsPulseStop: function() {
                this.newsArrowsNextAnimation.repeat(0)
            },
            newsNextPage: function() {
                if (!this.isAnimating) {
                    var e = Math.ceil(o.postsTotalNumber / 3) - 1
                      , t = Math.ceil(o.postsData.length / 3) - 1
                      , i = o.postsPage + 1;
                    i > e || (this.isAnimating = !0,
                    this.newsPulseStop(),
                    this.eventManager("unbind", 2, 0),
                    TweenMax.fromTo(this.newsArrowsNext[0].children[0], .5, {
                        y: "0%",
                        opacity: 1
                    }, {
                        y: "20%",
                        opacity: 0,
                        ease: Power2.easeOut
                    }),
                    TweenMax.fromTo(this.newsArrowsNext[0].children[0], .5, {
                        y: "-20%",
                        opacity: 0
                    }, {
                        delay: .5,
                        y: "0%",
                        opacity: 1,
                        ease: Power2.easeOut
                    }),
                    o.postsPage = i,
                    this.newsCurrentIndex = null,
                    this.newsSpinnerAnimation.play(0),
                    this.newsSpinnerAnimation2.play(1),
                    TweenMax.to(this.newsSpinner, .3, {
                        autoAlpha: 1,
                        ease: Power2.easeInOut
                    }),
                    t >= o.postsPage ? this.newsJsonLoaded = !0 : n.ajax({
                        url: o.url + "/wp-json/ortizleon/v1/get_news",
                        data: {
                            lang: o.lang,
                            device: o.device,
                            page: o.postsPage
                        }
                    }).then(function(e) {
                        o.postsTotalNumber = e[0];
                        for (var t = 1; t < e.length; t++)
                            o.postsData.push(e[t]);
                        this.newsJsonLoaded = !0
                    }
                    .bind(this)),
                    TweenMax.to(this.newsCnt, .5, {
                        opacity: .1,
                        ease: Power2.easeOut
                    }),
                    null !== this.newsJsonLoadedInterval && clearInterval(this.newsJsonLoadedInterval),
                    this.newsJsonLoadedInterval = setInterval(function() {
                        this.newsJsonLoaded && (clearInterval(this.newsJsonLoadedInterval),
                        this.newsJsonLoaded = !1,
                        TweenMax.delayedCall(0, function() {
                            this.newsFillLoad("next")
                        }, null, this))
                    }
                    .bind(this), 100))
                }
            },
            newsPreviousPage: function() {
                if (!this.isAnimating) {
                    var e = o.postsPage - 1;
                    0 > e || (this.isAnimating = !0,
                    this.eventManager("unbind", 2, 0),
                    TweenMax.fromTo(this.newsArrowsPrev[0].children, .5, {
                        y: "0%",
                        opacity: 1
                    }, {
                        y: "-20%",
                        opacity: 0,
                        ease: Power2.easeOut
                    }),
                    TweenMax.fromTo(this.newsArrowsPrev[0].children, .5, {
                        y: "20%",
                        opacity: 0
                    }, {
                        delay: .5,
                        y: "0%",
                        opacity: 1,
                        ease: Power2.easeOut
                    }),
                    o.postsPage = e,
                    this.newsCurrentIndex = null,
                    this.newsSpinnerAnimation.play(0),
                    this.newsSpinnerAnimation2.play(1),
                    TweenMax.to(this.newsSpinner, .3, {
                        autoAlpha: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.to(this.newsCnt, .5, {
                        opacity: .1,
                        ease: Power2.easeOut
                    }),
                    TweenMax.delayedCall(.1, function() {
                        this.newsFillLoad("prev")
                    }, null, this))
                }
            },
            newsFillLoad: function(e) {
                if ("next" === e)
                    var t = .75 * -o.windowHeight;
                else
                    var t = .75 * o.windowHeight;
                this.newsCnt.addClass("align-animation"),
                this.fillNews(o.postsPage, e),
                this.newsUi(!0),
                TweenMax.to(this.newsSpinner, .5, {
                    delay: 1.4,
                    autoAlpha: 0,
                    ease: Power2.easeInOut,
                    onCompleteScope: this,
                    onComplete: function() {
                        this.newsSpinnerAnimation.pause(),
                        this.newsSpinnerAnimation2.pause()
                    }
                });
                for (var i = "next" === e ? 3 : this.newsCnt[0].children.length - 3, s = [], n = 0; n < this.newsCnt[0].children.length; n++)
                    i > n && s.push(this.newsCnt[0].children[n]);
                for (var n = i; n < this.newsCnt[0].children.length; n++)
                    TweenMax.set(this.newsCnt[0].children[n], {
                        y: -t,
                        opacity: 1
                    }),
                    TweenMax.to(this.newsCnt[0].children[n], 1.4, {
                        delay: .2,
                        y: 0,
                        ease: Power3.easeInOut
                    });
                TweenMax.fromTo(s, 1.4, {
                    y: 0
                }, {
                    delay: .2,
                    y: t,
                    ease: Power3.easeInOut,
                    onCompleteScope: this,
                    onComplete: function() {
                        TweenMax.to(this.newsCnt, .5, {
                            opacity: 1,
                            ease: Power2.easeInOut,
                            onCompleteScope: this,
                            onComplete: function() {
                                for (var e = 0; e < s.length; e++)
                                    this.newsCnt[0].removeChild(s[e]);
                                for (var e = 0; e < this.newsCnt[0].children.length; e++)
                                    this.newsCnt[0].children[e].style.transform = "";
                                this.newsCnt.removeClass("align-animation"),
                                this.newsItemChangeSelected(),
                                this.eventManager("bind", 2, 0),
                                TweenMax.set([this.newsCnt, this.newsCnt[0].children], {
                                    clearProps: "all"
                                }),
                                this.isAnimating = !1
                            }
                        })
                    }
                })
            },
            newsChangePost: function() {
                this.isAnimating = !0,
                this.newsItemChangeSelected(),
                TweenMax.to([this.newsRightHeader[0].children[0], this.newsRightTitle[0].children[1], this.newsRightContent[0].children[1], this.newsRightContent[0].children[2]], .7, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut,
                    onCompleteScope: this,
                    onComplete: function() {
                        this.newsClearPost(),
                        this.newsCheckPostLoaded()
                    }
                })
            },
            newsClearPost: function() {
                this.eventManager("unbind", 2, 1),
                TweenMax.ticker.removeEventListener("tick", this.scrollNew),
                this.newsRightHeader.html(""),
                this.newsRightTitle[0].children[1].remove(),
                this.newsRightContent[0].children[2].remove(),
                TweenMax.set([this.newsRightTitle[0].children[0].children, this.newsRightContent[0].children[0].children, this.newsRightContent[0].children[1]], {
                    clearProps: "all"
                })
            },
            newsCheckPostLoaded: function() {
                null !== this.newsLoadedInterval && clearInterval(this.newsLoadedInterval),
                this.newsLoadedInterval = setInterval(function() {
                    o.postsSingle.preloaded && (clearInterval(this.newsLoadedInterval),
                    this.newsShowPost())
                }
                .bind(this), 100)
            },
            newsShowPost: function() {
                this.newsRightHeader.html(d.singleNewHeader()),
                this.newsRightTitle.append(d.singleNewTitle()),
                this.newsRightContent.append(d.singleNewContent()),
                TweenMax.fromTo(this.newsRightHeader[0].children[0], 1.5, {
                    z: 100
                }, {
                    z: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.to(this.newsRightHeader[0].children[0], 1, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.newsRightTitle[0].children[0].children[0], 1.2, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.fromTo(this.newsRightTitle[0].children[0].children[1], 1.2, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut,
                    delay: .1
                }),
                TweenMax.fromTo(this.newsRightContent[0].children[0].children[0], 1.2, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut,
                    delay: .15
                }),
                TweenMax.fromTo(this.newsRightContent[0].children[0].children[1], 1.2, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut,
                    delay: .3
                }),
                TweenMax.fromTo(this.newsRightTitle[0].children[1], .8, {
                    x: "10%"
                }, {
                    x: "0%",
                    force3D: !0,
                    ease: Power2.easeOut,
                    delay: .7
                }),
                TweenMax.fromTo(this.newsRightTitle[0].children[1], .8, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    ease: Power2.easeIn,
                    delay: .6
                }),
                TweenMax.fromTo(this.newsRightContent[0].children[2], .8, {
                    x: "10%"
                }, {
                    x: "0%",
                    force3D: !0,
                    ease: Power2.easeOut,
                    delay: .85
                }),
                TweenMax.fromTo(this.newsRightContent[0].children[2], .8, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    ease: Power2.easeIn,
                    delay: .8
                }),
                TweenMax.delayedCall(1.65, function() {
                    this.setNewsPostScrollAmounts(),
                    this.eventManager("bind", 2, 1),
                    TweenMax.ticker.addEventListener("tick", this.scrollNew, this),
                    this.isAnimating = !1,
                    this.events.emit("state swtiched")
                }, null, this)
            },
            setNewsPostScrollAmounts: function() {
                var e = this.newsRightContent.height()
                  , t = n(this.newsRightContent[0].children[2]).height() + .13 * e
                  , i = n(this.newsRightContent[0].children[1]).height();
                this.newScrollMaxAmount = t > e ? e - t : 0,
                this.newScrollBarMaxAmount = e - i,
                this.newContentScrollAmount = 0,
                this.newsScrollPositions.singleContent = 0,
                this.newsScrollPositions.newScrollbar = 0,
                0 !== this.newScrollMaxAmount ? TweenMax.to(this.newsRightContent[0].children[1], .7, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                }) : TweenMax.to(this.newsRightContent[0].children[1], .5, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                })
            },
            updateNewScroll: function(e) {
                var t = c(e.originalEvent);
                this.newContentScrollAmount -= t.pixelY
            },
            scrollNew: function() {
                if (0 !== this.newScrollMaxAmount && (this.newsRightContent[0].children[1].style.transform = "translate3d(0px," + this.newsScrollPositions.newScrollbar + "px, 0px)",
                this.newsRightContent[0].children[2].style.transform = "translate3d(0px," + this.newsScrollPositions.singleContent + "px, 0px)",
                this.newContentLastScrollAmount !== this.newContentScrollAmount)) {
                    var e = 1
                      , t = Power4.easeOut;
                    this.newContentScrollAmount > 0 ? this.newContentScrollAmount = 0 : this.newContentScrollAmount < this.newScrollMaxAmount && (this.newContentScrollAmount = this.newScrollMaxAmount),
                    TweenMax.to(this.newsScrollPositions, e, {
                        singleContent: this.newContentScrollAmount,
                        ease: t
                    });
                    var i = this.newContentScrollAmount / this.newScrollMaxAmount
                      , s = this.newScrollBarMaxAmount * i;
                    TweenMax.to(this.newsScrollPositions, e, {
                        newScrollbar: s,
                        ease: t
                    }),
                    this.newContentLastScrollAmount = this.newContentScrollAmount
                }
            },
            newsItemHover: function(e) {
                "mouseenter" === e.type ? (TweenMax.to(e.delegateTarget.children[0].lastChild, .3, {
                    scaleX: 1,
                    ease: Power2.easeOut
                }),
                TweenMax.to(e.delegateTarget.children[2], .5, {
                    rotation: "90deg",
                    ease: Power2.easeOut
                })) : ((null === this.newsCurrentIndex || null !== this.newsCurrentIndex && this.newsItems[this.newsCurrentIndex].dataset.slug !== e.delegateTarget.dataset.slug) && TweenMax.to(e.delegateTarget.children[0].lastChild, .3, {
                    scaleX: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.to(e.delegateTarget.children[2], .5, {
                    rotation: "0deg",
                    ease: Power2.easeOut
                }))
            },
            newsItemClick: function(e) {
                this.isAnimating || this.events.emit("view action", "navigate", "/news/" + e.delegateTarget.dataset.slug)
            },
            newsItemClearSelected: function() {
                null !== this.newsCurrentIndex && (TweenMax.to(this.newsItems[this.newsCurrentIndex].children[0].lastChild, .3, {
                    scaleX: 0,
                    ease: Power2.easeOut
                }),
                this.newsCurrentIndex = null)
            },
            newsItemChangeSelected: function() {
                null !== this.newsCurrentIndex && TweenMax.to(this.newsItems[this.newsCurrentIndex].children[0].lastChild, .3, {
                    scaleX: 0,
                    ease: Power2.easeOut
                });
                for (var e = null, t = 0; t < this.newsItems.length; t++)
                    if (this.newsItems[t].dataset.slug === o.postsSingle.data.name) {
                        e = t;
                        break
                    }
                this.newsCurrentIndex = e,
                null !== this.newsCurrentIndex && TweenMax.to(this.newsItems[this.newsCurrentIndex].children[0].lastChild, .3, {
                    scaleX: 1,
                    ease: Power2.easeOut
                })
            },
            createProjectsBG: function() {
                this.projectsBgRenderer = a.autoDetectRenderer(o.windowWidth, o.windowHeight, {
                    view: this.projectsBg[0],
                    backgroundColor: 16777215
                }),
                this.projectsBgStage = new a.Container;
                var e = new a.Container;
                e.addChild(a.Sprite.fromImage(o.appData.projects_initial_image)),
                this.projectsBgStage.addChild(e);
                for (var t = 0; t < o.projectsData.length; t++) {
                    var i = new a.Container;
                    i.addChild(a.Sprite.fromImage(o.projectsData[t].projects_grid_image)),
                    this.projectsBgStage.addChild(i)
                }
                for (var t = 0; t < this.projectsBgStage.children.length; t++)
                    t > 0 && (this.projectsBgStage.children[t].visible = !1,
                    this.projectsBgStage.children[t].renderable = !1),
                    this.projectsBgStage.children[t].alpha = 0,
                    this.projectsBgStage.children[t].scale.x = 1.1,
                    this.projectsBgStage.children[t].scale.y = 1.1,
                    this.projectsBgStage.children[t].children[0].anchor.x = .5,
                    this.projectsBgStage.children[t].children[0].anchor.y = .5;
                this.projectsRender()
            },
            spritesSizes: function() {
                for (var e = !1, t = 0; t < this.projectsBgStage.children.length; t++)
                    if (this.projectsBgStage.children[t].children[0]._texture.baseTexture.hasLoaded) {
                        if (this.projectsBgInitialLoad || !this.projectsBgInitialLoad && "undefined" == typeof this.projectsBgStage.children[t].initialLoad) {
                            "undefined" == typeof this.projectsBgStage.children[t].initialLoad && (this.projectsBgStage.children[t].initialLoad = !0);
                            var i = o.windowWidth
                              , s = l.round(i * this.projectsBgStage.children[t].children[0]._texture.height / this.projectsBgStage.children[t].children[0]._texture.width, 4)
                              , n = 0;
                            0 === t ? o.windowHeight > s && (s = o.windowHeight,
                            i = l.round(s * this.projectsBgStage.children[t].children[0]._texture.width / this.projectsBgStage.children[t].children[0]._texture.height, 4)) : (1.1 * o.windowHeight > s && (s = 1.1 * o.windowHeight,
                            i = l.round(s * this.projectsBgStage.children[t].children[0]._texture.width / this.projectsBgStage.children[t].children[0]._texture.height, 4)),
                            n = l.round((s - o.windowHeight) / 2, 4)),
                            this.projectsBgStage.children[t].children[0].width = i,
                            this.projectsBgStage.children[t].children[0].height = s,
                            this.projectsBgStage.children[t].children[0].position.y = n,
                            0 === t && this.inAnimationPlayed === !1 && 0 === this.state && (this.inAnimationPlayed = !0,
                            this.playInAnimation())
                        }
                    } else
                        e = !0;
                e ? setTimeout(this.spritesSizes.bind(this), 50) : this.projectsBgInitialLoad || (this.projectsBgInitialLoad = !0,
                this.inAnimationPlayed === !1 && 1 === this.state && (this.inAnimationPlayed = !0,
                this.playInAnimation()))
            },
            projectsRender: function() {
                this.projectsBgRenderer.render(this.projectsBgStage)
            },
            resetProjectsImages: function() {
                for (var e = 1; e < this.projectsBgStage.children.length; e++)
                    TweenMax.to(this.projectsBgStage.children[e].scale, 1, {
                        x: 1.1,
                        y: 1.1,
                        ease: Power2.easeOut
                    }),
                    TweenMax.to(this.projectsBgStage.children[e], 1, {
                        alpha: 0,
                        ease: Power2.easeInOut
                    })
            },
            projectMove: function(e) {
                this.eventManager("unbind", 1, 0),
                this.projectHover({
                    type: "mouseenter",
                    delegateTarget: e.delegateTarget
                }),
                this.eventManager("bind", 1, 1)
            },
            projectHover: function(e) {
                this.isAnimating || ("mouseenter" === e.type ? (this.projectsBgStage.children[parseInt(e.delegateTarget.dataset.bgElement)].renderable = !0,
                this.projectsBgStage.children[parseInt(e.delegateTarget.dataset.bgElement)].visible = !0,
                TweenMax.to(this.projectsBgStage.children[parseInt(e.delegateTarget.dataset.bgElement)].scale, 1, {
                    x: 1,
                    y: 1,
                    ease: Power2.easeOut,
                    overwrite: "all"
                }),
                TweenMax.to(this.projectsBgStage.children[parseInt(e.delegateTarget.dataset.bgElement)], .7, {
                    alpha: 1,
                    ease: Power2.easeOut,
                    overwrite: "all"
                }),
                TweenMax.to(e.delegateTarget.children[1].children[0], .35, {
                    y: "-103%",
                    ease: Power3.easeOut,
                    overwrite: "all"
                }),
                TweenMax.to(e.delegateTarget.children[2].children[0], .45, {
                    delay: .15,
                    y: "0%",
                    ease: Power3.easeOut,
                    overwrite: "all"
                }),
                TweenMax.to(e.delegateTarget.children[0], .6, {
                    autoAlpha: 1,
                    ease: Power2.easeOut,
                    overwrite: "all"
                }),
                TweenMax.to(e.delegateTarget.children[3].children[0], .3, {
                    delay: 0,
                    opacity: 1,
                    ease: Power2.easeInOut,
                    overwrite: "all"
                }),
                TweenMax.to(e.delegateTarget.children[3].children[0], .5, {
                    delay: 0,
                    x: "0%",
                    force3D: !0,
                    ease: Power2.easeOut
                }),
                TweenMax.to(e.delegateTarget.children[3].children[1], .2, {
                    delay: .1,
                    opacity: 1,
                    ease: Power2.easeIn,
                    overwrite: "all"
                }),
                TweenMax.to(e.delegateTarget.children[3].children[1], .5, {
                    delay: .1,
                    x: "0%",
                    force3D: !0,
                    ease: Power2.easeOut
                })) : (TweenMax.to(this.projectsBgStage.children[parseInt(e.delegateTarget.dataset.bgElement)].scale, .5, {
                    x: 1.1,
                    y: 1.1,
                    ease: Power2.easeOut,
                    overwrite: "all",
                    onCompleteScope: this,
                    onCompleteParams: [parseInt(e.delegateTarget.dataset.bgElement)],
                    onComplete: function(e) {
                        this.projectsBgStage.children[e].visible = !1,
                        this.projectsBgStage.children[e].renderable = !1
                    }
                }),
                TweenMax.to(this.projectsBgStage.children[parseInt(e.delegateTarget.dataset.bgElement)], .5, {
                    alpha: 0,
                    ease: Power2.easeOut,
                    overwrite: "all"
                }),
                TweenMax.to(e.delegateTarget.children[0], .6, {
                    autoAlpha: 0,
                    ease: Power2.easeOut,
                    clearProps: "all",
                    overwrite: "all"
                }),
                TweenMax.to(e.delegateTarget.children[2].children[0], .35, {
                    y: "103%",
                    ease: Power3.easeOut,
                    clearProps: "all",
                    overwrite: "all"
                }),
                TweenMax.to(e.delegateTarget.children[1].children[0], .45, {
                    delay: .15,
                    y: "0%",
                    ease: Power3.easeOut,
                    clearProps: "all",
                    overwrite: "all"
                }),
                TweenMax.to(e.delegateTarget.children[3].children, .3, {
                    opacity: 1e-4,
                    ease: Power2.easeOut,
                    clearProps: "all",
                    overwrite: "all"
                })))
            },
            projectClick: function(e) {
                this.isAnimating = !0,
                this.projectsBgSelected = parseInt(e.delegateTarget.dataset.bgElement),
                this.events.emit("view action", "navigate", "/projects/" + e.delegateTarget.dataset.name, "user click")
            },
            projectMoveBgUp: function() {
                TweenMax.set(this.grid, {
                    opacity: 0
                }),
                TweenMax.to(this.projectsBgStage.children[this.projectsBgSelected].position, 1.2, {
                    y: .1 * -o.windowHeight,
                    ease: Power3.easeInOut
                })
            },
            projectPlayTransition: function() {
                TweenMax.to(this.projectsGrid, .5, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut,
                    onCompleteScope: this,
                    onComplete: function() {
                        this.events.emit("projects transition complete")
                    }
                })
            },
            eventManager: function(e, t, i) {
                "bind" === e ? (0 === t && (this.el.on("wheel", this.navToProjects.bind(this)),
                this.projects.on("click", this.navToProjects.bind(this)),
                this.homeTextButton.on("click", this.navToProjects.bind(this))),
                1 === t && (0 === i && this.projectsSquares.on("mousemove", this.projectMove.bind(this)),
                1 === i && (this.projectsSquares.on("mouseenter mouseleave", this.projectHover.bind(this)),
                this.projectsSquares.on("click", this.projectClick.bind(this)))),
                2 === t && (0 === i && (this.newsItems.on("mouseenter mouseleave", this.newsItemHover.bind(this)),
                this.newsItems.on("click", this.newsItemClick.bind(this)),
                this.newsArrowsNext.on("click", this.newsNextPage.bind(this)),
                this.newsArrowsPrev.on("click", this.newsPreviousPage.bind(this))),
                1 === i && (this.newsRightContent.on("wheel", this.updateNewScroll.bind(this)),
                this.newsRightTitle.on("wheel", this.updateNewScroll.bind(this))))) : (0 === t && (this.el.off("wheel"),
                this.projects.off("click"),
                this.homeTextButton.off("click")),
                1 === t && (0 === i && this.projectsSquares.off("mousemove"),
                1 === i && (this.projectsSquares.off("mouseenter mouseleave"),
                this.projectsSquares.off("click"))),
                2 === t && (0 === i && (this.newsItems.off("mouseenter mouseleave"),
                this.newsItems.off("click"),
                this.newsArrowsNext.off("click"),
                this.newsArrowsPrev.off("click")),
                1 === i && (this.newsRightContent.off("wheel"),
                this.newsRightTitle.off("wheel"))))
            },
            resize: function() {
                this.projectsBgRenderer.resize(o.windowWidth, o.windowHeight);
                var e = l.round(o.windowWidth / 2, 4)
                  , t = l.round(o.windowHeight / 2, 4);
                this.projectsBgStage.position.x = e,
                this.projectsBgStage.position.y = t,
                this.spritesSizes(),
                this.firstLoad ? this.firstLoad = !1 : this.checkHomeTextSize(),
                this.isAnimating || (0 === this.state ? (TweenMax.set(this.projectsBgStage.children[0].position, {
                    x: .05 * -o.windowWidth
                }),
                TweenMax.set(this.news, {
                    x: .75 * o.windowWidth,
                    force3D: !0
                })) : 2 === this.state && (TweenMax.set(this.grid, {
                    x: .75 * -o.windowWidth,
                    force3D: !0
                }),
                this.setNewsPostScrollAmounts()))
            },
            remove: function(e) {
                TweenMax.ticker.removeEventListener("tick", this.scrollNew),
                TweenMax.ticker.removeEventListener("tick", this.projectsRender),
                this.newsPulseStop(),
                null !== this.newsLoadedInterval && clearInterval(this.newsLoadedInterval),
                null !== this.newsJsonLoadedInterval && clearInterval(this.newsJsonLoadedInterval),
                this.eventManager("unbind", 0),
                this.eventManager("unbind", 1, 0),
                this.eventManager("unbind", 1, 1),
                this.eventManager("unbind", 2, 0),
                this.eventManager("unbind", 2, 1),
                this.events.off("view action"),
                o.postsPage = 0,
                "project transition" !== e && this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../config/vars": 2,
        "../templates/home_tpl": 5,
        "../utils/cubicbezier": 14,
        "../utils/functions": 15,
        "../utils/normalizeScroll": 16,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery",
        "pixi.js": "pixi.js"
    }],
    21: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new r,
            this.grid = null,
            this.gridLines = null,
            this.texts = null,
            this.overlay = null,
            this.overlayScrollNext = null,
            this.overlayScrollNextAnimation = null,
            this.overlayScrollNextAnimationRepeat = !0,
            this.skip = null,
            this.background = null,
            this.backgroundRenderer = null,
            this.backgroundStage = null,
            this.backgroundStageMask = {
                percent: 0
            },
            this.backgroundStageMaskFinal = {
                percent: 0
            },
            this.backgroundStageOLPosition = {
                x: 0,
                y: 0
            },
            this.backgroundOLMask = {
                container: null,
                texture: null
            },
            this.backgroundOLFirst = {
                container: null,
                texture: null
            },
            this.backgroundInitialLoad = !1,
            this.currentScreen = 0,
            this.inAnimationPlayed = !1,
            this.isAnimating = !1,
            this.firstLoad = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("pixi.js"))
          , r = e("eventemitter3")
          , o = e("../config/vars")
          , l = e("../utils/cubicbezier")
          , h = (e("../utils/normalizeScroll"),
        e("../utils/functions"))
          , c = e("../templates/intro_tpl");
        s.prototype = {
            constructor: s,
            init: function() {
                this.createTemplate(),
                this.selectors(),
                this.createIntroBG(),
                this.resize()
            },
            createTemplate: function() {
                o.main.html(c())
            },
            selectors: function() {
                this.el = n("#container #main section#intro"),
                this.grid = this.el.find(".grid"),
                this.texts = this.el.find(".texts-cnt"),
                this.overlay = this.el.find(".overlay"),
                this.overlayScrollNext = n(this.overlay[0].children[6].children[1].children[0]),
                this.skip = this.overlay.find(".skip-msg"),
                this.gridLines = this.grid.find("span"),
                this.background = this.el.find("canvas")
            },
            playInAnimation: function() {
                o.title.playInAnimation("for intro"),
                o.container.addClass("nav-inactive"),
                o.title.el.removeClass().addClass("intro"),
                TweenMax.to(o.title.el, 1, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                this.clickHandler(),
                TweenMax.set(this.background, {
                    visibility: "inherit"
                }),
                TweenMax.to(this.background, 1, {
                    delay: .1,
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                });
                var e = .8;
                TweenMax.fromTo(this.gridLines[3], 1.7, {
                    scaleX: 0
                }, {
                    delay: e,
                    scaleX: 1,
                    ease: Power3.easeOut
                }),
                TweenMax.fromTo(this.gridLines[4], 1.7, {
                    scaleX: 0
                }, {
                    delay: e,
                    scaleX: 1,
                    ease: Power3.easeOut
                }),
                TweenMax.fromTo(this.gridLines[5], 1.7, {
                    scaleX: 0
                }, {
                    delay: e,
                    scaleX: 1,
                    ease: Power3.easeOut
                }),
                TweenMax.fromTo(this.gridLines[0], 1.7, {
                    scaleY: 0
                }, {
                    delay: e,
                    scaleY: 1,
                    ease: Power3.easeOut
                }),
                TweenMax.fromTo(this.gridLines[1], 1.7, {
                    scaleY: 0
                }, {
                    delay: e,
                    scaleY: 1,
                    ease: Power3.easeOut
                }),
                TweenMax.fromTo(this.gridLines[2], 1.7, {
                    scaleY: 0
                }, {
                    delay: e,
                    scaleY: 1,
                    ease: Power3.easeOut
                });
                for (var e = .8, t = 0; t < this.overlay[0].children[0].children.length; t++)
                    TweenMax.fromTo(this.overlay[0].children[0].children[t], .6, {
                        scaleX: 0
                    }, {
                        delay: e,
                        scaleX: 1,
                        ease: Power4.easeInOut
                    }),
                    e += .15;
                for (var i = .4, t = 0; t < this.overlay[0].children[1].children.length; t++)
                    TweenMax.fromTo(this.overlay[0].children[1].children[t], 1.5, {
                        scaleY: 0
                    }, {
                        delay: i,
                        scaleY: 1,
                        ease: Power3.easeInOut
                    }),
                    i += .4;
                TweenMax.fromTo(this.overlay[0].children[3], 1, {
                    scale: 1e-4,
                    rotation: "-270deg"
                }, {
                    delay: 1,
                    scale: 1,
                    rotation: "0deg",
                    ease: Power3.easeOut
                }),
                TweenMax.fromTo(this.overlay[0].children[5], 1, {
                    scale: 1e-4,
                    rotation: "-270deg"
                }, {
                    delay: 1.2,
                    scale: 1,
                    rotation: "0deg",
                    ease: Power3.easeOut
                }),
                TweenMax.fromTo(this.overlay[0].children[4], 1, {
                    scale: 1e-4,
                    rotation: "-270deg"
                }, {
                    delay: 1.2,
                    scale: 1,
                    rotation: "0deg",
                    ease: Power3.easeOut
                }),
                TweenMax.fromTo(this.overlay[0].children[6].children[0], 1.1, {
                    scaleX: 0
                }, {
                    delay: 1.3,
                    scaleX: 1,
                    ease: Power3.easeInOut
                }),
                TweenMax.fromTo(this.overlay[0].children[6].children[1], 2, {
                    opacity: 1e-4
                }, {
                    delay: 1.7,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                this.overlayScrollNextAnimation = new TimelineMax({
                    delay: 2.7,
                    repeat: -1,
                    repeatDelay: 1.5
                }),
                this.overlayScrollNextAnimation.to(this.overlay[0].children[6].children[0], 1.3, {
                    scaleX: 0,
                    ease: l.get("homeStateChange")
                }, 0),
                this.overlayScrollNextAnimation.to(this.overlayScrollNext, 1.3, {
                    x: .04 * -o.windowWidth,
                    ease: l.get("homeStateChange")
                }, 0),
                this.overlayScrollNextAnimation.to(this.overlay[0].children[6].children[1].children[0].children[0], 1.3, {
                    scaleX: 1,
                    ease: l.get("homeStateChange")
                }, 0),
                this.overlayScrollNextAnimation.to(this.overlay[0].children[6].children[0], 1.3, {
                    scaleX: 1,
                    ease: l.get("homeStateChange")
                }, 2.8),
                this.overlayScrollNextAnimation.to(this.overlayScrollNext, 1.3, {
                    x: 0,
                    ease: l.get("homeStateChange")
                }, 2.8),
                this.overlayScrollNextAnimation.to(this.overlay[0].children[6].children[1].children[0].children[0], 1.3, {
                    scaleX: 0,
                    ease: l.get("homeStateChange")
                }, 2.8),
                this.overlayScrollNextAnimation.call(function() {
                    this.overlayScrollNextAnimationRepeat || this.overlayScrollNextAnimation.repeat(0)
                }, null, this, 4.1),
                TweenMax.delayedCall(4, function() {
                    this.overlayScrollNext.on("click", this.clickHandler.bind(this))
                }, null, this),
                TweenMax.delayedCall(2.5, function() {
                    this.checkTextSizes(),
                    this.isAnimating = !1,
                    this.background.on("click", this.clickHandler.bind(this)),
                    this.skip.on("click", this.navToHome.bind(this)),
                    o.main.on("wheel", this.scrollHandler.bind(this))
                }, null, this)
            },
            finalTransition: function() {
                var e = new a.Graphics;
                e.beginFill(),
                e.drawRect(0, 0, o.windowWidth, o.windowHeight),
                e.endFill(),
                this.backgroundStage.mask = e,
                this.events.emit("final transition")
            },
            playOutAnimation: function() {
                TweenMax.to(this.overlay, .5, {
                    autoAlpha: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.to(this.texts, .7, {
                    autoAlpha: 0,
                    ease: Power2.easeOut
                }),
                o.container.removeClass("nav-inactive"),
                o.title.playOutAnimation(),
                TweenMax.fromTo(this.backgroundStage.children[this.currentScreen + 1].children[0].position, 1.35, {
                    x: 0
                }, {
                    x: .25 * -o.windowWidth,
                    ease: l.get("homeStateChange")
                }),
                TweenMax.fromTo(this.backgroundStageMaskFinal, 1.35, {
                    percent: 0
                }, {
                    percent: 1,
                    ease: l.get("homeStateChange"),
                    onUpdateScope: this,
                    onUpdate: function() {
                        var e = o.windowWidth - o.windowWidth * this.backgroundStageMaskFinal.percent;
                        this.backgroundStage.mask.clear(),
                        this.backgroundStage.mask.beginFill(),
                        this.backgroundStage.mask.drawRect(0, 0, e, o.windowHeight),
                        this.backgroundStage.mask.endFill()
                    }
                })
            },
            createIntroBG: function() {
                this.backgroundRenderer = a.autoDetectRenderer(o.windowWidth, o.windowHeight, {
                    view: this.background[0],
                    transparent: !0
                }),
                this.backgroundStage = new a.Container,
                this.backgroundStage.addChild(new a.Graphics),
                this.backgroundOLMask.container = new a.Container,
                this.backgroundOLFirst.container = new a.Container,
                this.backgroundOLFirst.container.visible = !1,
                this.backgroundOLMask.container.addChild(a.Sprite.fromImage(o.url + "/wp-content/themes/ortizleon/img/intro-mask-o.jpg")),
                this.backgroundOLMask.container.addChild(a.Sprite.fromImage(o.url + "/wp-content/themes/ortizleon/img/intro-mask-point.jpg")),
                this.backgroundOLMask.container.addChild(a.Sprite.fromImage(o.url + "/wp-content/themes/ortizleon/img/intro-mask-l.jpg"));
                for (var e = new a.Container, t = 0; 3 > t; t++) {
                    var i = new a.Container
                      , s = new a.Container;
                    s.alpha = 0,
                    i.addChild(s),
                    e.addChild(i)
                }
                this.backgroundStage.addChild(e);
                for (var t = 0; 3 > t; t++) {
                    var n = new a.Container
                      , r = new a.Container
                      , i = new a.Container
                      , l = new a.Container;
                    n.renderable = !1,
                    n.visible = !1,
                    l.filters = [new PIXI.filters.GrayFilter],
                    l.filters[0].gray = 0;
                    var h = new a.Texture.fromImage(o.appData["intro_image_" + (t + 1)])
                      , c = new a.Sprite
                      , d = new a.Sprite;
                    c.texture = h,
                    d.texture = h,
                    c.anchor.x = .5,
                    c.anchor.y = .5,
                    d.anchor.x = .5,
                    d.anchor.y = .5,
                    r.addChild(c),
                    l.addChild(d),
                    n.addChild(r),
                    i.addChild(l),
                    n.addChild(i),
                    this.backgroundStage.addChild(n)
                }
                TweenMax.ticker.addEventListener("tick", this.backgroundRender, this)
            },
            spritesSizes: function() {
                for (var e = !1, t = 0; t < this.backgroundOLMask.container.children.length; t++) {
                    var i = this.backgroundOLMask.container.children[t]._texture;
                    if (i.baseTexture.hasLoaded) {
                        if (this.backgroundInitialLoad || !this.backgroundInitialLoad && "undefined" == typeof this.backgroundOLMask.container.children[t].initialLoad) {
                            if (1 === t && "undefined" == typeof this.backgroundOLMask.container.children[0].initialLoad) {
                                e = !0;
                                continue
                            }
                            if ("undefined" == typeof this.backgroundOLMask.container.children[t].initialLoad && (this.backgroundOLMask.container.children[t].initialLoad = !0),
                            0 === t) {
                                var s = .5 * o.windowHeight
                                  , n = s * i.width / i.height
                                  , a = .25 * o.windowWidth - n / 2
                                  , r = .25 * o.windowHeight;
                                this.backgroundStageOLPosition.x = a,
                                this.backgroundStageOLPosition.y = r
                            } else if (1 === t)
                                var s = .135 * o.windowHeight
                                  , n = s * i.width / i.height
                                  , l = .25 * o.windowWidth + this.backgroundOLMask.container.children[0].width / 2 - .1 * n
                                  , c = .375 * o.windowWidth
                                  , a = c > l ? c : l
                                  , r = .75 * o.windowHeight - s;
                            else
                                var s = .5 * o.windowHeight
                                  , n = s * i.width / i.height
                                  , a = .5 * o.windowWidth
                                  , r = .25 * o.windowHeight;
                            this.backgroundOLMask.container.children[t].width = n,
                            this.backgroundOLMask.container.children[t].height = s,
                            this.backgroundOLMask.container.children[t].position.x = a,
                            this.backgroundOLMask.container.children[t].position.y = r
                        }
                    } else
                        e = !0
                }
                for (var t = 2; t < this.backgroundStage.children.length; t++)
                    for (var d = 0; d < this.backgroundStage.children[t].children.length; d++) {
                        if (0 === d)
                            var i = this.backgroundStage.children[t].children[d].children[0]._texture
                              , u = this.backgroundStage.children[t].children[d].children[0];
                        else
                            var i = this.backgroundStage.children[t].children[d].children[0].children[0]._texture
                              , u = this.backgroundStage.children[t].children[d].children[0].children[0];
                        if (i.baseTexture.hasLoaded) {
                            if (this.backgroundInitialLoad || !this.backgroundInitialLoad && "undefined" == typeof u.initialLoad) {
                                "undefined" == typeof u.initialLoad && (u.initialLoad = !0);
                                var w = o.windowWidth
                                  , m = h.round(w * i.height / i.width, 4);
                                o.windowHeight > m && (m = o.windowHeight,
                                w = h.round(m * i.width / i.height, 4)),
                                u.width = w,
                                u.height = m
                            }
                        } else
                            e = !0
                    }
                e ? setTimeout(this.spritesSizes.bind(this), 50) : (this.generateOLmask(),
                this.backgroundInitialLoad || (this.backgroundInitialLoad = !0))
            },
            generateOLmask: function() {
                var e = new a.Graphics;
                e.beginFill(0, 1),
                e.drawRect(0, 0, o.windowWidth, o.windowHeight),
                e.endFill(),
                this.backgroundOLMask.container.addChildAt(e, 0),
                this.backgroundOLMask.texture = this.backgroundOLMask.container.generateTexture(this.backgroundRenderer),
                this.backgroundOLMask.container.removeChildAt(0);
                var t = new a.Sprite;
                t.texture = this.backgroundOLMask.texture;
                var i = new a.Graphics;
                i.beginFill(16777215, 1),
                i.drawRect(0, 0, o.windowWidth, o.windowHeight),
                i.endFill(),
                this.backgroundOLFirst.container.addChild(i),
                this.backgroundOLFirst.container.mask = t,
                this.backgroundOLFirst.texture = this.backgroundOLFirst.container.generateTexture(this.backgroundRenderer);
                for (var s = 0; s < this.backgroundStage.children[1].children.length; s++) {
                    var n = new a.Sprite;
                    n.texture = this.backgroundOLFirst.texture,
                    n.anchor.x = .5,
                    n.anchor.y = .5,
                    this.backgroundStage.children[1].children[s].children[0].removeChildren(),
                    this.backgroundStage.children[1].children[s].children[0].addChild(n);
                    var r = new a.Graphics;
                    r.beginFill(16777215, 1),
                    r.drawRect(.25 * o.windowWidth * s, .25 * o.windowHeight, .25 * o.windowWidth, .5 * o.windowHeight),
                    r.endFill(),
                    this.backgroundStage.children[1].children[s].mask = r
                }
                this.backgroundOLFirst.container.removeChildren();
                for (var s = 2; s < this.backgroundStage.children.length; s++)
                    this.backgroundStage.children[s].children[1].mask = t;
                this.inAnimationPlayed || (this.inAnimationPlayed = !0,
                this.playInAnimation())
            },
            nextScreen: function() {
                if (3 === this.currentScreen)
                    return void this.navToHome();
                if (this.overlayScrollNextAnimationRepeat = !(this.currentScreen > 0),
                this.currentScreen++,
                this.currentScreen > 1) {
                    var e = new a.Graphics;
                    e.beginFill(),
                    e.drawRect(o.windowWidth, 0, 0, o.windowHeight),
                    e.endFill(),
                    this.backgroundStage.children[this.currentScreen + 1].mask = e
                }
                this.backgroundStage.children[this.currentScreen + 1].renderable = !0,
                this.backgroundStage.children[this.currentScreen + 1].visible = !0;
                var t = .15;
                if (1 === this.currentScreen) {
                    for (var i = .4, s = this.overlay[0].children[2].children.length - 1; s >= 0; s--)
                        TweenMax.fromTo(this.overlay[0].children[2].children[s].children[0], 1, {
                            opacity: 1e-4
                        }, {
                            delay: i,
                            opacity: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.fromTo(this.overlay[0].children[2].children[s].children[0], 1.2, {
                            x: .05 * o.windowHeight
                        }, {
                            delay: i,
                            x: 0,
                            ease: Power2.easeOut
                        }),
                        i += .3;
                    TweenMax.set(this.overlay[0].children[7], {
                        delay: 0,
                        visibility: "inherit"
                    }),
                    TweenMax.set(this.overlay[0].children[7].children[0], {
                        delay: t,
                        backgroundColor: "rgba(0, 64, 255, 1)"
                    }),
                    TweenMax.fromTo(this.overlay[0].children[7].children[0], .8, {
                        scale: 0
                    }, {
                        delay: t + 1.3,
                        scale: 1,
                        ease: Back.easeOut,
                        onCompleteScope: this,
                        onComplete: function() {
                            n(this.overlay[0].children[7]).addClass("animated"),
                            TweenMax.set(this.overlay[0].children[7].children[0], {
                                delay: .01,
                                clearProps: "transform"
                            })
                        }
                    }),
                    TweenMax.fromTo(this.overlay[0].children[7].children[1], 1, {
                        opacity: 0
                    }, {
                        delay: t + 1.6,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.gridLines, 1.35, {
                        backgroundColor: "rgba(185, 185, 185, 0.12)"
                    }, {
                        delay: t,
                        backgroundColor: "rgba(185, 185, 185, 0.25)",
                        ease: Power2.easeInOut
                    })
                } else {
                    if (2 === this.currentScreen)
                        var r = "rgba(76, 195, 95, 1)";
                    else
                        var r = "rgba(232, 82, 82, 1)";
                    TweenMax.to(this.overlay[0].children[7].children[0], .5, {
                        delay: t,
                        backgroundColor: r,
                        ease: Power2.easeInOut
                    })
                }
                var h = this.overlay[0].children[2].children.length - this.currentScreen;
                if (this.currentScreen > 1 && (TweenMax.set(this.overlay[0].children[2].children[h + 1].children[1], {
                    delay: t,
                    transformOrigin: "0% 50%"
                }),
                TweenMax.fromTo(this.overlay[0].children[2].children[h + 1].children[1], 1.35, {
                    scaleX: 1
                }, {
                    delay: t,
                    scaleX: 0,
                    ease: l.get("homeStateChange")
                }),
                TweenMax.fromTo(this.texts[0].children[0].children[this.currentScreen - 2], .8, {
                    opacity: 1
                }, {
                    delay: t,
                    opacity: 1e-4,
                    ease: Power2.easeInOut,
                    clearProps: "all"
                }),
                TweenMax.fromTo(this.texts[0].children[1].children[this.currentScreen - 2], .8, {
                    opacity: 1
                }, {
                    delay: t,
                    opacity: 1e-4,
                    ease: Power2.easeInOut
                }),
                TweenMax.set([this.texts[0].children[1].children[this.currentScreen - 2], this.texts[0].children[1].children[this.currentScreen - 2].children, this.texts[0].children[1].children[this.currentScreen - 2].children[1].children, this.texts[0].children[1].children[this.currentScreen - 2].children[2].children, this.texts[0].children[1].children[this.currentScreen - 2].children[3].children, this.texts[0].children[1].children[this.currentScreen - 2].children[4].children, this.texts[0].children[1].children[this.currentScreen - 2].children[5].children, this.texts[0].children[1].children[this.currentScreen - 2].children[6].children], {
                    delay: t + .7 + 1.89,
                    clearProps: "all"
                })),
                this.currentScreen < 4) {
                    TweenMax.fromTo(this.overlay[0].children[2].children[h].children[1], 1.35, {
                        scaleX: 0
                    }, {
                        delay: t,
                        scaleX: 1,
                        ease: l.get("homeStateChange")
                    });
                    var c = .5;
                    TweenMax.fromTo(this.texts[0].children[0].children[this.currentScreen - 1], 1.5, {
                        opacity: 1e-4
                    }, {
                        delay: t + c,
                        opacity: 1,
                        ease: Power2.easeInOut
                    });
                    for (var d = .7, s = 1, u = t + d; 7 > s; s++,
                    u += .115) {
                        var w = t + d + .1 + .09 + .01 * s
                          , m = 1.01 - .01 * s;
                        TweenMax.fromTo(this.texts[0].children[1].children[this.currentScreen - 1].children[s].children[0], m, {
                            opacity: 1e-4
                        }, {
                            delay: w,
                            opacity: 1,
                            ease: Power1.easeIn
                        });
                        var p = (-77 - 3 * s).toString() + "%";
                        TweenMax.fromTo(this.texts[0].children[1].children[this.currentScreen - 1].children[s].children[0], 1.2, {
                            x: p
                        }, {
                            delay: u,
                            x: "0%",
                            ease: Power2.easeOut
                        })
                    }
                    TweenMax.set([this.texts[0].children[1].children[this.currentScreen - 1].children[1], this.texts[0].children[1].children[this.currentScreen - 1].children[2], this.texts[0].children[1].children[this.currentScreen - 1].children[3], this.texts[0].children[1].children[this.currentScreen - 1].children[4], this.texts[0].children[1].children[this.currentScreen - 1].children[5], this.texts[0].children[1].children[this.currentScreen - 1].children[6]], {
                        delay: t + d + 1.89,
                        display: "none"
                    }),
                    TweenMax.set(this.texts[0].children[1].children[this.currentScreen - 1].children[0], {
                        delay: t + d + 1.89,
                        opacity: 1
                    })
                }
                var g = this.backgroundStage.children[this.currentScreen + 1].children[1].children[0].children[0]._height
                  , v = this.backgroundStage.children[this.currentScreen + 1].children[1].children[0].children[0]._width;
                if (this.backgroundStageOLPosition.y > this.backgroundStageOLPosition.x) {
                    var f = g - 2 * this.backgroundStageOLPosition.y
                      , x = v * f / g;
                    x < v - 2 * this.backgroundStageOLPosition.x && (x = v - 2 * this.backgroundStageOLPosition.x);
                    var y = x / v
                } else {
                    var x = v - 2 * this.backgroundStageOLPosition.x
                      , f = x * g / v;
                    f < g - 2 * this.backgroundStageOLPosition.y && (f = g - 2 * this.backgroundStageOLPosition.x);
                    var y = f / g
                }
                if (.7 > y && (y = .7),
                1 === this.currentScreen)
                    var T = .2;
                else
                    var T = .3;
                TweenMax.fromTo(this.backgroundStage.children[this.currentScreen + 1].children[1].children[0].filters[0], 5, {
                    gray: 0
                }, {
                    delay: t,
                    gray: T,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.backgroundStage.children[this.currentScreen + 1].children[1].children[0].scale, 7, {
                    x: 1,
                    y: 1
                }, {
                    delay: t,
                    x: y,
                    y: y,
                    ease: Power1.easeInOut
                }),
                this.currentScreen > 1 && (TweenMax.fromTo(this.backgroundStage.children[this.currentScreen].children[0].position, 1.35, {
                    x: 0
                }, {
                    delay: t,
                    x: .25 * -o.windowWidth,
                    ease: l.get("homeStateChange")
                }),
                TweenMax.fromTo(this.backgroundStageMask, 1.35, {
                    percent: 0
                }, {
                    delay: t,
                    percent: 1,
                    ease: l.get("homeStateChange"),
                    onUpdateScope: this,
                    onUpdate: function() {
                        var e = o.windowWidth - o.windowWidth * this.backgroundStageMask.percent
                          , t = o.windowWidth * this.backgroundStageMask.percent;
                        this.backgroundStage.children[this.currentScreen + 1].mask.clear(),
                        this.backgroundStage.children[this.currentScreen + 1].mask.beginFill(),
                        this.backgroundStage.children[this.currentScreen + 1].mask.drawRect(e, 0, t, o.windowHeight),
                        this.backgroundStage.children[this.currentScreen + 1].mask.endFill()
                    },
                    onCompleteScope: this,
                    onComplete: function() {
                        this.backgroundStage.children[this.currentScreen + 1].mask = null,
                        this.backgroundStage.children[this.currentScreen].visible = !1,
                        this.backgroundStage.children[this.currentScreen].renderable = !1,
                        TweenMax.delayedCall(.2, function() {
                            this.isAnimating = !1
                        }, null, this)
                    }
                }))
            },
            clickHandler: function(e) {
                this.isAnimating || (this.isAnimating = !0,
                this.nextScreen())
            },
            scrollHandler: function(e) {
                this.isAnimating || e.originalEvent.deltaY <= 0 || (this.isAnimating = !0,
                this.nextScreen())
            },
            navToHome: function() {
                this.isAnimating = !0,
                this.finalTransition()
            },
            backgroundRender: function() {
                this.backgroundRenderer.render(this.backgroundStage)
            },
            checkTextSizes: function() {
                for (var e = 0; e < this.texts[0].children[1].children.length; e++) {
                    var t = n(this.texts[0].children[1].children[e]);
                    t.removeClass("vertical"),
                    t.find("h2").height() > .45 * o.windowHeight && t.addClass("vertical")
                }
            },
            resize: function() {
                if (!this.isAnimating) {
                    this.backgroundRenderer.resize(o.windowWidth, o.windowHeight);
                    var e = h.round(o.windowWidth / 2, 4)
                      , t = h.round(o.windowHeight / 2, 4);
                    this.backgroundStage.position.x = e,
                    this.backgroundStage.position.y = t,
                    this.backgroundStage.children[0].clear(),
                    this.backgroundStage.children[0].beginFill(2565676, 1),
                    this.backgroundStage.children[0].drawRect(.5 * -o.windowWidth, .5 * -o.windowHeight, o.windowWidth, o.windowHeight),
                    this.backgroundStage.children[0].endFill(),
                    this.spritesSizes(),
                    this.firstLoad ? this.firstLoad = !1 : this.checkTextSizes()
                }
            },
            remove: function() {
                TweenMax.ticker.removeEventListener("tick", this.backgroundRender),
                this.overlayScrollNextAnimation.kill(),
                o.main.off("wheel"),
                this.background.off("click"),
                this.skip.off("click"),
                this.overlayScrollNext.off("click"),
                this.events.off("view action")
            }
        },
        t.exports = s
    }
    , {
        "../config/vars": 2,
        "../templates/intro_tpl": 6,
        "../utils/cubicbezier": 14,
        "../utils/functions": 15,
        "../utils/normalizeScroll": 16,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery",
        "pixi.js": "pixi.js"
    }],
    22: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new r,
            this.scrollbar = new o,
            this.grid = null,
            this.inner = null,
            this.scrollMsg = null,
            this.topTitle = null,
            this.infos = null,
            this.type = null,
            this.typeInner = null,
            this.typeIcon = null,
            this.typeText = null,
            this.slider = null,
            this.slides = null,
            this.sliderArrows = null,
            this.sliderSvg = null,
            this.relatedText = null,
            this.relatedSquares = null,
            this.backToProjects = null,
            this.nextProject = null,
            this.nextProjectInner = null,
            this.nextProjectInnerImage = null,
            this.footer = null,
            this.whiteBg = null,
            this.whiteBgRenderer = null,
            this.whiteBgStage = null,
            this.whiteBgMask = {
                container: null,
                texture: null
            },
            this.whiteBgSmoke = {
                container: null,
                texture: null
            },
            this.whiteBgInitialLoad = !1,
            this.whiteBgAnimationPlayed = !1,
            this.innerScrollPosition = 0,
            this.innerLastScrollPosition = 0,
            this.innerMaxScroll = 0,
            this.liveScrollPosition = {
                y: 0
            },
            this.scrollUpdatedBy = null,
            this.scrollAnimatedElements = [],
            this.scrollPointsLogo = [],
            this.logoClass = "white",
            this.slidesNumber = 0,
            this.slideShown = 0,
            this.slideScrollPointStart = 0,
            this.slideScrollPointEnd = 0,
            this.slideSwitch = !1,
            this.sliderAllowNext = !1,
            this.slideTimeout = null,
            this.firstLoad = !0,
            this.isAnimating = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("pixi.js"))
          , r = e("eventemitter3")
          , o = e("./ui/scrollbar")
          , l = e("../config/vars")
          , h = e("../utils/cubicbezier")
          , c = e("../utils/normalizeScroll")
          , d = e("../utils/functions")
          , u = e("../templates/project_tpl");
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                "from projects" !== s ? this.createTemplate(i) : this.appendTemplate(i),
                this.selectors(),
                this.createWhiteBG(),
                this.resize(),
                this.createTweens(),
                this.scrollbar.init(this.el),
                this.sliderInit(),
                this.playInAnimation(s)
            },
            createTemplate: function(e) {
                l.main.html(u.main(e))
            },
            appendTemplate: function(e) {
                l.main.append(u.main(e))
            },
            selectors: function() {
                this.el = n("#container #main section#project"),
                this.inner = this.el.find(".inner"),
                this.scrollMsg = this.el.find(".scroll-msg"),
                this.topTitle = this.inner.find(".title"),
                this.grid = this.el.find(".grid"),
                this.infos = this.inner.find(".infos"),
                this.type = this.inner.find(".type"),
                this.typeInner = this.type.find(".inner-type"),
                this.typeIcon = this.type.find("img"),
                this.typeText = this.type.find(".type-cnt"),
                this.slider = this.inner.find(".project-slider"),
                this.slides = this.slider.find(".slide"),
                this.sliderArrows = this.slider.find(".slider-arrows div"),
                this.sliderSvg = this.slider.find("svg"),
                this.whiteBg = this.inner.find(".bg-white-image canvas"),
                this.relatedText = this.inner.find(".related-projects-text"),
                this.relatedSquares = this.inner.find(".related-projects-square"),
                this.backToProjects = this.inner.find(".back-projects"),
                this.nextProject = this.inner.find(".next-project"),
                this.nextProjectInner = this.nextProject.find(".inner-next-project"),
                this.nextProjectInnerImage = this.nextProjectInner.find(".next-image"),
                this.footer = this.inner.find("footer")
            },
            playInAnimation: function(e) {
                var t = .15
                  , i = 0
                  , s = 0;
                "from projects" === e ? (TweenMax.set(this.inner[0].children[0].children[0], {
                    y: .1 * -l.windowHeight,
                    force3D: !0
                }),
                TweenMax.set(this.el, {
                    delay: t,
                    opacity: 1
                }),
                TweenMax.delayedCall(t, function() {
                    this.events.emit("move bg")
                }, null, this),
                TweenMax.fromTo(this.inner[0].children[0].children[0], .3, {
                    opacity: 1e-4
                }, {
                    delay: t + 1.25,
                    opacity: 1,
                    ease: Power2.easeIn
                }),
                TweenMax.delayedCall(t + 1.75, function() {
                    this.events.emit("view rendered")
                }, null, this),
                s = .75) : (i = .6,
                TweenMax.set(this.inner[0].children[0].children[0], {
                    opacity: 1
                }),
                TweenMax.fromTo(this.el, 1.5, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                l.hamburguer.el.removeClass().addClass(this.logoClass),
                l.title.el.removeClass().addClass(this.logoClass),
                TweenMax.fromTo(this.inner[0].children[0].children[0], 1.2, {
                    y: 0
                }, {
                    delay: t + i,
                    y: .1 * -l.windowHeight,
                    force3D: !0,
                    ease: Power3.easeInOut
                })),
                TweenMax.to([l.hamburguer.el, l.title.el], 1.5, {
                    delay: t,
                    opacity: 1,
                    ease: Power2.easeInOut
                });
                for (var n = 1, a = t + i + .4; 10 > n; n++,
                a += .0766) {
                    var r = t + i + .5 + .09 + .01 * n
                      , o = 1.01 - .01 * n;
                    TweenMax.fromTo(this.topTitle[0].children[n].children[0], o, {
                        opacity: 1e-4
                    }, {
                        delay: r,
                        opacity: 1,
                        ease: Power1.easeIn
                    });
                    var c = (-75 - 5 * n).toString() + "%";
                    TweenMax.fromTo(this.topTitle[0].children[n].children[0], 1.2, {
                        x: c
                    }, {
                        delay: a,
                        x: "0%",
                        ease: Power2.easeOut
                    })
                }
                TweenMax.set([this.topTitle[0].children[1], this.topTitle[0].children[2], this.topTitle[0].children[3], this.topTitle[0].children[4], this.topTitle[0].children[5], this.topTitle[0].children[6], this.topTitle[0].children[7], this.topTitle[0].children[8], this.topTitle[0].children[9]], {
                    delay: 2.3 + t + i,
                    display: "none"
                }),
                TweenMax.set(this.topTitle[0].children[0], {
                    delay: 2.3 + t + i,
                    autoAlpha: 1
                });
                for (var n = 0, d = t + i, u = 1, w = 0; 3 > n; n++,
                w += .1)
                    TweenMax.fromTo(this.infos[0].children[n].children[0].children[0], u, {
                        scaleY: 0
                    }, {
                        delay: d + w,
                        scaleY: 1,
                        ease: Power4.easeInOut
                    }),
                    TweenMax.fromTo(this.infos[0].children[n].children[0].children[1], u, {
                        scaleY: 0
                    }, {
                        delay: d + .08 + w,
                        scaleY: 1,
                        ease: Power4.easeInOut
                    }),
                    TweenMax.fromTo(this.infos[0].children[n].children[0].children[2], u, {
                        scaleY: 0
                    }, {
                        delay: d + .2 + w,
                        scaleY: 1,
                        ease: Power4.easeInOut
                    });
                for (var n = 0, a = t + i + .6; 3 > n; n++,
                a += .15)
                    TweenMax.fromTo(this.infos[0].children[n].children[1].children[0], 1.2, {
                        x: .015 * -l.windowWidth
                    }, {
                        delay: .1 + a,
                        x: 0,
                        force3D: !0,
                        ease: Power2.easeOut
                    }),
                    TweenMax.fromTo(this.infos[0].children[n].children[1].children[0], 1.2, {
                        opacity: 0
                    }, {
                        delay: a,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.infos[0].children[n].children[1].children[1], 1.4, {
                        x: .015 * -l.windowWidth
                    }, {
                        delay: .15 + a,
                        x: 0,
                        force3D: !0,
                        ease: Power2.easeOut
                    }),
                    TweenMax.fromTo(this.infos[0].children[n].children[1].children[1], 1.4, {
                        opacity: 0
                    }, {
                        delay: .05 + a,
                        opacity: 1,
                        ease: Power2.easeInOut
                    });
                TweenMax.fromTo(this.type, 1.35, {
                    x: "100%"
                }, {
                    delay: t + i + .4,
                    x: "0%",
                    ease: h.get("homeStateChange")
                }),
                TweenMax.fromTo(this.type[0].children[0], 1.35, {
                    x: "-100%"
                }, {
                    delay: t + i + .4,
                    x: "0%",
                    ease: h.get("homeStateChange")
                }),
                TweenMax.fromTo(this.scrollMsg, 1, {
                    opacity: 1e-4
                }, {
                    delay: t + i + 1,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.scrollMsg[0].children[0], 1.5, {
                    scaleX: 0
                }, {
                    delay: t + i + 1.5,
                    scaleX: 1,
                    ease: h.get("homeStateChange")
                }),
                TweenMax.delayedCall(1.1 + t + i + s, function() {
                    this.scrollbar.events.on("scroll", this.scrollBarHandler, this),
                    this.scrollbar.bindEvents(),
                    l.main.on("wheel", this.scrollHandler.bind(this)),
                    this.sliderArrows.on("click", this.clickArrowSlider.bind(this)),
                    this.relatedSquares.on("mouseenter mouseleave", this.relatedSquaresHover.bind(this)),
                    this.nextProject.on("mouseenter mouseleave", this.nextProjectHover.bind(this)),
                    this.backToProjects.on("mouseenter mouseleave", this.backToProjectsHover.bind(this)),
                    TweenMax.ticker.addEventListener("tick", this.scroll, this),
                    this.events.emit("view shown")
                }, null, this)
            },
            playOutAnimation: function() {
                TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    TweenMax.ticker.removeEventListener("tick", this.scroll),
                    this.events.emit("view hidden")
                }, null, this)
            },
            createWhiteBG: function() {
                this.whiteBgRenderer = a.autoDetectRenderer(.65 * l.windowWidth, l.windowHeight, {
                    view: this.whiteBg[0],
                    backgroundColor: 16777215
                }),
                this.whiteBgStage = new a.Container,
                this.whiteBgMask.container = new a.Container,
                this.whiteBgMask.container.addChild(a.Sprite.fromImage(l.url + "/wp-content/themes/ortizleon/img/smoke.jpg")),
                this.whiteBgMask.container.children[0].anchor.x = .5,
                this.whiteBgMask.container.children[0].anchor.y = .5,
                this.whiteBgSmoke.container = new a.Container,
                this.whiteBgStage.addChild(a.Sprite.fromImage(l.projectsData[this.whiteBg[0].dataset.index].background_white_image)),
                this.whiteBgStage.children[0].alpha = 1e-4,
                TweenMax.ticker.addEventListener("tick", this.whiteBgRender, this)
            },
            spritesSizes: function() {
                var e = !1;
                if (this.whiteBgMask.container.children[0]._texture.baseTexture.hasLoaded) {
                    if (this.whiteBgInitialLoad || !this.whiteBgInitialLoad && "undefined" == typeof this.whiteBgMask.container.children[0].initialLoad) {
                        "undefined" == typeof this.whiteBgMask.container.children[0].initialLoad && (this.whiteBgMask.container.children[0].initialLoad = !0),
                        this.whiteBgMask.container.children[0].position.x = .65 * l.windowWidth / 2,
                        this.whiteBgMask.container.children[0].position.y = l.windowHeight / 2;
                        var t = .65 * l.windowWidth * .2
                          , i = t / this.whiteBgMask.container.children[0]._texture.width;
                        this.whiteBgMask.container.children[0].scale.x = i,
                        this.whiteBgMask.container.children[0].scale.y = i;
                        var s = new a.Graphics;
                        s.beginFill(16777215, 1),
                        s.drawRect(0, 0, .65 * l.windowWidth, l.windowHeight),
                        s.endFill(),
                        this.whiteBgMask.container.addChildAt(s, 0),
                        this.whiteBgMask.texture = this.whiteBgMask.container.generateTexture(this.whiteBgRenderer),
                        this.whiteBgMask.container.removeChildAt(0);
                        var n = new a.Sprite;
                        n.position.x = .65 * -l.windowWidth / 2,
                        n.position.y = -l.windowHeight / 2,
                        n.texture = this.whiteBgMask.texture,
                        this.whiteBgSmoke.container.addChild(s),
                        this.whiteBgSmoke.container.mask = n,
                        this.whiteBgSmoke.texture = this.whiteBgSmoke.container.generateTexture(this.whiteBgRenderer),
                        this.whiteBgSmoke.container.removeChildren()
                    }
                } else
                    e = !0;
                if (this.whiteBgStage.children[0]._texture.baseTexture.hasLoaded) {
                    if (this.whiteBgInitialLoad || !this.whiteBgInitialLoad && "undefined" == typeof this.whiteBgStage.children[0].initialLoad) {
                        "undefined" == typeof this.whiteBgStage.children[0].initialLoad && (this.whiteBgStage.children[0].initialLoad = !0);
                        var r = .65 * l.windowWidth
                          , o = this.whiteBgStage.children[0]._texture.height * r / this.whiteBgStage.children[0]._texture.width;
                        o > l.windowHeight && (o = l.windowHeight,
                        r = this.whiteBgStage.children[0]._texture.width * o / this.whiteBgStage.children[0]._texture.height);
                        var h = -r / 2 + (.65 * l.windowWidth - r) / 2
                          , c = -o / 2 + (l.windowHeight - o) / 2;
                        this.whiteBgStage.children[0].width = r,
                        this.whiteBgStage.children[0].height = o,
                        this.whiteBgStage.children[0].position.x = h,
                        this.whiteBgStage.children[0].position.y = c
                    }
                } else
                    e = !0;
                e ? setTimeout(this.spritesSizes.bind(this), 50) : (this.whiteBgStage.children.length > 1 && this.whiteBgStage.removeChildAt(1),
                this.whiteBgAnimationPlayed ? this.whiteBgRender() : (this.whiteBgStage.addChild(new a.Sprite),
                this.whiteBgStage.children[1].anchor.x = .5,
                this.whiteBgStage.children[1].anchor.y = .5,
                this.whiteBgStage.children[1].texture = this.whiteBgSmoke.texture),
                this.whiteBgInitialLoad || (this.whiteBgInitialLoad = !0,
                this.createWhiteBgTweens()))
            },
            createWhiteBgTweens: function() {
                if ("undefined" == typeof this.scrollAnimatedElements[2].animation)
                    return void setTimeout(this.createWhiteBgTweens.bind(this), 100);
                this.scrollAnimatedElements[2].animation.to(this.whiteBgStage.children[0], .15, {
                    alpha: 1,
                    ease: Power2.easeOut
                }, 0),
                this.scrollAnimatedElements[2].animation.to(this.whiteBgStage.children[1].scale, 3, {
                    x: 30,
                    y: 30,
                    ease: Power1.easeOut
                }, 0);
                var e = Math.PI * Math.random();
                this.scrollAnimatedElements[2].animation.to(this.whiteBgStage.children[1], 3, {
                    rotation: e,
                    ease: Power1.easeOut
                }, 0),
                this.scrollAnimatedElements[2].animation.to(this.whiteBgStage.children[1], 2, {
                    alpha: 0,
                    ease: Power2.easeInOut
                }, .75)
            },
            createTweens: function() {
                this.scrollAnimatedElements[0].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[0].animation.fromTo(this.relatedText, 1.35, {
                    x: "-100%"
                }, {
                    x: "0%",
                    ease: h.get("homeStateChange")
                }, 0),
                this.scrollAnimatedElements[0].animation.fromTo(this.relatedText[0].children[0], 1.35, {
                    x: "100%"
                }, {
                    x: "0%",
                    ease: h.get("homeStateChange")
                }, 0),
                this.scrollAnimatedElements[0].animation.fromTo(this.relatedText[0].children[0].children[0], .9, {
                    scaleY: 0
                }, {
                    scaleY: 1,
                    ease: h.get("homeStateChange")
                }, .25),
                this.scrollAnimatedElements[0].animation.fromTo(this.relatedText[0].children[0].children[1].children[0], 1.2, {
                    x: .015 * -l.windowWidth
                }, {
                    x: 0,
                    force3D: !0,
                    ease: Power2.easeOut
                }, .5),
                this.scrollAnimatedElements[0].animation.fromTo(this.relatedText[0].children[0].children[1].children[0], 1.2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .4),
                this.scrollAnimatedElements[0].animation.fromTo(this.relatedText[0].children[0].children[1].children[1], 1.2, {
                    x: .015 * -l.windowWidth
                }, {
                    x: 0,
                    force3D: !0,
                    ease: Power2.easeOut
                }, .8),
                this.scrollAnimatedElements[0].animation.fromTo(this.relatedText[0].children[0].children[1].children[1], 1.2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .7),
                this.scrollAnimatedElements[0].animation.fromTo(this.relatedText[0].children[0].children[1].children[2], 1.2, {
                    x: .015 * -l.windowWidth
                }, {
                    x: 0,
                    force3D: !0,
                    ease: Power2.easeOut
                }, .95),
                this.scrollAnimatedElements[0].animation.fromTo(this.relatedText[0].children[0].children[1].children[2], 1.2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .85),
                this.scrollAnimatedElements[1].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                });
                for (var e = d.createRandomArray(this.relatedSquares.length), t = .4 / this.relatedSquares.length, i = 0; i < this.relatedSquares.length; i++)
                    this.scrollAnimatedElements[1].animation.fromTo(this.relatedSquares[e[i]], 1, {
                        opacity: 1e-4
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, .3 + t * i);
                this.scrollAnimatedElements[2].animation = new TimelineMax({
                    delay: 0,
                    paused: !0,
                    onStartScope: this,
                    onStart: function() {
                        this.whiteBgAnimationPlayed = !0
                    },
                    onCompleteScope: this,
                    onComplete: function() {
                        TweenMax.ticker.removeEventListener("tick", this.whiteBgRender)
                    }
                }),
                this.scrollAnimatedElements[3].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[3].animation.fromTo(this.nextProject, 1.35, {
                    x: "100%"
                }, {
                    x: "0%",
                    ease: h.get("homeStateChange")
                }, 0),
                this.scrollAnimatedElements[3].animation.fromTo(this.nextProjectInner, 1.35, {
                    x: "-100%"
                }, {
                    x: "0%",
                    ease: h.get("homeStateChange")
                }, 0),
                this.scrollAnimatedElements[3].animation.fromTo(this.nextProjectInner[0].children[1], 1.2, {
                    x: .015 * l.windowWidth,
                    y: "-50%"
                }, {
                    x: 0,
                    y: "-50%",
                    force3D: !0,
                    ease: Power2.easeOut
                }, .48),
                this.scrollAnimatedElements[3].animation.fromTo(this.nextProjectInner[0].children[1], 1.2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .38),
                this.scrollAnimatedElements[3].animation.fromTo(this.backToProjects[0].children[0].children[0], 1.35, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: h.get("homeStateChange")
                }, .3),
                this.scrollAnimatedElements[3].animation.fromTo(this.backToProjects[0].children[1], 1.2, {
                    x: .015 * l.windowWidth
                }, {
                    x: 0,
                    force3D: !0,
                    ease: Power2.easeOut,
                    onCompleteScope: this,
                    onComplete: function() {
                        this.backToProjects.addClass("animated")
                    },
                    clearProps: "transform"
                }, .8),
                this.scrollAnimatedElements[3].animation.fromTo(this.backToProjects[0].children[1], 1.2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .9),
                this.scrollAnimatedElements[4].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[4].animation.fromTo(this.footer[0].children[0], .8, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0);
                for (var i = 0, t = .1; i < this.footer[0].children[1].children[0].children.length; i++,
                t += .1)
                    this.scrollAnimatedElements[4].animation.fromTo(this.footer[0].children[1].children[0].children[i], 1.4, {
                        opacity: 1e-4
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, t);
                this.scrollAnimatedElements[5].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[5].animation.to(this.scrollMsg, .5, {
                    opacity: 0,
                    ease: Power2.easeOut
                }, 0)
            },
            scrollBarHandler: function(e) {
                this.innerScrollPosition = e * this.innerMaxScroll,
                this.scrollUpdatedBy = "scrollbar"
            },
            scrollHandler: function(e) {
                var t = c(e.originalEvent);
                this.innerScrollPosition -= t.pixelY,
                this.scrollUpdatedBy = "scroll"
            },
            scroll: function() {
                this.inner[0].style.transform = "translate3d(0px," + this.liveScrollPosition.y + "px, 0px)",
                this.inner[0].children[0].style.transform = "translate3d(0px," + this.parallaxHeader() + "px, 0px)",
                this.scrollbar.bar[0].style.transform = "translate3d(0px," + this.scrollbar.scrollBarLivePosition.y + "px, 0px)",
                this.checkLogoColor(),
                this.checkAnimatedElements(),
                this.innerLastScrollPosition === this.innerScrollPosition && null === this.scrollUpdatedBy || (this.innerScrollPosition > 0 ? this.innerScrollPosition = 0 : this.innerScrollPosition < this.innerMaxScroll && (this.innerScrollPosition = this.innerMaxScroll),
                TweenMax.to(this.liveScrollPosition, 1.3, {
                    y: this.innerScrollPosition,
                    force3D: !0,
                    ease: Power4.easeOut
                }),
                this.scrollbar.updatePosition(this.innerScrollPosition / this.innerMaxScroll, "scrollbar" === this.scrollUpdatedBy ? 0 : 1.3, Power4.easeOut),
                this.checkSliderVisibility(),
                this.innerLastScrollPosition = this.innerScrollPosition,
                this.scrollUpdatedBy = null)
            },
            parallaxHeader: function() {
                return this.liveScrollPosition.y < -l.windowHeight ? d.round(.3 * l.windowHeight, 2) : d.round(.3 * -this.liveScrollPosition.y, 2)
            },
            checkLogoColor: function() {
                var e = this.liveScrollPosition.y - .05 * l.windowHeight;
                "white" !== this.logoClass && (e > this.scrollPointsLogo[0] || e < this.scrollPointsLogo[1] && e > this.scrollPointsLogo[2]) ? (this.logoClass = "white",
                l.hamburguer.el.removeClass().addClass(this.logoClass),
                l.title.el.removeClass().addClass(this.logoClass)) : "white" === this.logoClass && (e < this.scrollPointsLogo[0] && e > this.scrollPointsLogo[1] || e < this.scrollPointsLogo[2]) && (this.logoClass = "green",
                l.hamburguer.el.removeClass().addClass(this.logoClass),
                l.title.el.removeClass().addClass(this.logoClass))
            },
            sliderInit: function() {
                this.slidesNumber = this.slides.length
            },
            checkSliderVisibility: function() {
                0 !== this.slidesNumber && (this.innerScrollPosition > this.slideScrollPointStart || this.innerScrollPosition < this.slideScrollPointEnd || 0 !== this.slideShown && this.slideSwitch !== !0 || (this.slideSwitch = !0,
                this.sliderNext()))
            },
            slideTimer: function() {
                this.slideSwitch = !0,
                this.checkSliderVisibility()
            },
            sliderNext: function(e) {
                if (this.slideSwitch !== !1) {
                    this.slideSwitch = !1;
                    var t = this.slideShown;
                    if ("prev" === e ? this.slideShown > 1 ? this.slideShown-- : this.slideShown = this.slidesNumber : this.slideShown < this.slidesNumber ? this.slideShown++ : this.slideShown = 1,
                    t > 0) {
                        this.sliderAllowNext = !1;
                        var i = 1;
                        TweenMax.to(this.sliderSvg[0].childNodes[0], 1, {
                            opacity: 0,
                            ease: Power2.easeOut
                        }),
                        TweenMax.fromTo([this.slides[t - 1].children[0], this.slides[t - 1].children[1]], i, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: Power2.easeInOut,
                            onCompleteScope: this,
                            onComplete: function() {
                                TweenMax.set([this.slides[t - 1].children[0], this.slides[t - 1].children[0].children[0], this.slides[t - 1].children[0].children[0].children[0], this.slides[t - 1].children[1], this.slides[t - 1].children[1].children[1], this.slides[t - 1].children[1].children[0].children], {
                                    delay: i,
                                    clearProps: "transform, opacity"
                                }),
                                TweenMax.set(this.slides[t - 1], {
                                    delay: i,
                                    clearProps: "visibility"
                                }),
                                this.slideAnimateIn()
                            }
                        })
                    } else
                        this.slideAnimateIn()
                }
            },
            slideAnimateIn: function() {
                if (this.sliderAllowNext = !0,
                "format-3" === this.slides[this.slideShown - 1].classList[1])
                    var e = .015 * l.windowWidth
                      , t = .05;
                else if ("format-2" === this.slides[this.slideShown - 1].classList[1])
                    var e = .015 * -l.windowWidth
                      , t = .04;
                else
                    var e = .015 * -l.windowWidth
                      , t = .03;
                TweenMax.set(this.slides[this.slideShown - 1], {
                    visibility: "inherit"
                }),
                TweenMax.to(this.slides[this.slideShown - 1].children[0], 1.35, {
                    x: "0%",
                    ease: h.get("homeStateChange")
                }),
                TweenMax.to(this.slides[this.slideShown - 1].children[0].children[0], 1.35, {
                    x: "0%",
                    ease: h.get("homeStateChange")
                }),
                TweenMax.fromTo(this.slides[this.slideShown - 1].children[0].children[0].children[0], 5, {
                    z: 150
                }, {
                    z: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.slides[this.slideShown - 1].children[1].children[0].children[0], 1.2, {
                    scaleX: 0
                }, {
                    delay: t,
                    scaleX: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.fromTo(this.slides[this.slideShown - 1].children[1].children[0].children[1], 1.2, {
                    scaleX: 0
                }, {
                    delay: t + .08,
                    scaleX: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.fromTo(this.slides[this.slideShown - 1].children[1].children[0].children[2], 1.2, {
                    scaleX: 0
                }, {
                    delay: t + .18,
                    scaleX: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.fromTo(this.slides[this.slideShown - 1].children[1].children[1], 1, {
                    x: e,
                    y: "-50%"
                }, {
                    delay: t + .75,
                    x: 0,
                    y: "-50%",
                    force3D: !0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.slides[this.slideShown - 1].children[1].children[1], 1, {
                    opacity: 0
                }, {
                    delay: t + .65,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.sliderSvg[0].childNodes[0], 6, {
                    strokeDashoffset: 754,
                    opacity: 1
                }, {
                    strokeDashoffset: 0,
                    ease: Linear.easeNone
                }),
                this.slideTimeout = setTimeout(this.slideTimer.bind(this), 6e3)
            },
            clickArrowSlider: function(e) {
                this.sliderAllowNext && (this.sliderAllowNext = !1,
                null !== this.slideTimeout && clearTimeout(this.slideTimeout),
                this.slideSwitch = !0,
                "top" === e.delegateTarget.className ? (TweenMax.fromTo(e.delegateTarget.children[0], .5, {
                    x: "0%",
                    opacity: 1
                }, {
                    x: "20%",
                    opacity: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(e.delegateTarget.children[0], .5, {
                    x: "-20%",
                    opacity: 0
                }, {
                    delay: .5,
                    x: "0%",
                    opacity: 1,
                    ease: Power2.easeOut
                }),
                this.sliderNext("next")) : (TweenMax.fromTo(e.delegateTarget.children[0], .5, {
                    x: "0%",
                    opacity: 1
                }, {
                    x: "-20%",
                    opacity: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(e.delegateTarget.children[0], .5, {
                    x: "20%",
                    opacity: 0
                }, {
                    delay: .5,
                    x: "0%",
                    opacity: 1,
                    ease: Power2.easeOut
                }),
                this.sliderNext("prev")))
            },
            checkAnimatedElements: function() {
                for (var e = 0; e < this.scrollAnimatedElements.length; e++)
                    !this.scrollAnimatedElements[e].shown && this.liveScrollPosition.y < this.scrollAnimatedElements[e].point && (this.scrollAnimatedElements[e].shown = !0,
                    this.scrollAnimatedElements[e].animation.play())
            },
            checkIconHeight: function() {
                if (0 === this.typeIcon[0].naturalWidth)
                    return void setTimeout(this.checkIconHeight.bind(this), 50);
                var e = this.typeIcon[0].naturalWidth
                  , t = this.typeIcon[0].naturalHeight
                  , i = Math.round(.8 * this.typeInner.width())
                  , s = Math.round(i * t / e)
                  , n = Math.round(.08 * l.windowHeight + this.typeText.height());
                s / 2 + this.typeInner.height() / 2 > this.typeInner.height() - n && (s = Math.round(this.typeInner.height() - 2 * n),
                i = Math.round(e * s / t)),
                TweenMax.set(this.typeIcon, {
                    width: i,
                    height: s,
                    top: this.typeInner.height() / 2 - s / 2,
                    left: this.typeInner.width() / 2 - i / 2
                })
            },
            whiteBgRender: function() {
                this.whiteBgRenderer.render(this.whiteBgStage)
            },
            relatedSquaresHover: function(e) {
                "mouseenter" === e.type ? (TweenMax.to(e.delegateTarget.children[0], .3, {
                    webkitFilter: "grayscale(100%)",
                    filter: "grayscale(100%)",
                    ease: Power1.easeOut
                }),
                TweenMax.to(e.delegateTarget.children[0], .5, {
                    scale: 1.05,
                    ease: Power1.easeOut
                }),
                TweenMax.to(e.delegateTarget.children[1], .3, {
                    opacity: 1,
                    ease: Power1.easeOut
                }),
                TweenMax.fromTo(e.delegateTarget.children[2], .5, {
                    rotation: "-360deg"
                }, {
                    scale: 1,
                    rotation: "0deg",
                    ease: h.get("projectsCircle")
                })) : (TweenMax.to(e.delegateTarget.children[0], .3, {
                    webkitFilter: "grayscale(0%)",
                    filter: "grayscale(0%)",
                    ease: Power2.easeOut
                }),
                TweenMax.to(e.delegateTarget.children[0], .5, {
                    scale: 1,
                    ease: Power2.easeOut
                }),
                TweenMax.to(e.delegateTarget.children[1], .3, {
                    opacity: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.to(e.delegateTarget.children[2], .5, {
                    scale: 0,
                    rotation: "-360deg",
                    ease: h.get("projectsCircle")
                }))
            },
            nextProjectHover: function(e) {
                "mouseenter" === e.type ? (TweenMax.to(e.delegateTarget.children[0].children[0], .8, {
                    scale: .85,
                    ease: h.get("projectsCircle")
                }),
                TweenMax.to(e.delegateTarget.children[0].children[0].children[0], .8, {
                    scale: 1.25,
                    ease: h.get("projectsCircle")
                }),
                TweenMax.to(e.delegateTarget.children[0].children[1].children[0], .5, {
                    x: .018 * l.windowWidth,
                    ease: h.get("projectsNextText")
                }),
                TweenMax.to(e.delegateTarget.children[0].children[1].children[2], .5, {
                    scaleX: 1,
                    ease: h.get("projectsNextLine")
                })) : (TweenMax.to(e.delegateTarget.children[0].children[0], .8, {
                    scale: 1,
                    ease: h.get("projectsCircle")
                }),
                TweenMax.to(e.delegateTarget.children[0].children[0].children[0], .8, {
                    scale: 1,
                    ease: h.get("projectsCircle")
                }),
                TweenMax.to(e.delegateTarget.children[0].children[1].children[0], .5, {
                    x: 0,
                    ease: h.get("projectsNextText")
                }),
                TweenMax.to(e.delegateTarget.children[0].children[1].children[2], .5, {
                    scaleX: 0,
                    ease: h.get("projectsNextText")
                }))
            },
            backToProjectsHover: function(e) {
                "animated" === e.delegateTarget.classList[1] && ("mouseenter" === e.type ? (TweenMax.to(e.delegateTarget.children[0].children[1], .3, {
                    scaleX: 1,
                    ease: h.get("projectsBack")
                }),
                TweenMax.to(e.delegateTarget.children[1], .3, {
                    delay: .05,
                    x: 6,
                    ease: h.get("projectsBack")
                })) : (TweenMax.to(e.delegateTarget.children[0].children[1], .3, {
                    scaleX: 0,
                    ease: h.get("projectsBack")
                }),
                TweenMax.to(e.delegateTarget.children[1], .3, {
                    x: 0,
                    ease: h.get("projectsBack")
                })))
            },
            resize: function() {
                this.innerMaxScroll = l.windowHeight - this.inner.height(),
                this.innerMaxScroll > 0 && (this.innerMaxScroll = 0),
                this.slideScrollPointStart = .1 * -l.windowHeight,
                this.slideScrollPointEnd = 2 * -l.windowHeight,
                this.checkIconHeight();
                var e = this.nextProjectInner.width() < this.nextProjectInner.height() ? this.nextProjectInner.width() : this.nextProjectInner.height()
                  , t = Math.round(.65 * e);
                TweenMax.set(this.nextProjectInnerImage, {
                    width: t,
                    height: t,
                    top: this.nextProjectInner.height() / 2 - t / 2,
                    left: this.nextProjectInner.width() / 2 - t / 2
                }),
                this.whiteBgRenderer.resize(.65 * l.windowWidth, l.windowHeight);
                var i = d.round(.65 * l.windowWidth / 2, 4)
                  , s = d.round(l.windowHeight / 2, 4);
                this.whiteBgStage.position.x = i,
                this.whiteBgStage.position.y = s,
                this.firstLoad ? (this.scrollAnimatedElements.push({
                    point: -this.inner.height() + 2.375 * l.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: -this.inner.height() + 2.2 * l.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 1.1 * -l.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: -this.inner.height() + 1.65 * l.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: -this.inner.height() + 1.115 * l.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: -15,
                    shown: !1
                }),
                this.scrollPointsLogo.push(.75 * -l.windowHeight),
                this.scrollPointsLogo.push(-this.inner.height() + .25 * l.windowHeight * 6),
                this.scrollPointsLogo.push(-this.inner.height() + .25 * l.windowHeight * 4),
                this.firstLoad = !1) : (this.scrollAnimatedElements[0].point = -this.inner.height() + 2.375 * l.windowHeight,
                this.scrollAnimatedElements[1].point = -this.inner.height() + 2.2 * l.windowHeight,
                this.scrollAnimatedElements[2].point = 1.1 * -l.windowHeight,
                this.scrollAnimatedElements[3].point = -this.inner.height() + 1.65 * l.windowHeight,
                this.scrollAnimatedElements[4].point = -this.inner.height() + 1.115 * l.windowHeight,
                this.scrollAnimatedElements[5].point = -15,
                this.scrollPointsLogo[0] = .75 * -l.windowHeight,
                this.scrollPointsLogo[1] = -this.inner.height() + .25 * l.windowHeight * 6,
                this.scrollPointsLogo[2] = -this.inner.height() + .25 * l.windowHeight * 4,
                this.scrollbar.resize(),
                this.scroll()),
                this.spritesSizes()
            },
            remove: function() {
                TweenMax.ticker.removeEventListener("tick", this.whiteBgRender),
                this.scrollbar.events.off("scroll"),
                this.scrollbar.remove(),
                null !== this.slideTimeout && clearTimeout(this.slideTimeout),
                l.main.off("wheel"),
                this.sliderArrows.off("click"),
                this.relatedSquares.off("mouseenter mouseleave"),
                this.nextProject.off("mouseenter mouseleave"),
                this.backToProjects.off("mouseenter mouseleave"),
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../config/vars": 2,
        "../templates/project_tpl": 7,
        "../utils/cubicbezier": 14,
        "../utils/functions": 15,
        "../utils/normalizeScroll": 16,
        "./ui/scrollbar": 27,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery",
        "pixi.js": "pixi.js"
    }],
    23: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new a,
            this.inner = null,
            this.scrollMsg = null,
            this.grid = null,
            this.title = null,
            this.roulette = null,
            this.progress = null,
            this.footer = null,
            this.virtualScrollPosition = 0,
            this.virtualMaxScroll = 0,
            this.virtualLastScrollPosition = 0,
            this.liveScrollPosition = {
                inner: 0,
                roulette: 0
            },
            this.rouletteMaxScroll = 0,
            this.scrollUpdatedBy = null,
            this.scrollAnimatedElements = [],
            this.rouletteAnimation = null,
            this.firstLoad = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("eventemitter3"))
          , r = e("../config/vars")
          , o = e("../utils/cubicbezier")
          , l = e("../utils/normalizeScroll")
          , h = e("../utils/functions")
          , c = e("../templates/recognitions_tpl");
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.createTemplate(),
                this.selectors(),
                this.resize(),
                this.createTweens(),
                this.playInAnimation()
            },
            createTemplate: function() {
                r.main.html(c())
            },
            selectors: function() {
                this.el = n("#container #main section#recognitions"),
                this.inner = this.el.find(".inner"),
                this.scrollMsg = this.el.find(".scroll-msg"),
                this.grid = this.inner.find(".grid"),
                this.title = this.inner.find(".title"),
                this.roulette = this.inner.find(".roulette-container"),
                this.progress = this.inner.find(".progress"),
                this.footer = this.inner.find("footer")
            },
            createTweens: function() {
                this.rouletteAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0
                });
                var e = this.roulette[0].children[0].children[0].children.length
                  , t = e
                  , i = "-" + (100 * (e - 1) / e).toString() + "%"
                  , s = t / (e - 1);
                this.rouletteAnimation.fromTo(this.roulette[0].children[0].children[0], t, {
                    y: "0%"
                }, {
                    y: i,
                    force3D: !0,
                    ease: Power0.easeNone
                }, 0);
                for (var n = 0; e > n; n++)
                    n > 0 && this.rouletteAnimation.fromTo(this.roulette[0].children[0].children[0].children[n], .6, {
                        scale: .9
                    }, {
                        scale: 1,
                        ease: Power1.easeOut
                    }, n * s - .7),
                    e - 1 > n && this.rouletteAnimation.to(this.roulette[0].children[0].children[0].children[n], .6, {
                        scale: .9,
                        ease: Power1.easeIn
                    }, n * s);
                this.scrollAnimatedElements[0].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[0].animation.fromTo(this.footer[0].children[0], .8, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0);
                for (var n = 0, a = .1; n < this.footer[0].children[1].children[0].children.length; n++,
                a += .1)
                    this.scrollAnimatedElements[0].animation.fromTo(this.footer[0].children[1].children[0].children[n], 1.4, {
                        opacity: 1e-4
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, a);
                this.scrollAnimatedElements[1].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[1].animation.to(this.scrollMsg, .5, {
                    opacity: 0,
                    ease: Power2.easeOut
                }, 0)
            },
            playInAnimation: function() {
                r.hamburguer.el.removeClass(),
                r.title.el.removeClass(),
                TweenMax.to([r.hamburguer.el, r.title.el], 1.5, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(.05, this.checkTextSizes, null, this),
                TweenMax.fromTo(this.grid, 1.5, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeOut
                });
                for (var e = 1, t = .1; 4 > e; e++,
                t += .23)
                    TweenMax.fromTo(this.title[0].children[e].children[0], 1, {
                        opacity: 1e-4
                    }, {
                        delay: .2,
                        opacity: 1,
                        ease: Power1.easeIn
                    }),
                    TweenMax.fromTo(this.title[0].children[e].children[0], 1.2, {
                        x: "-80%"
                    }, {
                        delay: t,
                        x: "0%",
                        ease: Power2.easeOut
                    });
                TweenMax.set([this.title[0].children[1], this.title[0].children[2], this.title[0].children[3]], {
                    delay: 2,
                    display: "none"
                }),
                TweenMax.set(this.title[0].children[0], {
                    delay: 2,
                    autoAlpha: 1
                }),
                TweenMax.fromTo(this.roulette, 1.3, {
                    opacity: 1e-4
                }, {
                    delay: 1,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.progress, 2, {
                    scaleY: 0
                }, {
                    delay: .2,
                    scaleY: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.fromTo(this.scrollMsg, 1, {
                    opacity: 1e-4
                }, {
                    delay: 1,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.scrollMsg[0].children[0], 1.5, {
                    scaleX: 0
                }, {
                    delay: 1.5,
                    scaleX: 1,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.delayedCall(2, function() {
                    r.main.on("wheel", this.scrollHandler.bind(this)),
                    TweenMax.ticker.addEventListener("tick", this.scroll, this),
                    this.events.emit("view shown")
                }, null, this)
            },
            playOutAnimation: function() {
                TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    TweenMax.ticker.removeEventListener("tick", this.scroll),
                    this.events.emit("view hidden")
                }, null, this)
            },
            scrollHandler: function(e) {
                var t = l(e.originalEvent);
                this.virtualScrollPosition -= t.pixelY,
                this.scrollUpdatedBy = "scroll"
            },
            scroll: function() {
                if (this.inner[0].style.transform = "translate3d(0px," + this.liveScrollPosition.inner + "px, 0px)",
                this.animateRoulette(),
                this.checkAnimatedElements(),
                this.virtualLastScrollPosition !== this.virtualScrollPosition || null !== this.scrollUpdatedBy) {
                    if (this.virtualScrollPosition > 0 ? this.virtualScrollPosition = 0 : this.virtualScrollPosition < this.virtualMaxScroll && (this.virtualScrollPosition = this.virtualMaxScroll),
                    this.virtualScrollPosition >= .25 * -r.windowHeight)
                        var e = this.virtualScrollPosition
                          , t = 0;
                    else if (this.virtualScrollPosition < .25 * r.windowHeight && this.virtualScrollPosition > this.virtualMaxScroll + .5 * r.windowHeight)
                        var e = .25 * -r.windowHeight
                          , t = h.round(-(.25 * r.windowHeight + this.virtualScrollPosition) / this.rouletteMaxScroll, 6);
                    else
                        var e = this.virtualScrollPosition + this.rouletteMaxScroll
                          , t = 1;
                    TweenMax.to(this.progress[0].children[0], 1.3, {
                        scaleY: t,
                        ease: Power4.easeOut
                    }),
                    TweenMax.to(this.liveScrollPosition, 1.3, {
                        roulette: t,
                        ease: Power4.easeOut
                    }),
                    TweenMax.to(this.liveScrollPosition, 1.3, {
                        inner: e,
                        ease: Power4.easeOut
                    }),
                    this.virtualLastScrollPosition = this.virtualScrollPosition,
                    this.scrollUpdatedBy = null
                }
            },
            animateRoulette: function() {
                this.rouletteAnimation.progress(this.liveScrollPosition.roulette)
            },
            checkAnimatedElements: function() {
                for (var e = 0; e < this.scrollAnimatedElements.length; e++)
                    !this.scrollAnimatedElements[e].shown && this.liveScrollPosition.inner < this.scrollAnimatedElements[e].point && (this.scrollAnimatedElements[e].shown = !0,
                    this.scrollAnimatedElements[e].animation.play())
            },
            checkTextSizes: function() {
                this.title.removeClass("vertical"),
                1.05 * this.title.find("h1").height() > r.windowHeight && this.title.addClass("vertical")
            },
            resize: function() {
                this.virtualMaxScroll = .75 * -r.windowHeight;
                var e = r.windowHeight < 1300 ? .4 : 500 / r.windowHeight;
                this.rouletteMaxScroll = r.windowHeight * e * this.roulette[0].children[0].children[0].children.length,
                this.virtualMaxScroll -= this.rouletteMaxScroll,
                this.firstLoad ? (this.scrollAnimatedElements.push({
                    point: -this.inner.height() + 1.2 * r.windowHeight,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: -15,
                    shown: !1
                }),
                this.firstLoad = !1) : (this.scrollAnimatedElements[0].point = -this.inner.height() + 1.2 * r.windowHeight,
                this.scrollAnimatedElements[1].point = -15,
                this.checkTextSizes(),
                this.scroll())
            },
            remove: function() {
                r.main.off("wheel"),
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../config/vars": 2,
        "../templates/recognitions_tpl": 8,
        "../utils/cubicbezier": 14,
        "../utils/functions": 15,
        "../utils/normalizeScroll": 16,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery"
    }],
    24: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new r,
            this.grid = null,
            this.serviceNumber = 1,
            this.serviceTotal = null,
            this.serviceAction = "next",
            this.serviceWhiteAnimation = {
                progress: 0,
                progress2: 0
            },
            this.texts = null,
            this.background = null,
            this.backgroundRenderer = null,
            this.backgroundStage = null,
            this.backgroundWhiteMask = {
                container: null,
                texture: null
            },
            this.backgroundWhiteSmoke = {
                container: null,
                texture: null
            },
            this.backgroundInitialLoad = !1,
            this.backgroundAnimateShapes = null,
            this.control = null,
            this.controlPrev = null,
            this.controlNext = null,
            this.controlNumberCurrent = null,
            this.controlNumberMaxDisplacement = 0,
            this.inAnimationPlayed = !1,
            this.isAnimating = !1,
            this.firstLoad = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("pixi.js"))
          , r = e("eventemitter3")
          , o = e("../config/vars")
          , l = e("../utils/cubicbezier")
          , h = e("../utils/functions")
          , c = e("../templates/services_tpl");
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.serviceNumber = parseInt(i),
                this.createTemplate(),
                this.selectors(),
                this.serviceTotal = o.pagesData.services.services.length,
                this.createServicesBG(),
                this.resize()
            },
            createTemplate: function() {
                o.main.html(c.main(this.serviceNumber))
            },
            selectors: function() {
                this.el = n("#container #main section#services"),
                this.grid = this.el.find(".grid"),
                this.texts = this.el.find(".texts-cnt"),
                this.background = this.el.find("canvas.services-bg"),
                this.control = this.el.find(".control-panel"),
                this.controlPrev = this.control.find(".prev"),
                this.controlNext = this.control.find(".next"),
                this.controlNumberCurrent = this.control.find(".progress span b");
            },
            playInAnimation: function() {
                this.isAnimating = !0,
                o.hamburguer.el.removeClass(),
                o.title.el.removeClass(),
                this.backgroundStage.children[this.serviceNumber - 1].renderable = !0,
                this.backgroundStage.children[this.serviceNumber - 1].visible = !0,
                TweenMax.set(this.background, {
                    delay: .2,
                    visibility: "inherit"
                }),
                TweenMax.delayedCall(.2, this.animateService, [this.serviceNumber], this),
                TweenMax.to([o.hamburguer.el, o.title.el], 1.5, {
                    delay: .2,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(.1, this.checkTextSizes, null, this),
                TweenMax.fromTo(this.grid, .8, {
                    opacity: 1e-4
                }, {
                    delay: 0,
                    opacity: 1,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.control, 1.75, {
                    opacity: 1e-4
                }, {
                    delay: .75,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(3, function() {
                    this.controlPrev.on("click", {
                        action: "prev"
                    }, this.navToService.bind(this)),
                    this.controlNext.on("click", {
                        action: "next"
                    }, this.navToService.bind(this)),
                    o.main.on("wheel", this.scrollHandler.bind(this)),
                    this.events.emit("view shown"),
                    this.isAnimating = !1
                }, null, this)
            },
            createServicesBG: function() {
                this.backgroundRenderer = a.autoDetectRenderer(o.windowWidth, o.windowHeight, {
                    view: this.background[0],
                    backgroundColor: 16777215
                }),
                this.backgroundStage = new a.Container,
                this.backgroundWhiteMask.container = new a.Container,
                this.backgroundWhiteMask.container.addChild(a.Sprite.fromImage(o.url + "/wp-content/themes/ortizleon/img/smoke.jpg")),
                this.backgroundWhiteMask.container.children[0].anchor.x = .5,
                this.backgroundWhiteMask.container.children[0].anchor.y = .5,
                this.backgroundWhiteSmoke.container = new a.Container;
                for (var e = 0; e < this.serviceTotal; e++) {
                    var t = new a.Container;
                    t.renderable = !1,
                    t.visible = !1;
                    for (var i = 0; 2 > i; i++) {
                        var s = new a.Container
                          , n = new a.Container
                          , r = new a.Container
                          , l = 0 === i ? "color" : "bw"
                          , h = a.Sprite.fromImage(o.pagesData.services.services[e]["image_" + l]);
                        h.anchor.x = .5,
                        h.anchor.y = .5,
                        r.addChild(h),
                        n.addChild(r),
                        1 === i && (r.alpha = 1e-4),
                        n.mask = new a.Graphics,
                        s.addChild(n),
                        0 === i && s.addChild(new a.Graphics),
                        t.addChild(s)
                    }
                    this.backgroundStage.addChild(t)
                }
                TweenMax.ticker.addEventListener("tick", this.backgroundRender, this)
            },
            spritesSizes: function() {
                var e = !1;
                if (this.backgroundWhiteMask.container.children[0]._texture.baseTexture.hasLoaded) {
                    if (this.backgroundInitialLoad || !this.backgroundInitialLoad && "undefined" == typeof this.backgroundWhiteMask.container.children[0].initialLoad) {
                        "undefined" == typeof this.backgroundWhiteMask.container.children[0].initialLoad && (this.backgroundWhiteMask.container.children[0].initialLoad = !0),
                        this.backgroundWhiteMask.container.children[0].position.x = o.windowWidth / 2,
                        this.backgroundWhiteMask.container.children[0].position.y = o.windowHeight / 2;
                        var t = .2 * o.windowWidth
                          , i = t / this.backgroundWhiteMask.container.children[0]._texture.width;
                        this.backgroundWhiteMask.container.children[0].scale.x = i,
                        this.backgroundWhiteMask.container.children[0].scale.y = i;
                        var s = new a.Graphics;
                        s.beginFill(16777215, 1),
                        s.drawRect(0, 0, o.windowWidth, o.windowHeight),
                        s.endFill(),
                        this.backgroundWhiteMask.container.addChildAt(s, 0),
                        this.backgroundWhiteMask.texture = this.backgroundWhiteMask.container.generateTexture(this.backgroundRenderer),
                        this.backgroundWhiteMask.container.removeChildAt(0);
                        var n = new a.Sprite;
                        n.position.x = -o.windowWidth / 2,
                        n.position.y = -o.windowHeight / 2,
                        n.texture = this.backgroundWhiteMask.texture,
                        this.backgroundWhiteSmoke.container.addChild(s),
                        this.backgroundWhiteSmoke.container.mask = n,
                        this.backgroundWhiteSmoke.texture = this.backgroundWhiteSmoke.container.generateTexture(this.backgroundRenderer),
                        this.backgroundWhiteSmoke.container.removeChildren()
                    }
                } else
                    e = !0;
                for (var r = 0; r < this.backgroundStage.children.length; r++)
                    for (var l = 0; 2 > l; l++) {
                        var c = this.backgroundStage.children[r].children[l].children[0].children[0].children[0]._texture;
                        if (c.baseTexture.hasLoaded) {
                            if (this.backgroundInitialLoad || !this.backgroundInitialLoad && "undefined" == typeof this.backgroundStage.children[r].children[l].initialLoad) {
                                "undefined" == typeof this.backgroundStage.children[r].children[l].initialLoad && (this.backgroundStage.children[r].children[l].initialLoad = !0);
                                var d = o.windowWidth
                                  , u = h.round(d * c.height / c.width, 4);
                                o.windowHeight > u && (u = o.windowHeight,
                                d = h.round(u * c.width / c.height, 4)),
                                this.backgroundStage.children[r].children[l].children[0].children[0].children[0].width = d,
                                this.backgroundStage.children[r].children[l].children[0].children[0].children[0].height = u
                            }
                        } else
                            e = !0
                    }
                this.inAnimationPlayed === !1 && this.backgroundStage.children[this.serviceNumber - 1].children[0].initialLoad === !0 && this.backgroundStage.children[this.serviceNumber - 1].children[1].initialLoad === !0 && null !== this.backgroundWhiteSmoke.texture && (this.inAnimationPlayed = !0,
                this.playInAnimation()),
                e ? setTimeout(this.spritesSizes.bind(this), 50) : this.backgroundInitialLoad || (this.backgroundInitialLoad = !0)
            },
            createMasks: function() {
                for (var e = .25 * o.windowWidth, t = .25 * o.windowHeight, i = 0; i < this.backgroundStage.children.length; i++)
                    for (var s = 0; 2 > s; s++) {
                        var n = this.backgroundStage.children[i].children[s].children[0];
                        n.mask.clear(),
                        n.mask.beginFill(),
                        0 === i ? 0 === s ? (n.mask.drawRect(e, 0, e, t),
                        n.mask.drawRect(e, 2 * t, e, t)) : (n.mask.drawRect(0, 3 * t, e, t),
                        n.mask.drawRect(e, t, e, t),
                        n.mask.drawRect(2 * e, 2 * t, e, t)) : 1 === i ? 0 === s ? (n.mask.drawRect(e, t, e, t),
                        n.mask.drawRect(2 * e, 3 * t, e, t)) : (n.mask.drawRect(2 * e, 0, e, t),
                        n.mask.drawRect(2 * e, 2 * t, e, t)) : 2 === i ? 0 === s ? (n.mask.drawRect(2 * e, t, e, t),
                        n.mask.drawRect(2 * e, 3 * t, e, t)) : (n.mask.drawRect(0, t, e, t),
                        n.mask.drawRect(e, 0, e, t),
                        n.mask.drawRect(2 * e, 2 * t, e, t)) : 3 === i ? 0 === s ? (n.mask.drawRect(0, 2 * t, 2 * e, t),
                        n.mask.drawRect(2 * e, t, e, t)) : (n.mask.drawRect(e, 3 * t, e, t),
                        n.mask.drawRect(2 * e, 2 * t, e, t)) : 4 === i && (0 === s ? (n.mask.drawRect(e, 3 * t, e, t),
                        n.mask.drawRect(2 * e, t, e, t)) : (n.mask.drawRect(e, 2 * t, e, t),
                        n.mask.drawRect(3 * e, t, e, t))),
                        n.mask.endFill()
                    }
            },
            backgroundRender: function() {
                null !== this.backgroundAnimateShapes && this.backgroundAnimateShapes(),
                this.backgroundRenderer.render(this.backgroundStage)
            },
            animateService: function(e) {
                var t = .25 * o.windowWidth
                  , i = .25 * o.windowHeight
                  , s = this.backgroundStage.children[e - 1].children[0].children[1]
                  , n = this.backgroundStage.children[e - 1].children[0].children[0].children[0];
                this.backgroundStage.children[e - 1].children[1].children[0].children[0];
                TweenMax.set(this.texts[0].children[e - 1], {
                    visibility: "inherit"
                });
                for (var r = 1, h = .2; 7 > r; r++,
                h += .115) {
                    var c = .39 + .01 * r
                      , d = 1.01 - .01 * r;
                    TweenMax.fromTo(this.texts[0].children[e - 1].children[0].children[r].children[0], d, {
                        opacity: 1e-4
                    }, {
                        delay: c,
                        opacity: 1,
                        ease: Power1.easeIn
                    });
                    var u = (-77 - 3 * r).toString() + "%";
                    TweenMax.fromTo(this.texts[0].children[e - 1].children[0].children[r].children[0], 1.2, {
                        x: u
                    }, {
                        delay: h,
                        x: "0%",
                        ease: Power2.easeOut
                    })
                }
                if (TweenMax.set([this.texts[0].children[e - 1].children[0].children[1], this.texts[0].children[e - 1].children[0].children[2], this.texts[0].children[e - 1].children[0].children[3], this.texts[0].children[e - 1].children[0].children[4], this.texts[0].children[e - 1].children[0].children[5], this.texts[0].children[e - 1].children[0].children[6]], {
                    delay: 1.89,
                    display: "none"
                }),
                TweenMax.set(this.texts[0].children[e - 1].children[0].children[0], {
                    delay: 1.89,
                    autoAlpha: 1
                }),
                s.clear(),
                s.beginFill(16777215, 1),
                1 === e) {
                    var w = .65
                      , m = 1.3;
                    s.drawRect(-t, 2 * -i, t, 3 * i),
                    s.endFill(),
                    TweenMax.fromTo(this.serviceWhiteAnimation, 1.65, {
                        progress: 0
                    }, {
                        progress: 1,
                        ease: l.get("homeStateChange"),
                        onCompleteScope: this,
                        onComplete: function() {
                            this.backgroundAnimateShapes = null
                        }
                    }),
                    this.backgroundAnimateShapes = function(e, t, i) {
                        var s = this.serviceWhiteAnimation.progress;
                        e.clear(),
                        e.beginFill(16777215, 1),
                        e.drawRect(-t + t * s, 2 * -i, t - t * s, 3 * i),
                        e.endFill()
                    }
                    .bind(this, s, t, i)
                } else if (2 === e) {
                    var w = .35
                      , m = 1.2;
                    s.drawRect(-t, -i, t, i),
                    s.drawRect(0, i, t, i),
                    s.endFill(),
                    TweenMax.fromTo(this.serviceWhiteAnimation, 1.65, {
                        progress: 0
                    }, {
                        progress: 1,
                        ease: l.get("homeStateChange")
                    }),
                    TweenMax.fromTo(this.serviceWhiteAnimation, 1.65, {
                        progress2: 0
                    }, {
                        delay: .25,
                        progress2: 1,
                        ease: l.get("homeStateChange"),
                        onCompleteScope: this,
                        onComplete: function() {
                            this.backgroundAnimateShapes = null
                        }
                    }),
                    this.backgroundAnimateShapes = function(e, t, i) {
                        var s = this.serviceWhiteAnimation.progress
                          , n = this.serviceWhiteAnimation.progress2;
                        e.clear(),
                        e.beginFill(16777215, 1),
                        e.drawRect(-t + t * s, -i, t - t * s, i),
                        e.drawRect(t * n, i, t - t * n, i),
                        e.endFill()
                    }
                    .bind(this, s, t, i)
                } else if (3 === e) {
                    var w = .85
                      , m = 1;
                    s.drawRect(0, -i, t, 3 * i),
                    s.endFill(),
                    TweenMax.fromTo(this.serviceWhiteAnimation, 1.65, {
                        progress: 0
                    }, {
                        progress: 1,
                        ease: l.get("homeStateChange"),
                        onCompleteScope: this,
                        onComplete: function() {
                            this.backgroundAnimateShapes = null
                        }
                    }),
                    this.backgroundAnimateShapes = function(e, t, i) {
                        var s = this.serviceWhiteAnimation.progress;
                        e.clear(),
                        e.beginFill(16777215, 1),
                        e.drawRect(t * s, -i, t - t * s, 3 * i),
                        e.endFill()
                    }
                    .bind(this, s, t, i)
                } else if (4 === e) {
                    var w = .7
                      , m = 1.1;
                    s.drawRect(2 * -t, 0, 2 * t, i),
                    s.drawRect(0, -i, t, i),
                    s.endFill(),
                    TweenMax.fromTo(this.serviceWhiteAnimation, 1.65, {
                        progress: 0
                    }, {
                        progress: 1,
                        ease: l.get("homeStateChange")
                    }),
                    TweenMax.fromTo(this.serviceWhiteAnimation, 1.65, {
                        progress2: 0
                    }, {
                        delay: .25,
                        progress2: 1,
                        ease: l.get("homeStateChange"),
                        onCompleteScope: this,
                        onComplete: function() {
                            this.backgroundAnimateShapes = null
                        }
                    }),
                    this.backgroundAnimateShapes = function(e, t, i) {
                        var s = this.serviceWhiteAnimation.progress
                          , n = this.serviceWhiteAnimation.progress2;
                        e.clear(),
                        e.beginFill(16777215, 1),
                        e.drawRect(2 * -t + 2 * t * s, 0, 2 * t - 2 * t * s, i),
                        e.drawRect(t * n, -i, t - t * n, i),
                        e.endFill()
                    }
                    .bind(this, s, t, i)
                } else if (5 === e) {
                    var w = .4
                      , m = 1.2;
                    s.drawRect(-t, i, t, i),
                    s.drawRect(0, -i, t, i),
                    s.endFill(),
                    TweenMax.fromTo(this.serviceWhiteAnimation, 1.65, {
                        progress: 0
                    }, {
                        progress: 1,
                        ease: l.get("homeStateChange")
                    }),
                    TweenMax.fromTo(this.serviceWhiteAnimation, 1.65, {
                        progress2: 0
                    }, {
                        delay: .25,
                        progress2: 1,
                        ease: l.get("homeStateChange"),
                        onCompleteScope: this,
                        onComplete: function() {
                            this.backgroundAnimateShapes = null
                        }
                    }),
                    this.backgroundAnimateShapes = function(e, t, i) {
                        var s = this.serviceWhiteAnimation.progress
                          , n = this.serviceWhiteAnimation.progress2;
                        e.clear(),
                        e.beginFill(16777215, 1),
                        e.drawRect(-t + t * s, i, t - t * s, i),
                        e.drawRect(t * n, -i, t - t * n, i),
                        e.endFill()
                    }
                    .bind(this, s, t, i)
                }
                TweenMax.fromTo(this.texts[0].children[e - 1].children[1].children[0].children[0], 1.2, {
                    scaleX: 0
                }, {
                    delay: w,
                    scaleX: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.fromTo(this.texts[0].children[e - 1].children[1].children[0].children[1], 1.2, {
                    scaleX: 0
                }, {
                    delay: .1 + w,
                    scaleX: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.fromTo(this.texts[0].children[e - 1].children[1].children[1], 1, {
                    x: .015 * -o.windowWidth,
                    y: "-50%"
                }, {
                    delay: .75 + w,
                    x: 0,
                    y: "-50%",
                    force3D: !0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.texts[0].children[e - 1].children[1].children[1], 1, {
                    opacity: 0
                }, {
                    delay: .65 + w,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.texts[0].children[e - 1].children[2], 2, {
                    opacity: 1e-4
                }, {
                    delay: m,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(n.scale, 1.5, {
                    x: 1.2,
                    y: 1.2
                }, {
                    x: 1,
                    y: 1,
                    ease: Power2.easeOut
                }),
                this.backgroundStage.children[e - 1].children[1].children[0].addChild(new a.Sprite),
                this.backgroundStage.children[e - 1].children[1].children[0].children[1].anchor.x = .5,
                this.backgroundStage.children[e - 1].children[1].children[0].children[1].anchor.y = .5,
                this.backgroundStage.children[e - 1].children[1].children[0].children[1].texture = this.backgroundWhiteSmoke.texture,
                TweenMax.to(this.backgroundStage.children[e - 1].children[1].children[0].children[0], .5, {
                    delay: 1,
                    alpha: 1,
                    ease: Power2.easeOut
                }),
                TweenMax.to(this.backgroundStage.children[e - 1].children[1].children[0].children[1].scale, 8, {
                    delay: 1,
                    x: 30,
                    y: 30,
                    ease: Power1.easeOut
                });
                var p = .5 * Math.PI * Math.random();
                TweenMax.to(this.backgroundStage.children[e - 1].children[1].children[0].children[1], 8, {
                    delay: 1,
                    rotation: p,
                    ease: Power1.easeOut
                }),
                TweenMax.to(this.backgroundStage.children[e - 1].children[1].children[0].children[1], 4, {
                    delay: 3,
                    alpha: 0,
                    ease: Power2.easeInOut
                })
            },
            hideService: function(e) {
                TweenMax.to(this.texts[0].children[e - 1], .8, {
                    opacity: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.to([this.backgroundStage.children[e - 1].children[0], this.backgroundStage.children[e - 1].children[1].children[0].children[0], this.backgroundStage.children[e - 1].children[1].children[0].children[1]], .8, {
                    alpha: 0,
                    ease: Power2.easeOut,
                    overwrite: "all"
                }),
                TweenMax.delayedCall(.8, function() {
                    TweenMax.set([this.texts[0].children[e - 1], this.texts[0].children[e - 1].children[0].children, this.texts[0].children[e - 1].children[0].children[1].children, this.texts[0].children[e - 1].children[0].children[2].children, this.texts[0].children[e - 1].children[0].children[3].children, this.texts[0].children[e - 1].children[0].children[4].children, this.texts[0].children[e - 1].children[0].children[5].children, this.texts[0].children[e - 1].children[0].children[6].children, this.texts[0].children[e - 1].children[1].children[0].children, this.texts[0].children[e - 1].children[1].children[1], this.texts[0].children[e - 1].children[2]], {
                        clearProps: "all"
                    }),
                    this.backgroundStage.children[e - 1].visible = !1,
                    this.backgroundStage.children[e - 1].renderable = !1,
                    this.backgroundStage.children[e - 1].children[0].alpha = 1,
                    this.backgroundStage.children[e - 1].children[1].children[0].children[0].alpha = 1e-4,
                    this.backgroundStage.children[e - 1].children[0].children[0].children[0].scale.x = 1,
                    this.backgroundStage.children[e - 1].children[0].children[0].children[0].scale.y = 1,
                    this.backgroundStage.children[e - 1].children[1].children[0].children[0].scale.x = 1,
                    this.backgroundStage.children[e - 1].children[1].children[0].children[0].scale.y = 1,
                    this.backgroundStage.children[e - 1].children[0].children[1].clear(),
                    this.backgroundStage.children[e - 1].children[1].children[0].removeChildAt(1)
                }, null, this)
            },
            playOutAnimation: function() {
                TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    this.events.emit("view hidden")
                }, null, this)
            },
            controlPositionNumber: function(e) {
                if ("undefined" == typeof e)
                    var e = this.serviceNumber
                      , t = 0;
                else
                    var t = 2;
                var i = this.controlNumberMaxDisplacement / (this.serviceTotal - 1) * (e - 1);
                "number" != typeof i && (i = 0),
                TweenMax.to(this.control[0].children[2], t, {
                    x: i,
                    ease: Power3.easeInOut
                })
            },
            navToService: function(e) {
                if (!this.isAnimating) {
                    if ("next" === e.data.action) {
                        var t = this.serviceNumber === this.serviceTotal ? 1 : this.serviceNumber + 1;
                        this.serviceAction = "next"
                    } else {
                        var t = 1 === this.serviceNumber ? this.serviceTotal : this.serviceNumber - 1;
                        this.serviceAction = "prev"
                    }
                    this.events.emit("view action", "navigate", "/services/" + t)
                }
            },
            changeService: function(e) {
                if (!this.isAnimating) {
                    this.isAnimating = !0;
                    var t = "next" === this.serviceAction ? this.control[0].children[1].children[1] : this.control[0].children[0].children[1];
                    TweenMax.to(t, .2, {
                        opacity: 1,
                        ease: Power2.easeIn
                    }),
                    TweenMax.to(t, .8, {
                        delay: .2,
                        opacity: 0,
                        scale: 1.3,
                        ease: Power2.easeOut
                    }),
                    TweenMax.set(t, {
                        delay: 1,
                        clearProps: "all"
                    }),
                    this.changeNumber(e),
                    this.controlPositionNumber(e),
                    this.hideService(this.serviceNumber),
                    TweenMax.set(this.background, {
                        delay: .8,
                        visibility: "hidden"
                    }),
                    TweenMax.delayedCall(.8, function() {
                        this.backgroundStage.children[e - 1].renderable = !0,
                        this.backgroundStage.children[e - 1].visible = !0
                    }, null, this),
                    TweenMax.set(this.background, {
                        delay: 1,
                        visibility: "inherit"
                    }),
                    TweenMax.delayedCall(1, this.animateService, [e], this),
                    TweenMax.delayedCall(3, function() {
                        this.serviceNumber = e,
                        this.isAnimating = !1,
                        this.events.emit("service changed")
                    }, null, this)
                }
            },
            changeNumber: function(e) {
                TweenMax.to(this.controlNumberCurrent, .6, {
                    opacity: 0,
                    ease: Power2.easeOut,
                    onCompleteScope: this,
                    onComplete: function() {
                        this.controlNumberCurrent.html(e.toString())
                    }
                }),
                TweenMax.to(this.controlNumberCurrent, 1.4, {
                    delay: .6,
                    opacity: 1,
                    ease: Power2.easeOut
                })
            },
            scrollHandler: function(e) {
                e.originalEvent.deltaY > 0 ? this.navToService({
                    data: {
                        action: "next"
                    }
                }) : this.navToService({
                    data: {
                        action: "prev"
                    }
                })
            },
            checkTextSizes: function() {
                for (var e = 0; e < this.texts[0].children.length; e++) {
                    var t = n(this.texts[0].children[e].children[0])
                      , i = n(this.texts[0].children[e].children[1])
                      , s = n(this.texts[0].children[e].children[2]);
                    4 !== e ? (t.removeClass("vertical"),
                    1.2 * t.find("h1").height() > .25 * o.windowHeight && t.addClass("vertical")) : (t.removeClass("vertical"),
                    1.1 * t.find("h1").height() > .5 * o.windowHeight && t.addClass("vertical")),
                    i.removeClass("small"),
                    i.find(".text").height() > .22 * o.windowHeight && i.addClass("small"),
                    s.removeClass("small"),
                    s.find(".text").height() > .22 * o.windowHeight && s.addClass("small")
                }
            },
            resize: function() {
                if (!this.isAnimating) {
                    this.backgroundRenderer.resize(o.windowWidth, o.windowHeight);
                    var e = h.round(o.windowWidth / 2, 4)
                      , t = h.round(o.windowHeight / 2, 4);
                    this.backgroundStage.position.x = e,
                    this.backgroundStage.position.y = t,
                    this.controlNumberMaxDisplacement = h.round(.18 * o.windowWidth - .177 * o.windowHeight, 2),
                    this.controlPositionNumber(),
                    this.createMasks(),
                    this.spritesSizes(),
                    this.firstLoad ? this.firstLoad = !1 : this.checkTextSizes()
                }
            },
            remove: function() {
                TweenMax.ticker.removeEventListener("tick", this.backgroundRender),
                this.controlPrev.off("click"),
                this.controlNext.off("click"),
                o.main.off("wheel"),
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../config/vars": 2,
        "../templates/services_tpl": 9,
        "../utils/cubicbezier": 14,
        "../utils/functions": 15,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery",
        "pixi.js": "pixi.js"
    }],
    25: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new a,
            this.square = null,
            this.line1 = null,
            this.line2 = null,
            this.section = null,
            this.hoverAnimation = null,
            this.init()
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("eventemitter3"))
          , r = e("../../config/vars")
          , o = e("../../templates/ui/hamburguer_tpl");
        s.prototype = {
            constructor: s,
            init: function() {
                this.createTemplate(),
                this.selectors(),
                this.createTweens(),
                this.el.on("mouseenter mouseleave", this.mouseHover.bind(this))
            },
            createTemplate: function() {
                r.container.append(o())
            },
            selectors: function() {
                this.el = n("#container #hamburguer"),
                this.square = this.el.find("svg rect"),
                this.line1 = this.el.find("svg #line-up"),
                this.line2 = this.el.find("svg #line-bottom"),
                this.section = this.el.find("span")
            },
            createTweens: function() {
                this.hoverAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0,
                    tweens: [TweenMax.to(this.line1[0], .4, {
                        strokeDashoffset: -28,
                        ease: Power2.easeInOut
                    }), TweenMax.to(this.line1[0], .29, {
                        delay: .4,
                        strokeDashoffset: 0,
                        ease: Power2.easeInOut
                    }), TweenMax.to(this.line2[0], .87, {
                        strokeDashoffset: 50,
                        ease: Power4.easeInOut
                    }), TweenMax.to(this.square[0], .6, {
                        delay: .09,
                        strokeDashoffset: -44,
                        ease: Power2.easeInOut
                    })]
                })
            },
            mouseHover: function(e) {
                "mouseenter" === e.type ? this.hoverAnimation.play() : this.hoverAnimation.reverse()
            },
            updateView: function() {
                TweenMax.to(this.section, .5, {
                    opacity: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.delayedCall(.5, function() {
                    var e = "";
                    switch (r.viewIndex) {
                    case 0:
                        e = r.appData["menu_section_home_" + r.lang];
                        break;
                    case 1:
                        e = r.appData["menu_section_projects_" + r.lang];
                        break;
                    case 2:
                        e = r.appData["menu_section_news_" + r.lang];
                        break;
                    case 3:
                        e = r.appData["menu_section_projects_" + r.lang];
                        break;
                    case 4:
                        e = r.appData["menu_section_recognitions_" + r.lang];
                        break;
                    case 5:
                        e = r.appData["menu_section_about_" + r.lang];
                        break;
                    case 6:
                        e = r.appData["menu_section_services_" + r.lang]
                    }
                    "" !== e && (e = e.substr(0, 1).toUpperCase() + e.substr(1, e.length).toLowerCase()),
                    this.section.html(e)
                }, null, this),
                TweenMax.to(this.section, .5, {
                    delay: .5,
                    opacity: 1,
                    ease: Power2.easeInOut
                })
            }
        },
        t.exports = s
    }
    , {
        "../../config/vars": 2,
        "../../templates/ui/hamburguer_tpl": 10,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery"
    }],
    26: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new a,
            this.squares = null,
            this.langSelector = null,
            this.languages = null,
            this.close = null,
            this.signature = null,
            this.closeAnimation = null,
            this.inAnimation = null,
            this.outAnimation = null,
            this.isAnimating = !1,
            this.isShown = !1,
            this.viewIndex = null,
            this.init()
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("eventemitter3"))
          , r = e("../../config/vars")
          , o = e("../../utils/cubicbezier")
          , l = e("../../templates/ui/menu_tpl");
        s.prototype = {
            constructor: s,
            init: function() {
                this.createTemplate(),
                this.selectors(),
                this.createTweens(),
                this.bindEvents()
            },
            createTemplate: function() {
                r.main.after(l.main())
            },
            selectors: function() {
                this.el = n("#container #menu"),
                this.squares = this.el.find(".square"),
                this.langSelector = this.el.find(".lang-selector"),
                this.languages = this.langSelector.find(".language"),
                this.close = this.el.find(".close"),
                this.signature = this.el.find(".signature")
            },
            createTweens: function() {
                this.closeAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.closeAnimation.to(this.close[0].children[0], .25, {
                    rotation: "90deg",
                    x: "35%",
                    ease: Power3.easeOut
                }, 0),
                this.closeAnimation.to(this.close[0].children[1], .25, {
                    rotation: "-90deg",
                    x: "-35%",
                    ease: Power3.easeOut
                }, 0),
                this.closeAnimation.to(this.close[0].children[0], .35, {
                    rotation: "135deg",
                    x: "0%",
                    ease: Power3.easeOut
                }, .25),
                this.closeAnimation.to(this.close[0].children[1], .35, {
                    rotation: "-135deg",
                    x: "0%",
                    ease: Power3.easeOut
                }, .25)
            },
            bindEvents: function() {
                this.squares.on("click", this.clickSquare.bind(this)),
                this.squares.on("mouseenter mouseleave", this.hoverSquare.bind(this)),
                this.close.on("click", this.closeMenu.bind(this)),
                this.close.on("mouseenter", this.closeHover.bind(this)),
                this.languages.on("click", this.changeLanguage.bind(this))
            },
            unbindEvents: function() {
                this.squares.off("click"),
                this.squares.off("mouseenter mouseleave"),
                this.close.off("click"),
                this.close.off("mouseenter"),
                this.languages.off("click")
            },
            playInAnimation: function() {
                null !== this.inAnimation && this.inAnimation.kill(),
                this.inAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.inAnimation.set(this.el, {
                    visibility: "inherit"
                }, 0),
                this.inAnimation.call(function() {
                    this.isAnimating = !0,
                    this.isShown = !0
                }, null, this, 0);
                var e = .12
                  , t = .1;
                this.inAnimation.to(this.el, .6, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, t),
                this.inAnimation.fromTo([this.squares[0].children[0].children[0], this.squares[2].children[0].children[0]], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, 0 + t),
                this.inAnimation.fromTo([this.squares[0].children[0].children[1], this.squares[2].children[0].children[1]], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, .08 + t),
                this.inAnimation.fromTo([this.squares[0].children[0].children[2], this.squares[2].children[0].children[2]], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, .18 + t),
                this.inAnimation.fromTo([this.squares[1].children[0].children[0], this.squares[4].children[0].children[0]], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, e + t),
                this.inAnimation.fromTo([this.squares[1].children[0].children[1], this.squares[4].children[0].children[1]], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, e + .08 + t),
                this.inAnimation.fromTo([this.squares[1].children[0].children[2], this.squares[4].children[0].children[2]], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, e + .18 + t),
                this.inAnimation.fromTo(this.squares[3].children[0].children[0], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, 2 * e + t),
                this.inAnimation.fromTo(this.squares[3].children[0].children[1], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, 2 * e + .08 + t),
                this.inAnimation.fromTo(this.squares[3].children[0].children[2], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, 2 * e + .18 + t),
                this.inAnimation.fromTo(this.squares[5].children[0].children[0], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, 3 * e + t),
                this.inAnimation.fromTo(this.squares[5].children[0].children[1], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, 3 * e + .08 + t),
                this.inAnimation.fromTo(this.squares[5].children[0].children[2], 1.1, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power4.easeInOut
                }, 3 * e + .18 + t),
                this.inAnimation.fromTo(this.squares[2].children[1], 1, {
                    x: "-30%"
                }, {
                    x: "0%",
                    force3D: !0,
                    ease: Power2.easeOut
                }, .6 + t),
                this.inAnimation.fromTo(this.squares[2].children[1], 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .5 + t),
                this.inAnimation.fromTo(this.squares[0].children[1], 1.5, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, t + .2),
                this.inAnimation.fromTo([this.squares[1].children[1], this.squares[4].children[1]], 1, {
                    x: "-30%"
                }, {
                    x: "0%",
                    force3D: !0,
                    ease: Power2.easeOut
                }, .6 + t + .2),
                this.inAnimation.fromTo([this.squares[1].children[1], this.squares[4].children[1]], 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .5 + t + .2),
                this.inAnimation.fromTo(this.squares[3].children[1], 1, {
                    x: "-30%"
                }, {
                    x: "0%",
                    force3D: !0,
                    ease: Power2.easeOut
                }, .6 + t + .37),
                this.inAnimation.fromTo(this.squares[3].children[1], 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .5 + t + .37),
                this.inAnimation.fromTo(this.squares[5].children[1], 1, {
                    x: "-30%"
                }, {
                    x: "0%",
                    force3D: !0,
                    ease: Power2.easeOut
                }, .5 + t + .6),
                this.inAnimation.fromTo(this.squares[5].children[1], 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .5 + t + .5),
                this.inAnimation.fromTo(this.langSelector[0].children[0], .7, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: o.get("homeStateChange")
                }, .7),
                this.inAnimation.fromTo(this.langSelector[0].children[1], 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .9),
                this.inAnimation.fromTo(this.close, 1, {
                    scale: 0
                }, {
                    scale: 1,
                    ease: Power3.easeOut
                }, 1.2),
                this.inAnimation.fromTo(this.close, 1.1, {
                    rotation: "-500deg"
                }, {
                    rotation: "0deg",
                    ease: Power3.easeOut
                }, 1.2),
                this.inAnimation.fromTo(this.signature, 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 1.2),
                this.inAnimation.call(function() {
                    this.isAnimating = !1
                }, null, this, 1.5),
                this.inAnimation.play(0)
            },
            playOutAnimation: function(e) {
                if (null !== this.outAnimation && this.outAnimation.kill(),
                "close menu" === e || 0 === r.viewIndex && "projects" === e || 0 === r.viewIndex && "news" === e)
                    var t = .3
                      , i = .6
                      , s = 0;
                else
                    var t = .5
                      , i = .5
                      , s = .8;
                this.outAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.outAnimation.call(function() {
                    this.isAnimating = !0
                }, null, this, 0),
                this.outAnimation.to([this.squares, this.langSelector, this.close, this.signature], t, {
                    opacity: 0,
                    ease: Power1.easeOut
                }, 0),
                this.outAnimation.to(this.el, i, {
                    opacity: 1e-4,
                    ease: Power1.easeOut
                }, s),
                this.outAnimation.call(function() {
                    TweenMax.set([this.el, this.squares, this.squares[0].children[0].children, this.squares[0].children[1], this.squares[1].children[0].children, this.squares[1].children[1], this.squares[2].children[0].children, this.squares[2].children[1], this.squares[3].children[0].children, this.squares[3].children[1], this.squares[4].children[0].children, this.squares[4].children[1], this.squares[5].children[0].children, this.squares[5].children[1], this.langSelector, this.close, this.signature], {
                        clearProps: "all"
                    }),
                    this.isAnimating = !1,
                    this.isShown = !1
                }, null, this, 1.3),
                this.outAnimation.play(0)
            },
            closeMenu: function() {
                this.inAnimation.pause(),
                this.playOutAnimation("close menu"),
                r.title.playOutAnimation()
            },
            closeHover: function() {
                this.closeAnimation.play(0)
            },
            hoverSquare: function(e) {
                "info" !== e.delegateTarget.dataset.slug && ("mouseenter" === e.type ? (TweenMax.to(e.delegateTarget.children[0].lastChild, .3, {
                    scaleX: 1,
                    ease: Power2.easeOut
                }),
                TweenMax.to(e.delegateTarget.children[1], .3, {
                    delay: .05,
                    x: 6,
                    ease: Power2.easeOut
                })) : (TweenMax.to(e.delegateTarget.children[0].lastChild, .3, {
                    scaleX: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.to(e.delegateTarget.children[1], .3, {
                    x: 0,
                    ease: Power2.easeOut
                })))
            },
            clickSquare: function(e) {
                !this.isAnimating && this.isShown && "info" !== e.delegateTarget.dataset.slug && (this.events.emit("view action", "navigate", "/" + e.delegateTarget.dataset.slug),
                this.inAnimation.pause(),
                this.playOutAnimation(e.delegateTarget.dataset.slug),
                r.title.playOutAnimation())
            },
            changeLanguage: function(e) {
                this.events.emit("view action", "change laguage", e.delegateTarget.dataset.lang)
            },
            resetMenu: function() {
                this.closeMenu(),
                TweenMax.delayedCall(1.3, function() {
                    this.unbindEvents(),
                    this.el.remove(),
                    this.init(),
                    r.title.updateArchitects()
                }, null, this)
            }
        },
        t.exports = s
    }
    , {
        "../../config/vars": 2,
        "../../templates/ui/menu_tpl": 11,
        "../../utils/cubicbezier": 14,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery"
    }],
    27: [function(e, t, i) {
        "use strict";
        function s() {
            this.scrollbarContainer = null,
            this.events = new n,
            this.el = null,
            this.bar = null,
            this.scrollbarSize = 0,
            this.barSize = 0,
            this.maxScroll = 0,
            this.isScrolling = !1,
            this.isHovered = !1,
            this.scrollBarLivePosition = {
                y: 0
            },
            this.scrollBarClickedPoint = null,
            this.inAnimation = null
        }
        var n = (e("jquery"),
        e("gsap"),
        e("eventemitter3"))
          , a = e("../../config/vars")
          , r = e("../../utils/functions");
        s.prototype = {
            constructor: s,
            init: function(e) {
                this.scrollbarContainer = e,
                this.selectors(),
                this.resize(),
                this.createTweens(),
                this.inAnimation.play()
            },
            bindEvents: function() {
                this.bar.on("mousedown", this.mouseDown.bind(this)),
                this.bar.on("mouseenter", this.mouseEnter.bind(this)),
                this.bar.on("mouseleave", this.mouseLeave.bind(this))
            },
            selectors: function() {
                this.el = this.scrollbarContainer.find(".scrollbar"),
                this.bar = this.el.find(".bar")
            },
            mouseDown: function(e) {
                this.isScrolling = !0,
                this.scrollBarClickedPoint = e.clientY - this.scrollBarLivePosition.y,
                a._document.on("mousemove", this.mouseMove.bind(this)),
                a._document.on("mouseup", this.mouseUp.bind(this))
            },
            mouseUp: function() {
                this.isScrolling && (this.isScrolling = !1,
                a._document.off("mousemove"),
                a._document.off("mouseup")),
                this.isHovered || this.mouseLeave()
            },
            mouseEnter: function() {
                this.isHovered = !0,
                this.el.addClass("selected")
            },
            mouseLeave: function() {
                this.isHovered = !1,
                this.isScrolling || this.el.removeClass("selected")
            },
            mouseMove: function(e) {
                var t = e.clientY - this.scrollBarClickedPoint;
                0 >= t && (t = 0),
                t >= this.maxScroll && (t = this.maxScroll),
                this.scrollBarLivePosition.y = t,
                this.events.emit("scroll", t / this.maxScroll)
            },
            updatePosition: function(e, t, i) {
                var s = r.round(this.maxScroll * e, 2);
                0 > s && (s = 0),
                s > this.maxScroll && (s = this.maxScroll),
                TweenMax.to(this.scrollBarLivePosition, t, {
                    y: s,
                    force3D: !0,
                    ease: i
                })
            },
            createTweens: function() {
                this.inAnimation = new TimelineMax({
                    delay: 1,
                    paused: !0,
                    tweens: [TweenMax.to(this.el, 1, {
                        autoAlpha: 1,
                        ease: Linear.easeNone
                    })]
                })
            },
            resize: function() {
                this.scrollbarSize = this.el.height(),
                this.barSize = this.bar.height(),
                this.maxScroll = this.scrollbarSize - this.barSize
            },
            remove: function() {
                this.bar.off("mousedown mouseenter mouseleave"),
                a._document.off("mousemove mouseup")
            }
        },
        t.exports = s
    }
    , {
        "../../config/vars": 2,
        "../../utils/functions": 15,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery"
    }],
    28: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new a,
            this.leftPart = null,
            this.rightPart = null,
            this.point = null,
            this.bottom = null,
            this.inAnimation = null,
            this.outAnimation = null,
            this.init(),
            this.titleShown = !1
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("eventemitter3"))
          , r = e("../../config/vars")
          , o = e("../../utils/cubicbezier")
          , l = e("../../templates/ui/title_tpl");
        s.prototype = {
            constructor: s,
            init: function() {
                this.createTemplate(),
                this.selectors(),
                this.el.on("mouseenter mouseleave", this.mouseHover.bind(this))
            },
            createTemplate: function() {
                r.container.append(l())
            },
            selectors: function() {
                this.el = n("#container #title"),
                this.leftPart = this.el.find(".left"),
                this.rightPart = this.el.find(".right"),
                this.point = this.el.find(".point"),
                this.bottom = this.el.find(".bottom")
            },
            playInAnimation: function(e) {
                var t = 199
                  , i = 45
                  , s = 78;
                r.windowWidth > 1700 && r.windowWidth < 3100 ? (t = 241,
                i = 55,
                s = 93) : r.windowWidth >= 3100 && (t = 362,
                i = 80,
                s = 140),
                null !== this.inAnimation && this.inAnimation.kill(),
                this.inAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0
                });
                var n = .1;
                this.inAnimation.call(function() {
                    this.el.addClass("expanded")
                }, null, this, n),
                this.inAnimation.set(this.el, {
                    width: t,
                    height: i
                }, n),
                this.inAnimation.fromTo(this.point, .25, {
                    scale: 1
                }, {
                    scale: 0,
                    ease: Power2.easeOut
                }, n),
                this.inAnimation.to(r.hamburguer.el, .25, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }, n),
                this.inAnimation.call(function() {
                    r.hamburguer.hoverAnimation.pause(0)
                }, null, this, .25 + n),
                this.inAnimation.fromTo(this.rightPart, 1, {
                    x: 0
                }, {
                    x: s,
                    ease: o.get("homeStateChange")
                }, n);
                for (var a = 1, l = .07; 6 > a; a++,
                l += .1)
                    this.inAnimation.fromTo(this.leftPart[0].children[a], .35, {
                        display: "none",
                        opacity: 0
                    }, {
                        display: "inline-block",
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, n + l);
                for (var a = 1, l = .27; 4 > a; a++,
                l += .1)
                    this.inAnimation.fromTo(this.rightPart[0].children[a], .35, {
                        display: "none",
                        opacity: 0
                    }, {
                        display: "inline-block",
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, n + l);
                this.inAnimation.fromTo(this.bottom, .5, {
                    display: "none",
                    opacity: 0
                }, {
                    display: "block",
                    opacity: 1,
                    ease: Power2.easeIn
                }, n + .3),
                this.inAnimation.fromTo(this.bottom, .7, {
                    x: -20
                }, {
                    x: 0,
                    ease: Power2.easeOut
                }, n + .5),
                this.inAnimation.call(function() {
                    this.titleShown = !0
                }, null, this, 1),
                "undefined" == typeof e ? this.inAnimation.play(0) : this.inAnimation.pause(1)
            },
            playOutAnimation: function() {
                this.titleShown = !1,
                null !== this.outAnimation && this.outAnimation.kill(),
                this.outAnimation = new TimelineMax({
                    delay: 0,
                    paused: !0,
                    onCompleteScope: this,
                    onComplete: function() {
                        TweenMax.set(this.el, {
                            clearProps: "width, height"
                        }),
                        TweenMax.set([this.leftPart[0].children, this.rightPart, this.rightPart[0].children, this.bottom, this.point], {
                            clearProps: "all"
                        })
                    }
                }),
                this.outAnimation.call(function() {
                    this.el.removeClass("expanded")
                }, null, this, 0),
                this.outAnimation.to(this.bottom, .4, {
                    opacity: 0,
                    ease: Power2.easeOut
                }, 0),
                this.outAnimation.to(this.rightPart, 1, {
                    x: 0,
                    ease: o.get("homeStateChange")
                }, .2);
                for (var e = 5, t = .07; e > 0; e--,
                t += .1)
                    this.outAnimation.to(this.leftPart[0].children[e], .35, {
                        opacity: 0,
                        ease: Power2.easeOut
                    }, t);
                for (var e = 3, t = .27; e > 0; e--,
                t += .1)
                    this.outAnimation.to(this.rightPart[0].children[e], .35, {
                        opacity: 0,
                        ease: Power2.easeOut
                    }, t);
                this.outAnimation.to(this.point, .6, {
                    scale: 1,
                    ease: Power2.easeInOut
                }, .7),
                this.outAnimation.to(r.hamburguer.el, .6, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                }, .7),
                this.outAnimation.play(0)
            },
            mouseHover: function(e) {
                r.menu.isShown || ("mouseenter" === e.type ? r.hamburguer.hoverAnimation.play() : r.hamburguer.hoverAnimation.reverse())
            },
            updateArchitects: function() {
                this.bottom.html(r.appData["menu_title_bottom_" + r.lang])
            },
            resize: function() {
                var e = 199
                  , t = 45
                  , i = 78;
                r.windowWidth > 1700 && r.windowWidth < 3100 ? (e = 241,
                t = 55,
                i = 93) : r.windowWidth >= 3100 && (e = 362,
                t = 80,
                i = 140),
                TweenMax.set(this.el, {
                    width: e,
                    height: t
                }),
                TweenMax.set(this.rightPart, {
                    x: i
                })
            }
        },
        t.exports = s
    }
    , {
        "../../config/vars": 2,
        "../../templates/ui/title_tpl": 13,
        "../../utils/cubicbezier": 14,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery"
    }],
    29: [function(e, t, i) {
        "use strict";
        var s = e("jquery")
          , n = e("bowser");
        s(function() {
            var t, i = {}, a = s("html"), r = (navigator.language || navigator.userLanguage).substr(0, 2);
            switch (r) {
            case "es":
                i.lang = "es";
                break;
            case "cn":
                i.lang = "cn";
                break;
            default:
                i.lang = "en"
            }
            if (n.mobile || n.tablet)
                i.device = n.mobile ? "mobile" : "tablet",
                t = e("./mobile/app");
            else
                switch (i.device = "desktop",
                t = e("./desktop/app"),
                n.name) {
                case "Internet Explorer":
                    i.browser = "explorer";
                    break;
                case "Microsoft Edge":
                    i.browser = "edge";
                    break;
                case "Firefox":
                    i.browser = "firefox";
                    break;
                case "Safari":
                    i.browser = "safari";
                    break;
                default:
                    i.browser = "chrome"
                }
            for (var o in i)
                a.addClass(i[o]);
            if (t.init(i),
            "Chrome" === n.name || "Firefox" === n.name) {
                var l = ["%c Coded by Vicente Lucendo - http://vlucendo.com ", "display:block; padding:5px; background: #351330; line-height:40px; color:#fff;"];
                window.console.log.apply(console, l)
            } else
                window.console.log("Coded by Vicente Lucendo - http://vlucendo.com")
        })
    }
    , {
        "./desktop/app": 1,
        "./mobile/app": 30,
        bowser: "bowser",
        jquery: "jquery"
    }],
    30: [function(e, t, i) {
        "use strict";
        var s = e("jquery")
          , n = e("./router")
          , a = e("./views/ui/menu")
          , r = e("./templates/app_tpl")
          , o = e("./config/vars")
          , l = e("../desktop/utils/cubicbezier")
          , h = {
            init: function(e) {
                o.lang = e.lang,
                o.device = e.device,
                this.getAppData()
            },
            getAppData: function() {
                s.when(s.ajax({
                    url: o.url + "/wp-json/ortizleon/v1/get_app_data"
                }), s.ajax({
                    url: o.url + "/wp-json/ortizleon/v1/get_news",
                    data: {
                        lang: o.lang,
                        device: o.device,
                        page: o.postsPage
                    }
                }), s.ajax({
                    url: o.url + "/wp-json/ortizleon/v1/get_pages_data"
                }), s.ajax({
                    url: o.url + "/wp-json/ortizleon/v1/get_projects"
                })).then(function(e, t, i, s) {
                    o.appData = e[0],
                    o.postsTotalNumber = t[0][0];
                    for (var n = 1; n < t[0].length; n++)
                        o.postsData.push(t[0][n]);
                    o.pagesData = i[0],
                    o.projectsData = s[0]
                }).then(this.createApp.bind(this))
            },
            createApp: function() {
                this.createTemplate(),
                this.selectors(),
                this.createEasings(),
                o.menu = new a,
                this.resize(),
                o._window.on("resize", this.resize.bind(this)),
                n.init()
            },
            createTemplate: function() {
                o.container.html(r.main())
            },
            selectors: function() {
                o.main = s("#container #main"),
                o.orientation = s("#container #orientation")
            },
            createEasings: function() {
                l.create("homeStateChange", .5, 0, .1, 1)
            },
            checkOrientation: function() {
                o.windowWidth > o.windowHeight ? o.orientation.css("display", "block") : o.orientation.css("display", "")
            },
            resize: function() {
                o.windowWidth = o._window.width(),
                o.windowHeight = o._window.height(),
                this.checkOrientation(),
                null !== n.currentView && n.currentView.resize()
            }
        };
        t.exports = h
    }
    , {
        "../desktop/utils/cubicbezier": 14,
        "./config/vars": 31,
        "./router": 32,
        "./templates/app_tpl": 34,
        "./views/ui/menu": 51,
        jquery: "jquery"
    }],
    31: [function(e, t, i) {
        "use strict";
        var s = e("jquery");
        t.exports = {
            url: window.location.protocol + "//" + window.location.host,
            lang: "en",
            device: "mobile",
            _document: s(document),
            _window: s(window),
            _html: s("html"),
            container: s("#container"),
            main: null,
            orientation: null,
            menu: null,
            windowWidth: 0,
            windowHeight: 0,
            selectedProject: 1,
            socialNetworks: ["linkedin", "facebook", "twitter", "pinterest"],
            appData: null,
            postsPage: 0,
            postsTotalNumber: 0,
            postsData: [],
            postsSingle: {
                data: null,
                preloaded: !1
            },
            pagesData: null,
            projectsData: null
        }
    }
    , {
        jquery: "jquery"
    }],
    32: [function(e, t, i) {
        "use strict";
        var s = e("jquery")
          , n = e("page")
          , a = e("eventemitter3")
          , r = e("./config/vars")
          , o = e("./utils/preload")
          , l = e("./views/home")
          , h = e("./views/project")
          , c = e("./views/projects")
          , d = e("./views/about")
          , u = e("./views/recognitions")
          , w = e("./views/news")
          , m = e("./views/services")
          , p = {
            events: new a,
            allowNavigation: !0,
            routes: [{
                path: "",
                view: l
            }, {
                path: "projects",
                view: c
            }, {
                path: "projects",
                view: h
            }, {
                path: "about",
                view: d
            }, {
                path: "recognitions",
                view: u
            }, {
                path: "news",
                view: w
            }, {
                path: "services",
                view: m
            }],
            currentView: null,
            currentViewIndex: null,
            currentViewPath: null,
            currentViewArgument: null,
            newViewIndex: null,
            newViewPath: null,
            newViewArgument: null,
            viewNew: !1,
            switchService: !1,
            transitionOldViewHidden: !1,
            transitionNewViewLoaded: !1,
            firstNavigation: !0,
            languageChangeRequest: !1,
            init: function() {
                o.app(),
                r.menu.events.on("view action", this.viewAction, this),
                n("*", this.routerController.bind(this)),
                n.base(""),
                n({
                    click: !0
                })
            },
            routerController: function(e) {
                if (this.allowNavigation) {
                    if (this.setViewData(e.path),
                    "news" == this.newViewPath && (null === r.postsSingle.data && r.postsSingle.preloaded === !1 || (r.postsSingle.data = null,
                    r.postsSingle.preloaded = !1)),
                    "services" == this.newViewPath && null == this.newViewArgument)
                        return void n.redirect("/services/1");
                    if (2 === this.newViewIndex) {
                        for (var t = !1, i = 0; i < r.projectsData.length; i++)
                            if (r.projectsData[i].name === this.newViewArgument) {
                                t = !0;
                                break
                            }
                        if (!t)
                            return
                    }
                    (this.currentViewPath != this.newViewPath || this.currentViewArgument != this.newViewArgument || this.languageChangeRequest) && (this.allowNavigation = !1,
                    this.languageChangeRequest && "news" == this.newViewPath ? (this.transitionNewViewLoaded = !0,
                    this.checkNewViewCreation()) : (o.events.once("view preloaded", function() {
                        this.transitionNewViewLoaded = !0,
                        this.checkNewViewCreation()
                    }, this),
                    o.view(this.newViewIndex, this.newViewPath, this.newViewArgument)),
                    r.container.addClass("in-transition"),
                    this.firstNavigation ? (this.transitionOldViewHidden = !0,
                    this.checkNewViewCreation()) : this.languageChangeRequest || 5 !== this.currentViewIndex || 5 !== this.newViewIndex ? this.languageChangeRequest || 6 !== this.currentViewIndex || 6 !== this.newViewIndex ? (this.currentView.events.once("view hidden", function() {
                        this.transitionOldViewHidden = !0,
                        this.checkNewViewCreation()
                    }, this),
                    this.currentView.remove()) : (this.switchService = !0,
                    this.transitionOldViewHidden = !0,
                    this.checkNewViewCreation()) : (this.viewNew = !0,
                    this.transitionOldViewHidden = !0,
                    this.checkNewViewCreation()))
                }
            },
            checkNewViewCreation: function() {
                this.transitionOldViewHidden && this.transitionNewViewLoaded && (this.transitionOldViewHidden = !1,
                this.transitionNewViewLoaded = !1,
                this.languageChangeRequest ? (r.postsPage = 0,
                r.postsTotalNumber = 0,
                r.postsData = [],
                r.postsSingle.data = null,
                r.postsSingle.preloaded = !1,
                s.ajax({
                    url: r.url + "/wp-json/ortizleon/v1/get_news",
                    data: {
                        lang: r.lang,
                        device: r.device,
                        page: r.postsPage
                    }
                }).then(function(e) {
                    r.postsTotalNumber = e[0];
                    for (var t = 1; t < e.length; t++)
                        r.postsData.push(e[t]);
                    if ("news" == this.newViewPath) {
                        var i = "/news";
                        n.replace(i, null, !1, !1),
                        this.setViewData(i),
                        o.events.once("view preloaded", function() {
                            this.createView()
                        }, this),
                        o.view(this.newViewIndex, this.newViewPath, this.newViewArgument)
                    } else
                        this.createView()
                }
                .bind(this))) : this.createView())
            },
            createView: function() {
                this.switchService || r.main.scrollTop(0),
                "recognitions" === this.newViewPath && "tablet" === r.device ? r.main.removeClass().addClass("no-bounce") : r.main.removeClass();
                var e = "first";
                if (this.firstNavigation || (e = "subsequent"),
                this.viewNew)
                    this.currentView.events.once("new changed", function() {
                        this.currentViewIndex = this.newViewIndex,
                        this.currentViewPath = this.newViewPath,
                        this.currentViewArgument = this.newViewArgument,
                        this.viewNew = !1,
                        this.allowNavigation = !0,
                        r.container.removeClass("in-transition")
                    }, this),
                    this.currentView.viewingNew ? this.currentView.closeNew() : this.currentView.showNew();
                else if (this.switchService)
                    this.currentView.events.once("service changed", function() {
                        this.currentViewIndex = this.newViewIndex,
                        this.currentViewPath = this.newViewPath,
                        this.currentViewArgument = this.newViewArgument,
                        this.switchService = !1,
                        this.allowNavigation = !0,
                        r.container.removeClass("in-transition")
                    }, this),
                    this.currentView.changeService(parseInt(this.newViewArgument));
                else {
                    if (this.currentView = new this.routes[this.newViewIndex].view,
                    this.currentView.events.once("view shown", function() {
                        this.firstNavigation && (this.firstNavigation = !1),
                        this.languageChangeRequest && (this.languageChangeRequest = !1),
                        this.currentViewIndex = this.newViewIndex,
                        this.currentViewPath = this.newViewPath,
                        this.currentViewArgument = this.newViewArgument,
                        this.allowNavigation = !0,
                        r.container.removeClass("in-transition")
                    }, this),
                    this.currentView.events.on("view action", this.viewAction, this),
                    this.languageChangeRequest)
                        var t = 1250;
                    else
                        var t = 0;
                    setTimeout(function() {
                        this.currentView.init(this.newViewIndex, this.newViewPath, this.newViewArgument, e)
                    }
                    .bind(this), t)
                }
            },
            viewAction: function(e, t, i) {
                "navigate" === e ? n(t) : "change laguage" === e && this.changeLanguage(t)
            },
            setViewData: function(e) {
                for (var t = 0, i = "", s = null, n = e.split("/", 3), a = 0; a < this.routes.length; a++)
                    if (n[1] == this.routes[a].path) {
                        i = this.routes[a].path,
                        t = a;
                        break
                    }
                n.length > 2 && "" != n[2] && (s = n[2],
                1 === t && (t = 2)),
                this.newViewIndex = t,
                this.newViewPath = i,
                this.newViewArgument = s
            },
            changeLanguage: function(e) {
                r.lang = e,
                r._html.removeClass("en es cn").addClass(e),
                r.menu.resetMenu(),
                r.orientation.find("h1").html(r.appData["mobile_turn_device_oops_" + r.lang]),
                r.orientation.find("h2").html(r.appData["mobile_turn_device_" + r.lang]),
                this.languageChangeRequest = !0;
                var t = "/" + this.currentViewPath;
                null !== this.currentViewArgument && (t += "/" + this.currentViewArgument),
                this.routerController({
                    path: t
                })
            }
        };
        t.exports = p
    }
    , {
        "./config/vars": 31,
        "./utils/preload": 42,
        "./views/about": 44,
        "./views/home": 45,
        "./views/news": 46,
        "./views/project": 47,
        "./views/projects": 48,
        "./views/recognitions": 49,
        "./views/services": 50,
        eventemitter3: "eventemitter3",
        jquery: "jquery",
        page: "page"
    }],
    33: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = e("../utils/svgs")
          , a = {
            main: function() {
                var e = '<section id="about">'
                  , t = s.pagesData.about["title_" + s.lang].replace(/(?:\r\n|\r|\n)/g, "");
                e += "<header>",
                e += '<div class="title">',
                e += "<h1>" + t + "</h1>",
                e += "</div>",
                e += '<div class="first-text">',
                e += '<div class="text">' + s.pagesData.about["intro_first_text_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="second-text">',
                e += "<div>" + s.pagesData.about["intro_second_text_" + s.lang] + "</div>",
                e += "</div>",
                e += "</header>",
                e += '<div class="white-line">',
                e += '<div class="white-text">',
                e += "<div>" + s.pagesData.about["white_part_text_" + s.lang] + "</div>",
                e += "</div>";
                var i = s.pagesData.about["white_part_title_" + s.lang].replace(/(?:\r\n|\r|\n)/g, "");
                e += '<div class="white-title">',
                e += "<h1>" + i + "</h1>",
                e += "</div>",
                e += "</div>",
                e += '<div class="architects">',
                e += '<div class="first-text">',
                e += "<div>" + s.pagesData.about["architects_text_first_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="second-text">',
                e += "<div>" + s.pagesData.about["architects_text_second_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="third-text">',
                e += '<div class="text">' + s.pagesData.about["architects_text_third_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="title">';
                var a = "";
                a += s.pagesData.about["architects_bio_title_" + s.lang];
                var r = s.pagesData.about["architects_bio_small_" + s.lang].indexOf(" ");
                a += "<span>" + s.pagesData.about["architects_bio_small_" + s.lang].substr(0, r) + "</span>",
                a += "<span>" + s.pagesData.about["architects_bio_small_" + s.lang].substr(r + 1) + "</span>",
                e += "<h1>" + a + "</h1>",
                e += "</div>";
                for (var o = 0; 2 > o; o++)
                    e += '<div class="architect">',
                    e += '<div class="image-layer" style="background-image: url(' + s.pagesData.about.architects_info[o].architect_photo + ');"></div>',
                    e += '<div class="info-cnt">',
                    e += '<div class="line"></div>',
                    e += '<div class="text">',
                    e += "<h3>" + s.pagesData.about.architects_info[o].architect_name + "</h3>",
                    e += "<p>" + s.pagesData.about.architects_info[o]["architect_description_" + s.lang] + "</p>",
                    e += '<div class="contact"><a href="' + s.pagesData.about.architects_info[o].architect_contact.url + '" target="_blank"><span></span><span>' + s.appData["about_contact_" + s.lang] + "</span></a></div>",
                    e += "</div>",
                    e += "</div>",
                    e += "</div>";
                e += "</div>",
                e += "<footer>",
                e += '<div class="logo">',
                e += '<div class="line1">Ortiz. Leon</div>',
                e += '<div class="line2">' + s.appData["menu_title_bottom_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="social-icons">',
                e += "<ul>";
                for (var o = 0; o < s.socialNetworks.length; o++)
                    e += "<li>",
                    e += '<a href="' + s.appData[s.socialNetworks[o] + "_url"].url + '" class="' + s.socialNetworks[o] + '" title="' + s.appData[s.socialNetworks[o] + "_url"].text + '" target="_blank">' + n["social_" + s.socialNetworks[o]] + n["social_" + s.socialNetworks[o]] + "</a>",
                    e += "</li>";
                e += "</ul>",
                e += "</div>",
                e += "</footer>",
                e += '<div class="grid">';
                for (var o = 0; 15 > o; o++)
                    e += "<span></span>";
                return e += "</div>",
                e += "</section>"
            }
        };
        t.exports = a
    }
    , {
        "../config/vars": 31,
        "../utils/svgs": 43
    }],
    34: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = {
            main: function() {
                var e = '<div id="main"></div>';
                e += '<div id="orientation">',
                e += "<h1>" + s.appData["mobile_turn_device_oops_" + s.lang] + "</h1>",
                e += '<div class="turn">',
                e += '<img src="' + s.url + '/wp-content/themes/ortizleon/img/turn-mobile.png" alt="turn" />',
                e += "<h2>" + s.appData["mobile_turn_device_" + s.lang] + "</h2>",
                e += "</div>",
                e += '<div class="grid">';
                for (var t = 0; 4 > t; t++)
                    e += "<span></span>";
                return e += "</div>",
                e += "</div>"
            }
        };
        t.exports = n
    }
    , {
        "../config/vars": 31
    }],
    35: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = {
            main: function() {
                var e = '<section id="home">';
                return e += '<div class="home-background" style="background-image: url(' + s.appData.initial_image_mobile + ');"></div>',
                e += '<div class="home-content">',
                e += "<h2>" + s.appData["home_intro_text_" + s.lang] + "</h2>",
                e += '<a class="home-button" href="' + s.url + '/projects">',
                e += "<div></div>",
                e += "<span>" + s.appData["home_intro_text_button_" + s.lang] + "</span>",
                e += "</a>",
                e += '<a class="home-button" href="' + s.url + '/news">',
                e += "<div></div>",
                e += "<span>" + s.appData["news_view_all_" + s.lang] + "</span>",
                e += "</a>",
                e += "</div>",
                e += "</section>"
            }
        };
        t.exports = n
    }
    , {
        "../config/vars": 31
    }],
    36: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = (e("../utils/svgs"),
        {
            en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            es: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"],
            cn: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        })
          , a = {
            main: function() {
                var e = '<section id="news">';
                return e += '<div class="list">',
                e += "<header>",
                e += '<div class="text">',
                e += "<h1>" + s.appData["news_title_" + s.lang] + "</h1>",
                e += "<h2>" + s.appData["news_subtitle_" + s.lang] + ".</h2>",
                e += "</div>",
                e += "</header>",
                e += '<div class="news-outer">',
                e += '<ul class="news-cnt"></ul>',
                e += "</div>",
                e += "</div>",
                e += '<div class="detail">',
                e += "<header>",
                e += '<div class="image"></div>',
                e += '<div class="close"></div>',
                e += "</header>",
                e += '<div class="content">',
                e += "</div>",
                e += "<footer>",
                e += '<div class="all-news">',
                e += "<span>" + s.appData["news_view_all_" + s.lang] + "</span>",
                e += "</div>",
                e += "</footer>",
                e += "</div>",
                e += "</section>"
            },
            fillNews: function(e) {
                for (var t = "", i = 6 * e; 6 * e + 6 > i && "undefined" != typeof s.postsData[i]; i++) {
                    t += '<li class="new" data-slug="' + s.postsData[i].name + '">';
                    var a = s.postsData[i].date.split(".", 3);
                    t += '<div class="info">',
                    t += '<div class="date">' + a[0] + " " + n[s.lang][parseInt(a[1]) - 1] + "</div>",
                    t += '<div class="title">' + s.postsData[i].title + "</div>",
                    t += '<div class="excpt">' + s.postsData[i].excerpt + "</div>",
                    t += "</div>",
                    t += "<figure></figure>",
                    t += "</li>"
                }
                return t += '<li class="pagination">',
                t += '<div class="news-arrows">',
                t += '<div class="next">',
                t += '<div class="arrow"></div>',
                t += "</div>",
                t += '<div class="prev">',
                t += '<div class="arrow"></div>',
                t += "</div>",
                t += "</div>",
                t += "</li>"
            },
            singleNewHeader: function() {
                return '<div style="background-image: url(' + s.postsSingle.data.head_image + '); opacity: 0;"></div>'
            },
            singleNewContent: function() {
                var e = '<div class="inner" style="opacity: 0;">';
                return e += "<h1>" + s.postsSingle.data.title + "</h1>",
                e += "<h2>" + s.postsSingle.data.date + "</h2>",
                e += '<div class="text">' + s.postsSingle.data.content + "</div>",
                e += "</div>"
            }
        };
        t.exports = a
    }
    , {
        "../config/vars": 31,
        "../utils/svgs": 43
    }],
    37: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = e("../utils/svgs")
          , a = {
            main: function(e) {
                for (var t = 0; t < s.projectsData.length; t++)
                    if (s.projectsData[t].name === e) {
                        var i = t;
                        break
                    }
                var a = Object.keys(s.projectsData[i].project_type)[0].toLowerCase()
                  , r = Object.keys(s.projectsData[i].project_subcategory)[0].toLowerCase()
                  , o = ""
                  , l = ""
                  , h = "";
                switch (a) {
                case "repositioning":
                    l = s.appData["project_type_repositioning_" + s.lang],
                    o = "repositioning";
                    break;
                case "mixed use":
                    l = s.appData["project_type_mixed_use_" + s.lang],
                    o = "mixed";
                    break;
                case "residential":
                    l = s.appData["project_type_residential_" + s.lang],
                    o = "residential";
                    break;
                case "high rise":
                    l = s.appData["project_type_high_rise_" + s.lang],
                    o = "highrise";
                    break;
                case "workplace":
                    l = s.appData["project_type_workplace_" + s.lang],
                    o = "workplace"
                }
                switch (r) {
                case "office buildings":
                    h = s.appData["project_subcategories_office_buildings_" + s.lang];
                    break;
                case "headquarters":
                    h = s.appData["project_subcategories_headquarters_" + s.lang];
                    break;
                case "mixed":
                    h = s.appData["project_subcategories_mixed_" + s.lang];
                    break;
                case "residential complex":
                    h = s.appData["project_subcategories_residential_complex_" + s.lang];
                    break;
                case "residential house":
                    h = s.appData["project_subcategories_residential_house_" + s.lang];
                    break;
                case "office complex":
                    h = s.appData["project_subcategories_office_complex_" + s.lang]
                }
                var c = '<section id="project" class="' + o + '">';
                c += "<header>",
                c += '<div class="bg-image" style="background-image: url(' + s.projectsData[i].mobile_image + ');"></div>',
                c += '<div class="bottom">',
                c += '<div class="categories">',
                c += '<img src="' + s.url + "/wp-content/themes/ortizleon/img/project-icons/" + o + '.png" alt="' + o + '" />',
                c += "<span>" + l + "</span>",
                c += "<span>" + h + "</span>",
                c += "</div>",
                c += "</div>",
                c += '<div class="infos">',
                c += '<div class="infos-cnt">';
                for (var t = 0; 3 > t; t++) {
                    c += '<div class="info">',
                    c += '<div class="info-cnt">';
                    var d = s.projectsData[i].info[t]["info_title_" + s.lang];
                    "m2" === d.substr(d.length - 2, 2) && (d = d.substr(0, d.length - 2) + "<b>m2</b>"),
                    c += '<span class="info-title">' + d + "</span>",
                    c += "<br>",
                    c += '<span class="info-bottom">' + s.projectsData[i].info[t]["info_bottom_" + s.lang] + "</span>",
                    c += "</div>",
                    c += "</div>"
                }
                c += "</div>",
                c += "</div>",
                c += "</header>",
                c += '<div class="white-image" style="background-image: url(' + s.projectsData[i].background_white_image + ');"></div>',
                c += '<div class="grid">';
                for (var t = 0; 11 > t; t++)
                    c += "<span></span>";
                c += "</div>",
                c += '<div class="slider">';
                for (var t = 0; t < s.projectsData[i].slider_images.length; t++) {
                    var u = Object.keys(s.projectsData[i].slider_images[t].image_format)[0];
                    c += '<div class="slide format-' + u + '">',
                    c += '<div class="slide-img" style="background-image: url(' + s.projectsData[i].slider_images[t].image + ');"></div>',
                    c += '<div class="slide-text">',
                    c += '<div class="txt-container">' + s.projectsData[i].slider_images[t]["image_text_" + s.lang] + "</div>",
                    c += "</div>",
                    c += "</div>"
                }
                if (c += '<div class="slider-arrows">',
                c += '<div class="next">',
                c += '<div class="arrow"></div>',
                c += "</div>",
                c += '<div class="prev">',
                c += '<div class="arrow"></div>',
                c += "</div>",
                c += n.project_slider_cirlce,
                c += "</div>",
                c += "</div>",
                c += '<div class="related-projects-text">',
                c += '<div class="vertical-line"></div>',
                c += '<div class="related-text-cnt">',
                c += '<div class="related-title">' + s.appData["project_related_" + s.lang].toUpperCase() + "</div>",
                1 === s.projectsData[i].related_projects_big_text_number) {
                    var w = s.projectsData[i].related_projects_big_text.length > 9;
                    c += '<div class="related-number nummm' + (w === !0 ? " small-num" : "") + '">',
                    c += "<span>" + s.projectsData[i].related_projects_big_text,
                    c += "<span>sqft</span>",
                    c += "</span>",
                    c += "</div>"
                } else
                    c += '<div class="related-number not-number">',
                    c += s.projectsData[i].related_projects_big_text,
                    c += "</div>";
                c += '<div class="related-small-text">' + s.projectsData[i]["related_project_text_small_" + s.lang] + "</div>",
                c += "</div>",
                c += "</div>",
                c += '<div class="related-projects">';
                for (var t = 0; t < s.projectsData[i].related_projects_selection.length; t++) {
                    for (var m = 0, p = 0; p < s.projectsData.length; p++)
                        if (s.projectsData[p].id === parseInt(s.projectsData[i].related_projects_selection[t])) {
                            m = p;
                            break
                        }
                    c += '<a href="' + s.url + "/projects/" + s.projectsData[m].name + '">',
                    c += '<div class="small-image" style="background-image: url(' + s.projectsData[m].small_image + ');"></div>',
                    c += '<div class="circle"></div>',
                    c += "</a>"
                }
                c += "</div>";
                for (var g = i === s.projectsData.length - 1 ? 0 : i + 1, t = 0; t < s.projectsData.length; t++)
                    if (s.projectsData[t].id === parseInt(s.projectsData[i].next_project_selection[0])) {
                        g = t;
                        break
                    }
                c += '<a href="' + s.url + "/projects/" + s.projectsData[g].name + '" class="next-project">',
                c += '<div class="next-image">',
                c += '<div class="image-src" style="background-image: url(' + s.projectsData[g].small_image + ');"></div>',
                c += "</div>",
                c += '<div class="next-text">',
                c += "<span>" + s.appData["project_next_" + s.lang] + "</span>",
                c += "<span>" + s.projectsData[g]["title_" + s.lang] + "</span>",
                c += "</div>",
                c += "</a>",
                c += '<a href="' + s.url + '/projects" class="back-projects">',
                c += "<span>" + s.appData["project_back_projects_" + s.lang] + "</span>",
                c += "</a>",
                c += "<footer>",
                c += '<div class="logo">',
                c += '<div class="line1">Ortiz. Leon</div>',
                c += '<div class="line2">' + s.appData["menu_title_bottom_" + s.lang] + "</div>",
                c += "</div>",
                c += '<div class="social-icons">',
                c += "<ul>";
                for (var t = 0; t < s.socialNetworks.length; t++)
                    c += "<li>",
                    c += '<a href="' + s.appData[s.socialNetworks[t] + "_url"].url + '" class="' + s.socialNetworks[t] + '" title="' + s.appData[s.socialNetworks[t] + "_url"].text + '" target="_blank">' + n["social_" + s.socialNetworks[t]] + n["social_" + s.socialNetworks[t]] + "</a>",
                    c += "</li>";
                return c += "</ul>",
                c += "</div>",
                c += "</footer>",
                c += "<h1><span>" + s.projectsData[i]["title_" + s.lang] + "</span></h1>",
                c += "</section>"
            }
        };
        t.exports = a
    }
    , {
        "../config/vars": 31,
        "../utils/svgs": 43
    }],
    38: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = {
            main: function(e) {
                var t = '<section id="projects">';
                t += '<div class="project-cnt">';
                for (var i = 0; i < s.projectsData.length; i++) {
                    t += '<div class="project">';
                    var n = Object.keys(s.projectsData[i].project_type)[0].toLowerCase()
                      , a = Object.keys(s.projectsData[i].project_subcategory)[0].toLowerCase()
                      , r = ""
                      , o = ""
                      , l = "";
                    switch (n) {
                    case "repositioning":
                        o = s.appData["project_type_repositioning_" + s.lang],
                        r = "repositioning";
                        break;
                    case "mixed use":
                        o = s.appData["project_type_mixed_use_" + s.lang],
                        r = "mixed";
                        break;
                    case "residential":
                        o = s.appData["project_type_residential_" + s.lang],
                        r = "residential";
                        break;
                    case "high rise":
                        o = s.appData["project_type_high_rise_" + s.lang],
                        r = "highrise";
                        break;
                    case "workplace":
                        o = s.appData["project_type_workplace_" + s.lang],
                        r = "workplace"
                    }
                    switch (a) {
                    case "office buildings":
                        l = s.appData["project_subcategories_office_buildings_" + s.lang];
                        break;
                    case "headquarters":
                        l = s.appData["project_subcategories_headquarters_" + s.lang];
                        break;
                    case "mixed":
                        l = s.appData["project_subcategories_mixed_" + s.lang];
                        break;
                    case "residential complex":
                        l = s.appData["project_subcategories_residential_complex_" + s.lang];
                        break;
                    case "residential house":
                        l = s.appData["project_subcategories_residential_house_" + s.lang];
                        break;
                    case "office complex":
                        l = s.appData["project_subcategories_office_complex_" + s.lang]
                    }
                    t += '<div class="bg-image" data-project="' + s.projectsData[i].name + '" style="background-image: url(' + s.projectsData[i].mobile_image + ');"></div>',
                    t += '<div class="bottom ' + r + '">',
                    t += '<div class="categories">',
                    t += '<img src="' + s.url + "/wp-content/themes/ortizleon/img/project-icons/" + r + '.png" alt="' + r + '" />',
                    t += "<span>" + o + "</span>",
                    t += "<span>" + l + "</span>",
                    t += "</div>",
                    t += '<a href="' + s.url + "/projects/" + s.projectsData[i].name + '" class="link">' + s.appData["mobile_projects_click_" + s.lang] + "</a>",
                    t += "</div>",
                    t += '<a href="' + s.url + "/projects/" + s.projectsData[i].name + '" class="title"><span>' + s.projectsData[i]["title_" + s.lang] + "</span></a>",
                    t += "</div>"
                }
                t += "</div>",
                t += '<div class="grid">';
                for (var i = 0; 4 > i; i++)
                    t += "<span></span>";
                return t += "</div>",
                t += '<div class="project-arrows">',
                t += '<div class="next">',
                t += '<div class="arrow"></div>',
                t += "</div>",
                t += '<div class="prev">',
                t += '<div class="arrow"></div>',
                t += "</div>",
                t += "</div>",
                t += '<div class="project-count">' + e.toString() + "/" + s.projectsData.length + "</div>",
                t += "</section>"
            }
        };
        t.exports = n
    }
    , {
        "../config/vars": 31
    }],
    39: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = e("../utils/svgs")
          , a = {
            main: function() {
                var e = '<section id="recognitions">';
                e += '<div class="scroll-container">',
                e += '<div class="dummy-scroll"></div>',
                e += "</div>",
                e += '<div class="inner">';
                var t = s.pagesData.recognitions["title_" + s.lang].replace(/(?:\r\n|\r|\n)/g, "");
                e += '<div class="title">',
                e += "<h1>" + t + "</h1>",
                e += "</div>",
                e += '<div class="roulette-container">',
                e += '<div class="square">',
                e += '<div class="cnt">';
                for (var i = 0; i < s.pagesData.recognitions.recognitions.length; i++)
                    e += "<article>",
                    e += "<div>",
                    e += "<h2>" + s.pagesData.recognitions.recognitions[i]["recognition_title_" + s.lang] + "</h2>",
                    e += "</div>",
                    e += "</article>";
                e += "</div>",
                e += "</div>",
                e += '<div class="masks"></div>',
                e += "</div>",
                e += '<div class="progress"><span></span></div>',
                e += "<footer>",
                e += '<div class="logo">',
                e += '<div class="line1">Ortiz. Leon</div>',
                e += '<div class="line2">' + s.appData["menu_title_bottom_" + s.lang] + "</div>",
                e += "</div>",
                e += '<div class="social-icons">',
                e += "<ul>";
                for (var i = 0; i < s.socialNetworks.length; i++)
                    e += "<li>",
                    e += '<a href="' + s.appData[s.socialNetworks[i] + "_url"].url + '" class="' + s.socialNetworks[i] + '" title="' + s.appData[s.socialNetworks[i] + "_url"].text + '" target="_blank">' + n["social_" + s.socialNetworks[i]] + n["social_" + s.socialNetworks[i]] + "</a>",
                    e += "</li>";
                e += "</ul>",
                e += "</div>",
                e += "</footer>",
                e += '<div class="grid">';
                for (var i = 0; 5 > i; i++)
                    e += "<span></span>";
                return e += "</div>",
                e += "</div>",
                e += '<div class="initial-fade"></div>',
                e += "</section>"
            }
        };
        t.exports = a
    }
    , {
        "../config/vars": 31,
        "../utils/svgs": 43
    }],
    40: [function(e, t, i) {
        "use strict";
        var s = e("../config/vars")
          , n = e("../utils/svgs")
          , a = {
            main: function(e) {
                for (var t = '<section id="services">', i = 0; i < s.pagesData.services.services.length; i++) {
                    var a = s.pagesData.services.services[i]["title_" + s.lang].replace(/(?:\r\n|\r|\n)/g, "");
                    t += '<div class="service type-' + (i + 1) + '">',
                    t += '<div class="image-bw">',
                    t += '<div style="background-image: url(' + s.pagesData.services.services[i].image_mobile_bw + ');"></div>',
                    t += "</div>",
                    t += '<div class="image-color">',
                    t += "tablet" === s.device && 4 === i ? '<div style="background-image: url(' + s.pagesData.services.services[i].image_mobile_bw + ');"></div>' : '<div style="background-image: url(' + s.pagesData.services.services[i].image_mobile_color + ');"></div>',
                    t += "</div>",
                    t += '<div class="image-overlay"><span></span><span></span></div>',
                    t += "<h1>" + a + "</h1>",
                    t += '<div class="big-text">',
                    t += '<div class="text">' + s.pagesData.services.services[i]["big_text_" + s.lang] + "</div>",
                    t += "</div>",
                    t += '<div class="small-text"><div class="text">' + s.pagesData.services.services[i]["small_text_" + s.lang] + "</div></div>",
                    t += "</div>"
                }
                t += '<div class="control-panel">',
                t += '<div class="prev"><div class="arrow"></div></div>',
                t += '<div class="next"><div class="arrow"></div></div>',
                t += '<div class="progress"><span><b>' + e + "</b>/" + s.pagesData.services.services.length + "</span></div>",
                t += "</div>",
                t += "<footer>",
                t += '<div class="logo">',
                t += '<div class="line1">Ortiz. Leon</div>',
                t += '<div class="line2">' + s.appData["menu_title_bottom_" + s.lang] + "</div>",
                t += "</div>",
                t += '<div class="social-icons">',
                t += "<ul>";
                for (var i = 0; i < s.socialNetworks.length; i++)
                    t += "<li>",
                    t += '<a href="' + s.appData[s.socialNetworks[i] + "_url"].url + '" class="' + s.socialNetworks[i] + '" title="' + s.appData[s.socialNetworks[i] + "_url"].text + '" target="_blank">' + n["social_" + s.socialNetworks[i]] + n["social_" + s.socialNetworks[i]] + "</a>",
                    t += "</li>";
                t += "</ul>",
                t += "</div>",
                t += "</footer>",
                t += '<div class="grid">';
                for (var i = 0; 6 > i; i++)
                    t += "<span></span>";
                return t += "</div>",
                t += "</section>"
            }
        };
        t.exports = a
    }
    , {
        "../config/vars": 31,
        "../utils/svgs": 43
    }],
    41: [function(e, t, i) {
        "use strict";
        var s = e("../../config/vars")
          , n = {
            main: function() {
                var e = {
                    en: "English",
                    es: "Castellano",
                    cn: "中文"
                }
                  , t = '<div id="menu">';
                t += '<div class="cnt">',
                t += "<ul>",
                t += '<li><a href="' + s.url + '/news"><span>' + s.appData["menu_section_news_" + s.lang] + ".</span></a></li>",
                t += '<li><a href="' + s.url + '/projects"><span>' + s.appData["menu_section_projects_" + s.lang] + ".</span></a></li>",
                t += '<li><a href="' + s.url + '/services"><span>' + s.appData["menu_section_services_" + s.lang] + ".</span></a></li>",
                t += '<li><a href="' + s.url + '/about"><span>' + s.appData["menu_section_about_" + s.lang] + ".</span></a></li>",
                t += '<li><a href="' + s.url + '/recognitions"><span>' + s.appData["menu_section_recognitions_" + s.lang] + ".</span></a></li>",
                t += "</ul>",
                t += '<div class="name">',
                t += '<div class="line1">Ortiz. Leon</div>',
                t += '<div class="line2">' + s.appData["menu_title_bottom_" + s.lang] + "</div>",
                t += "</div>",
                t += '<div class="info">',
                t += "<p>" + s.appData.menu_address + "</p>",
                t += "<p><b>" + s.appData["menu_phone_" + s.lang] + "</b>. " + s.appData.menu_phone_number + "</p>",
                t += "<p><b>" + s.appData["menu_fax_" + s.lang] + "</b>. " + s.appData.menu_fax_number + "</p>",
                t += "<p>" + s.appData.menu_email + "</p>",
                t += "</div>",
                t += '<div class="close"></div>',
                t += '<div class="lang">',
                t += s.appData["menu_change_language_" + s.lang] + ":";
                var i = !1
                  , n = !1;
                "en" !== s.lang && (t += '<div class="language" data-lang="en">' + e.en + "</div>",
                i = !0),
                i && !n && (t += "/",
                n = !0),
                "es" !== s.lang && (t += '<div class="language" data-lang="es">' + e.es + "</div>",
                i = !0),
                i && !n && (t += "/",
                n = !0),
                "cn" !== s.lang && (t += '<div class="language" data-lang="cn">' + e.cn + "</div>"),
                t += "</div>",
                t += '<div class="grid">';
                for (var a = 0; 4 > a; a++)
                    t += "<span></span>";
                return t += "</div>",
                t += "</div>",
                t += '<div id="icon" class="white">',
                t += '<div class="up">OL<span></span></div>',
                t += '<div class="bottom"><span></span><span></span><span></span><span></span></div>',
                t += "</div>",
                t += "</div>"
            }
        };
        t.exports = n
    }
    , {
        "../../config/vars": 31
    }],
    42: [function(e, t, i) {
        "use strict";
        var s = e("jquery")
          , n = e("eventemitter3")
          , a = e("resource-loader")
          , r = e("webfontloader")
          , o = e("../config/vars")
          , l = {
            events: new n,
            imagesREGEX: /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi,
            app: function() {
                r.load({
                    custom: {
                        families: ["Georgia", "Georgia-Bold", "butlermedium", "butlerbold", "galanogrotesquealtregular", "galanogrotesquealtbold", "galanogrotesquealtthin", "galanogrotesqueblack", "galanogrotesquealtheavy", "galanogrotesqueregular", "galanogrotesquealtthinitalic", "galanogrotesquealtlightitalic", "galanogrotesquealtsemibold", "galanogrotesquesemibold"]
                    },
                    classes: !1
                })
            },
            view: function(e, t, i) {
                if (0 === e) {
                    var n = new a;
                    n.resources[o.appData.initial_image_mobile] || n.add(o.appData.initial_image_mobile),
                    n.on("complete", function() {
                        this.events.emit("view preloaded")
                    }, this),
                    n.load()
                } else if (1 === e || 2 === e) {
                    var r = new a;
                    if (1 === e)
                        var l = 0;
                    else
                        for (var h = 0; h < o.projectsData.length; h++)
                            if (o.projectsData[h].name === i) {
                                var l = h;
                                break
                            }
                    var c = Object.keys(o.projectsData[l].project_type)[0].toLowerCase()
                      , d = "repositioning";
                    switch (c) {
                    case "repositioning":
                        d = "repositioning";
                        break;
                    case "mixed use":
                        d = "mixed";
                        break;
                    case "residential":
                        d = "residential";
                        break;
                    case "high rise":
                        d = "highrise";
                        break;
                    case "workplace":
                        d = "workplace"
                    }
                    r.resources[o.url + "/wp-content/themes/ortizleon/img/project-icons/" + d + ".png"] || r.add(o.url + "/wp-content/themes/ortizleon/img/project-icons/" + d + ".png"),
                    r.resources[o.projectsData[l].mobile_image] || r.add(o.projectsData[l].mobile_image),
                    r.on("complete", function() {
                        this.events.emit("view preloaded")
                    }, this),
                    r.load()
                } else if (3 === e || 4 === e)
                    this.events.emit("view preloaded");
                else if (5 === e)
                    if (null === i)
                        this.events.emit("view preloaded");
                    else {
                        for (var u = new a, w = null, h = 0; h < o.postsData.length; h++)
                            if (o.postsData[h].name === i) {
                                w = h;
                                break
                            }
                        if (null !== w) {
                            o.postsSingle.data = o.postsData[w],
                            u.resources[o.postsSingle.data.head_image] || u.add(o.postsSingle.data.head_image);
                            var m = o.postsSingle.data.content.match(this.imagesREGEX);
                            if (null !== m)
                                for (var h = 0; h < m.length; h++)
                                    u.resources[m[h]] || u.add(m[h]);
                            u.on("complete", function() {
                                o.postsSingle.preloaded = !0
                            }, this),
                            this.events.emit("view preloaded"),
                            u.load()
                        } else
                            s.ajax({
                                url: o.url + "/wp-json/ortizleon/v1/get_single_new",
                                data: {
                                    name: i
                                }
                            }).then(function(e) {
                                o.postsSingle.data = e[0],
                                u.resources[o.postsSingle.data.head_image] || u.add(o.postsSingle.data.head_image);
                                var t = o.postsSingle.data.content.match(this.imagesREGEX);
                                if (null !== t)
                                    for (var i = 0; i < t.length; i++)
                                        u.resources[t[i]] || u.add(t[i]);
                                u.on("complete", function() {
                                    o.postsSingle.preloaded = !0
                                }, this),
                                this.events.emit("view preloaded"),
                                u.load()
                            }
                            .bind(this))
                    }
                else if (6 === e) {
                    var p = new a;
                    if (null === i)
                        var g = 0;
                    else {
                        var v = parseInt(i) - 1;
                        g = "number" != typeof v || 0 > v || v > 4 ? 0 : v
                    }
                    p.resources[o.pagesData.services.services[g].image_mobile_bw] || p.add(o.pagesData.services.services[g].image_mobile_bw),
                    p.resources[o.pagesData.services.services[g].image_mobile_color] || p.add(o.pagesData.services.services[g].image_mobile_color),
                    p.on("complete", function() {
                        this.events.emit("view preloaded")
                    }, this),
                    p.load()
                }
            }
        };
        t.exports = l
    }
    , {
        "../config/vars": 31,
        eventemitter3: "eventemitter3",
        jquery: "jquery",
        "resource-loader": "resource-loader",
        webfontloader: "webfontloader"
    }],
    43: [function(e, t, i) {
        "use strict";
        var s = {
            social_linkedin: '<svg version="1.1" viewBox="0 0 25 25"><circle fill="#414141" cx="12.5" cy="12.5" r="12.1"/><path fill="#FFFFFF" d="M18.7,13.1v4.5h-2.6v-4.2c0-1.1-0.4-1.8-1.3-1.8c-0.7,0-1.1,0.5-1.3,1c-0.1,0.2-0.1,0.4-0.1,0.6v4.4h-2.6c0,0,0-7.1,0-7.8h2.6v1.1c0,0,0,0,0,0h0v0c0.3-0.5,1-1.3,2.3-1.3C17.4,9.6,18.7,10.7,18.7,13.1z M8.1,6C7.2,6,6.6,6.6,6.6,7.4c0,0.7,0.6,1.4,1.4,1.4h0c0.9,0,1.5-0.6,1.5-1.4C9.5,6.6,9,6,8.1,6z M6.7,17.6h2.6V9.8H6.7V17.6z"/></svg>',
            social_facebook: '<svg version="1.1" viewBox="0 0 25 25"><circle fill="#414141" cx="12.5" cy="12.5" r="12.1"/><path fill="#FFFFFF" d="M10.7,8.4c0,0.3,0,1.8,0,1.8H9.4v2.3h1.4v6.7h2.8v-6.7h1.9c0,0,0.2-1.1,0.3-2.3c-0.2,0-2.1,0-2.1,0s0-1.3,0-1.5c0-0.2,0.3-0.5,0.6-0.5c0.3,0,0.9,0,1.5,0c0-0.3,0-1.4,0-2.4c-0.8,0-1.7,0-2.1,0C10.7,5.8,10.7,8.1,10.7,8.4z"/></svg>',
            social_twitter: '<svg version="1.1" viewBox="0 0 25 25"><circle fill="#414141" cx="12.5" cy="12.5" r="12.1"/><path fill="#FFFFFF" d="M18.4,10.9c0.9-0.2,1.4-0.7,1.5-1.3c-0.3,0.2-1.2,0.6-1.8,0.5c0-0.1-0.1-0.2-0.1-0.3c-0.7-1.4-2.3-2.4-3.7-2c0.1-0.1,0.2-0.1,0.3-0.2c0.2-0.1,1.1-0.4,0.9-0.7c-0.2-0.3-1.2,0.4-1.5,0.5c0.3-0.2,0.7-0.4,0.7-0.8c-0.4,0.1-0.8,0.4-1.1,0.8c0.1-0.2,0.2-0.3,0.2-0.5c-1.1,1-1.5,2.6-1.8,4.1c-0.5-0.4-1-0.6-1.3-0.7C9.6,10,8.3,9.6,6.4,9.2c0,0.6,0.5,1.4,1.7,1.7c-0.2,0-0.6,0.1-0.9,0.3c0.2,0.7,0.8,1.2,2,1.3c-0.5,0.1-0.8,0.3-1,0.6c0.3,0.4,1,0.9,2.1,0.6c-1.1,0.7-0.2,1.5,0.7,1.2c-1.4,2-4,2.3-5.7,1.1c4.8,4.7,12.9,1.1,13.3-4.3c0.9-0.2,1.4-0.6,1.7-1C19.6,11,18.8,11,18.4,10.9z"/></svg>',
            social_pinterest: '<svg version="1.1" viewBox="0 0 25 25"><circle fill="#414141" cx="12.5" cy="12.5" r="12.1"/><path fill="#FFFFFF" d="M17.7,9.9c-0.4-2.7-3-4-5.8-3.7c-2.2,0.2-4.5,2.1-4.5,4.6c-0.1,1.6,0.4,2.8,1.9,3.1c0.6-1.1-0.2-1.4-0.3-2.2C8.3,8.3,12.7,6,15.1,8.4c1.6,1.6,0.6,6.7-2.1,6.2c-2.5-0.5,1.2-4.5-0.8-5.3c-1.6-0.6-2.5,2-1.7,3.3c-0.5,2.2-1.4,4.3-1,7.1c1.3-0.9,1.7-2.7,2.1-4.5c0.6,0.4,1,0.8,1.8,0.9C16.4,16.1,18.1,12.9,17.7,9.9z"/></svg>',
            project_slider_cirlce: '<svg version="1.1" viewBox="0 0 260 260"><circle cx="130" cy="130" r="120"/></svg>'
        };
        t.exports = s
    }
    , {}],
    44: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new a,
            this.scrollAnimatedElements = [],
            this.scrollPosition = 0,
            this.scrollPointsLogo = [],
            this.logoClass = "white",
            this.firstLoad = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("eventemitter3"))
          , r = e("../config/vars")
          , o = e("../../desktop/utils/cubicbezier")
          , l = e("../templates/about_tpl");
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.createTemplate(),
                this.selectors(),
                this.resize(),
                this.createTweens(),
                this.playInAnimation()
            },
            createTemplate: function() {
                r.main.html(l.main())
            },
            selectors: function() {
                this.el = n("#container #main section#about")
            },
            playInAnimation: function() {
                r.menu.icon.removeClass().addClass(this.logoClass),
                TweenMax.fromTo(this.el, 1.5, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                "tablet" === r.device ? (TweenMax.fromTo(this.el[0].children[0].children[0], 1.35, {
                    opacity: 0
                }, {
                    delay: .5,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.el[0].children[0].children[1], 1.5, {
                    opacity: 0
                }, {
                    delay: .7,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.el[0].children[0].children[2], 1.7, {
                    opacity: 0
                }, {
                    delay: .7,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.el[0].children[4].children[4], .5, {
                    opacity: 0
                }, {
                    delay: 1,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.el[0].children[4].children[4], 1.5, {
                    rotation: "0deg"
                }, {
                    delay: 1,
                    rotation: "45deg",
                    ease: o.get("homeStateChange")
                })) : (TweenMax.fromTo(this.el[0].children[0].children[0], 1.35, {
                    opacity: 0
                }, {
                    delay: .5,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.el[0].children[0].children[1], 1.5, {
                    opacity: 0
                }, {
                    delay: .7,
                    opacity: 1,
                    ease: Power2.easeInOut
                })),
                TweenMax.delayedCall(1.5, function() {
                    TweenMax.ticker.addEventListener("tick", this.scroll, this),
                    r.main.on("scroll", this.scrollHandler.bind(this)),
                    this.events.emit("view shown")
                }, null, this)
            },
            playOutAnimation: function() {
                TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    this.events.emit("view hidden")
                }, null, this)
            },
            createTweens: function() {
                this.scrollAnimatedElements[0].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[0].animation.fromTo(this.el[0].children[1].children[1].children[0], 1.35, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0),
                this.scrollAnimatedElements[0].animation.fromTo(this.el[0].children[1].children[0].children[0], 1.35, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .2),
                this.scrollAnimatedElements[1].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[1].animation.fromTo(this.el[0].children[2].children[2].children[0], 1.35, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0),
                this.scrollAnimatedElements[2].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                "tablet" === r.device && (this.scrollAnimatedElements[2].animation.fromTo(this.el[0].children[4].children[9], .5, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0),
                this.scrollAnimatedElements[2].animation.fromTo(this.el[0].children[4].children[9], 1.5, {
                    rotation: "0deg"
                }, {
                    rotation: "45deg",
                    ease: o.get("homeStateChange")
                }, 0)),
                this.scrollAnimatedElements[3].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[3].animation.fromTo(this.el[0].children[2].children[3].children[0], 1.35, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0),
                this.scrollAnimatedElements[4].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[4].animation.fromTo(this.el[0].children[2].children[4].children[0], 2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0),
                this.scrollAnimatedElements[4].animation.fromTo(this.el[0].children[2].children[5].children[0], 2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .2),
                this.scrollAnimatedElements[5].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                "tablet" === r.device ? (this.scrollAnimatedElements[5].animation.fromTo(this.el[0].children[2].children[4].children[1].children[0], 1, {
                    scaleY: 0
                }, {
                    scaleY: 1,
                    ease: o.get("homeStateChange")
                }, 0),
                this.scrollAnimatedElements[5].animation.fromTo(this.el[0].children[2].children[4].children[1].children[1], 1.35, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .3)) : (this.scrollAnimatedElements[5].animation.fromTo(this.el[0].children[2].children[4].children[1].children[1], 1.35, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0),
                this.scrollAnimatedElements[5].animation.fromTo(this.el[0].children[2].children[4].children[1].children[1], 1.35, {
                    y: .1 * r.windowHeight
                }, {
                    y: 0,
                    ease: o.get("homeStateChange")
                }, 0)),
                this.scrollAnimatedElements[6].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                "tablet" === r.device ? (this.scrollAnimatedElements[6].animation.fromTo(this.el[0].children[2].children[5].children[1].children[0], 1, {
                    scaleY: 0
                }, {
                    scaleY: 1,
                    ease: o.get("homeStateChange")
                }, 0),
                this.scrollAnimatedElements[6].animation.fromTo(this.el[0].children[2].children[5].children[1].children[1], 1.35, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .3)) : (this.scrollAnimatedElements[6].animation.fromTo(this.el[0].children[2].children[5].children[1].children[1], 1.35, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0),
                this.scrollAnimatedElements[6].animation.fromTo(this.el[0].children[2].children[5].children[1].children[1], 1.35, {
                    y: .1 * r.windowHeight
                }, {
                    y: 0,
                    ease: o.get("homeStateChange")
                }, 0)),
                this.scrollAnimatedElements[7].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[7].animation.fromTo(this.el[0].children[3].children[0], 1.2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0);
                for (var e = 0; e < this.el[0].children[3].children[1].children[0].children.length; e++)
                    this.scrollAnimatedElements[7].animation.fromTo(this.el[0].children[3].children[1].children[0].children[e], 1, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, .15 + .1 * e)
            },
            scrollHandler: function(e) {
                this.scrollPosition = e.delegateTarget.scrollTop
            },
            scroll: function() {
                this.checkLogoColor(),
                this.checkAnimatedElements()
            },
            checkLogoColor: function() {
                var e = this.scrollPosition + .05 * r.windowHeight;
                "white" === this.logoClass && e > this.scrollPointsLogo[0] && e < this.scrollPointsLogo[1] ? (this.logoClass = "black",
                r.menu.icon.removeClass()) : "black" === this.logoClass && (e < this.scrollPointsLogo[0] || e > this.scrollPointsLogo[1]) && (this.logoClass = "white",
                r.menu.icon.removeClass().addClass("white"))
            },
            checkAnimatedElements: function() {
                for (var e = 0; e < this.scrollAnimatedElements.length; e++)
                    !this.scrollAnimatedElements[e].shown && this.scrollPosition > this.scrollAnimatedElements[e].point && (this.scrollAnimatedElements[e].shown = !0,
                    this.scrollAnimatedElements[e].animation.play())
            },
            resize: function() {
                var e = "tablet" === r.device ? .055555 * this.el.height() : .043478 * this.el.height();
                this.firstLoad ? ("tablet" === r.device ? (this.scrollAnimatedElements.push({
                    point: .9 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 3.5 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 5 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 6 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 7.2 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 9.75 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 10.75 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 13.4 * e,
                    shown: !1
                }),
                this.scrollPointsLogo.push(4 * e),
                this.scrollPointsLogo.push(6 * e)) : (this.scrollAnimatedElements.push({
                    point: 3.5 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 9.4 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 0,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 12 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 13 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 14 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 17 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 18.7 * e,
                    shown: !1
                }),
                this.scrollPointsLogo.push(6 * e),
                this.scrollPointsLogo.push(9 * e)),
                this.firstLoad = !1) : ("tablet" === r.device ? (this.scrollAnimatedElements[0].point = .9 * e,
                this.scrollAnimatedElements[1].point = 3.5 * e,
                this.scrollAnimatedElements[2].point = 5 * e,
                this.scrollAnimatedElements[3].point = 6 * e,
                this.scrollAnimatedElements[4].point = 7.2 * e,
                this.scrollAnimatedElements[5].point = 9.75 * e,
                this.scrollAnimatedElements[6].point = 10.75 * e,
                this.scrollAnimatedElements[7].point = 13.4 * e,
                this.scrollPointsLogo[0] = 4 * e,
                this.scrollPointsLogo[1] = 6 * e) : (this.scrollAnimatedElements[0].point = 3.5 * e,
                this.scrollAnimatedElements[1].point = 9.4 * e,
                this.scrollAnimatedElements[2].point = 0,
                this.scrollAnimatedElements[3].point = 12 * e,
                this.scrollAnimatedElements[4].point = 13 * e,
                this.scrollAnimatedElements[5].point = 14 * e,
                this.scrollAnimatedElements[6].point = 17 * e,
                this.scrollAnimatedElements[7].point = 18.7 * e,
                this.scrollPointsLogo[0] = 6 * e,
                this.scrollPointsLogo[1] = 9 * e),
                this.scroll())
            },
            remove: function() {
                TweenMax.ticker.removeEventListener("tick", this.scroll),
                r.main.off("scroll"),
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../../desktop/utils/cubicbezier": 14,
        "../config/vars": 31,
        "../templates/about_tpl": 33,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery"
    }],
    45: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new a,
            this.homeCnt = null
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("hammerjs"),
        e("eventemitter3"))
          , r = e("../config/vars")
          , o = (e("../../desktop/utils/cubicbezier"),
        e("../templates/home_tpl"));
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.createTemplate(),
                this.selectors(),
                this.resize(),
                this.playInAnimation()
            },
            createTemplate: function() {
                r.main.html(o.main())
            },
            selectors: function() {
                this.el = n("#container #main section#home"),
                this.homeCnt = this.el.find(".home-content")
            },
            playInAnimation: function() {
                r.menu.icon.removeClass().addClass("white");
                var e = .2;
                TweenMax.fromTo(this.el[0].children[0], 1.5, {
                    opacity: 1e-4
                }, {
                    delay: e,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                "tablet" === r.device ? (TweenMax.fromTo(this.homeCnt[0].children[0], 1, {
                    x: .2 * r.windowWidth
                }, {
                    delay: e + .4,
                    x: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.homeCnt[0].children[0], 1, {
                    opacity: 0
                }, {
                    delay: e + .5,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.homeCnt[0].children[1].children[0], 1.35, {
                    scaleX: 0
                }, {
                    delay: e + .7,
                    scaleX: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.fromTo(this.homeCnt[0].children[1].children[1], 1.5, {
                    opacity: 0
                }, {
                    delay: e + 1.3,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.homeCnt[0].children[2].children[0], 1.45, {
                    scaleX: 0
                }, {
                    delay: e + .95,
                    scaleX: 1,
                    ease: Power4.easeInOut
                }),
                TweenMax.fromTo(this.homeCnt[0].children[2].children[1], 1.5, {
                    opacity: 0
                }, {
                    delay: e + 1.7,
                    opacity: 1,
                    ease: Power1.easeInOut
                })) : (TweenMax.fromTo(this.homeCnt[0].children[0], 1, {
                    opacity: 0
                }, {
                    delay: e + .5,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.homeCnt[0].children[1], 1.2, {
                    x: .2 * r.windowWidth
                }, {
                    delay: e + .7,
                    x: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.homeCnt[0].children[1], 1.2, {
                    opacity: 0
                }, {
                    delay: e + .7,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.homeCnt[0].children[2], 1.3, {
                    x: .2 * r.windowWidth
                }, {
                    delay: e + .9,
                    x: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.homeCnt[0].children[2], 1.3, {
                    opacity: 0
                }, {
                    delay: e + .9,
                    opacity: 1,
                    ease: Power2.easeInOut
                })),
                TweenMax.delayedCall(1.5, function() {
                    this.events.emit("view shown")
                }, null, this)
            },
            playOutAnimation: function() {
                TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    this.events.emit("view hidden")
                }, null, this)
            },
            resize: function() {},
            remove: function() {
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../../desktop/utils/cubicbezier": 14,
        "../config/vars": 31,
        "../templates/home_tpl": 35,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        hammerjs: "hammerjs",
        jquery: "jquery"
    }],
    46: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new r,
            this.newsCnt = null,
            this.newsItems = null,
            this.newsNext = null,
            this.newsPrev = null,
            this.detail = null,
            this.detailImage = null,
            this.detailContent = null,
            this.detailFooterAllNews = null,
            this.detailClose = null,
            this.hammerNews = null,
            this.hammerNewsMaxY = 0,
            this.hammerNewsCurrentPos = {
                actualY: 0,
                baseY: 0
            },
            this.hammerNewsCurrentPosAnimation = null,
            this.hammerNewsLastDelta = 0,
            this.hammerNewsLastVel = 0,
            this.viewingNew = !1,
            this.newsLoadedInterval = null,
            this.newsJsonLoaded = !1,
            this.newsJsonLoadedInterval = null,
            this.isAnimating = !1
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("hammerjs"))
          , r = e("eventemitter3")
          , o = e("../config/vars")
          , l = e("../../desktop/utils/cubicbezier")
          , h = e("../templates/news_tpl");
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.createTemplate(),
                this.selectors(),
                this.fillNews(0),
                this.newsUi(!1),
                this.resize(),
                this.playInAnimation(i)
            },
            createTemplate: function() {
                o.main.html(h.main())
            },
            selectors: function() {
                this.el = n("#container #main section#news"),
                this.newsCnt = this.el.find(".list ul.news-cnt"),
                this.detail = this.el.find(".detail"),
                this.detailImage = this.detail.find("header .image"),
                this.detailContent = this.detail.find(".content"),
                this.detailFooterAllNews = this.detail.find("footer .all-news"),
                this.detailClose = this.detail.find("header .close")
            },
            fillNews: function(e) {
                this.newsCnt.html(h.fillNews(e)),
                this.newsItems = this.newsCnt.find("li.new"),
                this.newsNext = this.newsCnt.find("li.pagination .next"),
                this.newsPrev = this.newsCnt.find("li.pagination .prev"),
                this.newsItems.css("height", (this.el.height() / 4).toString() + "px"),
                this.newsCnt.find(".pagination").css("height", (this.el.height() / 5).toString() + "px"),
                this.hammerNewsMaxY = this.newsItems.length > 3 ? -(this.newsItems.length - 3) * (this.el.height() / 4) : 0
            },
            hammerTime: function() {
                this.hammerNews = new a.Manager(this.newsCnt[0],{
                    recognizers: [[Hammer.Pan, {
                        direction: Hammer.DIRECTION_VERTICAL
                    }]]
                }),
                this.hammerNews.on("pan", this.newsPan.bind(this)),
                this.newsCnt.on("touchstart", this.newsTouchStart.bind(this)),
                this.newsCnt.on("touchend", this.newsTouchEnd.bind(this))
            },
            playInAnimation: function(e) {
                o.menu.icon.removeClass(),
                null !== e && (this.viewingNew = !0,
                this.isAnimating = !0,
                this.newsClearDetail(),
                TweenMax.set(this.detail, {
                    x: "-100%",
                    display: "block",
                    autoAlpha: 1
                }),
                "tablet" === o.device && o.menu.icon.removeClass().addClass("white"),
                this.newsCheckPostLoaded()),
                TweenMax.fromTo(this.el, 1.5, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                });
                for (var t = 0, i = .13, s = 0; t < this.newsCnt[0].children.length; t++)
                    TweenMax.fromTo(this.newsCnt[0].children[t], 1.2 + s, {
                        x: .3 * o.windowWidth
                    }, {
                        delay: i,
                        x: 0,
                        ease: Power2.easeOut
                    }),
                    TweenMax.fromTo(this.newsCnt[0].children[t], 1.3 + s, {
                        opacity: 0
                    }, {
                        delay: i,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    s += .015,
                    i = i + .13 - .015 * t;
                TweenMax.delayedCall(1.5, function() {
                    TweenMax.ticker.addEventListener("tick", this.scroll, this),
                    this.hammerTime(),
                    this.newsItems.on("click", this.newsItemClick.bind(this)),
                    this.newsNext.on("click", this.newsNextPage.bind(this)),
                    this.newsPrev.on("click", this.newsPrevPage.bind(this)),
                    this.detailClose.on("click", this.newsBackIndex.bind(this)),
                    this.detailFooterAllNews.on("click", this.newsBackIndex.bind(this)),
                    this.events.emit("view shown")
                }, null, this)
            },
            playOutAnimation: function() {
                TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    this.events.emit("view hidden")
                }, null, this)
            },
            newsUi: function(e) {
                var t = Math.ceil(o.postsTotalNumber / 6)
                  , i = o.postsPage + 1
                  , s = e === !0 ? 1.4 : 0
                  , n = !0;
                1 === i && 1 === t ? (this.newsCnt.find(".pagination").css("display", "none"),
                n = !1) : 1 === i && t > 1 ? (TweenMax.to(this.newsPrev, s, {
                    autoAlpha: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.to(this.newsNext, s, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                })) : i > 1 && i !== t ? (TweenMax.to(this.newsPrev, s, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.to(this.newsNext, s, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut
                })) : i > 1 && i === t && (TweenMax.to(this.newsPrev, s, {
                    autoAlpha: 1,
                    left: "initial",
                    right: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.to(this.newsNext, s, {
                    autoAlpha: 0,
                    ease: Power2.easeOut
                })),
                n && (this.hammerNewsMaxY -= this.el.height() / 5)
            },
            newsFillLoad: function() {
                this.fillNews(o.postsPage),
                this.hammerNewsCurrentPos.baseY = 0,
                this.hammerNewsCurrentPos.actualY = 0,
                this.newsUi(!1),
                this.newsItems.on("click", this.newsItemClick.bind(this)),
                this.newsNext.on("click", this.newsNextPage.bind(this)),
                this.newsPrev.on("click", this.newsPrevPage.bind(this)),
                TweenMax.to(this.newsCnt, .8, {
                    autoAlpha: 1,
                    ease: Power2.easeInOut,
                    clearProps: "all",
                    onCompleteScope: this,
                    onComplete: function() {
                        this.isAnimating = !1
                    }
                })
            },
            newsNextPage: function() {
                if (!this.isAnimating) {
                    var e = Math.ceil(o.postsTotalNumber / 6) - 1
                      , t = Math.ceil(o.postsData.length / 6) - 1
                      , i = o.postsPage + 1;
                    i > e || (this.isAnimating = !0,
                    this.newsItems.off("click"),
                    this.newsNext.off("click"),
                    this.newsPrev.off("click"),
                    o.postsPage = i,
                    t >= o.postsPage ? this.newsJsonLoaded = !0 : n.ajax({
                        url: o.url + "/wp-json/ortizleon/v1/get_news",
                        data: {
                            lang: o.lang,
                            device: o.device,
                            page: o.postsPage
                        }
                    }).then(function(e) {
                        o.postsTotalNumber = e[0];
                        for (var t = 1; t < e.length; t++)
                            o.postsData.push(e[t]);
                        this.newsJsonLoaded = !0
                    }
                    .bind(this)),
                    TweenMax.to(this.newsCnt, .6, {
                        autoAlpha: 0,
                        ease: Power2.easeInOut,
                        onCompleteScope: this,
                        onComplete: function() {
                            null !== this.newsJsonLoadedInterval && clearInterval(this.newsJsonLoadedInterval),
                            this.newsJsonLoadedInterval = setInterval(function() {
                                this.newsJsonLoaded && (clearInterval(this.newsJsonLoadedInterval),
                                this.newsJsonLoaded = !1,
                                this.newsFillLoad())
                            }
                            .bind(this), 100)
                        }
                    }))
                }
            },
            newsPrevPage: function() {
                if (!this.isAnimating) {
                    var e = o.postsPage - 1;
                    0 > e || (this.isAnimating = !0,
                    this.newsItems.off("click"),
                    this.newsNext.off("click"),
                    this.newsPrev.off("click"),
                    o.postsPage = e,
                    TweenMax.to(this.newsCnt, .6, {
                        autoAlpha: 0,
                        ease: Power2.easeInOut,
                        onCompleteScope: this,
                        onComplete: function() {
                            this.newsFillLoad()
                        }
                    }))
                }
            },
            newsItemClick: function(e) {
                this.isAnimating || (this.isAnimating = !0,
                this.events.emit("view action", "navigate", "/news/" + e.delegateTarget.dataset.slug))
            },
            showNew: function() {
                this.viewingNew = !0,
                this.newsClearDetail(),
                TweenMax.fromTo(this.detail, 1.35, {
                    display: "block",
                    autoAlpha: 1,
                    x: "0%"
                }, {
                    x: "-100%",
                    ease: l.get("homeStateChange")
                }),
                "tablet" === o.device && TweenMax.delayedCall(.6, function() {
                    o.menu.icon.removeClass().addClass("white")
                }, null, this),
                this.newsCheckPostLoaded()
            },
            newsClearDetail: function() {
                this.detailImage.html(""),
                this.detailContent.html(""),
                "mobile" === o.device && TweenMax.set(this.detailClose, {
                    scale: 0
                })
            },
            newsCheckPostLoaded: function() {
                null !== this.newsLoadedInterval && clearInterval(this.newsLoadedInterval),
                this.newsLoadedInterval = setInterval(function() {
                    o.postsSingle.preloaded && (clearInterval(this.newsLoadedInterval),
                    this.newsShowPost())
                }
                .bind(this), 100)
            },
            newsShowPost: function() {
                this.detailImage.html(h.singleNewHeader()),
                this.detailContent.html(h.singleNewContent()),
                "tablet" === o.device && TweenMax.fromTo(this.detailImage[0].children[0], 1.5, {
                    opacity: 0
                }, {
                    delay: .1,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.detailContent[0].children[0], 1.5, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                "mobile" === o.device && (TweenMax.fromTo(this.detailClose, 1, {
                    scale: 0
                }, {
                    delay: .7,
                    scale: 1,
                    ease: Power3.easeOut
                }),
                TweenMax.fromTo(this.detailClose, 1.1, {
                    rotation: "-500deg"
                }, {
                    delay: .7,
                    rotation: "0deg",
                    ease: Power3.easeOut
                })),
                TweenMax.delayedCall(1.5, function() {
                    this.isAnimating = !1,
                    this.events.emit("new changed")
                }, null, this)
            },
            newsBackIndex: function() {
                this.isAnimating || (this.isAnimating = !0,
                this.events.emit("view action", "navigate", "/news"))
            },
            closeNew: function() {
                this.isAnimating = !0,
                TweenMax.to(this.detail, 1, {
                    x: "0%",
                    ease: l.get("homeStateChange"),
                    overwrite: "all",
                    clearProps: "all"
                }),
                "tablet" === o.device && TweenMax.delayedCall(.2, function() {
                    o.menu.icon.removeClass()
                }, null, this),
                TweenMax.delayedCall(1, function() {
                    this.newsClearDetail(),
                    this.viewingNew = !1,
                    this.isAnimating = !1,
                    this.events.emit("new changed")
                }, null, this)
            },
            scroll: function() {
                this.newsCnt[0].style.transform = "translate3d(0px," + this.hammerNewsCurrentPos.actualY + "px, 0px)"
            },
            newsTouchStart: function() {
                null !== this.hammerNewsCurrentPosAnimation && this.hammerNewsCurrentPosAnimation.isActive() && this.hammerNewsCurrentPosAnimation.pause(),
                this.hammerNewsLastVel = 0
            },
            newsPan: function(e) {
                var t = this.hammerNewsCurrentPos.baseY + e.deltaY;
                t < this.hammerNewsMaxY ? t = this.hammerNewsMaxY : t > 0 && (t = 0),
                this.hammerNewsCurrentPos.actualY = t,
                this.hammerNewsLastVel = Math.abs(e.velocityY),
                this.hammerNewsLastDelta = e.deltaY,
                e.isFinal && (this.hammerNewsCurrentPos.baseY = this.hammerNewsCurrentPos.actualY)
            },
            newsTouchEnd: function() {
                if (this.hammerNewsLastVel > .1) {
                    var e = this.hammerNewsCurrentPos.actualY + this.hammerNewsLastDelta * (1 + 3 * this.hammerNewsLastVel);
                    e < this.hammerNewsMaxY ? e = this.hammerNewsMaxY : e > 0 && (e = 0),
                    this.hammerNewsCurrentPosAnimation = new TimelineMax({
                        delay: 0,
                        paused: !1,
                        tweens: [TweenMax.to(this.hammerNewsCurrentPos, 1.5, {
                            actualY: e,
                            ease: Power3.easeOut
                        }), TweenMax.to(this.hammerNewsCurrentPos, 1.5, {
                            baseY: e,
                            ease: Power3.easeOut
                        })]
                    })
                }
            },
            resize: function() {},
            remove: function() {
                TweenMax.ticker.removeEventListener("tick", this.scroll),
                null !== this.newsLoadedInterval && clearInterval(this.newsLoadedInterval),
                null !== this.newsJsonLoadedInterval && clearInterval(this.newsJsonLoadedInterval),
                this.newsItems.off("click"),
                this.newsNext.off("click"),
                this.newsPrev.off("click"),
                this.detailClose.off("click"),
                this.detailFooterAllNews.off("click"),
                this.hammerNews.off("pan"),
                this.newsCnt.off("touchstart"),
                this.newsCnt.off("touchend"),
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../../desktop/utils/cubicbezier": 14,
        "../config/vars": 31,
        "../templates/news_tpl": 36,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        hammerjs: "hammerjs",
        jquery: "jquery"
    }],
    47: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new r,
            this.scrollPosition = 0,
            this.lastScrollPosition = 0,
            this.slider = null,
            this.slides = null,
            this.sliderArrows = null,
            this.sliderSvg = null,
            this.slidesNumber = 0,
            this.slideShown = 0,
            this.slideScrollPointStart = 0,
            this.slideScrollPointEnd = 0,
            this.slideSwitch = !1,
            this.sliderAllowNext = !1,
            this.slideTimeout = null,
            this.hammerSlides = null,
            this.hammerSlideIndexes = [],
            this.scrollAnimatedElements = [],
            this.scrollPointsLogo = [],
            this.logoClass = "white",
            this.firstLoad = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("hammerjs"))
          , r = e("eventemitter3")
          , o = e("../config/vars")
          , l = e("../../desktop/utils/cubicbezier")
          , h = e("../templates/project_tpl");
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.createTemplate(i),
                this.selectors(),
                this.resize(),
                this.createTweens(),
                this.sliderInit(),
                this.playInAnimation()
            },
            createTemplate: function(e) {
                o.main.html(h.main(e))
            },
            selectors: function() {
                this.el = n("#container #main section#project"),
                this.slider = this.el.find(".slider"),
                this.slides = this.slider.find(".slide"),
                this.sliderArrows = this.slider.find(".slider-arrows .next, .slider-arrows .prev"),
                this.sliderSvg = this.slider.find("svg")
            },
            sliderInit: function() {
                this.slidesNumber = this.slides.length,
                "mobile" === o.device && (this.hammerSlides = new a.Manager(this.slider[0],{
                    recognizers: [[Hammer.Pan, {
                        direction: Hammer.DIRECTION_HORIZONTAL
                    }]]
                }),
                this.hammerSlides.on("pan", this.slidesPan.bind(this)))
            },
            playInAnimation: function() {
                if (o.menu.icon.removeClass().addClass(this.logoClass),
                TweenMax.fromTo(this.el, 1.5, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                "tablet" === o.device) {
                    var e = .2;
                    TweenMax.fromTo(this.el[0].children[9], 1.5, {
                        x: .5 * o.windowWidth
                    }, {
                        delay: e,
                        x: 0,
                        ease: Power2.easeOut
                    }),
                    TweenMax.fromTo(this.el[0].children[9], 1.5, {
                        opacity: 0
                    }, {
                        delay: e + .4,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.el[0].children[0].children[1], 1.35, {
                        y: .25 * o.windowHeight
                    }, {
                        delay: e + 0,
                        y: 0,
                        ease: l.get("homeStateChange"),
                        clearProps: "all"
                    }),
                    TweenMax.fromTo(this.el[0].children[0].children[2], 1.35, {
                        y: .25 * o.windowHeight
                    }, {
                        delay: e + .18,
                        y: 0,
                        ease: l.get("homeStateChange"),
                        clearProps: "all"
                    })
                } else {
                    var e = .2;
                    TweenMax.fromTo(this.el[0].children[9], 1, {
                        opacity: 0
                    }, {
                        delay: e,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.el[0].children[0].children[1].children[0], 1.1, {
                        opacity: 0
                    }, {
                        delay: e + .2,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.el[0].children[0].children[1].children[0], 1.1, {
                        y: "20%"
                    }, {
                        delay: e + .2,
                        y: "-50%",
                        ease: Power2.easeOut
                    }),
                    TweenMax.fromTo(this.el[0].children[0].children[2], 1.2, {
                        opacity: 0
                    }, {
                        delay: e + .5,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.el[0].children[0].children[2].children[0].children[0].children[0], 1.1, {
                        y: "20%"
                    }, {
                        delay: e + .5,
                        y: "-50%",
                        ease: Power2.easeOut
                    }),
                    this.sliderMobile()
                }
                TweenMax.delayedCall(1.5, function() {
                    TweenMax.ticker.addEventListener("tick", this.scroll, this),
                    o.main.on("scroll", this.scrollHandler.bind(this)),
                    this.sliderArrows.on("click", this.clickArrowSlider.bind(this)),
                    this.events.emit("view shown")
                }, null, this)
            },
            playOutAnimation: function() {
                TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    this.events.emit("view hidden")
                }, null, this)
            },
            createTweens: function() {
                this.scrollAnimatedElements[0].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[0].animation.fromTo(this.el[0].children[4].children[0], 1, {
                    scaleY: 0
                }, {
                    scaleY: 1,
                    ease: l.get("homeStateChange")
                }, 0),
                this.scrollAnimatedElements[0].animation.fromTo(this.el[0].children[4].children[1], 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, .3),
                this.scrollAnimatedElements[1].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                });
                for (var e = 0; e < this.el[0].children[5].children.length; e++)
                    "tablet" === o.device ? this.scrollAnimatedElements[1].animation.fromTo(this.el[0].children[5].children[e], 1, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, .5 * Math.random()) : this.scrollAnimatedElements[1].animation.fromTo(this.el[0].children[5].children[e], 1, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, .2 * e);
                this.scrollAnimatedElements[2].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[2].animation.fromTo(this.el[0].children[6].children, 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0),
                this.scrollAnimatedElements[3].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[3].animation.fromTo(this.el[0].children[8].children[0], 1.2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0);
                for (var e = 0; e < this.el[0].children[8].children[1].children[0].children.length; e++)
                    this.scrollAnimatedElements[3].animation.fromTo(this.el[0].children[8].children[1].children[0].children[e], 1, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, .15 + .1 * e);
                "mobile" === o.device && (this.scrollAnimatedElements[4].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[4].animation.fromTo(this.el[0].children[3], 1.2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0))
            },
            scrollHandler: function(e) {
                this.scrollPosition = e.delegateTarget.scrollTop
            },
            scroll: function() {
                this.checkLogoColor(),
                this.checkAnimatedElements(),
                this.lastScrollPosition !== this.scrollPosition && "tablet" === o.device && this.checkSliderVisibility()
            },
            checkLogoColor: function() {
                var e = this.scrollPosition + .05 * o.windowHeight;
                "white" === this.logoClass && e > this.scrollPointsLogo[0] && e < this.scrollPointsLogo[1] ? (this.logoClass = "black",
                o.menu.icon.removeClass()) : "black" === this.logoClass && (e < this.scrollPointsLogo[0] || e > this.scrollPointsLogo[1]) && (this.logoClass = "white",
                o.menu.icon.removeClass().addClass("white"))
            },
            checkAnimatedElements: function() {
                for (var e = 0; e < this.scrollAnimatedElements.length; e++)
                    !this.scrollAnimatedElements[e].shown && this.scrollPosition > this.scrollAnimatedElements[e].point && (this.scrollAnimatedElements[e].shown = !0,
                    this.scrollAnimatedElements[e].animation.play())
            },
            checkSliderVisibility: function() {
                0 !== this.slidesNumber && (this.scrollPosition <= this.slideScrollPointStart || this.scrollPosition > this.slideScrollPointEnd || 0 !== this.slideShown && this.slideSwitch !== !0 || (this.slideSwitch = !0,
                this.sliderNext()))
            },
            slideTimer: function() {
                this.slideSwitch = !0,
                this.checkSliderVisibility()
            },
            sliderNext: function(e) {
                if (this.slideSwitch !== !1) {
                    this.slideSwitch = !1;
                    var t = this.slideShown;
                    "prev" === e ? this.slideShown > 1 ? this.slideShown-- : this.slideShown = this.slidesNumber : this.slideShown < this.slidesNumber ? this.slideShown++ : this.slideShown = 1,
                    t > 0 ? (this.sliderAllowNext = !1,
                    "tablet" === o.device && TweenMax.to(this.sliderSvg[0].childNodes[0], 1, {
                        opacity: 0,
                        ease: Power2.easeOut
                    }),
                    TweenMax.fromTo(this.slides[t - 1], .7, {
                        opacity: 1
                    }, {
                        opacity: 0,
                        ease: Power2.easeInOut,
                        onCompleteScope: this,
                        onComplete: function() {
                            TweenMax.set([this.slides[t - 1].children[0], this.slides[t - 1].children[1].children[0]], {
                                clearProps: "opacity"
                            }),
                            TweenMax.set(this.slides[t - 1], {
                                clearProps: "visibility, opacity"
                            }),
                            this.slideAnimateIn()
                        }
                    })) : this.slideAnimateIn()
                }
            },
            slideAnimateIn: function() {
                this.sliderAllowNext = !0,
                TweenMax.set(this.slides[this.slideShown - 1], {
                    visibility: "inherit"
                }),
                TweenMax.to(this.slides[this.slideShown - 1].children[0], 1, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.to(this.slides[this.slideShown - 1].children[1].children[0], 1, {
                    delay: .2,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                "tablet" === o.device && (TweenMax.fromTo(this.sliderSvg[0].childNodes[0], 6, {
                    strokeDashoffset: 754,
                    opacity: 1
                }, {
                    strokeDashoffset: 0,
                    ease: Linear.easeNone,
                    overwrite: "all"
                }),
                this.slideTimeout = setTimeout(this.slideTimer.bind(this), 6e3))
            },
            clickArrowSlider: function(e) {
                this.sliderAllowNext && (this.sliderAllowNext = !1,
                null !== this.slideTimeout && clearTimeout(this.slideTimeout),
                "tablet" === o.device && (this.slideSwitch = !0),
                "next" === e.delegateTarget.className ? "tablet" === o.device ? this.sliderNext("next") : this.sliderMobileNext("next") : "tablet" === o.device ? this.sliderNext("prev") : this.sliderMobileNext("prev"))
            },
            sliderMobile: function() {
                this.slideShown = 1,
                this.sliderAllowNext = !0,
                this.slideMobileHandler()
            },
            slidesPan: function(e) {
                if (this.sliderAllowNext) {
                    var t = e.deltaX;
                    t < -o.windowWidth ? t = -o.windowWidth : t > o.windowWidth && (t = o.windowWidth);
                    var i = t > 0 ? "prev" : "next"
                      , s = "prev" === i ? 1 : 2;
                    if (e.isFinal) {
                        if (this.sliderAllowNext = !1,
                        t < -o.windowWidth / 4)
                            var n = this.slideShown === this.slidesNumber ? 1 : this.slideShown + 1
                              , a = -o.windowWidth;
                        else if (t > o.windowWidth / 4)
                            var n = 1 === this.slideShown ? this.slidesNumber : this.slideShown - 1
                              , a = o.windowWidth;
                        else
                            var n = null
                              , a = 0;
                        TweenMax.to(this.slides[this.hammerSlideIndexes[s]], .5, {
                            x: a,
                            force3D: !0,
                            ease: Power2.easeOut,
                            onCompleteScope: this,
                            onComplete: function() {
                                null !== n && (this.slideShown = n,
                                this.slideMobileHandler()),
                                this.sliderAllowNext = !0
                            }
                        })
                    } else
                        for (var r = 0; 3 > r; r++)
                            r === s ? TweenMax.set(this.slides[this.hammerSlideIndexes[r]], {
                                x: t,
                                zIndex: 5,
                                force3D: !0
                            }) : TweenMax.set(this.slides[this.hammerSlideIndexes[r]], {
                                x: 0,
                                zIndex: 0,
                                force3D: !0
                            })
                }
            },
            sliderMobileNext: function(e) {
                var t = "next" === e ? this.hammerSlideIndexes[2] : this.hammerSlideIndexes[1]
                  , i = "next" === e ? -o.windowWidth : o.windowWidth;
                if ("next" === e)
                    var s = this.slideShown === this.slidesNumber ? 1 : this.slideShown + 1;
                else
                    var s = 1 === this.slideShown ? this.slidesNumber : this.slideShown - 1;
                TweenMax.set(this.slides[t], {
                    zIndex: 5
                }),
                TweenMax.to(this.slides[t], .9, {
                    x: i,
                    ease: l.get("homeStateChange"),
                    onCompleteScope: this,
                    onCompleteParams: [s],
                    onComplete: function(e) {
                        this.slideShown = e,
                        this.slideMobileHandler(),
                        this.sliderAllowNext = !0
                    }
                })
            },
            slideMobileHandler: function() {
                var e = this.slideShown - 1
                  , t = 0 === e ? this.slidesNumber - 1 : e - 1
                  , i = e === this.slidesNumber - 1 ? 0 : e + 1;
                TweenMax.set(this.slides[e], {
                    left: 0,
                    clearProps: "transform, zIndex",
                    overwrite: "all"
                }),
                TweenMax.set(this.slides[t], {
                    left: "-100vw",
                    clearProps: "transform, zIndex",
                    overwrite: "all"
                }),
                TweenMax.set(this.slides[i], {
                    left: "100vw",
                    clearProps: "transform, zIndex",
                    overwrite: "all"
                }),
                this.hammerSlideIndexes = [e, t, i]
            },
            resize: function() {
                "tablet" === o.device ? (this.slideScrollPointStart = 0,
                this.slideScrollPointEnd = .5 * this.el.height()) : (this.slideScrollPointStart = .125 * this.el.height(),
                this.slideScrollPointEnd = .5 * this.el.height());
                var e = .0625 * this.el.height();
                this.firstLoad ? ("tablet" === o.device ? (this.scrollAnimatedElements.push({
                    point: 4.5 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 6.6 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 9 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 11.4 * e,
                    shown: !1
                }),
                this.scrollPointsLogo.push(4 * e),
                this.scrollPointsLogo.push(8 * e)) : (this.scrollAnimatedElements.push({
                    point: 6 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 7.6 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 10 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 12.4 * e,
                    shown: !1
                }),
                this.scrollAnimatedElements.push({
                    point: 2.5 * e,
                    shown: !1
                }),
                this.scrollPointsLogo.push(2 * e),
                this.scrollPointsLogo.push(8 * e)),
                this.firstLoad = !1) : ("tablet" === o.device ? (this.scrollAnimatedElements[0].point = 4.5 * e,
                this.scrollAnimatedElements[1].point = 6.6 * e,
                this.scrollAnimatedElements[2].point = 9 * e,
                this.scrollAnimatedElements[3].point = 11.4 * e,
                this.scrollPointsLogo[0] = 4 * e,
                this.scrollPointsLogo[1] = 8 * e) : (this.scrollAnimatedElements[0].point = 6 * e,
                this.scrollAnimatedElements[1].point = 7.6 * e,
                this.scrollAnimatedElements[2].point = 10 * e,
                this.scrollAnimatedElements[3].point = 12.4 * e,
                this.scrollAnimatedElements[4].point = 2.5 * e,
                this.scrollPointsLogo[0] = 2 * e,
                this.scrollPointsLogo[1] = 8 * e),
                this.scroll())
            },
            remove: function() {
                TweenMax.ticker.removeEventListener("tick", this.scroll),
                null !== this.slideTimeout && clearTimeout(this.slideTimeout),
                o.main.off("scroll"),
                this.sliderArrows.off("click"),
                "mobile" === o.device && this.hammerSlides.off("pan"),
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../../desktop/utils/cubicbezier": 14,
        "../config/vars": 31,
        "../templates/project_tpl": 37,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        hammerjs: "hammerjs",
        jquery: "jquery"
    }],
    48: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new r,
            this.projectsCnt = null,
            this.projects = null,
            this.projectsBgImgs = null,
            this.count = null,
            this.arrowsCnt = null,
            this.arrowNext = null,
            this.arrowPrev = null,
            this.hammerProjects = null,
            this.hammerProjectsIndexes = [],
            this.hammerProjectsPos = {
                actualX: 0
            },
            this.hammerNewsMaxX = 0,
            this.projectCountShown = !0,
            this.currentProject = 1,
            this.isAnimating = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("hammerjs"))
          , r = e("eventemitter3")
          , o = e("../config/vars")
          , l = e("../../desktop/utils/cubicbezier")
          , h = e("../templates/projects_tpl");
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.currentProject = o.selectedProject,
                this.createTemplate(),
                this.selectors(),
                this.resize(),
                this.playInAnimation()
            },
            createTemplate: function() {
                o.main.html(h.main(this.currentProject))
            },
            selectors: function() {
                this.el = n("#container #main section#projects"),
                this.projectsCnt = this.el.find(".project-cnt"),
                this.projects = this.projectsCnt.find(".project"),
                this.projectsBgImgs = this.projects.find(".bg-image"),
                this.count = this.el.find(".project-count"),
                this.arrowsCnt = this.el.find(".project-arrows"),
                this.arrowNext = this.arrowsCnt.find(".next"),
                this.arrowPrev = this.arrowsCnt.find(".prev")
            },
            playInAnimation: function() {
                if (o.menu.icon.removeClass().addClass("white"),
                "tablet" === o.device) {
                    this.projectHandler();
                    var e = .2;
                    TweenMax.fromTo(this.el, 1.5, {
                        opacity: 1e-4
                    }, {
                        delay: e,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.projects[this.currentProject - 1].children[2], 1, {
                        x: .2 * o.windowWidth
                    }, {
                        delay: e + 1,
                        x: 0,
                        ease: Power2.easeOut
                    }),
                    TweenMax.fromTo(this.projects[this.currentProject - 1].children[2], 1, {
                        opacity: 0
                    }, {
                        delay: e + 1.1,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo([this.count, this.arrowsCnt], 1.5, {
                        opacity: 0
                    }, {
                        delay: e + .85,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.projects[this.currentProject - 1].children[1], 1.35, {
                        y: .25 * o.windowHeight
                    }, {
                        delay: e + .5,
                        y: 0,
                        ease: l.get("homeStateChange"),
                        clearProps: "all"
                    })
                } else {
                    this.projectHandler();
                    var e = .2;
                    TweenMax.fromTo(this.el, 1.5, {
                        opacity: 1e-4
                    }, {
                        delay: e,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.projects[this.currentProject - 1].children[2], 1, {
                        opacity: 0
                    }, {
                        delay: e + .5,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.projects[this.currentProject - 1].children[1], 1.35, {
                        y: .3333 * o.windowHeight
                    }, {
                        delay: e + .5,
                        y: 0,
                        ease: l.get("homeStateChange"),
                        clearProps: "all"
                    }),
                    TweenMax.fromTo([this.count, this.arrowsCnt], 1.5, {
                        opacity: 0
                    }, {
                        delay: e + .75,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.projects[this.currentProject - 1].children[1].children[0].children[1], 1, {
                        opacity: 0
                    }, {
                        delay: e + .75,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.projects[this.currentProject - 1].children[1].children[0].children[2], 1, {
                        opacity: 0
                    }, {
                        delay: e + 1,
                        opacity: 1,
                        ease: Power2.easeInOut
                    })
                }
                TweenMax.delayedCall(2, function() {
                    this.hammerTime(),
                    this.arrowNext.on("click", {
                        action: "next"
                    }, this.switchProject.bind(this)),
                    this.arrowPrev.on("click", {
                        action: "prev"
                    }, this.switchProject.bind(this)),
                    "mobile" === o.device && this.projectsBgImgs.on("click", this.navToProject.bind(this)),
                    this.events.emit("view shown"),
                    this.isAnimating = !1
                }, null, this)
            },
            playOutAnimation: function() {
                TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    this.events.emit("view hidden")
                }, null, this)
            },
            hammerTime: function() {
                this.hammerProjects = new a.Manager(this.projectsCnt[0],{
                    recognizers: [[Hammer.Pan, {
                        direction: Hammer.DIRECTION_HORIZONTAL
                    }]]
                }),
                this.hammerProjects.on("pan", this.projectsPan.bind(this))
            },
            projectsPan: function(e) {
                if (!this.isAnimating) {
                    var t = e.deltaX;
                    t < -this.hammerNewsMaxX ? t = -this.hammerNewsMaxX : t > this.hammerNewsMaxX && (t = this.hammerNewsMaxX);
                    var i = t > 0 ? "prev" : "next"
                      , s = "prev" === i ? 1 : 2;
                    if (e.isFinal) {
                        if (this.isAnimating = !0,
                        t < -this.hammerNewsMaxX / 4)
                            var n = this.currentProject === o.projectsData.length ? 1 : this.currentProject + 1
                              , a = -this.hammerNewsMaxX;
                        else if (t > this.hammerNewsMaxX / 4)
                            var n = 1 === this.currentProject ? o.projectsData.length : this.currentProject - 1
                              , a = this.hammerNewsMaxX;
                        else
                            var n = null
                              , a = 0;
                        this.changeProjectNumber(n, "show"),
                        null !== n && TweenMax.fromTo(this.projects[this.hammerProjectsIndexes[s]].children[2], 1.5, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.to(this.projectsCnt[0].children[this.hammerProjectsIndexes[s]], .5, {
                            x: a,
                            force3D: !0,
                            ease: Power2.easeOut,
                            onCompleteScope: this,
                            onComplete: function() {
                                null !== n && (this.currentProject = n,
                                o.selectedProject = this.currentProject,
                                this.projectHandler()),
                                this.projectCountShown = !0,
                                this.isAnimating = !1
                            }
                        })
                    } else {
                        this.projectCountShown && (this.projectCountShown = !1,
                        this.changeProjectNumber(null, "hide"));
                        for (var r = 0; 3 > r; r++)
                            r === s ? TweenMax.set(this.projectsCnt[0].children[this.hammerProjectsIndexes[r]], {
                                x: t,
                                zIndex: 5,
                                force3D: !0
                            }) : TweenMax.set(this.projectsCnt[0].children[this.hammerProjectsIndexes[r]], {
                                x: 0,
                                zIndex: 0,
                                force3D: !0
                            })
                    }
                }
            },
            switchProject: function(e) {
                if (!this.isAnimating) {
                    if (this.isAnimating = !0,
                    "next" === e.data.action)
                        var t = this.currentProject === o.projectsData.length ? 1 : this.currentProject + 1
                          , i = this.currentProject - 1
                          , s = i === o.projectsData.length - 1 ? 0 : i + 1
                          , n = .2 * o.windowWidth
                          , a = 0
                          , r = -o.windowWidth;
                    else
                        var t = 1 === this.currentProject ? o.projectsData.length : this.currentProject - 1
                          , i = this.currentProject - 1
                          , s = 0 === i ? o.projectsData.length - 1 : i - 1
                          , n = 0
                          , a = .3
                          , r = o.windowWidth;
                    this.changeProjectNumber(t),
                    "tablet" === o.device ? (TweenMax.fromTo(this.projects[s].children[2], .9, {
                        x: n
                    }, {
                        x: 0,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.projects[s].children[2], .9, {
                        opacity: 0
                    }, {
                        delay: a,
                        opacity: 1,
                        ease: Power2.easeInOut
                    })) : (TweenMax.fromTo(this.projects[s].children[2], .9, {
                        opacity: 0
                    }, {
                        delay: .2,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.projects[s].children[1].children[0].children[1], 1, {
                        opacity: 0
                    }, {
                        delay: .4,
                        opacity: 1,
                        ease: Power2.easeInOut
                    }),
                    TweenMax.fromTo(this.projects[s].children[1].children[0].children[2], 1, {
                        opacity: 0
                    }, {
                        delay: .65,
                        opacity: 1,
                        ease: Power2.easeInOut
                    })),
                    TweenMax.set(this.projects[s], {
                        zIndex: 5
                    }),
                    TweenMax.to(this.projects[s], .9, {
                        x: r,
                        ease: l.get("homeStateChange"),
                        onCompleteScope: this,
                        onCompleteParams: [t],
                        onComplete: function(e) {
                            this.currentProject = e,
                            o.selectedProject = this.currentProject,
                            this.projectHandler(),
                            this.isAnimating = !1
                        }
                    })
                }
            },
            changeProjectNumber: function(e, t) {
                if ("undefined" != typeof t && "hide" !== t || (TweenMax.to(this.count, .3, {
                    opacity: 0,
                    ease: Power2.easeOut
                }),
                "hide" !== t)) {
                    if ("undefined" == typeof t)
                        var i = .3;
                    else
                        var i = 0;
                    TweenMax.delayedCall(i, function(e) {
                        null !== e && this.count.html(e + "/" + o.projectsData.length)
                    }, [e], this),
                    TweenMax.to(this.count, .6, {
                        delay: i,
                        opacity: 1,
                        ease: Power2.easeInOut
                    })
                }
            },
            projectHandler: function() {
                for (var e = this.currentProject - 1, t = 0 === e ? o.projectsData.length - 1 : e - 1, i = e === o.projectsData.length - 1 ? 0 : e + 1, s = 0; s < o.projectsData.length; s++)
                    s !== e && s !== t && s !== i && TweenMax.set(this.projects[s], {
                        clearProps: "all",
                        overwrite: "all"
                    }),
                    s !== e && TweenMax.set(this.projects[s].children[2], {
                        clearProps: "all",
                        overwrite: "all"
                    });
                TweenMax.set(this.projects[e], {
                    visibility: "inherit",
                    left: 0,
                    clearProps: "transform, zIndex",
                    overwrite: "all"
                }),
                TweenMax.set(this.projects[t], {
                    visibility: "inherit",
                    left: "-100vw",
                    clearProps: "transform, zIndex",
                    overwrite: "all"
                }),
                TweenMax.set(this.projects[i], {
                    visibility: "inherit",
                    left: "100vw",
                    clearProps: "transform, zIndex",
                    overwrite: "all"
                }),
                this.hammerProjectsIndexes = [e, t, i]
            },
            navToProject: function(e) {
                this.events.emit("view action", "navigate", "/projects/" + e.delegateTarget.dataset.project)
            },
            resize: function() {
                this.hammerNewsMaxX = o.windowWidth
            },
            remove: function() {
                this.arrowNext.off("click"),
                this.arrowPrev.off("click"),
                this.projectsBgImgs.off("click"),
                this.hammerProjects.off("pan"),
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../../desktop/utils/cubicbezier": 14,
        "../config/vars": 31,
        "../templates/projects_tpl": 38,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        hammerjs: "hammerjs",
        jquery: "jquery"
    }],
    49: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new a,
            this.scrollCnt = null,
            this.scrollDummy = null,
            this.inner = null,
            this.articles = null,
            this.progress = null,
            this.articlesNum = 0,
            this.squareHeight = 0,
            this.rouletteAnimation = null,
            this.scrollPosition = 0,
            this.lastScrollPosition = 0,
            this.rouletteMaxScroll = 0,
            this.liveScrollPosition = {
                inner: 0,
                roulette: 0
            },
            this.scrollAnimatedElements = [],
            this.firstLoad = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("eventemitter3"))
          , r = e("../config/vars")
          , o = (e("../../desktop/utils/cubicbezier"),
        e("../templates/recognitions_tpl"));
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.createTemplate(),
                this.selectors(),
                this.resize(),
                this.createTweens(),
                this.playInAnimation()
            },
            createTemplate: function() {
                r.main.html(o.main())
            },
            selectors: function() {
                this.el = n("#container #main section#recognitions"),
                this.scrollCnt = this.el.find(".scroll-container"),
                this.scrollDummy = this.scrollCnt.find(".dummy-scroll"),
                this.inner = this.el.find(".inner"),
                this.articles = this.el.find(".roulette-container .cnt article"),
                this.progress = this.inner.find(".progress")
            },
            playInAnimation: function() {
                r.menu.icon.removeClass(),
                "tablet" === r.device ? (TweenMax.fromTo(this.el[0].children[2], 1.5, {
                    opacity: 1
                }, {
                    opacity: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.el[0].children[1].children[1], 1.3, {
                    opacity: 1e-4
                }, {
                    delay: 1,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.progress, 1.75, {
                    scaleY: 0
                }, {
                    delay: .2,
                    scaleY: 1,
                    ease: Power4.easeInOut
                })) : TweenMax.fromTo(this.el, 1.5, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1.5, function() {
                    TweenMax.ticker.addEventListener("tick", this.scroll, this),
                    "tablet" === r.device ? this.scrollCnt.on("scroll", this.scrollHandler.bind(this)) : r.main.on("scroll", this.scrollHandler.bind(this)),
                    this.events.emit("view shown")
                }, null, this)
            },
            playOutAnimation: function() {
                "tablet" === r.device ? TweenMax.fromTo(this.el[0].children[2], 1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }) : TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    this.events.emit("view hidden")
                }, null, this)
            },
            createTweens: function() {
                if ("tablet" === r.device) {
                    this.rouletteAnimation = new TimelineMax({
                        delay: 0,
                        paused: !0
                    });
                    var e = this.articlesNum
                      , t = e
                      , i = "-" + (100 * (e - 1) / e).toString() + "%"
                      , s = t / (e - 1);
                    this.rouletteAnimation.fromTo(this.el[0].children[1].children[1].children[0].children[0], t, {
                        y: "0%"
                    }, {
                        y: i,
                        force3D: !0,
                        ease: Power0.easeNone
                    }, 0);
                    for (var n = 0; e > n; n++)
                        n > 0 && this.rouletteAnimation.fromTo(this.el[0].children[1].children[1].children[0].children[0].children[n], .6, {
                            scale: .9
                        }, {
                            scale: 1,
                            ease: Power1.easeOut
                        }, n * s - .7),
                        e - 1 > n && this.rouletteAnimation.to(this.el[0].children[1].children[1].children[0].children[0].children[n], .6, {
                            scale: .9,
                            ease: Power1.easeIn
                        }, n * s)
                }
                this.scrollAnimatedElements[0].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[0].animation.fromTo(this.el[0].children[1].children[3].children[0], 1.2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0);
                for (var n = 0; n < this.el[0].children[1].children[3].children[1].children[0].children.length; n++)
                    this.scrollAnimatedElements[0].animation.fromTo(this.el[0].children[1].children[3].children[1].children[0].children[n], 1, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, .15 + .1 * n);
                if ("mobile" === r.device)
                    for (var n = 1; n <= this.articles.length; n++)
                        this.scrollAnimatedElements[n].animation = new TimelineMax({
                            delay: 0,
                            paused: !0
                        }),
                        this.scrollAnimatedElements[n].animation.fromTo(this.articles[n - 1], 1.3, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: Power2.easeInOut
                        }, 0)
            },
            scrollHandler: function(e) {
                this.scrollPosition = e.delegateTarget.scrollTop
            },
            scroll: function() {
                if (this.checkAnimatedElements(),
                "tablet" === r.device) {
                    if (this.inner[0].style.transform = "translate3d(0px," + -this.liveScrollPosition.inner + "px, 0px)",
                    this.animateRoulette(),
                    this.scrollPosition === this.lastScrollPosition)
                        return;
                    if (this.scrollPosition < this.rouletteMaxScroll)
                        var e = 0
                          , t = this.scrollPosition / this.rouletteMaxScroll;
                    else
                        var e = this.scrollPosition - this.rouletteMaxScroll
                          , t = 1;
                    TweenMax.to(this.progress[0].children[0], 1.3, {
                        scaleY: t,
                        ease: Power4.easeOut
                    }),
                    TweenMax.to(this.liveScrollPosition, 1.3, {
                        roulette: t,
                        ease: Power4.easeOut
                    }),
                    TweenMax.to(this.liveScrollPosition, 1.3, {
                        inner: e,
                        ease: Power4.easeOut
                    }),
                    this.lastScrollPosition = this.scrollPosition
                }
            },
            animateRoulette: function() {
                this.rouletteAnimation.progress(this.liveScrollPosition.roulette)
            },
            checkAnimatedElements: function() {
                for (var e = 0; e < this.scrollAnimatedElements.length; e++)
                    !this.scrollAnimatedElements[e].shown && this.scrollPosition > this.scrollAnimatedElements[e].point && (this.scrollAnimatedElements[e].shown = !0,
                    this.scrollAnimatedElements[e].animation.play())
            },
            resize: function() {
                if (this.articlesNum = this.articles.length,
                "tablet" === r.device) {
                    this.squareHeight = this.inner.height() / 5,
                    this.articles.css("height", this.squareHeight + "px");
                    var e = .5 * this.squareHeight;
                    this.rouletteMaxScroll = e * this.articlesNum,
                    this.scrollDummy.css("height", 5 * this.squareHeight + this.rouletteMaxScroll + "px"),
                    this.firstLoad ? this.scrollAnimatedElements.push({
                        point: this.rouletteMaxScroll + .5 * this.squareHeight,
                        shown: !1
                    }) : this.scrollAnimatedElements[0].point = this.rouletteMaxScroll + .5 * this.squareHeight
                } else if (this.squareHeight = r.main.height() / 3,
                this.inner.css("height", 5 * this.squareHeight + this.articlesNum * this.squareHeight + "px"),
                this.inner.find(".title").css("height", 4 * this.squareHeight - 1 + "px"),
                this.articles.css("height", this.squareHeight - 1 + "px"),
                this.inner.find("footer").css("height", this.squareHeight + "px"),
                this.firstLoad) {
                    this.scrollAnimatedElements.push({
                        point: (this.articlesNum + 1.4) * this.squareHeight,
                        shown: !1
                    });
                    for (var t = 0; t < this.articles.length; t++)
                        this.scrollAnimatedElements.push({
                            point: this.squareHeight + t * this.squareHeight + .15 * this.squareHeight,
                            shown: !1
                        })
                } else {
                    this.scrollAnimatedElements[0].point = (this.articlesNum + 1.4) * this.squareHeight;
                    for (var t = 0; t < this.articles.length; t++)
                        this.scrollAnimatedElements[t + 1].point = this.squareHeight + t * this.squareHeight + .15 * this.squareHeight
                }
                this.firstLoad = !1
            },
            remove: function() {
                TweenMax.ticker.removeEventListener("tick", this.scroll),
                "tablet" === r.device ? this.scrollCnt.off("scroll") : r.main.off("scroll"),
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../../desktop/utils/cubicbezier": 14,
        "../config/vars": 31,
        "../templates/recognitions_tpl": 39,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery"
    }],
    50: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new a,
            this.services = null,
            this.footer = null,
            this.serviceNumber = 1,
            this.serviceTotal = null,
            this.serviceAction = "next",
            this.control = null,
            this.controlPrev = null,
            this.controlNext = null,
            this.controlNumberCurrent = null,
            this.controlNumberMaxDisplacement = 0,
            this.scrollAnimatedElements = [],
            this.scrollPosition = 0,
            this.isAnimating = !0,
            this.firstLoad = !0
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("eventemitter3"))
          , r = e("../config/vars")
          , o = e("../../desktop/utils/cubicbezier")
          , l = e("../templates/services_tpl");
        s.prototype = {
            constructor: s,
            init: function(e, t, i, s) {
                this.serviceNumber = parseInt(i),
                this.createTemplate(),
                this.selectors(),
                this.serviceTotal = r.pagesData.services.services.length,
                this.resize(),
                this.createTweens(),
                this.playInAnimation()
            },
            createTemplate: function() {
                r.main.html(l.main(this.serviceNumber))
            },
            selectors: function() {
                this.el = n("#container #main section#services"),
                this.services = this.el.find(".service"),
                this.footer = this.el.find("footer"),
                this.control = this.el.find(".control-panel"),
                this.controlPrev = this.control.find(".prev"),
                this.controlNext = this.control.find(".next"),
                this.controlNumberCurrent = this.control.find(".progress span b")
            },
            playInAnimation: function() {
                if (r.menu.icon.removeClass(),
                TweenMax.fromTo(this.el, 1.5, {
                    opacity: 1e-4
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                "tablet" === r.device) {
                    TweenMax.delayedCall(.2, this.animateService, [this.serviceNumber], this),
                    TweenMax.fromTo(this.control, 1.2, {
                        opacity: 0
                    }, {
                        delay: 2,
                        opacity: 1,
                        ease: Power2.easeInOut
                    });
                    var e = 2.5
                } else
                    var e = 1.5;
                TweenMax.delayedCall(e, function() {
                    TweenMax.ticker.addEventListener("tick", this.scroll, this),
                    "tablet" === r.device && (this.controlPrev.on("click", {
                        action: "prev"
                    }, this.navToService.bind(this)),
                    this.controlNext.on("click", {
                        action: "next"
                    }, this.navToService.bind(this))),
                    r.main.on("scroll", this.scrollHandler.bind(this)),
                    this.events.emit("view shown"),
                    this.isAnimating = !1
                }, null, this)
            },
            playOutAnimation: function() {
                TweenMax.to(this.el, 1, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut
                }),
                TweenMax.delayedCall(1, function() {
                    this.events.emit("view hidden")
                }, null, this)
            },
            createTweens: function() {
                this.scrollAnimatedElements[0].animation = new TimelineMax({
                    delay: 0,
                    paused: !0
                }),
                this.scrollAnimatedElements[0].animation.fromTo(this.footer[0].children[0], 1.2, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power2.easeInOut
                }, 0);
                for (var e = 0; e < this.footer[0].children[1].children[0].children.length; e++)
                    this.scrollAnimatedElements[0].animation.fromTo(this.footer[0].children[1].children[0].children[e], 1, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        ease: Power2.easeInOut
                    }, .15 + .1 * e);
                if ("mobile" === r.device)
                    for (var e = 1; 5 > e; e++)
                        this.scrollAnimatedElements[e].animation = new TimelineMax({
                            delay: 0,
                            paused: !0
                        }),
                        this.scrollAnimatedElements[e].animation.fromTo(this.services[e], 1.3, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: Power2.easeInOut
                        }, 0)
            },
            navToService: function(e) {
                if (!this.isAnimating) {
                    if ("next" === e.data.action) {
                        var t = this.serviceNumber === this.serviceTotal ? 1 : this.serviceNumber + 1;
                        this.serviceAction = "next"
                    } else {
                        var t = 1 === this.serviceNumber ? this.serviceTotal : this.serviceNumber - 1;
                        this.serviceAction = "prev"
                    }
                    this.events.emit("view action", "navigate", "/services/" + t)
                }
            },
            changeService: function(e) {
                this.isAnimating || (this.isAnimating = !0,
                this.changeNumber(e),
                this.controlPositionNumber(e),
                this.hideService(this.serviceNumber),
                TweenMax.delayedCall(.8, this.animateService, [e], this),
                TweenMax.delayedCall(2.5, function() {
                    this.serviceNumber = e,
                    this.isAnimating = !1,
                    this.events.emit("service changed")
                }, null, this))
            },
            animateService: function(e) {
                var t = .2;
                TweenMax.set(this.services[e - 1], {
                    visibility: "inherit"
                }),
                1 === e ? (TweenMax.fromTo(this.services[e - 1].children[2].children[1], 1.65, {
                    scaleX: 1
                }, {
                    delay: t + .2,
                    scaleX: 0,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.fromTo(this.services[e - 1].children[2].children[0], 1.65, {
                    scaleX: 1
                }, {
                    delay: t + .45,
                    scaleX: 0,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.fromTo(this.services[e - 1].children[3], 1.5, {
                    x: .2 * r.windowWidth
                }, {
                    delay: t + .6,
                    x: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[3], 1.5, {
                    opacity: 0
                }, {
                    delay: t + .7,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[5], 1.2, {
                    opacity: 0
                }, {
                    delay: t + 1,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[4], 1.2, {
                    opacity: 0
                }, {
                    delay: t + 1.2,
                    opacity: 1,
                    ease: Power2.easeInOut
                })) : 2 === e ? (TweenMax.fromTo(this.services[e - 1].children[2].children[1], 1.65, {
                    scaleX: 1
                }, {
                    delay: t + .2,
                    scaleX: 0,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.fromTo(this.services[e - 1].children[2].children[0], 1.65, {
                    scaleX: 1
                }, {
                    delay: t + .2,
                    scaleX: 0,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.fromTo(this.services[e - 1].children[3], 1.5, {
                    x: .2 * r.windowWidth
                }, {
                    delay: t + .5,
                    x: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[3], 1.5, {
                    opacity: 0
                }, {
                    delay: t + .6,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[5], 1.2, {
                    opacity: 0
                }, {
                    delay: t + 1.2,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[4], 1.2, {
                    opacity: 0
                }, {
                    delay: t + 1,
                    opacity: 1,
                    ease: Power2.easeInOut
                })) : 3 === e ? (TweenMax.fromTo(this.services[e - 1].children[2].children[1], 1.65, {
                    scaleX: 1
                }, {
                    delay: t + .55,
                    scaleX: 0,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.fromTo(this.services[e - 1].children[2].children[0], 1.65, {
                    scaleX: 1
                }, {
                    delay: t + .2,
                    scaleX: 0,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.fromTo(this.services[e - 1].children[3], 1.5, {
                    x: .2 * r.windowWidth
                }, {
                    delay: t + .6,
                    x: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[3], 1.5, {
                    opacity: 0
                }, {
                    delay: t + .7,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[5], 1.2, {
                    opacity: 0
                }, {
                    delay: t + 1,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[4], 1.2, {
                    opacity: 0
                }, {
                    delay: t + 1.2,
                    opacity: 1,
                    ease: Power2.easeInOut
                })) : 4 === e ? (TweenMax.fromTo(this.services[e - 1].children[2].children[1], 1.65, {
                    scaleX: 1
                }, {
                    delay: t + .45,
                    scaleX: 0,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.fromTo(this.services[e - 1].children[2].children[0], 1.65, {
                    scaleX: 1
                }, {
                    delay: t + .2,
                    scaleX: 0,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.fromTo(this.services[e - 1].children[3], 1.5, {
                    x: .2 * r.windowWidth
                }, {
                    delay: t + .8,
                    x: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[3], 1.5, {
                    opacity: 0
                }, {
                    delay: t + .9,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[5], 1.2, {
                    opacity: 0
                }, {
                    delay: t + 1.3,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[4], 1.2, {
                    opacity: 0
                }, {
                    delay: t + 1.5,
                    opacity: 1,
                    ease: Power2.easeInOut
                })) : 5 === e && (TweenMax.fromTo(this.services[e - 1].children[2].children[1], 1.65, {
                    scaleX: 1
                }, {
                    delay: t + .2,
                    scaleX: 0,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.fromTo(this.services[e - 1].children[2].children[0], 1.65, {
                    scaleX: 1
                }, {
                    delay: t + .2,
                    scaleX: 0,
                    ease: o.get("homeStateChange")
                }),
                TweenMax.fromTo(this.services[e - 1].children[3], 1.5, {
                    x: .2 * r.windowWidth
                }, {
                    delay: t + .5,
                    x: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[3], 1.5, {
                    opacity: 0
                }, {
                    delay: t + .6,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[5], 1.2, {
                    opacity: 0
                }, {
                    delay: t + 1.2,
                    opacity: 1,
                    ease: Power2.easeInOut
                }),
                TweenMax.fromTo(this.services[e - 1].children[4], 1.2, {
                    opacity: 0
                }, {
                    delay: t + 1,
                    opacity: 1,
                    ease: Power2.easeInOut
                }))
            },
            hideService: function(e) {
                TweenMax.to(this.services[e - 1], .8, {
                    opacity: 0,
                    ease: Power2.easeOut
                }),
                TweenMax.delayedCall(.8, function() {
                    TweenMax.set([this.services[e - 1], this.services[e - 1].children[2].children, this.services[e - 1].children[3], this.services[e - 1].children[4], this.services[e - 1].children[5]], {
                        clearProps: "all"
                    })
                }, null, this)
            },
            changeNumber: function(e) {
                TweenMax.to(this.controlNumberCurrent, .6, {
                    opacity: 0,
                    ease: Power2.easeOut,
                    onCompleteScope: this,
                    onComplete: function() {
                        this.controlNumberCurrent.html(e.toString())
                    }
                }),
                TweenMax.to(this.controlNumberCurrent, 1.4, {
                    delay: .6,
                    opacity: 1,
                    ease: Power2.easeOut
                })
            },
            controlPositionNumber: function(e) {
                if ("undefined" == typeof e)
                    var e = this.serviceNumber
                      , t = 0;
                else
                    var t = 2;
                var i = this.controlNumberMaxDisplacement / (this.serviceTotal - 1) * (e - 1);
                "number" != typeof i && (i = 0),
                TweenMax.to(this.control[0].children[2], t, {
                    x: i,
                    ease: Power3.easeInOut
                })
            },
            scrollHandler: function(e) {
                this.scrollPosition = e.delegateTarget.scrollTop
            },
            scroll: function() {
                this.checkAnimatedElements()
            },
            checkAnimatedElements: function() {
                for (var e = 0; e < this.scrollAnimatedElements.length; e++)
                    !this.scrollAnimatedElements[e].shown && this.scrollPosition > this.scrollAnimatedElements[e].point && (this.scrollAnimatedElements[e].shown = !0,
                    this.scrollAnimatedElements[e].animation.play())
            },
            resize: function() {
                "tablet" === r.device && (this.controlNumberMaxDisplacement = .5 * r.windowWidth + .062 * r.windowHeight + 2 - .215 * r.windowHeight,
                this.controlPositionNumber());
                var e = "tablet" === r.device ? .2 * this.el.height() : .0625 * this.el.height();
                if (this.firstLoad)
                    if ("tablet" === r.device)
                        this.scrollAnimatedElements.push({
                            point: .4 * e,
                            shown: !1
                        });
                    else {
                        this.scrollAnimatedElements.push({
                            point: 12.4 * e,
                            shown: !1
                        });
                        for (var t = 0; 4 > t; t++)
                            this.scrollAnimatedElements.push({
                                point: 3 * e * t + .25 * e,
                                shown: !1
                            })
                    }
                else {
                    if ("tablet" === r.device)
                        this.scrollAnimatedElements[0].point = .4 * e;
                    else {
                        this.scrollAnimatedElements[0].point = 12.4 * e;
                        for (var t = 0; 4 > t; t++)
                            this.scrollAnimatedElements[t + 1].point = 3 * e * t + .25 * e
                    }
                    this.scroll()
                }
            },
            remove: function() {
                TweenMax.ticker.removeEventListener("tick", this.scroll),
                "tablet" === r.device && (this.controlPrev.off("click"),
                this.controlNext.off("click")),
                r.main.off("scroll"),
                this.events.off("view action"),
                this.playOutAnimation()
            }
        },
        t.exports = s
    }
    , {
        "../../desktop/utils/cubicbezier": 14,
        "../config/vars": 31,
        "../templates/services_tpl": 40,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery"
    }],
    51: [function(e, t, i) {
        "use strict";
        function s() {
            this.el = null,
            this.events = new a,
            this.icon = null,
            this.cnt = null,
            this.close = null,
            this.name = null,
            this.info = null,
            this.links = null,
            this.lang = null,
            this.languages = null,
            this.isAnimating = !1,
            this.isShown = !1,
            this.init()
        }
        var n = e("jquery")
          , a = (e("gsap"),
        e("eventemitter3"))
          , r = e("../../config/vars")
          , o = e("../../../desktop/utils/cubicbezier")
          , l = e("../../templates/ui/menu_tpl");
        s.prototype = {
            constructor: s,
            init: function() {
                this.createTemplate(),
                this.selectors(),
                this.bindEvents(),
                TweenMax.set([this.links, this.close], {
                    zIndex: 55
                })
            },
            createTemplate: function() {
                r.main.after(l.main())
            },
            selectors: function() {
                this.el = n("#container #menu"),
                this.icon = this.el.find("#icon"),
                this.cnt = this.el.find(".cnt"),
                this.close = this.cnt.find(".close"),
                this.name = this.cnt.find(".name"),
                this.info = this.cnt.find(".info"),
                this.links = this.cnt.find("ul li a"),
                this.lang = this.cnt.find(".lang"),
                this.languages = this.lang.find(".language")
            },
            bindEvents: function() {
                this.icon.on("click", this.showMenu.bind(this)),
                this.close.on("click", this.playOutAnimation.bind(this)),
                this.links.on("click", this.clickLink.bind(this)),
                this.languages.on("click", this.changeLanguage.bind(this))
            },
            unbindEvents: function() {
                this.icon.off("click"),
                this.close.off("click"),
                this.links.off("click"),
                this.languages.off("click")
            },
            showMenu: function() {
                this.isShown || this.playInAnimation()
            },
            playInAnimation: function() {
                if (!this.isAnimating) {
                    if (this.isAnimating = !0,
                    this.isShown = !0,
                    this.el.removeClass().addClass("active"),
                    "tablet" === r.device) {
                        TweenMax.to(this.icon, .3, {
                            autoAlpha: 0,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.fromTo(this.cnt, .8, {
                            autoAlpha: 0
                        }, {
                            autoAlpha: 1,
                            ease: Power2.easeInOut
                        });
                        var e = 1
                          , t = .1;
                        TweenMax.fromTo(this.name, e, {
                            opacity: 0
                        }, {
                            delay: 1 * t,
                            opacity: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.fromTo(this.links[0], e, {
                            opacity: 0
                        }, {
                            delay: 2 * t,
                            opacity: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.fromTo(this.links[0], e, {
                            scale: .7
                        }, {
                            delay: 2.2 * t,
                            scale: 1,
                            ease: Back.easeOut.config(2)
                        }),
                        TweenMax.fromTo(this.links[2], e, {
                            opacity: 0
                        }, {
                            delay: 3 * t,
                            opacity: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.fromTo(this.links[2], e, {
                            scale: .7
                        }, {
                            delay: 3.2 * t,
                            scale: 1,
                            ease: Back.easeOut.config(2)
                        }),
                        TweenMax.fromTo(this.links[4], e, {
                            opacity: 0
                        }, {
                            delay: 4 * t,
                            opacity: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.fromTo(this.links[4], e, {
                            scale: .7
                        }, {
                            delay: 4.2 * t,
                            scale: 1,
                            ease: Back.easeOut.config(2)
                        }),
                        TweenMax.fromTo(this.links[1], e, {
                            opacity: 0
                        }, {
                            delay: 5 * t,
                            opacity: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.fromTo(this.links[1], e, {
                            scale: .7
                        }, {
                            delay: 5.2 * t,
                            scale: 1,
                            ease: Back.easeOut.config(2)
                        }),
                        TweenMax.fromTo(this.links[3], e, {
                            opacity: 0
                        }, {
                            delay: 6 * t,
                            opacity: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.fromTo(this.links[3], e, {
                            scale: .7
                        }, {
                            delay: 6.2 * t,
                            scale: 1,
                            ease: Back.easeOut.config(2)
                        }),
                        TweenMax.fromTo(this.info, e + 1, {
                            opacity: 0
                        }, {
                            delay: 5.5 * t,
                            opacity: 1,
                            ease: Power2.easeInOut
                        }),
                        TweenMax.fromTo(this.close, 1, {
                            scale: 0
                        }, {
                            delay: .4,
                            scale: 1,
                            ease: Power3.easeOut
                        }),
                        TweenMax.fromTo(this.close, 1.1, {
                            rotation: "-500deg"
                        }, {
                            delay: .4,
                            rotation: "0deg",
                            ease: Power3.easeOut
                        }),
                        TweenMax.fromTo(this.lang, 1, {
                            opacity: 0
                        }, {
                            delay: .7,
                            opacity: 1,
                            ease: Power2.easeInOut
                        })
                    } else {
                        TweenMax.fromTo(this.cnt, 1, {
                            autoAlpha: 1,
                            x: "0%"
                        }, {
                            x: "100%",
                            ease: o.get("homeStateChange")
                        });
                        for (var i = 0, s = .4, n = 0; i < this.links.length; i++)
                            TweenMax.fromTo(this.links[i], .72 + n, {
                                x: .4 * r.windowWidth
                            }, {
                                delay: s,
                                x: 0,
                                ease: Power2.easeOut
                            }),
                            TweenMax.fromTo(this.links[i], .8 + n, {
                                opacity: 0
                            }, {
                                delay: s,
                                opacity: 1,
                                ease: Power2.easeInOut
                            }),
                            n += .01,
                            s = s + .06 - .01 * i;
                        TweenMax.fromTo(this.close, 1, {
                            scale: 0
                        }, {
                            delay: .7,
                            scale: 1,
                            ease: Power3.easeOut
                        }),
                        TweenMax.fromTo(this.close, 1.1, {
                            rotation: "-500deg"
                        }, {
                            delay: .7,
                            rotation: "0deg",
                            ease: Power3.easeOut
                        }),
                        TweenMax.fromTo(this.lang, 1, {
                            opacity: 0
                        }, {
                            delay: .9,
                            opacity: 1,
                            ease: Power2.easeInOut
                        })
                    }
                    TweenMax.delayedCall(1, function() {
                        this.isAnimating = !1
                    }, null, this)
                }
            },
            playOutAnimation: function() {
                this.isShown && !this.isAnimating && (this.isAnimating = !0,
                this.el.removeClass(),
                "tablet" === r.device ? (TweenMax.fromTo(this.cnt, .6, {
                    autoAlpha: 1
                }, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut,
                    overwrite: "all"
                }),
                TweenMax.to(this.icon, .3, {
                    delay: .3,
                    autoAlpha: 1,
                    ease: Power2.easeInOut,
                    overwrite: "all"
                })) : (TweenMax.to(this.cnt, 1, {
                    x: "0%",
                    ease: o.get("homeStateChange"),
                    overwrite: "all"
                }),
                TweenMax.set(this.cnt, {
                    delay: 1.01,
                    clearProps: "all"
                })),
                TweenMax.delayedCall(1, function() {
                    this.isAnimating = !1,
                    this.isShown = !1
                }, null, this))
            },
            clickLink: function() {
                this.isShown && this.playOutAnimation()
            },
            changeLanguage: function(e) {
                this.events.emit("view action", "change laguage", e.delegateTarget.dataset.lang)
            },
            resetMenu: function() {
                this.playOutAnimation(),
                TweenMax.to(this.icon, .8, {
                    autoAlpha: 0,
                    ease: Power2.easeInOut,
                    overwrite: "all"
                }),
                TweenMax.delayedCall(1.05, function() {
                    this.unbindEvents(),
                    this.el.remove(),
                    this.init()
                }, null, this)
            }
        },
        t.exports = s
    }
    , {
        "../../../desktop/utils/cubicbezier": 14,
        "../../config/vars": 31,
        "../../templates/ui/menu_tpl": 41,
        eventemitter3: "eventemitter3",
        gsap: "gsap",
        jquery: "jquery"
    }]
}, {}, [29]);
