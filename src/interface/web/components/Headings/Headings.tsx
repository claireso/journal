import React from 'react'
import joinCls from '@utils/joinCls'
import * as cls from './styles.css'

export interface HeadingProps {
  children: React.ReactNode
  className?: string
}

export const Heading1 = ({ children, className = '' }: HeadingProps) => (
  <h1 className={joinCls([cls.heading1, className])}>{children}</h1>
)
export const Heading2 = ({ children, className = '' }: HeadingProps) => (
  <h2 className={joinCls([cls.heading2, className])}>{children}</h2>
)
export const Heading3 = ({ children, className = '' }: HeadingProps) => (
  <h3 className={joinCls([cls.heading3, className])}>{children}</h3>
)
export const Heading4 = ({ children, className = '' }: HeadingProps) => (
  <h4 className={joinCls([cls.heading4, className])}>{children}</h4>
)
export const Heading5 = ({ children, className = '' }: HeadingProps) => (
  <h5 className={joinCls([cls.heading5, className])}>{children}</h5>
)
export const Heading6 = ({ children, className = '' }: HeadingProps) => (
  <h6 className={joinCls([cls.heading6, className])}>{children}</h6>
)
