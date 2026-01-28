import { Key } from "lucide-react"
import { Metadata } from "next"
import { JsonLd } from '../../components/seo/json-ld'
import JwtEncoder from '../../components/tools/jwt-encoder'

export const metadata: Metadata = {
  title: "JWT 生成器 (Encoder) | 線上製作 JSON Web Token",
  description: "免費線上 JWT 生成工具。自訂 Header 與 Payload，使用 Secret 進行 HMAC SHA256 簽署。純前端運算，適合開發與測試 Token。",
  keywords: ["JWT Generator", "JWT Encoder", "JWT Signer", "產生JWT", "線上Token製作"],
  alternates: {
    canonical: "/tools/jwt-encoder",
  },
};

export default function JwtEncoderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JWT Generator",
    "applicationCategory": "DeveloperTool",
    "operatingSystem": "Any",
    "description": "線上 JWT 簽署與生成工具。",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <JsonLd data={jsonLd} />

      {/* Top Section */}
      <section className="mb-12 text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-zinc-900 rounded-full border border-zinc-800">
            <Key className="w-6 h-6 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            JWT 生成器 (Encoder)
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          輸入 JSON 資料與密鑰，快速簽署並生成合法的 <span className="text-zinc-300">JWT Token</span>。
          <br />支援 <span className="text-blue-400">HS256</span> 演算法。
        </p>
      </section>

      {/* Tool Section */}
      <section className="mb-20">
        <JwtEncoder />
      </section>

      {/* Rich Content / SEO */}
      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">如何使用 JWT 生成器？</h2>
          <p>
            此工具允許您模擬後端簽發 Token 的過程。這在測試 API 權限管理時非常有用。
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>修改 <strong>Payload</strong> 中的 <code>admin: true</code> 來測試管理員權限。</li>
            <li>修改 <code>exp</code> (Expiration) 欄位來製作一個已經過期的 Token，測試前端是否會自動登出。</li>
            <li>更改 <strong>Secret</strong> 來測試驗證簽章失敗的情況。</li>
          </ul>

          <h3 className="text-xl font-bold text-foreground">安全提示</h3>
          <p>
            雖然本工具是純客戶端運算 (Client-side Only)，但請<strong>不要</strong>在此輸入真實生產環境 (Production) 的 Secret Key。
            僅建議用於開發環境 (Local/Dev) 的測試數據。
          </p>
        </article>
      </section>
    </main>
  );
}
