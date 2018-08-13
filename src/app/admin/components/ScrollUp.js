import React from 'react'
import PropTypes from 'prop-types'

class ScrollUp extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.uri !== this.props.uri) {
      window.scrollTo(0, 0)
    }
  }
  render() {
    return this.props.children
  }
}

ScrollUp.propTypes = {
  uri: PropTypes.string,
  children: PropTypes.node
}

export default ScrollUp
