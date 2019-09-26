import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, wait, waitForElement } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Create from '../Create'
import callApiMiddleware from '@admin/middleware/callApi'

jest.mock('axios', () => {
  return jest.fn().mockImplementation(({ url }) => {
    switch (url) {
      case '/photos':
        return Promise.resolve({
          data: {
            id: 1,
            title: 'Single photography',
            description: 'Janvier 2019',
            name: '01d2tf2h38pwcd953ans2f64p7.jpg',
            position: 'center',
            portrait: true,
            square: false,
            created_at: '2019-02-03T19:59:00.088Z',
            updated_at: '2019-02-03T19:59:00.088Z'
          }
        })

      default:
        return Promise.resolve({ data: {} })
    }
  })
})

const middlewares = [thunk, callApiMiddleware]
const mockStore = configureMockStore(middlewares)

describe('<Create />', () => {
  const renderComponent = () => {
    const store = mockStore({ user: {}, photos: { isProcessing: false } })

    const rendered = render(
      <Provider store={store}>
        <Create onClose={() => {}} />
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

  test('should create photo', async () => {
    const { container, getByLabelText, store } = renderComponent()

    fireEvent.change(getByLabelText(/title/i), {
      target: { value: 'Title' }
    })

    fireEvent.change(getByLabelText(/description/i), {
      target: { value: 'Description' }
    })

    fireEvent.change(container.querySelector('input[type="file"]'), {
      target: {
        files: [new File(['(⌐□_□)'], 'mypicture.jpg', { type: 'image/jpeg' })]
      }
    })

    await waitForElement(() => container.querySelector('img'))

    fireEvent.submit(container.querySelector('form'))

    const expectedActions = [
      { type: 'CREATE_PHOTO_REQUEST' },
      {
        type: 'CREATE_PHOTO_SUCCESS',
        response: {
          id: 1,
          title: 'Single photography',
          description: 'Janvier 2019',
          name: '01d2tf2h38pwcd953ans2f64p7.jpg',
          position: 'center',
          portrait: true,
          square: false,
          created_at: '2019-02-03T19:59:00.088Z',
          updated_at: '2019-02-03T19:59:00.088Z'
        }
      },
      {
        type: 'ADD_MESSAGE',
        status: 'success',
        key: 'CRUD_PHOTO',
        message: 'Your photo has been created successfully'
      }
    ]

    await wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
