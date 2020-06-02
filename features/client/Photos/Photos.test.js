import { render, fireEvent } from '@testing-library/react'
import Router from 'next/router'

import Photos from './index'

describe('<Photos />', () => {
  const renderComponent = () => {
    const { items: photos, pager } = global.__PHOTOS__

    return render(<Photos photos={photos} pager={pager} />)
  }

  test('should render component', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  test('should navigate', () => {
    Router.push = jest.fn()

    const { getByTitle } = renderComponent()

    fireEvent.click(getByTitle('Next page'))

    expect(Router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: 2 }
    })

    fireEvent.click(getByTitle('Last page'))

    expect(Router.push).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: 19 }
    })
  })
})
