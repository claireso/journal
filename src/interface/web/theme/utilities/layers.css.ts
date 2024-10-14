import type { StyleRule, GlobalStyleRule } from '@vanilla-extract/css'
import { style } from '@vanilla-extract/css'
import * as layers from '../core/layers.css'

const layerStyle = (layer: string) => (styles: StyleRule) =>
  style({
    '@layer': {
      [layer]: styles
    }
  })

const globalLayerStyle = (layer: string) => (styles: GlobalStyleRule) => ({
  '@layer': {
    [layer]: styles
  }
})

export const cmpStyles = layerStyle(layers.components)
export const resetStyle = globalLayerStyle(layers.reset)
export const pagesStyle = layerStyle(layers.pages)
export const utilitiesStyle = layerStyle(layers.utilities)
