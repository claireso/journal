import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, wait } from 'react-testing-library'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'

import Login from '../Login'
import callApiMiddleware from '@admin/middleware/callApi'

jest.mock('axios', () => {
  return jest.fn().mockImplementation(({ url }) => {
    switch (url) {
      case '/me':
        return Promise.resolve({ data: { cid: 1 } })

      default:
        return Promise.resolve({ data: {} })
    }
  })
})

const middlewares = [thunk, callApiMiddleware]
const mockStore = configureMockStore(middlewares)

describe('<Login />', () => {
  const renderComponent = () => {
    const store = mockStore({ user: {} })

    const rendered = render(
      <Provider store={store}>
        <Login />
      </Provider>
    )

    return {
      ...rendered,
      store
    }
  }

  test('should render component', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  test('should log in user', async () => {
    const { container, getByLabelText, store } = renderComponent()

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'admin' }
    })
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password' }
    })
    fireEvent.submit(container.querySelector('form'))

    const expectedActions = [
      { type: 'LOGIN_REQUEST' },
      { type: 'LOGIN_SUCCESS', response: {} },
      { type: 'LOAD_USER_REQUEST' },
      { type: 'LOAD_USER_SUCCESS', response: { cid: 1 } }
    ]

    await wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
