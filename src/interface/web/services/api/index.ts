import type { MediaDto, PhotoDto, PhotosDto, PhotoInsertDto, PhotoUpdateDto, SubscriptionsDto } from '@dto'
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
  requester.get<PhotosDto>(
    '/photos',
    { page },
    {
      next: { tags: ['photos_pagination'] },
      ...(options || {})
    }
  )

export const getPhoto = (id: number, options?: RequestInit) => requester.get<PhotoDto>(`/photos/${id}`, {}, options)

export const createPhoto = (data: PhotoInsertDto) => requester.post<PhotoDto, PhotoInsertDto>('/photos', data)

export const deletePhoto = (id: number) => requester.del<void>(`/photos/${id}`)

export const editPhoto = (id: number, data: PhotoUpdateDto) =>
  requester.patch<PhotoDto, PhotoUpdateDto>(`/photos/${id}`, data)

export const getSubscriptions = (page: string, options?: RequestInit) =>
  requester.get<SubscriptionsDto>('/subscriptions', { page: page }, options)

export const deleteSubscription = (id: number) => requester.del<void>(`/subscriptions/${id}`)

export const createMedia = (data: FormData) => requester.post<MediaDto, FormData>('/media', data)

export const getErrorConstructor = () => ApiError
