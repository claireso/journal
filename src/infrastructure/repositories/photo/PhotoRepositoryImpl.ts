import { unstable_cache, revalidateTag } from 'next/cache'
import { Photo } from '@domain/entities'
import { PhotoRepository } from '@domain/repositories'
import { PhotoInsertDto, PhotoUpdateDto } from '@dto'
import * as queries from './queries'
import { mapRowToPhoto } from '@domain/entities/photo/mappers'

// @TODO improve type

export default class PhotoRepositoryImpl implements PhotoRepository {
  // eslint-disable-next-line
  private database: any
  // eslint-disable-next-line
  private logger: any
  static cacheLifeTime: number = 3600 * 24 * 4 // 4 days

  // eslint-disable-next-line
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
    revalidateTag('list_photos')
    revalidateTag('list_photos_count')
    this.logger.info('New photo created successfully')
    this.logger.debug({ response: result.rows[0] })
    return mapRowToPhoto(result.rows[0])
  }

  async update(id: number, data: PhotoUpdateDto): Promise<Photo> {
    const fields = Object.entries(data)
      .map((entry, index) => `${entry[0]}=($${index + 1})`)
      .join(',')
    const values = Object.values(data)
    this.logger.info({ id, data }, 'Photo updating started')
    const result = await this.database.query(queries.updatePhoto(id, fields), values)
    revalidateTag('list_photos')
    revalidateTag(`photo_${id}`)
    this.logger.info('Photo updated successfully')
    this.logger.debug({ response: result.rows[0] })
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
      [],
      {
        tags: [`photo_${id}`],
        revalidate: PhotoRepositoryImpl.cacheLifeTime
      }
    )(id)

    this.logger.info('Photo retrieved successfully')
    this.logger.debug({ response })
    return response
  }

  async getByMediaId(mediaId: number): Promise<Photo | null> {
    this.logger.info({ mediaId }, 'Photo getting by mediaId started')
    const result = await this.database.query(queries.getPhotoByMediaId(mediaId))
    const row = result.rows[0]
    this.logger.info('Photo retrieved by mediaId successfully')
    this.logger.debug({ response: row })
    return row ? mapRowToPhoto(row) : null
  }

  async getPreviousPhoto(): Promise<Photo | null> {
    this.logger.info('Previous photo getting started')
    const result = await this.database.query(queries.getPreviousPhoto())
    const row = result.rows[0]
    this.logger.info('Previous photo retrieved successfully')
    this.logger.debug({ response: row })
    return row ? mapRowToPhoto(row) : null
  }

  async delete(id: number): Promise<void> {
    this.logger.info({ id }, 'Photo deletion started')
    await this.database.query(queries.deletePhoto(id))
    revalidateTag('list_photos')
    revalidateTag('list_photos_count')
    revalidateTag(`photo_${id}`)
    this.logger.info('Photo deleted successfully')
  }

  async getPhotos(offset: number, limit: number): Promise<Photo[]> {
    this.logger.info({ offset, limit }, 'Photos page getting started')

    const response = await unstable_cache(
      async (offset: number, limit: number) => {
        const result = await this.database.query(queries.getPhotos(offset, limit))
        return result.rows.map(mapRowToPhoto)
      },
      [],
      {
        tags: ['list_photos'],
        revalidate: PhotoRepositoryImpl.cacheLifeTime
      }
    )(offset, limit)

    this.logger.info('Photos page retrieved successfully')
    this.logger.debug({ response })
    return response
  }

  async countPhotos(): Promise<number> {
    this.logger.info('Photos count started')

    const response = await unstable_cache(
      async () => {
        const result = await this.database.query(queries.count())
        return Number(result.rows[0].count)
      },
      ['list_photos_count'],
      {
        tags: ['list_photos_count'],
        revalidate: PhotoRepositoryImpl.cacheLifeTime
      }
    )()

    this.logger.info('Photos counted successfully')
    this.logger.debug({ response })
    return response
  }
}
