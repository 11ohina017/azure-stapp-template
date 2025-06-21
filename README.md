---
page_type: sample
languages:
- azdeveloper
- nodejs
- bicep
- typescript
- html
products:
- azure
- azure-cosmos-db
- azure-functions
- azure-monitor
- azure-pipelines
urlFragment: todo-nodejs-mongo-swa-func
name: Static React Web App + Functions with Node.js API and MongoDB on Azure
description: A complete ToDo app with Node.js API and Azure Cosmos API for MongoDB for storage. Uses Azure Developer CLI (azd) to build, deploy, and monitor
---
<!-- YAML front-matterはそのまま維持 -->

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

```bash
# azd にログイン（初回のみ）
azd auth login

# インフラのプロビジョニング
azd provision

# プロビジョニングとデプロイ
azd up
```

## アーキテクチャ

このアプリケーションでは以下の Azure リソースを使用します:

- **Azure Static Web Apps**: フロントエンドホスティング

すべてのリソースは単一のリソースグループ内に作成されます。

## 次のステップ

デプロイ後、以下のコマンドでさらなる操作が可能です:

- `azd pipeline config`: CI/CD パイプライン (GitHub Actions/Azure DevOps) を設定

- `azd monitor`: アプリケーションの監視とダッシュボード閲覧

- ローカルデバッグ: VS Code + Azure Developer CLI 拡張

- `azd down`: 作成したリソースをすべて削除

- [オプション機能](./OPTIONAL_FEATURES.md) の有効化 (APIM など)

### その他の `azd` コマンド

ターミナルで `azd help` を実行するか、[リファレンス](https://aka.ms/azure-dev/ref) を参照してください。

### 役割とアクセス管理

このテンプレートはマネージド ID を作成し、Azure AD との認証に使用します。

`principalId` は現在ログイン中のユーザーやサービスプリンシパルのオブジェクト ID を示します。