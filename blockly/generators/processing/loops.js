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
 * @fileoverview Generating Processing for loop blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Processing.loops');

goog.require('Blockly.Processing');


Blockly.Processing['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.Processing.valueToCode(block, 'TIMES',
        Blockly.Processing.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.Processing.statementToCode(block, 'DO');
  branch = Blockly.Processing.addLoopTrap(branch, block.id);
  var code = '';
  var loopVar = Blockly.Processing.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    var endVar = Blockly.Processing.variableDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += 'var ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (var ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

Blockly.Processing['controls_repeat'] =
    Blockly.Processing['controls_repeat_ext'];

Blockly.Processing['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Processing.valueToCode(block, 'BOOL',
      until ? Blockly.Processing.ORDER_LOGICAL_NOT :
      Blockly.Processing.ORDER_NONE) || 'false';
  var branch = Blockly.Processing.statementToCode(block, 'DO');
  branch = Blockly.Processing.addLoopTrap(branch, block.id);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Processing['controls_while'] = function(block) {
  // While loop.
  var argument0 = Blockly.Processing.valueToCode(block, 'BOOL',
      Blockly.Processing.ORDER_NONE) || 'false';
  var branch = Blockly.Processing.statementToCode(block, 'DO');
  branch = Blockly.Processing.addLoopTrap(branch, block.id);
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Processing['controls_for'] = function(block) {
  // For loop.
  var argument0 = Blockly.Processing.valueToCode(block, 'FROM',
      Blockly.Processing.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Processing.valueToCode(block, 'TO',
      Blockly.Processing.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.Processing.valueToCode(block, 'BY',
      Blockly.Processing.ORDER_ASSIGNMENT) || '1';
  return Blockly.Processing.loops.createFor(block, argument0, argument1, increment);
};

Blockly.Processing['controls_for_simple'] = function(block) {
  // For loop.
  var argument1 = Blockly.Processing.valueToCode(block, 'TO',
      Blockly.Processing.ORDER_ASSIGNMENT) || '0';
  return Blockly.Processing.loops.createFor(block, '0', argument1, '1');
};


Blockly.Processing.loops.createFor = function(block, argument0, argument1, increment) {
  var variable0 = Blockly.Processing.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var branch = Blockly.Processing.statementToCode(block, 'DO');
  branch = Blockly.Processing.addLoopTrap(branch, block.id);
  var code;
  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
      startVar = Blockly.Processing.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
      var endVar = Blockly.Processing.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.Processing.variableDB_.getDistinctName(
        variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'var ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'Math.abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.Processing.INDENT + incVar + ' = -' + incVar + ';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + '; ' +
        incVar + ' >= 0 ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + '; ' +
        variable0 + ' += ' + incVar + ') {\n' +
        branch + '}\n';
  }
  return code;
};

Blockly.Processing['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Processing.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Processing.valueToCode(block, 'LIST',
      Blockly.Processing.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.Processing.statementToCode(block, 'DO');
  branch = Blockly.Processing.addLoopTrap(branch, block.id);
  var code = '';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  var listVar = argument0;
  if (!argument0.match(/^\w+$/)) {
    listVar = Blockly.Processing.variableDB_.getDistinctName(
        variable0 + '_list', Blockly.Variables.NAME_TYPE);
    code += 'var ' + listVar + ' = ' + argument0 + ';\n';
  }
  var indexVar = Blockly.Processing.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.Variables.NAME_TYPE);
  branch = Blockly.Processing.INDENT + variable0 + ' = ' +
      listVar + '[' + indexVar + '];\n' + branch;
  code += 'for (var ' + indexVar + ' in ' + listVar + ') {\n' + branch + '}\n';
  return code;
};

Blockly.Processing['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};
