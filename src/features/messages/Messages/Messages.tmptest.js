// @TODO restore test

// import { render, fireEvent, act } from '@testing-library/react'

// import withTestRouter from '@utils/hoc/withTestRouter'

// import Messages from './Messages'
// import useMessages, { MessagesProvider } from '../useMessages'
// // import { displaySuccessMessage, displayErrorMessage } from '../reducer'

// describe('<Messages />', () => {
//   const withMessagesProvider = ({children}) => (
//     <MessagesProvider>
//       {children}
//     </MessagesProvider>
//   )
//   const renderComponent = () => render(
//     withTestRouter(
//       withMessagesProvider(
//           <Messages />
//       )

//     )
//   )

//   test('should render component', () => {
//     const { container } = renderComponent()

//     expect(container).toMatchSnapshot()
//   })

//   test('should display success message then close it', () => {

//     const { container, getByText, queryByText } = renderComponent()
//     const [, {displaySuccessMessage}] = useMessages()

//     act(() => {
//       displaySuccessMessage({ message: 'My success message' })
//     })

//     expect(getByText('My success message')).toBeInTheDocument()
//     expect(container).toMatchSnapshot()

//     act(() => {
//       fireEvent.click(container.querySelector('button'))
//     })

//     expect(queryByText('My success message')).toBeNull()
//   })

//   // test('should display error message then close it', () => {
//   //   const { container, getByText, queryByText } = render(withTestRouter(<Messages />))

//   //   act(() => {
//   //     displayErrorMessage({ message: 'My error message' })
//   //   })

//   //   expect(getByText('My error message')).toBeInTheDocument()
//   //   expect(container).toMatchSnapshot()

//   //   act(() => {
//   //     fireEvent.click(container.querySelector('button'))
//   //   })

//   //   expect(queryByText('My error message')).toBeNull()
//   // })

//   // test('should display two messages then edit one', () => {
//   //   const { container, getByText, queryByText } = render(withTestRouter(<Messages />))

//   //   act(() => {
//   //     displaySuccessMessage({ message: 'My success message', key: 'SUCCESS' })
//   //     displayErrorMessage({ message: 'My error message', key: 'ERROR' })
//   //   })

//   //   expect(getByText('My success message')).toBeInTheDocument()
//   //   expect(getByText('My error message')).toBeInTheDocument()
//   //   expect(container).toMatchSnapshot()

//   //   act(() => {
//   //     displaySuccessMessage({
//   //       message: 'My success message edit',
//   //       key: 'SUCCESS'
//   //     })
//   //   })

//   //   expect(queryByText('My success message')).toBeNull()
//   //   expect(getByText('My success message edit')).toBeInTheDocument()
//   //   expect(container).toMatchSnapshot()
//   // })
// })
