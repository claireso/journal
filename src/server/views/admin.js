// admin layout

export default ({ content = '', config = {}, manifest = {}, preloadedState = {} } = {}) => `
  <!doctype html>
  <html lang="fr">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title> Admin - Journal </title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400, 700" />
      <link rel="stylesheet" href="/css/admin.css?v=${config.version}" />
      </head>
      <body>
      <div id="js-app">${content}</div>
      <script>
      (function(){
        window.preloadedState = ${preloadedState}
      })()
      </script>
      <script src="/js/${manifest['admin.js']}"></script>
    </body>
  </html>
`
