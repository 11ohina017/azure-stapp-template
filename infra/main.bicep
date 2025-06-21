targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('リソースグループの名前。空文字列の場合は自動生成')
param resourceGroupName string = ''

@description('作成者の名前')
param creater string = 'taichi_kitamura'

var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var tags = { project: environmentName, creater: creater }

//- Static Web App ----------------------------------------------------
@description('リソースを管理するリソースのID。')
param managedBy string = 'Microsoft.Web/staticSites'

@description('静的ウェブアプリの名前')
param stappName string = 'stapp-pj-sub-env-region-001'

@description('リソースをデプロイする場所。リソースグループの場所がデフォルトです。')
param stappLocation string

@description('staticwebapp.config.jsonなどの設定ファイルの変更をAzure側で反映できる: true or false')
param stappAllowConfigFileUpdates bool = false

// # Git
@description('ターゲットブランチ')
param stappTargetBranch string = 'main'

@description('APIのビルドコマンド')
param stappApiBuildCommand string = 'npm run build:api'

@description('ソースコード内のAPIコードのディレクトリパス')
param stappApiLocation string = 'api'

@description('ビルド後のアプリ成果物のパス')
param stappAppArtifactLocation string = 'dist'

@description('アプリのビルドコマンド')
param stappAppBuildCommand string = 'npm run build:web'

@description('アプリコードのパス')
param stappAppLocation string = 'web'

@description('ビルド後のアプリの出力パス')
param stappOutputLocation string = 'output'

@description('リポジトリのプロバイダー')
param stappProvider string = 'GitHub'

@description('静的ウェブアプリの説明')
param stappTemplateDescription string = 'My Static Web App'

@description('リポジトリがプライベートかどうか')
param stappIsPrivate bool = false

@description('GitHub Action Workflowファイルの生成をスキップするかどうか: true or false')
param stappSkipGithubActionWorkflowGeneration bool = false

@description('大規模なエンタープライズ向けのDN機能のON/OFFを指定')
param stappEnterpriseGradeCdnStatus string = 'Disabled'

@description('公共ネットワークアクセスを許可するかどうか')
param stappPublicNetworkAccess string = 'Enabled'

@description('PR単位などで動的に生成されるプレビュー環境を有効にするかどうか')
param stappStagingEnvironmentPolicy string = 'Enabled'

@description('Null-Allow: GitHub Actionのシークレット名の上書き:セキュリティの関係でデフォルトの変数:AZUのE_STATIC_WEB_APPS_API_TOKEN以外の値を使用したいときに使う')
param stappGithubActionSecretNameOverride string

@description('Null-Allow: GitHubリポジトリのURL')
param stappRepositoryUrl string

@description('Null-Allow: リポジトリへのアクセス用トークン')
param stappRepositoryToken string

@description('Null-Allow: リポジトリの所有者')
param stappRepositoryOwner string

@description('Null-Allow: リポジトリの名前')
param stappRepositoryName string

@description('Null-Allow: テンプレートリポジトリのURL')
param stappTemplateRepositoryUrl string

// # Sku
@description('リソースSKUの名前: Free, Standard, Premium')
param stappSkuName string = 'Free'

@description('リソースSKUの価格帯: SWAではsku nameと同じ')
param stappSkuTier string = stappSkuName

//---------------------------------------------

// リソースグループの作成
resource rg 'Microsoft.Resources/resourceGroups@2025-04-01' = {
  location: location
  managedBy: !empty(managedBy) ? managedBy : null
  name: !empty(resourceGroupName) ? resourceGroupName : '${abbrs.resourcesResourceGroups}${environmentName}'
  properties: {}
  tags: tags
}

// The application frontend
module web './compute/static-web-app.bicep' = {
  name: stappName
  scope: rg
  params: {
    staticWebAppName: !empty(stappName) ? stappName : '${abbrs.webStaticSites}web-${resourceToken}'
    location: stappLocation
    tags: tags
    allowConfigFileUpdates: stappAllowConfigFileUpdates
    targetBranch: stappTargetBranch
    apiBuildCommand: stappApiBuildCommand
    apiLocation: stappApiLocation
    appArtifactLocation: stappAppArtifactLocation
    appBuildCommand: stappAppBuildCommand
    appLocation: stappAppLocation
    outputLocation: stappOutputLocation
    provider: stappProvider
    templateDescription: stappTemplateDescription
    isPrivate: stappIsPrivate
    skipGithubActionWorkflowGeneration: stappSkipGithubActionWorkflowGeneration
    enterpriseGradeCdnStatus: stappEnterpriseGradeCdnStatus
    publicNetworkAccess: stappPublicNetworkAccess
    stagingEnvironmentPolicy: stappStagingEnvironmentPolicy
    skuName: stappSkuName
    skuTier: stappSkuTier
    // 以下はstatic-web-app.bicepのNull-Allow必須パラメータ
    githubActionSecretNameOverride: stappGithubActionSecretNameOverride
    repositoryUrl: stappRepositoryUrl
    repositoryToken: stappRepositoryToken
    repositoryOwner: stappRepositoryOwner
    repositoryName: stappRepositoryName
    templateRepositoryUrl: stappTemplateRepositoryUrl
  }
}
