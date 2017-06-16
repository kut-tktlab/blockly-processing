# blockly-for-led

(まったくの開発途上です)

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
