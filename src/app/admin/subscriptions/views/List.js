import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

import Loader from '@common/components/Loader'

import Pager from '@admin/components/Pager'
import List from '@admin/components/List'
import { PagerButton } from '@admin/components/Buttons'
import Subscription from './Subscription'
import Toolbar from '@admin/components/Toolbar'
import DeleteSubscription from '../containers/Delete'

const ACTION_TYPES = {
  DELETE_SUBSCRIPTION: 'delete_subscription'
}

class Subscriptions extends React.PureComponent {
  componentDidMount() {
    const query = this.getSearchParams()
    const params = {}

    if (query.page !== undefined) {
      params['page'] = query.page
    }

    this.props.loadSubscriptions(params)
  }

  componentDidUpdate(prevProps) {
    const prevQuery = this.getSearchParams(prevProps.location)
    const query = this.getSearchParams()

    if (prevQuery.page !== query.page) {
      this.props.loadSubscriptions({ page: query.page })
      window.scrollTo(0, 0)
    }
  }

  getSearchParams = loc => {
    if (!loc) loc = this.props.location

    return qs.parse(loc.search.substring(1))
  }

  navigate = (params = {}) => {
    const query = this.getSearchParams()

    const search = qs.stringify({
      ...query,
      ...params
    })

    this.props.navigate(`?${search}`)
  }

  onDelete = (id, event) => {
    event && event.preventDefault()
    this.navigate({
      action: ACTION_TYPES.DELETE_SUBSCRIPTION,
      id: id
    })
  }

  getModal() {
    const query = this.getSearchParams()
    const action = query.action
    const id = Number(query.id)

    if (!action) return null

    const onClose = () => this.navigate({ action: undefined, id: undefined })

    switch (action) {
      case ACTION_TYPES.DELETE_SUBSCRIPTION: {
        if (!id) return null
        return <DeleteSubscription id={id} onClose={onClose} />
      }
    }
  }

  render() {
    const { subscriptions } = this.props
    const { pager } = subscriptions

    return (
      <div>
        {subscriptions.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            {pager && <Toolbar alignRight>{pager.count} subscriptions</Toolbar>}
            <List>
              {subscriptions.items.map((subscription, index) => (
                <Subscription
                  key={index}
                  {...subscription}
                  onDelete={this.onDelete}
                />
              ))}
            </List>

            <Pager {...pager} navigate={page => this.navigate({ page })}>
              {({ items, getItemsProps }) => {
                return items.map(item => (
                  <li key={item.label}>
                    <PagerButton
                      {...getItemsProps({
                        title: item.title,
                        item: item
                      })}
                    >
                      {item.label}
                    </PagerButton>
                  </li>
                ))
              }}
            </Pager>

            {this.getModal()}
          </React.Fragment>
        )}
      </div>
    )
  }
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
  children: PropTypes.node,
  location: PropTypes.object.isRequired,
  loadSubscriptions: PropTypes.func.isRequired
}

export default Subscriptions
