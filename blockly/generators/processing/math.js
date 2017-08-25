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
 * @fileoverview Generating Processing for math blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Processing.math');

goog.require('Blockly.Processing');


Blockly.Processing['math_number'] = function(block) {
  // Numeric value.
  var code = parseFloat(block.getFieldValue('NUM'));
  return [code, Blockly.Processing.ORDER_ATOMIC];
};

Blockly.Processing['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
    'ADD': [' + ', Blockly.Processing.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.Processing.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.Processing.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.Processing.ORDER_DIVISION],
    'POWER': [null, Blockly.Processing.ORDER_COMMA]  // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Processing.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Processing.valueToCode(block, 'B', order) || '0';
  var code;
  // Power in Processing requires a special case since it has no operator.
  if (!operator) {
    code = 'pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Processing['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  var arg2 = null;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.Processing.valueToCode(block, 'NUM',
        Blockly.Processing.ORDER_UNARY_NEGATION) || '0';
    if (arg[0] == '-') {
      // --3 is not legal in JS.
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Blockly.Processing.ORDER_UNARY_NEGATION];
  }
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.Processing.valueToCode(block, 'NUM',
        Blockly.Processing.ORDER_DIVISION) || '0';
  } else {
    arg = Blockly.Processing.valueToCode(block, 'NUM',
        Blockly.Processing.ORDER_NONE) || '0';
    if (operator == 'ATAN2') {
      arg2 = Blockly.Processing.valueToCode(block, 'X',
        Blockly.Processing.ORDER_NONE) || '0';
    }
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'log(' + arg + ')';
      break;
    case 'EXP':
      code = 'exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'sin(' + arg + ' / 180 * PI)';
      break;
    case 'COS':
      code = 'cos(' + arg + ' / 180 * PI)';
      break;
    case 'TAN':
      code = 'tan(' + arg + ' / 180 * PI)';
      break;
  }
  if (code) {
    return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'LOG10':
      code = 'log(' + arg + ') / log(10)';
      break;
    case 'ASIN':
      code = 'asin(' + arg + ') / PI * 180';
      break;
    case 'ACOS':
      code = 'acos(' + arg + ') / PI * 180';
      break;
    case 'ATAN':
      code = 'atan(' + arg + ') / PI * 180';
      break;
    case 'ATAN2':
      code = 'atan2(' + arg + ', ' + arg2 + ') / PI * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.Processing.ORDER_DIVISION];
};

Blockly.Processing['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {
    'PI': ['PI', Blockly.Processing.ORDER_MEMBER],
    'E': ['exp(1)', Blockly.Processing.ORDER_MEMBER],
    'GOLDEN_RATIO':
        ['(1 + sqrt(5)) / 2', Blockly.Processing.ORDER_DIVISION],
    'SQRT2': ['SQRT2', Blockly.Processing.ORDER_MEMBER],
    'SQRT1_2': ['SQRT1_2', Blockly.Processing.ORDER_MEMBER],
    'INFINITY': ['Infinity', Blockly.Processing.ORDER_ATOMIC]
  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Blockly.Processing['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  var number_to_check = Blockly.Processing.valueToCode(block, 'NUMBER_TO_CHECK',
      Blockly.Processing.ORDER_MODULUS) || '0';
  var dropdown_property = block.getFieldValue('PROPERTY');
  var code;
  if (dropdown_property == 'PRIME') {
    // Prime is a special case as it is not a one-liner test.
    var functionName = Blockly.Processing.provideFunction_(
        'mathIsPrime',
        ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ + '(n) {',
         '  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
         '  if (n == 2 || n == 3) {',
         '    return true;',
         '  }',
         '  // False if n is NaN, negative, is 1, or not whole.',
         '  // And false if n is divisible by 2 or 3.',
         '  if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 ||' +
            ' n % 3 == 0) {',
         '    return false;',
         '  }',
         '  // Check all the numbers of form 6k +/- 1, up to sqrt(n).',
         '  for (var x = 6; x <= sqrt(n) + 1; x += 6) {',
         '    if (n % (x - 1) == 0 || n % (x + 1) == 0) {',
         '      return false;',
         '    }',
         '  }',
         '  return true;',
         '}']);
    code = functionName + '(' + number_to_check + ')';
    return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' % 2 == 0';
      break;
    case 'ODD':
      code = number_to_check + ' % 2 == 1';
      break;
    case 'WHOLE':
      code = number_to_check + ' % 1 == 0';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor = Blockly.Processing.valueToCode(block, 'DIVISOR',
          Blockly.Processing.ORDER_MODULUS) || '0';
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, Blockly.Processing.ORDER_EQUALITY];
};

