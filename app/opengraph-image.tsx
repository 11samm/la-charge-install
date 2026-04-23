import { ImageResponse } from 'next/og'

import { siteConfig } from '@/lib/site'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 45%, #22c55e 100%)',
          padding: '64px',
          fontFamily: 'sans-serif',
          color: '#052e16',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRadius: '36px',
            background: 'rgba(255,255,255,0.88)',
            padding: '56px',
            boxShadow: '0 24px 80px rgba(5, 46, 22, 0.16)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              fontSize: '34px',
              fontWeight: 700,
            }}
          >
            <div
              style={{
                display: 'flex',
                height: '56px',
                width: '56px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '18px',
                background: '#22c55e',
                color: '#ffffff',
              }}
            >
              EV
            </div>
            <span>{siteConfig.name}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ fontSize: '66px', lineHeight: 1.05, fontWeight: 700, maxWidth: '820px' }}>
              EV charger SEO pages built for local intent and fast estimates
            </div>
            <div style={{ fontSize: '28px', lineHeight: 1.4, maxWidth: '860px', color: '#166534' }}>
              Hyper-local city pages, utility rebate guidance, and EV-triggered panel upgrade content across
              the San Fernando Valley.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '18px', fontSize: '24px', color: '#166534' }}>
            <span>{siteConfig.tagline}</span>
            <span>•</span>
            <span>{siteConfig.serviceArea}</span>
          </div>
        </div>
      </div>
    ),
    size
  )
}
