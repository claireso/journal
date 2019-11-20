import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import Loader from '@common/components/Loader'

import Pager from '@admin/components/Pager'
import { List, ListHeader } from '@admin/components/List'
import { Heading1 } from '@admin/components/Headings'

import withModalEdition from '@admin/hoc/withModalEdition'
import withNavigate from '@admin/hoc/withNavigate'
import withList from '@admin/hoc/withList'

import Subscription from './Subscription'
import DeleteSubscription from '../containers/Delete'

const ACTION_TYPES = {
  DELETE_SUBSCRIPTION: 'delete_subscription'
}

const Subscriptions = props => {
  const { subscriptions, navigate } = props
  const { pager } = subscriptions

  const onDelete = useCallback(
    (id, event) => {
      event && event.preventDefault()
      navigate({
        action: ACTION_TYPES.DELETE_SUBSCRIPTION,
        id: id
      })
    },
    [navigate]
  )

  return (
    <React.Fragment>
      <ListHeader>
        <Heading1>
          Your subscriptions {pager && <span>({pager.count})</span>}
        </Heading1>
      </ListHeader>

      {subscriptions.isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <List>
            {subscriptions.items.map((subscription, index) => (
              <Subscription key={index} {...subscription} onDelete={onDelete} />
            ))}
          </List>
          <Pager {...pager} navigate={navigate} />

          {props.modal}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

Subscriptions.propTypes = {
  subscriptions: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    pager: PropTypes.shape({
      count: PropTypes.number
    }),
    items: PropTypes.array
  }).isRequired,
  navigate: PropTypes.func.isRequired,
  loadSubscriptions: PropTypes.func.isRequired,
  modal: PropTypes.node
}

const loadData = (params, props) => props.loadSubscriptions(params)

const getModalChildComponent = (id, action) => {
  let component

  switch (action) {
    case ACTION_TYPES.DELETE_SUBSCRIPTION: {
      if (!id) return null
      component = <DeleteSubscription id={id} />
      break
    }
  }

  return component
}

export default compose(
  withNavigate(),
  withModalEdition(getModalChildComponent),
  withList(loadData)
)(Subscriptions)
