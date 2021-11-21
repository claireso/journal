import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { IconClose } from '@components/Icons'

import * as S from './Modal.styles'

const ANIMATION_DURATION = 300

const animationsConfig = {
  open: {
    wrapper: {
      keyframes: [{ opacity: 1 }],
      timings: {
        duration: ANIMATION_DURATION,
        fill: 'forwards',
        easing: 'cubic-bezier(.17,.67,.21,.97)'
      }
    },
    content: {
      keyframes: [{ opacity: 1, transform: 'translate3d(0, 0, 0)' }],
      timings: {
        duration: ANIMATION_DURATION,
        fill: 'forwards',
        easing: 'cubic-bezier(.17,.67,.21,.97)'
      }
    }
  },
  close: {
    wrapper: {
      keyframes: [{ opacity: 0 }],
      timings: {
        duration: ANIMATION_DURATION,
        fill: 'forwards',
        easing: 'cubic-bezier(.17,.67,.21,.97)'
      }
    },
    content: {
      keyframes: [{ opacity: 0, transform: 'translate3d(4rem, 0, 0)' }],
      timings: {
        duration: ANIMATION_DURATION,
        fill: 'forwards',
        easing: 'cubic-bezier(.17,.67,.21,.97)'
      }
    }
  }
}

const Modal = ({ testId, children, onClose }) => {
  const [isOpen, setIsOpen] = useState(true)
  const wrapper = useRef()
  const content = useRef()

  useEffect(() => {
    const animations = animationsConfig[isOpen ? 'open' : 'close']

    wrapper.current.animate(animations.wrapper.keyframes, animations.wrapper.timings)

    content.current.animate(animations.content.keyframes, animations.content.timings)
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  const close = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, ANIMATION_DURATION)
  }, [onClose])

  const onClick = useCallback(
    (event) => {
      const target = event.target

      if (target.contains(content.current) && !(target.getAttribute('id') === 'modalInner')) {
        close()
      }
    },
    [close]
  )

  const onKeyDown = useCallback(
    (event) => {
      if (event && event.code === 'Escape') {
        close()
      }
    },
    [close]
  )

  return (
    <S.ModalWrapper ref={wrapper} id="modal" data-testid={testId} onClick={onClick} style={{ opacity: 0 }}>
      <S.ModalInner id="modalInner" ref={content} style={{ opacity: 0, transform: 'translate3d(4rem, 0, 0)' }}>
        <S.ModalCloseButton onClick={close}>
          <IconClose width="20" height="26" />
        </S.ModalCloseButton>
        {React.cloneElement(children, {
          onClose: close
        })}
      </S.ModalInner>
    </S.ModalWrapper>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  testId: PropTypes.string
}

Modal.defaultProps = {
  onClose: () => {},
  isOpen: false,
  testId: ''
}

export default Modal
