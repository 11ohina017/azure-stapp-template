import React from 'react';
import { Instagram, Twitter, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shop Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">麵屋◯◯</h3>
            <p className="text-gray-300 mb-4">
              鶏ガラ醤油の昔ながらの中華そば
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/menyadago/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://x.com/8wzarlcbgkpeq0m" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-red-400" />
                <span className="text-gray-300">086-234-1233</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-red-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  〒700-0914<br />
                  岡山県岡山市北区鹿田町1丁目7−19
                </span>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">営業時間</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>平日: 11:30-14:00, 18:00-21:00</div>
              <div>土曜: 定休日</div>
              <div>日曜: 11:30-14:00</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 麵屋◯◯. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;