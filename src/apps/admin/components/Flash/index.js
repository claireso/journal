import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import { IconClose } from '@common/components/Icons'

import { ButtonIcon } from '../Buttons'

const mapFlashBackground = {
  default: 'var(--primary)',
  error: 'var(--error)',
  success: 'var(--success)'
}

const FlashWrapper = animated(styled.div`
  background: ${props =>
    mapFlashBackground[props.status] || mapFlashBackground['default']};
  color: var(--white);
  font-size: 1.4rem;
  margin: 0 0 var(--gutter);
  padding: 2rem;
  position: relative;
  text-align: center;

  button {
    align-items: center;
    display: flex;
    position: absolute;
    right: 0.6rem;
    top: 0;
    bottom: 0;
  }
`)

const Flash = ({ status, message, onClose, index }) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  return (
    <FlashWrapper style={styles} status={status}>
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
  )
}

Flash.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string,
  onClose: PropTypes.func,
  index: PropTypes.number
}

export default Flash
