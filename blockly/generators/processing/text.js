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
 * @fileoverview Generating Processing for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Processing.texts');

goog.require('Blockly.Processing');


Blockly.Processing['text'] = function(block) {
  // Text value.
  var code = Blockly.Processing.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Processing.ORDER_ATOMIC];
};

Blockly.Processing['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  switch (block.itemCount_) {
    case 0:
      return ['\'\'', Blockly.Processing.ORDER_ATOMIC];
    case 1:
      var element = Blockly.Processing.valueToCode(block, 'ADD0',
          Blockly.Processing.ORDER_NONE) || '\'\'';
      var code = 'String(' + element + ')';
      return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
    case 2:
      var element0 = Blockly.Processing.valueToCode(block, 'ADD0',
          Blockly.Processing.ORDER_NONE) || '\'\'';
      var element1 = Blockly.Processing.valueToCode(block, 'ADD1',
          Blockly.Processing.ORDER_NONE) || '\'\'';
      var code = 'String(' + element0 + ') + String(' + element1 + ')';
      return [code, Blockly.Processing.ORDER_ADDITION];
    default:
      var elements = new Array(block.itemCount_);
      for (var i = 0; i < block.itemCount_; i++) {
        elements[i] = Blockly.Processing.valueToCode(block, 'ADD' + i,
            Blockly.Processing.ORDER_COMMA) || '\'\'';
      }
      var code = '[' + elements.join(',') + '].join(\'\')';
      return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
  }
};

Blockly.Processing['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Processing.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var value = Blockly.Processing.valueToCode(block, 'TEXT',
      Blockly.Processing.ORDER_NONE) || '\'\'';
  return varName + ' = String(' + varName + ') + String(' + value + ');\n';
};

Blockly.Processing['text_length'] = function(block) {
  // String or array length.
  var text = Blockly.Processing.valueToCode(block, 'VALUE',
      Blockly.Processing.ORDER_FUNCTION_CALL) || '\'\'';
  return [text + '.length', Blockly.Processing.ORDER_MEMBER];
};

Blockly.Processing['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.Processing.valueToCode(block, 'VALUE',
      Blockly.Processing.ORDER_MEMBER) || '\'\'';
  return ['!' + text + '.length', Blockly.Processing.ORDER_LOGICAL_NOT];
};

Blockly.Processing['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var substring = Blockly.Processing.valueToCode(block, 'FIND',
      Blockly.Processing.ORDER_NONE) || '\'\'';
  var text = Blockly.Processing.valueToCode(block, 'VALUE',
      Blockly.Processing.ORDER_MEMBER) || '\'\'';
  var code = text + '.' + operator + '(' + substring + ')';
  // Adjust index if using one-based indices.
  if (block.workspace.options.oneBasedIndex) {
    return [code + ' + 1', Blockly.Processing.ORDER_ADDITION];
  }
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var textOrder = (where == 'RANDOM') ? Blockly.Processing.ORDER_NONE :
      Blockly.Processing.ORDER_MEMBER;
  var text = Blockly.Processing.valueToCode(block, 'VALUE',
      textOrder) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '.charAt(0)';
      return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
    case 'LAST':
      var code = text + '.slice(-1)';
      return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
    case 'FROM_START':
      var at = Blockly.Processing.getAdjusted(block, 'AT');
      // Adjust index if using one-based indices.
      var code = text + '.charAt(' + at + ')';
      return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
    case 'FROM_END':
      var at = Blockly.Processing.getAdjusted(block, 'AT', 1, true);
      var code = text + '.slice(' + at + ').charAt(0)';
      return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
    case 'RANDOM':
      var functionName = Blockly.Processing.provideFunction_(
          'textRandomLetter',
          ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
              '(text) {',
           '  var x = Math.floor(Math.random() * text.length);',
           '  return text[x];',
           '}']);
      var code = functionName + '(' + text + ')';
      return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
  }
  throw 'Unhandled option (text_charAt).';
};