Blockly.Processing['math_change'] = function(block) {
  // Add to a variable in place.
  var argument0 = Blockly.Processing.valueToCode(block, 'DELTA',
      Blockly.Processing.ORDER_ADDITION) || '0';
  var varName = Blockly.Processing.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = (typeof ' + varName + ' == \'number\' ? ' + varName +
      ' : 0) + ' + argument0 + ';\n';
};

// Rounding functions have a single operand.
Blockly.Processing['math_round'] = Blockly.Processing['math_single'];
// Trigonometry functions have a single operand.
Blockly.Processing['math_trig'] = Blockly.Processing['math_single'];

Blockly.Processing['math_on_list'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, code;
  switch (func) {
    case 'SUM':
      list = Blockly.Processing.valueToCode(block, 'LIST',
          Blockly.Processing.ORDER_MEMBER) || '[]';
      code = list + '.reduce(function(x, y) {return x + y;})';
      break;
    case 'MIN':
      list = Blockly.Processing.valueToCode(block, 'LIST',
          Blockly.Processing.ORDER_COMMA) || '[]';
      code = list + '.min()';
      break;
    case 'MAX':
      list = Blockly.Processing.valueToCode(block, 'LIST',
          Blockly.Processing.ORDER_COMMA) || '[]';
      code = list + '.max()';
      break;
    case 'AVERAGE':
      // mathMean([null,null,1,3]) == 2.0.
      var functionName = Blockly.Processing.provideFunction_(
          'mathMean',
          ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
              '(myList) {',
            '  return myList.reduce(function(x, y) {return x + y;}) / ' +
                  'myList.length;',
            '}']);
      list = Blockly.Processing.valueToCode(block, 'LIST',
          Blockly.Processing.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'MEDIAN':
      // mathMedian([null,null,1,3]) == 2.0.
      var functionName = Blockly.Processing.provideFunction_(
          'mathMedian',
          ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
              '(myList) {',
            '  var localList = myList.filter(function (x) ' +
              '{return typeof x == \'number\';});',
            '  if (!localList.length) return null;',
            '  localList.sort(function(a, b) {return b - a;});',
            '  if (localList.length % 2 == 0) {',
            '    return (localList[localList.length / 2 - 1] + ' +
              'localList[localList.length / 2]) / 2;',
            '  } else {',
            '    return localList[(localList.length - 1) / 2];',
            '  }',
            '}']);
      list = Blockly.Processing.valueToCode(block, 'LIST',
          Blockly.Processing.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'MODE':
      // As a list of numbers can contain more than one mode,
      // the returned result is provided as an array.
      // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
      var functionName = Blockly.Processing.provideFunction_(
          'mathModes',
          ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
              '(values) {',
            '  var modes = [];',
            '  var counts = [];',
            '  var maxCount = 0;',
            '  for (var i = 0; i < values.length; i++) {',
            '    var value = values[i];',
            '    var found = false;',
            '    var thisCount;',
            '    for (var j = 0; j < counts.length; j++) {',
            '      if (counts[j][0] === value) {',
            '        thisCount = ++counts[j][1];',
            '        found = true;',
            '        break;',
            '      }',
            '    }',
            '    if (!found) {',
            '      counts.push([value, 1]);',
            '      thisCount = 1;',
            '    }',
            '    maxCount = max(thisCount, maxCount);',
            '  }',
            '  for (var j = 0; j < counts.length; j++) {',
            '    if (counts[j][1] == maxCount) {',
            '        modes.push(counts[j][0]);',
            '    }',
            '  }',
            '  return modes;',
            '}']);
      list = Blockly.Processing.valueToCode(block, 'LIST',
          Blockly.Processing.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'STD_DEV':
      var functionName = Blockly.Processing.provideFunction_(
          'mathStandardDeviation',
          ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
              '(numbers) {',
            '  var n = numbers.length;',
            '  if (!n) return null;',
            '  var mean = numbers.reduce(function(x, y) {return x + y;}) / n;',
            '  var variance = 0;',
            '  for (var j = 0; j < n; j++) {',
            '    variance += pow(numbers[j] - mean, 2);',
            '  }',
            '  variance = variance / n;',
            '  return sqrt(variance);',
            '}']);
      list = Blockly.Processing.valueToCode(block, 'LIST',
          Blockly.Processing.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    case 'RANDOM':
      var functionName = Blockly.Processing.provideFunction_(
          'mathRandomList',
          ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
              '(list) {',
            '  var x = floor(random(list.length));',
            '  return list[x];',
            '}']);
      list = Blockly.Processing.valueToCode(block, 'LIST',
          Blockly.Processing.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['math_modulo'] = function(block) {
  // Remainder computation.
  var argument0 = Blockly.Processing.valueToCode(block, 'DIVIDEND',
      Blockly.Processing.ORDER_MODULUS) || '0';
  var argument1 = Blockly.Processing.valueToCode(block, 'DIVISOR',
      Blockly.Processing.ORDER_MODULUS) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.Processing.ORDER_MODULUS];
};

Blockly.Processing['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  var argument0 = Blockly.Processing.valueToCode(block, 'VALUE',
      Blockly.Processing.ORDER_COMMA) || '0';
  var argument1 = Blockly.Processing.valueToCode(block, 'LOW',
      Blockly.Processing.ORDER_COMMA) || '0';
  var argument2 = Blockly.Processing.valueToCode(block, 'HIGH',
      Blockly.Processing.ORDER_COMMA) || 'Infinity';
  var code = 'min(max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')';
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.Processing.valueToCode(block, 'FROM',
      Blockly.Processing.ORDER_COMMA) || '0';
  var argument1 = Blockly.Processing.valueToCode(block, 'TO',
      Blockly.Processing.ORDER_COMMA) || '0';
  var code = 'floor(random(' + argument0 + ', (' + argument1 + ') + 1)';
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['math_random'] = function(block) {
  // Random number between [X] and [Y].
  var argument0 = Blockly.Processing.valueToCode(block, 'FROM',
      Blockly.Processing.ORDER_COMMA) || '0';
  var argument1 = Blockly.Processing.valueToCode(block, 'TO',
      Blockly.Processing.ORDER_COMMA) || '0';
  var code = 'random(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['math_random_float'] = function(block) {
  // Random fraction between 0 and 1.
  return ['random(1.0)', Blockly.Processing.ORDER_FUNCTION_CALL];
};
