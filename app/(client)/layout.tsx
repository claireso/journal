import { type Metadata } from 'next'
import Script from 'next/script'
import { Suspense } from 'react'

import { Loader } from '@web/components/Loader'
import BannerNotifications from '@web/features/banners/Notifications'
import BannerOffline from '@web/features/banners/Offline'
import { MessagesProvider } from '@web/features/messages/useMessages'
import { TranslationsProvider } from '@web/hooks/useTranslations'
import * as cls from './styles.css'

interface JournalLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  description: process.env.WEBSITE_META_DESCRIPTION ?? '',
  manifest: '/manifest.json'
}

export default function JournalLayout({ children }: JournalLayoutProps) {
  return (
    <TranslationsProvider namespace="client" lang={process.env.WEBSITE_LANGUAGE}>
      <BannerOffline />
      <BannerNotifications />
      <MessagesProvider>
        <main className={cls.main}>
          <Suspense
            fallback={
              <div className={cls.loaderWrapper}>
                <Loader />
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
      </MessagesProvider>
      <Script
        id="service-worker"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker
                .register('/sw.js', {scope: '/', updateViaCache: 'none'})
                .then(function(registration) {
                  console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                  console.log('SW registration failed: ', registrationError);
                });
            }
          `
        }}
      />
    </TranslationsProvider>
  )
}
