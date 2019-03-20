import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { readFileSync } from 'jsonfile'

//@TODO not sure if it is the right way
const manifestPath = `${process.cwd()}/public/asset-manifest.json`
const manifest = readFileSync(manifestPath)

export default ({
  Layout,
  Component,
  config = {},
  props = {},
  preloadedState,
  extractor
}) => {
  const sheet = new ServerStyleSheet()
  const translations = config.translations

  const comp = <Component {...props} translations={translations} />

  const content = ReactDOMServer.renderToString(
    sheet.collectStyles(extractor ? extractor.collectChunks(comp) : comp)
  )

  const styleTags = sheet.getStyleTags()

  const scriptTags = extractor && extractor.getScriptTags()

  return Layout({
    content,
    config,
    manifest,
    preloadedState: JSON.stringify({ ...preloadedState, translations }),
    styles: styleTags,
    bundles: scriptTags,
    environment: process.env.NODE_ENV
  })
}
