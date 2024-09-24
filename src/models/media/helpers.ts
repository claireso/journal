import type { Media, LegacyMedia } from './media'

const formatSource = (source: string) => `/uploads/${source}`

// DTO Media
export const formatMedia = (media: any): Media => ({
  id: media.id,
  type: media.type,
  created_at: media.created_at,
  name: media.name,
  size: {
    width: media.width,
    height: media.height
  },
  portrait: media.height > media.width,
  square: media.height === media.width,
  source: formatSource(media.name)
})

export const formatLegacyMedia = (media: any): LegacyMedia => ({
  type: 'image',
  name: media.name,
  portrait: media.portrait,
  square: media.square,
  source: formatSource(media.name)
})
