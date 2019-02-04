import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import { ServerStyleSheet } from 'styled-components'
import { readFileSync } from 'jsonfile'

import stats from '../../../dist/react-loadable.json'

//@TODO not sure if it is the right way
const manifestPath = `${process.cwd()}/public/asset-manifest.json`
const manifest = readFileSync(manifestPath)

export default ({
  Layout,
  Component,
  config = {},
  props = {},
  preloadedState
}) => {
  const sheet = new ServerStyleSheet()
  const modules = []
  const translations = config.translations

  const content = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Component {...props} translations={translations} />
      </Loadable.Capture>
    )
  )

  const styleTags = sheet.getStyleTags()

  const bundles = getBundles(stats, modules)

  return Layout({
    content,
    config,
    manifest,
    preloadedState: JSON.stringify({ ...preloadedState, translations }),
    styles: styleTags,
    bundles: bundles
  })
}
