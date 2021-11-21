import { buildRequester } from './requester'
import Router from 'next/router'

// import { displayErrorMessage } from '../messages/reducer'

const requester = buildRequester({
  baseUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}api`,
  onError: {
    unAuthorized: () => {
      Router.push({ pathname: '/admin/login' })
    },
    internalServerError: () => {
      // displayErrorMessage({
      //   message: 'An error has occured, please retry',
      //   key: 'INTERNAL_ERROR'
      // })
    }
  }
})

export const login = (data) => requester.post('/login', data)

export const logout = () => requester.post('/logout')

export const getMe = () => requester.get('/me')

export const getPhotos = (page) => requester.get('/photos', { page })

export const getPhoto = (id) => requester.get(`/photos/${id}`)

export const createPhoto = (data) => requester.post('/photos', data)

export const deletePhoto = (id) => requester.del(`/photos/${id}`)

export const editPhoto = (id, data) => requester.patch(`/photos/${id}`, data)

export const getSubscriptions = (page) => requester.get('/subscriptions', { page: page })

export const deleteSubscription = (id) => requester.del(`/subscriptions/${id}`)
