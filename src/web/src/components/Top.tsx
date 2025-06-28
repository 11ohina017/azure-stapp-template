import React, { useEffect } from 'react';
import { Instagram, Twitter } from 'lucide-react';

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
    // Load Twitter widgets script
    const loadTwitterWidgets = () => {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      
      script.onload = () => {
        // Call load() after script loads and DOM is ready
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

    // Add script tag to body as well for better compatibility
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
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            麵屋◯◯
          </h1>
          <p className="text-xl md:text-2xl text-red-100 mb-2">
            鶏ガラ醤油の昔ながらの中華そば
          </p>
        </div>

        {/* Store Image */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-3xl mx-auto">
            <img
              src="https://images.pexels.com/photos/1395319/pexels-photo-1395319.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="麵屋◯◯ 店内の様子"
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">伝統の味をお届け</h2>
          <p className="text-red-100 leading-relaxed mb-6">
            昔ながらの製法で丁寧に作り上げた鶏ガラ醤油スープ。
            深い味わいと優しい風味で、心も体も温まる一杯をお楽しみください。
          </p>

        {/* Twitter Timeline Embed */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-lg mx-auto">
          <h3 className="text-white text-lg font-semibold mb-4">最新情報</h3>
          
          {/* Official Twitter Timeline Embed */}
          <div className="mb-6">
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
          </div>
          
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.instagram.com/menyadago/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Instagram size={20} />
              <span>Instagram</span>
            </a>
            <a 
              href="https://x.com/8wzArLcBGkPEQ0M" 
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