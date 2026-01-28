import { Metadata } from "next"
import { JsonLd } from '../../components/seo/json-ld'
import Base64Converter from '../../components/tools/base64-converter'

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: "Base64 編碼/解碼器 (UTF-8 支援) | 線上轉換工具",
  description: "免費、極速的 Base64 線上轉換工具。完美支援中文 (UTF-8) 編碼與解碼，無亂碼，開發者專用。",
  keywords: ["Base64編碼", "Base64解碼", "Base64 Encoder", "Base64 Decoder", "UTF-8 Base64"],
  alternates: {
    canonical: "/tools/base64-encoder",
  },
};

export default function Base64Page() {
  // --- 結構化資料 ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Base64 Encoder/Decoder",
    "applicationCategory": "DeveloperTool",
    "operatingSystem": "Any",
    "description": "線上 Base64 編碼與解碼工具，支援 UTF-8 中文字符。",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <JsonLd data={jsonLd} />

      {/* SEO Sandwich Top */}
      <section className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Base64 編碼/解碼
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          快速將文字轉換為 Base64 格式，或還原為原始文字。
          <br />
          <span className="text-blue-400">100% 支援中文與 Emoji</span>，解決常見的亂碼問題。
        </p>
      </section>

      {/* 核心工具 */}
      <section className="mb-20">
        <Base64Converter />
      </section>

      {/* SEO Sandwich Bottom */}
      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">為什麼 Base64 會有中文亂碼？</h2>
          <p>
            標準的 JavaScript `btoa()` 函數僅支援 ASCII 字符（0-255）。當你嘗試對中文（Unicode）進行編碼時，會出現
            `InvalidCharacterError` 錯誤。
          </p>
          <p>
            我們的工具使用了 UTF-8 轉義技術，先將中文字符轉換為百分號編碼（Percent-encoding），再進行 Base64 轉換，
            確保無論是「你好」還是「👋」都能正確編碼與還原。
          </p>

          <h3 className="text-xl font-bold text-foreground">Base64 的常見用途</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>API 傳輸：</strong> 在 JSON 中傳輸二進制數據（如圖片）。</li>
            <li><strong>Email 附件：</strong> MIME 協議使用 Base64 傳輸非文字檔案。</li>
            <li><strong>Basic Auth：</strong> HTTP 驗證標頭需要將 `username:password` 進行 Base64 編碼。</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
