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
 * @fileoverview Generating JavaScript for LED blocks.
 * @author takata.yoshiaki@kochi-tech.ac.jp (ytakata69)
 */
'use strict';

goog.provide('Blockly.JavaScript.leds');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['led_set_color'] = function(block) {
  var led = Blockly.JavaScript.valueToCode(block, 'LED',
      Blockly.JavaScript.ORDER_NONE) || 0;
  var color = Blockly.JavaScript.valueToCode(block, 'COLOR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'setLedColor(' + led + ', ' + color + ');\n';
};

Blockly.JavaScript['led_turn_off'] = function(block) {
  var led = Blockly.JavaScript.valueToCode(block, 'LED',
      Blockly.JavaScript.ORDER_NONE) || 0;
  var color = '\'#000000\'';
  return 'setLedColor(' + led + ', ' + color + ');\n';
};

Blockly.JavaScript['led_turn_off_all'] = function(block) {
  return 'clearAllLed();\n';
};
