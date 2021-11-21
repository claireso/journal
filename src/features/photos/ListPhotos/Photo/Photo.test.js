import { render } from '@testing-library/react'

import Photo from './index'

describe('<Photo />', () => {
  const renderPhoto = (props = {}) => render(<Photo {...global.__PHOTO__} row={0} {...props} />)

  test('should render photo (landscape center)', () => {
    const { container } = renderPhoto()

    expect(container).toMatchSnapshot()
  })

  test('should render photo (landscape left)', () => {
    const { container } = renderPhoto({ position: 'left' })

    expect(container).toMatchSnapshot()
  })

  test('should render photo (landscape right)', () => {
    const { container } = renderPhoto({ position: 'right' })

    expect(container).toMatchSnapshot()
  })

  test('should render photo (portrait center)', () => {
    const { container } = renderPhoto({ portrait: true })

    expect(container).toMatchSnapshot()
  })

  test('should render photo (square center)', () => {
    const { container } = renderPhoto({ square: true })

    expect(container).toMatchSnapshot()
  })
})
