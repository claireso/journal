import { pagesStyle, responsiveStyle, my, mx, py, px, pt, gapX, gapY } from '@web/theme'

export const main = pagesStyle({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  maxWidth: '1240px',
  overflowX: 'hidden',
  ...my('size-0'),
  ...mx('size-auto'),
  ...py('size-4'),
  ...px('size-4'),
  ...pt('size-4'),
  ...gapX('size-4'),
  ...gapY('size-8'),
  ...responsiveStyle({
    md: {
      gridTemplateColumns: 'repeat(12, 1fr)',
      ...px('size-0'),
      ...pt('size-10'),
      ...gapX('size-5'),
      ...gapY('size-0')
    }
  })
})
