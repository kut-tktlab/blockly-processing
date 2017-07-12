/**
 * The server of the blockly-for-led.
 * (c) 2017, Yoshiaki Takata
 * It has the following functions:
 *   - a simple HTTP server, which provides a browser with HTML/CSS/JS
 *     files under the current directory.
 *   - a WebSocket server, which mediates between a browser and the
 *     CodeRunner object (defined in coderunner.js).
 *   - an engine to run the CodeRunner to control an LED strip, by
 *     communicating with bkyreceiver (defined in serial-led-pi)
 *     through a fifo.
 * 
 * Usage:
 * ```
 * $ node install                    # to install socket.io
 * $ sudo node server.js
 * ```
 */

const port    = 8080;
const nLed    = 12;  // no problem if it is more than the real number of LEDs.
const gpioPin = 18;
const serialLedDir = '../serial-led-pi';

// Rules for connection permission
function allowedAddress(addr) {
    if (addr == '127.0.0.1') { return true; }
    if (addr == '::1') { return true; }
    if (addr.startsWith('172.21.')) { return true; }
    if (addr.startsWith('::ffff:172.21.')) { return true; }
    if (addr.startsWith('fe80:')) { return true; } // link-local addr
    return false;
}

// Check whether running in the correct directory.
var fs = require('fs');
if (!fs.existsSync('index.html')) {
    console.log('Error: index.html does not exist.');
    console.log('Maybe you are running this in a wrong directory.');
    process.exit(1);
}

// Setup the LEDs.
var bkyled = require(serialLedDir + '/build/Release/bky-led');
if (bkyled.setup(gpioPin, nLed) == -1) {
    console.log('Error: cannot setup an LED strip.');
    process.exit(1);
}

// Create a receiver of LED controlling commands
var ledStrip = (function () {
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
        open:  function () {},
        close: function () {}
    };
    function clearAllLed_() {
        for (var i = 0; i < nLed; i++) {
            setLedColor_(i, '#000000');
        }
    }
    function setLedColor_(led, color) {
        if (0 <= led && led < nLed &&
            color.startsWith('#') && color.length == 7)
        {
            var r = parseInt(color.substring(1, 3), 16);
            var g = parseInt(color.substring(3, 5), 16);
            var b = parseInt(color.substring(5, 7), 16);
            bkyled.setColor(led, r, g, b);
            dirty = true;
        }
    }
    function flush_() {
        if (dirty) {
            bkyled.send();
            dirty = false;
        }
    }
})();

// Create a code runner and set its target to the ledStrip.
var codeRunner = require('./coderunner.js').CodeRunner;
codeRunner.setTarget(ledStrip);

// Create a simple HTTP server that only provides usual files.
var server = require('http').createServer();

server.on('request', function(req, res) {
    var path = require('path');
    var uri  = require('url').parse(req.url).pathname;
    var filepath = path.join(process.cwd(), uri);

    if (!fs.existsSync(filepath)) {
        console.log(filepath + ' does not exist.');
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found\n');
        res.end();
        return;
    }
    if (fs.statSync(filepath).isDirectory()) {
        filepath += '/index.html';
    }
    fs.readFile(filepath, 'binary', function(err, file) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write(err + '\n');
            res.end();
            return;
        }
        var ext = path.extname(filepath);
        var contentType = {
            '.html': 'text/html',
            '.js':   'text/javascript',
            '.css':  'text/css',
            '.txt':  'text/plain'
        }[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.write(file, 'binary');
        res.end();
    }); 
});

// Open a socket for a WebSocket communication, and run the server.
var io = require('socket.io').listen(server);
server.listen(port);
console.log('Server running at http://localhost:' + port);

process.on('SIGINT',  terminateServer);
process.on('SIGHUP',  terminateServer);
process.on('SIGTERM', terminateServer);
function terminateServer () {
    console.log('terminating server.js');
    bkyled.cleanup();
    process.exit(0);
}

io.sockets.on('connection', function (socket) {
    var addr = socket.handshake.address;
    console.log('connection from ' + addr + ' socket.id=' + socket.id);
    if (!allowedAddress(addr)) {
        console.log('ERR: connection not allowed');
        return;
    }
    socket.on('runCode', function (code) {
        console.log('runCode socket.id=' + socket.id);
        codeRunner.runCode(code, function (state) {
            console.log('changeState to ' + state);
            socket.emit('changeState', state);
        }, function (msg) {
            console.log('alert on running code: ' + msg);
            socket.emit('alert', msg);
        });
    });
    socket.on('stop', function () {
        console.log('stop');
        codeRunner.stop();
    });
    socket.on('setTimeLimit', function (sec) {
        console.log('setTimeLimit');
        codeRunner.setTimeLimit(sec);
    });
});
