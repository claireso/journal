'use client'
import React, { useEffect, useRef } from 'react'
import type * as Stitches from '@stitches/react'

import { IconClose } from '@web/components/Icons'

import * as S from './Flash.styles'

interface FlashProps {
  status: 'default' | 'success' | 'error' | 'info'
  children: React.ReactNode
  index?: number
  withBorder?: boolean
  onClose?: ((index: number) => void) | null
  css?: Stitches.CSS
}

const Flash = ({
  status = 'default',
  children,
  onClose = null,
  index = 0,
  withBorder = false,
  ...props
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
    <S.Wrapper ref={dom} status={status} separator={withBorder} {...props}>
      {children}
      {onClose && (
        <S.ButtonClose
          onClick={(event) => {
            event.preventDefault()
            onClose(index)
          }}
        >
          <IconClose />
        </S.ButtonClose>
      )}
    </S.Wrapper>
  )
}

export default Flash
