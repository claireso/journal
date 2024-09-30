import type { Photos, Subscription, Subscriptions, Media, Photo } from '@domain/entities'
import { buildRequester } from './requester'
import ApiError from './ApiError'

const getRootBaseUrl = () => {
  if (typeof window === 'undefined') {
    return (process.env.API_SERVER_URL ?? process.env.NEXT_PUBLIC_API_URL) as string
  }

  return process.env.NEXT_PUBLIC_API_URL as string
}

const requester = buildRequester({
  baseUrl: `${getRootBaseUrl()}/api`,
  // @ts-ignore
  ApiError: ApiError
})

export const getPhotos = (page: string, options?: RequestInit) =>
  requester.get<Photos>(
    '/photos',
    { page },
    {
      next: { tags: ['photos'] },
      ...(options || {})
    }
  )

export const getPhoto = (id: Photo['id'], options?: RequestInit) => requester.get<Photo>(`/photos/${id}`, {}, options)

export const createPhoto = (data: Partial<Photo>) => requester.post<Photo, Partial<Photo>>('/photos', data)

export const deletePhoto = (id: Photo['id']) => requester.del<void>(`/photos/${id}`)

export const editPhoto = (id: Photo['id'], data: Partial<Photo>) =>
  requester.patch<Photo, Partial<Photo>>(`/photos/${id}`, data)

export const getSubscriptions = (page: string, options?: RequestInit) =>
  requester.get<Subscriptions>('/subscriptions', { page: page }, options)

export const deleteSubscription = (id: Subscription['id']) => requester.del<void>(`/subscriptions/${id}`)

export const createMedia = (data: FormData) => requester.post<Media, FormData>('/media', data)

export const getErrorConstructor = () => ApiError