/**
 * Returns an expression calculating the index into a string.
 * @private
 * @param {string} stringName Name of the string, used to calculate length.
 * @param {string} where The method of indexing, selected by dropdown in Blockly
 * @param {string=} opt_at The optional offset when indexing from start/end.
 * @return {string} Index expression.
 */
Blockly.Processing.text.getIndex_ = function(stringName, where, opt_at) {
  if (where == 'FIRST') {
    return '0';
  } else if (where == 'FROM_END') {
    return stringName + '.length - 1 - ' + opt_at;
  } else if (where == 'LAST') {
    return stringName + '.length - 1';
  } else {
    return opt_at;
  }
};

Blockly.Processing['text_getSubstring'] = function(block) {
  // Get substring.
  var text = Blockly.Processing.valueToCode(block, 'STRING',
      Blockly.Processing.ORDER_FUNCTION_CALL) || '\'\'';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = text;
  } else if (text.match(/^'?\w+'?$/) ||
      (where1 != 'FROM_END' && where1 != 'LAST' &&
      where2 != 'FROM_END' && where2 != 'LAST')) {
    // If the text is a variable or literal or doesn't require a call for
    // length, don't generate a helper function.
    switch (where1) {
      case 'FROM_START':
        var at1 = Blockly.Processing.getAdjusted(block, 'AT1');
        break;
      case 'FROM_END':
        var at1 = Blockly.Processing.getAdjusted(block, 'AT1', 1, false,
            Blockly.Processing.ORDER_SUBTRACTION);
        at1 = text + '.length - ' + at1;
        break;
      case 'FIRST':
        var at1 = '0';
        break;
      default:
        throw 'Unhandled option (text_getSubstring).';
    }
    switch (where2) {
      case 'FROM_START':
        var at2 = Blockly.Processing.getAdjusted(block, 'AT2', 1);
        break;
      case 'FROM_END':
        var at2 = Blockly.Processing.getAdjusted(block, 'AT2', 0, false,
            Blockly.Processing.ORDER_SUBTRACTION);
        at2 = text + '.length - ' + at2;
        break;
      case 'LAST':
        var at2 = text + '.length';
        break;
      default:
        throw 'Unhandled option (text_getSubstring).';
    }
    code = text + '.slice(' + at1 + ', ' + at2 + ')';
  } else {
    var at1 = Blockly.Processing.getAdjusted(block, 'AT1');
    var at2 = Blockly.Processing.getAdjusted(block, 'AT2');
    var getIndex_ = Blockly.Processing.text.getIndex_;
    var wherePascalCase = {'FIRST': 'First', 'LAST': 'Last',
      'FROM_START': 'FromStart', 'FROM_END': 'FromEnd'};
    var functionName = Blockly.Processing.provideFunction_(
        'subsequence' + wherePascalCase[where1] + wherePascalCase[where2],
        ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
        '(sequence' +
        // The value for 'FROM_END' and'FROM_START' depends on `at` so
        // we add it as a parameter.
        ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', at1' : '') +
        ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', at2' : '') +
        ') {',
          '  var start = ' + getIndex_('sequence', where1, 'at1') + ';',
          '  var end = ' + getIndex_('sequence', where2, 'at2') + ' + 1;',
          '  return sequence.slice(start, end);',
          '}']);
    var code = functionName + '(' + text +
        // The value for 'FROM_END' and 'FROM_START' depends on `at` so we
        // pass it.
        ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', ' + at1 : '') +
        ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', ' + at2 : '') +
        ')';
  }
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['text_changeCase'] = function(block) {
  // Change capitalization.
  var OPERATORS = {
    'UPPERCASE': '.toUpperCase()',
    'LOWERCASE': '.toLowerCase()',
    'TITLECASE': null
  };
  var operator = OPERATORS[block.getFieldValue('CASE')];
  var textOrder = operator ? Blockly.Processing.ORDER_MEMBER :
      Blockly.Processing.ORDER_NONE;
  var text = Blockly.Processing.valueToCode(block, 'TEXT',
      textOrder) || '\'\'';
  if (operator) {
    // Upper and lower case are functions built into Processing.
    var code = text + operator;
  } else {
    // Title case is not a native Processing function.  Define one.
    var functionName = Blockly.Processing.provideFunction_(
        'textToTitleCase',
        ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
            '(str) {',
         '  return str.replace(/\\S+/g,',
         '      function(txt) {return txt[0].toUpperCase() + ' +
            'txt.substring(1).toLowerCase();});',
         '}']);
    var code = functionName + '(' + text + ')';
  }
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    'LEFT': ".replace(/^[\\s\\xa0]+/, '')",
    'RIGHT': ".replace(/[\\s\\xa0]+$/, '')",
    'BOTH': '.trim()'
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var text = Blockly.Processing.valueToCode(block, 'TEXT',
      Blockly.Processing.ORDER_MEMBER) || '\'\'';
  return [text + operator, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.Processing.valueToCode(block, 'TEXT',
      Blockly.Processing.ORDER_NONE) || '\'\'';
  return 'window.alert(' + msg + ');\n';
};

