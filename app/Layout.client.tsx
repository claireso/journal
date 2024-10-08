'use client'

import { globalCss } from '@web/oldtheme'

export const css = globalCss({
  html: {
    boxSizing: 'border-box',
    fontSize: '62.5%'
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit'
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

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  css()

  return children
}

export default Layout
