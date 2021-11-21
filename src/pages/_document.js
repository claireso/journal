import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class JournalDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}

// import { Fragment } from 'react'
// import Document from 'next/document'
// import { ServerStyleSheet } from 'styled-components'

// export default class JournalDocument extends Document {
//   static async getInitialProps(ctx) {
//     console.log('pass here getInitialProps')
//     const sheet = new ServerStyleSheet()
//     const originalRenderPage = ctx.renderPage

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App) => (props) =>
//             sheet.collectStyles(<App {...props} />)
//         })

//       const initialProps = await Document.getInitialProps(ctx)

//       return {
//         ...initialProps,
//         styles: (
//           <Fragment>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </Fragment>
//         )
//       }
//     } finally {
//       sheet.seal()
//     }
//   }
// }
