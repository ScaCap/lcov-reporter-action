"use strict";

function _typeof(a) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a) { return typeof a; } : function (a) { return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a; }, _typeof(a); }
var _fs = _interopRequireDefault(require("fs")),
  _promises = _interopRequireDefault(require("fs/promises")),
  _path = _interopRequireDefault(require("path")),
  _core = _interopRequireDefault(require("@actions/core")),
  _github = _interopRequireDefault(require("@actions/github")),
  _lcov = require("./lcov"),
  _comment = require("./comment"),
  _github2 = require("./github");
function _interopRequireDefault(a) { return a && a.__esModule ? a : { default: a }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ function a(a, b, c) { return Object.defineProperty(a, b, { value: c, enumerable: !0, configurable: !0, writable: !0 }), a[b]; } function b(a, b, c, e) { var f = b && b.prototype instanceof d ? b : d, g = Object.create(f.prototype), h = new m(e || []); return s(g, "_invoke", { value: i(a, c, h) }), g; } function c(a, b, c) { try { return { type: "normal", arg: a.call(b, c) }; } catch (a) { return { type: "throw", arg: a }; } } function d() {} function e() {} function f() {} function g(b) { ["next", "throw", "return"].forEach(function (c) { a(b, c, function (a) { return this._invoke(c, a); }); }); } function h(a, b) { function d(e, f, g, h) { var i = c(a[e], a, f); if ("throw" !== i.type) { var j = i.arg, k = j.value; return k && "object" == _typeof(k) && r.call(k, "__await") ? b.resolve(k.__await).then(function (a) { d("next", a, g, h); }, function (a) { d("throw", a, g, h); }) : b.resolve(k).then(function (a) { j.value = a, g(j); }, function (a) { return d("throw", a, g, h); }); } h(i.arg); } var e; s(this, "_invoke", { value: function value(a, c) { function f() { return new b(function (b, e) { d(a, c, b, e); }); } return e = e ? e.then(f, f) : f(); } }); } function i(a, b, d) { var e = "suspendedStart"; return function (f, g) { if ("executing" == e) throw new Error("Generator is already running"); if ("completed" == e) { if ("throw" === f) throw g; return o(); } for (d.method = f, d.arg = g;;) { var h = d.delegate; if (h) { var i = j(h, d); if (i) { if (i === x) continue; return i; } } if ("next" === d.method) d.sent = d._sent = d.arg;else if ("throw" === d.method) { if ("suspendedStart" == e) throw e = "completed", d.arg; d.dispatchException(d.arg); } else "return" === d.method && d.abrupt("return", d.arg); e = "executing"; var k = c(a, b, d); if ("normal" === k.type) { if (e = d.done ? "completed" : "suspendedYield", k.arg === x) continue; return { value: k.arg, done: d.done }; } "throw" === k.type && (e = "completed", d.method = "throw", d.arg = k.arg); } }; } function j(a, b) { var d = b.method, e = a.iterator[d]; if (void 0 === e) return b.delegate = null, "throw" === d && a.iterator.return && (b.method = "return", b.arg = void 0, j(a, b), "throw" === b.method) || "return" !== d && (b.method = "throw", b.arg = new TypeError("The iterator does not provide a '" + d + "' method")), x; var f = c(e, a.iterator, b.arg); if ("throw" === f.type) return b.method = "throw", b.arg = f.arg, b.delegate = null, x; var g = f.arg; return g ? g.done ? (b[a.resultName] = g.value, b.next = a.nextLoc, "return" !== b.method && (b.method = "next", b.arg = void 0), b.delegate = null, x) : g : (b.method = "throw", b.arg = new TypeError("iterator result is not an object"), b.delegate = null, x); } function k(a) { var b = { tryLoc: a[0] }; 1 in a && (b.catchLoc = a[1]), 2 in a && (b.finallyLoc = a[2], b.afterLoc = a[3]), this.tryEntries.push(b); } function l(a) { var b = a.completion || {}; b.type = "normal", delete b.arg, a.completion = b; } function m(a) { this.tryEntries = [{ tryLoc: "root" }], a.forEach(k, this), this.reset(!0); } function n(a) { if (a) { var b = a[u]; if (b) return b.call(a); if ("function" == typeof a.next) return a; if (!isNaN(a.length)) { var c = -1, d = function b() { for (; ++c < a.length;) if (r.call(a, c)) return b.value = a[c], b.done = !1, b; return b.value = void 0, b.done = !0, b; }; return d.next = d; } } return { next: o }; } function o() { return { value: void 0, done: !0 }; } _regeneratorRuntime = function () { return p; }; var p = {}, q = Object.prototype, r = q.hasOwnProperty, s = Object.defineProperty || function (a, b, c) { a[b] = c.value; }, t = "function" == typeof Symbol ? Symbol : {}, u = t.iterator || "@@iterator", v = t.asyncIterator || "@@asyncIterator", w = t.toStringTag || "@@toStringTag"; try { a({}, ""); } catch (b) { a = function (a, b, c) { return a[b] = c; }; } p.wrap = b; var x = {}, y = {}; a(y, u, function () { return this; }); var z = Object.getPrototypeOf, A = z && z(z(n([]))); A && A !== q && r.call(A, u) && (y = A); var B = f.prototype = d.prototype = Object.create(y); return e.prototype = f, s(B, "constructor", { value: f, configurable: !0 }), s(f, "constructor", { value: e, configurable: !0 }), e.displayName = a(f, w, "GeneratorFunction"), p.isGeneratorFunction = function (a) { var b = "function" == typeof a && a.constructor; return !!b && (b === e || "GeneratorFunction" === (b.displayName || b.name)); }, p.mark = function (b) { return Object.setPrototypeOf ? Object.setPrototypeOf(b, f) : (b.__proto__ = f, a(b, w, "GeneratorFunction")), b.prototype = Object.create(B), b; }, p.awrap = function (a) { return { __await: a }; }, g(h.prototype), a(h.prototype, v, function () { return this; }), p.AsyncIterator = h, p.async = function (a, c, d, e, f) { void 0 === f && (f = Promise); var g = new h(b(a, c, d, e), f); return p.isGeneratorFunction(c) ? g : g.next().then(function (a) { return a.done ? a.value : g.next(); }); }, g(B), a(B, w, "Generator"), a(B, u, function () { return this; }), a(B, "toString", function () { return "[object Generator]"; }), p.keys = function (a) { var b = Object(a), c = []; for (var d in b) c.push(d); return c.reverse(), function a() { for (; c.length;) { var d = c.pop(); if (d in b) return a.value = d, a.done = !1, a; } return a.done = !0, a; }; }, p.values = n, m.prototype = { constructor: m, reset: function reset(a) { if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(l), !a) for (var b in this) "t" === b.charAt(0) && r.call(this, b) && !isNaN(+b.slice(1)) && (this[b] = void 0); }, stop: function stop() { this.done = !0; var a = this.tryEntries[0].completion; if ("throw" === a.type) throw a.arg; return this.rval; }, dispatchException: function dispatchException(a) { function b(b, d) { return f.type = "throw", f.arg = a, c.next = b, d && (c.method = "next", c.arg = void 0), !!d; } if (this.done) throw a; for (var c = this, d = this.tryEntries.length - 1; 0 <= d; --d) { var e = this.tryEntries[d], f = e.completion; if ("root" === e.tryLoc) return b("end"); if (e.tryLoc <= this.prev) { var g = r.call(e, "catchLoc"), h = r.call(e, "finallyLoc"); if (g && h) { if (this.prev < e.catchLoc) return b(e.catchLoc, !0); if (this.prev < e.finallyLoc) return b(e.finallyLoc); } else if (!g) { if (!h) throw new Error("try statement without catch or finally"); if (this.prev < e.finallyLoc) return b(e.finallyLoc); } else if (this.prev < e.catchLoc) return b(e.catchLoc, !0); } } }, abrupt: function abrupt(a, b) { for (var c, d = this.tryEntries.length - 1; 0 <= d; --d) if (c = this.tryEntries[d], c.tryLoc <= this.prev && r.call(c, "finallyLoc") && this.prev < c.finallyLoc) { var e = c; break; } e && ("break" === a || "continue" === a) && e.tryLoc <= b && b <= e.finallyLoc && (e = null); var f = e ? e.completion : {}; return f.type = a, f.arg = b, e ? (this.method = "next", this.next = e.finallyLoc, x) : this.complete(f); }, complete: function complete(a, b) { if ("throw" === a.type) throw a.arg; return "break" === a.type || "continue" === a.type ? this.next = a.arg : "return" === a.type ? (this.rval = this.arg = a.arg, this.method = "return", this.next = "end") : "normal" === a.type && b && (this.next = b), x; }, finish: function finish(a) { for (var b, c = this.tryEntries.length - 1; 0 <= c; --c) if (b = this.tryEntries[c], b.finallyLoc === a) return this.complete(b.completion, b.afterLoc), l(b), x; }, catch: function _catch(a) { for (var b, c = this.tryEntries.length - 1; 0 <= c; --c) if (b = this.tryEntries[c], b.tryLoc === a) { var d = b.completion; if ("throw" === d.type) { var e = d.arg; l(b); } return e; } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(a, b, c) { return this.delegate = { iterator: n(a), resultName: b, nextLoc: c }, "next" === this.method && (this.arg = void 0), x; } }, p; }
function _createForOfIteratorHelper(a, b) { var c = "undefined" != typeof Symbol && a[Symbol.iterator] || a["@@iterator"]; if (!c) { if (Array.isArray(a) || (c = _unsupportedIterableToArray(a)) || b && a && "number" == typeof a.length) { c && (a = c); var d = 0, e = function () {}; return { s: e, n: function n() { return d >= a.length ? { done: !0 } : { done: !1, value: a[d++] }; }, e: function e(a) { throw a; }, f: e }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var f, g = !0, h = !1; return { s: function s() { c = c.call(a); }, n: function n() { var a = c.next(); return g = a.done, a; }, e: function e(a) { h = !0, f = a; }, f: function f() { try { g || null == c.return || c.return(); } finally { if (h) throw f; } } }; }
function _unsupportedIterableToArray(a, b) { if (a) { if ("string" == typeof a) return _arrayLikeToArray(a, b); var c = Object.prototype.toString.call(a).slice(8, -1); return "Object" === c && a.constructor && (c = a.constructor.name), "Map" === c || "Set" === c ? Array.from(a) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? _arrayLikeToArray(a, b) : void 0; } }
function _arrayLikeToArray(a, b) { (null == b || b > a.length) && (b = a.length); for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c]; return d; }
function asyncGeneratorStep(a, b, c, d, e, f, g) { try { var h = a[f](g), i = h.value; } catch (a) { return void c(a); } h.done ? b(i) : Promise.resolve(i).then(d, e); }
function _asyncToGenerator(a) { return function () { var b = this, c = arguments; return new Promise(function (d, e) { function f(a) { asyncGeneratorStep(h, d, e, f, g, "next", a); } function g(a) { asyncGeneratorStep(h, d, e, f, g, "throw", a); } var h = a.apply(b, c); f(void 0); }); }; }
/**
 * Find all files inside a dir, recursively.
 * @function getLcovFiles
 * @param  {string} dir Dir path string.
 * @return {string[{<package_name>: <path_to_lcov_file>}]} Array with lcove file names with package names as key.
 */
var getLcovFiles = function (a, b) {
    var c = b || [];
    return _fs.default.readdirSync(a).forEach(function (b) {
      c = _fs.default.statSync(_path.default.join(a, b)).isDirectory() ? getLcovFiles(_path.default.join(a, b), c) : c.filter(function (a) {
        return a.path.includes("lcov.info");
      }).concat({
        name: a.split("/")[1],
        path: _path.default.join(a, b)
      });
    }), c;
  },
  getLcovBaseFiles = function (a, b) {
    var c = b || [];
    return _fs.default.readdirSync(a).forEach(function (b) {
      c = _fs.default.statSync(_path.default.join(a, b)).isDirectory() ? getLcovBaseFiles(_path.default.join(a, b), c) : c.filter(function (a) {
        return a.path.includes("lcov-base.info");
      }).concat({
        name: a.split("/")[1],
        path: _path.default.join(a, b)
      });
    }), c;
  },
  main = /*#__PURE__*/function () {
    var a = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function a() {
      var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
      return _regeneratorRuntime().wrap(function D(a) {
        for (; 1;) switch (a.prev = a.next) {
          case 0:
            if (b = _github.default || {}, c = b.context, d = void 0 === c ? {} : c, e = _core.default.getInput("github-token"), f = _core.default.getInput("lcov-file") || "./coverage/lcov.info", g = _core.default.getInput("lcov-base"), h = _core.default.getInput("app-name"), i = _core.default.getInput("monorepo-base-path"), a.t0 = !i, !a.t0) {
              a.next = 11;
              break;
            }
            return a.next = 10, _promises.default.readFile(f, "utf-8").catch(function (a) {
              return console.error(a);
            });
          case 10:
            a.t0 = a.sent;
          case 11:
            if (j = a.t0, i || j) {
              a.next = 15;
              break;
            }
            return console.log("No coverage report found at '".concat(f, "', exiting...")), a.abrupt("return");
          case 15:
            if (a.t1 = g, !a.t1) {
              a.next = 20;
              break;
            }
            return a.next = 19, _promises.default.readFile(g, "utf-8").catch(function (a) {
              return console.error(a);
            });
          case 19:
            a.t1 = a.sent;
          case 20:
            k = a.t1, i || !g || k || console.log("No coverage report found at '".concat(g, "', ignoring...")), l = i ? getLcovFiles(i) : [], m = i ? getLcovBaseFiles(i) : [], n = [], o = [], p = _createForOfIteratorHelper(l), a.prev = 27, p.s();
          case 29:
            if ((q = p.n()).done) {
              a.next = 41;
              break;
            }
            if (r = q.value, !r.path.includes(".info")) {
              a.next = 39;
              break;
            }
            return a.next = 34, _promises.default.readFile(r.path, "utf8");
          case 34:
            return s = a.sent, a.next = 37, (0, _lcov.parse)(s);
          case 37:
            t = a.sent, n.push({
              packageName: r.name,
              lcov: t
            });
          case 39:
            a.next = 29;
            break;
          case 41:
            a.next = 46;
            break;
          case 43:
            a.prev = 43, a.t2 = a["catch"](27), p.e(a.t2);
          case 46:
            return a.prev = 46, p.f(), a.finish(46);
          case 49:
            u = _createForOfIteratorHelper(m), a.prev = 50, u.s();
          case 52:
            if ((v = u.n()).done) {
              a.next = 64;
              break;
            }
            if (w = v.value, !w.path.includes(".info")) {
              a.next = 62;
              break;
            }
            return a.next = 57, _promises.default.readFile(w.path, "utf8");
          case 57:
            return x = a.sent, a.next = 60, (0, _lcov.parse)(x);
          case 60:
            y = a.sent, o.push({
              packageName: w.name,
              lcov: y
            });
          case 62:
            a.next = 52;
            break;
          case 64:
            a.next = 69;
            break;
          case 66:
            a.prev = 66, a.t3 = a["catch"](50), u.e(a.t3);
          case 69:
            return a.prev = 69, u.f(), a.finish(69);
          case 72:
            if (z = {
              repository: d.payload.repository.full_name,
              commit: d.payload.pull_request.head.sha,
              prefix: "".concat(process.env.GITHUB_WORKSPACE, "/"),
              head: d.payload.pull_request.head.ref,
              base: d.payload.pull_request.base.ref,
              appName: h
            }, a.t4 = !i, !a.t4) {
              a.next = 78;
              break;
            }
            return a.next = 77, (0, _lcov.parse)(j);
          case 77:
            a.t4 = a.sent;
          case 78:
            if (A = a.t4, a.t5 = k, !a.t5) {
              a.next = 84;
              break;
            }
            return a.next = 83, (0, _lcov.parse)(k);
          case 83:
            a.t5 = a.sent;
          case 84:
            return B = a.t5, C = _github.default.getOctokit(e), a.next = 88, (0, _github2.upsertComment)({
              client: C,
              context: d,
              prNumber: d.payload.pull_request.number,
              body: n.length ? (0, _comment.diffForMonorepo)(n, o, z) : (0, _comment.diff)(A, B, z),
              hiddenHeader: h ? "<!-- ".concat(h, "-code-coverage-assistant -->") : "<!-- monorepo-code-coverage-assistant -->"
            });
          case 88:
          case "end":
            return a.stop();
        }
      }, a, null, [[27, 43, 46, 49], [50, 66, 69, 72]]);
    }));
    return function main() {
      return a.apply(this, arguments);
    };
  }();
