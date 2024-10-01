import unescape from '@utils/unescape'
import { mapMediatoMediaDto, mapLegacyMediatoLegacyMediaDto } from '@dto'
import type { Photo, Photos } from '@domain/entities'
import type { PhotoDto, PhotosDto } from './output'

export const mapPhotoToPhotoDto = (photo: Photo): PhotoDto => ({
  id: photo.id,
  title: unescape(photo.title),
  description: unescape(photo.description),
  color: photo.color,
  position: photo.position,
  created_at: photo.created_at,
  updated_at: photo.updated_at,
  media_id: photo.media_id,
  media: photo.media
    ? mapMediatoMediaDto(photo.media)
    : mapLegacyMediatoLegacyMediaDto({
        // legacy
        name: photo.name, // deprecated, moved in media
        portrait: photo.portrait, // deprecated, moved in media
        square: photo.square // deprecated, moved in media
      })
})

export const mapPhotosToPhotosDto = (photos: Photos): PhotosDto => ({
  ...photos,
  items: photos.items.map(mapPhotoToPhotoDto)
})
