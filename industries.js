/**
 * 業種コンポーネント
 * 業種データとプルダウン初期化機能を提供
 */

/**
 * 業種データ（日本標準産業分類に基づく主要業種 + その他）
 */
const INDUSTRIES = [
  '農業・林業・漁業',
  '鉱業・採石業・砂利採取業',
  '建設業',
  '製造業',
  '電気・ガス・熱供給・水道業',
  '情報通信業',
  '運輸業・郵便業',
  '卸売業・小売業',
  '金融業・保険業',
  '不動産業・物品賃貸業',
  '学術研究・専門・技術サービス業',
  '宿泊業・飲食サービス業',
  '生活関連サービス業・娯楽業',
  '教育・学習支援業',
  '医療・福祉',
  '複合サービス事業',
  'サービス業（他に分類されないもの）',
  '公務（他に分類されるものを除く）',
  'その他'
];

/**
 * 業種プルダウンを初期化
 * @param {string} selectElementId - select要素のID
 * @param {string} defaultValue - デフォルト値（省略時は '情報通信業'）
 */
function initializeIndustrySelect(selectElementId, defaultValue = '情報通信業') {
  const selectElement = document.getElementById(selectElementId);
  
  if (!selectElement) {
    console.error(`Element with id "${selectElementId}" not found`);
    return;
  }
  
  // 既存のoption要素をクリア
  selectElement.innerHTML = '';
  
  // 空のオプションを最初に追加（未選択状態）
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = '-- 業種を選択してください --';
  selectElement.appendChild(emptyOption);
  
  // 業種のoption要素を追加
  INDUSTRIES.forEach(industry => {
    const option = document.createElement('option');
    option.value = industry;
    option.textContent = industry;
    
    // デフォルト値を設定
    if (industry === defaultValue) {
      option.selected = true;
    }
    
    selectElement.appendChild(option);
  });
}

/**
 * 業種データを取得
 * @returns {Array<string>} 業種の配列
 */
function getIndustries() {
  return [...INDUSTRIES];
}

/**
 * 業種名が有効かチェック
 * @param {string} industryName - チェックする業種名
 * @returns {boolean} 有効な業種名の場合true
 */
function isValidIndustry(industryName) {
  return INDUSTRIES.includes(industryName) || industryName === '';
}

/**
 * 業種が「その他」かどうかをチェック
 * @param {string} industryName - チェックする業種名
 * @returns {boolean} 「その他」の場合true
 */
function isOtherIndustry(industryName) {
  return industryName === 'その他';
}