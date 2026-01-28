import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileJson, Hash, Lock } from "lucide-react"
import Link from "next/link"

// 定義工具列表資料 (未來新增工具只需加在這裡)
const TOOLS = [
  {
    slug: "uuid-generator",
    title: "UUID 生成器",
    description: "批量生成 UUID v1/v4，支援大小寫轉換與移除連字號，極速響應。",
    icon: <Hash className="w-6 h-6 text-blue-500" />,
    status: "new", // new, hot, beta
    tags: ["Generator", "GUID"],
  },
  {
    slug: "json-formatter", // 尚未開發，先佔位
    title: "JSON 格式化/校驗",
    description: "美化 JSON 數據，語法高亮與錯誤檢測，支援壓縮模式。",
    icon: <FileJson className="w-6 h-6 text-green-500" />,
    status: "coming-soon",
    tags: ["Formatter", "Dev"],
  },
  {
    slug: "base64-encoder", // 尚未開發，先佔位
    title: "Base64 編碼/解碼",
    description: "快速將文字或圖片轉換為 Base64 格式，支援 UTF-8。",
    icon: <Lock className="w-6 h-6 text-orange-500" />,
    status: "coming-soon",
    tags: ["Encoder", "Security"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Hero Section: 標題與願景 */}
      <section className="py-20 px-4 text-center space-y-6 max-w-4xl mx-auto">
        <Badge variant="outline" className="px-4 py-1 rounded-full border-zinc-700 text-zinc-400 bg-zinc-900/50 backdrop-blur">
          v1.0.0 Alpha
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
          開發者工具箱
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          極速、純淨、無廣告。專為開發者打造的高性能 Web Tools。
          <br className="hidden md:block" />
          從生成 UUID 到處理 JSON，一站式解決。
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link href="/tools/uuid-generator">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-950 shadow hover:bg-zinc-200 h-10 px-8 py-2">
              開始使用 <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer">
             <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-zinc-800 bg-zinc-950 shadow-sm hover:bg-zinc-900 hover:text-zinc-50 h-10 px-8 py-2">
              GitHub
            </button>
          </a>
        </div>
      </section>

      {/* 2. Tool Grid: 工具矩陣 */}
      <section className="container mx-auto px-4 pb-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.status === "coming-soon" ? "#" : `/tools/${tool.slug}`}
              className={tool.status === "coming-soon" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
            >
              <Card className="h-full border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-300 hover:border-zinc-700 group relative overflow-hidden">
                {/* 裝飾性光暈 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      {tool.icon}
                    </div>
                    {tool.status === "new" && (
                      <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-none">NEW</Badge>
                    )}
                    {tool.status === "coming-soon" && (
                      <Badge variant="secondary" className="text-zinc-500">Soon</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl text-zinc-100 group-hover:text-white transition-colors">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-zinc-500 bg-zinc-950/50 px-2 py-1 rounded border border-zinc-800/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        <p>© 2026 廖柏安. Built for developers.</p>
      </footer>
    </div>
  );
}
