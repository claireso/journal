// admin layout
/* eslint indent: 0 */

export default ({
  content = '',
  manifest = {},
  preloadedState = {},
  styles = '',
  bundles = []
} = {}) => `
  <!doctype html>
  <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title> Admin - Journal </title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400, 700" />

      ${styles}

      </head>
      <body>
      <div id="js-app">${content}</div>
      <script>
      (function(){
        window.preloadedState = ${preloadedState}
      })()
      </script>
      <script defer src="${manifest['vendors.js']}"></script>

      ${bundles
        .map(bundle => {
          return `<script defer src="${bundle.publicPath}"></script>`
        })
        .join('\n')}

      <script>
        if ('IntersectionObserver' in window === false) {
          var scriptElement = document.createElement('script')

          scriptElement.defer = true
          scriptElement.src = "${manifest['polyfills.js']}"
          document.head.appendChild(scriptElement)
        }
      </script>
      <script defer src="${manifest['admin.js']}"></script>
    </body>
  </html>
`
