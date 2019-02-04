// default layout
// prettier-ignore
/* eslint no-useless-escape: 0 */
/* eslint indent: 0 */

export default ({ content = '', config = {}, manifest = {}, styles = '', preloadedState = {} } = {}) => `
  <!doctype html>
  <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title> ${ config.meta.title} </title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="description" content="${ config.meta.description}" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#868585"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" />
      <link rel="manifest" href="${manifest['manifest.json']}" />

      ${ styles}

      ${(config.analytics && config.analytics.ga) ?
    `
          <script async src="https://www.googletagmanager.com/gtag/js?id=${ config.analytics.ga}"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${ config.analytics.ga}');
          </script>
        `
    :
    ''
  }
    </head>
    <body>
      <div id="js-journal">${content}</div>

      <script>
      (function(){
        window.preloadedState = ${preloadedState}
      })()
      </script>

      <script defer src="${manifest['vendors.js']}"></script>

      <script>
        if ('IntersectionObserver' in window === false) {
          var scriptElement = document.createElement('script')

          scriptElement.defer = true
          scriptElement.src = "${manifest['polyfills.js']}"
          document.head.appendChild(scriptElement)
        }
      </script>

      <script defer src="${manifest['journal.js']}"></script>
    </body>
  </html>
`
