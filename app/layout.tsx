import { type Metadata, type Viewport } from 'next'

import StitchesRegistry from './StitchesRegistry'
import Layout from './Layout.client'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_WEBSITE_META_TITLE ?? 'Journal'}`,
    default: process.env.NEXT_PUBLIC_WEBSITE_META_TITLE ?? 'Journal'
  },
  robots: {
    index: false,
    follow: false
  }
}

export const viewport: Viewport = {
  themeColor: '#868585',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang={process.env.NEXT_PUBLIC_WEBSITE_LANGUAGE}>
      <body>
        <StitchesRegistry>
          <Layout>{children}</Layout>
        </StitchesRegistry>
      </body>
    </html>
  )
}
