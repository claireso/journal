import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'

import ModalEditPhoto from './ModalEditPhoto'

import { PhotosProvider } from '../usePhotos'
import { MessagesProvider } from '../../messages/useMessages'

import * as api from '@services/api'

describe('<ModalEditPhoto />', () => {
  const formatPhoto = (photo) => ({
    ...photo,
    source: `/uploads/${photo.source}`
  })

  const renderComponent = ({ detail, ...props } = {}) => {
    const data = {
      photos: {
        items: global.__PHOTOS__.items.map(formatPhoto),
        pager: global.__PHOTOS__.pager
      },
      isLoading: false,
      isProcessing: false,
      detail: detail || null
    }

    return render(
      <MessagesProvider>
        <PhotosProvider value={data}>
          <ModalEditPhoto id={198} {...props} />
        </PhotosProvider>
      </MessagesProvider>
    )
  }

  beforeEach(() => {
    jest.spyOn(api, 'editPhoto')
    jest.spyOn(api, 'getPhoto')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should edit photo', async () => {
    const props = {
      onClose: jest.fn()
    }

    const { asFragment } = renderComponent(props)

    expect(asFragment()).toMatchSnapshot()
    expect(api.getPhoto).not.toHaveBeenCalled()

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

    fireEvent.change(screen.getByLabelText(/position/i), { target: { value: 'left' } })

    fireEvent.click(screen.getByTestId('submit'))

    const formData = new FormData(document.querySelector('form'))

    expect(api.editPhoto).toHaveBeenCalledWith(198, formData)

    await waitFor(() => expect(props.onClose).toHaveBeenCalled())
  })

  it('should load photo', () => {
    const props = {
      id: 1
    }

    renderComponent(props)

    expect(api.getPhoto).toHaveBeenCalledWith(1)
  })

  it('should display detail', () => {
    const props = {
      detail: global.__PHOTO__,
      id: 1
    }

    const { asFragment } = renderComponent(props)

    expect(asFragment()).toMatchSnapshot()
  })
})
