import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { readFileSync } from 'jsonfile'

//@TODO not sure if it is the right way
const manifestPath = `${process.cwd()}/public/js/asset-manifest.json`
const manifest = readFileSync(manifestPath)

export default (Layout, Component, props = {}, config = {}) => {
  const content = ReactDOMServer.renderToString(<Component {...props} />)

  return Layout({ content, config, manifest })
}
