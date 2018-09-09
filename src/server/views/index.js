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
      <div id="js-journal">${content}</div>

      <script src="${manifest['journal.js']}"></script>

      ${ (config.notification.publicKey && config.notification.privateKey) ?
    `
        <div role="button" id="js-notification" class="notification is-hidden">
          <div class="notification__inner">
            <p>${ config.notification.enableDefaultText }</p>
          </div>
        </div>
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
              showBanner() {
                this.dom.classList.remove('is-hidden')
                this.dom.addEventListener('click', subscribe)
              },
              hideBanner() {
                this.dom.classList.add('is-hidden')
                this.dom.removeEventListener('click', subscribe)
              },
              isDenied() {
                return Notification.permission === 'denied'
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
