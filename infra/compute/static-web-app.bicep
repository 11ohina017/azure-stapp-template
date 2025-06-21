/*
# Static Web AppのBicepテンプレート
このBicepテンプレートは、Azure Static Web Appsをデプロイするためのものです。
  https://learn.microsoft.com/en-us/azure/templates/microsoft.web/staticsites?pivots=deployment-language-bicep
*/

@description('静的ウェブアプリの名前')
param staticWebAppName string = 'stapp-pj-sub-env-region-001'

@description('リソースのリージョン: リソースグループのリージョンがデフォルト:「Central US」「East US 2」「East Asia」「West Europe」「West US2')
param location string = resourceGroup().location

@description('リソースのタグ')
param tags object = {
  environment: 'dev'
  project: 'project_name'
  createdBy: 'taichi_kitamura'
}

// # Id ----------------------------------------------------
@description('staticwebapp.config.jsonなどの設定ファイルの変更をAzure側で反映できる: true or false')
param allowConfigFileUpdates bool = false

// # Git ----------------------------------------------------
@description('ターゲットブランチ')
param targetBranch string = 'main'

@description('APIのビルドコマンド')
param apiBuildCommand string = 'npm run build:api'

@description('ソースコード内のAPIコードのディレクトリパス')
param apiLocation string = 'api'

@description('ビルド後のアプリ成果物のパス')
param appArtifactLocation string = 'dist'

@description('アプリのビルドコマンド')
param appBuildCommand string = 'npm run build:web'

@description('アプリコードのパス')
param appLocation string = 'web'

@description('ビルド後のアプリの出力パス')
param outputLocation string = 'output'

@description('Null-Allow: GitHub Actionのシークレット名の上書き:セキュリティの関係でデフォルトの変数:AZUのE_STATIC_WEB_APPS_API_TOKEN以外の値を使用したいときに使う')
param githubActionSecretNameOverride string

@description('Null-Allow: GitHubリポジトリのURL')
param repositoryUrl string

@description('Null-Allow: リポジトリへのアクセス用トークン')
param repositoryToken string

@description('Null-Allow: リポジトリの所有者')
param repositoryOwner string

@description('Null-Allow: リポジトリの名前')
param repositoryName string

@description('リポジトリのプロバイダー')
param provider string = 'GitHub'

@description('Null-Allow: テンプレートリポジトリのURL')
param templateRepositoryUrl string

@description('静的ウェブアプリの説明')
param templateDescription string = 'My Static Web App'

@description('リポジトリがプライベートかどうか')
param isPrivate bool = false

@description('GitHub Action Workflowファイルの生成をスキップするかどうか: true or false')
param skipGithubActionWorkflowGeneration bool = false

@description('大規模なエンタープライズ向けのDN機能のON/OFFを指定')
param enterpriseGradeCdnStatus string = 'Disabled'

@description('公共ネットワークアクセスを許可するかどうか')
param publicNetworkAccess string = 'Enabled'

@description('PR単位などで動的に生成されるプレビュー環境を有効にするかどうか')
param stagingEnvironmentPolicy string = 'Enabled'

// # Sku ----------------------------------------------------

@description('リソースSKUの名前: Free, Standard, Premium')
param skuName string = 'Free'

@description('リソースSKUの価格帯: SWAではsku nameと同じ')
param skuTier string = skuName

