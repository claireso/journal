import React from 'react'
import PropTypes from 'prop-types'

import * as S from './ErrorBoundary.styles'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static propTypes = {
    children: PropTypes.node
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message,
      errorStack: error.stack
    }
  }

  onRefresh = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <S.ErrorBoundaryWrapper>
          <h1>Oups, something went wrong.</h1>
          <p>
            <S.RefreshButton onClick={this.onRefresh}>
              Refresh the page
            </S.RefreshButton>
          </p>
          {!process.env.isProduction && (
            <code>
              {this.state.errorMessage} <br />
              {this.state.errorStack}
            </code>
          )}
        </S.ErrorBoundaryWrapper>
      )
    }

    return this.props.children
  }
}
