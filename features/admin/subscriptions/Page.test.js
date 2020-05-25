import { render, waitFor } from '@testing-library/react'

import withTestRouter from '@utils/hoc/withTestRouter'

import Page from '../../../pages/admin/subscriptions/index'

describe('Page subscriptions', () => {
  const renderComponent = (routerProps) => {
    return render(
      withTestRouter(<Page />, {
        pathname: '/admin/subscriptions',
        ...routerProps
      })
    )
  }

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(global.__SUBSCRIPTIONS__))
  })

  test('should load and render subscriptions', async () => {
    const { container, getByText } = renderComponent()

    expect(container).toMatchSnapshot()

    await waitFor(() => {
      expect(getByText('https://fcm.googleapis.com/')).toBeInTheDocument()
    })

    expect(container).toMatchSnapshot()
  })

  test('should display modal delete', async () => {
    const { getByText } = renderComponent({
      query: {
        action: 'delete_subscription',
        id: 199
      }
    })

    await waitFor(() => {
      expect(getByText('Are you sure?')).toBeInTheDocument()
    })
  })
})
