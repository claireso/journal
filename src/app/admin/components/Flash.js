import React from 'react'
import PropTypes from 'prop-types'

import { ButtonIcon } from './Links'
import { IconClose } from './Icons'

const Flash = ({ status, message, type, onClose }) => {
  let cls = 'flash'

  if (status === 'error') {
    cls += ' flash--error'
  }

  return (
    <div className={cls}>
      {message}
      {onClose && (
        <ButtonIcon
          icon={<IconClose />}
          onClick={event => {
            event.preventDefault()
            onClose(type)
          }}
        />
      )}
    </div>
  )
}

Flash.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  type: PropTypes.string
}

export default Flash
