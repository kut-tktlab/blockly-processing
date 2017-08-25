// Retrieve the Reference of Processing and extract keywords.
// Usage: node get_keywords.js

var DOMParser = require('xmldom').DOMParser;
var fs  = require('fs');

var srcPath = '/Applications/Processing.app/Contents/Java/' +
              'modes/java/reference/index.html';
var src = fs.readFileSync(srcPath);
var doc = new DOMParser().parseFromString(src.toString(), 'text/html');

var indent = '    '; // 4 spaces

var divs = doc.getElementsByTagName('div');
var buf = '';
for (var j = 0; j < divs.length; j++) {
  if (divs[j].getAttribute('class') == 'ref-col') {
    var as = divs[j].getElementsByTagName('a');
    for (var i = 0; i < as.length; i++) {
      var key = as[i].textContent;
      if (key.match(/^[A-Za-z]/)) {
        key = key.replace(/\(\)$|\[\]$/, '');
        if (buf.length + key.length >= 70) {
          flushBuf();
        }
        buf += key + ',';
      }
    }
  }
}
if (buf) {
  flushBuf();
}

function flushBuf() {
  console.log(indent + "'" + buf + "' + ");
  buf = '';
}
