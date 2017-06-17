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
 * @fileoverview Generating Python for basic blocks.
 * @author takata.yoshiaki@kochi-tech.ac.jp (ytakata69)
 */
'use strict';

goog.provide('Blockly.Python.basics');

goog.require('Blockly.Python');


Blockly.Python['basics_setup'] = function(block) {
  var globals = [];
  for (var i = 0, varName; varName = block.workspace.variableList[i]; i++) {
    if (block.arguments_.indexOf(varName) == -1) {
      globals.push(Blockly.Python.variableDB_.getName(varName,
          Blockly.Variables.NAME_TYPE));
    }
  }
  globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
  var funcName = 'setup';
  var branch = Blockly.Python.statementToCode(block, 'DO');
  if (Blockly.Python.STATEMENT_PREFIX) {
    branch = Blockly.Python.prefixLines(
        Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Python.INDENT) + branch;
  }
  if (!branch) {
    branch = Blockly.Python.PASS;
  }
  var code = 'def ' + funcName + '():\n' +
      globals + branch;
  code = Blockly.Python.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Python.definitions_['%' + funcName] = code;
  return null;
};

Blockly.Python['basics_loop'] = function(block) {
  var globals = [];
  for (var i = 0, varName; varName = block.workspace.variableList[i]; i++) {
    if (block.arguments_.indexOf(varName) == -1) {
      globals.push(Blockly.Python.variableDB_.getName(varName,
          Blockly.Variables.NAME_TYPE));
    }
  }
  globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';
  var funcName = 'loop';
  var branch = Blockly.Python.statementToCode(block, 'DO');
  if (Blockly.Python.STATEMENT_PREFIX) {
    branch = Blockly.Python.prefixLines(
        Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Python.INDENT) + branch;
  }
  if (!branch) {
    branch = Blockly.Python.PASS;
  }
  var code = 'def ' + funcName + '():\n' +
      globals + branch;
  code = Blockly.Python.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Python.definitions_['%' + funcName] = code;
  return null;
};

Blockly.Python['basics_sleep'] = function(block) {
  Blockly.Python.definitions_['import_time'] = 'import time';
  var sec = Blockly.Python.valueToCode(block, 'SECONDS',
      Blockly.JavaScript.ORDER_NONE) || 1.0;
  return 'time.sleep(' + sec + ')\n';
};
