import { Landmark } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import BankCodeLookup from '../../components/tools/bank-code-lookup'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "bank-code-lookup"
const TITLE = "銀行代碼/金融機構查詢"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("快速查詢台灣各銀行金融機構代碼")}&tag=Taiwan`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "銀行代碼查詢工具 | 台灣金融機構代碼對照表",
  description: "免費線上銀行代碼查詢工具，輸入銀行名稱或 3 碼金融機構代碼即可快速對照，涵蓋台灣銀行、玉山、國泰世華、中國信託等常見銀行。",
  keywords: ["銀行代碼查詢", "金融機構代碼", "銀行代號對照表", "跨行轉帳銀行代碼"],
  alternates: { canonical: "/tools/bank-code-lookup" },
  openGraph: {
    title: "銀行代碼查詢工具 | DevTools",
    description: "輸入銀行名稱或代碼，快速查詢台灣金融機構代號對照表。",
    images: [ogImage],
  },
  twitter: {
    title: "銀行代碼查詢工具 | DevTools",
    description: "輸入銀行名稱或代碼，快速查詢台灣金融機構代號對照表。",
    images: [ogImage.url],
  },
};

export default function BankCodeLookupPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "銀行代碼查詢工具",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Taiwan Finance Tools",
    "operatingSystem": "Any",
    "description": "查詢台灣常見銀行與金融機構的 3 碼代碼對照表。",
    "featureList": "銀行代碼查詢, 依名稱或代碼搜尋",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "銀行代碼是幾碼？在哪裡會用到？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "台灣金融機構代碼固定為 3 碼數字，常用於跨行轉帳、ATM 操作、線上金流串接與電商後台設定收款帳戶時填寫。",
        },
      },
      {
        "@type": "Question",
        "name": "這份代碼對照表資料準確嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "本工具收錄的是市面上常見、長期穩定的金融機構代碼，僅供快速查詢參考。實際轉帳前建議以各銀行官網或財金資訊公司最新公告為準，避免代碼異動造成轉帳錯誤。",
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
            <Landmark className="w-6 h-6 text-cyan-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            銀行代碼/金融機構查詢
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          輸入銀行名稱或代碼，快速查詢 <span className="text-zinc-300">3 碼金融機構代號</span>。
        </p>
      </section>

      <section className="mb-20">
        <BankCodeLookup />
      </section>

      <RelatedTools relatedSlugs={["invoice-validator", "phone-validator"]} />
    </main>
  );
}
