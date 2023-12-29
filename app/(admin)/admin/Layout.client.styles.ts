import { styled } from '@theme'

import { Button } from '@components/Buttons'

export const Layout = styled('div', {
  display: 'grid',
  gridTemplateColumns: '15rem auto',
  gridTemplateRows: '6rem auto',
  gridTemplateAreas: `'title toolbar' 'sidebar content'`,
  minHeight: '100vh',
  background: '$secondary200',
  minWidth: '70rem'
})

export const Sidebar = styled('div', {
  gridArea: 'sidebar'
})

export const Content = styled('div', {
  background: '$white',
  borderLeft: '1px solid $gray200',
  boxShadow: '$3',
  gridArea: 'content',
  p: '$5'
})

export const Title = styled('h1', {
  fontSize: '2rem',
  fontWeight: '$semiBold',
  gridArea: 'title',
  lineHeight: '6rem',
  m: 0,
  textAlign: 'center'
})

export const LinkGoToWebsite = styled('span', {
  display: 'flex',
  alignItems: 'center',
  color: '$gray600',
  fontSize: '$2',
  boxShadow: '0 1px 0 $white inset',
  lineHeight: 1.4,
  p: '$5 $5 $5 $8',
  '&:hover': {
    color: '$primary100'
  },
  '> svg': {
    m: '0 0 0 $1'
  }
})

export const ButtonToSignOut = styled(Button, {
  background: 'transparent',
  color: '$white',
  border: '1px solid $white',
  display: 'block',
  lineHeight: 1,
  maxWidth: '10rem',
  p: '$1 $3',
  '&:hover': {
    background: '$white',
    color: '$gray600'
  }
})

export const ToolbarWrapper = styled('div', {
  gridArea: 'toolbar',
  position: 'sticky',
  top: 0,
  zIndex: 10
})
