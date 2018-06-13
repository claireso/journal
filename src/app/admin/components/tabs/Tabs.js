import React from 'react'
import PropTypes from 'prop-types'

const Tabs = (props = {}) => {
  return <ul className="tabs">{props.children}</ul>
}

Tabs.propTypes = {
  children: PropTypes.node
}

export default Tabs
