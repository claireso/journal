import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, wait } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Delete from '../Delete'
import callApiMiddleware from '@admin/middleware/callApi'

jest.mock('axios', () => {
  return jest.fn().mockImplementation(({ url }) => {
    switch (url) {
      case '/photos/1':
        return Promise.resolve({ data: {} })

      default:
        return Promise.resolve({ data: {} })
    }
  })
})

const middlewares = [thunk, callApiMiddleware]
const mockStore = configureMockStore(middlewares)

describe('<Delete />', () => {
  const renderComponent = () => {
    const store = mockStore({ user: {}, photos: { isProcessing: false } })

    const rendered = render(
      <Provider store={store}>
        <Delete onClose={() => {}} id={1} />
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

  test('should delete photo', async () => {
    const { getByText, store } = renderComponent()

    fireEvent.click(getByText('Yes'))

    const expectedActions = [
      { type: 'DELETE_PHOTO_REQUEST', id: 1 },
      { type: 'DELETE_PHOTO_SUCCESS', response: {}, id: 1 },
      {
        type: 'ADD_MESSAGE',
        status: 'success',
        key: 'CRUD_PHOTO',
        message: 'Your photo has been deleted successfully'
      }
    ]

    await wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
