import React from 'react'
import PropTypes from 'prop-types'

const Tab = (props = {}) => {
  let cls = 'tabs__tab'

  if (props.active) {
    cls += ' is-active'
  }

  return (
    <li className={cls}>
      <a href={props.url}>{props.children}</a>
    </li>
  )
}

Tab.propTypes = {
  active: PropTypes.bool,
  url: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Tab
