import React from 'react'
import * as cls from './styles.css'
import joinCls from '@utils/joinCls'

interface BoxProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <div className={joinCls([cls.wrapper, className])} {...props}>
      {children}
    </div>
  )
}

export default Box
