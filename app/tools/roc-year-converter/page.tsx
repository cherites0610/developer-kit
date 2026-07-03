import { CalendarRange } from "lucide-react"
import { Metadata } from "next"
import { Breadcrumb } from '../../components/seo/breadcrumb'
import { JsonLd } from '../../components/seo/json-ld'
import { RelatedTools } from '../../components/tools/related-tools'
import RocYearConverter from '../../components/tools/roc-year-converter'

const SITE_URL = "https://kit.cherites.org"
const SLUG = "roc-year-converter"
const TITLE = "民國年/西元年互轉"
const ogImage = {
  url: `/og?title=${encodeURIComponent(TITLE)}&desc=${encodeURIComponent("民國年與西元年即時雙向互轉，支援完整年月日")}&tag=Taiwan`,
  width: 1200,
  height: 630,
  alt: `${TITLE} | DevTools`,
}

export const metadata: Metadata = {
  title: "民國年/西元年互轉計算機 | 台灣年曆換算工具",
  description: "免費線上民國年與西元年互轉工具，輸入其中一邊年月日即時換算另一邊，填寫政府表單、對照文件日期必備小工具。",
  keywords: ["民國年轉西元年", "西元年轉民國年", "民國年換算", "台灣年曆換算"],
  alternates: { canonical: "/tools/roc-year-converter" },
  openGraph: {
    title: "民國年/西元年互轉計算機 | DevTools",
    description: "輸入民國或西元年月日，即時雙向換算，填寫政府表單必備。",
    images: [ogImage],
  },
  twitter: {
    title: "民國年/西元年互轉計算機 | DevTools",
    description: "輸入民國或西元年月日，即時雙向換算，填寫政府表單必備。",
    images: [ogImage.url],
  },
};

export default function RocYearConverterPage() {
  const appLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "民國年/西元年互轉計算機",
    "url": `${SITE_URL}/tools/${SLUG}`,
    "applicationCategory": "DeveloperApplication",
    "applicationSubCategory": "Taiwan Date Tools",
    "operatingSystem": "Any",
    "description": "民國年與西元年雙向即時換算工具，支援完整年月日。",
    "featureList": "民國轉西元, 西元轉民國, 年月日同步換算",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "廖柏安", "url": "https://github.com/cherites0610" },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "民國年怎麼換算成西元年？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "西元年 = 民國年 + 1911。例如民國 113 年即為西元 2024 年，反之西元年減去 1911 即為民國年。",
        },
      },
      {
        "@type": "Question",
        "name": "為什麼民國元年是西元 1911 年而不是 1912 年？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "民國元年對應西元 1912 年，但換算公式使用 1911 作為偏移量是因為「民國 1 年 = 西元 1912 年」，即 1912 - 1 = 1911，所以公式寫成西元年 = 民國年 + 1911。",
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
            <CalendarRange className="w-6 h-6 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            民國年/西元年互轉
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          輸入任一邊的 <span className="text-zinc-300">年、月、日</span>，即時換算另一種曆法，
          <br />填寫政府表單、核對證件日期的好幫手。
        </p>
      </section>

      <section className="mb-20">
        <RocYearConverter />
      </section>

      <RelatedTools relatedSlugs={["timestamp-converter", "id-number-validator"]} />
    </main>
  );
}
