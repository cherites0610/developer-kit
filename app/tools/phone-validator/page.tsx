import { Phone } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import PhoneValidator from '../../components/tools/phone-validator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "phone-validator"
const TITLE = "手機/市話格式驗證"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("驗證台灣手機門號與市話區碼格式是否正確")}&tag=Taiwan`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "手機門號/市話格式驗證工具 | 台灣電話號碼格式檢查",
  description: "免費線上台灣手機門號與市話格式驗證工具，自動判斷 09 開頭手機號碼與各地區碼市話格式是否正確，適合表單驗證邏輯測試。",
  keywords: ["手機號碼驗證", "市話格式驗證", "台灣電話格式", "區碼查詢", "手機門號格式"],
  alternates: { canonical: "/tools/phone-validator" },
  openGraph: {
    title: "手機/市話格式驗證工具 | DevTools",
    description: "自動判斷台灣手機門號與各地區碼市話格式是否正確。",
    images: [ogImage],
  },
  twitter: {
    title: "手機/市話格式驗證工具 | DevTools",
    description: "自動判斷台灣手機門號與各地區碼市話格式是否正確。",
    images: [ogImage.url],
  },
};

export default function PhoneValidatorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "手機/市話格式驗證工具",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Taiwan Phone Tools",
    "operatingSystem": "Any",
    "description": "驗證台灣手機門號與市話號碼格式是否符合電信編碼規則。",
    "featureList": "手機門號格式驗證, 市話區碼判斷, 各地區碼長度檢查",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "台灣手機門號的格式規則是什麼？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "台灣行動電話號碼固定為 09 開頭，加上 8 碼數字，共 10 碼，例如 0912345678。",
        },
      },
      {
        "@type": "Question",
        "name": "這個工具能查到號碼是哪家電信商或是否真實存在嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不行。本工具只做格式規則檢查（開頭碼、位數、區碼是否存在），無法查詢號碼是否已被申辦、所屬電信業者或即時狀態，這類資訊需透過電信業者或號碼可攜服務查詢。",
        },
      },
      {
        "@type": "Question",
        "name": "市話區碼後面的號碼位數為什麼不固定？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "台灣市話依區碼長度不同，本地號碼位數也不同：2 碼區碼（如 02、07）通常搭配 7-8 碼號碼，3 碼區碼（如 037、089）通常搭配 6-7 碼號碼，離島地區（如金門、馬祖）則位數更短。",
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
            <Phone className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            手機/市話格式驗證
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          自動判斷輸入的是 <span className="text-zinc-300">手機門號</span> 還是 <span className="text-zinc-300">市話</span>，
          <br />並檢查區碼與位數是否符合台灣電信編碼規則。
        </p>
      </section>

      <section className="mb-20">
        <PhoneValidator />
      </section>

      <RelatedTools relatedSlugs={["bank-code-lookup", "id-number-validator"]} />
    </main>
  );
}
