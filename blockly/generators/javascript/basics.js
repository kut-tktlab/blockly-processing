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
 * @fileoverview Generating JavaScript for basic blocks.
 * @author takata.yoshiaki@kochi-tech.ac.jp (ytakata69)
 */
'use strict';

goog.provide('Blockly.JavaScript.basics');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['basics_setup'] = function(block) {
  var funcName = 'setup';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    branch = Blockly.JavaScript.prefixLines(
        Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch;
  }
  var code = 'function ' + funcName + '() {\n' +
      branch + '}';
  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_['%' + funcName] = code;
  return null;
};

Blockly.JavaScript['basics_loop'] = function(block) {
  var funcName = 'loop';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    branch = Blockly.JavaScript.prefixLines(
        Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch;
  }
  var code = 'function ' + funcName + '() {\n' +
      branch + '}';
  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.JavaScript.definitions_['%' + funcName] = code;
  return null;
};

Blockly.JavaScript['basics_sleep'] = function(block) {
  var sec = Blockly.JavaScript.valueToCode(block, 'SECONDS',
      Blockly.JavaScript.ORDER_NONE) || 1;
  return 'window.alert(\'sleeping ' + sec +
         ' sec... (not implemented)\');\n';
};
