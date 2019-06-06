import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Photos from '../index'

describe('<Photos />', () => {
  test('should render component', () => {
    const { items: photos, pager } = global.__PHOTOS__
    const { container } = render(<Photos photos={photos} pager={pager} />)

    expect(container).toMatchSnapshot()
  })

  test('should call `pushState` and `popState`', () => {
    window.history.pushState = jest.fn()
    window.onpopstate = jest.fn()

    const { items: photos, pager } = global.__PHOTOS__
    const { getByTitle } = render(<Photos photos={photos} pager={pager} />)

    fireEvent.click(getByTitle('Next page'))

    expect(window.history.pushState).toHaveBeenCalledWith(
      { page: 2 },
      '',
      '?page=2'
    )
    expect(window.onpopstate).toHaveBeenCalledTimes(1)

    fireEvent.click(getByTitle('Last page'))

    expect(window.history.pushState).toHaveBeenCalledWith(
      { page: 19 },
      '',
      '?page=19'
    )
    expect(window.onpopstate).toHaveBeenCalledTimes(2)
  })
})
