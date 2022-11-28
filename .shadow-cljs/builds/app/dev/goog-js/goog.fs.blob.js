["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/fs/blob.js"],"~:js","goog.provide(\"goog.fs.blob\");\ngoog.fs.blob.getBlob = function(var_args) {\n  const BlobBuilder = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;\n  if (BlobBuilder !== undefined) {\n    const bb = new BlobBuilder();\n    for (let i = 0; i < arguments.length; i++) {\n      bb.append(arguments[i]);\n    }\n    return bb.getBlob();\n  } else {\n    return goog.fs.blob.getBlobWithProperties(Array.prototype.slice.call(arguments));\n  }\n};\ngoog.fs.blob.getBlobWithProperties = function(parts, opt_type, opt_endings) {\n  const BlobBuilder = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;\n  if (BlobBuilder !== undefined) {\n    const bb = new BlobBuilder();\n    for (let i = 0; i < parts.length; i++) {\n      bb.append(parts[i], opt_endings);\n    }\n    return bb.getBlob(opt_type);\n  } else if (goog.global.Blob !== undefined) {\n    const properties = {};\n    if (opt_type) {\n      properties[\"type\"] = opt_type;\n    }\n    if (opt_endings) {\n      properties[\"endings\"] = opt_endings;\n    }\n    return new Blob(parts, properties);\n  } else {\n    throw new Error(\"This browser doesn't seem to support creating Blobs\");\n  }\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Wrappers for the HTML5 File API. These wrappers closely mirror\n * the underlying APIs, but use Closure-style events and Deferred return values.\n * Their existence also makes it possible to mock the FileSystem API for testing\n * in browsers that don't support it natively.\n *\n * When adding public functions to anything under this namespace, be sure to add\n * its mock counterpart to goog.testing.fs.\n */\n\ngoog.provide('goog.fs.blob');\n\n\n\n/**\n * Concatenates one or more values together and converts them to a Blob.\n *\n * @param {...(string|!Blob|!ArrayBuffer)} var_args The values that will make up\n *     the resulting blob.\n * @return {!Blob} The blob.\n */\ngoog.fs.blob.getBlob = function(var_args) {\n  'use strict';\n  const BlobBuilder = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;\n\n  if (BlobBuilder !== undefined) {\n    const bb = new BlobBuilder();\n    for (let i = 0; i < arguments.length; i++) {\n      bb.append(arguments[i]);\n    }\n    return bb.getBlob();\n  } else {\n    return goog.fs.blob.getBlobWithProperties(\n        Array.prototype.slice.call(arguments));\n  }\n};\n\n\n/**\n * Creates a blob with the given properties.\n * See https://developer.mozilla.org/en-US/docs/Web/API/Blob for more details.\n *\n * @param {!Array<string|!Blob|!ArrayBuffer>} parts The values that will make up\n *     the resulting blob (subset supported by both BlobBuilder.append() and\n *     Blob constructor).\n * @param {string=} opt_type The MIME type of the Blob.\n * @param {string=} opt_endings Specifies how strings containing newlines are to\n *     be written out.\n * @return {!Blob} The blob.\n */\ngoog.fs.blob.getBlobWithProperties = function(parts, opt_type, opt_endings) {\n  'use strict';\n  const BlobBuilder = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;\n\n  if (BlobBuilder !== undefined) {\n    const bb = new BlobBuilder();\n    for (let i = 0; i < parts.length; i++) {\n      bb.append(parts[i], opt_endings);\n    }\n    return bb.getBlob(opt_type);\n  } else if (goog.global.Blob !== undefined) {\n    const properties = {};\n    if (opt_type) {\n      properties['type'] = opt_type;\n    }\n    if (opt_endings) {\n      properties['endings'] = opt_endings;\n    }\n    return new Blob(parts, properties);\n  } else {\n    throw new Error('This browser doesn\\'t seem to support creating Blobs');\n  }\n};\n","~:compiled-at",1669622728323,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.fs.blob.js\",\n\"lineCount\":1,\n\"mappings\":\";\",\n\"sources\":[],\n\"names\":[]\n}\n"]