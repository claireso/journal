import { PhotoInsertDto, PhotoUpdateDto } from '@dto'
import { MediaType, Photo, PhotoPositionType } from '@domain/entities'
import { PhotoRepository } from '@domain/repositories'
import { mapRowToPhoto } from '@domain/entities'

export default class PhotoRepositoryInMemoryImpl implements PhotoRepository {
  private photos: Photo[]

  constructor() {
    this.photos = [
      {
        id: 1,
        name: 'abc.jpg',
        title: '',
        description: '',
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        updated_at: new Date('2024-10-05T17:12:40.400Z'),
        position: PhotoPositionType.LEFT,
        media_id: 1,
        media: {
          id: 1,
          type: MediaType.IMAGE,
          name: 'abc.jpg',
          created_at: new Date('2024-10-05T17:12:40.400Z'),
          size: {
            width: 1640,
            height: 1093
          }
        },
        color: null,
        portrait: false,
        square: false
      },
      {
        id: 2,
        name: 'def.jpg',
        title: '',
        description: '',
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        updated_at: new Date('2024-10-05T17:12:40.400Z'),
        position: PhotoPositionType.CENTER,
        media_id: 2,
        media: {
          id: 2,
          type: MediaType.IMAGE,
          name: 'def.jpg',
          created_at: new Date('2024-10-05T17:12:40.400Z'),
          size: {
            width: 800,
            height: 1200
          }
        },
        color: null,
        portrait: true,
        square: false
      },
      {
        id: 3,
        name: 'ghi.jpg',
        title: '',
        description: '',
        created_at: new Date('2024-10-05T17:12:40.400Z'),
        updated_at: new Date('2024-10-05T17:12:40.400Z'),
        position: PhotoPositionType.CENTER,
        media_id: 3,
        media: {
          id: 3,
          type: MediaType.IMAGE,
          name: 'ghi.jpg',
          created_at: new Date('2024-10-05T17:12:40.400Z'),
          size: {
            width: 800,
            height: 800
          }
        },
        color: null,
        portrait: false,
        square: true
      }
    ]
  }

  async create(data: PhotoInsertDto & { name: string }): Promise<Photo> {
    const lastPhoto = this.photos.at(-1) as Photo

    const newPhoto = mapRowToPhoto({
      photo_id: lastPhoto.id + 1,
      title: data.title,
      description: data.description,
      position: data.position,
      color: data.color,
      photo_created_at: new Date('2024-10-05T17:12:40.400Z'),
      updated_at: new Date('2024-10-05T17:12:40.400Z'),
      media_id: 4,
      media_created_at: new Date('2024-10-05T17:12:40.400Z'),
      media_type: 'image',
      media_name: data.name,
      media_width: 1640,
      media_height: 1093,
      // deprecated fields
      photo_name: data.name,
      portrait: false,
      square: false
    })

    this.photos.push(newPhoto)
    return newPhoto
  }

  async update(id: number, data: PhotoUpdateDto): Promise<Photo> {
    this.photos = this.photos.map((photo) => {
      if (photo.id !== id) {
        return { ...photo }
      }

      return {
        ...photo,
        ...data
      }
    })

    return this.photos.find((photo) => photo.id === id) as Photo
  }

  async getById(id: number): Promise<Photo | null> {
    const photo = this.photos.find((photo) => photo.id === id)
    return photo || null
  }

  async getByMediaId(mediaId: number): Promise<Photo | null> {
    const photo = this.photos.find((photo) => photo.media_id === mediaId)
    return photo || null
  }

  async getPreviousPhoto(): Promise<Photo | null> {
    const photo = this.photos.at(-1)
    return photo || null
  }

  async delete(id: number): Promise<void> {
    this.photos = this.photos.filter((photo) => photo.id !== id)
  }

  async getPhotos(offset: number, limit: number) {
    const photos = this.photos.slice(offset, limit)
    return photos
  }

  async countPhotos(): Promise<number> {
    return this.photos.length
  }
}
