import fs from 'fs'
// import { Jimp } from 'jimp'
import sharp from 'sharp'
import { MediaRepository } from '@domain/repositories'
import MediaRepositoryInMemoryImpl from '@infrastructure/repositories/media/MediaRepositoryInMemoryImpl'
import MediaService from './MediaService'

describe('application/MediaService', () => {
  let mediaRepository: MediaRepository
  let mediaService: MediaService

  const createFakeImageFile = async () => {
    const buffer = await sharp({
      create: { width: 3, height: 3, channels: 4, background: { r: 255, g: 0, b: 0 } }
    })
      .jpeg()
      .toBuffer()
    const blob = new Blob([buffer], { type: 'image/jpeg' })
    const file = new File([blob], 'test.jpg', { type: 'image/jpeg' })

    return file
  }

  beforeEach(() => {
    mediaRepository = new MediaRepositoryInMemoryImpl()
    mediaService = new MediaService(mediaRepository, console)
  })

  describe('CREATE', () => {
    it('should create a media successfully', async () => {
      // arrange
      const file = await createFakeImageFile()

      // act
      const media = await mediaService.create(file)

      // assert
      expect(media).toMatchSnapshot({
        name: expect.any(String)
      })
    })

    it('should throw an error when creating a media with invalid file', async () => {
      // arrange
      const file = new File(['Invalid data!'], 'test.jpg', { type: 'invalid/data' })

      // act
      const promise = mediaService.create(file)

      // act + assert
      await expect(promise).rejects.toThrow()
    })
  })

  describe('GET', () => {
    it('should get a media by identifier', async () => {
      // act
      const media = await mediaService.getById(1)

      // assert
      expect(media).toMatchSnapshot()
    })

    it('should throw a NotFoundError error when getting a media with invalid id', async () => {
      // act
      const promise = mediaService.getById(1000)

      // arrange
      await expect(promise).rejects.toThrow('Not found media')
    })
  })

  describe('DELETE', () => {
    it('should delete media successfully', async () => {
      // arrange
      const file = await createFakeImageFile()
      const media = await mediaService.create(file)

      // act
      await mediaService.delete(media.id)

      // assert
      expect(fs.existsSync(`./uploads/${media.name}`)).toBe(false)
    })

    it('should throw a NotFoundError error when deleting a media with invalid id', async () => {
      // act
      const promise = mediaService.delete(1000)
      // assert
      expect(promise).rejects.toThrow('Not found media')
    })
  })
})
