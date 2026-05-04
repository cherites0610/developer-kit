import { Metadata } from "next"
import { JsonLd } from '../../components/seo/json-ld'
import SecretGenerator from '../../components/tools/secret-generator'

export const metadata: Metadata = {
  title: "Secret 生成器 | JWT Secret、API Key、AES 金鑰",
  description: "安全、純瀏覽器端的密鑰生成工具。支援 JWT Secret (HS256/384/512)、API Key、隨機密碼、AES 加密金鑰，資料不離開您的裝置。",
  keywords: ["JWT Secret", "API Key Generator", "隨機密碼", "AES Key", "密鑰生成器", "Security"],
  alternates: { canonical: "/tools/secret-generator" },
  openGraph: {
    title: "Secret 生成器 | DevTools",
    description: "安全、純瀏覽器端的密鑰生成工具。支援 JWT Secret、API Key、隨機密碼、AES 金鑰，資料不離開您的裝置。",
  },
  twitter: {
    title: "Secret 生成器 | DevTools",
    description: "安全、純瀏覽器端的密鑰生成工具。支援 JWT Secret、API Key、隨機密碼、AES 金鑰，資料不離開您的裝置。",
  },
};

export default function SecretGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Secret Generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "安全、純瀏覽器端的密鑰生成工具，支援 JWT Secret、API Key、隨機密碼與 AES 金鑰。",
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <JsonLd data={jsonLd} />

      <section className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Secret 生成器
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          安全產生各種密鑰與金鑰，純瀏覽器端執行，資料不會離開您的裝置。
        </p>
      </section>

      <section className="mb-20">
        <SecretGenerator />
      </section>

      <section className="prose prose-invert mx-auto border-t border-border pt-10 max-w-4xl">
        <article className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground">為什麼要使用安全隨機生成器？</h2>
          <p>
            密鑰的安全性直接取決於其隨機性。本工具使用瀏覽器內建的 <code>crypto.getRandomValues()</code> API，
            這是符合密碼學安全要求的隨機數源，遠比 <code>Math.random()</code> 更安全。
          </p>
          <h3 className="text-xl font-bold text-foreground">各類型用途說明</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>JWT Secret：</strong>用於 HMAC 簽署演算法 (HS256/HS384/HS512)，建議至少使用與演算法輸出位元數相同長度的密鑰。</li>
            <li><strong>API Key：</strong>用於服務間身份驗證，可加入自訂前綴便於識別來源服務。</li>
            <li><strong>隨機密碼：</strong>符合大多數服務的密碼複雜度要求，支援完整字元集控制。</li>
            <li><strong>AES 金鑰：</strong>用於對稱加密，AES-128/192/256 分別需要 16/24/32 bytes 的金鑰。</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
