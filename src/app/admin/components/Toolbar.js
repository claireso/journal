import React from 'react'
import PropTypes from 'prop-types'

import Text from './Text'

const Toolbar = (props = {}) => {
  return <Text align="right">{props.children}</Text>
}

Toolbar.propTypes = {
  children: PropTypes.node
}

export default Toolbar
