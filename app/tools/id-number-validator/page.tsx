import { IdCard } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import IdNumberValidator from '../../components/tools/id-number-validator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "id-number-validator"
const TITLE = "身分證字號驗證器"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("驗證中華民國國民身分證字號檢查碼是否正確")}&tag=Taiwan`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "身分證字號驗證器 | 檢查碼即時驗證工具",
  description: "免費線上身分證字號驗證工具。依中華民國國民身分證檢查碼公式，即時驗證 10 碼身分證字號格式與檢查碼是否正確，適合表單驗證邏輯測試。",
  keywords: ["身分證字號驗證", "身分證檢查碼", "台灣身分證格式", "ID number validator"],
  alternates: { canonical: "/tools/id-number-validator" },
  openGraph: {
    title: "身分證字號驗證器 | DevTools",
    description: "依官方檢查碼公式即時驗證身分證字號是否正確，適合表單驗證邏輯測試。",
    images: [ogImage],
  },
  twitter: {
    title: "身分證字號驗證器 | DevTools",
    description: "依官方檢查碼公式即時驗證身分證字號是否正確，適合表單驗證邏輯測試。",
    images: [ogImage.url],
  },
};

export default function IdNumberValidatorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "身分證字號驗證器",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Taiwan Identity Tools",
    "operatingSystem": "Any",
    "description": "依中華民國國民身分證檢查碼公式驗證身分證字號格式是否合法。",
    "featureList": "身分證字號格式驗證, 檢查碼運算, 性別碼判讀",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "身分證字號的檢查碼是怎麼算出來的？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "先將第一碼英文字母轉換成對應的兩位數字（A=10、B=11...以此類推），十位數乘以 1、個位數乘以 9，再與後面 8 碼數字分別乘上權重 8、7、6、5、4、3、2、1 相加，最後加上第 10 碼（檢查碼），總和須能被 10 整除才是合法號碼。",
        },
      },
      {
        "@type": "Question",
        "name": "身分證第二碼的數字代表什麼意思？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "傳統上第二碼 1 代表男性、2 代表女性；近年新式戶籍整合證號（含外來人口）則可能以 8 或 9 開頭，不代表性別，但檢查碼運算方式相同。",
        },
      },
      {
        "@type": "Question",
        "name": "這個工具會不會把我輸入的身分證字號傳到伺服器？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不會。所有運算都在你的瀏覽器內以 JavaScript 完成，資料不會上傳或儲存，適合用來測試前端表單的身分證格式驗證邏輯。",
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
            <IdCard className="w-6 h-6 text-sky-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            身分證字號驗證器
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          依官方檢查碼公式，即時驗證 <span className="text-zinc-300">10 碼身分證字號</span> 是否合法，
          <br />純瀏覽器端運算，資料不上傳。
        </p>
      </section>

      <section className="mb-20">
        <IdNumberValidator />
      </section>

      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">身分證字號格式說明</h2>
          <p>
            中華民國國民身分證字號由 1 個英文字母（代表首次登記戶籍的縣市別）與 9 碼數字組成，
            最後一碼為檢查碼，用於快速偵測輸入錯誤。這個工具僅驗證格式與檢查碼是否正確，
            不會、也無法查證該號碼是否為真實存在的個人資料。
          </p>
        </article>
      </section>

      <RelatedTools relatedSlugs={["ubn-validator", "roc-year-converter"]} />
    </main>
  );
}
