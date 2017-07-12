# blockly-for-led/example

「プログラム例」ボタンで呼び出せるプログラムの置き場です。

このディレクトリに `プログラム名.xml` というファイルを作り，
`./build.sh` を実行してください。
`build.sh` がXMLファイルを結合して `example.js` に書き込みます。

XMLファイルの中身は，
blockly-for-ledの画面下部の「Show XML」ボタンを使って取得してください
(「Show XML」ボタンを押して表示されるXMLをコピー&ペーストしてください)。

### LED 12個の場合

LED 10個の場合のプログラム例を置いています。
12個の場合は，`patch -p2 < n12.patch`
を実行した後，`./build.sh` を実行してください。
