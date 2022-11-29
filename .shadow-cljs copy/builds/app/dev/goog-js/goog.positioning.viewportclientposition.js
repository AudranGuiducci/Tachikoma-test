["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/positioning/viewportclientposition.js"],"~:js","goog.provide(\"goog.positioning.ViewportClientPosition\");\ngoog.require(\"goog.dom\");\ngoog.require(\"goog.math.Coordinate\");\ngoog.require(\"goog.positioning\");\ngoog.require(\"goog.positioning.ClientPosition\");\ngoog.require(\"goog.positioning.Overflow\");\ngoog.require(\"goog.positioning.OverflowStatus\");\ngoog.require(\"goog.style\");\ngoog.requireType(\"goog.math.Box\");\ngoog.requireType(\"goog.math.Size\");\ngoog.positioning.ViewportClientPosition = function(arg1, opt_arg2) {\n  goog.positioning.ClientPosition.call(this, arg1, opt_arg2);\n};\ngoog.inherits(goog.positioning.ViewportClientPosition, goog.positioning.ClientPosition);\ngoog.positioning.ViewportClientPosition.prototype.lastResortOverflow_ = 0;\ngoog.positioning.ViewportClientPosition.prototype.setLastResortOverflow = function(overflow) {\n  this.lastResortOverflow_ = overflow;\n};\ngoog.positioning.ViewportClientPosition.prototype.reposition = function(element, popupCorner, opt_margin, opt_preferredSize) {\n  var viewportElt = goog.style.getClientViewportElement(element);\n  var viewport = goog.style.getVisibleRectForElement(viewportElt);\n  var scrollEl = goog.dom.getDomHelper(element).getDocumentScrollElement();\n  var clientPos = new goog.math.Coordinate(this.coordinate.x + scrollEl.scrollLeft, this.coordinate.y + scrollEl.scrollTop);\n  var failXY = goog.positioning.Overflow.FAIL_X | goog.positioning.Overflow.FAIL_Y;\n  var corner = popupCorner;\n  var status = goog.positioning.positionAtCoordinate(clientPos, element, corner, opt_margin, viewport, failXY, opt_preferredSize);\n  if ((status & goog.positioning.OverflowStatus.FAILED) == 0) {\n    return;\n  }\n  if (status & goog.positioning.OverflowStatus.FAILED_LEFT || status & goog.positioning.OverflowStatus.FAILED_RIGHT) {\n    corner = goog.positioning.flipCornerHorizontal(corner);\n  }\n  if (status & goog.positioning.OverflowStatus.FAILED_TOP || status & goog.positioning.OverflowStatus.FAILED_BOTTOM) {\n    corner = goog.positioning.flipCornerVertical(corner);\n  }\n  status = goog.positioning.positionAtCoordinate(clientPos, element, corner, opt_margin, viewport, failXY, opt_preferredSize);\n  if ((status & goog.positioning.OverflowStatus.FAILED) == 0) {\n    return;\n  }\n  goog.positioning.positionAtCoordinate(clientPos, element, popupCorner, opt_margin, viewport, this.lastResortOverflow_, opt_preferredSize);\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Client viewport positioning class.\n */\n\ngoog.provide('goog.positioning.ViewportClientPosition');\n\ngoog.require('goog.dom');\ngoog.require('goog.math.Coordinate');\ngoog.require('goog.positioning');\ngoog.require('goog.positioning.ClientPosition');\ngoog.require('goog.positioning.Overflow');\ngoog.require('goog.positioning.OverflowStatus');\ngoog.require('goog.style');\ngoog.requireType('goog.math.Box');\ngoog.requireType('goog.math.Size');\n\n\n\n/**\n * Encapsulates a popup position where the popup is positioned relative to the\n * window (client) coordinates, and made to stay within the viewport.\n *\n * @param {number|goog.math.Coordinate} arg1 Left position or coordinate.\n * @param {number=} opt_arg2 Top position if arg1 is a number representing the\n *     left position, ignored otherwise.\n * @constructor\n * @extends {goog.positioning.ClientPosition}\n */\ngoog.positioning.ViewportClientPosition = function(arg1, opt_arg2) {\n  'use strict';\n  goog.positioning.ClientPosition.call(this, arg1, opt_arg2);\n};\ngoog.inherits(\n    goog.positioning.ViewportClientPosition, goog.positioning.ClientPosition);\n\n\n/**\n * The last-resort overflow strategy, if the popup fails to fit.\n * @type {number}\n * @private\n */\ngoog.positioning.ViewportClientPosition.prototype.lastResortOverflow_ = 0;\n\n\n/**\n * Set the last-resort overflow strategy, if the popup fails to fit.\n * @param {number} overflow A bitmask of goog.positioning.Overflow strategies.\n */\ngoog.positioning.ViewportClientPosition.prototype.setLastResortOverflow =\n    function(overflow) {\n  'use strict';\n  this.lastResortOverflow_ = overflow;\n};\n\n\n/**\n * Repositions the popup according to the current state.\n *\n * @param {Element} element The DOM element of the popup.\n * @param {goog.positioning.Corner} popupCorner The corner of the popup\n *     element that that should be positioned adjacent to the anchorElement.\n *     One of the goog.positioning.Corner constants.\n * @param {goog.math.Box=} opt_margin A margin specified in pixels.\n * @param {goog.math.Size=} opt_preferredSize Preferred size fo the element.\n * @override\n */\ngoog.positioning.ViewportClientPosition.prototype.reposition = function(\n    element, popupCorner, opt_margin, opt_preferredSize) {\n  'use strict';\n  var viewportElt = goog.style.getClientViewportElement(element);\n  var viewport = goog.style.getVisibleRectForElement(viewportElt);\n  var scrollEl = goog.dom.getDomHelper(element).getDocumentScrollElement();\n  var clientPos = new goog.math.Coordinate(\n      this.coordinate.x + scrollEl.scrollLeft,\n      this.coordinate.y + scrollEl.scrollTop);\n\n  var failXY =\n      goog.positioning.Overflow.FAIL_X | goog.positioning.Overflow.FAIL_Y;\n  var corner = popupCorner;\n\n  // Try the requested position.\n  var status = goog.positioning.positionAtCoordinate(\n      clientPos, element, corner, opt_margin, viewport, failXY,\n      opt_preferredSize);\n  if ((status & goog.positioning.OverflowStatus.FAILED) == 0) {\n    return;\n  }\n\n  // Outside left or right edge of viewport, try try to flip it horizontally.\n  if (status & goog.positioning.OverflowStatus.FAILED_LEFT ||\n      status & goog.positioning.OverflowStatus.FAILED_RIGHT) {\n    corner = goog.positioning.flipCornerHorizontal(corner);\n  }\n\n  // Outside top or bottom edge of viewport, try try to flip it vertically.\n  if (status & goog.positioning.OverflowStatus.FAILED_TOP ||\n      status & goog.positioning.OverflowStatus.FAILED_BOTTOM) {\n    corner = goog.positioning.flipCornerVertical(corner);\n  }\n\n  // Try flipped position.\n  status = goog.positioning.positionAtCoordinate(\n      clientPos, element, corner, opt_margin, viewport, failXY,\n      opt_preferredSize);\n  if ((status & goog.positioning.OverflowStatus.FAILED) == 0) {\n    return;\n  }\n\n  // If that failed, the viewport is simply too small to contain the popup.\n  // Revert to the original position.\n  goog.positioning.positionAtCoordinate(\n      clientPos, element, popupCorner, opt_margin, viewport,\n      this.lastResortOverflow_, opt_preferredSize);\n};\n","~:compiled-at",1669734909692,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.positioning.viewportclientposition.js\",\n\"lineCount\":42,\n\"mappings\":\"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\",\n\"sources\":[\"goog/positioning/viewportclientposition.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview Client viewport positioning class.\\n */\\n\\ngoog.provide('goog.positioning.ViewportClientPosition');\\n\\ngoog.require('goog.dom');\\ngoog.require('goog.math.Coordinate');\\ngoog.require('goog.positioning');\\ngoog.require('goog.positioning.ClientPosition');\\ngoog.require('goog.positioning.Overflow');\\ngoog.require('goog.positioning.OverflowStatus');\\ngoog.require('goog.style');\\ngoog.requireType('goog.math.Box');\\ngoog.requireType('goog.math.Size');\\n\\n\\n\\n/**\\n * Encapsulates a popup position where the popup is positioned relative to the\\n * window (client) coordinates, and made to stay within the viewport.\\n *\\n * @param {number|goog.math.Coordinate} arg1 Left position or coordinate.\\n * @param {number=} opt_arg2 Top position if arg1 is a number representing the\\n *     left position, ignored otherwise.\\n * @constructor\\n * @extends {goog.positioning.ClientPosition}\\n */\\ngoog.positioning.ViewportClientPosition = function(arg1, opt_arg2) {\\n  'use strict';\\n  goog.positioning.ClientPosition.call(this, arg1, opt_arg2);\\n};\\ngoog.inherits(\\n    goog.positioning.ViewportClientPosition, goog.positioning.ClientPosition);\\n\\n\\n/**\\n * The last-resort overflow strategy, if the popup fails to fit.\\n * @type {number}\\n * @private\\n */\\ngoog.positioning.ViewportClientPosition.prototype.lastResortOverflow_ = 0;\\n\\n\\n/**\\n * Set the last-resort overflow strategy, if the popup fails to fit.\\n * @param {number} overflow A bitmask of goog.positioning.Overflow strategies.\\n */\\ngoog.positioning.ViewportClientPosition.prototype.setLastResortOverflow =\\n    function(overflow) {\\n  'use strict';\\n  this.lastResortOverflow_ = overflow;\\n};\\n\\n\\n/**\\n * Repositions the popup according to the current state.\\n *\\n * @param {Element} element The DOM element of the popup.\\n * @param {goog.positioning.Corner} popupCorner The corner of the popup\\n *     element that that should be positioned adjacent to the anchorElement.\\n *     One of the goog.positioning.Corner constants.\\n * @param {goog.math.Box=} opt_margin A margin specified in pixels.\\n * @param {goog.math.Size=} opt_preferredSize Preferred size fo the element.\\n * @override\\n */\\ngoog.positioning.ViewportClientPosition.prototype.reposition = function(\\n    element, popupCorner, opt_margin, opt_preferredSize) {\\n  'use strict';\\n  var viewportElt = goog.style.getClientViewportElement(element);\\n  var viewport = goog.style.getVisibleRectForElement(viewportElt);\\n  var scrollEl = goog.dom.getDomHelper(element).getDocumentScrollElement();\\n  var clientPos = new goog.math.Coordinate(\\n      this.coordinate.x + scrollEl.scrollLeft,\\n      this.coordinate.y + scrollEl.scrollTop);\\n\\n  var failXY =\\n      goog.positioning.Overflow.FAIL_X | goog.positioning.Overflow.FAIL_Y;\\n  var corner = popupCorner;\\n\\n  // Try the requested position.\\n  var status = goog.positioning.positionAtCoordinate(\\n      clientPos, element, corner, opt_margin, viewport, failXY,\\n      opt_preferredSize);\\n  if ((status & goog.positioning.OverflowStatus.FAILED) == 0) {\\n    return;\\n  }\\n\\n  // Outside left or right edge of viewport, try try to flip it horizontally.\\n  if (status & goog.positioning.OverflowStatus.FAILED_LEFT ||\\n      status & goog.positioning.OverflowStatus.FAILED_RIGHT) {\\n    corner = goog.positioning.flipCornerHorizontal(corner);\\n  }\\n\\n  // Outside top or bottom edge of viewport, try try to flip it vertically.\\n  if (status & goog.positioning.OverflowStatus.FAILED_TOP ||\\n      status & goog.positioning.OverflowStatus.FAILED_BOTTOM) {\\n    corner = goog.positioning.flipCornerVertical(corner);\\n  }\\n\\n  // Try flipped position.\\n  status = goog.positioning.positionAtCoordinate(\\n      clientPos, element, corner, opt_margin, viewport, failXY,\\n      opt_preferredSize);\\n  if ((status & goog.positioning.OverflowStatus.FAILED) == 0) {\\n    return;\\n  }\\n\\n  // If that failed, the viewport is simply too small to contain the popup.\\n  // Revert to the original position.\\n  goog.positioning.positionAtCoordinate(\\n      clientPos, element, popupCorner, opt_margin, viewport,\\n      this.lastResortOverflow_, opt_preferredSize);\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"requireType\",\"positioning\",\"ViewportClientPosition\",\"goog.positioning.ViewportClientPosition\",\"arg1\",\"opt_arg2\",\"ClientPosition\",\"call\",\"inherits\",\"prototype\",\"lastResortOverflow_\",\"setLastResortOverflow\",\"goog.positioning.ViewportClientPosition.prototype.setLastResortOverflow\",\"overflow\",\"reposition\",\"goog.positioning.ViewportClientPosition.prototype.reposition\",\"element\",\"popupCorner\",\"opt_margin\",\"opt_preferredSize\",\"viewportElt\",\"style\",\"getClientViewportElement\",\"viewport\",\"getVisibleRectForElement\",\"scrollEl\",\"dom\",\"getDomHelper\",\"getDocumentScrollElement\",\"clientPos\",\"math\",\"Coordinate\",\"coordinate\",\"x\",\"scrollLeft\",\"y\",\"scrollTop\",\"failXY\",\"Overflow\",\"FAIL_X\",\"FAIL_Y\",\"corner\",\"status\",\"positionAtCoordinate\",\"OverflowStatus\",\"FAILED\",\"FAILED_LEFT\",\"FAILED_RIGHT\",\"flipCornerHorizontal\",\"FAILED_TOP\",\"FAILED_BOTTOM\",\"flipCornerVertical\"]\n}\n"]