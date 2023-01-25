import Layout from './Layout.client'
import StitchesRegistry from '../StitchesRegistry'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{`Admin - ${process.env.NEXT_PUBLIC_WEBSITE_META_TITLE}`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StitchesRegistry>
          <Layout>{children}</Layout>
        </StitchesRegistry>
      </body>
    </html>
  )
}
