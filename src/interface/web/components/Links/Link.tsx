import React from 'react'
import clsx from '@utils/clsx'

import type { LinkVariants } from './styles.css'
import * as cls from './styles.css'

type LinkProps = React.ComponentProps<'a'> & LinkVariants

const Link = ({ variant = 'default', className, ref, ...props }: LinkProps) => (
  <a ref={ref} className={clsx([cls.link({ variant }), className])} {...props} />
)

export default Link
