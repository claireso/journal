import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'
import { Redirect } from '@reach/router'

import Loader from '../../../../common/components/Loader'

import Pager from '../../components/Pager'
import List from '../../components/List'
import { PagerButton } from '../../components/Buttons'
import Subscription from './Subscription'
import Toolbar from '../../components/Toolbar'

const regex = /^(\d+\/delete)?$/

class Subscriptions extends React.PureComponent {
  componentDidMount() {
    const query = qs.parse(this.props.location.search.substring(1))
    const params = {}

    if (query.page !== undefined) {
      params['page'] = query.page
    }

    this.props.loadSubscriptions(params)
  }

  componentDidUpdate(prevProps) {
    const prevQuery = qs.parse(prevProps.location.search.substring(1))
    const query = qs.parse(this.props.location.search.substring(1))

    if (prevQuery.page !== query.page) {
      this.props.loadSubscriptions({ page: query.page })
      window.scrollTo(0, 0)
    }
  }

  onDelete = (id, event) => {
    event && event.preventDefault()
    this.props.navigate(`${id}/delete`)
  }

  render() {
    const path = this.props['*']
    const { subscriptions } = this.props
    const { pager } = subscriptions

    if (!regex.test(path)) {
      return <Redirect to="/admin/subscriptions" />
    }

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

            <Pager
              {...pager}
              navigate={page => this.props.navigate(`?page=${page}`)}
            >
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

            {this.props.children}
          </React.Fragment>
        )}
      </div>
    )
  }
}

Subscriptions.propTypes = {
  '*': PropTypes.string.isRequired,
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
