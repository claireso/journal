import React from 'react'
import PropTypes from 'prop-types'

import Flash from './Flash'
import styled from 'styled-components'

const FlashGroupWrapper = styled.div`
  position: relative;
  z-index: 100;

  > div {
    margin: 0;
  }
`

const FlashGroup = props => {
  return (
    <FlashGroupWrapper>
      {props.messages.map((message, index) => (
        <Flash {...message} onClose={props.onClose} key={index} index={index} />
      ))}
    </FlashGroupWrapper>
  )
}

FlashGroup.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
}

export default FlashGroup
