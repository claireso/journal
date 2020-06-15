import { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Head from 'next/head'

import * as S from './Layout.styles'

import { TranslationsProvider } from '@services/translations/hooks/useTranslations'
import { getTranslations } from '@services/translations'

import Loader from '@components/Loader'

import BannerOffline from './components/banners/Offline'
import BannerNotifications from './components/banners/Notifications'

const Layout = ({ children }) => {
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
        <title>{process.env.NEXT_PUBLIC_WEBSITE_META_TITLE}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_WEBSITE_META_DESCRIPTION}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#868585" />
        {process.env.NEXT_PUBLIC_WEBSITE_META_ROBOTS && (
          <meta
            name="robots"
            content={process.env.NEXT_PUBLIC_WEBSITE_META_ROBOTS}
          />
        )}
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/icon-192.png"
        />
        <link rel="manifest" href="/manifest.json" />

        {process.env.NEXT_PUBLIC_WEBSITE_ANALYTICS_GA && (
          <Fragment>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_WEBSITE_ANALYTICS_GA}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_WEBSITE_ANALYTICS_GA}');
                `
              }}
            />
          </Fragment>
        )}
      </Head>

      <TranslationsProvider
        translations={getTranslations(
          process.env.NEXT_PUBLIC_WEBSITE_LANGUAGE,
          'client'
        )}
      >
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
