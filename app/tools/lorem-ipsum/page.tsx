import { Type } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import LoremGenerator from '../../components/tools/lorem-generator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "lorem-ipsum"
const TITLE = "亂數假文生成"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("Lorem Ipsum 假文生成，支援 HTML 輸出，排版測試專用")}&tag=Generator`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "Lorem Ipsum 亂數假文生成器 | 排版測試工具",
  description: "免費線上 Lorem Ipsum 生成器。開發者專用，支援 HTML 標籤輸出，可自訂段落數量與長度，快速生成排版測試用文字。",
  keywords: ["Lorem Ipsum", "假文生成器", "亂數文字", "排版測試", "HTML生成", "Lorem Generator"],
  alternates: { canonical: "/tools/lorem-ipsum" },
  openGraph: {
    title: "Lorem Ipsum 亂數假文生成器 | DevTools",
    description: "免費線上 Lorem Ipsum 生成器。支援 HTML 標籤輸出，可自訂段落數量與長度，快速生成排版測試用文字。",
    images: [ogImage],
  },
  twitter: {
    title: "Lorem Ipsum 亂數假文生成器 | DevTools",
    description: "免費線上 Lorem Ipsum 生成器。支援 HTML 標籤輸出，可自訂段落數量與長度，快速生成排版測試用文字。",
    images: [ogImage.url],
  },
};

export default function LoremPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lorem Ipsum Generator",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Text Generator",
    "operatingSystem": "Any",
    "description": "Lorem Ipsum 假文生成工具，支援 HTML 輸出。",
    "featureList": "Lorem Ipsum 生成, 自訂段落數量, HTML 格式輸出, 自訂文字長度",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
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
            亂數假文生成器
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          生成標準的 <span className="text-zinc-300">Lorem Ipsum</span> 拉丁假文。
          <br />支援 <span className="text-blue-400">HTML 格式</span> 複製，UI/UX 設計與排版測試的好幫手。
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
        </article>
      </section>

      <RelatedTools relatedSlugs={["uuid-generator"]} />
    </main>
  );
}
