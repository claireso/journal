import React from 'react'
import clsx from '@utils/clsx'

import type { LinkVariants } from './styles.css'
import * as cls from './styles.css'

type LinkProps = React.ComponentProps<'a'> & LinkVariants

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ variant = 'default', className, ...props }, ref) => (
  <a ref={ref} className={clsx([cls.link({ variant }), className])} {...props} />
))

Link.displayName = 'Link'

export default Link
