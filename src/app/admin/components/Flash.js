import React from 'react'
import PropTypes from 'prop-types'

const Flash = ({ status, message }) => {
  let cls = 'flash'

  if (status === 'error') {
    cls += ' flash--error'
  }

  return <div className={cls}>{message}</div>
}

Flash.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Flash
