'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import Toolbar from '../Toolbar'
import { Heading2 } from '../Headings'
import Icon from '@web/components/Icons'

import * as cls from './styles.css'
import { ButtonDark } from '../Buttons'

const ANIMATION_DURATION = 300

const animationsConfig = {
  open: {
    wrapper: {
      keyframes: [{ opacity: 1 }],
      timings: {
        duration: ANIMATION_DURATION,
        fill: 'forwards' as FillMode,
        easing: 'cubic-bezier(.17,.67,.21,.97)'
      }
    },
    content: {
      keyframes: [{ opacity: 1, transform: 'translate3d(0, 0, 0)' }],
      timings: {
        duration: ANIMATION_DURATION,
        fill: 'forwards' as FillMode,
        easing: 'cubic-bezier(.17,.67,.21,.97)'
      }
    }
  },
  close: {
    wrapper: {
      keyframes: [{ opacity: 0 }],
      timings: {
        duration: ANIMATION_DURATION,
        fill: 'forwards' as FillMode,
        easing: 'cubic-bezier(.17,.67,.21,.97)'
      }
    },
    content: {
      keyframes: [{ opacity: 0, transform: 'translate3d(4rem, 0, 0)' }],
      timings: {
        duration: ANIMATION_DURATION,
        fill: 'forwards' as FillMode,
        easing: 'cubic-bezier(.17,.67,.21,.97)'
      }
    }
  }
}

interface ModalProps {
  testId?: string
  title: string
  children: React.ReactNode
  onClose: (options?: NavigateOptions) => void
}

const Modal = ({ testId = '', title, children, onClose = () => {} }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const wrapper = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, ANIMATION_DURATION)
  }, [onClose])

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement

      if (target.contains(content.current) && !(target.getAttribute('id') === 'modalInner')) {
        close()
      }
    },
    [close]
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event?.code === 'Escape') {
        close()
      }
    },
    [close]
  )

  useEffect(() => {
    const animations = animationsConfig[isOpen ? 'open' : 'close']

    if (wrapper.current?.animate) {
      wrapper.current.animate(animations.wrapper.keyframes, animations.wrapper.timings)
    }

    if (content.current?.animate) {
      content.current.animate(animations.content.keyframes, animations.content.timings)
    }
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return (
    <div
      className={cls.wrapper}
      ref={wrapper}
      id="modal"
      data-testid={testId}
      onClick={onClick}
      style={animationsConfig.close.wrapper.keyframes[0]}
    >
      <div className={cls.inner} id="modalInner" ref={content} style={animationsConfig.close.content.keyframes[0]}>
        <Toolbar variant="neutral">
          <Heading2>{title}</Heading2>
          <ButtonDark onClick={close} size="sm">
            <Icon name="close" size="sm" />
          </ButtonDark>
        </Toolbar>
        <div className={cls.content}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
