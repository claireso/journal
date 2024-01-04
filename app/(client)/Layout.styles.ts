import { styled } from '@theme'

export const Main = styled('main', {
  display: 'grid',
  gridTemplateColumns: 'repeat($gridColumnsXs, 1fr)',
  gridGap: '$8 $4',
  maxWidth: '$container',
  overflowX: 'hidden',
  m: '0 auto',
  p: '$4',
  '@lg': {
    gridGap: '0 $5',
    gridTemplateColumns: 'repeat($gridColumns, 1fr)',
    pt: '$8',
    pl: 0,
    pr: 0
  }
})
