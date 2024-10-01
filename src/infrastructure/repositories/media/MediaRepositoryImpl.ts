import { Media, mapRowToMedia } from '@domain/entities'
import { MediaRepository } from '@domain/repositories'
import * as queries from './queries'

export default class MediaRepositoryImpl implements MediaRepository {
  private database: any

  constructor(database: any) {
    this.database = database
  }

  async create(data: Pick<Media, 'type' | 'name' | 'size'>): Promise<Media> {
    const {
      type,
      name,
      size: { width, height }
    } = data
    const result = await this.database.query(queries.insertMedia(), [type, name, width, height])
    return mapRowToMedia(result.rows[0])
  }

  async getById(id: number): Promise<Media | null> {
    const result = await this.database.query(queries.getMediaById(id))
    const row = result.rows[0]
    return row ? mapRowToMedia(row) : null
  }

  async delete(id: number): Promise<void> {
    await this.database.query(queries.deleteMedia(id))
  }
}
