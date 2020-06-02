import PropTypes from 'prop-types'

import ErrorBoundary from '@components/ErrorBoundary'

const App = ({ Component, pageProps }) => {
  const Layout = Component.Layout || (({ children }) => children)

  return (
    <Layout>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Layout>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object
}

export default App
