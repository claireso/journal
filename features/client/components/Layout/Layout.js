import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import * as S from './Layout.styles'

import { TranslationsProvider } from '@utils/hooks/useTranslations'

import Loader from '@components/Loader'

import BannerOffline from './components/banners/Offline'
import BannerNotifications from './components/banners/Notifications'

const Layout = ({ children }) => {
  const translations = process.env.website?.translations?.client
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleRouteChangeStart = () => setIsLoading(true)
    const handleRouteChangeComplete = () => setIsLoading(false)

    Router.events.on('routeChangeStart', handleRouteChangeStart)
    Router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [])

  return (
    <TranslationsProvider translations={translations}>
      <S.GlobalStyles />
      <BannerOffline />
      <BannerNotifications />
      <S.Main>
        {isLoading ? (
          <S.LoaderWrapper>
            <Loader />
          </S.LoaderWrapper>
        ) : (
          children
        )}
      </S.Main>

      <script
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

Layout.propTypes = {
  children: PropTypes.element
}

export default Layout
