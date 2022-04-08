import { buildRequester } from './requester'
import Router from 'next/router'

const requester = buildRequester({
  baseUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}api`,
  onError: {
    unAuthorized: () => {
      Router.push({ pathname: '/admin/login' })
    }
  }
})

export const login = (data) => requester.post('/login', data)

export const logout = () => requester.post('/logout')

export const getMe = () => requester.get('/me')

export const getPhotos = (page, options) => requester.get('/photos', { page }, options)

export const getPhoto = (id, options) => requester.get(`/photos/${id}`, options)

export const createPhoto = (data) => requester.post('/photos', data)

export const deletePhoto = (id) => requester.del(`/photos/${id}`)

export const editPhoto = (id, data) => requester.patch(`/photos/${id}`, data)

export const getSubscriptions = (page, options) => requester.get('/subscriptions', { page: page }, options)

export const deleteSubscription = (id) => requester.del(`/subscriptions/${id}`)
