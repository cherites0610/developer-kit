import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TOOLS_CONFIG } from '@/app/config/site'
import Link from 'next/link'

interface RelatedToolsProps {
  relatedSlugs: string[]
}

export function RelatedTools({ relatedSlugs }: RelatedToolsProps) {
  const tools = relatedSlugs
    .map(slug => TOOLS_CONFIG.find(t => t.slug === slug))
    .filter(t => t !== undefined && t.status !== 'coming-soon')

  if (tools.length === 0) return null

  return (
    <section className="mt-16 border-t border-zinc-800 pt-10 max-w-4xl mx-auto">
      <h2 className="text-base font-semibold text-zinc-300 mb-4">相關工具</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map(tool => {
          const Icon = tool!.icon
          return (
            <Link key={tool!.slug} href={`/tools/${tool!.slug}`}>
              <Card className="border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-200 hover:border-zinc-700 group">
                <CardHeader className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-zinc-950 rounded-lg border border-zinc-800 group-hover:border-zinc-700 transition-colors shrink-0">
                      <Icon className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-sm text-zinc-100 group-hover:text-white transition-colors">
                        {tool!.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-zinc-500 mt-0.5 truncate">
                        {tool!.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
