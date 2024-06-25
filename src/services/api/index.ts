import { Photo, Photos, Subscription, Subscriptions } from '@models'
import { buildRequester } from './requester'
import ApiError from './ApiError'

const requester = buildRequester({
  baseUrl: `${process.env.NEXT_PUBLIC_WEBSITE_URL}api`,
  // @ts-ignore
  ApiError: ApiError
})

export const getPhotos = (page: string, options?: RequestInit) =>
  requester.get<Photos>(
    '/photos',
    { page },
    {
      // next: { tags: ['photos'] },
      // next: { revalidate: 60 },
      cache: 'no-cache', // @TODO: implementation of on-demand validation
      ...(options || {})
    }
  )

export const getPhoto = (id: Photo['id'], options?: RequestInit) => requester.get<Photo>(`/photos/${id}`, {}, options)

export const createPhoto = (data: FormData) => requester.post<Photo, FormData>('/photos', data)

export const deletePhoto = (id: Photo['id']) => requester.del<void>(`/photos/${id}`)

export const editPhoto = (id: Photo['id'], data: FormData) => requester.patch<Photo, FormData>(`/photos/${id}`, data)

export const getSubscriptions = (page: string, options?: RequestInit) =>
  requester.get<Subscriptions>('/subscriptions', { page: page }, options)

export const deleteSubscription = (id: Subscription['id']) => requester.del<void>(`/subscriptions/${id}`)

export const getErrorConstructor = () => ApiError
