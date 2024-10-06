import { globalCss } from '@web/theme'

export const css = globalCss({
  main: {
    maxWidth: '$container',
    p: '$5*3 $5',
    m: '0 auto'
  },
  svg: {
    fill: 'currentColor'
  },
  a: {
    textDecoration: 'none',
    transition: '$color'
  }
})
