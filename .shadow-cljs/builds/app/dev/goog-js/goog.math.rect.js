["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/math/rect.js"],"~:js","goog.provide(\"goog.math.Rect\");\ngoog.require(\"goog.asserts\");\ngoog.require(\"goog.math.Box\");\ngoog.require(\"goog.math.Coordinate\");\ngoog.require(\"goog.math.IRect\");\ngoog.require(\"goog.math.Size\");\ngoog.math.Rect = function(x, y, w, h) {\n  this.left = x;\n  this.top = y;\n  this.width = w;\n  this.height = h;\n};\ngoog.math.Rect.prototype.clone = function() {\n  return new goog.math.Rect(this.left, this.top, this.width, this.height);\n};\ngoog.math.Rect.prototype.toBox = function() {\n  var right = this.left + this.width;\n  var bottom = this.top + this.height;\n  return new goog.math.Box(this.top, right, bottom, this.left);\n};\ngoog.math.Rect.createFromPositionAndSize = function(position, size) {\n  return new goog.math.Rect(position.x, position.y, size.width, size.height);\n};\ngoog.math.Rect.createFromBox = function(box) {\n  return new goog.math.Rect(box.left, box.top, box.right - box.left, box.bottom - box.top);\n};\nif (goog.DEBUG) {\n  goog.math.Rect.prototype.toString = function() {\n    return \"(\" + this.left + \", \" + this.top + \" - \" + this.width + \"w x \" + this.height + \"h)\";\n  };\n}\ngoog.math.Rect.equals = function(a, b) {\n  if (a == b) {\n    return true;\n  }\n  if (!a || !b) {\n    return false;\n  }\n  return a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height;\n};\ngoog.math.Rect.prototype.intersection = function(rect) {\n  var x0 = Math.max(this.left, rect.left);\n  var x1 = Math.min(this.left + this.width, rect.left + rect.width);\n  if (x0 <= x1) {\n    var y0 = Math.max(this.top, rect.top);\n    var y1 = Math.min(this.top + this.height, rect.top + rect.height);\n    if (y0 <= y1) {\n      this.left = x0;\n      this.top = y0;\n      this.width = x1 - x0;\n      this.height = y1 - y0;\n      return true;\n    }\n  }\n  return false;\n};\ngoog.math.Rect.intersection = function(a, b) {\n  var x0 = Math.max(a.left, b.left);\n  var x1 = Math.min(a.left + a.width, b.left + b.width);\n  if (x0 <= x1) {\n    var y0 = Math.max(a.top, b.top);\n    var y1 = Math.min(a.top + a.height, b.top + b.height);\n    if (y0 <= y1) {\n      return new goog.math.Rect(x0, y0, x1 - x0, y1 - y0);\n    }\n  }\n  return null;\n};\ngoog.math.Rect.intersects = function(a, b) {\n  return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;\n};\ngoog.math.Rect.prototype.intersects = function(rect) {\n  return goog.math.Rect.intersects(this, rect);\n};\ngoog.math.Rect.difference = function(a, b) {\n  var intersection = goog.math.Rect.intersection(a, b);\n  if (!intersection || !intersection.height || !intersection.width) {\n    return [a.clone()];\n  }\n  var result = [];\n  var top = a.top;\n  var height = a.height;\n  var ar = a.left + a.width;\n  var ab = a.top + a.height;\n  var br = b.left + b.width;\n  var bb = b.top + b.height;\n  if (b.top > a.top) {\n    result.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top));\n    top = b.top;\n    height -= b.top - a.top;\n  }\n  if (bb < ab) {\n    result.push(new goog.math.Rect(a.left, bb, a.width, ab - bb));\n    height = bb - top;\n  }\n  if (b.left > a.left) {\n    result.push(new goog.math.Rect(a.left, top, b.left - a.left, height));\n  }\n  if (br < ar) {\n    result.push(new goog.math.Rect(br, top, ar - br, height));\n  }\n  return result;\n};\ngoog.math.Rect.prototype.difference = function(rect) {\n  return goog.math.Rect.difference(this, rect);\n};\ngoog.math.Rect.prototype.boundingRect = function(rect) {\n  var right = Math.max(this.left + this.width, rect.left + rect.width);\n  var bottom = Math.max(this.top + this.height, rect.top + rect.height);\n  this.left = Math.min(this.left, rect.left);\n  this.top = Math.min(this.top, rect.top);\n  this.width = right - this.left;\n  this.height = bottom - this.top;\n};\ngoog.math.Rect.boundingRect = function(a, b) {\n  if (!a || !b) {\n    return null;\n  }\n  var newRect = new goog.math.Rect(a.left, a.top, a.width, a.height);\n  newRect.boundingRect(b);\n  return newRect;\n};\ngoog.math.Rect.prototype.contains = function(another) {\n  if (another instanceof goog.math.Coordinate) {\n    return another.x >= this.left && another.x <= this.left + this.width && another.y >= this.top && another.y <= this.top + this.height;\n  } else {\n    return this.left <= another.left && this.left + this.width >= another.left + another.width && this.top <= another.top && this.top + this.height >= another.top + another.height;\n  }\n};\ngoog.math.Rect.prototype.squaredDistance = function(point) {\n  var dx = point.x < this.left ? this.left - point.x : Math.max(point.x - (this.left + this.width), 0);\n  var dy = point.y < this.top ? this.top - point.y : Math.max(point.y - (this.top + this.height), 0);\n  return dx * dx + dy * dy;\n};\ngoog.math.Rect.prototype.distance = function(point) {\n  return Math.sqrt(this.squaredDistance(point));\n};\ngoog.math.Rect.prototype.getSize = function() {\n  return new goog.math.Size(this.width, this.height);\n};\ngoog.math.Rect.prototype.getTopLeft = function() {\n  return new goog.math.Coordinate(this.left, this.top);\n};\ngoog.math.Rect.prototype.getCenter = function() {\n  return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2);\n};\ngoog.math.Rect.prototype.getBottomRight = function() {\n  return new goog.math.Coordinate(this.left + this.width, this.top + this.height);\n};\ngoog.math.Rect.prototype.ceil = function() {\n  this.left = Math.ceil(this.left);\n  this.top = Math.ceil(this.top);\n  this.width = Math.ceil(this.width);\n  this.height = Math.ceil(this.height);\n  return this;\n};\ngoog.math.Rect.prototype.floor = function() {\n  this.left = Math.floor(this.left);\n  this.top = Math.floor(this.top);\n  this.width = Math.floor(this.width);\n  this.height = Math.floor(this.height);\n  return this;\n};\ngoog.math.Rect.prototype.round = function() {\n  this.left = Math.round(this.left);\n  this.top = Math.round(this.top);\n  this.width = Math.round(this.width);\n  this.height = Math.round(this.height);\n  return this;\n};\ngoog.math.Rect.prototype.translate = function(tx, opt_ty) {\n  if (tx instanceof goog.math.Coordinate) {\n    this.left += tx.x;\n    this.top += tx.y;\n  } else {\n    this.left += goog.asserts.assertNumber(tx);\n    if (typeof opt_ty === \"number\") {\n      this.top += opt_ty;\n    }\n  }\n  return this;\n};\ngoog.math.Rect.prototype.scale = function(sx, opt_sy) {\n  var sy = typeof opt_sy === \"number\" ? opt_sy : sx;\n  this.left *= sx;\n  this.width *= sx;\n  this.top *= sy;\n  this.height *= sy;\n  return this;\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview A utility class for representing rectangles. Some of these\n * functions should be migrated over to non-nullable params.\n */\n\ngoog.provide('goog.math.Rect');\n\ngoog.require('goog.asserts');\ngoog.require('goog.math.Box');\ngoog.require('goog.math.Coordinate');\ngoog.require('goog.math.IRect');\ngoog.require('goog.math.Size');\n\n\n\n/**\n * Class for representing rectangular regions.\n * @param {number} x Left.\n * @param {number} y Top.\n * @param {number} w Width.\n * @param {number} h Height.\n * @struct\n * @constructor\n * @implements {goog.math.IRect}\n */\ngoog.math.Rect = function(x, y, w, h) {\n  'use strict';\n  /** @type {number} */\n  this.left = x;\n\n  /** @type {number} */\n  this.top = y;\n\n  /** @type {number} */\n  this.width = w;\n\n  /** @type {number} */\n  this.height = h;\n};\n\n\n/**\n * @return {!goog.math.Rect} A new copy of this Rectangle.\n */\ngoog.math.Rect.prototype.clone = function() {\n  'use strict';\n  return new goog.math.Rect(this.left, this.top, this.width, this.height);\n};\n\n\n/**\n * Returns a new Box object with the same position and dimensions as this\n * rectangle.\n * @return {!goog.math.Box} A new Box representation of this Rectangle.\n */\ngoog.math.Rect.prototype.toBox = function() {\n  'use strict';\n  var right = this.left + this.width;\n  var bottom = this.top + this.height;\n  return new goog.math.Box(this.top, right, bottom, this.left);\n};\n\n\n/**\n * Creates a new Rect object with the position and size given.\n * @param {!goog.math.Coordinate} position The top-left coordinate of the Rect\n * @param {!goog.math.Size} size The size of the Rect\n * @return {!goog.math.Rect} A new Rect initialized with the given position and\n *     size.\n */\ngoog.math.Rect.createFromPositionAndSize = function(position, size) {\n  'use strict';\n  return new goog.math.Rect(position.x, position.y, size.width, size.height);\n};\n\n\n/**\n * Creates a new Rect object with the same position and dimensions as a given\n * Box.  Note that this is only the inverse of toBox if left/top are defined.\n * @param {goog.math.Box} box A box.\n * @return {!goog.math.Rect} A new Rect initialized with the box's position\n *     and size.\n */\ngoog.math.Rect.createFromBox = function(box) {\n  'use strict';\n  return new goog.math.Rect(\n      box.left, box.top, box.right - box.left, box.bottom - box.top);\n};\n\n\nif (goog.DEBUG) {\n  /**\n   * Returns a nice string representing size and dimensions of rectangle.\n   * @return {string} In the form (50, 73 - 75w x 25h).\n   * @override\n   */\n  goog.math.Rect.prototype.toString = function() {\n    'use strict';\n    return '(' + this.left + ', ' + this.top + ' - ' + this.width + 'w x ' +\n        this.height + 'h)';\n  };\n}\n\n\n/**\n * Compares rectangles for equality.\n * @param {goog.math.IRect} a A Rectangle.\n * @param {goog.math.IRect} b A Rectangle.\n * @return {boolean} True iff the rectangles have the same left, top, width,\n *     and height, or if both are null.\n */\ngoog.math.Rect.equals = function(a, b) {\n  'use strict';\n  if (a == b) {\n    return true;\n  }\n  if (!a || !b) {\n    return false;\n  }\n  return a.left == b.left && a.width == b.width && a.top == b.top &&\n      a.height == b.height;\n};\n\n\n/**\n * Computes the intersection of this rectangle and the rectangle parameter.  If\n * there is no intersection, returns false and leaves this rectangle as is.\n * @param {goog.math.IRect} rect A Rectangle.\n * @return {boolean} True iff this rectangle intersects with the parameter.\n */\ngoog.math.Rect.prototype.intersection = function(rect) {\n  'use strict';\n  var x0 = Math.max(this.left, rect.left);\n  var x1 = Math.min(this.left + this.width, rect.left + rect.width);\n\n  if (x0 <= x1) {\n    var y0 = Math.max(this.top, rect.top);\n    var y1 = Math.min(this.top + this.height, rect.top + rect.height);\n\n    if (y0 <= y1) {\n      this.left = x0;\n      this.top = y0;\n      this.width = x1 - x0;\n      this.height = y1 - y0;\n\n      return true;\n    }\n  }\n  return false;\n};\n\n\n/**\n * Returns the intersection of two rectangles. Two rectangles intersect if they\n * touch at all, for example, two zero width and height rectangles would\n * intersect if they had the same top and left.\n * @param {goog.math.IRect} a A Rectangle.\n * @param {goog.math.IRect} b A Rectangle.\n * @return {goog.math.Rect} A new intersection rect (even if width and height\n *     are 0), or null if there is no intersection.\n */\ngoog.math.Rect.intersection = function(a, b) {\n  'use strict';\n  // There is no nice way to do intersection via a clone, because any such\n  // clone might be unnecessary if this function returns null.  So, we duplicate\n  // code from above.\n\n  var x0 = Math.max(a.left, b.left);\n  var x1 = Math.min(a.left + a.width, b.left + b.width);\n\n  if (x0 <= x1) {\n    var y0 = Math.max(a.top, b.top);\n    var y1 = Math.min(a.top + a.height, b.top + b.height);\n\n    if (y0 <= y1) {\n      return new goog.math.Rect(x0, y0, x1 - x0, y1 - y0);\n    }\n  }\n  return null;\n};\n\n\n/**\n * Returns whether two rectangles intersect. Two rectangles intersect if they\n * touch at all, for example, two zero width and height rectangles would\n * intersect if they had the same top and left.\n * @param {goog.math.IRect} a A Rectangle.\n * @param {goog.math.IRect} b A Rectangle.\n * @return {boolean} Whether a and b intersect.\n */\ngoog.math.Rect.intersects = function(a, b) {\n  'use strict';\n  return (\n      a.left <= b.left + b.width && b.left <= a.left + a.width &&\n      a.top <= b.top + b.height && b.top <= a.top + a.height);\n};\n\n\n/**\n * Returns whether a rectangle intersects this rectangle.\n * @param {goog.math.IRect} rect A rectangle.\n * @return {boolean} Whether rect intersects this rectangle.\n */\ngoog.math.Rect.prototype.intersects = function(rect) {\n  'use strict';\n  return goog.math.Rect.intersects(this, rect);\n};\n\n\n/**\n * Computes the difference regions between two rectangles. The return value is\n * an array of 0 to 4 rectangles defining the remaining regions of the first\n * rectangle after the second has been subtracted.\n * @param {goog.math.Rect} a A Rectangle.\n * @param {goog.math.IRect} b A Rectangle.\n * @return {!Array<!goog.math.Rect>} An array with 0 to 4 rectangles which\n *     together define the difference area of rectangle a minus rectangle b.\n */\ngoog.math.Rect.difference = function(a, b) {\n  'use strict';\n  var intersection = goog.math.Rect.intersection(a, b);\n  if (!intersection || !intersection.height || !intersection.width) {\n    return [a.clone()];\n  }\n\n  var result = [];\n\n  var top = a.top;\n  var height = a.height;\n\n  var ar = a.left + a.width;\n  var ab = a.top + a.height;\n\n  var br = b.left + b.width;\n  var bb = b.top + b.height;\n\n  // Subtract off any area on top where A extends past B\n  if (b.top > a.top) {\n    result.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top));\n    top = b.top;\n    // If we're moving the top down, we also need to subtract the height diff.\n    height -= b.top - a.top;\n  }\n  // Subtract off any area on bottom where A extends past B\n  if (bb < ab) {\n    result.push(new goog.math.Rect(a.left, bb, a.width, ab - bb));\n    height = bb - top;\n  }\n  // Subtract any area on left where A extends past B\n  if (b.left > a.left) {\n    result.push(new goog.math.Rect(a.left, top, b.left - a.left, height));\n  }\n  // Subtract any area on right where A extends past B\n  if (br < ar) {\n    result.push(new goog.math.Rect(br, top, ar - br, height));\n  }\n\n  return result;\n};\n\n\n/**\n * Computes the difference regions between this rectangle and `rect`. The\n * return value is an array of 0 to 4 rectangles defining the remaining regions\n * of this rectangle after the other has been subtracted.\n * @param {goog.math.IRect} rect A Rectangle.\n * @return {!Array<!goog.math.Rect>} An array with 0 to 4 rectangles which\n *     together define the difference area of rectangle a minus rectangle b.\n */\ngoog.math.Rect.prototype.difference = function(rect) {\n  'use strict';\n  return goog.math.Rect.difference(this, rect);\n};\n\n\n/**\n * Expand this rectangle to also include the area of the given rectangle.\n * @param {goog.math.IRect} rect The other rectangle.\n */\ngoog.math.Rect.prototype.boundingRect = function(rect) {\n  'use strict';\n  // We compute right and bottom before we change left and top below.\n  var right = Math.max(this.left + this.width, rect.left + rect.width);\n  var bottom = Math.max(this.top + this.height, rect.top + rect.height);\n\n  this.left = Math.min(this.left, rect.left);\n  this.top = Math.min(this.top, rect.top);\n\n  this.width = right - this.left;\n  this.height = bottom - this.top;\n};\n\n\n/**\n * Returns a new rectangle which completely contains both input rectangles.\n * @param {goog.math.IRect} a A rectangle.\n * @param {goog.math.IRect} b A rectangle.\n * @return {goog.math.Rect} A new bounding rect, or null if either rect is\n *     null.\n */\ngoog.math.Rect.boundingRect = function(a, b) {\n  'use strict';\n  if (!a || !b) {\n    return null;\n  }\n\n  var newRect = new goog.math.Rect(a.left, a.top, a.width, a.height);\n  newRect.boundingRect(b);\n\n  return newRect;\n};\n\n\n/**\n * Tests whether this rectangle entirely contains another rectangle or\n * coordinate.\n *\n * @param {goog.math.IRect|goog.math.Coordinate} another The rectangle or\n *     coordinate to test for containment.\n * @return {boolean} Whether this rectangle contains given rectangle or\n *     coordinate.\n */\ngoog.math.Rect.prototype.contains = function(another) {\n  'use strict';\n  if (another instanceof goog.math.Coordinate) {\n    return another.x >= this.left && another.x <= this.left + this.width &&\n        another.y >= this.top && another.y <= this.top + this.height;\n  } else {  // (another instanceof goog.math.IRect)\n    return this.left <= another.left &&\n        this.left + this.width >= another.left + another.width &&\n        this.top <= another.top &&\n        this.top + this.height >= another.top + another.height;\n  }\n};\n\n\n/**\n * @param {!goog.math.Coordinate} point A coordinate.\n * @return {number} The squared distance between the point and the closest\n *     point inside the rectangle. Returns 0 if the point is inside the\n *     rectangle.\n */\ngoog.math.Rect.prototype.squaredDistance = function(point) {\n  'use strict';\n  var dx = point.x < this.left ?\n      this.left - point.x :\n      Math.max(point.x - (this.left + this.width), 0);\n  var dy = point.y < this.top ? this.top - point.y :\n                                Math.max(point.y - (this.top + this.height), 0);\n  return dx * dx + dy * dy;\n};\n\n\n/**\n * @param {!goog.math.Coordinate} point A coordinate.\n * @return {number} The distance between the point and the closest point\n *     inside the rectangle. Returns 0 if the point is inside the rectangle.\n */\ngoog.math.Rect.prototype.distance = function(point) {\n  'use strict';\n  return Math.sqrt(this.squaredDistance(point));\n};\n\n\n/**\n * @return {!goog.math.Size} The size of this rectangle.\n */\ngoog.math.Rect.prototype.getSize = function() {\n  'use strict';\n  return new goog.math.Size(this.width, this.height);\n};\n\n\n/**\n * @return {!goog.math.Coordinate} A new coordinate for the top-left corner of\n *     the rectangle.\n */\ngoog.math.Rect.prototype.getTopLeft = function() {\n  'use strict';\n  return new goog.math.Coordinate(this.left, this.top);\n};\n\n\n/**\n * @return {!goog.math.Coordinate} A new coordinate for the center of the\n *     rectangle.\n */\ngoog.math.Rect.prototype.getCenter = function() {\n  'use strict';\n  return new goog.math.Coordinate(\n      this.left + this.width / 2, this.top + this.height / 2);\n};\n\n\n/**\n * @return {!goog.math.Coordinate} A new coordinate for the bottom-right corner\n *     of the rectangle.\n */\ngoog.math.Rect.prototype.getBottomRight = function() {\n  'use strict';\n  return new goog.math.Coordinate(\n      this.left + this.width, this.top + this.height);\n};\n\n\n/**\n * Rounds the fields to the next larger integer values.\n * @return {!goog.math.Rect} This rectangle with ceil'd fields.\n */\ngoog.math.Rect.prototype.ceil = function() {\n  'use strict';\n  this.left = Math.ceil(this.left);\n  this.top = Math.ceil(this.top);\n  this.width = Math.ceil(this.width);\n  this.height = Math.ceil(this.height);\n  return this;\n};\n\n\n/**\n * Rounds the fields to the next smaller integer values.\n * @return {!goog.math.Rect} This rectangle with floored fields.\n */\ngoog.math.Rect.prototype.floor = function() {\n  'use strict';\n  this.left = Math.floor(this.left);\n  this.top = Math.floor(this.top);\n  this.width = Math.floor(this.width);\n  this.height = Math.floor(this.height);\n  return this;\n};\n\n\n/**\n * Rounds the fields to nearest integer values.\n * @return {!goog.math.Rect} This rectangle with rounded fields.\n */\ngoog.math.Rect.prototype.round = function() {\n  'use strict';\n  this.left = Math.round(this.left);\n  this.top = Math.round(this.top);\n  this.width = Math.round(this.width);\n  this.height = Math.round(this.height);\n  return this;\n};\n\n\n/**\n * Translates this rectangle by the given offsets. If a\n * `goog.math.Coordinate` is given, then the left and top values are\n * translated by the coordinate's x and y values. Otherwise, left and top are\n * translated by `tx` and `opt_ty` respectively.\n * @param {number|goog.math.Coordinate} tx The value to translate left by or the\n *     the coordinate to translate this rect by.\n * @param {number=} opt_ty The value to translate top by.\n * @return {!goog.math.Rect} This rectangle after translating.\n */\ngoog.math.Rect.prototype.translate = function(tx, opt_ty) {\n  'use strict';\n  if (tx instanceof goog.math.Coordinate) {\n    this.left += tx.x;\n    this.top += tx.y;\n  } else {\n    this.left += goog.asserts.assertNumber(tx);\n    if (typeof opt_ty === 'number') {\n      this.top += opt_ty;\n    }\n  }\n  return this;\n};\n\n\n/**\n * Scales this rectangle by the given scale factors. The left and width values\n * are scaled by `sx` and the top and height values are scaled by\n * `opt_sy`.  If `opt_sy` is not given, then all fields are scaled\n * by `sx`.\n * @param {number} sx The scale factor to use for the x dimension.\n * @param {number=} opt_sy The scale factor to use for the y dimension.\n * @return {!goog.math.Rect} This rectangle after scaling.\n */\ngoog.math.Rect.prototype.scale = function(sx, opt_sy) {\n  'use strict';\n  var sy = (typeof opt_sy === 'number') ? opt_sy : sx;\n  this.left *= sx;\n  this.width *= sx;\n  this.top *= sy;\n  this.height *= sy;\n  return this;\n};\n","~:compiled-at",1669622728391,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.math.rect.js\",\n\"lineCount\":1,\n\"mappings\":\";\",\n\"sources\":[],\n\"names\":[]\n}\n"]