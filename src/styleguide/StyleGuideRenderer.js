import React, { Component, Fragment } from 'react'
import StyleGuideRenderer from 'react-styleguidist/lib/client/rsg-components/StyleGuide/StyleGuideRenderer'
import { createGlobalStyle } from 'styled-components'

import StylesAdmin from '../apps/admin/Styles'
import StylesClient from '../apps/client/Styles'

const OverrideStyles = createGlobalStyle`
  .admin {
    background: transparent;
  }
`

export default class StyleGuideRendererWrapper extends Component {
  render() {
    return (
      <Fragment>
        <StylesAdmin />
        <StylesClient />
        <OverrideStyles />
        <StyleGuideRenderer {...this.props} />
      </Fragment>
    )
  }
}
