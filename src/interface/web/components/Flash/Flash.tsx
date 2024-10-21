'use client'

import React, { useEffect, useRef } from 'react'

import Icon from '../Icons'

import type { FlashVariants } from './styles.css'
import * as cls from './styles.css'
import joinCls from '@utils/joinCls'

type FlashProps = {
  children: React.ReactNode
  index?: number
  withBorder?: boolean
  onClose?: ((index: number) => void) | null
  className?: string
} & FlashVariants

const Flash = ({
  status = 'default',
  children,
  onClose = null,
  index = 0,
  withBorder = false,
  className
}: FlashProps) => {
  const dom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dom.current?.animate) {
      dom.current.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 1000,
        delay: 50,
        easing: 'cubic-bezier(.17,.67,.21,.97)',
        fill: 'forwards'
      })
    }
  }, [])

  return (
    <div ref={dom} className={joinCls([cls.wrapper({ status, separator: withBorder }), className])}>
      {children}
      {onClose && (
        <button
          className={cls.buttonClose}
          onClick={(event) => {
            event.preventDefault()
            onClose(index)
          }}
        >
          <Icon name="close" />
        </button>
      )}
    </div>
  )
}

export default Flash
