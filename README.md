# はじめに

このリポジトリはAzure Static Web Apps上で動作するReactアプリケーションを提供します。 
Azure Developer CLI (azd)でのデプロイに対応しています。

## 前提条件

以下のツールとアカウントが必要です:

- Azure サブスクリプション (Contributor 権限)

- [Azure Developer CLI (azd)](https://aka.ms/azd-install)

- [Azure Functions Core Tools (v4+)](https://docs.microsoft.com/azure/azure-functions/functions-run-local)

- [Node.js と npm (v18.17.1+)](https://nodejs.org/)

- [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)（Functionsを使う場合）

- [Azure Static Web Apps CLI](https://learn.microsoft.com/ja-jp/azure/static-web-apps/static-web-apps-cli-install)（Static Web Appsを使う場合）

## azdでのプロジェクト作成

本リポジトリを下にプロジをクトを作成し、新規にGitリポジトリを作成するまでの手順を記載します。  

- プロジェクト作成

```bash

# Git でテンプレートリポジトリをクローン
git clone ${url}
cd ${repository}

# azd にログイン（初回のみ）
azd auth login

# init
azd init
```

- env編集

.azure/<env_name>/.envに必要な環境変数を設定する

- デプロイ

```bash
# インフラのプロビジョニング
azd provision -e ${環境名}

# インフラプロビジョニングとアプリのデプロイ両方を実施場合
azd up -e ${環境名}
```

- [クイックスタート](https://learn.microsoft.com/azure/developer/azure-developer-cli/get-started?tabs=localinstall&pivots=programming-language-nodejs)

### 備考

デプロイ後、以下のコマンドでさらなる操作が可能です:

- `azd pipeline config`: CI/CD パイプライン (GitHub Actions/Azure DevOps) を設定

- `azd monitor`: アプリケーションの監視とダッシュボード閲覧

- ローカルデバッグ: VS Code + Azure Developer CLI 拡張

- `azd down`: 作成したリソースをすべて削除

- [オプション機能](./OPTIONAL_FEATURES.md) の有効化 (APIM など)

- `principalId` は現在ログイン中のユーザーやサービスプリンシパルのオブジェクト ID を示します。

---

## Reactプロジェクト構築

### プロジェクトの依存パッケージをインストール

#### Reactのプロジェクト設定

ターミナルで以下のコマンドを実施。  

```sh
cd src/web
npm install
```

#### Functionsの設定

ターミナルで、プロジェクトのフォルダに移動して以下のコマンドを実行します。  

```sh
cd src/api
npm install
```

Functionsを追加する場合は、以下のように記載。  

```sh
cd src/api
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

### アプリを起動する

以下のコマンドでReactアプリを起動します。

```sh
npm run dev

  >VITE v5.4.8  ready in 913 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

起動後、`http://localhost:5173` にアクセスするとアプリが表示されます。

### Functions（API）を起動する

API（サーバーレス関数）をローカルで動かすには、`api` フォルダに移動して以下を実行します。

```sh
cd src/api
npm start
```

### Static Web Apps を起動する

Azure Static Web Appsのローカルエミュレーターを使う場合は、プロジェクトのルートで以下を実行します。

```sh
swa start http://localhost:5173 --api-location src/api --verbose
```

これで、フロントエンドとAPIの両方をローカルで確認できます。
