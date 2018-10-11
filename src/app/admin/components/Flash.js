import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spring } from 'react-spring'

import { ButtonIcon } from './Buttons'
import { IconClose } from './Icons'

const mapFlashBackground = {
  default: 'var(--primary)',
  error: 'var(--error)',
  success: 'var(--success)'
}

const FlashWrapper = styled.div`
  background: ${props =>
    mapFlashBackground[props.status] || mapFlashBackground['default']};
  color: var(--white);
  font-size: 1.4rem;
  margin: 0 0 var(--gutter);
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

const Flash = ({ status, message, onClose, index }) => {
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {props => (
        <FlashWrapper style={props} status={status}>
          {message}
          {onClose && (
            <ButtonIcon
              onClick={event => {
                event.preventDefault()
                onClose(index)
              }}
            >
              <IconClose />
            </ButtonIcon>
          )}
        </FlashWrapper>
      )}
    </Spring>
  )
}

Flash.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  index: PropTypes.number
}

export default Flash
