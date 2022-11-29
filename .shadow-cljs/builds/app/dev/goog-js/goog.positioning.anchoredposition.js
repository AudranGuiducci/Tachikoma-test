["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/positioning/anchoredposition.js"],"~:js","goog.provide(\"goog.positioning.AnchoredPosition\");\ngoog.require(\"goog.positioning\");\ngoog.require(\"goog.positioning.AbstractPosition\");\ngoog.requireType(\"goog.math.Box\");\ngoog.requireType(\"goog.math.Size\");\ngoog.positioning.AnchoredPosition = function(anchorElement, corner, opt_overflow) {\n  this.element = anchorElement;\n  this.corner = corner;\n  this.overflow_ = opt_overflow;\n};\ngoog.inherits(goog.positioning.AnchoredPosition, goog.positioning.AbstractPosition);\ngoog.positioning.AnchoredPosition.prototype.reposition = function(movableElement, movableCorner, opt_margin, opt_preferredSize) {\n  goog.positioning.positionAtAnchor(this.element, this.corner, movableElement, movableCorner, undefined, opt_margin, this.overflow_);\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Client positioning class.\n */\n\ngoog.provide('goog.positioning.AnchoredPosition');\n\ngoog.require('goog.positioning');\ngoog.require('goog.positioning.AbstractPosition');\ngoog.requireType('goog.math.Box');\ngoog.requireType('goog.math.Size');\n\n\n\n/**\n * Encapsulates a popup position where the popup is anchored at a corner of\n * an element.\n *\n * When using AnchoredPosition, it is recommended that the popup element\n * specified in the Popup constructor or Popup.setElement be absolutely\n * positioned.\n *\n * @param {Element} anchorElement Element the movable element should be\n *     anchored against.\n * @param {goog.positioning.Corner} corner Corner of anchored element the\n *     movable element should be positioned at.\n * @param {number=} opt_overflow Overflow handling mode. Defaults to IGNORE if\n *     not specified. Bitmap, {@see goog.positioning.Overflow}.\n * @constructor\n * @extends {goog.positioning.AbstractPosition}\n */\ngoog.positioning.AnchoredPosition = function(\n    anchorElement, corner, opt_overflow) {\n  'use strict';\n  /**\n   * Element the movable element should be anchored against.\n   * @type {Element}\n   */\n  this.element = anchorElement;\n\n  /**\n   * Corner of anchored element the movable element should be positioned at.\n   * @type {goog.positioning.Corner}\n   */\n  this.corner = corner;\n\n  /**\n   * Overflow handling mode. Defaults to IGNORE if not specified.\n   * Bitmap, {@see goog.positioning.Overflow}.\n   * @type {number|undefined}\n   * @private\n   */\n  this.overflow_ = opt_overflow;\n};\ngoog.inherits(\n    goog.positioning.AnchoredPosition, goog.positioning.AbstractPosition);\n\n\n/**\n * Repositions the movable element.\n *\n * @param {Element} movableElement Element to position.\n * @param {goog.positioning.Corner} movableCorner Corner of the movable element\n *     that should be positioned adjacent to the anchored element.\n * @param {goog.math.Box=} opt_margin A margin specifin pixels.\n * @param {goog.math.Size=} opt_preferredSize PreferredSize of the\n *     movableElement (unused in this class).\n * @override\n */\ngoog.positioning.AnchoredPosition.prototype.reposition = function(\n    movableElement, movableCorner, opt_margin, opt_preferredSize) {\n  'use strict';\n  goog.positioning.positionAtAnchor(\n      this.element, this.corner, movableElement, movableCorner, undefined,\n      opt_margin, this.overflow_);\n};\n","~:compiled-at",1669742028834,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.positioning.anchoredposition.js\",\n\"lineCount\":15,\n\"mappings\":\"AAUAA,IAAKC,CAAAA,OAAL,CAAa,mCAAb,CAAA;AAEAD,IAAKE,CAAAA,OAAL,CAAa,kBAAb,CAAA;AACAF,IAAKE,CAAAA,OAAL,CAAa,mCAAb,CAAA;AACAF,IAAKG,CAAAA,WAAL,CAAiB,eAAjB,CAAA;AACAH,IAAKG,CAAAA,WAAL,CAAiB,gBAAjB,CAAA;AAqBAH,IAAKI,CAAAA,WAAYC,CAAAA,gBAAjB,GAAoCC,QAAQ,CACxCC,aADwC,EACzBC,MADyB,EACjBC,YADiB,CACH;AAMvC,MAAKC,CAAAA,OAAL,GAAeH,aAAf;AAMA,MAAKC,CAAAA,MAAL,GAAcA,MAAd;AAQA,MAAKG,CAAAA,SAAL,GAAiBF,YAAjB;AApBuC,CADzC;AAuBAT,IAAKY,CAAAA,QAAL,CACIZ,IAAKI,CAAAA,WAAYC,CAAAA,gBADrB,EACuCL,IAAKI,CAAAA,WAAYS,CAAAA,gBADxD,CAAA;AAeAb,IAAKI,CAAAA,WAAYC,CAAAA,gBAAiBS,CAAAA,SAAUC,CAAAA,UAA5C,GAAyDC,QAAQ,CAC7DC,cAD6D,EAC7CC,aAD6C,EAC9BC,UAD8B,EAClBC,iBADkB,CACC;AAEhEpB,MAAKI,CAAAA,WAAYiB,CAAAA,gBAAjB,CACI,IAAKX,CAAAA,OADT,EACkB,IAAKF,CAAAA,MADvB,EAC+BS,cAD/B,EAC+CC,aAD/C,EAC8DI,SAD9D,EAEIH,UAFJ,EAEgB,IAAKR,CAAAA,SAFrB,CAAA;AAFgE,CADlE;;\",\n\"sources\":[\"goog/positioning/anchoredposition.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview Client positioning class.\\n */\\n\\ngoog.provide('goog.positioning.AnchoredPosition');\\n\\ngoog.require('goog.positioning');\\ngoog.require('goog.positioning.AbstractPosition');\\ngoog.requireType('goog.math.Box');\\ngoog.requireType('goog.math.Size');\\n\\n\\n\\n/**\\n * Encapsulates a popup position where the popup is anchored at a corner of\\n * an element.\\n *\\n * When using AnchoredPosition, it is recommended that the popup element\\n * specified in the Popup constructor or Popup.setElement be absolutely\\n * positioned.\\n *\\n * @param {Element} anchorElement Element the movable element should be\\n *     anchored against.\\n * @param {goog.positioning.Corner} corner Corner of anchored element the\\n *     movable element should be positioned at.\\n * @param {number=} opt_overflow Overflow handling mode. Defaults to IGNORE if\\n *     not specified. Bitmap, {@see goog.positioning.Overflow}.\\n * @constructor\\n * @extends {goog.positioning.AbstractPosition}\\n */\\ngoog.positioning.AnchoredPosition = function(\\n    anchorElement, corner, opt_overflow) {\\n  'use strict';\\n  /**\\n   * Element the movable element should be anchored against.\\n   * @type {Element}\\n   */\\n  this.element = anchorElement;\\n\\n  /**\\n   * Corner of anchored element the movable element should be positioned at.\\n   * @type {goog.positioning.Corner}\\n   */\\n  this.corner = corner;\\n\\n  /**\\n   * Overflow handling mode. Defaults to IGNORE if not specified.\\n   * Bitmap, {@see goog.positioning.Overflow}.\\n   * @type {number|undefined}\\n   * @private\\n   */\\n  this.overflow_ = opt_overflow;\\n};\\ngoog.inherits(\\n    goog.positioning.AnchoredPosition, goog.positioning.AbstractPosition);\\n\\n\\n/**\\n * Repositions the movable element.\\n *\\n * @param {Element} movableElement Element to position.\\n * @param {goog.positioning.Corner} movableCorner Corner of the movable element\\n *     that should be positioned adjacent to the anchored element.\\n * @param {goog.math.Box=} opt_margin A margin specifin pixels.\\n * @param {goog.math.Size=} opt_preferredSize PreferredSize of the\\n *     movableElement (unused in this class).\\n * @override\\n */\\ngoog.positioning.AnchoredPosition.prototype.reposition = function(\\n    movableElement, movableCorner, opt_margin, opt_preferredSize) {\\n  'use strict';\\n  goog.positioning.positionAtAnchor(\\n      this.element, this.corner, movableElement, movableCorner, undefined,\\n      opt_margin, this.overflow_);\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"requireType\",\"positioning\",\"AnchoredPosition\",\"goog.positioning.AnchoredPosition\",\"anchorElement\",\"corner\",\"opt_overflow\",\"element\",\"overflow_\",\"inherits\",\"AbstractPosition\",\"prototype\",\"reposition\",\"goog.positioning.AnchoredPosition.prototype.reposition\",\"movableElement\",\"movableCorner\",\"opt_margin\",\"opt_preferredSize\",\"positionAtAnchor\",\"undefined\"]\n}\n"]