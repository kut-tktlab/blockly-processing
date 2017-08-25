/**
 * @license
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
 * @fileoverview Generating Processing for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Processing.procedures');

goog.require('Blockly.Processing');


Blockly.Processing['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Processing.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Processing.statementToCode(block, 'STACK');
  if (Blockly.Processing.STATEMENT_PREFIX) {
    branch = Blockly.Processing.prefixLines(
        Blockly.Processing.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Processing.INDENT) + branch;
  }
  if (Blockly.Processing.INFINITE_LOOP_TRAP) {
    branch = Blockly.Processing.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Processing.valueToCode(block, 'RETURN',
      Blockly.Processing.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Processing.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.Processing.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Processing.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Processing['procedures_defnoreturn'] =
    Blockly.Processing['procedures_defreturn'];

Blockly.Processing['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Processing.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Processing.valueToCode(block, 'ARG' + i,
        Blockly.Processing.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Processing.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Processing.valueToCode(block, 'ARG' + i,
        Blockly.Processing.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.Processing['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Processing.valueToCode(block, 'CONDITION',
      Blockly.Processing.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Processing.valueToCode(block, 'VALUE',
        Blockly.Processing.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};
