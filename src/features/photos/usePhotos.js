import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import * as api from '@services/api'
import useMessages from '@features/messages/useMessages'

let currentRequest = null

const formatPhoto = (photo) => ({
  ...photo,
  source: `/uploads/${photo.name}`
})

const PhotosContext = React.createContext()

const usePhotosContext = () => {
  const context = useContext(PhotosContext)

  if (context === undefined) {
    throw new Error('usePhotosContext must be used within a PhotosProvider')
  }

  return context
}

export const PhotosProvider = ({ children }) => {
  const [state, setState] = useState({
    photos: {},
    isLoading: true,
    isProcessing: false,
    detail: null
  })

  return <PhotosContext.Provider value={[state, setState]}>{children}</PhotosContext.Provider>
}

PhotosProvider.propTypes = {
  children: PropTypes.any
}

const usePhotos = () => {
  const [, { displaySuccessMessage, displayErrorMessage }] = useMessages()
  const [state, setState] = usePhotosContext()
  const { photos, isLoading, isProcessing, detail } = state

  const updateState = (newState) => setState({ ...state, ...newState })

  const loadPhotos = useCallback(async (page = 1) => {
    if (currentRequest) {
      currentRequest.abort()
    }

    currentRequest = api.getPhotos(page)

    try {
      const response = await currentRequest.ready
      currentRequest = null
      updateState({
        photos: {
          ...response,
          items: response.items.map(formatPhoto)
        },
        isLoading: false
      })
    } catch {
      updateState({
        isLoading: false
      })
    }
  }, [])

  const deletePhoto = useCallback(async (id) => {
    try {
      updateState({ isProcessing: true })
      await api.deletePhoto(id).ready
      updateState({
        isProcessing: false,
        photos: {
          items: photos.items.filter((photo) => photo.id !== id),
          pager: {
            ...photos.pager,
            count: photos.pager.count - 1
          }
        }
      })
      displaySuccessMessage({
        key: 'CRUD_PHOTO',
        message: 'Your photo has been deleted successfully'
      })
    } catch {
      updateState({ isProcessing: false })
      displayErrorMessage({
        key: 'CRUD_PHOTO',
        message: 'An error has occured during the deletion. Please retry'
      })
    }
  }, [])

  const createPhoto = useCallback(async (data) => {
    try {
      updateState({ isProcessing: true })
      const photo = await api.createPhoto(data).ready
      updateState({
        isProcessing: false,
        photos: {
          items: [formatPhoto(photo), ...photos.items],
          pager: {
            ...photos.pager,
            count: photos.pager.count + 1
          }
        }
      })
      displaySuccessMessage({
        key: 'CRUD_PHOTO',
        message: 'Your photo has been created successfully'
      })
    } catch {
      updateState({ isProcessing: false })
      displayErrorMessage({
        key: 'CRUD_PHOTO',
        message: 'An error has occured during the creation. Please retry'
      })
    }
  }, [])

  const editPhoto = useCallback(async (id, data) => {
    try {
      updateState({ isProcessing: true })
      const photo = await api.editPhoto(id, data).ready
      updateState({
        isProcessing: false,
        photos: {
          ...photos,
          items: photos.items.map((_photo) => {
            if (_photo.id !== id) return _photo
            return formatPhoto(photo)
          })
        }
      })
      displaySuccessMessage({
        key: 'CRUD_PHOTO',
        message: 'Your photo has been updated successfully'
      })
    } catch {
      updateState({ isProcessing: false })
      displayErrorMessage({
        message: 'An error has occured during the update. Please retry',
        key: 'CRUD_PHOTO'
      })
    }
  }, [])

  const loadPhoto = useCallback(async (id) => {
    try {
      const photo = await api.getPhoto(id).ready
      updateState({ detail: formatPhoto(photo) })
    } catch {
      updateState({ detail: null })
    }
  }, [])

  return [
    {
      data: photos.items,
      pager: photos.pager,
      isLoading,
      isProcessing,
      detail
    },
    {
      loadPhotos,
      loadPhoto,
      deletePhoto,
      createPhoto,
      editPhoto
    }
  ]
}

export default usePhotos
