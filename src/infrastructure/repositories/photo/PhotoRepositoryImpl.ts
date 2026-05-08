import { revalidateTag } from 'next/cache'
import { type Photo } from '@domain/entities'
import { type PhotoRepository } from '@domain/repositories'
import { type PhotoInsertDto, type PhotoUpdateDto } from '@dto'
import * as queries from './queries'
import { mapRowToPhoto } from '@domain/entities/photo/mappers'

// @TODO improve type

export default class PhotoRepositoryImpl implements PhotoRepository {
  // eslint-disable-next-line
  private database: any
  // eslint-disable-next-line
  private logger: any

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
    revalidateTag('photo_list', 'max')
    this.logger.info('New photo created successfully')
    this.logger.debug({ response: result.rows[0] })
    return mapRowToPhoto(result.rows[0])
  }

  async update(id: number, data: PhotoUpdateDto): Promise<Photo> {
    const entries = Object.entries(data)
    const fields = entries.map(([key], index) => `${key}=($${index + 1})`).join(',')
    const values = [...Object.values(data), id]
    this.logger.info({ id, data }, 'Photo updating started')
    const result = await this.database.query(queries.updatePhoto(fields, entries.length + 1), values)
    revalidateTag('photo_list', 'max')
    revalidateTag(`photo_${id}`, 'max')
    this.logger.info('Photo updated successfully')
    this.logger.debug({ response: result.rows[0] })
    return mapRowToPhoto(result.rows[0])
  }

  async getById(id: number): Promise<Photo | null> {
    this.logger.info({ id }, 'Photo getting started')

    const result = await this.database.query(queries.getPhotoById(id))
    const row = result.rows[0]
    const response = row ? mapRowToPhoto(row) : null

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
    revalidateTag('photo_list', 'max')
    revalidateTag(`photo_${id}`, 'max')
    this.logger.info('Photo deleted successfully')
  }

  async getPhotos(offset: number, limit: number): Promise<Photo[]> {
    this.logger.info({ offset, limit }, 'Photos page getting started')

    const result = await this.database.query(queries.getPhotos(offset, limit))
    const response = result.rows.map(mapRowToPhoto)

    this.logger.info('Photos page retrieved successfully')
    this.logger.debug({ response })
    return response
  }

  async countPhotos(): Promise<number> {
    this.logger.info('Photos count started')

    const result = await this.database.query(queries.count())
    const response = Number(result.rows[0].count)

    this.logger.info('Photos counted successfully')
    this.logger.debug({ response })
    return response
  }
}
