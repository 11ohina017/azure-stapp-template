# はじめに

このリポジトリはAzure Static Web Apps上で動作するReactアプリケーションを提供します。  
Azure Developer CLI (azd)でのデプロイに対応しています。

## 前提条件

以下のツールとアカウントが必要です:

- Azure サブスクリプション (Contributor 権限)

- [Azure Developer CLI (azd)](https://aka.ms/azd-install)

- [PowerShell7](https://learn.microsoft.com/ja-jp/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.5#winget)

```pwsh
winget install --id Microsoft.PowerShell --source winget
```

インストール後にユーザー環境変数PATHにpwsh.exeのPATHを設定する。
ターミナルは設定を反映させるため、ターミナルは再起動。

```md
C:\Program Files\PowerShell\7
```

- [Node.js と npm (v18.17.1+)](https://nodejs.org/)

```cmd
winget install OpenJS.NodeJS.LTS
```

- [Azure Functions Core Tools](https://learn.microsoft.com/azure/azure-functions/functions-run-local)（Functionsを使う場合）

- [Azure Static Web Apps CLI](https://learn.microsoft.com/ja-jp/azure/static-web-apps/static-web-apps-cli-install)（Static Web Appsを使う場合）

## GitHubでPATを作成

Static Web AppsとGitの連携をBICEPで行う場合はリポジトリシークレットとしてGitHubのPersonal Access Tokenが必要。  

PATは「Personal Access Token（パーソナル アクセス トークン）」の略です。  
GitHubなどのサービスで、ユーザー名とパスワードの代わりに使うことができる認証用のトークンです。  

作成したPATに以下の権限が必要です。  

- Actions（Read/Write）: GitHub Actionsのワークフローの実行に必要な権限
- Administration（Read/Write）: リポジトリの作成に必要な権限 (テンプレートからリポジトリを新規作成する場合に必要。かなり強力な権限)
- Code/Contents（Read/Write）: リポジトリ内のコンテンツやブランチなどへのアクセスする際に必要な権限
- Secrets (Read/Write) : リポジトシークレットを上書きする場合に必要な権限
- Workflows (Read/Write) : GitHub Actionsのワークフローファイルの追加のため必要

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

```pwsh
# インフラのプロビジョニング
azd provision -e ${環境名}
```

サービスプリンシパルを作成し、共同作成者のロールを設定。(GitHub Actionsでazure cliやazdを実行する際に必要、アプリのデプロイだけなら不要)

```pwsh
az ad sp create-for-rbac --name "sp-<rep_name>-<enviroment>" --role contributor --scopes "/subscriptions/<subscripton_id>/resourceGroups/<rg_name>/providers/Microsoft.Web/staticSites/<stapp_name>" --sdk-auth
```

```pwsh
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
func init . --typescript
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

---

### GitHub連携機機能を使わずSWA CLIでデプロイする

```pwsh
# Azure Static Web AppsのGit連携を解除する
az staticwebapp disconnect --name <stapp-name>  

# Preview環境
swa deploy --resource-group <rg> --app-name <stapp-name> --app-location src/web --output-location src/web/dist --env preview

# Production
swa deploy --resource-group <rg> --app-name <stapp-name> --app-location src/web --output-location src/web/dist --env Production
```
