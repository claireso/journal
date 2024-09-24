// @ts-nocheck
import { createStitches } from '@stitches/react'

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
  theme: {
    colors: {
      gray100: 'hsl(0, 0%, 93%)',
      gray200: 'hsl(0, 1%, 81%)',
      gray300: 'hsl(0, 0%, 60%)',
      gray400: 'hsl(0, 0%, 42%)',
      gray500: 'hsl(0, 0%, 27%)',
      gray600: 'hsl(0, 0%, 20%)', // text color
      gray700: 'hsl(0, 0%, 17%)',
      primary100: 'hsl(282, 44%, 51%)',
      primary200: 'hsl(282, 44%, 47%)',
      primary300: 'hsl(282, 44%, 42%)',
      primary400: 'hsl(282, 44%, 80%)',
      secondary100: 'hsl(192, 15%,98%)',
      secondary200: 'hsl(192, 15%, 94%)',
      secondary300: 'hsl(192, 15%, 89%)',
      tertiary100: 'hsl(51, 100%, 68%)',
      tertiary200: 'hsl(51, 100%, 50%)',
      white: 'white',
      error100: 'hsl(360, 67%, 92%)',
      error200: 'hsl(360, 67%, 88%)',
      error300: 'hsl(360, 67%, 46%)',
      success100: 'hsl(133, 35%, 90%)',
      success200: 'hsl(133, 35%, 80%)',
      success300: 'hsl(133, 35%, 39%)'
    },
    fonts: {
      sansSerif: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji'
    },
    fontSizes: {
      1: '1.1rem',
      2: '1.2rem',
      3: '1.3rem',
      4: '1.4rem',
      5: '1.6rem',
      6: '2.2rem',
      7: '2.4rem'
    },
    fontWeights: {
      normal: '400',
      semiBold: '500',
      bold: '700'
    },
    lineHeights: {},
    letterSpacings: {},
    radii: {
      1: '0.2rem',
      2: '0.4rem',
      3: '3.6rem'
    },
    sizes: {
      container: '124rem',
      toolbarHeight: '6rem',
      gridColumnsXs: '6',
      gridColumns: '12'
    },
    space: {
      1: '0.4rem',
      2: '0.8rem',
      3: '1.2rem',
      4: '1.6rem',
      5: '2rem',
      6: '2.4rem',
      7: '2.8rem',
      8: '4rem'
    },
    zIndices: {},
    shadows: {
      1: '0px 1px 5px #e6e6e6',
      2: '1px 1px 3px #e6e6e6',
      3: '0 6px 6px #e0dede'
    },
    borderWidths: {},
    borderStyles: {},
    transitions: {
      background: 'background 150ms ease-out',
      borderColor: 'border-color 250ms ease-out',
      color: 'color 150ms ease',
      opacity: 'opacity 150ms ease-out',
      button: 'background 150ms ease-out, color 150ms ease'
    }
  },
  media: {
    sm: '(max-width: 799px)',
    lg: '(min-width: 800px)'
  },
  utils: {
    // Abbreviated margin properties
    m: (value) => ({
      margin: value
    }),
    mt: (value) => ({
      marginTop: value
    }),
    mr: (value) => ({
      marginRight: value
    }),
    mb: (value) => ({
      marginBottom: value
    }),
    ml: (value) => ({
      marginLeft: value
    }),
    mx: (value) => ({
      marginLeft: value,
      marginRight: value
    }),
    my: (value) => ({
      marginTop: value,
      marginBottom: value
    }),
    // Abbreviated padding properties
    p: (value) => ({
      padding: value
    }),
    pt: (value) => ({
      paddingTop: value
    }),
    pr: (value) => ({
      paddingRight: value
    }),
    pb: (value) => ({
      paddingBottom: value
    }),
    pl: (value) => ({
      paddingLeft: value
    }),
    px: (value) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    py: (value) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    size: (value) => ({
      width: value,
      height: value
    })
  }
})
