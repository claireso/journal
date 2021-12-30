import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { PhotosProvider } from '../usePhotos'
import { MessagesProvider } from '../../messages/useMessages'
import ModalDeletePhoto from './ModalDeletePhoto'

import * as api from '@services/api'

describe('<ModalDeletePhoto />', () => {
  const renderComponent = (props) =>
    render(
      <MessagesProvider>
        <PhotosProvider>
          <ModalDeletePhoto id={188} {...props} />
        </PhotosProvider>
      </MessagesProvider>
    )

  beforeEach(() => {
    jest.spyOn(api, 'deletePhoto')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render component', () => {
    const { asFragment } = renderComponent()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not delete photo', () => {
    const props = {
      onClose: jest.fn()
    }

    renderComponent(props)

    fireEvent.click(screen.getByText('Cancel'))

    expect(props.onClose).toHaveBeenCalled()
    expect(api.deletePhoto).not.toHaveBeenCalled()
  })

  it('should delete photo', async () => {
    const props = {
      onClose: jest.fn()
    }

    renderComponent(props)

    fireEvent.click(screen.getByText('Yes'))

    expect(api.deletePhoto).toHaveBeenCalledWith(188)

    await waitFor(() => expect(props.onClose).toHaveBeenCalled())
  })
})
