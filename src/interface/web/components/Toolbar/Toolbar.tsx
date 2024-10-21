import React from 'react'

import joinCls from '@utils/joinCls'

import type { ToolbarVariants } from './styles.css'
import * as cls from './styles.css'

type ToolbarProps = {
  children: React.ReactNode
  className?: string
} & ToolbarVariants

const Toolbar = ({ className, variant, children }: ToolbarProps) => (
  <div className={joinCls([cls.toolbar({ variant }), className])}>{children}</div>
)

export default Toolbar
