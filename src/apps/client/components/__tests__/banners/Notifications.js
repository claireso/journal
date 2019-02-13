import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import TranslationsContext from '@common/context/Translations'
import notifications from '@common/utils/notifications'

import Notifications from '../../banners/Notifications'

describe('<Notifications />', () => {
  test('should render component', () => {
    setNotificationPermission()

    const { container } = render(
      <TranslationsContext.Provider value={__TRANSLATIONS__.client}>
        <Notifications />
      </TranslationsContext.Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('should not render component', () => {
    setNotificationPermission('denied')

    const { container } = render(
      <TranslationsContext.Provider value={__TRANSLATIONS__.client}>
        <Notifications />
      </TranslationsContext.Provider>
    )

    expect(container).toMatchSnapshot()
    setNotificationPermission()
  })

  test('should subscribe and hide banner', async () => {
    setNotificationPermission()

    // mock func subscribe
    const spy = jest
      .spyOn(notifications, 'subscribe')
      .mockImplementation(() => Promise.resolve())

    const { container, getByRole } = render(
      <TranslationsContext.Provider value={__TRANSLATIONS__.client}>
        <Notifications />
      </TranslationsContext.Provider>
    )

    await fireEvent.click(getByRole('button'))

    expect(container).toMatchSnapshot()
    spy.mockRestore()
  })

  test('should not subscribe and hide banner (denied story)', async () => {
    setNotificationPermission()

    // mock func subscribe
    const spy = jest
      .spyOn(notifications, 'subscribe')
      .mockImplementation(() => Promise.reject())

    const { container, getByRole, debug } = render(
      <TranslationsContext.Provider value={__TRANSLATIONS__.client}>
        <Notifications />
      </TranslationsContext.Provider>
    )

    setNotificationPermission('denied')

    await fireEvent.click(getByRole('button'))

    expect(container).toMatchSnapshot()
    spy.mockRestore()
    setNotificationPermission()
  })

  test('should not render component and not call `subscribe` function (registration not expired)', done => {
    setNotificationPermission('granted')

    const spy = jest
      .spyOn(notifications, 'getSubscription')
      .mockImplementation(() => Promise.resolve({}))
    const spySubscribe = jest
      .spyOn(notifications, 'subscribe')
      .mockImplementation(() => Promise.resolve())

    const { container } = render(
      <TranslationsContext.Provider value={__TRANSLATIONS__.client}>
        <Notifications />
      </TranslationsContext.Provider>
    )

    setImmediate(() => {
      expect(spySubscribe).toHaveBeenCalledTimes(0)
      expect(container).toMatchSnapshot()

      spy.mockRestore()
      spySubscribe.mockRestore()
      done()
    })
  })

  test('should not render component and call `subscribe` function (registration expired)', done => {
    setNotificationPermission('granted')

    const spy = jest
      .spyOn(notifications, 'getSubscription')
      .mockImplementation(() => Promise.resolve())
    const spySubscribe = jest
      .spyOn(notifications, 'subscribe')
      .mockImplementation(() => Promise.resolve())

    const { container } = render(
      <TranslationsContext.Provider value={__TRANSLATIONS__.client}>
        <Notifications />
      </TranslationsContext.Provider>
    )

    setImmediate(() => {
      expect(spySubscribe).toHaveBeenCalledTimes(1)
      expect(container).toMatchSnapshot()
      spy.mockRestore()
      spySubscribe.mockRestore()
      done()
    })
  })
})
