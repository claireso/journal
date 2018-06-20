// admin layout

export default ({ content = '', config = {}, manifest = {} } = {}) => `
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
      <script src="/js/${manifest['admin.js']}"></script>
      <script>
        (function(){
          var nodes = [...document.querySelectorAll('.js-delete')]

          nodes.map(node => {
            node.addEventListener('click', (event) => {
              if (!confirm('Are you sure? This action is irreversible')) {
                event.preventDefault()
              }
            })
          })
        })()
      </script>
    </body>
  </html>
`
