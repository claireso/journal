import React from 'react'
import { render } from 'react-testing-library'

import Photo from '../index'

describe('<Photo />', () => {
  test('should render photo (landscape center)', () => {
    const { container } = render(<Photo {...__PHOTO__} />)

    expect(container).toMatchSnapshot()
  })

  test('should render photo (landscape left)', () => {
    const { container } = render(<Photo {...__PHOTO__} position="left" />)

    expect(container).toMatchSnapshot()
  })

  test('should render photo (landscape right)', () => {
    const { container } = render(<Photo {...__PHOTO__} position="right" />)

    expect(container).toMatchSnapshot()
  })

  test('should render photo (portrait center)', () => {
    const { container } = render(<Photo {...__PHOTO__} portrait />)

    expect(container).toMatchSnapshot()
  })

  test('should render photo (square center)', () => {
    const { container } = render(<Photo {...__PHOTO__} square />)

    expect(container).toMatchSnapshot()
  })
})
