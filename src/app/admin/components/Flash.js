import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ButtonIcon } from './Buttons'
import { IconClose } from './Icons'

const mapFlashBackground = {
  default: '#8e44ad',
  error: '#f00'
}

const FlashWrapper = styled.div`
  background: ${props => mapFlashBackground[props.status || 'default']};
  color: #fff;
  font-size: 1.4rem;
  margin: 0 0 2rem;
  padding: 1.5rem;
  position: relative;
  text-align: center;

  button {
    align-items: center;
    display: flex;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }
`

const Flash = ({ status, message, type, onClose }) => {
  return (
    <FlashWrapper status={status}>
      {message}
      {onClose && (
        <ButtonIcon
          onClick={event => {
            event.preventDefault()
            onClose(type)
          }}
        >
          <IconClose />
        </ButtonIcon>
      )}
    </FlashWrapper>
  )
}

Flash.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  type: PropTypes.string
}

export default Flash
