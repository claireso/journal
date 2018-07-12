import React from 'react'
import PropTypes from 'prop-types'
import qs from 'qs'

// import Page from '../components/Page'
import Pager from '../../components/Pager'
import List from '../../components/List'
import Loader from '../../components/Loader'
import { ButtonLink } from '../../components/Links'
import { AdminTabs } from '../../components/tabs'
import Subscription from './Subscription'
import Toolbar from '../../components/Toolbar'

class Subscriptions extends React.Component {

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
      this.props.loadSubscriptions({page: query.page})
      window.scrollTo(0, 0)
    }
  }

  onDelete = (id, event) => {
    event && event.preventDefault()
    this.props.navigate(`${id}/delete`)
  }

  render() {
    const { subscriptions } = this.props
    const { pager } = subscriptions

    return (
      <div>
        {
          subscriptions.isLoading ? (
            <Loader />
          )
          :
          (
            <React.Fragment>
              { pager &&
                <Toolbar alignRight>{pager.count} subscriptions</Toolbar>
              }
              <List>
                {subscriptions.items.map((subscription, index) => (
                  <Subscription key={index} {...subscription} onDelete={ this.onDelete } />
                ))}
              </List>

              <Pager
                  {...pager}
                  navigate={ (page) => this.props.navigate(`?page=${page}`)}
                >
                  { ({items, getItemsProps}) => {
                    return items.map(item => (
                      <li key={ item.label } className="pager__item">
                        <ButtonLink
                          {...getItemsProps({
                            className: 'btn--gray',
                            label: item.label,
                            title: item.title,
                            item: item,
                          })}
                        />
                      </li>
                    ))
                  }}
                </Pager>

              { this.props.children }
            </React.Fragment>
          )
        }
      </div>
    )
  }
}

Subscriptions.propTypes = {
  // subscriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  // pager: PropTypes.object.isRequired
}

export default Subscriptions
