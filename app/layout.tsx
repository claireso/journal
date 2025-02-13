import { type Metadata, type Viewport } from 'next'

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
  icons: {
    icon: '/icons/icon-192-2.png',
    apple: [{ url: '/icons/icon-192-2.png', sizes: '192x192', type: 'image/png' }]
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
  themeColor: '#297373',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang={process.env.WEBSITE_LANGUAGE}>
      <body>{children}</body>
    </html>
  )
}
