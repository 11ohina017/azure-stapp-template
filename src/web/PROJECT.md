# プロジェクト構造

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
