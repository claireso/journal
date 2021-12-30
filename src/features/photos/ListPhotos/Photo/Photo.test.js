import { render } from '@testing-library/react'

import Photo from './index'

describe('<Photo />', () => {
  const renderPhoto = (props = {}) => render(<Photo {...global.__PHOTO__} row={0} {...props} />)

  it('should render photo (landscape center)', () => {
    const { asFragment } = renderPhoto()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render photo (landscape left)', () => {
    const { asFragment } = renderPhoto({ position: 'left' })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render photo (landscape right)', () => {
    const { asFragment } = renderPhoto({ position: 'right' })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render photo (portrait center)', () => {
    const { asFragment } = renderPhoto({ portrait: true })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render photo (square center)', () => {
    const { asFragment } = renderPhoto({ square: true })

    expect(asFragment()).toMatchSnapshot()
  })
})