/**
 * Find all files inside a dir, recursively for base branch.
 * @function getLcovBaseFiles
 * @param  {string} dir Dir path string.
 * @return {string[{<package_name>: <path_to_lcov_file>}]} Array with lcove file names with package names as key.
 */
main().catch(function (a) {
  console.log(a), _core.default.setFailed(a.message);
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm5hbWVzIjpbImdldExjb3ZGaWxlcyIsImRpciIsImZpbGVsaXN0IiwiZmlsZUFycmF5IiwiZnMiLCJyZWFkZGlyU3luYyIsImZvckVhY2giLCJmaWxlIiwic3RhdFN5bmMiLCJwYXRoIiwiam9pbiIsImlzRGlyZWN0b3J5IiwiZmlsdGVyIiwiZiIsImluY2x1ZGVzIiwiY29uY2F0IiwibmFtZSIsInNwbGl0IiwiZ2V0TGNvdkJhc2VGaWxlcyIsIm1haW4iLCJnaXRodWIiLCJjb250ZXh0IiwidG9rZW4iLCJjb3JlIiwiZ2V0SW5wdXQiLCJsY292RmlsZSIsImJhc2VGaWxlIiwiYXBwTmFtZSIsIm1vbm9yZXBvQmFzZVBhdGgiLCJwcm9taXNlcyIsInJlYWRGaWxlIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJyYXciLCJsb2ciLCJiYXNlUmF3IiwibGNvdkFycmF5IiwibGNvdkJhc2VBcnJheSIsImxjb3ZBcnJheUZvck1vbm9yZXBvIiwibGNvdkJhc2VBcnJheUZvck1vbm9yZXBvIiwickxjb3ZlIiwicGFyc2UiLCJkYXRhIiwicHVzaCIsInBhY2thZ2VOYW1lIiwibGNvdiIsInJMY292QmFzZSIsIm9wdGlvbnMiLCJyZXBvc2l0b3J5IiwicGF5bG9hZCIsImZ1bGxfbmFtZSIsImNvbW1pdCIsInB1bGxfcmVxdWVzdCIsImhlYWQiLCJzaGEiLCJwcmVmaXgiLCJwcm9jZXNzIiwiZW52IiwiR0lUSFVCX1dPUktTUEFDRSIsInJlZiIsImJhc2UiLCJiYXNlbGNvdiIsImNsaWVudCIsImdldE9jdG9raXQiLCJ1cHNlcnRDb21tZW50IiwicHJOdW1iZXIiLCJudW1iZXIiLCJib2R5IiwibGVuZ3RoIiwiZGlmZkZvck1vbm9yZXBvIiwiZGlmZiIsImhpZGRlbkhlYWRlciIsInNldEZhaWxlZCIsIm1lc3NhZ2UiXSwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHByb21pc2VzIGZyb20gXCJmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBjb3JlIGZyb20gXCJAYWN0aW9ucy9jb3JlXCI7XG5pbXBvcnQgZ2l0aHViIGZyb20gXCJAYWN0aW9ucy9naXRodWJcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcIi4vbGNvdlwiO1xuaW1wb3J0IHsgZGlmZiwgZGlmZkZvck1vbm9yZXBvIH0gZnJvbSBcIi4vY29tbWVudFwiO1xuaW1wb3J0IHsgdXBzZXJ0Q29tbWVudCB9IGZyb20gXCIuL2dpdGh1YlwiO1xuXG4vKipcbiAqIEZpbmQgYWxsIGZpbGVzIGluc2lkZSBhIGRpciwgcmVjdXJzaXZlbHkuXG4gKiBAZnVuY3Rpb24gZ2V0TGNvdkZpbGVzXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGRpciBEaXIgcGF0aCBzdHJpbmcuXG4gKiBAcmV0dXJuIHtzdHJpbmdbezxwYWNrYWdlX25hbWU+OiA8cGF0aF90b19sY292X2ZpbGU+fV19IEFycmF5IHdpdGggbGNvdmUgZmlsZSBuYW1lcyB3aXRoIHBhY2thZ2UgbmFtZXMgYXMga2V5LlxuICovXG5jb25zdCBnZXRMY292RmlsZXMgPSAoZGlyLCBmaWxlbGlzdCkgPT4ge1xuICAgIGxldCBmaWxlQXJyYXkgPSBmaWxlbGlzdCB8fCBbXTtcbiAgICBmcy5yZWFkZGlyU3luYyhkaXIpLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgICAgZmlsZUFycmF5ID0gZnMuc3RhdFN5bmMocGF0aC5qb2luKGRpciwgZmlsZSkpLmlzRGlyZWN0b3J5KClcbiAgICAgICAgICAgID8gZ2V0TGNvdkZpbGVzKHBhdGguam9pbihkaXIsIGZpbGUpLCBmaWxlQXJyYXkpXG4gICAgICAgICAgICA6IGZpbGVBcnJheVxuICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZikgPT4gZi5wYXRoLmluY2x1ZGVzKFwibGNvdi5pbmZvXCIpKVxuICAgICAgICAgICAgICAgICAgLmNvbmNhdCh7XG4gICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGlyLnNwbGl0KFwiL1wiKVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLmpvaW4oZGlyLCBmaWxlKSxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVBcnJheTtcbn07XG5cbi8qKlxuICogRmluZCBhbGwgZmlsZXMgaW5zaWRlIGEgZGlyLCByZWN1cnNpdmVseSBmb3IgYmFzZSBicmFuY2guXG4gKiBAZnVuY3Rpb24gZ2V0TGNvdkJhc2VGaWxlc1xuICogQHBhcmFtICB7c3RyaW5nfSBkaXIgRGlyIHBhdGggc3RyaW5nLlxuICogQHJldHVybiB7c3RyaW5nW3s8cGFja2FnZV9uYW1lPjogPHBhdGhfdG9fbGNvdl9maWxlPn1dfSBBcnJheSB3aXRoIGxjb3ZlIGZpbGUgbmFtZXMgd2l0aCBwYWNrYWdlIG5hbWVzIGFzIGtleS5cbiAqL1xuY29uc3QgZ2V0TGNvdkJhc2VGaWxlcyA9IChkaXIsIGZpbGVsaXN0KSA9PiB7XG4gICAgbGV0IGZpbGVBcnJheSA9IGZpbGVsaXN0IHx8IFtdO1xuICAgIGZzLnJlYWRkaXJTeW5jKGRpcikuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICBmaWxlQXJyYXkgPSBmcy5zdGF0U3luYyhwYXRoLmpvaW4oZGlyLCBmaWxlKSkuaXNEaXJlY3RvcnkoKVxuICAgICAgICAgICAgPyBnZXRMY292QmFzZUZpbGVzKHBhdGguam9pbihkaXIsIGZpbGUpLCBmaWxlQXJyYXkpXG4gICAgICAgICAgICA6IGZpbGVBcnJheVxuICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZikgPT4gZi5wYXRoLmluY2x1ZGVzKFwibGNvdi1iYXNlLmluZm9cIikpXG4gICAgICAgICAgICAgICAgICAuY29uY2F0KHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBkaXIuc3BsaXQoXCIvXCIpWzFdLFxuICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHBhdGguam9pbihkaXIsIGZpbGUpLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmlsZUFycmF5O1xufTtcblxuY29uc3QgbWFpbiA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IGNvbnRleHQgPSB7fSB9ID0gZ2l0aHViIHx8IHt9O1xuXG4gICAgY29uc3QgdG9rZW4gPSBjb3JlLmdldElucHV0KFwiZ2l0aHViLXRva2VuXCIpO1xuICAgIGNvbnN0IGxjb3ZGaWxlID0gY29yZS5nZXRJbnB1dChcImxjb3YtZmlsZVwiKSB8fCBcIi4vY292ZXJhZ2UvbGNvdi5pbmZvXCI7XG4gICAgY29uc3QgYmFzZUZpbGUgPSBjb3JlLmdldElucHV0KFwibGNvdi1iYXNlXCIpO1xuICAgIGNvbnN0IGFwcE5hbWUgPSBjb3JlLmdldElucHV0KFwiYXBwLW5hbWVcIik7XG4gICAgLy8gQWRkIGJhc2UgcGF0aCBmb3IgbW9ub3JlcG9cbiAgICBjb25zdCBtb25vcmVwb0Jhc2VQYXRoID0gY29yZS5nZXRJbnB1dChcIm1vbm9yZXBvLWJhc2UtcGF0aFwiKTtcblxuICAgIGNvbnN0IHJhdyA9XG4gICAgICAgICFtb25vcmVwb0Jhc2VQYXRoICYmXG4gICAgICAgIChhd2FpdCBwcm9taXNlc1xuICAgICAgICAgICAgLnJlYWRGaWxlKGxjb3ZGaWxlLCBcInV0Zi04XCIpXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKSk7XG4gICAgaWYgKCFtb25vcmVwb0Jhc2VQYXRoICYmICFyYXcpIHtcbiAgICAgICAgY29uc29sZS5sb2coYE5vIGNvdmVyYWdlIHJlcG9ydCBmb3VuZCBhdCAnJHtsY292RmlsZX0nLCBleGl0aW5nLi4uYCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJhc2VSYXcgPVxuICAgICAgICBiYXNlRmlsZSAmJlxuICAgICAgICAoYXdhaXQgcHJvbWlzZXNcbiAgICAgICAgICAgIC5yZWFkRmlsZShiYXNlRmlsZSwgXCJ1dGYtOFwiKVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoZXJyKSkpO1xuICAgIGlmICghbW9ub3JlcG9CYXNlUGF0aCAmJiBiYXNlRmlsZSAmJiAhYmFzZVJhdykge1xuICAgICAgICBjb25zb2xlLmxvZyhgTm8gY292ZXJhZ2UgcmVwb3J0IGZvdW5kIGF0ICcke2Jhc2VGaWxlfScsIGlnbm9yaW5nLi4uYCk7XG4gICAgfVxuXG4gICAgY29uc3QgbGNvdkFycmF5ID0gbW9ub3JlcG9CYXNlUGF0aCA/IGdldExjb3ZGaWxlcyhtb25vcmVwb0Jhc2VQYXRoKSA6IFtdO1xuICAgIGNvbnN0IGxjb3ZCYXNlQXJyYXkgPSBtb25vcmVwb0Jhc2VQYXRoXG4gICAgICAgID8gZ2V0TGNvdkJhc2VGaWxlcyhtb25vcmVwb0Jhc2VQYXRoKVxuICAgICAgICA6IFtdO1xuXG4gICAgY29uc3QgbGNvdkFycmF5Rm9yTW9ub3JlcG8gPSBbXTtcbiAgICBjb25zdCBsY292QmFzZUFycmF5Rm9yTW9ub3JlcG8gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgbGNvdkFycmF5KSB7XG4gICAgICAgIGlmIChmaWxlLnBhdGguaW5jbHVkZXMoXCIuaW5mb1wiKSkge1xuICAgICAgICAgICAgY29uc3Qgckxjb3ZlID0gYXdhaXQgcHJvbWlzZXMucmVhZEZpbGUoZmlsZS5wYXRoLCBcInV0ZjhcIik7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcGFyc2Uockxjb3ZlKTtcbiAgICAgICAgICAgIGxjb3ZBcnJheUZvck1vbm9yZXBvLnB1c2goe1xuICAgICAgICAgICAgICAgIHBhY2thZ2VOYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgbGNvdjogZGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGxjb3ZCYXNlQXJyYXkpIHtcbiAgICAgICAgaWYgKGZpbGUucGF0aC5pbmNsdWRlcyhcIi5pbmZvXCIpKSB7XG4gICAgICAgICAgICBjb25zdCByTGNvdkJhc2UgPSBhd2FpdCBwcm9taXNlcy5yZWFkRmlsZShmaWxlLnBhdGgsIFwidXRmOFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBwYXJzZShyTGNvdkJhc2UpO1xuICAgICAgICAgICAgbGNvdkJhc2VBcnJheUZvck1vbm9yZXBvLnB1c2goe1xuICAgICAgICAgICAgICAgIHBhY2thZ2VOYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgbGNvdjogZGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgcmVwb3NpdG9yeTogY29udGV4dC5wYXlsb2FkLnJlcG9zaXRvcnkuZnVsbF9uYW1lLFxuICAgICAgICBjb21taXQ6IGNvbnRleHQucGF5bG9hZC5wdWxsX3JlcXVlc3QuaGVhZC5zaGEsXG4gICAgICAgIHByZWZpeDogYCR7cHJvY2Vzcy5lbnYuR0lUSFVCX1dPUktTUEFDRX0vYCxcbiAgICAgICAgaGVhZDogY29udGV4dC5wYXlsb2FkLnB1bGxfcmVxdWVzdC5oZWFkLnJlZixcbiAgICAgICAgYmFzZTogY29udGV4dC5wYXlsb2FkLnB1bGxfcmVxdWVzdC5iYXNlLnJlZixcbiAgICAgICAgYXBwTmFtZSxcbiAgICB9O1xuXG4gICAgY29uc3QgbGNvdiA9ICFtb25vcmVwb0Jhc2VQYXRoICYmIChhd2FpdCBwYXJzZShyYXcpKTtcbiAgICBjb25zdCBiYXNlbGNvdiA9IGJhc2VSYXcgJiYgKGF3YWl0IHBhcnNlKGJhc2VSYXcpKTtcblxuICAgIGNvbnN0IGNsaWVudCA9IGdpdGh1Yi5nZXRPY3Rva2l0KHRva2VuKTtcblxuICAgIGF3YWl0IHVwc2VydENvbW1lbnQoe1xuICAgICAgICBjbGllbnQsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIHByTnVtYmVyOiBjb250ZXh0LnBheWxvYWQucHVsbF9yZXF1ZXN0Lm51bWJlcixcbiAgICAgICAgYm9keTogIWxjb3ZBcnJheUZvck1vbm9yZXBvLmxlbmd0aFxuICAgICAgICAgICAgPyBkaWZmKGxjb3YsIGJhc2VsY292LCBvcHRpb25zKVxuICAgICAgICAgICAgOiBkaWZmRm9yTW9ub3JlcG8oXG4gICAgICAgICAgICAgICAgICBsY292QXJyYXlGb3JNb25vcmVwbyxcbiAgICAgICAgICAgICAgICAgIGxjb3ZCYXNlQXJyYXlGb3JNb25vcmVwbyxcbiAgICAgICAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICAgICksXG4gICAgICAgIGhpZGRlbkhlYWRlcjogYXBwTmFtZVxuICAgICAgICAgICAgPyBgPCEtLSAke2FwcE5hbWV9LWNvZGUtY292ZXJhZ2UtYXNzaXN0YW50IC0tPmBcbiAgICAgICAgICAgIDogYDwhLS0gbW9ub3JlcG8tY29kZS1jb3ZlcmFnZS1hc3Npc3RhbnQgLS0+YCxcbiAgICB9KTtcbn07XG5cbm1haW4oKS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgICBjb3JlLnNldEZhaWxlZChlcnIubWVzc2FnZSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OytDQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBLElBTU1BLFlBQVksR0FBRyxVQUFDQyxDQUFHLEVBQUVDLENBQVEsRUFBSztJQUNwQyxJQUFJQyxDQUFTLEdBQUdELENBQVEsSUFBSSxFQUFFO0lBWTlCLE9BWEFFLFdBQUUsQ0FBQ0MsV0FBVyxDQUFDSixDQUFHLENBQUMsQ0FBQ0ssT0FBTyxDQUFDLFVBQUNDLENBQUksRUFBSztNQUNsQ0osQ0FBUyxHQUFHQyxXQUFFLENBQUNJLFFBQVEsQ0FBQ0MsYUFBSSxDQUFDQyxJQUFJLENBQUNULENBQUcsRUFBRU0sQ0FBSSxDQUFDLENBQUMsQ0FBQ0ksV0FBVyxFQUFFLEdBQ3JEWCxZQUFZLENBQUNTLGFBQUksQ0FBQ0MsSUFBSSxDQUFDVCxDQUFHLEVBQUVNLENBQUksQ0FBQyxFQUFFSixDQUFTLENBQUMsR0FDN0NBLENBQVMsQ0FDSlMsTUFBTSxDQUFDLFVBQUNDLENBQUM7UUFBQSxPQUFLQSxDQUFDLENBQUNKLElBQUksQ0FBQ0ssUUFBUSxDQUFDLFdBQVcsQ0FBQztNQUFBLEVBQUMsQ0FDM0NDLE1BQU0sQ0FBQztRQUNKQyxJQUFJLEVBQUVmLENBQUcsQ0FBQ2dCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkJSLElBQUksRUFBRUEsYUFBSSxDQUFDQyxJQUFJLENBQUNULENBQUcsRUFBRU0sQ0FBSTtNQUM3QixDQUFDLENBQUM7SUFDaEIsQ0FBQyxDQUFDLEVBRUtKLENBQVM7RUFDcEIsQ0FBQztFQVFLZSxnQkFBZ0IsR0FBRyxVQUFDakIsQ0FBRyxFQUFFQyxDQUFRLEVBQUs7SUFDeEMsSUFBSUMsQ0FBUyxHQUFHRCxDQUFRLElBQUksRUFBRTtJQVk5QixPQVhBRSxXQUFFLENBQUNDLFdBQVcsQ0FBQ0osQ0FBRyxDQUFDLENBQUNLLE9BQU8sQ0FBQyxVQUFDQyxDQUFJLEVBQUs7TUFDbENKLENBQVMsR0FBR0MsV0FBRSxDQUFDSSxRQUFRLENBQUNDLGFBQUksQ0FBQ0MsSUFBSSxDQUFDVCxDQUFHLEVBQUVNLENBQUksQ0FBQyxDQUFDLENBQUNJLFdBQVcsRUFBRSxHQUNyRE8sZ0JBQWdCLENBQUNULGFBQUksQ0FBQ0MsSUFBSSxDQUFDVCxDQUFHLEVBQUVNLENBQUksQ0FBQyxFQUFFSixDQUFTLENBQUMsR0FDakRBLENBQVMsQ0FDSlMsTUFBTSxDQUFDLFVBQUNDLENBQUM7UUFBQSxPQUFLQSxDQUFDLENBQUNKLElBQUksQ0FBQ0ssUUFBUSxDQUFDLGdCQUFnQixDQUFDO01BQUEsRUFBQyxDQUNoREMsTUFBTSxDQUFDO1FBQ0pDLElBQUksRUFBRWYsQ0FBRyxDQUFDZ0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QlIsSUFBSSxFQUFFQSxhQUFJLENBQUNDLElBQUksQ0FBQ1QsQ0FBRyxFQUFFTSxDQUFJO01BQzdCLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUMsRUFFS0osQ0FBUztFQUNwQixDQUFDO0VBRUtnQixJQUFJO0lBQUEsbUVBQUc7TUFBQTtNQUFBO1FBQUE7VUFBQTtZQUFBLFFBQ2dCQyxlQUFNLElBQUksQ0FBQyxDQUFDLFFBQTdCQyxPQUFPLEVBQVBBLENBQU8sa0JBQUcsQ0FBQyxDQUFDLE1BRWRDLENBQUssR0FBR0MsYUFBSSxDQUFDQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQ3JDQyxDQUFRLEdBQUdGLGFBQUksQ0FBQ0MsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHNCQUFzQixFQUMvREUsQ0FBUSxHQUFHSCxhQUFJLENBQUNDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFDckNHLENBQU8sR0FBR0osYUFBSSxDQUFDQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBRW5DSSxDQUFnQixHQUFHTCxhQUFJLENBQUNDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxTQUd4RCxDQUFDSSxDQUFnQjtjQUFBO2NBQUE7WUFBQTtZQUFBLG9CQUNWQyxpQkFBUSxDQUNWQyxRQUFRLENBQUNMLENBQVEsRUFBRSxPQUFPLENBQUMsQ0FDM0JNLEtBQUssQ0FBQyxVQUFDQyxDQUFHO2NBQUEsT0FBS0MsT0FBTyxDQUFDQyxLQUFLLENBQUNGLENBQUcsQ0FBQztZQUFBLEVBQUM7VUFBQTtZQUFBO1VBQUE7WUFBQSxJQUpyQ0csQ0FBRyxTQUtKUCxDQUFnQixJQUFLTyxDQUFHO2NBQUE7Y0FBQTtZQUFBO1lBQUEsT0FDekJGLE9BQU8sQ0FBQ0csR0FBRyx3Q0FBaUNYLENBQVEsbUJBQWdCO1VBQUE7WUFBQSxXQU1wRUMsQ0FBUTtjQUFBO2NBQUE7WUFBQTtZQUFBLG9CQUNERyxpQkFBUSxDQUNWQyxRQUFRLENBQUNKLENBQVEsRUFBRSxPQUFPLENBQUMsQ0FDM0JLLEtBQUssQ0FBQyxVQUFDQyxDQUFHO2NBQUEsT0FBS0MsT0FBTyxDQUFDQyxLQUFLLENBQUNGLENBQUcsQ0FBQztZQUFBLEVBQUM7VUFBQTtZQUFBO1VBQUE7WUFKckNLLENBQU8sU0FLUlQsQ0FBZ0IsS0FBSUYsQ0FBUSxJQUFLVyxDQUFPLElBQ3pDSixPQUFPLENBQUNHLEdBQUcsd0NBQWlDVixDQUFRLG9CQUFpQixFQUduRVksQ0FBUyxHQUFHVixDQUFnQixHQUFHNUIsWUFBWSxDQUFDNEIsQ0FBZ0IsQ0FBQyxHQUFHLEVBQUUsRUFDbEVXLENBQWEsR0FBR1gsQ0FBZ0IsR0FDaENWLGdCQUFnQixDQUFDVSxDQUFnQixDQUFDLEdBQ2xDLEVBQUUsRUFFRlksQ0FBb0IsR0FBRyxFQUFFLEVBQ3pCQyxDQUF3QixHQUFHLEVBQUUsaUNBQ2hCSCxDQUFTO1VBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBLElBQWpCL0IsQ0FBSSxhQUNQQSxDQUFJLENBQUNFLElBQUksQ0FBQ0ssUUFBUSxDQUFDLE9BQU8sQ0FBQztjQUFBO2NBQUE7WUFBQTtZQUFBLG9CQUNOZSxpQkFBUSxDQUFDQyxRQUFRLENBQUN2QixDQUFJLENBQUNFLElBQUksRUFBRSxNQUFNLENBQUM7VUFBQTtZQUFBLE9BQW5EaUMsQ0FBTSx3QkFDTyxJQUFBQyxXQUFLLEVBQUNELENBQU0sQ0FBQztVQUFBO1lBQTFCRSxDQUFJLFdBQ1ZKLENBQW9CLENBQUNLLElBQUksQ0FBQztjQUN0QkMsV0FBVyxFQUFFdkMsQ0FBSSxDQUFDUyxJQUFJO2NBQ3RCK0IsSUFBSSxFQUFFSDtZQUNWLENBQUMsQ0FBQztVQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7WUFBQTtVQUFBO1lBQUE7VUFBQTtZQUFBO1VBQUE7WUFBQSwrQkFJU0wsQ0FBYTtVQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQSxJQUFyQmhDLENBQUksYUFDUEEsQ0FBSSxDQUFDRSxJQUFJLENBQUNLLFFBQVEsQ0FBQyxPQUFPLENBQUM7Y0FBQTtjQUFBO1lBQUE7WUFBQSxvQkFDSGUsaUJBQVEsQ0FBQ0MsUUFBUSxDQUFDdkIsQ0FBSSxDQUFDRSxJQUFJLEVBQUUsTUFBTSxDQUFDO1VBQUE7WUFBQSxPQUF0RHVDLENBQVMsd0JBQ0ksSUFBQUwsV0FBSyxFQUFDSyxDQUFTLENBQUM7VUFBQTtZQUE3QkosQ0FBSSxXQUNWSCxDQUF3QixDQUFDSSxJQUFJLENBQUM7Y0FDMUJDLFdBQVcsRUFBRXZDLENBQUksQ0FBQ1MsSUFBSTtjQUN0QitCLElBQUksRUFBRUg7WUFDVixDQUFDLENBQUM7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1lBQUE7VUFBQTtZQUFBO1VBQUE7WUFBQTtVQUFBO1lBQUEsSUFJSkssQ0FBTyxHQUFHO2NBQ1pDLFVBQVUsRUFBRTdCLENBQU8sQ0FBQzhCLE9BQU8sQ0FBQ0QsVUFBVSxDQUFDRSxTQUFTO2NBQ2hEQyxNQUFNLEVBQUVoQyxDQUFPLENBQUM4QixPQUFPLENBQUNHLFlBQVksQ0FBQ0MsSUFBSSxDQUFDQyxHQUFHO2NBQzdDQyxNQUFNLFlBQUtDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxnQkFBZ0IsTUFBRztjQUMxQ0wsSUFBSSxFQUFFbEMsQ0FBTyxDQUFDOEIsT0FBTyxDQUFDRyxZQUFZLENBQUNDLElBQUksQ0FBQ00sR0FBRztjQUMzQ0MsSUFBSSxFQUFFekMsQ0FBTyxDQUFDOEIsT0FBTyxDQUFDRyxZQUFZLENBQUNRLElBQUksQ0FBQ0QsR0FBRztjQUMzQ2xDLE9BQU8sRUFBUEE7WUFDSixDQUFDLFNBRVksQ0FBQ0MsQ0FBZ0I7Y0FBQTtjQUFBO1lBQUE7WUFBQSxvQkFBVyxJQUFBZSxXQUFLLEVBQUNSLENBQUcsQ0FBQztVQUFBO1lBQUE7VUFBQTtZQUFBLElBQTdDWSxDQUFJLGdCQUNPVixDQUFPO2NBQUE7Y0FBQTtZQUFBO1lBQUEsb0JBQVcsSUFBQU0sV0FBSyxFQUFDTixDQUFPLENBQUM7VUFBQTtZQUFBO1VBQUE7WUFBQSxPQUEzQzBCLENBQVEsU0FFUkMsQ0FBTSxHQUFHNUMsZUFBTSxDQUFDNkMsVUFBVSxDQUFDM0MsQ0FBSyxDQUFDLGVBRWpDLElBQUE0QyxzQkFBYSxFQUFDO2NBQ2hCRixNQUFNLEVBQU5BLENBQU07Y0FDTjNDLE9BQU8sRUFBUEEsQ0FBTztjQUNQOEMsUUFBUSxFQUFFOUMsQ0FBTyxDQUFDOEIsT0FBTyxDQUFDRyxZQUFZLENBQUNjLE1BQU07Y0FDN0NDLElBQUksRUFBRzdCLENBQW9CLENBQUM4QixNQUFNLEdBRTVCLElBQUFDLHdCQUFlLEVBQ1gvQixDQUFvQixFQUNwQkMsQ0FBd0IsRUFDeEJRLENBQU8sQ0FDVixHQUxELElBQUF1QixhQUFJLEVBQUN6QixDQUFJLEVBQUVnQixDQUFRLEVBQUVkLENBQU8sQ0FLM0I7Y0FDUHdCLFlBQVksRUFBRTlDLENBQU8sa0JBQ1BBLENBQU87WUFFekIsQ0FBQyxDQUFDO1VBQUE7VUFBQTtZQUFBO1FBQUE7TUFBQTtJQUFBLENBQ0w7SUFBQSxnQkF4RktSLElBQUk7TUFBQTtJQUFBO0VBQUEsR0F3RlQ7QUE5R0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBMkdBQSxJQUFJLEVBQUUsQ0FBQ1ksS0FBSyxDQUFDLFVBQUNDLENBQUcsRUFBSztFQUNsQkMsT0FBTyxDQUFDRyxHQUFHLENBQUNKLENBQUcsQ0FBQyxFQUNoQlQsYUFBSSxDQUFDbUQsU0FBUyxDQUFDMUMsQ0FBRyxDQUFDMkMsT0FBTyxDQUFDO0FBQy9CLENBQUMsQ0FBQyJ9