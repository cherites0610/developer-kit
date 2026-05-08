import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import Base64Converter from '../../components/tools/base64-converter'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "base64-encoder"
const TITLE = "Base64 編碼/解碼"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("支援 UTF-8 中文，極速處理文字編解碼")}&tag=Encoder`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "Base64 編碼/解碼器 (UTF-8 支援) | 線上轉換工具",
  description: "免費、極速的 Base64 線上轉換工具。完美支援中文 (UTF-8) 編碼與解碼，無亂碼，開發者專用。",
  keywords: ["Base64編碼", "Base64解碼", "Base64 Encoder", "Base64 Decoder", "UTF-8 Base64"],
  alternates: { canonical: "/tools/base64-encoder" },
  openGraph: {
    title: "Base64 編碼/解碼器 | DevTools",
    description: "免費、極速的 Base64 線上轉換工具。完美支援中文 (UTF-8) 編碼與解碼，無亂碼，開發者專用。",
    images: [ogImage],
  },
  twitter: {
    title: "Base64 編碼/解碼器 | DevTools",
    description: "免費、極速的 Base64 線上轉換工具。完美支援中文 (UTF-8) 編碼與解碼，無亂碼，開發者專用。",
    images: [ogImage.url],
  },
};

export default function Base64Page() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Base64 Encoder/Decoder",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Encoder/Decoder",
    "operatingSystem": "Any",
    "description": "線上 Base64 編碼與解碼工具，支援 UTF-8 中文字符。",
    "featureList": "Base64 編碼, Base64 解碼, UTF-8 中文支援, Emoji 支援",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "為什麼 Base64 編碼中文會亂碼？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "標準的 btoa() 函數僅支援 ASCII 字符，對中文字符（Unicode）會產生錯誤。本工具採用 UTF-8 轉義技術，先將中文轉為百分號編碼再進行 Base64 轉換，確保正確編解碼。",
        },
      },
      {
        "@type": "Question",
        "name": "Base64 是一種加密方式嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不是。Base64 是編碼（Encoding），不是加密（Encryption）。編碼後的內容可以輕易被還原，不具備任何安全性。它的主要目的是將二進制資料轉換為可安全傳輸的 ASCII 文字格式。",
        },
      },
      {
        "@type": "Question",
        "name": "Base64 有哪些常見的使用場景？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "主要用途包括：在 JSON 中傳輸二進制數據（如圖片），MIME 協議的 Email 附件傳輸，以及 HTTP Basic Authentication 中將用戶名密碼編碼為標頭格式。",
        },
      },
    ],
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <JsonLd data={appLd} />
      <JsonLd data={faqLd} />
      <Breadcrumb toolTitle={TITLE} toolSlug={SLUG} />

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

      <section className="mb-20">
        <Base64Converter />
      </section>

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

      <RelatedTools relatedSlugs={["url-encoder", "hash-generator"]} />
    </main>
  );
}
