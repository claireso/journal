import React from 'react'
import PropTypes from 'prop-types'

import { useSpring } from 'react-spring'

import { IconClose } from '@components/Icons'

import * as S from './Flash.styles'

const Flash = ({ status, children, onClose, index, withBorder, ...props }) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  return (
    <S.FlashWrapper
      style={styles}
      status={status}
      withBorder={withBorder}
      {...props}
    >
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
  status: PropTypes.string,
  onClose: PropTypes.func,
  index: PropTypes.number,
  withBorder: PropTypes.bool
}

export default Flash
