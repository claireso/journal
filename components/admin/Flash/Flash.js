import React from 'react'
import PropTypes from 'prop-types'

import { useSpring } from 'react-spring'

import { IconClose } from '@components/Icons'
import { ButtonIcon } from '../Buttons'

import * as S from './Flash.styles'

const Flash = ({ status, message, onClose, index }) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  return (
    <S.FlashWrapper style={styles} status={status}>
      {message}
      {onClose && (
        <ButtonIcon
          onClick={(event) => {
            event.preventDefault()
            onClose(index)
          }}
        >
          <IconClose />
        </ButtonIcon>
      )}
    </S.FlashWrapper>
  )
}

Flash.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string,
  onClose: PropTypes.func,
  index: PropTypes.number
}

export default Flash
