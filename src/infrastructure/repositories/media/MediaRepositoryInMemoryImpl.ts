import { Media, MediaType, mapRowToMedia } from '@domain/entities'
import { MediaRepository } from '@domain/repositories'

export default class MediaRepositoryInMemoryImpl implements MediaRepository {
  private media: Media[]

  constructor() {
    this.media = [
      {
        id: 1,
        type: MediaType.IMAGE,
        name: 'abc.jpg',
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        size: {
          width: 1640,
          height: 1093
        }
      },
      {
        id: 2,
        type: MediaType.IMAGE,
        name: 'def.jpg',
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        size: {
          width: 800,
          height: 1200
        }
      },
      {
        id: 3,
        type: MediaType.IMAGE,
        name: 'ghi.jpg',
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        size: {
          width: 800,
          height: 800
        }
      },
      {
        id: 4,
        type: MediaType.IMAGE,
        name: 'jkl.jpg',
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        size: {
          width: 1640,
          height: 1093
        }
      }
    ]
  }

  async create(data: Pick<Media, 'type' | 'name' | 'size'>): Promise<Media> {
    const {
      type,
      name,
      size: { width, height }
    } = data

    const lastMedia = this.media.at(-1) as Media
    const newMedia = mapRowToMedia({
      id: lastMedia.id + 1,
      created_at: new Date('2024-10-05T17:12:40.400Z'),
      type,
      name,
      width,
      height
    })
    this.media.push(newMedia)
    return newMedia
  }

  async getById(id: number): Promise<Media | null> {
    const media = this.media.find((_media) => _media.id === id)
    return media || null
  }

  async delete(id: number): Promise<void> {
    this.media = this.media.filter((_media) => _media.id !== id)
  }
}
