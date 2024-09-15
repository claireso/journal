import { EnhancedPhoto, Photos, Subscription, Subscriptions } from '@models'
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

export const getPhoto = (id: EnhancedPhoto['id'], options?: RequestInit) =>
  requester.get<EnhancedPhoto>(`/photos/${id}`, {}, options)

export const createPhoto = (data: FormData) => requester.post<EnhancedPhoto, FormData>('/photos', data)

export const deletePhoto = (id: EnhancedPhoto['id']) => requester.del<void>(`/photos/${id}`)

export const editPhoto = (id: EnhancedPhoto['id'], data: FormData) =>
  requester.patch<EnhancedPhoto, FormData>(`/photos/${id}`, data)

export const getSubscriptions = (page: string, options?: RequestInit) =>
  requester.get<Subscriptions>('/subscriptions', { page: page }, options)

export const deleteSubscription = (id: Subscription['id']) => requester.del<void>(`/subscriptions/${id}`)

export const getErrorConstructor = () => ApiError
