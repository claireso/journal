import { styled } from '@web/oldtheme'

export const ErrorBoundaryWrapper = styled('div', {
  borderRadius: '$2',
  gridColumn: '1 / -1',
  maxWidth: '610px',
  m: '$5 auto',
  padding: '$5',
  textAlign: 'center',
  h1: {
    color: '#f31616',
    margin: '0 0 $5'
  },
  p: {
    m: 0
  },
  code: {
    background: '#faebd7',
    display: 'block',
    m: '$5 0 0',
    overflowWrap: 'break-word',
    p: '$5',
    textAlign: 'left'
  }
})

export const RefreshButton = styled('button', {
  appearance: 'none',
  background: '#000',
  border: '1px solid $gray200',
  borderRadius: '$1',
  cursor: 'pointer',
  color: '#fff',
  display: 'inline-block',
  fontFamily: '$sansSerif',
  fontWeight: '$bold',
  fontSize: '$4',
  outline: 'none',
  padding: '1rem 1.2rem 1.1rem',
  width: 'auto',
  willChange: 'border-color',
  transition: '$borderColor',
  '&:hover': {
    borderColor: 'gray500'
  }
})
