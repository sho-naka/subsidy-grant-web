/**
 * 都道府県コンポーネント
 * 47都道府県のデータとプルダウン初期化機能を提供
 */

/**
 * 47都道府県データ（正式名称）
 */
const PREFECTURES = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県'
];

/**
 * 都道府県プルダウンを初期化
 * @param {string} selectElementId - select要素のID
 * @param {string} defaultValue - デフォルト値（省略時は '東京都'）
 */
function initializePrefectureSelect(selectElementId, defaultValue = '東京都') {
  const selectElement = document.getElementById(selectElementId);
  
  if (!selectElement) {
    console.error(`Element with id "${selectElementId}" not found`);
    return;
  }
  
  // 既存のoption要素をクリア
  selectElement.innerHTML = '';
  
  // 47都道府県のoption要素を追加
  PREFECTURES.forEach(prefecture => {
    const option = document.createElement('option');
    option.value = prefecture;
    option.textContent = prefecture;
    
    // デフォルト値を設定
    if (prefecture === defaultValue) {
      option.selected = true;
    }
    
    selectElement.appendChild(option);
  });
}

/**
 * 都道府県データを取得
 * @returns {Array<string>} 47都道府県の配列
 */
function getPrefectures() {
  return [...PREFECTURES];
}

/**
 * 都道府県名が有効かチェック
 * @param {string} prefectureName - チェックする都道府県名
 * @returns {boolean} 有効な都道府県名の場合true
 */
function isValidPrefecture(prefectureName) {
  return PREFECTURES.includes(prefectureName);
}