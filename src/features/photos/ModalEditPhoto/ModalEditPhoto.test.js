import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ModalEditPhoto from './ModalEditPhoto'

import { MessagesProvider } from '../../messages/useMessages'

import * as api from '@services/api'

describe('<ModalEditPhoto />', () => {
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
          <ModalEditPhoto id={198} {...props} />
        </MessagesProvider>
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    jest.spyOn(api, 'getPhoto').mockImplementation(() => new Promise((resolve) => resolve(global.__PHOTO__)))
    jest.spyOn(api, 'editPhoto')
  })

  afterEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  it('should load photo', async () => {
    renderComponent()

    await waitFor(() => expect(api.getPhoto).toHaveBeenCalled())

    expect(api.getPhoto.mock.calls[0][0]).toEqual(198)

    await waitFor(() => expect(screen.getByDisplayValue('Single photography')).toBeInTheDocument())
  })

  it.skip('should edit photo', async () => {
    const props = {
      onSubmit: jest.fn()
    }

    renderComponent(props)

    await waitFor(() => expect(screen.getByDisplayValue('Single photography')).toBeInTheDocument())

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Photo title' }
    })

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Photo description' }
    })

    await act(async () => {
      await fireEvent.change(document.querySelector('input[type="file"]'), {
        target: {
          files: [new File(['(⌐□_□)'], 'mypicture.jpg', { type: 'image/jpeg' })]
        }
      })
    })

    await waitFor(() => expect(screen.getAllByTestId('preview')))

    fireEvent.change(screen.getByLabelText(/position/i), { target: { value: 'left' } })

    fireEvent.click(screen.getByTestId('submit'))

    const formData = new FormData(document.querySelector('form'))

    expect(props.onSubmit).toHaveBeenCalledWith({ id: 198, data: formData })
  })
})
