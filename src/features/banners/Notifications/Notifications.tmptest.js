//@TODO restore tests

// import { render, fireEvent, waitFor } from '@testing-library/react'

// import { TranslationsProvider } from '@services/translations/hooks/useTranslations'
// import { getTranslations } from '@services/translations/'
// import * as notifications from '@services/notifications'

// import Notifications from './index'

// describe('<Notifications />', () => {
//   const renderComponent = () =>
//     render(
//       <TranslationsProvider translations={getTranslations('en', 'client')}>
//         <Notifications />
//       </TranslationsProvider>
//     )

//   beforeEach(() => {
//     global.setNotificationPermission()
//   })

//   test('should render component', async () => {
//     const spy = jest.spyOn(notifications, 'getSubscription').mockImplementation(() => Promise.resolve(null))

//     const { container } = renderComponent()

//     await waitFor(() => expect(spy).toHaveBeenCalled())

//     expect(container).toMatchSnapshot()
//     spy.mockRestore()
//   })

//   test('should not render component (user has already subscribed)', async () => {
//     const spy = jest.spyOn(notifications, 'getSubscription').mockImplementation(() => Promise.resolve({}))

//     const { container } = renderComponent()

//     await waitFor(() => expect(spy).toHaveBeenCalled())

//     expect(container).toMatchSnapshot()
//     spy.mockRestore()
//   })

//   test('should not render component (user has blocked notifications)', () => {
//     global.setNotificationPermission('denied')

//     const { container } = renderComponent()

//     expect(container).toMatchSnapshot()
//     global.setNotificationPermission()
//   })

//   test('should subscribe and hide banner', async () => {
//     // mock func subscribe
//     const spy = jest.spyOn(notifications, 'subscribe').mockImplementation(() => Promise.resolve())

//     // mock func getSubscription
//     const spySubscription = jest.spyOn(notifications, 'getSubscription').mockImplementation(() => Promise.resolve(null))

//     const { container, getByText } = renderComponent()

//     await waitFor(() => getByText(/^Enable notifications/i), {
//       container
//     })

//     fireEvent.click(getByText(/^Enable notifications/i))

//     await waitFor(() => expect(spy).toHaveBeenCalled())

//     expect(container).toMatchSnapshot()
//     spy.mockRestore()
//     spySubscription.mockRestore()
//   })

//   test('should not subscribe and hide banner (denied story)', async () => {
//     // mock func subscribe
//     const spy = jest.spyOn(notifications, 'subscribe').mockImplementation(() => Promise.reject())

//     // mock func getSubscription
//     const spySubscription = jest.spyOn(notifications, 'getSubscription').mockImplementation(() => Promise.resolve(null))

//     const { container, getByText } = renderComponent()

//     await waitFor(() => getByText(/^Enable notifications/i), {
//       container
//     })

//     global.setNotificationPermission('denied')

//     fireEvent.click(getByText(/^Enable notifications/i))

//     await waitFor(() => expect(spy).toHaveBeenCalled())

//     expect(container).toMatchSnapshot()
//     spy.mockRestore()
//     spySubscription.mockRestore()
//   })
// })
