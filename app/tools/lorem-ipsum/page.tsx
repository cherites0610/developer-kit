import { Type } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import LoremGenerator from '../../components/tools/lorem-generator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "lorem-ipsum"
const TITLE = "假文產生器"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("Lorem Ipsum、中文假文、數字資料、模擬訂單，一鍵生成測試資料")}&tag=Generator`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "假文產生器 | Lorem Ipsum／中文假文／模擬訂單測試資料",
  description: "免費假文產生器，支援 Lorem Ipsum、中文假文、手機號碼／統編等數字資料、模擬訂單，一鍵生成排版與測試用假資料，無廣告即開即用。",
  keywords: ["假文產生器", "Lorem Ipsum", "中文假文", "測試資料產生器", "模擬訂單", "假資料產生器", "占位文字"],
  alternates: { canonical: "/tools/lorem-ipsum" },
  openGraph: {
    title: "假文產生器 | DevTools",
    description: "Lorem Ipsum、中文假文、數字資料、模擬訂單，一鍵生成排版與測試用假資料。",
    images: [ogImage],
  },
  twitter: {
    title: "假文產生器 | DevTools",
    description: "Lorem Ipsum、中文假文、數字資料、模擬訂單，一鍵生成排版與測試用假資料。",
    images: [ogImage.url],
  },
};

export default function LoremPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lorem Ipsum 假文產生器",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Text Generator",
    "operatingSystem": "Any",
    "description": "假文與測試資料產生器，支援 Lorem Ipsum、中文假文、數字資料與模擬訂單，HTML 輸出。",
    "featureList": "Lorem Ipsum 生成, 中文假文生成, 手機號碼/統編/信用卡等數字資料, 模擬訂單資料(CSV/JSON), 自訂段落數量, HTML 格式輸出",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "這個假文產生器是免費的嗎？需要註冊嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "完全免費，且不需要註冊或登入。所有假文皆在瀏覽器端即時生成，開啟頁面即可使用，無廣告干擾。",
        },
      },
      {
        "@type": "Question",
        "name": "支援生成中文假文嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "支援。除了拉丁文 Lorem Ipsum，也提供中文假文模式，以常見中文詞彙隨機組成通順的段落，適合中文排版與 UI 文案測試。",
        },
      },
      {
        "@type": "Question",
        "name": "可以生成模擬訂單或測試用數字資料嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "可以。工具內建「數字資料」模式（手機號碼、統一編號、信用卡號、訂單編號、亂數數字）與「模擬訂單」模式（含客戶、商品、金額、日期、狀態），並可一鍵複製為 CSV 或 JSON，方便開發測試與展示使用。",
        },
      },
      {
        "@type": "Question",
        "name": "Lorem Ipsum 是什麼語言？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lorem Ipsum 是拉丁文（Latin），源自西元前 1 世紀羅馬政治家西塞羅（Cicero）的著作《De Finibus Bonorum et Malorum》。它是原文的隨機摘取與重新排列，因此雖然看起來像是正常文章，但實際上沒有完整意義。",
        },
      },
      {
        "@type": "Question",
        "name": "為什麼設計師要使用假文而不是真實內容？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "使用真實文字時，閱讀者容易被內容吸引而忽略版面設計本身。Lorem Ipsum 因其類似真實文章的字母分佈，讓設計師和客戶能夠專注於評估字型選擇、行距、版面配置和視覺層次，而不受文字內容的影響。",
        },
      },
      {
        "@type": "Question",
        "name": "Lorem Ipsum 可以用於正式發布的產品嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不建議。Lorem Ipsum 僅適合設計和開發階段的版面測試（Placeholder Text）。正式發布前應替換為真實的產品文案，以確保最終內容與設計相符。",
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
            <Type className="w-6 h-6 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            假文產生器
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          免費線上 <span className="text-zinc-300">假文產生器</span>，支援 Lorem Ipsum、
          <span className="text-blue-400">中文假文</span>、數字資料與模擬訂單。
          <br />排版測試、前端開發、Demo 展示都能一鍵生成所需假資料。
        </p>
      </section>

      <section className="mb-20">
        <LoremGenerator />
      </section>

      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">什麼是 Lorem Ipsum？</h2>
          <p>
            Lorem Ipsum 是印刷和排版領域常用的虛擬文字（Placeholder Text）。
            它最早起源於西元前 1 世紀，由羅馬政治家西塞羅 (Cicero) 的著作《De Finibus Bonorum et Malorum》（善惡之盡）修改而來。
          </p>

          <h3 className="text-xl font-bold text-foreground">為什麼使用假文？</h3>
          <p>
            在設計網頁或平面排版時，如果直接使用真實的內容，閱讀者容易被文字內容吸引而分心，忽略了版面配置本身。
            使用 Lorem Ipsum 可以讓文字看起來具有自然的字母分佈，使設計師能更專注於視覺層次與佈局。
          </p>

          <h3 className="text-xl font-bold text-foreground">標準開頭</h3>
          <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400">
            &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&rdquo;
          </blockquote>

          <h3 className="text-xl font-bold text-foreground">不只是 Lorem Ipsum</h3>
          <p>
            除了經典拉丁假文，本工具也提供 <strong className="text-zinc-200">中文假文</strong>模式，適合中文介面與內容排版測試；
            以及 <strong className="text-zinc-200">數字資料</strong>（手機號碼、統一編號、信用卡號、訂單編號、亂數數字）與
            <strong className="text-zinc-200">模擬訂單</strong>（客戶、商品、金額、日期、狀態）產生器，
            並支援一鍵複製為 CSV 或 JSON，適合前端開發、API 測試與 Demo 展示時快速填充逼真的假資料。
          </p>
        </article>
      </section>

      <RelatedTools relatedSlugs={["uuid-generator", "json-formatter"]} />
    </main>
  );
}
