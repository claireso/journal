import { useEffect } from 'react'
import PropTypes from 'prop-types'

const ScrollUp = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [props.uri])

  return props.children
}

ScrollUp.propTypes = {
  uri: PropTypes.string,
  children: PropTypes.node
}

/** @component */
export default ScrollUp
