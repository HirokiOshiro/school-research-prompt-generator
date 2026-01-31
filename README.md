# School Research Prompt Generator

高校調査プロンプト生成ツール - 留学生入試担当職員向け

## 概要

留学生入試において、志願者の出身高校情報を調査するための生成AI用プロンプトを簡単に生成できるWebツールです。

**本番URL:** https://hirokioshiro.github.io/school-research-prompt-generator/

## 機能

### 基本機能
- 🎓 高校名・所在国などの条件を入力
- 🌏 国別の教育制度情報を自動挿入（10カ国対応）
- 📋 生成されたプロンプトをワンクリックでコピー
- 🔍 現地語での検索指示オプション

### UX機能
- 🌐 **バイリンガル対応**: 日本語/英語の両方で表示
- ✅ **確認モーダル**: プロンプト生成時に重要な確認事項を表示
- ⚠️ **国別警告**: 職業学校等の注意点を自動表示
- 💡 **ツールチップ**: 各項目のヘルプを表示
- 📍 **インラインエラー**: 入力エラーを該当箇所に表示
- 📖 **使い方ガイド**: 初めてのユーザー向けの説明

## 対応国（10カ国 + その他）

| 国 | 現地語検索 | 特記事項 |
|-----|----------|----------|
| 🇨🇳 中国 (China) | ✅ | 職業高中・中専警告 |
| 🇰🇷 韓国 (South Korea) | ✅ | 職業高校警告 |
| 🇻🇳 ベトナム (Vietnam) | ✅ | Trung cấp警告 |
| 🇹🇼 台湾 (Taiwan) | ✅ | 職業学校警告 |
| 🇹🇭 タイ (Thailand) | ✅ | 職業証明書警告 |
| 🇮🇩 インドネシア (Indonesia) | ✅ | SMK警告 |
| 🇲🇾 マレーシア (Malaysia) | ✅ | 職業証明書警告 |
| 🇵🇭 フィリピン (Philippines) | ✅ | K-12制度対応 |
| 🇮🇳 インド (India) | ✅ | 州別ボード対応 |
| 🇯🇵 日本 (Japan) | ✅ | 国内校対応 |
| 🌐 その他 (Other) | - | 汎用テンプレート |

## 使用方法

1. [本番URL](https://hirokioshiro.github.io/school-research-prompt-generator/) にアクセス
2. 調査したい高校の情報を入力
3. 「生成 / Generate」ボタンをクリック
4. 確認モーダルで「確認しました / I Understand」をクリック
5. 生成されたプロンプトをコピーしてMicrosoft Copilotに貼り付け

### 重要な確認事項

AIの回答を業務に使用する前に、必ず以下を確認してください：

1. 🔗 **リンク先の確認**: AIが提示したリンク先に実際にアクセスし、情報が正確か確認
2. 📄 **提出書類との照合**: 成績表・卒業証明書の学校名・住所等と一致しているか確認
3. 📖 **業務マニュアルの参照**: 最終判断は必ず業務マニュアルに従う

## ローカルでの実行

```bash
# リポジトリをクローン
git clone https://github.com/HirokiOshiro/school-research-prompt-generator.git

# index.html をブラウザで開く
open index.html
```

## ファイル構成

```
school-research-prompt-generator/
├── index.html              # メインHTML
├── css/
│   └── style.css           # スタイルシート（約1500行）
├── js/
│   ├── app.js              # イベント処理・UI制御（約700行）
│   ├── prompt-builder.js   # プロンプト生成エンジン（約400行）
│   └── country-data.js     # 国別教育情報データ（約780行）
├── docs/
│   └── country-data-guide.md  # 国別データ更新手順書
├── .gitignore
└── README.md
```

## 国別データの更新

`js/country-data.js` を編集して、各国の教育情報を更新できます。
詳細は `docs/country-data-guide.md` を参照してください。

## ライセンス

Private - Internal Use Only

## 更新履歴

| 日付 | バージョン | 内容 |
|------|---------|------|
| 2026/01/31 | v1.0 | Phase 1 完了（中国・韓国・ベトナム） |
| 2026/01/31 | v1.5 | Phase 2 完了（10カ国対応） |
| 2026/01/31 | v2.0 | Phase 3 完了（UI改善・バイリンガル・確認機能） |
