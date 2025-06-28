export class StoreInfo {
  // 店舗基本情報
  static readonly STORE_NAME = '麵屋◯◯';
  static readonly DESCRIPTION = '鶏ガラ醤油の昔ながらの中華そば';
  
  // 連絡先情報
  //static readonly PHONE_NUMBER = '086-234-1233';
  static readonly PHONE_NUMBER = 'XXX-XXX-YYYY';
  static readonly POSTAL_CODE = '〒700-0914';
  static readonly ADDRESS = '岡山県岡山市北区鹿田町1丁目7−19';
  
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
