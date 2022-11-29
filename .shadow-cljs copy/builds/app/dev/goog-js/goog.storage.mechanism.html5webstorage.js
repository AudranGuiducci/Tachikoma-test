["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/storage/mechanism/html5webstorage.js"],"~:js","goog.provide(\"goog.storage.mechanism.HTML5WebStorage\");\ngoog.require(\"goog.asserts\");\ngoog.require(\"goog.iter.Iterator\");\ngoog.require(\"goog.iter.StopIteration\");\ngoog.require(\"goog.storage.mechanism.ErrorCode\");\ngoog.require(\"goog.storage.mechanism.IterableMechanism\");\ngoog.storage.mechanism.HTML5WebStorage = function(storage) {\n  goog.storage.mechanism.HTML5WebStorage.base(this, \"constructor\");\n  this.storage_ = storage;\n};\ngoog.inherits(goog.storage.mechanism.HTML5WebStorage, goog.storage.mechanism.IterableMechanism);\ngoog.storage.mechanism.HTML5WebStorage.STORAGE_AVAILABLE_KEY_ = \"__sak\";\ngoog.storage.mechanism.HTML5WebStorage.prototype.isAvailable = function() {\n  if (!this.storage_) {\n    return false;\n  }\n  try {\n    this.storage_.setItem(goog.storage.mechanism.HTML5WebStorage.STORAGE_AVAILABLE_KEY_, \"1\");\n    this.storage_.removeItem(goog.storage.mechanism.HTML5WebStorage.STORAGE_AVAILABLE_KEY_);\n    return true;\n  } catch (e) {\n    return false;\n  }\n};\ngoog.storage.mechanism.HTML5WebStorage.prototype.set = function(key, value) {\n  try {\n    this.storage_.setItem(key, value);\n  } catch (e) {\n    if (this.storage_.length == 0) {\n      throw goog.storage.mechanism.ErrorCode.STORAGE_DISABLED;\n    } else {\n      throw goog.storage.mechanism.ErrorCode.QUOTA_EXCEEDED;\n    }\n  }\n};\ngoog.storage.mechanism.HTML5WebStorage.prototype.get = function(key) {\n  var value = this.storage_.getItem(key);\n  if (typeof value !== \"string\" && value !== null) {\n    throw goog.storage.mechanism.ErrorCode.INVALID_VALUE;\n  }\n  return value;\n};\ngoog.storage.mechanism.HTML5WebStorage.prototype.remove = function(key) {\n  this.storage_.removeItem(key);\n};\ngoog.storage.mechanism.HTML5WebStorage.prototype.getCount = function() {\n  return this.storage_.length;\n};\ngoog.storage.mechanism.HTML5WebStorage.prototype.__iterator__ = function(opt_keys) {\n  var i = 0;\n  var storage = this.storage_;\n  var newIter = new goog.iter.Iterator();\n  newIter.nextValueOrThrow = function() {\n    if (i >= storage.length) {\n      throw goog.iter.StopIteration;\n    }\n    var key = goog.asserts.assertString(storage.key(i++));\n    if (opt_keys) {\n      return key;\n    }\n    var value = storage.getItem(key);\n    if (typeof value !== \"string\") {\n      throw goog.storage.mechanism.ErrorCode.INVALID_VALUE;\n    }\n    return value;\n  };\n  return newIter;\n};\ngoog.storage.mechanism.HTML5WebStorage.prototype.clear = function() {\n  this.storage_.clear();\n};\ngoog.storage.mechanism.HTML5WebStorage.prototype.key = function(index) {\n  return this.storage_.key(index);\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Base class that implements functionality common\n * across both session and local web storage mechanisms.\n */\n\ngoog.provide('goog.storage.mechanism.HTML5WebStorage');\n\ngoog.require('goog.asserts');\ngoog.require('goog.iter.Iterator');\ngoog.require('goog.iter.StopIteration');\ngoog.require('goog.storage.mechanism.ErrorCode');\ngoog.require('goog.storage.mechanism.IterableMechanism');\n\n\n\n/**\n * Provides a storage mechanism that uses HTML5 Web storage.\n *\n * @param {Storage} storage The Web storage object.\n * @constructor\n * @struct\n * @extends {goog.storage.mechanism.IterableMechanism}\n */\ngoog.storage.mechanism.HTML5WebStorage = function(storage) {\n  'use strict';\n  goog.storage.mechanism.HTML5WebStorage.base(this, 'constructor');\n\n  /**\n   * The web storage object (window.localStorage or window.sessionStorage).\n   * @private {Storage}\n   */\n  this.storage_ = storage;\n};\ngoog.inherits(\n    goog.storage.mechanism.HTML5WebStorage,\n    goog.storage.mechanism.IterableMechanism);\n\n\n/**\n * The key used to check if the storage instance is available.\n * @private {string}\n * @const\n */\ngoog.storage.mechanism.HTML5WebStorage.STORAGE_AVAILABLE_KEY_ = '__sak';\n\n\n/**\n * Determines whether or not the mechanism is available.\n * It works only if the provided web storage object exists and is enabled.\n *\n * @return {boolean} True if the mechanism is available.\n */\ngoog.storage.mechanism.HTML5WebStorage.prototype.isAvailable = function() {\n  'use strict';\n  if (!this.storage_) {\n    return false;\n  }\n\n  try {\n    // setItem will throw an exception if we cannot access WebStorage (e.g.,\n    // Safari in private mode).\n    this.storage_.setItem(\n        goog.storage.mechanism.HTML5WebStorage.STORAGE_AVAILABLE_KEY_, '1');\n    this.storage_.removeItem(\n        goog.storage.mechanism.HTML5WebStorage.STORAGE_AVAILABLE_KEY_);\n    return true;\n  } catch (e) {\n    return false;\n  }\n};\n\n\n/** @override */\ngoog.storage.mechanism.HTML5WebStorage.prototype.set = function(key, value) {\n  'use strict';\n  try {\n    // May throw an exception if storage quota is exceeded.\n    this.storage_.setItem(key, value);\n  } catch (e) {\n    // In Safari Private mode, conforming to the W3C spec, invoking\n    // Storage.prototype.setItem will allways throw a QUOTA_EXCEEDED_ERR\n    // exception.  Since it's impossible to verify if we're in private browsing\n    // mode, we throw a different exception if the storage is empty.\n    if (this.storage_.length == 0) {\n      throw goog.storage.mechanism.ErrorCode.STORAGE_DISABLED;\n    } else {\n      throw goog.storage.mechanism.ErrorCode.QUOTA_EXCEEDED;\n    }\n  }\n};\n\n\n/** @override */\ngoog.storage.mechanism.HTML5WebStorage.prototype.get = function(key) {\n  'use strict';\n  // According to W3C specs, values can be of any type. Since we only save\n  // strings, any other type is a storage error. If we returned nulls for\n  // such keys, i.e., treated them as non-existent, this would lead to a\n  // paradox where a key exists, but it does not when it is retrieved.\n  // http://www.w3.org/TR/2009/WD-webstorage-20091029/#the-storage-interface\n  var value = this.storage_.getItem(key);\n  if (typeof value !== 'string' && value !== null) {\n    throw goog.storage.mechanism.ErrorCode.INVALID_VALUE;\n  }\n  return value;\n};\n\n\n/** @override */\ngoog.storage.mechanism.HTML5WebStorage.prototype.remove = function(key) {\n  'use strict';\n  this.storage_.removeItem(key);\n};\n\n\n/** @override */\ngoog.storage.mechanism.HTML5WebStorage.prototype.getCount = function() {\n  'use strict';\n  return this.storage_.length;\n};\n\n\n/** @override */\ngoog.storage.mechanism.HTML5WebStorage.prototype.__iterator__ = function(\n    opt_keys) {\n  'use strict';\n  var i = 0;\n  var storage = this.storage_;\n  var newIter = new goog.iter.Iterator();\n  newIter.nextValueOrThrow = function() {\n    'use strict';\n    if (i >= storage.length) {\n      throw goog.iter.StopIteration;\n    }\n    var key = goog.asserts.assertString(storage.key(i++));\n    if (opt_keys) {\n      return key;\n    }\n    var value = storage.getItem(key);\n    // The value must exist and be a string, otherwise it is a storage error.\n    if (typeof value !== 'string') {\n      throw goog.storage.mechanism.ErrorCode.INVALID_VALUE;\n    }\n    return value;\n  };\n\n  return newIter;\n};\n\n\n/** @override */\ngoog.storage.mechanism.HTML5WebStorage.prototype.clear = function() {\n  'use strict';\n  this.storage_.clear();\n};\n\n\n/**\n * Gets the key for a given key index. If an index outside of\n * [0..this.getCount()) is specified, this function returns null.\n * @param {number} index A key index.\n * @return {?string} A storage key, or null if the specified index is out of\n *     range.\n */\ngoog.storage.mechanism.HTML5WebStorage.prototype.key = function(index) {\n  'use strict';\n  return this.storage_.key(index);\n};\n","~:compiled-at",1669734909676,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.storage.mechanism.html5webstorage.js\",\n\"lineCount\":75,\n\"mappings\":\"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\",\n\"sources\":[\"goog/storage/mechanism/html5webstorage.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview Base class that implements functionality common\\n * across both session and local web storage mechanisms.\\n */\\n\\ngoog.provide('goog.storage.mechanism.HTML5WebStorage');\\n\\ngoog.require('goog.asserts');\\ngoog.require('goog.iter.Iterator');\\ngoog.require('goog.iter.StopIteration');\\ngoog.require('goog.storage.mechanism.ErrorCode');\\ngoog.require('goog.storage.mechanism.IterableMechanism');\\n\\n\\n\\n/**\\n * Provides a storage mechanism that uses HTML5 Web storage.\\n *\\n * @param {Storage} storage The Web storage object.\\n * @constructor\\n * @struct\\n * @extends {goog.storage.mechanism.IterableMechanism}\\n */\\ngoog.storage.mechanism.HTML5WebStorage = function(storage) {\\n  'use strict';\\n  goog.storage.mechanism.HTML5WebStorage.base(this, 'constructor');\\n\\n  /**\\n   * The web storage object (window.localStorage or window.sessionStorage).\\n   * @private {Storage}\\n   */\\n  this.storage_ = storage;\\n};\\ngoog.inherits(\\n    goog.storage.mechanism.HTML5WebStorage,\\n    goog.storage.mechanism.IterableMechanism);\\n\\n\\n/**\\n * The key used to check if the storage instance is available.\\n * @private {string}\\n * @const\\n */\\ngoog.storage.mechanism.HTML5WebStorage.STORAGE_AVAILABLE_KEY_ = '__sak';\\n\\n\\n/**\\n * Determines whether or not the mechanism is available.\\n * It works only if the provided web storage object exists and is enabled.\\n *\\n * @return {boolean} True if the mechanism is available.\\n */\\ngoog.storage.mechanism.HTML5WebStorage.prototype.isAvailable = function() {\\n  'use strict';\\n  if (!this.storage_) {\\n    return false;\\n  }\\n\\n  try {\\n    // setItem will throw an exception if we cannot access WebStorage (e.g.,\\n    // Safari in private mode).\\n    this.storage_.setItem(\\n        goog.storage.mechanism.HTML5WebStorage.STORAGE_AVAILABLE_KEY_, '1');\\n    this.storage_.removeItem(\\n        goog.storage.mechanism.HTML5WebStorage.STORAGE_AVAILABLE_KEY_);\\n    return true;\\n  } catch (e) {\\n    return false;\\n  }\\n};\\n\\n\\n/** @override */\\ngoog.storage.mechanism.HTML5WebStorage.prototype.set = function(key, value) {\\n  'use strict';\\n  try {\\n    // May throw an exception if storage quota is exceeded.\\n    this.storage_.setItem(key, value);\\n  } catch (e) {\\n    // In Safari Private mode, conforming to the W3C spec, invoking\\n    // Storage.prototype.setItem will allways throw a QUOTA_EXCEEDED_ERR\\n    // exception.  Since it's impossible to verify if we're in private browsing\\n    // mode, we throw a different exception if the storage is empty.\\n    if (this.storage_.length == 0) {\\n      throw goog.storage.mechanism.ErrorCode.STORAGE_DISABLED;\\n    } else {\\n      throw goog.storage.mechanism.ErrorCode.QUOTA_EXCEEDED;\\n    }\\n  }\\n};\\n\\n\\n/** @override */\\ngoog.storage.mechanism.HTML5WebStorage.prototype.get = function(key) {\\n  'use strict';\\n  // According to W3C specs, values can be of any type. Since we only save\\n  // strings, any other type is a storage error. If we returned nulls for\\n  // such keys, i.e., treated them as non-existent, this would lead to a\\n  // paradox where a key exists, but it does not when it is retrieved.\\n  // http://www.w3.org/TR/2009/WD-webstorage-20091029/#the-storage-interface\\n  var value = this.storage_.getItem(key);\\n  if (typeof value !== 'string' && value !== null) {\\n    throw goog.storage.mechanism.ErrorCode.INVALID_VALUE;\\n  }\\n  return value;\\n};\\n\\n\\n/** @override */\\ngoog.storage.mechanism.HTML5WebStorage.prototype.remove = function(key) {\\n  'use strict';\\n  this.storage_.removeItem(key);\\n};\\n\\n\\n/** @override */\\ngoog.storage.mechanism.HTML5WebStorage.prototype.getCount = function() {\\n  'use strict';\\n  return this.storage_.length;\\n};\\n\\n\\n/** @override */\\ngoog.storage.mechanism.HTML5WebStorage.prototype.__iterator__ = function(\\n    opt_keys) {\\n  'use strict';\\n  var i = 0;\\n  var storage = this.storage_;\\n  var newIter = new goog.iter.Iterator();\\n  newIter.nextValueOrThrow = function() {\\n    'use strict';\\n    if (i >= storage.length) {\\n      throw goog.iter.StopIteration;\\n    }\\n    var key = goog.asserts.assertString(storage.key(i++));\\n    if (opt_keys) {\\n      return key;\\n    }\\n    var value = storage.getItem(key);\\n    // The value must exist and be a string, otherwise it is a storage error.\\n    if (typeof value !== 'string') {\\n      throw goog.storage.mechanism.ErrorCode.INVALID_VALUE;\\n    }\\n    return value;\\n  };\\n\\n  return newIter;\\n};\\n\\n\\n/** @override */\\ngoog.storage.mechanism.HTML5WebStorage.prototype.clear = function() {\\n  'use strict';\\n  this.storage_.clear();\\n};\\n\\n\\n/**\\n * Gets the key for a given key index. If an index outside of\\n * [0..this.getCount()) is specified, this function returns null.\\n * @param {number} index A key index.\\n * @return {?string} A storage key, or null if the specified index is out of\\n *     range.\\n */\\ngoog.storage.mechanism.HTML5WebStorage.prototype.key = function(index) {\\n  'use strict';\\n  return this.storage_.key(index);\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"storage\",\"mechanism\",\"HTML5WebStorage\",\"goog.storage.mechanism.HTML5WebStorage\",\"base\",\"storage_\",\"inherits\",\"IterableMechanism\",\"STORAGE_AVAILABLE_KEY_\",\"prototype\",\"isAvailable\",\"goog.storage.mechanism.HTML5WebStorage.prototype.isAvailable\",\"setItem\",\"removeItem\",\"e\",\"set\",\"goog.storage.mechanism.HTML5WebStorage.prototype.set\",\"key\",\"value\",\"length\",\"ErrorCode\",\"STORAGE_DISABLED\",\"QUOTA_EXCEEDED\",\"get\",\"goog.storage.mechanism.HTML5WebStorage.prototype.get\",\"getItem\",\"INVALID_VALUE\",\"remove\",\"goog.storage.mechanism.HTML5WebStorage.prototype.remove\",\"getCount\",\"goog.storage.mechanism.HTML5WebStorage.prototype.getCount\",\"__iterator__\",\"goog.storage.mechanism.HTML5WebStorage.prototype.__iterator__\",\"opt_keys\",\"i\",\"newIter\",\"iter\",\"Iterator\",\"nextValueOrThrow\",\"newIter.nextValueOrThrow\",\"StopIteration\",\"asserts\",\"assertString\",\"clear\",\"goog.storage.mechanism.HTML5WebStorage.prototype.clear\",\"goog.storage.mechanism.HTML5WebStorage.prototype.key\",\"index\"]\n}\n"]