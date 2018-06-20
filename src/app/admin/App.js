import React from 'react'

import Page from './components/Page'
import { AdminTabs } from './components/tabs'

export default ({ children, location, ...props }) => {
  return (
    <Page>
      <AdminTabs />
      { children }
    </Page>
  )
}