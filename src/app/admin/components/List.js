import React from 'react'
import PropTypes from 'prop-types'

const List = (props = {}) => {
  return <ul className="list">{props.children}</ul>
}

List.propTypes = {
  children: PropTypes.node
}

export default List
