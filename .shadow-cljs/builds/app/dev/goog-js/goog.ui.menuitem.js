["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/ui/menuitem.js"],"~:js","goog.provide(\"goog.ui.MenuItem\");\ngoog.forwardDeclare(\"goog.ui.Menu\");\ngoog.require(\"goog.a11y.aria.Role\");\ngoog.require(\"goog.array\");\ngoog.require(\"goog.dom\");\ngoog.require(\"goog.dom.classlist\");\ngoog.require(\"goog.math.Coordinate\");\ngoog.require(\"goog.string\");\ngoog.require(\"goog.ui.Component\");\ngoog.require(\"goog.ui.Control\");\ngoog.require(\"goog.ui.MenuItemRenderer\");\ngoog.require(\"goog.ui.registry\");\ngoog.requireType(\"goog.events.KeyCodes\");\ngoog.requireType(\"goog.ui.ControlContent\");\ngoog.ui.MenuItem = function(content, opt_model, opt_domHelper, opt_renderer) {\n  goog.ui.Control.call(this, content, opt_renderer || goog.ui.MenuItemRenderer.getInstance(), opt_domHelper);\n  this.setValue(opt_model);\n};\ngoog.inherits(goog.ui.MenuItem, goog.ui.Control);\ngoog.ui.MenuItem.prototype.mnemonicKey_;\ngoog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_ = goog.getCssName(\"goog-menuitem-mnemonic-separator\");\ngoog.ui.MenuItem.ACCELERATOR_CLASS = goog.getCssName(\"goog-menuitem-accel\");\ngoog.ui.MenuItem.prototype.getValue = function() {\n  var model = this.getModel();\n  return model != null ? model : this.getCaption();\n};\ngoog.ui.MenuItem.prototype.setValue = function(value) {\n  this.setModel(value);\n};\ngoog.ui.MenuItem.prototype.setSupportedState = function(state, support) {\n  goog.ui.MenuItem.base(this, \"setSupportedState\", state, support);\n  switch(state) {\n    case goog.ui.Component.State.SELECTED:\n      this.setSelectableInternal_(support);\n      break;\n    case goog.ui.Component.State.CHECKED:\n      this.setCheckableInternal_(support);\n      break;\n  }\n};\ngoog.ui.MenuItem.prototype.setSelectable = function(selectable) {\n  this.setSupportedState(goog.ui.Component.State.SELECTED, selectable);\n};\ngoog.ui.MenuItem.prototype.setSelectableInternal_ = function(selectable) {\n  if (this.isChecked() && !selectable) {\n    this.setChecked(false);\n  }\n  var element = this.getElement();\n  if (element) {\n    this.getRenderer().setSelectable(this, element, selectable);\n  }\n};\ngoog.ui.MenuItem.prototype.setCheckable = function(checkable) {\n  this.setSupportedState(goog.ui.Component.State.CHECKED, checkable);\n};\ngoog.ui.MenuItem.prototype.setCheckableInternal_ = function(checkable) {\n  var element = this.getElement();\n  if (element) {\n    this.getRenderer().setCheckable(this, element, checkable);\n  }\n};\ngoog.ui.MenuItem.prototype.getCaption = function() {\n  var content = this.getContent();\n  if (Array.isArray(content)) {\n    var acceleratorClass = goog.ui.MenuItem.ACCELERATOR_CLASS;\n    var mnemonicWrapClass = goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_;\n    var caption = goog.array.map(content, function(node) {\n      if (goog.dom.isElement(node) && (goog.dom.classlist.contains(node, acceleratorClass) || goog.dom.classlist.contains(node, mnemonicWrapClass))) {\n        return \"\";\n      } else {\n        return goog.dom.getRawTextContent(node);\n      }\n    }).join(\"\");\n    return goog.string.collapseBreakingSpaces(caption);\n  }\n  return goog.ui.MenuItem.superClass_.getCaption.call(this);\n};\ngoog.ui.MenuItem.prototype.getAccelerator = function() {\n  var dom = this.getDomHelper();\n  var content = this.getContent();\n  if (Array.isArray(content)) {\n    var acceleratorEl = goog.array.find(content, function(e) {\n      return goog.dom.classlist.contains(e, goog.ui.MenuItem.ACCELERATOR_CLASS);\n    });\n    if (acceleratorEl) {\n      return dom.getTextContent(acceleratorEl);\n    }\n  }\n  return null;\n};\ngoog.ui.MenuItem.prototype.handleMouseUp = function(e) {\n  var parentMenu = this.getParent();\n  if (parentMenu) {\n    var oldCoords = parentMenu.openingCoords;\n    parentMenu.openingCoords = null;\n    if (oldCoords && typeof e.clientX === \"number\") {\n      var newCoords = new goog.math.Coordinate(e.clientX, e.clientY);\n      if (goog.math.Coordinate.equals(oldCoords, newCoords)) {\n        return;\n      }\n    }\n  }\n  goog.ui.MenuItem.base(this, \"handleMouseUp\", e);\n};\ngoog.ui.MenuItem.prototype.handleKeyEventInternal = function(e) {\n  if (e.keyCode == this.getMnemonic() && this.performActionInternal(e)) {\n    return true;\n  } else {\n    return goog.ui.MenuItem.base(this, \"handleKeyEventInternal\", e);\n  }\n};\ngoog.ui.MenuItem.prototype.setMnemonic = function(key) {\n  this.mnemonicKey_ = key;\n};\ngoog.ui.MenuItem.prototype.getMnemonic = function() {\n  return this.mnemonicKey_;\n};\ngoog.ui.registry.setDecoratorByClassName(goog.ui.MenuItemRenderer.CSS_CLASS, function() {\n  return new goog.ui.MenuItem(null);\n});\ngoog.ui.MenuItem.prototype.getPreferredAriaRole = function() {\n  if (this.isSupportedState(goog.ui.Component.State.CHECKED)) {\n    return goog.a11y.aria.Role.MENU_ITEM_CHECKBOX;\n  }\n  if (this.isSupportedState(goog.ui.Component.State.SELECTED)) {\n    return goog.a11y.aria.Role.MENU_ITEM_RADIO;\n  }\n  return goog.ui.MenuItem.base(this, \"getPreferredAriaRole\");\n};\ngoog.ui.MenuItem.prototype.getParent = function() {\n  return goog.ui.Control.prototype.getParent.call(this);\n};\ngoog.ui.MenuItem.prototype.getParentEventTarget = function() {\n  return goog.ui.Control.prototype.getParentEventTarget.call(this);\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview A class for representing items in menus.\n * @see goog.ui.Menu\n * @see ../demos/menuitem.html\n */\n\ngoog.provide('goog.ui.MenuItem');\n\ngoog.forwardDeclare('goog.ui.Menu');\ngoog.require('goog.a11y.aria.Role');\ngoog.require('goog.array');\ngoog.require('goog.dom');\ngoog.require('goog.dom.classlist');\ngoog.require('goog.math.Coordinate');\ngoog.require('goog.string');\ngoog.require('goog.ui.Component');\ngoog.require('goog.ui.Control');\ngoog.require('goog.ui.MenuItemRenderer');\ngoog.require('goog.ui.registry');\ngoog.requireType('goog.events.KeyCodes');\ngoog.requireType('goog.ui.ControlContent');  // circular\n\n\n\n/**\n * Class representing an item in a menu.\n *\n * @param {goog.ui.ControlContent} content Text caption or DOM structure to\n *     display as the content of the item (use to add icons or styling to\n *     menus).\n * @param {*=} opt_model Data/model associated with the menu item.\n * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for\n *     document interactions.\n * @param {goog.ui.MenuItemRenderer=} opt_renderer Optional renderer.\n * @constructor\n * @extends {goog.ui.Control}\n */\ngoog.ui.MenuItem = function(content, opt_model, opt_domHelper, opt_renderer) {\n  'use strict';\n  goog.ui.Control.call(\n      this, content, opt_renderer || goog.ui.MenuItemRenderer.getInstance(),\n      opt_domHelper);\n  this.setValue(opt_model);\n};\ngoog.inherits(goog.ui.MenuItem, goog.ui.Control);\n\n\n/**\n * The access key for this menu item. This key allows the user to quickly\n * trigger this item's action with they keyboard. For example, setting the\n * mnenomic key to 70 (F), when the user opens the menu and hits \"F,\" the\n * menu item is triggered.\n *\n * @type {goog.events.KeyCodes}\n * @private\n */\ngoog.ui.MenuItem.prototype.mnemonicKey_;\n\n\n/**\n * The class set on an element that contains a parenthetical mnemonic key hint.\n * Parenthetical hints are added to items in which the mnemonic key is not found\n * within the menu item's caption itself. For example, if you have a menu item\n * with the caption \"Record,\" but its mnemonic key is \"I\", the caption displayed\n * in the menu will appear as \"Record (I)\".\n *\n * @type {string}\n * @private\n */\ngoog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_ =\n    goog.getCssName('goog-menuitem-mnemonic-separator');\n\n\n/**\n * The class set on an element that contains a keyboard accelerator hint.\n * @type {string}\n */\ngoog.ui.MenuItem.ACCELERATOR_CLASS = goog.getCssName('goog-menuitem-accel');\n\n\n// goog.ui.Component and goog.ui.Control implementation.\n\n\n/**\n * Returns the value associated with the menu item.  The default implementation\n * returns the model object associated with the item (if any), or its caption.\n * @return {*} Value associated with the menu item, if any, or its caption.\n */\ngoog.ui.MenuItem.prototype.getValue = function() {\n  'use strict';\n  var model = this.getModel();\n  return model != null ? model : this.getCaption();\n};\n\n\n/**\n * Sets the value associated with the menu item.  The default implementation\n * stores the value as the model of the menu item.\n * @param {*} value Value to be associated with the menu item.\n */\ngoog.ui.MenuItem.prototype.setValue = function(value) {\n  'use strict';\n  this.setModel(value);\n};\n\n\n/** @override */\ngoog.ui.MenuItem.prototype.setSupportedState = function(state, support) {\n  'use strict';\n  goog.ui.MenuItem.base(this, 'setSupportedState', state, support);\n  switch (state) {\n    case goog.ui.Component.State.SELECTED:\n      this.setSelectableInternal_(support);\n      break;\n    case goog.ui.Component.State.CHECKED:\n      this.setCheckableInternal_(support);\n      break;\n  }\n};\n\n\n/**\n * Sets the menu item to be selectable or not.  Set to true for menu items\n * that represent selectable options.\n * @param {boolean} selectable Whether the menu item is selectable.\n */\ngoog.ui.MenuItem.prototype.setSelectable = function(selectable) {\n  'use strict';\n  this.setSupportedState(goog.ui.Component.State.SELECTED, selectable);\n};\n\n\n/**\n * Sets the menu item to be selectable or not.\n * @param {boolean} selectable  Whether the menu item is selectable.\n * @private\n */\ngoog.ui.MenuItem.prototype.setSelectableInternal_ = function(selectable) {\n  'use strict';\n  if (this.isChecked() && !selectable) {\n    this.setChecked(false);\n  }\n\n  var element = this.getElement();\n  if (element) {\n    this.getRenderer().setSelectable(this, element, selectable);\n  }\n};\n\n\n/**\n * Sets the menu item to be checkable or not.  Set to true for menu items\n * that represent checkable options.\n * @param {boolean} checkable Whether the menu item is checkable.\n */\ngoog.ui.MenuItem.prototype.setCheckable = function(checkable) {\n  'use strict';\n  this.setSupportedState(goog.ui.Component.State.CHECKED, checkable);\n};\n\n\n/**\n * Sets the menu item to be checkable or not.\n * @param {boolean} checkable Whether the menu item is checkable.\n * @private\n */\ngoog.ui.MenuItem.prototype.setCheckableInternal_ = function(checkable) {\n  'use strict';\n  var element = this.getElement();\n  if (element) {\n    this.getRenderer().setCheckable(this, element, checkable);\n  }\n};\n\n\n/**\n * Returns the text caption of the component while ignoring accelerators.\n * @override\n */\ngoog.ui.MenuItem.prototype.getCaption = function() {\n  'use strict';\n  var content = this.getContent();\n  if (Array.isArray(content)) {\n    var acceleratorClass = goog.ui.MenuItem.ACCELERATOR_CLASS;\n    var mnemonicWrapClass = goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_;\n    var caption =\n        goog.array\n            .map(\n                content,\n                function(node) {\n                  'use strict';\n                  if (goog.dom.isElement(node) &&\n                      (goog.dom.classlist.contains(\n                           /** @type {!Element} */ (node), acceleratorClass) ||\n                       goog.dom.classlist.contains(\n                           /** @type {!Element} */ (node),\n                           mnemonicWrapClass))) {\n                    return '';\n                  } else {\n                    return goog.dom.getRawTextContent(node);\n                  }\n                })\n            .join('');\n    return goog.string.collapseBreakingSpaces(caption);\n  }\n  return goog.ui.MenuItem.superClass_.getCaption.call(this);\n};\n\n\n/**\n * @return {?string} The keyboard accelerator text, or null if the menu item\n *     doesn't have one.\n */\ngoog.ui.MenuItem.prototype.getAccelerator = function() {\n  'use strict';\n  var dom = this.getDomHelper();\n  var content = this.getContent();\n  if (Array.isArray(content)) {\n    var acceleratorEl = goog.array.find(content, function(e) {\n      'use strict';\n      return goog.dom.classlist.contains(\n          /** @type {!Element} */ (e), goog.ui.MenuItem.ACCELERATOR_CLASS);\n    });\n    if (acceleratorEl) {\n      return dom.getTextContent(acceleratorEl);\n    }\n  }\n  return null;\n};\n\n\n/** @override */\ngoog.ui.MenuItem.prototype.handleMouseUp = function(e) {\n  'use strict';\n  var parentMenu = /** @type {goog.ui.Menu} */ (this.getParent());\n\n  if (parentMenu) {\n    var oldCoords = parentMenu.openingCoords;\n    // Clear out the saved opening coords immediately so they're not used twice.\n    parentMenu.openingCoords = null;\n\n    if (oldCoords && typeof e.clientX === 'number') {\n      var newCoords = new goog.math.Coordinate(e.clientX, e.clientY);\n      if (goog.math.Coordinate.equals(oldCoords, newCoords)) {\n        // This menu was opened by a mousedown and we're handling the consequent\n        // mouseup. The coords haven't changed, meaning this was a simple click,\n        // not a click and drag. Don't do the usual behavior because the menu\n        // just popped up under the mouse and the user didn't mean to activate\n        // this item.\n        return;\n      }\n    }\n  }\n\n  goog.ui.MenuItem.base(this, 'handleMouseUp', e);\n};\n\n\n/** @override */\ngoog.ui.MenuItem.prototype.handleKeyEventInternal = function(e) {\n  'use strict';\n  if (e.keyCode == this.getMnemonic() && this.performActionInternal(e)) {\n    return true;\n  } else {\n    return goog.ui.MenuItem.base(this, 'handleKeyEventInternal', e);\n  }\n};\n\n\n/**\n * Sets the mnemonic key code. The mnemonic is the key associated with this\n * action.\n * @param {goog.events.KeyCodes} key The key code.\n */\ngoog.ui.MenuItem.prototype.setMnemonic = function(key) {\n  'use strict';\n  this.mnemonicKey_ = key;\n};\n\n\n/**\n * Gets the mnemonic key code. The mnemonic is the key associated with this\n * action.\n * @return {goog.events.KeyCodes} The key code of the mnemonic key.\n */\ngoog.ui.MenuItem.prototype.getMnemonic = function() {\n  'use strict';\n  return this.mnemonicKey_;\n};\n\n\n// Register a decorator factory function for goog.ui.MenuItems.\ngoog.ui.registry.setDecoratorByClassName(\n    goog.ui.MenuItemRenderer.CSS_CLASS, function() {\n      'use strict';\n      // MenuItem defaults to using MenuItemRenderer.\n      return new goog.ui.MenuItem(null);\n    });\n\n\n/**\n * @override\n */\ngoog.ui.MenuItem.prototype.getPreferredAriaRole = function() {\n  'use strict';\n  if (this.isSupportedState(goog.ui.Component.State.CHECKED)) {\n    return goog.a11y.aria.Role.MENU_ITEM_CHECKBOX;\n  }\n  if (this.isSupportedState(goog.ui.Component.State.SELECTED)) {\n    return goog.a11y.aria.Role.MENU_ITEM_RADIO;\n  }\n  return goog.ui.MenuItem.base(this, 'getPreferredAriaRole');\n};\n\n\n/**\n * @override\n * @return {goog.ui.Menu}\n */\ngoog.ui.MenuItem.prototype.getParent = function() {\n  'use strict';\n  return /** @type {goog.ui.Menu} */ (\n      goog.ui.Control.prototype.getParent.call(this));\n};\n\n\n/**\n * @override\n * @return {goog.ui.Menu}\n */\ngoog.ui.MenuItem.prototype.getParentEventTarget = function() {\n  'use strict';\n  return /** @type {goog.ui.Menu} */ (\n      goog.ui.Control.prototype.getParentEventTarget.call(this));\n};\n","~:compiled-at",1669742028857,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.ui.menuitem.js\",\n\"lineCount\":136,\n\"mappings\":\"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\",\n\"sources\":[\"goog/ui/menuitem.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview A class for representing items in menus.\\n * @see goog.ui.Menu\\n * @see ../demos/menuitem.html\\n */\\n\\ngoog.provide('goog.ui.MenuItem');\\n\\ngoog.forwardDeclare('goog.ui.Menu');\\ngoog.require('goog.a11y.aria.Role');\\ngoog.require('goog.array');\\ngoog.require('goog.dom');\\ngoog.require('goog.dom.classlist');\\ngoog.require('goog.math.Coordinate');\\ngoog.require('goog.string');\\ngoog.require('goog.ui.Component');\\ngoog.require('goog.ui.Control');\\ngoog.require('goog.ui.MenuItemRenderer');\\ngoog.require('goog.ui.registry');\\ngoog.requireType('goog.events.KeyCodes');\\ngoog.requireType('goog.ui.ControlContent');  // circular\\n\\n\\n\\n/**\\n * Class representing an item in a menu.\\n *\\n * @param {goog.ui.ControlContent} content Text caption or DOM structure to\\n *     display as the content of the item (use to add icons or styling to\\n *     menus).\\n * @param {*=} opt_model Data/model associated with the menu item.\\n * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for\\n *     document interactions.\\n * @param {goog.ui.MenuItemRenderer=} opt_renderer Optional renderer.\\n * @constructor\\n * @extends {goog.ui.Control}\\n */\\ngoog.ui.MenuItem = function(content, opt_model, opt_domHelper, opt_renderer) {\\n  'use strict';\\n  goog.ui.Control.call(\\n      this, content, opt_renderer || goog.ui.MenuItemRenderer.getInstance(),\\n      opt_domHelper);\\n  this.setValue(opt_model);\\n};\\ngoog.inherits(goog.ui.MenuItem, goog.ui.Control);\\n\\n\\n/**\\n * The access key for this menu item. This key allows the user to quickly\\n * trigger this item's action with they keyboard. For example, setting the\\n * mnenomic key to 70 (F), when the user opens the menu and hits \\\"F,\\\" the\\n * menu item is triggered.\\n *\\n * @type {goog.events.KeyCodes}\\n * @private\\n */\\ngoog.ui.MenuItem.prototype.mnemonicKey_;\\n\\n\\n/**\\n * The class set on an element that contains a parenthetical mnemonic key hint.\\n * Parenthetical hints are added to items in which the mnemonic key is not found\\n * within the menu item's caption itself. For example, if you have a menu item\\n * with the caption \\\"Record,\\\" but its mnemonic key is \\\"I\\\", the caption displayed\\n * in the menu will appear as \\\"Record (I)\\\".\\n *\\n * @type {string}\\n * @private\\n */\\ngoog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_ =\\n    goog.getCssName('goog-menuitem-mnemonic-separator');\\n\\n\\n/**\\n * The class set on an element that contains a keyboard accelerator hint.\\n * @type {string}\\n */\\ngoog.ui.MenuItem.ACCELERATOR_CLASS = goog.getCssName('goog-menuitem-accel');\\n\\n\\n// goog.ui.Component and goog.ui.Control implementation.\\n\\n\\n/**\\n * Returns the value associated with the menu item.  The default implementation\\n * returns the model object associated with the item (if any), or its caption.\\n * @return {*} Value associated with the menu item, if any, or its caption.\\n */\\ngoog.ui.MenuItem.prototype.getValue = function() {\\n  'use strict';\\n  var model = this.getModel();\\n  return model != null ? model : this.getCaption();\\n};\\n\\n\\n/**\\n * Sets the value associated with the menu item.  The default implementation\\n * stores the value as the model of the menu item.\\n * @param {*} value Value to be associated with the menu item.\\n */\\ngoog.ui.MenuItem.prototype.setValue = function(value) {\\n  'use strict';\\n  this.setModel(value);\\n};\\n\\n\\n/** @override */\\ngoog.ui.MenuItem.prototype.setSupportedState = function(state, support) {\\n  'use strict';\\n  goog.ui.MenuItem.base(this, 'setSupportedState', state, support);\\n  switch (state) {\\n    case goog.ui.Component.State.SELECTED:\\n      this.setSelectableInternal_(support);\\n      break;\\n    case goog.ui.Component.State.CHECKED:\\n      this.setCheckableInternal_(support);\\n      break;\\n  }\\n};\\n\\n\\n/**\\n * Sets the menu item to be selectable or not.  Set to true for menu items\\n * that represent selectable options.\\n * @param {boolean} selectable Whether the menu item is selectable.\\n */\\ngoog.ui.MenuItem.prototype.setSelectable = function(selectable) {\\n  'use strict';\\n  this.setSupportedState(goog.ui.Component.State.SELECTED, selectable);\\n};\\n\\n\\n/**\\n * Sets the menu item to be selectable or not.\\n * @param {boolean} selectable  Whether the menu item is selectable.\\n * @private\\n */\\ngoog.ui.MenuItem.prototype.setSelectableInternal_ = function(selectable) {\\n  'use strict';\\n  if (this.isChecked() && !selectable) {\\n    this.setChecked(false);\\n  }\\n\\n  var element = this.getElement();\\n  if (element) {\\n    this.getRenderer().setSelectable(this, element, selectable);\\n  }\\n};\\n\\n\\n/**\\n * Sets the menu item to be checkable or not.  Set to true for menu items\\n * that represent checkable options.\\n * @param {boolean} checkable Whether the menu item is checkable.\\n */\\ngoog.ui.MenuItem.prototype.setCheckable = function(checkable) {\\n  'use strict';\\n  this.setSupportedState(goog.ui.Component.State.CHECKED, checkable);\\n};\\n\\n\\n/**\\n * Sets the menu item to be checkable or not.\\n * @param {boolean} checkable Whether the menu item is checkable.\\n * @private\\n */\\ngoog.ui.MenuItem.prototype.setCheckableInternal_ = function(checkable) {\\n  'use strict';\\n  var element = this.getElement();\\n  if (element) {\\n    this.getRenderer().setCheckable(this, element, checkable);\\n  }\\n};\\n\\n\\n/**\\n * Returns the text caption of the component while ignoring accelerators.\\n * @override\\n */\\ngoog.ui.MenuItem.prototype.getCaption = function() {\\n  'use strict';\\n  var content = this.getContent();\\n  if (Array.isArray(content)) {\\n    var acceleratorClass = goog.ui.MenuItem.ACCELERATOR_CLASS;\\n    var mnemonicWrapClass = goog.ui.MenuItem.MNEMONIC_WRAPPER_CLASS_;\\n    var caption =\\n        goog.array\\n            .map(\\n                content,\\n                function(node) {\\n                  'use strict';\\n                  if (goog.dom.isElement(node) &&\\n                      (goog.dom.classlist.contains(\\n                           /** @type {!Element} */ (node), acceleratorClass) ||\\n                       goog.dom.classlist.contains(\\n                           /** @type {!Element} */ (node),\\n                           mnemonicWrapClass))) {\\n                    return '';\\n                  } else {\\n                    return goog.dom.getRawTextContent(node);\\n                  }\\n                })\\n            .join('');\\n    return goog.string.collapseBreakingSpaces(caption);\\n  }\\n  return goog.ui.MenuItem.superClass_.getCaption.call(this);\\n};\\n\\n\\n/**\\n * @return {?string} The keyboard accelerator text, or null if the menu item\\n *     doesn't have one.\\n */\\ngoog.ui.MenuItem.prototype.getAccelerator = function() {\\n  'use strict';\\n  var dom = this.getDomHelper();\\n  var content = this.getContent();\\n  if (Array.isArray(content)) {\\n    var acceleratorEl = goog.array.find(content, function(e) {\\n      'use strict';\\n      return goog.dom.classlist.contains(\\n          /** @type {!Element} */ (e), goog.ui.MenuItem.ACCELERATOR_CLASS);\\n    });\\n    if (acceleratorEl) {\\n      return dom.getTextContent(acceleratorEl);\\n    }\\n  }\\n  return null;\\n};\\n\\n\\n/** @override */\\ngoog.ui.MenuItem.prototype.handleMouseUp = function(e) {\\n  'use strict';\\n  var parentMenu = /** @type {goog.ui.Menu} */ (this.getParent());\\n\\n  if (parentMenu) {\\n    var oldCoords = parentMenu.openingCoords;\\n    // Clear out the saved opening coords immediately so they're not used twice.\\n    parentMenu.openingCoords = null;\\n\\n    if (oldCoords && typeof e.clientX === 'number') {\\n      var newCoords = new goog.math.Coordinate(e.clientX, e.clientY);\\n      if (goog.math.Coordinate.equals(oldCoords, newCoords)) {\\n        // This menu was opened by a mousedown and we're handling the consequent\\n        // mouseup. The coords haven't changed, meaning this was a simple click,\\n        // not a click and drag. Don't do the usual behavior because the menu\\n        // just popped up under the mouse and the user didn't mean to activate\\n        // this item.\\n        return;\\n      }\\n    }\\n  }\\n\\n  goog.ui.MenuItem.base(this, 'handleMouseUp', e);\\n};\\n\\n\\n/** @override */\\ngoog.ui.MenuItem.prototype.handleKeyEventInternal = function(e) {\\n  'use strict';\\n  if (e.keyCode == this.getMnemonic() && this.performActionInternal(e)) {\\n    return true;\\n  } else {\\n    return goog.ui.MenuItem.base(this, 'handleKeyEventInternal', e);\\n  }\\n};\\n\\n\\n/**\\n * Sets the mnemonic key code. The mnemonic is the key associated with this\\n * action.\\n * @param {goog.events.KeyCodes} key The key code.\\n */\\ngoog.ui.MenuItem.prototype.setMnemonic = function(key) {\\n  'use strict';\\n  this.mnemonicKey_ = key;\\n};\\n\\n\\n/**\\n * Gets the mnemonic key code. The mnemonic is the key associated with this\\n * action.\\n * @return {goog.events.KeyCodes} The key code of the mnemonic key.\\n */\\ngoog.ui.MenuItem.prototype.getMnemonic = function() {\\n  'use strict';\\n  return this.mnemonicKey_;\\n};\\n\\n\\n// Register a decorator factory function for goog.ui.MenuItems.\\ngoog.ui.registry.setDecoratorByClassName(\\n    goog.ui.MenuItemRenderer.CSS_CLASS, function() {\\n      'use strict';\\n      // MenuItem defaults to using MenuItemRenderer.\\n      return new goog.ui.MenuItem(null);\\n    });\\n\\n\\n/**\\n * @override\\n */\\ngoog.ui.MenuItem.prototype.getPreferredAriaRole = function() {\\n  'use strict';\\n  if (this.isSupportedState(goog.ui.Component.State.CHECKED)) {\\n    return goog.a11y.aria.Role.MENU_ITEM_CHECKBOX;\\n  }\\n  if (this.isSupportedState(goog.ui.Component.State.SELECTED)) {\\n    return goog.a11y.aria.Role.MENU_ITEM_RADIO;\\n  }\\n  return goog.ui.MenuItem.base(this, 'getPreferredAriaRole');\\n};\\n\\n\\n/**\\n * @override\\n * @return {goog.ui.Menu}\\n */\\ngoog.ui.MenuItem.prototype.getParent = function() {\\n  'use strict';\\n  return /** @type {goog.ui.Menu} */ (\\n      goog.ui.Control.prototype.getParent.call(this));\\n};\\n\\n\\n/**\\n * @override\\n * @return {goog.ui.Menu}\\n */\\ngoog.ui.MenuItem.prototype.getParentEventTarget = function() {\\n  'use strict';\\n  return /** @type {goog.ui.Menu} */ (\\n      goog.ui.Control.prototype.getParentEventTarget.call(this));\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"forwardDeclare\",\"require\",\"requireType\",\"ui\",\"MenuItem\",\"goog.ui.MenuItem\",\"content\",\"opt_model\",\"opt_domHelper\",\"opt_renderer\",\"Control\",\"call\",\"MenuItemRenderer\",\"getInstance\",\"setValue\",\"inherits\",\"prototype\",\"mnemonicKey_\",\"MNEMONIC_WRAPPER_CLASS_\",\"getCssName\",\"ACCELERATOR_CLASS\",\"getValue\",\"goog.ui.MenuItem.prototype.getValue\",\"model\",\"getModel\",\"getCaption\",\"goog.ui.MenuItem.prototype.setValue\",\"value\",\"setModel\",\"setSupportedState\",\"goog.ui.MenuItem.prototype.setSupportedState\",\"state\",\"support\",\"base\",\"Component\",\"State\",\"SELECTED\",\"setSelectableInternal_\",\"CHECKED\",\"setCheckableInternal_\",\"setSelectable\",\"goog.ui.MenuItem.prototype.setSelectable\",\"selectable\",\"goog.ui.MenuItem.prototype.setSelectableInternal_\",\"isChecked\",\"setChecked\",\"element\",\"getElement\",\"getRenderer\",\"setCheckable\",\"goog.ui.MenuItem.prototype.setCheckable\",\"checkable\",\"goog.ui.MenuItem.prototype.setCheckableInternal_\",\"goog.ui.MenuItem.prototype.getCaption\",\"getContent\",\"Array\",\"isArray\",\"acceleratorClass\",\"mnemonicWrapClass\",\"caption\",\"array\",\"map\",\"node\",\"dom\",\"isElement\",\"classlist\",\"contains\",\"getRawTextContent\",\"join\",\"string\",\"collapseBreakingSpaces\",\"superClass_\",\"getAccelerator\",\"goog.ui.MenuItem.prototype.getAccelerator\",\"getDomHelper\",\"acceleratorEl\",\"find\",\"e\",\"getTextContent\",\"handleMouseUp\",\"goog.ui.MenuItem.prototype.handleMouseUp\",\"parentMenu\",\"getParent\",\"oldCoords\",\"openingCoords\",\"clientX\",\"newCoords\",\"math\",\"Coordinate\",\"clientY\",\"equals\",\"handleKeyEventInternal\",\"goog.ui.MenuItem.prototype.handleKeyEventInternal\",\"keyCode\",\"getMnemonic\",\"performActionInternal\",\"setMnemonic\",\"goog.ui.MenuItem.prototype.setMnemonic\",\"key\",\"goog.ui.MenuItem.prototype.getMnemonic\",\"registry\",\"setDecoratorByClassName\",\"CSS_CLASS\",\"getPreferredAriaRole\",\"goog.ui.MenuItem.prototype.getPreferredAriaRole\",\"isSupportedState\",\"a11y\",\"aria\",\"Role\",\"MENU_ITEM_CHECKBOX\",\"MENU_ITEM_RADIO\",\"goog.ui.MenuItem.prototype.getParent\",\"getParentEventTarget\",\"goog.ui.MenuItem.prototype.getParentEventTarget\"]\n}\n"]