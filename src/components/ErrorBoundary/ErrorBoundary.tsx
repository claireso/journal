import React, { ReactNode } from 'react'

import * as S from './ErrorBoundary.styles'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  errorMessage?: string
  errorStack?: string
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false
  }

  static getDerivedStateFromError(error: Error): State {
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
            <S.RefreshButton onClick={this.onRefresh}>Refresh the page</S.RefreshButton>
          </p>
          {process.env.NODE_ENV !== 'production' && (
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
