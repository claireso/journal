import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, wait } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Edit from '../Edit'
import callApiMiddleware from '@admin/middleware/callApi'

jest.mock('axios', () => {
  return jest.fn().mockImplementation(({ url }) => {
    switch (url) {
      case '/photos/1':
        return Promise.resolve({
          data: {
            id: 1,
            title: 'Single photography edit',
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

describe('<Edit />', () => {
  const renderComponent = (props = {}) => {
    const store = mockStore({ user: {}, photos: { isProcessing: false } })

    const rendered = render(
      <Provider store={store}>
        <Edit onClose={() => {}} {...props} id={1} />
      </Provider>
    )

    return {
      ...rendered,
      store
    }
  }

  test('should render component', () => {
    const { container } = renderComponent({ photo: global.__PHOTO__ })

    expect(container).toMatchSnapshot()
  })

  test('should load photo', async () => {
    const { container, store } = renderComponent()

    expect(container).toMatchSnapshot()

    const expectedActions = [
      { type: 'LOAD_PHOTO_REQUEST' },
      {
        type: 'LOAD_PHOTO_SUCCESS',
        response: {
          id: 1,
          title: 'Single photography edit',
          description: 'Janvier 2019',
          name: '01d2tf2h38pwcd953ans2f64p7.jpg',
          position: 'center',
          portrait: true,
          square: false,
          created_at: '2019-02-03T19:59:00.088Z',
          updated_at: '2019-02-03T19:59:00.088Z'
        }
      }
    ]

    await wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('should edit photo', async () => {
    const { container, getByLabelText, store } = renderComponent({
      photo: global.__PHOTO__
    })

    fireEvent.change(getByLabelText(/title/i), {
      target: {
        value: 'Single photography edit'
      }
    })

    fireEvent.submit(container.querySelector('form'))

    const expectedActions = [
      { type: 'EDIT_PHOTO_REQUEST' },
      {
        type: 'EDIT_PHOTO_SUCCESS',
        response: {
          id: 1,
          title: 'Single photography edit',
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
        message: 'Your photo has been updated successfully'
      }
    ]

    await wait(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
