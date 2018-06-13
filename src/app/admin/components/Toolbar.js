import React from 'react'
import PropTypes from 'prop-types'

const Toolbar = (props = {}) => {
  const cls = props.alignRight ? 'align-right' : ''

  return <p className={cls}>{props.children}</p>
}

Toolbar.propTypes = {
  alignRight: PropTypes.bool,
  children: PropTypes.node
}

export default Toolbar
