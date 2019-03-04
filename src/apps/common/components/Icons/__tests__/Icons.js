import React from 'react'
import { render } from 'react-testing-library'

import * as Icons from '../index'

describe('<Icons />', () => {
  test('should render <IconPlus />', () => {
    const { container } = render(<Icons.IconPlus />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconPlus /> with custom sizes', () => {
    const { container } = render(<Icons.IconPlus width="20" height="20" />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconBack />', () => {
    const { container } = render(<Icons.IconBack />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconBack /> with custom sizes', () => {
    const { container } = render(<Icons.IconBack width="20" height="20" />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconUpload />', () => {
    const { container } = render(<Icons.IconUpload />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconUpload /> with custom sizes', () => {
    const { container } = render(<Icons.IconUpload width="20" height="20" />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconClose />', () => {
    const { container } = render(<Icons.IconClose />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconClose /> with custom sizes', () => {
    const { container } = render(<Icons.IconClose width="20" height="20" />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconAngleRight />', () => {
    const { container } = render(<Icons.IconAngleRight />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconAngleRight /> with custom sizes', () => {
    const { container } = render(
      <Icons.IconAngleRight width="20" height="20" />
    )

    expect(container).toMatchSnapshot()
  })

  test('should render <IconPencil />', () => {
    const { container } = render(<Icons.IconPencil />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconPencil /> with custom sizes', () => {
    const { container } = render(<Icons.IconPencil width="20" height="20" />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconDelete />', () => {
    const { container } = render(<Icons.IconDelete />)

    expect(container).toMatchSnapshot()
  })

  test('should render <IconDelete /> with custom sizes', () => {
    const { container } = render(<Icons.IconDelete width="20" height="20" />)

    expect(container).toMatchSnapshot()
  })
})
