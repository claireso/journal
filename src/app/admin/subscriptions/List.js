import React from 'react'
import PropTypes from 'prop-types'

import Page from '../components/Page'
import Pager from '../components/Pager'
import List from '../components/List'
import { AdminTabs } from '../components/tabs'
import Subscription from './Subscription'
import Toolbar from '../components/Toolbar'

const Subscriptions = ({ subscriptions = [], pager = {} } = {}) => {
  return (
    <div>
      <Toolbar alignRight>{pager.count} subscriptions</Toolbar>
      <List>
        {subscriptions.map((subscription, index) => (
          <Subscription key={index} {...subscription} />
        ))}
      </List>
      <Pager baseUrl="/admin/subscriptions/page" {...pager} />
    </div>
  )
}

Subscriptions.propTypes = {
  // subscriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  // pager: PropTypes.object.isRequired
}

export default Subscriptions
