import React from 'react'
import PropTypes from 'prop-types'

import Flash from './Flash'
import styled from 'styled-components'

const FlashGroupWrapper = styled.div`
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;

  > div {
    margin: 0;
  }
`

const FlashGroup = props => {
  return (
    <FlashGroupWrapper>
      {props.messages.map((message, index) => (
        <Flash key={index} {...message} onClose={props.onClose} />
      ))}
    </FlashGroupWrapper>
  )
}

FlashGroup.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
}

export default FlashGroup
