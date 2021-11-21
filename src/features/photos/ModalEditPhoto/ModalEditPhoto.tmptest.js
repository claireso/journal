//@TODO restore test

// import { render, fireEvent, act } from '@testing-library/react'

// import Edit from './Edit'

// import PhotosReducer from '../../reducer'

// const { PhotosProvider, INITIAL_STATE } = PhotosReducer

// const { usePhotosReducer: originalUsePhotosReducer } = PhotosReducer

// describe('<Edit />', () => {
//   const renderComponent = () => {
//     return render(
//       <PhotosProvider value={INITIAL_STATE}>
//         <Edit id={199} />
//       </PhotosProvider>
//     )
//   }

//   const modelPhoto = (photo) => ({ ...photo, source: `/uploads/${photo.name}` })
//   const single = modelPhoto(global.__PHOTOS__.items[0])

//   afterEach(() => {
//     PhotosReducer.usePhotosReducer = originalUsePhotosReducer
//   })

//   test('should load resource', () => {
//     const spyLoad = jest.fn()

//     PhotosReducer.usePhotosReducer = () => [INITIAL_STATE, { loadResource: spyLoad }]

//     renderComponent()

//     expect(spyLoad).toHaveBeenCalledWith(199)
//   })

//   test('should load resource (mismatch photo id)', () => {
//     const spyLoad = jest.fn()

//     PhotosReducer.usePhotosReducer = () => [
//       { ...INITIAL_STATE, single: modelPhoto(global.__PHOTO__) },
//       { loadResource: spyLoad }
//     ]

//     renderComponent()

//     expect(spyLoad).toHaveBeenCalledWith(199)
//   })

//   test('should fill form with photo', async () => {
//     const spyLoad = jest.fn()

//     PhotosReducer.usePhotosReducer = () => [
//       {
//         ...INITIAL_STATE,
//         single: single
//       },
//       { loadResource: spyLoad }
//     ]

//     const { container } = renderComponent()

//     expect(spyLoad).not.toHaveBeenCalled()

//     //@TODO: test background color
//     expect(container.querySelector('input[name="title"]').value).toEqual('')
//     expect(container.querySelector('input[name="description"]').value).toEqual('Février 2019')
//     expect(container.querySelector('img').src).toEqual('http://localhost/uploads/01d2y7jt2j24dv0s82m9xq729d.jpg')
//     expect(container.querySelector('select').value).toEqual('right')
//   })

//   test('should submit form', async () => {
//     const spySubmit = jest.fn()
//     PhotosReducer.usePhotosReducer = () => [
//       {
//         ...INITIAL_STATE,
//         single: single
//       },
//       { editResource: spySubmit }
//     ]

//     const { container, getByLabelText } = renderComponent()

//     fireEvent.change(getByLabelText(/title/i), {
//       target: { value: 'Photo title' }
//     })
//     fireEvent.change(getByLabelText(/description/i), {
//       target: { value: 'Photo description' }
//     })

//     const inputFile = container.querySelector('input[type="file"]')

//     await act(async () => {
//       await fireEvent.change(inputFile, {
//         target: {
//           files: [new File(['(⌐□_□)'], 'mypicture.jpg', { type: 'image/jpeg' })]
//         }
//       })
//     })

//     fireEvent.change(getByLabelText(/position/i), { target: { value: 'left' } })

//     fireEvent.click(container.querySelector('input[type="submit"]'))

//     const expectedResult = new FormData(container.querySelector('form'))

//     expect(spySubmit).toHaveBeenCalledWith(199, expectedResult)
//   })

//   test('should not submit form', async () => {
//     PhotosReducer.usePhotosReducer = () => [{ ...INITIAL_STATE, status: 'pending', single: single }, {}]

//     const { container } = renderComponent()

//     expect(container.querySelector('input[type="submit"]')).toBeNull()
//   })
// })
