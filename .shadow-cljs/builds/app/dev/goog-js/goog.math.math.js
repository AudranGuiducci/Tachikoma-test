["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/math/math.js"],"~:js","goog.provide(\"goog.math\");\ngoog.require(\"goog.asserts\");\ngoog.math.randomInt = function(a) {\n  return Math.floor(Math.random() * a);\n};\ngoog.math.uniformRandom = function(a, b) {\n  return a + Math.random() * (b - a);\n};\ngoog.math.clamp = function(value, min, max) {\n  return Math.min(Math.max(value, min), max);\n};\ngoog.math.modulo = function(a, b) {\n  var r = a % b;\n  return r * b < 0 ? r + b : r;\n};\ngoog.math.lerp = function(a, b, x) {\n  return a + x * (b - a);\n};\ngoog.math.nearlyEquals = function(a, b, opt_tolerance) {\n  return Math.abs(a - b) <= (opt_tolerance || 0.000001);\n};\ngoog.math.standardAngle = function(angle) {\n  return goog.math.modulo(angle, 360);\n};\ngoog.math.standardAngleInRadians = function(angle) {\n  return goog.math.modulo(angle, 2 * Math.PI);\n};\ngoog.math.toRadians = function(angleDegrees) {\n  return angleDegrees * Math.PI / 180;\n};\ngoog.math.toDegrees = function(angleRadians) {\n  return angleRadians * 180 / Math.PI;\n};\ngoog.math.angleDx = function(degrees, radius) {\n  return radius * Math.cos(goog.math.toRadians(degrees));\n};\ngoog.math.angleDy = function(degrees, radius) {\n  return radius * Math.sin(goog.math.toRadians(degrees));\n};\ngoog.math.angle = function(x1, y1, x2, y2) {\n  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(y2 - y1, x2 - x1)));\n};\ngoog.math.angleDifference = function(startAngle, endAngle) {\n  var d = goog.math.standardAngle(endAngle) - goog.math.standardAngle(startAngle);\n  if (d > 180) {\n    d = d - 360;\n  } else if (d <= -180) {\n    d = 360 + d;\n  }\n  return d;\n};\ngoog.math.sign = function(x) {\n  if (x > 0) {\n    return 1;\n  }\n  if (x < 0) {\n    return -1;\n  }\n  return x;\n};\ngoog.math.longestCommonSubsequence = function(array1, array2, opt_compareFn, opt_collectorFn) {\n  var compare = opt_compareFn || function(a, b) {\n    return a == b;\n  };\n  var collect = opt_collectorFn || function(i1, i2) {\n    return array1[i1];\n  };\n  var length1 = array1.length;\n  var length2 = array2.length;\n  var arr = [];\n  for (var i = 0; i < length1 + 1; i++) {\n    arr[i] = [];\n    arr[i][0] = 0;\n  }\n  for (var j = 0; j < length2 + 1; j++) {\n    arr[0][j] = 0;\n  }\n  for (i = 1; i <= length1; i++) {\n    for (j = 1; j <= length2; j++) {\n      if (compare(array1[i - 1], array2[j - 1])) {\n        arr[i][j] = arr[i - 1][j - 1] + 1;\n      } else {\n        arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);\n      }\n    }\n  }\n  var result = [];\n  var i = length1, j = length2;\n  while (i > 0 && j > 0) {\n    if (compare(array1[i - 1], array2[j - 1])) {\n      result.unshift(collect(i - 1, j - 1));\n      i--;\n      j--;\n    } else {\n      if (arr[i - 1][j] > arr[i][j - 1]) {\n        i--;\n      } else {\n        j--;\n      }\n    }\n  }\n  return result;\n};\ngoog.math.sum = function(var_args) {\n  return Array.prototype.reduce.call(arguments, function(sum, value) {\n    return sum + value;\n  }, 0);\n};\ngoog.math.average = function(var_args) {\n  return goog.math.sum.apply(null, arguments) / arguments.length;\n};\ngoog.math.sampleVariance = function(var_args) {\n  var sampleSize = arguments.length;\n  if (sampleSize < 2) {\n    return 0;\n  }\n  var mean = goog.math.average.apply(null, arguments);\n  var variance = goog.math.sum.apply(null, Array.prototype.map.call(arguments, function(val) {\n    return Math.pow(val - mean, 2);\n  })) / (sampleSize - 1);\n  return variance;\n};\ngoog.math.standardDeviation = function(var_args) {\n  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));\n};\ngoog.math.isInt = function(num) {\n  return isFinite(num) && num % 1 == 0;\n};\ngoog.math.isFiniteNumber = function(num) {\n  return isFinite(num);\n};\ngoog.math.isNegativeZero = function(num) {\n  return num == 0 && 1 / num < 0;\n};\ngoog.math.log10Floor = function(num) {\n  if (num > 0) {\n    var x = Math.round(Math.log(num) * Math.LOG10E);\n    return x - (parseFloat(\"1e\" + x) > num ? 1 : 0);\n  }\n  return num == 0 ? -Infinity : NaN;\n};\ngoog.math.safeFloor = function(num, opt_epsilon) {\n  goog.asserts.assert(opt_epsilon === undefined || opt_epsilon > 0);\n  return Math.floor(num + (opt_epsilon || 2e-15));\n};\ngoog.math.safeCeil = function(num, opt_epsilon) {\n  goog.asserts.assert(opt_epsilon === undefined || opt_epsilon > 0);\n  return Math.ceil(num - (opt_epsilon || 2e-15));\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Additional mathematical functions.\n */\n\ngoog.provide('goog.math');\n\ngoog.require('goog.asserts');\n\n\n/**\n * Returns a random integer greater than or equal to 0 and less than `a`.\n * @param {number} a  The upper bound for the random integer (exclusive).\n * @return {number} A random integer N such that 0 <= N < a.\n */\ngoog.math.randomInt = function(a) {\n  'use strict';\n  return Math.floor(Math.random() * a);\n};\n\n\n/**\n * Returns a random number greater than or equal to `a` and less than\n * `b`.\n * @param {number} a  The lower bound for the random number (inclusive).\n * @param {number} b  The upper bound for the random number (exclusive).\n * @return {number} A random number N such that a <= N < b.\n */\ngoog.math.uniformRandom = function(a, b) {\n  'use strict';\n  return a + Math.random() * (b - a);\n};\n\n\n/**\n * Takes a number and clamps it to within the provided bounds.\n * @param {number} value The input number.\n * @param {number} min The minimum value to return.\n * @param {number} max The maximum value to return.\n * @return {number} The input number if it is within bounds, or the nearest\n *     number within the bounds.\n */\ngoog.math.clamp = function(value, min, max) {\n  'use strict';\n  return Math.min(Math.max(value, min), max);\n};\n\n\n/**\n * The % operator in JavaScript returns the remainder of a / b, but differs from\n * some other languages in that the result will have the same sign as the\n * dividend. For example, -1 % 8 == -1, whereas in some other languages\n * (such as Python) the result would be 7. This function emulates the more\n * correct modulo behavior, which is useful for certain applications such as\n * calculating an offset index in a circular list.\n *\n * @param {number} a The dividend.\n * @param {number} b The divisor.\n * @return {number} a % b where the result is between 0 and b (either 0 <= x < b\n *     or b < x <= 0, depending on the sign of b).\n */\ngoog.math.modulo = function(a, b) {\n  'use strict';\n  var r = a % b;\n  // If r and b differ in sign, add b to wrap the result to the correct sign.\n  return (r * b < 0) ? r + b : r;\n};\n\n\n/**\n * Performs linear interpolation between values a and b. Returns the value\n * between a and b proportional to x (when x is between 0 and 1. When x is\n * outside this range, the return value is a linear extrapolation).\n * @param {number} a A number.\n * @param {number} b A number.\n * @param {number} x The proportion between a and b.\n * @return {number} The interpolated value between a and b.\n */\ngoog.math.lerp = function(a, b, x) {\n  'use strict';\n  return a + x * (b - a);\n};\n\n\n/**\n * Tests whether the two values are equal to each other, within a certain\n * tolerance to adjust for floating point errors.\n * @param {number} a A number.\n * @param {number} b A number.\n * @param {number=} opt_tolerance Optional tolerance range. Defaults\n *     to 0.000001. If specified, should be greater than 0.\n * @return {boolean} Whether `a` and `b` are nearly equal.\n */\ngoog.math.nearlyEquals = function(a, b, opt_tolerance) {\n  'use strict';\n  return Math.abs(a - b) <= (opt_tolerance || 0.000001);\n};\n\n\n// TODO(user): Rename to normalizeAngle, retaining old name as deprecated\n// alias.\n/**\n * Normalizes an angle to be in range [0-360). Angles outside this range will\n * be normalized to be the equivalent angle with that range.\n * @param {number} angle Angle in degrees.\n * @return {number} Standardized angle.\n */\ngoog.math.standardAngle = function(angle) {\n  'use strict';\n  return goog.math.modulo(angle, 360);\n};\n\n\n/**\n * Normalizes an angle to be in range [0-2*PI). Angles outside this range will\n * be normalized to be the equivalent angle with that range.\n * @param {number} angle Angle in radians.\n * @return {number} Standardized angle.\n */\ngoog.math.standardAngleInRadians = function(angle) {\n  'use strict';\n  return goog.math.modulo(angle, 2 * Math.PI);\n};\n\n\n/**\n * Converts degrees to radians.\n * @param {number} angleDegrees Angle in degrees.\n * @return {number} Angle in radians.\n */\ngoog.math.toRadians = function(angleDegrees) {\n  'use strict';\n  return angleDegrees * Math.PI / 180;\n};\n\n\n/**\n * Converts radians to degrees.\n * @param {number} angleRadians Angle in radians.\n * @return {number} Angle in degrees.\n */\ngoog.math.toDegrees = function(angleRadians) {\n  'use strict';\n  return angleRadians * 180 / Math.PI;\n};\n\n\n/**\n * For a given angle and radius, finds the X portion of the offset.\n * @param {number} degrees Angle in degrees (zero points in +X direction).\n * @param {number} radius Radius.\n * @return {number} The x-distance for the angle and radius.\n */\ngoog.math.angleDx = function(degrees, radius) {\n  'use strict';\n  return radius * Math.cos(goog.math.toRadians(degrees));\n};\n\n\n/**\n * For a given angle and radius, finds the Y portion of the offset.\n * @param {number} degrees Angle in degrees (zero points in +X direction).\n * @param {number} radius Radius.\n * @return {number} The y-distance for the angle and radius.\n */\ngoog.math.angleDy = function(degrees, radius) {\n  'use strict';\n  return radius * Math.sin(goog.math.toRadians(degrees));\n};\n\n\n/**\n * Computes the angle between two points (x1,y1) and (x2,y2).\n * Angle zero points in the +X direction, 90 degrees points in the +Y\n * direction (down) and from there we grow clockwise towards 360 degrees.\n * @param {number} x1 x of first point.\n * @param {number} y1 y of first point.\n * @param {number} x2 x of second point.\n * @param {number} y2 y of second point.\n * @return {number} Standardized angle in degrees of the vector from\n *     x1,y1 to x2,y2.\n */\ngoog.math.angle = function(x1, y1, x2, y2) {\n  'use strict';\n  return goog.math.standardAngle(\n      goog.math.toDegrees(Math.atan2(y2 - y1, x2 - x1)));\n};\n\n\n/**\n * Computes the difference between startAngle and endAngle (angles in degrees).\n * @param {number} startAngle  Start angle in degrees.\n * @param {number} endAngle  End angle in degrees.\n * @return {number} The number of degrees that when added to\n *     startAngle will result in endAngle. Positive numbers mean that the\n *     direction is clockwise. Negative numbers indicate a counter-clockwise\n *     direction.\n *     The shortest route (clockwise vs counter-clockwise) between the angles\n *     is used.\n *     When the difference is 180 degrees, the function returns 180 (not -180)\n *     angleDifference(30, 40) is 10, and angleDifference(40, 30) is -10.\n *     angleDifference(350, 10) is 20, and angleDifference(10, 350) is -20.\n */\ngoog.math.angleDifference = function(startAngle, endAngle) {\n  'use strict';\n  var d =\n      goog.math.standardAngle(endAngle) - goog.math.standardAngle(startAngle);\n  if (d > 180) {\n    d = d - 360;\n  } else if (d <= -180) {\n    d = 360 + d;\n  }\n  return d;\n};\n\n\n/**\n * Returns the sign of a number as per the \"sign\" or \"signum\" function.\n * @param {number} x The number to take the sign of.\n * @return {number} -1 when negative, 1 when positive, 0 when 0. Preserves\n *     signed zeros and NaN.\n */\ngoog.math.sign = function(x) {\n  'use strict';\n  if (x > 0) {\n    return 1;\n  }\n  if (x < 0) {\n    return -1;\n  }\n  return x;  // Preserves signed zeros and NaN.\n};\n\n\n/**\n * JavaScript implementation of Longest Common Subsequence problem.\n * http://en.wikipedia.org/wiki/Longest_common_subsequence\n *\n * Returns the longest possible array that is subarray of both of given arrays.\n *\n * @param {IArrayLike<S>} array1 First array of objects.\n * @param {IArrayLike<T>} array2 Second array of objects.\n * @param {Function=} opt_compareFn Function that acts as a custom comparator\n *     for the array ojects. Function should return true if objects are equal,\n *     otherwise false.\n * @param {Function=} opt_collectorFn Function used to decide what to return\n *     as a result subsequence. It accepts 2 arguments: index of common element\n *     in the first array and index in the second. The default function returns\n *     element from the first array.\n * @return {!Array<S|T>} A list of objects that are common to both arrays\n *     such that there is no common subsequence with size greater than the\n *     length of the list.\n * @template S,T\n */\ngoog.math.longestCommonSubsequence = function(\n    array1, array2, opt_compareFn, opt_collectorFn) {\n  'use strict';\n  var compare = opt_compareFn || function(a, b) {\n    'use strict';\n    return a == b;\n  };\n\n  var collect = opt_collectorFn || function(i1, i2) {\n    'use strict';\n    return array1[i1];\n  };\n\n  var length1 = array1.length;\n  var length2 = array2.length;\n\n  var arr = [];\n  for (var i = 0; i < length1 + 1; i++) {\n    arr[i] = [];\n    arr[i][0] = 0;\n  }\n\n  for (var j = 0; j < length2 + 1; j++) {\n    arr[0][j] = 0;\n  }\n\n  for (i = 1; i <= length1; i++) {\n    for (j = 1; j <= length2; j++) {\n      if (compare(array1[i - 1], array2[j - 1])) {\n        arr[i][j] = arr[i - 1][j - 1] + 1;\n      } else {\n        arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);\n      }\n    }\n  }\n\n  // Backtracking\n  var result = [];\n  var i = length1, j = length2;\n  while (i > 0 && j > 0) {\n    if (compare(array1[i - 1], array2[j - 1])) {\n      result.unshift(collect(i - 1, j - 1));\n      i--;\n      j--;\n    } else {\n      if (arr[i - 1][j] > arr[i][j - 1]) {\n        i--;\n      } else {\n        j--;\n      }\n    }\n  }\n\n  return result;\n};\n\n\n/**\n * Returns the sum of the arguments.\n * @param {...number} var_args Numbers to add.\n * @return {number} The sum of the arguments (0 if no arguments were provided,\n *     `NaN` if any of the arguments is not a valid number).\n */\ngoog.math.sum = function(var_args) {\n  'use strict';\n  return /** @type {number} */ (\n      Array.prototype.reduce.call(arguments, function(sum, value) {\n        'use strict';\n        return sum + value;\n      }, 0));\n};\n\n\n/**\n * Returns the arithmetic mean of the arguments.\n * @param {...number} var_args Numbers to average.\n * @return {number} The average of the arguments (`NaN` if no arguments\n *     were provided or any of the arguments is not a valid number).\n */\ngoog.math.average = function(var_args) {\n  'use strict';\n  return goog.math.sum.apply(null, arguments) / arguments.length;\n};\n\n\n/**\n * Returns the unbiased sample variance of the arguments. For a definition,\n * see e.g. http://en.wikipedia.org/wiki/Variance\n * @param {...number} var_args Number samples to analyze.\n * @return {number} The unbiased sample variance of the arguments (0 if fewer\n *     than two samples were provided, or `NaN` if any of the samples is\n *     not a valid number).\n */\ngoog.math.sampleVariance = function(var_args) {\n  'use strict';\n  var sampleSize = arguments.length;\n  if (sampleSize < 2) {\n    return 0;\n  }\n\n  var mean = goog.math.average.apply(null, arguments);\n  var variance = goog.math.sum.apply(\n                     null,\n                     Array.prototype.map.call(\n                         arguments,\n                         function(val) {\n                           'use strict';\n                           return Math.pow(val - mean, 2);\n                         })) /\n      (sampleSize - 1);\n\n  return variance;\n};\n\n\n/**\n * Returns the sample standard deviation of the arguments.  For a definition of\n * sample standard deviation, see e.g.\n * http://en.wikipedia.org/wiki/Standard_deviation\n * @param {...number} var_args Number samples to analyze.\n * @return {number} The sample standard deviation of the arguments (0 if fewer\n *     than two samples were provided, or `NaN` if any of the samples is\n *     not a valid number).\n */\ngoog.math.standardDeviation = function(var_args) {\n  'use strict';\n  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));\n};\n\n\n/**\n * Returns whether the supplied number represents an integer, i.e. that is has\n * no fractional component.  No range-checking is performed on the number.\n * @param {number} num The number to test.\n * @return {boolean} Whether `num` is an integer.\n */\ngoog.math.isInt = function(num) {\n  'use strict';\n  return isFinite(num) && num % 1 == 0;\n};\n\n\n/**\n * Returns whether the supplied number is finite and not NaN.\n * @param {number} num The number to test.\n * @return {boolean} Whether `num` is a finite number.\n * @deprecated Use {@link isFinite} instead.\n */\ngoog.math.isFiniteNumber = function(num) {\n  'use strict';\n  return isFinite(num);\n};\n\n\n/**\n * @param {number} num The number to test.\n * @return {boolean} Whether it is negative zero.\n */\ngoog.math.isNegativeZero = function(num) {\n  'use strict';\n  return num == 0 && 1 / num < 0;\n};\n\n\n/**\n * Returns the precise value of floor(log10(num)).\n * Simpler implementations didn't work because of floating point rounding\n * errors. For example\n * <ul>\n * <li>Math.floor(Math.log(num) / Math.LN10) is off by one for num == 1e+3.\n * <li>Math.floor(Math.log(num) * Math.LOG10E) is off by one for num == 1e+15.\n * <li>Math.floor(Math.log10(num)) is off by one for num == 1e+15 - 1.\n * </ul>\n * @param {number} num A floating point number.\n * @return {number} Its logarithm to base 10 rounded down to the nearest\n *     integer if num > 0. -Infinity if num == 0. NaN if num < 0.\n */\ngoog.math.log10Floor = function(num) {\n  'use strict';\n  if (num > 0) {\n    var x = Math.round(Math.log(num) * Math.LOG10E);\n    return x - (parseFloat('1e' + x) > num ? 1 : 0);\n  }\n  return num == 0 ? -Infinity : NaN;\n};\n\n\n/**\n * A tweaked variant of `Math.floor` which tolerates if the passed number\n * is infinitesimally smaller than the closest integer. It often happens with\n * the results of floating point calculations because of the finite precision\n * of the intermediate results. For example {@code Math.floor(Math.log(1000) /\n * Math.LN10) == 2}, not 3 as one would expect.\n * @param {number} num A number.\n * @param {number=} opt_epsilon An infinitesimally small positive number, the\n *     rounding error to tolerate.\n * @return {number} The largest integer less than or equal to `num`.\n */\ngoog.math.safeFloor = function(num, opt_epsilon) {\n  'use strict';\n  goog.asserts.assert(opt_epsilon === undefined || opt_epsilon > 0);\n  return Math.floor(num + (opt_epsilon || 2e-15));\n};\n\n\n/**\n * A tweaked variant of `Math.ceil`. See `goog.math.safeFloor` for\n * details.\n * @param {number} num A number.\n * @param {number=} opt_epsilon An infinitesimally small positive number, the\n *     rounding error to tolerate.\n * @return {number} The smallest integer greater than or equal to `num`.\n */\ngoog.math.safeCeil = function(num, opt_epsilon) {\n  'use strict';\n  goog.asserts.assert(opt_epsilon === undefined || opt_epsilon > 0);\n  return Math.ceil(num - (opt_epsilon || 2e-15));\n};\n","~:compiled-at",1669622728366,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.math.math.js\",\n\"lineCount\":1,\n\"mappings\":\";\",\n\"sources\":[],\n\"names\":[]\n}\n"]