["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/ui/separator.js"],"~:js","goog.provide(\"goog.ui.Separator\");\ngoog.require(\"goog.a11y.aria\");\ngoog.require(\"goog.asserts\");\ngoog.require(\"goog.ui.Component\");\ngoog.require(\"goog.ui.Control\");\ngoog.require(\"goog.ui.MenuSeparatorRenderer\");\ngoog.require(\"goog.ui.registry\");\ngoog.requireType(\"goog.dom.DomHelper\");\ngoog.ui.Separator = function(opt_renderer, opt_domHelper) {\n  goog.ui.Control.call(this, null, opt_renderer || goog.ui.MenuSeparatorRenderer.getInstance(), opt_domHelper);\n  this.setSupportedState(goog.ui.Component.State.DISABLED, false);\n  this.setSupportedState(goog.ui.Component.State.HOVER, false);\n  this.setSupportedState(goog.ui.Component.State.ACTIVE, false);\n  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);\n  this.setStateInternal(goog.ui.Component.State.DISABLED);\n};\ngoog.inherits(goog.ui.Separator, goog.ui.Control);\ngoog.ui.Separator.prototype.enterDocument = function() {\n  goog.ui.Separator.superClass_.enterDocument.call(this);\n  var element = this.getElement();\n  goog.asserts.assert(element, \"The DOM element for the separator cannot be null.\");\n  goog.a11y.aria.setRole(element, \"separator\");\n};\ngoog.ui.registry.setDecoratorByClassName(goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {\n  return new goog.ui.Separator();\n});\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview A class for representing a separator, with renderers for both\n * horizontal (menu) and vertical (toolbar) separators.\n */\n\ngoog.provide('goog.ui.Separator');\n\ngoog.require('goog.a11y.aria');\ngoog.require('goog.asserts');\ngoog.require('goog.ui.Component');\ngoog.require('goog.ui.Control');\ngoog.require('goog.ui.MenuSeparatorRenderer');\ngoog.require('goog.ui.registry');\ngoog.requireType('goog.dom.DomHelper');\n\n\n\n/**\n * Class representing a separator.  Although it extends {@link goog.ui.Control},\n * the Separator class doesn't allocate any event handlers, nor does it change\n * its appearance on mouseover, etc.\n * @param {goog.ui.MenuSeparatorRenderer=} opt_renderer Renderer to render or\n *    decorate the separator; defaults to {@link goog.ui.MenuSeparatorRenderer}.\n * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for\n *    document interaction.\n * @constructor\n * @extends {goog.ui.Control}\n */\ngoog.ui.Separator = function(opt_renderer, opt_domHelper) {\n  'use strict';\n  goog.ui.Control.call(\n      this, null, opt_renderer || goog.ui.MenuSeparatorRenderer.getInstance(),\n      opt_domHelper);\n\n  this.setSupportedState(goog.ui.Component.State.DISABLED, false);\n  this.setSupportedState(goog.ui.Component.State.HOVER, false);\n  this.setSupportedState(goog.ui.Component.State.ACTIVE, false);\n  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);\n\n  // Separators are always considered disabled.\n  this.setStateInternal(goog.ui.Component.State.DISABLED);\n};\ngoog.inherits(goog.ui.Separator, goog.ui.Control);\n\n\n/**\n * Configures the component after its DOM has been rendered.  Overrides\n * {@link goog.ui.Control#enterDocument} by making sure no event handler\n * is allocated.\n * @override\n */\ngoog.ui.Separator.prototype.enterDocument = function() {\n  'use strict';\n  goog.ui.Separator.superClass_.enterDocument.call(this);\n  var element = this.getElement();\n  goog.asserts.assert(\n      element, 'The DOM element for the separator cannot be null.');\n  goog.a11y.aria.setRole(element, 'separator');\n};\n\n\n// Register a decorator factory function for goog.ui.MenuSeparators.\ngoog.ui.registry.setDecoratorByClassName(\n    goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {\n      'use strict';\n      // Separator defaults to using MenuSeparatorRenderer.\n      return new goog.ui.Separator();\n    });\n","~:compiled-at",1669734909714,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.ui.separator.js\",\n\"lineCount\":27,\n\"mappings\":\"AAWAA,IAAKC,CAAAA,OAAL,CAAa,mBAAb,CAAA;AAEAD,IAAKE,CAAAA,OAAL,CAAa,gBAAb,CAAA;AACAF,IAAKE,CAAAA,OAAL,CAAa,cAAb,CAAA;AACAF,IAAKE,CAAAA,OAAL,CAAa,mBAAb,CAAA;AACAF,IAAKE,CAAAA,OAAL,CAAa,iBAAb,CAAA;AACAF,IAAKE,CAAAA,OAAL,CAAa,+BAAb,CAAA;AACAF,IAAKE,CAAAA,OAAL,CAAa,kBAAb,CAAA;AACAF,IAAKG,CAAAA,WAAL,CAAiB,oBAAjB,CAAA;AAeAH,IAAKI,CAAAA,EAAGC,CAAAA,SAAR,GAAoBC,QAAQ,CAACC,YAAD,EAAeC,aAAf,CAA8B;AAExDR,MAAKI,CAAAA,EAAGK,CAAAA,OAAQC,CAAAA,IAAhB,CACI,IADJ,EACU,IADV,EACgBH,YADhB,IACgCP,IAAKI,CAAAA,EAAGO,CAAAA,qBAAsBC,CAAAA,WAA9B,EADhC,EAEIJ,aAFJ,CAAA;AAIA,MAAKK,CAAAA,iBAAL,CAAuBb,IAAKI,CAAAA,EAAGU,CAAAA,SAAUC,CAAAA,KAAMC,CAAAA,QAA/C,EAAyD,KAAzD,CAAA;AACA,MAAKH,CAAAA,iBAAL,CAAuBb,IAAKI,CAAAA,EAAGU,CAAAA,SAAUC,CAAAA,KAAME,CAAAA,KAA/C,EAAsD,KAAtD,CAAA;AACA,MAAKJ,CAAAA,iBAAL,CAAuBb,IAAKI,CAAAA,EAAGU,CAAAA,SAAUC,CAAAA,KAAMG,CAAAA,MAA/C,EAAuD,KAAvD,CAAA;AACA,MAAKL,CAAAA,iBAAL,CAAuBb,IAAKI,CAAAA,EAAGU,CAAAA,SAAUC,CAAAA,KAAMI,CAAAA,OAA/C,EAAwD,KAAxD,CAAA;AAGA,MAAKC,CAAAA,gBAAL,CAAsBpB,IAAKI,CAAAA,EAAGU,CAAAA,SAAUC,CAAAA,KAAMC,CAAAA,QAA9C,CAAA;AAZwD,CAA1D;AAcAhB,IAAKqB,CAAAA,QAAL,CAAcrB,IAAKI,CAAAA,EAAGC,CAAAA,SAAtB,EAAiCL,IAAKI,CAAAA,EAAGK,CAAAA,OAAzC,CAAA;AASAT,IAAKI,CAAAA,EAAGC,CAAAA,SAAUiB,CAAAA,SAAUC,CAAAA,aAA5B,GAA4CC,QAAQ,EAAG;AAErDxB,MAAKI,CAAAA,EAAGC,CAAAA,SAAUoB,CAAAA,WAAYF,CAAAA,aAAcb,CAAAA,IAA5C,CAAiD,IAAjD,CAAA;AACA,MAAIgB,UAAU,IAAKC,CAAAA,UAAL,EAAd;AACA3B,MAAK4B,CAAAA,OAAQC,CAAAA,MAAb,CACIH,OADJ,EACa,mDADb,CAAA;AAEA1B,MAAK8B,CAAAA,IAAKC,CAAAA,IAAKC,CAAAA,OAAf,CAAuBN,OAAvB,EAAgC,WAAhC,CAAA;AANqD,CAAvD;AAWA1B,IAAKI,CAAAA,EAAG6B,CAAAA,QAASC,CAAAA,uBAAjB,CACIlC,IAAKI,CAAAA,EAAGO,CAAAA,qBAAsBwB,CAAAA,SADlC,EAC6C,QAAQ,EAAG;AAGlD,SAAO,IAAInC,IAAKI,CAAAA,EAAGC,CAAAA,SAAZ,EAAP;AAHkD,CADxD,CAAA;;\",\n\"sources\":[\"goog/ui/separator.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview A class for representing a separator, with renderers for both\\n * horizontal (menu) and vertical (toolbar) separators.\\n */\\n\\ngoog.provide('goog.ui.Separator');\\n\\ngoog.require('goog.a11y.aria');\\ngoog.require('goog.asserts');\\ngoog.require('goog.ui.Component');\\ngoog.require('goog.ui.Control');\\ngoog.require('goog.ui.MenuSeparatorRenderer');\\ngoog.require('goog.ui.registry');\\ngoog.requireType('goog.dom.DomHelper');\\n\\n\\n\\n/**\\n * Class representing a separator.  Although it extends {@link goog.ui.Control},\\n * the Separator class doesn't allocate any event handlers, nor does it change\\n * its appearance on mouseover, etc.\\n * @param {goog.ui.MenuSeparatorRenderer=} opt_renderer Renderer to render or\\n *    decorate the separator; defaults to {@link goog.ui.MenuSeparatorRenderer}.\\n * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for\\n *    document interaction.\\n * @constructor\\n * @extends {goog.ui.Control}\\n */\\ngoog.ui.Separator = function(opt_renderer, opt_domHelper) {\\n  'use strict';\\n  goog.ui.Control.call(\\n      this, null, opt_renderer || goog.ui.MenuSeparatorRenderer.getInstance(),\\n      opt_domHelper);\\n\\n  this.setSupportedState(goog.ui.Component.State.DISABLED, false);\\n  this.setSupportedState(goog.ui.Component.State.HOVER, false);\\n  this.setSupportedState(goog.ui.Component.State.ACTIVE, false);\\n  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);\\n\\n  // Separators are always considered disabled.\\n  this.setStateInternal(goog.ui.Component.State.DISABLED);\\n};\\ngoog.inherits(goog.ui.Separator, goog.ui.Control);\\n\\n\\n/**\\n * Configures the component after its DOM has been rendered.  Overrides\\n * {@link goog.ui.Control#enterDocument} by making sure no event handler\\n * is allocated.\\n * @override\\n */\\ngoog.ui.Separator.prototype.enterDocument = function() {\\n  'use strict';\\n  goog.ui.Separator.superClass_.enterDocument.call(this);\\n  var element = this.getElement();\\n  goog.asserts.assert(\\n      element, 'The DOM element for the separator cannot be null.');\\n  goog.a11y.aria.setRole(element, 'separator');\\n};\\n\\n\\n// Register a decorator factory function for goog.ui.MenuSeparators.\\ngoog.ui.registry.setDecoratorByClassName(\\n    goog.ui.MenuSeparatorRenderer.CSS_CLASS, function() {\\n      'use strict';\\n      // Separator defaults to using MenuSeparatorRenderer.\\n      return new goog.ui.Separator();\\n    });\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"requireType\",\"ui\",\"Separator\",\"goog.ui.Separator\",\"opt_renderer\",\"opt_domHelper\",\"Control\",\"call\",\"MenuSeparatorRenderer\",\"getInstance\",\"setSupportedState\",\"Component\",\"State\",\"DISABLED\",\"HOVER\",\"ACTIVE\",\"FOCUSED\",\"setStateInternal\",\"inherits\",\"prototype\",\"enterDocument\",\"goog.ui.Separator.prototype.enterDocument\",\"superClass_\",\"element\",\"getElement\",\"asserts\",\"assert\",\"a11y\",\"aria\",\"setRole\",\"registry\",\"setDecoratorByClassName\",\"CSS_CLASS\"]\n}\n"]