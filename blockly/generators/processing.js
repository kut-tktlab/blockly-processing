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
 * @fileoverview Helper functions for generating Processing for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Processing');

goog.require('Blockly.Generator');


/**
 * Processing code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Processing = new Blockly.Generator('Processing');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Processing.addReservedWords(
    'Blockly,' +  // In case JS is evaled in the current window.
    // https://processing.org/reference/
    'catch,class,draw,exit,extends,false,final,implements,import,loop,new,' + 
    'noLoop,null,popStyle,private,public,pushStyle,redraw,return,setup,' + 
    'static,super,this,thread,true,try,void,cursor,delay,displayDensity,' + 
    'focused,frameCount,frameRate,frameRate,fullScreen,height,noCursor,' + 
    'noSmooth,pixelDensity,pixelHeight,pixelWidth,settings,size,smooth,' + 
    'width,boolean,byte,char,color,double,float,int,long,Array,ArrayList,' + 
    'FloatDict,FloatList,HashMap,IntDict,IntList,JSONArray,JSONObject,' + 
    'Object,String,StringDict,StringList,Table,TableRow,XML,binary,boolean,' + 
    'byte,char,float,hex,int,str,unbinary,unhex,join,match,matchAll,nf,nfc,' + 
    'nfp,nfs,split,splitTokens,trim,append,arrayCopy,concat,expand,reverse,' + 
    'shorten,sort,splice,subset,for,while,break,case,continue,default,else,' + 
    'if,switch,createShape,loadShape,PShape,arc,ellipse,line,point,quad,' + 
    'rect,triangle,bezier,bezierDetail,bezierPoint,bezierTangent,curve,' + 
    'curveDetail,curvePoint,curveTangent,curveTightness,box,sphere,' + 
    'sphereDetail,ellipseMode,rectMode,strokeCap,strokeJoin,strokeWeight,' + 
    'beginContour,beginShape,bezierVertex,curveVertex,endContour,endShape,' + 
    'quadraticVertex,vertex,shape,shapeMode,mouseButton,mouseClicked,' + 
    'mouseDragged,mouseMoved,mousePressed,mousePressed,mouseReleased,' + 
    'mouseWheel,mouseX,mouseY,pmouseX,pmouseY,key,keyCode,keyPressed,' + 
    'keyPressed,keyReleased,keyTyped,BufferedReader,createInput,' + 
    'createReader,launch,loadBytes,loadJSONArray,loadJSONObject,' + 
    'loadStrings,loadTable,loadXML,parseJSONArray,parseJSONObject,parseXML,' + 
    'selectFolder,selectInput,day,hour,millis,minute,month,second,year,' + 
    'print,printArray,println,save,saveFrame,beginRaw,beginRecord,' + 
    'createOutput,createWriter,endRaw,endRecord,PrintWriter,saveBytes,' + 
    'saveJSONArray,saveJSONObject,saveStream,saveStrings,saveTable,saveXML,' + 
    'selectOutput,applyMatrix,popMatrix,printMatrix,pushMatrix,resetMatrix,' + 
    'rotate,rotateX,rotateY,rotateZ,scale,shearX,shearY,translate,' + 
    'ambientLight,directionalLight,lightFalloff,lights,lightSpecular,' + 
    'noLights,normal,pointLight,spotLight,beginCamera,camera,endCamera,' + 
    'frustum,ortho,perspective,printCamera,printProjection,modelX,modelY,' + 
    'modelZ,screenX,screenY,screenZ,ambient,emissive,shininess,specular,' + 
    'background,clear,colorMode,fill,noFill,noStroke,stroke,alpha,blue,' + 
    'brightness,color,green,hue,lerpColor,red,saturation,createImage,' + 
    'PImage,image,imageMode,loadImage,noTint,requestImage,tint,texture,' + 
    'textureMode,textureWrap,blend,copy,filter,get,loadPixels,pixels,set,' + 
    'updatePixels,blendMode,clip,createGraphics,noClip,PGraphics,' + 
    'loadShader,PShader,resetShader,shader,PFont,createFont,loadFont,text,' + 
    'textFont,textAlign,textLeading,textMode,textSize,textWidth,textAscent,' + 
    'textDescent,PVector,abs,ceil,constrain,dist,exp,floor,lerp,log,mag,' + 
    'map,max,min,norm,pow,round,sq,sqrt,acos,asin,atan,atan2,cos,degrees,' + 
    'radians,sin,tan,noise,noiseDetail,noiseSeed,random,randomGaussian,' + 
    'randomSeed,HALF_PI,PI,QUARTER_PI,TAU,TWO_PI,' + 
    // https://developer.mozilla.org/en/JavaScript/Reference/Reserved_Words
    'break,case,catch,continue,debugger,default,delete,do,else,finally,for,function,if,in,instanceof,new,return,switch,this,throw,try,typeof,var,void,while,with,' +
    'class,enum,export,extends,import,super,implements,interface,let,package,private,protected,public,static,yield,' +
    'const,null,true,false,' +
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects
    'Array,ArrayBuffer,Boolean,Date,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,eval,EvalError,Float32Array,Float64Array,Function,Infinity,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,' +
    // https://developer.mozilla.org/en/DOM/window
    'applicationCache,closed,Components,content,_content,controllers,crypto,defaultStatus,dialogArguments,directories,document,frameElement,frames,fullScreen,globalStorage,history,innerHeight,innerWidth,length,location,locationbar,localStorage,menubar,messageManager,mozAnimationStartTime,mozInnerScreenX,mozInnerScreenY,mozPaintCount,name,navigator,opener,outerHeight,outerWidth,pageXOffset,pageYOffset,parent,performance,personalbar,pkcs11,returnValue,screen,screenX,screenY,scrollbars,scrollMaxX,scrollMaxY,scrollX,scrollY,self,sessionStorage,sidebar,status,statusbar,toolbar,top,URL,window,' +
    'addEventListener,alert,atob,back,blur,btoa,captureEvents,clearImmediate,clearInterval,clearTimeout,close,confirm,disableExternalCapture,dispatchEvent,dump,enableExternalCapture,escape,find,focus,forward,GeckoActiveXObject,getAttention,getAttentionWithCycleCount,getComputedStyle,getSelection,home,matchMedia,maximize,minimize,moveBy,moveTo,mozRequestAnimationFrame,open,openDialog,postMessage,print,prompt,QueryInterface,releaseEvents,removeEventListener,resizeBy,resizeTo,restore,routeEvent,scroll,scrollBy,scrollByLines,scrollByPages,scrollTo,setCursor,setImmediate,setInterval,setResizable,setTimeout,showModalDialog,sizeToContent,stop,unescape,updateCommands,XPCNativeWrapper,XPCSafeJSObjectWrapper,' +
    'onabort,onbeforeunload,onblur,onchange,onclick,onclose,oncontextmenu,ondevicemotion,ondeviceorientation,ondragdrop,onerror,onfocus,onhashchange,onkeydown,onkeypress,onkeyup,onload,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onmozbeforepaint,onpaint,onpopstate,onreset,onresize,onscroll,onselect,onsubmit,onunload,onpageshow,onpagehide,' +
    'Image,Option,Worker,' +
    // https://developer.mozilla.org/en/Gecko_DOM_Reference
    'Event,Range,File,FileReader,Blob,BlobBuilder,' +
    'Attr,CDATASection,CharacterData,Comment,console,DocumentFragment,DocumentType,DomConfiguration,DOMError,DOMErrorHandler,DOMException,DOMImplementation,DOMImplementationList,DOMImplementationRegistry,DOMImplementationSource,DOMLocator,DOMObject,DOMString,DOMStringList,DOMTimeStamp,DOMUserData,Entity,EntityReference,MediaQueryList,MediaQueryListListener,NameList,NamedNodeMap,Node,NodeFilter,NodeIterator,NodeList,Notation,Plugin,PluginArray,ProcessingInstruction,SharedWorker,Text,TimeRanges,Treewalker,TypeInfo,UserDataHandler,Worker,WorkerGlobalScope,' +
    'HTMLDocument,HTMLElement,HTMLAnchorElement,HTMLAppletElement,HTMLAudioElement,HTMLAreaElement,HTMLBaseElement,HTMLBaseFontElement,HTMLBodyElement,HTMLBRElement,HTMLButtonElement,HTMLCanvasElement,HTMLDirectoryElement,HTMLDivElement,HTMLDListElement,HTMLEmbedElement,HTMLFieldSetElement,HTMLFontElement,HTMLFormElement,HTMLFrameElement,HTMLFrameSetElement,HTMLHeadElement,HTMLHeadingElement,HTMLHtmlElement,HTMLHRElement,HTMLIFrameElement,HTMLImageElement,HTMLInputElement,HTMLKeygenElement,HTMLLabelElement,HTMLLIElement,HTMLLinkElement,HTMLMapElement,HTMLMenuElement,HTMLMetaElement,HTMLModElement,HTMLObjectElement,HTMLOListElement,HTMLOptGroupElement,HTMLOptionElement,HTMLOutputElement,HTMLParagraphElement,HTMLParamElement,HTMLPreElement,HTMLQuoteElement,HTMLScriptElement,HTMLSelectElement,HTMLSourceElement,HTMLSpanElement,HTMLStyleElement,HTMLTableElement,HTMLTableCaptionElement,HTMLTableCellElement,HTMLTableDataCellElement,HTMLTableHeaderCellElement,HTMLTableColElement,HTMLTableRowElement,HTMLTableSectionElement,HTMLTextAreaElement,HTMLTimeElement,HTMLTitleElement,HTMLTrackElement,HTMLUListElement,HTMLUnknownElement,HTMLVideoElement,' +
    'HTMLCanvasElement,CanvasRenderingContext2D,CanvasGradient,CanvasPattern,TextMetrics,ImageData,CanvasPixelArray,HTMLAudioElement,HTMLVideoElement,NotifyAudioAvailableEvent,HTMLCollection,HTMLAllCollection,HTMLFormControlsCollection,HTMLOptionsCollection,HTMLPropertiesCollection,DOMTokenList,DOMSettableTokenList,DOMStringMap,RadioNodeList,' +
    'SVGDocument,SVGElement,SVGAElement,SVGAltGlyphElement,SVGAltGlyphDefElement,SVGAltGlyphItemElement,SVGAnimationElement,SVGAnimateElement,SVGAnimateColorElement,SVGAnimateMotionElement,SVGAnimateTransformElement,SVGSetElement,SVGCircleElement,SVGClipPathElement,SVGColorProfileElement,SVGCursorElement,SVGDefsElement,SVGDescElement,SVGEllipseElement,SVGFilterElement,SVGFilterPrimitiveStandardAttributes,SVGFEBlendElement,SVGFEColorMatrixElement,SVGFEComponentTransferElement,SVGFECompositeElement,SVGFEConvolveMatrixElement,SVGFEDiffuseLightingElement,SVGFEDisplacementMapElement,SVGFEDistantLightElement,SVGFEFloodElement,SVGFEGaussianBlurElement,SVGFEImageElement,SVGFEMergeElement,SVGFEMergeNodeElement,SVGFEMorphologyElement,SVGFEOffsetElement,SVGFEPointLightElement,SVGFESpecularLightingElement,SVGFESpotLightElement,SVGFETileElement,SVGFETurbulenceElement,SVGComponentTransferFunctionElement,SVGFEFuncRElement,SVGFEFuncGElement,SVGFEFuncBElement,SVGFEFuncAElement,SVGFontElement,SVGFontFaceElement,SVGFontFaceFormatElement,SVGFontFaceNameElement,SVGFontFaceSrcElement,SVGFontFaceUriElement,SVGForeignObjectElement,SVGGElement,SVGGlyphElement,SVGGlyphRefElement,SVGGradientElement,SVGLinearGradientElement,SVGRadialGradientElement,SVGHKernElement,SVGImageElement,SVGLineElement,SVGMarkerElement,SVGMaskElement,SVGMetadataElement,SVGMissingGlyphElement,SVGMPathElement,SVGPathElement,SVGPatternElement,SVGPolylineElement,SVGPolygonElement,SVGRectElement,SVGScriptElement,SVGStopElement,SVGStyleElement,SVGSVGElement,SVGSwitchElement,SVGSymbolElement,SVGTextElement,SVGTextPathElement,SVGTitleElement,SVGTRefElement,SVGTSpanElement,SVGUseElement,SVGViewElement,SVGVKernElement,' +
    'SVGAngle,SVGColor,SVGICCColor,SVGElementInstance,SVGElementInstanceList,SVGLength,SVGLengthList,SVGMatrix,SVGNumber,SVGNumberList,SVGPaint,SVGPoint,SVGPointList,SVGPreserveAspectRatio,SVGRect,SVGStringList,SVGTransform,SVGTransformList,' +
    'SVGAnimatedAngle,SVGAnimatedBoolean,SVGAnimatedEnumeration,SVGAnimatedInteger,SVGAnimatedLength,SVGAnimatedLengthList,SVGAnimatedNumber,SVGAnimatedNumberList,SVGAnimatedPreserveAspectRatio,SVGAnimatedRect,SVGAnimatedString,SVGAnimatedTransformList,' +
    'SVGPathSegList,SVGPathSeg,SVGPathSegArcAbs,SVGPathSegArcRel,SVGPathSegClosePath,SVGPathSegCurvetoCubicAbs,SVGPathSegCurvetoCubicRel,SVGPathSegCurvetoCubicSmoothAbs,SVGPathSegCurvetoCubicSmoothRel,SVGPathSegCurvetoQuadraticAbs,SVGPathSegCurvetoQuadraticRel,SVGPathSegCurvetoQuadraticSmoothAbs,SVGPathSegCurvetoQuadraticSmoothRel,SVGPathSegLinetoAbs,SVGPathSegLinetoHorizontalAbs,SVGPathSegLinetoHorizontalRel,SVGPathSegLinetoRel,SVGPathSegLinetoVerticalAbs,SVGPathSegLinetoVerticalRel,SVGPathSegMovetoAbs,SVGPathSegMovetoRel,ElementTimeControl,TimeEvent,SVGAnimatedPathData,' +
    'SVGAnimatedPoints,SVGColorProfileRule,SVGCSSRule,SVGExternalResourcesRequired,SVGFitToViewBox,SVGLangSpace,SVGLocatable,SVGRenderingIntent,SVGStylable,SVGTests,SVGTextContentElement,SVGTextPositioningElement,SVGTransformable,SVGUnitTypes,SVGURIReference,SVGViewSpec,SVGZoomAndPan');

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
 */
