/**
 * LED simulator related functions.
 * The LED simulator is displayed on an HTML Canvas and
 * controlled by functions provided by this script.
 * 
 * LedSimulator
 *   .init(canvas)  - initialize the simulator.
 *   .setNLed(n)    - set the number of LEDs.
 *   .setLedColor(i, color) - change the color of LED #i.
 * LedSimulator.Dispatcher
 *   .runCode(code) - run the code with the task dispatcher.
 *   .stop()        - stop the task dispatcher.
 */

var LedSimulator = (function () {
    var canvas;  // given as an argument of init()

    var nLed = 10;
    var ledWidth = 36;
    var ledMargin = 0;
    var ledSep;  // calculated in initCanvas_()

    return {
        init: function (canvas_) { canvas = canvas_; initCanvas_(); },
        setNLed: function (n_) { nLed = n_; initCanvas_(); },
        setLedColor: setLedColor_
    };

    function initCanvas_() {
      // Draw mock LEDs
      ledSep = (canvas.height - nLed * ledWidth - 2 * ledMargin) / (nLed - 1);
      var ctx = canvas.getContext('2d');
      ctx.clearRect(ledWidth + 2 * ledMargin, 0,
                    canvas.width - ledWidth - 2 * ledMargin, canvas.height);
      ctx.fillStyle = '#666';
      ctx.fillRect(0, 0, ledWidth + 2 * ledMargin, canvas.height);
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = '#aaa';
      ctx.textBaseline = 'middle';
      for (var i = 0, y = ledMargin; i < nLed; i++, y += ledWidth + ledSep) {
        ctx.fillStyle = '#888';
        ctx.fillRect(ledMargin, y, ledWidth, ledWidth);
        setLedColor_(i, '#000');
        ctx.fillStyle = '#666';
        ctx.fillText('' + i, ledWidth + 2 * ledMargin + 10, y + ledWidth/2);
      }
    }

    function setLedColor_(i, color) {
      var ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#aaa';
      var y = ledMargin + i * (ledWidth + ledSep);
      var baseValue = 0x80;
      var hsv = rgbToHsv_(color);
      if (hsv) {
        hsv.value = hsv.value * (255 - baseValue) / 255 + baseValue;
        ctx.fillStyle = hsvToRgb_(hsv);
      } else {
        ctx.fillStyle = color;
      }
      ctx.beginPath();
      ctx.arc(ledMargin + ledWidth/2, y + ledWidth/2, ledWidth * .4,
              0, Math.PI * 2, true);
      ctx.fill();
      ctx.stroke();
    }
  
    /**
     * Convert color string like '#aaa' to an object with properties
     * 'r', 'g', and 'b'.
     */
    function decomposeRgb_(rgb) {
      if (rgb.substr(0, 1) != '#') {
        return null;
      }
      if ((rgb.length - 1) % 3 != 0) {
        return null;
      }
      var l = (rgb.length - 1) / 3;
      if (!(1 <= l && l <= 2)) {
        return null;
      }
      var obj = {
        'r': parseInt(rgb.substr(1,         l), 16),
        'g': parseInt(rgb.substr(1 + l,     l), 16),
        'b': parseInt(rgb.substr(1 + 2 * l, l), 16)
      };
      if (l == 1) {
        obj.r = obj.r * 255 / 15;
        obj.g = obj.g * 255 / 15;
        obj.b = obj.b * 255 / 15;
      }
      return obj;
    }

    /**
     * Convert color string like '#aaa' to an object with properties
     * 'hue', 'saturation', and 'value'.
     */
    function rgbToHsv_(rgb) {
      var obj = decomposeRgb_(rgb);
      if (obj == null) {
        return null;
      }
      var v = Math.max(obj.r, obj.g, obj.b);
      var d = v - Math.min(obj.r, obj.g, obj.b);
      var s = (v == 0 ? 0 : d * 255 / v);
      var h = 0;
      if (d > 0) {
        if      (v == obj.r) { h = 60 * ((obj.g - obj.b) / d); }
        else if (v == obj.g) { h = 60 * ((obj.b - obj.r) / d) + 120; }
        else if (v == obj.b) { h = 60 * ((obj.r - obj.g) / d) + 240; }
      }
      if (h < 0) { h += 360; }
      return {
        'hue': h,
        'saturation': s,
        'value': v
      };
    }

    /**
     * Convert an object with properties 'hue', 'saturation' and 'value'
     * to a string like '#aaa'.
     */
    function hsvToRgb_(hsv) {
      var h = hsv.hue;
      var s = hsv.saturation;
      var v = hsv.value;
      h = Math.round(Math.min(360, Math.max(0, Number(h))));
      s = Math.min(255, Math.max(0, Number(s))) / 255.0;
      v = Math.min(255, Math.max(0, Number(v)));
      var hgroup = Math.floor(h / 60) % 6;
      var f  = (h % 60) / 60.0;
      var p  = (v * (1.0 - s));
      var q  = (v * (1.0 - f * s));
      var t  = (v * (1.0 - (1.0 - f) * s));
      var r, g, b;
      if      (hgroup == 0) { r = v; g = t; b = p; }
      else if (hgroup == 1) { r = q; g = v; b = p; }
      else if (hgroup == 2) { r = p; g = v; b = t; }
      else if (hgroup == 3) { r = p; g = q; b = v; }
      else if (hgroup == 4) { r = t; g = p; b = v; }
      else if (hgroup == 5) { r = v; g = p; b = q; }
      r = ('0' + (Math.round(r) || 0).toString(16)).slice(-2);
      g = ('0' + (Math.round(g) || 0).toString(16)).slice(-2);
      b = ('0' + (Math.round(b) || 0).toString(16)).slice(-2);
      return '#' + r + g + b;
    }
})();

