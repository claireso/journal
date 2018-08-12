import React from 'react'

import Tabs from './Tabs'
import Tab from './Tab'

export const AdminTabs = () => {
  return (
    <Tabs>
      <Tab to="/admin/photos">Photos</Tab>
      <Tab to="/admin/subscriptions">Subscriptions</Tab>
    </Tabs>
  )
}
