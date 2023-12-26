'use client'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { MessagesProvider } from '@features/messages/useMessages'

import * as api from '@services/api'

import * as S from './Layout.client.styles'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = ({ children }: PageLayoutProps) => {
  S.globalStyles()
  const router = useRouter()

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false
          }
        },
        queryCache: new QueryCache({
          onError: async (error) => {
            if (error instanceof api.getErrorConstructor()) {
              if (error.response.status === 401) {
                router.push('/auth/login')
              }
            }
          }
        }),
        mutationCache: new MutationCache({
          onError: async (error) => {
            if (error instanceof api.getErrorConstructor()) {
              if (error.response.status === 401) {
                router.push('/auth/login')
              }
            }
          }
        })
      }),
    []
  )

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>{children}</MessagesProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default PageLayout
