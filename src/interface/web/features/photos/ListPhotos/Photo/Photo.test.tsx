// eslint-disable-next-line
// @ts-nocheck
import { render } from '@testing-library/react'

import Photo from './index'

describe('<Photo />', () => {
  const renderPhoto = (props = {}) => render(<Photo row={0} {...props} />)

  it('should render photo (landscape center)', () => {
    const { asFragment } = renderPhoto(global.__PHOTO__)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render photo (landscape left)', () => {
    const { asFragment } = renderPhoto({ ...global.__PHOTO__, position: 'left' })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render photo (landscape right)', () => {
    const { asFragment } = renderPhoto({ ...global.__PHOTO__, position: 'right' })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render photo (portrait center)', () => {
    const { asFragment } = renderPhoto({ ...global.__PHOTO__, media: { ...global.__PHOTO__.media, portrait: true } })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render photo (square center)', () => {
    const { asFragment } = renderPhoto({ ...global.__PHOTO__, media: { ...global.__PHOTO__.media, square: true } })

    expect(asFragment()).toMatchSnapshot()
  })
})
