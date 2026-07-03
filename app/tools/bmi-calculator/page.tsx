import { Activity } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import BmiCalculator from '../../components/tools/bmi-calculator'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "bmi-calculator"
const TITLE = "BMI計算機（含兵役體位標準）"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("計算BMI並對照WHO分級與兵役體位BMI門檻")}&tag=Health`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "BMI計算機 | 免役標準BMI對照表（常備役/替代役/免役）",
  description: "免費線上 BMI 計算機，輸入身高體重即時算出身體質量指數，並對照 WHO 體位分級與役男體位區分標準的 BMI 門檻（常備役/替代役/免役）。",
  keywords: ["BMI計算機", "免役標準BMI", "役男體位", "常備役BMI", "替代役BMI", "BMI對照表"],
  alternates: { canonical: "/tools/bmi-calculator" },
  openGraph: {
    title: "BMI計算機（含兵役體位標準） | DevTools",
    description: "輸入身高體重即時算出 BMI，並對照 WHO 分級與兵役體位 BMI 門檻參考值。",
    images: [ogImage],
  },
  twitter: {
    title: "BMI計算機（含兵役體位標準） | DevTools",
    description: "輸入身高體重即時算出 BMI，並對照 WHO 分級與兵役體位 BMI 門檻參考值。",
    images: [ogImage.url],
  },
};

export default function BmiCalculatorPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BMI計算機",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "HealthApplication",
    "applicationSubCategory": "BMI Calculator",
    "operatingSystem": "Any",
    "description": "計算身體質量指數（BMI），並對照 WHO 分級與役男體位區分標準 BMI 門檻參考值。",
    "featureList": "BMI 計算, WHO 體位分級, 兵役體位 BMI 門檻參考",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "BMI 是怎麼計算的？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BMI（身體質量指數）＝體重（公斤）÷ 身高（公尺）的平方。例如身高 170 公分、體重 65 公斤，BMI = 65 ÷ 1.7² ≈ 22.5。",
        },
      },
      {
        "@type": "Question",
        "name": "免役標準的 BMI 門檻是多少？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "依現行「體位區分標準」（112 年 5 月 30 日修正生效），BMI 小於 15 或大於 35 者，體位可能判定為免役；BMI 介於 15-16.5 或 32-35 之間可能為替代役；16.5-32 之間則為常備役。國防部已於 2025 年底預告修正草案，未來免役 BMI 門檻可能調整為大於 45，正式規則請以役政司最新公告為準。",
        },
      },
      {
        "@type": "Question",
        "name": "這個工具算出的體位結果可以直接當作兵役體檢結果嗎？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "不行。本工具僅依 BMI 數值換算可能對應的體位分類，實際體位判定需綜合身高、血壓及其他體檢項目，且由體檢現場醫師實際鑑測認定，本工具結果僅供參考。",
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
            <Activity className="w-6 h-6 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            BMI計算機（含兵役體位標準）
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          輸入身高體重，即時算出 <span className="text-zinc-300">BMI</span> 並對照 WHO 分級與兵役體位 BMI 門檻參考值。
        </p>
      </section>

      <section className="mb-20">
        <BmiCalculator />
      </section>

      <RelatedTools relatedSlugs={["id-number-validator", "roc-year-converter"]} />
    </main>
  );
}
