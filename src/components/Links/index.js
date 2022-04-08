import React from 'react'
import { Link } from './Link.styles'

export const LinkPrimary = React.forwardRef((props, ref) => <Link ref={ref} {...props} color="primary" />)

LinkPrimary.displayName = 'LinkPrimary'
