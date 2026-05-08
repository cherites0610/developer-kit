import { Clock } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import TimestampConverter from '../../components/tools/timestamp-converter'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "timestamp-converter"
const TITLE = "Unix 時間戳轉換"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("Unix Timestamp 與日期互轉，支援秒/毫秒、UTC、ISO 8601")}&tag=Converter`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "Unix Timestamp 轉換器 | 時間戳互轉 (Seconds/Millis)",
  description: "免費、極速的 Unix 時間戳轉換工具。支援秒與毫秒互轉，即時顯示當前時間戳，並提供 UTC 與 ISO 8601 格式轉換。",
  keywords: ["Unix Timestamp", "時間戳轉換", "Unix Time Converter", "Epoch Converter", "時間戳生成"],
  alternates: { canonical: "/tools/timestamp-converter" },
  openGraph: {
    title: "Unix Timestamp 轉換器 | DevTools",
    description: "免費、極速的 Unix 時間戳轉換工具。支援秒與毫秒互轉，即時顯示當前時間戳，提供 UTC 與 ISO 8601 格式。",
    images: [ogImage],
  },
  twitter: {
    title: "Unix Timestamp 轉換器 | DevTools",
    description: "免費、極速的 Unix 時間戳轉換工具。支援秒與毫秒互轉，即時顯示當前時間戳，提供 UTC 與 ISO 8601 格式。",
    images: [ogImage.url],
  },
};

export default function TimestampPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Unix Timestamp Converter",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Date/Time Utility",
    "operatingSystem": "Any",
    "description": "Unix 時間戳與日期時間互轉工具。",
    "featureList": "Unix 時間戳轉換, 秒毫秒互轉, 即時時間戳顯示, UTC 轉換, ISO 8601 輸出",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "什麼是 Unix 時間戳（Unix Timestamp）？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unix 時間戳（也稱 Unix Epoch）是一個整數值，代表自 1970 年 1 月 1 日 00:00:00 UTC 起所經過的秒數。它不依賴時區，是電腦系統中記錄時間的通用標準。",
        },
      },
      {
        "@type": "Question",
        "name": "秒（seconds）和毫秒（milliseconds）時間戳如何區分？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "秒時間戳通常是 10 位數（如 1735689600），毫秒時間戳是 13 位數（如 1735689600000）。JavaScript 的 Date.now() 回傳毫秒，而 Python 的 time.time() 和 PHP 的 time() 回傳秒。",
        },
      },
      {
        "@type": "Question",
        "name": "Unix 時間戳在 2038 年會有問題嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "這是著名的「2038 年問題（Y2K38）」。使用 32 位元有號整數儲存時間戳的舊系統，最大值為 2147483647，對應 2038-01-19。現代系統普遍使用 64 位元整數，可支援數億年後的時間。",
        },
      },
    ],
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <JsonLd data={appLd} />
      <JsonLd data={faqLd} />
      <Breadcrumb toolTitle={TITLE} toolSlug={SLUG} />

      <section className="mb-12 text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-zinc-900 rounded-full border border-zinc-800">
            <Clock className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Unix 時間戳轉換
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          在 Unix Timestamp 與人類可讀日期之間互轉。
          <br />支援 <span className="text-zinc-300">Seconds (PHP/Python)</span> 與 <span className="text-zinc-300">Milliseconds (Java/JS)</span>。
        </p>
      </section>

      <section className="mb-20">
        <TimestampConverter />
      </section>

      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">什麼是 Unix 時間戳？</h2>
          <p>
            Unix Timestamp (Unix Epoch) 是一個整數值，代表自 <strong>1970年1月1日 00:00:00 UTC</strong> 以來所經過的秒數（不考慮閏秒）。
            它是電腦系統中紀錄時間的標準方式，因為它不依賴於時區，全球統一。
          </p>

          <h3 className="text-xl font-bold text-foreground">常見程式語言的獲取方式</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 font-mono text-sm">
              <div className="text-zinc-500 mb-1">JavaScript</div>
              <code className="text-blue-400">Date.now() // Milliseconds</code><br />
              <code className="text-blue-400">Math.floor(Date.now() / 1000) // Seconds</code>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 font-mono text-sm">
              <div className="text-zinc-500 mb-1">Python</div>
              <code className="text-yellow-400">import time</code><br />
              <code className="text-yellow-400">time.time()</code>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 font-mono text-sm">
              <div className="text-zinc-500 mb-1">PHP</div>
              <code className="text-purple-400">time();</code>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 font-mono text-sm">
              <div className="text-zinc-500 mb-1">Go</div>
              <code className="text-cyan-400">time.Now().Unix()</code>
            </div>
          </div>
        </article>
      </section>

      <RelatedTools relatedSlugs={["timezone-converter"]} />
    </main>
  );
}
