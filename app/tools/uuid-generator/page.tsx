import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import UuidGenerator from '../../components/tools/uuid-generator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "uuid-generator"
const TITLE = "UUID 生成器"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("批量生成 UUID v1/v4，支援大小寫轉換與移除連字號")}&tag=Generator`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "UUID 生成器 (v1/v4) | 在線批量產 UUID",
  description: "免費、極速的線上 UUID 生成器。支援 UUID v1 (時間戳) 與 v4 (隨機)，可批量生成、移除連字號、大小寫轉換。開發者必備的 GUID 工具。",
  keywords: ["UUID生成器", "GUID Generator", "UUID v4", "UUID v1", "線上工具"],
  alternates: { canonical: "/tools/uuid-generator" },
  openGraph: {
    title: "UUID 生成器 (v1/v4) | DevTools",
    description: "免費、極速的線上 UUID 生成器。支援 UUID v1 與 v4，可批量生成、移除連字號、大小寫轉換。",
    images: [ogImage],
  },
  twitter: {
    title: "UUID 生成器 (v1/v4) | DevTools",
    description: "免費、極速的線上 UUID 生成器。支援 UUID v1 與 v4，可批量生成、移除連字號、大小寫轉換。",
    images: [ogImage.url],
  },
};

export default function UuidPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "UUID Generator",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Developer Utility",
    "operatingSystem": "Any",
    "description": "免費、極速的線上 UUID 生成器，支援 v1 與 v4 版本。",
    "featureList": "UUID v1 生成, UUID v4 生成, 批量生成, 移除連字號, 大小寫轉換",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "UUID v4 和 v1 有什麼區別？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "UUID v4 完全隨機生成，重複機率微乎其微，是目前最常用的格式。UUID v1 基於當前時間與網卡 MAC 地址生成，具有時序性但可能暴露生成者的 MAC 地址。",
        },
      },
      {
        "@type": "Question",
        "name": "UUID 是加密的嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不是。UUID 是唯一標識符，用於識別資源，不具備加密功能。它的唯一性依賴於隨機性，而非加密算法。",
        },
      },
      {
        "@type": "Question",
        "name": "這個工具的資料安全嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "完全安全。本工具在瀏覽器端（Client-side）執行，所有 UUID 都在您的裝置本地生成，不會傳送任何資料到伺服器。",
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
          UUID 生成器
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          在線批量生成 UUID v1/v4，支援大小寫轉換與移除連字號，極速響應。
        </p>
      </section>

      <section className="mb-20">
        <UuidGenerator />
      </section>

      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">什麼是 UUID？</h2>
          <p>
            UUID (Universally Unique Identifier) 是一個 128 位元的數字，用於在電腦系統中唯一標識資訊。
            最常見的版本是 v4（基於隨機數）和 v1（基於時間戳）。
          </p>

          <h3 className="text-xl font-bold text-foreground">UUID v4 vs v1 的區別</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>UUID v4 (Random):</strong> 完全隨機生成，重複機率微乎其微，是目前最常用的格式。</li>
            <li><strong>UUID v1 (Time-based):</strong> 基於當前時間與網卡 MAC 地址生成。優點是具有時序性，缺點是可能會暴露生成者的 MAC 地址。</li>
          </ul>

          <h3 className="text-xl font-bold text-foreground">為什麼使用我們的生成器？</h3>
          <p>
            我們的工具完全在瀏覽器端 (Client-side) 執行，您的資料不會傳送到伺服器，確保 100% 的隱私與速度。
            支援批量生成與多種格式輸出，是開發者的最佳助手。
          </p>
        </article>
      </section>

      <RelatedTools relatedSlugs={["hash-generator", "secret-generator"]} />
    </main>
  );
}
