import { notFound } from "next/navigation"
import { JsonLd } from '../../components/seo/json-ld'
import UuidGenerator from '../../components/tools/uuid-generator'

// --- 資料定義 (模擬 DB) ---
const TOOLS = {
  "uuid-generator": {
    name: "UUID Generator",
    title: "UUID 生成器 (v1/v4) | 在線批量產 UUID",
    description: "免費、極速的線上 UUID 生成器。支援 UUID v1 (時間戳) 與 v4 (隨機)，可批量生成、移除連字號、大小寫轉換。開發者必備的 GUID 工具。",
    keywords: ["UUID生成器", "GUID Generator", "UUID v4", "UUID v1", "線上工具"],
    component: <UuidGenerator />,
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. 動態生成 Metadata (給瀏覽器和爬蟲看)
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS[slug as keyof typeof TOOLS];

  if (!tool) return { title: "Tool Not Found" };

  return {
    title: tool.title, // 這裡會自動套用 layout 的 template
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: `${SITE_URL}/tools/${slug}`, // 避免重複內容問題
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `${SITE_URL}/tools/${slug}`,
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS[slug as keyof typeof TOOLS];

  if (!tool) {
    notFound();
  }

  // 2. 定義結構化資料 (給 Google 演算法看)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "description": tool.description,
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      {/* 注入 JSON-LD */}
      <JsonLd data={jsonLd} />

      {/* SEO Sandwich Top */}
      <section className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {tool.name}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {tool.description}
        </p>
      </section>

      {/* Tool Component */}
      <section className="mb-20">
        {tool.component}
      </section>

      {/* SEO Sandwich Bottom (Rich Content) - 這是 SEO 關鍵，增加頁面文字量 */}
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
    </main>
  );
}
