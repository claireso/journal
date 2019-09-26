import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'

import Form from '../Form'

describe('<Form />', () => {
  test('should render form', () => {
    const { container } = render(<Form isProcessing={false} />)

    expect(container).toMatchSnapshot()
  })

  test('should prefill form with photo data', () => {
    const { container } = render(
      <Form isProcessing={false} photo={global.__PHOTO__} />
    )

    expect(container).toMatchSnapshot()
  })

  test('should submit form', async () => {
    const spyOnSubmit = jest.fn()
    const { container, getByLabelText } = render(
      <Form isProcessing={false} onSubmit={spyOnSubmit} />
    )

    fireEvent.change(getByLabelText(/title/i), {
      target: {
        value: 'my new photo'
      }
    })

    fireEvent.change(getByLabelText(/description/i), {
      target: {
        value: 'my new photo description'
      }
    })

    fireEvent.change(getByLabelText(/position/i), {
      target: {
        value: 'center'
      }
    })

    fireEvent.change(container.querySelector('input[type="file"]'), {
      target: {
        files: [new File(['(⌐□_□)'], 'mypicture.jpg', { type: 'image/jpeg' })]
      }
    })

    await waitForElement(() => container.querySelector('img'))

    fireEvent.submit(container.querySelector('form'))

    expect(spyOnSubmit).toHaveBeenCalledTimes(1)

    const dataAsFormData = spyOnSubmit.mock.calls[0][0]

    expect(dataAsFormData.get('title')).toEqual('my new photo')
    expect(dataAsFormData.get('description')).toEqual(
      'my new photo description'
    )
    expect(dataAsFormData.get('position')).toEqual('center')
  })

  test('should display loader instead of submit button', () => {
    const spyOnSubmit = jest.fn()
    const { container } = render(
      <Form isProcessing={true} onSubmit={spyOnSubmit} />
    )

    expect(container).toMatchSnapshot()

    fireEvent.submit(container.querySelector('form'))

    expect(spyOnSubmit).toHaveBeenCalledTimes(0)
  })
})
