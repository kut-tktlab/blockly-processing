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
Blockly.Constants.Basics.HUE = '#137ad4';
/** @deprecated Use Blockly.Constants.Basics.HUE */
Blockly.Blocks.basics.HUE = Blockly.Constants.Basics.HUE;


Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for the setup routine.
  {
    "type": "basics_setup",
    "message0": "%{BKY_BASICS_SETUP_TITLE} %1 %{BKY_FIGURES_SHAPE_WIDTH} %2 %{BKY_FIGURES_SHAPE_HEIGHT} %3 %4 %5",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "field_number",
        "name": "WIDTH",
        "value": 100
      },
      {
        "type": "field_number",
        "name": "HEIGHT",
        "value": 100
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "inputsInline": false,
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
      "name": "MSEC",
      "check": "Number"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_BASICS_HUE}"
  },
  // Block for built-in variable (Number).
  {
    "type": "basics_builtin_var",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VAR",
        "options": [
          ["width", "WIDTH"], // display_name, language_independent_name
          ["height", "HEIGHT"],
          ["mouseX", "MOUSE_X"],
          ["mouseY", "MOUSE_Y"]
        ]
      }
    ],
    "output": "Number",
    "colour": "%{BKY_MATH_HUE}"
  },
  // Block for built-in variable (Boolean).
  {
    "type": "basics_builtin_logic_var",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VAR",
        "options": [
          ["mousePressed", "MOUSE_PRESSED"] // display_name, language_independent_name
        ]
      }
    ],
    "output": "Boolean",
    "colour": "%{BKY_LOGIC_HUE}"
  },
  // Block for mousePressed().
  {
    "type": "basics_mouse_pressed",
    "message0": "%{BKY_BASICS_MOUSE_PRESSED_TITLE} %1 %2",
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
  }
]);  // END JSON EXTRACT (Do not delete this comment.)
