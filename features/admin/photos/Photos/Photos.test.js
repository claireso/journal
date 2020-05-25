import { render, waitFor, fireEvent } from '@testing-library/react'

import withTestRouter from '@utils/hoc/withTestRouter'

import { PhotosProvider, INITIAL_STATE } from '../reducer'
import Photos from './Photos'

describe('List Photos', () => {
  const renderComponent = (state = INITIAL_STATE, routerProps = {}) => {
    return render(
      withTestRouter(
        <PhotosProvider value={state}>
          <Photos />
        </PhotosProvider>,
        {
          pathname: '/admin/photos',
          ...routerProps
        }
      )
    )
  }

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(global.__PHOTOS__))
  })

  test('should render loading view [status - idle]', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  test('should render loading view [status - loading]', () => {
    const state = {
      ...INITIAL_STATE,
      status: 'loading'
    }

    const { container } = renderComponent(state)

    expect(container).toMatchSnapshot()
  })

  test('should load and render photos', async () => {
    const { container, getByText } = renderComponent()

    await waitFor(() => {
      expect(getByText('Février 2019')).toBeInTheDocument()
    })

    expect(container).toMatchSnapshot()
  })

  test('should call edit / delete / create photo actions', async () => {
    const push = jest.fn()

    const { getByText, getAllByTitle } = renderComponent(undefined, { push })

    await waitFor(() => {
      expect(getByText('Février 2019')).toBeInTheDocument()
    })

    fireEvent.click(getByText('Add a new photo'))

    expect(push).toHaveBeenNthCalledWith(1, {
      pathname: '/admin/photos',
      query: {
        action: 'create_photo'
      }
    })

    fireEvent.click(getAllByTitle('Edit')[0])

    expect(push).toHaveBeenNthCalledWith(2, {
      pathname: '/admin/photos',
      query: {
        action: 'edit_photo',
        id: 199
      }
    })

    fireEvent.click(getAllByTitle('Delete')[0])

    expect(push).toHaveBeenNthCalledWith(3, {
      pathname: '/admin/photos',
      query: {
        action: 'delete_photo',
        id: 199
      }
    })
  })

  test('should navigate from pager', async () => {
    const push = jest.fn()

    const { getByTitle, getByText } = renderComponent(undefined, { push })

    await waitFor(() => {
      expect(getByText('Février 2019')).toBeInTheDocument()
    })

    fireEvent.click(getByTitle(/Next page/i))

    expect(push).toHaveBeenCalledWith({
      pathname: '/admin/photos',
      query: {
        page: 2
      }
    })
  })
})
