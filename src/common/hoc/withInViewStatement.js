/* eslint react/no-find-dom-node: 0 */

import React from 'react'
import ReactDom from 'react-dom'

export default WrappedComponent => {
  return class InViewHOC extends React.Component {
    state = {
      inView: false
    }

    componentDidMount() {
      const config = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const isInView = entry.isIntersecting
          this.setState({ inView: isInView })

          if (isInView) {
            observer.unobserve(entry.target)
          }
        })
      }, config)

      observer.observe(ReactDom.findDOMNode(this))
    }
    render() {
      return <WrappedComponent inView={this.state.inView} {...this.props} />
    }
  }
}
