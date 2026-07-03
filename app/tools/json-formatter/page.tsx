import { Badge } from "@/components/ui/badge"
import { CheckCircle2, FileJson, Zap } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import JsonEditor from '../../components/tools/json-editor'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "json-formatter"
const TITLE = "JSON 格式化/校驗"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("語法高亮、錯誤檢測、壓縮與美化，VS Code 等級體驗")}&tag=Formatter`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "JSON 格式化與驗證工具 (Formatter & Validator)",
  description: "免費、安全的線上 JSON 格式化工具。支援語法高亮、錯誤檢測、JSON 壓縮 (Minify) 與美化 (Prettify)。VS Code 等級的編輯體驗。",
  keywords: ["JSON Formatter", "JSON Validator", "JSON Beautifier", "JSON Minifier", "線上JSON工具"],
  alternates: { canonical: "/tools/json-formatter" },
  openGraph: {
    title: "JSON 格式化 & 驗證器 | DevTools",
    description: "免費、安全的線上 JSON 格式化工具。支援語法高亮、錯誤檢測、JSON 壓縮與美化。VS Code 等級的編輯體驗。",
    images: [ogImage],
  },
  twitter: {
    title: "JSON 格式化 & 驗證器 | DevTools",
    description: "免費、安全的線上 JSON 格式化工具。支援語法高亮、錯誤檢測、JSON 壓縮與美化。VS Code 等級的編輯體驗。",
    images: [ogImage.url],
  },
};

export default function JsonPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON Formatter & Validator",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Code Formatter",
    "operatingSystem": "Any",
    "description": "專業級線上 JSON 編輯器，支援格式化、驗證與壓縮。",
    "featureList": "JSON 格式化, JSON 壓縮, 語法高亮, 錯誤檢測, Monaco Editor",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "JSON 最常見的語法錯誤是什麼？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "最常見的三種 JSON 語法錯誤：1. 尾隨逗號（Trailing Comma）- 陣列或物件最後一個元素後不能有逗號；2. 使用單引號 - JSON 標準規定必須使用雙引號；3. 包含註釋 - 標準 JSON 不支援 // 或 /* */ 格式的註釋。",
        },
      },
      {
        "@type": "Question",
        "name": "什麼是 JSON 壓縮（Minify）？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "JSON 壓縮（Minify）是移除 JSON 中所有不必要的空格、換行符和縮排，使其成為單行文字。這可以顯著減小檔案大小，適合用於生產環境的 API 傳輸以節省頻寬。",
        },
      },
      {
        "@type": "Question",
        "name": "JSON 和 XML 有什麼主要區別？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "JSON 相較於 XML 更輕量、易讀、易解析，已成為現代 Web API 的首選格式。XML 有更豐富的元資料表達能力（如屬性、命名空間），適合複雜的文件格式，但結構更繁瑣。",
        },
      },
    ],
  };

  return (
    <main className="container mx-auto px-4 py-10 max-w-[1600px]">
      <JsonLd data={appLd} />
      <JsonLd data={faqLd} />

      <section className="mb-8 text-center sm:text-left space-y-4">
        <Breadcrumb toolTitle={TITLE} toolSlug={SLUG} />
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                <FileJson className="w-8 h-8 text-blue-500" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                JSON 格式化/校驗工具
              </h1>
            </div>
            <p className="text-zinc-400 max-w-2xl text-lg">
              不僅是格式化。支援 <span className="text-zinc-200">語法高亮</span>、
              <span className="text-zinc-200">錯誤除錯</span> 與
              <span className="text-zinc-200">極速壓縮</span> 的專業編輯器。
            </p>
          </div>

          <div className="flex gap-2 hidden lg:flex">
            <Badge variant="outline" className="border-zinc-800 bg-zinc-900/50 text-zinc-400 py-1">
              <Zap className="w-3 h-3 mr-1 text-yellow-500" /> Client-Side Only
            </Badge>
            <Badge variant="outline" className="border-zinc-800 bg-zinc-900/50 text-zinc-400 py-1">
              <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" /> Valid JSON
            </Badge>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <JsonEditor />
      </section>

      <section className="border-t border-zinc-800 pt-8 mt-8">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full" />
              關於 JSON 格式
            </h3>
            <div className="text-sm text-zinc-500 space-y-3 leading-relaxed text-justify">
              <p>
                JSON (JavaScript Object Notation) 是一種輕量級的資料交換格式。它基於 JavaScript 的一個子集，但採用完全獨立於語言的文字格式。
              </p>
              <p>
                由於其簡潔和清晰的層次結構，JSON 已成為現代 Web API 傳輸數據的首選格式，取代了繁瑣的 XML。它易於人類閱讀和編寫，同時也易於機器解析和生成。
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full" />
              常見語法錯誤
            </h3>
            <ul className="text-sm text-zinc-500 space-y-2">
              <li className="flex gap-2">
                <span className="text-red-400 font-mono select-none">✕</span>
                <span>
                  <strong className="text-zinc-400">尾隨逗號：</strong>
                  物件或陣列的最後一個元素後不能有逗號 <code>,</code>。
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400 font-mono select-none">✕</span>
                <span>
                  <strong className="text-zinc-400">單引號：</strong>
                  JSON 標準規定 Key 和 String 必須使用雙引號 <code>&quot;</code>。
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400 font-mono select-none">✕</span>
                <span>
                  <strong className="text-zinc-400">註釋：</strong>
                  標準 JSON 不支援 <code>//</code> 或 <code>/* */</code> 註釋。
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <RelatedTools relatedSlugs={["jwt-decoder", "url-encoder"]} />
    </main>
  );
}
