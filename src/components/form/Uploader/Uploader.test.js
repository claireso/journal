import { render, fireEvent, waitFor } from '@testing-library/react'

import Uploader from './index'

describe('<Uploader />', () => {
  const props = {
    name: 'uploader',
    accept: ['image/jpeg', 'image/png']
  }

  test('should render uploader', () => {
    const { container } = render(<Uploader {...props} />)

    expect(container).toMatchSnapshot()
  })

  test('should render uploader with preview', () => {
    const { container } = render(<Uploader {...props} preview="file.jpg" />)

    expect(container).toMatchSnapshot()
  })

  test('should render error', () => {
    const { container } = render(<Uploader {...props} />)

    const input = container.querySelector('input[type="file"]')

    fireEvent.change(input, {
      target: {
        files: [new File(['(⌐□_□)'], 'mypdf.pdf', { type: 'application/pdf' })]
      }
    })

    expect(container).toMatchSnapshot()
  })

  test('should change file', async () => {
    const spy = jest.fn()
    const { container } = render(<Uploader {...props} onChange={spy} />)

    const input = container.querySelector('input[type="file"]')

    await fireEvent.change(input, {
      target: {
        files: [new File(['(⌐□_□)'], 'mypicture.jpg', { type: 'image/jpeg' })]
      }
    })

    await waitFor(() => {
      expect(container.querySelector('img')).toBeInTheDocument()
      expect(spy).toHaveBeenCalledWith('data:image/jpeg;base64,KOKMkOKWoV/ilqEp')
      expect(container).toMatchSnapshot()
    })
  })
})
