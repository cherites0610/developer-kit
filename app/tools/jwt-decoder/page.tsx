import { KeyRound } from "lucide-react"
import { Metadata } from "next"
import { JsonLd } from '../../components/seo/json-ld'
import JwtDecoder from '../../components/tools/jwt-decoder'

export const metadata: Metadata = {
  title: "JWT 解碼器 (JSON Web Token Decoder) | Debugger",
  description: "免費線上 JWT 解碼工具。支援查看 Header, Payload 與 Signature。純客戶端解析，確保 Token 不會外洩，開發者除錯必備。",
  keywords: ["JWT Decoder", "JWT Debugger", "JSON Web Token", "Token解析", "JWT Viewer"],
  alternates: { canonical: "/tools/jwt-decoder" },
  openGraph: {
    title: "JWT 解碼器 | DevTools",
    description: "免費線上 JWT 解碼工具。支援查看 Header、Payload 與 Signature。純客戶端解析，Token 不會外洩。",
  },
  twitter: {
    title: "JWT 解碼器 | DevTools",
    description: "免費線上 JWT 解碼工具。支援查看 Header、Payload 與 Signature。純客戶端解析，Token 不會外洩。",
  },
};

export default function JwtPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JWT Decoder",
    "applicationCategory": "DeveloperTool",
    "operatingSystem": "Any",
    "description": "線上 JWT 解析與除錯工具。",
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
            <KeyRound className="w-6 h-6 text-purple-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            JWT 解碼器
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          解析 <span className="text-zinc-300">JSON Web Token</span> 的結構。
          <br />無需傳送 Secret，<span className="text-green-500 font-medium">100% Client-Side</span> 安全解析 Payload 內容。
        </p>
      </section>

      {/* Tool Section */}
      <section className="mb-20">
        <JwtDecoder />
      </section>

      {/* Rich Content / SEO */}
      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">什麼是 JWT？</h2>
          <p>
            JSON Web Token (JWT) 是一種開放標準 (RFC 7519)，用於在各方之間以 JSON 物件安全地傳輸資訊。
            該資訊可以被驗證和信任，因為它是經過數位簽章的。
          </p>

          <h3 className="text-xl font-bold text-foreground">JWT 的結構</h3>
          <p>JWT 由三部分組成，並以點 (<code>.</code>) 分隔：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-red-400">Header：</strong> 通常包含 Token 的類型 (JWT) 和使用的簽章演算法 (如 HMAC SHA256 或 RSA)。</li>
            <li><strong className="text-purple-400">Payload：</strong> 包含聲明 (Claims)。聲明是關於實體 (通常是使用者) 和其他資料的陳述。常見欄位有 <code>sub</code> (主體), <code>exp</code> (過期時間), <code>iat</code> (發布時間)。</li>
            <li><strong className="text-blue-400">Signature：</strong> 用於驗證訊息在傳遞過程中未被篡改。</li>
          </ul>

          <h3 className="text-xl font-bold text-foreground">常見欄位說明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
             <div className="border border-zinc-800 rounded p-3">
                <code className="text-zinc-200">exp</code> (Expiration Time)
                <p className="text-xs mt-1">過期時間戳。驗證時若當前時間超過此值，Token 視為無效。</p>
             </div>
             <div className="border border-zinc-800 rounded p-3">
                <code className="text-zinc-200">iat</code> (Issued At)
                <p className="text-xs mt-1">Token 發布的時間戳。</p>
             </div>
             <div className="border border-zinc-800 rounded p-3">
                <code className="text-zinc-200">sub</code> (Subject)
                <p className="text-xs mt-1">Token 的主題，通常是用戶 ID。</p>
             </div>
          </div>
        </article>
      </section>
    </main>
  );
}
