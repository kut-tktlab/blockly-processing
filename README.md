# blockly-for-led

<img src="https://github.com/kut-tktlab/blockly-for-led/wiki/blockly-screen.png"
 width="400" height="250" alt="screen capture" />

シリアルLEDテープの制御のための[Blockly](https://developers.google.com/blockly/)アプリケーション。

ブロックの配色やツールボックスのデザインは[micro:bit](http://microbit.org/)
[JavaScript Blocks Editor](https://makecode.microbit.org/)及び[chibi:bit IDE](http://chibibit.io/ide/)
を真似ています。

実LEDテープを動かす機能はまだ未実装です。
ブラウザ上で動作を確認するためのLEDシミュレータが付いています。

See also:
- [serial-led-pi](https://github.com/kut-tktlab/serial-led-pi/) - 
  A simple library for controlling LED-strips and rings with Raspberry Pi
- [Blockly | Google Developers](https://developers.google.com/blockly/) -
  A library for building visual programming editor
- [BBC micro:bit](http://microbit.org/) | [makecode.microbit.org](https://makecode.microbit.org/) |
  [chibi:bit IDE](http://chibibit.io/ide/)
  
## お試し

[デモページ](https://ytakata69.github.io/blockly-for-led/)でお試しできます
(手動同期なので最新版でないことがあります)。

## Install

`git clone` して `index.html` をブラウザで開いてください。

## 改造

blocklyの中身を改造する場合はGoogleの
[Closure Library](https://developers.google.com/closure/library/)
が必要です。
zipファイルをダウンロードして解凍し，blocklyの親ディレクトリに
(blocklyから `../closure-library/` に見えるように) 置いてください。

blocklyを改造したら `./build.py` を実行してください。
`blockly_compressed.js` 等が更新されます (1分弱かかります)。
