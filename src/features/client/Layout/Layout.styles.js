import { styled, globalCss } from '@theme'

export const globalStyles = globalCss({
  html: {
    boxSizing: 'border-box',
    fontSize: '62.5%'
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit'
  },
  'html, body': {
    overflowX: 'hidden'
  },
  a: {
    textDecoration: 'none'
  },
  body: {
    color: '$gray600',
    fontFamily: '$sansSerif',
    fontSize: '16px',
    m: 0
  }
})

export const Main = styled('main', {
  display: 'grid',
  gridTemplateColumns: 'repeat($gridColumnsXs, 1fr)',
  gridGap: '$8 $4',
  maxWidth: '$container',
  m: '0 auto',
  p: '$4',
  '@lg': {
    gridGap: '0 $5',
    gridTemplateColumns: 'repeat($gridColumns, 1fr)',
    pt: '$8'
  }
})

export const LoaderWrapper = styled('div', {
  gridColumn: '1 / -1'
})
