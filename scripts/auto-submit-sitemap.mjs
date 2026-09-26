#!/usr/bin/env node
/**
 * Auto Sitemap & URL Indexing Submitter
 * Mandated by AGENTS.md Zero-Reminder Auto-Sitemap Submission Mandate
 * Automatically triggered via npm postbuild hook.
 */

const HOST = "www.gaoqian2580.com";
const SITE_URL = `https://${HOST}`;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY = "8f3d61a29c4e4708b5e921d8b7631e50";
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

// 核心与高频更新的高意图落地页
const CORE_URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/en`,
  `${SITE_URL}/tools/xianyu-slang`,
  `${SITE_URL}/zh/tools/xianyu-slang`,
  `${SITE_URL}/blog/xianyu-slang-complete-guide`,
  `${SITE_URL}/blog/xianyu-slang-latest-2026`,
  `${SITE_URL}/blog/xianyu-banned-words-list-2026`,
  `${SITE_URL}/en/tools/instant-domain-search`,
  `${SITE_URL}/tools/columbus`,
  `${SITE_URL}/blog`,
  SITEMAP_URL,
];

async function submitIndexNow() {
  console.log(`\n🚀 [Auto-Submitter] Broadcasting URLs to IndexNow (Bing, Yandex, Seznam)...`);
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: CORE_URLS,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✅ [IndexNow] Broadcast successful! Status: ${res.status} (${res.status === 202 ? "Accepted / Queued" : "OK"})`);
      console.log(`   URLs broadcasted: ${CORE_URLS.length} urls`);
    } else {
      const text = await res.text();
      console.warn(`⚠️ [IndexNow] Received non-200 status: ${res.status} - ${text}`);
    }
  } catch (err) {
    console.error(`❌ [IndexNow] Failed to broadcast:`, err.message);
  }
}

async function pingGoogleSitemap() {
  console.log(`📡 [Auto-Submitter] Pinging Google sitemap notification...`);
  try {
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    const res = await fetch(googlePingUrl);
    console.log(`✅ [Google Ping] Status: ${res.status}`);
  } catch (err) {
    console.warn(`⚠️ [Google Ping] Note: ${err.message}`);
  }
}

async function main() {
  console.log(`=======================================================`);
  console.log(`⚡ [SEO Auto-Submit] Executing postbuild index broadcast`);
  console.log(`   Target Site: ${SITE_URL}`);
  console.log(`=======================================================`);

  await submitIndexNow();
  await pingGoogleSitemap();

  console.log(`\n🎉 [Auto-Submitter] All sitemap submission tasks completed!\n`);
}

main().catch((err) => {
  console.error("Auto submitter error:", err);
  process.exit(0); // Do not fail the build
});
