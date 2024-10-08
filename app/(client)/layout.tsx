import { type Metadata } from 'next'
import Script from 'next/script'

import Layout from './Layout.client'

import { TranslationsProvider } from '@web/hooks/useTranslations'
import { MessagesProvider } from '@web/features/messages/useMessages'

import BannerOffline from '@web/features/banners/Offline'
import BannerNotifications from '@web/features/banners/Notifications'

interface JournalLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  description: process.env.WEBSITE_META_DESCRIPTION ?? '',
  manifest: '/manifest.json',
  icons: {
    apple: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }]
  }
}

export default function JournalLayout({ children }: JournalLayoutProps) {
  return (
    <TranslationsProvider namespace="client" lang={process.env.WEBSITE_LANGUAGE}>
      <BannerOffline />
      <BannerNotifications />
      <MessagesProvider>
        <Layout>{children}</Layout>
      </MessagesProvider>
      <Script
        id="service-worker"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker
                  .register('/sw.js', {scope: '/'})
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `
        }}
      />
    </TranslationsProvider>
  )
}
