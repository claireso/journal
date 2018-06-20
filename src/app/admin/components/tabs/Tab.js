import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'

const getProps = ({isCurrent, isPartiallyCurrent}) => {
  return isCurrent || isPartiallyCurrent ? { className: 'is-active' } : null
}

const Tab = (props = {}) => {
  return (
    <li className="tabs__tab">
      <Link to={props.to} getProps={getProps}>
        {props.children}
      </Link>
    </li>
  )
}

Tab.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Tab