LedSimulator.Dispatcher = (function () {
  var setupFuncs = [];
  var loopFuncs = [];
  var dispatchQueue = [];

  /** when true, the dispatching functions stop. */
  var stop = false;  // request to stop
  var active = false;  // actual state of the dispatcher

  return {
    runCode: runCode_,
    stop: function () {
      if (!stop && active) { stop = true; }
    }
  };

  function runCode_(code) {
    // the dispatcher is still active?
    if (active) {
      // request to stop and try later
      stop = true;
      setTimeout(function () { runCode_(code); }, 10);
      return;
    }

    setupFuncs = [];
    loopFuncs  = [];
    dispatchQueue = [];
    stop = false;
    try {
      eval(code);
      active = true;
      runSetup_(0);
    } catch (e) {
      alert(e);
    }
  }

  /*
   * Functions called by the generated code.
   */
  function addSetup(f) { setupFuncs.push(f); }
  function addLoop (f) { loopFuncs. push(f); }
  function delayMilliseconds(ms) {
    dispatchQueue.push({ 'type': 'd', 'ms': ms });
  }
  function setLedColor(led, color) {
    dispatchQueue.push(
      { 'type': 'c', 'led': led, 'color': color });
  }

  /**
   * Execute the tasks in dispatchQueue.
   * @param {function} fin  a function to be finally executed.
   */
  function dispatch_(fin) {
    if (stop) { active = false; return; }
    while (dispatchQueue.length > 0) {
      var task = dispatchQueue.shift();
      if (task.type == 'd') { // delay
        // schedule the next dispatching
        setTimeout(function () { dispatch_(fin); }, task.ms);
        return;
      }
      if (task.type == 'c') { // setLedColor
        LedSimulator.setLedColor(task.led, task.color);
      }
    }
    setTimeout(fin, 0);
  }

  /**
   * Execute one function in setupFuncs.
   * @param {int} index  index of the function to be executed in setupFuncs.
   */
  function runSetup_(index) {
    if (stop) { active = false; return; }
    if (index >= setupFuncs.length) {
      // execution of the setup functions is over.
      setTimeout(function () { runLoop_(0); }, 0);
      return;
    }
    try {
      // reset the loop-avoidance counter
      window.LoopTrap = 1000;
      // execute a setup function
      (setupFuncs[index])();
      index++;
      // run the dispatcher and then the next setup function.
      setTimeout(function () {
        dispatch_(function () { runSetup_(index); });
      }, 0);
    } catch (e) {
      active = false;
      alert(e);
    }
  }

  /**
   * Execute one function in loopFuncs.
   * @param {int} index  index of the function to be executed in loopFuncs.
   */
  function runLoop_(index) {
    if (stop) { active = false; return; }
    if (index >= loopFuncs.length) {
      // execution of the loop functions is over.
      active = false;
      return;
    }
    try {
      // reset the loop-avoidance counter
      window.LoopTrap = 1000;
      // execute a loop function
      (loopFuncs[index])();
      index = (index + 1) % loopFuncs.length;

      // run the dispatcher and then the next loop function.
      setTimeout(function () {
        dispatch_(function () { runLoop_(index); });
      }, 0);
    } catch (e) {
      active = false;
      alert(e);
    }
  }

})();
