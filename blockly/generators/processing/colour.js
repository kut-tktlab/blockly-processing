/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Processing for colour blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Processing.colour');

goog.require('Blockly.Processing');


Blockly.Processing['colour_picker'] = function(block) {
  // Colour picker.
  var code = block.getFieldValue('COLOUR');
  return [code, Blockly.Processing.ORDER_ATOMIC];
};

Blockly.Processing['colour_random'] = function(block) {
  // Generate a random colour.
  var functionName = Blockly.Processing.provideFunction_(
      'colourRandom',
      ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ + '() {',
        '  int r = floor(random(256));',
        '  int g = floor(random(256));',
        '  int b = floor(random(256));',
        '  return color(r, g, b);',
        '}']);
  var code = functionName + '()';
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['colour_rgb'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  var red = Blockly.Processing.valueToCode(block, 'RED',
      Blockly.Processing.ORDER_COMMA) || 0;
  var green = Blockly.Processing.valueToCode(block, 'GREEN',
      Blockly.Processing.ORDER_COMMA) || 0;
  var blue = Blockly.Processing.valueToCode(block, 'BLUE',
      Blockly.Processing.ORDER_COMMA) || 0;
  var functionName = Blockly.Processing.provideFunction_(
      'colourRgb',
      ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
       '(r, g, b) {',
       '  r = floor(min(100, max(0, Number(r))) * 2.55);',
       '  g = floor(min(100, max(0, Number(g))) * 2.55);',
       '  b = floor(min(100, max(0, Number(b))) * 2.55);',
       '  return color(r, g, b);',
       '}']);
  var code = functionName + '(' + red + ', ' + green + ', ' + blue + ')';
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['colour_blend'] = function(block) {
  // Blend two colours together.
  var c1 = Blockly.Processing.valueToCode(block, 'COLOUR1',
      Blockly.Processing.ORDER_COMMA) || '\'#000000\'';
  var c2 = Blockly.Processing.valueToCode(block, 'COLOUR2',
      Blockly.Processing.ORDER_COMMA) || '\'#000000\'';
  var ratio = Blockly.Processing.valueToCode(block, 'RATIO',
      Blockly.Processing.ORDER_COMMA) || 0.5;
  var functionName = Blockly.Processing.provideFunction_(
      'colourBlend',
      ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
          '(c1, c2, ratio) {',
       '  ratio = max(min(Number(ratio), 1), 0);',
       '  var r1 = parseInt(c1.substring(1, 3), 16);',
       '  var g1 = parseInt(c1.substring(3, 5), 16);',
       '  var b1 = parseInt(c1.substring(5, 7), 16);',
       '  var r2 = parseInt(c2.substring(1, 3), 16);',
       '  var g2 = parseInt(c2.substring(3, 5), 16);',
       '  var b2 = parseInt(c2.substring(5, 7), 16);',
       '  var r = round(r1 * (1 - ratio) + r2 * ratio);',
       '  var g = round(g1 * (1 - ratio) + g2 * ratio);',
       '  var b = round(b1 * (1 - ratio) + b2 * ratio);',
       '  return color(r, g, b);',
       '}']);
  var code = functionName + '(' + c1 + ', ' + c2 + ', ' + ratio + ')';
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['colour_hsv'] = function(block) {
  // Compose a colour from HSV components expressed as percentages.
  var hue = Blockly.Processing.valueToCode(block, 'HUE',
      Blockly.Processing.ORDER_COMMA) || 0;
  var saturation = Blockly.Processing.valueToCode(block, 'SATURATION',
      Blockly.Processing.ORDER_COMMA) || 0;
  var value = Blockly.Processing.valueToCode(block, 'VALUE',
      Blockly.Processing.ORDER_COMMA) || 0;
  var functionName = Blockly.Processing.provideFunction_(
      'colourHsv',
      ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
          '(h, s, v) {',
       '  h = round(min(360, max(0, Number(h))));',
       '  s = min(100, max(0, Number(s))) / 100.0;',
       '  v = min(100, max(0, Number(v))) * 2.55;',
       '  var hgroup = floor(h / 60) % 6;',
       '  var f  = (h % 60) / 60.0;',
       '  var p  = (v * (1.0 - s));',
       '  var q  = (v * (1.0 - f * s));',
       '  var t  = (v * (1.0 - (1.0 - f) * s));',
       '  var r, g, b;',
       '  if      (hgroup == 0) { r = v; g = t; b = p; }',
       '  else if (hgroup == 1) { r = q; g = v; b = p; }',
       '  else if (hgroup == 2) { r = p; g = v; b = t; }',
       '  else if (hgroup == 3) { r = p; g = q; b = v; }',
       '  else if (hgroup == 4) { r = t; g = p; b = v; }',
       '  else if (hgroup == 5) { r = v; g = p; b = q; }',
       '  return color(r, g, b);',
       '}']);
  var code = functionName + '(' + hue + ', ' + saturation + ', ' + value + ')';
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};
