import React from 'react'
import PropTypes from 'prop-types'

import Flash from '../Flash'

import * as S from './FlashGroup.styles'

const FlashGroup = ({ messages, ...props }) => {
  if (!messages.length) return null

  return (
    <S.FlashGroupWrapper>
      {messages.map((message, index) => (
        <Flash {...message} onClose={props.onClose} key={index} index={index} />
      ))}
    </S.FlashGroupWrapper>
  )
}

FlashGroup.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
}

export default FlashGroup
