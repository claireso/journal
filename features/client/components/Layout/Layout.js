import { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Head from 'next/head'

import * as S from './Layout.styles'

import { TranslationsProvider } from '@utils/hooks/useTranslations'

import Loader from '@components/Loader'

import BannerOffline from './components/banners/Offline'
import BannerNotifications from './components/banners/Notifications'

const config = process.env.website

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
    <Fragment>
      <S.GlobalStyles />

      <Head>
        <title>{config?.meta?.title}</title>
        <meta name="description" content={config?.meta?.description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#868585" />
        {config?.meta?.robots && (
          <meta name="robots" content={config.meta.robots} />
        )}
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/icon-192.png"
        />
        <link rel="manifest" href="/manifest.json" />

        {config?.analytics?.ga && (
          <Fragment>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.ga}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.analytics.ga}');
                `
              }}
            />
          </Fragment>
        )}
      </Head>

      <TranslationsProvider translations={translations}>
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
      </TranslationsProvider>

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
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.element
}

export default Layout