// # リソース定義 ---------------------------------------------
resource symbolicname 'Microsoft.Web/staticSites@2024-04-01' = {
  /* 今回は使用しないパラメーターなのでコメントアウト
  identity: {
    type: identityType // マネージドサービスIDのタイプ
    userAssignedIdentities: {
      '${userAssignedIdentityResourceId}': {}
    }
  }
  */
  kind: 'app' // リソースの種類（ここでは静的ウェブアプリ）
  location: location // リソースがデプロイされるAzureリージョン
  name: staticWebAppName // 静的ウェブアプリの名前
  properties: {
    allowConfigFileUpdates: allowConfigFileUpdates // 設定ファイルの更新を許可するかどうか
    branch: targetBranch // リポジトリのターゲットブランチ
    buildProperties: {
      apiBuildCommand: apiBuildCommand // APIのビルドコマンド
      apiLocation: apiLocation // APIコードのパス
      appArtifactLocation: appArtifactLocation // ビルド後のアプリ成果物のパス
      appBuildCommand: appBuildCommand // アプリのビルドコマンド
      appLocation: appLocation // アプリコードのパス
      githubActionSecretNameOverride: empty(githubActionSecretNameOverride) ? null : githubActionSecretNameOverride // GitHub Actionのシークレット名の上書き
      outputLocation: outputLocation // ビルド後のアプリの出力パス
      skipGithubActionWorkflowGeneration: skipGithubActionWorkflowGeneration // GitHub Actionワークフロー生成をスキップするかどうか
    }
    enterpriseGradeCdnStatus: empty(enterpriseGradeCdnStatus) ? null : enterpriseGradeCdnStatus // エンタープライズグレードCDNのステータス
    provider: provider // リポジトリのプロバイダー
    publicNetworkAccess: publicNetworkAccess // 公共ネットワークアクセスを許可するかどうか
    repositoryToken: repositoryToken // リポジトリへのアクセス用トークン
    repositoryUrl: repositoryUrl // リポジトリのURL
    stagingEnvironmentPolicy: stagingEnvironmentPolicy // PR単位などで動的に生成されるプレビュー環境を有効にするかどうか
    // Static Web Appsと同時にGitリポジトリを作成する場合は、以下のように設定
    templateProperties: (!empty(templateDescription) && !empty(repositoryOwner) && !empty(repositoryName) && !empty(templateRepositoryUrl)) ? {
      description: templateDescription // 静的ウェブアプリの説明
      isPrivate: isPrivate // リポジトリがプライベートかどうか
      owner: repositoryOwner // リポジトリの所有者
      repositoryName: repositoryName // リポジトリの名前
      templateRepositoryUrl: templateRepositoryUrl // テンプレートリポジトリのURL
    } : null
  }
  sku: {
    /* 今回は使用しないパラメーターなのでコメントアウト
    capabilities: (!empty(skuCapabilityName) && !empty(skuCapabilityReason) && !empty(skuCapabilityValue)) ? [
      {
        name: skuCapabilityName // SKUの機能名
        reason: skuCapabilityReason // SKU機能の理由
        value: skuCapabilityValue // SKU機能の値
      }
    ] : null
    capacity: resourceCapacity != 0 ? resourceCapacity : 1// リソースに割り当てられたインスタンス数
    family: empty(skuFamily) ? null : skuFamily // SKUのファミリーコード
    */
    /* 今回は使用しないパラメーターなのでコメントアウト
    locations: [
      location // SKUのロケーション
    ]
    */
    name: skuName // リソースSKUの名前
    /* 今回は使用しないパラメーターなのでコメントアウト
    size: skuSize */// リソースSKUのサイズ指定
    /* 今回は使用しないパラメーターなのでコメントアウト
    skuCapacity: {
      default: skuDefaultWorkers != 0 ? skuDefaultWorkers : 1
      elasticMaximum: skuElasticMaximum != 0 ? skuElasticMaximum : 10
      maximum: skuMaximumWorkers != 0 ? skuMaximumWorkers : 10
      minimum: skuMinimumWorkers != 0 ? skuMinimumWorkers : 1
      scaleType: empty(skuScaleType) ? 'Automatic' : skuScaleType
    }
    */
    tier: skuTier // リソースSKUのサービス階層
  }
  tags: tags // リソースのタグ
}

@description('デプロイされた静的ウェブアプリリソースのID')
output id string = symbolicname.id
@description('デプロイされた静的ウェブアプリリソースの名前')
output name string = symbolicname.name
@description('デプロイされた静的ウェブアプリリソースのURL')
output url string = symbolicname.properties.defaultHostname
