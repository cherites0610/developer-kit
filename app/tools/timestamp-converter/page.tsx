import { Clock } from "lucide-react"
import { Metadata } from "next"
import { JsonLd } from '../../components/seo/json-ld'
import TimestampConverter from '../../components/tools/timestamp-converter'

export const metadata: Metadata = {
  title: "Unix Timestamp 轉換器 | 時間戳互轉 (Seconds/Millis)",
  description: "免費、極速的 Unix 時間戳轉換工具。支援秒與毫秒互轉，即時顯示當前時間戳，並提供 UTC 與 ISO 8601 格式轉換。",
  keywords: ["Unix Timestamp", "時間戳轉換", "Unix Time Converter", "Epoch Converter", "時間戳生成"],
  alternates: { canonical: "/tools/timestamp-converter" },
  openGraph: {
    title: "Unix Timestamp 轉換器 | DevTools",
    description: "免費、極速的 Unix 時間戳轉換工具。支援秒與毫秒互轉，即時顯示當前時間戳，提供 UTC 與 ISO 8601 格式。",
  },
  twitter: {
    title: "Unix Timestamp 轉換器 | DevTools",
    description: "免費、極速的 Unix 時間戳轉換工具。支援秒與毫秒互轉，即時顯示當前時間戳，提供 UTC 與 ISO 8601 格式。",
  },
};

export default function TimestampPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Unix Timestamp Converter",
    "applicationCategory": "DeveloperTool",
    "operatingSystem": "Any",
    "description": "Unix 時間戳與日期時間互轉工具。",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <JsonLd data={jsonLd} />

      {/* Top Section */}
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

      {/* Tool Section */}
      <section className="mb-20">
        <TimestampConverter />
      </section>

      {/* Rich Content / SEO */}
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
              <code className="text-blue-400">Date.now() // Milliseconds</code><br/>
              <code className="text-blue-400">Math.floor(Date.now() / 1000) // Seconds</code>
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 font-mono text-sm">
              <div className="text-zinc-500 mb-1">Python</div>
              <code className="text-yellow-400">import time</code><br/>
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
    </main>
  );
}
