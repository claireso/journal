/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { renderHook, act } from '@testing-library/react-hooks'

import useMessages, { MessagesProvider } from './useMessages'

describe('useMessages', () => {
  const render = () =>
    renderHook(() => useMessages(), {
      wrapper: ({ children }) => <MessagesProvider>{children}</MessagesProvider>
    })

  it('should display error `missing MessagesProvider`', () => {
    const { result } = renderHook(() => useMessages())

    expect(result.error.message).toEqual('useMessagesContext must be used within a MessagesProvider')
  })

  it('should display a success message', async () => {
    const { result } = render()

    let [messages, actions] = result.current

    act(() => {
      actions.displaySuccessMessage({
        message: 'Your photo has been updated successfully'
      })
    })

    messages = result.current[0]

    expect(messages).toHaveLength(1)
    expect(messages[0]).toEqual({
      status: 'success',
      message: 'Your photo has been updated successfully'
    })
  })

  it('should display an error message', async () => {
    const { result } = render()

    let [messages, actions] = result.current

    act(() => {
      actions.displayErrorMessage({
        message: 'An error has occured'
      })
    })

    messages = result.current[0]

    expect(messages).toHaveLength(1)
    expect(messages[0]).toEqual({
      status: 'error',
      message: 'An error has occured'
    })
  })

  it('should replace an existing message', () => {
    const { result } = render()

    let [messages, actions] = result.current

    act(() => {
      actions.displaySuccessMessage({
        key: 'CRUD',
        message: 'Your photo has been updated successfully'
      })
    })

    messages = result.current[0]
    actions = result.current[1]

    expect(messages).toHaveLength(1)
    expect(messages[0]).toEqual({
      status: 'success',
      key: 'CRUD',
      message: 'Your photo has been updated successfully'
    })

    act(() => {
      actions.displaySuccessMessage({
        key: 'CRUD',
        message: 'Your photo has been deleted successfully'
      })
    })

    messages = result.current[0]

    expect(messages).toHaveLength(1)
    expect(messages[0]).toEqual({
      status: 'success',
      key: 'CRUD',
      message: 'Your photo has been deleted successfully'
    })
  })

  it('should close a message', () => {
    const { result } = render()

    let [messages, actions] = result.current

    act(() => {
      actions.displaySuccessMessage({
        key: 'CRUD',
        message: 'Your photo has been updated successfully'
      })
    })

    messages = result.current[0]

    expect(messages).toHaveLength(1)

    act(() => {
      actions.closeMessage(0)
    })

    messages = result.current[0]

    expect(messages).toHaveLength(0)
  })

  it('should close all messages', () => {
    const { result } = render()

    let [messages, actions] = result.current

    act(() => {
      actions.displaySuccessMessage({
        key: 'CRUD',
        message: 'Your photo has been updated successfully'
      })
    })

    messages = result.current[0]
    actions = result.current[1]

    expect(messages).toHaveLength(1)

    act(() => {
      actions.displayErrorMessage({
        message: 'An error has occured'
      })
    })

    messages = result.current[0]
    actions = result.current[1]

    expect(messages).toHaveLength(2)

    act(() => {
      actions.closeAllMessages(0)
    })

    messages = result.current[0]

    expect(messages).toHaveLength(0)
  })
})
