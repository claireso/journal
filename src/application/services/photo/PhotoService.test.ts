import { PhotoPositionType } from '@domain/entities'
import { MediaRepository, PhotoRepository } from '@domain/repositories'
import PhotoRepositoryInMemoryImpl from '@infrastructure/repositories/photo/PhotoRepositoryInMemoryImpl'
import MediaRepositoryInMemoryImpl from '@infrastructure/repositories/media/MediaRepositoryInMemoryImpl'
import PhotoService from './PhotoService'

describe('application/PhotoService', () => {
  let photoRepository: PhotoRepository
  let mediaRepository: MediaRepository
  let photoService: PhotoService

  beforeEach(() => {
    mediaRepository = new MediaRepositoryInMemoryImpl()
    photoRepository = new PhotoRepositoryInMemoryImpl()
    photoService = new PhotoService(photoRepository, mediaRepository, console)
  })

  describe('CREATE', () => {
    it('should create a photo successfully', async () => {
      // arrange
      const data = {
        title: 'new photo',
        description: 'new photo description',
        position: PhotoPositionType.LEFT,
        color: null,
        media_id: 4
      }

      // act
      const photo = await photoService.create(data)

      // assert
      expect(photo).toMatchSnapshot()
    })

    it('should throw a BadRequestError when creating a media with invalid media_id (media not found)', async () => {
      // arrange
      const data = {
        title: 'new photo',
        description: 'new photo description',
        position: PhotoPositionType.LEFT,
        color: null,
        media_id: 1000
      }

      // act
      const promise = photoService.create(data)

      // assert
      expect(promise).rejects.toThrow('Can not create photo because media does not exist')
    })

    it('should throw a BadRequestError when creating a media with invalid media_id (media already linked with a photo)', async () => {
      // arrange
      const data = {
        title: 'new photo',
        description: 'new photo description',
        position: PhotoPositionType.LEFT,
        color: null,
        media_id: 2
      }

      // act
      const promise = photoService.create(data)

      // assert
      expect(promise).rejects.toThrow('Can not create photo because media is already linked to a photo')
    })
  })

  describe('GET', () => {
    it('should get a photo by identifier', async () => {
      // act
      const photo = await photoService.getById(1)

      // assert
      expect(photo).toMatchSnapshot()
    })

    it('should throw a NotFoundError error when getting a photo with invalid id', async () => {
      // act
      const promise = photoService.getById(1000)

      // arrange
      await expect(promise).rejects.toThrow('Not found photo')
    })

    it('should get a photo by media identifier', async () => {
      // act
      const photo = await photoService.getByMediaId(1)

      // assert
      expect(photo).toMatchSnapshot()
    })

    it('should not get a photo by invalid media identifier', async () => {
      // act
      const photo = await photoService.getByMediaId(1000)

      // assert
      expect(photo).toBeNull()
    })

    it('should get the latest created photo', async () => {
      // act
      const photo = await photoService.getPreviousPhoto()

      // assert
      expect(photo).toMatchSnapshot()
    })

    it('should get paginated photos', async () => {
      // act
      const paginatedPhotos = await photoService.getPaginatedPhotos(1)

      //assert
      expect(paginatedPhotos).toMatchSnapshot()
    })

    it('should throw a NotFoundError error when getting paginated photos with invalid page', async () => {
      // act
      const promise = photoService.getPaginatedPhotos(1000)

      //assert
      expect(promise).rejects.toThrow('Page photo not found')
    })
  })

  describe('UPDATE', () => {
    it('should update photo successfully', async () => {
      // arrange
      const data = {
        title: 'photo title',
        description: 'photo description',
        color: '#000000',
        position: PhotoPositionType.RIGHT
      }

      // act
      const updatedPhoto = await photoService.update(1, data)

      // assert
      expect(updatedPhoto).toMatchSnapshot({
        updated_at: expect.any(Date)
      })
    })

    it('should throw a BadRequestError error when updating a photo with invalid media_id (media doesnt exist)', async () => {
      // arrange
      const data = {
        title: 'photo title',
        description: 'photo description',
        color: '#000000',
        position: PhotoPositionType.RIGHT,
        media_id: 1000
      }

      // act
      const promise = photoService.update(1, data)

      // assert
      expect(promise).rejects.toThrow('Can not update photo because media does not exist')
    })

    it('should throw a BadRequestError error when updating a photo with invalid media_id (media is already linked with a photo)', async () => {
      // arrange
      const data = {
        title: 'photo title',
        description: 'photo description',
        color: '#000000',
        position: PhotoPositionType.RIGHT,
        media_id: 2
      }

      // act
      const promise = photoService.update(1, data)

      // assert
      expect(promise).rejects.toThrow('Can not create photo because media is already linked to a photo')
    })
  })

  describe('DELETE', () => {
    it('should delete photo successfully', async () => {
      // arrange
      const db = { query: jest.fn() }

      // act
      await photoService.delete(1, db)

      // assert
      expect(photoService.getById(1)).rejects.toThrow('Not found photo')
    })

    it('should throw a NotFoundError error when deleting photo with invalid id', async () => {
      // arrange
      const db = { query: jest.fn() }

      // assert
      expect(photoService.delete(1000, db)).rejects.toThrow('Not found photo')
    })
  })
})
