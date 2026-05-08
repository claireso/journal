import { type Metadata, type Viewport } from 'next'
import Script from 'next/script'

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
  const isProduction = process.env.NODE_ENV === 'production'
  return (
    <html lang={process.env.WEBSITE_LANGUAGE}>
      <body>
        {process.env.BETTER_STACK_CLIENT_SOURCE_TOKEN && (
          <Script
            id="better-stack"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(b,e,t,r){
            b[t]=b[t]||function(...args){(b[t].q=b[t].q||[]).push(args)};
            b[t].l=+new Date;
            var s=e.createElement('script'); s.async=1; s.crossOrigin='anonymous';
            s.src='https://betterstack.net/b.js?t='+r;
            (e.head||e.getElementsByTagName('head')[0]).appendChild(s);
          }(window,document,'betterstack','${process.env.BETTER_STACK_CLIENT_SOURCE_TOKEN ?? ''}');
          betterstack('init', { environment: ${isProduction ? '"production"' : '"development"'} });`
            }}
          />
        )}
        {children}
      </body>
    </html>
  )
}
