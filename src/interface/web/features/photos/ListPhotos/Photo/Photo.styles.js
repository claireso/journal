import { styled, theme } from '@web/theme'

import AnimatedImage from '@web/components/AnimatedImage'

const PORTRAIT = 'portrait'
const LANDSCAPE = 'landscape'
const SQUARE = 'square'
// const POSITION_LEFT = 'left'
const POSITION_CENTER = 'center'
const POSITION_RIGHT = 'right'

const configImages = {
  [PORTRAIT]: {
    cellWidth: {
      large: 4,
      small: 5
    }
  },
  [LANDSCAPE]: {
    cellWidth: {
      large: 8,
      small: 6
    }
  },
  [SQUARE]: {
    cellWidth: {
      large: 6,
      small: 6
    }
  }
}

const getColumnStart = (position = '', cellWidth) => {
  switch (position) {
    case 'center': {
      return (theme.sizes.gridColumns.value - cellWidth) / 2 + 1
    }
    case 'right': {
      return theme.sizes.gridColumns.value - cellWidth
    }
  }
}

export const Figure = styled('figure', {
  $$shadowWidth: '8rem',
  $$shadowWidthXs: '2rem',
  m: 0,
  gridColumnStart: 1,
  gridColumnEnd: `span ${configImages[LANDSCAPE].cellWidth.small}`,

  '@lg': {
    gridColumnEnd: `span ${configImages[LANDSCAPE].cellWidth.large}`,
    gridColumnStart: 2,
    '& + &': {
      mt: '20rem'
    }
  },

  variants: {
    position: {
      // landscape position
      [POSITION_CENTER]: {
        '@lg': {
          gridColumnStart: getColumnStart(POSITION_CENTER, configImages[LANDSCAPE].cellWidth.large)
        }
      },
      [POSITION_RIGHT]: {
        '@lg': {
          gridColumnStart: getColumnStart(POSITION_RIGHT, configImages[LANDSCAPE].cellWidth.large)
        }
      }
    },
    // width of portrait
    portrait: {
      true: {
        gridColumnEnd: `span ${configImages[PORTRAIT].cellWidth.small}`,
        '@lg': {
          gridColumnEnd: `span ${configImages[PORTRAIT].cellWidth.large}`
        }
      }
    },
    // width of square
    square: {
      true: {
        gridColumnEnd: `span ${configImages[SQUARE].cellWidth.small}`,
        '@lg': {
          gridColumnEnd: `span ${configImages[SQUARE].cellWidth.large}`
        }
      }
    },
    // box shadow to highlight pictures
    withColor: {
      true: {
        mt: '$$shadowWidthXs',
        '> div': {
          boxShadow: '0 0 0 $$shadowWidthXs currentColor',
          mb: 'calc(1rem + $$shadowWidthXs)',
          position: 'relative',
          '@sm': {
            '&::after': {
              background: 'currentColor',
              bottom: '-$5',
              content: '',
              display: 'block',
              left: '100%',
              position: 'absolute',
              top: '-$5',
              width: '99999px'
            }
          }
        },
        '@lg': {
          mt: '$$shadowWidth',
          '> div': {
            boxShadow: '0 0 0 $$shadowWidth currentColor',
            mb: 'calc(1rem + $$shadowWidth)'
          },
          'figure + &': {
            mt: 'calc(20rem + $$shadowWidth)'
          }
        }
      }
    }
  },

  // start position in grid
  compoundVariants: [
    // square position center
    {
      square: true,
      position: POSITION_CENTER,
      css: {
        '@lg': {
          gridColumnStart: getColumnStart(POSITION_CENTER, configImages[SQUARE].cellWidth.large)
        }
      }
    },
    // square position right
    {
      square: true,
      position: POSITION_RIGHT,
      css: {
        '@lg': {
          gridColumnStart: getColumnStart(POSITION_RIGHT, configImages[SQUARE].cellWidth.large)
        }
      }
    },
    // portrait position center
    {
      portrait: true,
      position: POSITION_CENTER,
      css: {
        '@lg': {
          gridColumnStart: getColumnStart(POSITION_CENTER, configImages[PORTRAIT].cellWidth.large)
        }
      }
    },
    // portrait position right
    {
      portrait: true,
      position: POSITION_RIGHT,
      css: {
        '@lg': {
          gridColumnStart: getColumnStart(POSITION_RIGHT, configImages[PORTRAIT].cellWidth.large)
        }
      }
    }
  ]
})

export const Title = styled('figcaption', {
  fontSize: '$3'
})

export const Description = styled('span', {
  color: '$gray400',
  display: 'block',
  fontSize: '$1',
  fontStyle: 'italic',
  mt: '$1'
})

export const PictureWrapper = styled('div', {
  background: 'currentColor',
  width: '100%',
  margin: '0 0 1rem',
  aspectRatio: 'var(--aspect-ratio)',

  '@supports (not (aspect-ratio: 1 / 1)) and (not (aspect-ratio: 3 / 2)) and (not (aspect-ratio: 2 / 3))': {
    position: 'relative',
    pt: 'calc(100% / var(--aspect-ratio))'
  }
})

export const Picture = styled(AnimatedImage, {
  display: 'block',
  width: '100%',
  m: 0,

  '@supports (not (aspect-ratio: 1 / 1)) and (not (aspect-ratio: 3 / 2)) and (not (aspect-ratio: 2 / 3))': {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  }
})
