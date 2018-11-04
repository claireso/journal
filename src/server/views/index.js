// default layout
// prettier-ignore
/* eslint no-useless-escape: 0 */
/* eslint indent: 0 */

export default ({content = '', config = {},  manifest = {}, styles = ''} = {}) => `
  <!doctype html>
  <html lang="fr">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title> ${ config.meta.title } </title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="description" content="${ config.meta.description }" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#868585"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" />
      <link rel="manifest" href="${manifest['manifest.json']}" />

      ${ styles }

      ${(config.analytics && config.analytics.ga) ?
        `
          <script async src="https://www.googletagmanager.com/gtag/js?id=${ config.analytics.ga }"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${ config.analytics.ga }');
          </script>
        `
        :
        ''
      }
    </head>
    <body>
      ${ (config.notification.publicKey && config.notification.privateKey) ?
        `
        <div role="button" id="js-notification" class="notification is-hidden">
          <div class="notification__inner">
            <p>${ config.notification.enableDefaultText }</p>
          </div>
          <button id="js-notification-close" class="notification__button-close" aria-label="close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 22 28"
            >
              <path d="M20.281 20.656c0 0.391-0.156 0.781-0.438 1.062l-2.125 2.125c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-4.594-4.594-4.594 4.594c-0.281 0.281-0.672 0.438-1.062 0.438s-0.781-0.156-1.062-0.438l-2.125-2.125c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l4.594-4.594-4.594-4.594c-0.281-0.281-0.438-0.672-0.438-1.062s0.156-0.781 0.438-1.062l2.125-2.125c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l4.594 4.594 4.594-4.594c0.281-0.281 0.672-0.438 1.062-0.438s0.781 0.156 1.062 0.438l2.125 2.125c0.281 0.281 0.438 0.672 0.438 1.062s-0.156 0.781-0.438 1.062l-4.594 4.594 4.594 4.594c0.281 0.281 0.438 0.672 0.438 1.062z" />
            </svg>
          </button>
        </div>
        `
        : ''
      }

      <div id="js-journal">${content}</div>

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

      ${ (config.notification.publicKey && config.notification.privateKey) ?
      `
        <script defer src="${manifest['banner.js']}"></script>
      `
    : ''
}
    </body>
  </html>
`
