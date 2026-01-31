# School Research Prompt Generator

高校調査プロンプト生成ツール - 留学生入試担当職員向け

## 概要

留学生入試において、志願者の出身高校情報を調査するための生成AI用プロンプトを簡単に生成できるWebツールです。

## 機能

- 🎓 高校名・所在国などの条件を入力
- 🌏 国別の教育制度情報を自動挿入（中国、韓国、ベトナム等）
- 📋 生成されたプロンプトをワンクリックでコピー
- 🔍 現地語での検索指示オプション

## 対応国

### Phase 1（実装済み）
- 中国 (China)
- 韓国 (South Korea)
- ベトナム (Vietnam)

### Phase 2（予定）
- 台湾、タイ、インドネシア、マレーシア、フィリピン、インド、日本

## 使用方法

1. [GitHub Pages URL] にアクセス
2. 調査したい高校の情報を入力
3. 「プロンプト生成」ボタンをクリック
4. 生成されたプロンプトをコピーして生成AIに貼り付け

## ローカルでの実行

```bash
# リポジトリをクローン
git clone https://github.com/[username]/school-research-prompt-generator.git

# index.html をブラウザで開く
open index.html
```

## ファイル構成

```
school-research-prompt-generator/
├── index.html              # メインHTML
├── css/
│   └── style.css           # スタイルシート
├── js/
│   ├── app.js              # イベント処理・UI制御
│   ├── prompt-builder.js   # プロンプト生成エンジン
│   └── country-data.js     # 国別教育情報データ
├── .gitignore
└── README.md
```

## 国別データの更新

`js/country-data.js` を編集して、各国の教育情報を更新できます。

## ライセンス

Private - Internal Use Only

## 更新履歴

- 2026/01/31 - Phase 1 完了（中国・韓国・ベトナム対応）
