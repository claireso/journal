import path from 'path'
import { unlink } from 'fs/promises'
import { MediaType } from '@domain/entities'
import { NotFoundError } from '@domain/errors'
import { MediaRepository } from '@domain/repositories'
import uploadFile from '@utils/uploadFile'

export default class MediaService {
  private repository: MediaRepository
  private logger: unknown

  constructor(repository: MediaRepository, logger: unknown) {
    this.repository = repository
    this.logger = logger
  }

  async create(file: File) {
    const { filename, width, height } = await uploadFile(file)

    const data = {
      type: MediaType.IMAGE,
      name: filename,
      size: {
        width: width,
        height: height
      }
    }

    return this.repository.create(data)
  }

  async getById(id: number) {
    const media = await this.repository.getById(id)

    if (media === null) {
      throw new NotFoundError(`Not found media`, { cause: { photoId: id } })
    }

    return media
  }

  async delete(id: number) {
    const media = await this.getById(id)

    await this.repository.delete(id)

    // delete media file from the folder
    await unlink(path.resolve('uploads', media.name))
  }
}
