# blockly-for-led

<img src="https://github.com/kut-tktlab/blockly-for-led/wiki/blockly-screen.png"
 width="400" height="250" alt="screen capture" />

[シリアルLEDテープ](https://github.com/kut-tktlab/serial-led-pi/)
の制御のための[Blockly](https://developers.google.com/blockly/)アプリケーション。

ブロックの配色やツールボックスのデザインは[micro:bit](http://microbit.org/)
[JavaScript Blocks Editor](https://makecode.microbit.org/)及び[chibi:bit IDE](http://chibibit.io/ide/)
を真似ています。


## お試し

[デモページ](https://ytakata69.github.io/blockly-for-led/)でお試しできます
(手動同期なので最新版でないことがあります)。

ブラウザ上で動作を確認するためのLEDシミュレータが付いています。

## Install

LEDシミュレータを使う場合は，
`git clone` して `index.html` をブラウザで開いてください。

実LEDを使う手順は[Wiki](https://github.com/kut-tktlab/blockly-for-led/wiki/Raspbian,-Node.js,-Electron)に記載しています。

## 改造

[Blockly Guides](https://developers.google.com/blockly/guides/overview)
の各ページを参照してください。

- Configure Blockly - Blocklyを改造せずに (index.html上で) できるカスタマイズ
- Create Custom Blocks - 新しいブロックを定義する
- Modify Blockly &gt; Web &gt; Building - Blocklyのファイル構成

Blocklyを改造した場合，以下のどちらかの作業が必要です。

1. `build.py` を実行して `blockly_compressed.js` 等を再構築する。
2. index.html にて，`blockly_compressed.js` 等の代わりに `core/`, `blocks/`
等の下の個々のjsファイルをロードする
(詳しくは上記Guidesの[Building](https://developers.google.com/blockly/guides/modify/web/building)を参照)。

`build.py` を実行する場合は
[Closure Library](https://developers.google.com/closure/library/)
が必要です。
zipファイルをダウンロードして解凍し，`blockly`の親ディレクトリに
(`blockly`から `../closure-library/` に見えるように) 置いてください。
なお，`./build.py` の実行には1分弱かかります。

## リンク
- [serial-led-pi](https://github.com/kut-tktlab/serial-led-pi/) - 
  A simple library for controlling LED-strips and rings with Raspberry Pi
- [Blockly | Google Developers](https://developers.google.com/blockly/) -
  A library for building visual programming editor
- [BBC micro:bit](http://microbit.org/) | [makecode.microbit.org](https://makecode.microbit.org/) |
  [chibi:bit IDE](http://chibibit.io/ide/)
