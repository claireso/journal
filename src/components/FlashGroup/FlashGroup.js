import React from 'react'
import PropTypes from 'prop-types'

import Flash from '../Flash'

import * as S from './FlashGroup.styles'

const FlashGroup = ({ messages, ...props }) => {
  if (!messages.length) return null

  return (
    <S.FlashGroupWrapper>
      {messages.map((message, index) => (
        <Flash status={message.status} onClose={props.onClose} key={index} index={index} withBorder={index > 0}>
          {message.message}
        </Flash>
      ))}
    </S.FlashGroupWrapper>
  )
}

FlashGroup.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      message: PropTypes.string.isRequired
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired
}

export default FlashGroup
