import { Media, mapRowToMedia } from '@domain/entities'
import { MediaRepository } from '@domain/repositories'
import * as queries from './queries'

export default class MediaRepositoryImpl implements MediaRepository {
  // eslint-disable-next-line
  private database: any
  // eslint-disable-next-line
  private logger: any

  // eslint-disable-next-line
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
    this.logger.info('Media created successfully')
    this.logger.debug({ response: result.rows[0] })
    return mapRowToMedia(result.rows[0])
  }

  async getById(id: number): Promise<Media | null> {
    this.logger.info({ id }, 'Media getting started')

    const result = await this.database.query(queries.getMediaById(id))
    const row = result.rows[0]
    const response = row ? mapRowToMedia(row) : null

    this.logger.info('Media retrieved successfully')
    this.logger.debug({ response })
    return response
  }

  async delete(id: number): Promise<void> {
    this.logger.info({ id }, 'Media deletion started')
    await this.database.query(queries.deleteMedia(id))
    this.logger.info('Media deleted successfully')
  }
}
