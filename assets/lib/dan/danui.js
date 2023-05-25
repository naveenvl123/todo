!(function (c, l) {
  "object" == typeof exports && "undefined" != typeof module
    ? l(exports, require("jquery"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery"], l)
    : l(((c = c || self).bootstrap = {}), c.jQuery);
})(this, function (c, l) {
  "use strict";
  function h(c, l) {
    for (var h = 0; h < l.length; h++) {
      var v = l[h];
      (v.enumerable = v.enumerable || !1), (v.configurable = !0), "value" in v && (v.writable = !0), Object.defineProperty(c, v.key, v);
    }
  }
  function v(c, l, v) {
    return l && h(c.prototype, l), v && h(c, v), c;
  }
  function e(c, l) {
    var h = Object.keys(c);
    if (Object.getOwnPropertySymbols) {
      var v = Object.getOwnPropertySymbols(c);
      l &&
        (v = v.filter(function (l) {
          return Object.getOwnPropertyDescriptor(c, l).enumerable;
        })),
        h.push.apply(h, v);
    }
    return h;
  }
  function t(c) {
    for (var l = 1; l < arguments.length; l++) {
      var h = null != arguments[l] ? arguments[l] : {};
      l % 2
        ? e(Object(h), !0).forEach(function (l) {
            var v, e, t;
            (v = c), (t = h[(e = l)]), e in v ? Object.defineProperty(v, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : (v[e] = t);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(c, Object.getOwnPropertyDescriptors(h))
        : e(Object(h)).forEach(function (l) {
            Object.defineProperty(c, l, Object.getOwnPropertyDescriptor(h, l));
          });
    }
    return c;
  }
  l = l && l.hasOwnProperty("default") ? l.default : l;
  var z = "transitionend";
  var a = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function (c) {
      for (; (c += ~~(1e6 * Math.random())), document.getElementById(c); );
      return c;
    },
    getSelectorFromElement: function (c) {
      var l = c.getAttribute("data-target");
      if (!l || "#" === l) {
        var h = c.getAttribute("href");
        l = h && "#" !== h ? h.trim() : "";
      }
      try {
        return document.querySelector(l) ? l : null;
      } catch (c) {
        return null;
      }
    },
    getTransitionDurationFromElement: function (c) {
      if (!c) return 0;
      var h = l(c).css("transition-duration"),
        v = l(c).css("transition-delay"),
        e = parseFloat(h),
        t = parseFloat(v);
      return e || t ? ((h = h.split(",")[0]), (v = v.split(",")[0]), 1e3 * (parseFloat(h) + parseFloat(v))) : 0;
    },
    reflow: function (c) {
      return c.offsetHeight;
    },
    triggerTransitionEnd: function (c) {
      l(c).trigger(z);
    },
    supportsTransitionEnd: function () {
      return Boolean(z);
    },
    isElement: function (c) {
      return (c[0] || c).nodeType;
    },
    typeCheckConfig: function (c, l, h) {
      for (var v in h)
        if (Object.prototype.hasOwnProperty.call(h, v)) {
          var e = h[v],
            t = l[v],
            z =
              t && a.isElement(t)
                ? "element"
                : ((s = t),
                  {}.toString
                    .call(s)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase());
          if (!new RegExp(e).test(z)) throw new Error(c.toUpperCase() + ': Option "' + v + '" provided type "' + z + '" but expected type "' + e + '".');
        }
      var s;
    },
    findShadowRoot: function (c) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" != typeof c.getRootNode) return c instanceof ShadowRoot ? c : c.parentNode ? a.findShadowRoot(c.parentNode) : null;
      var l = c.getRootNode();
      return l instanceof ShadowRoot ? l : null;
    },
    jQueryDetection: function () {
      if (void 0 === l) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
      var c = l.fn.jquery.split(" ")[0].split(".");
      if ((c[0] < 2 && c[1] < 9) || (1 === c[0] && 9 === c[1] && c[2] < 1) || 4 <= c[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
    },
  };
  a.jQueryDetection(),
    (l.fn.emulateTransitionEnd = function (c) {
      var h = this,
        v = !1;
      return (
        l(this).one(a.TRANSITION_END, function () {
          v = !0;
        }),
        setTimeout(function () {
          v || a.triggerTransitionEnd(h);
        }, c),
        this
      );
    }),
    (l.event.special[a.TRANSITION_END] = {
      bindType: z,
      delegateType: z,
      handle: function (c) {
        if (l(c.target).is(this)) return c.handleObj.handler.apply(this, arguments);
      },
    });
  var s = "alert",
    m = "bs.alert",
    n = "." + m,
    r = l.fn[s],
    i = { CLOSE: "close" + n, CLOSED: "closed" + n, CLICK_DATA_API: "click" + n + ".data-api" },
    o = (function () {
      function c(c) {
        this._element = c;
      }
      var h = c.prototype;
      return (
        (h.close = function (c) {
          var l = this._element;
          c && (l = this._getRootElement(c)), this._triggerCloseEvent(l).isDefaultPrevented() || this._removeElement(l);
        }),
        (h.dispose = function () {
          l.removeData(this._element, m), (this._element = null);
        }),
        (h._getRootElement = function (c) {
          var h = a.getSelectorFromElement(c),
            v = !1;
          return h && (v = document.querySelector(h)), v || l(c).closest(".alert")[0];
        }),
        (h._triggerCloseEvent = function (c) {
          var h = l.Event(i.CLOSE);
          return l(c).trigger(h), h;
        }),
        (h._removeElement = function (c) {
          var h = this;
          if ((l(c).removeClass("show"), l(c).hasClass("fade"))) {
            var v = a.getTransitionDurationFromElement(c);
            l(c)
              .one(a.TRANSITION_END, function (l) {
                return h._destroyElement(c, l);
              })
              .emulateTransitionEnd(v);
          } else this._destroyElement(c);
        }),
        (h._destroyElement = function (c) {
          l(c).detach().trigger(i.CLOSED).remove();
        }),
        (c._jQueryInterface = function (h) {
          return this.each(function () {
            var v = l(this),
              e = v.data(m);
            e || ((e = new c(this)), v.data(m, e)), "close" === h && e[h](this);
          });
        }),
        (c._handleDismiss = function (c) {
          return function (l) {
            l && l.preventDefault(), c.close(this);
          };
        }),
        v(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
        ]),
        c
      );
    })();
  l(document).on(i.CLICK_DATA_API, '[data-dismiss="alert"]', o._handleDismiss(new o())),
    (l.fn[s] = o._jQueryInterface),
    (l.fn[s].Constructor = o),
    (l.fn[s].noConflict = function () {
      return (l.fn[s] = r), o._jQueryInterface;
    });
  var f = "button",
    H = "bs.button",
    M = "." + H,
    V = ".data-api",
    C = l.fn[f],
    L = "active",
    d = '[data-toggle^="button"]',
    u = 'input:not([type="hidden"])',
    p = ".btn",
    g = { CLICK_DATA_API: "click" + M + V, FOCUS_BLUR_DATA_API: "focus" + M + V + " blur" + M + V, LOAD_DATA_API: "load" + M + V },
    b = (function () {
      function c(c) {
        this._element = c;
      }
      var h = c.prototype;
      return (
        (h.toggle = function () {
          var c = !0,
            h = !0,
            v = l(this._element).closest('[data-toggle="buttons"]')[0];
          if (v) {
            var e = this._element.querySelector(u);
            if (e) {
              if ("radio" === e.type)
                if (e.checked && this._element.classList.contains(L)) c = !1;
                else {
                  var t = v.querySelector(".active");
                  t && l(t).removeClass(L);
                }
              else "checkbox" === e.type ? "LABEL" === this._element.tagName && e.checked === this._element.classList.contains(L) && (c = !1) : (c = !1);
              c && ((e.checked = !this._element.classList.contains(L)), l(e).trigger("change")), e.focus(), (h = !1);
            }
          }
          this._element.hasAttribute("disabled") ||
            this._element.classList.contains("disabled") ||
            (h && this._element.setAttribute("aria-pressed", !this._element.classList.contains(L)), c && l(this._element).toggleClass(L));
        }),
        (h.dispose = function () {
          l.removeData(this._element, H), (this._element = null);
        }),
        (c._jQueryInterface = function (h) {
          return this.each(function () {
            var v = l(this).data(H);
            v || ((v = new c(this)), l(this).data(H, v)), "toggle" === h && v[h]();
          });
        }),
        v(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
        ]),
        c
      );
    })();
  l(document)
    .on(g.CLICK_DATA_API, d, function (c) {
      var h = c.target;
      if ((l(h).hasClass("btn") || (h = l(h).closest(p)[0]), !h || h.hasAttribute("disabled") || h.classList.contains("disabled"))) c.preventDefault();
      else {
        var v = h.querySelector(u);
        if (v && (v.hasAttribute("disabled") || v.classList.contains("disabled"))) return void c.preventDefault();
        b._jQueryInterface.call(l(h), "toggle");
      }
    })
    .on(g.FOCUS_BLUR_DATA_API, d, function (c) {
      var h = l(c.target).closest(p)[0];
      l(h).toggleClass("focus", /^focus(in)?$/.test(c.type));
    }),
    l(window).on(g.LOAD_DATA_API, function () {
      for (var c = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), l = 0, h = c.length; l < h; l++) {
        var v = c[l],
          e = v.querySelector(u);
        e.checked || e.hasAttribute("checked") ? v.classList.add(L) : v.classList.remove(L);
      }
      for (var t = 0, z = (c = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; t < z; t++) {
        var a = c[t];
        "true" === a.getAttribute("aria-pressed") ? a.classList.add(L) : a.classList.remove(L);
      }
    }),
    (l.fn[f] = b._jQueryInterface),
    (l.fn[f].Constructor = b),
    (l.fn[f].noConflict = function () {
      return (l.fn[f] = C), b._jQueryInterface;
    });
  var w = "carousel",
    y = "bs.carousel",
    _ = "." + y,
    S = ".data-api",
    A = l.fn[w],
    k = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0 },
    E = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean", touch: "boolean" },
    x = "next",
    T = "prev",
    D = {
      SLIDE: "slide" + _,
      SLID: "slid" + _,
      KEYDOWN: "keydown" + _,
      MOUSEENTER: "mouseenter" + _,
      MOUSELEAVE: "mouseleave" + _,
      TOUCHSTART: "touchstart" + _,
      TOUCHMOVE: "touchmove" + _,
      TOUCHEND: "touchend" + _,
      POINTERDOWN: "pointerdown" + _,
      POINTERUP: "pointerup" + _,
      DRAG_START: "dragstart" + _,
      LOAD_DATA_API: "load" + _ + S,
      CLICK_DATA_API: "click" + _ + S,
    },
    O = "active",
    N = ".active.carousel-item",
    I = ".carousel-indicators",
    q = { TOUCH: "touch", PEN: "pen" },
    j = (function () {
      function c(c, l) {
        (this._items = null),
          (this._interval = null),
          (this._activeElement = null),
          (this._isPaused = !1),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this.touchStartX = 0),
          (this.touchDeltaX = 0),
          (this._config = this._getConfig(l)),
          (this._element = c),
          (this._indicatorsElement = this._element.querySelector(I)),
          (this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints),
          (this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent)),
          this._addEventListeners();
      }
      var h = c.prototype;
      return (
        (h.next = function () {
          this._isSliding || this._slide(x);
        }),
        (h.nextWhenVisible = function () {
          !document.hidden && l(this._element).is(":visible") && "hidden" !== l(this._element).css("visibility") && this.next();
        }),
        (h.prev = function () {
          this._isSliding || this._slide(T);
        }),
        (h.pause = function (c) {
          c || (this._isPaused = !0),
            this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (a.triggerTransitionEnd(this._element), this.cycle(!0)),
            clearInterval(this._interval),
            (this._interval = null);
        }),
        (h.cycle = function (c) {
          c || (this._isPaused = !1),
            this._interval && (clearInterval(this._interval), (this._interval = null)),
            this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
        }),
        (h.to = function (c) {
          var h = this;
          this._activeElement = this._element.querySelector(N);
          var v = this._getItemIndex(this._activeElement);
          if (!(c > this._items.length - 1 || c < 0))
            if (this._isSliding)
              l(this._element).one(D.SLID, function () {
                return h.to(c);
              });
            else {
              if (v === c) return this.pause(), void this.cycle();
              var e = v < c ? x : T;
              this._slide(e, this._items[c]);
            }
        }),
        (h.dispose = function () {
          l(this._element).off(_),
            l.removeData(this._element, y),
            (this._items = null),
            (this._config = null),
            (this._element = null),
            (this._interval = null),
            (this._isPaused = null),
            (this._isSliding = null),
            (this._activeElement = null),
            (this._indicatorsElement = null);
        }),
        (h._getConfig = function (c) {
          return (c = t({}, k, {}, c)), a.typeCheckConfig(w, c, E), c;
        }),
        (h._handleSwipe = function () {
          var c = Math.abs(this.touchDeltaX);
          if (!(c <= 40)) {
            var l = c / this.touchDeltaX;
            (this.touchDeltaX = 0) < l && this.prev(), l < 0 && this.next();
          }
        }),
        (h._addEventListeners = function () {
          var c = this;
          this._config.keyboard &&
            l(this._element).on(D.KEYDOWN, function (l) {
              return c._keydown(l);
            }),
            "hover" === this._config.pause &&
              l(this._element)
                .on(D.MOUSEENTER, function (l) {
                  return c.pause(l);
                })
                .on(D.MOUSELEAVE, function (l) {
                  return c.cycle(l);
                }),
            this._config.touch && this._addTouchEventListeners();
        }),
        (h._addTouchEventListeners = function () {
          var c = this;
          if (this._touchSupported) {
            var h = function (l) {
                c._pointerEvent && q[l.originalEvent.pointerType.toUpperCase()] ? (c.touchStartX = l.originalEvent.clientX) : c._pointerEvent || (c.touchStartX = l.originalEvent.touches[0].clientX);
              },
              v = function (l) {
                c._pointerEvent && q[l.originalEvent.pointerType.toUpperCase()] && (c.touchDeltaX = l.originalEvent.clientX - c.touchStartX),
                  c._handleSwipe(),
                  "hover" === c._config.pause &&
                    (c.pause(),
                    c.touchTimeout && clearTimeout(c.touchTimeout),
                    (c.touchTimeout = setTimeout(function (l) {
                      return c.cycle(l);
                    }, 500 + c._config.interval)));
              };
            l(this._element.querySelectorAll(".carousel-item img")).on(D.DRAG_START, function (c) {
              return c.preventDefault();
            }),
              this._pointerEvent
                ? (l(this._element).on(D.POINTERDOWN, function (c) {
                    return h(c);
                  }),
                  l(this._element).on(D.POINTERUP, function (c) {
                    return v(c);
                  }),
                  this._element.classList.add("pointer-event"))
                : (l(this._element).on(D.TOUCHSTART, function (c) {
                    return h(c);
                  }),
                  l(this._element).on(D.TOUCHMOVE, function (l) {
                    return (function (l) {
                      l.originalEvent.touches && 1 < l.originalEvent.touches.length ? (c.touchDeltaX = 0) : (c.touchDeltaX = l.originalEvent.touches[0].clientX - c.touchStartX);
                    })(l);
                  }),
                  l(this._element).on(D.TOUCHEND, function (c) {
                    return v(c);
                  }));
          }
        }),
        (h._keydown = function (c) {
          if (!/input|textarea/i.test(c.target.tagName))
            switch (c.which) {
              case 37:
                c.preventDefault(), this.prev();
                break;
              case 39:
                c.preventDefault(), this.next();
            }
        }),
        (h._getItemIndex = function (c) {
          return (this._items = c && c.parentNode ? [].slice.call(c.parentNode.querySelectorAll(".carousel-item")) : []), this._items.indexOf(c);
        }),
        (h._getItemByDirection = function (c, l) {
          var h = c === x,
            v = c === T,
            e = this._getItemIndex(l),
            t = this._items.length - 1;
          if (((v && 0 === e) || (h && e === t)) && !this._config.wrap) return l;
          var z = (e + (c === T ? -1 : 1)) % this._items.length;
          return -1 == z ? this._items[this._items.length - 1] : this._items[z];
        }),
        (h._triggerSlideEvent = function (c, h) {
          var v = this._getItemIndex(c),
            e = this._getItemIndex(this._element.querySelector(N)),
            t = l.Event(D.SLIDE, { relatedTarget: c, direction: h, from: e, to: v });
          return l(this._element).trigger(t), t;
        }),
        (h._setActiveIndicatorElement = function (c) {
          if (this._indicatorsElement) {
            var h = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
            l(h).removeClass(O);
            var v = this._indicatorsElement.children[this._getItemIndex(c)];
            v && l(v).addClass(O);
          }
        }),
        (h._slide = function (c, h) {
          var v,
            e,
            t,
            z = this,
            s = this._element.querySelector(N),
            m = this._getItemIndex(s),
            n = h || (s && this._getItemByDirection(c, s)),
            r = this._getItemIndex(n),
            i = Boolean(this._interval);
          if (((t = c === x ? ((v = "carousel-item-left"), (e = "carousel-item-next"), "left") : ((v = "carousel-item-right"), (e = "carousel-item-prev"), "right")), n && l(n).hasClass(O)))
            this._isSliding = !1;
          else if (!this._triggerSlideEvent(n, t).isDefaultPrevented() && s && n) {
            (this._isSliding = !0), i && this.pause(), this._setActiveIndicatorElement(n);
            var o = l.Event(D.SLID, { relatedTarget: n, direction: t, from: m, to: r });
            if (l(this._element).hasClass("slide")) {
              l(n).addClass(e), a.reflow(n), l(s).addClass(v), l(n).addClass(v);
              var f = parseInt(n.getAttribute("data-interval"), 10);
              f
                ? ((this._config.defaultInterval = this._config.defaultInterval || this._config.interval), (this._config.interval = f))
                : (this._config.interval = this._config.defaultInterval || this._config.interval);
              var H = a.getTransitionDurationFromElement(s);
              l(s)
                .one(a.TRANSITION_END, function () {
                  l(n)
                    .removeClass(v + " " + e)
                    .addClass(O),
                    l(s).removeClass(O + " " + e + " " + v),
                    (z._isSliding = !1),
                    setTimeout(function () {
                      return l(z._element).trigger(o);
                    }, 0);
                })
                .emulateTransitionEnd(H);
            } else l(s).removeClass(O), l(n).addClass(O), (this._isSliding = !1), l(this._element).trigger(o);
            i && this.cycle();
          }
        }),
        (c._jQueryInterface = function (h) {
          return this.each(function () {
            var v = l(this).data(y),
              e = t({}, k, {}, l(this).data());
            "object" == typeof h && (e = t({}, e, {}, h));
            var z = "string" == typeof h ? h : e.slide;
            if ((v || ((v = new c(this, e)), l(this).data(y, v)), "number" == typeof h)) v.to(h);
            else if ("string" == typeof z) {
              if (void 0 === v[z]) throw new TypeError('No method named "' + z + '"');
              v[z]();
            } else e.interval && e.ride && (v.pause(), v.cycle());
          });
        }),
        (c._dataApiClickHandler = function (h) {
          var v = a.getSelectorFromElement(this);
          if (v) {
            var e = l(v)[0];
            if (e && l(e).hasClass("carousel")) {
              var z = t({}, l(e).data(), {}, l(this).data()),
                s = this.getAttribute("data-slide-to");
              s && (z.interval = !1), c._jQueryInterface.call(l(e), z), s && l(e).data(y).to(s), h.preventDefault();
            }
          }
        }),
        v(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return k;
            },
          },
        ]),
        c
      );
    })();
  l(document).on(D.CLICK_DATA_API, "[data-slide], [data-slide-to]", j._dataApiClickHandler),
    l(window).on(D.LOAD_DATA_API, function () {
      for (var c = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), h = 0, v = c.length; h < v; h++) {
        var e = l(c[h]);
        j._jQueryInterface.call(e, e.data());
      }
    }),
    (l.fn[w] = j._jQueryInterface),
    (l.fn[w].Constructor = j),
    (l.fn[w].noConflict = function () {
      return (l.fn[w] = A), j._jQueryInterface;
    });
  var P = "collapse",
    R = "bs.collapse",
    F = "." + R,
    U = l.fn[P],
    W = { toggle: !0, parent: "" },
    B = { toggle: "boolean", parent: "(string|element)" },
    K = { SHOW: "show" + F, SHOWN: "shown" + F, HIDE: "hide" + F, HIDDEN: "hidden" + F, CLICK_DATA_API: "click" + F + ".data-api" },
    Q = "show",
    Y = "collapse",
    X = "collapsing",
    Z = "collapsed",
    G = '[data-toggle="collapse"]',
    $ = (function () {
      function c(c, l) {
        (this._isTransitioning = !1),
          (this._element = c),
          (this._config = this._getConfig(l)),
          (this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + c.id + '"],[data-toggle="collapse"][data-target="#' + c.id + '"]')));
        for (var h = [].slice.call(document.querySelectorAll(G)), v = 0, e = h.length; v < e; v++) {
          var t = h[v],
            z = a.getSelectorFromElement(t),
            s = [].slice.call(document.querySelectorAll(z)).filter(function (l) {
              return l === c;
            });
          null !== z && 0 < s.length && ((this._selector = z), this._triggerArray.push(t));
        }
        (this._parent = this._config.parent ? this._getParent() : null), this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
      }
      var h = c.prototype;
      return (
        (h.toggle = function () {
          l(this._element).hasClass(Q) ? this.hide() : this.show();
        }),
        (h.show = function () {
          var h,
            v,
            e = this;
          if (
            !(
              this._isTransitioning ||
              l(this._element).hasClass(Q) ||
              (this._parent &&
                0 ===
                  (h = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function (c) {
                    return "string" == typeof e._config.parent ? c.getAttribute("data-parent") === e._config.parent : c.classList.contains(Y);
                  })).length &&
                (h = null),
              h && (v = l(h).not(this._selector).data(R)) && v._isTransitioning)
            )
          ) {
            var t = l.Event(K.SHOW);
            if ((l(this._element).trigger(t), !t.isDefaultPrevented())) {
              h && (c._jQueryInterface.call(l(h).not(this._selector), "hide"), v || l(h).data(R, null));
              var z = this._getDimension();
              l(this._element).removeClass(Y).addClass(X),
                (this._element.style[z] = 0),
                this._triggerArray.length && l(this._triggerArray).removeClass(Z).attr("aria-expanded", !0),
                this.setTransitioning(!0);
              var s = "scroll" + (z[0].toUpperCase() + z.slice(1)),
                m = a.getTransitionDurationFromElement(this._element);
              l(this._element)
                .one(a.TRANSITION_END, function () {
                  l(e._element).removeClass(X).addClass(Y).addClass(Q), (e._element.style[z] = ""), e.setTransitioning(!1), l(e._element).trigger(K.SHOWN);
                })
                .emulateTransitionEnd(m),
                (this._element.style[z] = this._element[s] + "px");
            }
          }
        }),
        (h.hide = function () {
          var c = this;
          if (!this._isTransitioning && l(this._element).hasClass(Q)) {
            var h = l.Event(K.HIDE);
            if ((l(this._element).trigger(h), !h.isDefaultPrevented())) {
              var v = this._getDimension();
              (this._element.style[v] = this._element.getBoundingClientRect()[v] + "px"), a.reflow(this._element), l(this._element).addClass(X).removeClass(Y).removeClass(Q);
              var e = this._triggerArray.length;
              if (0 < e)
                for (var t = 0; t < e; t++) {
                  var z = this._triggerArray[t],
                    s = a.getSelectorFromElement(z);
                  null !== s && (l([].slice.call(document.querySelectorAll(s))).hasClass(Q) || l(z).addClass(Z).attr("aria-expanded", !1));
                }
              this.setTransitioning(!0), (this._element.style[v] = "");
              var m = a.getTransitionDurationFromElement(this._element);
              l(this._element)
                .one(a.TRANSITION_END, function () {
                  c.setTransitioning(!1), l(c._element).removeClass(X).addClass(Y).trigger(K.HIDDEN);
                })
                .emulateTransitionEnd(m);
            }
          }
        }),
        (h.setTransitioning = function (c) {
          this._isTransitioning = c;
        }),
        (h.dispose = function () {
          l.removeData(this._element, R), (this._config = null), (this._parent = null), (this._element = null), (this._triggerArray = null), (this._isTransitioning = null);
        }),
        (h._getConfig = function (c) {
          return ((c = t({}, W, {}, c)).toggle = Boolean(c.toggle)), a.typeCheckConfig(P, c, B), c;
        }),
        (h._getDimension = function () {
          return l(this._element).hasClass("width") ? "width" : "height";
        }),
        (h._getParent = function () {
          var h,
            v = this;
          a.isElement(this._config.parent) ? ((h = this._config.parent), void 0 !== this._config.parent.jquery && (h = this._config.parent[0])) : (h = document.querySelector(this._config.parent));
          var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
            t = [].slice.call(h.querySelectorAll(e));
          return (
            l(t).each(function (l, h) {
              v._addAriaAndCollapsedClass(c._getTargetFromElement(h), [h]);
            }),
            h
          );
        }),
        (h._addAriaAndCollapsedClass = function (c, h) {
          var v = l(c).hasClass(Q);
          h.length && l(h).toggleClass(Z, !v).attr("aria-expanded", v);
        }),
        (c._getTargetFromElement = function (c) {
          var l = a.getSelectorFromElement(c);
          return l ? document.querySelector(l) : null;
        }),
        (c._jQueryInterface = function (h) {
          return this.each(function () {
            var v = l(this),
              e = v.data(R),
              z = t({}, W, {}, v.data(), {}, "object" == typeof h && h ? h : {});
            if ((!e && z.toggle && /show|hide/.test(h) && (z.toggle = !1), e || ((e = new c(this, z)), v.data(R, e)), "string" == typeof h)) {
              if (void 0 === e[h]) throw new TypeError('No method named "' + h + '"');
              e[h]();
            }
          });
        }),
        v(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return W;
            },
          },
        ]),
        c
      );
    })();
  l(document).on(K.CLICK_DATA_API, G, function (c) {
    "A" === c.currentTarget.tagName && c.preventDefault();
    var h = l(this),
      v = a.getSelectorFromElement(this),
      e = [].slice.call(document.querySelectorAll(v));
    l(e).each(function () {
      var c = l(this),
        v = c.data(R) ? "toggle" : h.data();
      $._jQueryInterface.call(c, v);
    });
  }),
    (l.fn[P] = $._jQueryInterface),
    (l.fn[P].Constructor = $),
    (l.fn[P].noConflict = function () {
      return (l.fn[P] = U), $._jQueryInterface;
    });
  var J = "undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof navigator,
    cc = (function () {
      for (var c = ["Edge", "Trident", "Firefox"], l = 0; l < c.length; l += 1) if (J && 0 <= navigator.userAgent.indexOf(c[l])) return 1;
      return 0;
    })(),
    lc =
      J && window.Promise
        ? function (c) {
            var l = !1;
            return function () {
              l ||
                ((l = !0),
                window.Promise.resolve().then(function () {
                  (l = !1), c();
                }));
            };
          }
        : function (c) {
            var l = !1;
            return function () {
              l ||
                ((l = !0),
                setTimeout(function () {
                  (l = !1), c();
                }, cc));
            };
          };
  function hc(c) {
    return c && "[object Function]" === {}.toString.call(c);
  }
  function vc(c, l) {
    if (1 !== c.nodeType) return [];
    var h = c.ownerDocument.defaultView.getComputedStyle(c, null);
    return l ? h[l] : h;
  }
  function ec(c) {
    return "HTML" === c.nodeName ? c : c.parentNode || c.host;
  }
  function tc(c) {
    if (!c) return document.body;
    switch (c.nodeName) {
      case "HTML":
      case "BODY":
        return c.ownerDocument.body;
      case "#document":
        return c.body;
    }
    var l = vc(c),
      h = l.overflow,
      v = l.overflowX,
      e = l.overflowY;
    return /(auto|scroll|overlay)/.test(h + e + v) ? c : tc(ec(c));
  }
  function zc(c) {
    return c && c.referenceNode ? c.referenceNode : c;
  }
  var ac = J && !(!window.MSInputMethodContext || !document.documentMode),
    sc = J && /MSIE 10/.test(navigator.userAgent);
  function mc(c) {
    return 11 === c ? ac : 10 === c ? sc : ac || sc;
  }
  function nc(c) {
    if (!c) return document.documentElement;
    for (var l = mc(10) ? document.body : null, h = c.offsetParent || null; h === l && c.nextElementSibling; ) h = (c = c.nextElementSibling).offsetParent;
    var v = h && h.nodeName;
    return v && "BODY" !== v && "HTML" !== v
      ? -1 !== ["TH", "TD", "TABLE"].indexOf(h.nodeName) && "static" === vc(h, "position")
        ? nc(h)
        : h
      : c
      ? c.ownerDocument.documentElement
      : document.documentElement;
  }
  function rc(c) {
    return null !== c.parentNode ? rc(c.parentNode) : c;
  }
  function ic(c, l) {
    if (!(c && c.nodeType && l && l.nodeType)) return document.documentElement;
    var h = c.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_FOLLOWING,
      v = h ? c : l,
      e = h ? l : c,
      t = document.createRange();
    t.setStart(v, 0), t.setEnd(e, 0);
    var z = t.commonAncestorContainer;
    if ((c !== z && l !== z) || v.contains(e))
      return (function (c) {
        var l = c.nodeName;
        return "BODY" !== l && ("HTML" === l || nc(c.firstElementChild) === c);
      })(z)
        ? z
        : nc(z);
    var a = rc(c);
    return a.host ? ic(a.host, l) : ic(c, rc(l).host);
  }
  function oc(c, l) {
    var h = "top" === (1 < arguments.length && void 0 !== l ? l : "top") ? "scrollTop" : "scrollLeft",
      v = c.nodeName;
    if ("BODY" !== v && "HTML" !== v) return c[h];
    var e = c.ownerDocument.documentElement;
    return (c.ownerDocument.scrollingElement || e)[h];
  }
  function fc(c, l) {
    var h = "x" === l ? "Left" : "Top",
      v = "Left" == h ? "Right" : "Bottom";
    return parseFloat(c["border" + h + "Width"], 10) + parseFloat(c["border" + v + "Width"], 10);
  }
  function Hc(c, l, h, v) {
    return Math.max(
      l["offset" + c],
      l["scroll" + c],
      h["client" + c],
      h["offset" + c],
      h["scroll" + c],
      mc(10) ? parseInt(h["offset" + c]) + parseInt(v["margin" + ("Height" === c ? "Top" : "Left")]) + parseInt(v["margin" + ("Height" === c ? "Bottom" : "Right")]) : 0
    );
  }
  function Mc(c) {
    var l = c.body,
      h = c.documentElement,
      v = mc(10) && getComputedStyle(h);
    return { height: Hc("Height", l, h, v), width: Hc("Width", l, h, v) };
  }
  function Vc(c, l) {
    for (var h = 0; h < l.length; h++) {
      var v = l[h];
      (v.enumerable = v.enumerable || !1), (v.configurable = !0), "value" in v && (v.writable = !0), Object.defineProperty(c, v.key, v);
    }
  }
  function Cc(c, l, h) {
    return l in c ? Object.defineProperty(c, l, { value: h, enumerable: !0, configurable: !0, writable: !0 }) : (c[l] = h), c;
  }
  var Lc =
    Object.assign ||
    function (c) {
      for (var l = 1; l < arguments.length; l++) {
        var h = arguments[l];
        for (var v in h) Object.prototype.hasOwnProperty.call(h, v) && (c[v] = h[v]);
      }
      return c;
    };
  function dc(c) {
    return Lc({}, c, { right: c.left + c.width, bottom: c.top + c.height });
  }
  function uc(c) {
    var l = {};
    try {
      if (mc(10)) {
        l = c.getBoundingClientRect();
        var h = oc(c, "top"),
          v = oc(c, "left");
        (l.top += h), (l.left += v), (l.bottom += h), (l.right += v);
      } else l = c.getBoundingClientRect();
    } catch (c) {}
    var e = { left: l.left, top: l.top, width: l.right - l.left, height: l.bottom - l.top },
      t = "HTML" === c.nodeName ? Mc(c.ownerDocument) : {},
      z = t.width || c.clientWidth || e.width,
      a = t.height || c.clientHeight || e.height,
      s = c.offsetWidth - z,
      m = c.offsetHeight - a;
    if (s || m) {
      var n = vc(c);
      (s -= fc(n, "x")), (m -= fc(n, "y")), (e.width -= s), (e.height -= m);
    }
    return dc(e);
  }
  function pc(c, l, h) {
    var v = 2 < arguments.length && void 0 !== h && h,
      e = mc(10),
      t = "HTML" === l.nodeName,
      z = uc(c),
      a = uc(l),
      s = tc(c),
      m = vc(l),
      n = parseFloat(m.borderTopWidth, 10),
      r = parseFloat(m.borderLeftWidth, 10);
    v && t && ((a.top = Math.max(a.top, 0)), (a.left = Math.max(a.left, 0)));
    var i = dc({ top: z.top - a.top - n, left: z.left - a.left - r, width: z.width, height: z.height });
    if (((i.marginTop = 0), (i.marginLeft = 0), !e && t)) {
      var o = parseFloat(m.marginTop, 10),
        f = parseFloat(m.marginLeft, 10);
      (i.top -= n - o), (i.bottom -= n - o), (i.left -= r - f), (i.right -= r - f), (i.marginTop = o), (i.marginLeft = f);
    }
    return (
      (e && !v ? l.contains(s) : l === s && "BODY" !== s.nodeName) &&
        (i = (function (c, l, h) {
          var v = 2 < arguments.length && !1,
            e = oc(l, "top"),
            t = oc(l, "left"),
            z = v ? -1 : 1;
          return (c.top += e * z), (c.bottom += e * z), (c.left += t * z), (c.right += t * z), c;
        })(i, l)),
      i
    );
  }
  function gc(c) {
    if (!c || !c.parentElement || mc()) return document.documentElement;
    for (var l = c.parentElement; l && "none" === vc(l, "transform"); ) l = l.parentElement;
    return l || document.documentElement;
  }
  function bc(c, l, h, v, e) {
    var t = 4 < arguments.length && void 0 !== e && e,
      z = { top: 0, left: 0 },
      a = t ? gc(c) : ic(c, zc(l));
    if ("viewport" === v)
      z = (function (c, l) {
        var h = 1 < arguments.length && void 0 !== l && l,
          v = c.ownerDocument.documentElement,
          e = pc(c, v),
          t = Math.max(v.clientWidth, window.innerWidth || 0),
          z = Math.max(v.clientHeight, window.innerHeight || 0),
          a = h ? 0 : oc(v),
          s = h ? 0 : oc(v, "left");
        return dc({ top: a - e.top + e.marginTop, left: s - e.left + e.marginLeft, width: t, height: z });
      })(a, t);
    else {
      var s = void 0;
      "scrollParent" === v ? "BODY" === (s = tc(ec(l))).nodeName && (s = c.ownerDocument.documentElement) : (s = "window" === v ? c.ownerDocument.documentElement : v);
      var m = pc(s, a, t);
      if (
        "HTML" !== s.nodeName ||
        (function c(l) {
          var h = l.nodeName;
          if ("BODY" === h || "HTML" === h) return !1;
          if ("fixed" === vc(l, "position")) return !0;
          var v = ec(l);
          return !!v && c(v);
        })(a)
      )
        z = m;
      else {
        var n = Mc(c.ownerDocument),
          r = n.height,
          i = n.width;
        (z.top += m.top - m.marginTop), (z.bottom = r + m.top), (z.left += m.left - m.marginLeft), (z.right = i + m.left);
      }
    }
    var o = "number" == typeof (h = h || 0);
    return (z.left += o ? h : h.left || 0), (z.top += o ? h : h.top || 0), (z.right -= o ? h : h.right || 0), (z.bottom -= o ? h : h.bottom || 0), z;
  }
  function wc(c, l, h, v, e, t) {
    var z = 5 < arguments.length && void 0 !== t ? t : 0;
    if (-1 === c.indexOf("auto")) return c;
    var a = bc(h, v, z, e),
      s = {
        top: { width: a.width, height: l.top - a.top },
        right: { width: a.right - l.right, height: a.height },
        bottom: { width: a.width, height: a.bottom - l.bottom },
        left: { width: l.left - a.left, height: a.height },
      },
      m = Object.keys(s)
        .map(function (c) {
          return Lc({ key: c }, s[c], {
            area: (function (c) {
              return c.width * c.height;
            })(s[c]),
          });
        })
        .sort(function (c, l) {
          return l.area - c.area;
        }),
      n = m.filter(function (c) {
        var l = c.width,
          v = c.height;
        return l >= h.clientWidth && v >= h.clientHeight;
      }),
      r = 0 < n.length ? n[0].key : m[0].key,
      i = c.split("-")[1];
    return r + (i ? "-" + i : "");
  }
  function yc(c, l, h, v) {
    var e = 3 < arguments.length && void 0 !== v ? v : null;
    return pc(h, e ? gc(l) : ic(l, zc(h)), e);
  }
  function _c(c) {
    var l = c.ownerDocument.defaultView.getComputedStyle(c),
      h = parseFloat(l.marginTop || 0) + parseFloat(l.marginBottom || 0),
      v = parseFloat(l.marginLeft || 0) + parseFloat(l.marginRight || 0);
    return { width: c.offsetWidth + v, height: c.offsetHeight + h };
  }
  function Sc(c) {
    var l = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return c.replace(/left|right|bottom|top/g, function (c) {
      return l[c];
    });
  }
  function Ac(c, l, h) {
    h = h.split("-")[0];
    var v = _c(c),
      e = { width: v.width, height: v.height },
      t = -1 !== ["right", "left"].indexOf(h),
      z = t ? "top" : "left",
      a = t ? "left" : "top",
      s = t ? "height" : "width",
      m = t ? "width" : "height";
    return (e[z] = l[z] + l[s] / 2 - v[s] / 2), (e[a] = h === a ? l[a] - v[m] : l[Sc(a)]), e;
  }
  function kc(c, l) {
    return Array.prototype.find ? c.find(l) : c.filter(l)[0];
  }
  function Ec(c, l, h) {
    return (
      (void 0 === h
        ? c
        : c.slice(
            0,
            (function (c, l, h) {
              if (Array.prototype.findIndex)
                return c.findIndex(function (c) {
                  return c[l] === h;
                });
              var v = kc(c, function (c) {
                return c[l] === h;
              });
              return c.indexOf(v);
            })(c, "name", h)
          )
      ).forEach(function (c) {
        c.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var h = c.function || c.fn;
        c.enabled && hc(h) && ((l.offsets.popper = dc(l.offsets.popper)), (l.offsets.reference = dc(l.offsets.reference)), (l = h(l, c)));
      }),
      l
    );
  }
  function xc(c, l) {
    return c.some(function (c) {
      var h = c.name;
      return c.enabled && h === l;
    });
  }
  function Tc(c) {
    for (var l = [!1, "ms", "Webkit", "Moz", "O"], h = c.charAt(0).toUpperCase() + c.slice(1), v = 0; v < l.length; v++) {
      var e = l[v],
        t = e ? "" + e + h : c;
      if (void 0 !== document.body.style[t]) return t;
    }
    return null;
  }
  function Dc(c) {
    var l = c.ownerDocument;
    return l ? l.defaultView : window;
  }
  function Oc(c) {
    return "" !== c && !isNaN(parseFloat(c)) && isFinite(c);
  }
  function Nc(c, l) {
    Object.keys(l).forEach(function (h) {
      var v = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(h) && Oc(l[h]) && (v = "px"), (c.style[h] = l[h] + v);
    });
  }
  var Ic = J && /Firefox/i.test(navigator.userAgent);
  function qc(c, l, h) {
    var v = kc(c, function (c) {
        return c.name === l;
      }),
      e =
        !!v &&
        c.some(function (c) {
          return c.name === h && c.enabled && c.order < v.order;
        });
    if (!e) {
      var t = "`" + l + "`",
        z = "`" + h + "`";
      console.warn(z + " modifier is required by " + t + " modifier in order to work, be sure to include it before " + t + "!");
    }
    return e;
  }
  var jc = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
    Pc = jc.slice(3);
  function Rc(c, l) {
    var h = 1 < arguments.length && void 0 !== l && l,
      v = Pc.indexOf(c),
      e = Pc.slice(v + 1).concat(Pc.slice(0, v));
    return h ? e.reverse() : e;
  }
  var Fc = {
      placement: "bottom",
      positionFixed: !1,
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (c) {
            var l = c.placement,
              h = l.split("-")[0],
              v = l.split("-")[1];
            if (v) {
              var e = c.offsets,
                t = e.reference,
                z = e.popper,
                a = -1 !== ["bottom", "top"].indexOf(h),
                s = a ? "left" : "top",
                m = a ? "width" : "height",
                n = { start: Cc({}, s, t[s]), end: Cc({}, s, t[s] + t[m] - z[m]) };
              c.offsets.popper = Lc({}, z, n[v]);
            }
            return c;
          },
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: function (c, l) {
            var h,
              v = l.offset,
              e = c.placement,
              t = c.offsets,
              z = t.popper,
              a = t.reference,
              s = e.split("-")[0];
            return (
              (h = Oc(+v)
                ? [+v, 0]
                : (function (c, l, h, v) {
                    var e = [0, 0],
                      t = -1 !== ["right", "left"].indexOf(v),
                      z = c.split(/(\+|\-)/).map(function (c) {
                        return c.trim();
                      }),
                      a = z.indexOf(
                        kc(z, function (c) {
                          return -1 !== c.search(/,|\s/);
                        })
                      );
                    z[a] && -1 === z[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
                    var s = /\s*,\s*|\s+/,
                      m = -1 !== a ? [z.slice(0, a).concat([z[a].split(s)[0]]), [z[a].split(s)[1]].concat(z.slice(a + 1))] : [z];
                    return (
                      (m = m.map(function (c, v) {
                        var e = (1 === v ? !t : t) ? "height" : "width",
                          z = !1;
                        return c
                          .reduce(function (c, l) {
                            return "" === c[c.length - 1] && -1 !== ["+", "-"].indexOf(l) ? ((c[c.length - 1] = l), (z = !0), c) : z ? ((c[c.length - 1] += l), (z = !1), c) : c.concat(l);
                          }, [])
                          .map(function (c) {
                            return (function (c, l, h, v) {
                              var e = c.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                t = +e[1],
                                z = e[2];
                              if (!t) return c;
                              if (0 !== z.indexOf("%"))
                                return "vh" !== z && "vw" !== z
                                  ? t
                                  : (("vh" === z ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) /
                                      100) *
                                      t;
                              var a = void 0;
                              switch (z) {
                                case "%p":
                                  a = h;
                                  break;
                                case "%":
                                case "%r":
                                default:
                                  a = v;
                              }
                              return (dc(a)[l] / 100) * t;
                            })(c, e, l, h);
                          });
                      })).forEach(function (c, l) {
                        c.forEach(function (h, v) {
                          Oc(h) && (e[l] += h * ("-" === c[v - 1] ? -1 : 1));
                        });
                      }),
                      e
                    );
                  })(v, z, a, s)),
              "left" === s
                ? ((z.top += h[0]), (z.left -= h[1]))
                : "right" === s
                ? ((z.top += h[0]), (z.left += h[1]))
                : "top" === s
                ? ((z.left += h[0]), (z.top -= h[1]))
                : "bottom" === s && ((z.left += h[0]), (z.top += h[1])),
              (c.popper = z),
              c
            );
          },
          offset: 0,
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (c, l) {
            var h = l.boundariesElement || nc(c.instance.popper);
            c.instance.reference === h && (h = nc(h));
            var v = Tc("transform"),
              e = c.instance.popper.style,
              t = e.top,
              z = e.left,
              a = e[v];
            (e.top = ""), (e.left = ""), (e[v] = "");
            var s = bc(c.instance.popper, c.instance.reference, l.padding, h, c.positionFixed);
            (e.top = t), (e.left = z), (e[v] = a), (l.boundaries = s);
            var m = l.priority,
              n = c.offsets.popper,
              r = {
                primary: function (c) {
                  var h = n[c];
                  return n[c] < s[c] && !l.escapeWithReference && (h = Math.max(n[c], s[c])), Cc({}, c, h);
                },
                secondary: function (c) {
                  var h = "right" === c ? "left" : "top",
                    v = n[h];
                  return n[c] > s[c] && !l.escapeWithReference && (v = Math.min(n[h], s[c] - ("right" === c ? n.width : n.height))), Cc({}, h, v);
                },
              };
            return (
              m.forEach(function (c) {
                var l = -1 !== ["left", "top"].indexOf(c) ? "primary" : "secondary";
                n = Lc({}, n, r[l](c));
              }),
              (c.offsets.popper = n),
              c
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (c) {
            var l = c.offsets,
              h = l.popper,
              v = l.reference,
              e = c.placement.split("-")[0],
              t = Math.floor,
              z = -1 !== ["top", "bottom"].indexOf(e),
              a = z ? "right" : "bottom",
              s = z ? "left" : "top",
              m = z ? "width" : "height";
            return h[a] < t(v[s]) && (c.offsets.popper[s] = t(v[s]) - h[m]), h[s] > t(v[a]) && (c.offsets.popper[s] = t(v[a])), c;
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (c, l) {
            var h;
            if (!qc(c.instance.modifiers, "arrow", "keepTogether")) return c;
            var v = l.element;
            if ("string" == typeof v) {
              if (!(v = c.instance.popper.querySelector(v))) return c;
            } else if (!c.instance.popper.contains(v)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), c;
            var e = c.placement.split("-")[0],
              t = c.offsets,
              z = t.popper,
              a = t.reference,
              s = -1 !== ["left", "right"].indexOf(e),
              m = s ? "height" : "width",
              n = s ? "Top" : "Left",
              r = n.toLowerCase(),
              i = s ? "left" : "top",
              o = s ? "bottom" : "right",
              f = _c(v)[m];
            a[o] - f < z[r] && (c.offsets.popper[r] -= z[r] - (a[o] - f)), a[r] + f > z[o] && (c.offsets.popper[r] += a[r] + f - z[o]), (c.offsets.popper = dc(c.offsets.popper));
            var H = a[r] + a[m] / 2 - f / 2,
              M = vc(c.instance.popper),
              V = parseFloat(M["margin" + n], 10),
              C = parseFloat(M["border" + n + "Width"], 10),
              L = H - c.offsets.popper[r] - V - C;
            return (L = Math.max(Math.min(z[m] - f, L), 0)), (c.arrowElement = v), (c.offsets.arrow = (Cc((h = {}), r, Math.round(L)), Cc(h, i, ""), h)), c;
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (c, l) {
            if (xc(c.instance.modifiers, "inner")) return c;
            if (c.flipped && c.placement === c.originalPlacement) return c;
            var h = bc(c.instance.popper, c.instance.reference, l.padding, l.boundariesElement, c.positionFixed),
              v = c.placement.split("-")[0],
              e = Sc(v),
              t = c.placement.split("-")[1] || "",
              z = [];
            switch (l.behavior) {
              case "flip":
                z = [v, e];
                break;
              case "clockwise":
                z = Rc(v);
                break;
              case "counterclockwise":
                z = Rc(v, !0);
                break;
              default:
                z = l.behavior;
            }
            return (
              z.forEach(function (a, s) {
                if (v !== a || z.length === s + 1) return c;
                (v = c.placement.split("-")[0]), (e = Sc(v));
                var m = c.offsets.popper,
                  n = c.offsets.reference,
                  r = Math.floor,
                  i = ("left" === v && r(m.right) > r(n.left)) || ("right" === v && r(m.left) < r(n.right)) || ("top" === v && r(m.bottom) > r(n.top)) || ("bottom" === v && r(m.top) < r(n.bottom)),
                  o = r(m.left) < r(h.left),
                  f = r(m.right) > r(h.right),
                  H = r(m.top) < r(h.top),
                  M = r(m.bottom) > r(h.bottom),
                  V = ("left" === v && o) || ("right" === v && f) || ("top" === v && H) || ("bottom" === v && M),
                  C = -1 !== ["top", "bottom"].indexOf(v),
                  L = !!l.flipVariations && ((C && "start" === t && o) || (C && "end" === t && f) || (!C && "start" === t && H) || (!C && "end" === t && M)),
                  d = !!l.flipVariationsByContent && ((C && "start" === t && f) || (C && "end" === t && o) || (!C && "start" === t && M) || (!C && "end" === t && H)),
                  u = L || d;
                (i || V || u) &&
                  ((c.flipped = !0),
                  (i || V) && (v = z[s + 1]),
                  u && (t = "end" === t ? "start" : "start" === t ? "end" : t),
                  (c.placement = v + (t ? "-" + t : "")),
                  (c.offsets.popper = Lc({}, c.offsets.popper, Ac(c.instance.popper, c.offsets.reference, c.placement))),
                  (c = Ec(c.instance.modifiers, c, "flip")));
              }),
              c
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1,
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (c) {
            var l = c.placement,
              h = l.split("-")[0],
              v = c.offsets,
              e = v.popper,
              t = v.reference,
              z = -1 !== ["left", "right"].indexOf(h),
              a = -1 === ["top", "left"].indexOf(h);
            return (e[z ? "left" : "top"] = t[h] - (a ? e[z ? "width" : "height"] : 0)), (c.placement = Sc(l)), (c.offsets.popper = dc(e)), c;
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (c) {
            if (!qc(c.instance.modifiers, "hide", "preventOverflow")) return c;
            var l = c.offsets.reference,
              h = kc(c.instance.modifiers, function (c) {
                return "preventOverflow" === c.name;
              }).boundaries;
            if (l.bottom < h.top || l.left > h.right || l.top > h.bottom || l.right < h.left) {
              if (!0 === c.hide) return c;
              (c.hide = !0), (c.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === c.hide) return c;
              (c.hide = !1), (c.attributes["x-out-of-boundaries"] = !1);
            }
            return c;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (c, l) {
            var h = l.x,
              v = l.y,
              e = c.offsets.popper,
              t = kc(c.instance.modifiers, function (c) {
                return "applyStyle" === c.name;
              }).gpuAcceleration;
            void 0 !== t && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
            var z,
              a,
              s = void 0 !== t ? t : l.gpuAcceleration,
              m = nc(c.instance.popper),
              n = uc(m),
              r = { position: e.position },
              i = (function (c, l) {
                function h(c) {
                  return c;
                }
                var v = c.offsets,
                  e = v.popper,
                  t = v.reference,
                  z = Math.round,
                  a = Math.floor,
                  s = z(t.width),
                  m = z(e.width),
                  n = -1 !== ["left", "right"].indexOf(c.placement),
                  r = -1 !== c.placement.indexOf("-"),
                  i = l ? (n || r || s % 2 == m % 2 ? z : a) : h,
                  o = l ? z : h;
                return { left: i(s % 2 == 1 && m % 2 == 1 && !r && l ? e.left - 1 : e.left), top: o(e.top), bottom: o(e.bottom), right: i(e.right) };
              })(c, window.devicePixelRatio < 2 || !Ic),
              o = "bottom" === h ? "top" : "bottom",
              f = "right" === v ? "left" : "right",
              H = Tc("transform");
            if (
              ((a = "bottom" == o ? ("HTML" === m.nodeName ? -m.clientHeight + i.bottom : -n.height + i.bottom) : i.top),
              (z = "right" == f ? ("HTML" === m.nodeName ? -m.clientWidth + i.right : -n.width + i.right) : i.left),
              s && H)
            )
              (r[H] = "translate3d(" + z + "px, " + a + "px, 0)"), (r[o] = 0), (r[f] = 0), (r.willChange = "transform");
            else {
              var M = "bottom" == o ? -1 : 1,
                V = "right" == f ? -1 : 1;
              (r[o] = a * M), (r[f] = z * V), (r.willChange = o + ", " + f);
            }
            var C = { "x-placement": c.placement };
            return (c.attributes = Lc({}, C, c.attributes)), (c.styles = Lc({}, r, c.styles)), (c.arrowStyles = Lc({}, c.offsets.arrow, c.arrowStyles)), c;
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (c) {
            return (
              Nc(c.instance.popper, c.styles),
              (l = c.instance.popper),
              (h = c.attributes),
              Object.keys(h).forEach(function (c) {
                !1 !== h[c] ? l.setAttribute(c, h[c]) : l.removeAttribute(c);
              }),
              c.arrowElement && Object.keys(c.arrowStyles).length && Nc(c.arrowElement, c.arrowStyles),
              c
            );
            var l, h;
          },
          onLoad: function (c, l, h, v, e) {
            var t = yc(e, l, c, h.positionFixed),
              z = wc(h.placement, t, l, c, h.modifiers.flip.boundariesElement, h.modifiers.flip.padding);
            return l.setAttribute("x-placement", z), Nc(l, { position: h.positionFixed ? "fixed" : "absolute" }), h;
          },
          gpuAcceleration: void 0,
        },
      },
    },
    Uc =
      ((function (c, l, h) {
        l && Vc(c.prototype, l), h && Vc(c, h);
      })(Wc, [
        {
          key: "update",
          value: function () {
            return function () {
              if (!this.state.isDestroyed) {
                var c = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} };
                (c.offsets.reference = yc(this.state, this.popper, this.reference, this.options.positionFixed)),
                  (c.placement = wc(this.options.placement, c.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding)),
                  (c.originalPlacement = c.placement),
                  (c.positionFixed = this.options.positionFixed),
                  (c.offsets.popper = Ac(this.popper, c.offsets.reference, c.placement)),
                  (c.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute"),
                  (c = Ec(this.modifiers, c)),
                  this.state.isCreated ? this.options.onUpdate(c) : ((this.state.isCreated = !0), this.options.onCreate(c));
              }
            }.call(this);
          },
        },
        {
          key: "destroy",
          value: function () {
            return function () {
              return (
                (this.state.isDestroyed = !0),
                xc(this.modifiers, "applyStyle") &&
                  (this.popper.removeAttribute("x-placement"),
                  (this.popper.style.position = ""),
                  (this.popper.style.top = ""),
                  (this.popper.style.left = ""),
                  (this.popper.style.right = ""),
                  (this.popper.style.bottom = ""),
                  (this.popper.style.willChange = ""),
                  (this.popper.style[Tc("transform")] = "")),
                this.disableEventListeners(),
                this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                this
              );
            }.call(this);
          },
        },
        {
          key: "enableEventListeners",
          value: function () {
            return function () {
              this.state.eventsEnabled ||
                (this.state = (function (c, l, h, v) {
                  (h.updateBound = v), Dc(c).addEventListener("resize", h.updateBound, { passive: !0 });
                  var e = tc(c);
                  return (
                    (function c(l, h, v, e) {
                      var t = "BODY" === l.nodeName,
                        z = t ? l.ownerDocument.defaultView : l;
                      z.addEventListener(h, v, { passive: !0 }), t || c(tc(z.parentNode), h, v, e), e.push(z);
                    })(e, "scroll", h.updateBound, h.scrollParents),
                    (h.scrollElement = e),
                    (h.eventsEnabled = !0),
                    h
                  );
                })(this.reference, this.options, this.state, this.scheduleUpdate));
            }.call(this);
          },
        },
        {
          key: "disableEventListeners",
          value: function () {
            return function () {
              var c, l;
              this.state.eventsEnabled &&
                (cancelAnimationFrame(this.scheduleUpdate),
                (this.state =
                  ((c = this.reference),
                  (l = this.state),
                  Dc(c).removeEventListener("resize", l.updateBound),
                  l.scrollParents.forEach(function (c) {
                    c.removeEventListener("scroll", l.updateBound);
                  }),
                  (l.updateBound = null),
                  (l.scrollParents = []),
                  (l.scrollElement = null),
                  (l.eventsEnabled = !1),
                  l)));
            }.call(this);
          },
        },
      ]),
      Wc);
  function Wc(c, l) {
    var h = this,
      v = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
    !(function (c, l) {
      if (!(c instanceof Wc)) throw new TypeError("Cannot call a class as a function");
    })(this),
      (this.scheduleUpdate = function () {
        return requestAnimationFrame(h.update);
      }),
      (this.update = lc(this.update.bind(this))),
      (this.options = Lc({}, Wc.Defaults, v)),
      (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
      (this.reference = c && c.jquery ? c[0] : c),
      (this.popper = l && l.jquery ? l[0] : l),
      (this.options.modifiers = {}),
      Object.keys(Lc({}, Wc.Defaults.modifiers, v.modifiers)).forEach(function (c) {
        h.options.modifiers[c] = Lc({}, Wc.Defaults.modifiers[c] || {}, v.modifiers ? v.modifiers[c] : {});
      }),
      (this.modifiers = Object.keys(this.options.modifiers)
        .map(function (c) {
          return Lc({ name: c }, h.options.modifiers[c]);
        })
        .sort(function (c, l) {
          return c.order - l.order;
        })),
      this.modifiers.forEach(function (c) {
        c.enabled && hc(c.onLoad) && c.onLoad(h.reference, h.popper, h.options, c, h.state);
      }),
      this.update();
    var e = this.options.eventsEnabled;
    e && this.enableEventListeners(), (this.state.eventsEnabled = e);
  }
  (Uc.Utils = ("undefined" != typeof window ? window : global).PopperUtils), (Uc.placements = jc), (Uc.Defaults = Fc);
  var Bc = "dropdown",
    Kc = "bs.dropdown",
    Qc = "." + Kc,
    Yc = ".data-api",
    Xc = l.fn[Bc],
    Zc = new RegExp("38|40|27"),
    Gc = {
      HIDE: "hide" + Qc,
      HIDDEN: "hidden" + Qc,
      SHOW: "show" + Qc,
      SHOWN: "shown" + Qc,
      CLICK: "click" + Qc,
      CLICK_DATA_API: "click" + Qc + Yc,
      KEYDOWN_DATA_API: "keydown" + Qc + Yc,
      KEYUP_DATA_API: "keyup" + Qc + Yc,
    },
    $c = "disabled",
    Jc = "show",
    cl = "dropdown-menu-right",
    ll = '[data-toggle="dropdown"]',
    hl = ".dropdown-menu",
    vl = { offset: 0, flip: !0, boundary: "scrollParent", reference: "toggle", display: "dynamic", popperConfig: null },
    el = { offset: "(number|string|function)", flip: "boolean", boundary: "(string|element)", reference: "(string|element)", display: "string", popperConfig: "(null|object)" },
    tl = (function () {
      function c(c, l) {
        (this._element = c), (this._popper = null), (this._config = this._getConfig(l)), (this._menu = this._getMenuElement()), (this._inNavbar = this._detectNavbar()), this._addEventListeners();
      }
      var h = c.prototype;
      return (
        (h.toggle = function () {
          if (!this._element.disabled && !l(this._element).hasClass($c)) {
            var h = l(this._menu).hasClass(Jc);
            c._clearMenus(), h || this.show(!0);
          }
        }),
        (h.show = function (h) {
          if ((void 0 === h && (h = !1), !(this._element.disabled || l(this._element).hasClass($c) || l(this._menu).hasClass(Jc)))) {
            var v = { relatedTarget: this._element },
              e = l.Event(Gc.SHOW, v),
              t = c._getParentFromElement(this._element);
            if ((l(t).trigger(e), !e.isDefaultPrevented())) {
              if (!this._inNavbar && h) {
                if (void 0 === Uc) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                var z = this._element;
                "parent" === this._config.reference
                  ? (z = t)
                  : a.isElement(this._config.reference) && ((z = this._config.reference), void 0 !== this._config.reference.jquery && (z = this._config.reference[0])),
                  "scrollParent" !== this._config.boundary && l(t).addClass("position-static"),
                  (this._popper = new Uc(z, this._menu, this._getPopperConfig()));
              }
              "ontouchstart" in document.documentElement && 0 === l(t).closest(".navbar-nav").length && l(document.body).children().on("mouseover", null, l.noop),
                this._element.focus(),
                this._element.setAttribute("aria-expanded", !0),
                l(this._menu).toggleClass(Jc),
                l(t).toggleClass(Jc).trigger(l.Event(Gc.SHOWN, v));
            }
          }
        }),
        (h.hide = function () {
          if (!this._element.disabled && !l(this._element).hasClass($c) && l(this._menu).hasClass(Jc)) {
            var h = { relatedTarget: this._element },
              v = l.Event(Gc.HIDE, h),
              e = c._getParentFromElement(this._element);
            l(e).trigger(v), v.isDefaultPrevented() || (this._popper && this._popper.destroy(), l(this._menu).toggleClass(Jc), l(e).toggleClass(Jc).trigger(l.Event(Gc.HIDDEN, h)));
          }
        }),
        (h.dispose = function () {
          l.removeData(this._element, Kc), l(this._element).off(Qc), (this._element = null), (this._menu = null) !== this._popper && (this._popper.destroy(), (this._popper = null));
        }),
        (h.update = function () {
          (this._inNavbar = this._detectNavbar()), null !== this._popper && this._popper.scheduleUpdate();
        }),
        (h._addEventListeners = function () {
          var c = this;
          l(this._element).on(Gc.CLICK, function (l) {
            l.preventDefault(), l.stopPropagation(), c.toggle();
          });
        }),
        (h._getConfig = function (c) {
          return (c = t({}, this.constructor.Default, {}, l(this._element).data(), {}, c)), a.typeCheckConfig(Bc, c, this.constructor.DefaultType), c;
        }),
        (h._getMenuElement = function () {
          if (!this._menu) {
            var l = c._getParentFromElement(this._element);
            l && (this._menu = l.querySelector(hl));
          }
          return this._menu;
        }),
        (h._getPlacement = function () {
          var c = l(this._element.parentNode),
            h = "bottom-start";
          return (
            c.hasClass("dropup")
              ? ((h = "top-start"), l(this._menu).hasClass(cl) && (h = "top-end"))
              : c.hasClass("dropright")
              ? (h = "right-start")
              : c.hasClass("dropleft")
              ? (h = "left-start")
              : l(this._menu).hasClass(cl) && (h = "bottom-end"),
            h
          );
        }),
        (h._detectNavbar = function () {
          return 0 < l(this._element).closest(".navbar").length;
        }),
        (h._getOffset = function () {
          var c = this,
            l = {};
          return (
            "function" == typeof this._config.offset
              ? (l.fn = function (l) {
                  return (l.offsets = t({}, l.offsets, {}, c._config.offset(l.offsets, c._element) || {})), l;
                })
              : (l.offset = this._config.offset),
            l
          );
        }),
        (h._getPopperConfig = function () {
          var c = { placement: this._getPlacement(), modifiers: { offset: this._getOffset(), flip: { enabled: this._config.flip }, preventOverflow: { boundariesElement: this._config.boundary } } };
          return "static" === this._config.display && (c.modifiers.applyStyle = { enabled: !1 }), t({}, c, {}, this._config.popperConfig);
        }),
        (c._jQueryInterface = function (h) {
          return this.each(function () {
            var v = l(this).data(Kc);
            if ((v || ((v = new c(this, "object" == typeof h ? h : null)), l(this).data(Kc, v)), "string" == typeof h)) {
              if (void 0 === v[h]) throw new TypeError('No method named "' + h + '"');
              v[h]();
            }
          });
        }),
        (c._clearMenus = function (h) {
          if (!h || (3 !== h.which && ("keyup" !== h.type || 9 === h.which)))
            for (var v = [].slice.call(document.querySelectorAll(ll)), e = 0, t = v.length; e < t; e++) {
              var z = c._getParentFromElement(v[e]),
                a = l(v[e]).data(Kc),
                s = { relatedTarget: v[e] };
              if ((h && "click" === h.type && (s.clickEvent = h), a)) {
                var m = a._menu;
                if (l(z).hasClass(Jc) && !(h && (("click" === h.type && /input|textarea/i.test(h.target.tagName)) || ("keyup" === h.type && 9 === h.which)) && l.contains(z, h.target))) {
                  var n = l.Event(Gc.HIDE, s);
                  l(z).trigger(n),
                    n.isDefaultPrevented() ||
                      ("ontouchstart" in document.documentElement && l(document.body).children().off("mouseover", null, l.noop),
                      v[e].setAttribute("aria-expanded", "false"),
                      a._popper && a._popper.destroy(),
                      l(m).removeClass(Jc),
                      l(z).removeClass(Jc).trigger(l.Event(Gc.HIDDEN, s)));
                }
              }
            }
        }),
        (c._getParentFromElement = function (c) {
          var l,
            h = a.getSelectorFromElement(c);
          return h && (l = document.querySelector(h)), l || c.parentNode;
        }),
        (c._dataApiKeydownHandler = function (h) {
          if (
            (/input|textarea/i.test(h.target.tagName) ? !(32 === h.which || (27 !== h.which && ((40 !== h.which && 38 !== h.which) || l(h.target).closest(hl).length))) : Zc.test(h.which)) &&
            (h.preventDefault(), h.stopPropagation(), !this.disabled && !l(this).hasClass($c))
          ) {
            var v = c._getParentFromElement(this),
              e = l(v).hasClass(Jc);
            if (e || 27 !== h.which)
              if (e && (!e || (27 !== h.which && 32 !== h.which))) {
                var t = [].slice.call(v.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function (c) {
                  return l(c).is(":visible");
                });
                if (0 !== t.length) {
                  var z = t.indexOf(h.target);
                  38 === h.which && 0 < z && z--, 40 === h.which && z < t.length - 1 && z++, z < 0 && (z = 0), t[z].focus();
                }
              } else {
                if (27 === h.which) {
                  var a = v.querySelector(ll);
                  l(a).trigger("focus");
                }
                l(this).trigger("click");
              }
          }
        }),
        v(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return vl;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return el;
            },
          },
        ]),
        c
      );
    })();
  l(document)
    .on(Gc.KEYDOWN_DATA_API, ll, tl._dataApiKeydownHandler)
    .on(Gc.KEYDOWN_DATA_API, hl, tl._dataApiKeydownHandler)
    .on(Gc.CLICK_DATA_API + " " + Gc.KEYUP_DATA_API, tl._clearMenus)
    .on(Gc.CLICK_DATA_API, ll, function (c) {
      c.preventDefault(), c.stopPropagation(), tl._jQueryInterface.call(l(this), "toggle");
    })
    .on(Gc.CLICK_DATA_API, ".dropdown form", function (c) {
      c.stopPropagation();
    }),
    (l.fn[Bc] = tl._jQueryInterface),
    (l.fn[Bc].Constructor = tl),
    (l.fn[Bc].noConflict = function () {
      return (l.fn[Bc] = Xc), tl._jQueryInterface;
    });
  var zl = "modal",
    al = "bs.modal",
    sl = "." + al,
    ml = l.fn[zl],
    nl = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
    rl = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
    il = {
      HIDE: "hide" + sl,
      HIDE_PREVENTED: "hidePrevented" + sl,
      HIDDEN: "hidden" + sl,
      SHOW: "show" + sl,
      SHOWN: "shown" + sl,
      FOCUSIN: "focusin" + sl,
      RESIZE: "resize" + sl,
      CLICK_DISMISS: "click.dismiss" + sl,
      KEYDOWN_DISMISS: "keydown.dismiss" + sl,
      MOUSEUP_DISMISS: "mouseup.dismiss" + sl,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + sl,
      CLICK_DATA_API: "click" + sl + ".data-api",
    },
    ol = "modal-open",
    fl = "fade",
    Hl = "show",
    Ml = "modal-static",
    Vl = ".modal-dialog",
    Cl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    Ll = ".sticky-top",
    dl = (function () {
      function c(c, l) {
        (this._config = this._getConfig(l)),
          (this._element = c),
          (this._dialog = c.querySelector(Vl)),
          (this._backdrop = null),
          (this._isShown = !1),
          (this._isBodyOverflowing = !1),
          (this._ignoreBackdropClick = !1),
          (this._isTransitioning = !1),
          (this._scrollbarWidth = 0);
      }
      var h = c.prototype;
      return (
        (h.toggle = function (c) {
          return this._isShown ? this.hide() : this.show(c);
        }),
        (h.show = function (c) {
          var h = this;
          if (!this._isShown && !this._isTransitioning) {
            l(this._element).hasClass(fl) && (this._isTransitioning = !0);
            var v = l.Event(il.SHOW, { relatedTarget: c });
            l(this._element).trigger(v),
              this._isShown ||
                v.isDefaultPrevented() ||
                ((this._isShown = !0),
                this._checkScrollbar(),
                this._setScrollbar(),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                l(this._element).on(il.CLICK_DISMISS, '[data-dismiss="modal"]', function (c) {
                  return h.hide(c);
                }),
                l(this._dialog).on(il.MOUSEDOWN_DISMISS, function () {
                  l(h._element).one(il.MOUSEUP_DISMISS, function (c) {
                    l(c.target).is(h._element) && (h._ignoreBackdropClick = !0);
                  });
                }),
                this._showBackdrop(function () {
                  return h._showElement(c);
                }));
          }
        }),
        (h.hide = function (c) {
          var h = this;
          if ((c && c.preventDefault(), this._isShown && !this._isTransitioning)) {
            var v = l.Event(il.HIDE);
            if ((l(this._element).trigger(v), this._isShown && !v.isDefaultPrevented())) {
              this._isShown = !1;
              var e = l(this._element).hasClass(fl);
              if (
                (e && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                l(document).off(il.FOCUSIN),
                l(this._element).removeClass(Hl),
                l(this._element).off(il.CLICK_DISMISS),
                l(this._dialog).off(il.MOUSEDOWN_DISMISS),
                e)
              ) {
                var t = a.getTransitionDurationFromElement(this._element);
                l(this._element)
                  .one(a.TRANSITION_END, function (c) {
                    return h._hideModal(c);
                  })
                  .emulateTransitionEnd(t);
              } else this._hideModal();
            }
          }
        }),
        (h.dispose = function () {
          [window, this._element, this._dialog].forEach(function (c) {
            return l(c).off(sl);
          }),
            l(document).off(il.FOCUSIN),
            l.removeData(this._element, al),
            (this._config = null),
            (this._element = null),
            (this._dialog = null),
            (this._backdrop = null),
            (this._isShown = null),
            (this._isBodyOverflowing = null),
            (this._ignoreBackdropClick = null),
            (this._isTransitioning = null),
            (this._scrollbarWidth = null);
        }),
        (h.handleUpdate = function () {
          this._adjustDialog();
        }),
        (h._getConfig = function (c) {
          return (c = t({}, nl, {}, c)), a.typeCheckConfig(zl, c, rl), c;
        }),
        (h._triggerBackdropTransition = function () {
          var c = this;
          if ("static" === this._config.backdrop) {
            var h = l.Event(il.HIDE_PREVENTED);
            if ((l(this._element).trigger(h), h.defaultPrevented)) return;
            this._element.classList.add(Ml);
            var v = a.getTransitionDurationFromElement(this._element);
            l(this._element)
              .one(a.TRANSITION_END, function () {
                c._element.classList.remove(Ml);
              })
              .emulateTransitionEnd(v),
              this._element.focus();
          } else this.hide();
        }),
        (h._showElement = function (c) {
          var h = this,
            v = l(this._element).hasClass(fl),
            e = this._dialog ? this._dialog.querySelector(".modal-body") : null;
          function t() {
            h._config.focus && h._element.focus(), (h._isTransitioning = !1), l(h._element).trigger(z);
          }
          (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE) || document.body.appendChild(this._element),
            (this._element.style.display = "block"),
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            l(this._dialog).hasClass("modal-dialog-scrollable") && e ? (e.scrollTop = 0) : (this._element.scrollTop = 0),
            v && a.reflow(this._element),
            l(this._element).addClass(Hl),
            this._config.focus && this._enforceFocus();
          var z = l.Event(il.SHOWN, { relatedTarget: c });
          if (v) {
            var s = a.getTransitionDurationFromElement(this._dialog);
            l(this._dialog).one(a.TRANSITION_END, t).emulateTransitionEnd(s);
          } else t();
        }),
        (h._enforceFocus = function () {
          var c = this;
          l(document)
            .off(il.FOCUSIN)
            .on(il.FOCUSIN, function (h) {
              document !== h.target && c._element !== h.target && 0 === l(c._element).has(h.target).length && c._element.focus();
            });
        }),
        (h._setEscapeEvent = function () {
          var c = this;
          this._isShown && this._config.keyboard
            ? l(this._element).on(il.KEYDOWN_DISMISS, function (l) {
                27 === l.which && c._triggerBackdropTransition();
              })
            : this._isShown || l(this._element).off(il.KEYDOWN_DISMISS);
        }),
        (h._setResizeEvent = function () {
          var c = this;
          this._isShown
            ? l(window).on(il.RESIZE, function (l) {
                return c.handleUpdate(l);
              })
            : l(window).off(il.RESIZE);
        }),
        (h._hideModal = function () {
          var c = this;
          (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            (this._isTransitioning = !1),
            this._showBackdrop(function () {
              l(document.body).removeClass(ol), c._resetAdjustments(), c._resetScrollbar(), l(c._element).trigger(il.HIDDEN);
            });
        }),
        (h._removeBackdrop = function () {
          this._backdrop && (l(this._backdrop).remove(), (this._backdrop = null));
        }),
        (h._showBackdrop = function (c) {
          var h = this,
            v = l(this._element).hasClass(fl) ? fl : "";
          if (this._isShown && this._config.backdrop) {
            if (
              ((this._backdrop = document.createElement("div")),
              (this._backdrop.className = "modal-backdrop"),
              v && this._backdrop.classList.add(v),
              l(this._backdrop).appendTo(document.body),
              l(this._element).on(il.CLICK_DISMISS, function (c) {
                h._ignoreBackdropClick ? (h._ignoreBackdropClick = !1) : c.target === c.currentTarget && h._triggerBackdropTransition();
              }),
              v && a.reflow(this._backdrop),
              l(this._backdrop).addClass(Hl),
              !c)
            )
              return;
            if (!v) return void c();
            var e = a.getTransitionDurationFromElement(this._backdrop);
            l(this._backdrop).one(a.TRANSITION_END, c).emulateTransitionEnd(e);
          } else if (!this._isShown && this._backdrop) {
            l(this._backdrop).removeClass(Hl);
            var t = function () {
              h._removeBackdrop(), c && c();
            };
            if (l(this._element).hasClass(fl)) {
              var z = a.getTransitionDurationFromElement(this._backdrop);
              l(this._backdrop).one(a.TRANSITION_END, t).emulateTransitionEnd(z);
            } else t();
          } else c && c();
        }),
        (h._adjustDialog = function () {
          var c = this._element.scrollHeight > document.documentElement.clientHeight;
          !this._isBodyOverflowing && c && (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
            this._isBodyOverflowing && !c && (this._element.style.paddingRight = this._scrollbarWidth + "px");
        }),
        (h._resetAdjustments = function () {
          (this._element.style.paddingLeft = ""), (this._element.style.paddingRight = "");
        }),
        (h._checkScrollbar = function () {
          var c = document.body.getBoundingClientRect();
          (this._isBodyOverflowing = c.left + c.right < window.innerWidth), (this._scrollbarWidth = this._getScrollbarWidth());
        }),
        (h._setScrollbar = function () {
          var c = this;
          if (this._isBodyOverflowing) {
            var h = [].slice.call(document.querySelectorAll(Cl)),
              v = [].slice.call(document.querySelectorAll(Ll));
            l(h).each(function (h, v) {
              var e = v.style.paddingRight,
                t = l(v).css("padding-right");
              l(v)
                .data("padding-right", e)
                .css("padding-right", parseFloat(t) + c._scrollbarWidth + "px");
            }),
              l(v).each(function (h, v) {
                var e = v.style.marginRight,
                  t = l(v).css("margin-right");
                l(v)
                  .data("margin-right", e)
                  .css("margin-right", parseFloat(t) - c._scrollbarWidth + "px");
              });
            var e = document.body.style.paddingRight,
              t = l(document.body).css("padding-right");
            l(document.body)
              .data("padding-right", e)
              .css("padding-right", parseFloat(t) + this._scrollbarWidth + "px");
          }
          l(document.body).addClass(ol);
        }),
        (h._resetScrollbar = function () {
          var c = [].slice.call(document.querySelectorAll(Cl));
          l(c).each(function (c, h) {
            var v = l(h).data("padding-right");
            l(h).removeData("padding-right"), (h.style.paddingRight = v || "");
          });
          var h = [].slice.call(document.querySelectorAll("" + Ll));
          l(h).each(function (c, h) {
            var v = l(h).data("margin-right");
            void 0 !== v && l(h).css("margin-right", v).removeData("margin-right");
          });
          var v = l(document.body).data("padding-right");
          l(document.body).removeData("padding-right"), (document.body.style.paddingRight = v || "");
        }),
        (h._getScrollbarWidth = function () {
          var c = document.createElement("div");
          (c.className = "modal-scrollbar-measure"), document.body.appendChild(c);
          var l = c.getBoundingClientRect().width - c.clientWidth;
          return document.body.removeChild(c), l;
        }),
        (c._jQueryInterface = function (h, v) {
          return this.each(function () {
            var e = l(this).data(al),
              z = t({}, nl, {}, l(this).data(), {}, "object" == typeof h && h ? h : {});
            if ((e || ((e = new c(this, z)), l(this).data(al, e)), "string" == typeof h)) {
              if (void 0 === e[h]) throw new TypeError('No method named "' + h + '"');
              e[h](v);
            } else z.show && e.show(v);
          });
        }),
        v(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return nl;
            },
          },
        ]),
        c
      );
    })();
  l(document).on(il.CLICK_DATA_API, '[data-toggle="modal"]', function (c) {
    var h,
      v = this,
      e = a.getSelectorFromElement(this);
    e && (h = document.querySelector(e));
    var z = l(h).data(al) ? "toggle" : t({}, l(h).data(), {}, l(this).data());
    ("A" !== this.tagName && "AREA" !== this.tagName) || c.preventDefault();
    var s = l(h).one(il.SHOW, function (c) {
      c.isDefaultPrevented() ||
        s.one(il.HIDDEN, function () {
          l(v).is(":visible") && v.focus();
        });
    });
    dl._jQueryInterface.call(l(h), z, this);
  }),
    (l.fn[zl] = dl._jQueryInterface),
    (l.fn[zl].Constructor = dl),
    (l.fn[zl].noConflict = function () {
      return (l.fn[zl] = ml), dl._jQueryInterface;
    });
  var ul = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
    pl = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
    gl = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
  function bl(c, l, h) {
    if (0 === c.length) return c;
    if (h && "function" == typeof h) return h(c);
    for (
      var v = new window.DOMParser().parseFromString(c, "text/html"),
        e = Object.keys(l),
        t = [].slice.call(v.body.querySelectorAll("*")),
        z = function (c) {
          var h = t[c],
            v = h.nodeName.toLowerCase();
          if (-1 === e.indexOf(h.nodeName.toLowerCase())) return h.parentNode.removeChild(h), "continue";
          var z = [].slice.call(h.attributes),
            a = [].concat(l["*"] || [], l[v] || []);
          z.forEach(function (c) {
            !(function (c, l) {
              var h = c.nodeName.toLowerCase();
              if (-1 !== l.indexOf(h)) return -1 === ul.indexOf(h) || Boolean(c.nodeValue.match(pl) || c.nodeValue.match(gl));
              for (
                var v = l.filter(function (c) {
                    return c instanceof RegExp;
                  }),
                  e = 0,
                  t = v.length;
                e < t;
                e++
              )
                if (h.match(v[e])) return !0;
              return !1;
            })(c, a) && h.removeAttribute(c.nodeName);
          });
        },
        a = 0,
        s = t.length;
      a < s;
      a++
    )
      z(a);
    return v.body.innerHTML;
  }
  var wl = "tooltip",
    yl = "bs.tooltip",
    _l = "." + yl,
    Sl = l.fn[wl],
    Al = "bs-tooltip",
    kl = new RegExp("(^|\\s)" + Al + "\\S+", "g"),
    El = ["sanitize", "whiteList", "sanitizeFn"],
    xl = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
      popperConfig: "(null|object)",
    },
    Tl = { AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" },
    Dl = {
      animation: !0,
      template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      popperConfig: null,
    },
    Ol = "show",
    Nl = {
      HIDE: "hide" + _l,
      HIDDEN: "hidden" + _l,
      SHOW: "show" + _l,
      SHOWN: "shown" + _l,
      INSERTED: "inserted" + _l,
      CLICK: "click" + _l,
      FOCUSIN: "focusin" + _l,
      FOCUSOUT: "focusout" + _l,
      MOUSEENTER: "mouseenter" + _l,
      MOUSELEAVE: "mouseleave" + _l,
    },
    Il = "fade",
    ql = "show",
    jl = "hover",
    Pl = "focus",
    Rl = (function () {
      function c(c, l) {
        if (void 0 === Uc) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
        (this._isEnabled = !0),
          (this._timeout = 0),
          (this._hoverState = ""),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this.element = c),
          (this.config = this._getConfig(l)),
          (this.tip = null),
          this._setListeners();
      }
      var h = c.prototype;
      return (
        (h.enable = function () {
          this._isEnabled = !0;
        }),
        (h.disable = function () {
          this._isEnabled = !1;
        }),
        (h.toggleEnabled = function () {
          this._isEnabled = !this._isEnabled;
        }),
        (h.toggle = function (c) {
          if (this._isEnabled)
            if (c) {
              var h = this.constructor.DATA_KEY,
                v = l(c.currentTarget).data(h);
              v || ((v = new this.constructor(c.currentTarget, this._getDelegateConfig())), l(c.currentTarget).data(h, v)),
                (v._activeTrigger.click = !v._activeTrigger.click),
                v._isWithActiveTrigger() ? v._enter(null, v) : v._leave(null, v);
            } else {
              if (l(this.getTipElement()).hasClass(ql)) return void this._leave(null, this);
              this._enter(null, this);
            }
        }),
        (h.dispose = function () {
          clearTimeout(this._timeout),
            l.removeData(this.element, this.constructor.DATA_KEY),
            l(this.element).off(this.constructor.EVENT_KEY),
            l(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler),
            this.tip && l(this.tip).remove(),
            (this._isEnabled = null),
            (this._timeout = null),
            (this._hoverState = null),
            (this._activeTrigger = null),
            this._popper && this._popper.destroy(),
            (this._popper = null),
            (this.element = null),
            (this.config = null),
            (this.tip = null);
        }),
        (h.show = function () {
          var c = this;
          if ("none" === l(this.element).css("display")) throw new Error("Please use show on visible elements");
          var h = l.Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
            l(this.element).trigger(h);
            var v = a.findShadowRoot(this.element),
              e = l.contains(null !== v ? v : this.element.ownerDocument.documentElement, this.element);
            if (h.isDefaultPrevented() || !e) return;
            var t = this.getTipElement(),
              z = a.getUID(this.constructor.NAME);
            t.setAttribute("id", z), this.element.setAttribute("aria-describedby", z), this.setContent(), this.config.animation && l(t).addClass(Il);
            var s = "function" == typeof this.config.placement ? this.config.placement.call(this, t, this.element) : this.config.placement,
              m = this._getAttachment(s);
            this.addAttachmentClass(m);
            var n = this._getContainer();
            l(t).data(this.constructor.DATA_KEY, this),
              l.contains(this.element.ownerDocument.documentElement, this.tip) || l(t).appendTo(n),
              l(this.element).trigger(this.constructor.Event.INSERTED),
              (this._popper = new Uc(this.element, t, this._getPopperConfig(m))),
              l(t).addClass(ql),
              "ontouchstart" in document.documentElement && l(document.body).children().on("mouseover", null, l.noop);
            var r = function () {
              c.config.animation && c._fixTransition();
              var h = c._hoverState;
              (c._hoverState = null), l(c.element).trigger(c.constructor.Event.SHOWN), "out" === h && c._leave(null, c);
            };
            if (l(this.tip).hasClass(Il)) {
              var i = a.getTransitionDurationFromElement(this.tip);
              l(this.tip).one(a.TRANSITION_END, r).emulateTransitionEnd(i);
            } else r();
          }
        }),
        (h.hide = function (c) {
          function h() {
            v._hoverState !== Ol && e.parentNode && e.parentNode.removeChild(e),
              v._cleanTipClass(),
              v.element.removeAttribute("aria-describedby"),
              l(v.element).trigger(v.constructor.Event.HIDDEN),
              null !== v._popper && v._popper.destroy(),
              c && c();
          }
          var v = this,
            e = this.getTipElement(),
            t = l.Event(this.constructor.Event.HIDE);
          if ((l(this.element).trigger(t), !t.isDefaultPrevented())) {
            if (
              (l(e).removeClass(ql),
              "ontouchstart" in document.documentElement && l(document.body).children().off("mouseover", null, l.noop),
              (this._activeTrigger.click = !1),
              (this._activeTrigger[Pl] = !1),
              (this._activeTrigger[jl] = !1),
              l(this.tip).hasClass(Il))
            ) {
              var z = a.getTransitionDurationFromElement(e);
              l(e).one(a.TRANSITION_END, h).emulateTransitionEnd(z);
            } else h();
            this._hoverState = "";
          }
        }),
        (h.update = function () {
          null !== this._popper && this._popper.scheduleUpdate();
        }),
        (h.isWithContent = function () {
          return Boolean(this.getTitle());
        }),
        (h.addAttachmentClass = function (c) {
          l(this.getTipElement()).addClass(Al + "-" + c);
        }),
        (h.getTipElement = function () {
          return (this.tip = this.tip || l(this.config.template)[0]), this.tip;
        }),
        (h.setContent = function () {
          var c = this.getTipElement();
          this.setElementContent(l(c.querySelectorAll(".tooltip-inner")), this.getTitle()), l(c).removeClass(Il + " " + ql);
        }),
        (h.setElementContent = function (c, h) {
          "object" != typeof h || (!h.nodeType && !h.jquery)
            ? this.config.html
              ? (this.config.sanitize && (h = bl(h, this.config.whiteList, this.config.sanitizeFn)), c.html(h))
              : c.text(h)
            : this.config.html
            ? l(h).parent().is(c) || c.empty().append(h)
            : c.text(l(h).text());
        }),
        (h.getTitle = function () {
          var c = this.element.getAttribute("data-original-title");
          return c || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title);
        }),
        (h._getPopperConfig = function (c) {
          var l = this;
          return t(
            {},
            {
              placement: c,
              modifiers: { offset: this._getOffset(), flip: { behavior: this.config.fallbackPlacement }, arrow: { element: ".arrow" }, preventOverflow: { boundariesElement: this.config.boundary } },
              onCreate: function (c) {
                c.originalPlacement !== c.placement && l._handlePopperPlacementChange(c);
              },
              onUpdate: function (c) {
                return l._handlePopperPlacementChange(c);
              },
            },
            {},
            this.config.popperConfig
          );
        }),
        (h._getOffset = function () {
          var c = this,
            l = {};
          return (
            "function" == typeof this.config.offset
              ? (l.fn = function (l) {
                  return (l.offsets = t({}, l.offsets, {}, c.config.offset(l.offsets, c.element) || {})), l;
                })
              : (l.offset = this.config.offset),
            l
          );
        }),
        (h._getContainer = function () {
          return !1 === this.config.container ? document.body : a.isElement(this.config.container) ? l(this.config.container) : l(document).find(this.config.container);
        }),
        (h._getAttachment = function (c) {
          return Tl[c.toUpperCase()];
        }),
        (h._setListeners = function () {
          var c = this;
          this.config.trigger.split(" ").forEach(function (h) {
            if ("click" === h)
              l(c.element).on(c.constructor.Event.CLICK, c.config.selector, function (l) {
                return c.toggle(l);
              });
            else if ("manual" !== h) {
              var v = h === jl ? c.constructor.Event.MOUSEENTER : c.constructor.Event.FOCUSIN,
                e = h === jl ? c.constructor.Event.MOUSELEAVE : c.constructor.Event.FOCUSOUT;
              l(c.element)
                .on(v, c.config.selector, function (l) {
                  return c._enter(l);
                })
                .on(e, c.config.selector, function (l) {
                  return c._leave(l);
                });
            }
          }),
            (this._hideModalHandler = function () {
              c.element && c.hide();
            }),
            l(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler),
            this.config.selector ? (this.config = t({}, this.config, { trigger: "manual", selector: "" })) : this._fixTitle();
        }),
        (h._fixTitle = function () {
          var c = typeof this.element.getAttribute("data-original-title");
          (!this.element.getAttribute("title") && "string" == c) ||
            (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
        }),
        (h._enter = function (c, h) {
          var v = this.constructor.DATA_KEY;
          (h = h || l(c.currentTarget).data(v)) || ((h = new this.constructor(c.currentTarget, this._getDelegateConfig())), l(c.currentTarget).data(v, h)),
            c && (h._activeTrigger["focusin" === c.type ? Pl : jl] = !0),
            l(h.getTipElement()).hasClass(ql) || h._hoverState === Ol
              ? (h._hoverState = Ol)
              : (clearTimeout(h._timeout),
                (h._hoverState = Ol),
                h.config.delay && h.config.delay.show
                  ? (h._timeout = setTimeout(function () {
                      h._hoverState === Ol && h.show();
                    }, h.config.delay.show))
                  : h.show());
        }),
        (h._leave = function (c, h) {
          var v = this.constructor.DATA_KEY;
          (h = h || l(c.currentTarget).data(v)) || ((h = new this.constructor(c.currentTarget, this._getDelegateConfig())), l(c.currentTarget).data(v, h)),
            c && (h._activeTrigger["focusout" === c.type ? Pl : jl] = !1),
            h._isWithActiveTrigger() ||
              (clearTimeout(h._timeout),
              (h._hoverState = "out"),
              h.config.delay && h.config.delay.hide
                ? (h._timeout = setTimeout(function () {
                    "out" === h._hoverState && h.hide();
                  }, h.config.delay.hide))
                : h.hide());
        }),
        (h._isWithActiveTrigger = function () {
          for (var c in this._activeTrigger) if (this._activeTrigger[c]) return !0;
          return !1;
        }),
        (h._getConfig = function (c) {
          var h = l(this.element).data();
          return (
            Object.keys(h).forEach(function (c) {
              -1 !== El.indexOf(c) && delete h[c];
            }),
            "number" == typeof (c = t({}, this.constructor.Default, {}, h, {}, "object" == typeof c && c ? c : {})).delay && (c.delay = { show: c.delay, hide: c.delay }),
            "number" == typeof c.title && (c.title = c.title.toString()),
            "number" == typeof c.content && (c.content = c.content.toString()),
            a.typeCheckConfig(wl, c, this.constructor.DefaultType),
            c.sanitize && (c.template = bl(c.template, c.whiteList, c.sanitizeFn)),
            c
          );
        }),
        (h._getDelegateConfig = function () {
          var c = {};
          if (this.config) for (var l in this.config) this.constructor.Default[l] !== this.config[l] && (c[l] = this.config[l]);
          return c;
        }),
        (h._cleanTipClass = function () {
          var c = l(this.getTipElement()),
            h = c.attr("class").match(kl);
          null !== h && h.length && c.removeClass(h.join(""));
        }),
        (h._handlePopperPlacementChange = function (c) {
          var l = c.instance;
          (this.tip = l.popper), this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(c.placement));
        }),
        (h._fixTransition = function () {
          var c = this.getTipElement(),
            h = this.config.animation;
          null === c.getAttribute("x-placement") && (l(c).removeClass(Il), (this.config.animation = !1), this.hide(), this.show(), (this.config.animation = h));
        }),
        (c._jQueryInterface = function (h) {
          return this.each(function () {
            var v = l(this).data(yl),
              e = "object" == typeof h && h;
            if ((v || !/dispose|hide/.test(h)) && (v || ((v = new c(this, e)), l(this).data(yl, v)), "string" == typeof h)) {
              if (void 0 === v[h]) throw new TypeError('No method named "' + h + '"');
              v[h]();
            }
          });
        }),
        v(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return Dl;
            },
          },
          {
            key: "NAME",
            get: function () {
              return wl;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return yl;
            },
          },
          {
            key: "Event",
            get: function () {
              return Nl;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return _l;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return xl;
            },
          },
        ]),
        c
      );
    })();
  (l.fn[wl] = Rl._jQueryInterface),
    (l.fn[wl].Constructor = Rl),
    (l.fn[wl].noConflict = function () {
      return (l.fn[wl] = Sl), Rl._jQueryInterface;
    });
  var Fl = "popover",
    Ul = "bs.popover",
    Wl = "." + Ul,
    Bl = l.fn[Fl],
    Kl = "bs-popover",
    Ql = new RegExp("(^|\\s)" + Kl + "\\S+", "g"),
    Yl = t({}, Rl.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    }),
    Xl = t({}, Rl.DefaultType, { content: "(string|element|function)" }),
    Zl = {
      HIDE: "hide" + Wl,
      HIDDEN: "hidden" + Wl,
      SHOW: "show" + Wl,
      SHOWN: "shown" + Wl,
      INSERTED: "inserted" + Wl,
      CLICK: "click" + Wl,
      FOCUSIN: "focusin" + Wl,
      FOCUSOUT: "focusout" + Wl,
      MOUSEENTER: "mouseenter" + Wl,
      MOUSELEAVE: "mouseleave" + Wl,
    },
    Gl = (function (c) {
      function h() {
        return c.apply(this, arguments) || this;
      }
      !(function (c, l) {
        (c.prototype = Object.create(l.prototype)), ((c.prototype.constructor = c).__proto__ = l);
      })(h, c);
      var e = h.prototype;
      return (
        (e.isWithContent = function () {
          return this.getTitle() || this._getContent();
        }),
        (e.addAttachmentClass = function (c) {
          l(this.getTipElement()).addClass(Kl + "-" + c);
        }),
        (e.getTipElement = function () {
          return (this.tip = this.tip || l(this.config.template)[0]), this.tip;
        }),
        (e.setContent = function () {
          var c = l(this.getTipElement());
          this.setElementContent(c.find(".popover-header"), this.getTitle());
          var h = this._getContent();
          "function" == typeof h && (h = h.call(this.element)), this.setElementContent(c.find(".popover-body"), h), c.removeClass("fade show");
        }),
        (e._getContent = function () {
          return this.element.getAttribute("data-content") || this.config.content;
        }),
        (e._cleanTipClass = function () {
          var c = l(this.getTipElement()),
            h = c.attr("class").match(Ql);
          null !== h && 0 < h.length && c.removeClass(h.join(""));
        }),
        (h._jQueryInterface = function (c) {
          return this.each(function () {
            var v = l(this).data(Ul),
              e = "object" == typeof c ? c : null;
            if ((v || !/dispose|hide/.test(c)) && (v || ((v = new h(this, e)), l(this).data(Ul, v)), "string" == typeof c)) {
              if (void 0 === v[c]) throw new TypeError('No method named "' + c + '"');
              v[c]();
            }
          });
        }),
        v(h, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return Yl;
            },
          },
          {
            key: "NAME",
            get: function () {
              return Fl;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return Ul;
            },
          },
          {
            key: "Event",
            get: function () {
              return Zl;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return Wl;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Xl;
            },
          },
        ]),
        h
      );
    })(Rl);
  (l.fn[Fl] = Gl._jQueryInterface),
    (l.fn[Fl].Constructor = Gl),
    (l.fn[Fl].noConflict = function () {
      return (l.fn[Fl] = Bl), Gl._jQueryInterface;
    });
  var $l = "scrollspy",
    Jl = "bs.scrollspy",
    ch = "." + Jl,
    lh = l.fn[$l],
    hh = { offset: 10, method: "auto", target: "" },
    vh = { offset: "number", method: "string", target: "(string|element)" },
    eh = { ACTIVATE: "activate" + ch, SCROLL: "scroll" + ch, LOAD_DATA_API: "load" + ch + ".data-api" },
    th = "active",
    zh = ".nav, .list-group",
    ah = ".nav-link",
    sh = ".list-group-item",
    mh = ".dropdown-item",
    nh = "position",
    rh = (function () {
      function c(c, h) {
        var v = this;
        (this._element = c),
          (this._scrollElement = "BODY" === c.tagName ? window : c),
          (this._config = this._getConfig(h)),
          (this._selector = this._config.target + " " + ah + "," + this._config.target + " " + sh + "," + this._config.target + " " + mh),
          (this._offsets = []),
          (this._targets = []),
          (this._activeTarget = null),
          (this._scrollHeight = 0),
          l(this._scrollElement).on(eh.SCROLL, function (c) {
            return v._process(c);
          }),
          this.refresh(),
          this._process();
      }
      var h = c.prototype;
      return (
        (h.refresh = function () {
          var c = this,
            h = this._scrollElement === this._scrollElement.window ? "offset" : nh,
            v = "auto" === this._config.method ? h : this._config.method,
            e = v === nh ? this._getScrollTop() : 0;
          (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (c) {
                var h,
                  t = a.getSelectorFromElement(c);
                if ((t && (h = document.querySelector(t)), h)) {
                  var z = h.getBoundingClientRect();
                  if (z.width || z.height) return [l(h)[v]().top + e, t];
                }
                return null;
              })
              .filter(function (c) {
                return c;
              })
              .sort(function (c, l) {
                return c[0] - l[0];
              })
              .forEach(function (l) {
                c._offsets.push(l[0]), c._targets.push(l[1]);
              });
        }),
        (h.dispose = function () {
          l.removeData(this._element, Jl),
            l(this._scrollElement).off(ch),
            (this._element = null),
            (this._scrollElement = null),
            (this._config = null),
            (this._selector = null),
            (this._offsets = null),
            (this._targets = null),
            (this._activeTarget = null),
            (this._scrollHeight = null);
        }),
        (h._getConfig = function (c) {
          if ("string" != typeof (c = t({}, hh, {}, "object" == typeof c && c ? c : {})).target) {
            var h = l(c.target).attr("id");
            h || ((h = a.getUID($l)), l(c.target).attr("id", h)), (c.target = "#" + h);
          }
          return a.typeCheckConfig($l, c, vh), c;
        }),
        (h._getScrollTop = function () {
          return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
        }),
        (h._getScrollHeight = function () {
          return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }),
        (h._getOffsetHeight = function () {
          return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
        }),
        (h._process = function () {
          var c = this._getScrollTop() + this._config.offset,
            l = this._getScrollHeight(),
            h = this._config.offset + l - this._getOffsetHeight();
          if ((this._scrollHeight !== l && this.refresh(), h <= c)) {
            var v = this._targets[this._targets.length - 1];
            this._activeTarget !== v && this._activate(v);
          } else {
            if (this._activeTarget && c < this._offsets[0] && 0 < this._offsets[0]) return (this._activeTarget = null), void this._clear();
            for (var e = this._offsets.length; e--; )
              this._activeTarget !== this._targets[e] && c >= this._offsets[e] && (void 0 === this._offsets[e + 1] || c < this._offsets[e + 1]) && this._activate(this._targets[e]);
          }
        }),
        (h._activate = function (c) {
          (this._activeTarget = c), this._clear();
          var h = this._selector.split(",").map(function (l) {
              return l + '[data-target="' + c + '"],' + l + '[href="' + c + '"]';
            }),
            v = l([].slice.call(document.querySelectorAll(h.join(","))));
          v.hasClass("dropdown-item")
            ? (v.closest(".dropdown").find(".dropdown-toggle").addClass(th), v.addClass(th))
            : (v.addClass(th),
              v
                .parents(zh)
                .prev(ah + ", " + sh)
                .addClass(th),
              v.parents(zh).prev(".nav-item").children(ah).addClass(th)),
            l(this._scrollElement).trigger(eh.ACTIVATE, { relatedTarget: c });
        }),
        (h._clear = function () {
          [].slice
            .call(document.querySelectorAll(this._selector))
            .filter(function (c) {
              return c.classList.contains(th);
            })
            .forEach(function (c) {
              return c.classList.remove(th);
            });
        }),
        (c._jQueryInterface = function (h) {
          return this.each(function () {
            var v = l(this).data(Jl);
            if ((v || ((v = new c(this, "object" == typeof h && h)), l(this).data(Jl, v)), "string" == typeof h)) {
              if (void 0 === v[h]) throw new TypeError('No method named "' + h + '"');
              v[h]();
            }
          });
        }),
        v(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return hh;
            },
          },
        ]),
        c
      );
    })();
  l(window).on(eh.LOAD_DATA_API, function () {
    for (var c = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), h = c.length; h--; ) {
      var v = l(c[h]);
      rh._jQueryInterface.call(v, v.data());
    }
  }),
    (l.fn[$l] = rh._jQueryInterface),
    (l.fn[$l].Constructor = rh),
    (l.fn[$l].noConflict = function () {
      return (l.fn[$l] = lh), rh._jQueryInterface;
    });
  var ih = "bs.tab",
    oh = "." + ih,
    fh = l.fn.tab,
    Hh = { HIDE: "hide" + oh, HIDDEN: "hidden" + oh, SHOW: "show" + oh, SHOWN: "shown" + oh, CLICK_DATA_API: "click" + oh + ".data-api" },
    Mh = "active",
    Vh = ".active",
    Ch = "> li > .active",
    Lh = (function () {
      function c(c) {
        this._element = c;
      }
      var h = c.prototype;
      return (
        (h.show = function () {
          var c = this;
          if (!((this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && l(this._element).hasClass(Mh)) || l(this._element).hasClass("disabled"))) {
            var h,
              v,
              e = l(this._element).closest(".nav, .list-group")[0],
              t = a.getSelectorFromElement(this._element);
            if (e) {
              var z = "UL" === e.nodeName || "OL" === e.nodeName ? Ch : Vh;
              v = (v = l.makeArray(l(e).find(z)))[v.length - 1];
            }
            var s = l.Event(Hh.HIDE, { relatedTarget: this._element }),
              m = l.Event(Hh.SHOW, { relatedTarget: v });
            if ((v && l(v).trigger(s), l(this._element).trigger(m), !m.isDefaultPrevented() && !s.isDefaultPrevented())) {
              t && (h = document.querySelector(t)), this._activate(this._element, e);
              var n = function () {
                var h = l.Event(Hh.HIDDEN, { relatedTarget: c._element }),
                  e = l.Event(Hh.SHOWN, { relatedTarget: v });
                l(v).trigger(h), l(c._element).trigger(e);
              };
              h ? this._activate(h, h.parentNode, n) : n();
            }
          }
        }),
        (h.dispose = function () {
          l.removeData(this._element, ih), (this._element = null);
        }),
        (h._activate = function (c, h, v) {
          function e() {
            return t._transitionComplete(c, z, v);
          }
          var t = this,
            z = (!h || ("UL" !== h.nodeName && "OL" !== h.nodeName) ? l(h).children(Vh) : l(h).find(Ch))[0],
            s = v && z && l(z).hasClass("fade");
          if (z && s) {
            var m = a.getTransitionDurationFromElement(z);
            l(z).removeClass("show").one(a.TRANSITION_END, e).emulateTransitionEnd(m);
          } else e();
        }),
        (h._transitionComplete = function (c, h, v) {
          if (h) {
            l(h).removeClass(Mh);
            var e = l(h.parentNode).find("> .dropdown-menu .active")[0];
            e && l(e).removeClass(Mh), "tab" === h.getAttribute("role") && h.setAttribute("aria-selected", !1);
          }
          if (
            (l(c).addClass(Mh),
            "tab" === c.getAttribute("role") && c.setAttribute("aria-selected", !0),
            a.reflow(c),
            c.classList.contains("fade") && c.classList.add("show"),
            c.parentNode && l(c.parentNode).hasClass("dropdown-menu"))
          ) {
            var t = l(c).closest(".dropdown")[0];
            if (t) {
              var z = [].slice.call(t.querySelectorAll(".dropdown-toggle"));
              l(z).addClass(Mh);
            }
            c.setAttribute("aria-expanded", !0);
          }
          v && v();
        }),
        (c._jQueryInterface = function (h) {
          return this.each(function () {
            var v = l(this),
              e = v.data(ih);
            if ((e || ((e = new c(this)), v.data(ih, e)), "string" == typeof h)) {
              if (void 0 === e[h]) throw new TypeError('No method named "' + h + '"');
              e[h]();
            }
          });
        }),
        v(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
        ]),
        c
      );
    })();
  l(document).on(Hh.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function (c) {
    c.preventDefault(), Lh._jQueryInterface.call(l(this), "show");
  }),
    (l.fn.tab = Lh._jQueryInterface),
    (l.fn.tab.Constructor = Lh),
    (l.fn.tab.noConflict = function () {
      return (l.fn.tab = fh), Lh._jQueryInterface;
    });
  var dh = "toast",
    uh = "bs.toast",
    ph = "." + uh,
    gh = l.fn[dh],
    bh = { CLICK_DISMISS: "click.dismiss" + ph, HIDE: "hide" + ph, HIDDEN: "hidden" + ph, SHOW: "show" + ph, SHOWN: "shown" + ph },
    wh = "hide",
    yh = "show",
    _h = "showing",
    Sh = { animation: "boolean", autohide: "boolean", delay: "number" },
    Ah = { animation: !0, autohide: !0, delay: 500 },
    kh = (function () {
      function c(c, l) {
        (this._element = c), (this._config = this._getConfig(l)), (this._timeout = null), this._setListeners();
      }
      var h = c.prototype;
      return (
        (h.show = function () {
          var c = this,
            h = l.Event(bh.SHOW);
          if ((l(this._element).trigger(h), !h.isDefaultPrevented())) {
            this._config.animation && this._element.classList.add("fade");
            var v = function () {
              c._element.classList.remove(_h),
                c._element.classList.add(yh),
                l(c._element).trigger(bh.SHOWN),
                c._config.autohide &&
                  (c._timeout = setTimeout(function () {
                    c.hide();
                  }, c._config.delay));
            };
            if ((this._element.classList.remove(wh), a.reflow(this._element), this._element.classList.add(_h), this._config.animation)) {
              var e = a.getTransitionDurationFromElement(this._element);
              l(this._element).one(a.TRANSITION_END, v).emulateTransitionEnd(e);
            } else v();
          }
        }),
        (h.hide = function () {
          if (this._element.classList.contains(yh)) {
            var c = l.Event(bh.HIDE);
            l(this._element).trigger(c), c.isDefaultPrevented() || this._close();
          }
        }),
        (h.dispose = function () {
          clearTimeout(this._timeout),
            (this._timeout = null),
            this._element.classList.contains(yh) && this._element.classList.remove(yh),
            l(this._element).off(bh.CLICK_DISMISS),
            l.removeData(this._element, uh),
            (this._element = null),
            (this._config = null);
        }),
        (h._getConfig = function (c) {
          return (c = t({}, Ah, {}, l(this._element).data(), {}, "object" == typeof c && c ? c : {})), a.typeCheckConfig(dh, c, this.constructor.DefaultType), c;
        }),
        (h._setListeners = function () {
          var c = this;
          l(this._element).on(bh.CLICK_DISMISS, '[data-dismiss="toast"]', function () {
            return c.hide();
          });
        }),
        (h._close = function () {
          function c() {
            h._element.classList.add(wh), l(h._element).trigger(bh.HIDDEN);
          }
          var h = this;
          if ((this._element.classList.remove(yh), this._config.animation)) {
            var v = a.getTransitionDurationFromElement(this._element);
            l(this._element).one(a.TRANSITION_END, c).emulateTransitionEnd(v);
          } else c();
        }),
        (c._jQueryInterface = function (h) {
          return this.each(function () {
            var v = l(this),
              e = v.data(uh);
            if ((e || ((e = new c(this, "object" == typeof h && h)), v.data(uh, e)), "string" == typeof h)) {
              if (void 0 === e[h]) throw new TypeError('No method named "' + h + '"');
              e[h](this);
            }
          });
        }),
        v(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return Sh;
            },
          },
          {
            key: "Default",
            get: function () {
              return Ah;
            },
          },
        ]),
        c
      );
    })();
  (l.fn[dh] = kh._jQueryInterface),
    (l.fn[dh].Constructor = kh),
    (l.fn[dh].noConflict = function () {
      return (l.fn[dh] = gh), kh._jQueryInterface;
    }),
    (c.Alert = o),
    (c.Button = b),
    (c.Carousel = j),
    (c.Collapse = $),
    (c.Dropdown = tl),
    (c.Modal = dl),
    (c.Popover = Gl),
    (c.Scrollspy = rh),
    (c.Tab = Lh),
    (c.Toast = kh),
    (c.Tooltip = Rl),
    (c.Util = a),
    Object.defineProperty(c, "__esModule", { value: !0 });
});