Blockly.Processing.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.Processing.ORDER_NEW = 1.1;            // new
Blockly.Processing.ORDER_MEMBER = 1.2;         // . []
Blockly.Processing.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.Processing.ORDER_INCREMENT = 3;        // ++
Blockly.Processing.ORDER_DECREMENT = 3;        // --
Blockly.Processing.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.Processing.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.Processing.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.Processing.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.Processing.ORDER_TYPEOF = 4.5;         // typeof
Blockly.Processing.ORDER_VOID = 4.6;           // void
Blockly.Processing.ORDER_DELETE = 4.7;         // delete
Blockly.Processing.ORDER_DIVISION = 5.1;       // /
Blockly.Processing.ORDER_MULTIPLICATION = 5.2; // *
Blockly.Processing.ORDER_MODULUS = 5.3;        // %
Blockly.Processing.ORDER_SUBTRACTION = 6.1;    // -
Blockly.Processing.ORDER_ADDITION = 6.2;       // +
Blockly.Processing.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.Processing.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.Processing.ORDER_IN = 8;               // in
Blockly.Processing.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.Processing.ORDER_EQUALITY = 9;         // == != === !==
Blockly.Processing.ORDER_BITWISE_AND = 10;     // &
Blockly.Processing.ORDER_BITWISE_XOR = 11;     // ^
Blockly.Processing.ORDER_BITWISE_OR = 12;      // |
Blockly.Processing.ORDER_LOGICAL_AND = 13;     // &&
Blockly.Processing.ORDER_LOGICAL_OR = 14;      // ||
Blockly.Processing.ORDER_CONDITIONAL = 15;     // ?:
Blockly.Processing.ORDER_ASSIGNMENT = 16;      // = += -= *= /= %= <<= >>= ...
Blockly.Processing.ORDER_COMMA = 17;           // ,
Blockly.Processing.ORDER_NONE = 99;            // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Processing.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.Processing.ORDER_FUNCTION_CALL, Blockly.Processing.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.Processing.ORDER_FUNCTION_CALL, Blockly.Processing.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.Processing.ORDER_MEMBER, Blockly.Processing.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.Processing.ORDER_MEMBER, Blockly.Processing.ORDER_FUNCTION_CALL],

  // !(!foo) -> !!foo
  [Blockly.Processing.ORDER_LOGICAL_NOT, Blockly.Processing.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.Processing.ORDER_MULTIPLICATION, Blockly.Processing.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.Processing.ORDER_ADDITION, Blockly.Processing.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.Processing.ORDER_LOGICAL_AND, Blockly.Processing.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.Processing.ORDER_LOGICAL_OR, Blockly.Processing.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Processing.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Processing.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Processing.functionNames_ = Object.create(null);

  if (!Blockly.Processing.variableDB_) {
    Blockly.Processing.variableDB_ =
        new Blockly.Names(Blockly.Processing.RESERVED_WORDS_);
  } else {
    Blockly.Processing.variableDB_.reset();
  }

  var defvars = [];
  var variables = workspace.variableList;
  if (variables.length) {
    for (var i = 0; i < variables.length; i++) {
      defvars[i] = Blockly.Processing.variableDB_.getName(variables[i],
          Blockly.Variables.NAME_TYPE);
    }
    Blockly.Processing.definitions_['variables'] =
        'var ' + defvars.join(', ') + ';';
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Processing.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Processing.definitions_) {
    definitions.push(Blockly.Processing.definitions_[name]);
  }
  // Trailer: call the main loop function.
  var loopFunc = Blockly.Processing.MAIN_LOOP_FUNCTION_NAME_;
  var trailer = '';
  if (Blockly.Processing.definitions_[loopFunc]) {
    trailer =
      'for (var _mainLoopCnt = 0; _mainLoopCnt < 3; _mainLoopCnt++) {\n' +
      '  ' + loopFunc + '();\n}\n';
  }
  // Clean up temporary data.
  delete Blockly.Processing.definitions_;
  delete Blockly.Processing.functionNames_;
  Blockly.Processing.variableDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code + trailer;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Processing.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Processing string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} Processing string.
 * @private
 */
Blockly.Processing.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '"' + string + '"';
};

/**
 * Common tasks for generating Processing from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Processing code created for this block.
 * @return {string} Processing code with comments and subsequent blocks added.
 * @private
 */
Blockly.Processing.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Processing.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += '/**\n' +
                       Blockly.Processing.prefixLines(comment + '\n', ' * ') +
                       ' */\n';
      } else {
        commentCode += Blockly.Processing.prefixLines(comment + '\n', '// ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Processing.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Processing.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Processing.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.Processing.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.Processing.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.Processing.valueToCode(block, atId,
        Blockly.Processing.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.Processing.valueToCode(block, atId,
        Blockly.Processing.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.Processing.valueToCode(block, atId,
        Blockly.Processing.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.Processing.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseFloat(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.Processing.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.Processing.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.Processing.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};
