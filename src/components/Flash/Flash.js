import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { IconClose } from '@components/Icons'

import * as S from './Flash.styles'

const Flash = ({ status, children, onClose, index, withBorder, ...props }) => {
  const dom = useRef(null)

  useEffect(() => {
    dom.current.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 1000,
      delay: 50,
      easing: 'cubic-bezier(.17,.67,.21,.97)',
      fill: 'forwards'
    })
  }, [])

  return (
    <S.FlashWrapper ref={dom} status={status} withBorder={withBorder} {...props} style={{ opacity: 0 }}>
      {children}
      {onClose && (
        <S.FlashButtonClose
          onClick={(event) => {
            event.preventDefault()
            onClose(index)
          }}
        >
          <IconClose />
        </S.FlashButtonClose>
      )}
    </S.FlashWrapper>
  )
}

Flash.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
  status: PropTypes.string,
  onClose: PropTypes.func,
  withBorder: PropTypes.bool
}

Flash.defaultProps = {
  index: 0,
  status: '',
  onClose: () => {},
  withBorder: false
}

export default Flash
