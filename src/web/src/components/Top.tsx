import React, { useEffect } from 'react';
import { Instagram, Twitter } from 'lucide-react';
import { StoreInfo } from '../constants/storeInfo';

// Twitter widgets type declaration
declare global {
  interface Window {
    twttr: {
      widgets: {
        load: () => void;
      };
    };
  }
}

const Top: React.FC = () => {
  useEffect(() => {
    // Xのウィジェットスクリプトを読み込む関数
    const loadTwitterWidgets = () => {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';

      // Scriptの読み込み完了後にウィジェットをロード
      script.onload = () => {
        // スクリプトが読み込まれた後にウィジェットを初期化する
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      };
      
      document.head.appendChild(script);
    };

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    
    if (!existingScript) {
      loadTwitterWidgets();
    } else if (window.twttr && window.twttr.widgets) {
      // If script exists and twttr is available, reload widgets
      window.twttr.widgets.load();
    }

    // Xのウィジェットスクリプトをbodyにも追加
    const scriptTag = document.createElement('script');
    scriptTag.async = true;
    scriptTag.src = 'https://platform.twitter.com/widgets.js';
    scriptTag.charset = 'utf-8';
    
    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      document.body.appendChild(scriptTag);
    }
  }, []);
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center relative overflow-hidden">
      {/* 背景パターンの設定 - 微細なドットテクスチャを追加 */}
      {/* 外側のdiv: 全体の透明度を10%に設定し、背景パターンを目立たなくする */}
      <div className="absolute inset-0 opacity-10">
        {/* 内側のdiv: SVGパターンを画面全体に繰り返し表示 */}
        {/* パターン詳細: 60x60pxタイル内に中央配置された半径2pxの白い円（透明度40%） */}
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* メインコンテンツエリア - z-indexで背景パターンより前面に表示 */}
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        {/* タイトル */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {StoreInfo.STORE_NAME}
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-2">
            {StoreInfo.DESCRIPTION}
          </p>
        </div>

        {/* 店内画像 */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-3xl mx-auto">
            <img
              src="/img/ramen_store.png"
              alt={`${StoreInfo.STORE_NAME} 店内の様子`}
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* 店コンセプトとSNSコンテンツ */}
        <div className="bg-gradient-to-b from-orange-50 to-yellow-50 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">

          {/* 店コンセプト */}
          <h2 className="text-2xl font-bold text-black mb-4">伝統の味をお届け</h2>
          <p className="text-black-100 leading-relaxed mb-6">
            昔ながらの製法で丁寧に作り上げた鶏ガラ醤油スープ。<br />
            深い味わいと優しい風味で、心も体も温まる一杯をお楽しみください。
          </p>

        {/* SNSコンテンツ */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-lg mx-auto">
          
          {/* Xポスト埋め込み */}
          <div className="mb-6">
            {/* 旧Xポスト（コメントアウト）
            <blockquote className="twitter-tweet">
              <p lang="ja" dir="ltr">
                メニュー改定から二ヶ月。今1番売れているのは"中華そば"塩ラーメンではありません😃{' '}
                <a href="https://t.co/oyJ2khXxwv">pic.twitter.com/oyJ2khXxwv</a>
              </p>
              &mdash; 麺屋だご (@8wzArLcBGkPEQ0M){' '}
              <a href="https://twitter.com/8wzArLcBGkPEQ0M/status/1848524772403302775?ref_src=twsrc%5Etfw">
                October 22, 2024
              </a>
            </blockquote>
            */}
            <blockquote className="twitter-tweet">
              <p lang="ja" dir="ltr">
                X埋め込みテスト投稿{' '}
                <a href="https://t.co/IKX7iSaYU6">pic.twitter.com/IKX7iSaYU6</a>
              </p>
              &mdash; Hinasode合同会社 北村太一 (@11ohina017){' '}
              <a href="https://twitter.com/11ohina017/status/1939255806526108084?ref_src=twsrc%5Etfw">
                June 29, 2025
              </a>
            </blockquote>
          </div>
          
          {/* SNSリンク */}
          <div className="flex justify-center space-x-6">
            <a 
              href={StoreInfo.INSTAGRAM_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Instagram size={20} />
              <span>Instagram</span>
            </a>
            <a 
              href={StoreInfo.TWITTER_URL}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Twitter size={20} />
              <span>X (Twitter)</span>
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Top;