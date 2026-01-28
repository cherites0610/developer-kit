import { Type } from "lucide-react"
import { Metadata } from "next"
import { JsonLd } from '../../components/seo/json-ld'
import LoremGenerator from '../../components/tools/lorem-generator'

export const metadata: Metadata = {
  title: "Lorem Ipsum 亂數假文生成器 | 排版測試工具",
  description: "免費線上 Lorem Ipsum 生成器。開發者專用，支援 HTML 標籤輸出，可自訂段落數量與長度，快速生成排版測試用文字。",
  keywords: ["Lorem Ipsum", "假文生成器", "亂數文字", "排版測試", "HTML生成", "Lorem Generator"],
  alternates: {
    canonical: "/tools/lorem-ipsum",
  },
};

export default function LoremPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lorem Ipsum Generator",
    "applicationCategory": "DeveloperTool",
    "operatingSystem": "Any",
    "description": "Lorem Ipsum 假文生成工具，支援 HTML 輸出。",
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

      {/* Tool Section */}
      <section className="mb-20">
        <LoremGenerator />
      </section>

      {/* Rich Content / SEO */}
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          </blockquote>
        </article>
      </section>
    </main>
  );
}
