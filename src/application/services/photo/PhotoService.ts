import escape from 'lodash/escape'
import { PhotoRepository, MediaRepository } from '@domain/repositories'
import { Pager, Photos } from '@domain/entities'
import { BadRequestError, NotFoundError } from '@domain/errors/errors'
import { PhotoInsertDto, PhotoUpdateDto } from '@dto'

export default class PhotoService {
  private repository: PhotoRepository
  private mediaRepository: MediaRepository
  private logger: any

  constructor(repository: PhotoRepository, mediaRepository: MediaRepository, logger: any) {
    this.repository = repository
    this.mediaRepository = mediaRepository
    this.logger = logger
  }

  private _cleanPhotoData(data: any) {
    return {
      title: escape(data.title),
      description: escape(data.description),
      color: data.color || null,
      position: data.position,
      media_id: data.media_id,
      updated_at: new Date()
    }
  }

  async create(data: PhotoInsertDto) {
    // check if the media exists
    const media = await this.mediaRepository.getById(data.media_id)
    if (media === null) {
      throw new BadRequestError(`Can not create photo because media does not exist`, {
        cause: { data }
      })
    }

    // check if the media isn't linked to a photo
    const linkedPhoto = await this.repository.getByMediaId(media.id)
    if (linkedPhoto !== null) {
      throw new BadRequestError(`Can not create photo because media is already linked to a photo`, {
        cause: { data }
      })
    }

    const cleanedData = this._cleanPhotoData(data)

    return this.repository.create({
      ...cleanedData,
      name: media.name // set a value for "name" to keep legacy working (a database migration is required in the future)
    })
  }

  async update(id: number, data: PhotoUpdateDto) {
    const photo = await this.getById(id)

    const newPhoto = this._cleanPhotoData({
      title: data.title ?? photo.title,
      description: data.description ?? photo.description,
      media_id: data.media_id || photo.media_id,
      color: data.color ?? photo.color,
      position: data.position ?? photo.position
    })

    // The media will be updated
    if (newPhoto.media_id !== photo.media_id) {
      // check if the media exists
      const media = await this.mediaRepository.getById(newPhoto.media_id)
      if (media === null) {
        throw new BadRequestError(`Can not update photo because media does not exist`, {
          cause: { data }
        })
      }

      // check if the media isn't linked to a photo
      const linkedPhoto = await this.repository.getByMediaId(media.id)
      if (linkedPhoto !== null) {
        throw new BadRequestError(`Can not create photo because media is already linked to a photo`, {
          cause: { data }
        })
      }
    }

    return this.repository.update(id, newPhoto)
  }

  async getById(id: number) {
    const photo = await this.repository.getById(id)

    if (photo === null) {
      throw new NotFoundError(`Not found photo`, { cause: { photoId: id } })
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

    if (page < 1 || (totalPages && page > totalPages)) {
      throw new NotFoundError('Page photo not found', { cause: { page } })
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
