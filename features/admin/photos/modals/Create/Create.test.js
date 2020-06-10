import { render, fireEvent, act } from '@testing-library/react'

import Create from './Create'

import PhotosReducer from '../../reducer'

const { PhotosProvider, INITIAL_STATE } = PhotosReducer

const { usePhotosReducer: originalUsePhotosReducer } = PhotosReducer

describe('<Create />', () => {
  const renderComponent = () => {
    return render(
      <PhotosProvider value={INITIAL_STATE}>
        <Create />
      </PhotosProvider>
    )
  }

  afterEach(() => {
    PhotosReducer.usePhotosReducer = originalUsePhotosReducer
  })

  test('should render component', () => {
    const { container } = renderComponent()

    expect(container.querySelector('input[name="color"]')).toBeNull()
    expect(container).toMatchSnapshot()
  })

  test('should submit form', async () => {
    const spySubmit = jest.fn()
    PhotosReducer.usePhotosReducer = () => [
      INITIAL_STATE,
      { createResource: spySubmit }
    ]

    const { container, getByLabelText } = renderComponent()

    fireEvent.change(getByLabelText(/title/i), {
      target: { value: 'Photo title' }
    })
    fireEvent.change(getByLabelText(/description/i), {
      target: { value: 'Photo description' }
    })

    const inputFile = container.querySelector('input[type="file"]')

    await act(async () => {
      await fireEvent.change(inputFile, {
        target: {
          files: [new File(['(⌐□_□)'], 'mypicture.jpg', { type: 'image/jpeg' })]
        }
      })
    })

    fireEvent.change(getByLabelText(/position/i), {
      target: { value: 'center' }
    })

    fireEvent.click(container.querySelector('input[type="submit"]'))

    const expectedResult = new FormData(container.querySelector('form'))

    expect(spySubmit).toHaveBeenCalledWith(expectedResult)
  })

  test('should not submit form', async () => {
    PhotosReducer.usePhotosReducer = () => [{ status: 'pending' }, {}]

    const { container } = renderComponent()

    expect(container.querySelector('input[type="submit"]')).toBeNull()
  })
})
