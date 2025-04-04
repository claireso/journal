// eslint-disable-next-line
// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { TranslationsProvider } from '@web/hooks/useTranslations'
import * as notifications from '@web/services/notifications'
import SubscriptionRepositoryInMemoryImpl from '@infrastructure/repositories/subscription/SubscriptionRepositoryInMemoryImpl'

import Notifications from './index'

jest.mock('@application/usecases', () => ({
  getSubscription: async () => {
    const repository = new SubscriptionRepositoryInMemoryImpl()
    return await repository.getById(1)
  }
}))
notifications.isSubscriptionValid = jest.fn().mockReturnValue(true)

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
