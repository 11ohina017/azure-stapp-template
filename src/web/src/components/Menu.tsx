import React from 'react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  largePrice?: number;
  category: 'ramen' | 'side' | 'set';
}

const menuItems: MenuItem[] = [
  // ラーメン
  { id: '1', name: '中華そば', price: 880, largePrice: 1078, category: 'ramen' },
  { id: '2', name: 'ごまそば', price: 990, largePrice: 1210, category: 'ramen' },
  { id: '3', name: 'しおそば', price: 880, largePrice: 1078, category: 'ramen' },
  
  // サイドメニュー
  { id: '4', name: '自家製チャーシュー（3枚）', price: 528, category: 'side' },
  { id: '5', name: '味玉', price: 165, category: 'side' },
  { id: '6', name: 'メンマ', price: 198, category: 'side' },
  { id: '7', name: 'ねぎ', price: 220, category: 'side' },
  { id: '8', name: '瓶ビール（中瓶）アサヒスーパードライ', price: 660, category: 'side' },
  { id: '9', name: '餃子（3個）', price: 297, category: 'side' },
  { id: '10', name: '餃子（5個）', price: 495, category: 'side' },
  { id: '11', name: '白ごはん', price: 143, largePrice: 176, category: 'side' },
  
  // セットメニュー
  { id: '12', name: 'プチごはんセット', price: 220, category: 'set' },
  { id: '13', name: '鶏味噌そぼろセット', price: 220, category: 'set' },
  { id: '14', name: '肉めしセット', price: 418, category: 'set' },
  { id: '15', name: 'プチ肉めしセット', price: 220, category: 'set' },
];

const categoryNames = {
  ramen: 'ラーメン',
  side: 'サイドメニュー',
  set: 'セットメニュー'
};

const Menu: React.FC = () => {
  const renderMenuSection = (category: 'ramen' | 'side' | 'set') => {
    const items = menuItems.filter(item => item.category === category);
    
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center border-b-2 border-red-200 pb-3">
          {categoryNames[category]}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-bold text-gray-900">項目名</th>
                <th className="text-right py-3 px-4 font-bold text-gray-900">価格</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-100 hover:bg-red-50 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="space-y-1">
                      <div className="font-bold text-red-600">
                        {category === 'set' ? '+' : ''}¥{item.price}
                      </div>
                      {item.largePrice && (
                        <div className="text-sm text-gray-600">
                          大盛り: ¥{item.largePrice}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">メニュー</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            厳選された食材と伝統の製法で作り上げた自慢の品々
          </p>
        </div>

        {/* Featured Menu Items with Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl ring-4 ring-red-200 ring-opacity-50">
            <div className="bg-red-600 text-white text-center py-2 text-sm font-bold">
              🍜 看板メニュー
            </div>
            <div className="relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1395319/pexels-photo-1395319.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="中華そば"
                className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">中華そば</h3>
                <span className="text-2xl font-bold text-red-600">¥880</span>
              </div>
              <p className="text-gray-600 leading-relaxed">当店自慢の鶏ガラ醤油スープ。昔ながらの優しい味わい</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1395319/pexels-photo-1395319.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="ごまそば"
                className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">ごまそば</h3>
                <span className="text-2xl font-bold text-red-600">¥990</span>
              </div>
              <p className="text-gray-600 leading-relaxed">濃厚なごまの風味が楽しめる人気の一杯</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <div className="relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/4518844/pexels-photo-4518844.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="餃子"
                className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900">餃子</h3>
                <span className="text-2xl font-bold text-red-600">¥297~</span>
              </div>
              <p className="text-gray-600 leading-relaxed">手作り餃子。パリッと香ばしく焼き上げました</p>
            </div>
          </div>
        </div>

        {/* Detailed Menu Tables */}
        {renderMenuSection('ramen')}
        {renderMenuSection('side')}
        {renderMenuSection('set')}

        <div className="mt-8 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-yellow-800 text-sm">
              ※ 価格は税込表示です<br />
              ※ セットメニューは各ラーメンに追加でご注文いただけます
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;