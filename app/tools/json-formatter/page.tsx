import { Badge } from "@/components/ui/badge"
import { CheckCircle2, FileJson, Zap } from "lucide-react"
import { Metadata } from "next"
import { JsonLd } from '../../components/seo/json-ld'
import JsonEditor from '../../components/tools/json-editor'

export const metadata: Metadata = {
  title: "JSON 格式化與驗證工具 (Formatter & Validator) | DevTools",
  description: "免費、安全的線上 JSON 格式化工具。支援語法高亮、錯誤檢測、JSON 壓縮 (Minify) 與美化 (Prettify)。VS Code 等級的編輯體驗。",
  keywords: ["JSON Formatter", "JSON Validator", "JSON Beautifier", "JSON Minifier", "線上JSON工具"],
  alternates: {
    canonical: "/tools/json-formatter",
  },
};

export default function JsonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON Formatter & Validator",
    "applicationCategory": "DeveloperTool",
    "operatingSystem": "Any",
    "description": "專業級線上 JSON 編輯器，支援格式化、驗證與壓縮。",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <main className="container mx-auto px-4 py-10 max-w-[1600px]">
      <JsonLd data={jsonLd} />

      {/* === 上方：大標題與功能簡介 === */}
      <section className="mb-8 text-center sm:text-left space-y-4">
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

          {/* 右側小標籤 (Optional, 增加專業感) */}
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

      {/* === 中間：核心編輯器 === */}
      <section className="mb-12">
        <JsonEditor />
      </section>

      {/* === 下方：小字介紹 (SEO Rich Content) === */}
      <section className="border-t border-zinc-800 pt-8 mt-8">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* 左側：關於 JSON */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full"/>
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

          {/* 右側：常見錯誤與技巧 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full"/>
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
                  JSON 標準規定 Key 和 String 必須使用雙引號 <code>"</code>。
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
    </main>
  );
}
