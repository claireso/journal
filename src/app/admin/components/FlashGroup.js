import React from 'react'
import PropTypes from 'prop-types'

import Flash from './Flash'

const FlashGroup = props => {
  return (
    <div className="flash-group">
      {props.messages.map((message, index) => (
        <Flash key={index} {...message} onClose={props.onClose} />
      ))}
    </div>
  )
}

FlashGroup.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
}

export default FlashGroup
