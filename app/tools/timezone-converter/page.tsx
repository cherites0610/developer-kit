import { Globe } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import TimezoneConverter from '../../components/tools/timezone-converter'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "timezone-converter"
const TITLE = "時區轉換/偏移"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("UTC 與本地時間即時對照，支援偏移模擬與 ISO 8601 解析")}&tag=Timezone`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "時區轉換器 & 時間偏移模擬 | UTC vs Local Time",
  description: "開發者專用的時區轉換工具。即時對照本地時間與 UTC+0 時間，支援分鐘偏移模擬 (Offset Simulation)，方便測試系統時間誤差。亦支援 ISO 8601 格式轉換。",
  keywords: ["時區轉換", "Timezone Converter", "UTC轉換", "ISO 8601 Parser", "時間偏移測試"],
  alternates: { canonical: "/tools/timezone-converter" },
  openGraph: {
    title: "時區轉換器 & 時間偏移模擬 | DevTools",
    description: "開發者專用的時區轉換工具。即時對照本地時間與 UTC+0，支援偏移模擬與 ISO 8601 格式轉換。",
    images: [ogImage],
  },
  twitter: {
    title: "時區轉換器 & 時間偏移模擬 | DevTools",
    description: "開發者專用的時區轉換工具。即時對照本地時間與 UTC+0，支援偏移模擬與 ISO 8601 格式轉換。",
    images: [ogImage.url],
  },
};

export default function TimezonePage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Timezone Converter & Offset Simulator",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Date/Time Utility",
    "operatingSystem": "Any",
    "description": "UTC 與本地時區即時轉換，支援時間偏移模擬。",
    "featureList": "UTC 時間轉換, 本地時間對照, 時間偏移模擬, ISO 8601 解析",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "UTC 和 GMT 有什麼區別？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "UTC（協調世界時）和 GMT（格林威治標準時間）在數值上幾乎相同，但概念不同。GMT 是基於地球自轉的天文時間，UTC 是基於原子鐘的標準時間。現代軟體和 API 都使用 UTC，GMT 主要用於歷史或地理語境。",
        },
      },
      {
        "@type": "Question",
        "name": "ISO 8601 日期格式是什麼？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ISO 8601 是國際標準的日期時間格式，最常見形式為 YYYY-MM-DDTHH:mm:ss.sssZ。其中 T 是日期與時間的分隔符，Z 代表 Zulu Time（UTC+0）。這是 API 傳輸和資料庫儲存時間的推薦格式。",
        },
      },
      {
        "@type": "Question",
        "name": "為什麼需要時間偏移（Offset）模擬？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "時間偏移模擬在開發測試中非常有用：模擬 JWT Token 過期（時間快轉）、測試排程任務（Cron Job）在特定時間點的行為、以及驗證跨時區的資料庫 UTC 儲存與前端本地時間轉換是否正確。",
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
            <Globe className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            時區轉換與偏移模擬
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          即時對照 <span className="text-zinc-300">Local Time</span> 與 <span className="text-zinc-300">UTC (+0)</span>。
          <br />
          支援 ISO 格式解析與 <span className="text-yellow-500">時間偏移 (Offset)</span> 模擬，協助除錯時間相關問題。
        </p>
      </section>

      <section className="mb-20">
        <TimezoneConverter />
      </section>

      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">為什麼需要時間偏移 (Offset)？</h2>
          <p>
            在開發與測試階段，我們經常需要驗證系統對於「未來時間」或「過期時間」的反應。例如：
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Token 過期測試：</strong> 將時間快轉 30 分鐘，確認 Access Token 是否自動失效。</li>
            <li><strong>排程任務：</strong> 模擬到達特定時間點，觸發 Cron Job 邏輯。</li>
            <li><strong>跨時區同步：</strong> 確認資料庫存入的 UTC 時間在前端轉換是否正確。</li>
          </ul>

          <h3 className="text-xl font-bold text-foreground">關於 ISO 8601</h3>
          <p>
            ISO 8601 是國際標準的日期與時間表示法。最常見的格式為 <code>YYYY-MM-DDTHH:mm:ss.sssZ</code>。
            其中 <code>Z</code> 代表 Zulu Time (UTC+0)。
          </p>
        </article>
      </section>

      <RelatedTools relatedSlugs={["timestamp-converter"]} />
    </main>
  );
}
