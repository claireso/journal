import type { Media } from './media'

// eslint-disable-next-line
export const mapRowToMedia = (data: any): Media => ({
  id: data.id,
  created_at: data.created_at,
  name: data.name,
  type: data.type,
  size: {
    width: data.width,
    height: data.height
  }
})
