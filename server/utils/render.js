const React = require('react')
const ReactDOMServer = require('react-dom/server')

export default (Layout, Component, props = {}, appProps = {}) => {
  const content = ReactDOMServer.renderToStaticMarkup(<Component { ...props } />)
  return Layout({content, ...appProps})
}