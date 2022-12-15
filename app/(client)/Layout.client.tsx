'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { TranslationsProvider, getTranslations } from '@hooks/useTranslations'
import { MessagesProvider } from '@features/messages/useMessages'

import BannerOffline from '@features/banners/Offline'
import BannerNotifications from '@features/banners/Notifications'

import * as S from './Layout.client.styles'

interface PageLayoutProps {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

const PageLayout = ({ children }: PageLayoutProps) => {
  S.globalStyles()

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationsProvider translations={getTranslations(process.env.NEXT_PUBLIC_WEBSITE_LANGUAGE, 'client')}>
        <BannerOffline />
        <BannerNotifications />
        <MessagesProvider>
          <S.Main>{children}</S.Main>
        </MessagesProvider>
      </TranslationsProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default PageLayout
