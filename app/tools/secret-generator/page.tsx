import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import SecretGenerator from '../../components/tools/secret-generator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "secret-generator"
const TITLE = "Secret 生成器"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("JWT Secret、API Key、密碼、AES 金鑰，Web Crypto API 安全生成")}&tag=Security`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "Secret 生成器 | JWT Secret、API Key、AES 金鑰",
  description: "安全、純瀏覽器端的密鑰生成工具。支援 JWT Secret (HS256/384/512)、API Key、隨機密碼、AES 加密金鑰，資料不離開您的裝置。",
  keywords: ["JWT Secret", "API Key Generator", "隨機密碼", "AES Key", "密鑰生成器", "Security"],
  alternates: { canonical: "/tools/secret-generator" },
  openGraph: {
    title: "Secret 生成器 | DevTools",
    description: "安全、純瀏覽器端的密鑰生成工具。支援 JWT Secret、API Key、隨機密碼、AES 金鑰，資料不離開您的裝置。",
    images: [ogImage],
  },
  twitter: {
    title: "Secret 生成器 | DevTools",
    description: "安全、純瀏覽器端的密鑰生成工具。支援 JWT Secret、API Key、隨機密碼、AES 金鑰，資料不離開您的裝置。",
    images: [ogImage.url],
  },
};

export default function SecretGeneratorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Secret Generator",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Security Tool",
    "operatingSystem": "Any",
    "description": "安全、純瀏覽器端的密鑰生成工具，支援 JWT Secret、API Key、隨機密碼與 AES 金鑰。",
    "featureList": "JWT Secret 生成, API Key 生成, 隨機密碼生成, AES 金鑰生成, Web Crypto API",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "為什麼不能用 Math.random() 生成密鑰？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Math.random() 是偽隨機數生成器（PRNG），其輸出是可預測的，不符合密碼學安全要求。本工具使用 Web Crypto API 的 crypto.getRandomValues()，這是瀏覽器提供的密碼學安全隨機數源（CSPRNG），生成的密鑰具有真正的隨機性。",
        },
      },
      {
        "@type": "Question",
        "name": "JWT Secret 應該選擇多少位元？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "建議選擇與演算法輸出長度相同或更長的密鑰：HS256 建議 256-bit（32 bytes），HS384 建議 384-bit（48 bytes），HS512 建議 512-bit（64 bytes）。密鑰越長，暴力破解難度越高。",
        },
      },
      {
        "@type": "Question",
        "name": "API Key 的前綴（Prefix）有什麼作用？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "前綴可以讓您一眼識別 API Key 的來源或用途。例如 sk_ 代表 Secret Key（如 Stripe 的設計），pk_ 代表 Public Key，app_ 代表某個應用程式。這在多個服務或環境中管理大量 API Key 時非常有用。",
        },
      },
    ],
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <JsonLd data={appLd} />
      <JsonLd data={faqLd} />
      <Breadcrumb toolTitle={TITLE} toolSlug={SLUG} />

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

      <RelatedTools relatedSlugs={["jwt-decoder", "jwt-encoder", "hash-generator"]} />
    </main>
  );
}
