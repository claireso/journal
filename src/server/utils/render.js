import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { readFileSync } from 'jsonfile'

//@TODO not sure if it is the right way
const manifestPath = `${process.cwd()}/public/asset-manifest.json`
const manifest = readFileSync(manifestPath)

export default (Layout, Component, props = {}, config = {}, preloadedState) => {
  const sheet = new ServerStyleSheet()
  const content = ReactDOMServer.renderToString(
    sheet.collectStyles(<Component {...props} />)
  )

  const styleTags = sheet.getStyleTags()

  return Layout({
    content,
    config,
    manifest,
    preloadedState: JSON.stringify(preloadedState),
    styles: styleTags
  })
}
