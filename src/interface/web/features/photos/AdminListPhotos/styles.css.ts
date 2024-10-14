import { pagesStyle, gap, mb } from '@web/theme'

export const list = pagesStyle({
  display: 'flex',
  flexWrap: 'wrap',
  ...gap('size-6'),
  ...mb('size-15')
})
