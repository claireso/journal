// default layout
// prettier-ignore
/* eslint no-useless-escape: 0 */
/* eslint indent: 0 */

export default ({content = '', config = {},  manifest = {}, styles = ''} = {}) => `
  <!doctype html>
  <html lang="fr">
    <head>
      <meta charset="utf-8" />
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
        <script>
          const urlBase64ToUint8Array = (base64String) => {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
              .replace(/\-/g, '+')
              .replace(/_/g, '/');

            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
              outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
          }

          if ('serviceWorker' in navigator) {
            const notification = {
              dom: document.querySelector('#js-notification'),
              buttonClose: document.querySelector('#js-notification-close'),
              showBanner() {
                this.dom.classList.remove('is-hidden')
                this.dom.addEventListener('click', subscribe)
                this.buttonClose.addEventListener('click', this.closeBanner)
              },
              hideBanner() {
                this.dom.classList.add('is-hidden')
                this.dom.removeEventListener('click', subscribe)
                this.buttonClose.removeEventListener('click', this.closeBanner)
              },
              isDenied() {
                return Notification.permission === 'denied'
              },
              closeBanner: (event) => {
                event.stopPropagation()
                notification.hideBanner()
              }
            }

            navigator.serviceWorker.register("${manifest['sw.js']}")

            navigator.serviceWorker.ready.then((registration) => {
              registration.pushManager.getSubscription()
              .then(async (subscription) => {
                if (subscription) {
                  return subscription
                }

                if (notification.isDenied()) {
                  return
                }

                // display notification
                notification.showBanner()
              })
            })

            function subscribe() {
              navigator.serviceWorker.ready.then(async (registration) => {
                const response = await fetch('/push-public-key')
                const vapidPublicKey = await response.text()

                // push notification not enabled
                if (!vapidPublicKey) return

                const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

                try {
                  const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey
                  })

                  await fetch('/subscriptions', {
                    method: 'post',
                    headers: {
                      'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                      subscription: subscription
                    }),
                  })

                  notification.hideBanner()

                  return subscription
                } catch (err) {
                  if (notification.isDenied()) {
                    notification.hideBanner()
                  }
                }
              })
            }
          }
        </script>
      `
    : ''
}
    </body>
  </html>
`
