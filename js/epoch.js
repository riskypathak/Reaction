(function () { var e; null == window.Epoch && (window.Epoch = {}); null == (e = window.Epoch).Chart && (e.Chart = {}); null == (e = window.Epoch).Time && (e.Time = {}); null == (e = window.Epoch).Util && (e.Util = {}); null == (e = window.Epoch).Formats && (e.Formats = {}); Epoch.warn = function (g) { return (console.warn || console.log)("Epoch Warning: " + g) }; Epoch.exception = function (g) { throw "Epoch Error: " + g; } }).call(this);
(function () {
    Epoch.TestContext = function () {
        function e() { var c, a, d; this._log = []; a = 0; for (d = g.length; a < d; a++) c = g[a], this._makeFauxMethod(c) } var g; g = "arc arcTo beginPath bezierCurveTo clearRect clip closePath drawImage fill fillRect fillText moveTo quadraticCurveTo rect restore rotate save scale scrollPathIntoView setLineDash setTransform stroke strokeRect strokeText transform translate".split(" "); e.prototype._makeFauxMethod = function (c) {
            return this[c] = function () {
                var a; return this._log.push("" + c + "(" + function () {
                    var d,
                    b, h; h = []; d = 0; for (b = arguments.length; d < b; d++) a = arguments[d], h.push(a.toString()); return h
                }.apply(this, arguments).join(",") + ")")
            }
        }; e.prototype.getImageData = function () { var c; this._log.push("getImageData(" + function () { var a, d, b; b = []; a = 0; for (d = arguments.length; a < d; a++) c = arguments[a], b.push(c.toString()); return b }.apply(this, arguments).join(",") + ")"); return { width: 0, height: 0, resolution: 1, data: [] } }; return e
    }()
}).call(this);
(function () {
    var e, g; e = function (c) { return function (a) { return Object.prototype.toString.call(a) === "[object " + c + "]" } }; Epoch.isArray = null != (g = Array.isArray) ? g : e("Array"); Epoch.isObject = e("Object"); Epoch.isString = e("String"); Epoch.isFunction = e("Function"); Epoch.isNumber = e("Number"); Epoch.isElement = function (c) { return "undefined" !== typeof HTMLElement && null !== HTMLElement ? c instanceof HTMLElement : null != c && Epoch.isObject(c) && 1 === c.nodeType && Epoch.isString(c.nodeName) }; Epoch.Util.copy = function (c) {
        var a, d, b; if (null ==
        c) return null; a = {}; for (d in c) b = c[d], a[d] = b; return a
    }; Epoch.Util.defaults = function (c, a) { var d, b, h, k, f; f = Epoch.Util.copy(c); for (h in a) k = c[h], b = a[h], d = Epoch.isObject(k) && Epoch.isObject(b), null != k && null != b ? d && !Epoch.isArray(k) ? f[h] = Epoch.Util.defaults(k, b) : f[h] = k : f[h] = null != k ? k : b; return f }; Epoch.Util.formatSI = function (c, a, d) {
        var b, h, k, f; null == a && (a = 1); null == d && (d = !1); if (1E3 > c) { if ((c | 0) !== c || d) c = c.toFixed(a); return c } f = "KMGTPEZY".split(""); for (h in f) if (k = f[h], b = Math.pow(10, 3 * ((h | 0) + 1)), c >= b && c < Math.pow(10,
        3 * ((h | 0) + 2))) { c /= b; if (0 !== c % 1 || d) c = c.toFixed(a); return "" + c + " " + k }
    }; Epoch.Util.formatBytes = function (c, a, d) { var b, h, k, f; null == a && (a = 1); null == d && (d = !1); if (1024 > c) { if (0 !== c % 1 || d) c = c.toFixed(a); return "" + c + " B" } f = "KB MB GB TB PB EB ZB YB".split(" "); for (h in f) if (k = f[h], b = Math.pow(1024, (h | 0) + 1), c >= b && c < Math.pow(1024, (h | 0) + 2)) { c /= b; if (0 !== c % 1 || d) c = c.toFixed(a); return "" + c + " " + k } }; Epoch.Util.dasherize = function (c) { return Epoch.Util.trim(c).replace("\n", "").replace(/\s+/g, "-").toLowerCase() }; Epoch.Util.domain =
    function (c, a) { var d, b, h, k, f, q, u, m; null == a && (a = "x"); h = {}; d = []; k = 0; for (q = c.length; k < q; k++) for (b = c[k], m = b.values, f = 0, u = m.length; f < u; f++) b = m[f], null == h[b[a]] && (d.push(b[a]), h[b[a]] = !0); return d }; Epoch.Util.trim = function (c) { return Epoch.isString(c) ? c.replace(/^\s+/g, "").replace(/\s+$/g, "") : null }; Epoch.Util.getComputedStyle = function (c, a) { if (Epoch.isFunction(window.getComputedStyle)) return window.getComputedStyle(c, a); if (null != c.currentStyle) return c.currentStyle }; Epoch.Util.toRGBA = function (c, a) {
        var d, b,
        h; if (d = c.match(/^rgba\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*[0-9\.]+\)/)) h = d[1], b = d[2], d = d[3], b = "rgba(" + h + "," + b + "," + d + "," + a + ")"; else if (d = d3.rgb(c)) b = "rgba(" + d.r + "," + d.g + "," + d.b + "," + a + ")"; return b
    }; Epoch.Util.getContext = function (c, a) { null == a && (a = "2d"); return null != c.getContext ? c.getContext(a) : new Epoch.TestContext }
}).call(this);
(function () { d3.selection.prototype.width = function (e) { return null != e && Epoch.isString(e) ? this.style("width", e) : null != e && Epoch.isNumber(e) ? this.style("width", "" + e + "px") : +Epoch.Util.getComputedStyle(this.node(), null).width.replace("px", "") }; d3.selection.prototype.height = function (e) { return null != e && Epoch.isString(e) ? this.style("height", e) : null != e && Epoch.isNumber(e) ? this.style("height", "" + e + "px") : +Epoch.Util.getComputedStyle(this.node(), null).height.replace("px", "") } }).call(this);
(function () { var e; Epoch.Formats.regular = function (g) { return g }; Epoch.Formats.si = function (g) { return Epoch.Util.formatSI(g) }; Epoch.Formats.percent = function (g) { return (100 * g).toFixed(1) + "%" }; Epoch.Formats.seconds = function (g) { return e(new Date(1E3 * g)) }; e = d3.time.format("%I:%M:%S %p"); Epoch.Formats.bytes = function (g) { return Epoch.Util.formatBytes(g) } }).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Events = function () {
        function c() { this._events = {} } c.prototype.on = function (a, d) { var b; if (null != d) return null == (b = this._events)[a] && (b[a] = []), this._events[a].push(d) }; c.prototype.onAll = function (a) { var d, b, h; if (Epoch.isObject(a)) { h = []; for (b in a) d = a[b], h.push(this.on(b, d)); return h } }; c.prototype.off =
        function (a, d) { var b, h; if (Epoch.isArray(this._events[a])) { if (null == d) return delete this._events[a]; for (h = []; 0 <= (b = this._events[a].indexOf(d)) ;) h.push(this._events[a].splice(b, 1)); return h } }; c.prototype.offAll = function (a) { var d, b, h, k; if (Epoch.isArray(a)) { k = []; d = 0; for (h = a.length; d < h; d++) b = a[d], k.push(this.off(b)); return k } if (Epoch.isObject(a)) { h = []; for (b in a) d = a[b], h.push(this.off(b, d)); return h } }; c.prototype.trigger = function (a) {
            var d, b, h, k, f, q, c, m; if (null != this._events[a]) {
                d = function () {
                    var a, f, q; q =
                    []; k = a = 1; for (f = arguments.length; 1 <= f ? a < f : a > f; k = 1 <= f ? ++a : --a) q.push(arguments[k]); return q
                }.apply(this, arguments); c = this._events[a]; m = []; f = 0; for (q = c.length; f < q; f++) b = c[f], h = null, Epoch.isString(b) ? h = this[b] : Epoch.isFunction(b) && (h = b), null == h && Epoch.exception("Callback for event '" + a + "' is not a function or reference to a method."), m.push(h.apply(this, d)); return m
            }
        }; return c
    }(); Epoch.Chart.Base = function (c) {
        function a(h) {
            this.options = null != h ? h : {}; a.__super__.constructor.call(this); this.setData(this.options.data ||
            []); null != this.options.el && (this.el = d3.select(this.options.el)); this.width = this.options.width; this.height = this.options.height; null != this.el ? (null == this.width && (this.width = this.el.width()), null == this.height && (this.height = this.el.height())) : (null == this.width && (this.width = d.width), null == this.height && (this.height = d.height)); this.onAll(b)
        } var d, b; g(a, c); d = { width: 320, height: 240 }; b = { "option:width": "dimensionsChanged", "option:height": "dimensionsChanged" }; a.prototype._getAllOptions = function () {
            return Epoch.Util.defaults({},
            this.options)
        }; a.prototype._getOption = function (a) { var k, f; a = a.split("."); for (k = this.options; a.length && null != k;) f = a.shift(), k = k[f]; return k }; a.prototype._setOption = function (a, k) { var f, q, b; f = a.split("."); for (q = this.options; f.length;) { b = f.shift(); if (0 === f.length) { q[b] = k; this.trigger("option:" + a); break } null == q[b] && (q[b] = {}); q = q[b] } }; a.prototype._setManyOptions = function (a, k) {
            var f, q, b; null == k && (k = ""); b = []; for (f in a) q = a[f], Epoch.isObject(q) ? b.push(this._setManyOptions(q, "" + (k + f) + ".")) : b.push(this._setOption(k +
            f, q)); return b
        }; a.prototype.option = function () { if (0 === arguments.length) return this._getAllOptions(); if (1 === arguments.length && Epoch.isString(arguments[0])) return this._getOption(arguments[0]); if (2 === arguments.length && Epoch.isString(arguments[0])) return this._setOption(arguments[0], arguments[1]); if (1 === arguments.length && Epoch.isObject(arguments[0])) return this._setManyOptions(arguments[0]) }; a.prototype.setData = function (a) {
            var k, f, b, d, c; k = 1; d = 0; for (c = a.length; d < c; d++) b = a[d], f = ["layer"], f.push("category" +
            k), b.category = k, null != b.label && f.push(Epoch.Util.dasherize(b.label)), b.className = f.join(" "), k++; return this.data = a
        }; a.prototype.update = function (a, k) { null == k && (k = !0); this.setData(a); if (k) return this.draw() }; a.prototype.draw = function () { return this.trigger("draw") }; a.prototype.extent = function (a) { return [d3.min(this.data, function (k) { return d3.min(k.values, a) }), d3.max(this.data, function (k) { return d3.max(k.values, a) })] }; a.prototype.dimensionsChanged = function () {
            this.width = this.option("width") || this.width;
            this.height = this.option("height") || this.height; this.el.width(this.width); return this.el.height(this.height)
        }; return a
    }(Epoch.Events); Epoch.Chart.SVG = function (c) {
        function a(d) { this.options = null != d ? d : {}; a.__super__.constructor.call(this, this.options); this.svg = null != this.el ? this.el.append("svg") : d3.select(document.createElement("svg")); this.svg.attr({ xmlns: "http://www.w3.org/2000/svg", width: this.width, height: this.height }) } g(a, c); a.prototype.dimensionsChanged = function () {
            a.__super__.dimensionsChanged.call(this);
            return this.svg.attr("width", this.width).attr("height", this.height)
        }; return a
    }(Epoch.Chart.Base); Epoch.Chart.Canvas = function (c) {
        function a(d) {
            this.options = null != d ? d : {}; a.__super__.constructor.call(this, this.options); this.pixelRatio = null != this.options.pixelRatio ? this.options.pixelRatio : null != window.devicePixelRatio ? window.devicePixelRatio : 1; this.canvas = d3.select(document.createElement("CANVAS")); this.canvas.style({ width: "" + this.width + "px", height: "" + this.height + "px" }); this.canvas.attr({
                width: this.getWidth(),
                height: this.getHeight()
            }); null != this.el && this.el.node().appendChild(this.canvas.node()); this.ctx = Epoch.Util.getContext(this.canvas.node())
        } g(a, c); a.prototype.getWidth = function () { return this.width * this.pixelRatio }; a.prototype.getHeight = function () { return this.height * this.pixelRatio }; a.prototype.clear = function () { return this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight()) }; a.prototype.getStyles = function (a) { return Epoch.QueryCSS.getStyles(a, this.el) }; a.prototype.dimensionsChanged = function () {
            a.__super__.dimensionsChanged.call(this);
            this.canvas.style({ width: "" + this.width + "px", height: "" + this.height + "px" }); return this.canvas.attr({ width: this.getWidth(), height: this.getHeight() })
        }; return a
    }(Epoch.Chart.Base)
}).call(this);
(function () {
    var e; e = function () {
        function g() { } var c, a, d, b, h; a = 0; b = function () { return "epoch-container-" + a++ }; c = /^([^#. ]+)?(#[^. ]+)?(\.[^# ]+)?$/; d = !1; h = function (a) { var f, b; f = a.match(c); if (null == f) return Epoch.error("Query CSS cannot match given selector: " + a); b = f[1]; a = f[2]; f = f[3]; b = (null != b ? b : "div").toUpperCase(); b = document.createElement(b); null != a && (b.id = a.substr(1)); null != f && (b.className = f.substr(1).replace(/\./g, " ")); return b }; g.log = function (a) { return d = a }; g.cache = {}; g.styleList = ["fill", "stroke",
        "stroke-width"]; g.container = null; g.purge = function () { return g.cache = {} }; g.getContainer = function () { var a; if (null != g.container) return g.container; a = document.createElement("DIV"); a.id = "_canvas_css_reference"; document.body.appendChild(a); return g.container = d3.select(a) }; g.hash = function (a, f) { var d; d = f.attr("data-epoch-container-id"); null == d && (d = b(), f.attr("data-epoch-container-id", d)); return "" + d + "__" + a }; g.getStyles = function (a, f) {
            var b, c, m, l, n, e, r; c = g.hash(a, f); b = g.cache[c]; if (null != b) return b; m = []; for (b =
            f.node().parentNode; null != b && "body" !== b.nodeName.toLowerCase() ;) m.unshift(b), b = b.parentNode; m.push(f.node()); b = []; e = 0; for (r = m.length; e < r; e++) l = m[e], n = l.nodeName.toLowerCase(), null != l.id && 0 < l.id.length && (n += "#" + l.id), null != l.className && 0 < l.className.length && (n += "." + Epoch.Util.trim(l.className).replace(/\s+/g, ".")), b.push(n); b.push("svg"); e = Epoch.Util.trim(a).split(/\s+/); l = 0; for (n = e.length; l < n; l++) m = e[l], b.push(m); d && console.log(b); for (l = n = h(b.shift()) ; b.length;) m = h(b.shift()), l.appendChild(m), l = m;
            d && console.log(n); g.getContainer().node().appendChild(n); m = d3.select("#_canvas_css_reference " + a); l = {}; r = g.styleList; n = 0; for (e = r.length; n < e; n++) b = r[n], l[b] = m.style(b); g.cache[c] = l; g.getContainer().html(""); return l
        }; return g
    }(); Epoch.QueryCSS = e
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Chart.Plot = function (c) {
        function a(k) {
            var f, c, u; this.options = null != k ? k : {}; Epoch.Util.copy(this.options.margins); a.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, b)); this.margins = {}; u = ["top", "right", "bottom", "left"]; f = 0; for (c = u.length; f < c; f++) k = u[f], this.margins[k] =
            null != this.options.margins && null != this.options.margins[k] ? this.options.margins[k] : this.hasAxis(k) ? d[k] : 6; this.g = this.svg.append("g").attr("transform", "translate(" + this.margins.left + ", " + this.margins.top + ")"); this.onAll(h)
        } var d, b, h; g(a, c); b = { domain: null, range: null, axes: ["left", "bottom"], ticks: { top: 14, bottom: 14, left: 5, right: 5 }, tickFormats: { top: Epoch.Formats.regular, bottom: Epoch.Formats.regular, left: Epoch.Formats.si, right: Epoch.Formats.si } }; d = { top: 25, right: 50, bottom: 25, left: 50 }; h = {
            "option:margins.top": "marginsChanged",
            "option:margins.right": "marginsChanged", "option:margins.bottom": "marginsChanged", "option:margins.left": "marginsChanged", "option:axes": "axesChanged", "option:ticks.top": "ticksChanged", "option:ticks.right": "ticksChanged", "option:ticks.bottom": "ticksChanged", "option:ticks.left": "ticksChanged", "option:tickFormats.top": "tickFormatsChanged", "option:tickFormats.right": "tickFormatsChanged", "option:tickFormats.bottom": "tickFormatsChanged", "option:tickFormats.left": "tickFormatsChanged", "option:domain": "domainChanged",
            "option:range": "rangeChanged"
        }; a.prototype.setTickFormat = function (a, f) { return this.options.tickFormats[a] = f }; a.prototype.hasAxis = function (a) { return -1 < this.options.axes.indexOf(a) }; a.prototype.innerWidth = function () { return this.width - (this.margins.left + this.margins.right) }; a.prototype.innerHeight = function () { return this.height - (this.margins.top + this.margins.bottom) }; a.prototype.x = function () {
            var a, f; a = null != (f = this.options.domain) ? f : this.extent(function (a) { return a.x }); return d3.scale.linear().domain(a).range([0,
            this.innerWidth()])
        }; a.prototype.y = function () { var a, f; a = null != (f = this.options.range) ? f : this.extent(function (a) { return a.y }); return d3.scale.linear().domain(a).range([this.innerHeight(), 0]) }; a.prototype.bottomAxis = function () { return d3.svg.axis().scale(this.x()).orient("bottom").ticks(this.options.ticks.bottom).tickFormat(this.options.tickFormats.bottom) }; a.prototype.topAxis = function () { return d3.svg.axis().scale(this.x()).orient("top").ticks(this.options.ticks.top).tickFormat(this.options.tickFormats.top) };
        a.prototype.leftAxis = function () { return d3.svg.axis().scale(this.y()).orient("left").ticks(this.options.ticks.left).tickFormat(this.options.tickFormats.left) }; a.prototype.rightAxis = function () { return d3.svg.axis().scale(this.y()).orient("right").ticks(this.options.ticks.right).tickFormat(this.options.tickFormats.right) }; a.prototype.draw = function () { this._axesDrawn ? this._redrawAxes() : this._drawAxes(); return a.__super__.draw.call(this) }; a.prototype._redrawAxes = function () {
            this.hasAxis("bottom") && this.g.selectAll(".x.axis.bottom").transition().duration(500).ease("linear").call(this.bottomAxis());
            this.hasAxis("top") && this.g.selectAll(".x.axis.top").transition().duration(500).ease("linear").call(this.topAxis()); this.hasAxis("left") && this.g.selectAll(".y.axis.left").transition().duration(500).ease("linear").call(this.leftAxis()); if (this.hasAxis("right")) return this.g.selectAll(".y.axis.right").transition().duration(500).ease("linear").call(this.rightAxis())
        }; a.prototype._drawAxes = function () {
            this.hasAxis("bottom") && this.g.append("g").attr("class", "x axis bottom").attr("transform", "translate(0, " +
            this.innerHeight() + ")").call(this.bottomAxis()); this.hasAxis("top") && this.g.append("g").attr("class", "x axis top").call(this.topAxis()); this.hasAxis("left") && this.g.append("g").attr("class", "y axis left").call(this.leftAxis()); this.hasAxis("right") && this.g.append("g").attr("class", "y axis right").attr("transform", "translate(" + this.innerWidth() + ", 0)").call(this.rightAxis()); return this._axesDrawn = !0
        }; a.prototype.dimensionsChanged = function () {
            a.__super__.dimensionsChanged.call(this); this.g.selectAll(".axis").remove();
            this._axesDrawn = !1; return this.draw()
        }; a.prototype.marginsChanged = function () { var a, f, b; if (null != this.options.margins) { b = this.options.margins; for (a in b) f = b[a], this.margins[a] = null == f ? 6 : f; this.g.transition().duration(750).attr("transform", "translate(" + this.margins.left + ", " + this.margins.top + ")"); return this.draw() } }; a.prototype.axesChanged = function () {
            var a, f, b, c; c = ["top", "right", "bottom", "left"]; f = 0; for (b = c.length; f < b; f++) if (a = c[f], null == this.options.margins || null == this.options.margins[a]) this.hasAxis(a) ?
            this.margins[a] = d[a] : this.margins[a] = 6; this.g.transition().duration(750).attr("transform", "translate(" + this.margins.left + ", " + this.margins.top + ")"); this.g.selectAll(".axis").remove(); this._axesDrawn = !1; return this.draw()
        }; a.prototype.ticksChanged = function () { return this.draw() }; a.prototype.tickFormatsChanged = function () { return this.draw() }; a.prototype.domainChanged = function () { return this.draw() }; a.prototype.rangeChanged = function () { return this.draw() }; return a
    }(Epoch.Chart.SVG)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Chart.Area = function (c) {
        function a() { return a.__super__.constructor.apply(this, arguments) } g(a, c); a.prototype.y = function () {
            var a, b, c, k, f, q, u, m; a = []; q = this.data; k = 0; for (f = q.length; k < f; k++) for (b in c = q[k], u = c.values, u) c = u[b], null != a[b] && (a[b] += c.y), null == a[b] && (a[b] = c.y); return d3.scale.linear().domain(null !=
            (m = this.options.range) ? m : [0, d3.max(a)]).range([this.height - this.margins.top - this.margins.bottom, 0])
        }; a.prototype.draw = function () {
            var d, b, c, k; b = [this.x(), this.y()]; c = b[0]; k = b[1]; d = d3.svg.area().x(function (a) { return c(a.x) }).y0(function (a) { return k(a.y0) }).y1(function (a) { return k(a.y0 + a.y) }); d3.layout.stack().values(function (a) { return a.values })(this.data); this.g.selectAll(".layer").remove(); b = this.g.selectAll(".layer").data(this.data, function (a) { return a.category }); b.select(".area").attr("d", function (a) { return d(a.values) });
            b.enter().append("g").attr("class", function (a) { return a.className }); b.append("path").attr("class", "area").attr("d", function (a) { return d(a.values) }); return a.__super__.draw.call(this)
        }; return a
    }(Epoch.Chart.Plot)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Chart.Bar = function (c) {
        function a(k) { this.options = null != k ? k : {}; this.options = "horizontal" === this.options.orientation ? Epoch.Util.defaults(this.options, b) : Epoch.Util.defaults(this.options, d); a.__super__.constructor.call(this, this.options); this.onAll(h) } var d, b, h; g(a, c); d = {
            style: "grouped", orientation: "vertical",
            padding: { bar: 0.08, group: 0.1 }, outerPadding: { bar: 0.08, group: 0.1 }
        }; b = Epoch.Util.defaults({ tickFormats: { top: Epoch.Formats.si, bottom: Epoch.Formats.si, left: Epoch.Formats.regular, right: Epoch.Formats.regular } }, d); h = { "option:orientation": "orientationChanged", "option:padding": "paddingChanged", "option:outerPadding": "paddingChanged", "option:padding:bar": "paddingChanged", "option:padding:group": "paddingChanged", "option:outerPadding:bar": "paddingChanged", "option:outerPadding:group": "paddingChanged" }; a.prototype.x =
        function () { var a; if ("vertical" === this.options.orientation) return d3.scale.ordinal().domain(Epoch.Util.domain(this.data)).rangeRoundBands([0, this.innerWidth()], this.options.padding.group, this.options.outerPadding.group); a = this.extent(function (a) { return a.y }); a[0] = Math.min(0, a[0]); return d3.scale.linear().domain(a).range([0, this.width - this.margins.left - this.margins.right]) }; a.prototype.x1 = function (a) {
            var f; return d3.scale.ordinal().domain(function () {
                var a, k, b, d; b = this.data; d = []; a = 0; for (k = b.length; a <
                k; a++) f = b[a], d.push(f.category); return d
            }.call(this)).rangeRoundBands([0, a.rangeBand()], this.options.padding.bar, this.options.outerPadding.bar)
        }; a.prototype.y = function () { var a; return "vertical" === this.options.orientation ? (a = this.extent(function (a) { return a.y }), a[0] = Math.min(0, a[0]), d3.scale.linear().domain(a).range([this.height - this.margins.top - this.margins.bottom, 0])) : d3.scale.ordinal().domain(Epoch.Util.domain(this.data)).rangeRoundBands([0, this.innerHeight()], this.options.padding.group, this.options.outerPadding.group) };
        a.prototype.y1 = function (a) { var f; return d3.scale.ordinal().domain(function () { var a, k, b, d; b = this.data; d = []; a = 0; for (k = b.length; a < k; a++) f = b[a], d.push(f.category); return d }.call(this)).rangeRoundBands([0, a.rangeBand()], this.options.padding.bar, this.options.outerPadding.bar) }; a.prototype._remapData = function () {
            var a, f, b, d, c, h, n, e, g, s, t, v; c = {}; t = this.data; h = 0; for (e = t.length; h < e; h++) for (d = t[h], a = "bar " + d.className.replace(/\s*layer\s*/, ""), v = d.values, n = 0, g = v.length; n < g; n++) f = v[n], null == c[s = f.x] && (c[s] = []),
            c[f.x].push({ label: d.category, y: f.y, className: a }); f = []; for (b in c) a = c[b], f.push({ group: b, values: a }); return f
        }; a.prototype.draw = function () { "horizontal" === this.options.orientation ? this._drawHorizontal() : this._drawVertical(); return a.__super__.draw.call(this) }; a.prototype._drawVertical = function () {
            var a, b, d, c, h, l; a = [this.x(), this.y()]; c = a[0]; l = a[1]; h = this.x1(c); b = this.height - this.margins.top - this.margins.bottom; a = this._remapData(); a = this.g.selectAll(".layer").data(a, function (a) { return a.group }); a.transition().duration(750).attr("transform",
            function (a) { return "translate(" + c(a.group) + ", 0)" }); a.enter().append("g").attr("class", "layer").attr("transform", function (a) { return "translate(" + c(a.group) + ", 0)" }); d = a.selectAll("rect").data(function (a) { return a.values }); d.transition().duration(600).attr("x", function (a) { return h(a.label) }).attr("y", function (a) { return l(a.y) }).attr("width", h.rangeBand()).attr("height", function (a) { return b - l(a.y) }); d.enter().append("rect").attr("class", function (a) { return a.className }).attr("x", function (a) { return h(a.label) }).attr("y",
            function (a) { return l(a.y) }).attr("width", h.rangeBand()).attr("height", function (a) { return b - l(a.y) }); d.exit().transition().duration(150).style("opacity", "0").remove(); return a.exit().transition().duration(750).style("opacity", "0").remove()
        }; a.prototype._drawHorizontal = function () {
            var a, b, d, c, h; a = [this.x(), this.y()]; d = a[0]; c = a[1]; h = this.y1(c); a = this._remapData(); a = this.g.selectAll(".layer").data(a, function (a) { return a.group }); a.transition().duration(750).attr("transform", function (a) {
                return "translate(0, " +
                c(a.group) + ")"
            }); a.enter().append("g").attr("class", "layer").attr("transform", function (a) { return "translate(0, " + c(a.group) + ")" }); b = a.selectAll("rect").data(function (a) { return a.values }); b.transition().duration(600).attr("x", function (a) { return 0 }).attr("y", function (a) { return h(a.label) }).attr("height", h.rangeBand()).attr("width", function (a) { return d(a.y) }); b.enter().append("rect").attr("class", function (a) { return a.className }).attr("x", function (a) { return 0 }).attr("y", function (a) { return h(a.label) }).attr("height",
            h.rangeBand()).attr("width", function (a) { return d(a.y) }); b.exit().transition().duration(150).style("opacity", "0").remove(); return a.exit().transition().duration(750).style("opacity", "0").remove()
        }; a.prototype.orientationChanged = function () {
            var a, b, d, c; c = this.options.tickFormats.top; a = this.options.tickFormats.bottom; b = this.options.tickFormats.left; d = this.options.tickFormats.right; this.options.tickFormats.left = c; this.options.tickFormats.right = a; this.options.tickFormats.top = b; this.options.tickFormats.bottom =
            d; return this.draw()
        }; a.prototype.paddingChanged = function () { return this.draw() }; return a
    }(Epoch.Chart.Plot)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Chart.Line = function (c) {
        function a() { return a.__super__.constructor.apply(this, arguments) } g(a, c); a.prototype.line = function () { var a, b, c; c = [this.x(), this.y()]; a = c[0]; b = c[1]; return d3.svg.line().x(function (b) { return function (b) { return a(b.x) } }(this)).y(function (a) { return function (a) { return b(a.y) } }(this)) }; a.prototype.draw =
        function () { var c, b; b = [this.x(), this.y(), this.line()][2]; c = this.g.selectAll(".layer").data(this.data, function (a) { return a.category }); c.select(".line").transition().duration(500).attr("d", function (a) { return b(a.values) }); c.enter().append("g").attr("class", function (a) { return a.className }).append("path").attr("class", "line").attr("d", function (a) { return b(a.values) }); c.exit().transition().duration(750).style("opacity", "0").remove(); return a.__super__.draw.call(this) }; return a
    }(Epoch.Chart.Plot)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Chart.Pie = function (c) {
        function a(b) {
            this.options = null != b ? b : {}; a.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, d)); this.pie = d3.layout.pie().sort(null).value(function (a) { return a.value }); this.arc = d3.svg.arc().outerRadius(function (a) {
                return function () {
                    return Math.max(a.width,
                    a.height) / 2 - a.options.margin
                }
            }(this)).innerRadius(function (a) { return function () { return a.options.inner } }(this)); this.g = this.svg.append("g").attr("transform", "translate(" + this.width / 2 + ", " + this.height / 2 + ")"); this.on("option:margin", "marginChanged"); this.on("option:inner", "innerChanged")
        } var d; g(a, c); d = { margin: 10, inner: 0 }; a.prototype.draw = function () {
            var b; this.g.selectAll(".arc").remove(); b = this.g.selectAll(".arc").data(this.pie(this.data), function (a) { return a.data.category }); b.enter().append("g").attr("class",
            function (a) { return "arc pie " + a.data.className }); b.select("path").attr("d", this.arc); b.select("text").attr("transform", function (a) { return function (b) { return "translate(" + a.arc.centroid(b) + ")" } }(this)).text(function (a) { return a.data.label || a.data.category }); b.append("path").attr("d", this.arc).each(function (a) { return this._current = a }); b.append("text").attr("transform", function (a) { return function (b) { return "translate(" + a.arc.centroid(b) + ")" } }(this)).attr("dy", ".35em").style("text-anchor", "middle").text(function (a) {
                return a.data.label ||
                a.data.category
            }); return a.__super__.draw.call(this)
        }; a.prototype.marginChanged = function () { return this.draw() }; a.prototype.innerChanged = function () { return this.draw() }; return a
    }(Epoch.Chart.SVG)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Chart.Scatter = function (c) {
        function a(b) { this.options = null != b ? b : {}; a.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, d)); this.on("option:radius", "radiusChanged") } var d; g(a, c); d = { radius: 3.5, axes: ["top", "bottom", "left", "right"] }; a.prototype.draw = function () {
            var b, c, k, f,
            d; b = [this.x(), this.y()]; f = b[0]; d = b[1]; k = this.options.radius; c = this.g.selectAll(".layer").data(this.data, function (a) { return a.category }); c.enter().append("g").attr("class", function (a) { return a.className }); b = c.selectAll(".dot").data(function (a) { return a.values }); b.transition().duration(500).attr("r", function (a) { var b; return null != (b = a.r) ? b : k }).attr("cx", function (a) { return f(a.x) }).attr("cy", function (a) { return d(a.y) }); b.enter().append("circle").attr("class", "dot").attr("r", function (a) {
                var b; return null !=
                (b = a.r) ? b : k
            }).attr("cx", function (a) { return f(a.x) }).attr("cy", function (a) { return d(a.y) }); b.exit().transition().duration(750).style("opacity", 0).remove(); c.exit().transition().duration(750).style("opacity", 0).remove(); return a.__super__.draw.call(this)
        }; a.prototype.radiusChanged = function () { return this.draw() }; return a
    }(Epoch.Chart.Plot)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Time.Plot = function (c) {
        function a(k) {
            var f, c, u; this.options = k; Epoch.Util.copy(this.options.margins); a.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, b)); this._queue = []; this.margins = {}; u = ["top", "right", "bottom", "left"]; f = 0; for (c = u.length; f < c; f++) k = u[f], this.margins[k] =
            null != this.options.margins && null != this.options.margins[k] ? this.options.margins[k] : this.hasAxis(k) ? d[k] : 6; this.svg = this.el.insert("svg", ":first-child").attr("width", this.width).attr("height", this.height).style("z-index", "1000"); "absolute" !== this.el.style("position") && "relative" !== this.el.style("position") && this.el.style("position", "relative"); this.canvas.style({ position: "absolute", "z-index": "999" }); this._sizeCanvas(); this.animation = {
                interval: null, active: !1, delta: function (a) {
                    return function () {
                        return -(a.w() /
                        a.options.fps)
                    }
                }(this), tickDelta: function (a) { return function () { return -(a.w() / a.pixelRatio / a.options.fps) } }(this), frame: 0, duration: this.options.fps
            }; this._buildAxes(); this.animationCallback = function (a) { return function () { return a._animate() } }(this); this.onAll(h)
        } var d, b, h; g(a, c); b = { fps: 24, historySize: 120, windowSize: 40, queueSize: 10, axes: ["bottom"], ticks: { time: 15, left: 5, right: 5 }, tickFormats: { top: Epoch.Formats.seconds, bottom: Epoch.Formats.seconds, left: Epoch.Formats.si, right: Epoch.Formats.si } }; d = {
            top: 25,
            right: 50, bottom: 25, left: 50
        }; h = {
            "option:margins": "marginsChanged", "option:margins.top": "marginsChanged", "option:margins.right": "marginsChanged", "option:margins.bottom": "marginsChanged", "option:margins.left": "marginsChanged", "option:axes": "axesChanged", "option:ticks": "ticksChanged", "option:ticks.top": "ticksChanged", "option:ticks.right": "ticksChanged", "option:ticks.bottom": "ticksChanged", "option:ticks.left": "ticksChanged", "option:tickFormats": "tickFormatsChanged", "option:tickFormats.top": "tickFormatsChanged",
            "option:tickFormats.right": "tickFormatsChanged", "option:tickFormats.bottom": "tickFormatsChanged", "option:tickFormats.left": "tickFormatsChanged"
        }; a.prototype._sizeCanvas = function () { this.canvas.attr({ width: this.innerWidth(), height: this.innerHeight() }); return this.canvas.style({ width: "" + this.innerWidth() / this.pixelRatio + "px", height: "" + this.innerHeight() / this.pixelRatio + "px", top: "" + this.margins.top + "px", left: "" + this.margins.left + "px" }) }; a.prototype._buildAxes = function () {
            this.svg.selectAll(".axis").remove();
            this._prepareTimeAxes(); return this._prepareRangeAxes()
        }; a.prototype.setData = function (a) { var b, c, d, h, e; this.data = []; e = []; for (d in a) h = a[d], c = Epoch.Util.copy(h), b = Math.max(0, h.values.length - this.options.historySize), c.values = h.values.slice(b), b = ["layer"], b.push("category" + ((d | 0) + 1)), null != h.label && b.push(Epoch.Util.dasherize(h.label)), c.className = b.join(" "), e.push(this.data.push(c)); return e }; a.prototype._offsetX = function () { return 0 }; a.prototype._prepareTimeAxes = function () {
            var a; this.hasAxis("bottom") &&
            (a = this.bottomAxis = this.svg.append("g").attr("class", "x axis bottom canvas").attr("transform", "translate(" + (this.margins.left - 1) + ", " + (this.innerHeight() / this.pixelRatio + this.margins.top) + ")"), a.append("path").attr("class", "domain").attr("d", "M0,0H" + (this.innerWidth() / this.pixelRatio + 1))); this.hasAxis("top") && (a = this.topAxis = this.svg.append("g").attr("class", "x axis top canvas").attr("transform", "translate(" + (this.margins.left - 1) + ", " + this.margins.top + ")"), a.append("path").attr("class", "domain").attr("d",
            "M0,0H" + (this.innerWidth() / this.pixelRatio + 1))); return this._resetInitialTimeTicks()
        }; a.prototype._resetInitialTimeTicks = function () {
            var a, b, c, d, h; d = this.options.ticks.time; this._ticks = []; this._tickTimer = d; null != this.bottomAxis && this.bottomAxis.selectAll(".tick").remove(); null != this.topAxis && this.topAxis.selectAll(".tick").remove(); h = this.data; a = 0; for (b = h.length; a < b; a++) if (c = h[a], null != c.values && 0 < c.values.length) {
                b = [this.options.windowSize - 1, c.values.length - 1]; a = b[0]; for (b = b[1]; 0 <= a && 0 <= b;) this._pushTick(a,
                c.values[b].time, !1, !0), a -= d, b -= d; break
            } return []
        }; a.prototype._prepareRangeAxes = function () { this.hasAxis("left") && this.svg.append("g").attr("class", "y axis left").attr("transform", "translate(" + (this.margins.left - 1) + ", " + this.margins.top + ")").call(this.leftAxis()); if (this.hasAxis("right")) return this.svg.append("g").attr("class", "y axis right").attr("transform", "translate(" + (this.width - this.margins.right) + ", " + this.margins.top + ")").call(this.rightAxis()) }; a.prototype.leftAxis = function () {
            var a, b; b = this.options.ticks.left;
            a = d3.svg.axis().scale(this.ySvg()).orient("left").tickFormat(this.options.tickFormats.left); return 2 === b ? a.tickValues(this.extent(function (a) { return a.y })) : a.ticks(b)
        }; a.prototype.rightAxis = function () { var a, b; this.extent(function (a) { return a.y }); b = this.options.ticks.right; a = d3.svg.axis().scale(this.ySvg()).orient("right").tickFormat(this.options.tickFormats.left); return 2 === b ? a.tickValues(this.extent(function (a) { return a.y })) : a.ticks(b) }; a.prototype.hasAxis = function (a) { return -1 < this.options.axes.indexOf(a) };
        a.prototype.innerWidth = function () { return (this.width - (this.margins.left + this.margins.right)) * this.pixelRatio }; a.prototype.innerHeight = function () { return (this.height - (this.margins.top + this.margins.bottom)) * this.pixelRatio }; a.prototype._prepareEntry = function (a) { return a }; a.prototype._prepareLayers = function (a) { return a }; a.prototype._startTransition = function () {
            if (!0 !== this.animation.active && 0 !== this._queue.length) return this.trigger("transition:start"), this._shift(), this.animation.active = !0, this.animation.interval =
            setInterval(this.animationCallback, 1E3 / this.options.fps)
        }; a.prototype._stopTransition = function () {
            var a, b, c, d; if (this.inTransition()) {
                d = this.data; b = 0; for (c = d.length; b < c; b++) a = d[b], a.values.length > this.options.windowSize + 1 && a.values.shift(); b = [this._ticks[0], this._ticks[this._ticks.length - 1]]; a = b[0]; b = b[1]; null != b && b.enter && (b.enter = !1, b.opacity = 1); null != a && a.exit && this._shiftTick(); this.animation.frame = 0; this.trigger("transition:end"); if (0 < this._queue.length) return this._shift(); this.animation.active =
                !1; return clearInterval(this.animation.interval)
            }
        }; a.prototype.inTransition = function () { return this.animation.active }; a.prototype.push = function (a) { a = this._prepareLayers(a); this._queue.length > this.options.queueSize && this._queue.splice(this.options.queueSize, this._queue.length - this.options.queueSize); if (this._queue.length === this.options.queueSize) return !1; this._queue.push(a.map(function (a) { return function (b) { return a._prepareEntry(b) } }(this))); this.trigger("push"); if (!this.inTransition()) return this._startTransition() };
        a.prototype._shift = function () { var a, b, c, d; this.trigger("before:shift"); a = this._queue.shift(); d = this.data; for (b in d) c = d[b], c.values.push(a[b]); this._updateTicks(a[0].time); this._transitionRangeAxes(); return this.trigger("after:shift") }; a.prototype._transitionRangeAxes = function () { this.hasAxis("left") && this.svg.selectAll(".y.axis.left").transition().duration(500).ease("linear").call(this.leftAxis()); if (this.hasAxis("right")) return this.svg.selectAll(".y.axis.right").transition().duration(500).ease("linear").call(this.rightAxis()) };
        a.prototype._animate = function () { if (this.inTransition()) return ++this.animation.frame === this.animation.duration && this._stopTransition(), this.draw(this.animation.frame * this.animation.delta()), this._updateTimeAxes() }; a.prototype.y = function () { return d3.scale.linear().domain(this.extent(function (a) { return a.y })).range([this.innerHeight(), 0]) }; a.prototype.ySvg = function () { return d3.scale.linear().domain(this.extent(function (a) { return a.y })).range([this.innerHeight() / this.pixelRatio, 0]) }; a.prototype.w = function () {
            return this.innerWidth() /
            this.options.windowSize
        }; a.prototype._updateTicks = function (a) { if (this.hasAxis("top") || this.hasAxis("bottom")) if (++this._tickTimer % this.options.ticks.time || this._pushTick(this.options.windowSize, a, !0), !(0 <= this._ticks[0].x - this.w() / this.pixelRatio)) return this._ticks[0].exit = !0 }; a.prototype._pushTick = function (a, b, c, d) {
            null == c && (c = !1); null == d && (d = !1); if (this.hasAxis("top") || this.hasAxis("bottom")) return b = { time: b, x: a * (this.w() / this.pixelRatio) + this._offsetX(), opacity: c ? 0 : 1, enter: c ? !0 : !1, exit: !1 }, this.hasAxis("bottom") &&
            (a = this.bottomAxis.append("g").attr("class", "tick major").attr("transform", "translate(" + (b.x + 1) + ",0)").style("opacity", b.opacity), a.append("line").attr("y2", 6), a.append("text").attr("text-anchor", "middle").attr("dy", 19).text(this.options.tickFormats.bottom(b.time)), b.bottomEl = a), this.hasAxis("top") && (a = this.topAxis.append("g").attr("class", "tick major").attr("transform", "translate(" + (b.x + 1) + ",0)").style("opacity", b.opacity), a.append("line").attr("y2", -6), a.append("text").attr("text-anchor", "middle").attr("dy",
            -10).text(this.options.tickFormats.top(b.time)), b.topEl = a), d ? this._ticks.unshift(b) : this._ticks.push(b), b
        }; a.prototype._shiftTick = function () { var a; if (0 < this._ticks.length && (a = this._ticks.shift(), null != a.topEl && a.topEl.remove(), null != a.bottomEl)) return a.bottomEl.remove() }; a.prototype._updateTimeAxes = function () {
            var a, b, c, d, h, e, g; if (this.hasAxis("top") || this.hasAxis("bottom")) {
                a = [this.animation.tickDelta(), 1 / this.options.fps]; b = a[0]; a = a[1]; e = this._ticks; g = []; d = 0; for (h = e.length; d < h; d++) c = e[d], c.x += b,
                this.hasAxis("bottom") && c.bottomEl.attr("transform", "translate(" + (c.x + 1) + ",0)"), this.hasAxis("top") && c.topEl.attr("transform", "translate(" + (c.x + 1) + ",0)"), c.enter ? c.opacity += a : c.exit && (c.opacity -= a), c.enter || c.exit ? (this.hasAxis("bottom") && c.bottomEl.style("opacity", c.opacity), this.hasAxis("top") ? g.push(c.topEl.style("opacity", c.opacity)) : g.push(void 0)) : g.push(void 0); return g
            }
        }; a.prototype.draw = function (b) { return a.__super__.draw.call(this) }; a.prototype.dimensionsChanged = function () {
            a.__super__.dimensionsChanged.call(this);
            this.svg.attr("width", this.width).attr("height", this.height); this._sizeCanvas(); this._buildAxes(); return this.draw(this.animation.frame * this.animation.delta())
        }; a.prototype.axesChanged = function () { var a, b, c, h; h = ["top", "right", "bottom", "left"]; b = 0; for (c = h.length; b < c; b++) if (a = h[b], null == this.options.margins || null == this.options.margins[a]) this.hasAxis(a) ? this.margins[a] = d[a] : this.margins[a] = 6; this._sizeCanvas(); this._buildAxes(); return this.draw(this.animation.frame * this.animation.delta()) }; a.prototype.ticksChanged =
        function () { this._resetInitialTimeTicks(); this._transitionRangeAxes(); return this.draw(this.animation.frame * this.animation.delta()) }; a.prototype.tickFormatsChanged = function () { this._resetInitialTimeTicks(); this._transitionRangeAxes(); return this.draw(this.animation.frame * this.animation.delta()) }; a.prototype.marginsChanged = function () { var a, b, c; if (null != this.options.margins) { c = this.options.margins; for (a in c) b = c[a], this.margins[a] = null == b ? 6 : b; this._sizeCanvas(); return this.draw(this.animation.frame * this.animation.delta()) } };
        return a
    }(Epoch.Chart.Canvas); Epoch.Time.Stack = function (c) {
        function a() { return a.__super__.constructor.apply(this, arguments) } g(a, c); a.prototype._prepareLayers = function (a) { var b, c, k, f; k = c = 0; for (f = a.length; k < f; k++) b = a[k], b.y0 = c, c += b.y; return a }; a.prototype.setData = function (c) {
            var b, h, k, f, e; a.__super__.setData.call(this, c); e = []; b = c = 0; for (f = this.data[0].values.length; 0 <= f ? c < f : c > f; b = 0 <= f ? ++c : --c) k = 0, e.push(function () {
                var a, c, d, f; d = this.data; f = []; a = 0; for (c = d.length; a < c; a++) h = d[a], h.values[b].y0 = k, f.push(k +=
                h.values[b].y); return f
            }.call(this)); return e
        }; a.prototype.extent = function () { var a, b, c, k, f, e, g, m; a = f = c = 0; for (g = this.data[0].values.length; 0 <= g ? f < g : f > g; a = 0 <= g ? ++f : --f) { b = e = k = 0; for (m = this.data.length; 0 <= m ? e < m : e > m; b = 0 <= m ? ++e : --e) k += this.data[b].values[a].y; k > c && (c = k) } return [0, c] }; return a
    }(Epoch.Time.Plot)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Time.Area = function (c) {
        function a() { return a.__super__.constructor.apply(this, arguments) } g(a, c); a.prototype.setStyles = function (a) {
            a = null != a.className ? this.getStyles("g." + a.className.replace(/\s/g, ".") + " path.area") : this.getStyles("g path.area"); this.ctx.fillStyle = a.fill; null != a.stroke && (this.ctx.strokeStyle =
            a.stroke); if (null != a["stroke-width"]) return this.ctx.lineWidth = a["stroke-width"].replace("px", "")
        }; a.prototype._drawAreas = function (a) {
            var b, c, k, f, e, g, m, l, n, p; null == a && (a = 0); g = [this.y(), this.w()]; m = g[0]; g = g[1]; p = []; for (c = l = n = this.data.length - 1; 0 >= n ? 0 >= l : 0 <= l; c = 0 >= n ? ++l : --l) {
                f = this.data[c]; this.setStyles(f); this.ctx.beginPath(); e = [this.options.windowSize, f.values.length, this.inTransition()]; c = e[0]; k = e[1]; for (e = e[2]; -2 <= --c && 0 <= --k;) b = f.values[k], b = [(c + 1) * g + a, m(b.y + b.y0)], e && (b[0] += g), c === this.options.windowSize -
                1 ? this.ctx.moveTo.apply(this.ctx, b) : this.ctx.lineTo.apply(this.ctx, b); c = e ? (c + 3) * g + a : (c + 2) * g + a; this.ctx.lineTo(c, this.innerHeight()); this.ctx.lineTo(this.width * this.pixelRatio + g + a, this.innerHeight()); this.ctx.closePath(); p.push(this.ctx.fill())
            } return p
        }; a.prototype._drawStrokes = function (a) {
            var b, c, k, f, e, g, m, l, n, p; null == a && (a = 0); c = [this.y(), this.w()]; m = c[0]; g = c[1]; p = []; for (c = l = n = this.data.length - 1; 0 >= n ? 0 >= l : 0 <= l; c = 0 >= n ? ++l : --l) {
                f = this.data[c]; this.setStyles(f); this.ctx.beginPath(); e = [this.options.windowSize,
                f.values.length, this.inTransition()]; c = e[0]; k = e[1]; for (e = e[2]; -2 <= --c && 0 <= --k;) b = f.values[k], b = [(c + 1) * g + a, m(b.y + b.y0)], e && (b[0] += g), c === this.options.windowSize - 1 ? this.ctx.moveTo.apply(this.ctx, b) : this.ctx.lineTo.apply(this.ctx, b); p.push(this.ctx.stroke())
            } return p
        }; a.prototype.draw = function (c) { null == c && (c = 0); this.clear(); this._drawAreas(c); this._drawStrokes(c); return a.__super__.draw.call(this) }; return a
    }(Epoch.Time.Stack)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Time.Bar = function (c) {
        function a() { return a.__super__.constructor.apply(this, arguments) } g(a, c); a.prototype._offsetX = function () { return 0.5 * this.w() / this.pixelRatio }; a.prototype.setStyles = function (a) {
            a = this.getStyles("rect.bar." + a.replace(/\s/g, ".")); this.ctx.fillStyle = a.fill; this.ctx.strokeStyle =
            null == a.stroke || "none" === a.stroke ? "transparent" : a.stroke; if (null != a["stroke-width"]) return this.ctx.lineWidth = a["stroke-width"].replace("px", "")
        }; a.prototype.draw = function (c) {
            var b, h, k, f, e, g, m, l, n, p, r, s, t; null == c && (c = 0); this.clear(); f = [this.y(), this.w()]; p = f[0]; n = f[1]; t = this.data; r = 0; for (s = t.length; r < s; r++) if (m = t[r], 0 < m.values.length) for (this.setStyles(m.className), e = [this.options.windowSize, m.values.length, this.inTransition()], f = e[0], g = e[1], e = (l = e[2]) ? -1 : 0; --f >= e && 0 <= --g;) b = m.values[g], k = [f * n + c,
            b.y, b.y0], b = k[0], h = k[1], k = k[2], l && (b += n), b = [b + 1, p(h + k), n - 2, this.innerHeight() - p(h) + 0.5 * this.pixelRatio], this.ctx.fillRect.apply(this.ctx, b), this.ctx.strokeRect.apply(this.ctx, b); return a.__super__.draw.call(this)
        }; return a
    }(Epoch.Time.Stack)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Time.Gauge = function (c) {
        function a(c) {
            this.options = null != c ? c : {}; a.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, d)); this.value = this.options.value || 0; "absolute" !== this.el.style("position") && "relative" !== this.el.style("position") && this.el.style("position", "relative");
            this.svg = this.el.insert("svg", ":first-child").attr("width", this.width).attr("height", this.height).attr("class", "gauge-labels"); this.svg.style({ position: "absolute", "z-index": "1" }); this.svg.append("g").attr("transform", "translate(" + this.textX() + ", " + this.textY() + ")").append("text").attr("class", "value").text(this.options.format(this.value)); this.animation = { interval: null, active: !1, delta: 0, target: 0 }; this._animate = function (a) {
                return function () {
                    Math.abs(a.animation.target - a.value) < Math.abs(a.animation.delta) ?
                    (a.value = a.animation.target, clearInterval(a.animation.interval), a.animation.active = !1) : a.value += a.animation.delta; a.svg.select("text.value").text(a.options.format(a.value)); return a.draw()
                }
            }(this); this.onAll(b)
        } var d, b; g(a, c); d = { domain: [0, 1], ticks: 10, tickSize: 5, tickOffset: 5, fps: 34, format: Epoch.Formats.percent }; b = { "option:domain": "domainChanged", "option:ticks": "ticksChanged", "option:tickSize": "tickSizeChanged", "option:tickOffset": "tickOffsetChanged", "option:format": "formatChanged" }; a.prototype.update =
        function (a) { this.animation.target = a; this.animation.delta = (a - this.value) / this.options.fps; if (!this.animation.active) return this.animation.interval = setInterval(this._animate, 1E3 / this.options.fps), this.animation.active = !0 }; a.prototype.push = function (a) { return this.update(a) }; a.prototype.radius = function () { return this.getHeight() / 1.58 }; a.prototype.centerX = function () { return this.getWidth() / 2 }; a.prototype.centerY = function () { return 0.68 * this.getHeight() }; a.prototype.textX = function () { return this.width / 2 }; a.prototype.textY =
        function () { return 0.48 * this.height }; a.prototype.getAngle = function (a) { var b, c; c = this.options.domain; b = c[0]; return (a - b) / (c[1] - b) * (Math.PI + 2 * Math.PI / 8) - Math.PI / 2 - Math.PI / 8 }; a.prototype.setStyles = function (a) { a = this.getStyles(a); this.ctx.fillStyle = a.fill; this.ctx.strokeStyle = a.stroke; if (null != a["stroke-width"]) return this.ctx.lineWidth = a["stroke-width"].replace("px", "") }; a.prototype.draw = function () {
            var b, c, d, e, g, m, l, n, p, r, s, t; g = [this.centerX(), this.centerY(), this.radius()]; d = g[0]; e = g[1]; g = g[2]; l = [this.options.tickOffset,
            this.options.tickSize]; n = l[0]; p = l[1]; this.clear(); l = d3.scale.linear().domain([0, this.options.ticks]).range([-1.125 * Math.PI, Math.PI / 8]); this.setStyles(".epoch .gauge .tick"); this.ctx.beginPath(); b = s = 0; for (t = this.options.ticks; 0 <= t ? s <= t : s >= t; b = 0 <= t ? ++s : --s) b = l(b), b = [Math.cos(b), Math.sin(b)], c = b[0], m = b[1], b = c * (g - n) + d, r = m * (g - n) + e, c = c * (g - n - p) + d, m = m * (g - n - p) + e, this.ctx.moveTo(b, r), this.ctx.lineTo(c, m); this.ctx.stroke(); this.setStyles(".epoch .gauge .arc.outer"); this.ctx.beginPath(); this.ctx.arc(d, e, g, -1.125 *
            Math.PI, 0.125 * Math.PI, !1); this.ctx.stroke(); this.setStyles(".epoch .gauge .arc.inner"); this.ctx.beginPath(); this.ctx.arc(d, e, g - 10, -1.125 * Math.PI, 0.125 * Math.PI, !1); this.ctx.stroke(); this.drawNeedle(); return a.__super__.draw.call(this)
        }; a.prototype.drawNeedle = function () {
            var a, b, c; c = [this.centerX(), this.centerY(), this.radius()]; a = c[0]; b = c[1]; c = c[2]; this.setStyles(".epoch .gauge .needle"); this.ctx.beginPath(); this.ctx.save(); this.ctx.translate(a, b); this.ctx.rotate(this.getAngle(this.value)); this.ctx.moveTo(4 *
            this.pixelRatio, 0); this.ctx.lineTo(-4 * this.pixelRatio, 0); this.ctx.lineTo(-1 * this.pixelRatio, 19 - c); this.ctx.lineTo(1, 19 - c); this.ctx.fill(); this.setStyles(".epoch .gauge .needle-base"); this.ctx.beginPath(); this.ctx.arc(0, 0, this.getWidth() / 25, 0, 2 * Math.PI); this.ctx.fill(); return this.ctx.restore()
        }; a.prototype.domainChanged = function () { return this.draw() }; a.prototype.ticksChanged = function () { return this.draw() }; a.prototype.tickSizeChanged = function () { return this.draw() }; a.prototype.tickOffsetChanged = function () { return this.draw() };
        a.prototype.formatChanged = function () { return this.svg.select("text.value").text(this.options.format(this.value)) }; return a
    }(Epoch.Chart.Canvas)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Time.Heatmap = function (c) {
        function a(c) { this.options = c; a.__super__.constructor.call(this, this.options = Epoch.Util.defaults(this.options, b)); this._setOpacityFunction(); this._setupPaintCanvas(); this.onAll(e) } var d, b, e; g(a, c); b = {
            buckets: 10, bucketRange: [0, 100], opacity: "linear", bucketPadding: 2, paintZeroValues: !1,
            cutOutliers: !1
        }; d = { root: function (a, b) { return Math.pow(a / b, 0.5) }, linear: function (a, b) { return a / b }, quadratic: function (a, b) { return Math.pow(a / b, 2) }, cubic: function (a, b) { return Math.pow(a / b, 3) }, quartic: function (a, b) { return Math.pow(a / b, 4) }, quintic: function (a, b) { return Math.pow(a / b, 5) } }; e = { "option:buckets": "bucketsChanged", "option:bucketRange": "bucketRangeChanged", "option:opacity": "opacityChanged", "option:bucketPadding": "bucketPaddingChanged", "option:paintZeroValues": "paintZeroValuesChanged", "option:cutOutliers": "cutOutliersChanged" };
        a.prototype._setOpacityFunction = function () { if (Epoch.isString(this.options.opacity)) { if (this._opacityFn = d[this.options.opacity], null == this._opacityFn) return Epoch.exception("Unknown coloring function provided '" + this.options.opacity + "'") } else return Epoch.isFunction(this.options.opacity) ? this._opacityFn = this.options.opacity : Epoch.exception("Unknown type for provided coloring function.") }; a.prototype.setData = function (b) {
            var c, d, e, g; a.__super__.setData.call(this, b); e = this.data; g = []; c = 0; for (d = e.length; c <
            d; c++) b = e[c], g.push(b.values = b.values.map(function (a) { return function (b) { return a._prepareEntry(b) } }(this))); return g
        }; a.prototype._getBuckets = function (a) {
            var b, c, d, e, g; e = a.time; g = []; b = 0; for (d = this.options.buckets; 0 <= d ? b < d : b > d; 0 <= d ? ++b : --b) g.push(0); e = { time: e, max: 0, buckets: g }; b = (this.options.bucketRange[1] - this.options.bucketRange[0]) / this.options.buckets; g = a.histogram; for (c in g) a = g[c], d = parseInt((c - this.options.bucketRange[0]) / b), this.options.cutOutliers && (0 > d || d >= this.options.buckets) || (0 > d ? d =
            0 : d >= this.options.buckets && (d = this.options.buckets - 1), e.buckets[d] += parseInt(a)); c = a = 0; for (b = e.buckets.length; 0 <= b ? a < b : a > b; c = 0 <= b ? ++a : --a) e.max = Math.max(e.max, e.buckets[c]); return e
        }; a.prototype.y = function () { return d3.scale.linear().domain(this.options.bucketRange).range([this.innerHeight(), 0]) }; a.prototype.ySvg = function () { return d3.scale.linear().domain(this.options.bucketRange).range([this.innerHeight() / this.pixelRatio, 0]) }; a.prototype.h = function () { return this.innerHeight() / this.options.buckets };
        a.prototype._offsetX = function () { return 0.5 * this.w() / this.pixelRatio }; a.prototype._setupPaintCanvas = function () {
            this.paintWidth = (this.options.windowSize + 1) * this.w(); this.paintHeight = this.height * this.pixelRatio; this.paint = document.createElement("CANVAS"); this.paint.width = this.paintWidth; this.paint.height = this.paintHeight; this.p = Epoch.Util.getContext(this.paint); this.redraw(); this.on("after:shift", "_paintEntry"); this.on("transition:end", "_shiftPaintCanvas"); return this.on("transition:end", function (a) {
                return function () {
                    return a.draw(a.animation.frame *
                    a.animation.delta())
                }
            }(this))
        }; a.prototype.redraw = function () { var a, b; b = this.data[0].values.length; a = this.options.windowSize; for (this.inTransition() && a++; 0 <= --b && 0 <= --a;) this._paintEntry(b, a); return this.draw(this.animation.frame * this.animation.delta()) }; a.prototype._computeColor = function (a, b, c) { return Epoch.Util.toRGBA(c, this._opacityFn(a, b)) }; a.prototype._paintEntry = function (a, b) {
            var c, d, e, g, h, p, r, s, t, v, y, w, A, z; null == a && (a = null); null == b && (b = null); g = [this.w(), this.h()]; y = g[0]; p = g[1]; null == a && (a = this.data[0].values.length -
            1); null == b && (b = this.options.windowSize); g = []; var x; x = []; h = 0; for (v = this.options.buckets; 0 <= v ? h < v : h > v; 0 <= v ? ++h : --h) x.push(0); v = 0; t = this.data; d = 0; for (r = t.length; d < r; d++) { s = t[d]; h = this._getBuckets(s.values[a]); w = h.buckets; for (c in w) e = w[c], x[c] += e; v += h.max; e = this.getStyles("." + s.className.split(" ").join(".") + " rect.bucket"); h.color = e.fill; g.push(h) } s = b * y; this.p.clearRect(s, 0, y, this.paintHeight); r = this.options.buckets; z = []; for (c in x) {
                e = x[c]; d = this._avgLab(g, c); w = t = 0; for (A = g.length; w < A; w++) h = g[w], t +=
                h.buckets[c] / e * v; if (0 < e || this.options.paintZeroValues) this.p.fillStyle = this._computeColor(e, t, d), this.p.fillRect(s, (r - 1) * p, y - this.options.bucketPadding, p - this.options.bucketPadding); z.push(r--)
            } return z
        }; a.prototype._shiftPaintCanvas = function () { var a; a = this.p.getImageData(this.w(), 0, this.paintWidth - this.w(), this.paintHeight); return this.p.putImageData(a, 0, 0) }; a.prototype._avgLab = function (a, b) {
            var c, d, e, g, h, p, r, s; r = [0, 0, 0, 0]; h = r[0]; c = r[1]; d = r[2]; r = r[3]; p = 0; for (s = a.length; p < s; p++) e = a[p], null != e.buckets[b] &&
            (r += e.buckets[b]); for (g in a) e = a[g], p = null != e.buckets[b] ? e.buckets[b] | 0 : 0, p /= r, e = d3.lab(e.color), h += p * e.l, c += p * e.a, d += p * e.b; return d3.lab(h, c, d).toString()
        }; a.prototype.draw = function (b) { null == b && (b = 0); this.clear(); this.ctx.drawImage(this.paint, b, 0); return a.__super__.draw.call(this) }; a.prototype.bucketsChanged = function () { return this.redraw() }; a.prototype.bucketRangeChanged = function () { this._transitionRangeAxes(); return this.redraw() }; a.prototype.opacityChanged = function () {
            this._setOpacityFunction();
            return this.redraw()
        }; a.prototype.bucketPaddingChanged = function () { return this.redraw() }; a.prototype.paintZeroValuesChanged = function () { return this.redraw() }; a.prototype.cutOutliersChanged = function () { return this.redraw() }; return a
    }(Epoch.Time.Plot)
}).call(this);
(function () {
    var e = {}.hasOwnProperty, g = function (c, a) { function d() { this.constructor = c } for (var b in a) e.call(a, b) && (c[b] = a[b]); d.prototype = a.prototype; c.prototype = new d; c.__super__ = a.prototype; return c }; Epoch.Time.Line = function (c) {
        function a() { return a.__super__.constructor.apply(this, arguments) } g(a, c); a.prototype.setStyles = function (a) {
            a = this.getStyles("g." + a.replace(/\s/g, ".") + " path.line"); this.ctx.fillStyle = a.fill; this.ctx.strokeStyle = a.stroke; return this.ctx.lineWidth = this.pixelRatio * a["stroke-width"].replace("px",
            "")
        }; a.prototype.y = function () { return d3.scale.linear().domain(this.extent(function (a) { return a.y })).range([this.innerHeight() - this.pixelRatio / 2, this.pixelRatio]) }; a.prototype.draw = function (c) {
            var b, e, g, f, q, u, m, l, n, p; null == c && (c = 0); this.clear(); e = [this.y(), this.w()]; m = e[0]; u = e[1]; p = this.data; l = 0; for (n = p.length; l < n; l++) if (f = p[l], 0 < f.values.length) {
                this.setStyles(f.className); this.ctx.beginPath(); q = [this.options.windowSize, f.values.length, this.inTransition()]; e = q[0]; g = q[1]; for (q = q[2]; -2 <= --e && 0 <= --g;) b =
                f.values[g], b = [(e + 1) * u + c, m(b.y)], q && (b[0] += u), e === this.options.windowSize - 1 ? this.ctx.moveTo.apply(this.ctx, b) : this.ctx.lineTo.apply(this.ctx, b); this.ctx.stroke()
            } return a.__super__.draw.call(this)
        }; return a
    }(Epoch.Time.Plot)
}).call(this); (function () { Epoch._typeMap = { area: Epoch.Chart.Area, bar: Epoch.Chart.Bar, line: Epoch.Chart.Line, pie: Epoch.Chart.Pie, scatter: Epoch.Chart.Scatter, "time.area": Epoch.Time.Area, "time.bar": Epoch.Time.Bar, "time.line": Epoch.Time.Line, "time.gauge": Epoch.Time.Gauge, "time.heatmap": Epoch.Time.Heatmap } }).call(this);
(function () { null != window.MooTools && function () { return Element.implement("epoch", function (e) { var g, c; c = $$(this); null == (g = c.retrieve("epoch-chart")[0]) && (e.el = this, g = Epoch._typeMap[e.type], null == g && Epoch.exception("Unknown chart type '" + e.type + "'"), c.store("epoch-chart", g = new g(e)), g.draw()); return g }) }() }).call(this);
(function () { var e; e = function (e) { return e.fn.epoch = function (c) { var a; c.el = this.get(0); null == (a = this.data("epoch-chart")) && (a = Epoch._typeMap[c.type], null == a && Epoch.exception("Unknown chart type '" + c.type + "'"), this.data("epoch-chart", a = new a(c)), a.draw()); return a } }; null != window.jQuery && e(jQuery) }).call(this);
(function () { var e; e = function (e) { var c, a, d; a = {}; c = 0; d = function () { return "epoch-chart-" + ++c }; return e.extend(e.fn, { epoch: function (b) { var c, e; if (null != (c = this.data("epoch-chart"))) return a[c]; b.el = this.get(0); e = Epoch._typeMap[b.type]; null == e && Epoch.exception("Unknown chart type '" + b.type + "'"); this.data("epoch-chart", c = d()); b = new e(b); a[c] = b; b.draw(); return b } }) }; null != window.Zepto && e(Zepto) }).call(this);