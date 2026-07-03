import { CalendarClock } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import CronCalculator from '../../components/tools/cron-calculator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "cron-calculator"
const TITLE = "Cron 表達式計算器"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("驗證 Crontab 語法、翻譯成中文、計算下次執行時間")}&tag=DevOps`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "Cron 表達式產生器 | 計算下次執行時間 (Crontab)",
  description: "免費線上 Cron 表達式計算器。即時驗證 crontab 語法、翻譯成中文說明、計算下次執行時間，並提供常用排程範本，DevOps 與後端開發必備工具。",
  keywords: ["Cron表達式", "Crontab產生器", "Cron計算器", "排程工具", "Cron語法驗證", "DevOps工具"],
  alternates: { canonical: "/tools/cron-calculator" },
  openGraph: {
    title: "Cron 表達式計算器 | DevTools",
    description: "驗證 crontab 語法、翻譯成中文說明、計算下次執行時間，DevOps 必備工具。",
    images: [ogImage],
  },
  twitter: {
    title: "Cron 表達式計算器 | DevTools",
    description: "驗證 crontab 語法、翻譯成中文說明、計算下次執行時間，DevOps 必備工具。",
    images: [ogImage.url],
  },
};

export default function CronCalculatorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cron 表達式計算器",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Scheduler Tool",
    "operatingSystem": "Any",
    "description": "Cron 表達式驗證與計算工具，支援中文翻譯與下次執行時間預測。",
    "featureList": "Cron 語法驗證, 中文人類可讀翻譯, 下次執行時間計算, 常用排程範本, 視覺化欄位編輯器",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Cron 表達式的五個欄位分別代表什麼？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "標準 Cron 表達式由左至右依序為：分鐘 (0-59)、小時 (0-23)、日 (1-31)、月 (1-12)、星期 (0-6，0 為星期日)。例如 0 9 * * 1-5 代表「週一到週五的早上 9 點整」。",
        },
      },
      {
        "@type": "Question",
        "name": "如何確認 crontab 排程時間設定是否正確？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "將表達式貼到本工具的輸入框，即可即時驗證語法是否合法，並看到未來多次的實際執行時間預覽與中文說明，避免部署後才發現排程寫錯。",
        },
      },
      {
        "@type": "Question",
        "name": "支援含有秒欄位的 6 欄位 Cron 表達式嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "支援。輸入 6 個欄位時（例如 30 0 9 * * 1-5），第一欄會被視為秒。語法驗證、中文翻譯與下次執行時間計算皆正常運作，但視覺化欄位編輯器僅支援標準 5 欄位格式。",
        },
      },
      {
        "@type": "Question",
        "name": "* 、 , 、 - 、 / 這些符號在 Cron 中代表什麼意思？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "* 代表「每」（該欄位所有可能值）；, 用於列舉多個值，例如 1,15 代表每月 1 號與 15 號；- 用於表示範圍，例如 1-5 代表星期一到五；/ 用於表示間隔步進，例如 */15 代表每隔 15 個單位執行一次。",
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
            <CalendarClock className="w-6 h-6 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cron 表達式計算器
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          即時驗證 <span className="text-zinc-300">Crontab</span> 語法，翻譯成中文說明，
          <br />並精準計算 <span className="text-orange-400">下次執行時間</span>，排程設定不再靠猜。
        </p>
      </section>

      <section className="mb-20">
        <CronCalculator />
      </section>

      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">什麼是 Cron 表達式？</h2>
          <p>
            Cron 是 Unix / Linux 系統中用於排程重複性任務的工具，廣泛應用於 crontab、CI/CD Pipeline（如 GitHub Actions、GitLab CI）、
            Kubernetes CronJob 等場景。Cron 表達式則是用來定義「何時執行」的字串語法，由多個以空白分隔的欄位組成。
          </p>

          <h3 className="text-xl font-bold text-foreground">欄位格式</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-zinc-300 border-b border-zinc-800">
                <tr>
                  <th className="py-2 px-4">欄位</th>
                  <th className="py-2 px-4">允許值</th>
                  <th className="py-2 px-4">說明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-400">分鐘</td>
                  <td className="py-2 px-4">0-59</td>
                  <td className="py-2 px-4">每小時內的第幾分鐘</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-400">小時</td>
                  <td className="py-2 px-4">0-23</td>
                  <td className="py-2 px-4">24 小時制</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-400">日</td>
                  <td className="py-2 px-4">1-31</td>
                  <td className="py-2 px-4">每月的第幾天</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-400">月</td>
                  <td className="py-2 px-4">1-12</td>
                  <td className="py-2 px-4">1 月至 12 月</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-400">星期</td>
                  <td className="py-2 px-4">0-6</td>
                  <td className="py-2 px-4">0 為星期日，6 為星期六</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-foreground">常用範例</h3>
          <blockquote className="border-l-4 border-zinc-700 pl-4 italic text-zinc-400 space-y-1">
            <p><code className="not-italic text-orange-400">0 9 * * 1-5</code> — 週一到週五早上 9 點整</p>
            <p><code className="not-italic text-orange-400">*/15 * * * *</code> — 每 15 分鐘執行一次</p>
            <p><code className="not-italic text-orange-400">0 0 1 * *</code> — 每月 1 號凌晨 0 點</p>
          </blockquote>
        </article>
      </section>

      <RelatedTools relatedSlugs={["timestamp-converter", "timezone-converter"]} />
    </main>
  );
}
