import { Photo } from '@domain/entities'
import { PhotoRepository } from '@domain/repositories'
import * as queries from './queries'
import { mapRowToPhoto } from '@domain/entities/photo/mappers'

export default class PhotoRepositoryImpl implements PhotoRepository {
  private database: any

  constructor(database: any) {
    this.database = database
  }

  async create(data: any): Promise<Photo> {
    const result = await this.database.query(queries.insertPhoto(), [
      data.name,
      data.title,
      data.description,
      data.position,
      data.color,
      data.media_id
    ])
    return mapRowToPhoto(result.rows[0])
  }

  async update(id: number, data: any = {}): Promise<Photo> {
    const fields = Object.entries(data)
      .map((entry, index) => `${entry[0]}=($${index + 1})`)
      .join(',')
    const values = Object.values(data)
    const result = await this.database.query(queries.updatePhoto(id, fields), values)
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
    await this.database.query(queries.deletePhoto(id))
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
