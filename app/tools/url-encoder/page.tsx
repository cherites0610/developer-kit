import { Link as LinkIcon } from "lucide-react"
import { Metadata } from "next"
import { JsonLd } from '../../components/seo/json-ld'
import UrlEncoder from '../../components/tools/url-encoder'

export const metadata: Metadata = {
  title: "URL 編碼/解碼器 | Percent-encoding 線上工具",
  description: "免費線上 URL 編碼 (Encode) 與解碼 (Decode) 工具。支援 encodeURIComponent 與 encodeURI 兩種模式，完美處理中文參數與特殊符號。",
  keywords: ["URL Encode", "URL Decode", "網址編碼", "網址解碼", "URI Component", "Percent-encoding"],
  alternates: { canonical: "/tools/url-encoder" },
  openGraph: {
    title: "URL 編碼/解碼器 | DevTools",
    description: "免費線上 URL 編碼與解碼工具。支援 encodeURIComponent 與 encodeURI 兩種模式，完美處理中文與特殊符號。",
  },
  twitter: {
    title: "URL 編碼/解碼器 | DevTools",
    description: "免費線上 URL 編碼與解碼工具。支援 encodeURIComponent 與 encodeURI 兩種模式，完美處理中文與特殊符號。",
  },
};

export default function UrlEncoderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "URL Encoder & Decoder",
    "applicationCategory": "DeveloperTool",
    "operatingSystem": "Any",
    "description": "線上 URL 特殊字符編碼與還原工具。",
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
            <LinkIcon className="w-6 h-6 text-indigo-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            URL 編碼/解碼
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          將網址中的特殊字符轉換為 <span className="text-zinc-300">百分號編碼 (Percent-encoding)</span>，
          <br />確保 API 參數傳輸安全無誤。
        </p>
      </section>

      {/* Tool Section */}
      <section className="mb-20">
        <UrlEncoder />
      </section>

      {/* Rich Content / SEO */}
      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">編碼模式的區別</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-zinc-200">encodeURIComponent (推薦)</h3>
              <p className="text-sm">
                <strong>用途：</strong> 對 URL 參數的值 (Value) 進行編碼。
              </p>
              <p className="text-sm">
                它會轉義 <code>:</code>, <code>/</code>, <code>?</code>, <code>&</code> 等字符。如果你要將一個 URL 作為參數傳遞給另一個 URL，必須使用此模式。
              </p>
              <div className="bg-zinc-900 p-2 rounded text-xs font-mono border border-zinc-800">
                Input: https://google.com<br/>
                Output: https%3A%2F%2Fgoogle.com
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-zinc-200">encodeURI</h3>
              <p className="text-sm">
                <strong>用途：</strong> 對整個 URL 進行編碼，以確保它符合 URI 語法規範。
              </p>
              <p className="text-sm">
                它 <strong>不會</strong> 轉義 <code>:</code>, <code>/</code>, <code>?</code>, <code>&</code>。適用於處理含有中文路徑的完整網址。
              </p>
              <div className="bg-zinc-900 p-2 rounded text-xs font-mono border border-zinc-800">
                Input: https://site.com/測試<br/>
                Output: https://site.com/%E6%B8%AC%E8%A9%A6
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
