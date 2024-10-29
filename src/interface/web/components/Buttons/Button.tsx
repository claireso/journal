'use client'

import React from 'react'

import joinCls from '@utils/joinCls'
import Spinner from '../Spinner'

import type { ButtonVariants } from './styles.css'
import * as cls from './styles.css'

export type ButtonProps = {
  children: React.ReactNode
} & ButtonVariants &
  React.ComponentProps<'button'>

const Button = ({
  children,
  variant = 'neutral',
  size = 'md',
  block = false,
  loading = false,
  outline = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={joinCls([cls.button({ variant, size, block, loading, outline }), className])} {...props}>
      {loading ? <Spinner variant="currentcolor" size={size} /> : children}
    </button>
  )
}

export default Button
