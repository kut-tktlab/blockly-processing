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
 * @fileoverview Generating Python for LED blocks.
 * @author takata.yoshiaki@kochi-tech.ac.jp (ytakata69)
 */
'use strict';

goog.provide('Blockly.Python.leds');

goog.require('Blockly.Python');


Blockly.Python['led_set_color'] = function(block) {
  var functionName = Blockly.Python.provideFunction_(
      'led_set_color',
      ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(led, color):',
       '  print(\'ledSetColor(%d, %s)\' % (led, color))']);
  var led   = Blockly.Python.valueToCode(block, 'LED',
      Blockly.JavaScript.ORDER_NONE) || 0;
  var color = Blockly.Python.valueToCode(block, 'COLOR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return functionName + '(' + led + ', ' + color + ')\n';
};
