import React from 'react';
import { Instagram, Twitter, Phone, MapPin } from 'lucide-react';
import { StoreInfo } from '../constants/storeInfo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shop Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{StoreInfo.STORE_NAME}</h3>
            <p className="text-gray-300 mb-4">
              {StoreInfo.DESCRIPTION}
            </p>
            <div className="flex space-x-4">
              <a 
                href={StoreInfo.INSTAGRAM_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a 
                href={StoreInfo.TWITTER_URL}
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
                <span className="text-gray-300">{StoreInfo.PHONE_NUMBER}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-red-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {StoreInfo.POSTAL_CODE}<br />
                  {StoreInfo.ADDRESS}
                </span>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">営業時間</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>平日: {StoreInfo.WEEKDAY_HOURS}</div>
              <div>土曜: {StoreInfo.SATURDAY_HOURS}</div>
              <div>日曜: {StoreInfo.SUNDAY_HOURS}</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 {StoreInfo.STORE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;