import { Media, mapRowToMedia } from '@domain/entities'
import { MediaRepository } from '@domain/repositories'
import * as queries from './queries'

export default class MediaRepositoryImpl implements MediaRepository {
  private database: any
  private logger: any

  constructor(database: any, logger: any) {
    this.database = database
    this.logger = logger
  }

  async create(data: Pick<Media, 'type' | 'name' | 'size'>): Promise<Media> {
    const {
      type,
      name,
      size: { width, height }
    } = data
    this.logger.info(data, 'Media creation started')
    const result = await this.database.query(queries.insertMedia(), [type, name, width, height])
    this.logger.info({ response: result.rows[0] }, 'Media created successfully')
    return mapRowToMedia(result.rows[0])
  }

  async getById(id: number): Promise<Media | null> {
    this.logger.info({ id }, 'Media getting started')
    const result = await this.database.query(queries.getMediaById(id))
    const row = result.rows[0]
    const response = row ? mapRowToMedia(row) : null
    this.logger.info({ response }, 'Media retrieved successfully')
    return response
  }

  async delete(id: number): Promise<void> {
    this.logger.info({ id }, 'Media deletion started')
    await this.database.query(queries.deleteMedia(id))
    this.logger.info({ id }, 'Media deleted started')
  }
}
