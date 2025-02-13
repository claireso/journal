import { type Metadata } from 'next'
import Script from 'next/script'

import * as cls from './styles.css'

import { TranslationsProvider } from '@web/hooks/useTranslations'
import { MessagesProvider } from '@web/features/messages/useMessages'

import BannerOffline from '@web/features/banners/Offline'
import BannerNotifications from '@web/features/banners/Notifications'

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
        <main className={cls.main}>{children}</main>
      </MessagesProvider>
      <Script
        id="service-worker"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker
                  .register('/sw.js', {scope: '/', updateViaCache: 'none'})
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
