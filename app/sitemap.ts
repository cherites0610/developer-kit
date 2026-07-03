import { MetadataRoute } from "next"
import { TOOLS_CONFIG } from './config/site'

// 這裡也要記得換成你的網域，或者從環境變數讀取
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kit.cherites.org"

export default function sitemap(): MetadataRoute.Sitemap {
  const liveTools = TOOLS_CONFIG.filter(tool => tool.status !== "coming-soon")

  // 首頁列出所有工具，因此其實際更新時間取自最新變動的工具，而非每次 build 的當下時間
  const homepageLastModified = liveTools
    .map(tool => new Date(tool.lastModified).getTime())
    .reduce((latest, time) => Math.max(latest, time), 0)

  // 1. 靜態頁面
  const routes = ["",].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(homepageLastModified).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }))

  // 2. 工具頁面 (從 TOOLS_CONFIG 動態生成，自動排除 coming-soon)
  const tools = liveTools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: new Date(tool.lastModified).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...routes, ...tools]
}
