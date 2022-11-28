["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/dom/vendor.js"],"~:js","goog.provide(\"goog.dom.vendor\");\ngoog.require(\"goog.string\");\ngoog.require(\"goog.userAgent\");\ngoog.dom.vendor.getVendorJsPrefix = function() {\n  if (goog.userAgent.WEBKIT) {\n    return \"Webkit\";\n  } else if (goog.userAgent.GECKO) {\n    return \"Moz\";\n  } else if (goog.userAgent.IE) {\n    return \"ms\";\n  }\n  return null;\n};\ngoog.dom.vendor.getVendorPrefix = function() {\n  if (goog.userAgent.WEBKIT) {\n    return \"-webkit\";\n  } else if (goog.userAgent.GECKO) {\n    return \"-moz\";\n  } else if (goog.userAgent.IE) {\n    return \"-ms\";\n  }\n  return null;\n};\ngoog.dom.vendor.getPrefixedPropertyName = function(propertyName, opt_object) {\n  if (opt_object && propertyName in opt_object) {\n    return propertyName;\n  }\n  var prefix = goog.dom.vendor.getVendorJsPrefix();\n  if (prefix) {\n    prefix = prefix.toLowerCase();\n    var prefixedPropertyName = prefix + goog.string.toTitleCase(propertyName);\n    return opt_object === undefined || prefixedPropertyName in opt_object ? prefixedPropertyName : null;\n  }\n  return null;\n};\ngoog.dom.vendor.getPrefixedEventType = function(eventType) {\n  var prefix = goog.dom.vendor.getVendorJsPrefix() || \"\";\n  return (prefix + eventType).toLowerCase();\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Vendor prefix getters.\n */\n\ngoog.provide('goog.dom.vendor');\n\ngoog.require('goog.string');\ngoog.require('goog.userAgent');\n\n\n/**\n * Returns the JS vendor prefix used in CSS properties. Different vendors\n * use different methods of changing the case of the property names.\n *\n * @return {?string} The JS vendor prefix or null if there is none.\n */\ngoog.dom.vendor.getVendorJsPrefix = function() {\n  'use strict';\n  if (goog.userAgent.WEBKIT) {\n    return 'Webkit';\n  } else if (goog.userAgent.GECKO) {\n    return 'Moz';\n  } else if (goog.userAgent.IE) {\n    return 'ms';\n  }\n\n  return null;\n};\n\n\n/**\n * Returns the vendor prefix used in CSS properties.\n *\n * @return {?string} The vendor prefix or null if there is none.\n */\ngoog.dom.vendor.getVendorPrefix = function() {\n  'use strict';\n  if (goog.userAgent.WEBKIT) {\n    return '-webkit';\n  } else if (goog.userAgent.GECKO) {\n    return '-moz';\n  } else if (goog.userAgent.IE) {\n    return '-ms';\n  }\n\n  return null;\n};\n\n\n/**\n * @param {string} propertyName A property name.\n * @param {!Object=} opt_object If provided, we verify if the property exists in\n *     the object.\n * @return {?string} A vendor prefixed property name, or null if it does not\n *     exist.\n */\ngoog.dom.vendor.getPrefixedPropertyName = function(propertyName, opt_object) {\n  'use strict';\n  // We first check for a non-prefixed property, if available.\n  if (opt_object && propertyName in opt_object) {\n    return propertyName;\n  }\n  var prefix = goog.dom.vendor.getVendorJsPrefix();\n  if (prefix) {\n    prefix = prefix.toLowerCase();\n    var prefixedPropertyName = prefix + goog.string.toTitleCase(propertyName);\n    return (opt_object === undefined || prefixedPropertyName in opt_object) ?\n        prefixedPropertyName :\n        null;\n  }\n  return null;\n};\n\n\n/**\n * @param {string} eventType An event type.\n * @return {string} A lower-cased vendor prefixed event type.\n */\ngoog.dom.vendor.getPrefixedEventType = function(eventType) {\n  'use strict';\n  var prefix = goog.dom.vendor.getVendorJsPrefix() || '';\n  return (prefix + eventType).toLowerCase();\n};\n","~:compiled-at",1669622728389,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.dom.vendor.js\",\n\"lineCount\":1,\n\"mappings\":\";\",\n\"sources\":[],\n\"names\":[]\n}\n"]