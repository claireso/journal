import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { IconClose } from '@components/Icons'

import * as S from './Flash.styles'

const Flash = ({ status, children, onClose, index, withBorder, ...props }) => {
  const dom = useRef(null)

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

Flash.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
  status: PropTypes.string,
  onClose: PropTypes.func,
  withBorder: PropTypes.bool
}

Flash.defaultProps = {
  index: 0,
  status: 'default',
  onClose: () => {},
  withBorder: false
}

export default Flash
