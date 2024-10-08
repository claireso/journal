import { type Metadata, type Viewport } from 'next'

import StitchesRegistry from './StitchesRegistry'

// main styles
import '@web/theme/styles.css'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.WEBSITE_META_TITLE ?? 'Journal'}`,
    default: process.env.WEBSITE_META_TITLE ?? 'Journal'
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true
    }
  }
}

export const viewport: Viewport = {
  themeColor: '#868585',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang={process.env.WEBSITE_LANGUAGE}>
      <body>
        <StitchesRegistry>{children}</StitchesRegistry>
      </body>
    </html>
  )
}
