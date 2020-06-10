import { render, fireEvent } from '@testing-library/react'

import Delete from './Delete'

import PhotosReducer from '../../reducer'

const { PhotosProvider, INITIAL_STATE } = PhotosReducer

const { usePhotosReducer: originalUsePhotosReducer } = PhotosReducer

describe('<Delete />', () => {
  const props = {
    id: 1,
    onClose: jest.fn()
  }

  const renderComponent = () => {
    return render(
      <PhotosProvider value={INITIAL_STATE}>
        <Delete {...props} />
      </PhotosProvider>
    )
  }

  afterEach(() => {
    PhotosReducer.usePhotosReducer = originalUsePhotosReducer
  })

  test('should render component', () => {
    const { container } = renderComponent()

    expect(container).toMatchSnapshot()
  })

  test('should close component', () => {
    const { getByText } = renderComponent()

    fireEvent.click(getByText('Cancel'))

    expect(props.onClose).toHaveBeenCalled()
  })

  test('should delete resource', () => {
    const spyDeleteResource = jest.fn()

    PhotosReducer.usePhotosReducer = () => [
      INITIAL_STATE,
      { deleteResource: spyDeleteResource }
    ]

    const { getByText } = renderComponent()

    fireEvent.click(getByText('Yes'))

    expect(spyDeleteResource).toHaveBeenCalledWith(1)
  })

  test('should not delete resource', () => {
    const spyDeleteResource = jest.fn()

    PhotosReducer.usePhotosReducer = () => [
      { status: 'pending' },
      { deleteResource: spyDeleteResource }
    ]

    const { getByText } = renderComponent()

    fireEvent.click(getByText('Yes'))

    expect(spyDeleteResource).not.toHaveBeenCalled()
  })
})
