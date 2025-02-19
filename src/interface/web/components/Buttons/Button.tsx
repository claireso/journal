'use client'

import React from 'react'

import clsx from '@utils/clsx'
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
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={clsx([cls.button({ variant, size, block, loading, outline, disabled }), className])} {...props}>
      {loading ? <Spinner variant="currentcolor" size={size} /> : children}
    </button>
  )
}

export default Button
