/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$3 = Symbol(), n$5 = /* @__PURE__ */ new WeakMap();
class s$3 {
  constructor(t2, n2, s2) {
    if (this._$cssResult$ = true, s2 !== e$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = n2;
  }
  get styleSheet() {
    let e2 = this.o;
    const s2 = this.t;
    if (t$1 && e2 === void 0) {
      const t2 = s2 !== void 0 && s2.length === 1;
      t2 && (e2 = n$5.get(s2)), e2 === void 0 && ((this.o = e2 = new CSSStyleSheet()).replaceSync(this.cssText), t2 && n$5.set(s2, e2));
    }
    return e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$5 = (t2) => new s$3(typeof t2 == "string" ? t2 : t2 + "", void 0, e$3), r$2 = (t2, ...n2) => {
  const o2 = t2.length === 1 ? t2[0] : n2.reduce((e2, n3, s2) => e2 + ((t3) => {
    if (t3._$cssResult$ === true)
      return t3.cssText;
    if (typeof t3 == "number")
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n3) + t2[s2 + 1], t2[0]);
  return new s$3(o2, t2, e$3);
}, i$3 = (e2, n2) => {
  t$1 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
  });
}, S$1 = t$1 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const n2 of t3.cssRules)
    e2 += n2.cssText;
  return o$5(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$2 = window.trustedTypes, r$1 = e$2 ? e$2.emptyScript : "", h$1 = window.reactiveElementPolyfillSupport, o$4 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? r$1 : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = t2 !== null;
      break;
    case Number:
      s2 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, n$4 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$2 = { attribute: true, type: String, converter: o$4, reflect: false, hasChanged: n$4 };
class a$1 extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t2) {
    var i2;
    (i2 = this.h) !== null && i2 !== void 0 || (this.h = []), this.h.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Ep(s2, i2);
      e2 !== void 0 && (this._$Ev.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$2) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$1(i3));
    } else
      i2 !== void 0 && s2.push(S$1(i2));
    return s2;
  }
  static _$Ep(t2, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  u() {
    var t2;
    this._$E_ = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t2 = this.constructor.h) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    ((i2 = this._$ES) !== null && i2 !== void 0 ? i2 : this._$ES = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this._$ES) === null || i2 === void 0 || i2.splice(this._$ES.indexOf(t2) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Ei.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$3(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$ES) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$ES) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$EO(t2, i2, s2 = l$2) {
    var e2, r2;
    const h2 = this.constructor._$Ep(t2, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$4.toAttribute)(i2, s2.type);
      this._$El = t2, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$El = null;
    }
  }
  _$AK(t2, i2) {
    var s2, e2;
    const r2 = this.constructor, h2 = r2._$Ev.get(t2);
    if (h2 !== void 0 && this._$El !== h2) {
      const t3 = r2.getPropertyOptions(h2), n2 = t3.converter, l2 = (e2 = (s2 = n2 == null ? void 0 : n2.fromAttribute) !== null && s2 !== void 0 ? s2 : typeof n2 == "function" ? n2 : null) !== null && e2 !== void 0 ? e2 : o$4.fromAttribute;
      this._$El = h2, this[h2] = l2(i2, t3.type), this._$El = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$4)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s2.reflect === true && this._$El !== t2 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t3, i3) => this[i3] = t3), this._$Ei = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t2 = this._$ES) === null || t2 === void 0 || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$Ek();
    } catch (t3) {
      throw i2 = false, this._$Ek(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    (i2 = this._$ES) === null || i2 === void 0 || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$EC !== void 0 && (this._$EC.forEach((t3, i2) => this._$EO(i2, this[i2], t3)), this._$EC = void 0), this._$Ek();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
a$1.finalized = true, a$1.elementProperties = /* @__PURE__ */ new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = { mode: "open" }, h$1 == null || h$1({ ReactiveElement: a$1 }), ((s$2 = globalThis.reactiveElementVersions) !== null && s$2 !== void 0 ? s$2 : globalThis.reactiveElementVersions = []).push("1.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;
const i$2 = globalThis.trustedTypes, s$1 = i$2 ? i$2.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$1 = `lit$${(Math.random() + "").slice(9)}$`, o$3 = "?" + e$1, n$3 = `<${o$3}>`, l$1 = document, h = (t2 = "") => l$1.createComment(t2), r = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u = (t2) => {
  var i2;
  return d(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _$a = /'/g, m = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), $ = p(1), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = /* @__PURE__ */ new WeakMap(), x = (t2, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t3), t3, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, A = l$1.createTreeWalker(l$1, 129, null, false), C = (t2, i2) => {
  const o2 = t2.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t2[i3];
    let o3, u3, p2 = -1, $2 = 0;
    for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), u3 !== null); )
      $2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _$a) : d2 === m || d2 === _$a ? d2 = f : d2 === v || d2 === a ? d2 = c : (d2 = f, h2 = void 0);
    const y = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s2 + n$3 : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$1 + y) : s2 + e$1 + (p2 === -2 ? (l2.push(void 0), i3) : y);
  }
  const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [s$1 !== void 0 ? s$1.createHTML(u2) : u2, l2];
};
class E {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
    if (this.el = E.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$1)) {
              const s3 = a2[d2++];
              if (t3.push(i2), s3 !== void 0) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$1), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t4, ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if (g.test(l2.tagName)) {
          const t3 = l2.textContent.split(e$1), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i$2 ? i$2.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t3[i2], h()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t3[s3], h());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$3)
          c2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e$1, t3 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t3 += e$1.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function P(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === b)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = r(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
}
class V {
  constructor(t2, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l$1).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new L(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t2) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t2, i2;
    return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = P(this, t2, i2), r(t2) ? t2 === w || t2 == null || t2 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.k(t2) : u(t2) ? this.S(t2) : this.$(t2);
  }
  M(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  k(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.M(t2));
  }
  $(t2) {
    this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l$1.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = E.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new V(o2, this), i3 = t3.p(this.options);
      t3.m(s2), this.k(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = T.get(t2.strings);
    return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
  }
  S(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.M(h()), this.M(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
  }
}
class S {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t2 = P(this, t2, i2, 0), n2 = !r(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.C(t2);
  }
  C(t2) {
    t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t2) {
    this.element[this.name] = t2 === w ? void 0 : t2;
  }
}
const k = i$2 ? i$2.emptyScript : "";
class H extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t2) {
    t2 && t2 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
}
class I extends S {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = (s2 = P(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : w) === b)
      return;
    const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    P(this, t2);
  }
}
const z = window.litHtmlPolyfillSupport;
z == null || z(E, N), ((t = globalThis.litHtmlVersions) !== null && t !== void 0 ? t : globalThis.litHtmlVersions = []).push("2.2.6");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o$2;
class s extends a$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return (t2 = (e2 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = x(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this._$Do) === null || t2 === void 0 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this._$Do) === null || t2 === void 0 || t2.setConnected(false);
  }
  render() {
    return b;
  }
}
s.finalized = true, s._$litElement$ = true, (l = globalThis.litElementHydrateSupport) === null || l === void 0 || l.call(globalThis, { LitElement: s });
const n$2 = globalThis.litElementPolyfillSupport;
n$2 == null || n$2({ LitElement: s });
((o$2 = globalThis.litElementVersions) !== null && o$2 !== void 0 ? o$2 : globalThis.litElementVersions = []).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = (n2) => (e2) => typeof e2 == "function" ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
  const { kind: t2, elements: i2 } = e3;
  return { kind: t2, elements: i2, finisher(e4) {
    window.customElements.define(n3, e4);
  } };
})(n2, e2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$1 = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? { ...e2, finisher(n2) {
  n2.createProperty(e2.key, i2);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e(e2) {
  return (n2, t2) => t2 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t2) : i$1(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$1 = ({ finisher: e2, descriptor: t2 }) => (o2, n2) => {
  var r2;
  if (n2 === void 0) {
    const n3 = (r2 = o2.originalKey) !== null && r2 !== void 0 ? r2 : o2.key, i2 = t2 != null ? { kind: "method", placement: "prototype", key: n3, descriptor: t2(o2.key) } : { ...o2, key: n3 };
    return e2 != null && (i2.finisher = function(t3) {
      e2(t3, n3);
    }), i2;
  }
  {
    const r3 = o2.constructor;
    t2 !== void 0 && Object.defineProperty(o2, n2, t2(n2)), e2 == null || e2(r3, n2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i(i2, n2) {
  return o$1({ descriptor: (o2) => {
    const t2 = { get() {
      var o3, n3;
      return (n3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && n3 !== void 0 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = typeof o2 == "symbol" ? Symbol() : "__" + o2;
      t2.get = function() {
        var o3, t3;
        return this[n3] === void 0 && (this[n3] = (t3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && t3 !== void 0 ? t3 : null), this[n3];
      };
    }
    return t2;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n;
((n = window.HTMLSlotElement) === null || n === void 0 ? void 0 : n.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* o(o2, f2) {
  if (o2 !== void 0) {
    let i2 = 0;
    for (const t2 of o2)
      yield f2(t2, i2++);
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isCEPolyfill = typeof window !== "undefined" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0;
const reparentNodes = (container, start, end = null, before = null) => {
  while (start !== end) {
    const n2 = start.nextSibling;
    container.insertBefore(start, before);
    start = n2;
  }
};
const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n2 = start.nextSibling;
    container.removeChild(start);
    start = n2;
  }
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
const boundAttributeSuffix = "$lit$";
class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = [];
    const walker = document.createTreeWalker(element.content, 133, null, false);
    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const { strings, values: { length } } = result;
    while (partIndex < length) {
      const node = walker.nextNode();
      if (node === null) {
        walker.currentNode = stack.pop();
        continue;
      }
      index++;
      if (node.nodeType === 1) {
        if (node.hasAttributes()) {
          const attributes = node.attributes;
          const { length: length2 } = attributes;
          let count = 0;
          for (let i2 = 0; i2 < length2; i2++) {
            if (endsWith(attributes[i2].name, boundAttributeSuffix)) {
              count++;
            }
          }
          while (count-- > 0) {
            const stringForPart = strings[partIndex];
            const name = lastAttributeNameRegex.exec(stringForPart)[2];
            const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
            const attributeValue = node.getAttribute(attributeLookupName);
            node.removeAttribute(attributeLookupName);
            const statics = attributeValue.split(markerRegex);
            this.parts.push({ type: "attribute", index, name, strings: statics });
            partIndex += statics.length - 1;
          }
        }
        if (node.tagName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
      } else if (node.nodeType === 3) {
        const data = node.data;
        if (data.indexOf(marker) >= 0) {
          const parent = node.parentNode;
          const strings2 = data.split(markerRegex);
          const lastIndex = strings2.length - 1;
          for (let i2 = 0; i2 < lastIndex; i2++) {
            let insert;
            let s2 = strings2[i2];
            if (s2 === "") {
              insert = createMarker();
            } else {
              const match = lastAttributeNameRegex.exec(s2);
              if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                s2 = s2.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
              }
              insert = document.createTextNode(s2);
            }
            parent.insertBefore(insert, node);
            this.parts.push({ type: "node", index: ++index });
          }
          if (strings2[lastIndex] === "") {
            parent.insertBefore(createMarker(), node);
            nodesToRemove.push(node);
          } else {
            node.data = strings2[lastIndex];
          }
          partIndex += lastIndex;
        }
      } else if (node.nodeType === 8) {
        if (node.data === marker) {
          const parent = node.parentNode;
          if (node.previousSibling === null || index === lastPartIndex) {
            index++;
            parent.insertBefore(createMarker(), node);
          }
          lastPartIndex = index;
          this.parts.push({ type: "node", index });
          if (node.nextSibling === null) {
            node.data = "";
          } else {
            nodesToRemove.push(node);
            index--;
          }
          partIndex++;
        } else {
          let i2 = -1;
          while ((i2 = node.data.indexOf(marker, i2 + 1)) !== -1) {
            this.parts.push({ type: "node", index: -1 });
            partIndex++;
          }
        }
      }
    }
    for (const n2 of nodesToRemove) {
      n2.parentNode.removeChild(n2);
    }
  }
}
const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
const createMarker = () => document.createComment("");
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133;
function removeNodesFromTemplate(template, nodesToRemove) {
  const { element: { content }, parts: parts2 } = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts2);
  let part = parts2[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;
  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode;
    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    }
    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node);
      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    }
    if (currentRemovingNode !== null) {
      removeCount++;
    }
    while (part !== void 0 && part.index === nodeIndex) {
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
      partIndex = nextActiveIndexInTemplateParts(parts2, partIndex);
      part = parts2[partIndex];
    }
  }
  nodesToRemoveInTemplate.forEach((n2) => n2.parentNode.removeChild(n2));
}
const countNodes = (node) => {
  let count = node.nodeType === 11 ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
  while (walker.nextNode()) {
    count++;
  }
  return count;
};
const nextActiveIndexInTemplateParts = (parts2, startIndex = -1) => {
  for (let i2 = startIndex + 1; i2 < parts2.length; i2++) {
    const part = parts2[i2];
    if (isTemplatePartActive(part)) {
      return i2;
    }
  }
  return -1;
};
function insertNodeIntoTemplate(template, node, refNode = null) {
  const { element: { content }, parts: parts2 } = template;
  if (refNode === null || refNode === void 0) {
    content.appendChild(node);
    return;
  }
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts2);
  let insertCount = 0;
  let walkerIndex = -1;
  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;
    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }
    while (partIndex !== -1 && parts2[partIndex].index === walkerIndex) {
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts2[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts2, partIndex);
        }
        return;
      }
      partIndex = nextActiveIndexInTemplateParts(parts2, partIndex);
    }
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = /* @__PURE__ */ new WeakMap();
const directive = (f2) => (...args) => {
  const d2 = f2(...args);
  directives.set(d2, true);
  return d2;
};
const isDirective = (o2) => {
  return typeof o2 === "function" && directives.has(o2);
};
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const noChange = {};
const nothing = {};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }
  update(values) {
    let i2 = 0;
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.setValue(values[i2]);
      }
      i2++;
    }
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.commit();
      }
    }
  }
  _clone() {
    const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts2 = this.template.parts;
    const walker = document.createTreeWalker(fragment, 133, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    while (partIndex < parts2.length) {
      part = parts2[partIndex];
      if (!isTemplatePartActive(part)) {
        this.__parts.push(void 0);
        partIndex++;
        continue;
      }
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      if (part.type === "node") {
        const part2 = this.processor.handleTextExpression(this.options);
        part2.insertAfterNode(node.previousSibling);
        this.__parts.push(part2);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", { createHTML: (s2) => s2 });
const commentMarker = ` ${marker} `;
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  getHTML() {
    const l2 = this.strings.length - 1;
    let html2 = "";
    let isCommentBinding = false;
    for (let i2 = 0; i2 < l2; i2++) {
      const s2 = this.strings[i2];
      const commentOpen = s2.lastIndexOf("<!--");
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s2.indexOf("-->", commentOpen + 1) === -1;
      const attributeMatch = lastAttributeNameRegex.exec(s2);
      if (attributeMatch === null) {
        html2 += s2 + (isCommentBinding ? commentMarker : nodeMarker);
      } else {
        html2 += s2.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
      }
    }
    html2 += this.strings[l2];
    return html2;
  }
  getTemplateElement() {
    const template = document.createElement("template");
    let value = this.getHTML();
    if (policy !== void 0) {
      value = policy.createHTML(value);
    }
    template.innerHTML = value;
    return template;
  }
}
class SVGTemplateResult extends TemplateResult {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }
  getTemplateElement() {
    const template = super.getTemplateElement();
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    reparentNodes(content, svgElement.firstChild);
    return template;
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
  return value === null || !(typeof value === "object" || typeof value === "function");
};
const isIterable = (value) => {
  return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];
    for (let i2 = 0; i2 < strings.length - 1; i2++) {
      this.parts[i2] = this._createPart();
    }
  }
  _createPart() {
    return new AttributePart(this);
  }
  _getValue() {
    const strings = this.strings;
    const l2 = strings.length - 1;
    const parts2 = this.parts;
    if (l2 === 1 && strings[0] === "" && strings[1] === "") {
      const v2 = parts2[0].value;
      if (typeof v2 === "symbol") {
        return String(v2);
      }
      if (typeof v2 === "string" || !isIterable(v2)) {
        return v2;
      }
    }
    let text = "";
    for (let i2 = 0; i2 < l2; i2++) {
      text += strings[i2];
      const part = parts2[i2];
      if (part !== void 0) {
        const v2 = part.value;
        if (isPrimitive(v2) || !isIterable(v2)) {
          text += typeof v2 === "string" ? v2 : String(v2);
        } else {
          for (const t2 of v2) {
            text += typeof t2 === "string" ? t2 : String(t2);
          }
        }
      }
    }
    text += strings[l2];
    return text;
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
}
class AttributePart {
  constructor(committer) {
    this.value = void 0;
    this.committer = committer;
  }
  setValue(value) {
    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value;
      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (isDirective(this.value)) {
      const directive2 = this.value;
      this.value = noChange;
      directive2(this);
    }
    if (this.value === noChange) {
      return;
    }
    this.committer.commit();
  }
}
class NodePart {
  constructor(options) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.options = options;
  }
  appendInto(container) {
    this.startNode = container.appendChild(createMarker());
    this.endNode = container.appendChild(createMarker());
  }
  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  appendIntoPart(part) {
    part.__insert(this.startNode = createMarker());
    part.__insert(this.endNode = createMarker());
  }
  insertAfterPart(ref) {
    ref.__insert(this.startNode = createMarker());
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    const value = this.__pendingValue;
    if (value === noChange) {
      return;
    }
    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === nothing) {
      this.value = nothing;
      this.clear();
    } else {
      this.__commitText(value);
    }
  }
  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }
  __commitNode(value) {
    if (this.value === value) {
      return;
    }
    this.clear();
    this.__insert(value);
    this.value = value;
  }
  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? "" : value;
    const valueAsString = typeof value === "string" ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3) {
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      const instance = new TemplateInstance(template, value.processor, this.options);
      const fragment = instance._clone();
      instance.update(value.values);
      this.__commitNode(fragment);
      this.value = instance;
    }
  }
  __commitIterable(value) {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }
    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      itemPart = itemParts[partIndex];
      if (itemPart === void 0) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }
  clear(startNode = this.startNode) {
    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
}
class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = void 0;
    this.__pendingValue = void 0;
    if (strings.length !== 2 || strings[0] !== "" || strings[1] !== "") {
      throw new Error("Boolean attributes can only contain a single expression");
    }
    this.element = element;
    this.name = name;
    this.strings = strings;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, "");
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = noChange;
  }
}
class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === "" && strings[1] === "";
  }
  _createPart() {
    return new PropertyPart(this);
  }
  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element[this.name] = this._getValue();
    }
  }
}
class PropertyPart extends AttributePart {
}
let eventOptionsSupported = false;
(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (_e) {
  }
})();
class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;
    this.__boundHandleEvent = (e2) => this.handleEvent(e2);
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    this.value = newListener;
    this.__pendingValue = noChange;
  }
  handleEvent(event) {
    if (typeof this.value === "function") {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }
}
const getOptions = (o2) => o2 && (eventOptionsSupported ? { capture: o2.capture, passive: o2.passive, once: o2.once } : o2.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);
  if (templateCache === void 0) {
    templateCache = {
      stringsArray: /* @__PURE__ */ new WeakMap(),
      keyString: /* @__PURE__ */ new Map()
    };
    templateCaches.set(result.type, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== void 0) {
    return template;
  }
  const key = result.strings.join(marker);
  template = templateCache.keyString.get(key);
  if (template === void 0) {
    template = new Template(result, result.getTemplateElement());
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
}
const templateCaches = /* @__PURE__ */ new Map();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = /* @__PURE__ */ new WeakMap();
const render$1 = (result, container, options) => {
  let part = parts.get(container);
  if (part === void 0) {
    removeNodes(container, container.firstChild);
    parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
    part.appendInto(container);
  }
  part.setValue(result);
  part.commit();
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class DefaultTemplateProcessor {
  handleAttributeExpressions(element, name, strings, options) {
    const prefix2 = name[0];
    if (prefix2 === ".") {
      const committer2 = new PropertyCommitter(element, name.slice(1), strings);
      return committer2.parts;
    }
    if (prefix2 === "@") {
      return [new EventPart(element, name.slice(1), options.eventContext)];
    }
    if (prefix2 === "?") {
      return [new BooleanAttributePart(element, name.slice(1), strings)];
    }
    const committer = new AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  handleTextExpression(options) {
    return new NodePart(options);
  }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
if (typeof window !== "undefined") {
  (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.4.1");
}
const html = (strings, ...values) => new TemplateResult(strings, values, "html", defaultTemplateProcessor);
const svg = (strings, ...values) => new SVGTemplateResult(strings, values, "svg", defaultTemplateProcessor);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === "undefined") {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === "undefined") {
  console.warn(`Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
const shadyTemplateFactory = (scopeName) => (result) => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);
  let templateCache = templateCaches.get(cacheKey);
  if (templateCache === void 0) {
    templateCache = {
      stringsArray: /* @__PURE__ */ new WeakMap(),
      keyString: /* @__PURE__ */ new Map()
    };
    templateCaches.set(cacheKey, templateCache);
  }
  let template = templateCache.stringsArray.get(result.strings);
  if (template !== void 0) {
    return template;
  }
  const key = result.strings.join(marker);
  template = templateCache.keyString.get(key);
  if (template === void 0) {
    const element = result.getTemplateElement();
    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }
    template = new Template(result, element);
    templateCache.keyString.set(key, template);
  }
  templateCache.stringsArray.set(result.strings, template);
  return template;
};
const TEMPLATE_TYPES = ["html", "svg"];
const removeStylesFromLitTemplates = (scopeName) => {
  TEMPLATE_TYPES.forEach((type) => {
    const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
    if (templates !== void 0) {
      templates.keyString.forEach((template) => {
        const { element: { content } } = template;
        const styles2 = /* @__PURE__ */ new Set();
        Array.from(content.querySelectorAll("style")).forEach((s2) => {
          styles2.add(s2);
        });
        removeNodesFromTemplate(template, styles2);
      });
    }
  });
};
const shadyRenderSet = /* @__PURE__ */ new Set();
const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
  shadyRenderSet.add(scopeName);
  const templateElement = !!template ? template.element : document.createElement("template");
  const styles2 = renderedDOM.querySelectorAll("style");
  const { length } = styles2;
  if (length === 0) {
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    return;
  }
  const condensedStyle = document.createElement("style");
  for (let i2 = 0; i2 < length; i2++) {
    const style2 = styles2[i2];
    style2.parentNode.removeChild(style2);
    condensedStyle.textContent += style2.textContent;
  }
  removeStylesFromLitTemplates(scopeName);
  const content = templateElement.content;
  if (!!template) {
    insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
  } else {
    content.insertBefore(condensedStyle, content.firstChild);
  }
  window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
  const style = content.querySelector("style");
  if (window.ShadyCSS.nativeShadow && style !== null) {
    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
  } else if (!!template) {
    content.insertBefore(condensedStyle, content.firstChild);
    const removes = /* @__PURE__ */ new Set();
    removes.add(condensedStyle);
    removeNodesFromTemplate(template, removes);
  }
};
const render = (result, container, options) => {
  if (!options || typeof options !== "object" || !options.scopeName) {
    throw new Error("The `scopeName` option is required.");
  }
  const scopeName = options.scopeName;
  const hasRendered = parts.has(container);
  const needsScoping = compatibleShadyCSSVersion && container.nodeType === 11 && !!container.host;
  const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
  const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
  render$1(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
  if (firstScopeRender) {
    const part = parts.get(renderContainer);
    parts.delete(renderContainer);
    const template = part.value instanceof TemplateInstance ? part.value.template : void 0;
    prepareTemplateStyles(scopeName, renderContainer, template);
    removeNodes(container, container.firstChild);
    container.appendChild(renderContainer);
    parts.set(container, part);
  }
  if (!hasRendered && needsScoping) {
    window.ShadyCSS.styleElement(container.host);
  }
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
window.JSCompiler_renameProperty = (prop, _obj) => prop;
const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? "" : null;
      case Object:
      case Array:
        return value == null ? value : JSON.stringify(value);
    }
    return value;
  },
  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;
      case Number:
        return value === null ? null : Number(value);
      case Object:
      case Array:
        return JSON.parse(value);
    }
    return value;
  }
};
const notEqual = (value, old) => {
  return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
const finalized = "finalized";
class UpdatingElement extends HTMLElement {
  constructor() {
    super();
    this.initialize();
  }
  static get observedAttributes() {
    this.finalize();
    const attributes = [];
    this._classProperties.forEach((v2, p2) => {
      const attr = this._attributeNameForProperty(p2, v2);
      if (attr !== void 0) {
        this._attributeToPropertyMap.set(attr, p2);
        attributes.push(attr);
      }
    });
    return attributes;
  }
  static _ensureClassProperties() {
    if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
      this._classProperties = /* @__PURE__ */ new Map();
      const superProperties = Object.getPrototypeOf(this)._classProperties;
      if (superProperties !== void 0) {
        superProperties.forEach((v2, k2) => this._classProperties.set(k2, v2));
      }
    }
  }
  static createProperty(name, options = defaultPropertyDeclaration) {
    this._ensureClassProperties();
    this._classProperties.set(name, options);
    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
      return;
    }
    const key = typeof name === "symbol" ? Symbol() : `__${name}`;
    const descriptor = this.getPropertyDescriptor(name, key, options);
    if (descriptor !== void 0) {
      Object.defineProperty(this.prototype, name, descriptor);
    }
  }
  static getPropertyDescriptor(name, key, options) {
    return {
      get() {
        return this[key];
      },
      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdateInternal(name, oldValue, options);
      },
      configurable: true,
      enumerable: true
    };
  }
  static getPropertyOptions(name) {
    return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration;
  }
  static finalize() {
    const superCtor = Object.getPrototypeOf(this);
    if (!superCtor.hasOwnProperty(finalized)) {
      superCtor.finalize();
    }
    this[finalized] = true;
    this._ensureClassProperties();
    this._attributeToPropertyMap = /* @__PURE__ */ new Map();
    if (this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
      const props = this.properties;
      const propKeys = [
        ...Object.getOwnPropertyNames(props),
        ...typeof Object.getOwnPropertySymbols === "function" ? Object.getOwnPropertySymbols(props) : []
      ];
      for (const p2 of propKeys) {
        this.createProperty(p2, props[p2]);
      }
    }
  }
  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? void 0 : typeof attribute === "string" ? attribute : typeof name === "string" ? name.toLowerCase() : void 0;
  }
  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter;
    const fromAttribute = typeof converter === "function" ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  static _propertyValueToAttribute(value, options) {
    if (options.reflect === void 0) {
      return;
    }
    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
    return toAttribute(value, type);
  }
  initialize() {
    this._updateState = 0;
    this._updatePromise = new Promise((res) => this._enableUpdatingResolver = res);
    this._changedProperties = /* @__PURE__ */ new Map();
    this._saveInstanceProperties();
    this.requestUpdateInternal();
  }
  _saveInstanceProperties() {
    this.constructor._classProperties.forEach((_v, p2) => {
      if (this.hasOwnProperty(p2)) {
        const value = this[p2];
        delete this[p2];
        if (!this._instanceProperties) {
          this._instanceProperties = /* @__PURE__ */ new Map();
        }
        this._instanceProperties.set(p2, value);
      }
    });
  }
  _applyInstanceProperties() {
    this._instanceProperties.forEach((v2, p2) => this[p2] = v2);
    this._instanceProperties = void 0;
  }
  connectedCallback() {
    this.enableUpdating();
  }
  enableUpdating() {
    if (this._enableUpdatingResolver !== void 0) {
      this._enableUpdatingResolver();
      this._enableUpdatingResolver = void 0;
    }
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }
  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;
    const attr = ctor._attributeNameForProperty(name, options);
    if (attr !== void 0) {
      const attrValue = ctor._propertyValueToAttribute(value, options);
      if (attrValue === void 0) {
        return;
      }
      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      }
      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
    }
  }
  _attributeToProperty(name, value) {
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
      return;
    }
    const ctor = this.constructor;
    const propName = ctor._attributeToPropertyMap.get(name);
    if (propName !== void 0) {
      const options = ctor.getPropertyOptions(propName);
      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
      this[propName] = ctor._propertyValueFromAttribute(value, options);
      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
    }
  }
  requestUpdateInternal(name, oldValue, options) {
    let shouldRequestUpdate = true;
    if (name !== void 0) {
      const ctor = this.constructor;
      options = options || ctor.getPropertyOptions(name);
      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        if (!this._changedProperties.has(name)) {
          this._changedProperties.set(name, oldValue);
        }
        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
          if (this._reflectingProperties === void 0) {
            this._reflectingProperties = /* @__PURE__ */ new Map();
          }
          this._reflectingProperties.set(name, options);
        }
      } else {
        shouldRequestUpdate = false;
      }
    }
    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._updatePromise = this._enqueueUpdate();
    }
  }
  requestUpdate(name, oldValue) {
    this.requestUpdateInternal(name, oldValue);
    return this.updateComplete;
  }
  async _enqueueUpdate() {
    this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
    try {
      await this._updatePromise;
    } catch (e2) {
    }
    const result = this.performUpdate();
    if (result != null) {
      await result;
    }
    return !this._hasRequestedUpdate;
  }
  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }
  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED;
  }
  performUpdate() {
    if (!this._hasRequestedUpdate) {
      return;
    }
    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }
    let shouldUpdate = false;
    const changedProperties = this._changedProperties;
    try {
      shouldUpdate = this.shouldUpdate(changedProperties);
      if (shouldUpdate) {
        this.update(changedProperties);
      } else {
        this._markUpdated();
      }
    } catch (e2) {
      shouldUpdate = false;
      this._markUpdated();
      throw e2;
    }
    if (shouldUpdate) {
      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }
      this.updated(changedProperties);
    }
  }
  _markUpdated() {
    this._changedProperties = /* @__PURE__ */ new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  get updateComplete() {
    return this._getUpdateComplete();
  }
  _getUpdateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._updatePromise;
  }
  shouldUpdate(_changedProperties) {
    return true;
  }
  update(_changedProperties) {
    if (this._reflectingProperties !== void 0 && this._reflectingProperties.size > 0) {
      this._reflectingProperties.forEach((v2, k2) => this._propertyToAttribute(k2, this[k2], v2));
      this._reflectingProperties = void 0;
    }
    this._markUpdated();
  }
  updated(_changedProperties) {
  }
  firstUpdated(_changedProperties) {
  }
}
_a = finalized;
UpdatingElement[_a] = true;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const legacyCustomElement = (tagName, clazz) => {
  window.customElements.define(tagName, clazz);
  return clazz;
};
const standardCustomElement = (tagName, descriptor) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    finisher(clazz) {
      window.customElements.define(tagName, clazz);
    }
  };
};
const customElement = (tagName) => (classOrDescriptor) => typeof classOrDescriptor === "function" ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);
const standardProperty = (options, element) => {
  if (element.kind === "method" && element.descriptor && !("value" in element.descriptor)) {
    return Object.assign(Object.assign({}, element), { finisher(clazz) {
      clazz.createProperty(element.key, options);
    } });
  } else {
    return {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},
      initializer() {
        if (typeof element.initializer === "function") {
          this[element.key] = element.initializer.call(this);
        }
      },
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  }
};
const legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
function property(options) {
  return (protoOrDescriptor, name) => name !== void 0 ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}
function query(selector, cache) {
  return (protoOrDescriptor, name) => {
    const descriptor = {
      get() {
        return this.renderRoot.querySelector(selector);
      },
      enumerable: true,
      configurable: true
    };
    if (cache) {
      const prop = name !== void 0 ? name : protoOrDescriptor.key;
      const key = typeof prop === "symbol" ? Symbol() : `__${prop}`;
      descriptor.get = function() {
        if (this[key] === void 0) {
          this[key] = this.renderRoot.querySelector(selector);
        }
        return this[key];
      };
    }
    return name !== void 0 ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}
const legacyQuery = (descriptor, proto, name) => {
  Object.defineProperty(proto, name, descriptor);
};
const standardQuery = (descriptor, element) => ({
  kind: "method",
  placement: "prototype",
  key: element.key,
  descriptor
});
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
const constructionToken = Symbol();
class CSSResult {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    }
    this.cssText = cssText;
  }
  get styleSheet() {
    if (this._styleSheet === void 0) {
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();
        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }
    return this._styleSheet;
  }
  toString() {
    return this.cssText;
  }
}
const unsafeCSS = (value) => {
  return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value) => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
const css = (strings, ...values) => {
  const cssText = values.reduce((acc, v2, idx) => acc + textFromCSSResult(v2) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, constructionToken);
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window["litElementVersions"] || (window["litElementVersions"] = [])).push("2.5.1");
const renderNotImplemented = {};
class LitElement extends UpdatingElement {
  static getStyles() {
    return this.styles;
  }
  static _getUniqueStyles() {
    if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) {
      return;
    }
    const userStyles = this.getStyles();
    if (Array.isArray(userStyles)) {
      const addStyles = (styles3, set2) => styles3.reduceRight((set3, s2) => Array.isArray(s2) ? addStyles(s2, set3) : (set3.add(s2), set3), set2);
      const set = addStyles(userStyles, /* @__PURE__ */ new Set());
      const styles2 = [];
      set.forEach((v2) => styles2.unshift(v2));
      this._styles = styles2;
    } else {
      this._styles = userStyles === void 0 ? [] : [userStyles];
    }
    this._styles = this._styles.map((s2) => {
      if (s2 instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
        const cssText = Array.prototype.slice.call(s2.cssRules).reduce((css2, rule) => css2 + rule.cssText, "");
        return unsafeCSS(cssText);
      }
      return s2;
    });
  }
  initialize() {
    super.initialize();
    this.constructor._getUniqueStyles();
    this.renderRoot = this.createRenderRoot();
    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  createRenderRoot() {
    return this.attachShadow(this.constructor.shadowRootOptions);
  }
  adoptStyles() {
    const styles2 = this.constructor._styles;
    if (styles2.length === 0) {
      return;
    }
    if (window.ShadyCSS !== void 0 && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles2.map((s2) => s2.cssText), this.localName);
    } else if (supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles2.map((s2) => s2 instanceof CSSStyleSheet ? s2 : s2.styleSheet);
    } else {
      this._needsShimAdoptedStyleSheets = true;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && window.ShadyCSS !== void 0) {
      window.ShadyCSS.styleElement(this);
    }
  }
  update(changedProperties) {
    const templateResult = this.render();
    super.update(changedProperties);
    if (templateResult !== renderNotImplemented) {
      this.constructor.render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
    }
    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;
      this.constructor._styles.forEach((s2) => {
        const style = document.createElement("style");
        style.textContent = s2.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
  render() {
    return renderNotImplemented;
  }
}
LitElement["finalized"] = true;
LitElement.render = render;
LitElement.shadowRootOptions = { mode: "open" };
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o2, minLen);
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _decorate(decorators, factory, superClass, mixins) {
  var api = _getDecoratorsApi();
  if (mixins) {
    for (var i2 = 0; i2 < mixins.length; i2++) {
      api = mixins[i2](api);
    }
  }
  var r2 = factory(function initialize(O) {
    api.initializeInstanceElements(O, decorated.elements);
  }, superClass);
  var decorated = api.decorateClass(_coalesceClassElements(r2.d.map(_createElementDescriptor)), decorators);
  api.initializeClassElements(r2.F, decorated.elements);
  return api.runClassFinishers(r2.F, decorated.finishers);
}
function _getDecoratorsApi() {
  _getDecoratorsApi = function _getDecoratorsApi2() {
    return api;
  };
  var api = {
    elementsDefinitionOrder: [["method"], ["field"]],
    initializeInstanceElements: function initializeInstanceElements(O, elements) {
      ["method", "field"].forEach(function(kind) {
        elements.forEach(function(element) {
          if (element.kind === kind && element.placement === "own") {
            this.defineClassElement(O, element);
          }
        }, this);
      }, this);
    },
    initializeClassElements: function initializeClassElements(F, elements) {
      var proto = F.prototype;
      ["method", "field"].forEach(function(kind) {
        elements.forEach(function(element) {
          var placement = element.placement;
          if (element.kind === kind && (placement === "static" || placement === "prototype")) {
            var receiver = placement === "static" ? F : proto;
            this.defineClassElement(receiver, element);
          }
        }, this);
      }, this);
    },
    defineClassElement: function defineClassElement(receiver, element) {
      var descriptor = element.descriptor;
      if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = {
          enumerable: descriptor.enumerable,
          writable: descriptor.writable,
          configurable: descriptor.configurable,
          value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
      }
      Object.defineProperty(receiver, element.key, descriptor);
    },
    decorateClass: function decorateClass(elements, decorators) {
      var newElements = [];
      var finishers = [];
      var placements = {
        "static": [],
        prototype: [],
        own: []
      };
      elements.forEach(function(element) {
        this.addElementPlacement(element, placements);
      }, this);
      elements.forEach(function(element) {
        if (!_hasDecorators(element))
          return newElements.push(element);
        var elementFinishersExtras = this.decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
      }, this);
      if (!decorators) {
        return {
          elements: newElements,
          finishers
        };
      }
      var result = this.decorateConstructor(newElements, decorators);
      finishers.push.apply(finishers, result.finishers);
      result.finishers = finishers;
      return result;
    },
    addElementPlacement: function addElementPlacement(element, placements, silent) {
      var keys = placements[element.placement];
      if (!silent && keys.indexOf(element.key) !== -1) {
        throw new TypeError("Duplicated element (" + element.key + ")");
      }
      keys.push(element.key);
    },
    decorateElement: function decorateElement(element, placements) {
      var extras = [];
      var finishers = [];
      for (var decorators = element.decorators, i2 = decorators.length - 1; i2 >= 0; i2--) {
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = this.fromElementDescriptor(element);
        var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i2])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        this.addElementPlacement(element, placements);
        if (elementFinisherExtras.finisher) {
          finishers.push(elementFinisherExtras.finisher);
        }
        var newExtras = elementFinisherExtras.extras;
        if (newExtras) {
          for (var j = 0; j < newExtras.length; j++) {
            this.addElementPlacement(newExtras[j], placements);
          }
          extras.push.apply(extras, newExtras);
        }
      }
      return {
        element,
        finishers,
        extras
      };
    },
    decorateConstructor: function decorateConstructor(elements, decorators) {
      var finishers = [];
      for (var i2 = decorators.length - 1; i2 >= 0; i2--) {
        var obj = this.fromClassDescriptor(elements);
        var elementsAndFinisher = this.toClassDescriptor((0, decorators[i2])(obj) || obj);
        if (elementsAndFinisher.finisher !== void 0) {
          finishers.push(elementsAndFinisher.finisher);
        }
        if (elementsAndFinisher.elements !== void 0) {
          elements = elementsAndFinisher.elements;
          for (var j = 0; j < elements.length - 1; j++) {
            for (var k2 = j + 1; k2 < elements.length; k2++) {
              if (elements[j].key === elements[k2].key && elements[j].placement === elements[k2].placement) {
                throw new TypeError("Duplicated element (" + elements[j].key + ")");
              }
            }
          }
        }
      }
      return {
        elements,
        finishers
      };
    },
    fromElementDescriptor: function fromElementDescriptor(element) {
      var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      if (element.kind === "field")
        obj.initializer = element.initializer;
      return obj;
    },
    toElementDescriptors: function toElementDescriptors(elementObjects) {
      if (elementObjects === void 0)
        return;
      return _toArray(elementObjects).map(function(elementObject) {
        var element = this.toElementDescriptor(elementObject);
        this.disallowProperty(elementObject, "finisher", "An element descriptor");
        this.disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
      }, this);
    },
    toElementDescriptor: function toElementDescriptor(elementObject) {
      var kind = String(elementObject.kind);
      if (kind !== "method" && kind !== "field") {
        throw new TypeError(`An element descriptor's .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "` + kind + '"');
      }
      var key = _toPropertyKey(elementObject.key);
      var placement = String(elementObject.placement);
      if (placement !== "static" && placement !== "prototype" && placement !== "own") {
        throw new TypeError(`An element descriptor's .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "` + placement + '"');
      }
      var descriptor = elementObject.descriptor;
      this.disallowProperty(elementObject, "elements", "An element descriptor");
      var element = {
        kind,
        key,
        placement,
        descriptor: Object.assign({}, descriptor)
      };
      if (kind !== "field") {
        this.disallowProperty(elementObject, "initializer", "A method descriptor");
      } else {
        this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
      }
      return element;
    },
    toElementFinisherExtras: function toElementFinisherExtras(elementObject) {
      var element = this.toElementDescriptor(elementObject);
      var finisher = _optionalCallableProperty(elementObject, "finisher");
      var extras = this.toElementDescriptors(elementObject.extras);
      return {
        element,
        finisher,
        extras
      };
    },
    fromClassDescriptor: function fromClassDescriptor(elements) {
      var obj = {
        kind: "class",
        elements: elements.map(this.fromElementDescriptor, this)
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      return obj;
    },
    toClassDescriptor: function toClassDescriptor(obj) {
      var kind = String(obj.kind);
      if (kind !== "class") {
        throw new TypeError(`A class descriptor's .kind property must be "class", but a decorator created a class descriptor with .kind "` + kind + '"');
      }
      this.disallowProperty(obj, "key", "A class descriptor");
      this.disallowProperty(obj, "placement", "A class descriptor");
      this.disallowProperty(obj, "descriptor", "A class descriptor");
      this.disallowProperty(obj, "initializer", "A class descriptor");
      this.disallowProperty(obj, "extras", "A class descriptor");
      var finisher = _optionalCallableProperty(obj, "finisher");
      var elements = this.toElementDescriptors(obj.elements);
      return {
        elements,
        finisher
      };
    },
    runClassFinishers: function runClassFinishers(constructor, finishers) {
      for (var i2 = 0; i2 < finishers.length; i2++) {
        var newConstructor = (0, finishers[i2])(constructor);
        if (newConstructor !== void 0) {
          if (typeof newConstructor !== "function") {
            throw new TypeError("Finishers must return a constructor.");
          }
          constructor = newConstructor;
        }
      }
      return constructor;
    },
    disallowProperty: function disallowProperty(obj, name, objectType) {
      if (obj[name] !== void 0) {
        throw new TypeError(objectType + " can't have a ." + name + " property.");
      }
    }
  };
  return api;
}
function _createElementDescriptor(def) {
  var key = _toPropertyKey(def.key);
  var descriptor;
  if (def.kind === "method") {
    descriptor = {
      value: def.value,
      writable: true,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "get") {
    descriptor = {
      get: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "set") {
    descriptor = {
      set: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "field") {
    descriptor = {
      configurable: true,
      writable: true,
      enumerable: true
    };
  }
  var element = {
    kind: def.kind === "field" ? "field" : "method",
    key,
    placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype",
    descriptor
  };
  if (def.decorators)
    element.decorators = def.decorators;
  if (def.kind === "field")
    element.initializer = def.value;
  return element;
}
function _coalesceGetterSetter(element, other) {
  if (element.descriptor.get !== void 0) {
    other.descriptor.get = element.descriptor.get;
  } else {
    other.descriptor.set = element.descriptor.set;
  }
}
function _coalesceClassElements(elements) {
  var newElements = [];
  var isSameElement = function isSameElement2(other2) {
    return other2.kind === "method" && other2.key === element.key && other2.placement === element.placement;
  };
  for (var i2 = 0; i2 < elements.length; i2++) {
    var element = elements[i2];
    var other;
    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
        if (_hasDecorators(element) || _hasDecorators(other)) {
          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
        }
        other.descriptor = element.descriptor;
      } else {
        if (_hasDecorators(element)) {
          if (_hasDecorators(other)) {
            throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + element.key + ").");
          }
          other.decorators = element.decorators;
        }
        _coalesceGetterSetter(element, other);
      }
    } else {
      newElements.push(element);
    }
  }
  return newElements;
}
function _hasDecorators(element) {
  return element.decorators && element.decorators.length;
}
function _isDataDescriptor(desc) {
  return desc !== void 0 && !(desc.value === void 0 && desc.writable === void 0);
}
function _optionalCallableProperty(obj, name) {
  var value = obj[name];
  if (value !== void 0 && typeof value !== "function") {
    throw new TypeError("Expected '" + name + "' to be a function");
  }
  return value;
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
function _superPropBase(object, property2) {
  while (!Object.prototype.hasOwnProperty.call(object, property2)) {
    object = _getPrototypeOf(object);
    if (object === null)
      break;
  }
  return object;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get2(target, property2, receiver) {
      var base = _superPropBase(target, property2);
      if (!base)
        return;
      var desc = Object.getOwnPropertyDescriptor(base, property2);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const previousValues = /* @__PURE__ */ new WeakMap();
const ifDefined = directive((value) => (part) => {
  const previousValue = previousValues.get(part);
  if (value === void 0 && part instanceof AttributePart) {
    if (previousValue !== void 0 || !previousValues.has(part)) {
      const name = part.committer.name;
      part.committer.element.removeAttribute(name);
    }
  } else if (value !== previousValue) {
    part.setValue(value);
  }
  previousValues.set(part, value);
});
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class ClassList {
  constructor(element) {
    this.classes = /* @__PURE__ */ new Set();
    this.changed = false;
    this.element = element;
    const classList = (element.getAttribute("class") || "").split(/\s+/);
    for (const cls of classList) {
      this.classes.add(cls);
    }
  }
  add(cls) {
    this.classes.add(cls);
    this.changed = true;
  }
  remove(cls) {
    this.classes.delete(cls);
    this.changed = true;
  }
  commit() {
    if (this.changed) {
      let classString = "";
      this.classes.forEach((cls) => classString += cls + " ");
      this.element.setAttribute("class", classString);
    }
  }
}
const previousClassesCache = /* @__PURE__ */ new WeakMap();
const classMap = directive((classInfo) => (part) => {
  if (!(part instanceof AttributePart) || part instanceof PropertyPart || part.committer.name !== "class" || part.committer.parts.length > 1) {
    throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");
  }
  const { committer } = part;
  const { element } = committer;
  let previousClasses = previousClassesCache.get(part);
  if (previousClasses === void 0) {
    element.setAttribute("class", committer.strings.join(" "));
    previousClassesCache.set(part, previousClasses = /* @__PURE__ */ new Set());
  }
  const classList = element.classList || new ClassList(element);
  previousClasses.forEach((name) => {
    if (!(name in classInfo)) {
      classList.remove(name);
      previousClasses.delete(name);
    }
  });
  for (const name in classInfo) {
    const value = classInfo[name];
    if (value != previousClasses.has(name)) {
      if (value) {
        classList.add(name);
        previousClasses.add(name);
      } else {
        classList.remove(name);
        previousClasses.delete(name);
      }
    }
  }
  if (typeof classList.commit === "function") {
    classList.commit();
  }
});
var settings = {
  prefix: "bx",
  selectorTabbable: "\n    a[href], area[href], input:not([disabled]):not([tabindex='-1']),\n    button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),\n    textarea:not([disabled]):not([tabindex='-1']),\n    iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]\n  ",
  selectorFocusable: "\n    a[href], area[href], input:not([disabled]),\n    button:not([disabled]),select:not([disabled]),\n    textarea:not([disabled]),\n    iframe, object, embed, *[tabindex], *[contenteditable=true]\n  "
};
var settings_1 = settings;
/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const attributesMapCache = /* @__PURE__ */ new WeakMap();
const spread = directive((attributesInfo) => (part) => {
  if (!(part instanceof PropertyPart) || part.committer.name !== ".." || part.committer.parts.length > 1) {
    throw new Error("The `spread` directive must be used in with `...` name and must be the only part in the attribute.");
  }
  const {
    committer
  } = part;
  const {
    element
  } = committer;
  const oldAttributesInfo = attributesMapCache.get(part);
  if (oldAttributesInfo) {
    Object.keys(oldAttributesInfo).forEach((name) => {
      if (!(name in attributesInfo)) {
        element.removeAttribute(name);
      }
    });
  }
  Object.keys(attributesInfo).forEach((name) => {
    const value = attributesInfo[name];
    if ((!oldAttributesInfo || !Object.is(value, oldAttributesInfo[name])) && typeof value !== "undefined") {
      element.setAttribute(name, value);
    }
  });
  attributesMapCache.set(part, attributesInfo);
});
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const svgResultCarbonIcon$3 = ({ children, ...attrs } = {}) => svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread(attrs)}" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">${children}${children}${children}<path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path></svg>`;
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const svgResultCarbonIcon$2 = ({ children, ...attrs } = {}) => svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread(attrs)}" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">${children}${children}${children}<path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2	c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"></path><path d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8	c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z" data-icon-path="inner-path" opacity="0"></path></svg>`;
/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
let FORM_ELEMENT_COLOR_SCHEME;
(function(FORM_ELEMENT_COLOR_SCHEME2) {
  FORM_ELEMENT_COLOR_SCHEME2["REGULAR"] = "";
  FORM_ELEMENT_COLOR_SCHEME2["LIGHT"] = "light";
})(FORM_ELEMENT_COLOR_SCHEME || (FORM_ELEMENT_COLOR_SCHEME = {}));
/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ifNonNull = (value) => ifDefined(value !== null && value !== void 0 ? value : void 0);
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function on(element) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  element.addEventListener.apply(element, args);
  return {
    release: function release() {
      element.removeEventListener.apply(element, args);
      return null;
    }
  };
}
const FormMixin = (Base) => {
  class FormMixinImpl extends Base {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "_hFormdata", null);
    }
    connectedCallback() {
      super.connectedCallback();
      const form = this.closest("form");
      if (form) {
        this._hFormdata = on(form, "formdata", this._handleFormdata.bind(this));
      }
    }
    disconnectedCallback() {
      if (this._hFormdata) {
        this._hFormdata = this._hFormdata.release();
      }
      super.disconnectedCallback();
    }
  }
  return FormMixinImpl;
};
/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
let VALIDATION_STATUS;
(function(VALIDATION_STATUS2) {
  VALIDATION_STATUS2["NO_ERROR"] = "";
  VALIDATION_STATUS2["ERROR_REQUIRED"] = "required";
})(VALIDATION_STATUS || (VALIDATION_STATUS = {}));
const ValidityMixin = (Base) => {
  class ValidityMixinImpl extends Base {
    _getValidityMessage(state) {
      return {
        [VALIDATION_STATUS.NO_ERROR]: "",
        [VALIDATION_STATUS.ERROR_REQUIRED]: this.requiredValidityMessage
      }[state];
    }
    _testValidity() {
      const {
        required,
        value
      } = this;
      return required && !value ? VALIDATION_STATUS.ERROR_REQUIRED : VALIDATION_STATUS.NO_ERROR;
    }
    checkValidity() {
      const status = this._testValidity();
      if (status !== VALIDATION_STATUS.NO_ERROR) {
        if (this.dispatchEvent(new CustomEvent("invalid", {
          bubbles: false,
          cancelable: true,
          composed: false
        }))) {
          this.invalid = true;
          this.validityMessage = this._getValidityMessage(status);
        }
        return false;
      }
      this.invalid = false;
      this.validityMessage = "";
      return true;
    }
    setCustomValidity(validityMessage) {
      this.invalid = Boolean(validityMessage);
      this.validityMessage = validityMessage;
    }
  }
  return ValidityMixinImpl;
};
/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const filter = (a2, predicate, thisObject) => Array.prototype.filter.call(a2, predicate, thisObject);
const find = (a2, predicate, thisObject) => Array.prototype.find.call(a2, predicate, thisObject);
const forEach = (a2, predicate, thisObject) => Array.prototype.forEach.call(a2, predicate, thisObject);
const indexOf = (a2, item) => Array.prototype.indexOf.call(a2, item);
/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ifNonEmpty = (value) => ifDefined(value === "" ? void 0 : value !== null && value !== void 0 ? value : void 0);
/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
let INPUT_SIZE;
(function(INPUT_SIZE2) {
  INPUT_SIZE2["SMALL"] = "sm";
  INPUT_SIZE2["REGULAR"] = "lg";
  INPUT_SIZE2["LARGE"] = "lg";
  INPUT_SIZE2["EXTRA_LARGE"] = "xl";
})(INPUT_SIZE || (INPUT_SIZE = {}));
let INPUT_TYPE;
(function(INPUT_TYPE2) {
  INPUT_TYPE2["EMAIL"] = "email";
  INPUT_TYPE2["PASSWORD"] = "password";
  INPUT_TYPE2["TEL"] = "tel";
  INPUT_TYPE2["TEXT"] = "text";
  INPUT_TYPE2["URL"] = "url";
})(INPUT_TYPE || (INPUT_TYPE = {}));
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$7 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--assistive-text,.bx--visually-hidden{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--body{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);background-color:var(--cds-ui-background,#fff);color:var(--cds-text-01,#161616);line-height:1}.bx--body *,.bx--body ::after,.bx--body ::before{box-sizing:inherit}.bx--text-truncate--end{display:inline-block;overflow:hidden;width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--text-truncate--front{display:inline-block;overflow:hidden;width:100%;direction:rtl;text-overflow:ellipsis;white-space:nowrap}.bx--fieldset{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;margin-bottom:2rem}.bx--fieldset *,.bx--fieldset ::after,.bx--fieldset ::before{box-sizing:inherit}.bx--fieldset--no-margin{margin-bottom:0}.bx--form-item{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:flex;flex:1 1 auto;flex-direction:column;align-items:flex-start}.bx--label{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px);display:inline-block;margin-bottom:.5rem;color:var(--cds-text-02,#525252);font-weight:400;line-height:1rem;vertical-align:baseline}.bx--label *,.bx--label ::after,.bx--label ::before{box-sizing:inherit}.bx--label .bx--tooltip__trigger{font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px)}.bx--label.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:4.6875rem;height:.875rem}.bx--label.bx--skeleton:active,.bx--label.bx--skeleton:focus,.bx--label.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--label.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--label.bx--skeleton::before{-webkit-animation:none;animation:none}}input[type=number]{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px}@media screen and (prefers-contrast){.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline-style:dotted}}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper--warn~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box--warning~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--number__input-wrapper--warning~.bx--form-requirement,.bx--select--warning .bx--select-input__wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper--warning>.bx--text-input~.bx--form-requirement,.bx--text-input__field-wrapper--warning~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{display:block;overflow:visible;max-height:12.5rem;font-weight:400}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{color:var(--cds-text-error,#da1e28)}.bx--form--fluid .bx--text-input__field-wrapper--warning,.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]{display:block}.bx--form--fluid .bx--fieldset{margin:0}.bx--form--fluid input[data-invalid]{outline:0}.bx--form--fluid .bx--form-requirement{padding:.5rem 2.5rem .5rem 1rem;margin:0}input:not(output):not([data-invalid]):-moz-ui-invalid{box-shadow:none}.bx--form-requirement{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-caption-01-font-size,.75rem);font-weight:var(--cds-caption-01-font-weight,400);line-height:var(--cds-caption-01-line-height,1.33333);letter-spacing:var(--cds-caption-01-letter-spacing,.32px);display:none;overflow:hidden;max-height:0;margin:.25rem 0 0}.bx--form-requirement *,.bx--form-requirement ::after,.bx--form-requirement ::before{box-sizing:inherit}.bx--select--inline .bx--form__helper-text{margin-top:0}.bx--form__helper-text{font-size:var(--cds-helper-text-01-font-size,.75rem);line-height:var(--cds-helper-text-01-line-height,1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing,.32px);z-index:0;width:100%;margin-top:.25rem;color:var(--cds-text-02,#525252);opacity:1}.bx--form__helper-text--disabled,.bx--label--disabled{color:var(--cds-disabled-02,#c6c6c6)}fieldset[disabled] .bx--form__helper-text,fieldset[disabled] .bx--label{color:var(--cds-disabled-02,#c6c6c6)}.bx--text-input{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);outline:2px solid transparent;outline-offset:-2px;width:100%;height:2.5rem;padding:0 1rem;border:none;border-bottom:1px solid var(--cds-ui-04,#8d8d8d);background-color:var(--cds-field-01,#f4f4f4);color:var(--cds-text-01,#161616);transition:background-color 70ms cubic-bezier(.2,0,.38,.9),outline 70ms cubic-bezier(.2,0,.38,.9)}.bx--text-input *,.bx--text-input ::after,.bx--text-input ::before{box-sizing:inherit}.bx--text-input:active,.bx--text-input:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--text-input:active,.bx--text-input:focus{outline-style:dotted}}.bx--text-input-wrapper svg[hidden]{display:none}.bx--text-input--lg,.bx--text-input--xl{height:3rem}.bx--text-input--sm{height:2rem}.bx--password-input{padding-right:2.5rem}.bx--text-input--sm.bx--password-input{padding-right:2rem}.bx--text-input--lg.bx--password-input{padding-right:3rem}.bx--text-input::-webkit-input-placeholder{color:var(--cds-text-05,#6f6f6f);opacity:1}.bx--text-input::-moz-placeholder{color:var(--cds-text-05,#6f6f6f);opacity:1}.bx--text-input:-ms-input-placeholder{color:var(--cds-text-05,#6f6f6f);opacity:1}.bx--text-input::-ms-input-placeholder{color:var(--cds-text-05,#6f6f6f);opacity:1}.bx--text-input::placeholder{color:var(--cds-text-05,#6f6f6f);opacity:1}.bx--text-input--light{background-color:var(--cds-field-02,#fff)}.bx--text-input__field-wrapper{position:relative;display:flex;width:100%}.bx--text-input__invalid-icon,.bx--text-input__readonly-icon{position:absolute;top:50%;right:1rem;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.bx--text-input__invalid-icon{fill:var(--cds-support-01,#da1e28)}.bx--text-input__invalid-icon--warning{fill:var(--cds-support-03,#f1c21b)}.bx--text-input__invalid-icon--warning path:first-of-type{fill:#000;opacity:1}.bx--text-input--password__visibility{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--text-input--password__visibility:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--text-input--password__visibility:focus{outline-style:dotted}}.bx--text-input--password__visibility:focus{outline:1px solid transparent}.bx--text-input--password__visibility:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--text-input--password__visibility:focus svg{outline-style:dotted}}.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after,.bx--text-input--password__visibility::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after,.bx--text-input--password__visibility::before{display:inline-block}}.bx--text-input--password__visibility::after,.bx--text-input--password__visibility::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--text-input--password__visibility.bx--tooltip--a11y::after,.bx--text-input--password__visibility.bx--tooltip--a11y::before{transition:none}.bx--text-input--password__visibility::before{width:0;height:0;border-style:solid;content:""}.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{width:auto}}@supports (-ms-accelerator:true){.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{width:auto}}@supports (-ms-ime-align:auto){.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{border:1px solid transparent}}.bx--text-input--password__visibility::after{content:attr(aria-label)}.bx--text-input--password__visibility.bx--tooltip--a11y::after{content:none}.bx--text-input--password__visibility.bx--tooltip--visible::after,.bx--text-input--password__visibility.bx--tooltip--visible::before,.bx--text-input--password__visibility:focus::after,.bx--text-input--password__visibility:focus::before,.bx--text-input--password__visibility:hover::after,.bx--text-input--password__visibility:hover::before{opacity:1}@-webkit-keyframes tooltip-fade{from{opacity:0}to{opacity:1}}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--text-input--password__visibility.bx--tooltip--visible .bx--assistive-text,.bx--text-input--password__visibility.bx--tooltip--visible+.bx--assistive-text,.bx--text-input--password__visibility:focus .bx--assistive-text,.bx--text-input--password__visibility:focus+.bx--assistive-text,.bx--text-input--password__visibility:hover .bx--assistive-text,.bx--text-input--password__visibility:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--text-input--password__visibility.bx--tooltip--visible .bx--assistive-text,.bx--text-input--password__visibility.bx--tooltip--visible+.bx--assistive-text,.bx--text-input--password__visibility.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--text-input--password__visibility:focus .bx--assistive-text,.bx--text-input--password__visibility:focus+.bx--assistive-text,.bx--text-input--password__visibility:focus.bx--tooltip--a11y::before,.bx--text-input--password__visibility:hover .bx--assistive-text,.bx--text-input--password__visibility:hover+.bx--assistive-text,.bx--text-input--password__visibility:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--text-input--password__visibility.bx--tooltip--hidden .bx--assistive-text,.bx--text-input--password__visibility.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--text-input--password__visibility.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--text-input--password__visibility .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after,.bx--text-input--password__visibility::before{bottom:0;left:50%}.bx--text-input--password__visibility::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger,.bx--text-input--password__visibility{outline:2px solid transparent;outline-offset:-2px;position:absolute;right:0;display:flex;width:2.5rem;height:100%;min-height:auto;align-items:center;justify-content:center;padding:0;border:0;background:0 0;cursor:pointer;transition:outline 70ms cubic-bezier(.2,0,.38,.9)}.bx--text-input--sm+.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger{width:2rem}.bx--text-input--lg+.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger{width:3rem}.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger svg{fill:var(--cds-icon-secondary,#525252);transition:fill 70ms cubic-bezier(.2,0,.38,.9)}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger svg{fill:ButtonText}}.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger:focus{outline-style:dotted}}.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger:focus svg,.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger:hover svg{fill:var(--cds-icon-primary,#161616)}.bx--text-input--invalid,.bx--text-input--warning,.bx--text-input-wrapper--readonly .bx--text-input{padding-right:2.5rem}.bx--text-input--invalid.bx--password-input{padding-right:4rem}.bx--text-input--invalid+.bx--text-input--password__visibility,.bx--text-input--invalid+.bx--text-input--password__visibility__toggle{right:1rem}.bx--password-input-wrapper .bx--text-input__invalid-icon{right:2.5rem}.bx--text-input:disabled+.bx--text-input--password__visibility svg,.bx--text-input:disabled+.bx--text-input--password__visibility__toggle.bx--tooltip__trigger svg{cursor:not-allowed;fill:var(--cds-disabled-02,#c6c6c6)}.bx--text-input:disabled+.bx--text-input--password__visibility svg:hover,.bx--text-input:disabled+.bx--text-input--password__visibility__toggle.bx--tooltip__trigger svg:hover{fill:var(--cds-disabled-02,#c6c6c6)}.bx--text-input:disabled{outline:2px solid transparent;outline-offset:-2px;border-bottom:1px solid transparent;background-color:var(--cds-field,#f4f4f4);color:var(--cds-text-disabled,#c6c6c6);cursor:not-allowed;-webkit-text-fill-color:var(--cds-disabled-02,#c6c6c6)}.bx--text-input--light:disabled{background-color:var(--cds-field-02,#fff)}.bx--text-input:disabled::-webkit-input-placeholder{color:var(--cds-disabled-02,#c6c6c6);opacity:1}.bx--text-input:disabled::-moz-placeholder{color:var(--cds-disabled-02,#c6c6c6);opacity:1}.bx--text-input:disabled:-ms-input-placeholder{color:var(--cds-disabled-02,#c6c6c6);opacity:1}.bx--text-input:disabled::-ms-input-placeholder{color:var(--cds-disabled-02,#c6c6c6);opacity:1}.bx--text-input:disabled::placeholder{color:var(--cds-disabled-02,#c6c6c6);opacity:1}.bx--text-input--invalid{outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px;box-shadow:none}@media screen and (prefers-contrast){.bx--text-input--invalid{outline-style:dotted}}.bx--text-input--invalid .bx--text-input--password__visibility,.bx--text-input--invalid .bx--text-input--password__visibility__toggle{right:2.5rem}.bx--skeleton.bx--text-input{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none}.bx--skeleton.bx--text-input:active,.bx--skeleton.bx--text-input:focus,.bx--skeleton.bx--text-input:hover{border:none;cursor:default;outline:0}.bx--skeleton.bx--text-input::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--skeleton.bx--text-input::before{-webkit-animation:none;animation:none}}.bx--form--fluid .bx--text-input-wrapper{position:relative;background:var(--cds-field-01,#f4f4f4);transition:background-color 70ms cubic-bezier(.2,0,.38,.9),outline 70ms cubic-bezier(.2,0,.38,.9)}.bx--form--fluid .bx--label{position:absolute;z-index:1;top:.8125rem;left:1rem;margin:0}.bx--form--fluid .bx--form__helper-text{display:none}.bx--form--fluid .bx--text-input{min-height:4rem;padding:2rem 1rem .8125rem}.bx--form--fluid .bx--text-input__divider,.bx--text-input__divider{display:none}.bx--form--fluid .bx--text-input--invalid,.bx--form--fluid .bx--text-input--warn{border-bottom:none}.bx--form--fluid .bx--text-input--invalid+.bx--text-input__divider,.bx--form--fluid .bx--text-input--warn+.bx--text-input__divider{display:block;border-style:solid;border-color:var(--cds-ui-03,#e0e0e0);border-bottom:none;margin:0 1rem}.bx--form--fluid .bx--text-input__invalid-icon{top:5rem}.bx--form--fluid .bx--text-input-wrapper--light{background:var(--cds-field-02,#fff)}.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid{outline:2px solid transparent;outline-offset:-2px}.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]:not(:focus){outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px}@media screen and (prefers-contrast){.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]:not(:focus){outline-style:dotted}}.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:focus{outline-style:dotted}}.bx--text-input-wrapper.bx--text-input-wrapper--inline{flex-flow:row wrap}.bx--text-input-wrapper .bx--label--inline{flex:1;margin:.8125rem 0 0 0;overflow-wrap:break-word;word-break:break-word}.bx--text-input-wrapper .bx--label--inline--sm{margin-top:.5625rem}.bx--text-input-wrapper .bx--label--inline--lg,.bx--text-input-wrapper .bx--label--inline--xl{margin-top:1.0625rem}.bx--text-input__label-helper-wrapper{max-width:8rem;flex:2;flex-direction:column;margin-right:1.5rem;overflow-wrap:break-word}.bx--text-input-wrapper .bx--form__helper-text--inline{margin-top:.125rem}.bx--text-input__field-outer-wrapper{display:flex;width:100%;flex:1 1 auto;flex-direction:column;align-items:flex-start}.bx--text-input__field-outer-wrapper--inline{flex:8;flex-direction:column}.bx--form--fluid .bx--text-input-wrapper--readonly,.bx--text-input-wrapper--readonly .bx--text-input{background:0 0}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn.bx--btn--icon-only.bx--text-input--password__visibility__toggle.bx--tooltip__trigger svg,.bx--btn.bx--btn--icon-only.bx--text-input--password__visibility__toggle.bx--tooltip__trigger:hover svg,.bx--text-input--password__visibility{fill:ButtonText}}:host(bx-input){width:100%;outline:0}`
]);
let _$9 = (t2) => t2, _t$a;
const {
  prefix: prefix$e
} = settings_1;
_decorate([customElement(`${prefix$e}-input`)], function(_initialize, _ValidityMixin) {
  class BXInput extends _ValidityMixin {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXInput,
    d: [{
      kind: "field",
      decorators: [query("input")],
      key: "_input",
      value: void 0
    }, {
      kind: "field",
      key: "_value",
      value() {
        return "";
      }
    }, {
      kind: "method",
      key: "_handleInput",
      value: function _handleInput({
        target
      }) {
        this.value = target.value;
      }
    }, {
      kind: "method",
      key: "_handleFormdata",
      value: function _handleFormdata(event) {
        const {
          formData
        } = event;
        const {
          disabled,
          name,
          value
        } = this;
        if (!disabled) {
          formData.append(name, value);
        }
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "autocomplete",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean
      })],
      key: "autofocus",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "color-scheme",
        reflect: true
      })],
      key: "colorScheme",
      value() {
        return FORM_ELEMENT_COLOR_SCHEME.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "disabled",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "helper-text"
      })],
      key: "helperText",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "invalid",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "label-text"
      })],
      key: "labelText",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "name",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "pattern",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "placeholder",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "readonly",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "required",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "required-validity-message"
      })],
      key: "requiredValidityMessage",
      value() {
        return "Please fill out this field.";
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "size",
      value() {
        return INPUT_SIZE.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "type",
      value() {
        return INPUT_TYPE.TEXT;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "validity-message"
      })],
      key: "validityMessage",
      value() {
        return "";
      }
    }, {
      kind: "get",
      decorators: [property({
        reflect: true
      })],
      key: "value",
      value: function value() {
        if (this._input) {
          return this._input.value;
        }
        return this._value;
      }
    }, {
      kind: "set",
      key: "value",
      value: function value(_value) {
        const oldValue = this._value;
        this._value = _value;
        this.requestUpdate("value", oldValue);
        if (this._input) {
          this._input.value = _value;
        }
      }
    }, {
      kind: "method",
      key: "createRenderRoot",
      value: function createRenderRoot() {
        var _$exec;
        return this.attachShadow({
          mode: "open",
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ["", 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render2() {
        const {
          _handleInput: handleInput
        } = this;
        const invalidIcon = svgResultCarbonIcon$2({
          class: `${prefix$e}--text-input__invalid-icon`
        });
        const inputClasses = classMap({
          [`${prefix$e}--text-input`]: true,
          [`${prefix$e}--text-input--${this.colorScheme}`]: this.colorScheme,
          [`${prefix$e}--text-input--invalid`]: this.invalid,
          [`${prefix$e}--text-input--${this.size}`]: this.size
        });
        const labelClasses = classMap({
          [`${prefix$e}--label`]: true,
          [`${prefix$e}--label--disabled`]: this.disabled
        });
        const helperTextClasses = classMap({
          [`${prefix$e}--form__helper-text`]: true,
          [`${prefix$e}--form__helper-text--disabled`]: this.disabled
        });
        return html(_t$a || (_t$a = _$9` <label class="${0}" for="input"> <slot name="label-text"> ${0} </slot> </label> <div class="${0}--text-input__field-wrapper" ?data-invalid="${0}"> ${0} <input ?autocomplete="${0}" ?autofocus="${0}" class="${0}" ?data-invalid="${0}" ?disabled="${0}" id="input" name="${0}" pattern="${0}" placeholder="${0}" ?readonly="${0}" ?required="${0}" type="${0}" .value="${0}" @input="${0}"> </div> <div class="${0}"> <slot name="helper-text"> ${0} </slot> </div> <div class="${0}--form-requirement"> <slot name="validity-message"> ${0} </slot> </div> `), labelClasses, this.labelText, prefix$e, this.invalid, this.invalid ? invalidIcon : null, this.autocomplete, this.autofocus, inputClasses, this.invalid, this.disabled, ifNonEmpty(this.name), ifNonEmpty(this.pattern), ifNonEmpty(this.placeholder), this.readonly, this.required, ifNonEmpty(this.type), this._value, handleInput, helperTextClasses, this.helperText, prefix$e, this.validityMessage);
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$7;
      }
    }]
  };
}, ValidityMixin(FormMixin(LitElement)));
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$6 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--fieldset{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;margin-bottom:2rem}.bx--fieldset *,.bx--fieldset ::after,.bx--fieldset ::before{box-sizing:inherit}.bx--fieldset--no-margin{margin-bottom:0}.bx--form-item{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:flex;flex:1 1 auto;flex-direction:column;align-items:flex-start}.bx--label{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px);display:inline-block;margin-bottom:.5rem;color:var(--cds-text-02,#525252);font-weight:400;line-height:1rem;vertical-align:baseline}.bx--label *,.bx--label ::after,.bx--label ::before{box-sizing:inherit}.bx--label .bx--tooltip__trigger{font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px)}.bx--label.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:4.6875rem;height:.875rem}.bx--label.bx--skeleton:active,.bx--label.bx--skeleton:focus,.bx--label.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--label.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--label.bx--skeleton::before{-webkit-animation:none;animation:none}}input[type=number]{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px}@media screen and (prefers-contrast){.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline-style:dotted}}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper--warn~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box--warning~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--number__input-wrapper--warning~.bx--form-requirement,.bx--select--warning .bx--select-input__wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper--warning>.bx--text-input~.bx--form-requirement,.bx--text-input__field-wrapper--warning~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{display:block;overflow:visible;max-height:12.5rem;font-weight:400}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{color:var(--cds-text-error,#da1e28)}.bx--form--fluid .bx--text-input__field-wrapper--warning,.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]{display:block}.bx--form--fluid .bx--fieldset{margin:0}.bx--form--fluid input[data-invalid]{outline:0}.bx--form--fluid .bx--form-requirement{padding:.5rem 2.5rem .5rem 1rem;margin:0}input:not(output):not([data-invalid]):-moz-ui-invalid{box-shadow:none}.bx--form-requirement{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-caption-01-font-size,.75rem);font-weight:var(--cds-caption-01-font-weight,400);line-height:var(--cds-caption-01-line-height,1.33333);letter-spacing:var(--cds-caption-01-letter-spacing,.32px);display:none;overflow:hidden;max-height:0;margin:.25rem 0 0}.bx--form-requirement *,.bx--form-requirement ::after,.bx--form-requirement ::before{box-sizing:inherit}.bx--select--inline .bx--form__helper-text{margin-top:0}.bx--form__helper-text{font-size:var(--cds-helper-text-01-font-size,.75rem);line-height:var(--cds-helper-text-01-line-height,1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing,.32px);z-index:0;width:100%;margin-top:.25rem;color:var(--cds-text-02,#525252);opacity:1}.bx--form__helper-text--disabled,.bx--label--disabled{color:var(--cds-disabled-02,#c6c6c6)}fieldset[disabled] .bx--form__helper-text,fieldset[disabled] .bx--label{color:var(--cds-disabled-02,#c6c6c6)}.bx--select,:host(bx-select){box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;position:relative;display:flex;width:100%;flex-direction:column;align-items:flex-start}.bx--select *,.bx--select ::after,.bx--select ::before,:host(bx-select) *,:host(bx-select) ::after,:host(bx-select) ::before{box-sizing:inherit}.bx--select-input__wrapper{position:relative;display:flex;width:100%;align-items:center}.bx--select-input{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);outline:2px solid transparent;outline-offset:-2px;display:block;width:100%;height:2.5rem;padding:0 var(--cds-spacing-09,3rem) 0 var(--cds-spacing-05,1rem);border:none;border-bottom:1px solid var(--cds-ui-04,#8d8d8d);-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--cds-field-01,#f4f4f4);border-radius:0;color:var(--cds-text-01,#161616);cursor:pointer;opacity:1;transition:outline 70ms cubic-bezier(.2,0,.38,.9)}.bx--select-input:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--select-input::-ms-expand{display:none}@-moz-document url-prefix(){.bx--select-input:-moz-focusring,.bx--select-input::-moz-focus-inner{background-image:none;color:transparent;text-shadow:0 0 0 #000}}.bx--select-input:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px;color:var(--cds-text-01,#161616)}@media screen and (prefers-contrast){.bx--select-input:focus{outline-style:dotted}}.bx--select-input:disabled,.bx--select-input:hover:disabled{border-bottom-color:var(--cds-disabled-01,#f4f4f4);background-color:var(--cds-disabled-01,#f4f4f4);color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed}.bx--select-input--sm{height:2rem;max-height:2rem}.bx--select-input--lg,.bx--select-input--xl{height:3rem;max-height:3rem}.bx--select--disabled .bx--form__helper-text,.bx--select--disabled .bx--label,:host(bx-select)[disabled] .bx--form__helper-text,:host(bx-select)[disabled] .bx--label{color:var(--cds-disabled-02,#c6c6c6)}.bx--select--warning .bx--select-input,.bx--select-input__wrapper[data-invalid] .bx--select-input{padding-right:4.5rem}.bx--select-input:disabled~.bx--select__arrow{fill:var(--cds-disabled-02,#c6c6c6)}.bx--select--light .bx--select-input,:host(bx-select)[color-scheme=light] .bx--select-input{background-color:var(--cds-field-02,#fff)}.bx--select--light .bx--select-input:hover,:host(bx-select)[color-scheme=light] .bx--select-input:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--select--light .bx--select-input:disabled,.bx--select--light .bx--select-input:hover:disabled,:host(bx-select)[color-scheme=light] .bx--select-input:disabled{background-color:var(--cds-field-02,#fff);color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed}.bx--select__arrow{position:absolute;top:0;right:var(--cds-spacing-05,1rem);height:100%;fill:var(--cds-ui-05,#161616);pointer-events:none}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--select__arrow path{fill:ButtonText}}.bx--select__invalid-icon{position:absolute;right:var(--cds-spacing-08,2.5rem)}.bx--select-input__wrapper[data-invalid] .bx--select-input~.bx--select__invalid-icon{fill:var(--cds-support-01,#da1e28)}.bx--select__invalid-icon--warning{fill:var(--cds-support-03,#f1c21b)}.bx--select__invalid-icon--warning path[fill]{fill:#000;opacity:1}.bx--select-option,optgroup.bx--select-optgroup{background-color:var(--cds-background-hover,#e5e5e5);color:var(--cds-text-01,#161616)}.bx--select-option:disabled,optgroup.bx--select-optgroup:disabled{color:var(--cds-text-disabled,#c6c6c6)}.bx--select--inline{display:flex;flex-direction:row;align-items:center}.bx--select--inline.bx--select--invalid .bx--form__helper-text,.bx--select--inline.bx--select--invalid .bx--label,.bx--select--inline[invalid]:host(bx-select) .bx--form__helper-text,.bx--select--inline[invalid]:host(bx-select) .bx--label{align-self:flex-start;margin-top:.8125rem}.bx--select--inline .bx--form__helper-text{margin-bottom:0;margin-left:var(--cds-spacing-03,.5rem)}.bx--select--inline .bx--label{margin:0 .5rem 0 0;white-space:nowrap}.bx--select--inline .bx--select-input{width:auto;padding-right:var(--cds-spacing-07,2rem);padding-left:.5rem;border-bottom:none;background-color:var(--cds-background,#fff);color:var(--cds-text-01,#161616)}.bx--select--inline .bx--select-input[disabled],.bx--select--inline .bx--select-input[disabled]:hover{background-color:var(--cds-disabled-01,#f4f4f4)}.bx--select--inline .bx--select__arrow{right:.5rem}.bx--select--inline.bx--select--invalid .bx--select-input,.bx--select--inline[invalid]:host(bx-select) .bx--select-input{padding-right:3.5rem}.bx--select--inline.bx--select--invalid .bx--select-input~.bx--select__invalid-icon,.bx--select--inline[invalid]:host(bx-select) .bx--select-input~.bx--select__invalid-icon{right:var(--cds-spacing-07,2rem)}.bx--select--inline .bx--select-input:disabled{color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed}.bx--select--inline .bx--select-input:disabled~*{cursor:not-allowed}.bx--select.bx--skeleton,.bx--skeleton:host(bx-select){position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:100%;height:2.5rem}.bx--select.bx--skeleton:active,.bx--select.bx--skeleton:focus,.bx--select.bx--skeleton:hover,.bx--skeleton:active:host(bx-select),.bx--skeleton:focus:host(bx-select),.bx--skeleton:hover:host(bx-select){border:none;cursor:default;outline:0}.bx--select.bx--skeleton::before,.bx--skeleton:host(bx-select)::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--select.bx--skeleton::before,.bx--skeleton:host(bx-select)::before{-webkit-animation:none;animation:none}}.bx--select.bx--skeleton .bx--select-input,.bx--skeleton:host(bx-select) .bx--select-input{display:none}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--select__arrow{fill:ButtonText}}:host(bx-select){outline:0}`
]);
let _$8 = (t2) => t2, _t$9, _t2$4, _t3$3, _t4$1, _t5$1, _t6, _t7;
const {
  prefix: prefix$d
} = settings_1;
let BXSelect = _decorate([customElement(`${prefix$d}-select`)], function(_initialize, _ValidityMixin) {
  class BXSelect2 extends _ValidityMixin {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXSelect2,
    d: [{
      kind: "field",
      key: "_observerMutation",
      value() {
        return null;
      }
    }, {
      kind: "field",
      key: "_placeholderItemValue",
      value() {
        return `__${prefix$d}-select-placeholder_${Math.random().toString(36).slice(2)}`;
      }
    }, {
      kind: "field",
      decorators: [query("select")],
      key: "_selectNode",
      value: void 0
    }, {
      kind: "method",
      key: "_handleInput",
      value: function _handleInput({
        target
      }) {
        const {
          value
        } = target;
        this.value = value;
        const {
          eventSelect
        } = this.constructor;
        this.dispatchEvent(new CustomEvent(eventSelect, {
          bubbles: true,
          composed: true,
          detail: {
            value
          }
        }));
      }
    }, {
      kind: "field",
      key: "_handleMutation",
      value() {
        return () => {
          this.requestUpdate();
        };
      }
    }, {
      kind: "method",
      key: "_renderItems",
      value: function _renderItems(element) {
        const {
          selectorItem,
          selectorLeafItem
        } = this.constructor;
        return html(_t$9 || (_t$9 = _$8` ${0} `), filter(element.childNodes, (item) => item.nodeType === Node.ELEMENT_NODE && item.matches(selectorItem)).map((item) => {
          const disabled = item.hasAttribute("disabled");
          const label = item.getAttribute("label");
          const selected = item.hasAttribute("selected");
          const value = item.getAttribute("value");
          const {
            textContent
          } = item;
          return item.matches(selectorLeafItem) ? html(_t2$4 || (_t2$4 = _$8` <option class="${0}--select-option" ?disabled="${0}" label="${0}" ?selected="${0}" value="${0}"> ${0} </option> `), prefix$d, disabled, ifNonNull(label !== null && label !== void 0 ? label : textContent), selected, ifNonNull(value), textContent) : html(_t3$3 || (_t3$3 = _$8` <optgroup class="${0}--select-optgroup" ?disabled="${0}" label="${0}"> ${0} </optgroup> `), prefix$d, disabled, ifNonNull(label), this._renderItems(item));
        }));
      }
    }, {
      kind: "method",
      key: "_handleFormdata",
      value: function _handleFormdata(event) {
        const {
          formData
        } = event;
        const {
          disabled,
          name,
          value
        } = this;
        if (!disabled) {
          formData.append(name, value);
        }
      }
    }, {
      kind: "get",
      key: "length",
      value: function length() {
        return this._selectNode.length;
      }
    }, {
      kind: "get",
      key: "options",
      value: function options() {
        return this._selectNode.options;
      }
    }, {
      kind: "get",
      key: "type",
      value: function type() {
        return this._selectNode.type;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean
      })],
      key: "autofocus",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "color-scheme",
        reflect: true
      })],
      key: "colorScheme",
      value() {
        return FORM_ELEMENT_COLOR_SCHEME.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "disabled",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "helper-text"
      })],
      key: "helperText",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "id",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "invalid",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "label-text"
      })],
      key: "labelText",
      value() {
        return "";
      }
    }, {
      kind: "get",
      decorators: [property({
        type: Boolean
      })],
      key: "multiple",
      value: function multiple() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "name",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "pattern",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "placeholder",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "readonly",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "required",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "required-validity-message"
      })],
      key: "requiredValidityMessage",
      value() {
        return "Please fill out this field.";
      }
    }, {
      kind: "get",
      decorators: [property({
        type: Number
      })],
      key: "selectedIndex",
      value: function selectedIndex() {
        return this._selectNode.selectedIndex;
      }
    }, {
      kind: "set",
      key: "selectedIndex",
      value: function selectedIndex(value) {
        this._selectNode.selectedIndex = value;
        this.value = this._selectNode.value;
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "size",
      value() {
        return INPUT_SIZE.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "validity-message"
      })],
      key: "validityMessage",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "value",
      value() {
        return "";
      }
    }, {
      kind: "method",
      key: "createRenderRoot",
      value: function createRenderRoot() {
        return this.attachShadow({
          mode: "open",
          delegatesFocus: true
        });
      }
    }, {
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        _get(_getPrototypeOf(BXSelect2.prototype), "connectedCallback", this).call(this);
        this._observerMutation = new MutationObserver(this._handleMutation);
        this._observerMutation.observe(this, {
          attributes: true,
          childList: true,
          subtree: true
        });
      }
    }, {
      kind: "method",
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this._observerMutation) {
          this._observerMutation.disconnect();
          this._observerMutation = null;
        }
        _get(_getPrototypeOf(BXSelect2.prototype), "disconnectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "updated",
      value: function updated(changedProperties) {
        if (changedProperties.has("value")) {
          const {
            value,
            _placeholderItemValue: placeholderItemValue
          } = this;
          this._selectNode.value = !value ? placeholderItemValue : value;
        }
      }
    }, {
      kind: "method",
      key: "render",
      value: function render2() {
        const {
          disabled,
          helperText,
          invalid,
          labelText,
          placeholder,
          size,
          validityMessage,
          value,
          _placeholderItemValue: placeholderItemValue,
          _handleInput: handleInput
        } = this;
        const inputClasses = classMap({
          [`${prefix$d}--select-input`]: true,
          [`${prefix$d}--select-input--${size}`]: size
        });
        const labelClasses = classMap({
          [`${prefix$d}--label`]: true,
          [`${prefix$d}--label--disabled`]: disabled
        });
        const helperTextClasses = classMap({
          [`${prefix$d}--form__helper-text`]: true,
          [`${prefix$d}--form__helper-text--disabled`]: disabled
        });
        const supplementalText = !invalid ? html(_t4$1 || (_t4$1 = _$8` <div class="${0}"> <slot name="helper-text"> ${0} </slot> </div> `), helperTextClasses, helperText) : html(_t5$1 || (_t5$1 = _$8` <div class="${0}--form-requirement" id="validity-message"> <slot name="validity-message"> ${0} </slot> </div> `), prefix$d, validityMessage);
        return html(_t6 || (_t6 = _$8` <label class="${0}" for="input"> <slot name="label-text"> ${0} </slot> </label> <div class="${0}--select-input__wrapper" ?data-invalid="${0}"> <select id="input" class="${0}" ?disabled="${0}" aria-invalid="${0}" aria-describedby="${0}" @input="${0}"> ${0} ${0} </select> ${0} ${0} </div> ${0} `), labelClasses, labelText, prefix$d, invalid, inputClasses, disabled, String(Boolean(invalid)), ifDefined(!invalid ? void 0 : "validity-message"), handleInput, !placeholder || value ? void 0 : html(_t7 || (_t7 = _$8` <option disabled="disabled" hidden class="${0}--select-option" value="${0}" selected="selected"> ${0} </option> `), prefix$d, placeholderItemValue, placeholder), this._renderItems(this), svgResultCarbonIcon$3({
          class: `${prefix$d}--select__arrow`
        }), !invalid ? void 0 : svgResultCarbonIcon$2({
          class: `${prefix$d}--select__invalid-icon`
        }), supplementalText);
      }
    }, {
      kind: "get",
      static: true,
      key: "selectorItem",
      value: function selectorItem() {
        return `${prefix$d}-select-item-group,${prefix$d}-select-item`;
      }
    }, {
      kind: "get",
      static: true,
      key: "selectorLeafItem",
      value: function selectorLeafItem() {
        return `${prefix$d}-select-item`;
      }
    }, {
      kind: "get",
      static: true,
      key: "eventSelect",
      value: function eventSelect() {
        return `${prefix$d}-select-selected`;
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$6;
      }
    }]
  };
}, ValidityMixin(FormMixin(LitElement)));
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
let ExpCarbonSelect = class extends BXSelect {
};
ExpCarbonSelect.styles = [
  BXSelect.styles,
  css`
      .bx--label {
        font-size: var(--cds-label-01-font-size, 0.9rem);
      }

      .bx--select-input:focus {
        outline: 2px solid var(--cds-focus, #532fb0);
      }

      .bx--select-input {
        background-color: white;
      }
    `
];
ExpCarbonSelect = __decorateClass$4([
  customElement("exp-carbon-select")
], ExpCarbonSelect);
const {
  prefix: prefix$c
} = settings_1;
_decorate([customElement(`${prefix$c}-select-item`)], function(_initialize, _LitElement) {
  class BXSelectItem extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXSelectItem,
    d: [{
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "disabled",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "label",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "selected",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "value",
      value() {
        return "";
      }
    }]
  };
}, LitElement);
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    i2 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {
  prefix: prefix$b
} = settings_1;
const selectorTabbable = `
  a[href], area[href], input:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true],
  ${prefix$b}-accordion-item,
  ${prefix$b}-btn,
  ${prefix$b}-breadcrumb-link,
  ${prefix$b}-checkbox,
  ${prefix$b}-code-snippet,
  ${prefix$b}-combo-box,
  ${prefix$b}-content-switcher-item,
  ${prefix$b}-copy-button,
  ${prefix$b}-table-header-row,
  ${prefix$b}-table-row,
  ${prefix$b}-table-toolbar-search,
  ${prefix$b}-date-picker-input,
  ${prefix$b}-dropdown,
  ${prefix$b}-input,
  ${prefix$b}-link,
  ${prefix$b}-number-input,
  ${prefix$b}-modal,
  ${prefix$b}-modal-close-button,
  ${prefix$b}-multi-select,
  ${prefix$b}-inline-notification,
  ${prefix$b}-toast-notification,
  ${prefix$b}-overflow-menu,
  ${prefix$b}-overflow-menu-item,
  ${prefix$b}-page-sizes-select,
  ${prefix$b}-pages-select,
  ${prefix$b}-progress-step,
  ${prefix$b}-radio-button,
  ${prefix$b}-search,
  ${prefix$b}-slider,
  ${prefix$b}-slider-input,
  ${prefix$b}-structured-list,
  ${prefix$b}-tab,
  ${prefix$b}-filter-tag,
  ${prefix$b}-textarea,
  ${prefix$b}-clickable-tile,
  ${prefix$b}-expandable-tile,
  ${prefix$b}-radio-tile,
  ${prefix$b}-selectable-tile,
  ${prefix$b}-toggle,
  ${prefix$b}-tooltip,
  ${prefix$b}-tooltip-definition,
  ${prefix$b}-tooltip-icon,
  ${prefix$b}-header-menu,
  ${prefix$b}-header-menu-button,
  ${prefix$b}-header-menu-item,
  ${prefix$b}-header-name,
  ${prefix$b}-header-nav-item,
  ${prefix$b}-side-nav-link,
  ${prefix$b}-side-nav-menu,
  ${prefix$b}-side-nav-menu-item
`;
/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const FocusMixin = (Base) => class extends Base {
  focus() {
    if (this.shadowRoot.delegatesFocus) {
      super.focus();
    } else {
      const delegateTarget = this.shadowRoot.querySelector(selectorTabbable) || this.querySelector(selectorTabbable);
      if (delegateTarget) {
        delegateTarget.focus();
      } else {
        super.focus();
      }
    }
  }
};
const EVENT_NAME_FORMAT = /^((document|window|parentRoot|shadowRoot):)?([\w-]+)$/;
const HostListenerMixin = (Base) => {
  class HostListenerMixinImpl extends Base {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "_handles", /* @__PURE__ */ new Set());
    }
    connectedCallback() {
      super.connectedCallback();
      const hostListeners = this.constructor._hostListeners;
      Object.keys(hostListeners).forEach((listenerName) => {
        Object.keys(hostListeners[listenerName]).forEach((type) => {
          var _unprefixedType;
          const tokens = EVENT_NAME_FORMAT.exec(type);
          if (!tokens) {
            throw new Error(`Could not parse the event name: ${listenerName}`);
          }
          const [, , targetName, unprefixedType] = tokens;
          const target = {
            document: this.ownerDocument,
            window: this.ownerDocument.defaultView,
            parentRoot: this.getRootNode(),
            shadowRoot: this.shadowRoot
          }[targetName] || this;
          const {
            options
          } = hostListeners[listenerName][type];
          this._handles.add(on(target, (_unprefixedType = this.constructor[unprefixedType]) !== null && _unprefixedType !== void 0 ? _unprefixedType : unprefixedType, this[listenerName], options));
        });
      });
    }
    disconnectedCallback() {
      this._handles.forEach((handle) => {
        handle.release();
        this._handles.delete(handle);
      });
      super.disconnectedCallback();
    }
  }
  _defineProperty(HostListenerMixinImpl, "_hostListeners", {});
  return HostListenerMixinImpl;
};
/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const setHostListener = (type, options, Clazz, name) => {
  const hostListeners = Clazz._hostListeners;
  if (!hostListeners) {
    throw new Error("The method `@HostListener()` is defined on has to be of a class that has `HostListerMixin`.");
  }
  if (!hostListeners[name]) {
    hostListeners[name] = {};
  }
  hostListeners[name][type] = {
    options
  };
};
const HostListenerStandard = (type, options, descriptor) => {
  const {
    kind,
    key,
    placement
  } = descriptor;
  if (!(kind === "method" && placement === "prototype" || kind === "field" && placement === "own")) {
    throw new Error("`@HostListener()` must be defined on instance methods, but you may have defined it on static, field, etc.");
  }
  return _objectSpread2(_objectSpread2({}, descriptor), {}, {
    finisher(Clazz) {
      setHostListener(type, options, Clazz, key);
    }
  });
};
const HostListener = (type, options) => (targetOrDescriptor, name) => typeof name !== "undefined" ? setHostListener(type, options, targetOrDescriptor.constructor, name) : HostListenerStandard(type, options, targetOrDescriptor);
/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const NAVIGATION_DIRECTION$1 = {
  Up: -1,
  ArrowUp: -1,
  Down: 1,
  ArrowDown: 1
};
let DROPDOWN_KEYBOARD_ACTION;
(function(DROPDOWN_KEYBOARD_ACTION2) {
  DROPDOWN_KEYBOARD_ACTION2["NONE"] = "none";
  DROPDOWN_KEYBOARD_ACTION2["CLOSING"] = "closing";
  DROPDOWN_KEYBOARD_ACTION2["NAVIGATING"] = "navigating";
  DROPDOWN_KEYBOARD_ACTION2["TRIGGERING"] = "triggering";
})(DROPDOWN_KEYBOARD_ACTION || (DROPDOWN_KEYBOARD_ACTION = {}));
let DROPDOWN_SIZE;
(function(DROPDOWN_SIZE2) {
  DROPDOWN_SIZE2["REGULAR"] = "";
  DROPDOWN_SIZE2["SMALL"] = "sm";
  DROPDOWN_SIZE2["EXTRA_LARGE"] = "xl";
})(DROPDOWN_SIZE || (DROPDOWN_SIZE = {}));
let DROPDOWN_TYPE;
(function(DROPDOWN_TYPE2) {
  DROPDOWN_TYPE2["REGULAR"] = "";
  DROPDOWN_TYPE2["INLINE"] = "inline";
})(DROPDOWN_TYPE || (DROPDOWN_TYPE = {}));
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$5 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}.bx--assistive-text,.bx--visually-hidden{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--body{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);background-color:var(--cds-ui-background,#fff);color:var(--cds-text-01,#161616);line-height:1}.bx--body *,.bx--body ::after,.bx--body ::before{box-sizing:inherit}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--text-truncate--end{display:inline-block;overflow:hidden;width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--text-truncate--front{display:inline-block;overflow:hidden;width:100%;direction:rtl;text-overflow:ellipsis;white-space:nowrap}.bx--list-box__wrapper--inline,:host(bx-dropdown[type=inline]){display:inline-grid;align-items:center;grid-gap:.25rem;grid-template:auto auto/auto auto}.bx--list-box__wrapper--inline .bx--label,:host(bx-dropdown[type=inline]) .bx--label{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}.bx--list-box__wrapper--inline .bx--form-requirement,.bx--list-box__wrapper--inline .bx--form__helper-text,.bx--list-box__wrapper--inline .bx--label,:host(bx-dropdown[type=inline]) .bx--form-requirement,:host(bx-dropdown[type=inline]) .bx--form__helper-text,:host(bx-dropdown[type=inline]) .bx--label{margin:0}.bx--list-box__wrapper--inline .bx--form__helper-text,:host(bx-dropdown[type=inline]) .bx--form__helper-text{max-width:none}.bx--list-box__wrapper--inline .bx--form-requirement,:host(bx-dropdown[type=inline]) .bx--form-requirement{grid-column:2}.bx--list-box{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;position:relative;width:100%;height:2.5rem;max-height:2.5rem;border:none;border-bottom:1px solid var(--cds-ui-04,#8d8d8d);background-color:var(--cds-field-01,#f4f4f4);color:var(--cds-text-01,#161616);cursor:pointer;transition:all 70ms cubic-bezier(.2,0,.38,.9)}.bx--list-box *,.bx--list-box ::after,.bx--list-box ::before{box-sizing:inherit}.bx--list-box:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--list-box--lg,.bx--list-box--xl{height:3rem;max-height:3rem}.bx--list-box--sm{height:2rem;max-height:2rem}.bx--list-box--expanded{border-bottom-color:var(--cds-ui-03,#e0e0e0)}.bx--list-box--expanded:hover{background-color:var(--cds-field-01,#f4f4f4)}.bx--list-box--expanded:hover.bx--list-box--light:hover{background-color:var(--cds-field-02,#fff)}.bx--list-box .bx--text-input{min-width:0;height:100%}.bx--list-box__invalid-icon{position:absolute;top:50%;right:2.5rem;fill:var(--cds-support-01,#da1e28);-webkit-transform:translateY(-50%);transform:translateY(-50%)}.bx--list-box__invalid-icon--warning{fill:var(--cds-support-03,#f1c21b)}.bx--list-box__invalid-icon--warning path[fill]{fill:#000;opacity:1}.bx--list-box.bx--list-box--warning .bx--list-box__field,.bx--list-box[data-invalid] .bx--list-box__field{padding-right:4rem;border-bottom:0}.bx--list-box[data-invalid].bx--list-box--inline .bx--list-box__field{padding-right:3.5rem}.bx--list-box--light{background-color:var(--cds-field-02,#fff)}.bx--list-box--light:hover{background-color:var(--cds-hover-light-ui,#e5e5e5)}.bx--list-box--light .bx--list-box__menu{background:var(--cds-field-02,#fff)}.bx--list-box--light .bx--list-box__menu-item__option{border-top-color:var(--cds-decorative-01,#e0e0e0)}.bx--list-box--light.bx--list-box--expanded{border-bottom-color:transparent}.bx--list-box--disabled:hover{background-color:var(--cds-field-01,#f4f4f4)}.bx--list-box--light.bx--list-box--disabled{background-color:var(--cds-field-02,#fff)}.bx--list-box--disabled,.bx--list-box--disabled .bx--list-box__field,.bx--list-box--disabled .bx--list-box__field:focus{border-bottom-color:transparent;outline:0}.bx--list-box--disabled .bx--list-box__label,.bx--list-box--disabled.bx--list-box--inline .bx--list-box__label{color:var(--cds-disabled-02,#c6c6c6)}.bx--list-box--disabled .bx--list-box__menu-icon>svg,.bx--list-box--disabled .bx--list-box__selection>svg{fill:var(--cds-disabled-02,#c6c6c6)}.bx--list-box--disabled,.bx--list-box--disabled .bx--list-box__field,.bx--list-box--disabled .bx--list-box__menu-icon{cursor:not-allowed}.bx--list-box--disabled .bx--list-box__menu-item,.bx--list-box--disabled .bx--list-box__menu-item--highlighted,.bx--list-box--disabled .bx--list-box__menu-item:hover,.bx--list-box--disabled :host(bx-dropdown-item){color:var(--cds-disabled-02,#c6c6c6);text-decoration:none}.bx--list-box--disabled .bx--list-box__selection:hover{cursor:not-allowed}.bx--list-box--disabled.bx--list-box[data-invalid] .bx--list-box__field{padding-right:3rem}.bx--list-box--disabled.bx--list-box[data-invalid].bx--list-box--inline .bx--list-box__field{padding-right:2rem}.bx--list-box.bx--list-box--inline{border-width:0;background-color:transparent}.bx--list-box.bx--list-box--inline:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--list-box.bx--list-box--inline.bx--list-box--expanded{border-bottom-width:0}.bx--list-box.bx--list-box--inline.bx--list-box--expanded .bx--list-box__field[aria-expanded=true]{border-width:0}.bx--list-box.bx--list-box--inline.bx--list-box--disabled:hover{background-color:transparent}.bx--list-box.bx--list-box--inline.bx--list-box--expanded:hover{background-color:var(--cds-field-02,#fff)}.bx--list-box.bx--list-box--inline .bx--list-box__field{padding:0 2rem 0 .5rem}.bx--list-box.bx--list-box--inline .bx--list-box__menu-icon{right:.5rem}.bx--list-box.bx--list-box--inline .bx--list-box__invalid-icon{right:2rem}.bx--list-box--inline .bx--list-box__label{color:var(--cds-text-01,#161616)}.bx--list-box--inline .bx--list-box__field{height:100%}.bx--dropdown--inline .bx--list-box__field{max-width:30rem}.bx--dropdown--inline .bx--list-box__menu{min-width:18rem;max-width:30rem}.bx--list-box__field{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;display:inline-block;padding:0;border:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;cursor:pointer;width:100%;position:relative;display:inline-flex;overflow:hidden;height:calc(100% + 1px);align-items:center;padding:0 3rem 0 1rem;cursor:pointer;outline:0;text-overflow:ellipsis;vertical-align:top;white-space:nowrap}.bx--list-box__field *,.bx--list-box__field ::after,.bx--list-box__field ::before{box-sizing:inherit}.bx--list-box__field::-moz-focus-inner{border:0}.bx--list-box__field:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--list-box__field:focus{outline-style:dotted}}.bx--list-box__field[disabled]{color:var(--cds-disabled-02,#c6c6c6);outline:0}.bx--list-box__field .bx--text-input{padding-right:4.5rem}.bx--list-box--warning .bx--list-box__field .bx--text-input,.bx--list-box[data-invalid] .bx--list-box__field .bx--text-input{padding-right:6.125rem}.bx--list-box--warning .bx--list-box__field .bx--text-input+.bx--list-box__invalid-icon,.bx--list-box[data-invalid] .bx--list-box__field .bx--text-input+.bx--list-box__invalid-icon{right:4.125rem}.bx--list-box__field .bx--text-input--empty{padding-right:3rem}.bx--list-box--warning .bx--list-box__field .bx--text-input--empty,.bx--list-box[data-invalid] .bx--list-box__field .bx--text-input--empty{padding-right:4.5rem}.bx--list-box--warning .bx--list-box__field .bx--text-input--empty+.bx--list-box__invalid-icon,.bx--list-box[data-invalid] .bx--list-box__field .bx--text-input--empty+.bx--list-box__invalid-icon{right:2.5rem}.bx--list-box__label{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);overflow:hidden;color:var(--cds-text-01,#161616);text-overflow:ellipsis;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap}.bx--list-box__menu-icon{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;display:inline-block;padding:0;border:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;cursor:pointer;position:absolute;right:1rem;display:flex;width:1.5rem;height:1.5rem;align-items:center;justify-content:center;cursor:pointer;outline:0;transition:-webkit-transform 70ms cubic-bezier(.2,0,.38,.9);transition:transform 70ms cubic-bezier(.2,0,.38,.9);transition:transform 70ms cubic-bezier(.2,0,.38,.9),-webkit-transform 70ms cubic-bezier(.2,0,.38,.9)}.bx--list-box__menu-icon *,.bx--list-box__menu-icon ::after,.bx--list-box__menu-icon ::before{box-sizing:inherit}.bx--list-box__menu-icon::-moz-focus-inner{border:0}.bx--list-box__menu-icon>svg{fill:var(--cds-icon-01,#161616)}.bx--list-box__menu-icon--open{width:1.5rem;justify-content:center;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.bx--list-box__selection{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;display:inline-block;padding:0;border:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;cursor:pointer;position:absolute;top:50%;right:2.5rem;display:flex;width:1.5rem;height:1.5rem;align-items:center;justify-content:center;cursor:pointer;-webkit-transform:translateY(-50%);transform:translateY(-50%);transition:background-color 70ms cubic-bezier(.2,0,.38,.9);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.bx--list-box__selection *,.bx--list-box__selection ::after,.bx--list-box__selection ::before{box-sizing:inherit}.bx--list-box__selection::-moz-focus-inner{border:0}.bx--list-box__selection:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--list-box__selection:focus{outline-style:dotted}}.bx--list-box__selection:focus:hover{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--list-box__selection:focus:hover{outline-style:dotted}}.bx--list-box__selection>svg{fill:var(--cds-icon-01,#161616)}.bx--list-box--disabled .bx--list-box__selection:focus{outline:0}.bx--list-box__selection--multi{font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px);position:static;top:auto;display:flex;width:auto;height:1.5rem;align-items:center;justify-content:space-between;padding:.5rem;padding-right:.125rem;margin-right:.625rem;background-color:var(--cds-inverse-02,#393939);border-radius:.75rem;color:var(--cds-inverse-01,#fff);line-height:0;-webkit-transform:none;transform:none}.bx--list-box__selection--multi>svg{width:1.25rem;height:1.25rem;padding:.125rem;margin-left:.25rem;fill:var(--cds-inverse-01,#fff)}.bx--list-box__selection--multi>svg:hover{background-color:var(--cds-hover-secondary,#4c4c4c);border-radius:50%}.bx--list-box--disabled .bx--list-box__selection--multi{background-color:var(--cds-disabled-02,#c6c6c6);color:var(--cds-disabled-01,#f4f4f4)}.bx--list-box--disabled .bx--list-box__selection--multi .bx--tag__close-icon:hover,.bx--list-box--disabled .bx--list-box__selection--multi.bx--tag--interactive:hover{background-color:var(--cds-disabled-02,#c6c6c6)}.bx--list-box--disabled .bx--list-box__selection--multi>svg{fill:var(--cds-disabled-01,#f4f4f4)}.bx--list-box--disabled .bx--list-box__selection--multi>svg:hover{background-color:initial}.bx--list-box__selection--multi:hover{outline:0}.bx--list-box__menu{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));position:absolute;z-index:9100;right:0;left:0;width:100%;background-color:var(--cds-ui-01,#f4f4f4);overflow-y:auto;transition:max-height 110ms cubic-bezier(.2,0,.38,.9)}.bx--list-box__menu:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--list-box__menu:focus{outline-style:dotted}}.bx--list-box .bx--list-box__field[aria-expanded=false]+.bx--list-box__menu{max-height:0}.bx--list-box--expanded .bx--list-box__menu{max-height:13.75rem}.bx--list-box--expanded.bx--list-box--lg .bx--list-box__menu,.bx--list-box--expanded.bx--list-box--xl .bx--list-box__menu{max-height:16.5rem}.bx--list-box--expanded.bx--list-box--sm .bx--list-box__menu{max-height:11rem}.bx--list-box__menu-item,:host(bx-dropdown-item){font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);position:relative;height:2.5rem;color:var(--cds-text-02,#525252);cursor:pointer;transition:background 70ms cubic-bezier(.2,0,.38,.9);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.bx--list-box__menu-item:hover,:hover:host(bx-dropdown-item){background-color:var(--cds-hover-ui,#e5e5e5)}.bx--list-box__menu-item:active,:active:host(bx-dropdown-item){background-color:var(--cds-selected-ui,#e0e0e0)}.bx--list-box--light .bx--list-box__menu-item:hover,.bx--list-box--light :hover:host(bx-dropdown-item){background-color:var(--cds-hover-light-ui,#e5e5e5)}.bx--list-box--sm .bx--list-box__menu-item,.bx--list-box--sm :host(bx-dropdown-item){height:2rem}.bx--list-box--lg .bx--list-box__menu-item,.bx--list-box--lg :host(bx-dropdown-item),.bx--list-box--xl .bx--list-box__menu-item,.bx--list-box--xl :host(bx-dropdown-item){height:3rem}.bx--list-box--disabled .bx--list-box__menu-item:hover,.bx--list-box--disabled :hover:host(bx-dropdown-item){background-color:transparent}.bx--list-box--light .bx--list-box__menu-item:active,.bx--list-box--light :active:host(bx-dropdown-item){background-color:var(--cds-selected-light-ui,#e0e0e0)}.bx--list-box--disabled .bx--list-box__menu-item__option:hover{border-top-color:var(--cds-ui-03,#e0e0e0)}.bx--list-box__menu-item:first-of-type .bx--list-box__menu-item__option,:first-of-type:host(bx-dropdown-item) .bx--list-box__menu-item__option{border-top-color:transparent}.bx--list-box__menu-item:hover .bx--list-box__menu-item__option,:hover:host(bx-dropdown-item) .bx--list-box__menu-item__option{color:var(--cds-text-01,#161616)}.bx--list-box__menu-item:hover+.bx--list-box__menu-item .bx--list-box__menu-item__option,.bx--list-box__menu-item:hover+:host(bx-dropdown-item) .bx--list-box__menu-item__option,:hover:host(bx-dropdown-item)+.bx--list-box__menu-item .bx--list-box__menu-item__option,:hover:host(bx-dropdown-item)+:host(bx-dropdown-item) .bx--list-box__menu-item__option{border-top-color:transparent}.bx--list-box--disabled .bx--list-box__menu-item:hover+.bx--list-box__menu-item .bx--list-box__menu-item__option,.bx--list-box--disabled .bx--list-box__menu-item:hover+:host(bx-dropdown-item) .bx--list-box__menu-item__option,.bx--list-box--disabled :hover:host(bx-dropdown-item)+.bx--list-box__menu-item .bx--list-box__menu-item__option,.bx--list-box--disabled :hover:host(bx-dropdown-item)+:host(bx-dropdown-item) .bx--list-box__menu-item__option{border-top-color:var(--cds-ui-03,#e0e0e0)}.bx--list-box__menu-item__option{outline:2px solid transparent;outline-offset:-2px;display:block;overflow:hidden;height:2.5rem;padding:.6875rem 0;padding-right:1.5rem;border-top:1px solid transparent;border-top-color:var(--cds-ui-03,#e0e0e0);border-bottom:1px solid transparent;margin:0 1rem;color:var(--cds-text-02,#525252);font-weight:400;line-height:1rem;text-decoration:none;text-overflow:ellipsis;transition:border-color 70ms cubic-bezier(.2,0,.38,.9),color 70ms cubic-bezier(.2,0,.38,.9);white-space:nowrap}.bx--list-box__menu-item__option:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px;padding:.6875rem 1rem;border-color:transparent;margin:0}@media screen and (prefers-contrast){.bx--list-box__menu-item__option:focus{outline-style:dotted}}.bx--list-box__menu-item__option:hover{border-color:transparent;color:var(--cds-text-01,#161616)}.bx--list-box--sm .bx--list-box__menu-item__option{height:2rem;padding-top:.4375rem;padding-bottom:.4375rem}.bx--list-box--lg .bx--list-box__menu-item__option,.bx--list-box--xl .bx--list-box__menu-item__option{height:3rem;padding-top:.9375rem;padding-bottom:.9375rem}.bx--list-box--disabled .bx--list-box__menu-item:hover .bx--list-box__menu-item__option,.bx--list-box--disabled .bx--list-box__menu-item__option{color:var(--cds-disabled-02,#c6c6c6)}.bx--list-box__menu-item[disabled],.bx--list-box__menu-item[disabled] *,.bx--list-box__menu-item[disabled] .bx--list-box__menu-item__option,.bx--list-box__menu-item[disabled]:hover,[disabled]:host(bx-dropdown-item),[disabled]:host(bx-dropdown-item) *,[disabled]:host(bx-dropdown-item) .bx--list-box__menu-item__option{color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed;outline:0}.bx--list-box__menu-item[disabled]:hover,[disabled]:hover:host(bx-dropdown-item){background-color:revert}.bx--list-box__menu-item[disabled] .bx--checkbox-label::before,[disabled]:host(bx-dropdown-item) .bx--checkbox-label::before{border-color:var(--cds-disabled-02,#c6c6c6)}.bx--list-box__menu-item[disabled] .bx--list-box__menu-item__option,[disabled]:host(bx-dropdown-item) .bx--list-box__menu-item__option{border-top-color:var(--cds-ui-03,#e0e0e0)}.bx--list-box__menu-item[disabled]:hover+.bx--list-box__menu-item .bx--list-box__menu-item__option,.bx--list-box__menu-item[disabled]:hover+:host(bx-dropdown-item) .bx--list-box__menu-item__option,[disabled]:hover:host(bx-dropdown-item)+.bx--list-box__menu-item .bx--list-box__menu-item__option,[disabled]:hover:host(bx-dropdown-item)+:host(bx-dropdown-item) .bx--list-box__menu-item__option{border-top-color:var(--cds-ui-03,#e0e0e0)}.bx--list-box.bx--list-box--inline .bx--list-box__menu-item__option{margin:0 .5rem}.bx--list-box.bx--list-box--inline .bx--list-box__menu-item__option:focus{padding-right:.5rem;padding-left:.5rem;margin:0}.bx--list-box__menu-item--highlighted,:host(bx-dropdown-item[highlighted]),:host(bx-dropdown-item[selected]){border-color:transparent;background-color:var(--cds-hover-ui,#e5e5e5);color:var(--cds-text-01,#161616)}.bx--list-box__menu-item--highlighted .bx--list-box__menu-item__option,.bx--list-box__menu-item--highlighted+.bx--list-box__menu-item .bx--list-box__menu-item__option,.bx--list-box__menu-item--highlighted+:host(bx-dropdown-item) .bx--list-box__menu-item__option,:host(bx-dropdown-item[highlighted]) .bx--list-box__menu-item__option,:host(bx-dropdown-item[highlighted])+.bx--list-box__menu-item .bx--list-box__menu-item__option,:host(bx-dropdown-item[highlighted])+:host(bx-dropdown-item) .bx--list-box__menu-item__option,:host(bx-dropdown-item[selected]) .bx--list-box__menu-item__option,:host(bx-dropdown-item[selected])+.bx--list-box__menu-item .bx--list-box__menu-item__option,:host(bx-dropdown-item[selected])+:host(bx-dropdown-item) .bx--list-box__menu-item__option{border-top-color:transparent}.bx--list-box__menu-item--highlighted .bx--list-box__menu-item__option,:host(bx-dropdown-item[highlighted]) .bx--list-box__menu-item__option,:host(bx-dropdown-item[selected]) .bx--list-box__menu-item__option{color:var(--cds-text-01,#161616)}.bx--list-box__menu-item--active,:host(bx-dropdown-item[selected]){border-bottom-color:var(--cds-selected-ui,#e0e0e0);background-color:var(--cds-selected-ui,#e0e0e0);color:var(--cds-text-01,#161616)}.bx--list-box--light .bx--list-box__menu-item--active,.bx--list-box--light :host(bx-dropdown-item[selected]){border-bottom-color:var(--cds-selected-light-ui,#e0e0e0);background-color:var(--cds-selected-light-ui,#e0e0e0)}.bx--list-box__menu-item--active.bx--list-box__menu-item--highlighted,.bx--list-box__menu-item--active:host(bx-dropdown-item[highlighted]),.bx--list-box__menu-item--active:hover,:host(bx-dropdown-item[selected]){border-bottom-color:var(--cds-hover-selected-ui,#cacaca);background-color:var(--cds-hover-selected-ui,#cacaca)}.bx--list-box__menu-item--active .bx--list-box__menu-item__option,:host(bx-dropdown-item[selected]) .bx--list-box__menu-item__option{color:var(--cds-text-01,#161616)}.bx--list-box__menu-item--active+.bx--list-box__menu-item>.bx--list-box__menu-item__option,.bx--list-box__menu-item--active+:host(bx-dropdown-item)>.bx--list-box__menu-item__option,:host(bx-dropdown-item[selected])+.bx--list-box__menu-item>.bx--list-box__menu-item__option,:host(bx-dropdown-item[selected])+:host(bx-dropdown-item)>.bx--list-box__menu-item__option{border-top-color:transparent}.bx--list-box__menu-item__selected-icon{position:absolute;top:50%;right:1rem;display:none;fill:var(--cds-icon-01,#161616);-webkit-transform:translateY(-50%);transform:translateY(-50%)}.bx--list-box--inline .bx--list-box__menu-item__selected-icon{right:.5rem}.bx--list-box__menu-item--active .bx--list-box__menu-item__selected-icon,:host(bx-dropdown-item[selected]) .bx--list-box__menu-item__selected-icon{display:block}.bx--list-box__menu-item .bx--checkbox-label,:host(bx-dropdown-item) .bx--checkbox-label{width:100%}.bx--list-box__menu-item .bx--checkbox-label-text,:host(bx-dropdown-item) .bx--checkbox-label-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bx--list-box--up .bx--list-box__menu{bottom:2.5rem}.bx--list-box--up .bx--list-box--sm .bx--list-box__menu,.bx--list-box--up.bx--dropdown--sm .bx--list-box__menu,.bx--list-box--up.bx--list-box--sm .bx--list-box__menu{bottom:2rem}.bx--list-box--up .bx--list-box--lg .bx--list-box__menu,.bx--list-box--up.bx--dropdown--lg .bx--list-box__menu,.bx--list-box--up.bx--dropdown--xl .bx--list-box__menu,.bx--list-box--up.bx--list-box--lg .bx--list-box__menu,.bx--list-box--up.bx--list-box--xl .bx--list-box__menu{bottom:3rem}.bx--list-box input[role=combobox],.bx--list-box input[type=text]{min-width:0;background-color:inherit}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--list-box__field,.bx--list-box__menu,.bx--multi-select .bx--tag--filter{outline:1px solid transparent}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--list-box__field:focus,.bx--list-box__menu-item--highlighted .bx--list-box__menu-item__option,.bx--multi-select .bx--tag__close-icon:focus,:host(bx-dropdown-item[highlighted]) .bx--list-box__menu-item__option,:host(bx-dropdown-item[selected]) .bx--list-box__menu-item__option{color:Highlight;outline:1px solid Highlight}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--list-box__menu-icon>svg,.bx--list-box__selection--multi>svg,.bx--list-box__selection>svg{fill:ButtonText}}.bx--fieldset{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;margin-bottom:2rem}.bx--fieldset *,.bx--fieldset ::after,.bx--fieldset ::before{box-sizing:inherit}.bx--fieldset--no-margin{margin-bottom:0}.bx--form-item{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:flex;flex:1 1 auto;flex-direction:column;align-items:flex-start}.bx--label{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px);display:inline-block;margin-bottom:.5rem;color:var(--cds-text-02,#525252);font-weight:400;line-height:1rem;vertical-align:baseline}.bx--label *,.bx--label ::after,.bx--label ::before{box-sizing:inherit}.bx--label .bx--tooltip__trigger{font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px)}.bx--label.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:4.6875rem;height:.875rem}.bx--label.bx--skeleton:active,.bx--label.bx--skeleton:focus,.bx--label.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--label.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--label.bx--skeleton::before{-webkit-animation:none;animation:none}}input[type=number]{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px}@media screen and (prefers-contrast){.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline-style:dotted}}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper--warn~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box--warning~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--number__input-wrapper--warning~.bx--form-requirement,.bx--select--warning .bx--select-input__wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper--warning>.bx--text-input~.bx--form-requirement,.bx--text-input__field-wrapper--warning~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{display:block;overflow:visible;max-height:12.5rem;font-weight:400}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{color:var(--cds-text-error,#da1e28)}.bx--form--fluid .bx--text-input__field-wrapper--warning,.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]{display:block}.bx--form--fluid .bx--fieldset{margin:0}.bx--form--fluid input[data-invalid]{outline:0}.bx--form--fluid .bx--form-requirement{padding:.5rem 2.5rem .5rem 1rem;margin:0}input:not(output):not([data-invalid]):-moz-ui-invalid{box-shadow:none}.bx--form-requirement{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-caption-01-font-size,.75rem);font-weight:var(--cds-caption-01-font-weight,400);line-height:var(--cds-caption-01-line-height,1.33333);letter-spacing:var(--cds-caption-01-letter-spacing,.32px);display:none;overflow:hidden;max-height:0;margin:.25rem 0 0}.bx--form-requirement *,.bx--form-requirement ::after,.bx--form-requirement ::before{box-sizing:inherit}.bx--select--inline .bx--form__helper-text{margin-top:0}.bx--form__helper-text{font-size:var(--cds-helper-text-01-font-size,.75rem);line-height:var(--cds-helper-text-01-line-height,1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing,.32px);z-index:0;width:100%;margin-top:.25rem;color:var(--cds-text-02,#525252);opacity:1}.bx--form__helper-text--disabled,.bx--label--disabled{color:var(--cds-disabled-02,#c6c6c6)}fieldset[disabled] .bx--form__helper-text,fieldset[disabled] .bx--label{color:var(--cds-disabled-02,#c6c6c6)}.bx--form-item.bx--checkbox-wrapper{position:relative;margin-bottom:.25rem}.bx--form-item.bx--checkbox-wrapper:first-of-type{margin-top:.1875rem}.bx--label+.bx--form-item.bx--checkbox-wrapper{margin-top:-.125rem}.bx--form-item.bx--checkbox-wrapper:last-of-type{margin-bottom:.1875rem}.bx--checkbox{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap;top:1.25rem;left:.7rem}.bx--checkbox-label{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);position:relative;display:flex;min-height:1.5rem;padding-top:.1875rem;padding-left:1.25rem;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.bx--checkbox-label *,.bx--checkbox-label ::after,.bx--checkbox-label ::before{box-sizing:inherit}.bx--checkbox-label-text{padding-left:.375rem}.bx--checkbox-label::after,.bx--checkbox-label::before{box-sizing:border-box}.bx--checkbox-label::before{position:absolute;top:.125rem;left:0;width:1rem;height:1rem;border:1px solid var(--cds-icon-01,#161616);margin:.125rem .125rem .125rem .1875rem;background-color:transparent;border-radius:1px;content:""}.bx--checkbox-label::after{position:absolute;top:.5rem;left:.4375rem;width:.5625rem;height:.3125rem;border-bottom:2px solid var(--cds-inverse-01,#fff);border-left:2px solid var(--cds-inverse-01,#fff);margin-top:-.1875rem;background:0 0;content:"";-webkit-transform:scale(0) rotate(-45deg);transform:scale(0) rotate(-45deg);-webkit-transform-origin:bottom right;transform-origin:bottom right}.bx--checkbox-label[data-contained-checkbox-state=mixed]::before,.bx--checkbox-label[data-contained-checkbox-state=true]::before,.bx--checkbox:checked+.bx--checkbox-label::before,.bx--checkbox:indeterminate+.bx--checkbox-label::before{border-width:1px;border-color:var(--cds-icon-01,#161616);background-color:var(--cds-icon-01,#161616)}.bx--checkbox-label[data-contained-checkbox-state=true]::after,.bx--checkbox:checked+.bx--checkbox-label::after{-webkit-transform:scale(1) rotate(-45deg);transform:scale(1) rotate(-45deg)}.bx--checkbox-label[data-contained-checkbox-state=mixed]::after,.bx--checkbox:indeterminate+.bx--checkbox-label::after{top:.6875rem;width:.5rem;border-bottom:2px solid var(--cds-inverse-01,#fff);border-left:0 solid var(--cds-inverse-01,#fff);-webkit-transform:scale(1) rotate(0);transform:scale(1) rotate(0)}.bx--checkbox-label[data-contained-checkbox-state=mixed].bx--checkbox-label__focus::before,.bx--checkbox-label[data-contained-checkbox-state=true].bx--checkbox-label__focus::before,.bx--checkbox-label__focus::before,.bx--checkbox:checked:focus+.bx--checkbox-label::before,.bx--checkbox:focus+.bx--checkbox-label::before,.bx--checkbox:indeterminate:focus+.bx--checkbox-label::before{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:1px}.bx--checkbox-label[data-contained-checkbox-disabled=true],.bx--checkbox:disabled+.bx--checkbox-label{color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed}.bx--checkbox-label[data-contained-checkbox-disabled=true]::before,.bx--checkbox:disabled+.bx--checkbox-label::before{border-color:var(--cds-disabled-02,#c6c6c6)}.bx--checkbox-label[data-contained-checkbox-state=mixed][data-contained-checkbox-disabled=true]::before,.bx--checkbox-label[data-contained-checkbox-state=true][data-contained-checkbox-disabled=true]::before,.bx--checkbox:checked:disabled+.bx--checkbox-label::before,.bx--checkbox:indeterminate:disabled+.bx--checkbox-label::before{background-color:var(--cds-disabled-02,#c6c6c6)}.bx--checkbox-label-text.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:6.25rem;height:var(--cds-spacing-05,1rem);margin:.0625rem 0 0 .375rem}.bx--checkbox-label-text.bx--skeleton:active,.bx--checkbox-label-text.bx--skeleton:focus,.bx--checkbox-label-text.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--checkbox-label-text.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--checkbox-label-text.bx--skeleton::before{-webkit-animation:none;animation:none}}.bx--checkbox--inline{position:relative}.bx--tag{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;display:inline-block;padding:0;border:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;cursor:pointer;font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px);background-color:var(--cds-tag-background-gray,#e0e0e0);color:var(--cds-tag-color-gray,#393939);display:inline-flex;min-width:2rem;max-width:100%;min-height:1.5rem;align-items:center;justify-content:center;padding:.25rem .5rem;margin:.25rem;border-radius:.9375rem;cursor:default;vertical-align:middle;word-break:break-word}.bx--tag *,.bx--tag ::after,.bx--tag ::before{box-sizing:inherit}.bx--tag::-moz-focus-inner{border:0}.bx--tag .bx--tag__close-icon:hover,.bx--tag.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-gray,#c6c6c6)}.bx--tag:not(:first-child){margin-left:0}.bx--tag--red{background-color:var(--cds-tag-background-red,#ffd7d9);color:var(--cds-tag-color-red,#750e13)}.bx--tag--red .bx--tag__close-icon:hover,.bx--tag--red.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-red,#ffb3b8)}.bx--tag--magenta{background-color:var(--cds-tag-background-magenta,#ffd6e8);color:var(--cds-tag-color-magenta,#740937)}.bx--tag--magenta .bx--tag__close-icon:hover,.bx--tag--magenta.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-magenta,#ffafd2)}.bx--tag--purple{background-color:var(--cds-tag-background-purple,#e8daff);color:var(--cds-tag-color-purple,#491d8b)}.bx--tag--purple .bx--tag__close-icon:hover,.bx--tag--purple.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-purple,#d4bbff)}.bx--tag--blue{background-color:var(--cds-tag-background-blue,#d0e2ff);color:var(--cds-tag-color-blue,#002d9c)}.bx--tag--blue .bx--tag__close-icon:hover,.bx--tag--blue.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-blue,#a6c8ff)}.bx--tag--cyan{background-color:var(--cds-tag-background-cyan,#bae6ff);color:var(--cds-tag-color-cyan,#003a6d)}.bx--tag--cyan .bx--tag__close-icon:hover,.bx--tag--cyan.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-cyan,#82cfff)}.bx--tag--teal{background-color:var(--cds-tag-background-teal,#9ef0f0);color:var(--cds-tag-color-teal,#004144)}.bx--tag--teal .bx--tag__close-icon:hover,.bx--tag--teal.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-teal,#3ddbd9)}.bx--tag--green{background-color:var(--cds-tag-background-green,#a7f0ba);color:var(--cds-tag-color-green,#044317)}.bx--tag--green .bx--tag__close-icon:hover,.bx--tag--green.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-green,#6fdc8c)}.bx--tag--gray{background-color:var(--cds-tag-background-gray,#e0e0e0);color:var(--cds-tag-color-gray,#393939)}.bx--tag--gray .bx--tag__close-icon:hover,.bx--tag--gray.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-gray,#c6c6c6)}.bx--tag--cool-gray{background-color:var(--cds-tag-background-cool-gray,#dde1e6);color:var(--cds-tag-color-cool-gray,#343a3f)}.bx--tag--cool-gray .bx--tag__close-icon:hover,.bx--tag--cool-gray.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-cool-gray,#c1c7cd)}.bx--tag--warm-gray{background-color:var(--cds-tag-background-warm-gray,#e5e0df);color:var(--cds-tag-color-warm-gray,#3c3838)}.bx--tag--warm-gray .bx--tag__close-icon:hover,.bx--tag--warm-gray.bx--tag--interactive:hover{background-color:var(--cds-tag-hover-warm-gray,#cac5c4)}.bx--tag--high-contrast{background-color:var(--cds-inverse-02,#393939);color:var(--cds-inverse-01,#fff)}.bx--tag--high-contrast .bx--tag__close-icon:hover,.bx--tag--high-contrast.bx--tag--interactive:hover{background-color:var(--cds-inverse-hover-ui,#4c4c4c)}.bx--tag--outline{background-color:var(--cds-background,#fff);color:var(--cds-text-01,#161616);box-shadow:inset 0 0 0 1px var(--cds-inverse-02,#393939)}.bx--tag--outline .bx--tag__close-icon:hover,.bx--tag--outline.bx--tag--interactive:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--tag--disabled,.bx--tag--filter.bx--tag--disabled,.bx--tag--interactive.bx--tag--disabled{background-color:var(--cds-disabled-01,#f4f4f4);color:var(--cds-disabled-02,#c6c6c6)}.bx--tag--disabled .bx--tag__close-icon:hover,.bx--tag--disabled.bx--tag--interactive:hover,.bx--tag--filter.bx--tag--disabled .bx--tag__close-icon:hover,.bx--tag--filter.bx--tag--disabled.bx--tag--interactive:hover,.bx--tag--interactive.bx--tag--disabled .bx--tag__close-icon:hover,.bx--tag--interactive.bx--tag--disabled.bx--tag--interactive:hover{background-color:var(--cds-disabled-01,#f4f4f4)}.bx--tag--disabled:hover,.bx--tag--filter.bx--tag--disabled:hover,.bx--tag--interactive.bx--tag--disabled:hover{cursor:not-allowed}.bx--tag__label{overflow:hidden;max-width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--tag--interactive:focus{box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe);outline:0}.bx--tag--interactive:hover{cursor:pointer}.bx--tag--filter{padding-top:0;padding-right:0;padding-bottom:0;cursor:pointer}.bx--tag--filter:hover{outline:0}.bx--tag--interactive{transition:background-color 70ms cubic-bezier(0,0,.38,.9)}.bx--tag__close-icon{display:flex;width:1.5rem;height:1.5rem;flex-shrink:0;align-items:center;justify-content:center;padding:0;border:0;margin:0 0 0 .125rem;background-color:transparent;border-radius:50%;color:currentColor;cursor:pointer;transition:background-color 70ms cubic-bezier(.2,0,.38,.9),box-shadow 70ms cubic-bezier(.2,0,.38,.9)}.bx--tag__close-icon svg{fill:currentColor}.bx--tag__custom-icon{width:1rem;height:1rem;flex-shrink:0;padding:0;border:0;margin-right:var(--cds-spacing-02,.25rem);background-color:transparent;color:currentColor;outline:0}.bx--tag__custom-icon svg{fill:currentColor}.bx--tag--disabled .bx--tag__close-icon{cursor:not-allowed}.bx--tag__close-icon:focus{border-radius:50%;box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe);outline:0}.bx--tag--high-contrast .bx--tag__close-icon:focus{box-shadow:inset 0 0 0 1px var(--cds-inverse-focus-ui,#fff)}.bx--tag--filter.bx--tag--disabled .bx--tag__close-icon:hover{background-color:transparent}.bx--tag--filter.bx--tag--disabled svg{fill:var(--cds-disabled-02,#c6c6c6)}.bx--tag--sm{min-height:1.125rem;padding:0 .5rem}.bx--tag--sm.bx--tag--filter{padding-right:0}.bx--tag--sm .bx--tag__close-icon{width:1.125rem;height:1.125rem;margin-left:.3125rem}.bx--tag.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;background-color:var(--cds-skeleton-01,#e5e5e5);color:var(--cds-text-01,#161616);overflow:hidden;width:3.75rem}.bx--tag.bx--skeleton:active,.bx--tag.bx--skeleton:focus,.bx--tag.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--tag.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--tag.bx--skeleton::before{-webkit-animation:none;animation:none}}.bx--tag.bx--skeleton .bx--tag__close-icon:hover,.bx--tag.bx--skeleton.bx--tag--interactive:hover{background-color:var(--cds-skeleton-01,#e5e5e5)}@media not all and (min-resolution:0.001dpcm){@supports (-webkit-appearance:none) and (stroke-color:transparent){.bx--tag.bx--skeleton{-webkit-transform:translateZ(0);transform:translateZ(0)}}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--tag{outline:1px solid transparent}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--tag__close-icon svg,.bx--tag__custom-icon svg{fill:ButtonText}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--tag__close-icon:focus{color:Highlight;outline:1px solid Highlight}}:host(bx-dropdown){outline:0}:host(bx-dropdown) .bx--assistive-text{left:-100%;top:-100%}:host(bx-dropdown) .bx--label[hidden]{display:none}:host(bx-dropdown) .bx--list-box__menu{top:100%;margin-top:1px}:host(bx-dropdown-item){display:block}:host(bx-dropdown-item) .bx--list-box__menu-item__option{height:100%}:host(bx-dropdown-item[size=sm]){height:2rem}:host(bx-dropdown-item[size=sm]) .bx--list-box__menu-item__option{padding-top:.4375rem;padding-bottom:.4375rem}:host(bx-dropdown-item[size=xl]){height:3rem}:host(bx-dropdown-item[size=xl]) .bx--list-box__menu-item__option{padding-top:.9375rem;padding-bottom:.9375rem}:host(bx-dropdown-item[disabled]) .bx--list-box__menu-item__option{color:var(--cds-disabled-02,#c6c6c6);text-decoration:none}:host(bx-dropdown-item[selected]) .bx--list-box__menu-item__option{color:var(--cds-text-01,#161616)}:host(bx-dropdown-item[selected]) .bx--list-box__menu-item__selected-icon{display:block}:host(bx-dropdown-skeleton) .bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none}:host(bx-dropdown-skeleton) .bx--skeleton:active,:host(bx-dropdown-skeleton) .bx--skeleton:focus,:host(bx-dropdown-skeleton) .bx--skeleton:hover{border:none;cursor:default;outline:0}:host(bx-dropdown-skeleton) .bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){:host(bx-dropdown-skeleton) .bx--skeleton::before{-webkit-animation:none;animation:none}}`
]);
let _$7 = (t2) => t2, _t$8, _t2$3, _t3$2, _t4, _t5;
const {
  prefix: prefix$a
} = settings_1;
let BXDropdown = _decorate([customElement(`${prefix$a}-dropdown`)], function(_initialize, _ValidityMixin) {
  class BXDropdown2 extends _ValidityMixin {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXDropdown2,
    d: [{
      kind: "field",
      key: "_selectedItemContent",
      value() {
        return null;
      }
    }, {
      kind: "field",
      key: "_shouldTriggerBeFocusable",
      value() {
        return true;
      }
    }, {
      kind: "field",
      decorators: [query(`.${prefix$a}--list-box`)],
      key: "_listBoxNode",
      value: void 0
    }, {
      kind: "field",
      decorators: [query('slot[name="helper-text"]')],
      key: "_slotHelperTextNode",
      value: void 0
    }, {
      kind: "field",
      decorators: [query('slot[name="label-text"]')],
      key: "_slotLabelTextNode",
      value: void 0
    }, {
      kind: "method",
      key: "_selectionShouldChange",
      value: function _selectionShouldChange(itemToSelect) {
        return !itemToSelect || itemToSelect.value !== this.value;
      }
    }, {
      kind: "method",
      key: "_selectionDidChange",
      value: function _selectionDidChange(itemToSelect) {
        if (itemToSelect) {
          this.value = itemToSelect.value;
          forEach(this.querySelectorAll(this.constructor.selectorItemSelected), (item) => {
            item.selected = false;
          });
          itemToSelect.selected = true;
          this._assistiveStatusText = this.selectedItemAssistiveText;
          this._handleUserInitiatedToggle(false);
        }
      }
    }, {
      kind: "method",
      key: "_handleClickInner",
      value: function _handleClickInner(event) {
        if (this.shadowRoot.contains(event.target)) {
          this._handleUserInitiatedToggle();
        } else {
          const item = event.target.closest(this.constructor.selectorItem);
          if (this.contains(item)) {
            this._handleUserInitiatedSelectItem(item);
          }
        }
      }
    }, {
      kind: "method",
      key: "_handleKeydownInner",
      value: function _handleKeydownInner(event) {
        const {
          key
        } = event;
        const action = this.constructor.getAction(key);
        if (!this.open) {
          switch (action) {
            case DROPDOWN_KEYBOARD_ACTION.NAVIGATING:
              this._handleUserInitiatedToggle(true);
              this._clearHighlight();
              break;
          }
        } else {
          switch (action) {
            case DROPDOWN_KEYBOARD_ACTION.CLOSING:
              this._handleUserInitiatedToggle(false);
              break;
            case DROPDOWN_KEYBOARD_ACTION.NAVIGATING:
              this._navigate(NAVIGATION_DIRECTION$1[key]);
              break;
          }
        }
      }
    }, {
      kind: "method",
      key: "_handleKeypressInner",
      value: function _handleKeypressInner(event) {
        const {
          key
        } = event;
        const action = this.constructor.getAction(key);
        if (!this.open) {
          switch (action) {
            case DROPDOWN_KEYBOARD_ACTION.TRIGGERING:
              this._handleUserInitiatedToggle(true);
              break;
          }
        } else {
          switch (action) {
            case DROPDOWN_KEYBOARD_ACTION.TRIGGERING:
              {
                const constructor = this.constructor;
                const highlightedItem = this.querySelector(constructor.selectorItemHighlighted);
                if (highlightedItem) {
                  this._handleUserInitiatedSelectItem(highlightedItem);
                } else {
                  this._handleUserInitiatedToggle(false);
                }
              }
              break;
          }
        }
      }
    }, {
      kind: "method",
      decorators: [HostListener("focusout")],
      key: "_handleFocusOut",
      value: function _handleFocusOut(event) {
        if (!this.contains(event.relatedTarget)) {
          this._handleUserInitiatedToggle(false);
        }
      }
    }, {
      kind: "method",
      key: "_handleSlotchangeHelperText",
      value: function _handleSlotchangeHelperText() {
        this.requestUpdate();
      }
    }, {
      kind: "method",
      key: "_handleSlotchangeLabelText",
      value: function _handleSlotchangeLabelText() {
        this.requestUpdate();
      }
    }, {
      kind: "method",
      key: "_handleUserInitiatedSelectItem",
      value: function _handleUserInitiatedSelectItem(item) {
        if (this._selectionShouldChange(item)) {
          const init = {
            bubbles: true,
            composed: true,
            detail: {
              item
            }
          };
          const constructor = this.constructor;
          const beforeSelectEvent = new CustomEvent(constructor.eventBeforeSelect, _objectSpread2(_objectSpread2({}, init), {}, {
            cancelable: true
          }));
          if (this.dispatchEvent(beforeSelectEvent)) {
            this._selectionDidChange(item);
            const afterSelectEvent = new CustomEvent(constructor.eventSelect, init);
            this.dispatchEvent(afterSelectEvent);
          }
        }
      }
    }, {
      kind: "method",
      key: "_handleUserInitiatedToggle",
      value: function _handleUserInitiatedToggle(force = !this.open) {
        const {
          eventBeforeToggle,
          eventToggle
        } = this.constructor;
        const init = {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            open: force
          }
        };
        if (this.dispatchEvent(new CustomEvent(eventBeforeToggle, init))) {
          this.open = force;
          if (this.open) {
            this._assistiveStatusText = this.selectingItemsAssistiveText;
          } else {
            const {
              selectedItemAssistiveText,
              triggerContent,
              _assistiveStatusText: assistiveStatusText,
              _selectedItemContent: selectedItemContent
            } = this;
            const selectedItemText = selectedItemContent && selectedItemContent.textContent || triggerContent;
            if (selectedItemText && assistiveStatusText !== selectedItemAssistiveText) {
              this._assistiveStatusText = selectedItemText;
            }
            forEach(this.querySelectorAll(this.constructor.selectorItemHighlighted), (item) => {
              item.highlighted = false;
            });
          }
          this.requestUpdate();
          this.dispatchEvent(new CustomEvent(eventToggle, init));
        }
      }
    }, {
      kind: "method",
      key: "_clearHighlight",
      value: function _clearHighlight() {
        forEach(this.querySelectorAll(this.constructor.selectorItem), (item) => {
          item.highlighted = false;
        });
      }
    }, {
      kind: "method",
      key: "_navigate",
      value: function _navigate(direction) {
        const constructor = this.constructor;
        const items = this.querySelectorAll(constructor.selectorItem);
        const highlightedItem = this.querySelector(constructor.selectorItemHighlighted);
        const highlightedIndex = indexOf(items, highlightedItem);
        let nextIndex = highlightedIndex + direction;
        if (nextIndex < 0) {
          nextIndex = items.length - 1;
        }
        if (nextIndex >= items.length) {
          nextIndex = 0;
        }
        forEach(items, (item, i2) => {
          item.highlighted = i2 === nextIndex;
        });
        const nextItem = items[nextIndex];
        nextItem.scrollIntoView({
          block: "nearest"
        });
        const nextItemText = nextItem.textContent;
        if (nextItemText) {
          this._assistiveStatusText = nextItemText;
        }
        this.requestUpdate();
      }
    }, {
      kind: "method",
      key: "_renderPrecedingTriggerContent",
      value: function _renderPrecedingTriggerContent() {
        return void 0;
      }
    }, {
      kind: "method",
      key: "_renderTriggerContent",
      value: function _renderTriggerContent() {
        const {
          triggerContent,
          _selectedItemContent: selectedItemContent
        } = this;
        return html(_t$8 || (_t$8 = _$7` <span id="trigger-label" class="${0}--list-box__label">${0}</span> `), prefix$a, selectedItemContent || triggerContent);
      }
    }, {
      kind: "method",
      key: "_renderFollowingTriggerContent",
      value: function _renderFollowingTriggerContent() {
        return void 0;
      }
    }, {
      kind: "method",
      key: "_handleFormdata",
      value: function _handleFormdata(event) {
        const {
          formData
        } = event;
        const {
          disabled,
          name,
          value
        } = this;
        if (!disabled) {
          formData.append(name, value);
        }
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "color-scheme",
        reflect: true
      })],
      key: "colorScheme",
      value() {
        return FORM_ELEMENT_COLOR_SCHEME.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "disabled",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "helper-text"
      })],
      key: "helperText",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "invalid",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "label-text"
      })],
      key: "labelText",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "name",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "open",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "required",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "required-validity-message"
      })],
      key: "requiredValidityMessage",
      value() {
        return "Please fill out this field.";
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "selecting-items-assistive-text"
      })],
      key: "selectingItemsAssistiveText",
      value() {
        return "Selecting items. Use up and down arrow keys to navigate.";
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "selected-item-assistive-text"
      })],
      key: "selectedItemAssistiveText",
      value() {
        return "Selected an item.";
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "size",
      value() {
        return DROPDOWN_SIZE.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "toggle-label-closed"
      })],
      key: "toggleLabelClosed",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "toggle-label-open"
      })],
      key: "toggleLabelOpen",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "trigger-content"
      })],
      key: "triggerContent",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "type",
      value() {
        return DROPDOWN_TYPE.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "validity-message"
      })],
      key: "validityMessage",
      value() {
        return "";
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "value",
      value() {
        return "";
      }
    }, {
      kind: "method",
      key: "createRenderRoot",
      value: function createRenderRoot() {
        var _$exec;
        return this.attachShadow({
          mode: "open",
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ["", 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "shouldUpdate",
      value: function shouldUpdate(changedProperties) {
        const {
          selectorItem
        } = this.constructor;
        if (changedProperties.has("size")) {
          forEach(this.querySelectorAll(selectorItem), (elem) => {
            elem.size = this.size;
          });
        }
        if (changedProperties.has("value")) {
          forEach(this.querySelectorAll(selectorItem), (elem) => {
            elem.selected = elem.value === this.value;
          });
          const item = find(this.querySelectorAll(selectorItem), (elem) => elem.value === this.value);
          if (item) {
            const range = this.ownerDocument.createRange();
            range.selectNodeContents(item);
            this._selectedItemContent = range.cloneContents();
          } else {
            this._selectedItemContent = null;
          }
        }
        return true;
      }
    }, {
      kind: "method",
      key: "updated",
      value: function updated(changedProperties) {
        const {
          helperText,
          type
        } = this;
        const inline = type === DROPDOWN_TYPE.INLINE;
        const {
          selectorItem
        } = this.constructor;
        if (changedProperties.has("disabled")) {
          const {
            disabled
          } = this;
          forEach(this.querySelectorAll(selectorItem), (elem) => {
            elem.disabled = disabled;
          });
        }
        if ((changedProperties.has("helperText") || changedProperties.has("type")) && helperText && inline) {
          console.warn("Found `helperText` property/attribute usage in inline mode, that is not supported, at:", this);
        }
      }
    }, {
      kind: "method",
      key: "render",
      value: function render2() {
        const {
          colorScheme,
          disabled,
          helperText,
          invalid,
          labelText,
          open,
          toggleLabelClosed,
          toggleLabelOpen,
          size,
          type,
          validityMessage,
          _assistiveStatusText: assistiveStatusText,
          _shouldTriggerBeFocusable: shouldTriggerBeFocusable,
          _handleClickInner: handleClickInner,
          _handleKeydownInner: handleKeydownInner,
          _handleKeypressInner: handleKeypressInner,
          _handleSlotchangeHelperText: handleSlotchangeHelperText,
          _handleSlotchangeLabelText: handleSlotchangeLabelText,
          _slotHelperTextNode: slotHelperTextNode,
          _slotLabelTextNode: slotLabelTextNode
        } = this;
        const inline = type === DROPDOWN_TYPE.INLINE;
        const selectedItemsCount = this.querySelectorAll(this.constructor.selectorItemSelected).length;
        const classes = classMap({
          [`${prefix$a}--dropdown`]: true,
          [`${prefix$a}--list-box`]: true,
          [`${prefix$a}--list-box--${colorScheme}`]: colorScheme,
          [`${prefix$a}--list-box--disabled`]: disabled,
          [`${prefix$a}--list-box--inline`]: inline,
          [`${prefix$a}--list-box--expanded`]: open,
          [`${prefix$a}--list-box--${size}`]: size,
          [`${prefix$a}--dropdown--invalid`]: invalid,
          [`${prefix$a}--dropdown--inline`]: inline,
          [`${prefix$a}--dropdown--selected`]: selectedItemsCount > 0
        });
        const labelClasses = classMap({
          [`${prefix$a}--label`]: true,
          [`${prefix$a}--label--disabled`]: disabled
        });
        const helperClasses = classMap({
          [`${prefix$a}--form__helper-text`]: true,
          [`${prefix$a}--form__helper-text--disabled`]: disabled
        });
        const iconContainerClasses = classMap({
          [`${prefix$a}--list-box__menu-icon`]: true,
          [`${prefix$a}--list-box__menu-icon--open`]: open
        });
        const toggleLabel = (open ? toggleLabelOpen : toggleLabelClosed) || void 0;
        const hasHelperText = helperText || slotHelperTextNode && slotHelperTextNode.assignedNodes().length > 0;
        const hasLabelText = labelText || slotLabelTextNode && slotLabelTextNode.assignedNodes().length > 0;
        const helper = !invalid ? html(_t2$3 || (_t2$3 = _$7` <div part="helper-text" class="${0}" ?hidden="${0}"> <slot name="helper-text" @slotchange="${0}">${0}</slot> </div> `), helperClasses, inline || !hasHelperText, handleSlotchangeHelperText, helperText) : html(_t3$2 || (_t3$2 = _$7` <div part="validity-message" class="${0}"> <slot name="validity-message">${0}</slot> </div> `), `${prefix$a}--form-requirement`, validityMessage);
        const validityIcon = !invalid ? void 0 : svgResultCarbonIcon$2({
          class: `${prefix$a}--list-box__invalid-icon`,
          "aria-label": toggleLabel
        });
        const menuBody = !open ? void 0 : html(_t4 || (_t4 = _$7` <div id="menu-body" part="menu-body" class="${0}--list-box__menu" role="listbox" tabindex="-1"> <slot></slot> </div> `), prefix$a);
        return html(_t5 || (_t5 = _$7` <label part="label-text" class="${0}" ?hidden="${0}"> <slot name="label-text" @slotchange="${0}">${0}</slot> </label> <div role="listbox" class="${0}" ?data-invalid="${0}" @click="${0}" @keydown="${0}" @keypress="${0}"> ${0} <div part="trigger-button" role="${0}" class="${0}--list-box__field" tabindex="${0}" aria-labelledby="trigger-label" aria-expanded="${0}" aria-haspopup="listbox" aria-owns="menu-body" aria-controls="menu-body"> ${0}${0}${0} <div class="${0}">${0}</div> </div> ${0} </div> ${0} <div class="${0}--assistive-text" role="status" aria-live="assertive" aria-relevant="additions text"> ${0} </div> `), labelClasses, !hasLabelText, handleSlotchangeLabelText, labelText, classes, invalid, handleClickInner, handleKeydownInner, handleKeypressInner, validityIcon, ifDefined(!shouldTriggerBeFocusable ? void 0 : "button"), prefix$a, ifDefined(!shouldTriggerBeFocusable ? void 0 : "0"), String(open), this._renderPrecedingTriggerContent(), this._renderTriggerContent(), this._renderFollowingTriggerContent(), iconContainerClasses, svgResultCarbonIcon$3({
          "aria-label": toggleLabel
        }), menuBody, helper, prefix$a, assistiveStatusText);
      }
    }, {
      kind: "field",
      static: true,
      key: "TRIGGER_KEYS",
      value() {
        return /* @__PURE__ */ new Set([" ", "Enter"]);
      }
    }, {
      kind: "get",
      static: true,
      key: "selectorItemHighlighted",
      value: function selectorItemHighlighted() {
        return `${prefix$a}-dropdown-item[highlighted]`;
      }
    }, {
      kind: "get",
      static: true,
      key: "selectorItem",
      value: function selectorItem() {
        return `${prefix$a}-dropdown-item`;
      }
    }, {
      kind: "get",
      static: true,
      key: "selectorItemSelected",
      value: function selectorItemSelected() {
        return `${prefix$a}-dropdown-item[selected]`;
      }
    }, {
      kind: "get",
      static: true,
      key: "eventBeforeSelect",
      value: function eventBeforeSelect() {
        return `${prefix$a}-dropdown-beingselected`;
      }
    }, {
      kind: "get",
      static: true,
      key: "eventSelect",
      value: function eventSelect() {
        return `${prefix$a}-dropdown-selected`;
      }
    }, {
      kind: "get",
      static: true,
      key: "eventBeforeToggle",
      value: function eventBeforeToggle() {
        return `${prefix$a}-dropdown-beingtoggled`;
      }
    }, {
      kind: "get",
      static: true,
      key: "eventToggle",
      value: function eventToggle() {
        return `${prefix$a}-dropdown-toggled`;
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$5;
      }
    }, {
      kind: "method",
      static: true,
      key: "getAction",
      value: function getAction(key) {
        if (key === "Escape") {
          return DROPDOWN_KEYBOARD_ACTION.CLOSING;
        }
        if (key in NAVIGATION_DIRECTION$1) {
          return DROPDOWN_KEYBOARD_ACTION.NAVIGATING;
        }
        if (this.TRIGGER_KEYS.has(key)) {
          return DROPDOWN_KEYBOARD_ACTION.TRIGGERING;
        }
        return DROPDOWN_KEYBOARD_ACTION.NONE;
      }
    }]
  };
}, ValidityMixin(HostListenerMixin(FormMixin(FocusMixin(LitElement)))));
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
let ExpCarbonDropdown = class extends BXDropdown {
};
ExpCarbonDropdown.styles = [
  BXDropdown.styles,
  css`
      .bx--list-box__field:focus {
        outline: 2px solid #532fb0;
      }

      .bx--list-box {
        background-color: white;
      }
    `
];
ExpCarbonDropdown = __decorateClass$3([
  customElement("exp-carbon-dropdown")
], ExpCarbonDropdown);
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const svgResultCarbonIcon$1 = ({ children, ...attrs } = {}) => svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread(attrs)}" aria-hidden="true" width="16" height="16" viewBox="0 0 32 32">${children}${children}${children}<path d="M13 24L4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z"></path></svg>`;
let _$6 = (t2) => t2, _t$7;
const {
  prefix: prefix$9
} = settings_1;
_decorate([customElement(`${prefix$9}-dropdown-item`)], function(_initialize, _LitElement) {
  class BXDropdownItem extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXDropdownItem,
    d: [{
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "disabled",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "highlighted",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "selected",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "size",
      value() {
        return DROPDOWN_SIZE.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "value",
      value() {
        return "";
      }
    }, {
      kind: "method",
      key: "render",
      value: function render2() {
        const {
          selected
        } = this;
        return html(_t$7 || (_t$7 = _$6` <div class="${0}--list-box__menu-item__option"> <slot></slot> ${0} </div> `), prefix$9, !selected ? void 0 : svgResultCarbonIcon$1({
          part: "selected-icon",
          class: `${prefix$9}--list-box__menu-item__selected-icon`
        }));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$5;
      }
    }]
  };
}, LitElement);
/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
let BUTTON_KIND;
(function(BUTTON_KIND2) {
  BUTTON_KIND2["PRIMARY"] = "primary";
  BUTTON_KIND2["SECONDARY"] = "secondary";
  BUTTON_KIND2["TERTIARY"] = "tertiary";
  BUTTON_KIND2["GHOST"] = "ghost";
  BUTTON_KIND2["DANGER"] = "danger";
  BUTTON_KIND2["DANGER_TERTIARY"] = "danger-tertiary";
  BUTTON_KIND2["DANGER_GHOST"] = "danger-ghost";
})(BUTTON_KIND || (BUTTON_KIND = {}));
let BUTTON_SIZE;
(function(BUTTON_SIZE2) {
  BUTTON_SIZE2["REGULAR"] = "";
  BUTTON_SIZE2["SMALL"] = "sm";
  BUTTON_SIZE2["EXTRA_LARGE"] = "xl";
  BUTTON_SIZE2["FIELD"] = "field";
})(BUTTON_SIZE || (BUTTON_SIZE = {}));
let BUTTON_ICON_LAYOUT;
(function(BUTTON_ICON_LAYOUT2) {
  BUTTON_ICON_LAYOUT2["REGULAR"] = "";
  BUTTON_ICON_LAYOUT2["CONDENSED"] = "condensed";
})(BUTTON_ICON_LAYOUT || (BUTTON_ICON_LAYOUT = {}));
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$4 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--assistive-text,.bx--visually-hidden{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--body{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);background-color:var(--cds-ui-background,#fff);color:var(--cds-text-01,#161616);line-height:1}.bx--body *,.bx--body ::after,.bx--body ::before{box-sizing:inherit}.bx--text-truncate--end{display:inline-block;overflow:hidden;width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--text-truncate--front{display:inline-block;overflow:hidden;width:100%;direction:rtl;text-overflow:ellipsis;white-space:nowrap}.bx--btn{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);position:relative;display:inline-flex;max-width:20rem;min-height:3rem;flex-shrink:0;align-items:center;justify-content:space-between;padding:calc(.875rem - 3px) 63px calc(.875rem - 3px) 15px;margin:0;border-radius:0;cursor:pointer;outline:0;text-align:left;text-decoration:none;transition:background 70ms cubic-bezier(0,0,.38,.9),box-shadow 70ms cubic-bezier(0,0,.38,.9),border-color 70ms cubic-bezier(0,0,.38,.9),outline 70ms cubic-bezier(0,0,.38,.9);vertical-align:top}.bx--btn *,.bx--btn ::after,.bx--btn ::before{box-sizing:inherit}.bx--btn.bx--btn--disabled,.bx--btn.bx--btn--disabled:focus,.bx--btn.bx--btn--disabled:hover,.bx--btn:disabled,.bx--btn:focus:disabled,.bx--btn:hover:disabled{border-color:var(--cds-disabled-02,#c6c6c6);background:var(--cds-disabled-02,#c6c6c6);box-shadow:none;color:var(--cds-disabled-03,#8d8d8d);cursor:not-allowed}.bx--btn .bx--btn__icon{position:absolute;right:1rem;width:1rem;height:1rem;flex-shrink:0}.bx--btn::-moz-focus-inner{padding:0;border:0}.bx--btn--primary{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-interactive-01,#0f62fe);color:var(--cds-text-04,#fff)}.bx--btn--primary:hover{background-color:var(--cds-hover-primary,#0353e9)}.bx--btn--primary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--primary:active{background-color:var(--cds-active-primary,#002d9c)}.bx--btn--primary .bx--btn__icon,.bx--btn--primary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--primary:hover{color:var(--cds-text-04,#fff)}.bx--btn--secondary{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-interactive-02,#393939);color:var(--cds-text-04,#fff)}.bx--btn--secondary:hover{background-color:var(--cds-hover-secondary,#4c4c4c)}.bx--btn--secondary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--secondary:active{background-color:var(--cds-active-secondary,#6f6f6f)}.bx--btn--secondary .bx--btn__icon,.bx--btn--secondary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--secondary:focus,.bx--btn--secondary:hover{color:var(--cds-text-04,#fff)}.bx--btn--tertiary{border-width:1px;border-style:solid;border-color:var(--cds-interactive-03,#0f62fe);background-color:transparent;color:var(--cds-interactive-03,#0f62fe)}.bx--btn--tertiary:hover{background-color:var(--cds-hover-tertiary,#0353e9)}.bx--btn--tertiary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--tertiary:active{background-color:var(--cds-active-tertiary,#002d9c)}.bx--btn--tertiary .bx--btn__icon,.bx--btn--tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--tertiary:hover{color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary:focus{background-color:var(--cds-interactive-03,#0f62fe);color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary:active{border-color:transparent;background-color:var(--cds-active-tertiary,#002d9c);color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary.bx--btn--disabled,.bx--btn--tertiary.bx--btn--disabled:focus,.bx--btn--tertiary.bx--btn--disabled:hover,.bx--btn--tertiary:disabled,.bx--btn--tertiary:focus:disabled,.bx--btn--tertiary:hover:disabled{background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--ghost{border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;color:var(--cds-link-01,#0f62fe);padding:calc(.875rem - 3px) 16px}.bx--btn--ghost:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--btn--ghost:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--ghost:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--ghost .bx--btn__icon,.bx--btn--ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--ghost .bx--btn__icon{position:static;margin-left:.5rem}.bx--btn--ghost:active,.bx--btn--ghost:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--btn--ghost:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--ghost.bx--btn--disabled,.bx--btn--ghost.bx--btn--disabled:focus,.bx--btn--ghost.bx--btn--disabled:hover,.bx--btn--ghost:disabled,.bx--btn--ghost:focus:disabled,.bx--btn--ghost:hover:disabled{border-color:transparent;background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--ghost.bx--btn--sm{padding:calc(.375rem - 3px) 16px}.bx--btn--ghost.bx--btn--field,.bx--btn--ghost.bx--btn--md{padding:calc(.675rem - 3px) 16px}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline-style:dotted}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline:1px solid transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline-style:dotted}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{display:inline-block}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::before{transition:none}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{width:0;height:0;border-style:solid;content:""}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@supports (-ms-accelerator:true){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@supports (-ms-ime-align:auto){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{border:1px solid transparent}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{content:attr(aria-label)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::after{content:none}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover::before{opacity:1}@-webkit-keyframes tooltip-fade{from{opacity:0}to{opacity:1}}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus.bx--tooltip--a11y::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger svg,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover svg{fill:currentColor}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled.bx--tooltip--a11y::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled.bx--tooltip--a11y::before{overflow:hidden;margin:-1px;clip:rect(0,0,0,0);opacity:0}.bx--btn.bx--btn--icon-only:not(.bx--tooltip--hidden) .bx--assistive-text{pointer-events:all}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{border-color:var(--cds-focus,#0f62fe)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:active:not([disabled]){border-color:transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline-color:transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:active,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:focus,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:hover{cursor:not-allowed;fill:var(--cds-disabled-03,#8d8d8d)}.bx--tooltip__trigger.bx--btn--icon-only--top{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--top:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--top::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--top::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--top:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--top:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--top:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--top:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--top:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--top:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{top:-.8125rem;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::after{top:-.8125rem;left:0;-webkit-transform:translate(0,-100%);transform:translate(0,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::after{top:-.8125rem;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::after{top:-.8125rem;right:0;left:auto;-webkit-transform:translate(0,-100%);transform:translate(0,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--right{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--right:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--right::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--right::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--right:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--right:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--right:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--right:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--right:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--right:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::after{bottom:-.8125rem;left:0;-webkit-transform:translate(0,100%);transform:translate(0,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::after{bottom:-.8125rem;right:0;left:auto;-webkit-transform:translate(0,100%);transform:translate(0,100%)}.bx--tooltip__trigger.bx--btn--icon-only--left{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--left:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--left::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--left::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--left:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--left:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--left:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--left:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--left:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--left:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--btn--icon-only{padding-right:.9375rem;padding-left:.9375rem}.bx--btn--icon-only .bx--btn__icon{position:static}.bx--btn--icon-only.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--icon-only.bx--btn--ghost .bx--btn__icon{margin:0}.bx--btn--icon-only.bx--btn--selected{background:var(--cds-selected-ui,#e0e0e0)}.bx--btn path[data-icon-path=inner-path]{fill:none}.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:var(--cds-icon-01,#161616)}.bx--btn--ghost.bx--btn--icon-only[disabled] .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only[disabled] .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn.bx--btn--icon-only.bx--btn--ghost[disabled]:hover .bx--btn__icon{fill:var(--cds-disabled-03,#8d8d8d)}.bx--btn--ghost.bx--btn--icon-only[disabled]{cursor:not-allowed}.bx--btn--field.bx--btn--icon-only,.bx--btn--md.bx--btn--icon-only{padding-right:.6875rem;padding-left:.6875rem}.bx--btn--sm.bx--btn--icon-only{padding-right:.4375rem;padding-left:.4375rem}.bx--btn--danger{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-danger-01,#da1e28);color:var(--cds-text-04,#fff)}.bx--btn--danger:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger .bx--btn__icon,.bx--btn--danger .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger:hover{color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary,.bx--btn--danger-tertiary{border-width:1px;border-style:solid;border-color:var(--cds-danger-02,#da1e28);background-color:transparent;color:var(--cds-danger-02,#da1e28)}.bx--btn--danger--tertiary:hover,.bx--btn--danger-tertiary:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger--tertiary:focus,.bx--btn--danger-tertiary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger--tertiary:active,.bx--btn--danger-tertiary:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger--tertiary .bx--btn__icon,.bx--btn--danger--tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn--danger-tertiary .bx--btn__icon,.bx--btn--danger-tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger--tertiary:hover,.bx--btn--danger-tertiary:hover{border-color:var(--cds-hover-danger,#b81921);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary:focus,.bx--btn--danger-tertiary:focus{background-color:var(--cds-danger-01,#da1e28);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary:active,.bx--btn--danger-tertiary:active{border-color:var(--cds-active-danger,#750e13);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary.bx--btn--disabled,.bx--btn--danger--tertiary.bx--btn--disabled:focus,.bx--btn--danger--tertiary.bx--btn--disabled:hover,.bx--btn--danger--tertiary:disabled,.bx--btn--danger--tertiary:focus:disabled,.bx--btn--danger--tertiary:hover:disabled,.bx--btn--danger-tertiary.bx--btn--disabled,.bx--btn--danger-tertiary.bx--btn--disabled:focus,.bx--btn--danger-tertiary.bx--btn--disabled:hover,.bx--btn--danger-tertiary:disabled,.bx--btn--danger-tertiary:focus:disabled,.bx--btn--danger-tertiary:hover:disabled{background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--danger--ghost,.bx--btn--danger-ghost{border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;color:var(--cds-danger-02,#da1e28);padding:calc(.875rem - 3px) 16px}.bx--btn--danger--ghost:hover,.bx--btn--danger-ghost:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger--ghost:focus,.bx--btn--danger-ghost:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger--ghost:active,.bx--btn--danger-ghost:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--danger--ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn--danger-ghost .bx--btn__icon,.bx--btn--danger-ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--danger-ghost .bx--btn__icon{position:static;margin-left:.5rem}.bx--btn--danger--ghost:active,.bx--btn--danger--ghost:hover,.bx--btn--danger-ghost:active,.bx--btn--danger-ghost:hover{color:var(--cds-text-04,#fff)}.bx--btn--danger--ghost.bx--btn--disabled,.bx--btn--danger--ghost.bx--btn--disabled:focus,.bx--btn--danger--ghost.bx--btn--disabled:hover,.bx--btn--danger--ghost:disabled,.bx--btn--danger--ghost:focus:disabled,.bx--btn--danger--ghost:hover:disabled,.bx--btn--danger-ghost.bx--btn--disabled,.bx--btn--danger-ghost.bx--btn--disabled:focus,.bx--btn--danger-ghost.bx--btn--disabled:hover,.bx--btn--danger-ghost:disabled,.bx--btn--danger-ghost:focus:disabled,.bx--btn--danger-ghost:hover:disabled{border-color:transparent;background:0 0;color:var(--cds-disabled-02,#c6c6c6);outline:0}.bx--btn--danger--ghost.bx--btn--sm,.bx--btn--danger-ghost.bx--btn--sm{padding:calc(.375rem - 3px) 16px}.bx--btn--danger--ghost.bx--btn--field,.bx--btn--danger--ghost.bx--btn--md,.bx--btn--danger-ghost.bx--btn--field,.bx--btn--danger-ghost.bx--btn--md{padding:calc(.675rem - 3px) 16px}.bx--btn--sm{min-height:2rem;padding:calc(.375rem - 3px) 60px calc(.375rem - 3px) 12px}.bx--btn--xl:not(.bx--btn--icon-only){align-items:baseline;padding-top:var(--cds-spacing-05,1rem);padding-right:var(--cds-spacing-10,4rem);padding-left:var(--cds-spacing-05,1rem);min-height:5rem}.bx--btn--lg:not(.bx--btn--icon-only){align-items:baseline;padding-top:var(--cds-spacing-05,1rem);padding-right:var(--cds-spacing-10,4rem);padding-left:var(--cds-spacing-05,1rem);min-height:4rem}.bx--btn--field,.bx--btn--md{min-height:2.5rem;padding:calc(.675rem - 3px) 60px calc(.675rem - 3px) 12px}.bx--btn--expressive{font-size:var(--cds-body-short-02-font-size,1rem);font-weight:var(--cds-body-short-02-font-weight,400);line-height:var(--cds-body-short-02-line-height,1.375);letter-spacing:var(--cds-body-short-02-letter-spacing,0);min-height:3rem}.bx--btn--icon-only.bx--btn--expressive{padding:12px 13px}.bx--btn.bx--btn--expressive .bx--btn__icon{width:1.25rem;height:1.25rem}.bx--btn-set .bx--btn.bx--btn--expressive{max-width:20rem}.bx--btn.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:9.375rem}.bx--btn.bx--skeleton:active,.bx--btn.bx--skeleton:focus,.bx--btn.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--btn.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--btn.bx--skeleton::before{-webkit-animation:none;animation:none}}.bx--btn-set{display:flex}.bx--btn-set--stacked{flex-direction:column}.bx--btn-set .bx--btn{width:100%;max-width:12.25rem}.bx--btn-set .bx--btn:not(:focus){box-shadow:-.0625rem 0 0 0 var(--cds-button-separator,#e0e0e0)}.bx--btn-set .bx--btn:first-of-type:not(:focus){box-shadow:inherit}.bx--btn-set .bx--btn:focus+.bx--btn{box-shadow:inherit}.bx--btn-set--stacked .bx--btn:not(:focus){box-shadow:0 -.0625rem 0 0 var(--cds-button-separator,#e0e0e0)}.bx--btn-set--stacked .bx--btn:first-of-type:not(:focus){box-shadow:inherit}.bx--btn-set .bx--btn.bx--btn--disabled{box-shadow:-.0625rem 0 0 0 var(--cds-disabled-03,#8d8d8d)}.bx--btn-set .bx--btn.bx--btn--disabled:first-of-type{box-shadow:none}.bx--btn-set--stacked .bx--btn.bx--btn--disabled{box-shadow:0 -.0625rem 0 0 var(--cds-disabled-03,#8d8d8d)}.bx--btn-set--stacked .bx--btn.bx--btn--disabled:first-of-type{box-shadow:none}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn:focus{color:Highlight;outline:1px solid Highlight}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:ButtonText}}:host(bx-btn),:host(bx-modal-footer-button){display:inline-flex;max-width:20rem;outline:0}:host(bx-btn) .bx--btn,:host(bx-modal-footer-button) .bx--btn{flex-grow:1;max-width:100%}:host(bx-btn) ::slotted([slot=icon]),:host(bx-modal-footer-button) ::slotted([slot=icon]){fill:currentColor;position:absolute;right:1rem;flex-shrink:0}:host(bx-btn)[isExpressive] ::slotted([slot=icon]),:host(bx-modal-footer-button)[isExpressive] ::slotted([slot=icon]){width:1.25rem;height:1.25rem}:host(bx-btn)[icon-layout=condensed] .bx--btn,:host(bx-modal-footer-button)[icon-layout=condensed] .bx--btn{padding-right:2.4375rem}:host(bx-btn) .bx--btn--icon-only ::slotted([slot=icon]),:host(bx-modal-footer-button) .bx--btn--icon-only ::slotted([slot=icon]){position:static}:host(bx-btn)[kind=danger-ghost] ::slotted([slot=icon]),:host(bx-btn)[kind=ghost] ::slotted([slot=icon]),:host(bx-modal-footer-button)[kind=danger-ghost] ::slotted([slot=icon]),:host(bx-modal-footer-button)[kind=ghost] ::slotted([slot=icon]){position:static;margin-left:.5rem}:host(bx-btn)[kind=danger-ghost][icon-layout=condensed] .bx--btn,:host(bx-btn)[kind=ghost][icon-layout=condensed] .bx--btn,:host(bx-modal-footer-button)[kind=danger-ghost][icon-layout=condensed] .bx--btn,:host(bx-modal-footer-button)[kind=ghost][icon-layout=condensed] .bx--btn{padding-right:1rem}:host(bx-btn[kind=ghost]) .bx--btn--ghost:active,:host(bx-btn[kind=ghost]:hover) .bx--btn--ghost{outline:0}`
]);
let _$5 = (t2) => t2, _t$6, _t2$2, _t3$1;
const {
  prefix: prefix$8
} = settings_1;
let BXButton = _decorate([customElement(`${prefix$8}-btn`)], function(_initialize, _HostListenerMixin) {
  class BXButton2 extends _HostListenerMixin {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXButton2,
    d: [{
      kind: "field",
      key: "_hasIcon",
      value() {
        return false;
      }
    }, {
      kind: "field",
      key: "_hasMainContent",
      value() {
        return false;
      }
    }, {
      kind: "method",
      key: "_handleSlotChange",
      value: function _handleSlotChange({
        target
      }) {
        const {
          name
        } = target;
        const hasContent = target.assignedNodes().some((node) => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
        this[name === "icon" ? "_hasIcon" : "_hasMainContent"] = hasContent;
        this.requestUpdate();
      }
    }, {
      kind: "method",
      decorators: [HostListener("click", {
        capture: true
      })],
      key: "_handleDisabledClick",
      value: function _handleDisabledClick(event) {
        const {
          disabled
        } = this;
        if (disabled) {
          event.stopPropagation();
        }
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "autofocus",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "disabled",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "download",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "href",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "hreflang",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true,
        attribute: "icon-layout"
      })],
      key: "iconLayout",
      value() {
        return BUTTON_ICON_LAYOUT.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "isExpressive",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "kind",
      value() {
        return BUTTON_KIND.PRIMARY;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "link-role"
      })],
      key: "linkRole",
      value() {
        return "button";
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "ping",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "rel",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "size",
      value() {
        return BUTTON_SIZE.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "target",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "type",
      value: void 0
    }, {
      kind: "method",
      key: "createRenderRoot",
      value: function createRenderRoot() {
        var _$exec;
        return this.attachShadow({
          mode: "open",
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ["", 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render2() {
        const {
          autofocus,
          disabled,
          download,
          href,
          hreflang,
          isExpressive,
          linkRole,
          kind,
          ping,
          rel,
          size,
          target,
          type,
          _hasIcon: hasIcon,
          _hasMainContent: hasMainContent,
          _handleSlotChange: handleSlotChange
        } = this;
        const classes = classMap({
          [`${prefix$8}--btn`]: true,
          [`${prefix$8}--btn--${kind}`]: kind,
          [`${prefix$8}--btn--disabled`]: disabled,
          [`${prefix$8}--btn--icon-only`]: hasIcon && !hasMainContent,
          [`${prefix$8}--btn--sm`]: size === "sm" && !isExpressive,
          [`${prefix$8}--btn--xl`]: size === "xl",
          [`${prefix$8}--btn--field`]: size === "field" && !isExpressive,
          [`${prefix$8}-ce--btn--has-icon`]: hasIcon,
          [`${prefix$8}--btn--expressive`]: isExpressive
        });
        if (href) {
          return disabled ? html(_t$6 || (_t$6 = _$5` <p id="button" part="button" class="${0}"> <slot @slotchange="${0}"></slot> <slot name="icon" @slotchange="${0}"></slot> </p> `), classes, handleSlotChange, handleSlotChange) : html(_t2$2 || (_t2$2 = _$5` <a id="button" part="button" role="${0}" class="${0}" download="${0}" href="${0}" hreflang="${0}" ping="${0}" rel="${0}" target="${0}" type="${0}"> <slot @slotchange="${0}"></slot> <slot name="icon" @slotchange="${0}"></slot> </a> `), ifNonNull(linkRole), classes, ifNonNull(download), ifNonNull(href), ifNonNull(hreflang), ifNonNull(ping), ifNonNull(rel), ifNonNull(target), ifNonNull(type), handleSlotChange, handleSlotChange);
        }
        return html(_t3$1 || (_t3$1 = _$5` <button id="button" part="button" class="${0}" ?autofocus="${0}" ?disabled="${0}" type="${0}"> <slot @slotchange="${0}"></slot> <slot name="icon" @slotchange="${0}"></slot> </button> `), classes, autofocus, disabled, ifNonNull(type), handleSlotChange, handleSlotChange);
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$4;
      }
    }]
  };
}, HostListenerMixin(FocusMixin(LitElement)));
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
let ExpCarbonButton = class extends BXButton {
};
ExpCarbonButton.styles = [
  BXButton.styles,
  css`
      .bx--btn--tertiary {
        border-color: var(--cds-interactive-03 ,#532fb0);
        color: var(--cds-interactive-03, #532fb0);
        background-color: transparent;
      }

      .bx--btn--tertiary:hover {
        background-color: var(--cds-interactive-03, #532fb0);
        color: var(--cds-interactive-03, #ffffff);
      }

      .bx--btn--tertiary:focus {
        background-color: var(--cds-interactive-03, #532fb0);
        color: var(--cds-interactive-03, #ffffff);
        border-color: var(--cds-focus, #532fb0);
        box-shadow: inset 0 0 0 1px var(--cds-focus, #532fb0),inset 0 0 0 2px var(--cds-ui-background,#fff);
      }

      .bx--btn--danger--tertiary {
        border-color: var(--cds-interactive-03 ,#EC0000);
        color: var(--cds-interactive-03, #EC0000);
        background-color: transparent;
      }

      .bx--btn--danger--tertiary:hover {
        background-color: var(--cds-interactive-03, #EC0000);
        color: var(--cds-interactive-03, #ffffff);
      }

      .bx--btn--danger--tertiary:focus, .bx--btn--danger-tertiary:focus {
        background-color: var(--cds-interactive-03, #EC0000);
        color: var(--cds-interactive-03, #ffffff);
        border-color: var(--cds-focus, #EC0000);
        box-shadow: inset 0 0 0 1px var(--cds-focus, #EC0000),inset 0 0 0 2px var(--cds-ui-background,#fff);
      }
    `
];
ExpCarbonButton = __decorateClass$2([
  customElement("exp-carbon-button")
], ExpCarbonButton);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let ExpLoadingCircles = class extends s {
  render() {
    return $`
      <div class="overlay">
        <div class="overlay__inner">
          <div class="overlay__content">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      </div>
    `;
  }
};
ExpLoadingCircles.styles = [
  r$2`
      .overlay {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.5);
      }
      .overlay__inner {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: absolute;
      }
      .overlay__content {
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .lds-roller {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
      }
      .lds-roller div:after {
        content: " ";
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #fff;
        margin: -4px 0 0 -4px;
      }
      .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
      }
      .lds-roller div:nth-child(1):after {
        top: 63px;
        left: 63px;
      }
      .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
      }
      .lds-roller div:nth-child(2):after {
        top: 68px;
        left: 56px;
      }
      .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
      }
      .lds-roller div:nth-child(3):after {
        top: 71px;
        left: 48px;
      }
      .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
      }
      .lds-roller div:nth-child(4):after {
        top: 72px;
        left: 40px;
      }
      .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
      }
      .lds-roller div:nth-child(5):after {
        top: 71px;
        left: 32px;
      }
      .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
      }
      .lds-roller div:nth-child(6):after {
        top: 68px;
        left: 24px;
      }
      .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
      }
      .lds-roller div:nth-child(7):after {
        top: 63px;
        left: 17px;
      }
      .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
      }
      .lds-roller div:nth-child(8):after {
        top: 56px;
        left: 12px;
      }
      @keyframes lds-roller {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `
];
ExpLoadingCircles = __decorateClass$1([
  n$1("exp-loading-circles")
], ExpLoadingCircles);
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$3 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--fieldset{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;margin-bottom:2rem}.bx--fieldset *,.bx--fieldset ::after,.bx--fieldset ::before{box-sizing:inherit}.bx--fieldset--no-margin{margin-bottom:0}.bx--form-item,:host(bx-form-item){font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:flex;flex:1 1 auto;flex-direction:column;align-items:flex-start}.bx--label{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px);display:inline-block;margin-bottom:.5rem;color:var(--cds-text-02,#525252);font-weight:400;line-height:1rem;vertical-align:baseline}.bx--label *,.bx--label ::after,.bx--label ::before{box-sizing:inherit}.bx--label .bx--tooltip__trigger{font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px)}.bx--label.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:4.6875rem;height:.875rem}.bx--label.bx--skeleton:active,.bx--label.bx--skeleton:focus,.bx--label.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--label.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--label.bx--skeleton::before{-webkit-animation:none;animation:none}}input[type=number]{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px}@media screen and (prefers-contrast){.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline-style:dotted}}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper--warn~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box--warning~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--number__input-wrapper--warning~.bx--form-requirement,.bx--select--warning .bx--select-input__wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper--warning>.bx--text-input~.bx--form-requirement,.bx--text-input__field-wrapper--warning~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{display:block;overflow:visible;max-height:12.5rem;font-weight:400}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{color:var(--cds-text-error,#da1e28)}.bx--form--fluid .bx--text-input__field-wrapper--warning,.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]{display:block}.bx--form--fluid .bx--fieldset{margin:0}.bx--form--fluid input[data-invalid]{outline:0}.bx--form--fluid .bx--form-requirement{padding:.5rem 2.5rem .5rem 1rem;margin:0}input:not(output):not([data-invalid]):-moz-ui-invalid{box-shadow:none}.bx--form-requirement{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-caption-01-font-size,.75rem);font-weight:var(--cds-caption-01-font-weight,400);line-height:var(--cds-caption-01-line-height,1.33333);letter-spacing:var(--cds-caption-01-letter-spacing,.32px);display:none;overflow:hidden;max-height:0;margin:.25rem 0 0}.bx--form-requirement *,.bx--form-requirement ::after,.bx--form-requirement ::before{box-sizing:inherit}.bx--select--inline .bx--form__helper-text{margin-top:0}.bx--form__helper-text{font-size:var(--cds-helper-text-01-font-size,.75rem);line-height:var(--cds-helper-text-01-line-height,1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing,.32px);z-index:0;width:100%;margin-top:.25rem;color:var(--cds-text-02,#525252);opacity:1}.bx--form__helper-text--disabled,.bx--label--disabled{color:var(--cds-disabled-02,#c6c6c6)}fieldset[disabled] .bx--form__helper-text,fieldset[disabled] .bx--label{color:var(--cds-disabled-02,#c6c6c6)}`
]);
let _$4 = (t2) => t2, _t$5;
const {
  prefix: prefix$7
} = settings_1;
_decorate([customElement(`${prefix$7}-form-item`)], function(_initialize, _LitElement) {
  class BXFormItem extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXFormItem,
    d: [{
      kind: "method",
      key: "render",
      value: function render2() {
        return html(_t$5 || (_t$5 = _$4`<slot></slot>`));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$3;
      }
    }]
  };
}, LitElement);
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$2 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--link{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:inline-flex;color:var(--cds-link-01,#0f62fe);outline:0;text-decoration:none;transition:color 70ms cubic-bezier(.2,0,.38,.9)}.bx--link *,.bx--link ::after,.bx--link ::before{box-sizing:inherit}.bx--link:hover{color:var(--cds-hover-primary-text,#0043ce);text-decoration:underline}.bx--link:active,.bx--link:active:visited,.bx--link:active:visited:hover{color:var(--cds-text-01,#161616);text-decoration:underline}.bx--link:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--link:focus{outline-style:dotted}}.bx--link:visited{color:var(--cds-link-01,#0f62fe)}.bx--link:visited:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--link--disabled,.bx--link--disabled:hover{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed;font-weight:400;text-decoration:none}.bx--link--disabled *,.bx--link--disabled ::after,.bx--link--disabled ::before,.bx--link--disabled:hover *,.bx--link--disabled:hover ::after,.bx--link--disabled:hover ::before{box-sizing:inherit}.bx--link.bx--link--visited:visited{color:var(--cds-visited-link,#8a3ffc)}.bx--link.bx--link--visited:visited:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--link.bx--link--inline{text-decoration:underline}.bx--link.bx--link--inline:focus,.bx--link.bx--link--inline:visited{text-decoration:none}.bx--link--disabled.bx--link--inline{text-decoration:underline}.bx--link--sm{font-size:var(--cds-helper-text-01-font-size,.75rem);line-height:var(--cds-helper-text-01-line-height,1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing,.32px)}.bx--link--lg{font-size:var(--cds-body-short-02-font-size,1rem);font-weight:var(--cds-body-short-02-font-weight,400);line-height:var(--cds-body-short-02-line-height,1.375);letter-spacing:var(--cds-body-short-02-letter-spacing,0)}.bx--link__icon{display:inline-flex;align-self:center;margin-left:var(--cds-spacing-03,.5rem)}:host(bx-link){outline:0}:host(bx-link) .bx--link--disabled{color:var(--cds-disabled-02,#c6c6c6)}:host(bx-link) .bx--link__icon[hidden]{display:none}`
]);
let _2 = (t2) => t2, _t$4, _t2$1, _t3;
const {
  prefix: prefix$6
} = settings_1;
let LINK_SIZE;
(function(LINK_SIZE2) {
  LINK_SIZE2["REGULAR"] = "";
  LINK_SIZE2["SMALL"] = "sm";
  LINK_SIZE2["LARGE"] = "lg";
})(LINK_SIZE || (LINK_SIZE = {}));
let BXLink = _decorate([customElement(`${prefix$6}-link`)], function(_initialize, _FocusMixin) {
  class BXLink2 extends _FocusMixin {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXLink2,
    d: [{
      kind: "field",
      key: "_hasIcon",
      value() {
        return false;
      }
    }, {
      kind: "method",
      key: "_handleSlotChange",
      value: function _handleSlotChange({
        target
      }) {
        const {
          name
        } = target;
        const hasContent = target.assignedNodes().some((node) => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
        this[name === "icon" ? "_hasIcon" : ""] = hasContent;
        this.requestUpdate();
      }
    }, {
      kind: "field",
      decorators: [query("#link")],
      key: "_linkNode",
      value: void 0
    }, {
      kind: "get",
      key: "_classes",
      value: function _classes() {
        const {
          disabled,
          size
        } = this;
        return classMap({
          [`${prefix$6}--link`]: true,
          [`${prefix$6}--link--disabled`]: disabled,
          [`${prefix$6}--link--${size}`]: size
        });
      }
    }, {
      kind: "method",
      key: "_handleClick",
      value: function _handleClick(_3) {
      }
    }, {
      kind: "method",
      key: "_renderInner",
      value: function _renderInner() {
        const {
          _hasIcon: hasIcon,
          _handleSlotChange: handleSlotChange
        } = this;
        return html(_t$4 || (_t$4 = _2` <slot @slotchange="${0}"></slot> <div ?hidden="${0}" class="${0}--link__icon"><slot name="icon" @slotchange="${0}"></slot></div> `), handleSlotChange, !hasIcon, prefix$6, handleSlotChange);
      }
    }, {
      kind: "method",
      key: "_renderDisabledLink",
      value: function _renderDisabledLink() {
        const {
          _classes: classes
        } = this;
        return html(_t2$1 || (_t2$1 = _2` <p id="link" part="link" class="${0}">${0}</p> `), classes, this._renderInner());
      }
    }, {
      kind: "method",
      key: "_renderLink",
      value: function _renderLink() {
        const {
          download,
          href,
          hreflang,
          linkRole,
          ping,
          rel,
          target,
          type,
          _classes: classes,
          _handleClick: handleClick
        } = this;
        return html(_t3 || (_t3 = _2` <a id="link" role="${0}" class="${0}" part="link" download="${0}" href="${0}" hreflang="${0}" ping="${0}" rel="${0}" target="${0}" type="${0}" @click="${0}"> ${0} </a> `), ifNonNull(linkRole), classes, ifNonNull(download), ifNonNull(href), ifNonNull(hreflang), ifNonNull(ping), ifNonNull(rel), ifNonNull(target), ifNonNull(type), handleClick, this._renderInner());
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "disabled",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "download",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "href",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "hreflang",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        attribute: "link-role"
      })],
      key: "linkRole",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "ping",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "rel",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "size",
      value() {
        return LINK_SIZE.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "target",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        reflect: true
      })],
      key: "type",
      value: void 0
    }, {
      kind: "method",
      key: "createRenderRoot",
      value: function createRenderRoot() {
        var _$exec;
        return this.attachShadow({
          mode: "open",
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ["", 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render2() {
        const {
          disabled
        } = this;
        return disabled ? this._renderDisabledLink() : this._renderLink();
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$2;
      }
    }]
  };
}, FocusMixin(LitElement));
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$1 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--tile-group{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline}.bx--tile-group *,.bx--tile-group ::after,.bx--tile-group ::before{box-sizing:inherit}.bx--tile,:host(bx-expandable-tile),:host(bx-tile){display:block;min-width:8rem;min-height:4rem;padding:var(--cds-spacing-05,1rem);background-color:var(--cds-ui-01,#f4f4f4);outline:2px solid transparent;outline-offset:-2px}.bx--tile:focus,:focus:host(bx-expandable-tile),:focus:host(bx-tile){outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--tile:focus,:focus:host(bx-expandable-tile),:focus:host(bx-tile){outline-style:dotted}}.bx--tile--light,:host(bx-expandable-tile[color-scheme=light]),:host(bx-tile[color-scheme=light]){background-color:var(--cds-ui-02,#fff)}.bx--tile--clickable,.bx--tile--expandable,.bx--tile--selectable,:host(bx-expandable-tile){cursor:pointer;transition:150ms cubic-bezier(.2,0,.38,.9)}.bx--tile--clickable:hover,.bx--tile--expandable:hover,.bx--tile--selectable:hover,:hover:host(bx-expandable-tile){background:var(--cds-hover-ui,#e5e5e5)}.bx--tile--expandable .bx--link,:host(bx-expandable-tile) .bx--link{color:var(--cds-link-secondary,#0043ce)}.bx--tile--clickable:focus,.bx--tile--expandable:focus,:focus:host(bx-expandable-tile){outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--tile--clickable:focus,.bx--tile--expandable:focus,:focus:host(bx-expandable-tile){outline-style:dotted}}.bx--tile--clickable:focus .bx--tile__checkmark,.bx--tile--clickable:hover .bx--tile__checkmark,.bx--tile--expandable:focus .bx--tile__checkmark,.bx--tile--expandable:hover .bx--tile__checkmark,:focus:host(bx-expandable-tile) .bx--tile__checkmark,:hover:host(bx-expandable-tile) .bx--tile__checkmark{opacity:1}.bx--tile--expandable::-moz-focus-inner,:host(bx-expandable-tile)::-moz-focus-inner{border:0}.bx--tile--clickable{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);color:var(--cds-text-01,#161616);text-decoration:none}.bx--tile--clickable *,.bx--tile--clickable ::after,.bx--tile--clickable ::before{box-sizing:inherit}.bx--tile--clickable:active,.bx--tile--clickable:hover,.bx--tile--clickable:visited,.bx--tile--clickable:visited:hover{color:var(--cds-text-01,#161616);text-decoration:none}.bx--tile--clickable.bx--link--disabled{color:var(--cds-disabled-02,#c6c6c6)}.bx--tile--clickable:hover.bx--link--disabled{display:block;background-color:var(--cds-disabled-01,#f4f4f4);color:var(--cds-disabled-02,#c6c6c6)}.bx--tile--selectable{position:relative;padding-right:3rem;border:1px solid transparent}.bx--tile__checkmark,.bx--tile__chevron{position:absolute;border:none;background:0 0;transition:110ms cubic-bezier(.2,0,.38,.9)}.bx--tile__checkmark{top:1rem;right:1rem;height:1rem;opacity:0}.bx--tile__checkmark svg{border-radius:50%;fill:var(--cds-icon-02,#525252)}.bx--tile__checkmark:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--tile__checkmark:focus{outline-style:dotted}}.bx--tile__checkmark--persistent{opacity:1}.bx--tile__chevron{position:absolute;right:1rem;bottom:1rem;display:flex;height:1rem;align-items:flex-end}.bx--tile__chevron svg{margin-left:.5rem;fill:var(--cds-ui-05,#161616);-webkit-transform-origin:center;transform-origin:center;transition:110ms cubic-bezier(.2,0,.38,.9)}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tile__chevron svg{fill:ButtonText}}.bx--tile__chevron:hover{cursor:pointer}.bx--tile__chevron:focus{outline:0}.bx--tile--expandable,:host(bx-expandable-tile){position:relative;overflow:hidden;width:100%;border:0;color:inherit;font-size:inherit;text-align:left;transition:max-height 150ms cubic-bezier(.2,0,.38,.9)}.bx--tile-content__above-the-fold,:host(bx-expandable-tile) ::slotted(bx-tile-above-the-fold-content){display:block}.bx--tile-content__below-the-fold,:host(bx-expandable-tile) ::slotted(bx-tile-below-the-fold-content){display:block;opacity:0;transition:opacity 110ms cubic-bezier(.2,0,.38,.9),visibility 110ms cubic-bezier(.2,0,.38,.9);visibility:hidden}.bx--tile--is-expanded,:host(bx-expandable-tile[expanded]){overflow:visible;transition:max-height 110ms cubic-bezier(.2,0,.38,.9)}.bx--tile--is-expanded .bx--tile__chevron svg,:host(bx-expandable-tile[expanded]) .bx--tile__chevron svg{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.bx--tile--is-expanded .bx--tile-content__below-the-fold,.bx--tile--is-expanded :host(bx-expandable-tile) ::slotted(bx-tile-below-the-fold-content),:host(bx-expandable-tile) .bx--tile--is-expanded ::slotted(bx-tile-below-the-fold-content),:host(bx-expandable-tile) :host(bx-expandable-tile[expanded]) ::slotted(bx-tile-below-the-fold-content),:host(bx-expandable-tile[expanded]) .bx--tile-content__below-the-fold,:host(bx-expandable-tile[expanded]) :host(bx-expandable-tile) ::slotted(bx-tile-below-the-fold-content){opacity:1;transition:opacity 110ms cubic-bezier(.2,0,.38,.9),visibility 110ms cubic-bezier(.2,0,.38,.9);visibility:inherit}@media not all and (min-resolution:0.001dpcm){@supports (-webkit-appearance:none) and (stroke-color:transparent){.bx--tile--is-expanded .bx--tile-content__below-the-fold,.bx--tile--is-expanded :host(bx-expandable-tile) ::slotted(bx-tile-below-the-fold-content),:host(bx-expandable-tile) .bx--tile--is-expanded ::slotted(bx-tile-below-the-fold-content),:host(bx-expandable-tile) :host(bx-expandable-tile[expanded]) ::slotted(bx-tile-below-the-fold-content),:host(bx-expandable-tile[expanded]) .bx--tile-content__below-the-fold,:host(bx-expandable-tile[expanded]) :host(bx-expandable-tile) ::slotted(bx-tile-below-the-fold-content){overflow-y:auto}}}.bx--tile--is-selected{border:1px solid var(--cds-ui-05,#161616)}.bx--tile--is-selected .bx--tile__checkmark{opacity:1}.bx--tile--is-selected .bx--tile__checkmark svg{fill:var(--cds-ui-05,#161616)}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tile--is-selected .bx--tile__checkmark svg{fill:ButtonText}}.bx--tile-content{width:100%;height:100%}.bx--tile-input{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--tile-input:focus+.bx--tile,.bx--tile-input:focus+:host(bx-expandable-tile),.bx--tile-input:focus+:host(bx-tile){outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--tile-input:focus+.bx--tile,.bx--tile-input:focus+:host(bx-expandable-tile),.bx--tile-input:focus+:host(bx-tile){outline-style:dotted}}.bx--tile--disabled.bx--tile--selectable{background-color:var(--cds-ui-01,#f4f4f4);color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed}.bx--tile--disabled.bx--tile--selectable.bx--tile--light,.bx--tile--disabled.bx--tile--selectable:host(bx-expandable-tile[color-scheme=light]),.bx--tile--disabled.bx--tile--selectable:host(bx-tile[color-scheme=light]){background-color:var(--cds-ui-02,#fff)}.bx--tile--disabled.bx--tile--is-selected{outline-color:var(--cds-disabled-02,#c6c6c6)}.bx--tile--disabled.bx--tile--is-selected .bx--tile__checkmark svg{fill:var(--cds-disabled-02,#c6c6c6)}.bx--link{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:inline-flex;color:var(--cds-link-01,#0f62fe);outline:0;text-decoration:none;transition:color 70ms cubic-bezier(.2,0,.38,.9)}.bx--link *,.bx--link ::after,.bx--link ::before{box-sizing:inherit}.bx--link:hover{color:var(--cds-hover-primary-text,#0043ce);text-decoration:underline}.bx--link:active,.bx--link:active:visited,.bx--link:active:visited:hover{color:var(--cds-text-01,#161616);text-decoration:underline}.bx--link:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--link:focus{outline-style:dotted}}.bx--link:visited{color:var(--cds-link-01,#0f62fe)}.bx--link:visited:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--link--disabled,.bx--link--disabled:hover{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed;font-weight:400;text-decoration:none}.bx--link--disabled *,.bx--link--disabled ::after,.bx--link--disabled ::before,.bx--link--disabled:hover *,.bx--link--disabled:hover ::after,.bx--link--disabled:hover ::before{box-sizing:inherit}.bx--link.bx--link--visited:visited{color:var(--cds-visited-link,#8a3ffc)}.bx--link.bx--link--visited:visited:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--link.bx--link--inline{text-decoration:underline}.bx--link.bx--link--inline:focus,.bx--link.bx--link--inline:visited{text-decoration:none}.bx--link--disabled.bx--link--inline{text-decoration:underline}.bx--link--sm{font-size:var(--cds-helper-text-01-font-size,.75rem);line-height:var(--cds-helper-text-01-line-height,1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing,.32px)}.bx--link--lg{font-size:var(--cds-body-short-02-font-size,1rem);font-weight:var(--cds-body-short-02-font-weight,400);line-height:var(--cds-body-short-02-line-height,1.375);letter-spacing:var(--cds-body-short-02-letter-spacing,0)}.bx--link__icon{display:inline-flex;align-self:center;margin-left:var(--cds-spacing-03,.5rem)}:host(bx-clickable-tile){display:block;display:content;outline:0}:host(bx-clickable-tile) .bx--link--disabled{display:block}:host(bx-clickable-tile) .bx--tile,:host(bx-clickable-tile) :host(bx-expandable-tile),:host(bx-clickable-tile) :host(bx-tile){padding:1rem;outline:2px solid transparent}:host(bx-clickable-tile) .bx--tile--clickable{transition:150ms cubic-bezier(.2,0,.38,.9)}:host(bx-clickable-tile) .bx--tile--clickable:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){:host(bx-clickable-tile) .bx--tile--clickable:focus{outline-style:dotted}}:host(bx-radio-tile){display:block;display:content;outline:0}:host(bx-selectable-tile){display:block;display:content;outline:0}:host(bx-radio-tile) .bx--tile-input:checked~.bx--tile--selectable .bx--tile__checkmark,:host(bx-selectable-tile) .bx--tile-input:checked~.bx--tile--selectable .bx--tile__checkmark{opacity:1}:host(bx-expandable-tile){position:relative}:host(bx-expandable-tile) .bx-ce--expandable-tile--below-the-fold-content{max-height:0;transition:max-height 110ms cubic-bezier(.2,0,.38,.9)}:host(bx-expandable-tile[expanded]) ::slotted(bx-tile-below-the-fold-content){opacity:1;transition:110ms cubic-bezier(.2,0,.38,.9)}`
]);
const {
  prefix: prefix$5
} = settings_1;
_decorate([customElement(`${prefix$5}-clickable-tile`)], function(_initialize, _BXLink) {
  class BXClickableTile extends _BXLink {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXClickableTile,
    d: [{
      kind: "get",
      key: "_classes",
      value: function _classes() {
        const {
          colorScheme,
          disabled
        } = this;
        return classMap({
          [`${prefix$5}--link`]: true,
          [`${prefix$5}--link--disabled`]: disabled,
          [`${prefix$5}--tile`]: true,
          [`${prefix$5}--tile--clickable`]: true,
          [`${prefix$5}--tile--${colorScheme}`]: colorScheme
        });
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "color-scheme",
        reflect: true
      })],
      key: "colorScheme",
      value() {
        return FORM_ELEMENT_COLOR_SCHEME.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "link-role"
      })],
      key: "linkRole",
      value() {
        return "button";
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$1;
      }
    }]
  };
}, BXLink);
let _$3 = (t2) => t2, _t$3;
const {
  prefix: prefix$4
} = settings_1;
_decorate([customElement(`${prefix$4}-expandable-tile`)], function(_initialize, _HostListenerMixin) {
  class BXExpandableTile extends _HostListenerMixin {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXExpandableTile,
    d: [{
      kind: "field",
      key: "_belowTheContentHeight",
      value() {
        return 0;
      }
    }, {
      kind: "method",
      key: "_handleSlotChangeBelowTheFoldContent",
      value: function _handleSlotChangeBelowTheFoldContent(event) {
        this._belowTheContentHeight = event.target.assignedNodes().reduce((acc, item) => {
          var _offsetHeight;
          return acc + ((_offsetHeight = item.offsetHeight) !== null && _offsetHeight !== void 0 ? _offsetHeight : 0);
        }, 0);
        this.requestUpdate();
      }
    }, {
      kind: "field",
      decorators: [HostListener("click")],
      key: "_handleClick",
      value() {
        return () => {
          const expanded = !this.expanded;
          const init = {
            bubbles: true,
            composed: true,
            detail: {
              expanded
            }
          };
          const constructor = this.constructor;
          const beforeChangeEvent = new CustomEvent(constructor.eventBeforeToggle, _objectSpread2(_objectSpread2({}, init), {}, {
            cancelable: true
          }));
          if (this.dispatchEvent(beforeChangeEvent)) {
            this.expanded = expanded;
            const afterChangeEvent = new CustomEvent(constructor.eventToggle, init);
            this.dispatchEvent(afterChangeEvent);
          }
        };
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "color-scheme",
        reflect: true
      })],
      key: "colorScheme",
      value() {
        return FORM_ELEMENT_COLOR_SCHEME.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "expanded",
      value() {
        return false;
      }
    }, {
      kind: "method",
      key: "createRenderRoot",
      value: function createRenderRoot() {
        var _$exec;
        return this.attachShadow({
          mode: "open",
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ["", 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render2() {
        const {
          expanded,
          _belowTheContentHeight: belowTheContentHeight,
          _handleSlotChangeBelowTheFoldContent: handleSlotChangeBelowTheFoldContent
        } = this;
        return html(_t$3 || (_t$3 = _$3` <button class="${0}--tile__chevron" aria-labelledby="above-the-fold-content" aria-controls="below-the-fold-content" aria-expanded="${0}"> ${0} </button> <div id="content" class="${0}--tile-content"> <div><slot name="above-the-fold-content"></slot></div> <div class="${0}-ce--expandable-tile--below-the-fold-content" style="${0}"> <slot @slotchange="${0}"></slot> </div> </div> `), prefix$4, String(Boolean(expanded)), svgResultCarbonIcon$3({
          id: "icon"
        }), prefix$4, prefix$4, ifDefined(!expanded ? void 0 : `max-height: ${belowTheContentHeight}px`), handleSlotChangeBelowTheFoldContent);
      }
    }, {
      kind: "get",
      static: true,
      key: "eventBeforeToggle",
      value: function eventBeforeToggle() {
        return `${prefix$4}-expandable-tile-beingtoggled`;
      }
    }, {
      kind: "get",
      static: true,
      key: "eventToggle",
      value: function eventToggle() {
        return `${prefix$4}-expandable-tile-toggled`;
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$1;
      }
    }]
  };
}, HostListenerMixin(FocusMixin(LitElement)));
/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
let NAVIGATION_DIRECTION;
(function(NAVIGATION_DIRECTION2) {
  NAVIGATION_DIRECTION2[NAVIGATION_DIRECTION2["BACKWARD"] = -1] = "BACKWARD";
  NAVIGATION_DIRECTION2[NAVIGATION_DIRECTION2["FORWARD"] = 1] = "FORWARD";
})(NAVIGATION_DIRECTION || (NAVIGATION_DIRECTION = {}));
class RadioGroupManager {
  constructor(document2) {
    _defineProperty(this, "_groups", {});
    this.constructor._instances.set(document2, this);
  }
  shouldBeFocusable(radio) {
    if (radio.checked) {
      return true;
    }
    const {
      name
    } = radio;
    const group = this._groups[name];
    const hasSelectedItemInGroup = group && Array.from(group).some((item) => item.checked);
    if (hasSelectedItemInGroup) {
      return false;
    }
    const isFirstInGroup = !group || group.size === 1 || this.getSortedGroup(radio)[0] === radio;
    return isFirstInGroup;
  }
  getSortedGroup(radio) {
    const group = this._groups[radio.name];
    return group && Array.from(group).sort((lhs, rhs) => {
      const comparisonResult = lhs.compareDocumentPosition(rhs);
      if (comparisonResult & Node.DOCUMENT_POSITION_FOLLOWING || comparisonResult & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        return -1;
      }
      if (comparisonResult & Node.DOCUMENT_POSITION_PRECEDING || comparisonResult & Node.DOCUMENT_POSITION_CONTAINS) {
        return 1;
      }
      return 0;
    });
  }
  add(radio) {
    const {
      name
    } = radio;
    if (name) {
      const groups = this._groups;
      if (!groups[name]) {
        groups[name] = /* @__PURE__ */ new Set();
      }
      groups[name].add(radio);
    }
    return this;
  }
  delete(radio, name = radio.name) {
    const group = this._groups[name];
    return !group ? false : group.delete(radio);
  }
  select(radio) {
    const group = this._groups[radio.name];
    if (group) {
      radio.checked = true;
      radio.tabIndex = 0;
      radio.focus();
      group.forEach((item) => {
        if (radio !== item) {
          item.checked = false;
          item.tabIndex = -1;
        }
      });
    }
  }
  navigate(radio, direction) {
    const sortedGroup = this.getSortedGroup(radio);
    let newIndex = sortedGroup.indexOf(radio) + direction;
    if (newIndex < 0) {
      newIndex = sortedGroup.length - 1;
    } else if (newIndex >= sortedGroup.length) {
      newIndex = 0;
    }
    return sortedGroup[newIndex];
  }
  static get(document2) {
    const found = this._instances.get(document2);
    return found || new RadioGroupManager(document2);
  }
}
_defineProperty(RadioGroupManager, "_instances", /* @__PURE__ */ new WeakMap());
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const svgResultCarbonIcon = ({ children, ...attrs } = {}) => svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread(attrs)}" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">${children}${children}${children}<path d="M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"></path><path d="M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z" data-icon-path="inner-path" opacity="0"></path></svg>`;
let _$2 = (t2) => t2, _t$2, _t2;
const {
  prefix: prefix$3
} = settings_1;
let BXSelectableTile = _decorate([customElement(`${prefix$3}-selectable-tile`)], function(_initialize, _FocusMixin) {
  class BXSelectableTile2 extends _FocusMixin {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXSelectableTile2,
    d: [{
      kind: "field",
      decorators: [query("input")],
      key: "_inputNode",
      value: void 0
    }, {
      kind: "field",
      key: "_inputType",
      value() {
        return "checkbox";
      }
    }, {
      kind: "method",
      key: "_handleChange",
      value: function _handleChange() {
        this.selected = this._inputNode.checked;
      }
    }, {
      kind: "field",
      decorators: [property({
        attribute: "checkmark-label"
      })],
      key: "checkmarkLabel",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        attribute: "color-scheme",
        reflect: true
      })],
      key: "colorScheme",
      value() {
        return FORM_ELEMENT_COLOR_SCHEME.REGULAR;
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "name",
      value: void 0
    }, {
      kind: "field",
      decorators: [property({
        type: Boolean,
        reflect: true
      })],
      key: "selected",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [property()],
      key: "value",
      value: void 0
    }, {
      kind: "method",
      key: "createRenderRoot",
      value: function createRenderRoot() {
        var _$exec;
        return this.attachShadow({
          mode: "open",
          delegatesFocus: Number(((_$exec = /Safari\/(\d+)/.exec(navigator.userAgent)) !== null && _$exec !== void 0 ? _$exec : ["", 0])[1]) <= 537
        });
      }
    }, {
      kind: "method",
      key: "render",
      value: function render2() {
        const {
          checkmarkLabel,
          colorScheme,
          name,
          selected,
          value,
          _inputType: inputType,
          _handleChange: handleChange
        } = this;
        const classes = classMap({
          [`${prefix$3}--tile`]: true,
          [`${prefix$3}--tile--selectable`]: true,
          [`${prefix$3}--tile--${colorScheme}`]: colorScheme
        });
        return html(_t$2 || (_t$2 = _$2` <input type="${0}" id="input" class="${0}--tile-input" tabindex="-1" name="${0}" value="${0}" .checked="${0}" @change="${0}"> <label for="input" class="${0}" tabindex="0"> <div class="${0}--tile__checkmark"> ${0} </div> <div class="${0}--tile-content"><slot></slot></div> </label> `), inputType, prefix$3, ifNonNull(name), ifNonNull(value), selected, handleChange, classes, prefix$3, svgResultCarbonIcon({
          children: !checkmarkLabel ? void 0 : svg(_t2 || (_t2 = _$2`<title>${0}</title>`), checkmarkLabel)
        }), prefix$3);
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$1;
      }
    }]
  };
}, FocusMixin(LitElement));
const {
  prefix: prefix$2
} = settings_1;
const navigationDirectionForKey = {
  ArrowUp: NAVIGATION_DIRECTION.BACKWARD,
  Up: NAVIGATION_DIRECTION.BACKWARD,
  ArrowDown: NAVIGATION_DIRECTION.FORWARD,
  Down: NAVIGATION_DIRECTION.FORWARD
};
_decorate([customElement(`${prefix$2}-radio-tile`)], function(_initialize, _HostListenerMixin) {
  class BXRadioTile extends _HostListenerMixin {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXRadioTile,
    d: [{
      kind: "field",
      key: "_inputType",
      value() {
        return "radio";
      }
    }, {
      kind: "method",
      key: "_attachManager",
      value: function _attachManager() {
        if (!this._manager) {
          this._manager = RadioGroupManager.get(this.getRootNode({
            composed: true
          }));
        }
        const {
          name,
          _inputNode: inputNode,
          _manager: manager
        } = this;
        if (inputNode && name) {
          manager.add(inputNode);
        }
      }
    }, {
      kind: "method",
      key: "_detachManager",
      value: function _detachManager() {
        const {
          _inputNode: inputNode,
          _manager: manager
        } = this;
        if (inputNode && manager) {
          manager.delete(inputNode);
        }
      }
    }, {
      kind: "field",
      decorators: [HostListener("keydown")],
      key: "_handleKeydown",
      value() {
        return (event) => {
          const {
            _inputNode: inputNode
          } = this;
          const manager = this._manager;
          if (inputNode && manager) {
            const navigationDirection = navigationDirectionForKey[event.key];
            if (navigationDirection) {
              manager.select(manager.navigate(inputNode, navigationDirection));
              event.preventDefault();
            }
            if (event.key === " " || event.key === "Enter") {
              manager.select(inputNode);
            }
          }
        };
      }
    }, {
      kind: "method",
      key: "_handleChange",
      value: function _handleChange() {
        _get(_getPrototypeOf(BXRadioTile.prototype), "_handleChange", this).call(this);
        if (this._manager) {
          this._manager.select(this._inputNode);
        }
      }
    }, {
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        _get(_getPrototypeOf(BXRadioTile.prototype), "connectedCallback", this).call(this);
        this._attachManager();
      }
    }, {
      kind: "method",
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._detachManager();
        _get(_getPrototypeOf(BXRadioTile.prototype), "disconnectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "shouldUpdate",
      value: function shouldUpdate(changedProperties) {
        if (changedProperties.has("name")) {
          this._detachManager();
        }
        return true;
      }
    }, {
      kind: "method",
      key: "updated",
      value: function updated(changedProperties) {
        if (changedProperties.has("name")) {
          this._attachManager();
        }
      }
    }]
  };
}, HostListenerMixin(BXSelectableTile));
let _$1 = (t2) => t2, _t$1;
const {
  prefix: prefix$1
} = settings_1;
_decorate([customElement(`${prefix$1}-tile`)], function(_initialize, _LitElement) {
  class BXTile extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXTile,
    d: [{
      kind: "field",
      decorators: [property({
        attribute: "color-scheme",
        reflect: true
      })],
      key: "colorScheme",
      value() {
        return FORM_ELEMENT_COLOR_SCHEME.REGULAR;
      }
    }, {
      kind: "method",
      key: "render",
      value: function render2() {
        return html(_t$1 || (_t$1 = _$1`<slot></slot>`));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$1;
      }
    }]
  };
}, LitElement);
let _ = (t2) => t2, _t;
const {
  prefix
} = settings_1;
_decorate([customElement(`${prefix}-tile-group`)], function(_initialize, _LitElement) {
  class BXTileGroup extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXTileGroup,
    d: [{
      kind: "method",
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.hasAttribute("role")) {
          this.setAttribute("role", "group");
        }
        _get(_getPrototypeOf(BXTileGroup.prototype), "connectedCallback", this).call(this);
      }
    }, {
      kind: "method",
      key: "render",
      value: function render2() {
        return html(_t || (_t = _`<slot></slot>`));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles$1;
      }
    }]
  };
}, LitElement);
var styles = /* @__PURE__ */ (() => '.cds--grid{margin-right:auto;margin-left:auto;max-width:99rem;padding-right:1rem;padding-left:1rem}@media (min-width: 42rem){.cds--grid{padding-right:2rem;padding-left:2rem}}@media (min-width: 99rem){.cds--grid{padding-right:2.5rem;padding-left:2.5rem}}@media (min-width: 99rem){.cds--grid--full-width{max-width:100%}}.cds--row{display:flex;flex-wrap:wrap;margin-right:-1rem;margin-left:-1rem}.cds--row-padding [class*=cds--col],.cds--col-padding{padding-top:1rem;padding-bottom:1rem}.cds--grid--condensed [class*=cds--col]{padding-top:.03125rem;padding-bottom:.03125rem}.cds--col{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col,.cds--grid--condensed .cds--col{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col,.cds--grid--narrow .cds--col{padding-right:1rem;padding-left:0}.cds--col-sm-0{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-sm-0,.cds--grid--condensed .cds--col-sm-0{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-sm-0,.cds--grid--narrow .cds--col-sm-0{padding-right:1rem;padding-left:0}.cds--col-sm-1{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-sm-1,.cds--grid--condensed .cds--col-sm-1{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-sm-1,.cds--grid--narrow .cds--col-sm-1{padding-right:1rem;padding-left:0}.cds--col-sm-2{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-sm-2,.cds--grid--condensed .cds--col-sm-2{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-sm-2,.cds--grid--narrow .cds--col-sm-2{padding-right:1rem;padding-left:0}.cds--col-sm-3{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-sm-3,.cds--grid--condensed .cds--col-sm-3{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-sm-3,.cds--grid--narrow .cds--col-sm-3{padding-right:1rem;padding-left:0}.cds--col-sm-4{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-sm-4,.cds--grid--condensed .cds--col-sm-4{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-sm-4,.cds--grid--narrow .cds--col-sm-4{padding-right:1rem;padding-left:0}.cds--col-sm,.cds--col-sm--auto{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-sm,.cds--grid--condensed .cds--col-sm,.cds--row--condensed .cds--col-sm--auto,.cds--grid--condensed .cds--col-sm--auto{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-sm,.cds--grid--narrow .cds--col-sm,.cds--row--narrow .cds--col-sm--auto,.cds--grid--narrow .cds--col-sm--auto{padding-right:1rem;padding-left:0}.cds--col,.cds--col-sm{max-width:100%;flex-basis:0;flex-grow:1}.cds--col--auto,.cds--col-sm--auto{width:auto;max-width:100%;flex:1 0 0%}.cds--col-sm-0{display:none}.cds--col-sm-1{display:block;max-width:25%;flex:0 0 25%}.cds--col-sm-2{display:block;max-width:50%;flex:0 0 50%}.cds--col-sm-3{display:block;max-width:75%;flex:0 0 75%}.cds--col-sm-4{display:block;max-width:100%;flex:0 0 100%}.cds--offset-sm-0{margin-left:0}.cds--offset-sm-1{margin-left:25%}.cds--offset-sm-2{margin-left:50%}.cds--offset-sm-3{margin-left:75%}.cds--col-md-0{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-md-0,.cds--grid--condensed .cds--col-md-0{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-md-0,.cds--grid--narrow .cds--col-md-0{padding-right:1rem;padding-left:0}.cds--col-md-1{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-md-1,.cds--grid--condensed .cds--col-md-1{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-md-1,.cds--grid--narrow .cds--col-md-1{padding-right:1rem;padding-left:0}.cds--col-md-2{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-md-2,.cds--grid--condensed .cds--col-md-2{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-md-2,.cds--grid--narrow .cds--col-md-2{padding-right:1rem;padding-left:0}.cds--col-md-3{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-md-3,.cds--grid--condensed .cds--col-md-3{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-md-3,.cds--grid--narrow .cds--col-md-3{padding-right:1rem;padding-left:0}.cds--col-md-4{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-md-4,.cds--grid--condensed .cds--col-md-4{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-md-4,.cds--grid--narrow .cds--col-md-4{padding-right:1rem;padding-left:0}.cds--col-md-5{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-md-5,.cds--grid--condensed .cds--col-md-5{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-md-5,.cds--grid--narrow .cds--col-md-5{padding-right:1rem;padding-left:0}.cds--col-md-6{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-md-6,.cds--grid--condensed .cds--col-md-6{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-md-6,.cds--grid--narrow .cds--col-md-6{padding-right:1rem;padding-left:0}.cds--col-md-7{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-md-7,.cds--grid--condensed .cds--col-md-7{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-md-7,.cds--grid--narrow .cds--col-md-7{padding-right:1rem;padding-left:0}.cds--col-md-8{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-md-8,.cds--grid--condensed .cds--col-md-8{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-md-8,.cds--grid--narrow .cds--col-md-8{padding-right:1rem;padding-left:0}.cds--col-md,.cds--col-md--auto{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-md,.cds--grid--condensed .cds--col-md,.cds--row--condensed .cds--col-md--auto,.cds--grid--condensed .cds--col-md--auto{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-md,.cds--grid--narrow .cds--col-md,.cds--row--narrow .cds--col-md--auto,.cds--grid--narrow .cds--col-md--auto{padding-right:1rem;padding-left:0}@media (min-width: 42rem){.cds--col,.cds--col-md{max-width:100%;flex-basis:0;flex-grow:1}.cds--col--auto,.cds--col-md--auto{width:auto;max-width:100%;flex:1 0 0%}.cds--col-md-0{display:none}.cds--col-md-1{display:block;max-width:12.5%;flex:0 0 12.5%}.cds--col-md-2{display:block;max-width:25%;flex:0 0 25%}.cds--col-md-3{display:block;max-width:37.5%;flex:0 0 37.5%}.cds--col-md-4{display:block;max-width:50%;flex:0 0 50%}.cds--col-md-5{display:block;max-width:62.5%;flex:0 0 62.5%}.cds--col-md-6{display:block;max-width:75%;flex:0 0 75%}.cds--col-md-7{display:block;max-width:87.5%;flex:0 0 87.5%}.cds--col-md-8{display:block;max-width:100%;flex:0 0 100%}.cds--offset-md-0{margin-left:0}.cds--offset-md-1{margin-left:12.5%}.cds--offset-md-2{margin-left:25%}.cds--offset-md-3{margin-left:37.5%}.cds--offset-md-4{margin-left:50%}.cds--offset-md-5{margin-left:62.5%}.cds--offset-md-6{margin-left:75%}.cds--offset-md-7{margin-left:87.5%}}.cds--col-lg-0{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-0,.cds--grid--condensed .cds--col-lg-0{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-0,.cds--grid--narrow .cds--col-lg-0{padding-right:1rem;padding-left:0}.cds--col-lg-1{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-1,.cds--grid--condensed .cds--col-lg-1{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-1,.cds--grid--narrow .cds--col-lg-1{padding-right:1rem;padding-left:0}.cds--col-lg-2{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-2,.cds--grid--condensed .cds--col-lg-2{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-2,.cds--grid--narrow .cds--col-lg-2{padding-right:1rem;padding-left:0}.cds--col-lg-3{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-3,.cds--grid--condensed .cds--col-lg-3{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-3,.cds--grid--narrow .cds--col-lg-3{padding-right:1rem;padding-left:0}.cds--col-lg-4{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-4,.cds--grid--condensed .cds--col-lg-4{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-4,.cds--grid--narrow .cds--col-lg-4{padding-right:1rem;padding-left:0}.cds--col-lg-5{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-5,.cds--grid--condensed .cds--col-lg-5{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-5,.cds--grid--narrow .cds--col-lg-5{padding-right:1rem;padding-left:0}.cds--col-lg-6{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-6,.cds--grid--condensed .cds--col-lg-6{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-6,.cds--grid--narrow .cds--col-lg-6{padding-right:1rem;padding-left:0}.cds--col-lg-7{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-7,.cds--grid--condensed .cds--col-lg-7{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-7,.cds--grid--narrow .cds--col-lg-7{padding-right:1rem;padding-left:0}.cds--col-lg-8{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-8,.cds--grid--condensed .cds--col-lg-8{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-8,.cds--grid--narrow .cds--col-lg-8{padding-right:1rem;padding-left:0}.cds--col-lg-9{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-9,.cds--grid--condensed .cds--col-lg-9{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-9,.cds--grid--narrow .cds--col-lg-9{padding-right:1rem;padding-left:0}.cds--col-lg-10{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-10,.cds--grid--condensed .cds--col-lg-10{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-10,.cds--grid--narrow .cds--col-lg-10{padding-right:1rem;padding-left:0}.cds--col-lg-11{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-11,.cds--grid--condensed .cds--col-lg-11{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-11,.cds--grid--narrow .cds--col-lg-11{padding-right:1rem;padding-left:0}.cds--col-lg-12{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-12,.cds--grid--condensed .cds--col-lg-12{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-12,.cds--grid--narrow .cds--col-lg-12{padding-right:1rem;padding-left:0}.cds--col-lg-13{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-13,.cds--grid--condensed .cds--col-lg-13{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-13,.cds--grid--narrow .cds--col-lg-13{padding-right:1rem;padding-left:0}.cds--col-lg-14{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-14,.cds--grid--condensed .cds--col-lg-14{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-14,.cds--grid--narrow .cds--col-lg-14{padding-right:1rem;padding-left:0}.cds--col-lg-15{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-15,.cds--grid--condensed .cds--col-lg-15{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-15,.cds--grid--narrow .cds--col-lg-15{padding-right:1rem;padding-left:0}.cds--col-lg-16{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg-16,.cds--grid--condensed .cds--col-lg-16{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg-16,.cds--grid--narrow .cds--col-lg-16{padding-right:1rem;padding-left:0}.cds--col-lg,.cds--col-lg--auto{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-lg,.cds--grid--condensed .cds--col-lg,.cds--row--condensed .cds--col-lg--auto,.cds--grid--condensed .cds--col-lg--auto{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-lg,.cds--grid--narrow .cds--col-lg,.cds--row--narrow .cds--col-lg--auto,.cds--grid--narrow .cds--col-lg--auto{padding-right:1rem;padding-left:0}@media (min-width: 66rem){.cds--col,.cds--col-lg{max-width:100%;flex-basis:0;flex-grow:1}.cds--col--auto,.cds--col-lg--auto{width:auto;max-width:100%;flex:1 0 0%}.cds--col-lg-0{display:none}.cds--col-lg-1{display:block;max-width:6.25%;flex:0 0 6.25%}.cds--col-lg-2{display:block;max-width:12.5%;flex:0 0 12.5%}.cds--col-lg-3{display:block;max-width:18.75%;flex:0 0 18.75%}.cds--col-lg-4{display:block;max-width:25%;flex:0 0 25%}.cds--col-lg-5{display:block;max-width:31.25%;flex:0 0 31.25%}.cds--col-lg-6{display:block;max-width:37.5%;flex:0 0 37.5%}.cds--col-lg-7{display:block;max-width:43.75%;flex:0 0 43.75%}.cds--col-lg-8{display:block;max-width:50%;flex:0 0 50%}.cds--col-lg-9{display:block;max-width:56.25%;flex:0 0 56.25%}.cds--col-lg-10{display:block;max-width:62.5%;flex:0 0 62.5%}.cds--col-lg-11{display:block;max-width:68.75%;flex:0 0 68.75%}.cds--col-lg-12{display:block;max-width:75%;flex:0 0 75%}.cds--col-lg-13{display:block;max-width:81.25%;flex:0 0 81.25%}.cds--col-lg-14{display:block;max-width:87.5%;flex:0 0 87.5%}.cds--col-lg-15{display:block;max-width:93.75%;flex:0 0 93.75%}.cds--col-lg-16{display:block;max-width:100%;flex:0 0 100%}.cds--offset-lg-0{margin-left:0}.cds--offset-lg-1{margin-left:6.25%}.cds--offset-lg-2{margin-left:12.5%}.cds--offset-lg-3{margin-left:18.75%}.cds--offset-lg-4{margin-left:25%}.cds--offset-lg-5{margin-left:31.25%}.cds--offset-lg-6{margin-left:37.5%}.cds--offset-lg-7{margin-left:43.75%}.cds--offset-lg-8{margin-left:50%}.cds--offset-lg-9{margin-left:56.25%}.cds--offset-lg-10{margin-left:62.5%}.cds--offset-lg-11{margin-left:68.75%}.cds--offset-lg-12{margin-left:75%}.cds--offset-lg-13{margin-left:81.25%}.cds--offset-lg-14{margin-left:87.5%}.cds--offset-lg-15{margin-left:93.75%}}.cds--col-xlg-0{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-0,.cds--grid--condensed .cds--col-xlg-0{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-0,.cds--grid--narrow .cds--col-xlg-0{padding-right:1rem;padding-left:0}.cds--col-xlg-1{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-1,.cds--grid--condensed .cds--col-xlg-1{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-1,.cds--grid--narrow .cds--col-xlg-1{padding-right:1rem;padding-left:0}.cds--col-xlg-2{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-2,.cds--grid--condensed .cds--col-xlg-2{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-2,.cds--grid--narrow .cds--col-xlg-2{padding-right:1rem;padding-left:0}.cds--col-xlg-3{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-3,.cds--grid--condensed .cds--col-xlg-3{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-3,.cds--grid--narrow .cds--col-xlg-3{padding-right:1rem;padding-left:0}.cds--col-xlg-4{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-4,.cds--grid--condensed .cds--col-xlg-4{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-4,.cds--grid--narrow .cds--col-xlg-4{padding-right:1rem;padding-left:0}.cds--col-xlg-5{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-5,.cds--grid--condensed .cds--col-xlg-5{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-5,.cds--grid--narrow .cds--col-xlg-5{padding-right:1rem;padding-left:0}.cds--col-xlg-6{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-6,.cds--grid--condensed .cds--col-xlg-6{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-6,.cds--grid--narrow .cds--col-xlg-6{padding-right:1rem;padding-left:0}.cds--col-xlg-7{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-7,.cds--grid--condensed .cds--col-xlg-7{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-7,.cds--grid--narrow .cds--col-xlg-7{padding-right:1rem;padding-left:0}.cds--col-xlg-8{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-8,.cds--grid--condensed .cds--col-xlg-8{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-8,.cds--grid--narrow .cds--col-xlg-8{padding-right:1rem;padding-left:0}.cds--col-xlg-9{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-9,.cds--grid--condensed .cds--col-xlg-9{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-9,.cds--grid--narrow .cds--col-xlg-9{padding-right:1rem;padding-left:0}.cds--col-xlg-10{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-10,.cds--grid--condensed .cds--col-xlg-10{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-10,.cds--grid--narrow .cds--col-xlg-10{padding-right:1rem;padding-left:0}.cds--col-xlg-11{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-11,.cds--grid--condensed .cds--col-xlg-11{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-11,.cds--grid--narrow .cds--col-xlg-11{padding-right:1rem;padding-left:0}.cds--col-xlg-12{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-12,.cds--grid--condensed .cds--col-xlg-12{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-12,.cds--grid--narrow .cds--col-xlg-12{padding-right:1rem;padding-left:0}.cds--col-xlg-13{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-13,.cds--grid--condensed .cds--col-xlg-13{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-13,.cds--grid--narrow .cds--col-xlg-13{padding-right:1rem;padding-left:0}.cds--col-xlg-14{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-14,.cds--grid--condensed .cds--col-xlg-14{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-14,.cds--grid--narrow .cds--col-xlg-14{padding-right:1rem;padding-left:0}.cds--col-xlg-15{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-15,.cds--grid--condensed .cds--col-xlg-15{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-15,.cds--grid--narrow .cds--col-xlg-15{padding-right:1rem;padding-left:0}.cds--col-xlg-16{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg-16,.cds--grid--condensed .cds--col-xlg-16{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg-16,.cds--grid--narrow .cds--col-xlg-16{padding-right:1rem;padding-left:0}.cds--col-xlg,.cds--col-xlg--auto{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-xlg,.cds--grid--condensed .cds--col-xlg,.cds--row--condensed .cds--col-xlg--auto,.cds--grid--condensed .cds--col-xlg--auto{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-xlg,.cds--grid--narrow .cds--col-xlg,.cds--row--narrow .cds--col-xlg--auto,.cds--grid--narrow .cds--col-xlg--auto{padding-right:1rem;padding-left:0}@media (min-width: 82rem){.cds--col,.cds--col-xlg{max-width:100%;flex-basis:0;flex-grow:1}.cds--col--auto,.cds--col-xlg--auto{width:auto;max-width:100%;flex:1 0 0%}.cds--col-xlg-0{display:none}.cds--col-xlg-1{display:block;max-width:6.25%;flex:0 0 6.25%}.cds--col-xlg-2{display:block;max-width:12.5%;flex:0 0 12.5%}.cds--col-xlg-3{display:block;max-width:18.75%;flex:0 0 18.75%}.cds--col-xlg-4{display:block;max-width:25%;flex:0 0 25%}.cds--col-xlg-5{display:block;max-width:31.25%;flex:0 0 31.25%}.cds--col-xlg-6{display:block;max-width:37.5%;flex:0 0 37.5%}.cds--col-xlg-7{display:block;max-width:43.75%;flex:0 0 43.75%}.cds--col-xlg-8{display:block;max-width:50%;flex:0 0 50%}.cds--col-xlg-9{display:block;max-width:56.25%;flex:0 0 56.25%}.cds--col-xlg-10{display:block;max-width:62.5%;flex:0 0 62.5%}.cds--col-xlg-11{display:block;max-width:68.75%;flex:0 0 68.75%}.cds--col-xlg-12{display:block;max-width:75%;flex:0 0 75%}.cds--col-xlg-13{display:block;max-width:81.25%;flex:0 0 81.25%}.cds--col-xlg-14{display:block;max-width:87.5%;flex:0 0 87.5%}.cds--col-xlg-15{display:block;max-width:93.75%;flex:0 0 93.75%}.cds--col-xlg-16{display:block;max-width:100%;flex:0 0 100%}.cds--offset-xlg-0{margin-left:0}.cds--offset-xlg-1{margin-left:6.25%}.cds--offset-xlg-2{margin-left:12.5%}.cds--offset-xlg-3{margin-left:18.75%}.cds--offset-xlg-4{margin-left:25%}.cds--offset-xlg-5{margin-left:31.25%}.cds--offset-xlg-6{margin-left:37.5%}.cds--offset-xlg-7{margin-left:43.75%}.cds--offset-xlg-8{margin-left:50%}.cds--offset-xlg-9{margin-left:56.25%}.cds--offset-xlg-10{margin-left:62.5%}.cds--offset-xlg-11{margin-left:68.75%}.cds--offset-xlg-12{margin-left:75%}.cds--offset-xlg-13{margin-left:81.25%}.cds--offset-xlg-14{margin-left:87.5%}.cds--offset-xlg-15{margin-left:93.75%}}.cds--col-max-0{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-0,.cds--grid--condensed .cds--col-max-0{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-0,.cds--grid--narrow .cds--col-max-0{padding-right:1rem;padding-left:0}.cds--col-max-1{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-1,.cds--grid--condensed .cds--col-max-1{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-1,.cds--grid--narrow .cds--col-max-1{padding-right:1rem;padding-left:0}.cds--col-max-2{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-2,.cds--grid--condensed .cds--col-max-2{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-2,.cds--grid--narrow .cds--col-max-2{padding-right:1rem;padding-left:0}.cds--col-max-3{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-3,.cds--grid--condensed .cds--col-max-3{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-3,.cds--grid--narrow .cds--col-max-3{padding-right:1rem;padding-left:0}.cds--col-max-4{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-4,.cds--grid--condensed .cds--col-max-4{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-4,.cds--grid--narrow .cds--col-max-4{padding-right:1rem;padding-left:0}.cds--col-max-5{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-5,.cds--grid--condensed .cds--col-max-5{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-5,.cds--grid--narrow .cds--col-max-5{padding-right:1rem;padding-left:0}.cds--col-max-6{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-6,.cds--grid--condensed .cds--col-max-6{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-6,.cds--grid--narrow .cds--col-max-6{padding-right:1rem;padding-left:0}.cds--col-max-7{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-7,.cds--grid--condensed .cds--col-max-7{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-7,.cds--grid--narrow .cds--col-max-7{padding-right:1rem;padding-left:0}.cds--col-max-8{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-8,.cds--grid--condensed .cds--col-max-8{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-8,.cds--grid--narrow .cds--col-max-8{padding-right:1rem;padding-left:0}.cds--col-max-9{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-9,.cds--grid--condensed .cds--col-max-9{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-9,.cds--grid--narrow .cds--col-max-9{padding-right:1rem;padding-left:0}.cds--col-max-10{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-10,.cds--grid--condensed .cds--col-max-10{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-10,.cds--grid--narrow .cds--col-max-10{padding-right:1rem;padding-left:0}.cds--col-max-11{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-11,.cds--grid--condensed .cds--col-max-11{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-11,.cds--grid--narrow .cds--col-max-11{padding-right:1rem;padding-left:0}.cds--col-max-12{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-12,.cds--grid--condensed .cds--col-max-12{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-12,.cds--grid--narrow .cds--col-max-12{padding-right:1rem;padding-left:0}.cds--col-max-13{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-13,.cds--grid--condensed .cds--col-max-13{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-13,.cds--grid--narrow .cds--col-max-13{padding-right:1rem;padding-left:0}.cds--col-max-14{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-14,.cds--grid--condensed .cds--col-max-14{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-14,.cds--grid--narrow .cds--col-max-14{padding-right:1rem;padding-left:0}.cds--col-max-15{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-15,.cds--grid--condensed .cds--col-max-15{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-15,.cds--grid--narrow .cds--col-max-15{padding-right:1rem;padding-left:0}.cds--col-max-16{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max-16,.cds--grid--condensed .cds--col-max-16{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max-16,.cds--grid--narrow .cds--col-max-16{padding-right:1rem;padding-left:0}.cds--col-max,.cds--col-max--auto{width:100%;padding-right:1rem;padding-left:1rem}.cds--row--condensed .cds--col-max,.cds--grid--condensed .cds--col-max,.cds--row--condensed .cds--col-max--auto,.cds--grid--condensed .cds--col-max--auto{padding-right:.03125rem;padding-left:.03125rem}.cds--row--narrow .cds--col-max,.cds--grid--narrow .cds--col-max,.cds--row--narrow .cds--col-max--auto,.cds--grid--narrow .cds--col-max--auto{padding-right:1rem;padding-left:0}@media (min-width: 99rem){.cds--col,.cds--col-max{max-width:100%;flex-basis:0;flex-grow:1}.cds--col--auto,.cds--col-max--auto{width:auto;max-width:100%;flex:1 0 0%}.cds--col-max-0{display:none}.cds--col-max-1{display:block;max-width:6.25%;flex:0 0 6.25%}.cds--col-max-2{display:block;max-width:12.5%;flex:0 0 12.5%}.cds--col-max-3{display:block;max-width:18.75%;flex:0 0 18.75%}.cds--col-max-4{display:block;max-width:25%;flex:0 0 25%}.cds--col-max-5{display:block;max-width:31.25%;flex:0 0 31.25%}.cds--col-max-6{display:block;max-width:37.5%;flex:0 0 37.5%}.cds--col-max-7{display:block;max-width:43.75%;flex:0 0 43.75%}.cds--col-max-8{display:block;max-width:50%;flex:0 0 50%}.cds--col-max-9{display:block;max-width:56.25%;flex:0 0 56.25%}.cds--col-max-10{display:block;max-width:62.5%;flex:0 0 62.5%}.cds--col-max-11{display:block;max-width:68.75%;flex:0 0 68.75%}.cds--col-max-12{display:block;max-width:75%;flex:0 0 75%}.cds--col-max-13{display:block;max-width:81.25%;flex:0 0 81.25%}.cds--col-max-14{display:block;max-width:87.5%;flex:0 0 87.5%}.cds--col-max-15{display:block;max-width:93.75%;flex:0 0 93.75%}.cds--col-max-16{display:block;max-width:100%;flex:0 0 100%}.cds--offset-max-0{margin-left:0}.cds--offset-max-1{margin-left:6.25%}.cds--offset-max-2{margin-left:12.5%}.cds--offset-max-3{margin-left:18.75%}.cds--offset-max-4{margin-left:25%}.cds--offset-max-5{margin-left:31.25%}.cds--offset-max-6{margin-left:37.5%}.cds--offset-max-7{margin-left:43.75%}.cds--offset-max-8{margin-left:50%}.cds--offset-max-9{margin-left:56.25%}.cds--offset-max-10{margin-left:62.5%}.cds--offset-max-11{margin-left:68.75%}.cds--offset-max-12{margin-left:75%}.cds--offset-max-13{margin-left:81.25%}.cds--offset-max-14{margin-left:87.5%}.cds--offset-max-15{margin-left:93.75%}}.cds--no-gutter,.cds--row.cds--no-gutter [class*=cds--col]{padding-right:0;padding-left:0}.cds--no-gutter--start,.cds--row.cds--no-gutter--start [class*=cds--col]{padding-left:0}.cds--no-gutter--end,.cds--row.cds--no-gutter--end [class*=cds--col]{padding-right:0}.cds--hang--start{padding-left:1rem}.cds--hang--end{padding-right:1rem}html{font-size:100%}body{font-weight:400;font-family:IBM Plex Sans,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:IBM Plex Mono,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",monospace}strong{font-weight:600}h1{font-size:var(--cds-heading-06-font-size, 2rem);font-weight:var(--cds-heading-06-font-weight, 300);line-height:var(--cds-heading-06-line-height, 1.199);letter-spacing:var(--cds-heading-06-letter-spacing, 0)}h2{font-size:var(--cds-heading-05-font-size, 2rem);font-weight:var(--cds-heading-05-font-weight, 400);line-height:var(--cds-heading-05-line-height, 1.25);letter-spacing:var(--cds-heading-05-letter-spacing, 0)}h3{font-size:var(--cds-heading-04-font-size, 1.75rem);font-weight:var(--cds-heading-04-font-weight, 400);line-height:var(--cds-heading-04-line-height, 1.28572);letter-spacing:var(--cds-heading-04-letter-spacing, 0)}h4{font-size:var(--cds-heading-03-font-size, 1.25rem);font-weight:var(--cds-heading-03-font-weight, 400);line-height:var(--cds-heading-03-line-height, 1.4);letter-spacing:var(--cds-heading-03-letter-spacing, 0)}h5{font-size:var(--cds-heading-02-font-size, 1rem);font-weight:var(--cds-heading-02-font-weight, 600);line-height:var(--cds-heading-02-line-height, 1.5);letter-spacing:var(--cds-heading-02-letter-spacing, 0)}h6{font-size:var(--cds-heading-01-font-size, .875rem);font-weight:var(--cds-heading-01-font-weight, 600);line-height:var(--cds-heading-01-line-height, 1.42857);letter-spacing:var(--cds-heading-01-letter-spacing, .16px)}p{font-size:var(--cds-body-02-font-size, 1rem);font-weight:var(--cds-body-02-font-weight, 400);line-height:var(--cds-body-02-line-height, 1.5);letter-spacing:var(--cds-body-02-letter-spacing, 0)}a{color:var(--cds-link-primary, #0062fe)}em{font-style:italic}.cds--type-mono{font-family:IBM Plex Mono,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",monospace}.cds--type-sans{font-family:IBM Plex Sans,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}.cds--type-sans-condensed{font-family:IBM Plex Sans Condensed,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}.cds--type-sans-arabic{font-family:IBM Plex Sans Arabic,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}.cds--type-sans-devanagari{font-family:IBM Plex Sans Devanagari,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}.cds--type-sans-hebrew{font-family:IBM Plex Sans Hebrew,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}.cds--type-sans-jp{font-family:IBM Plex Sans JP,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}.cds--type-sans-kr{font-family:IBM Plex Sans KR,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}.cds--type-sans-thai-looped{font-family:IBM Plex Sans Thai Looped,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}.cds--type-sans-thai{font-family:IBM Plex Sans Thai,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}.cds--type-serif{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif}.cds--type-light{font-weight:300}.cds--type-regular{font-weight:400}.cds--type-semibold{font-weight:600}.cds--type-italic{font-style:italic}.cds--type-label-01{font-size:var(--cds-label-01-font-size, .75rem);font-weight:var(--cds-label-01-font-weight, 400);line-height:var(--cds-label-01-line-height, 1.33333);letter-spacing:var(--cds-label-01-letter-spacing, .32px)}.cds--type-helper-text-01{font-size:var(--cds-helper-text-01-font-size, .75rem);line-height:var(--cds-helper-text-01-line-height, 1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing, .32px)}.cds--type-body-short-01{font-size:var(--cds-body-short-01-font-size, .875rem);font-weight:var(--cds-body-short-01-font-weight, 400);line-height:var(--cds-body-short-01-line-height, 1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing, .16px)}.cds--type-body-short-02{font-size:var(--cds-body-short-02-font-size, 1rem);font-weight:var(--cds-body-short-02-font-weight, 400);line-height:var(--cds-body-short-02-line-height, 1.375);letter-spacing:var(--cds-body-short-02-letter-spacing, 0)}.cds--type-body-long-01{font-size:var(--cds-body-long-01-font-size, .875rem);font-weight:var(--cds-body-long-01-font-weight, 400);line-height:var(--cds-body-long-01-line-height, 1.42857);letter-spacing:var(--cds-body-long-01-letter-spacing, .16px)}.cds--type-body-long-02{font-size:var(--cds-body-long-02-font-size, 1rem);font-weight:var(--cds-body-long-02-font-weight, 400);line-height:var(--cds-body-long-02-line-height, 1.5);letter-spacing:var(--cds-body-long-02-letter-spacing, 0)}.cds--type-code-01{font-family:var(--cds-code-01-font-family, "IBM Plex Mono", system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", monospace);font-size:var(--cds-code-01-font-size, .75rem);font-weight:var(--cds-code-01-font-weight, 400);line-height:var(--cds-code-01-line-height, 1.33333);letter-spacing:var(--cds-code-01-letter-spacing, .32px)}.cds--type-code-02{font-family:var(--cds-code-02-font-family, "IBM Plex Mono", system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", monospace);font-size:var(--cds-code-02-font-size, .875rem);font-weight:var(--cds-code-02-font-weight, 400);line-height:var(--cds-code-02-line-height, 1.42857);letter-spacing:var(--cds-code-02-letter-spacing, .32px)}.cds--type-heading-01{font-size:var(--cds-heading-01-font-size, .875rem);font-weight:var(--cds-heading-01-font-weight, 600);line-height:var(--cds-heading-01-line-height, 1.42857);letter-spacing:var(--cds-heading-01-letter-spacing, .16px)}.cds--type-heading-02{font-size:var(--cds-heading-02-font-size, 1rem);font-weight:var(--cds-heading-02-font-weight, 600);line-height:var(--cds-heading-02-line-height, 1.5);letter-spacing:var(--cds-heading-02-letter-spacing, 0)}.cds--type-productive-heading-01{font-size:var(--cds-productive-heading-01-font-size, .875rem);font-weight:var(--cds-productive-heading-01-font-weight, 600);line-height:var(--cds-productive-heading-01-line-height, 1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing, .16px)}.cds--type-productive-heading-02{font-size:var(--cds-productive-heading-02-font-size, 1rem);font-weight:var(--cds-productive-heading-02-font-weight, 600);line-height:var(--cds-productive-heading-02-line-height, 1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing, 0)}.cds--type-productive-heading-03{font-size:var(--cds-productive-heading-03-font-size, 1.25rem);font-weight:var(--cds-productive-heading-03-font-weight, 400);line-height:var(--cds-productive-heading-03-line-height, 1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing, 0)}.cds--type-productive-heading-04{font-size:var(--cds-productive-heading-04-font-size, 1.75rem);font-weight:var(--cds-productive-heading-04-font-weight, 400);line-height:var(--cds-productive-heading-04-line-height, 1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing, 0)}.cds--type-productive-heading-05{font-size:var(--cds-productive-heading-05-font-size, 2rem);font-weight:var(--cds-productive-heading-05-font-weight, 400);line-height:var(--cds-productive-heading-05-line-height, 1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing, 0)}.cds--type-productive-heading-06{font-size:var(--cds-productive-heading-06-font-size, 2rem);font-weight:var(--cds-productive-heading-06-font-weight, 300);line-height:var(--cds-productive-heading-06-line-height, 1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing, 0)}.cds--type-productive-heading-07{font-size:var(--cds-productive-heading-07-font-size, 2.625rem);font-weight:var(--cds-productive-heading-07-font-weight, 300);line-height:var(--cds-productive-heading-07-line-height, 1.19);letter-spacing:var(--cds-productive-heading-07-letter-spacing, 0)}.cds--type-expressive-paragraph-01{font-size:1.5rem;font-weight:300;line-height:1.334;letter-spacing:0;font-size:calc(1.5rem + .25 * ((100vw - 20rem) / 46))}@media (min-width: 66rem){.cds--type-expressive-paragraph-01{font-size:1.75rem;line-height:1.28572;font-size:calc(1.75rem + .25 * ((100vw - 66rem) / 33))}}@media (min-width: 99rem){.cds--type-expressive-paragraph-01{line-height:1.25;font-size:2rem}}.cds--type-expressive-heading-01{font-size:var(--cds-expressive-heading-01-font-size, .875rem);font-weight:var(--cds-expressive-heading-01-font-weight, 600);line-height:var(--cds-expressive-heading-01-line-height, 1.42857);letter-spacing:var(--cds-expressive-heading-01-letter-spacing, .16px)}.cds--type-expressive-heading-02{font-size:var(--cds-expressive-heading-02-font-size, 1rem);font-weight:var(--cds-expressive-heading-02-font-weight, 600);line-height:var(--cds-expressive-heading-02-line-height, 1.5);letter-spacing:var(--cds-expressive-heading-02-letter-spacing, 0)}.cds--type-expressive-heading-03{font-size:1.25rem;font-weight:400;line-height:1.4;letter-spacing:0;font-size:calc(1.25rem + 0*(100vw - 20rem))}@media (min-width: 82rem){.cds--type-expressive-heading-03{font-size:1.25rem;line-height:1.25;font-size:calc(1.25rem + .25 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-expressive-heading-03{line-height:1.334;font-size:1.5rem}}.cds--type-expressive-heading-04{font-size:1.75rem;font-weight:400;line-height:1.28572;letter-spacing:0;font-size:calc(1.75rem + 0*(100vw - 20rem))}@media (min-width: 82rem){.cds--type-expressive-heading-04{font-size:1.75rem;line-height:1.25;font-size:calc(1.75rem + .25 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-expressive-heading-04{font-size:2rem}}.cds--type-expressive-heading-05{font-size:2rem;font-weight:400;line-height:1.25;letter-spacing:0;font-size:calc(2rem + .25 * ((100vw - 20rem) / 22))}@media (min-width: 42rem){.cds--type-expressive-heading-05{font-size:2.25rem;font-weight:300;line-height:1.22;font-size:calc(2.25rem + .375 * ((100vw - 42rem) / 24))}}@media (min-width: 66rem){.cds--type-expressive-heading-05{font-size:2.625rem;line-height:1.19;font-size:calc(2.625rem + .375*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-expressive-heading-05{font-size:3rem;line-height:1.17;font-size:calc(3rem + .75 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-expressive-heading-05{font-size:3.75rem}}.cds--type-expressive-heading-06{font-size:2rem;font-weight:600;line-height:1.25;letter-spacing:0;font-size:calc(2rem + .25 * ((100vw - 20rem) / 22))}@media (min-width: 42rem){.cds--type-expressive-heading-06{font-size:2.25rem;line-height:1.22;font-size:calc(2.25rem + .375 * ((100vw - 42rem) / 24))}}@media (min-width: 66rem){.cds--type-expressive-heading-06{font-size:2.625rem;line-height:1.19;font-size:calc(2.625rem + .375*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-expressive-heading-06{font-size:3rem;line-height:1.17;font-size:calc(3rem + .75 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-expressive-heading-06{font-size:3.75rem}}.cds--type-quotation-01{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:1.25rem;font-weight:400;line-height:1.3;letter-spacing:0;font-size:calc(1.25rem + 0*(100vw - 20rem))}@media (min-width: 42rem){.cds--type-quotation-01{font-size:1.25rem;font-size:calc(1.25rem + .25 * ((100vw - 42rem) / 24))}}@media (min-width: 66rem){.cds--type-quotation-01{font-size:1.5rem;line-height:1.334;font-size:calc(1.5rem + .25*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-quotation-01{font-size:1.75rem;line-height:1.28572;font-size:calc(1.75rem + .25 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-quotation-01{line-height:1.25;font-size:2rem}}.cds--type-quotation-02{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:2rem;font-weight:300;line-height:1.25;letter-spacing:0;font-size:calc(2rem + .25 * ((100vw - 20rem) / 22))}@media (min-width: 42rem){.cds--type-quotation-02{font-size:2.25rem;line-height:1.22;font-size:calc(2.25rem + .375 * ((100vw - 42rem) / 24))}}@media (min-width: 66rem){.cds--type-quotation-02{font-size:2.625rem;line-height:1.19;font-size:calc(2.625rem + .375*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-quotation-02{font-size:3rem;line-height:1.17;font-size:calc(3rem + .75 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-quotation-02{font-size:3.75rem}}.cds--type-display-01{font-size:2.625rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(2.625rem + 0*(100vw - 20rem))}@media (min-width: 42rem){.cds--type-display-01{font-size:2.625rem;font-size:calc(2.625rem + .03125*(100vw - 42rem))}}@media (min-width: 66rem){.cds--type-display-01{font-size:3.375rem;font-size:calc(3.375rem + .375*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-display-01{font-size:3.75rem;line-height:1.17;font-size:calc(3.75rem + 1 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-display-01{line-height:1.13;font-size:4.75rem}}.cds--type-display-02{font-size:2.625rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(2.625rem + 0*(100vw - 20rem))}@media (min-width: 42rem){.cds--type-display-02{font-size:2.625rem;font-size:calc(2.625rem + .03125*(100vw - 42rem))}}@media (min-width: 66rem){.cds--type-display-02{font-size:3.375rem;font-size:calc(3.375rem + .375*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-display-02{font-size:3.75rem;line-height:1.16;font-size:calc(3.75rem + 1 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-display-02{line-height:1.13;font-size:4.75rem}}.cds--type-display-03{font-size:2.625rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(2.625rem + 1.625 * ((100vw - 20rem) / 22))}@media (min-width: 42rem){.cds--type-display-03{font-size:4.25rem;line-height:1.15;font-size:calc(4.25rem + .0625*(100vw - 42rem))}}@media (min-width: 66rem){.cds--type-display-03{font-size:5.75rem;line-height:1.11;letter-spacing:-.64px;font-size:calc(5.75rem + 1.875*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-display-03{font-size:7.625rem;line-height:1.07;letter-spacing:-.64px;font-size:calc(7.625rem + .125*(100vw - 82rem))}}@media (min-width: 99rem){.cds--type-display-03{line-height:1.05;letter-spacing:-.96px;font-size:9.75rem}}.cds--type-display-04{font-size:2.625rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(2.625rem + 1.625 * ((100vw - 20rem) / 22))}@media (min-width: 42rem){.cds--type-display-04{font-size:4.25rem;line-height:1.15;font-size:calc(4.25rem + .0625*(100vw - 42rem))}}@media (min-width: 66rem){.cds--type-display-04{font-size:5.75rem;line-height:1.11;letter-spacing:-.64px;font-size:calc(5.75rem + 1.875*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-display-04{font-size:7.625rem;line-height:1.07;letter-spacing:-.64px;font-size:calc(7.625rem + .125*(100vw - 82rem))}}@media (min-width: 99rem){.cds--type-display-04{line-height:1.05;letter-spacing:-.96px;font-size:9.75rem}}.cds--type-legal-01{font-size:var(--cds-legal-01-font-size, .75rem);font-weight:var(--cds-legal-01-font-weight, 400);line-height:var(--cds-legal-01-line-height, 1.33333);letter-spacing:var(--cds-legal-01-letter-spacing, .32px)}.cds--type-legal-02{font-size:var(--cds-legal-02-font-size, .875rem);font-weight:var(--cds-legal-02-font-weight, 400);line-height:var(--cds-legal-02-line-height, 1.28572);letter-spacing:var(--cds-legal-02-letter-spacing, .16px)}.cds--type-body-compact-01{font-size:var(--cds-body-compact-01-font-size, .875rem);font-weight:var(--cds-body-compact-01-font-weight, 400);line-height:var(--cds-body-compact-01-line-height, 1.28572);letter-spacing:var(--cds-body-compact-01-letter-spacing, .16px)}.cds--type-body-compact-02{font-size:var(--cds-body-compact-02-font-size, 1rem);font-weight:var(--cds-body-compact-02-font-weight, 400);line-height:var(--cds-body-compact-02-line-height, 1.375);letter-spacing:var(--cds-body-compact-02-letter-spacing, 0)}.cds--type-heading-compact-01{font-size:var(--cds-heading-compact-01-font-size, .875rem);font-weight:var(--cds-heading-compact-01-font-weight, 600);line-height:var(--cds-heading-compact-01-line-height, 1.28572);letter-spacing:var(--cds-heading-compact-01-letter-spacing, .16px)}.cds--type-heading-compact-02{font-size:var(--cds-heading-compact-02-font-size, 1rem);font-weight:var(--cds-heading-compact-02-font-weight, 600);line-height:var(--cds-heading-compact-02-line-height, 1.375);letter-spacing:var(--cds-heading-compact-02-letter-spacing, 0)}.cds--type-body-01{font-size:var(--cds-body-01-font-size, .875rem);font-weight:var(--cds-body-01-font-weight, 400);line-height:var(--cds-body-01-line-height, 1.42857);letter-spacing:var(--cds-body-01-letter-spacing, .16px)}.cds--type-body-02{font-size:var(--cds-body-02-font-size, 1rem);font-weight:var(--cds-body-02-font-weight, 400);line-height:var(--cds-body-02-line-height, 1.5);letter-spacing:var(--cds-body-02-letter-spacing, 0)}.cds--type-heading-03{font-size:var(--cds-heading-03-font-size, 1.25rem);font-weight:var(--cds-heading-03-font-weight, 400);line-height:var(--cds-heading-03-line-height, 1.4);letter-spacing:var(--cds-heading-03-letter-spacing, 0)}.cds--type-heading-04{font-size:var(--cds-heading-04-font-size, 1.75rem);font-weight:var(--cds-heading-04-font-weight, 400);line-height:var(--cds-heading-04-line-height, 1.28572);letter-spacing:var(--cds-heading-04-letter-spacing, 0)}.cds--type-heading-05{font-size:var(--cds-heading-05-font-size, 2rem);font-weight:var(--cds-heading-05-font-weight, 400);line-height:var(--cds-heading-05-line-height, 1.25);letter-spacing:var(--cds-heading-05-letter-spacing, 0)}.cds--type-heading-06{font-size:var(--cds-heading-06-font-size, 2rem);font-weight:var(--cds-heading-06-font-weight, 300);line-height:var(--cds-heading-06-line-height, 1.199);letter-spacing:var(--cds-heading-06-letter-spacing, 0)}.cds--type-heading-07{font-size:var(--cds-heading-07-font-size, 2.625rem);font-weight:var(--cds-heading-07-font-weight, 300);line-height:var(--cds-heading-07-line-height, 1.19);letter-spacing:var(--cds-heading-07-letter-spacing, 0)}.cds--type-fluid-heading-03{font-size:1.25rem;font-weight:400;line-height:1.4;letter-spacing:0;font-size:calc(1.25rem + 0*(100vw - 20rem))}@media (min-width: 82rem){.cds--type-fluid-heading-03{font-size:1.25rem;line-height:1.25;font-size:calc(1.25rem + .25 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-fluid-heading-03{line-height:1.334;font-size:1.5rem}}.cds--type-fluid-heading-04{font-size:1.75rem;font-weight:400;line-height:1.28572;letter-spacing:0;font-size:calc(1.75rem + 0*(100vw - 20rem))}@media (min-width: 82rem){.cds--type-fluid-heading-04{font-size:1.75rem;line-height:1.25;font-size:calc(1.75rem + .25 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-fluid-heading-04{font-size:2rem}}.cds--type-fluid-heading-05{font-size:2rem;font-weight:400;line-height:1.25;letter-spacing:0;font-size:calc(2rem + .25 * ((100vw - 20rem) / 22))}@media (min-width: 42rem){.cds--type-fluid-heading-05{font-size:2.25rem;font-weight:300;line-height:1.22;font-size:calc(2.25rem + .375 * ((100vw - 42rem) / 24))}}@media (min-width: 66rem){.cds--type-fluid-heading-05{font-size:2.625rem;line-height:1.19;font-size:calc(2.625rem + .375*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-fluid-heading-05{font-size:3rem;line-height:1.17;font-size:calc(3rem + .75 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-fluid-heading-05{font-size:3.75rem}}.cds--type-fluid-heading-06{font-size:2rem;font-weight:600;line-height:1.25;letter-spacing:0;font-size:calc(2rem + .25 * ((100vw - 20rem) / 22))}@media (min-width: 42rem){.cds--type-fluid-heading-06{font-size:2.25rem;line-height:1.22;font-size:calc(2.25rem + .375 * ((100vw - 42rem) / 24))}}@media (min-width: 66rem){.cds--type-fluid-heading-06{font-size:2.625rem;line-height:1.19;font-size:calc(2.625rem + .375*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-fluid-heading-06{font-size:3rem;line-height:1.17;font-size:calc(3rem + .75 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-fluid-heading-06{font-size:3.75rem}}.cds--type-fluid-paragraph-01{font-size:1.5rem;font-weight:300;line-height:1.334;letter-spacing:0;font-size:calc(1.5rem + .25 * ((100vw - 20rem) / 46))}@media (min-width: 66rem){.cds--type-fluid-paragraph-01{font-size:1.75rem;line-height:1.28572;font-size:calc(1.75rem + .25 * ((100vw - 66rem) / 33))}}@media (min-width: 99rem){.cds--type-fluid-paragraph-01{line-height:1.25;font-size:2rem}}.cds--type-fluid-quotation-01{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:1.25rem;font-weight:400;line-height:1.3;letter-spacing:0;font-size:calc(1.25rem + 0*(100vw - 20rem))}@media (min-width: 42rem){.cds--type-fluid-quotation-01{font-size:1.25rem;font-size:calc(1.25rem + .25 * ((100vw - 42rem) / 24))}}@media (min-width: 66rem){.cds--type-fluid-quotation-01{font-size:1.5rem;line-height:1.334;font-size:calc(1.5rem + .25*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-fluid-quotation-01{font-size:1.75rem;line-height:1.28572;font-size:calc(1.75rem + .25 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-fluid-quotation-01{line-height:1.25;font-size:2rem}}.cds--type-fluid-quotation-02{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:2rem;font-weight:300;line-height:1.25;letter-spacing:0;font-size:calc(2rem + .25 * ((100vw - 20rem) / 22))}@media (min-width: 42rem){.cds--type-fluid-quotation-02{font-size:2.25rem;line-height:1.22;font-size:calc(2.25rem + .375 * ((100vw - 42rem) / 24))}}@media (min-width: 66rem){.cds--type-fluid-quotation-02{font-size:2.625rem;line-height:1.19;font-size:calc(2.625rem + .375*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-fluid-quotation-02{font-size:3rem;line-height:1.17;font-size:calc(3rem + .75 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-fluid-quotation-02{font-size:3.75rem}}.cds--type-fluid-display-01{font-size:2.625rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(2.625rem + 0*(100vw - 20rem))}@media (min-width: 42rem){.cds--type-fluid-display-01{font-size:2.625rem;font-size:calc(2.625rem + .03125*(100vw - 42rem))}}@media (min-width: 66rem){.cds--type-fluid-display-01{font-size:3.375rem;font-size:calc(3.375rem + .375*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-fluid-display-01{font-size:3.75rem;line-height:1.17;font-size:calc(3.75rem + 1 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-fluid-display-01{line-height:1.13;font-size:4.75rem}}.cds--type-fluid-display-02{font-size:2.625rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(2.625rem + 0*(100vw - 20rem))}@media (min-width: 42rem){.cds--type-fluid-display-02{font-size:2.625rem;font-size:calc(2.625rem + .03125*(100vw - 42rem))}}@media (min-width: 66rem){.cds--type-fluid-display-02{font-size:3.375rem;font-size:calc(3.375rem + .375*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-fluid-display-02{font-size:3.75rem;line-height:1.16;font-size:calc(3.75rem + 1 * ((100vw - 82rem) / 17))}}@media (min-width: 99rem){.cds--type-fluid-display-02{line-height:1.13;font-size:4.75rem}}.cds--type-fluid-display-03{font-size:2.625rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(2.625rem + 1.625 * ((100vw - 20rem) / 22))}@media (min-width: 42rem){.cds--type-fluid-display-03{font-size:4.25rem;line-height:1.15;font-size:calc(4.25rem + .0625*(100vw - 42rem))}}@media (min-width: 66rem){.cds--type-fluid-display-03{font-size:5.75rem;line-height:1.11;letter-spacing:-.64px;font-size:calc(5.75rem + 1.875*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-fluid-display-03{font-size:7.625rem;line-height:1.07;letter-spacing:-.64px;font-size:calc(7.625rem + .125*(100vw - 82rem))}}@media (min-width: 99rem){.cds--type-fluid-display-03{line-height:1.05;letter-spacing:-.96px;font-size:9.75rem}}.cds--type-fluid-display-04{font-size:2.625rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(2.625rem + 1.625 * ((100vw - 20rem) / 22))}@media (min-width: 42rem){.cds--type-fluid-display-04{font-size:4.25rem;line-height:1.15;font-size:calc(4.25rem + .0625*(100vw - 42rem))}}@media (min-width: 66rem){.cds--type-fluid-display-04{font-size:5.75rem;line-height:1.11;letter-spacing:-.64px;font-size:calc(5.75rem + 1.875*(100vw - 66rem)/16)}}@media (min-width: 82rem){.cds--type-fluid-display-04{font-size:7.625rem;line-height:1.07;letter-spacing:-.64px;font-size:calc(7.625rem + .125*(100vw - 82rem))}}@media (min-width: 99rem){.cds--type-fluid-display-04{line-height:1.05;letter-spacing:-.96px;font-size:9.75rem}}*{font-family:IBM Plex Sans,Helvetica Neue,Arial,sans-serif}a{color:var(--cds-link-primary, #EC0000)!important}.exp-questions-margins{margin-bottom:1rem}.exp-text-center{text-align:center;margin-left:.5rem;padding-left:1rem;margin-right:.5rem;padding-right:1rem}.business-icon{height:96px;object-fit:contain}.padding.left{padding-left:2rem}.padding.right{padding-right:2rem}\n')();
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let ExpFormIdeaxCreator = class extends s {
  constructor() {
    super(...arguments);
    this.expLang = "es";
    this._firstIdea = true;
    this._variables = {
      fonts: [
        { family: "Roboto", variant: "300" },
        { family: "Open Sans", variant: "300" },
        { family: "Open Sans", variant: "700" },
        { family: "Lato", variant: "300" },
        { family: "Montserrat", variant: "300" },
        { family: "Montserrat", variant: "700" },
        { family: "Poppins", variant: "200" },
        { family: "Source Sans Pro", variant: "400" },
        { family: "Raleway", variant: "600" },
        { family: "Raleway", variant: "300" },
        { family: "Ubuntu", variant: "300" },
        { family: "Lora", variant: "400" },
        { family: "Fira Sans", variant: "300" },
        { family: "Fira Sans", variant: "700" }
      ],
      keywords: {
        ODS: {
          "01": ["energy consumption", "clean energy", "financial poverty"],
          "02": ["circular food ingredients", "food cook", "farms", "farming"],
          "03": [
            "clinical support systems",
            "health platforms",
            "medicine",
            "patient implants PSI",
            "AI medical image analysis"
          ],
          "04": ["learn", "educational", "study", "science technology learning"],
          "05": [
            "women health",
            "women empowerment",
            "women tech",
            "women networks",
            "women safety"
          ],
          "06": [
            "water",
            "sanitary water treatment",
            "rain water harvest",
            "water management"
          ],
          "07": [
            "energy resources",
            "energy internet IoE",
            "decentralized energy",
            "energy storage",
            "waste energy"
          ],
          "08": [
            "economy growth",
            "crowdsource economy",
            "recruitment",
            "financial api"
          ],
          "09": [
            "smart mobility",
            "smart devices",
            "machines",
            "industrial",
            "infrastructure AI"
          ],
          "10": [
            "small farming",
            "financial inclusion",
            "diversity hiring",
            "groups media",
            "student financing"
          ],
          "11": [
            "affordable house cities",
            "urban green quality",
            "risk management cities",
            "urban management",
            "green urban mobility"
          ],
          "12": [
            "carbon foot track",
            "supply chain trace",
            "responsible sourc",
            "water sustainable feed"
          ],
          "13": [
            "climate change",
            "emissions track",
            "carbon climate",
            "power climate balance",
            "climate finance"
          ],
          "14": [
            "water quality",
            "smart fish",
            "recycled plastic",
            "ocean AI",
            "aquaculture clean",
            "green ocean"
          ],
          "15": [
            "tree planting",
            "soil monitor",
            "wildfire",
            "tree plants",
            "animal life"
          ],
          "16": [
            "legal help",
            "social legal assist",
            "legal knowledge",
            "social impact"
          ],
          "17": [
            "political collaboration",
            "buil collaboration",
            "innovation share",
            "management platform"
          ]
        },
        ICONS: {
          "01": ["people"],
          "02": ["food farming"],
          "03": ["health"],
          "04": ["learn"],
          "05": ["people equality"],
          "06": ["clean water"],
          "07": ["clean energy"],
          "08": ["work"],
          "09": ["industry"],
          "10": ["inequality"],
          "11": ["green city"],
          "12": ["sustainable"],
          "13": ["climate change"],
          "14": ["ocean life"],
          "15": ["wildlife"],
          "16": ["people equality"],
          "17": ["trade deals"]
        }
      }
    };
    this._texts = {
      es: {
        btnPost: "\xBFAlguna idea?",
        btnRePost: "\xBFOtra idea?",
        btnRefresh: "Limpiar",
        ideaHeader: "\xBFQu\xE9 te parece?",
        logoHeader: "Elige un nombre y un logo (Bot\xF3n derecho + Guardar imagen como...)"
      },
      en: {
        btnPost: "Any ideas?",
        btnRePost: "Any other?",
        btnRefresh: "Refresh",
        ideaHeader: "Does this idea fit you?",
        logoHeader: "Select a name and logo (Right Click + Save Image As...)"
      },
      "pt-pt": {
        btnPost: "Alguma ideia?",
        btnRePost: "Outra ideia?",
        btnRefresh: "Limpiar",
        ideaHeader: "O que voc\xEA acha?",
        logoHeader: "Escolha um nome e logotipo (Clique com o bot\xE3o direito + Salvar imagem como...)"
      }
    };
    this._studies = {
      es: {
        title: "\xBFQu\xE9 estudias o estudiaste?",
        arial: "Rama de estudios",
        holder: "Selecciona una rama de estudios",
        validity: "Tienes que seleccionar uno",
        values: [
          { value: "art teach literature langs", name: "Artes y Humanidades" },
          { value: "social law justice", name: "Ciencias Sociales y Jur\xEDdicas" },
          { value: "science math physics", name: "Ciencias" },
          { value: "health doctor", name: "Ciencias de la Salud" },
          { value: "AI engineer develop", name: "Ingenier\xEDa" },
          { value: "design build develop", name: "Arquitectura y Dise\xF1o" }
        ]
      },
      en: {
        title: "What are you studying?",
        arial: "Branch of studies",
        holder: "Select a branch of studies",
        validity: "You must choose one",
        values: [
          { value: "art teach literature langs", name: "Arts and Humanities" },
          { value: "social law justice", name: "Social and Legal Sciences" },
          { value: "science math physics", name: "Science" },
          { value: "health doctor", name: "Health Sciences" },
          { value: "AI engineer develop", name: "Engineering" },
          { value: "design build develop", name: "Architecture and design" }
        ]
      },
      "pt-pt": {
        title: "O que voc\xEA estuda ou estudou?",
        arial: "Ramo de estudos",
        holder: "Selecione um ramo de estudos",
        validity: "Voc\xEA tem que selecionar um",
        values: [
          { value: "art teach literature langs", name: "Artes e Humanidades" },
          { value: "social law justice", name: "Ci\xEAncias Sociais e Jur\xEDdicas" },
          { value: "science math physics", name: "Ci\xEAncias" },
          { value: "health doctor", name: "Ci\xEAncias da Sa\xFAde" },
          { value: "AI engineer develop", name: "Engenharia" },
          { value: "design build develop", name: "Arquitetura e design" }
        ]
      }
    };
    this._countries = {
      es: {
        title: "\xBFD\xF3nde vives?",
        arial: "Pa\xEDs de residencia",
        holder: "Selecciona un pa\xEDs",
        validity: "Tienes que seleccionar uno",
        values: [
          { value: "argentina", name: "Argentina" },
          { value: "brazil", name: "Brasil" },
          { value: "chili", name: "Chile" },
          { value: "spain", name: "Espa\xF1a" },
          { value: "mexico", name: "M\xE9xico" },
          { value: "portugal", name: "Portugal" },
          { value: "uk", name: "Reino Unido" },
          { value: "uruguay", name: "Uruguay" }
        ]
      },
      en: {
        title: "Where do you live?",
        arial: "Country of residence",
        holder: "Select a country",
        validity: "You must choose one",
        values: [
          { value: "argentina", name: "Argentina" },
          { value: "brazil", name: "Brazil" },
          { value: "chili", name: "Chili" },
          { value: "spain", name: "Spain" },
          { value: "mexico", name: "Mexico" },
          { value: "portugal", name: "Portugal" },
          { value: "uk", name: "UK" },
          { value: "uruguay", name: "Uruguay" }
        ]
      },
      "pt-pt": {
        title: "Onde voc\xEA reside?",
        arial: "Pa\xEDs de resid\xEAncia",
        holder: "Selecione um pais",
        validity: "Voc\xEA tem que selecionar um",
        values: [
          { value: "argentina", name: "Argentina" },
          { value: "brazil", name: "Brasil" },
          { value: "chili", name: "Chile" },
          { value: "spain", name: "Espanha" },
          { value: "mexico", name: "M\xE9xico" },
          { value: "portugal", name: "Portugal" },
          { value: "uk", name: "Reino Unido" },
          { value: "uruguay", name: "Uruguai" }
        ]
      }
    };
    this._sectors = {
      es: {
        title: "\xBFA qu\xE9 te quieres dedicar?",
        arial: "Sector",
        holder: "Selecciona una industria",
        validity: "Tienes que seleccionar una",
        values: [
          { value: "aerospace", name: "Aeroespacial" },
          { value: "agriculture", name: "Agricultura" },
          { value: "chemistry", name: "Industria Qu\xEDmica" },
          { value: "software", name: "Desarrollo de Software" },
          { value: "hardware", name: "Desarrollo de Hardware" },
          { value: "construction", name: "Construcci\xF3n" },
          { value: "defense", name: "Defensa" },
          { value: "education", name: "Educaci\xF3n" },
          { value: "energy", name: "Energ\xEDa" },
          { value: "arts entertainment", name: "Entretenimiento" },
          { value: "financial fintech", name: "Finanzas" },
          { value: "insurance insurtech", name: "Seguros" },
          { value: "retail", name: "Venta minorista" },
          { value: "food", name: "Alimentaci\xF3n" },
          { value: "health", name: "Salud" },
          { value: "hospitality restaurant", name: "Hosteler\xEDa" },
          { value: "manufacture", name: "Fabricaci\xF3n industrial" },
          { value: "media", name: "Medios de comunicaci\xF3n" },
          { value: "comunications", name: "Telecomunicaciones" },
          { value: "transport delivery", name: "Transporte" },
          { value: "business services", name: "Servicios" }
        ]
      },
      en: {
        title: "What would you like to work at?",
        arial: "Industryr",
        holder: "Select an industry",
        validity: "You must choose one",
        values: [
          { value: "aerospace", name: "Aerospace" },
          { value: "agriculture", name: "Agriculture" },
          { value: "chemistry", name: "Chemistry Industry" },
          { value: "software", name: "Software Industry" },
          { value: "hardware", name: "Hasrdware Industry" },
          { value: "construction", name: "Real Estate" },
          { value: "defense", name: "Defense" },
          { value: "education", name: "Education" },
          { value: "energy", name: "Energy" },
          { value: "arts entertainment", name: "Entertainment" },
          { value: "financial fintech", name: "Finance" },
          { value: "insurance insurtech", name: "Insurance" },
          { value: "retail", name: "Retail" },
          { value: "food", name: "Food" },
          { value: "health", name: "Health" },
          { value: "hospitality restaurant", name: "Hospitality" },
          { value: "manufacture", name: "Manufacture" },
          { value: "media", name: "Media" },
          { value: "comunications", name: "Comunications" },
          { value: "transport delivery", name: "Transport" },
          { value: "business services", name: "Business Services" }
        ]
      },
      "pt-pt": {
        title: "A que voc\xEA quer se dedicar?",
        arial: "Setor",
        holder: "Selecione um setor",
        validity: "Voc\xEA tem que selecionar um",
        values: [
          { value: "aerospace", name: "Aeroespacial" },
          { value: "agriculture", name: "Agricultura" },
          { value: "chemistry", name: "Ind\xFAstria qu\xEDmica" },
          { value: "software", name: "Desenvolvimento de software" },
          { value: "hardware", name: "Desenvolvimento de hardware" },
          { value: "construction", name: "Constru\xE7\xE3o" },
          { value: "defense", name: "Ind\xFAstria de defesa" },
          { value: "education", name: "Educa\xE7\xE3o" },
          { value: "energy", name: "Energia" },
          { value: "arts entertainment", name: "Entretenimento" },
          { value: "financial fintech", name: "Finan\xE7a" },
          { value: "insurance insurtech", name: "Seguro" },
          { value: "retail", name: "Retalho" },
          { value: "food", name: "Alimenta\xE7\xE3o" },
          { value: "health", name: "Sa\xFAde" },
          { value: "hospitality restaurant", name: "Hosteler\xEDa" },
          { value: "manufacture", name: "Frabrica\xE7\xE3o industrial" },
          { value: "media", name: "Meios de comunica\xE7\xE3o" },
          { value: "comunications", name: "Telecomunica\xE7\xF5es" },
          { value: "transport delivery", name: "Transporte" },
          { value: "business services", name: "Servi\xE7os" }
        ]
      }
    };
    this._ods = {
      es: {
        title: "\xBFC\xF3mo te gustar\xEDa salvar el mundo?",
        arial: "ODS",
        holder: "Selecciona un ODS",
        validity: "Tienes que seleccionar uno",
        values: [
          { value: "01", name: "Fin de la pobreza" },
          { value: "02", name: "Hambre Cero" },
          { value: "03", name: "Salud y bienestar" },
          { value: "04", name: "Educaci\xF3n de calidad" },
          { value: "05", name: "Igualdad de g\xE9nero" },
          { value: "06", name: "Agua limpia y saneamiento" },
          { value: "07", name: "Energ\xEDa asequible y no contaminante" },
          { value: "08", name: "Trabajo decente y crecimiento econ\xF3mico" },
          { value: "09", name: "Industria, Innovaci\xF3n e Infraestructura" },
          { value: "10", name: "Reducci\xF3n de las desigualdades" },
          { value: "11", name: "Ciudades y comunidades sostenibles" },
          { value: "12", name: "Producci\xF3n y Consumo Responsables" },
          { value: "13", name: "Acci\xF3n por el clima" },
          { value: "14", name: "Vida submarina" },
          { value: "15", name: "Vida de ecosistemas terrestres" },
          { value: "16", name: "Paz, justicia e instituciones s\xF3lidas" },
          { value: "17", name: "Alianzas para lograr los objetivos" }
        ]
      },
      en: {
        title: "How would you like to save the world?",
        arial: "SDG",
        holder: "Select a SDG 2030",
        validity: "You must choose one",
        values: [
          { value: "01", name: "No poverty" },
          { value: "02", name: "Zero Hunger" },
          { value: "03", name: "Good health and well-being" },
          { value: "04", name: "Quality education" },
          { value: "05", name: "Gender Equality" },
          { value: "06", name: "Clean water and sanitation" },
          { value: "07", name: "Affordable and clean energy" },
          { value: "08", name: "Decent work and economic growth" },
          { value: "09", name: "Industry, innovation and infrastructure" },
          { value: "10", name: "Reduced inequalities" },
          { value: "11", name: "Sustainable cities and communities" },
          { value: "12", name: "Responsible consumption and production" },
          { value: "13", name: "Climate action" },
          { value: "14", name: "Life Below Water" },
          { value: "15", name: "Life on land" },
          { value: "16", name: "Peace, justice and strong institutions" },
          { value: "17", name: "Partnerships for the goals" }
        ]
      },
      "pt-pt": {
        title: "Como voc\xEA gostaria de salvar o mundo?",
        arial: "ODS",
        holder: "Selecione um ODS",
        validity: "Voc\xEA tem que selecionar um",
        values: [
          { value: "01", name: "Erradica\xE7\xE3o da pobreza" },
          { value: "02", name: "Fome zero e agricultura sustent\xE1vel" },
          { value: "03", name: "Sa\xFAde e bem-estar" },
          { value: "04", name: "Educa\xE7\xE3o de qualidade" },
          { value: "05", name: "Igualdade de g\xEAnero" },
          { value: "06", name: "\xC1gua pot\xE1vel e saneamento" },
          { value: "07", name: "Energia limpa e acess\xEDvel" },
          { value: "08", name: "Trabalho decente e crescimento econ\xF4mico" },
          { value: "09", name: "Ind\xFAstria, inova\xE7\xE3o e infraestrutura" },
          { value: "10", name: "Redu\xE7\xE3o das desigualdades" },
          { value: "11", name: "Cidades e comunidades sustent\xE1veis" },
          { value: "12", name: "Consumo e produ\xE7\xE3o respons\xE1veis" },
          { value: "13", name: "A\xE7\xE3o contra a mudan\xE7a global do clima" },
          { value: "14", name: "Vida na \xE1gua" },
          { value: "15", name: "Vida terrestre" },
          { value: "16", name: "Paz, justi\xE7a e institui\xE7\xF5es eficazes" },
          { value: "17", name: "Parcerias e meios de implementa\xE7\xE3o" }
        ]
      }
    };
  }
  async loadFontFromURL() {
    import("https://cdn.skypack.dev/webfontloader").then(function(n2) {
      return n2.w;
    }).then((WebFontLoader) => {
      WebFontLoader.load({
        google: {
          families: this._variables.fonts.map((f2) => {
            return String(f2.family + ":" + f2.variant);
          })
        },
        timeout: 2e4
      });
    });
  }
  invertColor(hex, bw) {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    let r2 = parseInt(hex.slice(0, 2), 16), g2 = parseInt(hex.slice(2, 4), 16), b2 = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      return r2 * 0.299 + g2 * 0.587 + b2 * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
    r2 = (255 - r2).toString(16);
    g2 = (255 - g2).toString(16);
    b2 = (255 - b2).toString(16);
    return "#" + this.padZero(r2) + this.padZero(g2) + this.padZero(b2);
  }
  padZero(str, len) {
    len = len || 2;
    const zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
  }
  render() {
    return $`
      <bx-form-item id="ideaAttr" class="exp-questions-margins">
        <div class="cds--grid cds--type-sans">
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <exp-carbon-select
                id="studies"
                name="studies"
                autofocus
                required
                validity-message="${this._studies[this.expLang].validity}"
                label-text="${this._studies[this.expLang].title}"
                placeholder="${this._studies[this.expLang].holder}"
                @input=${this.changeValue}
              >
                ${o(this._studies[this.expLang].values, (vPar) => $`<bx-select-item
                      value="${vPar.value}"
                      label="${vPar.name}"
                      >${vPar.name}</bx-select-item
                    >`)}
              </exp-carbon-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <exp-carbon-select
                id="country"
                name="country"
                autofocus
                required
                validity-message="${this._countries[this.expLang].validity}"
                label-text="${this._countries[this.expLang].title}"
                placeholder="${this._countries[this.expLang].holder}"
                @input=${this.changeValue}
              >
                ${o(this._countries[this.expLang].values, (vPar) => $`<bx-select-item
                      value="${vPar.value}"
                      label="${vPar.name}"
                      >${vPar.name}</bx-select-item
                    >`)}
              </exp-carbon-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <exp-carbon-select
                id="sector"
                name="sector"
                autofocus
                required
                validity-message="${this._sectors[this.expLang].validity}"
                label-text="${this._sectors[this.expLang].title}"
                placeholder="${this._sectors[this.expLang].holder}"
                @input=${this.changeValue}
              >
                ${o(this._sectors[this.expLang].values, (vPar) => $`<bx-select-item
                      value="${vPar.value}"
                      label="${vPar.name}"
                      >${vPar.name}</bx-select-item
                    >`)}
              </exp-carbon-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <exp-carbon-select
                id="ods"
                name="ods"
                autofocus
                required
                validity-message="${this._ods[this.expLang].validity}"
                label-text="${this._ods[this.expLang].title}"
                placeholder="${this._ods[this.expLang].holder}"
                @input=${this.changeValue}
              >
                ${o(this._ods[this.expLang].values, (vPar) => $`<bx-select-item
                      value="${vPar.value}"
                      label="${vPar.name}"
                      >${vPar.name}</bx-select-item
                    >`)}
              </exp-carbon-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--cols-sm-2">
              <exp-carbon-button
                @click="${this._submitForm}"
                type="submit"
                isExpressive
                kind="tertiary"
                class="padding"
              >
                ${this._firstIdea ? this._texts[this.expLang].btnPost : this._texts[this.expLang].btnRePost}
                <!-- &nbsp;&nbsp;&nbsp; $ { addIconNode } -->
              </exp-carbon-button>
            </div>
            <div class="cds--cols-sm-2">
              <exp-carbon-button
                @click="${this._refreshForm}"
                isExpressive
                kind="danger-tertiary"
                class="padding left"
              >
                ${this._texts[this.expLang].btnRefresh}
              </exp-carbon-button>
            </div>
          </div>
        </div>
      </bx-form-item>
      <div class="cds--grid cds--type-sans">
        <div class="cds--row">
          <div id="ideaText" class="cds--col-auto exp-text-center"></div>
        </div>
        <br />
        <div id="proGallery" class="cds--row"></div>
        <div id="iconAttribution" class="exp-text-center"></div>
      </div>
    `;
  }
  changeValue(e2) {
    const input = e2.target;
    input.value ? input.removeAttribute("invalid") : input.setAttribute("invalid", "true");
  }
  async _submitForm() {
    this.setIdeaText("loading");
    this.setLogos([]);
    const studies = this._selectedStudies.value;
    studies ? this._selectedStudies.removeAttribute("invalid") : this._selectedStudies.setAttribute("invalid", "true");
    const country = this._selectedCountry.value;
    country ? this._selectedCountry.removeAttribute("invalid") : this._selectedCountry.setAttribute("invalid", "true");
    const sector = this._selectedSector.value;
    sector ? this._selectedSector.removeAttribute("invalid") : this._selectedSector.setAttribute("invalid", "true");
    const ods = this._selectedODS.value;
    ods ? this._selectedODS.removeAttribute("invalid") : this._selectedODS.setAttribute("invalid", "true");
    if (!studies || !country || !sector || !ods) {
      this.setIdeaText("clear");
      return;
    }
    const odsKeys = String(this._variables.keywords.ODS[ods][Math.floor(Math.random() * this._variables.keywords.ODS[ods].length)] || "").toLocaleLowerCase("en");
    const iconKey = String(this._variables.keywords.ICONS[ods][Math.floor(Math.random() * this._variables.keywords.ICONS[ods].length)] || "").toLocaleLowerCase("en");
    const sMethod = "POST";
    const apiUrl = "https://apis-ideax-vjbpvf7lya-uc.a.run.app";
    const qParams = "?action=new&target=custom&object=ideax";
    const body = {
      iconKeys: iconKey,
      lang: this.expLang.toLocaleUpperCase().substring(0, 2),
      country,
      odsKeys,
      keywords: sector + " " + studies
    };
    let response = await fetch(apiUrl + qParams, {
      method: sMethod,
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(body)
    }).then((response2) => {
      if (response2.ok) {
        if (response2.status === 204) {
          return Promise.resolve({});
        } else {
          return response2.json();
        }
      } else {
        console.error(response2.statusText);
        return Promise.resolve({});
      }
    }).catch((error) => {
      console.error(error);
      return Promise.resolve({});
    });
    if (!(response == null ? void 0 : response.idea)) {
      response = {
        idea: "Una plataforma que permite a los grupos crear cuentas privadas en las redes sociales y gestionarlas como un grupo. Los equipos de los que forma parte pueden elegir sus propias reglas y restricciones, por lo que es una especie de Slack con una comunidad autocontrolada.",
        logos: [
          {
            icon: {
              id: 3141564,
              tags: "scale,accounting,balance,inequality,money,business and finance,banking,justice scale",
              image: "https://cdn-icons-png.flaticon.com/512/3141/3141564.png",
              description: "Economic disparities"
            },
            brand: {
              title: "FaireLaw",
              titleFamily: "Comfortaa Bold Alt2",
              titleVariant: "700",
              taglineFamily: "Raleway",
              taglineVariant: "500",
              titleColor: "#ffffff",
              taglineColor: "#ffffff",
              backgroundColor: "#6b6e5a"
            }
          },
          {
            icon: {
              id: 6802347,
              tags: "social inequality,xenophobia,human rights,no racism,miscellaneous,equality",
              image: "https://cdn-icons-png.flaticon.com/512/6802/6802347.png",
              description: "Social inequality"
            },
            brand: {
              title: "TruthfulLaw",
              titleFamily: "Averta",
              titleVariant: "700italic",
              taglineFamily: "Raleway",
              taglineVariant: "500",
              titleColor: "",
              taglineColor: "#ffffff",
              backgroundColor: "#FFFFFF"
            }
          },
          {
            icon: {
              id: 3391631,
              tags: "choice,inequality,influencer,subscribe,balance,follow,like,dislike,blogger,social media",
              image: "https://cdn-icons-png.flaticon.com/512/3391/3391631.png",
              description: "Choice"
            },
            brand: {
              title: "JUSTLAW",
              titleFamily: "Montserrat ExtraBold Alt1",
              titleVariant: "800",
              taglineFamily: "Montserrat",
              taglineVariant: "500",
              titleColor: "#ffffff",
              taglineColor: "#ffffff",
              backgroundColor: "#efefef"
            }
          },
          {
            icon: {
              id: 2635584,
              tags: "ph balance,business and finance,inequality,legal,judge,balanced,law,balance,justice,business",
              image: "https://cdn-icons-png.flaticon.com/512/2635/2635584.png",
              description: "Balance"
            },
            brand: {
              title: "LAWCITER",
              titleFamily: "Phenomena",
              titleVariant: "700",
              taglineFamily: "Fira Sans Condensed",
              taglineVariant: "italic",
              titleColor: "",
              taglineColor: "#ffffff",
              backgroundColor: "#304c82"
            }
          },
          {
            icon: {
              id: 2698362,
              tags: "weighing scale,inequality,law,balance,scale,laws,scales,business and finance,justice scale,judge,justice",
              image: "https://cdn-icons-png.flaticon.com/512/2698/2698362.png",
              description: "Balance"
            },
            brand: {
              title: "OPENLAWS",
              titleFamily: "Raleway Medium Alt1",
              titleVariant: "500",
              taglineFamily: "Raleway",
              taglineVariant: "600italic",
              titleColor: "#ffffff",
              taglineColor: "#ffffff",
              backgroundColor: "#88c6d1"
            }
          },
          {
            icon: {
              id: 1757240,
              tags: "law,justice,inequality,justice scale,business and finance,laws,judge,balance",
              image: "https://cdn-icons-png.flaticon.com/512/1757/1757240.png",
              description: "Balance"
            },
            brand: {
              title: "lawful",
              titleFamily: "Brandmark1 Bold",
              titleVariant: "700",
              taglineFamily: "Montserrat",
              taglineVariant: "400",
              titleColor: "#b15640",
              taglineColor: "#ffffff",
              backgroundColor: "#a59b93"
            }
          }
        ]
      };
    }
    this.setIdeaText(response.idea);
    this.setLogos(response.logos || []);
  }
  async _refreshForm() {
    this._firstIdea = true;
    this.setIdeaText("clear");
    this.setLogos([]);
    this._selectedStudies.value = "";
    this._selectedStudies.removeAttribute("invalid");
    this._selectedCountry.value = "";
    this._selectedCountry.removeAttribute("invalid");
    this._selectedSector.value = "";
    this._selectedSector.removeAttribute("invalid");
    this._selectedODS.value = "";
    this._selectedODS.removeAttribute("invalid");
  }
  setLogos(logos) {
    if (logos.length > 0) {
      logos.map((logo) => {
        var _a2;
        const font = this._variables.fonts[Math.floor(Math.random() * this._variables.fonts.length)];
        const style = `
          color: ${this.invertColor(logo.brand.backgroundColor, false)} !important;
          font-family: ${font.family} !important;
          font-weight: ${font.variant} !important;
        `;
        const divObj = document.createElement("bx-tile");
        divObj.className = "cds--col exp-text-center exp-questions-margins";
        divObj.style.backgroundColor = logo.brand.backgroundColor;
        divObj.style.border = "2px solid lightgray";
        divObj.innerHTML = `
          ${((_a2 = logo == null ? void 0 : logo.icon) == null ? void 0 : _a2.image) ? '<img src="' + logo.icon.image + '" class="business-icon">' : ""}
          <h5 style="${style}">${logo.brand.title.toLocaleUpperCase("en")}</h5>
        `;
        this._areaProGallery.appendChild(divObj);
      });
      this._iconAttribution.innerHTML = `
        <a href="https://www.flaticon.com/free-icons/icon" 
          target="_blank" rel="noopener" title="Icons attribution"
        >
          <span>Icons created by Freepik - Flaticon</span>
        </a>
      `;
    } else {
      this._areaProGallery.innerHTML = "";
    }
  }
  setIdeaText(text) {
    if (text === "clear") {
      this._areaIdeaText.innerHTML = "";
      this._iconAttribution.innerHTML = "";
    } else if (text === "loading") {
      this._iconAttribution.innerHTML = "";
      this._areaIdeaText.innerHTML = `
        <div style="position: relative; padding: 3rem; display: flex;">
          <!-- <bx-loading assistiveText="Loading ..." type="overlay"></bx-loading> -->
          <exp-loading-circles></exp-loading-circles>
        </div>
      `;
    } else {
      this._firstIdea = false;
      this._areaIdeaText.innerHTML = `
        <h3>${this._texts[this.expLang].ideaHeader}</h3>
        <h4>${text}</h4>
        <h5>${this._texts[this.expLang].logoHeader}</h5>
      `;
    }
  }
};
ExpFormIdeaxCreator.styles = [o$5(styles)];
__decorateClass([
  i("#ideaAttr", true)
], ExpFormIdeaxCreator.prototype, "_formIdeaAttr", 2);
__decorateClass([
  i("#proGallery", true)
], ExpFormIdeaxCreator.prototype, "_areaProGallery", 2);
__decorateClass([
  i("#ideaText", true)
], ExpFormIdeaxCreator.prototype, "_areaIdeaText", 2);
__decorateClass([
  i("#studies", true)
], ExpFormIdeaxCreator.prototype, "_selectedStudies", 2);
__decorateClass([
  i("#country", true)
], ExpFormIdeaxCreator.prototype, "_selectedCountry", 2);
__decorateClass([
  i("#sector", true)
], ExpFormIdeaxCreator.prototype, "_selectedSector", 2);
__decorateClass([
  i("#ods", true)
], ExpFormIdeaxCreator.prototype, "_selectedODS", 2);
__decorateClass([
  i("#iconAttribution", true)
], ExpFormIdeaxCreator.prototype, "_iconAttribution", 2);
__decorateClass([
  e()
], ExpFormIdeaxCreator.prototype, "expLang", 2);
__decorateClass([
  e({ state: true })
], ExpFormIdeaxCreator.prototype, "_firstIdea", 2);
__decorateClass([
  e({ state: true })
], ExpFormIdeaxCreator.prototype, "_variables", 2);
__decorateClass([
  e({ state: true })
], ExpFormIdeaxCreator.prototype, "_texts", 2);
__decorateClass([
  e({ state: true })
], ExpFormIdeaxCreator.prototype, "_studies", 2);
__decorateClass([
  e({ state: true })
], ExpFormIdeaxCreator.prototype, "_countries", 2);
__decorateClass([
  e({ state: true })
], ExpFormIdeaxCreator.prototype, "_sectors", 2);
__decorateClass([
  e({ state: true })
], ExpFormIdeaxCreator.prototype, "_ods", 2);
ExpFormIdeaxCreator = __decorateClass([
  n$1("exp-wizard")
], ExpFormIdeaxCreator);
export { ExpFormIdeaxCreator };
