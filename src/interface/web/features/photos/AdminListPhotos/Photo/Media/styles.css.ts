import { pagesStyle, radiusTop, p } from '@web/theme'

export const pictureWrapper = pagesStyle({
  height: '180px',
  background: 'currentcolor',
  position: 'relative',
  overflow: 'hidden',
  ...p('size-3'),
  ...radiusTop('size-1')
})

export const picture = pagesStyle({
  objectFit: 'contain'
})
