const React = require('react')
const ReactDOMServer = require('react-dom/server')

module.exports = (Layout, Component, props = {}) => {
  const content = ReactDOMServer.renderToStaticMarkup(<Component { ...props } />)
  return Layout({content})
}