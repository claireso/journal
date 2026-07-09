import React from 'react'

import clsx from '@utils/clsx'
import * as cls from './styles.css'

interface BoxProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <div className={clsx([cls.wrapper, className])} {...props}>
      {children}
    </div>
  )
}

export default Box
