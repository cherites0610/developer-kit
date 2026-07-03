import { ShieldCheck } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import HashGenerator from '../../components/tools/hash-generator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "hash-generator"
const TITLE = "Hash 雜湊生成器"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("MD5、SHA-1、SHA-256、SHA-512，純客戶端安全計算")}&tag=Security`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "Hash 雜湊生成器 (MD5, SHA256) | 線上加密工具",
  description: "免費、安全的線上 Hash 計算器。支援 MD5, SHA-1, SHA-256, SHA-512 等多種演算法。純客戶端運算，您的數據絕不會傳送到伺服器。",
  keywords: ["Hash Generator", "MD5生成", "SHA256計算", "線上雜湊", "SHA1", "CryptoJS"],
  alternates: { canonical: "/tools/hash-generator" },
  openGraph: {
    title: "Hash 雜湊生成器 (MD5, SHA256) | DevTools",
    description: "免費、安全的線上 Hash 計算器。支援 MD5, SHA-1, SHA-256, SHA-512。純客戶端運算，資料不離開您的裝置。",
    images: [ogImage],
  },
  twitter: {
    title: "Hash 雜湊生成器 (MD5, SHA256) | DevTools",
    description: "免費、安全的線上 Hash 計算器。支援 MD5, SHA-1, SHA-256, SHA-512。純客戶端運算，資料不離開您的裝置。",
    images: [ogImage.url],
  },
};

export default function HashPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hash Generator",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Security Tool",
    "operatingSystem": "Any",
    "description": "支援 MD5, SHA-256 等多種演算法的線上雜湊生成器。",
    "featureList": "MD5 雜湊, SHA-1 雜湊, SHA-256 雜湊, SHA-512 雜湊, 即時計算",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "MD5、SHA-1 和 SHA-256 有什麼區別？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MD5 輸出 128 bits，速度快但安全性低（易發生碰撞），適合檔案完整性校驗；SHA-1 輸出 160 bits，已不再推薦用於安全場景；SHA-256 輸出 256 bits，是目前的安全標準，廣泛用於 HTTPS、比特幣和密碼儲存。",
        },
      },
      {
        "@type": "Question",
        "name": "Hash（雜湊）是可以逆向還原的嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不可以。Hash 是單向函數，理論上無法從雜湊值還原原始輸入。但對於簡單的輸入（如常見密碼），攻擊者可使用彩虹表（Rainbow Table）進行查找攻擊，因此密碼儲存時應加鹽（Salt）後再雜湊。",
        },
      },
      {
        "@type": "Question",
        "name": "這個工具計算雜湊時資料安全嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "完全安全。本工具 100% 在瀏覽器端（Client-side Only）執行，您輸入的文字不會傳送到任何伺服器。所有雜湊計算都在您的裝置本地完成。",
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
            <ShieldCheck className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Hash 雜湊生成器
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          計算文字的數位指紋。支援 <span className="text-zinc-300">MD5, SHA-1, SHA-256</span> 等常用演算法。
          <br />
          <span className="text-green-500 font-medium">100% Client-Side</span>，確保您的隱私安全。
        </p>
      </section>

      <section className="mb-20">
        <HashGenerator />
      </section>

      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">什麼是 Hash (雜湊)？</h2>
          <p>
            雜湊函數 (Hash Function) 是一種單向的數學演算法，它可以將任意長度的輸入數據轉換為固定長度的輸出（通常是 16 進位字串）。
            這就像是為數據建立一個獨一無二的「指紋」。
          </p>

          <h3 className="text-xl font-bold text-foreground">常見演算法比較</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-zinc-300 border-b border-zinc-800">
                <tr>
                  <th className="py-2 px-4">演算法</th>
                  <th className="py-2 px-4">輸出長度 (Bit)</th>
                  <th className="py-2 px-4">安全性</th>
                  <th className="py-2 px-4">常見用途</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-400">MD5</td>
                  <td className="py-2 px-4">128 bits</td>
                  <td className="py-2 px-4 text-red-400">低 (易碰撞)</td>
                  <td className="py-2 px-4">檔案完整性校驗</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-400">SHA-1</td>
                  <td className="py-2 px-4">160 bits</td>
                  <td className="py-2 px-4 text-orange-400">中 (已棄用)</td>
                  <td className="py-2 px-4">舊版 Git 版本控制</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-mono text-blue-400">SHA-256</td>
                  <td className="py-2 px-4">256 bits</td>
                  <td className="py-2 px-4 text-green-400">高 (標準)</td>
                  <td className="py-2 px-4">HTTPS, 比特幣, 密碼儲存</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <RelatedTools relatedSlugs={["base64-encoder", "secret-generator"]} />
    </main>
  );
}
