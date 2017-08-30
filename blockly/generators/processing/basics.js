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
 * @fileoverview Generating Processing for basic blocks.
 * @author takata.yoshiaki@kochi-tech.ac.jp (ytakata69)
 */
'use strict';

goog.provide('Blockly.Processing.basics');

goog.require('Blockly.Processing');


Blockly.Processing['basics_setup'] = function(block) {
  if (Blockly.Processing.definitions_['setup']) {
    return null;
  }
  var wd = block.getFieldValue('WIDTH');
  var ht = block.getFieldValue('HEIGHT');
  var branch = 'size(' + wd + ', ' + ht + ');\n';
  branch  = Blockly.Processing.INDENT + branch;
  branch += Blockly.Processing.statementToCode(block, 'DO');
  if (Blockly.Processing.STATEMENT_PREFIX) {
    branch = Blockly.Processing.prefixLines(
        Blockly.Processing.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Processing.INDENT) + branch;
  }
  if (!branch) {
    return null;
  }
  var code = 'void setup() {\n' + branch + '}\n';
  code = Blockly.Processing.scrub_(block, code);
  Blockly.Processing.definitions_['setup'] = code;
  return null;
};

Blockly.Processing['basics_loop'] = function(block) {
  if (Blockly.Processing.definitions_['draw']) {
    return null;
  }
  var branch = Blockly.Processing.statementToCode(block, 'DO');
  if (Blockly.Processing.STATEMENT_PREFIX) {
    branch = Blockly.Processing.prefixLines(
        Blockly.Processing.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Processing.INDENT) + branch;
  }
  //if (!branch) {
  //  return null;
  //}
  if (Blockly.Processing.INFINITE_LOOP_TRAP) {
    branch = Blockly.Processing.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var code = 'void draw() {\n' + branch + '}\n';
  code = Blockly.Processing.scrub_(block, code);
  Blockly.Processing.definitions_['draw'] = code;
  return null;
};

Blockly.Processing['basics_sleep'] = function(block) {
  var msec = Blockly.Processing.valueToCode(block, 'MSEC',
      Blockly.Processing.ORDER_NONE) || 1;
  return 'delayMilliseconds(' + msec + ');\n';
};

Blockly.Processing['basics_builtin_var'] = function(block) {
  var vname = block.getFieldValue('VAR');
  var code;
  if (vname.substr(0, 5) == 'MOUSE') {
    code = 'mouse' + vname.substr(6, 1) + vname.substr(7).toLowerCase();
  } else {
    code = vname.toLowerCase();
  }
  return [code, Blockly.Processing.ORDER_ATOMIC];
};
Blockly.Processing['basics_builtin_logic_var'] = Blockly.Processing['basics_builtin_var'];
  
Blockly.Processing['basics_mouse_pressed'] = function(block) {
  if (Blockly.Processing.definitions_['mousePressed']) {
    return null;
  }
  var branch = Blockly.Processing.statementToCode(block, 'DO');
  if (Blockly.Processing.STATEMENT_PREFIX) {
    branch = Blockly.Processing.prefixLines(
        Blockly.Processing.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Processing.INDENT) + branch;
  }
  //if (!branch) {
  //  return null;
  //}
  var code = 'void mousePressed() {\n' + branch + '}\n';
  code = Blockly.Processing.scrub_(block, code);
  Blockly.Processing.definitions_['mousePressed'] = code;
  return null;
};
