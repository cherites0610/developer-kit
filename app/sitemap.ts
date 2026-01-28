import { MetadataRoute } from "next"
import { TOOLS_CONFIG } from './config/site'

// 這裡也要記得換成你的網域，或者從環境變數讀取
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kit.cherites.org"

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. 靜態頁面
  const routes = ["",].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 1,
  }))

  // 2. 工具頁面 (目前只有 uuid-generator)
  // 未來這裡可以讀取資料庫或常數陣列來動態生成
  const tools = TOOLS_CONFIG
    .filter(tool => tool.status !== "coming-soon")
    .map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

  return [...routes, ...tools]
}
