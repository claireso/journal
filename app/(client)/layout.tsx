import Layout from './Layout.client'
import StitchesRegistry from '../StitchesRegistry'

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang={process.env.NEXT_PUBLIC_WEBSITE_LANGUAGE}>
      <head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_META_TITLE}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_WEBSITE_META_DESCRIPTION} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#868585" />
        {process.env.NEXT_PUBLIC_WEBSITE_META_ROBOTS && (
          <meta name="robots" content={process.env.NEXT_PUBLIC_WEBSITE_META_ROBOTS} />
        )}
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />

        {process.env.NEXT_PUBLIC_WEBSITE_ANALYTICS_GA && (
          <>
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
          </>
        )}
      </head>
      <body>
        <StitchesRegistry>
          <Layout>{children}</Layout>
        </StitchesRegistry>

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
      </body>
    </html>
  )
}
