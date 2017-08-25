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
 * @fileoverview graphical-figure blocks for Blockly.
 * @author takata.yoshiaki@kochi-tech.ac.jp (ytakata69)
 */
'use strict';

goog.provide('Blockly.Blocks.figures');  // Deprecated
goog.provide('Blockly.Constants.Figures');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 * This should be the same as Blockly.Msg.FIGURES_HUE.
 * @readonly
 */
Blockly.Constants.Figures.HUE = '#5b318f';
/** @deprecated Use Blockly.Constants.Figures.HUE */
Blockly.Blocks.figures.HUE = Blockly.Constants.Figures.HUE;


Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for graphical figures.
  {
    "type": "figures_shape",
    "message0": "%{BKY_FIGURES_SHAPE_TITLE}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "SHAPE",
        "options": [
          ["%{BKY_FIGURES_RECT}", "RECT"],
          ["%{BKY_FIGURES_ELLIPSE}", "ELLIPSE"],
          ["%{BKY_FIGURES_LINE}", "LINE"],
          ["%{BKY_FIGURES_TRIANGLE}", "TRIANGLE"],
          ["%{BKY_FIGURES_QUAD}", "QUAD"],
          ["%{BKY_FIGURES_POINT}", "POINT"],
          ["%{BKY_FIGURES_ARC}", "ARC"]
        ]
      },
      {
        "type": "input_value",
        "name": "X",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "Y",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "WIDTH",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "HEIGHT",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_FIGURES_HUE}",
    "mutator": "figures_shape_mutator"
  },
  // Block for background.
  {
    "type": "figures_background",
    "message0": "%{BKY_FIGURES_BACKGROUND_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "COLOUR",
        "check": "Colour"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_FIGURES_HUE}"
  },
  // Block for stroke/fill colour.
  {
    "type": "figures_colour",
    "message0": "%{BKY_FIGURES_COLOUR_TITLE}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TARGET",
        "options": [
          ["%{BKY_FIGURES_STROKE}", "STROKE"],
          ["%{BKY_FIGURES_FILL}", "FILL"]
        ]
      },
      {
        "type": "input_value",
        "name": "COLOUR",
        "check": "Colour"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_FIGURES_HUE}"
  },
  // Block for no stroke/fill.
  {
    "type": "figures_nofill",
    "message0": "%{BKY_FIGURES_NOFILL_TITLE}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "TARGET",
        "options": [
          ["%{BKY_FIGURES_STROKE}", "STROKE"],
          ["%{BKY_FIGURES_FILL}", "FILL"]
        ]
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_FIGURES_HUE}"
  },
  // Block for stroke weight.
  {
    "type": "figures_stroke_weight",
    "message0": "%{BKY_FIGURES_STROKE_WEIGHT_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "WEIGHT",
        "check": "Number"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_FIGURES_HUE}"
  }
]);  // END JSON EXTRACT (Do not delete this comment.)

/**
 * Mixin with mutator methods to support alternate input based on the
 * 'SHAPE' dropdown of the 'figures_shape' block.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Figures.SHAPE_MUTATOR_MIXIN = {
  /**
   * Modify this block to have the correct input type.
   * @param {string} newShape selected shape.
   * @private
   * @this Blockly.Block
   */
  updateType_: function(newShape) {
    // RECT, ELLIPSE: x, y, w, h
    // ARC: x, y, w, h, sa, ea
    // POINT: x, y
    // LINE: x, y, x2, y2
    // TRIANGLE: x, y, x2, y2, x3, y3
    // QUAD: x, y, x2, y2, x3, y3, x4, y4
    var inputNames = {
      'RECT':     { 'WIDTH': true, 'HEIGHT': true },
      'ELLIPSE':  { 'WIDTH': true, 'HEIGHT': true },
      'ARC':      { 'WIDTH': true, 'HEIGHT': true, 'SA': true, 'EA': true },
      'POINT':    {},
      'LINE':     { 'X2': true, 'Y2': true },
      'TRIANGLE': { 'X2': true, 'Y2': true, 'X3': true, 'Y3': true },
      'QUAD':     { 'X2': true, 'Y2': true, 'X3': true, 'Y3': true, 'X4': true, 'Y4': true }
    };
    var names = [ 'WIDTH', 'HEIGHT', 'SA', 'EA', 'X2', 'Y2', 'X3', 'Y3', 'X4', 'Y4' ];
    var label = {
      'WIDTH':  '%{BKY_FIGURES_SHAPE_WIDTH}',
      'HEIGHT': '%{BKY_FIGURES_SHAPE_HEIGHT}',
      'SA':     '%{BKY_FIGURES_SHAPE_START_ANGLE}',
      'EA':     '%{BKY_FIGURES_SHAPE_END_ANGLE}'
    };
    var shadowValue = {
      'WIDTH': 10, 'HEIGHT': 10,
      'SA':  0, 'EA': 180,
      'X2': 50, 'Y2':  0,
      'X3': 50, 'Y3': 50,
      'X4':  0, 'Y4': 50
    };
    // Add or remove Value Inputs.
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      var isNeeded = inputNames[newShape][name];
      var isExist  = this.getInput(name);
      if (isNeeded) {
        if (!isExist) {
          // Text label of the input
          var lb = label[name] || name.toLowerCase();
          if (lb.substr(0, 1) == '%') {
            lb = Blockly.utils.replaceMessageReferences(lb);
          }
          // Create an input
          var input = this.appendValueInput(name);
          input.appendField(lb)
               .setCheck('Number');
          // Put a shadow block
          var blk = workspace.newBlock('math_number');
          blk.setShadow(true);
          blk.getField('NUM').setValue(shadowValue[name]);
          var shadowDom = Blockly.Xml.blockToDom(blk);
          input.connection.setShadowDom(shadowDom);
          input.connection.connect(blk.outputConnection);
          if (workspace.rendered) {
            blk.initSvg();
            blk.render(false);
          }
        }
      } else if (isExist) {
        this.removeInput(name);
      }
    }
  },
  /**
   * Create XML to represent the input type.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('shape', this.getFieldValue('SHAPE'));
    return container;
  },
  /**
   * Parse XML to restore the input type.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.updateType_(xmlElement.getAttribute('shape'));
  }
};

/**
 * Extension to 'figures_shape' blocks that alter the number of args.
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Figures.SHAPE_MUTATOR_EXTENSION = function() {
  this.getField('SHAPE').setValidator(function(newShape) {
    this.updateType_(newShape);
  }.bind(this));
};

Blockly.Extensions.registerMutator('figures_shape_mutator',
  Blockly.Constants.Figures.SHAPE_MUTATOR_MIXIN,
  Blockly.Constants.Figures.SHAPE_MUTATOR_EXTENSION);
