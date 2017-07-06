/**
 * Functions to execute a code for controlling LEDs.
 * 
 * CodeRunner
 *   .setTarget(target) - set the target object, e.g. LedSimulator.
 *   .runCode(code) - run the code with the task dispatcher.
 *   .stop()        - stop the task dispatcher.
 *   .addListener(listener) - add an observer of dispatcher's state change.
 */

var CodeRunner = (function () {
  /** queues of tasks */
  var setupFuncs = [];
  var loopFuncs = [];
  var dispatchQueue = [];

  /** list of observers of dispatcher's state change */
  var observers = [];

  /** when true, the dispatching functions stop. */
  var stopReq = false;  // request to stop
  var active  = false;  // actual state of the dispatcher

  /** target for control */
  var target = { // a dummy target
    setLedColor: function (led, color) {},
    clearAllLed: function () {}
  };

  return {
    runCode: runCode_,
    stop: function () {
      if (active) { stopReq = true; }
    },
    addListener: function (listener) {
      observers.push(listener);
    },
    setTarget: function (t) { target = t; }
  };

  function runCode_(code) {
    // the dispatcher is still active?
    if (active) {
      // request to stop and wait a moment
      stopReq = true;
      setTimeout(function () { runCode_(code); }, 10);
      return;
    }

    setupFuncs = [];
    loopFuncs  = [];
    dispatchQueue = [];
    stopReq = false;
    try {
      eval(code);
      setActive_();
      runSetup_(0);
    } catch (e) {
      alert(e);
    }
  }

  /*
   * Functions called when the dispatcher's state changes.
   */
  function setActive_() {
    active = true;
    for (var i = 0; i < observers.length; i++) {
      (observers[i])(active);
    }
  }
  function setInactive_() {
    active = false;
    for (var i = 0; i < observers.length; i++) {
      (observers[i])(active);
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
  function clearAllLed() {
    dispatchQueue.push(
      { 'type': 'x' });
  }

  /**
   * Execute the tasks in dispatchQueue.
   * @param {function} fin  a function to be finally executed.
   */
  function dispatch_(fin) {
    if (stopReq) { setInactive_(); return; }
    while (dispatchQueue.length > 0) {
      var task = dispatchQueue.shift();
      if (task.type == 'd') { // delay
        // schedule the next dispatching
        setTimeout(function () { dispatch_(fin); }, task.ms);
        return;
      }
      if (task.type == 'c') { // setLedColor
        target.setLedColor(task.led, task.color);
      } else if (task.type == 'x') { // clearAllLed
        target.clearAllLed();
      }
    }
    setTimeout(fin, 0);
  }

  /**
   * Execute one function in setupFuncs.
   * @param {int} index  index of the function to be executed in setupFuncs.
   */
  function runSetup_(index) {
    if (stopReq) { setInactive_(); return; }
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
      setInactive_();
      alert(e);
    }
  }

  /**
   * Execute one function in loopFuncs.
   * @param {int} index  index of the function to be executed in loopFuncs.
   */
  function runLoop_(index) {
    if (stopReq) { setInactive_(); return; }
    if (index >= loopFuncs.length) {
      // execution of the loop functions is over.
      setInactive_();
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
      setInactive_();
      alert(e);
    }
  }

})();
