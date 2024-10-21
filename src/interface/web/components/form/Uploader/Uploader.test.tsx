import { render, fireEvent, waitFor } from '@testing-library/react'

import Uploader from './index'

describe('<Uploader />', () => {
  const renderComponent = (props = {}) =>
    render(
      <Uploader
        name="uploader"
        accept={['image/jpeg', 'image/png']}
        processing={false}
        onChangeMedia={jest.fn()}
        onError={jest.fn()}
        {...props}
      />
    )

  it('should render uploader', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render uploader with preview', () => {
    const { asFragment } = renderComponent({ preview: 'file.jpg' })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render error', () => {
    const { asFragment } = renderComponent()

    const input = document.querySelector('input[type="file"]')

    if (!input) {
      throw new Error('missing input in dom')
    }

    fireEvent.change(input, {
      target: {
        files: [new File(['(⌐□_□)'], 'mypdf.pdf', { type: 'application/pdf' })]
      }
    })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should change file', async () => {
    const props = { onChangeMedia: jest.fn() }

    const { asFragment } = renderComponent(props)

    const input = document.querySelector('input[type="file"]')

    if (!input) {
      throw new Error('missing input in dom')
    }

    fireEvent.change(input, {
      target: {
        files: [new File(['(⌐□_□)'], 'mypicture.jpg', { type: 'image/jpeg' })]
      }
    })

    await waitFor(() => expect(props.onChangeMedia).toHaveBeenCalled())

    expect(props.onChangeMedia.mock.calls[0][0]).toBeInstanceOf(File)

    expect(asFragment()).toMatchSnapshot()
  })
})
