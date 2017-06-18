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
 * @fileoverview Basic blocks for Blockly.
 * @author takata.yoshiaki@kochi-tech.ac.jp (ytakata69)
 */
'use strict';

goog.provide('Blockly.Blocks.basics');  // Deprecated
goog.provide('Blockly.Constants.Basics');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 * This should be the same as Blockly.Msg.BASICS_HUE.
 * @readonly
 */
Blockly.Constants.Basics.HUE = 280;
/** @deprecated Use Blockly.Constants.Basics.HUE */
Blockly.Blocks.basics.HUE = Blockly.Constants.Basics.HUE;


Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for the setup routine.
  {
    "type": "basics_setup",
    "message0": "%{BKY_BASICS_SETUP_TITLE} %1 %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "colour": "%{BKY_BASICS_HUE}"
  },
  // Block for the main loop.
  {
    "type": "basics_loop",
    "message0": "%{BKY_BASICS_LOOP_TITLE} %1 %2",
    "args0": [
      {
        "type": "input_dummy",
      },
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "colour": "%{BKY_BASICS_HUE}"
  },
  // Block for sleeping.
  {
    "type": "basics_sleep",
    "message0": "%{BKY_BASICS_SLEEP_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "SECONDS",
      "check": "Number"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_BASICS_HUE}"
  }
]);  // END JSON EXTRACT (Do not delete this comment.)
