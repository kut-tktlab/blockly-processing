/**
 * This script provides functions for an LED simulator.
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
