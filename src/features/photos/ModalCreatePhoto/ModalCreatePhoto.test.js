import { screen, render, fireEvent, act } from '@testing-library/react'

import ModalCreatePhoto from './ModalCreatePhoto'

import { MessagesProvider } from '../../messages/useMessages'

describe('<ModalCreatePhoto />', () => {
  const renderComponent = (props = {}) => {
    return render(
      <MessagesProvider>
        <ModalCreatePhoto {...props} />
      </MessagesProvider>
    )
  }

  it('should render component', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should create photo', async () => {
    const props = {
      onSubmit: jest.fn()
    }

    renderComponent(props)

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Photo title' }
    })
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Photo description' }
    })

    const inputFile = document.querySelector('input[type="file"]')

    await act(async () => {
      await fireEvent.change(inputFile, {
        target: {
          files: [new File(['(⌐□_□)'], 'mypicture.jpg', { type: 'image/jpeg' })]
        }
      })
    })

    fireEvent.change(screen.getByLabelText(/position/i), {
      target: { value: 'center' }
    })

    fireEvent.click(screen.getByTestId('submit'))

    const formData = new FormData(document.querySelector('form'))

    expect(props.onSubmit).toHaveBeenCalledWith(formData)
  })
})
