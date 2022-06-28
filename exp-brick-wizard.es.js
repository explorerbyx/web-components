import { LitElement, LitElement as LitElement$1, html, html as html$1 } from "https://cdn.skypack.dev/lit";
import { unsafeCSS, css, svg, svg as svg$1 } from "https://cdn.skypack.dev/lit";
import { query, query as query$1, property, property as property$1, customElement, customElement as customElement$1 } from "https://cdn.skypack.dev/lit/decorators.js";
import { map } from "https://cdn.skypack.dev/lit/directives/map.js";
import { ifDefined } from "https://cdn.skypack.dev/lit/directives/if-defined.js";
import { classMap } from "https://cdn.skypack.dev/lit/directives/class-map.js";
import { directive, PropertyPart } from "https://cdn.skypack.dev/lit/directive.js";
var axios$2 = { exports: {} };
var bind$2 = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$1 = bind$2;
var toString = Object.prototype.toString;
var kindOf = function(cache) {
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(/* @__PURE__ */ Object.create(null));
function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}
function isArray(val) {
  return Array.isArray(val);
}
function isUndefined(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number";
}
function isObject(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject(val) {
  if (kindOf(val) !== "object") {
    return false;
  }
  var prototype2 = Object.getPrototypeOf(val);
  return prototype2 === null || prototype2 === Object.prototype;
}
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
function isFunction(val) {
  return toString.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
function isFormData(thing) {
  var pattern = "[object FormData]";
  return thing && (typeof FormData === "function" && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}
var isURLSearchParams = kindOfTest("URLSearchParams");
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind$1(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
function inherits(constructor, superConstructor, props, descriptors2) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}
function toFlatObject(sourceObj, destObj, filter2) {
  var props;
  var i;
  var prop;
  var merged = {};
  destObj = destObj || {};
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
}
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}
function toArray(thing) {
  if (!thing)
    return null;
  var i = thing.length;
  if (isUndefined(i))
    return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}
var isTypedArray = function(TypedArray) {
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
var utils$h = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isFunction,
  isStream,
  isURLSearchParams,
  isStandardBrowserEnv,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  isTypedArray,
  isFileList
};
var utils$g = utils$h;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$2 = function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$g.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$g.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$g.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$g.forEach(val, function parseValue(v) {
        if (utils$g.isDate(v)) {
          v = v.toISOString();
        } else if (utils$g.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + "=" + encode(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$f = utils$h;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$f.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$e = utils$h;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$e.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
var utils$d = utils$h;
function AxiosError$5(message, code, config, request2, response) {
  Error.call(this);
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request2 && (this.request = request2);
  response && (this.response = response);
}
utils$d.inherits(AxiosError$5, Error, {
  toJSON: function toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError$5.prototype;
var descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED"
].forEach(function(code) {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$5, descriptors);
Object.defineProperty(prototype, "isAxiosError", { value: true });
AxiosError$5.from = function(error, code, config, request2, response, customProps) {
  var axiosError = Object.create(prototype);
  utils$d.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  });
  AxiosError$5.call(axiosError, error.message, code, config, request2, response);
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
var AxiosError_1 = AxiosError$5;
var transitional = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
var utils$c = utils$h;
function toFormData$1(obj, formData) {
  formData = formData || new FormData();
  var stack = [];
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils$c.isDate(value)) {
      return value.toISOString();
    }
    if (utils$c.isArrayBuffer(value) || utils$c.isTypedArray(value)) {
      return typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function build(data2, parentKey) {
    if (utils$c.isPlainObject(data2) || utils$c.isArray(data2)) {
      if (stack.indexOf(data2) !== -1) {
        throw Error("Circular reference detected in " + parentKey);
      }
      stack.push(data2);
      utils$c.forEach(data2, function each(value, key) {
        if (utils$c.isUndefined(value))
          return;
        var fullKey = parentKey ? parentKey + "." + key : key;
        var arr;
        if (value && !parentKey && typeof value === "object") {
          if (utils$c.endsWith(key, "{}")) {
            value = JSON.stringify(value);
          } else if (utils$c.endsWith(key, "[]") && (arr = utils$c.toArray(value))) {
            arr.forEach(function(el) {
              !utils$c.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }
        build(value, fullKey);
      });
      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data2));
    }
  }
  build(obj);
  return formData;
}
var toFormData_1 = toFormData$1;
var AxiosError$4 = AxiosError_1;
var settle$1 = function settle(resolve, reject, response) {
  var validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$4("Request failed with status code " + response.status, [AxiosError$4.ERR_BAD_REQUEST, AxiosError$4.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
};
var utils$b = utils$h;
var cookies$1 = utils$b.isStandardBrowserEnv() ? function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + "=" + encodeURIComponent(value));
      if (utils$b.isNumber(expires)) {
        cookie.push("expires=" + new Date(expires).toGMTString());
      }
      if (utils$b.isString(path)) {
        cookie.push("path=" + path);
      }
      if (utils$b.isString(domain)) {
        cookie.push("domain=" + domain);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      document.cookie = cookie.join("; ");
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  };
}() : function nonStandardBrowserEnv() {
  return {
    write: function write() {
    },
    read: function read() {
      return null;
    },
    remove: function remove() {
    }
  };
}();
var isAbsoluteURL$1 = function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs$1 = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL2 = isAbsoluteURL$1;
var combineURLs2 = combineURLs$1;
var buildFullPath$2 = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL2(requestedURL)) {
    return combineURLs2(baseURL, requestedURL);
  }
  return requestedURL;
};
var utils$a = utils$h;
var ignoreDuplicateOf = [
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
];
var parseHeaders$1 = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;
  if (!headers) {
    return parsed;
  }
  utils$a.forEach(headers.split("\n"), function parser(line) {
    i = line.indexOf(":");
    key = utils$a.trim(line.substr(0, i)).toLowerCase();
    val = utils$a.trim(line.substr(i + 1));
    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === "set-cookie") {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    }
  });
  return parsed;
};
var utils$9 = utils$h;
var isURLSameOrigin$1 = utils$9.isStandardBrowserEnv() ? function standardBrowserEnv2() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement("a");
  var originURL;
  function resolveURL(url) {
    var href = url;
    if (msie) {
      urlParsingNode.setAttribute("href", href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute("href", href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin2(requestURL) {
    var parsed = utils$9.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv2() {
  return function isURLSameOrigin2() {
    return true;
  };
}();
var AxiosError$3 = AxiosError_1;
var utils$8 = utils$h;
function CanceledError$3(message) {
  AxiosError$3.call(this, message == null ? "canceled" : message, AxiosError$3.ERR_CANCELED);
  this.name = "CanceledError";
}
utils$8.inherits(CanceledError$3, AxiosError$3, {
  __CANCEL__: true
});
var CanceledError_1 = CanceledError$3;
var parseProtocol$1 = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
};
var utils$7 = utils$h;
var settle2 = settle$1;
var cookies = cookies$1;
var buildURL$1 = buildURL$2;
var buildFullPath$1 = buildFullPath$2;
var parseHeaders2 = parseHeaders$1;
var isURLSameOrigin = isURLSameOrigin$1;
var transitionalDefaults$1 = transitional;
var AxiosError$2 = AxiosError_1;
var CanceledError$2 = CanceledError_1;
var parseProtocol2 = parseProtocol$1;
var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", onCanceled);
      }
    }
    if (utils$7.isFormData(requestData) && utils$7.isStandardBrowserEnv()) {
      delete requestHeaders["Content-Type"];
    }
    var request2 = new XMLHttpRequest();
    if (config.auth) {
      var username = config.auth.username || "";
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
      requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
    }
    var fullPath = buildFullPath$1(config.baseURL, config.url);
    request2.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);
    request2.timeout = config.timeout;
    function onloadend() {
      if (!request2) {
        return;
      }
      var responseHeaders = "getAllResponseHeaders" in request2 ? parseHeaders2(request2.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === "text" || responseType === "json" ? request2.responseText : request2.response;
      var response = {
        data: responseData,
        status: request2.status,
        statusText: request2.statusText,
        headers: responseHeaders,
        config,
        request: request2
      };
      settle2(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request2 = null;
    }
    if ("onloadend" in request2) {
      request2.onloadend = onloadend;
    } else {
      request2.onreadystatechange = function handleLoad() {
        if (!request2 || request2.readyState !== 4) {
          return;
        }
        if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request2.onabort = function handleAbort() {
      if (!request2) {
        return;
      }
      reject(new AxiosError$2("Request aborted", AxiosError$2.ECONNABORTED, config, request2));
      request2 = null;
    };
    request2.onerror = function handleError() {
      reject(new AxiosError$2("Network Error", AxiosError$2.ERR_NETWORK, config, request2, request2));
      request2 = null;
    };
    request2.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
      var transitional3 = config.transitional || transitionalDefaults$1;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError$2(timeoutErrorMessage, transitional3.clarifyTimeoutError ? AxiosError$2.ETIMEDOUT : AxiosError$2.ECONNABORTED, config, request2));
      request2 = null;
    };
    if (utils$7.isStandardBrowserEnv()) {
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }
    if ("setRequestHeader" in request2) {
      utils$7.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
          delete requestHeaders[key];
        } else {
          request2.setRequestHeader(key, val);
        }
      });
    }
    if (!utils$7.isUndefined(config.withCredentials)) {
      request2.withCredentials = !!config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request2.responseType = config.responseType;
    }
    if (typeof config.onDownloadProgress === "function") {
      request2.addEventListener("progress", config.onDownloadProgress);
    }
    if (typeof config.onUploadProgress === "function" && request2.upload) {
      request2.upload.addEventListener("progress", config.onUploadProgress);
    }
    if (config.cancelToken || config.signal) {
      onCanceled = function(cancel) {
        if (!request2) {
          return;
        }
        reject(!cancel || cancel && cancel.type ? new CanceledError$2() : cancel);
        request2.abort();
        request2 = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
      }
    }
    if (!requestData) {
      requestData = null;
    }
    var protocol = parseProtocol2(fullPath);
    if (protocol && ["http", "https", "file"].indexOf(protocol) === -1) {
      reject(new AxiosError$2("Unsupported protocol " + protocol + ":", AxiosError$2.ERR_BAD_REQUEST, config));
      return;
    }
    request2.send(requestData);
  });
};
var _null = null;
var utils$6 = utils$h;
var normalizeHeaderName2 = normalizeHeaderName$1;
var AxiosError$1 = AxiosError_1;
var transitionalDefaults = transitional;
var toFormData = toFormData_1;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = xhr;
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = xhr;
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$6.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$6.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$3 = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data2, headers) {
    normalizeHeaderName2(headers, "Accept");
    normalizeHeaderName2(headers, "Content-Type");
    if (utils$6.isFormData(data2) || utils$6.isArrayBuffer(data2) || utils$6.isBuffer(data2) || utils$6.isStream(data2) || utils$6.isFile(data2) || utils$6.isBlob(data2)) {
      return data2;
    }
    if (utils$6.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$6.isURLSearchParams(data2)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data2.toString();
    }
    var isObjectPayload = utils$6.isObject(data2);
    var contentType = headers && headers["Content-Type"];
    var isFileList2;
    if ((isFileList2 = utils$6.isFileList(data2)) || isObjectPayload && contentType === "multipart/form-data") {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList2 ? { "files[]": data2 } : data2, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    var transitional3 = this.transitional || defaults$3.transitional;
    var silentJSONParsing = transitional3 && transitional3.silentJSONParsing;
    var forcedJSONParsing = transitional3 && transitional3.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$6.isString(data2) && data2.length) {
      try {
        return JSON.parse(data2);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data2;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: _null
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils$6.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$3.headers[method] = {};
});
utils$6.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$3.headers[method] = utils$6.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$3;
var utils$5 = utils$h;
var defaults$2 = defaults_1;
var transformData$1 = function transformData(data2, headers, fns) {
  var context = this || defaults$2;
  utils$5.forEach(fns, function transform(fn) {
    data2 = fn.call(context, data2, headers);
  });
  return data2;
};
var isCancel$1 = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
var utils$4 = utils$h;
var transformData2 = transformData$1;
var isCancel2 = isCancel$1;
var defaults$1 = defaults_1;
var CanceledError$1 = CanceledError_1;
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1();
  }
}
var dispatchRequest$1 = function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData2.call(config, config.data, config.headers, config.transformRequest);
  config.headers = utils$4.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils$4.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults$1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData2.call(config, response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel2(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData2.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }
    return Promise.reject(reason);
  });
};
var utils$3 = utils$h;
var mergeConfig$2 = function mergeConfig(config1, config2) {
  config2 = config2 || {};
  var config = {};
  function getMergedValue(target, source2) {
    if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source2)) {
      return utils$3.merge(target, source2);
    } else if (utils$3.isPlainObject(source2)) {
      return utils$3.merge({}, source2);
    } else if (utils$3.isArray(source2)) {
      return source2.slice();
    }
    return source2;
  }
  function mergeDeepProperties(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function valueFromConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    }
  }
  function defaultToConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      return getMergedValue(void 0, config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(void 0, config1[prop]);
    }
  }
  var mergeMap = {
    "url": valueFromConfig2,
    "method": valueFromConfig2,
    "data": valueFromConfig2,
    "baseURL": defaultToConfig2,
    "transformRequest": defaultToConfig2,
    "transformResponse": defaultToConfig2,
    "paramsSerializer": defaultToConfig2,
    "timeout": defaultToConfig2,
    "timeoutMessage": defaultToConfig2,
    "withCredentials": defaultToConfig2,
    "adapter": defaultToConfig2,
    "responseType": defaultToConfig2,
    "xsrfCookieName": defaultToConfig2,
    "xsrfHeaderName": defaultToConfig2,
    "onUploadProgress": defaultToConfig2,
    "onDownloadProgress": defaultToConfig2,
    "decompress": defaultToConfig2,
    "maxContentLength": defaultToConfig2,
    "maxBodyLength": defaultToConfig2,
    "beforeRedirect": defaultToConfig2,
    "transport": defaultToConfig2,
    "httpAgent": defaultToConfig2,
    "httpsAgent": defaultToConfig2,
    "cancelToken": defaultToConfig2,
    "socketPath": defaultToConfig2,
    "responseEncoding": defaultToConfig2,
    "validateStatus": mergeDirectKeys
  };
  utils$3.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge2 = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge2(prop);
    utils$3.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};
var data = {
  "version": "0.27.2"
};
var VERSION = data.version;
var AxiosError = AxiosError_1;
var validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i) {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators$1.transitional = function transitional2(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new AxiosError(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError.ERR_DEPRECATED);
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
var validator$1 = {
  assertOptions,
  validators: validators$1
};
var utils$2 = utils$h;
var buildURL2 = buildURL$2;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest2 = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var buildFullPath2 = buildFullPath$2;
var validator = validator$1;
var validators = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request(configOrUrl, config) {
  if (typeof configOrUrl === "string") {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }
  config = mergeConfig$1(this.defaults, config);
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  var transitional3 = config.transitional;
  if (transitional3 !== void 0) {
    validator.assertOptions(transitional3, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest2, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest2(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  var fullPath = buildFullPath2(config.baseURL, config.url);
  return buildURL2(fullPath, config.params, config.paramsSerializer);
};
utils$2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$2.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_1 = Axios$1;
var CanceledError = CanceledError_1;
function CancelToken(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor must be a function.");
  }
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  this.promise.then(function(cancel) {
    if (!token._listeners)
      return;
    var i;
    var l = token._listeners.length;
    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });
  this.promise.then = function(onfulfilled) {
    var _resolve;
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);
    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };
    return promise;
  };
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }
    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }
  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};
CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token,
    cancel
  };
};
var CancelToken_1 = CancelToken;
var spread$1 = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};
var utils$1 = utils$h;
var isAxiosError = function isAxiosError2(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
};
var utils = utils$h;
var bind2 = bind$2;
var Axios = Axios_1;
var mergeConfig2 = mergeConfig$2;
var defaults = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind2(Axios.prototype.request, context);
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig2(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios$1 = createInstance(defaults);
axios$1.Axios = Axios;
axios$1.CanceledError = CanceledError_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel$1;
axios$1.VERSION = data.version;
axios$1.toFormData = toFormData_1;
axios$1.AxiosError = AxiosError_1;
axios$1.Cancel = axios$1.CanceledError;
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread$1;
axios$1.isAxiosError = isAxiosError;
axios$2.exports = axios$1;
axios$2.exports.default = axios$1;
var axios = axios$2.exports;
var expBrickWizard = /* @__PURE__ */ (() => ':host .cds--grid{margin-right:auto;margin-left:auto;max-width:66rem;padding-right:.6666666667rem;padding-left:.6666666667rem}@media (min-width: 28rem){:host .cds--grid{padding-right:1.3333333333rem;padding-left:1.3333333333rem}}@media (min-width: 66rem){:host .cds--grid{padding-right:1.6666666667rem;padding-left:1.6666666667rem}}@media (min-width: 66rem){:host .cds--grid--full-width{max-width:100%}}:host .cds--row{display:flex;flex-wrap:wrap;margin-right:-.6666666667rem;margin-left:-.6666666667rem}:host .cds--row-padding [class*=cds--col],:host .cds--col-padding{padding-top:.6666666667rem;padding-bottom:.6666666667rem}:host .cds--grid--condensed [class*=cds--col]{padding-top:.0208333333rem;padding-bottom:.0208333333rem}:host .cds--col{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col,.cds--grid--condensed :host .cds--col{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col,.cds--grid--narrow :host .cds--col{padding-right:.6666666667rem;padding-left:0}:host .cds--col-sm-0{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-sm-0,.cds--grid--condensed :host .cds--col-sm-0{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-sm-0,.cds--grid--narrow :host .cds--col-sm-0{padding-right:.6666666667rem;padding-left:0}:host .cds--col-sm-1{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-sm-1,.cds--grid--condensed :host .cds--col-sm-1{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-sm-1,.cds--grid--narrow :host .cds--col-sm-1{padding-right:.6666666667rem;padding-left:0}:host .cds--col-sm-2{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-sm-2,.cds--grid--condensed :host .cds--col-sm-2{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-sm-2,.cds--grid--narrow :host .cds--col-sm-2{padding-right:.6666666667rem;padding-left:0}:host .cds--col-sm-3{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-sm-3,.cds--grid--condensed :host .cds--col-sm-3{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-sm-3,.cds--grid--narrow :host .cds--col-sm-3{padding-right:.6666666667rem;padding-left:0}:host .cds--col-sm-4{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-sm-4,.cds--grid--condensed :host .cds--col-sm-4{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-sm-4,.cds--grid--narrow :host .cds--col-sm-4{padding-right:.6666666667rem;padding-left:0}:host .cds--col-sm,:host .cds--col-sm--auto{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-sm,.cds--grid--condensed :host .cds--col-sm,.cds--row--condensed :host .cds--col-sm--auto,.cds--grid--condensed :host .cds--col-sm--auto{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-sm,.cds--grid--narrow :host .cds--col-sm,.cds--row--narrow :host .cds--col-sm--auto,.cds--grid--narrow :host .cds--col-sm--auto{padding-right:.6666666667rem;padding-left:0}:host .cds--col,:host .cds--col-sm{max-width:100%;flex-basis:0;flex-grow:1}:host .cds--col--auto,:host .cds--col-sm--auto{width:auto;max-width:100%;flex:1 0 0%}:host .cds--col-sm-0{display:none}:host .cds--col-sm-1{display:block;max-width:25%;flex:0 0 25%}:host .cds--col-sm-2{display:block;max-width:50%;flex:0 0 50%}:host .cds--col-sm-3{display:block;max-width:75%;flex:0 0 75%}:host .cds--col-sm-4{display:block;max-width:100%;flex:0 0 100%}:host .cds--offset-sm-0{margin-left:0}:host .cds--offset-sm-1{margin-left:25%}:host .cds--offset-sm-2{margin-left:50%}:host .cds--offset-sm-3{margin-left:75%}:host .cds--col-md-0{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-md-0,.cds--grid--condensed :host .cds--col-md-0{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-md-0,.cds--grid--narrow :host .cds--col-md-0{padding-right:.6666666667rem;padding-left:0}:host .cds--col-md-1{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-md-1,.cds--grid--condensed :host .cds--col-md-1{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-md-1,.cds--grid--narrow :host .cds--col-md-1{padding-right:.6666666667rem;padding-left:0}:host .cds--col-md-2{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-md-2,.cds--grid--condensed :host .cds--col-md-2{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-md-2,.cds--grid--narrow :host .cds--col-md-2{padding-right:.6666666667rem;padding-left:0}:host .cds--col-md-3{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-md-3,.cds--grid--condensed :host .cds--col-md-3{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-md-3,.cds--grid--narrow :host .cds--col-md-3{padding-right:.6666666667rem;padding-left:0}:host .cds--col-md-4{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-md-4,.cds--grid--condensed :host .cds--col-md-4{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-md-4,.cds--grid--narrow :host .cds--col-md-4{padding-right:.6666666667rem;padding-left:0}:host .cds--col-md-5{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-md-5,.cds--grid--condensed :host .cds--col-md-5{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-md-5,.cds--grid--narrow :host .cds--col-md-5{padding-right:.6666666667rem;padding-left:0}:host .cds--col-md-6{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-md-6,.cds--grid--condensed :host .cds--col-md-6{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-md-6,.cds--grid--narrow :host .cds--col-md-6{padding-right:.6666666667rem;padding-left:0}:host .cds--col-md-7{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-md-7,.cds--grid--condensed :host .cds--col-md-7{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-md-7,.cds--grid--narrow :host .cds--col-md-7{padding-right:.6666666667rem;padding-left:0}:host .cds--col-md-8{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-md-8,.cds--grid--condensed :host .cds--col-md-8{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-md-8,.cds--grid--narrow :host .cds--col-md-8{padding-right:.6666666667rem;padding-left:0}:host .cds--col-md,:host .cds--col-md--auto{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-md,.cds--grid--condensed :host .cds--col-md,.cds--row--condensed :host .cds--col-md--auto,.cds--grid--condensed :host .cds--col-md--auto{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-md,.cds--grid--narrow :host .cds--col-md,.cds--row--narrow :host .cds--col-md--auto,.cds--grid--narrow :host .cds--col-md--auto{padding-right:.6666666667rem;padding-left:0}@media (min-width: 28rem){:host .cds--col,:host .cds--col-md{max-width:100%;flex-basis:0;flex-grow:1}:host .cds--col--auto,:host .cds--col-md--auto{width:auto;max-width:100%;flex:1 0 0%}:host .cds--col-md-0{display:none}:host .cds--col-md-1{display:block;max-width:12.5%;flex:0 0 12.5%}:host .cds--col-md-2{display:block;max-width:25%;flex:0 0 25%}:host .cds--col-md-3{display:block;max-width:37.5%;flex:0 0 37.5%}:host .cds--col-md-4{display:block;max-width:50%;flex:0 0 50%}:host .cds--col-md-5{display:block;max-width:62.5%;flex:0 0 62.5%}:host .cds--col-md-6{display:block;max-width:75%;flex:0 0 75%}:host .cds--col-md-7{display:block;max-width:87.5%;flex:0 0 87.5%}:host .cds--col-md-8{display:block;max-width:100%;flex:0 0 100%}:host .cds--offset-md-0{margin-left:0}:host .cds--offset-md-1{margin-left:12.5%}:host .cds--offset-md-2{margin-left:25%}:host .cds--offset-md-3{margin-left:37.5%}:host .cds--offset-md-4{margin-left:50%}:host .cds--offset-md-5{margin-left:62.5%}:host .cds--offset-md-6{margin-left:75%}:host .cds--offset-md-7{margin-left:87.5%}}:host .cds--col-lg-0{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-0,.cds--grid--condensed :host .cds--col-lg-0{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-0,.cds--grid--narrow :host .cds--col-lg-0{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-1{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-1,.cds--grid--condensed :host .cds--col-lg-1{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-1,.cds--grid--narrow :host .cds--col-lg-1{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-2{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-2,.cds--grid--condensed :host .cds--col-lg-2{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-2,.cds--grid--narrow :host .cds--col-lg-2{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-3{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-3,.cds--grid--condensed :host .cds--col-lg-3{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-3,.cds--grid--narrow :host .cds--col-lg-3{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-4{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-4,.cds--grid--condensed :host .cds--col-lg-4{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-4,.cds--grid--narrow :host .cds--col-lg-4{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-5{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-5,.cds--grid--condensed :host .cds--col-lg-5{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-5,.cds--grid--narrow :host .cds--col-lg-5{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-6{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-6,.cds--grid--condensed :host .cds--col-lg-6{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-6,.cds--grid--narrow :host .cds--col-lg-6{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-7{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-7,.cds--grid--condensed :host .cds--col-lg-7{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-7,.cds--grid--narrow :host .cds--col-lg-7{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-8{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-8,.cds--grid--condensed :host .cds--col-lg-8{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-8,.cds--grid--narrow :host .cds--col-lg-8{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-9{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-9,.cds--grid--condensed :host .cds--col-lg-9{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-9,.cds--grid--narrow :host .cds--col-lg-9{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-10{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-10,.cds--grid--condensed :host .cds--col-lg-10{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-10,.cds--grid--narrow :host .cds--col-lg-10{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-11{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-11,.cds--grid--condensed :host .cds--col-lg-11{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-11,.cds--grid--narrow :host .cds--col-lg-11{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-12{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-12,.cds--grid--condensed :host .cds--col-lg-12{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-12,.cds--grid--narrow :host .cds--col-lg-12{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-13{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-13,.cds--grid--condensed :host .cds--col-lg-13{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-13,.cds--grid--narrow :host .cds--col-lg-13{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-14{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-14,.cds--grid--condensed :host .cds--col-lg-14{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-14,.cds--grid--narrow :host .cds--col-lg-14{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-15{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-15,.cds--grid--condensed :host .cds--col-lg-15{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-15,.cds--grid--narrow :host .cds--col-lg-15{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg-16{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg-16,.cds--grid--condensed :host .cds--col-lg-16{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg-16,.cds--grid--narrow :host .cds--col-lg-16{padding-right:.6666666667rem;padding-left:0}:host .cds--col-lg,:host .cds--col-lg--auto{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-lg,.cds--grid--condensed :host .cds--col-lg,.cds--row--condensed :host .cds--col-lg--auto,.cds--grid--condensed :host .cds--col-lg--auto{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-lg,.cds--grid--narrow :host .cds--col-lg,.cds--row--narrow :host .cds--col-lg--auto,.cds--grid--narrow :host .cds--col-lg--auto{padding-right:.6666666667rem;padding-left:0}@media (min-width: 44rem){:host .cds--col,:host .cds--col-lg{max-width:100%;flex-basis:0;flex-grow:1}:host .cds--col--auto,:host .cds--col-lg--auto{width:auto;max-width:100%;flex:1 0 0%}:host .cds--col-lg-0{display:none}:host .cds--col-lg-1{display:block;max-width:6.25%;flex:0 0 6.25%}:host .cds--col-lg-2{display:block;max-width:12.5%;flex:0 0 12.5%}:host .cds--col-lg-3{display:block;max-width:18.75%;flex:0 0 18.75%}:host .cds--col-lg-4{display:block;max-width:25%;flex:0 0 25%}:host .cds--col-lg-5{display:block;max-width:31.25%;flex:0 0 31.25%}:host .cds--col-lg-6{display:block;max-width:37.5%;flex:0 0 37.5%}:host .cds--col-lg-7{display:block;max-width:43.75%;flex:0 0 43.75%}:host .cds--col-lg-8{display:block;max-width:50%;flex:0 0 50%}:host .cds--col-lg-9{display:block;max-width:56.25%;flex:0 0 56.25%}:host .cds--col-lg-10{display:block;max-width:62.5%;flex:0 0 62.5%}:host .cds--col-lg-11{display:block;max-width:68.75%;flex:0 0 68.75%}:host .cds--col-lg-12{display:block;max-width:75%;flex:0 0 75%}:host .cds--col-lg-13{display:block;max-width:81.25%;flex:0 0 81.25%}:host .cds--col-lg-14{display:block;max-width:87.5%;flex:0 0 87.5%}:host .cds--col-lg-15{display:block;max-width:93.75%;flex:0 0 93.75%}:host .cds--col-lg-16{display:block;max-width:100%;flex:0 0 100%}:host .cds--offset-lg-0{margin-left:0}:host .cds--offset-lg-1{margin-left:6.25%}:host .cds--offset-lg-2{margin-left:12.5%}:host .cds--offset-lg-3{margin-left:18.75%}:host .cds--offset-lg-4{margin-left:25%}:host .cds--offset-lg-5{margin-left:31.25%}:host .cds--offset-lg-6{margin-left:37.5%}:host .cds--offset-lg-7{margin-left:43.75%}:host .cds--offset-lg-8{margin-left:50%}:host .cds--offset-lg-9{margin-left:56.25%}:host .cds--offset-lg-10{margin-left:62.5%}:host .cds--offset-lg-11{margin-left:68.75%}:host .cds--offset-lg-12{margin-left:75%}:host .cds--offset-lg-13{margin-left:81.25%}:host .cds--offset-lg-14{margin-left:87.5%}:host .cds--offset-lg-15{margin-left:93.75%}}:host .cds--col-xlg-0{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-0,.cds--grid--condensed :host .cds--col-xlg-0{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-0,.cds--grid--narrow :host .cds--col-xlg-0{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-1{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-1,.cds--grid--condensed :host .cds--col-xlg-1{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-1,.cds--grid--narrow :host .cds--col-xlg-1{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-2{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-2,.cds--grid--condensed :host .cds--col-xlg-2{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-2,.cds--grid--narrow :host .cds--col-xlg-2{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-3{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-3,.cds--grid--condensed :host .cds--col-xlg-3{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-3,.cds--grid--narrow :host .cds--col-xlg-3{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-4{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-4,.cds--grid--condensed :host .cds--col-xlg-4{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-4,.cds--grid--narrow :host .cds--col-xlg-4{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-5{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-5,.cds--grid--condensed :host .cds--col-xlg-5{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-5,.cds--grid--narrow :host .cds--col-xlg-5{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-6{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-6,.cds--grid--condensed :host .cds--col-xlg-6{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-6,.cds--grid--narrow :host .cds--col-xlg-6{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-7{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-7,.cds--grid--condensed :host .cds--col-xlg-7{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-7,.cds--grid--narrow :host .cds--col-xlg-7{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-8{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-8,.cds--grid--condensed :host .cds--col-xlg-8{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-8,.cds--grid--narrow :host .cds--col-xlg-8{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-9{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-9,.cds--grid--condensed :host .cds--col-xlg-9{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-9,.cds--grid--narrow :host .cds--col-xlg-9{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-10{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-10,.cds--grid--condensed :host .cds--col-xlg-10{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-10,.cds--grid--narrow :host .cds--col-xlg-10{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-11{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-11,.cds--grid--condensed :host .cds--col-xlg-11{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-11,.cds--grid--narrow :host .cds--col-xlg-11{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-12{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-12,.cds--grid--condensed :host .cds--col-xlg-12{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-12,.cds--grid--narrow :host .cds--col-xlg-12{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-13{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-13,.cds--grid--condensed :host .cds--col-xlg-13{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-13,.cds--grid--narrow :host .cds--col-xlg-13{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-14{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-14,.cds--grid--condensed :host .cds--col-xlg-14{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-14,.cds--grid--narrow :host .cds--col-xlg-14{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-15{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-15,.cds--grid--condensed :host .cds--col-xlg-15{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-15,.cds--grid--narrow :host .cds--col-xlg-15{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg-16{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg-16,.cds--grid--condensed :host .cds--col-xlg-16{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg-16,.cds--grid--narrow :host .cds--col-xlg-16{padding-right:.6666666667rem;padding-left:0}:host .cds--col-xlg,:host .cds--col-xlg--auto{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-xlg,.cds--grid--condensed :host .cds--col-xlg,.cds--row--condensed :host .cds--col-xlg--auto,.cds--grid--condensed :host .cds--col-xlg--auto{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-xlg,.cds--grid--narrow :host .cds--col-xlg,.cds--row--narrow :host .cds--col-xlg--auto,.cds--grid--narrow :host .cds--col-xlg--auto{padding-right:.6666666667rem;padding-left:0}@media (min-width: 54.6666666667rem){:host .cds--col,:host .cds--col-xlg{max-width:100%;flex-basis:0;flex-grow:1}:host .cds--col--auto,:host .cds--col-xlg--auto{width:auto;max-width:100%;flex:1 0 0%}:host .cds--col-xlg-0{display:none}:host .cds--col-xlg-1{display:block;max-width:6.25%;flex:0 0 6.25%}:host .cds--col-xlg-2{display:block;max-width:12.5%;flex:0 0 12.5%}:host .cds--col-xlg-3{display:block;max-width:18.75%;flex:0 0 18.75%}:host .cds--col-xlg-4{display:block;max-width:25%;flex:0 0 25%}:host .cds--col-xlg-5{display:block;max-width:31.25%;flex:0 0 31.25%}:host .cds--col-xlg-6{display:block;max-width:37.5%;flex:0 0 37.5%}:host .cds--col-xlg-7{display:block;max-width:43.75%;flex:0 0 43.75%}:host .cds--col-xlg-8{display:block;max-width:50%;flex:0 0 50%}:host .cds--col-xlg-9{display:block;max-width:56.25%;flex:0 0 56.25%}:host .cds--col-xlg-10{display:block;max-width:62.5%;flex:0 0 62.5%}:host .cds--col-xlg-11{display:block;max-width:68.75%;flex:0 0 68.75%}:host .cds--col-xlg-12{display:block;max-width:75%;flex:0 0 75%}:host .cds--col-xlg-13{display:block;max-width:81.25%;flex:0 0 81.25%}:host .cds--col-xlg-14{display:block;max-width:87.5%;flex:0 0 87.5%}:host .cds--col-xlg-15{display:block;max-width:93.75%;flex:0 0 93.75%}:host .cds--col-xlg-16{display:block;max-width:100%;flex:0 0 100%}:host .cds--offset-xlg-0{margin-left:0}:host .cds--offset-xlg-1{margin-left:6.25%}:host .cds--offset-xlg-2{margin-left:12.5%}:host .cds--offset-xlg-3{margin-left:18.75%}:host .cds--offset-xlg-4{margin-left:25%}:host .cds--offset-xlg-5{margin-left:31.25%}:host .cds--offset-xlg-6{margin-left:37.5%}:host .cds--offset-xlg-7{margin-left:43.75%}:host .cds--offset-xlg-8{margin-left:50%}:host .cds--offset-xlg-9{margin-left:56.25%}:host .cds--offset-xlg-10{margin-left:62.5%}:host .cds--offset-xlg-11{margin-left:68.75%}:host .cds--offset-xlg-12{margin-left:75%}:host .cds--offset-xlg-13{margin-left:81.25%}:host .cds--offset-xlg-14{margin-left:87.5%}:host .cds--offset-xlg-15{margin-left:93.75%}}:host .cds--col-max-0{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-0,.cds--grid--condensed :host .cds--col-max-0{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-0,.cds--grid--narrow :host .cds--col-max-0{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-1{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-1,.cds--grid--condensed :host .cds--col-max-1{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-1,.cds--grid--narrow :host .cds--col-max-1{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-2{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-2,.cds--grid--condensed :host .cds--col-max-2{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-2,.cds--grid--narrow :host .cds--col-max-2{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-3{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-3,.cds--grid--condensed :host .cds--col-max-3{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-3,.cds--grid--narrow :host .cds--col-max-3{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-4{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-4,.cds--grid--condensed :host .cds--col-max-4{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-4,.cds--grid--narrow :host .cds--col-max-4{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-5{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-5,.cds--grid--condensed :host .cds--col-max-5{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-5,.cds--grid--narrow :host .cds--col-max-5{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-6{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-6,.cds--grid--condensed :host .cds--col-max-6{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-6,.cds--grid--narrow :host .cds--col-max-6{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-7{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-7,.cds--grid--condensed :host .cds--col-max-7{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-7,.cds--grid--narrow :host .cds--col-max-7{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-8{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-8,.cds--grid--condensed :host .cds--col-max-8{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-8,.cds--grid--narrow :host .cds--col-max-8{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-9{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-9,.cds--grid--condensed :host .cds--col-max-9{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-9,.cds--grid--narrow :host .cds--col-max-9{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-10{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-10,.cds--grid--condensed :host .cds--col-max-10{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-10,.cds--grid--narrow :host .cds--col-max-10{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-11{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-11,.cds--grid--condensed :host .cds--col-max-11{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-11,.cds--grid--narrow :host .cds--col-max-11{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-12{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-12,.cds--grid--condensed :host .cds--col-max-12{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-12,.cds--grid--narrow :host .cds--col-max-12{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-13{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-13,.cds--grid--condensed :host .cds--col-max-13{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-13,.cds--grid--narrow :host .cds--col-max-13{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-14{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-14,.cds--grid--condensed :host .cds--col-max-14{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-14,.cds--grid--narrow :host .cds--col-max-14{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-15{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-15,.cds--grid--condensed :host .cds--col-max-15{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-15,.cds--grid--narrow :host .cds--col-max-15{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max-16{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max-16,.cds--grid--condensed :host .cds--col-max-16{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max-16,.cds--grid--narrow :host .cds--col-max-16{padding-right:.6666666667rem;padding-left:0}:host .cds--col-max,:host .cds--col-max--auto{width:100%;padding-right:.6666666667rem;padding-left:.6666666667rem}.cds--row--condensed :host .cds--col-max,.cds--grid--condensed :host .cds--col-max,.cds--row--condensed :host .cds--col-max--auto,.cds--grid--condensed :host .cds--col-max--auto{padding-right:.0208333333rem;padding-left:.0208333333rem}.cds--row--narrow :host .cds--col-max,.cds--grid--narrow :host .cds--col-max,.cds--row--narrow :host .cds--col-max--auto,.cds--grid--narrow :host .cds--col-max--auto{padding-right:.6666666667rem;padding-left:0}@media (min-width: 66rem){:host .cds--col,:host .cds--col-max{max-width:100%;flex-basis:0;flex-grow:1}:host .cds--col--auto,:host .cds--col-max--auto{width:auto;max-width:100%;flex:1 0 0%}:host .cds--col-max-0{display:none}:host .cds--col-max-1{display:block;max-width:6.25%;flex:0 0 6.25%}:host .cds--col-max-2{display:block;max-width:12.5%;flex:0 0 12.5%}:host .cds--col-max-3{display:block;max-width:18.75%;flex:0 0 18.75%}:host .cds--col-max-4{display:block;max-width:25%;flex:0 0 25%}:host .cds--col-max-5{display:block;max-width:31.25%;flex:0 0 31.25%}:host .cds--col-max-6{display:block;max-width:37.5%;flex:0 0 37.5%}:host .cds--col-max-7{display:block;max-width:43.75%;flex:0 0 43.75%}:host .cds--col-max-8{display:block;max-width:50%;flex:0 0 50%}:host .cds--col-max-9{display:block;max-width:56.25%;flex:0 0 56.25%}:host .cds--col-max-10{display:block;max-width:62.5%;flex:0 0 62.5%}:host .cds--col-max-11{display:block;max-width:68.75%;flex:0 0 68.75%}:host .cds--col-max-12{display:block;max-width:75%;flex:0 0 75%}:host .cds--col-max-13{display:block;max-width:81.25%;flex:0 0 81.25%}:host .cds--col-max-14{display:block;max-width:87.5%;flex:0 0 87.5%}:host .cds--col-max-15{display:block;max-width:93.75%;flex:0 0 93.75%}:host .cds--col-max-16{display:block;max-width:100%;flex:0 0 100%}:host .cds--offset-max-0{margin-left:0}:host .cds--offset-max-1{margin-left:6.25%}:host .cds--offset-max-2{margin-left:12.5%}:host .cds--offset-max-3{margin-left:18.75%}:host .cds--offset-max-4{margin-left:25%}:host .cds--offset-max-5{margin-left:31.25%}:host .cds--offset-max-6{margin-left:37.5%}:host .cds--offset-max-7{margin-left:43.75%}:host .cds--offset-max-8{margin-left:50%}:host .cds--offset-max-9{margin-left:56.25%}:host .cds--offset-max-10{margin-left:62.5%}:host .cds--offset-max-11{margin-left:68.75%}:host .cds--offset-max-12{margin-left:75%}:host .cds--offset-max-13{margin-left:81.25%}:host .cds--offset-max-14{margin-left:87.5%}:host .cds--offset-max-15{margin-left:93.75%}}:host .cds--no-gutter,:host .cds--row.cds--no-gutter [class*=cds--col]{padding-right:0;padding-left:0}:host .cds--no-gutter--start,:host .cds--row.cds--no-gutter--start [class*=cds--col]{padding-left:0}:host .cds--no-gutter--end,:host .cds--row.cds--no-gutter--end [class*=cds--col]{padding-right:0}:host .cds--hang--start{padding-left:.6666666667rem}:host .cds--hang--end{padding-right:.6666666667rem}:host html{font-size:100%}:host body{font-weight:400;font-family:IBM Plex Sans,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}:host code{font-family:IBM Plex Mono,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",monospace}:host strong{font-weight:600}:host h1{font-size:var(--cds-heading-06-font-size, 1.3333333333rem);font-weight:var(--cds-heading-06-font-weight, 300);line-height:var(--cds-heading-06-line-height, 1.199);letter-spacing:var(--cds-heading-06-letter-spacing, 0)}:host h2{font-size:var(--cds-heading-05-font-size, 1.3333333333rem);font-weight:var(--cds-heading-05-font-weight, 400);line-height:var(--cds-heading-05-line-height, 1.25);letter-spacing:var(--cds-heading-05-letter-spacing, 0)}:host h3{font-size:var(--cds-heading-04-font-size, 1.1666666667rem);font-weight:var(--cds-heading-04-font-weight, 400);line-height:var(--cds-heading-04-line-height, 1.28572);letter-spacing:var(--cds-heading-04-letter-spacing, 0)}:host h4{font-size:var(--cds-heading-03-font-size, .8333333333rem);font-weight:var(--cds-heading-03-font-weight, 400);line-height:var(--cds-heading-03-line-height, 1.4);letter-spacing:var(--cds-heading-03-letter-spacing, 0)}:host h5{font-size:var(--cds-heading-02-font-size, .6666666667rem);font-weight:var(--cds-heading-02-font-weight, 600);line-height:var(--cds-heading-02-line-height, 1.5);letter-spacing:var(--cds-heading-02-letter-spacing, 0)}:host h6{font-size:var(--cds-heading-01-font-size, .5833333333rem);font-weight:var(--cds-heading-01-font-weight, 600);line-height:var(--cds-heading-01-line-height, 1.42857);letter-spacing:var(--cds-heading-01-letter-spacing, .16px)}:host p{font-size:var(--cds-body-02-font-size, .6666666667rem);font-weight:var(--cds-body-02-font-weight, 400);line-height:var(--cds-body-02-line-height, 1.5);letter-spacing:var(--cds-body-02-letter-spacing, 0)}:host a{color:var(--cds-link-primary, #0062fe)}:host em{font-style:italic}:host .cds--type-mono{font-family:IBM Plex Mono,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",monospace}:host .cds--type-sans{font-family:IBM Plex Sans,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-condensed{font-family:IBM Plex Sans Condensed,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-arabic{font-family:IBM Plex Sans Arabic,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-devanagari{font-family:IBM Plex Sans Devanagari,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-hebrew{font-family:IBM Plex Sans Hebrew,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-jp{font-family:IBM Plex Sans JP,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-kr{font-family:IBM Plex Sans KR,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-thai-looped{font-family:IBM Plex Sans Thai Looped,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-thai{font-family:IBM Plex Sans Thai,system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-serif{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif}:host .cds--type-light{font-weight:300}:host .cds--type-regular{font-weight:400}:host .cds--type-semibold{font-weight:600}:host .cds--type-italic{font-style:italic}:host .cds--type-label-01{font-size:var(--cds-label-01-font-size, .5rem);font-weight:var(--cds-label-01-font-weight, 400);line-height:var(--cds-label-01-line-height, 1.33333);letter-spacing:var(--cds-label-01-letter-spacing, .32px)}:host .cds--type-helper-text-01{font-size:var(--cds-helper-text-01-font-size, .5rem);line-height:var(--cds-helper-text-01-line-height, 1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing, .32px)}:host .cds--type-body-short-01{font-size:var(--cds-body-short-01-font-size, .5833333333rem);font-weight:var(--cds-body-short-01-font-weight, 400);line-height:var(--cds-body-short-01-line-height, 1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing, .16px)}:host .cds--type-body-short-02{font-size:var(--cds-body-short-02-font-size, .6666666667rem);font-weight:var(--cds-body-short-02-font-weight, 400);line-height:var(--cds-body-short-02-line-height, 1.375);letter-spacing:var(--cds-body-short-02-letter-spacing, 0)}:host .cds--type-body-long-01{font-size:var(--cds-body-long-01-font-size, .5833333333rem);font-weight:var(--cds-body-long-01-font-weight, 400);line-height:var(--cds-body-long-01-line-height, 1.42857);letter-spacing:var(--cds-body-long-01-letter-spacing, .16px)}:host .cds--type-body-long-02{font-size:var(--cds-body-long-02-font-size, .6666666667rem);font-weight:var(--cds-body-long-02-font-weight, 400);line-height:var(--cds-body-long-02-line-height, 1.5);letter-spacing:var(--cds-body-long-02-letter-spacing, 0)}:host .cds--type-code-01{font-family:var(--cds-code-01-font-family, "IBM Plex Mono", system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", monospace);font-size:var(--cds-code-01-font-size, .5rem);font-weight:var(--cds-code-01-font-weight, 400);line-height:var(--cds-code-01-line-height, 1.33333);letter-spacing:var(--cds-code-01-letter-spacing, .32px)}:host .cds--type-code-02{font-family:var(--cds-code-02-font-family, "IBM Plex Mono", system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", monospace);font-size:var(--cds-code-02-font-size, .5833333333rem);font-weight:var(--cds-code-02-font-weight, 400);line-height:var(--cds-code-02-line-height, 1.42857);letter-spacing:var(--cds-code-02-letter-spacing, .32px)}:host .cds--type-heading-01{font-size:var(--cds-heading-01-font-size, .5833333333rem);font-weight:var(--cds-heading-01-font-weight, 600);line-height:var(--cds-heading-01-line-height, 1.42857);letter-spacing:var(--cds-heading-01-letter-spacing, .16px)}:host .cds--type-heading-02{font-size:var(--cds-heading-02-font-size, .6666666667rem);font-weight:var(--cds-heading-02-font-weight, 600);line-height:var(--cds-heading-02-line-height, 1.5);letter-spacing:var(--cds-heading-02-letter-spacing, 0)}:host .cds--type-productive-heading-01{font-size:var(--cds-productive-heading-01-font-size, .5833333333rem);font-weight:var(--cds-productive-heading-01-font-weight, 600);line-height:var(--cds-productive-heading-01-line-height, 1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing, .16px)}:host .cds--type-productive-heading-02{font-size:var(--cds-productive-heading-02-font-size, .6666666667rem);font-weight:var(--cds-productive-heading-02-font-weight, 600);line-height:var(--cds-productive-heading-02-line-height, 1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing, 0)}:host .cds--type-productive-heading-03{font-size:var(--cds-productive-heading-03-font-size, .8333333333rem);font-weight:var(--cds-productive-heading-03-font-weight, 400);line-height:var(--cds-productive-heading-03-line-height, 1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing, 0)}:host .cds--type-productive-heading-04{font-size:var(--cds-productive-heading-04-font-size, 1.1666666667rem);font-weight:var(--cds-productive-heading-04-font-weight, 400);line-height:var(--cds-productive-heading-04-line-height, 1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing, 0)}:host .cds--type-productive-heading-05{font-size:var(--cds-productive-heading-05-font-size, 1.3333333333rem);font-weight:var(--cds-productive-heading-05-font-weight, 400);line-height:var(--cds-productive-heading-05-line-height, 1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing, 0)}:host .cds--type-productive-heading-06{font-size:var(--cds-productive-heading-06-font-size, 1.3333333333rem);font-weight:var(--cds-productive-heading-06-font-weight, 300);line-height:var(--cds-productive-heading-06-line-height, 1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing, 0)}:host .cds--type-productive-heading-07{font-size:var(--cds-productive-heading-07-font-size, 1.75rem);font-weight:var(--cds-productive-heading-07-font-weight, 300);line-height:var(--cds-productive-heading-07-line-height, 1.19);letter-spacing:var(--cds-productive-heading-07-letter-spacing, 0)}:host .cds--type-expressive-paragraph-01{font-size:1rem;font-weight:300;line-height:1.334;letter-spacing:0;font-size:calc(1rem + .1666666667 * ((100vw - 13.3333333333rem) / 30.6666666667))}@media (min-width: 44rem){:host .cds--type-expressive-paragraph-01{font-size:1.1666666667rem;line-height:1.28572;font-size:calc(1.1666666667rem + .1666666667 * ((100vw - 44rem) / 22))}}@media (min-width: 66rem){:host .cds--type-expressive-paragraph-01{line-height:1.25;font-size:1.3333333333rem}}:host .cds--type-expressive-heading-01{font-size:var(--cds-expressive-heading-01-font-size, .5833333333rem);font-weight:var(--cds-expressive-heading-01-font-weight, 600);line-height:var(--cds-expressive-heading-01-line-height, 1.42857);letter-spacing:var(--cds-expressive-heading-01-letter-spacing, .16px)}:host .cds--type-expressive-heading-02{font-size:var(--cds-expressive-heading-02-font-size, .6666666667rem);font-weight:var(--cds-expressive-heading-02-font-weight, 600);line-height:var(--cds-expressive-heading-02-line-height, 1.5);letter-spacing:var(--cds-expressive-heading-02-letter-spacing, 0)}:host .cds--type-expressive-heading-03{font-size:.8333333333rem;font-weight:400;line-height:1.4;letter-spacing:0;font-size:calc(.8333333333rem + 0 * ((100vw - 13.3333333333rem) / 41.3333333333))}@media (min-width: 54.6666666667rem){:host .cds--type-expressive-heading-03{font-size:.8333333333rem;line-height:1.25;font-size:calc(.8333333333rem + .1666666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-expressive-heading-03{line-height:1.334;font-size:1rem}}:host .cds--type-expressive-heading-04{font-size:1.1666666667rem;font-weight:400;line-height:1.28572;letter-spacing:0;font-size:calc(1.1666666667rem + 0 * ((100vw - 13.3333333333rem) / 41.3333333333))}@media (min-width: 54.6666666667rem){:host .cds--type-expressive-heading-04{font-size:1.1666666667rem;line-height:1.25;font-size:calc(1.1666666667rem + .1666666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-expressive-heading-04{font-size:1.3333333333rem}}:host .cds--type-expressive-heading-05{font-size:1.3333333333rem;font-weight:400;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + .1666666667 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-expressive-heading-05{font-size:1.5rem;font-weight:300;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media (min-width: 44rem){:host .cds--type-expressive-heading-05{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-expressive-heading-05{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-expressive-heading-05{font-size:2.5rem}}:host .cds--type-expressive-heading-06{font-size:1.3333333333rem;font-weight:600;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + .1666666667 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-expressive-heading-06{font-size:1.5rem;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media (min-width: 44rem){:host .cds--type-expressive-heading-06{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-expressive-heading-06{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-expressive-heading-06{font-size:2.5rem}}:host .cds--type-quotation-01{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:.8333333333rem;font-weight:400;line-height:1.3;letter-spacing:0;font-size:calc(.8333333333rem + 0 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-quotation-01{font-size:.8333333333rem;font-size:calc(.8333333333rem + .1666666667 * ((100vw - 28rem) / 16))}}@media (min-width: 44rem){:host .cds--type-quotation-01{font-size:1rem;line-height:1.334;font-size:calc(1rem + .1666666667 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-quotation-01{font-size:1.1666666667rem;line-height:1.28572;font-size:calc(1.1666666667rem + .1666666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-quotation-01{line-height:1.25;font-size:1.3333333333rem}}:host .cds--type-quotation-02{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:1.3333333333rem;font-weight:300;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + .1666666667 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-quotation-02{font-size:1.5rem;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media (min-width: 44rem){:host .cds--type-quotation-02{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-quotation-02{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-quotation-02{font-size:2.5rem}}:host .cds--type-display-01{font-size:1.75rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 0 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-display-01{font-size:1.75rem;font-size:calc(1.75rem + .5*(100vw - 28rem)/16)}}@media (min-width: 44rem){:host .cds--type-display-01{font-size:2.25rem;font-size:calc(2.25rem + .25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-display-01{font-size:2.5rem;line-height:1.17;font-size:calc(2.5rem + .6666666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-display-01{line-height:1.13;font-size:3.1666666667rem}}:host .cds--type-display-02{font-size:1.75rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 0 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-display-02{font-size:1.75rem;font-size:calc(1.75rem + .5*(100vw - 28rem)/16)}}@media (min-width: 44rem){:host .cds--type-display-02{font-size:2.25rem;font-size:calc(2.25rem + .25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-display-02{font-size:2.5rem;line-height:1.16;font-size:calc(2.5rem + .6666666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-display-02{line-height:1.13;font-size:3.1666666667rem}}:host .cds--type-display-03{font-size:1.75rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 1.0833333333 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-display-03{font-size:2.8333333333rem;line-height:1.15;font-size:calc(2.8333333333rem + 1 * ((100vw - 28rem) / 16))}}@media (min-width: 44rem){:host .cds--type-display-03{font-size:3.8333333333rem;line-height:1.11;letter-spacing:-.64px;font-size:calc(3.8333333333rem + 1.25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-display-03{font-size:5.0833333333rem;line-height:1.07;letter-spacing:-.64px;font-size:calc(5.0833333333rem + 1.4166666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-display-03{line-height:1.05;letter-spacing:-.96px;font-size:6.5rem}}:host .cds--type-display-04{font-size:1.75rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 1.0833333333 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-display-04{font-size:2.8333333333rem;line-height:1.15;font-size:calc(2.8333333333rem + 1 * ((100vw - 28rem) / 16))}}@media (min-width: 44rem){:host .cds--type-display-04{font-size:3.8333333333rem;line-height:1.11;letter-spacing:-.64px;font-size:calc(3.8333333333rem + 1.25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-display-04{font-size:5.0833333333rem;line-height:1.07;letter-spacing:-.64px;font-size:calc(5.0833333333rem + 1.4166666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-display-04{line-height:1.05;letter-spacing:-.96px;font-size:6.5rem}}:host .cds--type-legal-01{font-size:var(--cds-legal-01-font-size, .5rem);font-weight:var(--cds-legal-01-font-weight, 400);line-height:var(--cds-legal-01-line-height, 1.33333);letter-spacing:var(--cds-legal-01-letter-spacing, .32px)}:host .cds--type-legal-02{font-size:var(--cds-legal-02-font-size, .5833333333rem);font-weight:var(--cds-legal-02-font-weight, 400);line-height:var(--cds-legal-02-line-height, 1.28572);letter-spacing:var(--cds-legal-02-letter-spacing, .16px)}:host .cds--type-body-compact-01{font-size:var(--cds-body-compact-01-font-size, .5833333333rem);font-weight:var(--cds-body-compact-01-font-weight, 400);line-height:var(--cds-body-compact-01-line-height, 1.28572);letter-spacing:var(--cds-body-compact-01-letter-spacing, .16px)}:host .cds--type-body-compact-02{font-size:var(--cds-body-compact-02-font-size, .6666666667rem);font-weight:var(--cds-body-compact-02-font-weight, 400);line-height:var(--cds-body-compact-02-line-height, 1.375);letter-spacing:var(--cds-body-compact-02-letter-spacing, 0)}:host .cds--type-heading-compact-01{font-size:var(--cds-heading-compact-01-font-size, .5833333333rem);font-weight:var(--cds-heading-compact-01-font-weight, 600);line-height:var(--cds-heading-compact-01-line-height, 1.28572);letter-spacing:var(--cds-heading-compact-01-letter-spacing, .16px)}:host .cds--type-heading-compact-02{font-size:var(--cds-heading-compact-02-font-size, .6666666667rem);font-weight:var(--cds-heading-compact-02-font-weight, 600);line-height:var(--cds-heading-compact-02-line-height, 1.375);letter-spacing:var(--cds-heading-compact-02-letter-spacing, 0)}:host .cds--type-body-01{font-size:var(--cds-body-01-font-size, .5833333333rem);font-weight:var(--cds-body-01-font-weight, 400);line-height:var(--cds-body-01-line-height, 1.42857);letter-spacing:var(--cds-body-01-letter-spacing, .16px)}:host .cds--type-body-02{font-size:var(--cds-body-02-font-size, .6666666667rem);font-weight:var(--cds-body-02-font-weight, 400);line-height:var(--cds-body-02-line-height, 1.5);letter-spacing:var(--cds-body-02-letter-spacing, 0)}:host .cds--type-heading-03{font-size:var(--cds-heading-03-font-size, .8333333333rem);font-weight:var(--cds-heading-03-font-weight, 400);line-height:var(--cds-heading-03-line-height, 1.4);letter-spacing:var(--cds-heading-03-letter-spacing, 0)}:host .cds--type-heading-04{font-size:var(--cds-heading-04-font-size, 1.1666666667rem);font-weight:var(--cds-heading-04-font-weight, 400);line-height:var(--cds-heading-04-line-height, 1.28572);letter-spacing:var(--cds-heading-04-letter-spacing, 0)}:host .cds--type-heading-05{font-size:var(--cds-heading-05-font-size, 1.3333333333rem);font-weight:var(--cds-heading-05-font-weight, 400);line-height:var(--cds-heading-05-line-height, 1.25);letter-spacing:var(--cds-heading-05-letter-spacing, 0)}:host .cds--type-heading-06{font-size:var(--cds-heading-06-font-size, 1.3333333333rem);font-weight:var(--cds-heading-06-font-weight, 300);line-height:var(--cds-heading-06-line-height, 1.199);letter-spacing:var(--cds-heading-06-letter-spacing, 0)}:host .cds--type-heading-07{font-size:var(--cds-heading-07-font-size, 1.75rem);font-weight:var(--cds-heading-07-font-weight, 300);line-height:var(--cds-heading-07-line-height, 1.19);letter-spacing:var(--cds-heading-07-letter-spacing, 0)}:host .cds--type-fluid-heading-03{font-size:.8333333333rem;font-weight:400;line-height:1.4;letter-spacing:0;font-size:calc(.8333333333rem + 0 * ((100vw - 13.3333333333rem) / 41.3333333333))}@media (min-width: 54.6666666667rem){:host .cds--type-fluid-heading-03{font-size:.8333333333rem;line-height:1.25;font-size:calc(.8333333333rem + .1666666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-fluid-heading-03{line-height:1.334;font-size:1rem}}:host .cds--type-fluid-heading-04{font-size:1.1666666667rem;font-weight:400;line-height:1.28572;letter-spacing:0;font-size:calc(1.1666666667rem + 0 * ((100vw - 13.3333333333rem) / 41.3333333333))}@media (min-width: 54.6666666667rem){:host .cds--type-fluid-heading-04{font-size:1.1666666667rem;line-height:1.25;font-size:calc(1.1666666667rem + .1666666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-fluid-heading-04{font-size:1.3333333333rem}}:host .cds--type-fluid-heading-05{font-size:1.3333333333rem;font-weight:400;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + .1666666667 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-fluid-heading-05{font-size:1.5rem;font-weight:300;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media (min-width: 44rem){:host .cds--type-fluid-heading-05{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-fluid-heading-05{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-fluid-heading-05{font-size:2.5rem}}:host .cds--type-fluid-heading-06{font-size:1.3333333333rem;font-weight:600;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + .1666666667 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-fluid-heading-06{font-size:1.5rem;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media (min-width: 44rem){:host .cds--type-fluid-heading-06{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-fluid-heading-06{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-fluid-heading-06{font-size:2.5rem}}:host .cds--type-fluid-paragraph-01{font-size:1rem;font-weight:300;line-height:1.334;letter-spacing:0;font-size:calc(1rem + .1666666667 * ((100vw - 13.3333333333rem) / 30.6666666667))}@media (min-width: 44rem){:host .cds--type-fluid-paragraph-01{font-size:1.1666666667rem;line-height:1.28572;font-size:calc(1.1666666667rem + .1666666667 * ((100vw - 44rem) / 22))}}@media (min-width: 66rem){:host .cds--type-fluid-paragraph-01{line-height:1.25;font-size:1.3333333333rem}}:host .cds--type-fluid-quotation-01{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:.8333333333rem;font-weight:400;line-height:1.3;letter-spacing:0;font-size:calc(.8333333333rem + 0 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-fluid-quotation-01{font-size:.8333333333rem;font-size:calc(.8333333333rem + .1666666667 * ((100vw - 28rem) / 16))}}@media (min-width: 44rem){:host .cds--type-fluid-quotation-01{font-size:1rem;line-height:1.334;font-size:calc(1rem + .1666666667 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-fluid-quotation-01{font-size:1.1666666667rem;line-height:1.28572;font-size:calc(1.1666666667rem + .1666666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-fluid-quotation-01{line-height:1.25;font-size:1.3333333333rem}}:host .cds--type-fluid-quotation-02{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:1.3333333333rem;font-weight:300;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + .1666666667 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-fluid-quotation-02{font-size:1.5rem;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media (min-width: 44rem){:host .cds--type-fluid-quotation-02{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-fluid-quotation-02{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-fluid-quotation-02{font-size:2.5rem}}:host .cds--type-fluid-display-01{font-size:1.75rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 0 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-fluid-display-01{font-size:1.75rem;font-size:calc(1.75rem + .5*(100vw - 28rem)/16)}}@media (min-width: 44rem){:host .cds--type-fluid-display-01{font-size:2.25rem;font-size:calc(2.25rem + .25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-fluid-display-01{font-size:2.5rem;line-height:1.17;font-size:calc(2.5rem + .6666666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-fluid-display-01{line-height:1.13;font-size:3.1666666667rem}}:host .cds--type-fluid-display-02{font-size:1.75rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 0 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-fluid-display-02{font-size:1.75rem;font-size:calc(1.75rem + .5*(100vw - 28rem)/16)}}@media (min-width: 44rem){:host .cds--type-fluid-display-02{font-size:2.25rem;font-size:calc(2.25rem + .25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-fluid-display-02{font-size:2.5rem;line-height:1.16;font-size:calc(2.5rem + .6666666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-fluid-display-02{line-height:1.13;font-size:3.1666666667rem}}:host .cds--type-fluid-display-03{font-size:1.75rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 1.0833333333 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-fluid-display-03{font-size:2.8333333333rem;line-height:1.15;font-size:calc(2.8333333333rem + 1 * ((100vw - 28rem) / 16))}}@media (min-width: 44rem){:host .cds--type-fluid-display-03{font-size:3.8333333333rem;line-height:1.11;letter-spacing:-.64px;font-size:calc(3.8333333333rem + 1.25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-fluid-display-03{font-size:5.0833333333rem;line-height:1.07;letter-spacing:-.64px;font-size:calc(5.0833333333rem + 1.4166666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-fluid-display-03{line-height:1.05;letter-spacing:-.96px;font-size:6.5rem}}:host .cds--type-fluid-display-04{font-size:1.75rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 1.0833333333 * ((100vw - 13.3333333333rem) / 14.6666666667))}@media (min-width: 28rem){:host .cds--type-fluid-display-04{font-size:2.8333333333rem;line-height:1.15;font-size:calc(2.8333333333rem + 1 * ((100vw - 28rem) / 16))}}@media (min-width: 44rem){:host .cds--type-fluid-display-04{font-size:3.8333333333rem;line-height:1.11;letter-spacing:-.64px;font-size:calc(3.8333333333rem + 1.25 * ((100vw - 44rem) / 10.6666666667))}}@media (min-width: 54.6666666667rem){:host .cds--type-fluid-display-04{font-size:5.0833333333rem;line-height:1.07;letter-spacing:-.64px;font-size:calc(5.0833333333rem + 1.4166666667 * ((100vw - 54.6666666667rem) / 11.3333333333))}}@media (min-width: 66rem){:host .cds--type-fluid-display-04{line-height:1.05;letter-spacing:-.96px;font-size:6.5rem}}:host .exp-questions-margins{margin-bottom:1rem}:host .exp-text-center{text-align:center;margin-left:.5rem;padding-left:1rem;margin-right:.5rem;padding-right:1rem}:host .business-icon{height:96px;object-fit:contain}:host .padding.left{padding-left:2rem}:host .padding.right{padding-right:2rem}\n')();
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
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
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
    for (var i = 0; i < mixins.length; i++) {
      api = mixins[i](api);
    }
  }
  var r = factory(function initialize(O) {
    api.initializeInstanceElements(O, decorated.elements);
  }, superClass);
  var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
  api.initializeClassElements(r.F, decorated.elements);
  return api.runClassFinishers(r.F, decorated.finishers);
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
      for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = this.fromElementDescriptor(element);
        var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
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
      for (var i = decorators.length - 1; i >= 0; i--) {
        var obj = this.fromClassDescriptor(elements);
        var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);
        if (elementsAndFinisher.finisher !== void 0) {
          finishers.push(elementsAndFinisher.finisher);
        }
        if (elementsAndFinisher.elements !== void 0) {
          elements = elementsAndFinisher.elements;
          for (var j = 0; j < elements.length - 1; j++) {
            for (var k = j + 1; k < elements.length; k++) {
              if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
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
      for (var i = 0; i < finishers.length; i++) {
        var newConstructor = (0, finishers[i])(constructor);
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
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
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
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
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
const spread2 = directive((attributesInfo) => (part) => {
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
const svgResultCarbonIcon$2 = ({ children, ...attrs } = {}) => svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread2(attrs)}" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">${children}${children}${children}<path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path></svg>`;
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const svgResultCarbonIcon$1 = ({ children, ...attrs } = {}) => svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread2(attrs)}" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">${children}${children}${children}<path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2	c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"></path><path d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8	c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z" data-icon-path="inner-path" opacity="0"></path></svg>`;
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
const filter = (a, predicate, thisObject) => Array.prototype.filter.call(a, predicate, thisObject);
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
var styles$5 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--assistive-text,.bx--visually-hidden{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--body{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);background-color:var(--cds-ui-background,#fff);color:var(--cds-text-01,#161616);line-height:1}.bx--body *,.bx--body ::after,.bx--body ::before{box-sizing:inherit}.bx--text-truncate--end{display:inline-block;overflow:hidden;width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--text-truncate--front{display:inline-block;overflow:hidden;width:100%;direction:rtl;text-overflow:ellipsis;white-space:nowrap}.bx--fieldset{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;margin-bottom:2rem}.bx--fieldset *,.bx--fieldset ::after,.bx--fieldset ::before{box-sizing:inherit}.bx--fieldset--no-margin{margin-bottom:0}.bx--form-item{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:flex;flex:1 1 auto;flex-direction:column;align-items:flex-start}.bx--label{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px);display:inline-block;margin-bottom:.5rem;color:var(--cds-text-02,#525252);font-weight:400;line-height:1rem;vertical-align:baseline}.bx--label *,.bx--label ::after,.bx--label ::before{box-sizing:inherit}.bx--label .bx--tooltip__trigger{font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px)}.bx--label.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:4.6875rem;height:.875rem}.bx--label.bx--skeleton:active,.bx--label.bx--skeleton:focus,.bx--label.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--label.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--label.bx--skeleton::before{-webkit-animation:none;animation:none}}input[type=number]{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px}@media screen and (prefers-contrast){.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline-style:dotted}}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper--warn~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box--warning~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--number__input-wrapper--warning~.bx--form-requirement,.bx--select--warning .bx--select-input__wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper--warning>.bx--text-input~.bx--form-requirement,.bx--text-input__field-wrapper--warning~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{display:block;overflow:visible;max-height:12.5rem;font-weight:400}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{color:var(--cds-text-error,#da1e28)}.bx--form--fluid .bx--text-input__field-wrapper--warning,.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]{display:block}.bx--form--fluid .bx--fieldset{margin:0}.bx--form--fluid input[data-invalid]{outline:0}.bx--form--fluid .bx--form-requirement{padding:.5rem 2.5rem .5rem 1rem;margin:0}input:not(output):not([data-invalid]):-moz-ui-invalid{box-shadow:none}.bx--form-requirement{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-caption-01-font-size,.75rem);font-weight:var(--cds-caption-01-font-weight,400);line-height:var(--cds-caption-01-line-height,1.33333);letter-spacing:var(--cds-caption-01-letter-spacing,.32px);display:none;overflow:hidden;max-height:0;margin:.25rem 0 0}.bx--form-requirement *,.bx--form-requirement ::after,.bx--form-requirement ::before{box-sizing:inherit}.bx--select--inline .bx--form__helper-text{margin-top:0}.bx--form__helper-text{font-size:var(--cds-helper-text-01-font-size,.75rem);line-height:var(--cds-helper-text-01-line-height,1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing,.32px);z-index:0;width:100%;margin-top:.25rem;color:var(--cds-text-02,#525252);opacity:1}.bx--form__helper-text--disabled,.bx--label--disabled{color:var(--cds-disabled-02,#c6c6c6)}fieldset[disabled] .bx--form__helper-text,fieldset[disabled] .bx--label{color:var(--cds-disabled-02,#c6c6c6)}.bx--text-input{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);outline:2px solid transparent;outline-offset:-2px;width:100%;height:2.5rem;padding:0 1rem;border:none;border-bottom:1px solid var(--cds-ui-04,#8d8d8d);background-color:var(--cds-field-01,#f4f4f4);color:var(--cds-text-01,#161616);transition:background-color 70ms cubic-bezier(.2,0,.38,.9),outline 70ms cubic-bezier(.2,0,.38,.9)}.bx--text-input *,.bx--text-input ::after,.bx--text-input ::before{box-sizing:inherit}.bx--text-input:active,.bx--text-input:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--text-input:active,.bx--text-input:focus{outline-style:dotted}}.bx--text-input-wrapper svg[hidden]{display:none}.bx--text-input--lg,.bx--text-input--xl{height:3rem}.bx--text-input--sm{height:2rem}.bx--password-input{padding-right:2.5rem}.bx--text-input--sm.bx--password-input{padding-right:2rem}.bx--text-input--lg.bx--password-input{padding-right:3rem}.bx--text-input::-webkit-input-placeholder{color:var(--cds-text-05,#6f6f6f);opacity:1}.bx--text-input::-moz-placeholder{color:var(--cds-text-05,#6f6f6f);opacity:1}.bx--text-input:-ms-input-placeholder{color:var(--cds-text-05,#6f6f6f);opacity:1}.bx--text-input::-ms-input-placeholder{color:var(--cds-text-05,#6f6f6f);opacity:1}.bx--text-input::placeholder{color:var(--cds-text-05,#6f6f6f);opacity:1}.bx--text-input--light{background-color:var(--cds-field-02,#fff)}.bx--text-input__field-wrapper{position:relative;display:flex;width:100%}.bx--text-input__invalid-icon,.bx--text-input__readonly-icon{position:absolute;top:50%;right:1rem;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.bx--text-input__invalid-icon{fill:var(--cds-support-01,#da1e28)}.bx--text-input__invalid-icon--warning{fill:var(--cds-support-03,#f1c21b)}.bx--text-input__invalid-icon--warning path:first-of-type{fill:#000;opacity:1}.bx--text-input--password__visibility{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--text-input--password__visibility:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--text-input--password__visibility:focus{outline-style:dotted}}.bx--text-input--password__visibility:focus{outline:1px solid transparent}.bx--text-input--password__visibility:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--text-input--password__visibility:focus svg{outline-style:dotted}}.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after,.bx--text-input--password__visibility::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after,.bx--text-input--password__visibility::before{display:inline-block}}.bx--text-input--password__visibility::after,.bx--text-input--password__visibility::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--text-input--password__visibility.bx--tooltip--a11y::after,.bx--text-input--password__visibility.bx--tooltip--a11y::before{transition:none}.bx--text-input--password__visibility::before{width:0;height:0;border-style:solid;content:""}.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{width:auto}}@supports (-ms-accelerator:true){.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{width:auto}}@supports (-ms-ime-align:auto){.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{border:1px solid transparent}}.bx--text-input--password__visibility::after{content:attr(aria-label)}.bx--text-input--password__visibility.bx--tooltip--a11y::after{content:none}.bx--text-input--password__visibility.bx--tooltip--visible::after,.bx--text-input--password__visibility.bx--tooltip--visible::before,.bx--text-input--password__visibility:focus::after,.bx--text-input--password__visibility:focus::before,.bx--text-input--password__visibility:hover::after,.bx--text-input--password__visibility:hover::before{opacity:1}@-webkit-keyframes tooltip-fade{from{opacity:0}to{opacity:1}}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--text-input--password__visibility.bx--tooltip--visible .bx--assistive-text,.bx--text-input--password__visibility.bx--tooltip--visible+.bx--assistive-text,.bx--text-input--password__visibility:focus .bx--assistive-text,.bx--text-input--password__visibility:focus+.bx--assistive-text,.bx--text-input--password__visibility:hover .bx--assistive-text,.bx--text-input--password__visibility:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--text-input--password__visibility.bx--tooltip--visible .bx--assistive-text,.bx--text-input--password__visibility.bx--tooltip--visible+.bx--assistive-text,.bx--text-input--password__visibility.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--text-input--password__visibility:focus .bx--assistive-text,.bx--text-input--password__visibility:focus+.bx--assistive-text,.bx--text-input--password__visibility:focus.bx--tooltip--a11y::before,.bx--text-input--password__visibility:hover .bx--assistive-text,.bx--text-input--password__visibility:hover+.bx--assistive-text,.bx--text-input--password__visibility:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--text-input--password__visibility.bx--tooltip--hidden .bx--assistive-text,.bx--text-input--password__visibility.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--text-input--password__visibility.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--text-input--password__visibility .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after,.bx--text-input--password__visibility::before{bottom:0;left:50%}.bx--text-input--password__visibility::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--text-input--password__visibility .bx--assistive-text,.bx--text-input--password__visibility+.bx--assistive-text,.bx--text-input--password__visibility::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger,.bx--text-input--password__visibility{outline:2px solid transparent;outline-offset:-2px;position:absolute;right:0;display:flex;width:2.5rem;height:100%;min-height:auto;align-items:center;justify-content:center;padding:0;border:0;background:0 0;cursor:pointer;transition:outline 70ms cubic-bezier(.2,0,.38,.9)}.bx--text-input--sm+.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger{width:2rem}.bx--text-input--lg+.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger{width:3rem}.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger svg{fill:var(--cds-icon-secondary,#525252);transition:fill 70ms cubic-bezier(.2,0,.38,.9)}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger svg{fill:ButtonText}}.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger:focus{outline-style:dotted}}.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger:focus svg,.bx--btn.bx--text-input--password__visibility__toggle.bx--tooltip__trigger:hover svg{fill:var(--cds-icon-primary,#161616)}.bx--text-input--invalid,.bx--text-input--warning,.bx--text-input-wrapper--readonly .bx--text-input{padding-right:2.5rem}.bx--text-input--invalid.bx--password-input{padding-right:4rem}.bx--text-input--invalid+.bx--text-input--password__visibility,.bx--text-input--invalid+.bx--text-input--password__visibility__toggle{right:1rem}.bx--password-input-wrapper .bx--text-input__invalid-icon{right:2.5rem}.bx--text-input:disabled+.bx--text-input--password__visibility svg,.bx--text-input:disabled+.bx--text-input--password__visibility__toggle.bx--tooltip__trigger svg{cursor:not-allowed;fill:var(--cds-disabled-02,#c6c6c6)}.bx--text-input:disabled+.bx--text-input--password__visibility svg:hover,.bx--text-input:disabled+.bx--text-input--password__visibility__toggle.bx--tooltip__trigger svg:hover{fill:var(--cds-disabled-02,#c6c6c6)}.bx--text-input:disabled{outline:2px solid transparent;outline-offset:-2px;border-bottom:1px solid transparent;background-color:var(--cds-field,#f4f4f4);color:var(--cds-text-disabled,#c6c6c6);cursor:not-allowed;-webkit-text-fill-color:var(--cds-disabled-02,#c6c6c6)}.bx--text-input--light:disabled{background-color:var(--cds-field-02,#fff)}.bx--text-input:disabled::-webkit-input-placeholder{color:var(--cds-disabled-02,#c6c6c6);opacity:1}.bx--text-input:disabled::-moz-placeholder{color:var(--cds-disabled-02,#c6c6c6);opacity:1}.bx--text-input:disabled:-ms-input-placeholder{color:var(--cds-disabled-02,#c6c6c6);opacity:1}.bx--text-input:disabled::-ms-input-placeholder{color:var(--cds-disabled-02,#c6c6c6);opacity:1}.bx--text-input:disabled::placeholder{color:var(--cds-disabled-02,#c6c6c6);opacity:1}.bx--text-input--invalid{outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px;box-shadow:none}@media screen and (prefers-contrast){.bx--text-input--invalid{outline-style:dotted}}.bx--text-input--invalid .bx--text-input--password__visibility,.bx--text-input--invalid .bx--text-input--password__visibility__toggle{right:2.5rem}.bx--skeleton.bx--text-input{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none}.bx--skeleton.bx--text-input:active,.bx--skeleton.bx--text-input:focus,.bx--skeleton.bx--text-input:hover{border:none;cursor:default;outline:0}.bx--skeleton.bx--text-input::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--skeleton.bx--text-input::before{-webkit-animation:none;animation:none}}.bx--form--fluid .bx--text-input-wrapper{position:relative;background:var(--cds-field-01,#f4f4f4);transition:background-color 70ms cubic-bezier(.2,0,.38,.9),outline 70ms cubic-bezier(.2,0,.38,.9)}.bx--form--fluid .bx--label{position:absolute;z-index:1;top:.8125rem;left:1rem;margin:0}.bx--form--fluid .bx--form__helper-text{display:none}.bx--form--fluid .bx--text-input{min-height:4rem;padding:2rem 1rem .8125rem}.bx--form--fluid .bx--text-input__divider,.bx--text-input__divider{display:none}.bx--form--fluid .bx--text-input--invalid,.bx--form--fluid .bx--text-input--warn{border-bottom:none}.bx--form--fluid .bx--text-input--invalid+.bx--text-input__divider,.bx--form--fluid .bx--text-input--warn+.bx--text-input__divider{display:block;border-style:solid;border-color:var(--cds-ui-03,#e0e0e0);border-bottom:none;margin:0 1rem}.bx--form--fluid .bx--text-input__invalid-icon{top:5rem}.bx--form--fluid .bx--text-input-wrapper--light{background:var(--cds-field-02,#fff)}.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid{outline:2px solid transparent;outline-offset:-2px}.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]:not(:focus){outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px}@media screen and (prefers-contrast){.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]:not(:focus){outline-style:dotted}}.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px}@media screen and (prefers-contrast){.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:focus{outline-style:dotted}}.bx--text-input-wrapper.bx--text-input-wrapper--inline{flex-flow:row wrap}.bx--text-input-wrapper .bx--label--inline{flex:1;margin:.8125rem 0 0 0;overflow-wrap:break-word;word-break:break-word}.bx--text-input-wrapper .bx--label--inline--sm{margin-top:.5625rem}.bx--text-input-wrapper .bx--label--inline--lg,.bx--text-input-wrapper .bx--label--inline--xl{margin-top:1.0625rem}.bx--text-input__label-helper-wrapper{max-width:8rem;flex:2;flex-direction:column;margin-right:1.5rem;overflow-wrap:break-word}.bx--text-input-wrapper .bx--form__helper-text--inline{margin-top:.125rem}.bx--text-input__field-outer-wrapper{display:flex;width:100%;flex:1 1 auto;flex-direction:column;align-items:flex-start}.bx--text-input__field-outer-wrapper--inline{flex:8;flex-direction:column}.bx--form--fluid .bx--text-input-wrapper--readonly,.bx--text-input-wrapper--readonly .bx--text-input{background:0 0}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn.bx--btn--icon-only.bx--text-input--password__visibility__toggle.bx--tooltip__trigger svg,.bx--btn.bx--btn--icon-only.bx--text-input--password__visibility__toggle.bx--tooltip__trigger:hover svg,.bx--text-input--password__visibility{fill:ButtonText}}:host(bx-input){width:100%;outline:0}`
]);
let _$8 = (t) => t, _t$9;
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
      value: function render() {
        const {
          _handleInput: handleInput
        } = this;
        const invalidIcon = svgResultCarbonIcon$1({
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
        return html(_t$9 || (_t$9 = _$8` <label class="${0}" for="input"> <slot name="label-text"> ${0} </slot> </label> <div class="${0}--text-input__field-wrapper" ?data-invalid="${0}"> ${0} <input ?autocomplete="${0}" ?autofocus="${0}" class="${0}" ?data-invalid="${0}" ?disabled="${0}" id="input" name="${0}" pattern="${0}" placeholder="${0}" ?readonly="${0}" ?required="${0}" type="${0}" .value="${0}" @input="${0}"> </div> <div class="${0}"> <slot name="helper-text"> ${0} </slot> </div> <div class="${0}--form-requirement"> <slot name="validity-message"> ${0} </slot> </div> `), labelClasses, this.labelText, prefix$e, this.invalid, this.invalid ? invalidIcon : null, this.autocomplete, this.autofocus, inputClasses, this.invalid, this.disabled, ifNonEmpty(this.name), ifNonEmpty(this.pattern), ifNonEmpty(this.placeholder), this.readonly, this.required, ifNonEmpty(this.type), this._value, handleInput, helperTextClasses, this.helperText, prefix$e, this.validityMessage);
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
}, ValidityMixin(FormMixin(LitElement)));
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$4 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--fieldset{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;margin-bottom:2rem}.bx--fieldset *,.bx--fieldset ::after,.bx--fieldset ::before{box-sizing:inherit}.bx--fieldset--no-margin{margin-bottom:0}.bx--form-item{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:flex;flex:1 1 auto;flex-direction:column;align-items:flex-start}.bx--label{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px);display:inline-block;margin-bottom:.5rem;color:var(--cds-text-02,#525252);font-weight:400;line-height:1rem;vertical-align:baseline}.bx--label *,.bx--label ::after,.bx--label ::before{box-sizing:inherit}.bx--label .bx--tooltip__trigger{font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px)}.bx--label.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:4.6875rem;height:.875rem}.bx--label.bx--skeleton:active,.bx--label.bx--skeleton:focus,.bx--label.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--label.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--label.bx--skeleton::before{-webkit-animation:none;animation:none}}input[type=number]{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px}@media screen and (prefers-contrast){.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline-style:dotted}}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper--warn~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box--warning~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--number__input-wrapper--warning~.bx--form-requirement,.bx--select--warning .bx--select-input__wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper--warning>.bx--text-input~.bx--form-requirement,.bx--text-input__field-wrapper--warning~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{display:block;overflow:visible;max-height:12.5rem;font-weight:400}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{color:var(--cds-text-error,#da1e28)}.bx--form--fluid .bx--text-input__field-wrapper--warning,.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]{display:block}.bx--form--fluid .bx--fieldset{margin:0}.bx--form--fluid input[data-invalid]{outline:0}.bx--form--fluid .bx--form-requirement{padding:.5rem 2.5rem .5rem 1rem;margin:0}input:not(output):not([data-invalid]):-moz-ui-invalid{box-shadow:none}.bx--form-requirement{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-caption-01-font-size,.75rem);font-weight:var(--cds-caption-01-font-weight,400);line-height:var(--cds-caption-01-line-height,1.33333);letter-spacing:var(--cds-caption-01-letter-spacing,.32px);display:none;overflow:hidden;max-height:0;margin:.25rem 0 0}.bx--form-requirement *,.bx--form-requirement ::after,.bx--form-requirement ::before{box-sizing:inherit}.bx--select--inline .bx--form__helper-text{margin-top:0}.bx--form__helper-text{font-size:var(--cds-helper-text-01-font-size,.75rem);line-height:var(--cds-helper-text-01-line-height,1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing,.32px);z-index:0;width:100%;margin-top:.25rem;color:var(--cds-text-02,#525252);opacity:1}.bx--form__helper-text--disabled,.bx--label--disabled{color:var(--cds-disabled-02,#c6c6c6)}fieldset[disabled] .bx--form__helper-text,fieldset[disabled] .bx--label{color:var(--cds-disabled-02,#c6c6c6)}.bx--select,:host(bx-select){box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;position:relative;display:flex;width:100%;flex-direction:column;align-items:flex-start}.bx--select *,.bx--select ::after,.bx--select ::before,:host(bx-select) *,:host(bx-select) ::after,:host(bx-select) ::before{box-sizing:inherit}.bx--select-input__wrapper{position:relative;display:flex;width:100%;align-items:center}.bx--select-input{font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);outline:2px solid transparent;outline-offset:-2px;display:block;width:100%;height:2.5rem;padding:0 var(--cds-spacing-09,3rem) 0 var(--cds-spacing-05,1rem);border:none;border-bottom:1px solid var(--cds-ui-04,#8d8d8d);-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--cds-field-01,#f4f4f4);border-radius:0;color:var(--cds-text-01,#161616);cursor:pointer;opacity:1;transition:outline 70ms cubic-bezier(.2,0,.38,.9)}.bx--select-input:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--select-input::-ms-expand{display:none}@-moz-document url-prefix(){.bx--select-input:-moz-focusring,.bx--select-input::-moz-focus-inner{background-image:none;color:transparent;text-shadow:0 0 0 #000}}.bx--select-input:focus{outline:2px solid var(--cds-focus,#0f62fe);outline-offset:-2px;color:var(--cds-text-01,#161616)}@media screen and (prefers-contrast){.bx--select-input:focus{outline-style:dotted}}.bx--select-input:disabled,.bx--select-input:hover:disabled{border-bottom-color:var(--cds-disabled-01,#f4f4f4);background-color:var(--cds-disabled-01,#f4f4f4);color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed}.bx--select-input--sm{height:2rem;max-height:2rem}.bx--select-input--lg,.bx--select-input--xl{height:3rem;max-height:3rem}.bx--select--disabled .bx--form__helper-text,.bx--select--disabled .bx--label,:host(bx-select)[disabled] .bx--form__helper-text,:host(bx-select)[disabled] .bx--label{color:var(--cds-disabled-02,#c6c6c6)}.bx--select--warning .bx--select-input,.bx--select-input__wrapper[data-invalid] .bx--select-input{padding-right:4.5rem}.bx--select-input:disabled~.bx--select__arrow{fill:var(--cds-disabled-02,#c6c6c6)}.bx--select--light .bx--select-input,:host(bx-select)[color-scheme=light] .bx--select-input{background-color:var(--cds-field-02,#fff)}.bx--select--light .bx--select-input:hover,:host(bx-select)[color-scheme=light] .bx--select-input:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--select--light .bx--select-input:disabled,.bx--select--light .bx--select-input:hover:disabled,:host(bx-select)[color-scheme=light] .bx--select-input:disabled{background-color:var(--cds-field-02,#fff);color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed}.bx--select__arrow{position:absolute;top:0;right:var(--cds-spacing-05,1rem);height:100%;fill:var(--cds-ui-05,#161616);pointer-events:none}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--select__arrow path{fill:ButtonText}}.bx--select__invalid-icon{position:absolute;right:var(--cds-spacing-08,2.5rem)}.bx--select-input__wrapper[data-invalid] .bx--select-input~.bx--select__invalid-icon{fill:var(--cds-support-01,#da1e28)}.bx--select__invalid-icon--warning{fill:var(--cds-support-03,#f1c21b)}.bx--select__invalid-icon--warning path[fill]{fill:#000;opacity:1}.bx--select-option,optgroup.bx--select-optgroup{background-color:var(--cds-background-hover,#e5e5e5);color:var(--cds-text-01,#161616)}.bx--select-option:disabled,optgroup.bx--select-optgroup:disabled{color:var(--cds-text-disabled,#c6c6c6)}.bx--select--inline{display:flex;flex-direction:row;align-items:center}.bx--select--inline.bx--select--invalid .bx--form__helper-text,.bx--select--inline.bx--select--invalid .bx--label,.bx--select--inline[invalid]:host(bx-select) .bx--form__helper-text,.bx--select--inline[invalid]:host(bx-select) .bx--label{align-self:flex-start;margin-top:.8125rem}.bx--select--inline .bx--form__helper-text{margin-bottom:0;margin-left:var(--cds-spacing-03,.5rem)}.bx--select--inline .bx--label{margin:0 .5rem 0 0;white-space:nowrap}.bx--select--inline .bx--select-input{width:auto;padding-right:var(--cds-spacing-07,2rem);padding-left:.5rem;border-bottom:none;background-color:var(--cds-background,#fff);color:var(--cds-text-01,#161616)}.bx--select--inline .bx--select-input[disabled],.bx--select--inline .bx--select-input[disabled]:hover{background-color:var(--cds-disabled-01,#f4f4f4)}.bx--select--inline .bx--select__arrow{right:.5rem}.bx--select--inline.bx--select--invalid .bx--select-input,.bx--select--inline[invalid]:host(bx-select) .bx--select-input{padding-right:3.5rem}.bx--select--inline.bx--select--invalid .bx--select-input~.bx--select__invalid-icon,.bx--select--inline[invalid]:host(bx-select) .bx--select-input~.bx--select__invalid-icon{right:var(--cds-spacing-07,2rem)}.bx--select--inline .bx--select-input:disabled{color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed}.bx--select--inline .bx--select-input:disabled~*{cursor:not-allowed}.bx--select.bx--skeleton,.bx--skeleton:host(bx-select){position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:100%;height:2.5rem}.bx--select.bx--skeleton:active,.bx--select.bx--skeleton:focus,.bx--select.bx--skeleton:hover,.bx--skeleton:active:host(bx-select),.bx--skeleton:focus:host(bx-select),.bx--skeleton:hover:host(bx-select){border:none;cursor:default;outline:0}.bx--select.bx--skeleton::before,.bx--skeleton:host(bx-select)::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--select.bx--skeleton::before,.bx--skeleton:host(bx-select)::before{-webkit-animation:none;animation:none}}.bx--select.bx--skeleton .bx--select-input,.bx--skeleton:host(bx-select) .bx--select-input{display:none}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--select__arrow{fill:ButtonText}}:host(bx-select){outline:0}`
]);
let _$7 = (t) => t, _t$8, _t2$4, _t3$2, _t4, _t5, _t6, _t7;
const {
  prefix: prefix$d
} = settings_1;
_decorate([customElement(`${prefix$d}-select`)], function(_initialize, _ValidityMixin) {
  class BXSelect extends _ValidityMixin {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXSelect,
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
        return html(_t$8 || (_t$8 = _$7` ${0} `), filter(element.childNodes, (item) => item.nodeType === Node.ELEMENT_NODE && item.matches(selectorItem)).map((item) => {
          const disabled = item.hasAttribute("disabled");
          const label = item.getAttribute("label");
          const selected = item.hasAttribute("selected");
          const value = item.getAttribute("value");
          const {
            textContent
          } = item;
          return item.matches(selectorLeafItem) ? html(_t2$4 || (_t2$4 = _$7` <option class="${0}--select-option" ?disabled="${0}" label="${0}" ?selected="${0}" value="${0}"> ${0} </option> `), prefix$d, disabled, ifNonNull(label !== null && label !== void 0 ? label : textContent), selected, ifNonNull(value), textContent) : html(_t3$2 || (_t3$2 = _$7` <optgroup class="${0}--select-optgroup" ?disabled="${0}" label="${0}"> ${0} </optgroup> `), prefix$d, disabled, ifNonNull(label), this._renderItems(item));
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
        _get(_getPrototypeOf(BXSelect.prototype), "connectedCallback", this).call(this);
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
        _get(_getPrototypeOf(BXSelect.prototype), "disconnectedCallback", this).call(this);
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
      value: function render() {
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
        const supplementalText = !invalid ? html(_t4 || (_t4 = _$7` <div class="${0}"> <slot name="helper-text"> ${0} </slot> </div> `), helperTextClasses, helperText) : html(_t5 || (_t5 = _$7` <div class="${0}--form-requirement" id="validity-message"> <slot name="validity-message"> ${0} </slot> </div> `), prefix$d, validityMessage);
        return html(_t6 || (_t6 = _$7` <label class="${0}" for="input"> <slot name="label-text"> ${0} </slot> </label> <div class="${0}--select-input__wrapper" ?data-invalid="${0}"> <select id="input" class="${0}" ?disabled="${0}" aria-invalid="${0}" aria-describedby="${0}" @input="${0}"> ${0} ${0} </select> ${0} ${0} </div> ${0} `), labelClasses, labelText, prefix$d, invalid, inputClasses, disabled, String(Boolean(invalid)), ifDefined(!invalid ? void 0 : "validity-message"), handleInput, !placeholder || value ? void 0 : html(_t7 || (_t7 = _$7` <option disabled="disabled" hidden class="${0}--select-option" value="${0}" selected="selected"> ${0} </option> `), prefix$d, placeholderItemValue, placeholder), this._renderItems(this), svgResultCarbonIcon$2({
          class: `${prefix$d}--select__arrow`
        }), !invalid ? void 0 : svgResultCarbonIcon$1({
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
        return styles$4;
      }
    }]
  };
}, ValidityMixin(FormMixin(LitElement)));
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
const {
  prefix: prefix$b
} = settings_1;
_decorate([customElement(`${prefix$b}-select-item-group`)], function(_initialize, _LitElement) {
  class BXSelectItemGroup extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXSelectItemGroup,
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
var styles$3 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--fieldset{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;margin-bottom:2rem}.bx--fieldset *,.bx--fieldset ::after,.bx--fieldset ::before{box-sizing:inherit}.bx--fieldset--no-margin{margin-bottom:0}.bx--form-item,:host(bx-form-item){font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:flex;flex:1 1 auto;flex-direction:column;align-items:flex-start}.bx--label{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px);display:inline-block;margin-bottom:.5rem;color:var(--cds-text-02,#525252);font-weight:400;line-height:1rem;vertical-align:baseline}.bx--label *,.bx--label ::after,.bx--label ::before{box-sizing:inherit}.bx--label .bx--tooltip__trigger{font-size:var(--cds-label-01-font-size,.75rem);font-weight:var(--cds-label-01-font-weight,400);line-height:var(--cds-label-01-line-height,1.33333);letter-spacing:var(--cds-label-01-letter-spacing,.32px)}.bx--label.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:4.6875rem;height:.875rem}.bx--label.bx--skeleton:active,.bx--label.bx--skeleton:focus,.bx--label.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--label.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--label.bx--skeleton::before{-webkit-animation:none;animation:none}}input[type=number]{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline:2px solid var(--cds-support-01,#da1e28);outline-offset:-2px}@media screen and (prefers-contrast){.bx--combo-box[data-invalid] .bx--text-input:not(:focus),.bx--list-box[data-invalid]:not(:focus),.bx--number[data-invalid] input[type=number]:not(:focus),.bx--select-input__wrapper[data-invalid] .bx--select-input:not(:focus),.bx--text-area__wrapper[data-invalid]>.bx--text-area--invalid:not(:focus),.bx--text-input__field-wrapper[data-invalid]>.bx--text-input--invalid:not(:focus),input[data-invalid]:not(:focus){outline-style:dotted}}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper--warn~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box--warning~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--number__input-wrapper--warning~.bx--form-requirement,.bx--select--warning .bx--select-input__wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper--warning>.bx--text-input~.bx--form-requirement,.bx--text-input__field-wrapper--warning~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{display:block;overflow:visible;max-height:12.5rem;font-weight:400}.bx--date-picker-input__wrapper--invalid~.bx--form-requirement,.bx--date-picker-input__wrapper~.bx--form-requirement,.bx--list-box[data-invalid]~.bx--form-requirement,.bx--number[data-invalid] .bx--number__input-wrapper~.bx--form-requirement,.bx--select-input__wrapper[data-invalid]~.bx--form-requirement,.bx--text-area__wrapper[data-invalid]~.bx--form-requirement,.bx--text-input__field-wrapper[data-invalid]~.bx--form-requirement,.bx--time-picker--invalid~.bx--form-requirement,.bx--time-picker[data-invalid]~.bx--form-requirement,input[data-invalid]~.bx--form-requirement{color:var(--cds-text-error,#da1e28)}.bx--form--fluid .bx--text-input__field-wrapper--warning,.bx--form--fluid .bx--text-input__field-wrapper[data-invalid]{display:block}.bx--form--fluid .bx--fieldset{margin:0}.bx--form--fluid input[data-invalid]{outline:0}.bx--form--fluid .bx--form-requirement{padding:.5rem 2.5rem .5rem 1rem;margin:0}input:not(output):not([data-invalid]):-moz-ui-invalid{box-shadow:none}.bx--form-requirement{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-caption-01-font-size,.75rem);font-weight:var(--cds-caption-01-font-weight,400);line-height:var(--cds-caption-01-line-height,1.33333);letter-spacing:var(--cds-caption-01-letter-spacing,.32px);display:none;overflow:hidden;max-height:0;margin:.25rem 0 0}.bx--form-requirement *,.bx--form-requirement ::after,.bx--form-requirement ::before{box-sizing:inherit}.bx--select--inline .bx--form__helper-text{margin-top:0}.bx--form__helper-text{font-size:var(--cds-helper-text-01-font-size,.75rem);line-height:var(--cds-helper-text-01-line-height,1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing,.32px);z-index:0;width:100%;margin-top:.25rem;color:var(--cds-text-02,#525252);opacity:1}.bx--form__helper-text--disabled,.bx--label--disabled{color:var(--cds-disabled-02,#c6c6c6)}fieldset[disabled] .bx--form__helper-text,fieldset[disabled] .bx--label{color:var(--cds-disabled-02,#c6c6c6)}`
]);
let _$6 = (t) => t, _t$7;
const {
  prefix: prefix$a
} = settings_1;
_decorate([customElement(`${prefix$a}-form-item`)], function(_initialize, _LitElement) {
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
      value: function render() {
        return html(_t$7 || (_t$7 = _$6`<slot></slot>`));
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
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {
  prefix: prefix$9
} = settings_1;
const selectorTabbable = `
  a[href], area[href], input:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true],
  ${prefix$9}-accordion-item,
  ${prefix$9}-btn,
  ${prefix$9}-breadcrumb-link,
  ${prefix$9}-checkbox,
  ${prefix$9}-code-snippet,
  ${prefix$9}-combo-box,
  ${prefix$9}-content-switcher-item,
  ${prefix$9}-copy-button,
  ${prefix$9}-table-header-row,
  ${prefix$9}-table-row,
  ${prefix$9}-table-toolbar-search,
  ${prefix$9}-date-picker-input,
  ${prefix$9}-dropdown,
  ${prefix$9}-input,
  ${prefix$9}-link,
  ${prefix$9}-number-input,
  ${prefix$9}-modal,
  ${prefix$9}-modal-close-button,
  ${prefix$9}-multi-select,
  ${prefix$9}-inline-notification,
  ${prefix$9}-toast-notification,
  ${prefix$9}-overflow-menu,
  ${prefix$9}-overflow-menu-item,
  ${prefix$9}-page-sizes-select,
  ${prefix$9}-pages-select,
  ${prefix$9}-progress-step,
  ${prefix$9}-radio-button,
  ${prefix$9}-search,
  ${prefix$9}-slider,
  ${prefix$9}-slider-input,
  ${prefix$9}-structured-list,
  ${prefix$9}-tab,
  ${prefix$9}-filter-tag,
  ${prefix$9}-textarea,
  ${prefix$9}-clickable-tile,
  ${prefix$9}-expandable-tile,
  ${prefix$9}-radio-tile,
  ${prefix$9}-selectable-tile,
  ${prefix$9}-toggle,
  ${prefix$9}-tooltip,
  ${prefix$9}-tooltip-definition,
  ${prefix$9}-tooltip-icon,
  ${prefix$9}-header-menu,
  ${prefix$9}-header-menu-button,
  ${prefix$9}-header-menu-item,
  ${prefix$9}-header-name,
  ${prefix$9}-header-nav-item,
  ${prefix$9}-side-nav-link,
  ${prefix$9}-side-nav-menu,
  ${prefix$9}-side-nav-menu-item
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
var styles$2 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--assistive-text,.bx--visually-hidden{position:absolute;overflow:hidden;width:1px;height:1px;padding:0;border:0;margin:-1px;clip:rect(0,0,0,0);visibility:inherit;white-space:nowrap}.bx--body{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);background-color:var(--cds-ui-background,#fff);color:var(--cds-text-01,#161616);line-height:1}.bx--body *,.bx--body ::after,.bx--body ::before{box-sizing:inherit}.bx--text-truncate--end{display:inline-block;overflow:hidden;width:100%;text-overflow:ellipsis;white-space:nowrap}.bx--text-truncate--front{display:inline-block;overflow:hidden;width:100%;direction:rtl;text-overflow:ellipsis;white-space:nowrap}.bx--btn{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);position:relative;display:inline-flex;max-width:20rem;min-height:3rem;flex-shrink:0;align-items:center;justify-content:space-between;padding:calc(.875rem - 3px) 63px calc(.875rem - 3px) 15px;margin:0;border-radius:0;cursor:pointer;outline:0;text-align:left;text-decoration:none;transition:background 70ms cubic-bezier(0,0,.38,.9),box-shadow 70ms cubic-bezier(0,0,.38,.9),border-color 70ms cubic-bezier(0,0,.38,.9),outline 70ms cubic-bezier(0,0,.38,.9);vertical-align:top}.bx--btn *,.bx--btn ::after,.bx--btn ::before{box-sizing:inherit}.bx--btn.bx--btn--disabled,.bx--btn.bx--btn--disabled:focus,.bx--btn.bx--btn--disabled:hover,.bx--btn:disabled,.bx--btn:focus:disabled,.bx--btn:hover:disabled{border-color:var(--cds-disabled-02,#c6c6c6);background:var(--cds-disabled-02,#c6c6c6);box-shadow:none;color:var(--cds-disabled-03,#8d8d8d);cursor:not-allowed}.bx--btn .bx--btn__icon{position:absolute;right:1rem;width:1rem;height:1rem;flex-shrink:0}.bx--btn::-moz-focus-inner{padding:0;border:0}.bx--btn--primary{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-interactive-01,#0f62fe);color:var(--cds-text-04,#fff)}.bx--btn--primary:hover{background-color:var(--cds-hover-primary,#0353e9)}.bx--btn--primary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--primary:active{background-color:var(--cds-active-primary,#002d9c)}.bx--btn--primary .bx--btn__icon,.bx--btn--primary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--primary:hover{color:var(--cds-text-04,#fff)}.bx--btn--secondary{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-interactive-02,#393939);color:var(--cds-text-04,#fff)}.bx--btn--secondary:hover{background-color:var(--cds-hover-secondary,#4c4c4c)}.bx--btn--secondary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--secondary:active{background-color:var(--cds-active-secondary,#6f6f6f)}.bx--btn--secondary .bx--btn__icon,.bx--btn--secondary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--secondary:focus,.bx--btn--secondary:hover{color:var(--cds-text-04,#fff)}.bx--btn--tertiary{border-width:1px;border-style:solid;border-color:var(--cds-interactive-03,#0f62fe);background-color:transparent;color:var(--cds-interactive-03,#0f62fe)}.bx--btn--tertiary:hover{background-color:var(--cds-hover-tertiary,#0353e9)}.bx--btn--tertiary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--tertiary:active{background-color:var(--cds-active-tertiary,#002d9c)}.bx--btn--tertiary .bx--btn__icon,.bx--btn--tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--tertiary:hover{color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary:focus{background-color:var(--cds-interactive-03,#0f62fe);color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary:active{border-color:transparent;background-color:var(--cds-active-tertiary,#002d9c);color:var(--cds-inverse-01,#fff)}.bx--btn--tertiary.bx--btn--disabled,.bx--btn--tertiary.bx--btn--disabled:focus,.bx--btn--tertiary.bx--btn--disabled:hover,.bx--btn--tertiary:disabled,.bx--btn--tertiary:focus:disabled,.bx--btn--tertiary:hover:disabled{background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--ghost{border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;color:var(--cds-link-01,#0f62fe);padding:calc(.875rem - 3px) 16px}.bx--btn--ghost:hover{background-color:var(--cds-hover-ui,#e5e5e5)}.bx--btn--ghost:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--ghost:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--ghost .bx--btn__icon,.bx--btn--ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--ghost .bx--btn__icon{position:static;margin-left:.5rem}.bx--btn--ghost:active,.bx--btn--ghost:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--btn--ghost:active{background-color:var(--cds-active-ui,#c6c6c6)}.bx--btn--ghost.bx--btn--disabled,.bx--btn--ghost.bx--btn--disabled:focus,.bx--btn--ghost.bx--btn--disabled:hover,.bx--btn--ghost:disabled,.bx--btn--ghost:focus:disabled,.bx--btn--ghost:hover:disabled{border-color:transparent;background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--ghost.bx--btn--sm{padding:calc(.375rem - 3px) 16px}.bx--btn--ghost.bx--btn--field,.bx--btn--ghost.bx--btn--md{padding:calc(.675rem - 3px) 16px}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline-style:dotted}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{outline:1px solid transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline-style:dotted}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{display:inline-block}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::before{transition:none}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::before{width:0;height:0;border-style:solid;content:""}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@supports (-ms-accelerator:true){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@supports (-ms-ime-align:auto){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--btn.bx--btn--icon-only.bx--tooltip__trigger .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{border:1px solid transparent}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger::after{content:attr(aria-label)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--a11y::after{content:none}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover::before{opacity:1}@-webkit-keyframes tooltip-fade{from{opacity:0}to{opacity:1}}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus.bx--tooltip--a11y::before,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover+.bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger svg,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:hover svg{fill:currentColor}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled .bx--assistive-text,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled.bx--tooltip--a11y::after,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger.bx--btn--disabled.bx--tooltip--a11y::before{overflow:hidden;margin:-1px;clip:rect(0,0,0,0);opacity:0}.bx--btn.bx--btn--icon-only:not(.bx--tooltip--hidden) .bx--assistive-text{pointer-events:all}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus{border-color:var(--cds-focus,#0f62fe)}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:active:not([disabled]){border-color:transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger:focus svg{outline-color:transparent}.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:active,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:focus,.bx--btn.bx--btn--icon-only.bx--tooltip__trigger[disabled]:hover{cursor:not-allowed;fill:var(--cds-disabled-03,#8d8d8d)}.bx--tooltip__trigger.bx--btn--icon-only--top{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--top:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--top:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--top::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--top::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--top:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--top:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--top:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--top:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--top:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--top:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after,.bx--tooltip__trigger.bx--btn--icon-only--top::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top::after{top:-.8125rem;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-start::after{top:-.8125rem;left:0;-webkit-transform:translate(0,-100%);transform:translate(0,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-center::after{top:-.8125rem;left:50%;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;bottom:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::before{top:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::before{top:-.5rem;border-width:.3125rem .25rem 0 .25rem;border-color:var(--cds-inverse-02,#393939) transparent transparent transparent;-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--top.bx--tooltip--align-end::after{top:-.8125rem;right:0;left:auto;-webkit-transform:translate(0,-100%);transform:translate(0,-100%)}.bx--tooltip__trigger.bx--btn--icon-only--right{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--right:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--right:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--right::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--right::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--right:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--right:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--right:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--right:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--right:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--right:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after,.bx--tooltip__trigger.bx--btn--icon-only--right::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-start::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-center::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;left:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::before{top:50%;right:0}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::before{right:-.5rem;border-width:.25rem .3125rem .25rem 0;border-color:transparent var(--cds-inverse-02,#393939) transparent transparent;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--right.bx--tooltip--align-end::after{right:-.8125rem;-webkit-transform:translate(100%,-50%);transform:translate(100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-start::after{bottom:-.8125rem;left:0;-webkit-transform:translate(0,100%);transform:translate(0,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-center::after{bottom:-.8125rem;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";left:0;width:100%;height:.75rem;top:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::before{bottom:0;left:50%}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::before{bottom:-.5rem;border-width:0 .25rem .3125rem .25rem;border-color:transparent transparent var(--cds-inverse-02,#393939) transparent;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--bottom.bx--tooltip--align-end::after{bottom:-.8125rem;right:0;left:auto;-webkit-transform:translate(0,100%);transform:translate(0,100%)}.bx--tooltip__trigger.bx--btn--icon-only--left{position:relative;display:inline-flex;overflow:visible;align-items:center;cursor:pointer}.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--left:focus{outline:1px solid transparent}.bx--tooltip__trigger.bx--btn--icon-only--left:focus svg{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left:focus svg{outline-style:dotted}}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{position:absolute;z-index:6000;display:flex;align-items:center;opacity:0;pointer-events:none}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{display:inline-block}}.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{transition:opacity 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::before{transition:none}.bx--tooltip__trigger.bx--btn--icon-only--left::before{width:0;height:0;border-style:solid;content:""}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text{box-sizing:content-box;color:inherit;opacity:1;white-space:normal;word-break:break-word}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{box-shadow:0 2px 6px var(--cds-shadow,rgba(0,0,0,.3));z-index:6000;width:-webkit-max-content;width:-moz-max-content;width:max-content;min-width:1.5rem;max-width:13rem;height:auto;padding:.1875rem 1rem;background-color:var(--cds-inverse-02,#393939);border-radius:.125rem;color:var(--cds-inverse-01,#fff);font-weight:400;text-align:left;-webkit-transform:translateX(-50%);transform:translateX(-50%);font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px)}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@supports (-ms-accelerator:true){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@supports (-ms-ime-align:auto){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{width:auto}}@media screen and (-ms-high-contrast:active),screen and (prefers-contrast){.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{border:1px solid transparent}}.bx--tooltip__trigger.bx--btn--icon-only--left::after{content:attr(aria-label)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--a11y::after{content:none}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible::before,.bx--tooltip__trigger.bx--btn--icon-only--left:focus::after,.bx--tooltip__trigger.bx--btn--icon-only--left:focus::before,.bx--tooltip__trigger.bx--btn--icon-only--left:hover::after,.bx--tooltip__trigger.bx--btn--icon-only--left:hover::before{opacity:1}@keyframes tooltip-fade{from{opacity:0}to{opacity:1}}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover+.bx--assistive-text{overflow:visible;margin:auto;clip:auto}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--visible.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--left:focus .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:focus.bx--tooltip--a11y::before,.bx--tooltip__trigger.bx--btn--icon-only--left:hover .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left:hover.bx--tooltip--a11y::before{-webkit-animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9);animation:tooltip-fade 70ms cubic-bezier(.2,0,.38,.9)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden+.bx--assistive-text{overflow:hidden;margin:-1px;clip:rect(0,0,0,0)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--hidden.bx--tooltip--a11y::before{-webkit-animation:none;animation:none;opacity:0}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after,.bx--tooltip__trigger.bx--btn--icon-only--left::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-start::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-center::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text::after{position:absolute;display:block;content:"";top:0;width:.75rem;height:100%;right:-.75rem}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::after,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::before{top:50%;left:0}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::before{left:-.5rem;border-width:.25rem 0 .25rem .3125rem;border-color:transparent transparent transparent var(--cds-inverse-02,#393939);-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end .bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end+.bx--assistive-text,.bx--tooltip__trigger.bx--btn--icon-only--left.bx--tooltip--align-end::after{left:-.8125rem;-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%)}.bx--btn--icon-only{padding-right:.9375rem;padding-left:.9375rem}.bx--btn--icon-only .bx--btn__icon{position:static}.bx--btn--icon-only.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--icon-only.bx--btn--ghost .bx--btn__icon{margin:0}.bx--btn--icon-only.bx--btn--selected{background:var(--cds-selected-ui,#e0e0e0)}.bx--btn path[data-icon-path=inner-path]{fill:none}.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:var(--cds-icon-01,#161616)}.bx--btn--ghost.bx--btn--icon-only[disabled] .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only[disabled] .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn.bx--btn--icon-only.bx--btn--ghost[disabled]:hover .bx--btn__icon{fill:var(--cds-disabled-03,#8d8d8d)}.bx--btn--ghost.bx--btn--icon-only[disabled]{cursor:not-allowed}.bx--btn--field.bx--btn--icon-only,.bx--btn--md.bx--btn--icon-only{padding-right:.6875rem;padding-left:.6875rem}.bx--btn--sm.bx--btn--icon-only{padding-right:.4375rem;padding-left:.4375rem}.bx--btn--danger{border-width:1px;border-style:solid;border-color:transparent;background-color:var(--cds-danger-01,#da1e28);color:var(--cds-text-04,#fff)}.bx--btn--danger:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger .bx--btn__icon,.bx--btn--danger .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger:hover{color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary,.bx--btn--danger-tertiary{border-width:1px;border-style:solid;border-color:var(--cds-danger-02,#da1e28);background-color:transparent;color:var(--cds-danger-02,#da1e28)}.bx--btn--danger--tertiary:hover,.bx--btn--danger-tertiary:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger--tertiary:focus,.bx--btn--danger-tertiary:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger--tertiary:active,.bx--btn--danger-tertiary:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger--tertiary .bx--btn__icon,.bx--btn--danger--tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn--danger-tertiary .bx--btn__icon,.bx--btn--danger-tertiary .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger--tertiary:hover,.bx--btn--danger-tertiary:hover{border-color:var(--cds-hover-danger,#b81921);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary:focus,.bx--btn--danger-tertiary:focus{background-color:var(--cds-danger-01,#da1e28);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary:active,.bx--btn--danger-tertiary:active{border-color:var(--cds-active-danger,#750e13);color:var(--cds-text-04,#fff)}.bx--btn--danger--tertiary.bx--btn--disabled,.bx--btn--danger--tertiary.bx--btn--disabled:focus,.bx--btn--danger--tertiary.bx--btn--disabled:hover,.bx--btn--danger--tertiary:disabled,.bx--btn--danger--tertiary:focus:disabled,.bx--btn--danger--tertiary:hover:disabled,.bx--btn--danger-tertiary.bx--btn--disabled,.bx--btn--danger-tertiary.bx--btn--disabled:focus,.bx--btn--danger-tertiary.bx--btn--disabled:hover,.bx--btn--danger-tertiary:disabled,.bx--btn--danger-tertiary:focus:disabled,.bx--btn--danger-tertiary:hover:disabled{background:0 0;color:var(--cds-disabled-03,#8d8d8d);outline:0}.bx--btn--danger--ghost,.bx--btn--danger-ghost{border-width:1px;border-style:solid;border-color:transparent;background-color:transparent;color:var(--cds-danger-02,#da1e28);padding:calc(.875rem - 3px) 16px}.bx--btn--danger--ghost:hover,.bx--btn--danger-ghost:hover{background-color:var(--cds-hover-danger,#b81921)}.bx--btn--danger--ghost:focus,.bx--btn--danger-ghost:focus{border-color:var(--cds-focus,#0f62fe);box-shadow:inset 0 0 0 1px var(--cds-focus,#0f62fe),inset 0 0 0 2px var(--cds-ui-background,#fff)}.bx--btn--danger--ghost:active,.bx--btn--danger-ghost:active{background-color:var(--cds-active-danger,#750e13)}.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--danger--ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]),.bx--btn--danger-ghost .bx--btn__icon,.bx--btn--danger-ghost .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:currentColor}.bx--btn--danger--ghost .bx--btn__icon,.bx--btn--danger-ghost .bx--btn__icon{position:static;margin-left:.5rem}.bx--btn--danger--ghost:active,.bx--btn--danger--ghost:hover,.bx--btn--danger-ghost:active,.bx--btn--danger-ghost:hover{color:var(--cds-text-04,#fff)}.bx--btn--danger--ghost.bx--btn--disabled,.bx--btn--danger--ghost.bx--btn--disabled:focus,.bx--btn--danger--ghost.bx--btn--disabled:hover,.bx--btn--danger--ghost:disabled,.bx--btn--danger--ghost:focus:disabled,.bx--btn--danger--ghost:hover:disabled,.bx--btn--danger-ghost.bx--btn--disabled,.bx--btn--danger-ghost.bx--btn--disabled:focus,.bx--btn--danger-ghost.bx--btn--disabled:hover,.bx--btn--danger-ghost:disabled,.bx--btn--danger-ghost:focus:disabled,.bx--btn--danger-ghost:hover:disabled{border-color:transparent;background:0 0;color:var(--cds-disabled-02,#c6c6c6);outline:0}.bx--btn--danger--ghost.bx--btn--sm,.bx--btn--danger-ghost.bx--btn--sm{padding:calc(.375rem - 3px) 16px}.bx--btn--danger--ghost.bx--btn--field,.bx--btn--danger--ghost.bx--btn--md,.bx--btn--danger-ghost.bx--btn--field,.bx--btn--danger-ghost.bx--btn--md{padding:calc(.675rem - 3px) 16px}.bx--btn--sm{min-height:2rem;padding:calc(.375rem - 3px) 60px calc(.375rem - 3px) 12px}.bx--btn--xl:not(.bx--btn--icon-only){align-items:baseline;padding-top:var(--cds-spacing-05,1rem);padding-right:var(--cds-spacing-10,4rem);padding-left:var(--cds-spacing-05,1rem);min-height:5rem}.bx--btn--lg:not(.bx--btn--icon-only){align-items:baseline;padding-top:var(--cds-spacing-05,1rem);padding-right:var(--cds-spacing-10,4rem);padding-left:var(--cds-spacing-05,1rem);min-height:4rem}.bx--btn--field,.bx--btn--md{min-height:2.5rem;padding:calc(.675rem - 3px) 60px calc(.675rem - 3px) 12px}.bx--btn--expressive{font-size:var(--cds-body-short-02-font-size,1rem);font-weight:var(--cds-body-short-02-font-weight,400);line-height:var(--cds-body-short-02-line-height,1.375);letter-spacing:var(--cds-body-short-02-letter-spacing,0);min-height:3rem}.bx--btn--icon-only.bx--btn--expressive{padding:12px 13px}.bx--btn.bx--btn--expressive .bx--btn__icon{width:1.25rem;height:1.25rem}.bx--btn-set .bx--btn.bx--btn--expressive{max-width:20rem}.bx--btn.bx--skeleton{position:relative;padding:0;border:none;background:var(--cds-skeleton-01,#e5e5e5);box-shadow:none;pointer-events:none;width:9.375rem}.bx--btn.bx--skeleton:active,.bx--btn.bx--skeleton:focus,.bx--btn.bx--skeleton:hover{border:none;cursor:default;outline:0}.bx--btn.bx--skeleton::before{position:absolute;top:0;left:0;width:100%;height:100%;-webkit-animation:3s ease-in-out skeleton infinite;animation:3s ease-in-out skeleton infinite;background:var(--cds-skeleton-02,#c6c6c6);content:"";will-change:transform-origin,transform,opacity}@media (prefers-reduced-motion:reduce){.bx--btn.bx--skeleton::before{-webkit-animation:none;animation:none}}.bx--btn-set{display:flex}.bx--btn-set--stacked{flex-direction:column}.bx--btn-set .bx--btn{width:100%;max-width:12.25rem}.bx--btn-set .bx--btn:not(:focus){box-shadow:-.0625rem 0 0 0 var(--cds-button-separator,#e0e0e0)}.bx--btn-set .bx--btn:first-of-type:not(:focus){box-shadow:inherit}.bx--btn-set .bx--btn:focus+.bx--btn{box-shadow:inherit}.bx--btn-set--stacked .bx--btn:not(:focus){box-shadow:0 -.0625rem 0 0 var(--cds-button-separator,#e0e0e0)}.bx--btn-set--stacked .bx--btn:first-of-type:not(:focus){box-shadow:inherit}.bx--btn-set .bx--btn.bx--btn--disabled{box-shadow:-.0625rem 0 0 0 var(--cds-disabled-03,#8d8d8d)}.bx--btn-set .bx--btn.bx--btn--disabled:first-of-type{box-shadow:none}.bx--btn-set--stacked .bx--btn.bx--btn--disabled{box-shadow:0 -.0625rem 0 0 var(--cds-disabled-03,#8d8d8d)}.bx--btn-set--stacked .bx--btn.bx--btn--disabled:first-of-type{box-shadow:none}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn:focus{color:Highlight;outline:1px solid Highlight}}@media screen and (-ms-high-contrast:active),(forced-colors:active),(prefers-contrast){.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon,.bx--btn--ghost.bx--btn--icon-only .bx--btn__icon path:not([data-icon-path]):not([fill=none]){fill:ButtonText}}:host(bx-btn),:host(bx-modal-footer-button){display:inline-flex;max-width:20rem;outline:0}:host(bx-btn) .bx--btn,:host(bx-modal-footer-button) .bx--btn{flex-grow:1;max-width:100%}:host(bx-btn) ::slotted([slot=icon]),:host(bx-modal-footer-button) ::slotted([slot=icon]){fill:currentColor;position:absolute;right:1rem;flex-shrink:0}:host(bx-btn)[isExpressive] ::slotted([slot=icon]),:host(bx-modal-footer-button)[isExpressive] ::slotted([slot=icon]){width:1.25rem;height:1.25rem}:host(bx-btn)[icon-layout=condensed] .bx--btn,:host(bx-modal-footer-button)[icon-layout=condensed] .bx--btn{padding-right:2.4375rem}:host(bx-btn) .bx--btn--icon-only ::slotted([slot=icon]),:host(bx-modal-footer-button) .bx--btn--icon-only ::slotted([slot=icon]){position:static}:host(bx-btn)[kind=danger-ghost] ::slotted([slot=icon]),:host(bx-btn)[kind=ghost] ::slotted([slot=icon]),:host(bx-modal-footer-button)[kind=danger-ghost] ::slotted([slot=icon]),:host(bx-modal-footer-button)[kind=ghost] ::slotted([slot=icon]){position:static;margin-left:.5rem}:host(bx-btn)[kind=danger-ghost][icon-layout=condensed] .bx--btn,:host(bx-btn)[kind=ghost][icon-layout=condensed] .bx--btn,:host(bx-modal-footer-button)[kind=danger-ghost][icon-layout=condensed] .bx--btn,:host(bx-modal-footer-button)[kind=ghost][icon-layout=condensed] .bx--btn{padding-right:1rem}:host(bx-btn[kind=ghost]) .bx--btn--ghost:active,:host(bx-btn[kind=ghost]:hover) .bx--btn--ghost{outline:0}`
]);
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
  for (var i = 1; i < arguments.length; i++) {
    var source2 = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source2), true).forEach(function(key) {
      _defineProperty(target, key, source2[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2)) : ownKeys(Object(source2)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source2, key));
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
let _$5 = (t) => t, _t$6, _t2$3, _t3$1;
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
      value: function render() {
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
          return disabled ? html(_t$6 || (_t$6 = _$5` <p id="button" part="button" class="${0}"> <slot @slotchange="${0}"></slot> <slot name="icon" @slotchange="${0}"></slot> </p> `), classes, handleSlotChange, handleSlotChange) : html(_t2$3 || (_t2$3 = _$5` <a id="button" part="button" role="${0}" class="${0}" download="${0}" href="${0}" hreflang="${0}" ping="${0}" rel="${0}" target="${0}" type="${0}"> <slot @slotchange="${0}"></slot> <slot name="icon" @slotchange="${0}"></slot> </a> `), ifNonNull(linkRole), classes, ifNonNull(download), ifNonNull(href), ifNonNull(hreflang), ifNonNull(ping), ifNonNull(rel), ifNonNull(target), ifNonNull(type), handleSlotChange, handleSlotChange);
        }
        return html(_t3$1 || (_t3$1 = _$5` <button id="button" part="button" class="${0}" ?autofocus="${0}" ?disabled="${0}" type="${0}"> <slot @slotchange="${0}"></slot> <slot name="icon" @slotchange="${0}"></slot> </button> `), classes, autofocus, disabled, ifNonNull(type), handleSlotChange, handleSlotChange);
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
}, HostListenerMixin(FocusMixin(LitElement)));
let _$4 = (t) => t, _t$5, _t2$2;
const {
  prefix: prefix$7
} = settings_1;
_decorate([customElement(`${prefix$7}-btn-skeleton`)], function(_initialize, _BXButton) {
  class BXButtonSkeleton extends _BXButton {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: BXButtonSkeleton,
    d: [{
      kind: "method",
      key: "_handleClickLinkSkeleton",
      value: function _handleClickLinkSkeleton(event) {
        if (this.disabled) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        const {
          autofocus,
          disabled,
          download,
          href,
          hreflang,
          ping,
          rel,
          size,
          target,
          type
        } = this;
        const classes = classMap({
          [`${prefix$7}--btn`]: true,
          [`${prefix$7}--skeleton`]: true,
          [`${prefix$7}--btn--${size}`]: size
        });
        return href ? html(_t$5 || (_t$5 = _$4` <a id="button" role="button" class="${0}" download="${0}" href="${0}" hreflang="${0}" ping="${0}" rel="${0}" target="${0}" type="${0}" @click="${0}"></a> `), classes, ifNonNull(download), ifNonNull(href), ifNonNull(hreflang), ifNonNull(ping), ifNonNull(rel), ifNonNull(target), ifNonNull(type), this._handleClickLinkSkeleton) : html(_t2$2 || (_t2$2 = _$4` <button id="button" class="${0}" ?autofocus="${0}" ?disabled="${0}" type="${0}"></button> `), classes, autofocus, disabled, ifNonNull(type));
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
}, BXButton);
/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var styles$1 = css([
  `a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{padding:0;border:0;margin:0;font:inherit;font-size:100%;vertical-align:baseline}button,input,select,textarea{border-radius:0;font-family:inherit}input[type=text]::-ms-clear{display:none}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}body{line-height:1}sup{vertical-align:super}sub{vertical-align:sub}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:""}table{border-collapse:collapse;border-spacing:0}*{box-sizing:border-box}button{margin:0}html{font-size:100%}body{font-weight:400;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}code{font-family:'IBM Plex Mono',Menlo,'DejaVu Sans Mono','Bitstream Vera Sans Mono',Courier,monospace}strong{font-weight:600}@media screen and (-ms-high-contrast:active){svg{fill:ButtonText}}h1{font-size:var(--cds-productive-heading-06-font-size,2.625rem);font-weight:var(--cds-productive-heading-06-font-weight,300);line-height:var(--cds-productive-heading-06-line-height,1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing,0)}h2{font-size:var(--cds-productive-heading-05-font-size,2rem);font-weight:var(--cds-productive-heading-05-font-weight,400);line-height:var(--cds-productive-heading-05-line-height,1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing,0)}h3{font-size:var(--cds-productive-heading-04-font-size,1.75rem);font-weight:var(--cds-productive-heading-04-font-weight,400);line-height:var(--cds-productive-heading-04-line-height,1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing,0)}h4{font-size:var(--cds-productive-heading-03-font-size,1.25rem);font-weight:var(--cds-productive-heading-03-font-weight,400);line-height:var(--cds-productive-heading-03-line-height,1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing,0)}h5{font-size:var(--cds-productive-heading-02-font-size,1rem);font-weight:var(--cds-productive-heading-02-font-weight,600);line-height:var(--cds-productive-heading-02-line-height,1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing,0)}h6{font-size:var(--cds-productive-heading-01-font-size,.875rem);font-weight:var(--cds-productive-heading-01-font-weight,600);line-height:var(--cds-productive-heading-01-line-height,1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing,.16px)}p{font-size:var(--cds-body-long-02-font-size,1rem);font-weight:var(--cds-body-long-02-font-weight,400);line-height:var(--cds-body-long-02-line-height,1.5);letter-spacing:var(--cds-body-long-02-letter-spacing,0)}a{color:#0f62fe}em{font-style:italic}@-webkit-keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}@keyframes skeleton{0%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}20%{opacity:1;-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}28%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}51%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}58%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:right;transform-origin:right}82%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:right;transform-origin:right}83%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:left;transform-origin:left}96%{-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}100%{opacity:.3;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:left;transform-origin:left}}.bx--link{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);display:inline-flex;color:var(--cds-link-01,#0f62fe);outline:0;text-decoration:none;transition:color 70ms cubic-bezier(.2,0,.38,.9)}.bx--link *,.bx--link ::after,.bx--link ::before{box-sizing:inherit}.bx--link:hover{color:var(--cds-hover-primary-text,#0043ce);text-decoration:underline}.bx--link:active,.bx--link:active:visited,.bx--link:active:visited:hover{color:var(--cds-text-01,#161616);text-decoration:underline}.bx--link:focus{outline:1px solid var(--cds-focus,#0f62fe)}@media screen and (prefers-contrast){.bx--link:focus{outline-style:dotted}}.bx--link:visited{color:var(--cds-link-01,#0f62fe)}.bx--link:visited:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--link--disabled,.bx--link--disabled:hover{box-sizing:border-box;padding:0;border:0;margin:0;font-family:inherit;font-size:100%;vertical-align:baseline;font-size:var(--cds-body-short-01-font-size,.875rem);font-weight:var(--cds-body-short-01-font-weight,400);line-height:var(--cds-body-short-01-line-height,1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing,.16px);color:var(--cds-disabled-02,#c6c6c6);cursor:not-allowed;font-weight:400;text-decoration:none}.bx--link--disabled *,.bx--link--disabled ::after,.bx--link--disabled ::before,.bx--link--disabled:hover *,.bx--link--disabled:hover ::after,.bx--link--disabled:hover ::before{box-sizing:inherit}.bx--link.bx--link--visited:visited{color:var(--cds-visited-link,#8a3ffc)}.bx--link.bx--link--visited:visited:hover{color:var(--cds-hover-primary-text,#0043ce)}.bx--link.bx--link--inline{text-decoration:underline}.bx--link.bx--link--inline:focus,.bx--link.bx--link--inline:visited{text-decoration:none}.bx--link--disabled.bx--link--inline{text-decoration:underline}.bx--link--sm{font-size:var(--cds-helper-text-01-font-size,.75rem);line-height:var(--cds-helper-text-01-line-height,1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing,.32px)}.bx--link--lg{font-size:var(--cds-body-short-02-font-size,1rem);font-weight:var(--cds-body-short-02-font-weight,400);line-height:var(--cds-body-short-02-line-height,1.375);letter-spacing:var(--cds-body-short-02-letter-spacing,0)}.bx--link__icon{display:inline-flex;align-self:center;margin-left:var(--cds-spacing-03,.5rem)}:host(bx-link){outline:0}:host(bx-link) .bx--link--disabled{color:var(--cds-disabled-02,#c6c6c6)}:host(bx-link) .bx--link__icon[hidden]{display:none}`
]);
let _2 = (t) => t, _t$4, _t2$1, _t3;
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
      value: function render() {
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
        return styles$1;
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
var styles = css([
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
        return styles;
      }
    }]
  };
}, BXLink);
let _$3 = (t) => t, _t$3;
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
      value: function render() {
        const {
          expanded,
          _belowTheContentHeight: belowTheContentHeight,
          _handleSlotChangeBelowTheFoldContent: handleSlotChangeBelowTheFoldContent
        } = this;
        return html(_t$3 || (_t$3 = _$3` <button class="${0}--tile__chevron" aria-labelledby="above-the-fold-content" aria-controls="below-the-fold-content" aria-expanded="${0}"> ${0} </button> <div id="content" class="${0}--tile-content"> <div><slot name="above-the-fold-content"></slot></div> <div class="${0}-ce--expandable-tile--below-the-fold-content" style="${0}"> <slot @slotchange="${0}"></slot> </div> </div> `), prefix$4, String(Boolean(expanded)), svgResultCarbonIcon$2({
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
        return styles;
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
const svgResultCarbonIcon = ({ children, ...attrs } = {}) => svg`<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" ...="${spread2(attrs)}" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">${children}${children}${children}<path d="M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"></path><path d="M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z" data-icon-path="inner-path" opacity="0"></path></svg>`;
let _$2 = (t) => t, _t$2, _t2;
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
      value: function render() {
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
          children: !checkmarkLabel ? void 0 : svg$1(_t2 || (_t2 = _$2`<title>${0}</title>`), checkmarkLabel)
        }), prefix$3);
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles;
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
let _$1 = (t) => t, _t$1;
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
      value: function render() {
        return html(_t$1 || (_t$1 = _$1`<slot></slot>`));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles;
      }
    }]
  };
}, LitElement);
let _ = (t) => t, _t;
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
      value: function render() {
        return html(_t || (_t = _`<slot></slot>`));
      }
    }, {
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return styles;
      }
    }]
  };
}, LitElement);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let ExpBrickWizard = class extends LitElement$1 {
  constructor() {
    super(...arguments);
    this.lang = "en";
    this._variables = {
      fonts: [
        { "family": "Roboto", "variant": "300" },
        { "family": "Open Sans", "variant": "300" },
        { "family": "Open Sans", "variant": "700" },
        { "family": "Lato", "variant": "300" },
        { "family": "Montserrat", "variant": "300" },
        { "family": "Montserrat", "variant": "700" },
        { "family": "Poppins", "variant": "200" },
        { "family": "Source Sans Pro", "variant": "400" },
        { "family": "Raleway", "variant": "600" },
        { "family": "Raleway", "variant": "300" },
        { "family": "Ubuntu", "variant": "300" },
        { "family": "Lora", "variant": "400" },
        { "family": "Fira Sans", "variant": "300" },
        { "family": "Fira Sans", "variant": "700" }
      ],
      keywords: {
        "ODS": {
          "01": ["energy consumption", "clean energy", "financial poverty"],
          "02": ["circular food ingredients", "food cook", "farms", "farming"],
          "03": ["clinical support systems", "health platforms", "medicine", "patient implants PSI", "AI medical image analysis"],
          "04": ["learn", "educational", "study", "science technology learning"],
          "05": ["women health", "women empowerment", "women tech", "women networks", "women safety"],
          "06": ["water", "sanitary water treatment", "rain water harvest", "water management"],
          "07": ["energy resources", "energy internet IoE", "decentralized energy", "energy storage", "waste energy"],
          "08": ["economy growth", "crowdsource economy", "recruitment", "financial api"],
          "09": ["smart mobility", "smart devices", "machines", "industrial", "infrastructure AI"],
          "10": ["small farming", "financial inclusion", "diversity hiring", "groups media", "student financing"],
          "11": ["affordable house cities", "urban green quality", "risk management cities", "urban management", "green urban mobility"],
          "12": ["carbon foot track", "supply chain trace", "responsible sourc", "water sustainable feed"],
          "13": ["climate change", "emissions track", "carbon climate", "power climate balance", "climate finance"],
          "14": ["water quality", "smart fish", "recycled plastic", "ocean AI", "aquaculture clean", "green ocean"],
          "15": ["tree planting", "soil monitor", "wildfire", "tree plants", "animal life"],
          "16": ["legal help", "social legal assist", "legal knowledge", "social impact"],
          "17": ["political collaboration", "buil collaboration", "innovation share", "management platform"]
        },
        "ICONS": {
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
      "es": {
        btnPost: "Explorar",
        btnRefresh: "Limpiar",
        ideaHeader: ""
      },
      "en": {
        btnPost: "Explore",
        btnRefresh: "Refresh",
        ideaHeader: ""
      },
      "pt-pt": {
        btnPost: "Explorar",
        btnRefresh: "Limpiar",
        ideaHeader: ""
      }
    };
    this._studies = {
      "es": {
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
      "en": {
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
      "pt-pt": {
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
      }
    };
    this._countries = {
      "es": {
        title: "\xBFEn qu\xE9 lugar resides?",
        arial: "Pa\xEDs de residencia",
        holder: "Selecciona un pa\xEDs",
        validity: "Tienes que seleccionar uno",
        values: [
          { "value": "argentina", "name": "Argentina" },
          { "value": "brazil", "name": "Brasil" },
          { "value": "chili", "name": "Chile" },
          { "value": "spain", "name": "Espa\xF1a" },
          { "value": "mexico", "name": "M\xE9xico" },
          { "value": "portugal", "name": "Portugal" },
          { "value": "uk", "name": "Reino Unido" },
          { "value": "uruguay", "name": "Uruguay" }
        ]
      },
      "en": {
        title: "\xBFEn qu\xE9 lugar resides?",
        arial: "Pa\xEDs de residencia",
        holder: "Selecciona un pa\xEDs",
        validity: "Tienes que seleccionar uno",
        values: [
          { "value": "argentina", "name": "Argentina" },
          { "value": "brazil", "name": "Brasil" },
          { "value": "chili", "name": "Chile" },
          { "value": "spain", "name": "Espa\xF1a" },
          { "value": "mexico", "name": "M\xE9xico" },
          { "value": "portugal", "name": "Portugal" },
          { "value": "uk", "name": "Reino Unido" },
          { "value": "uruguay", "name": "Uruguay" }
        ]
      },
      "pt-pt": {
        title: "\xBFEn qu\xE9 lugar resides?",
        arial: "Pa\xEDs de residencia",
        holder: "Selecciona un pa\xEDs",
        validity: "Tienes que seleccionar uno",
        values: [
          { "value": "argentina", "name": "Argentina" },
          { "value": "brazil", "name": "Brasil" },
          { "value": "chili", "name": "Chile" },
          { "value": "spain", "name": "Espa\xF1a" },
          { "value": "mexico", "name": "M\xE9xico" },
          { "value": "portugal", "name": "Portugal" },
          { "value": "uk", "name": "Reino Unido" },
          { "value": "uruguay", "name": "Uruguay" }
        ]
      }
    };
    this._sectors = {
      "es": {
        title: "\xBFEn que ind\xFAstria te gustar\xEDa trabajar?",
        arial: "Sector",
        holder: "Selecciona una industria",
        validity: "Tienes que seleccionar una",
        values: [
          { "value": "aerospace", "name": "Aeroespacial" },
          { "value": "agriculture", "name": "Agricultura" },
          { "value": "chemistry", "name": "Industria Qu\xEDmica" },
          { "value": "software", "name": "Desarrollo de Software" },
          { "value": "hardware", "name": "Desarrollo de Hardware" },
          { "value": "construction", "name": "Construcci\xF3n" },
          { "value": "defense", "name": "Defensa" },
          { "value": "education", "name": "Educaci\xF3n" },
          { "value": "energy", "name": "Energ\xEDa" },
          { "value": "arts entertainment", "name": "Entretenimiento" },
          { "value": "financial fintech", "name": "Finanzas" },
          { "value": "insurance insurtech", "name": "Seguros" },
          { "value": "retail", "name": "Venta minorista" },
          { "value": "food", "name": "Alimentaci\xF3n" },
          { "value": "health", "name": "Salud" },
          { "value": "hospitality restaurant", "name": "Hosteler\xEDa" },
          { "value": "manufacture", "name": "Frabricaci\xF3n industria\xF1" },
          { "value": "media", "name": "Medios de comunicaci\xF3n" },
          { "value": "comunications", "name": "Telecomunicaciones" },
          { "value": "transport delivery", "name": "Transporte" },
          { "value": "business services", "name": "Servicios" }
        ]
      },
      "en": {
        title: "\xBFEn que ind\xFAstria te gustar\xEDa trabajar?",
        arial: "Sector",
        holder: "Selecciona una industria",
        validity: "Tienes que seleccionar una",
        values: [
          { "value": "aerospace", "name": "Aeroespacial" },
          { "value": "agriculture", "name": "Agricultura" },
          { "value": "chemistry", "name": "Industria Qu\xEDmica" },
          { "value": "software", "name": "Desarrollo de Software" },
          { "value": "hardware", "name": "Desarrollo de Hardware" },
          { "value": "construction", "name": "Construcci\xF3n" },
          { "value": "defense", "name": "Defensa" },
          { "value": "education", "name": "Educaci\xF3n" },
          { "value": "energy", "name": "Energ\xEDa" },
          { "value": "arts entertainment", "name": "Entretenimiento" },
          { "value": "financial fintech", "name": "Finanzas" },
          { "value": "insurance insurtech", "name": "Seguros" },
          { "value": "retail", "name": "Venta minorista" },
          { "value": "food", "name": "Alimentaci\xF3n" },
          { "value": "health", "name": "Salud" },
          { "value": "hospitality restaurant", "name": "Hosteler\xEDa" },
          { "value": "manufacture", "name": "Frabricaci\xF3n industria\xF1" },
          { "value": "media", "name": "Medios de comunicaci\xF3n" },
          { "value": "comunications", "name": "Telecomunicaciones" },
          { "value": "transport delivery", "name": "Transporte" },
          { "value": "business services", "name": "Servicios" }
        ]
      },
      "pt-pt": {
        title: "\xBFEn que ind\xFAstria te gustar\xEDa trabajar?",
        arial: "Sector",
        holder: "Selecciona una industria",
        validity: "Tienes que seleccionar una",
        values: [
          { "value": "aerospace", "name": "Aeroespacial" },
          { "value": "agriculture", "name": "Agricultura" },
          { "value": "chemistry", "name": "Industria Qu\xEDmica" },
          { "value": "software", "name": "Desarrollo de Software" },
          { "value": "hardware", "name": "Desarrollo de Hardware" },
          { "value": "construction", "name": "Construcci\xF3n" },
          { "value": "defense", "name": "Defensa" },
          { "value": "education", "name": "Educaci\xF3n" },
          { "value": "energy", "name": "Energ\xEDa" },
          { "value": "arts entertainment", "name": "Entretenimiento" },
          { "value": "financial fintech", "name": "Finanzas" },
          { "value": "insurance insurtech", "name": "Seguros" },
          { "value": "retail", "name": "Venta minorista" },
          { "value": "food", "name": "Alimentaci\xF3n" },
          { "value": "health", "name": "Salud" },
          { "value": "hospitality restaurant", "name": "Hosteler\xEDa" },
          { "value": "manufacture", "name": "Frabricaci\xF3n industria\xF1" },
          { "value": "media", "name": "Medios de comunicaci\xF3n" },
          { "value": "comunications", "name": "Telecomunicaciones" },
          { "value": "transport delivery", "name": "Transporte" },
          { "value": "business services", "name": "Servicios" }
        ]
      }
    };
    this._ods = {
      "es": {
        title: "\xBFQu\xE9 ODS 2030 de la ONU te gustar\xEDa afrontar?",
        arial: "ODS",
        holder: "Selecciona un ODS",
        validity: "Tienes que seleccionar uno",
        values: [
          { "value": "01", "name": "Fin de la pobreza" },
          { "value": "02", "name": "Hambre Cero" },
          { "value": "03", "name": "Salud y bienestar" },
          { "value": "04", "name": "Educaci\xF3n de calidad" },
          { "value": "05", "name": "Igualdad de g\xE9nero" },
          { "value": "06", "name": "Agua limpia y saneamiento" },
          { "value": "07", "name": "Energ\xEDa asequible y no contaminante" },
          { "value": "08", "name": "Trabajo decente y crecimiento econ\xF3mico" },
          { "value": "09", "name": "Industria, Innovaci\xF3n e Infraestructura" },
          { "value": "10", "name": "Reducci\xF3n de las desigualdades" },
          { "value": "11", "name": "Ciudades y comunidades sostenibles" },
          { "value": "12", "name": "Producci\xF3n y Consumo Responsables" },
          { "value": "13", "name": "Acci\xF3n por el clima" },
          { "value": "14", "name": "Vida submarina" },
          { "value": "15", "name": "Vida de ecosistemas terrestres" },
          { "value": "16", "name": "Paz, justicia e instituciones s\xF3lidas" },
          { "value": "17", "name": "Alianzas para lograr los objetivos" }
        ]
      },
      "en": {
        title: "\xBFQu\xE9 ODS 2030 de la ONU te gustar\xEDa afrontar?",
        arial: "ODS",
        holder: "Selecciona un ODS",
        validity: "Tienes que seleccionar uno",
        values: [
          { "value": "01", "name": "Fin de la pobreza" },
          { "value": "02", "name": "Hambre Cero" },
          { "value": "03", "name": "Salud y bienestar" },
          { "value": "04", "name": "Educaci\xF3n de calidad" },
          { "value": "05", "name": "Igualdad de g\xE9nero" },
          { "value": "06", "name": "Agua limpia y saneamiento" },
          { "value": "07", "name": "Energ\xEDa asequible y no contaminante" },
          { "value": "08", "name": "Trabajo decente y crecimiento econ\xF3mico" },
          { "value": "09", "name": "Industria, Innovaci\xF3n e Infraestructura" },
          { "value": "10", "name": "Reducci\xF3n de las desigualdades" },
          { "value": "11", "name": "Ciudades y comunidades sostenibles" },
          { "value": "12", "name": "Producci\xF3n y Consumo Responsables" },
          { "value": "13", "name": "Acci\xF3n por el clima" },
          { "value": "14", "name": "Vida submarina" },
          { "value": "15", "name": "Vida de ecosistemas terrestres" },
          { "value": "16", "name": "Paz, justicia e instituciones s\xF3lidas" },
          { "value": "17", "name": "Alianzas para lograr los objetivos" }
        ]
      },
      "pt-pt": {
        title: "\xBFQu\xE9 ODS 2030 de la ONU te gustar\xEDa afrontar?",
        arial: "ODS",
        holder: "Selecciona un ODS",
        validity: "Tienes que seleccionar uno",
        values: [
          { "value": "01", "name": "Fin de la pobreza" },
          { "value": "02", "name": "Hambre Cero" },
          { "value": "03", "name": "Salud y bienestar" },
          { "value": "04", "name": "Educaci\xF3n de calidad" },
          { "value": "05", "name": "Igualdad de g\xE9nero" },
          { "value": "06", "name": "Agua limpia y saneamiento" },
          { "value": "07", "name": "Energ\xEDa asequible y no contaminante" },
          { "value": "08", "name": "Trabajo decente y crecimiento econ\xF3mico" },
          { "value": "09", "name": "Industria, Innovaci\xF3n e Infraestructura" },
          { "value": "10", "name": "Reducci\xF3n de las desigualdades" },
          { "value": "11", "name": "Ciudades y comunidades sostenibles" },
          { "value": "12", "name": "Producci\xF3n y Consumo Responsables" },
          { "value": "13", "name": "Acci\xF3n por el clima" },
          { "value": "14", "name": "Vida submarina" },
          { "value": "15", "name": "Vida de ecosistemas terrestres" },
          { "value": "16", "name": "Paz, justicia e instituciones s\xF3lidas" },
          { "value": "17", "name": "Alianzas para lograr los objetivos" }
        ]
      }
    };
  }
  async loadFontFromURL() {
    import("https://cdn.jsdelivr.net/gh/explorerbyx/web-components@latest/webfontloader.min.js").then(function(n) {
      return n.w;
    }).then((WebFontLoader) => {
      WebFontLoader.load({
        google: {
          families: this._variables.fonts.map((f) => {
            return String(f.family + ":" + f.variant);
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
    var r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }
  padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
  }
  render() {
    return html$1`
      <bx-form-item id="ideaAttr" class="exp-questions-margins">
        <div class="cds--grid cds--type-sans">
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <bx-select id="studies" name="studies" autofocus required 
                validity-message="${this._studies[this.lang].validity}" 
                label-text="${this._studies[this.lang].title}" 
                placeholder="${this._studies[this.lang].holder}"
                @input=${this.changeValue}
              >
                ${map(this._studies[this.lang].values, (vPar) => html$1`<bx-select-item value="${vPar.value}">${vPar.name}</bx-select-item>`)}
              </bx-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <bx-select id="country" name="country" autofocus required 
                validity-message="${this._countries[this.lang].validity}" 
                label-text="${this._countries[this.lang].title}" 
                placeholder="${this._countries[this.lang].holder}"
                @input=${this.changeValue}
              >
                ${map(this._countries[this.lang].values, (vPar) => html$1`<bx-select-item value="${vPar.value}">${vPar.name}</bx-select-item>`)}
              </bx-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <bx-select id="sector" name="sector" autofocus required 
                validity-message="${this._sectors[this.lang].validity}" 
                label-text="${this._sectors[this.lang].title}" 
                placeholder="${this._sectors[this.lang].holder}"
                @input=${this.changeValue}
              >
                ${map(this._sectors[this.lang].values, (vPar) => html$1`<bx-select-item value="${vPar.value}">${vPar.name}</bx-select-item>`)}
              </bx-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <bx-select id="ods" name="ods" autofocus required 
                validity-message="${this._ods[this.lang].validity}" 
                label-text="${this._ods[this.lang].title}" 
                placeholder="${this._ods[this.lang].holder}"
                @input=${this.changeValue}
              >
                ${map(this._ods[this.lang].values, (vPar) => html$1`<bx-select-item value="${vPar.value}">${vPar.name}</bx-select-item>`)}
              </bx-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--cols-sm-2">
              <bx-btn @click="${this._submitForm}" type="submit" isExpressive kind="tertiary" class="padding right">
                ${this._texts[this.lang].btnPost} <!-- &nbsp;&nbsp;&nbsp; $ { addIconNode } -->
              </bx-btn>
            </div>
            <div class="cds--cols-sm-2">
              <bx-btn @click="${this._refreshForm}" isExpressive kind="danger-tertiary" class="padding left">
                ${this._texts[this.lang].btnRefresh}
              </bx-btn>
            </div>
          </div>
        </div>
      </bx-form-item>
      <div class="cds--grid cds--type-sans">
        <div class="cds--row exp-questions-margins">
          <div id="ideaText" class="cds--col-auto exp-text-center">
          </div>
        </div>
        <br/>
        <div id="proGallery" class="cds--row exp-questions-margins">
        </div>
      </div>
    </div>
    `;
  }
  changeValue(e) {
    const input = e.target;
    input.value ? input.removeAttribute("invalid") : input.setAttribute("invalid", "true");
  }
  async _submitForm() {
    this.setIdeaText();
    this.setLogos([]);
    const studies = this._selectedStudies.value;
    studies ? this._selectedStudies.removeAttribute("invalid") : this._selectedStudies.setAttribute("invalid", "true");
    const country = this._selectedCountry.value;
    country ? this._selectedCountry.removeAttribute("invalid") : this._selectedCountry.setAttribute("invalid", "true");
    const sector = this._selectedSector.value;
    sector ? this._selectedSector.removeAttribute("invalid") : this._selectedSector.setAttribute("invalid", "true");
    const ods = this._selectedODS.value;
    ods ? this._selectedODS.removeAttribute("invalid") : this._selectedODS.setAttribute("invalid", "true");
    if (!studies || !country || !sector || !ods)
      return;
    const odsKeys = String(this._variables.keywords.ODS[ods][Math.floor(Math.random() * this._variables.keywords.ODS[ods].length)] || "").toLocaleLowerCase("en");
    const iconKey = String(this._variables.keywords.ICONS[ods][Math.floor(Math.random() * this._variables.keywords.ICONS[ods].length)] || "").toLocaleLowerCase("en");
    const apiUrl = "https://" + (window.location.host === "localhost:3000" ? "apps.explorerbyx.org" : window.location.host) + "/api/exec-task";
    const qParams = "?action=new&target=custom&object=ideax";
    const body = {
      "iconKeys": iconKey,
      "lang": this.lang.toLocaleUpperCase().substring(0, 2),
      "country": country,
      "odsKeys": odsKeys,
      "keywords": sector + " " + studies
    };
    let response = await axios.post(apiUrl + qParams, body).then((response2) => {
      return response2.data;
    }).catch((error) => {
      console.log(error);
      return {};
    });
    response = { "idea": "Un servicio de reparto de comida que utiliza una flota de peque\xF1os scooters de reparto para entregar comida en las calles m\xE1s transitadas de la ciudad.", "logos": [{ "icon": { "id": 2979681, "tags": "food industry,production,industry,factory,farming and gardening,manufacture,dairy", "image": "https://cdn-icons-png.flaticon.com/512/2979/2979681.png", "description": "Food industry" }, "brand": { "title": "ENERGEL", "titleFamily": "Comfortaa Bold Alt1", "titleVariant": "700", "taglineFamily": "Raleway", "taglineVariant": "500", "titleColor": "#fe2a41", "taglineColor": "#ffffff", "backgroundColor": "#ffffff" } }, { "icon": { "id": 3104918, "tags": "organic,vegetables,farming and gardening,vegan,food and restaurant,healthy food,diet,vegetarian,carrots", "image": "https://cdn-icons-png.flaticon.com/512/3104/3104918.png", "description": "Organic" }, "brand": { "title": "SPRUCELEAF", "titleFamily": "Abril Fatface", "titleVariant": "400", "taglineFamily": "Droid Serif", "taglineVariant": "italic", "titleColor": "", "taglineColor": "#ffffff", "backgroundColor": "#292735" } }, { "icon": { "id": 4478186, "tags": "wheat,carbohydrates,grain,seed,cereal,branch,cereals,food and restaurant,farming and gardening,nutrition,nature", "image": "https://cdn-icons-png.flaticon.com/512/4478/4478186.png", "description": "Wheat" }, "brand": { "title": "JUTEAFARMS", "titleFamily": "Raleway Medium Alt1", "titleVariant": "500", "taglineFamily": "Raleway", "taglineVariant": "600italic", "titleColor": "#ffffff", "taglineColor": "#ffffff", "backgroundColor": "#ffffff" } }, { "icon": { "id": 826969, "tags": "peach,cute,fruit,diet,food,healthy food,nature,food and restaurant,farming and gardening,organic,vegan,gardening,vegetarian,farming", "image": "https://cdn-icons-png.flaticon.com/512/826/826969.png", "description": "Peach" }, "brand": { "title": "MYNOODLE", "titleFamily": "Raleway Medium Alt1", "titleVariant": "500", "taglineFamily": "Raleway", "taglineVariant": "600italic", "titleColor": "", "taglineColor": "#ffffff", "backgroundColor": "#a39c96" } }, { "icon": { "id": 3798970, "tags": "commodity,local,products,fair trade,market,groceries,basket,food and restaurant,farming,trade,business,money,food", "image": "https://cdn-icons-png.flaticon.com/512/3798/3798970.png", "description": "Products" }, "brand": { "title": "Foodology", "titleFamily": "Teko", "titleVariant": "400", "taglineFamily": "Fira Sans Condensed", "taglineVariant": "italic", "titleColor": "#ced6e2", "taglineColor": "#ffffff", "backgroundColor": "#4294f1" } }, { "icon": { "id": 4478186, "tags": "wheat,carbohydrates,grain,seed,cereal,branch,cereals,food and restaurant,farming and gardening,nutrition,nature", "image": "https://cdn-icons-png.flaticon.com/512/4478/4478186.png", "description": "Wheat" }, "brand": { "title": "Tappi", "titleFamily": "Comfortaa Bold Alt2", "titleVariant": "700", "taglineFamily": "Raleway", "taglineVariant": "500", "titleColor": "", "taglineColor": "#ffffff", "backgroundColor": "#28272d" } }] };
    this.setIdeaText(response.idea);
    this.setLogos(response.logos || []);
  }
  async _refreshForm() {
    this._selectedStudies.value = "";
    this._selectedStudies.removeAttribute("invalid");
    this._selectedCountry.value = "";
    this._selectedCountry.removeAttribute("invalid");
    this._selectedSector.value = "";
    this._selectedSector.removeAttribute("invalid");
    this._selectedODS.value = "";
    this._selectedODS.removeAttribute("invalid");
    this.setIdeaText();
    this.setLogos([]);
  }
  setLogos(logos) {
    if (logos.length > 0) {
      logos.map((logo) => {
        var _a;
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
          ${((_a = logo == null ? void 0 : logo.icon) == null ? void 0 : _a.image) ? '<img src="' + logo.icon.image + '" class="business-icon">' : ""}
          <h4 style="${style}">${logo.brand.title.toLocaleUpperCase("en")}</h4>
        `;
        this._areaProGallery.appendChild(divObj);
      });
    } else {
      this._areaProGallery.innerHTML = "";
    }
  }
  setIdeaText(text) {
    if (text) {
      this._areaIdeaText.innerHTML = `
        <h2>${this._texts[this.lang].ideaHeader}</h2>
        <h3>${text}</h3>
      `;
    } else {
      this._areaIdeaText.innerHTML = "";
    }
  }
};
ExpBrickWizard.styles = [unsafeCSS(expBrickWizard)];
__decorateClass([
  query$1("#ideaAttr", true)
], ExpBrickWizard.prototype, "_formIdeaAttr", 2);
__decorateClass([
  query$1("#proGallery", true)
], ExpBrickWizard.prototype, "_areaProGallery", 2);
__decorateClass([
  query$1("#ideaText", true)
], ExpBrickWizard.prototype, "_areaIdeaText", 2);
__decorateClass([
  query$1("#studies", true)
], ExpBrickWizard.prototype, "_selectedStudies", 2);
__decorateClass([
  query$1("#country", true)
], ExpBrickWizard.prototype, "_selectedCountry", 2);
__decorateClass([
  query$1("#sector", true)
], ExpBrickWizard.prototype, "_selectedSector", 2);
__decorateClass([
  query$1("#ods", true)
], ExpBrickWizard.prototype, "_selectedODS", 2);
__decorateClass([
  property$1()
], ExpBrickWizard.prototype, "lang", 2);
__decorateClass([
  property$1({ state: true })
], ExpBrickWizard.prototype, "_variables", 2);
__decorateClass([
  property$1({ state: true })
], ExpBrickWizard.prototype, "_texts", 2);
__decorateClass([
  property$1({ state: true })
], ExpBrickWizard.prototype, "_studies", 2);
__decorateClass([
  property$1({ state: true })
], ExpBrickWizard.prototype, "_countries", 2);
__decorateClass([
  property$1({ state: true })
], ExpBrickWizard.prototype, "_sectors", 2);
__decorateClass([
  property$1({ state: true })
], ExpBrickWizard.prototype, "_ods", 2);
ExpBrickWizard = __decorateClass([
  customElement$1("exp-brick-wizard")
], ExpBrickWizard);
export { ExpBrickWizard };
