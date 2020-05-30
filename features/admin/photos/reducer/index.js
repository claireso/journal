import Router from 'next/router'

import { createResourceManager } from '@services/resources/reducer'
import {
  displaySuccessMessage,
  displayErrorMessage
} from '@services/messages/reducer'
import * as api from '@services/api'

const PhotosResourceManager = createResourceManager({
  actions: {
    loadResources: {
      action: api.getPhotos
    },
    loadResource: {
      action: api.getPhoto
    },
    createResource: {
      action: api.createPhoto,
      onSuccess: () => {
        displaySuccessMessage({
          message: 'Your photo has been created successfully',
          key: 'CRUD_PHOTO'
        })
        navigateToList({ root: true })
      },
      onError: () => {
        displayErrorMessage({
          message: 'An error has occured during the creation. Please retry',
          key: 'CRUD_PHOTO'
        })
        navigateToList()
      }
    },
    editResource: {
      action: api.editPhoto,
      onSuccess: () => {
        displaySuccessMessage({
          message: 'Your photo has been updated successfully',
          key: 'CRUD_PHOTO'
        })
        navigateToList()
      },
      onError: () => {
        displayErrorMessage({
          message: 'An error has occured during the update. Please retry',
          key: 'CRUD_PHOTO'
        })
        navigateToList()
      }
    },
    deleteResource: {
      action: api.deletePhoto,
      onSuccess: () => {
        displaySuccessMessage({
          message: 'Your photo has been deleted successfully',
          key: 'CRUD_PHOTO'
        })
        navigateToList({ root: true })
      },
      onError: () => {
        displayErrorMessage({
          message: 'An error has occured during the deletion. Please retry',
          key: 'CRUD_PHOTO'
        })
        navigateToList()
      }
    }
  }
})

function navigateToList({ root = false } = {}) {
  const _query = {}

  if (!root && Router.router.query.page) {
    _query['page'] = Router.router.query.page
  }

  Router.push({ pathname: '/admin/photos', query: _query })

  window.scrollTo(0, 0)
}

export const ACTION_TYPES = {
  CREATE: 'create_photo',
  EDIT: 'edit_photo',
  DELETE: 'delete_photo'
}

export const {
  Provider: PhotosProvider,
  useReducer: usePhotosReducer,
  INITIAL_STATE
} = PhotosResourceManager
