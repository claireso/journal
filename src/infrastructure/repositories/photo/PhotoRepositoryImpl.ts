import { Photo } from '@domain/entities'
import { PhotoRepository } from '@domain/repositories'
import * as queries from './queries'
import { mapRowToPhoto } from '@domain/entities/photo/mappers'

export default class PhotoRepositoryImpl implements PhotoRepository {
  private database: any
  private logger: any

  constructor(database: any, logger: any) {
    this.database = database
    this.logger = logger
  }

  async create(data: any): Promise<Photo> {
    this.logger.info(data, 'Photo creation started')
    const result = await this.database.query(queries.insertPhoto(), [
      data.name,
      data.title,
      data.description,
      data.position,
      data.color,
      data.media_id
    ])
    this.logger.info(result.rows[0], 'New photo created successfully')
    return mapRowToPhoto(result.rows[0])
  }

  async update(id: number, data: any = {}): Promise<Photo> {
    const fields = Object.entries(data)
      .map((entry, index) => `${entry[0]}=($${index + 1})`)
      .join(',')
    const values = Object.values(data)
    this.logger.info({ id, data }, 'Photo updating started')
    const result = await this.database.query(queries.updatePhoto(id, fields), values)
    this.logger.info(result.rows[0], 'Photo updated successfully')
    return mapRowToPhoto(result.rows[0])
  }

  async getById(id: number): Promise<Photo | null> {
    const result = await this.database.query(queries.getPhotoById(id))
    const row = result.rows[0]
    return row ? mapRowToPhoto(row) : null
  }

  async getByMediaId(mediaId: number): Promise<Photo | null> {
    const result = await this.database.query(queries.getPhotoByMediaId(mediaId))
    const row = result.rows[0]
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
    this.logger.info({ id }, 'Photo deleted successfully')
  }

  async getPhotos(offset: number, limit: number) {
    const result = await this.database.query(queries.getPhotos(offset, limit))
    return result.rows.map(mapRowToPhoto)
  }

  async countPhotos(): Promise<number> {
    const result = await this.database.query(queries.count())
    return Number(result.rows[0].count)
  }
}
