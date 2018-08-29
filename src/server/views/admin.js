// admin layout

export default ({
  content = '',
  manifest = {},
  preloadedState = {},
  styles = ''
} = {}) => `
  <!doctype html>
  <html lang="fr">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title> Admin - Journal </title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400, 700" />

      <style>
        html {
          box-sizing: border-box;
          font-size: 62.5%;
        }

        *, *:before, *:after {
          box-sizing: inherit;
        }

        body {
          color: #333;
          font-family: "Roboto", Arial, sans-serif;
          font-size: 16px;
          margin: 0;
        }

        main {
          max-width: 96rem;
          padding: 4rem 2rem;
          margin: 0 auto;
        }

        svg {
          fill: currentColor;
        }
      </style>

      ${styles}

      </head>
      <body>
      <div id="js-app">${content}</div>
      <script>
      (function(){
        window.preloadedState = ${preloadedState}
      })()
      </script>
      <script src="${manifest['admin.js']}"></script>
    </body>
  </html>
`
