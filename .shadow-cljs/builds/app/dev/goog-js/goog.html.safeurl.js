["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/html/safeurl.js"],"~:js","goog.provide(\"goog.html.SafeUrl\");\ngoog.require(\"goog.asserts\");\ngoog.require(\"goog.fs.url\");\ngoog.require(\"goog.html.TrustedResourceUrl\");\ngoog.require(\"goog.i18n.bidi.Dir\");\ngoog.require(\"goog.i18n.bidi.DirectionalString\");\ngoog.require(\"goog.string.Const\");\ngoog.require(\"goog.string.TypedString\");\ngoog.require(\"goog.string.internal\");\ngoog.html.SafeUrl = class {\n  constructor(value, token) {\n    this.privateDoNotAccessOrElseSafeUrlWrappedValue_ = token === goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ ? value : \"\";\n  }\n};\ngoog.html.SafeUrl.INNOCUOUS_STRING = \"about:invalid#zClosurez\";\ngoog.html.SafeUrl.prototype.implementsGoogStringTypedString = true;\ngoog.html.SafeUrl.prototype.getTypedStringValue = function() {\n  return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();\n};\ngoog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = true;\ngoog.html.SafeUrl.prototype.getDirection = function() {\n  return goog.i18n.bidi.Dir.LTR;\n};\ngoog.html.SafeUrl.prototype.toString = function() {\n  return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();\n};\ngoog.html.SafeUrl.unwrap = function(safeUrl) {\n  if (safeUrl instanceof goog.html.SafeUrl && safeUrl.constructor === goog.html.SafeUrl) {\n    return safeUrl.privateDoNotAccessOrElseSafeUrlWrappedValue_;\n  } else {\n    goog.asserts.fail(\"expected object of type SafeUrl, got '\" + safeUrl + \"' of type \" + goog.typeOf(safeUrl));\n    return \"type_error:SafeUrl\";\n  }\n};\ngoog.html.SafeUrl.fromConstant = function(url) {\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(url));\n};\ngoog.html.SAFE_MIME_TYPE_PATTERN_ = new RegExp(\"^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|\" + \"font/\\\\w+|\" + \"image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|\" + \"video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))\" + '(?:;\\\\w+\\x3d(?:\\\\w+|\"[\\\\w;,\\x3d ]+\"))*$', \"i\");\ngoog.html.SafeUrl.isSafeMimeType = function(mimeType) {\n  return goog.html.SAFE_MIME_TYPE_PATTERN_.test(mimeType);\n};\ngoog.html.SafeUrl.fromBlob = function(blob) {\n  var url = goog.html.SafeUrl.isSafeMimeType(blob.type) ? goog.fs.url.createObjectUrl(blob) : goog.html.SafeUrl.INNOCUOUS_STRING;\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);\n};\ngoog.html.SafeUrl.revokeObjectUrl = function(safeUrl) {\n  var url = safeUrl.getTypedStringValue();\n  if (url !== goog.html.SafeUrl.INNOCUOUS_STRING) {\n    goog.fs.url.revokeObjectUrl(url);\n  }\n};\ngoog.html.SafeUrl.fromMediaSource = function(mediaSource) {\n  goog.asserts.assert(\"MediaSource\" in goog.global, \"No support for MediaSource\");\n  const url = mediaSource instanceof MediaSource ? goog.fs.url.createObjectUrl(mediaSource) : goog.html.SafeUrl.INNOCUOUS_STRING;\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);\n};\ngoog.html.DATA_URL_PATTERN_ = /^data:(.*);base64,[a-z0-9+\\/]+=*$/i;\ngoog.html.SafeUrl.tryFromDataUrl = function(dataUrl) {\n  dataUrl = String(dataUrl);\n  var filteredDataUrl = dataUrl.replace(/(%0A|%0D)/g, \"\");\n  var match = filteredDataUrl.match(goog.html.DATA_URL_PATTERN_);\n  var valid = match && goog.html.SafeUrl.isSafeMimeType(match[1]);\n  if (valid) {\n    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(filteredDataUrl);\n  }\n  return null;\n};\ngoog.html.SafeUrl.fromDataUrl = function(dataUrl) {\n  return goog.html.SafeUrl.tryFromDataUrl(dataUrl) || goog.html.SafeUrl.INNOCUOUS_URL;\n};\ngoog.html.SafeUrl.fromTelUrl = function(telUrl) {\n  if (!goog.string.internal.caseInsensitiveStartsWith(telUrl, \"tel:\")) {\n    telUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(telUrl);\n};\ngoog.html.SIP_URL_PATTERN_ = new RegExp(\"^sip[s]?:[+a-z0-9_.!$%\\x26'*\\\\/\\x3d^`{|}~-]+@([a-z0-9-]+\\\\.)+[a-z0-9]{2,63}$\", \"i\");\ngoog.html.SafeUrl.fromSipUrl = function(sipUrl) {\n  if (!goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(sipUrl))) {\n    sipUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(sipUrl);\n};\ngoog.html.SafeUrl.fromFacebookMessengerUrl = function(facebookMessengerUrl) {\n  if (!goog.string.internal.caseInsensitiveStartsWith(facebookMessengerUrl, \"fb-messenger://share\")) {\n    facebookMessengerUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(facebookMessengerUrl);\n};\ngoog.html.SafeUrl.fromWhatsAppUrl = function(whatsAppUrl) {\n  if (!goog.string.internal.caseInsensitiveStartsWith(whatsAppUrl, \"whatsapp://send\")) {\n    whatsAppUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(whatsAppUrl);\n};\ngoog.html.SafeUrl.fromSmsUrl = function(smsUrl) {\n  if (!goog.string.internal.caseInsensitiveStartsWith(smsUrl, \"sms:\") || !goog.html.SafeUrl.isSmsUrlBodyValid_(smsUrl)) {\n    smsUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(smsUrl);\n};\ngoog.html.SafeUrl.isSmsUrlBodyValid_ = function(smsUrl) {\n  var hash = smsUrl.indexOf(\"#\");\n  if (hash > 0) {\n    smsUrl = smsUrl.substring(0, hash);\n  }\n  var bodyParams = smsUrl.match(/[?&]body=/gi);\n  if (!bodyParams) {\n    return true;\n  }\n  if (bodyParams.length > 1) {\n    return false;\n  }\n  var bodyValue = smsUrl.match(/[?&]body=([^&]*)/)[1];\n  if (!bodyValue) {\n    return true;\n  }\n  try {\n    decodeURIComponent(bodyValue);\n  } catch (error) {\n    return false;\n  }\n  return /^(?:[a-z0-9\\-_.~]|%[0-9a-f]{2})+$/i.test(bodyValue);\n};\ngoog.html.SafeUrl.fromSshUrl = function(sshUrl) {\n  if (!goog.string.internal.caseInsensitiveStartsWith(sshUrl, \"ssh://\")) {\n    sshUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(sshUrl);\n};\ngoog.html.SafeUrl.sanitizeChromeExtensionUrl = function(url, extensionId) {\n  return goog.html.SafeUrl.sanitizeExtensionUrl_(/^chrome-extension:\\/\\/([^\\/]+)\\//, url, extensionId);\n};\ngoog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function(url, extensionId) {\n  return goog.html.SafeUrl.sanitizeExtensionUrl_(/^moz-extension:\\/\\/([^\\/]+)\\//, url, extensionId);\n};\ngoog.html.SafeUrl.sanitizeEdgeExtensionUrl = function(url, extensionId) {\n  return goog.html.SafeUrl.sanitizeExtensionUrl_(/^ms-browser-extension:\\/\\/([^\\/]+)\\//, url, extensionId);\n};\ngoog.html.SafeUrl.sanitizeExtensionUrl_ = function(scheme, url, extensionId) {\n  var matches = scheme.exec(url);\n  if (!matches) {\n    url = goog.html.SafeUrl.INNOCUOUS_STRING;\n  } else {\n    var extractedExtensionId = matches[1];\n    var acceptedExtensionIds;\n    if (extensionId instanceof goog.string.Const) {\n      acceptedExtensionIds = [goog.string.Const.unwrap(extensionId)];\n    } else {\n      acceptedExtensionIds = extensionId.map(function unwrap(x) {\n        return goog.string.Const.unwrap(x);\n      });\n    }\n    if (acceptedExtensionIds.indexOf(extractedExtensionId) == -1) {\n      url = goog.html.SafeUrl.INNOCUOUS_STRING;\n    }\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);\n};\ngoog.html.SafeUrl.fromTrustedResourceUrl = function(trustedResourceUrl) {\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(trustedResourceUrl));\n};\ngoog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;\ngoog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_;\ngoog.html.SafeUrl.trySanitize = function(url) {\n  if (url instanceof goog.html.SafeUrl) {\n    return url;\n  }\n  if (typeof url == \"object\" && url.implementsGoogStringTypedString) {\n    url = url.getTypedStringValue();\n  } else {\n    url = String(url);\n  }\n  if (!goog.html.SAFE_URL_PATTERN_.test(url)) {\n    return goog.html.SafeUrl.tryFromDataUrl(url);\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);\n};\ngoog.html.SafeUrl.sanitize = function(url) {\n  return goog.html.SafeUrl.trySanitize(url) || goog.html.SafeUrl.INNOCUOUS_URL;\n};\ngoog.html.SafeUrl.sanitizeAssertUnchanged = function(url, opt_allowDataUrl) {\n  if (url instanceof goog.html.SafeUrl) {\n    return url;\n  } else if (typeof url == \"object\" && url.implementsGoogStringTypedString) {\n    url = url.getTypedStringValue();\n  } else {\n    url = String(url);\n  }\n  if (opt_allowDataUrl && /^data:/i.test(url)) {\n    var safeUrl = goog.html.SafeUrl.fromDataUrl(url);\n    if (safeUrl.getTypedStringValue() == url) {\n      return safeUrl;\n    }\n  }\n  if (!goog.asserts.assert(goog.html.SAFE_URL_PATTERN_.test(url), \"%s does not match the safe URL pattern\", url)) {\n    url = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);\n};\ngoog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};\ngoog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(url) {\n  return new goog.html.SafeUrl(url, goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_);\n};\ngoog.html.SafeUrl.INNOCUOUS_URL = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.SafeUrl.INNOCUOUS_STRING);\ngoog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\"about:blank\");\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview The SafeUrl type and its builders.\n *\n * TODO(xtof): Link to document stating type contract.\n */\n\ngoog.provide('goog.html.SafeUrl');\n\ngoog.require('goog.asserts');\ngoog.require('goog.fs.url');\ngoog.require('goog.html.TrustedResourceUrl');\ngoog.require('goog.i18n.bidi.Dir');\ngoog.require('goog.i18n.bidi.DirectionalString');\ngoog.require('goog.string.Const');\ngoog.require('goog.string.TypedString');\ngoog.require('goog.string.internal');\n\n\n\n/**\n * A string that is safe to use in URL context in DOM APIs and HTML documents.\n *\n * A SafeUrl is a string-like object that carries the security type contract\n * that its value as a string will not cause untrusted script execution\n * when evaluated as a hyperlink URL in a browser.\n *\n * Values of this type are guaranteed to be safe to use in URL/hyperlink\n * contexts, such as assignment to URL-valued DOM properties, in the sense that\n * the use will not result in a Cross-Site-Scripting vulnerability. Similarly,\n * SafeUrls can be interpolated into the URL context of an HTML template (e.g.,\n * inside a href attribute). However, appropriate HTML-escaping must still be\n * applied.\n *\n * Note that, as documented in `goog.html.SafeUrl.unwrap`, this type's\n * contract does not guarantee that instances are safe to interpolate into HTML\n * without appropriate escaping.\n *\n * Note also that this type's contract does not imply any guarantees regarding\n * the resource the URL refers to.  In particular, SafeUrls are <b>not</b>\n * safe to use in a context where the referred-to resource is interpreted as\n * trusted code, e.g., as the src of a script tag.\n *\n * Instances of this type must be created via the factory methods\n * (`goog.html.SafeUrl.fromConstant`, `goog.html.SafeUrl.sanitize`),\n * etc and not by invoking its constructor. The constructor intentionally takes\n * an extra parameter that cannot be constructed outside of this file and the\n * type is immutable; hence only a default instance corresponding to the empty\n * string can be obtained via constructor invocation.\n *\n * @see goog.html.SafeUrl#fromConstant\n * @see goog.html.SafeUrl#from\n * @see goog.html.SafeUrl#sanitize\n * @final\n * @struct\n * @implements {goog.i18n.bidi.DirectionalString}\n * @implements {goog.string.TypedString}\n */\ngoog.html.SafeUrl = class {\n  /**\n   * @param {string} value\n   * @param {!Object} token package-internal implementation detail.\n   */\n  constructor(value, token) {\n    /**\n     * The contained value of this SafeUrl.  The field has a purposely ugly\n     * name to make (non-compiled) code that attempts to directly access this\n     * field stand out.\n     * @private {string}\n     */\n    this.privateDoNotAccessOrElseSafeUrlWrappedValue_ =\n        (token === goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_) ? value : '';\n  };\n};\n\n\n/**\n * The innocuous string generated by goog.html.SafeUrl.sanitize when passed\n * an unsafe URL.\n *\n * about:invalid is registered in\n * http://www.w3.org/TR/css3-values/#about-invalid.\n * http://tools.ietf.org/html/rfc6694#section-2.2.1 permits about URLs to\n * contain a fragment, which is not to be considered when determining if an\n * about URL is well-known.\n *\n * Using about:invalid seems preferable to using a fixed data URL, since\n * browsers might choose to not report CSP violations on it, as legitimate\n * CSS function calls to attr() can result in this URL being produced. It is\n * also a standard URL which matches exactly the semantics we need:\n * \"The about:invalid URI references a non-existent document with a generic\n * error condition. It can be used when a URI is necessary, but the default\n * value shouldn't be resolveable as any type of document\".\n *\n * @const {string}\n */\ngoog.html.SafeUrl.INNOCUOUS_STRING = 'about:invalid#zClosurez';\n\n\n/**\n * @override\n * @const\n */\ngoog.html.SafeUrl.prototype.implementsGoogStringTypedString = true;\n\n\n/**\n * Returns this SafeUrl's value as a string.\n *\n * IMPORTANT: In code where it is security relevant that an object's type is\n * indeed `SafeUrl`, use `goog.html.SafeUrl.unwrap` instead of this\n * method. If in doubt, assume that it's security relevant. In particular, note\n * that goog.html functions which return a goog.html type do not guarantee that\n * the returned instance is of the right type.\n *\n * IMPORTANT: The guarantees of the SafeUrl type contract only extend to the\n * behavior of browsers when interpreting URLs. Values of SafeUrl objects MUST\n * be appropriately escaped before embedding in a HTML document. Note that the\n * required escaping is context-sensitive (e.g. a different escaping is\n * required for embedding a URL in a style property within a style\n * attribute, as opposed to embedding in a href attribute).\n *\n * @see goog.html.SafeUrl#unwrap\n * @override\n */\ngoog.html.SafeUrl.prototype.getTypedStringValue = function() {\n  'use strict';\n  return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();\n};\n\n\n/**\n * @override\n * @const {boolean}\n */\ngoog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = true;\n\n\n/**\n * Returns this URLs directionality, which is always `LTR`.\n * @override\n * @return {!goog.i18n.bidi.Dir}\n */\ngoog.html.SafeUrl.prototype.getDirection = function() {\n  'use strict';\n  return goog.i18n.bidi.Dir.LTR;\n};\n\n\n/**\n * Returns a string-representation of this value.\n *\n * To obtain the actual string value wrapped in a SafeUrl, use\n * `goog.html.SafeUrl.unwrap`.\n *\n * @return {string}\n * @see goog.html.SafeUrl#unwrap\n * @override\n */\ngoog.html.SafeUrl.prototype.toString = function() {\n  'use strict';\n  return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();\n};\n\n\n\n/**\n * Performs a runtime check that the provided object is indeed a SafeUrl\n * object, and returns its value.\n *\n * IMPORTANT: The guarantees of the SafeUrl type contract only extend to the\n * behavior of  browsers when interpreting URLs. Values of SafeUrl objects MUST\n * be appropriately escaped before embedding in a HTML document. Note that the\n * required escaping is context-sensitive (e.g. a different escaping is\n * required for embedding a URL in a style property within a style\n * attribute, as opposed to embedding in a href attribute).\n *\n * @param {!goog.html.SafeUrl} safeUrl The object to extract from.\n * @return {string} The SafeUrl object's contained string, unless the run-time\n *     type check fails. In that case, `unwrap` returns an innocuous\n *     string, or, if assertions are enabled, throws\n *     `goog.asserts.AssertionError`.\n */\ngoog.html.SafeUrl.unwrap = function(safeUrl) {\n  'use strict';\n  // Perform additional Run-time type-checking to ensure that safeUrl is indeed\n  // an instance of the expected type.  This provides some additional protection\n  // against security bugs due to application code that disables type checks.\n  // Specifically, the following checks are performed:\n  // 1. The object is an instance of the expected type.\n  // 2. The object is not an instance of a subclass.\n  if (safeUrl instanceof goog.html.SafeUrl &&\n      safeUrl.constructor === goog.html.SafeUrl) {\n    return safeUrl.privateDoNotAccessOrElseSafeUrlWrappedValue_;\n  } else {\n    goog.asserts.fail('expected object of type SafeUrl, got \\'' +\n        safeUrl + '\\' of type ' + goog.typeOf(safeUrl));\n    return 'type_error:SafeUrl';\n  }\n};\n\n\n/**\n * Creates a SafeUrl object from a compile-time constant string.\n *\n * Compile-time constant strings are inherently program-controlled and hence\n * trusted.\n *\n * @param {!goog.string.Const} url A compile-time-constant string from which to\n *         create a SafeUrl.\n * @return {!goog.html.SafeUrl} A SafeUrl object initialized to `url`.\n */\ngoog.html.SafeUrl.fromConstant = function(url) {\n  'use strict';\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n      goog.string.Const.unwrap(url));\n};\n\n\n/**\n * A pattern that matches Blob or data types that can have SafeUrls created\n * from URL.createObjectURL(blob) or via a data: URI.\n *\n * This has some parameter support (most notably, we haven't implemented the\n * more complex parts like %-encoded characters or non-alphanumerical ones for\n * simplicity's sake). The specs are fairly complex, and they don't\n * always match Chrome's behavior: we settled on a subset where we're confident\n * all parties involved agree.\n *\n * The spec is available at https://mimesniff.spec.whatwg.org/ (and see\n * https://tools.ietf.org/html/rfc2397 for data: urls, which override some of\n * it).\n * @const\n * @private\n */\ngoog.html.SAFE_MIME_TYPE_PATTERN_ = new RegExp(\n    // Note: Due to content-sniffing concerns, only add MIME types for\n    // media formats.\n    '^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|' +\n        'font/\\\\w+|' +\n        'image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|' +\n        'video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))' +\n        '(?:;\\\\w+=(?:\\\\w+|\"[\\\\w;,= ]+\"))*$',  // MIME type parameters\n    'i');\n\n\n/**\n * @param {string} mimeType The MIME type to check if safe.\n * @return {boolean} True if the MIME type is safe and creating a Blob via\n *   `SafeUrl.fromBlob()` with that type will not fail due to the type. False\n *   otherwise.\n */\ngoog.html.SafeUrl.isSafeMimeType = function(mimeType) {\n  'use strict';\n  return goog.html.SAFE_MIME_TYPE_PATTERN_.test(mimeType);\n};\n\n\n/**\n * Creates a SafeUrl wrapping a blob URL for the given `blob`.\n *\n * The blob URL is created with `URL.createObjectURL`. If the MIME type\n * for `blob` is not of a known safe audio, image or video MIME type,\n * then the SafeUrl will wrap {@link #INNOCUOUS_STRING}.\n *\n * Note: Call {@link revokeObjectUrl} on the URL after it's used\n * to prevent memory leaks.\n *\n * @see http://www.w3.org/TR/FileAPI/#url\n * @param {!Blob} blob\n * @return {!goog.html.SafeUrl} The blob URL, or an innocuous string wrapped\n *   as a SafeUrl.\n */\ngoog.html.SafeUrl.fromBlob = function(blob) {\n  'use strict';\n  var url = goog.html.SafeUrl.isSafeMimeType(blob.type) ?\n      goog.fs.url.createObjectUrl(blob) :\n      goog.html.SafeUrl.INNOCUOUS_STRING;\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);\n};\n\n\n/**\n * Revokes an object URL created for a safe URL created {@link fromBlob()}.\n * @param {!goog.html.SafeUrl} safeUrl SafeUrl wrapping a blob object.\n * @return {void}\n */\ngoog.html.SafeUrl.revokeObjectUrl = function(safeUrl) {\n  'use strict';\n  var url = safeUrl.getTypedStringValue();\n  if (url !== goog.html.SafeUrl.INNOCUOUS_STRING) {\n    goog.fs.url.revokeObjectUrl(url);\n  }\n};\n\n\n/**\n * Creates a SafeUrl wrapping a blob URL created for a MediaSource.\n * @param {!MediaSource} mediaSource\n * @return {!goog.html.SafeUrl} The blob URL.\n */\ngoog.html.SafeUrl.fromMediaSource = function(mediaSource) {\n  'use strict';\n  goog.asserts.assert(\n      'MediaSource' in goog.global, 'No support for MediaSource');\n  const url = mediaSource instanceof MediaSource ?\n      goog.fs.url.createObjectUrl(mediaSource) :\n      goog.html.SafeUrl.INNOCUOUS_STRING;\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);\n};\n\n\n/**\n * Matches a base-64 data URL, with the first match group being the MIME type.\n * @const\n * @private\n */\ngoog.html.DATA_URL_PATTERN_ = /^data:(.*);base64,[a-z0-9+\\/]+=*$/i;\n\n\n/**\n * Attempts to create a SafeUrl wrapping a `data:` URL, after validating it\n * matches a known-safe media MIME type. If it doesn't match, return `null`.\n *\n * @param {string} dataUrl A valid base64 data URL with one of the whitelisted\n *     media MIME types.\n * @return {?goog.html.SafeUrl} A matching safe URL, or `null` if it does not\n *     pass.\n */\ngoog.html.SafeUrl.tryFromDataUrl = function(dataUrl) {\n  'use strict';\n  // For defensive purposes, in case users cast around the parameter type.\n  dataUrl = String(dataUrl);\n  // RFC4648 suggest to ignore CRLF in base64 encoding.\n  // See https://tools.ietf.org/html/rfc4648.\n  // Remove the CR (%0D) and LF (%0A) from the dataUrl.\n  var filteredDataUrl = dataUrl.replace(/(%0A|%0D)/g, '');\n  var match = filteredDataUrl.match(goog.html.DATA_URL_PATTERN_);\n  // Note: The only risk of XSS here is if the `data:` URL results in a\n  // same-origin document. In which case content-sniffing might cause the\n  // browser to interpret the contents as html.\n  // All modern browsers consider `data:` URL documents to have unique empty\n  // origins. Only Firefox for versions prior to v57 behaves differently:\n  // https://blog.mozilla.org/security/2017/10/04/treating-data-urls-unique-origins-firefox-57/\n  // Older versions of IE don't understand `data:` urls, so it is not an issue.\n  var valid = match && goog.html.SafeUrl.isSafeMimeType(match[1]);\n  if (valid) {\n    return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n        filteredDataUrl);\n  }\n  return null;\n};\n\n\n/**\n * Creates a SafeUrl wrapping a `data:` URL, after validating it matches a\n * known-safe media MIME type. If it doesn't match, return\n * `goog.html.SafeUrl.INNOCUOUS_URL`.\n *\n * @param {string} dataUrl A valid base64 data URL with one of the whitelisted\n *     media MIME types.\n * @return {!goog.html.SafeUrl} A matching safe URL, or\n *     `goog.html.SafeUrl.INNOCUOUS_URL` if it does not pass.\n */\ngoog.html.SafeUrl.fromDataUrl = function(dataUrl) {\n  'use strict';\n  return goog.html.SafeUrl.tryFromDataUrl(dataUrl) ||\n      goog.html.SafeUrl.INNOCUOUS_URL;\n};\n\n\n/**\n * Creates a SafeUrl wrapping a tel: URL.\n *\n * @param {string} telUrl A tel URL.\n * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}\n *     wrapped as a SafeUrl if it does not pass.\n */\ngoog.html.SafeUrl.fromTelUrl = function(telUrl) {\n  'use strict';\n  // There's a risk that a tel: URL could immediately place a call once\n  // clicked, without requiring user confirmation. For that reason it is\n  // handled in this separate function.\n  if (!goog.string.internal.caseInsensitiveStartsWith(telUrl, 'tel:')) {\n    telUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n      telUrl);\n};\n\n\n/**\n * Matches a sip/sips URL. We only allow urls that consist of an email address.\n * The characters '?' and '#' are not allowed in the local part of the email\n * address.\n * @const\n * @private\n */\ngoog.html.SIP_URL_PATTERN_ = new RegExp(\n    '^sip[s]?:[+a-z0-9_.!$%&\\'*\\\\/=^`{|}~-]+@([a-z0-9-]+\\\\.)+[a-z0-9]{2,63}$',\n    'i');\n\n\n/**\n * Creates a SafeUrl wrapping a sip: URL. We only allow urls that consist of an\n * email address. The characters '?' and '#' are not allowed in the local part\n * of the email address.\n *\n * @param {string} sipUrl A sip URL.\n * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}\n *     wrapped as a SafeUrl if it does not pass.\n */\ngoog.html.SafeUrl.fromSipUrl = function(sipUrl) {\n  'use strict';\n  if (!goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(sipUrl))) {\n    sipUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n      sipUrl);\n};\n\n\n/**\n * Creates a SafeUrl wrapping a fb-messenger://share URL.\n *\n * @param {string} facebookMessengerUrl A facebook messenger URL.\n * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}\n *     wrapped as a SafeUrl if it does not pass.\n */\ngoog.html.SafeUrl.fromFacebookMessengerUrl = function(facebookMessengerUrl) {\n  'use strict';\n  if (!goog.string.internal.caseInsensitiveStartsWith(\n          facebookMessengerUrl, 'fb-messenger://share')) {\n    facebookMessengerUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n      facebookMessengerUrl);\n};\n\n/**\n * Creates a SafeUrl wrapping a whatsapp://send URL.\n *\n * @param {string} whatsAppUrl A WhatsApp URL.\n * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}\n *     wrapped as a SafeUrl if it does not pass.\n */\ngoog.html.SafeUrl.fromWhatsAppUrl = function(whatsAppUrl) {\n  'use strict';\n  if (!goog.string.internal.caseInsensitiveStartsWith(\n          whatsAppUrl, 'whatsapp://send')) {\n    whatsAppUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n      whatsAppUrl);\n};\n\n/**\n * Creates a SafeUrl wrapping a sms: URL.\n *\n * @param {string} smsUrl A sms URL.\n * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}\n *     wrapped as a SafeUrl if it does not pass.\n */\ngoog.html.SafeUrl.fromSmsUrl = function(smsUrl) {\n  'use strict';\n  if (!goog.string.internal.caseInsensitiveStartsWith(smsUrl, 'sms:') ||\n      !goog.html.SafeUrl.isSmsUrlBodyValid_(smsUrl)) {\n    smsUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n      smsUrl);\n};\n\n\n/**\n * Validates SMS URL `body` parameter, which is optional and should appear at\n * most once and should be percent-encoded if present. Rejects many malformed\n * bodies, but may spuriously reject some URLs and does not reject all malformed\n * sms: URLs.\n *\n * @param {string} smsUrl A sms URL.\n * @return {boolean} Whether SMS URL has a valid `body` parameter if it exists.\n * @private\n */\ngoog.html.SafeUrl.isSmsUrlBodyValid_ = function(smsUrl) {\n  'use strict';\n  var hash = smsUrl.indexOf('#');\n  if (hash > 0) {\n    smsUrl = smsUrl.substring(0, hash);\n  }\n  var bodyParams = smsUrl.match(/[?&]body=/gi);\n  // \"body\" param is optional\n  if (!bodyParams) {\n    return true;\n  }\n  // \"body\" MUST only appear once\n  if (bodyParams.length > 1) {\n    return false;\n  }\n  // Get the encoded `body` parameter value.\n  var bodyValue = smsUrl.match(/[?&]body=([^&]*)/)[1];\n  if (!bodyValue) {\n    return true;\n  }\n  try {\n    decodeURIComponent(bodyValue);\n  } catch (error) {\n    return false;\n  }\n  return /^(?:[a-z0-9\\-_.~]|%[0-9a-f]{2})+$/i.test(bodyValue);\n};\n\n\n/**\n * Creates a SafeUrl wrapping a ssh: URL.\n *\n * @param {string} sshUrl A ssh URL.\n * @return {!goog.html.SafeUrl} A matching safe URL, or {@link INNOCUOUS_STRING}\n *     wrapped as a SafeUrl if it does not pass.\n */\ngoog.html.SafeUrl.fromSshUrl = function(sshUrl) {\n  'use strict';\n  if (!goog.string.internal.caseInsensitiveStartsWith(sshUrl, 'ssh://')) {\n    sshUrl = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n      sshUrl);\n};\n\n/**\n * Sanitizes a Chrome extension URL to SafeUrl, given a compile-time-constant\n * extension identifier. Can also be restricted to chrome extensions.\n *\n * @param {string} url The url to sanitize. Should start with the extension\n *     scheme and the extension identifier.\n * @param {!goog.string.Const|!Array<!goog.string.Const>} extensionId The\n *     extension id to accept, as a compile-time constant or an array of those.\n *\n * @return {!goog.html.SafeUrl} Either `url` if it's deemed safe, or\n *     `INNOCUOUS_STRING` if it's not.\n */\ngoog.html.SafeUrl.sanitizeChromeExtensionUrl = function(url, extensionId) {\n  'use strict';\n  return goog.html.SafeUrl.sanitizeExtensionUrl_(\n      /^chrome-extension:\\/\\/([^\\/]+)\\//, url, extensionId);\n};\n\n/**\n * Sanitizes a Firefox extension URL to SafeUrl, given a compile-time-constant\n * extension identifier. Can also be restricted to chrome extensions.\n *\n * @param {string} url The url to sanitize. Should start with the extension\n *     scheme and the extension identifier.\n * @param {!goog.string.Const|!Array<!goog.string.Const>} extensionId The\n *     extension id to accept, as a compile-time constant or an array of those.\n *\n * @return {!goog.html.SafeUrl} Either `url` if it's deemed safe, or\n *     `INNOCUOUS_STRING` if it's not.\n */\ngoog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function(url, extensionId) {\n  'use strict';\n  return goog.html.SafeUrl.sanitizeExtensionUrl_(\n      /^moz-extension:\\/\\/([^\\/]+)\\//, url, extensionId);\n};\n\n/**\n * Sanitizes a Edge extension URL to SafeUrl, given a compile-time-constant\n * extension identifier. Can also be restricted to chrome extensions.\n *\n * @param {string} url The url to sanitize. Should start with the extension\n *     scheme and the extension identifier.\n * @param {!goog.string.Const|!Array<!goog.string.Const>} extensionId The\n *     extension id to accept, as a compile-time constant or an array of those.\n *\n * @return {!goog.html.SafeUrl} Either `url` if it's deemed safe, or\n *     `INNOCUOUS_STRING` if it's not.\n */\ngoog.html.SafeUrl.sanitizeEdgeExtensionUrl = function(url, extensionId) {\n  'use strict';\n  return goog.html.SafeUrl.sanitizeExtensionUrl_(\n      /^ms-browser-extension:\\/\\/([^\\/]+)\\//, url, extensionId);\n};\n\n/**\n * Private helper for converting extension URLs to SafeUrl, given the scheme for\n * that particular extension type. Use the sanitizeFirefoxExtensionUrl,\n * sanitizeChromeExtensionUrl or sanitizeEdgeExtensionUrl unless you're building\n * new helpers.\n *\n * @private\n * @param {!RegExp} scheme The scheme to accept as a RegExp extracting the\n *     extension identifier.\n * @param {string} url The url to sanitize. Should start with the extension\n *     scheme and the extension identifier.\n * @param {!goog.string.Const|!Array<!goog.string.Const>} extensionId The\n *     extension id to accept, as a compile-time constant or an array of those.\n *\n * @return {!goog.html.SafeUrl} Either `url` if it's deemed safe, or\n *     `INNOCUOUS_STRING` if it's not.\n */\ngoog.html.SafeUrl.sanitizeExtensionUrl_ = function(scheme, url, extensionId) {\n  'use strict';\n  var matches = scheme.exec(url);\n  if (!matches) {\n    url = goog.html.SafeUrl.INNOCUOUS_STRING;\n  } else {\n    var extractedExtensionId = matches[1];\n    var acceptedExtensionIds;\n    if (extensionId instanceof goog.string.Const) {\n      acceptedExtensionIds = [goog.string.Const.unwrap(extensionId)];\n    } else {\n      acceptedExtensionIds = extensionId.map(function unwrap(x) {\n        'use strict';\n        return goog.string.Const.unwrap(x);\n      });\n    }\n    if (acceptedExtensionIds.indexOf(extractedExtensionId) == -1) {\n      url = goog.html.SafeUrl.INNOCUOUS_STRING;\n    }\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);\n};\n\n\n/**\n * Creates a SafeUrl from TrustedResourceUrl. This is safe because\n * TrustedResourceUrl is more tightly restricted than SafeUrl.\n *\n * @param {!goog.html.TrustedResourceUrl} trustedResourceUrl\n * @return {!goog.html.SafeUrl}\n */\ngoog.html.SafeUrl.fromTrustedResourceUrl = function(trustedResourceUrl) {\n  'use strict';\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n      goog.html.TrustedResourceUrl.unwrap(trustedResourceUrl));\n};\n\n\n/**\n * A pattern that recognizes a commonly useful subset of URLs that satisfy\n * the SafeUrl contract.\n *\n * This regular expression matches a subset of URLs that will not cause script\n * execution if used in URL context within a HTML document. Specifically, this\n * regular expression matches if (comment from here on and regex copied from\n * Soy's EscapingConventions):\n * (1) Either a protocol in a whitelist (http, https, mailto or ftp).\n * (2) or no protocol.  A protocol must be followed by a colon. The below\n *     allows that by allowing colons only after one of the characters [/?#].\n *     A colon after a hash (#) must be in the fragment.\n *     Otherwise, a colon after a (?) must be in a query.\n *     Otherwise, a colon after a single solidus (/) must be in a path.\n *     Otherwise, a colon after a double solidus (//) must be in the authority\n *     (before port).\n *\n * @private\n * @const {!RegExp}\n */\ngoog.html.SAFE_URL_PATTERN_ =\n    /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;\n\n/**\n * Public version of goog.html.SAFE_URL_PATTERN_. Updating\n * goog.html.SAFE_URL_PATTERN_ doesn't seem to be backward compatible.\n * Namespace is also changed to goog.html.SafeUrl so it can be imported using\n * goog.require('goog.dom.SafeUrl').\n *\n * TODO(bangert): Remove SAFE_URL_PATTERN_\n * @const {!RegExp}\n */\ngoog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_;\n\n/**\n * Attempts to create a SafeUrl object from `url`. The input string is validated\n * to match a pattern of commonly used safe URLs. If validation fails, `null` is\n * returned.\n *\n * `url` may be a URL with the `http:`, `https:`, `mailto:`, `ftp:` or `data`\n * scheme, or a relative URL (i.e., a URL without a scheme; specifically, a\n * scheme-relative, absolute-path-relative, or path-relative URL).\n *\n * @see http://url.spec.whatwg.org/#concept-relative-url\n * @param {string|!goog.string.TypedString} url The URL to validate.\n * @return {?goog.html.SafeUrl} The validated URL, wrapped as a SafeUrl, or null\n *     if validation fails.\n */\ngoog.html.SafeUrl.trySanitize = function(url) {\n  'use strict';\n  if (url instanceof goog.html.SafeUrl) {\n    return url;\n  }\n  if (typeof url == 'object' && url.implementsGoogStringTypedString) {\n    url = /** @type {!goog.string.TypedString} */ (url).getTypedStringValue();\n  } else {\n    // For defensive purposes, in case users cast around the parameter type.\n    url = String(url);\n  }\n  if (!goog.html.SAFE_URL_PATTERN_.test(url)) {\n    return goog.html.SafeUrl.tryFromDataUrl(url);\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);\n};\n\n/**\n * Creates a SafeUrl object from `url`. If `url` is a\n * `goog.html.SafeUrl` then it is simply returned. Otherwise the input string is\n * validated to match a pattern of commonly used safe URLs. If validation fails,\n * `goog.html.SafeUrl.INNOCUOUS_URL` is returned.\n *\n * `url` may be a URL with the `http:`, `https:`, `mailto:`, `ftp:` or `data`\n * scheme, or a relative URL (i.e., a URL without a scheme; specifically, a\n * scheme-relative, absolute-path-relative, or path-relative URL).\n *\n * @see http://url.spec.whatwg.org/#concept-relative-url\n * @param {string|!goog.string.TypedString} url The URL to validate.\n * @return {!goog.html.SafeUrl} The validated URL, wrapped as a SafeUrl.\n */\ngoog.html.SafeUrl.sanitize = function(url) {\n  'use strict';\n  return goog.html.SafeUrl.trySanitize(url) || goog.html.SafeUrl.INNOCUOUS_URL;\n};\n\n/**\n * Creates a SafeUrl object from `url`. If `url` is a\n * `goog.html.SafeUrl` then it is simply returned. Otherwise the input string is\n * validated to match a pattern of commonly used safe URLs.\n *\n * `url` may be a URL with the http, https, mailto or ftp scheme,\n * or a relative URL (i.e., a URL without a scheme; specifically, a\n * scheme-relative, absolute-path-relative, or path-relative URL).\n *\n * This function asserts (using goog.asserts) that the URL matches this pattern.\n * If it does not, in addition to failing the assert, an innocuous URL will be\n * returned.\n *\n * @see http://url.spec.whatwg.org/#concept-relative-url\n * @param {string|!goog.string.TypedString} url The URL to validate.\n * @param {boolean=} opt_allowDataUrl Whether to allow valid data: URLs.\n * @return {!goog.html.SafeUrl} The validated URL, wrapped as a SafeUrl.\n */\ngoog.html.SafeUrl.sanitizeAssertUnchanged = function(url, opt_allowDataUrl) {\n  'use strict';\n  if (url instanceof goog.html.SafeUrl) {\n    return url;\n  } else if (typeof url == 'object' && url.implementsGoogStringTypedString) {\n    url = /** @type {!goog.string.TypedString} */ (url).getTypedStringValue();\n  } else {\n    url = String(url);\n  }\n  if (opt_allowDataUrl && /^data:/i.test(url)) {\n    var safeUrl = goog.html.SafeUrl.fromDataUrl(url);\n    if (safeUrl.getTypedStringValue() == url) {\n      return safeUrl;\n    }\n  }\n  if (!goog.asserts.assert(\n          goog.html.SAFE_URL_PATTERN_.test(url),\n          '%s does not match the safe URL pattern', url)) {\n    url = goog.html.SafeUrl.INNOCUOUS_STRING;\n  }\n  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(url);\n};\n\n/**\n * Token used to ensure that object is created only from this file. No code\n * outside of this file can access this token.\n * @private {!Object}\n * @const\n */\ngoog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};\n\n/**\n * Package-internal utility method to create SafeUrl instances.\n *\n * @param {string} url The string to initialize the SafeUrl object with.\n * @return {!goog.html.SafeUrl} The initialized SafeUrl object.\n * @package\n */\ngoog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(\n    url) {\n  'use strict';\n  return new goog.html.SafeUrl(\n      url, goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_);\n};\n\n\n/**\n * `INNOCUOUS_STRING` wrapped in a `SafeUrl`.\n * @const {!goog.html.SafeUrl}\n */\ngoog.html.SafeUrl.INNOCUOUS_URL =\n    goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n        goog.html.SafeUrl.INNOCUOUS_STRING);\n\n\n/**\n * A SafeUrl corresponding to the special about:blank url.\n * @const {!goog.html.SafeUrl}\n */\ngoog.html.SafeUrl.ABOUT_BLANK =\n    goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(\n        'about:blank');\n","~:compiled-at",1669622728327,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.html.safeurl.js\",\n\"lineCount\":1,\n\"mappings\":\";\",\n\"sources\":[],\n\"names\":[]\n}\n"]