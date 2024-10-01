import path from 'path'
import { unlink } from 'fs/promises'
import { MediaType } from '@domain/entities'
import { MediaRepository } from '@domain/repositories'
import uploadFile from '@utils/uploadFile'

export default class MediaService {
  private repository: MediaRepository

  constructor(repository: MediaRepository) {
    this.repository = repository
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
    return this.repository.getById(id)
  }

  async delete(id: number, filename: string) {
    await this.repository.delete(id)
    // delete photo from the folder
    await unlink(path.resolve('uploads', filename))
  }
}
