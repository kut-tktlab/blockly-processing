/**
 * @license
 * This file is a added by Yoshiaki Takata, 2017.
 * The original Blockly files as well as this file are provided
 * under Apache License 2.0.
 *
 * Visual Blocks Editor
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
 * @fileoverview LED blocks for Blockly.
 * @author takata.yoshiaki@kochi-tech.ac.jp (ytakata69)
 */
'use strict';

goog.provide('Blockly.Blocks.leds');  // Deprecated
goog.provide('Blockly.Constants.Leds');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 * This should be the same as Blockly.Msg.LEDS_HUE.
 * @readonly
 */
Blockly.Constants.Leds.HUE = 160;
/** @deprecated Use Blockly.Constants.Leds.HUE */
Blockly.Blocks.leds.HUE = Blockly.Constants.Leds.HUE;


Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for setting the colour of an LED.
  {
    "type": "led_set_color",
    "message0": "%{BKY_LED_SET_COLOR_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "LED",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "COLOR",
        "check": "Colour",
        "align": "RIGHT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LEDS_HUE}"
  }
]);  // END JSON EXTRACT (Do not delete this comment.)
