import React from 'react'

export default class ScrollUp extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.uri !== this.props.uri) {
      window.scrollTo(0, 0)
    }
  }
  render() {
    return this.props.children
  }
}