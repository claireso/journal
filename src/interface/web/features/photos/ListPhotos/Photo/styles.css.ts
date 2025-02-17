import { recipe } from '@vanilla-extract/recipes'
import { pagesStyle, responsiveStyle, tokens, gapY, mb } from '@web/theme'

const PORTRAIT = 'portrait'
const LANDSCAPE = 'landscape'
const SQUARE = 'square'
const POSITION_LEFT = 'left'
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

const getColumnStart = (position = '', cellWidth: number) => {
  const gridColumns = 12
  switch (position) {
    case 'center': {
      return (gridColumns - cellWidth) / 2 + 1
    }
    case 'right': {
      return gridColumns - cellWidth
    }
  }
}

export const figure = recipe({
  base: pagesStyle({
    ...responsiveStyle({
      md: {
        selectors: {
          '& + &': {
            marginTop: '20rem'
          }
        }
      }
    })
  }),
  variants: {
    landscape: {
      true: pagesStyle({
        gridColumnEnd: `span ${configImages[LANDSCAPE].cellWidth.small}`,
        ...responsiveStyle({
          md: {
            gridColumnEnd: `span ${configImages[LANDSCAPE].cellWidth.large}`
          }
        })
      })
    },
    portrait: {
      true: pagesStyle({
        gridColumnEnd: `span ${configImages[PORTRAIT].cellWidth.small}`,
        ...responsiveStyle({
          md: {
            gridColumnEnd: `span ${configImages[PORTRAIT].cellWidth.large}`
          }
        })
      })
    },
    square: {
      true: pagesStyle({
        gridColumnEnd: `span ${configImages[SQUARE].cellWidth.small}`,
        ...responsiveStyle({
          md: {
            gridColumnEnd: `span ${configImages[SQUARE].cellWidth.large}`
          }
        })
      })
    },
    position: {
      [POSITION_LEFT]: pagesStyle({
        gridColumnStart: 1,
        ...responsiveStyle({
          md: {
            gridColumnStart: 2
          }
        })
      }),
      [POSITION_CENTER]: {},
      [POSITION_RIGHT]: {}
    },
    highlight: {
      true: pagesStyle({
        marginTop: tokens.borders['border-width-photo'],
        ...responsiveStyle({
          md: {
            marginTop: tokens.borders['border-width-photo-md'],
            selectors: {
              '& + &': {
                marginTop: `calc(20rem + ${tokens.borders['border-width-photo-md']})`
              }
            }
          }
        })
      })
    }
  },
  compoundVariants: [
    {
      variants: {
        landscape: true,
        position: POSITION_CENTER
      },
      style: pagesStyle({
        ...responsiveStyle({
          md: {
            gridColumnStart: getColumnStart(POSITION_CENTER, configImages[LANDSCAPE].cellWidth.large)
          }
        })
      })
    },
    {
      variants: {
        landscape: true,
        position: POSITION_RIGHT
      },
      style: pagesStyle({
        ...responsiveStyle({
          md: {
            gridColumnStart: getColumnStart(POSITION_RIGHT, configImages[LANDSCAPE].cellWidth.large)
          }
        })
      })
    },
    {
      variants: {
        portrait: true,
        position: POSITION_CENTER
      },
      style: pagesStyle({
        ...responsiveStyle({
          md: {
            gridColumnStart: getColumnStart(POSITION_CENTER, configImages[PORTRAIT].cellWidth.large)
          }
        })
      })
    },
    {
      variants: {
        portrait: true,
        position: POSITION_RIGHT
      },
      style: pagesStyle({
        ...responsiveStyle({
          md: {
            gridColumnStart: getColumnStart(POSITION_RIGHT, configImages[PORTRAIT].cellWidth.large)
          }
        })
      })
    },
    {
      variants: {
        square: true,
        position: POSITION_CENTER
      },
      style: pagesStyle({
        ...responsiveStyle({
          md: {
            gridColumnStart: getColumnStart(POSITION_CENTER, configImages[SQUARE].cellWidth.large)
          }
        })
      })
    },
    {
      variants: {
        square: true,
        position: POSITION_RIGHT
      },
      style: pagesStyle({
        ...responsiveStyle({
          md: {
            gridColumnStart: getColumnStart(POSITION_RIGHT, configImages[SQUARE].cellWidth.large)
          }
        })
      })
    }
  ]
})

export const pictureWrapper = recipe({
  base: pagesStyle({
    background: 'currentcolor',
    ...mb('size-2')
  }),
  variants: {
    highlight: {
      true: pagesStyle({
        boxShadow: '0 0 0 2rem currentColor',
        marginBottom: `calc(1rem + ${tokens.borders['border-width-photo']})`,
        position: 'relative',
        selectors: {
          '&::after': {
            background: 'currentColor',
            bottom: `calc(${tokens.sizes['size-5']}*-1)`,
            content: '',
            display: 'block',
            left: '100%',
            position: 'absolute',
            top: `calc(${tokens.sizes['size-5']}*-1)`,
            width: '99999px'
          }
        },
        ...responsiveStyle({
          md: {
            boxShadow: '0 0 0 8rem currentColor',
            marginBottom: `calc(1rem + ${tokens.borders['border-width-photo-md']})`,
            selectors: {
              '&::after': {
                display: 'none'
              }
            }
          }
        })
      })
    }
  }
})

export const figcaption = pagesStyle({
  display: 'flex',
  flexDirection: 'column',
  ...gapY('size-1')
})
