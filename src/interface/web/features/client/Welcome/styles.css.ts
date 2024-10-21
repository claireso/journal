import { pagesStyle, py, px } from '@web/theme'

export const wrapper = pagesStyle({
  gridColumn: '1/-1',
  ...py('size-15'),
  ...px('size-6')
})
