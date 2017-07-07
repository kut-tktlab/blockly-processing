var N_LED = 12;

// If you do not want to use the blockly-receiver,
// comment out the following line.
var ledFile = '/tmp/bky-led-fifo';

var fs = require('fs');
if (typeof ledFile !== 'undefined' && !fs.existsSync(ledFile)) {
    console.log('Error: ' + ledFile + ' does not exist.' +
                ' Run bkykeepfifo first.');
    process.exit(1);
}

// Launch the browser
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
app.on('ready', function () {
    mainWindow = new BrowserWindow({ width:900, height:700 });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    //mainWindow.openDevTools(); // Dev Tools for debugging
});

// a receiver of LED controlling commands
global.ledStrip = (function () {
    var dirty = false;
    var buffer = [];
    var fd = null;
    clearAllLed_();
    return {
        setLedColor: setLedColor_,
        clearAllLed: function () {
            clearAllLed_();
            dirty = true;
        },
        flush: flush_,
        open:  function () { fd = fs.openSync(ledFile, 'w'); },
        close: function () { fd = fs.closeSync(fd); }
    };
    function clearAllLed_() {
        for (var i = 0; i < N_LED; i++) {
            buffer[i] = '#000000';
        }
    }
    function setLedColor_(led, color) {
        if (0 <= led && led < N_LED &&
            color.startsWith('#') && color.length == 7)
        {
            buffer[led] = color;
            dirty = true;
        }
    }
    function flush_() {
        if (dirty) {
            fs.writeSync(fd, buffer.join('') + '\n');
            //console.log(buffer.join(''));
            dirty = false;
        }
    }
})();
