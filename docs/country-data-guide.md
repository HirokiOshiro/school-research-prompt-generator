# 国別データ更新手順書

## 概要

このドキュメントは、`country-data.js`ファイルの国別教育データを追加・更新する手順を説明します。

---

## ファイル構造

```
school-research-prompt-generator/
├── js/
│   ├── country-data.js    ← 国別データファイル（このファイルを編集）
│   ├── app.js
│   └── prompt-builder.js
├── index.html             ← 国の選択肢を追加する場合はここも編集
└── css/
    └── style.css
```

---

## 1. 既存の国データを更新する場合

### 手順

1. `js/country-data.js`を開く
2. 該当国のセクションを検索（例: `// ===== CHINA =====`）
3. 必要な項目を修正
4. ファイルを保存
5. ブラウザで動作確認

### 更新可能な項目

| 項目 | 説明 | 例 |
|------|------|-----|
| `officialSources` | 政府公式サイトURL | URL変更時に更新 |
| `warnings` | 重要注意事項 | 制度変更時に追加 |
| `schoolTypes` | 学校種別リスト | 新しい学校タイプ追加 |
| `searchQueries` | 検索クエリ例 | より効果的なクエリを追加 |

---

## 2. 新しい国を追加する場合

### Step 1: データ構造のテンプレート

以下のテンプレートをコピーして使用してください：

```javascript
    // ===== [COUNTRY NAME] =====
    "[Country]": {
        localName: "[現地名]",
        localLanguage: "[現地語]",
        educationSystem: {
            totalYears: 12,  // 初等〜高等教育の合計年数
            structure: "[構造の説明]",
            highSchoolName: "[高校の現地名称]",
            graduationMonth: "[卒業月]",
            academicCalendar: "[学期]"
        },
        schoolTypes: {
            academic: [
                "[普通科高校] - Standard A eligible"
            ],
            vocational: [
                "[職業高校] - Requires Review"
            ],
            international: [
                "International schools - Check Standard B/D"
            ]
        },
        officialSources: [
            { name: "[教育省名]", url: "https://..." },
            { name: "[学校データベース]", url: "https://..." }
        ],
        searchQueries: {
            english: [
                "[School Name] [Country] high school",
                "[School Name] official website"
            ],
            local: [
                "[現地語での検索クエリ例]"
            ]
        },
        warnings: [
            "[重要な注意事項1]",
            "[重要な注意事項2]"
        ],
        eligibilityNotes: {
            standardA: "[基準A適用条件]",
            standardB: "[基準B適用条件（該当する場合）]"
        },
        vocabularyReference: [
            { english: "[英語]", local: "[現地語]", romanization: "[ローマ字読み]" }
        ]
    },
```

### Step 2: index.htmlに選択肢を追加

`index.html`の国選択ドロップダウンに新しい国を追加：

```html
<select id="country" name="country" required aria-required="true">
    <option value="">-- 選択してください --</option>
    <option value="China">中国 (China)</option>
    <!-- ... 既存の国 ... -->
    <option value="NewCountry">新しい国 (NewCountry)</option>  <!-- 追加 -->
    <option value="Other">その他 (Other)</option>
</select>
```

**注意**: `value`属性は`country-data.js`のキー名と完全に一致させてください。

### Step 3: 動作確認

1. ブラウザでindex.htmlを開く
2. 追加した国を選択
3. プロンプトを生成
4. 出力内容が正しいか確認

---

## 3. 各フィールドの詳細説明

### `localName`
- その国の現地語での国名
- 例: 中国 → "中国", 韓国 → "대한민국"

### `localLanguage`
- 検索に使用する主要言語
- 例: "Mandarin Chinese", "Korean", "Vietnamese"

### `educationSystem`

| サブフィールド | 説明 |
|---------------|------|
| `totalYears` | 初等〜高等教育の合計年数（日本の場合12年） |
| `structure` | 教育制度の構造説明 |
| `highSchoolName` | 高校の現地呼称 |
| `graduationMonth` | 卒業月 |
| `academicCalendar` | 学年暦（例: "April - March"） |

### `schoolTypes`

3つのカテゴリに分類：
- `academic`: 普通科・進学校（通常Standard A適用）
- `vocational`: 職業訓練校（要レビュー）
- `international`: インターナショナルスクール（Standard B/D確認）

### `officialSources`

公式情報源のリスト：
```javascript
officialSources: [
    { name: "表示名", url: "https://..." }
]
```

### `searchQueries`

検索クエリ例を英語と現地語で分けて記載：
```javascript
searchQueries: {
    english: ["英語での検索クエリ"],
    local: ["現地語での検索クエリ"]
}
```

### `warnings`

⚠️ 重要な注意事項のリスト。特に以下を含める：
- 教育年数に関する注意（例: マレーシアのSPM=11年）
- 制度変更（例: フィリピンのK-12移行）
- 検索言語の注意（例: 台湾は繁體中文）

### `eligibilityNotes`

出願資格に関する注記：
```javascript
eligibilityNotes: {
    standardA: "基準A適用条件",
    standardB: "基準B適用条件",
    standardD: "基準D適用条件",
    vocationalWarning: "職業課程に関する注意"
}
```

### `specialCases`（任意）

特殊なケースがある場合に追加：
```javascript
specialCases: [
    {
        type: "ケースの種類",
        description: "詳細説明",
        identification: "識別方法"
    }
]
```

### `vocabularyReference`

現地語と英語の対照表：
```javascript
vocabularyReference: [
    { english: "High School", local: "高中", romanization: "Gaozhong" }
]
```

---

## 4. よくある質問

### Q: 年数が12年でない国はどうする？

A: `totalYears`に実際の年数を入力し、`warnings`に注意事項を追加してください。

例（マレーシア）:
```javascript
totalYears: "11-13 (see notes)",
warnings: [
    "⚠️ CRITICAL: SPM alone (Form 5) = only 11 years - NOT sufficient for Standard A"
]
```

### Q: URLが変わった場合は？

A: `officialSources`の該当URLを更新し、動作確認してください。

### Q: 検索クエリを追加したい

A: `searchQueries.english`または`searchQueries.local`に新しいクエリを追加してください。

---

## 5. 変更後のチェックリスト

- [ ] JavaScriptの構文エラーがないか確認（ブラウザのコンソールで確認）
- [ ] 新しい国が選択できるか確認
- [ ] プロンプトが正しく生成されるか確認
- [ ] 現地語検索オプションが正しく動作するか確認
- [ ] 警告事項が出力に含まれているか確認

---

## 6. 参考リソース

### 教育制度調査に役立つサイト

| サイト | URL | 用途 |
|--------|-----|------|
| UNESCO ISCED | https://uis.unesco.org/en/isced-mappings | 国際教育分類 |
| World Bank Education | https://data.worldbank.org/topic/education | 教育統計 |
| WASC Directory | https://www.acswasc.org/wasc/schools-directory/ | 認定校検索 |
| CIS Directory | https://www.cis.org/find-a-cis-school | 認定校検索 |

---

## 更新履歴

| 日付 | 更新者 | 内容 |
|------|--------|------|
| 2026/01/31 | - | Phase 2完了: 10カ国サポート |
| 2026/01/31 | - | 初版作成 |
