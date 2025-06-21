# はじめに

このリポジトリはAzure Static Web Apps上で動作するReactアプリケーションを提供します。  

## 前提条件

以下のツールとアカウントが必要です:

- Azure サブスクリプション (Contributor 権限)

- [Azure Developer CLI (azd)](https://aka.ms/azd-install)

- [Azure Functions Core Tools (v4+)](https://docs.microsoft.com/azure/azure-functions/functions-run-local)

- [Node.js と npm (v18.17.1+)](https://nodejs.org/)


## クイックスタート

Learn ドキュメントの [クイックスタート](https://learn.microsoft.com/azure/developer/azure-developer-cli/get-started?tabs=localinstall&pivots=programming-language-nodejs) に従ってください。

以下の手順で認証、初期化、インフラのプロビジョニングとデプロイを実行します:

* プロジェクト作成

```bash
# azd にログイン（初回のみ）
azd auth login

# init
azd init
```

* env編集

.azure/<env_name>/.envに必要な環境変数を設定する

* デプロイ

```bash
# インフラのプロビジョニング
azd provision

# プロビジョニングとデプロイ
azd up
```

## アーキテクチャ

- **Azure Static Web Apps**: フロントエンドホスティング

## 備考

デプロイ後、以下のコマンドでさらなる操作が可能です:

- `azd pipeline config`: CI/CD パイプライン (GitHub Actions/Azure DevOps) を設定

- `azd monitor`: アプリケーションの監視とダッシュボード閲覧

- ローカルデバッグ: VS Code + Azure Developer CLI 拡張

- `azd down`: 作成したリソースをすべて削除

- [オプション機能](./OPTIONAL_FEATURES.md) の有効化 (APIM など)

- `principalId` は現在ログイン中のユーザーやサービスプリンシパルのオブジェクト ID を示します。

---

## プロジェクト構造

```md
components.json           # Tailwind CSSの設定や Reactの設定(TypeScript + JSX)などを決めるルールファイル
package.json              # プロジェクトの依存関係・スクリプト・メタ情報を管理するファイル
postcss.config.js         # Tailwindなどで使うPostCSSのプラグイン設定ファイル
tailwind.config.ts        # Tailwind CSSのカスタマイズ設定（色・フォントなど）
tsconfig.json             # TypeScriptのコンパイル設定ファイル

src/                      # Reactのルーティングとコンポーネントを管理するフォルダ
    pages/                # 各ページコンポーネントを管理するフォルダ
    App.tsx           # URLに応じたルーティング
    main.tsx          # メインプログラム
    index.css         # 本プロジェクトで使うCSSを定義
    vite-env.d.ts     # Vite が提供する型情報（特に環境変数や特殊インポート用）を TypeScript に認識させるための型定義ファイル。

components/               # アプリ全体で使いまわすUIコンポーネント群
    footer.tsx            # フッター部分のUIコンポーネント
    hormone-icons.tsx     # カスタムアイコンを定義・提供するコンポーネント
    navbar.tsx            # ナビゲーションバーのUIコンポーネント
    theme-provider.tsx    # テーマ（ライト/ダーク）の状態管理と提供
    theme-toggle.tsx      # テーマの切り替えトグルボタンコンポーネント
    ui/                   # 折りたたみ可能なUIコンポーネント（他にもUI部品が並ぶ想定）

hooks/
    use-toast.ts          # トースト通知を扱うカスタムフック

lib/
    utils.ts              # 共通して使われるユーティリティ関数群を定義するファイル
```

---

## 初回構築

このプロジェクトを自分のパソコンで動かすための手順を、初心者の方にも分かりやすく説明します。

### 1. 必要なソフトウェアをインストール

- [Node.js](https://nodejs.org/)（npmが含まれています）
- [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)（Functionsを使う場合）
- [Azure Static Web Apps CLI](https://learn.microsoft.com/ja-jp/azure/static-web-apps/static-web-apps-cli-install)（Static Web Appsを使う場合）

### 2. プロジェクトの依存パッケージをインストール

#### 2.1 Reactのプロジェクト設定

ターミナルで以下のコマンドを実施。  

```sh
npm install
```

#### 2.2 Functionsの設定

ターミナルで、プロジェクトのフォルダに移動して以下のコマンドを実行します。  

```sh
cd api
npm install
```

Functionsを追加する場合は、以下のように記載。  

```sh
cd api
func new --name <Function Name> --template "HTTP trigger" --authlevel "anonymous"    
```

localettings.jsonを編集。  

```json
{
  "IsEncrypted": true,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true"
  },
  "ConnectionStrings": {}
}
```

tsconfig.jsonにビルド設定を実施

```json
{
  "compilerOptions": {
    // コンパイル後に出力する JavaScript の仕様レベルを ES6 に設定
    "target": "es6",

    // Node.js 向けに CommonJS モジュール形式で出力
    "module": "commonjs",

    // トランスパイル結果を格納するディレクトリ
    "outDir": "dist",

    // ソースコードルートディレクトリ（ここ以下をコンパイル対象に）
    "rootDir": ".",

    // 厳格な型チェックをまとめて有効化
    "strict": true,

    // 外部型定義ファイルのチェックを行うかどうか
    "skipLibCheck": true,

    // 大文字小文字のみのファイル名違いをエラーに
    "forceConsistentCasingInFileNames": true
  }
}
```

```sh
npm install
```

### 3. アプリを起動する

以下のコマンドでReactアプリを起動します。

```sh
npm run dev

  >VITE v5.4.8  ready in 913 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

起動後、`http://localhost:5173` にアクセスするとアプリが表示されます。

### 4. Functions（API）を起動する

API（サーバーレス関数）をローカルで動かすには、`api` フォルダに移動して以下を実行します。

```sh
cd api
npm start
```

### 5. Static Web Apps を起動する

Azure Static Web Appsのローカルエミュレーターを使う場合は、プロジェクトのルートで以下を実行します。

```sh
swa start http://localhost:5173 --api-location api --verbose
```

これで、フロントエンドとAPIの両方をローカルで確認できます。
