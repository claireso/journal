// default layout

export default ({content = '', config = {}} = {}) => `
  <html lang="fr">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title> ${ config.meta.title } </title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="description" content="${ config.meta.description }" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400, 700" />
      <link rel="stylesheet" href="/css/journal.css" />
      <link rel="manifest" href="/manifest.json" />
    </head>
    <body>
      ${ (config.analytics && config.analytics.ga) ?
        `<script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', ${ config.analytics.ga }, 'auto');
          ga('send', 'pageview');

        </script>`
        :
        ``
      }

      ${ content }

      <script>
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js?v1')
        }
      </script>
    </body>
  </html>
`
