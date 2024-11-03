import { pagesStyle, tokens, gap } from '@web/theme'

import { wrapper } from '../styles.css'

export const actions = pagesStyle({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `color-mix(in srgb, ${tokens.colors.neutral['2extralight']} 75%, transparent)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  visibility: 'hidden',
  opacity: 0,
  transition: 'opacity 250ms ease-out',
  willChange: 'opacity',
  ...gap('size-2'),
  selectors: {
    [`${wrapper}:hover &`]: {
      visibility: 'visible',
      opacity: 1
    }
  }
})
