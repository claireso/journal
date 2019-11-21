import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from '@client/components/Button'

const ErrorBoundaryWrapper = styled.div`
  background: #f1f0f0;
  border-radius: 4px;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;

  h1 {
    color: #f31616;
    margin: 0 0 20px;
  }

  p {
    margin: 0;
  }

  code {
    display: block;
    margin: 20px 0 0;
  }
`

const RefreshButton = styled(Button)`
  background: #000;
  border-radius: 2px;
  color: #fff;
  font-size: 14px;
  width: auto;
`

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
        <ErrorBoundaryWrapper>
          <h1>Oups, something went wrong.</h1>
          <p>
            <RefreshButton onClick={this.onRefresh}>
              Refresh the page
            </RefreshButton>
          </p>
          {process.env !== 'production' && (
            <code>
              {this.state.errorMessage} <br />
              {this.state.errorStack}
            </code>
          )}
        </ErrorBoundaryWrapper>
      )
    }

    return this.props.children
  }
}
