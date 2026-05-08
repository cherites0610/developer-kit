import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

const SITE_URL = 'https://kit.cherites.org'

interface BreadcrumbProps {
  toolTitle: string
  toolSlug: string
}

export function Breadcrumb({ toolTitle, toolSlug }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首頁', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: toolTitle, item: `${SITE_URL}/tools/${toolSlug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-zinc-500 mb-8">
        <Link href="/" className="flex items-center gap-1 hover:text-zinc-300 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>首頁</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-zinc-300 truncate">{toolTitle}</span>
      </nav>
    </>
  )
}
