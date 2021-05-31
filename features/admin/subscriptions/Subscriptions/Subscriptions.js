import { Fragment, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import SubscriptionsReducer, { ACTION_TYPES } from '../reducer'

import Loader from '@components/Loader'
import { List, ListHeader } from '@components/List'
import { Heading1 } from '@components/Headings'
import Pager from '@components/Pager'

import Subscription from './components/Subscription'

const Subscriptions = () => {
  const [{ items: subscriptions, pager, ...state }, { loadResources }] =
    SubscriptionsReducer.useSubscriptionsReducer()
  const isLoading = ['idle', 'loading'].includes(state.status)

  const router = useRouter()
  const {
    query: { page },
    pathname
  } = router

  useEffect(() => {
    loadResources(page)
  }, [page, loadResources])

  const navigate = useCallback(
    (params) => {
      const query = {}
      if (page) query.page = page
      router.push({ pathname: pathname, query: { ...query, ...params } })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  )

  const onPageChange = useCallback((page) => navigate({ page }), [navigate])

  const onDelete = useCallback(
    (id) => {
      navigate({
        action: ACTION_TYPES.DELETE,
        id: id
      })
    },
    [navigate]
  )

  return (
    <Fragment>
      <ListHeader>
        <Heading1 data-testid="list-heading">
          Your subscriptions {pager && <span>({pager.count})</span>}
        </Heading1>
      </ListHeader>

      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <List>
            {subscriptions.map((subscription, index) => (
              <Subscription key={index} {...subscription} onDelete={onDelete} />
            ))}
          </List>
          <Pager {...pager} navigate={onPageChange} />
        </Fragment>
      )}
    </Fragment>
  )
}

export default Subscriptions
