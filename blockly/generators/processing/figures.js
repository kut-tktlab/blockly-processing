/**
 * @license
 * This file is a added by Yoshiaki Takata, 2017.
 * The original Blockly files as well as this file are provided
 * under Apache License 2.0.
 *
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
 * @fileoverview Generating Processing for graphical figure blocks.
 * @author takata.yoshiaki@kochi-tech.ac.jp (ytakata69)
 */
'use strict';

goog.provide('Blockly.Processing.figures');

goog.require('Blockly.Processing');


Blockly.Processing['figures_shape'] = function(block) {
  var order_none = Blockly.Processing.ORDER_NONE;
  var params = {
    'RECT':     ['X', 'Y', 'WIDTH', 'HEIGHT'],
    'ELLIPSE':  ['X', 'Y', 'WIDTH', 'HEIGHT'],
    'LINE':     ['X', 'Y', 'X2', 'Y2'],
    'TRIANGLE': ['X', 'Y', 'X2', 'Y2', 'X3', 'Y3'],
    'QUAD':     ['X', 'Y', 'X2', 'Y2', 'X3', 'Y3', 'X4', 'Y4'],
    'POINT':    ['X', 'Y'],
    'ARC':      ['X', 'Y', 'WIDTH', 'HEIGHT', 'SA', 'EA']
  };
  var shape = block.getFieldValue('SHAPE');
  var parList = [];
  for (var i = 0; i < params[shape].length; i++) {
    var parName = params[shape][i];
    var p = Blockly.Processing.valueToCode(block, parName, order_none)
            || 0;
    if (parName == 'SA' || parName == 'EA') {
      p = 'radians(' + p + ')'
    }
    parList.push(p);
  }
  var fun = shape.toLowerCase();
  return fun + '(' + parList.join(', ') + ');\n';
};

Blockly.Processing['figures_background'] = function(block) {
  var c = Blockly.Processing.valueToCode(block, 'COLOUR',
          Blockly.Processing.ORDER_COMMA) || '#000000';
  return 'background(' + c + ');\n'
}

Blockly.Processing['figures_colour'] = function(block) {
  var target = block.getFieldValue('TARGET');
  var fun = target.toLowerCase();
  var c = Blockly.Processing.valueToCode(block, 'COLOUR',
          Blockly.Processing.ORDER_COMMA) || '#000000';
  return fun + '(' + c + ');\n'
}

Blockly.Processing['figures_nofill'] = function(block) {
  var target = block.getFieldValue('TARGET');
  var fun = 'no' + target.substr(0, 1) + target.substr(1).toLowerCase();
  var c = Blockly.Processing.valueToCode(block, 'COLOUR',
          Blockly.Processing.ORDER_COMMA) || '#000000';
  return fun + '();\n'
}

Blockly.Processing['figures_stroke_weight'] = function(block) {
  var w = Blockly.Processing.valueToCode(block, 'WEIGHT',
          Blockly.Processing.ORDER_COMMA) || 1;
  return 'strokeWeight(' + w + ');\n'
}
