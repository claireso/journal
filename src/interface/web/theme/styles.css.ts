// reset
import { globalStyle } from '@vanilla-extract/css'

import { tokens } from './core/tokens.css'
import { resetStyle } from './utilities/layers.css'

globalStyle(
  'html',
  resetStyle({
    boxSizing: 'border-box',
    fontSize: '62.5%'
  })
)

globalStyle(
  '*, *:before, *:after',
  resetStyle({
    boxSizing: 'inherit'
  })
)

globalStyle(
  'a',
  resetStyle({
    textDecoration: 'none'
  })
)

globalStyle(
  'svg',
  resetStyle({
    display: 'block'
  })
)

globalStyle(
  'body',
  resetStyle({
    color: tokens.colors['text-base'],
    fontFamily: tokens.fonts.family.sansSerif,
    fontSize: tokens.sizes['size-4'],
    margin: tokens.sizes['size-0'],
    lineHeight: 1.5
  })
)

globalStyle(
  'button',
  resetStyle({
    background: 'none',
    border: 'none',
    padding: tokens.sizes['size-0'],
    margin: tokens.sizes['size-0'],
    color: 'inherit',
    fontFamily: tokens.fonts.family.sansSerif,
    cursor: 'pointer'
  })
)

globalStyle(
  'button > svg',
  resetStyle({
    margin: tokens.sizes['size-0']
  })
)

globalStyle(
  'input[type=checkbox]',
  resetStyle({
    margin: tokens.sizes['size-0']
  })
)

globalStyle(
  'ul, ol',
  resetStyle({
    padding: tokens.sizes['size-0'],
    margin: tokens.sizes['size-0'],
    listStyleType: 'none'
  })
)

globalStyle(
  'figure',
  resetStyle({
    margin: tokens.sizes['size-0']
  })
)
