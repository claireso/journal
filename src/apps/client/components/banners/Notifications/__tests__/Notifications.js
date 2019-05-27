import React from 'react'
import { render, fireEvent, waitForElement } from 'react-testing-library'

import { TranslationsProvider } from '@common/context/Translations'
import notifications from '@common/utils/notifications'

import Notifications from '../index'

describe('<Notifications />', () => {
  const renderComponent = () =>
    render(
      <TranslationsProvider translations={global.__TRANSLATIONS__.client}>
        <Notifications />
      </TranslationsProvider>
    )

  beforeEach(() => {
    global.setNotificationPermission()
  })

  test('should render component', done => {
    const spy = jest
      .spyOn(notifications, 'getSubscription')
      .mockImplementation(() => Promise.resolve(null))

    const { container } = renderComponent()

    setImmediate(() => {
      expect(container).toMatchSnapshot()
      spy.mockRestore()
      done()
    })
  })

  test('should not render component (user has already subscribed)', done => {
    const spy = jest
      .spyOn(notifications, 'getSubscription')
      .mockImplementation(() => Promise.resolve({}))

    const { container } = renderComponent()

    setImmediate(() => {
      expect(container).toMatchSnapshot()
      spy.mockRestore()
      done()
    })
  })

  test('should not render component (user has blocked notifications)', () => {
    global.setNotificationPermission('denied')

    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
    global.setNotificationPermission()
  })

  test('should subscribe and hide banner', async done => {
    // mock func subscribe
    const spy = jest
      .spyOn(notifications, 'subscribe')
      .mockImplementation(() => Promise.resolve())

    // mock func getSubscription
    const spySubscription = jest
      .spyOn(notifications, 'getSubscription')
      .mockImplementation(() => Promise.resolve(null))

    const { container, getByRole } = renderComponent()

    await waitForElement(() => getByRole('button'), { container })

    fireEvent.click(getByRole('button'))

    setImmediate(() => {
      expect(container).toMatchSnapshot()
      spy.mockRestore()
      spySubscription.mockRestore()
      done()
    })
  })

  test('should not subscribe and hide banner (denied story)', async done => {
    // mock func subscribe
    const spy = jest
      .spyOn(notifications, 'subscribe')
      .mockImplementation(() => Promise.reject())

    // mock func getSubscription
    const spySubscription = jest
      .spyOn(notifications, 'getSubscription')
      .mockImplementation(() => Promise.resolve(null))

    const { container, getByRole } = renderComponent()

    await waitForElement(() => getByRole('button'), { container })

    global.setNotificationPermission('denied')

    fireEvent.click(getByRole('button'))

    setImmediate(() => {
      expect(container).toMatchSnapshot()
      spy.mockRestore()
      spySubscription.mockRestore()
      done()
    })
  })
})
