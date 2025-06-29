export class StoreInfo {
  // 店舗基本情報
  static readonly STORE_NAME = '麵屋◯◯';
  static readonly DESCRIPTION = '鶏ガラ醤油の昔ながらの中華そば';
  
  // 連絡先情報
  //static readonly PHONE_NUMBER = '086-234-1233';
  //static readonly POSTAL_CODE = '〒700-0914';
  //static readonly ADDRESS = '岡山県岡山市北区鹿田町1丁目7−19';
  //static readonly MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3276.7123456789!2d133.9234567!3d34.6678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s%E5%B2%A1%E5%B1%B1%E7%9C%8C%E5%B2%A1%E5%B1%B1%E5%B8%82%E5%8C%97%E5%8C%BA%E9%B9%BF%E7%94%B0%E7%94%BA1%E4%B8%81%E7%9B%AE7-19!5e0!3m2!1sja!2sjp!4v1640995200000!5m2!1sja!2sjp'
  static readonly PHONE_NUMBER = 'XXX-XXX-YYYY';
  static readonly POSTAL_CODE = '〒700-0975';
  static readonly ADDRESS = '岡山県岡山市北区今5丁目2-8';
  static readonly MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6564.740946934865!2d133.89581907520787!3d34.64534567293941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35540770877ab683%3A0xb327eca37d2cfb9b!2z44CSNzAwLTA5NzUg5bKh5bGx55yM5bKh5bGx5biC5YyX5Yy65LuK77yV5LiB55uu77yS4oiS77yYIOOCpuOCqOOCueODiOODkuODq-OCuuS7ig!5e0!3m2!1sja!2sjp!4v1751190282763!5m2!1sja!2sjp" '; // Google MapsのURLを設定
  
  // SNSアカウント
  //static readonly INSTAGRAM_URL = 'https://www.instagram.com/menyadago/';
  //static readonly INSTAGRAM_HANDLE = '@menyadago';
  //static readonly TWITTER_URL = 'https://x.com/8wzarlcbgkpeq0m';
  //static readonly TWITTER_HANDLE = '@8wzarlcbgkpeq0m';
  static readonly INSTAGRAM_URL = 'https://www.instagram.com/okayama_sport_sokuho/';
  static readonly INSTAGRAM_HANDLE = '@okayama_sport_sokuho';
  static readonly TWITTER_URL = 'https://x.com/okasposokuho';
  static readonly TWITTER_HANDLE = '@okasposokuho';
  
  // 営業時間
  static readonly WEEKDAY_HOURS = '11:30-14:00, 18:00-21:00';
  static readonly WEEKDAY_LUNCH_HOURS = '11:30 - 14:00';
  static readonly WEEKDAY_DINNER_HOURS = '18:00 - 21:00';
  static readonly SATURDAY_HOURS = '定休日';
  static readonly SUNDAY_HOURS = '11:30-14:00';
  
  // 店舗詳細情報
  static readonly PARKING = 'なし: ※近隣のコインパーキングをご利用ください';
  static readonly PAYMENT_METHODS = '現金 / PayPay';
  static readonly OPENING_DATE = '20xx年xx月xx日';
  static readonly LAST_ORDER_NOTE = 'ラストオーダーは閉店30分前までとなります';
  
  // 完全な住所を取得するメソッド
  static getFullAddress(): string {
    return `${this.POSTAL_CODE}\n${this.ADDRESS}`;
  }
  
  // 営業時間情報を取得するメソッド
  static getOperatingHours() {
    return {
      weekday: this.WEEKDAY_HOURS,
      saturday: this.SATURDAY_HOURS,
      sunday: this.SUNDAY_HOURS
    };
  }
}
