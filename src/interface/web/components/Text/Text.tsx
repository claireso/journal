import React from 'react'
import joinCls from '@utils/joinCls'

import type { TextVariants } from './styles.css'
import * as cls from './styles.css'

type TextProps<T extends React.ElementType> = {
  as?: T
} & React.ComponentPropsWithoutRef<T> &
  TextVariants

const Text = <T extends React.ElementType>({
  children,
  as,
  color = 'base',
  size = 'base',
  weight = 'normal',
  italic = false,
  className = ''
}: TextProps<T>) => {
  const Tag = as || 'p'
  return <Tag className={joinCls([cls.text({ size, color, italic, weight }), className])}>{children}</Tag>
}

export default Text
