import { pagesStyle } from '@web/theme'

export const link = pagesStyle({
  ':after': {
    content: '',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})
