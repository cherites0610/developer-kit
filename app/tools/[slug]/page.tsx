import { notFound } from "next/navigation"
import UuidGenerator from '../../components/tools/uuid-generator'

// 這裏模擬資料庫或配置檔
const TOOLS = {
  "uuid-generator": {
    title: "UUID 生成器",
    description: "在線批量生成 UUID v1/v4，支援大小寫轉換與移除連字號。",
    component: <UuidGenerator />,
  },
  // 未來可以在這裡加入 json-formatter 等
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS[slug as keyof typeof TOOLS];

  if (!tool) return { title: "Tool Not Found" };

  return {
    title: `${tool.title} - DevTools`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS[slug as keyof typeof TOOLS];

  if (!tool) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      {/* SEO Sandwich: Top H1 */}
      <section className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
          {tool.title}
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          {tool.description}
        </p>
      </section>

      {/* 核心工具區 */}
      <section className="mb-20">
        {tool.component}
      </section>

      {/* SEO Sandwich: Bottom Content (之後填寫) */}
      <section className="prose prose-invert mx-auto border-t border-zinc-800 pt-10">
        <h2 className="text-zinc-200">什麼是 UUID?</h2>
        <p className="text-zinc-400">
          UUID (Universally Unique Identifier) 是一個 128 位元的數字...
          (此處將來會放置大量 SEO 關鍵字文章)
        </p>
      </section>
    </main>
  );
}
