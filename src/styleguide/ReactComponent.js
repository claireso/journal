import React from 'react'
import ReactComponent from 'react-styleguidist/lib/client/rsg-components/ReactComponent'

export default class ReactComponentWrapper extends React.Component {
  render() {
    const { className, ...props } = this.props

    return (
      <div className={className}>
        <ReactComponent {...props} />
      </div>
    )
  }
}
