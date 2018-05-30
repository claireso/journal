const React = require('react')
const ReactDOMServer = require('react-dom/server')

export default (Layout, Component, props = {}, config = {}) => {
  const content = ReactDOMServer.renderToStaticMarkup(<Component {...props} />)
  return Layout({ content, config })
}
