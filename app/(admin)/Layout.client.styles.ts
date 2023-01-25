import { styled, globalCss } from '@theme'

import { Button } from '@components/Buttons'

export const globalStyles = globalCss({
  html: {
    boxSizing: 'border-box',
    fontSize: '62.5%'
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit'
  },
  body: {
    color: '$gray600',
    fontFamily: '$sansSerif',
    fontSize: '16px',
    m: 0
  },
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
