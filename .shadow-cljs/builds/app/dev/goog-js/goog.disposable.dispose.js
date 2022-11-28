["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/disposable/dispose.js"],"~:js","goog.loadModule(function(exports) {\n  \"use strict\";\n  goog.module(\"goog.dispose\");\n  goog.module.declareLegacyNamespace();\n  function dispose(obj) {\n    if (obj && typeof obj.dispose == \"function\") {\n      obj.dispose();\n    }\n  }\n  exports = dispose;\n  return exports;\n});\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview The dispose method is used to clean up references and\n * resources.\n */\n\ngoog.module('goog.dispose');\ngoog.module.declareLegacyNamespace();\n\n/**\n * Calls `dispose` on the argument if it supports it. If obj is not an\n *     object with a dispose() method, this is a no-op.\n * @param {*} obj The object to dispose of.\n */\nfunction dispose(obj) {\n  if (obj && typeof obj.dispose == 'function') {\n    obj.dispose();\n  }\n}\nexports = dispose;\n","~:compiled-at",1669622728392,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.disposable.dispose.js\",\n\"lineCount\":1,\n\"mappings\":\";\",\n\"sources\":[],\n\"names\":[]\n}\n"]