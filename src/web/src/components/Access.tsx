import React from 'react';
import { MapPin, Clock, Phone, CreditCard, Car, Instagram, Twitter } from 'lucide-react';
import { StoreInfo } from '../constants/storeInfo';

const Access: React.FC = () => {
  return (
    <section id="access" className="py-20 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">アクセス・店舗情報</h2>
          <p className="text-xl text-gray-600">
            皆様のご来店をお待ちしております
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Store Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="mr-3 text-red-600" size={28} />
                店舗情報
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-red-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900">住所</div>
                    <div className="text-gray-600">{StoreInfo.POSTAL_CODE}<br />{StoreInfo.ADDRESS}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="text-red-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900">電話番号</div>
                    <a href={`tel:${StoreInfo.PHONE_NUMBER}`} className="text-red-600 hover:text-red-700 transition-colors">
                      {StoreInfo.PHONE_NUMBER}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Car className="text-red-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900">駐車場</div>
                    <div className="text-gray-600">{StoreInfo.PARKING}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CreditCard className="text-red-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900">お支払い方法</div>
                    <div className="text-gray-600">{StoreInfo.PAYMENT_METHODS}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-red-600 mt-1 flex-shrink-0">📅</div>
                  <div>
                    <div className="font-semibold text-gray-900">創業日</div>
                    <div className="text-gray-600">{StoreInfo.OPENING_DATE}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Instagram className="text-red-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900">Instagram</div>
                    <a 
                      href={StoreInfo.INSTAGRAM_URL}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      {StoreInfo.INSTAGRAM_HANDLE}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Twitter className="text-red-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-900">X (Twitter)</div>
                    <a 
                      href={StoreInfo.TWITTER_URL}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      {StoreInfo.TWITTER_HANDLE}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="mr-3 text-red-600" size={28} />
                営業時間
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-900">平日</span>
                  <div className="text-right">
                    <div className="text-gray-900">{StoreInfo.WEEKDAY_LUNCH_HOURS}</div>
                    <div className="text-gray-900">{StoreInfo.WEEKDAY_DINNER_HOURS}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-semibold text-gray-900">土曜日</span>
                  <span className="text-red-600 font-semibold">{StoreInfo.SATURDAY_HOURS}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-gray-900">日曜日</span>
                  <span className="text-gray-900">{StoreInfo.SUNDAY_HOURS}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ※ {StoreInfo.LAST_ORDER_NOTE}
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">地図</h3>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <iframe
                src={`${StoreInfo.MAP_URL}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="店舗所在地"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
                <a 
                  href={`https://maps.google.com/?q=${StoreInfo.ADDRESS}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white no-underline"
                >
                  Googleマップで開く
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Access;