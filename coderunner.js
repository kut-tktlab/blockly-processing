/**
 * Functions to execute a code for controlling LEDs.
 * 
 * CodeRunner
 *   .setTarget(target) - set the target object, e.g. LedSimulator.
 *   .runCode(code, stateChangeListener, alertListener)
 *                      - run the code with the task dispatcher.
 *   .stop()            - stop the task dispatcher.
 *   .setTimeLimit(sec) - set the time limit to run a code.
 */

var CodeRunner = (function () {
  /** automatically stop after a time limit expires (sec) */
  var timeLimit = 10;
  var startTime = null;  // set by runCode()

  /** queues of tasks */
  var setupFuncs = [];
  var loopFuncs = [];
  var dispatchQueue = [];

  /** list of observers of dispatcher's state change */
  var stateChangeListener = null;
  var alertListener = null;  // observer of errors

  /** when true, the dispatching functions stop. */
  var stopReq = false;  // request to stop
  var active  = false;  // actual state of the dispatcher

  /** counter for avoding infinite loops */
  var LoopTrap = 1000;

  /** target for control */
  var target = { // a dummy target
    setLedColor: function (led, color) {},
    clearAllLed: function () {},
    flush: function () {},
    open:  function () {},
    close: function () {}
  };

  return {
    runCode: runCode_,
    stop: function () {
      if (active) { stopReq = true; }
    },
    setTarget: function (t) { target = t; },
    setTimeLimit: function (sec) { timeLimit = sec; },
    createStub: createStub_  // for communicating with server.js
  };

  function runCode_(code, stateChange, alert) {
    // the dispatcher is still active?
    if (active) {
      // request to stop and wait a moment
      stopReq = true;
      setTimeout(function () {
        runCode_(code, stateChange, alert); }, 10);
      return;
    }

    setupFuncs = [];
    loopFuncs  = [];
    dispatchQueue = [];
    stopReq = false;
    startTime = null;
    LoopTrap = 1000;
    stateChangeListener = stateChange;
    alertListener = alert;
    try {
      eval(code);
      setActive_();
      startTime = new Date();
      runSetup_(0);
    } catch (e) {
      alertListener(e);
    }
  }

  /*
   * Functions called when the dispatcher's state changes.
   */
  function setActive_() {
    target.open();
    active = true;
    stateChangeListener(active);
  }
  function setInactive_() {
    target.close();
    active = false;
    stateChangeListener(active);
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
        // flush
        target.flush();
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
      LoopTrap = 1000;
      // execute a setup function
      (setupFuncs[index])();
      index++;
      // run the dispatcher and then the next setup function.
      setTimeout(function () {
        dispatch_(function () { runSetup_(index); });
      }, 0);
    } catch (e) {
      setInactive_();
      alertListener(e);
    }
  }

  /**
   * Execute one function in loopFuncs.
   * @param {int} index  index of the function to be executed in loopFuncs.
   */
  function runLoop_(index) {
    if (startTime &&
        new Date().getTime() - startTime.getTime() > timeLimit * 1000)
    {
      stopReq = true;
    }
    if (stopReq) { setInactive_(); return; }
    target.flush();
    if (index >= loopFuncs.length) {
      // execution of the loop functions is over.
      setInactive_();
      return;
    }
    try {
      // reset the loop-avoidance counter
      LoopTrap = 1000;
      // execute a loop function
      (loopFuncs[index])();
      index = (index + 1) % loopFuncs.length;

      // run the dispatcher and then the next loop function.
      setTimeout(function () {
        dispatch_(function () { runLoop_(index); });
      }, 0);
    } catch (e) {
      setInactive_();
      alertListener(e);
    }
  }

  /**
   * A function for creating a stub for communicating with
   * the CodeRunner in the server.js.
   * If you use server.js,
   * do `CodeRunner = CodeRunner.createStub(io.connect());`
   * in the client side.
   */
  function createStub_(socket) {
    socket.on('changeState', function (active) {
      stateChangeListener(active);
    });
    socket.on('alert', function (msg) {
      window.alert(msg);
    });
    return {
      runCode: function (code, stateChange, alert) {
        stateChangeListener = stateChange;
        alertListener = alert;
        socket.emit('runCode', code);
      },
      stop:    function ()     { socket.emit('stop'); },
      setTimeLimit:
               function (sec)  { socket.emit('setTimeLimit', sec); },
      setTarget: undefined
    };
  }

})();

// A trick to use this module on both node.js and a browser.
(function (exports) {
  exports.CodeRunner = CodeRunner;
})(typeof exports === 'undefined' ? this.coderunner = {} : exports);
