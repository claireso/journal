// import React from 'react'
import { render } from '@testing-library/react'

import * as Icons from './index'

describe('<Icons />', () => {
  it('should render <IconPlus />', () => {
    const { asFragment } = render(<Icons.IconPlus />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconPlus /> with custom sizes', () => {
    const { asFragment } = render(<Icons.IconPlus width="20" height="20" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconBack />', () => {
    const { asFragment } = render(<Icons.IconBack />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconBack /> with custom sizes', () => {
    const { asFragment } = render(<Icons.IconBack width="20" height="20" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconUpload />', () => {
    const { asFragment } = render(<Icons.IconUpload />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconUpload /> with custom sizes', () => {
    const { asFragment } = render(<Icons.IconUpload width="20" height="20" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconClose />', () => {
    const { asFragment } = render(<Icons.IconClose />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconClose /> with custom sizes', () => {
    const { asFragment } = render(<Icons.IconClose width="20" height="20" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconAngleRight />', () => {
    const { asFragment } = render(<Icons.IconAngleRight />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconAngleRight /> with custom sizes', () => {
    const { asFragment } = render(<Icons.IconAngleRight width="20" height="20" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconPencil />', () => {
    const { asFragment } = render(<Icons.IconPencil />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconPencil /> with custom sizes', () => {
    const { asFragment } = render(<Icons.IconPencil width="20" height="20" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconDelete />', () => {
    const { asFragment } = render(<Icons.IconDelete />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <IconDelete /> with custom sizes', () => {
    const { asFragment } = render(<Icons.IconDelete width="20" height="20" />)

    expect(asFragment()).toMatchSnapshot()
  })
})
