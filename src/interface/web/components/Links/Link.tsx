import React from 'react'
import joinCls from '@utils/joinCls'

import type { LinkVariants } from './styles.css'
import * as cls from './styles.css'

type LinkProps = React.ComponentProps<'a'> & LinkVariants

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ variant = 'default', className, ...props }, ref) => (
  <a ref={ref} className={joinCls([cls.link({ variant }), className])} {...props} />
))

Link.displayName = 'Link'

export default Link