Blockly.Processing['text_prompt_ext'] = function(block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.Processing.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.Processing.valueToCode(block, 'TEXT',
        Blockly.Processing.ORDER_NONE) || '\'\'';
  }
  var code = 'window.prompt(' + msg + ')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'parseFloat(' + code + ')';
  }
  return [code, Blockly.Processing.ORDER_FUNCTION_CALL];
};

Blockly.Processing['text_prompt'] = Blockly.Processing['text_prompt_ext'];

Blockly.Processing['text_count'] = function(block) {
  var text = Blockly.Processing.valueToCode(block, 'TEXT',
      Blockly.Processing.ORDER_MEMBER) || '\'\'';
  var sub = Blockly.Processing.valueToCode(block, 'SUB',
      Blockly.Processing.ORDER_NONE) || '\'\'';
  var functionName = Blockly.Processing.provideFunction_(
      'textCount',
      ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
          '(haystack, needle) {',
       '  if (needle.length === 0) {',
       '    return haystack.length + 1;',
       '  } else {',
       '    return haystack.split(needle).length - 1;',
       '  }',
       '}']);
  var code = functionName + '(' + text + ', ' + sub + ')';
  return [code, Blockly.Processing.ORDER_SUBTRACTION];
};

Blockly.Processing['text_replace'] = function(block) {
  var text = Blockly.Processing.valueToCode(block, 'TEXT',
      Blockly.Processing.ORDER_MEMBER) || '\'\'';
  var from = Blockly.Processing.valueToCode(block, 'FROM',
      Blockly.Processing.ORDER_NONE) || '\'\'';
  var to = Blockly.Processing.valueToCode(block, 'TO',
      Blockly.Processing.ORDER_NONE) || '\'\'';
  // The regex escaping code below is taken from the implementation of
  // goog.string.regExpEscape.
  var functionName = Blockly.Processing.provideFunction_(
      'textReplace',
      ['function ' + Blockly.Processing.FUNCTION_NAME_PLACEHOLDER_ +
          '(haystack, needle, replacement) {',
       '  needle = ' +
           'needle.replace(/([-()\\[\\]{}+?*.$\\^|,:#<!\\\\])/g,"\\\\$1")',
       '                 .replace(/\\x08/g,"\\\\x08");',
       '  return haystack.replace(new RegExp(needle, \'g\'), replacement);',
       '}']);
  var code = functionName + '(' + text + ', ' + from + ', ' + to + ')';
  return [code, Blockly.Processing.ORDER_MEMBER];
};

Blockly.Processing['text_reverse'] = function(block) {
  var text = Blockly.Processing.valueToCode(block, 'TEXT',
      Blockly.Processing.ORDER_MEMBER) || '\'\'';
  var code = text + '.split(\'\').reverse().join(\'\')';
  return [code, Blockly.Processing.ORDER_MEMBER];
};