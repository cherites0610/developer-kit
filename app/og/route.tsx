import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'DevTools'
  const desc = searchParams.get('desc') ?? '開發者工具箱'
  const tag = searchParams.get('tag') ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#09090b',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse at 15% 50%, rgba(63,63,70,0.5) 0%, transparent 55%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', color: '#52525b', fontSize: 18, letterSpacing: 1 }}>
            kit.cherites.org
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <span style={{ color: '#ffffff', fontSize: 26, fontWeight: 700 }}>DevTools</span>
            <span style={{ color: '#52525b', fontSize: 15 }}>開發者工具箱</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 0 }}>
          {tag ? (
            <div
              style={{
                display: 'flex',
                backgroundColor: '#27272a',
                border: '1px solid #3f3f46',
                borderRadius: 8,
                padding: '5px 16px',
                color: '#a1a1aa',
                fontSize: 17,
                marginBottom: 28,
                width: 'fit-content',
              }}
            >
              #{tag}
            </div>
          ) : null}

          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: 28,
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 26,
              color: '#71717a',
              lineHeight: 1.45,
              maxWidth: '860px',
            }}
          >
            {desc}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #3f3f46 0%, #52525b 50%, #3f3f46 100%)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
