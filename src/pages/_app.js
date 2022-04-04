import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import PropTypes from 'prop-types'

import ErrorBoundary from '@components/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

const App = ({ Component, pageProps }) => {
  const Layout = Component.Layout || (({ children }) => children)

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

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object
}

export default App
