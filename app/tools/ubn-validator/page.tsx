import { Building2 } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import UbnValidator from '../../components/tools/ubn-validator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "ubn-validator"
const TITLE = "統一編號檢查碼驗證器"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("驗證公司統一編號檢查碼是否正確，並可隨機產生測試用合法編號")}&tag=Taiwan`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "統一編號檢查碼驗證/產生器 | 公司統編驗證工具",
  description: "免費線上統一編號檢查碼驗證工具。即時驗證 8 碼營利事業統一編號是否合法，支援 2021 年新版除以 5 檢查邏輯，並可一鍵產生測試用合法統編。",
  keywords: ["統一編號驗證", "統編檢查碼", "統一編號產生器", "公司統編", "營利事業統一編號"],
  alternates: { canonical: "/tools/ubn-validator" },
  openGraph: {
    title: "統一編號檢查碼驗證器 | DevTools",
    description: "驗證 8 碼統一編號檢查碼是否正確，支援 2021 年新制除以 5 邏輯，並可產生測試用合法編號。",
    images: [ogImage],
  },
  twitter: {
    title: "統一編號檢查碼驗證器 | DevTools",
    description: "驗證 8 碼統一編號檢查碼是否正確，支援 2021 年新制除以 5 邏輯，並可產生測試用合法編號。",
    images: [ogImage.url],
  },
};

export default function UbnValidatorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "統一編號檢查碼驗證器",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Taiwan Business Tools",
    "operatingSystem": "Any",
    "description": "驗證台灣營利事業統一編號檢查碼是否正確，並可隨機產生測試用合法統一編號。",
    "featureList": "統一編號檢查碼驗證, 支援 2021 年除以 5 新制, 隨機產生合法測試編號",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "統一編號的檢查碼是怎麼計算的？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "8 碼統一編號依序乘上權重 1、2、1、2、1、2、4、1，若乘積為兩位數則將十位數與個位數相加，最後把 8 個結果加總。財政部於 110 年 12 月 22 日起將判斷規則由「加總可被 10 整除」改為「可被 5 整除」，以擴增可用編號數量。",
        },
      },
      {
        "@type": "Question",
        "name": "為什麼第 7 碼是 7 的統編驗證邏輯比較特別？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "第 7 碼的權重是 4，當該碼為 7 時乘積為 28，兩位數相加後又得到兩位數「10」，產生進位歧義。此時規則允許分別以 1 或 0 代入計算兩種加總結果，只要其中一種能被 5 整除即為合法統編。",
        },
      },
      {
        "@type": "Question",
        "name": "隨機產生的統一編號可以拿去登記公司使用嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不行。本工具產生的編號僅通過數學檢查碼運算，並未向財政部登記，純粹用於軟體開發時的表單驗證測試（例如測試前端/後端的統編檢查邏輯），不代表真實存在的營利事業。",
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
            <Building2 className="w-6 h-6 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            統一編號檢查碼驗證器
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          即時驗證 <span className="text-zinc-300">8 碼統一編號</span> 檢查碼是否合法，
          <br />支援 2021 年新制計算邏輯，並可產生測試用合法編號。
        </p>
      </section>

      <section className="mb-20">
        <UbnValidator />
      </section>

      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">什麼是統一編號檢查碼？</h2>
          <p>
            統一編號（統編）是財政部核發給營利事業的 8 碼識別碼，其中隱含一組數學檢查碼，
            用來快速判斷輸入的編號是否可能為合法編號（但不保證該編號確實已被登記使用）。
            由於統編即將用罄，財政部已於 110 年 12 月 22 日調整檢查邏輯，
            將原本「加總可被 10 整除」放寬為「可被 5 整除」，以擴充可用號碼空間。
          </p>

          <h3 className="text-xl font-bold text-foreground">計算步驟</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>將 8 碼依序乘上權重：1、2、1、2、1、2、4、1</li>
            <li>若某位乘積為兩位數，將十位數與個位數相加（例如 18 → 1+8=9）</li>
            <li>將 8 個結果加總</li>
            <li>加總結果若能被 5 整除，即為合法統編；第 7 碼為 7 時另有特殊判斷規則</li>
          </ol>
        </article>
      </section>

      <RelatedTools relatedSlugs={["id-number-validator", "invoice-validator"]} />
    </main>
  );
}
