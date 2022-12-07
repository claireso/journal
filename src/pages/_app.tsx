import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ErrorBoundary from '@components/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

type NextPageWithLayout = NextPage & {
  Layout?: () => JSX.Element
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = Component.Layout || (({ children }: { children?: React.ReactNode }) => <>{children}</>)

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
