import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spring } from 'react-spring'

import { IconClose } from '@common/components/Icons'

import { ButtonIcon } from './Button'

const mapFlashBackground = {
  default: 'var(--yellow)'
}

const mapFlashBorder = {
  default: 'var(--yellow-darker)'
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

  & + & {
    border-top: 3px solid
      ${props => mapFlashBorder[props.status] || mapFlashBorder['default']};
  }
`

const Flash = ({ status, onClose, children }) => {
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {props => (
        <FlashWrapper style={props} status={status}>
          {children}
          {onClose && (
            <ButtonIcon
              onClick={event => {
                event.preventDefault()
                onClose()
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

Flash.defaultProps = {
  status: 'default'
}

Flash.propTypes = {
  status: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
}

export default Flash
