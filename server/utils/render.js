const React = require('react')
const ReactDOMServer = require('react-dom/server')

module.exports = (Component, props = {}) => {
  return ReactDOMServer.renderToStaticMarkup(<Component { ...props } />)
}