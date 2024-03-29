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

export const getPhoto = (id: number, options?: RequestInit) => requester.get<Photo>(`/photos/${id}`, {}, options)

export const createPhoto = (data: FormData) => requester.post<Photo, FormData>('/photos', data)

export const deletePhoto = (id: number) => requester.del<void>(`/photos/${id}`)

export const editPhoto = (id: number, data: FormData) => requester.patch<Photo, FormData>(`/photos/${id}`, data)

export const getSubscriptions = (page: string, options?: RequestInit) =>
  requester.get<Subscriptions>('/subscriptions', { page: page }, options)

export const deleteSubscription = (id: number) => requester.del<void>(`/subscriptions/${id}`)

export const getErrorConstructor = () => ApiError
