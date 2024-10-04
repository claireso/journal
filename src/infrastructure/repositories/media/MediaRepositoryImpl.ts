import { Media, mapRowToMedia } from '@domain/entities'
import { MediaRepository } from '@domain/repositories'
import * as queries from './queries'
import { revalidateTag, unstable_cache } from 'next/cache'

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
    const response = await unstable_cache(
      async (id: number) => {
        const result = await this.database.query(queries.getMediaById(id))
        const row = result.rows[0]
        return row ? mapRowToMedia(row) : null
      },
      [`media_${id}`],
      {
        tags: [`media_${id}`]
      }
    )(id)
    this.logger.info({ response }, 'Media retrieved successfully')
    return response
  }

  async delete(id: number): Promise<void> {
    this.logger.info({ id }, 'Media deletion started')
    await this.database.query(queries.deleteMedia(id))
    revalidateTag(`media_${id}`)
    this.logger.info({ id }, 'Media deleted started')
  }
}
