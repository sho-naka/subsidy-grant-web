/**
 * 補助金・助成金検索アプリケーション
 */

// API設定
const API_ENDPOINT = "https://subsidy-grant-api.vercel.app/v1/search"; // 必要なら差し替え

// DOM要素取得用のユーティリティ関数
const $ = (id) => document.getElementById(id);

// DOM要素の取得
const runBtn = $("runBtn");
const clearBtn = $("clearBtn");
const statusEl = $("status");
const resultsEl = $("results");

/**
 * HTMLエスケープ処理
 * @param {string} s - エスケープする文字列
 * @returns {string} エスケープされた文字列
 */
function escapeHtml(s) {
  return (s || "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

/**
 * 検索結果をレンダリング
 * @param {Array} items - 検索結果のアイテム配列
 * @param {number} took_ms - 検索にかかった時間（ミリ秒）
 */
function render(items = [], took_ms = 0) {
  resultsEl.innerHTML = "";
  
  if (!items.length) {
    resultsEl.innerHTML = `<div class="result"><span class="hint">該当がありませんでした。</span></div>`;
    statusEl.textContent = "0件";
    return;
  }
  
  items.forEach(it => {
    const meta = [];
    if (it.deadline) meta.push(`締切: ${escapeHtml(it.deadline)}`);
    if (it.amount_max != null) meta.push(`上限額: ${Number(it.amount_max).toLocaleString()}円`);
    if (it.rate_max != null) meta.push(`補助率: ${(Number(it.rate_max) * 100).toFixed(0)}%`);
    if (it.area || it.municipality) meta.push(`地域: ${escapeHtml(it.area || "")} ${escapeHtml(it.municipality || "")}`);
    if (it.industry) meta.push(`業種: ${escapeHtml(it.industry)}`);

    const reasons = (it.reasons || []).slice(0, 3).map(r => `<span class="pill">${escapeHtml(r)}</span>`).join(" ");

    // grant_typeに応じてバッジの表示を決定
    const grantType = it.grant_type || "補助金"; // デフォルトは補助金
    const badgeClass = grantType === "助成金" ? "grant" : "subsidy";

    const card = document.createElement("div");
    card.className = "card-modern";
    card.innerHTML = `
      <div class="card-head">
        <div>
          <div class="kind-badge ${badgeClass}">${escapeHtml(grantType)}</div>
          <h3 style="margin:6px 0 6px">${escapeHtml(it.title || "（タイトル不明）")}</h3>
          <div class="meta">${meta.join(" ・ ")}</div>
        </div>
        <div class="score">信頼度 <span class="score">${(it.confidence ?? 0).toFixed(2)}</span></div>
      </div>
      <div class="body" style="margin:10px 0 8px">${escapeHtml(it.summary || "")}</div>
      <div class="card-footer">
        <a class="btn" href="${it.source_url}" target="_blank" rel="noopener">公式ページ</a>
        <span class="pill">${reasons || "—"}</span>
      </div>
    `;
    resultsEl.appendChild(card);
  });
  
  statusEl.textContent = `検索完了：${items.length}件（${took_ms} ms）`;
}

/**
 * 検索実行関数
 */
async function run() {
  const body = {
    prefecture: $("pref").value || "東京都",
    municipality: $("muni").value || null,
    industry: $("industry").value || null,
    keywords: $("kw").value || null,
    top_k: parseInt(($("topk").value || "10"), 10)
  };
  
  runBtn.disabled = true;
  statusEl.textContent = "検索中…";
  resultsEl.innerHTML = "";
  
  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    
    const data = await res.json();
    render(data.items, data.took_ms);
  } catch (e) {
    statusEl.innerHTML = `<span class="badge ng">エラー</span> <span class="hint">${escapeHtml(e.message)}</span>`;
  } finally {
    runBtn.disabled = false;
  }
}

/**
 * フォームクリア関数
 */
function clearForm() {
  // 都道府県をデフォルトの東京都に戻す
  $("pref").value = "東京都";
  
  // 業種を未選択状態に戻す
  $("industry").value = "";
  
  // その他の入力項目をクリア
  ["muni", "kw"].forEach(id => $(id).value = "");
  $("topk").value = "10";
  statusEl.textContent = "";
  resultsEl.innerHTML = "";
}

// イベントリスナーの設定
runBtn.addEventListener("click", run);
clearBtn.addEventListener("click", clearForm);

// DOM読み込み完了時の初期化
document.addEventListener("DOMContentLoaded", function() {
  // 都道府県プルダウンを初期化（デフォルト値: 東京都）
  initializePrefectureSelect("pref", "東京都");
  
  // 業種プルダウンを初期化（デフォルト値: 未選択）
  initializeIndustrySelect("industry", "");
});