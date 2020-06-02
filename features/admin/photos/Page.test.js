import { render, waitFor } from '@testing-library/react'

import withTestRouter from '@utils/hoc/withTestRouter'

import Page from '../../../pages/admin/photos/index'

describe('Page photo', () => {
  const renderComponent = (routerProps) => {
    return render(
      withTestRouter(<Page />, {
        pathname: '/admin/photos',
        ...routerProps
      })
    )
  }

  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponseOnce(JSON.stringify(global.__PHOTOS__))
  })

  test('should load and render photos', async () => {
    const { container, getByText } = renderComponent()

    expect(container).toMatchSnapshot()

    await waitFor(() => {
      expect(getByText('Février 2019')).toBeInTheDocument()
    })

    expect(container).toMatchSnapshot()
  })

  test('should display modal create', async () => {
    const { getByText } = renderComponent({
      query: {
        action: 'create_photo'
      }
    })

    await waitFor(() => {
      expect(getByText('Create a photo')).toBeInTheDocument()
    })
  })

  test('should display modal edit', async () => {
    const { getByText } = renderComponent({
      query: {
        action: 'edit_photo',
        id: 199
      }
    })

    await waitFor(() => {
      expect(getByText('Edit photo')).toBeInTheDocument()
    })
  })

  test('should display modal delete', async () => {
    const { getByText } = renderComponent({
      query: {
        action: 'delete_photo',
        id: 199
      }
    })

    await waitFor(() => {
      expect(getByText('Are you sure?')).toBeInTheDocument()
    })
  })
})
