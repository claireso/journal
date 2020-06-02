import { Fragment, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import { useSubscriptionsReducer, ACTION_TYPES } from '../reducer'

import Loader from '@components/Loader'
import { List, ListHeader } from '@components/admin/List'
import { Heading1 } from '@components/admin/Headings'
import Pager from '@components/admin/Pager'

import Subscription from './components/Subscription'

const Subscriptions = () => {
  const [
    { items: subscriptions, pager, ...state },
    { loadResources }
  ] = useSubscriptionsReducer()
  const isLoading = ['idle', 'loading'].includes(state.status)

  const router = useRouter()
  const { query, pathname } = router

  useEffect(() => {
    loadResources(query.page)
  }, [query.page, loadResources])

  const navigate = useCallback(
    (params) => {
      router.push({ pathname: pathname, query: { ...query, ...params } })
    },
    [pathname, query, router]
  )

  const onPageChange = useCallback(({ page }) => navigate({ page }), [navigate])

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
        <Heading1>
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
