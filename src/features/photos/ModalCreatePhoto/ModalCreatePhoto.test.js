import { screen, render, fireEvent, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ModalCreatePhoto from './ModalCreatePhoto'

import { MessagesProvider } from '../../messages/useMessages'

describe('<ModalCreatePhoto />', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity
      }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {}
    }
  })

  const renderComponent = (props = {}) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MessagesProvider>
          <ModalCreatePhoto {...props} />
        </MessagesProvider>
      </QueryClientProvider>
    )
  }

  it('should render component', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it.skip('should create photo', async () => {
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

    await waitFor(() => expect(screen.getAllByTestId('preview')))

    fireEvent.change(screen.getByLabelText(/position/i), {
      target: { value: 'center' }
    })

    fireEvent.click(screen.getByTestId('submit'))

    const formData = new FormData(document.querySelector('form'))

    expect(props.onSubmit).toHaveBeenCalledWith(formData)
  })
})
