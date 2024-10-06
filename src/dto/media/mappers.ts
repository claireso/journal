import { Media, MediaType } from '@domain/entities'
import { MediaDto, LegacyMediaDto } from './output'

const toSourceDTO = (source: string) => `/uploads/${source}`

export const mapMediatoMediaDto = (media: Media): MediaDto => ({
  id: media.id,
  type: media.type,
  created_at: media.created_at,
  name: media.name,
  size: {
    width: media.size.width,
    height: media.size.height
  },
  portrait: media.size.height > media.size.width,
  square: media.size.height === media.size.width,
  source: toSourceDTO(media.name)
})

export const mapLegacyMediatoLegacyMediaDto = (media: {
  name: string
  portrait: boolean
  square: boolean
}): LegacyMediaDto => ({
  type: MediaType.IMAGE,
  name: media.name,
  portrait: media.portrait,
  square: media.square,
  source: toSourceDTO(media.name)
})
