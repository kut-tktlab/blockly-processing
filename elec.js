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
global.ledStrip = {
    setLedColor: function (led, color) {
        console.log('setLedColor(' + led + ', ' + color + ')');
    },
    clearAllLed: function () {
        console.log('clearAllLed()');
    },
    flush: function () {
        console.log('flush()');
    }
};
