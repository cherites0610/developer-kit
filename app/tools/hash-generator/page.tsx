import { ShieldCheck } from "lucide-react"
import { Metadata } from "next"
import { JsonLd } from '../../components/seo/json-ld'
import HashGenerator from '../../components/tools/hash-generator'

export const metadata: Metadata = {
  title: "Hash 雜湊生成器 (MD5, SHA256) | 線上加密工具",
  description: "免費、安全的線上 Hash 計算器。支援 MD5, SHA-1, SHA-256, SHA-512 等多種演算法。純客戶端運算，您的數據絕不會傳送到伺服器。",
  keywords: ["Hash Generator", "MD5生成", "SHA256計算", "線上雜湊", "SHA1", "CryptoJS"],
  alternates: {
    canonical: "/tools/hash-generator",
  },
};

export default function HashPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hash Generator",
    "applicationCategory": "SecurityTool",
    "operatingSystem": "Any",
    "description": "支援 MD5, SHA-256 等多種演算法的線上雜湊生成器。",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <JsonLd data={jsonLd} />

      {/* Top Section */}
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

      {/* Tool Section */}
      <section className="mb-20">
        <HashGenerator />
      </section>

      {/* Rich Content / SEO */}
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
    </main>
  );
}
