import React, { ReactNode } from 'react'
import { Link } from './Link.styles'

interface LinkPrimaryProps {
  children: ReactNode
}

export const LinkPrimary = React.forwardRef<HTMLSpanElement, LinkPrimaryProps>((props, ref) => (
  <Link ref={ref} {...props} color="primary" />
))

LinkPrimary.displayName = 'LinkPrimary'
