import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { TranslationsProvider } from '@hooks/useTranslations'
import * as notifications from '@services/notifications'

import Notifications from './index'

describe('<Notifications />', () => {
  const renderComponent = () =>
    render(
      <TranslationsProvider namespace="client">
        <Notifications />
      </TranslationsProvider>
    )

  beforeEach(() => {
    global.setNotificationPermission()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render component', async () => {
    const getSubscription = jest.spyOn(notifications, 'getSubscription').mockImplementation(() => Promise.resolve(null))

    renderComponent()

    await waitFor(() => expect(getSubscription).toHaveBeenCalled())

    await waitFor(() => {
      expect(screen.getByText('Enable notifications to be alerted of new publication')).toBeInTheDocument()
    })
  })

  it('should not render component (user has already subscribed)', async () => {
    const getSubscription = jest.spyOn(notifications, 'getSubscription').mockImplementation(() => Promise.resolve({}))

    renderComponent()

    await waitFor(() => expect(getSubscription).toHaveBeenCalled())

    await waitFor(() => {
      expect(screen.queryByText('Enable notifications to be alerted of new publication')).not.toBeInTheDocument()
    })
  })

  it('should not render component (user has blocked notifications)', () => {
    global.setNotificationPermission('denied')

    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
    global.setNotificationPermission()
  })

  it('should subscribe and hide banner', async () => {
    // mock func subscribe
    const subscribe = jest.spyOn(notifications, 'subscribe').mockImplementation(() => Promise.resolve())

    // mock func getSubscription
    jest.spyOn(notifications, 'getSubscription').mockImplementation(() => Promise.resolve(null))

    renderComponent()

    await waitFor(() => screen.getByText(/^Enable notifications/i))

    fireEvent.click(screen.getByText(/^Enable notifications/i))

    await waitFor(() => expect(subscribe).toHaveBeenCalled())
    await waitFor(() => {
      expect(screen.queryByText('Enable notifications to be alerted of new publication')).not.toBeInTheDocument()
    })
  })

  it('should not subscribe and hide banner (denied story)', async () => {
    // mock func subscribe
    const subscribe = jest.spyOn(notifications, 'subscribe').mockImplementation(() => Promise.reject())

    // mock func getSubscription
    jest.spyOn(notifications, 'getSubscription').mockImplementation(() => Promise.resolve(null))

    renderComponent()

    await waitFor(() => screen.getByText(/^Enable notifications/i))

    global.setNotificationPermission('denied')

    fireEvent.click(screen.getByText(/^Enable notifications/i))

    await waitFor(() => expect(subscribe).toHaveBeenCalled())

    await waitFor(() => {
      expect(screen.queryByText('Enable notifications to be alerted of new publication')).not.toBeInTheDocument()
    })
  })
})
