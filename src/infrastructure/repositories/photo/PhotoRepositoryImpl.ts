import { Photo } from '@domain/entities'
import { PhotoRepository } from '@domain/repositories'
import { PhotoInsertDto } from '@dto'
import * as queries from './queries'
import { mapRowToPhoto } from '@domain/entities/photo/mappers'
import { revalidateTag, unstable_cache } from 'next/cache'

export default class PhotoRepositoryImpl implements PhotoRepository {
  private database: any
  private logger: any

  constructor(database: any, logger: any) {
    this.database = database
    this.logger = logger
  }

  async create(data: PhotoInsertDto & { name: string }): Promise<Photo> {
    this.logger.info(data, 'Photo creation started')
    const result = await this.database.query(queries.insertPhoto(), [
      data.name,
      data.title,
      data.description,
      data.position,
      data.color,
      data.media_id
    ])
    revalidateTag('photos_pagination_web')
    revalidateTag('photos_pagination')
    revalidateTag('photos_count')
    this.logger.info({ response: result.rows[0] }, 'New photo created successfully')
    return mapRowToPhoto(result.rows[0])
  }

  async update(id: number, data: any = {}): Promise<Photo> {
    const fields = Object.entries(data)
      .map((entry, index) => `${entry[0]}=($${index + 1})`)
      .join(',')
    const values = Object.values(data)
    this.logger.info({ id, data }, 'Photo updating started')
    const result = await this.database.query(queries.updatePhoto(id, fields), values)
    revalidateTag(`photo_${id}`)
    revalidateTag('photos_pagination')
    revalidateTag('photos_pagination_web')
    this.logger.info({ response: result.rows[0] }, 'Photo updated successfully')
    return mapRowToPhoto(result.rows[0])
  }

  async getById(id: number): Promise<Photo | null> {
    this.logger.info({ id }, 'Photo getting started')
    const response = await unstable_cache(
      async (id: number) => {
        const result = await this.database.query(queries.getPhotoById(id))
        const row = result.rows[0]
        return row ? mapRowToPhoto(row) : null
      },
      [`photo_${id}`],
      {
        tags: [`photo_${id}`]
      }
    )(id)
    this.logger.info({ response }, 'Photo retrieved successfully')
    return response
  }

  async getByMediaId(mediaId: number): Promise<Photo | null> {
    this.logger.info({ mediaId }, 'Photo getting by mediaId started')
    const result = await this.database.query(queries.getPhotoByMediaId(mediaId))
    const row = result.rows[0]
    this.logger.info({ response: row }, 'Photo retrieved by mediaId successfully')
    return row ? mapRowToPhoto(row) : null
  }

  async getPreviousPhoto(): Promise<Photo | null> {
    const result = await this.database.query(queries.getPreviousPhoto())
    const row = result.rows[0]
    return row ? mapRowToPhoto(row) : null
  }

  async delete(id: number): Promise<void> {
    this.logger.info({ id }, 'Photo deletion started')
    await this.database.query(queries.deletePhoto(id))
    revalidateTag(`photo_${id}`)
    revalidateTag('photos_count')
    revalidateTag('photos_pagination')
    revalidateTag('photos_pagination_web')
    this.logger.info({ id }, 'Photo deleted successfully')
  }

  async getPhotos(offset: number, limit: number) {
    this.logger.info({ offset, limit }, 'Photos page getting started')
    const response = await unstable_cache(
      async (offset: number, limit: number) => {
        const result = await this.database.query(queries.getPhotos(offset, limit))
        return result.rows.map(mapRowToPhoto)
      },
      [`offset=${offset}_limit=${limit}`],
      {
        tags: ['photos_pagination']
      }
    )(offset, limit)
    this.logger.info({ response }, 'Photos page retrieved successfully')
    return response
  }

  async countPhotos(): Promise<number> {
    this.logger.info('Photos count started')
    const response = await unstable_cache(
      async () => {
        const result = await this.database.query(queries.count())
        return Number(result.rows[0].count)
      },
      ['photos_count'],
      { tags: ['photos_count'] }
    )()
    this.logger.info({ response }, 'Photos counted successfully')
    return response
  }
}
