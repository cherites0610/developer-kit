import { Receipt } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import InvoiceValidator from '../../components/tools/invoice-validator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "invoice-validator"
const TITLE = "統一發票號碼格式驗證"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("驗證統一發票號碼是否符合2碼字軌加8碼數字格式")}&tag=Taiwan`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "統一發票號碼格式驗證工具 | 字軌格式檢查",
  description: "免費線上統一發票號碼格式驗證工具，檢查是否符合「2碼英文字軌+8碼數字」的標準格式，適合表單驗證邏輯測試。",
  keywords: ["統一發票號碼驗證", "發票格式驗證", "電子發票字軌", "統一發票格式"],
  alternates: { canonical: "/tools/invoice-validator" },
  openGraph: {
    title: "統一發票號碼格式驗證工具 | DevTools",
    description: "檢查統一發票號碼是否符合 2 碼字軌 + 8 碼數字的標準格式。",
    images: [ogImage],
  },
  twitter: {
    title: "統一發票號碼格式驗證工具 | DevTools",
    description: "檢查統一發票號碼是否符合 2 碼字軌 + 8 碼數字的標準格式。",
    images: [ogImage.url],
  },
};

export default function InvoiceValidatorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "統一發票號碼格式驗證工具",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Taiwan Invoice Tools",
    "operatingSystem": "Any",
    "description": "檢查統一發票號碼是否符合標準格式（2 碼英文字軌 + 8 碼數字）。",
    "featureList": "發票號碼格式驗證",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "統一發票號碼的正確格式是什麼？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "標準統一發票號碼由 2 碼大寫英文字母（字軌）與 8 碼數字組成，例如 AB-12345678，每兩個月會更換一組新的字軌。",
        },
      },
      {
        "@type": "Question",
        "name": "這個工具可以幫我確認發票有沒有中獎嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不行。本工具只檢查號碼「格式」是否正確，統一發票號碼沒有公開的數學檢查碼可驗證真偽，對獎請至財政部電子發票整合服務平台或使用官方對獎 App 查詢。",
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
            <Receipt className="w-6 h-6 text-rose-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            統一發票號碼格式驗證
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          檢查發票號碼是否符合 <span className="text-zinc-300">2 碼字軌 + 8 碼數字</span> 標準格式。
        </p>
      </section>

      <section className="mb-20">
        <InvoiceValidator />
      </section>

      <RelatedTools relatedSlugs={["ubn-validator", "bank-code-lookup"]} />
    </main>
  );
}
