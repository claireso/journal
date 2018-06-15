import React from 'react'

import { default as _Tabs } from './Tabs'
import { default as _Tab } from './Tab'

export const Tabs = _Tabs
export const Tab = _Tab

export const AdminTabs = ({ active } = {}) => {
  return (
    <Tabs>
      <Tab active={active === 'photos'} url="/admin/photos">
        Photos
      </Tab>
      <Tab active={active === 'subscriptions'} url="/admin/subscriptions">
        Subscriptions
      </Tab>
    </Tabs>
  )
}
