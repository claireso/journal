import escape from 'lodash/escape'
import { PhotoRepository, MediaRepository } from '@domain/repositories'
import { Pager, Photos } from '@domain/entities'

export default class PhotoService {
  private repository: PhotoRepository
  private mediaRepository: MediaRepository

  constructor(repository: PhotoRepository, mediaRepository: MediaRepository) {
    this.repository = repository
    this.mediaRepository = mediaRepository
  }

  private cleanPhotoData(data: any) {
    return {
      title: escape(data.title),
      description: escape(data.description),
      color: data.color || null,
      position: data.position,
      media_id: data.media_id,
      updated_at: new Date()
    }
  }

  async create(data: any) {
    // check the existence of the media before creating the photo
    const media = await this.mediaRepository.getById(data.media_id)
    if (media === null) {
      const message = 'Media is required and must exist'
      // logger.error(message)
      throw new Error(message)
      // return Response.json({ message }, { status: 400 })
    }

    // check if the media is already linked to a photo
    const linkedPhoto = await this.repository.getByMediaId(media.id)
    if (linkedPhoto !== null) {
      const message = `Media ${media.id} is already linked to a photo`
      // logger.error(message)
      throw new Error(message)
      // return Response.json({ message }, { status: 400 })
    }

    const cleanedData = this.cleanPhotoData(data)

    return this.repository.create({
      ...cleanedData,
      name: media.name // set a value for "name" to keep legacy working (a database migration is required in the future)
    })
  }

  async update(id: number, data: any) {
    const photo = await this.getById(id)

    const newPhoto = this.cleanPhotoData({
      title: data.title ?? photo.title,
      description: data.description ?? photo.description,
      media_id: data.media_id ?? photo.media_id,
      color: data.color ?? photo.color,
      position: data.position ?? photo.position
    })

    return this.repository.update(id, newPhoto)
  }

  async getById(id: number) {
    const photo = await this.repository.getById(id)

    if (photo === null) {
      throw new Error('Photo not found')
    }

    return photo
  }

  async getByMediaId(mediaId: number) {
    return this.repository.getByMediaId(mediaId)
  }

  async getPreviousPhoto() {
    return this.repository.getPreviousPhoto()
  }

  async delete(id: number, db: any) {
    const photo = await this.getById(id)

    if (photo === null) {
      throw new Error('Not found Photo')
      // return Response.json({}, { status: 404 })
    }

    // on delete photo, delete linked media
    try {
      // start transaction
      // todo: find a way to manage db transactions
      await db.query('BEGIN')
      // delete photo from database
      await this.repository.delete(id)

      if (photo.media_id) {
        // delete media from database
        // todo: delete media file
        await this.mediaRepository.delete(photo.media_id)
      }
      await db.query('COMMIT')
    } catch (e) {
      await db.query('ROLLBACK')
      throw e
    }
  }

  async getPaginatedPhotos(page: number) {
    const pageSize = 10

    const count = await this.repository.countPhotos()
    const totalPages = Math.ceil(count / pageSize)

    if (page > totalPages) {
      throw new Error('Not found')
    }

    const offset = (page - 1) * pageSize

    const photos = await this.repository.getPhotos(offset, pageSize)

    const pager: Partial<Pager> = {
      count,
      totalPages,
      offset,
      limit: pageSize
    }

    if (page > 1) {
      pager.prev = page - 1
      pager.first = 1
    }

    if (page < totalPages) {
      pager.next = page + 1
      pager.last = totalPages
    }

    return {
      items: photos,
      pager
    } as Photos
  }
}
