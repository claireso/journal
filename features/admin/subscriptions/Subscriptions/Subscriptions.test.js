import { render, waitFor, fireEvent } from '@testing-library/react'

import withTestRouter from '@utils/hoc/withTestRouter'

import { SubscriptionsProvider, INITIAL_STATE } from '../reducer'
import Subscriptions from './Subscriptions'

describe('List Subscriptions', () => {
  const renderComponent = (state = INITIAL_STATE, routerProps = {}) => {
    return render(
      withTestRouter(
        <SubscriptionsProvider value={state}>
          <Subscriptions />
        </SubscriptionsProvider>,
        {
          pathname: '/admin/subscriptions',
          ...routerProps
        }
      )
    )
  }

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(global.__SUBSCRIPTIONS__))
  })

  test('should render loading view [status - idle]', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  test('should render loading view [status - loading]', () => {
    const state = {
      ...INITIAL_STATE,
      status: 'loading'
    }

    const { container } = renderComponent(state)

    expect(container).toMatchSnapshot()
  })

  test('should load and render subscriptions', async () => {
    const { getByText } = renderComponent()

    await waitFor(() => {
      expect(getByText('https://fcm.googleapis.com/')).toBeInTheDocument()
    })
  })

  test('should delete', async () => {
    const push = jest.fn()

    const { getByText, getByTitle } = renderComponent(undefined, { push })

    await waitFor(() => {
      expect(getByText('https://fcm.googleapis.com/')).toBeInTheDocument()
    })

    fireEvent.click(getByTitle('Revoke'))

    expect(push).toHaveBeenCalledWith({
      pathname: '/admin/subscriptions',
      query: {
        action: 'delete_subscription',
        id: 118
      }
    })
  })

  test('should navigate from pager', async () => {
    const push = jest.fn()

    const { getByTitle, getByText } = renderComponent(undefined, { push })

    await waitFor(() => {
      expect(getByText('https://fcm.googleapis.com/')).toBeInTheDocument()
    })

    fireEvent.click(getByTitle(/Next page/i))

    expect(push).toHaveBeenCalledWith({
      pathname: '/admin/subscriptions',
      query: {
        page: 2
      }
    })
  })
})
